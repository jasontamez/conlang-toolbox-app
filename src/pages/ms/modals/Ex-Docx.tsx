import { MouseEvent } from "react";
import {
	BorderStyle,
	Document,
	HeadingLevel,
	ITableBordersOptions,
	Packer,
	Paragraph,
	SectionType,
	Table,
	TableCell,
	TableRow,
	TextRun,
	WidthType
} from "docx";
import { UseIonToastResult } from "@ionic/react";

import { MSBool, MSNum, MSState, MSText, SetBooleanState } from "../../../store/types";

import doExport from '../../../components/ExportServices';
import log_original from '../../../components/Logging';
import { tMaker, tc } from "../../../components/translators";

import { CheckboxTransExportProps, CheckboxTransProps, specificPageInfo } from '../MorphoSyntaxElements';
import i18n from "../../../i18n";
import msRawInfo from '../ms.json';

// FOR BROWSER TESTING ONLY
import { saveAs } from 'file-saver';
import { isPlatform } from "@ionic/react";
import toaster from "../../../components/toaster";
// FOR BROWSER TESTING ONLY

type heads = "HEADING_1" | "HEADING_2" | "HEADING_3" | "HEADING_4" | "HEADING_5" | "HEADING_6";
type Child = (Paragraph | Table);
interface Section {
	properties: { type: SectionType }
	children: Child[]
}

const t = tMaker({ns: "ms"});

const doDocx = (
	e: MouseEvent<HTMLIonItemElement, globalThis.MouseEvent>,
	msInfo: MSState,
	showUnused: boolean,
	doClose: () => void,
	setLoading: SetBooleanState,
	toast: UseIonToastResult,
	log: (x: string[]) => void
) => {
	const { title, description } = msInfo;
	const msSections: string[] = msRawInfo.sections;
	const sections: Section[] = [];
	const spacing = {
		before: 200
	};
	sections.push({
		properties: { type: SectionType.CONTINUOUS },
		children: [
			new Paragraph({
				text: title,
				heading: HeadingLevel.HEADING_1,
				spacing
			}),
			...(description ?
				[ new Paragraph({
					text: description,
					spacing
				}) ]
			: []
			)
		]
	});
	const checksum: string[] = [title, description];
	msSections.forEach((sec: string) => {
		const msSection = (msRawInfo[sec as keyof typeof msRawInfo] as specificPageInfo[]);
		const children: Child[] = [];
		msSection.forEach((item: specificPageInfo) => {
			const {
				tag,
				heads = [],
				level = 4,
				max = 4,
				prop,
				spectrum,
				start = "[MISSING START LABEL]",
				end = "[MISSING END LABEL]",
				display,
				boxes = [],
				content = ""
			} = item;
			switch(tag) {
				case "Header":
					if(!showUnused) {
						// Check all properties under this header and continue
						//   only if at least one has information
						if(heads.every(prop => prop !== true && !msInfo[prop])) {
							// Skip this
							break;
						}
					}
					const head = ("HEADING_" + String(level)) as heads;
					children.push(
						new Paragraph({
							text: content,
							heading: HeadingLevel[head],
							spacing
						})
					);
					checksum.push("HEAD " + content);
					break;
				case "Range":
					// Range is always saved, as it always has some sort of info
					const min = 0;
					const value = msInfo[prop as MSNum] || min;
					const paragraph: TextRun[] = [];
					if(spectrum) {
						const div = 100 / (max - min);
						const lesser = Math.floor(((value - min) * div) + 0.5);
						paragraph.push(
							new TextRun({
								text: String(100 - lesser) + "% " + start
							}),
							new TextRun({
								text: String(lesser) + "% " + end,
								break: 1
							})
						);
						checksum.push(`RANGE ${lesser}% ${start}, ${100 - lesser}% ${end}`);
					} else {
						let counter = min;
						paragraph.push(new TextRun({
							text: start,
							bold: true
						}));
						while(counter <= max) {
							if(counter === value) {
								paragraph.push(
									new TextRun({
										text: " "
									}),
									new TextRun({
										text: `(${counter})`,
										bold: true
									})
								);
							} else {
								paragraph.push(new TextRun({
									text: ` ${counter}`
								}));
							}
							counter++;
						}
						paragraph.push(new TextRun({
							text: " " + end,
							bold: true
						}));
						checksum.push(`RANGE ${start} <${value}> ${end}`);
					}
					children.push(new Paragraph({
						children: paragraph,
						spacing
					}));
					break;
				case "Text":
					if(showUnused || msInfo[prop as MSText]) {
						// Save
						children.push(new Paragraph({
							children: [
								new TextRun({
									text: content || "[ERROR, MISSING TEXT PROMPT]",
									italics: true
								})
							],
							spacing
						}));
						const tArr: string[] = (msInfo[prop as MSText] || t("[NO TEXT ENTERED]")).split(/\n\n+/);
						tArr.forEach((txt: string, i: number) => {
							const run: TextRun[] = [];
							txt.split(/\n/).forEach((x: string, j: number) => {
								run.push(new TextRun(
									(j > 0) ? {
										text: x,
										break: 1
									} : {
										text: x
									}
								));
							});
							children.push(new Paragraph({
								children: run,
								spacing
							}));
							checksum.push("TEXT [" + tArr.join("] [") + "]");
						});
					}
					break;
				case "Checkboxes":
					if(!display) {
						children.push(new Paragraph(
							{ text: "[ERROR, CHECKBOX MISSING DISPLAY INFO]", spacing }
						));
						checksum.push("CHECKBOX error");
						break;
					}
					const boxesCopy: [MSBool, boolean][] = [];
					let found = false;
					boxes!.forEach(prop => {
						const value = msInfo[prop] || false;
						found = found || value;
						boxesCopy.push([prop, value]);
					});
					if (!showUnused && !found) {
						// Nothing to show, so skip.
						break;
					}
					// Use general output format
					const {
						i18,
						boxesPerRow,
						export: expo
					} = display;
					const {
						header,
						columnHeaders,
						labels
					} = i18n.t(i18, { returnObjects: true }) as CheckboxTransProps;
					// Get special info for exports
					const expoLabels = (i18n.t(expo ? expo.i18 : "", { returnObjects: true }) as CheckboxTransExportProps || {}).labels;
					// determine labels we're using
					const labelsToUse = (
						expo && expo.labelOverrideDocx ?
							(expoLabels || labels || []).slice()
						:
							(labels || [])
					) || [];

					const perRow = boxesPerRow || 1;
					const rows: [MSBool, boolean][][] = [];
					let colCount = 0;
					const output: TableRow[] = [];
					// colWidths is a flex-like number
					const colWidths: number[] = [];
					const checkingOutput: string[] = [];
					let totalColumnWidths = 0;
					// Make the checkboxes consume 1 flex unit
					for(let x = 0; x < perRow; x++) {
						colWidths.push(1);
						totalColumnWidths++;
					}
					// Make the labels consume 6 flex units
					if(labelsToUse.length > 0) {
						// Are there multiple labels?
						if(Array.isArray(labelsToUse[0])) {
							// First one will be smaller: 4 flex units
							colWidths.push(4);
							totalColumnWidths += 4;
						}
						colWidths.push(6);
						totalColumnWidths += 6;
					}
					const portion = 100 / totalColumnWidths;
					let temp: [MSBool, boolean][] = [];
					let count = 0;
					boxesCopy.forEach((pair) => {
						count++;
						temp.push(pair);
						if(count >= perRow) {
							count = 0;
							rows.push(temp);
							temp = [];
						}
					});
					const border: ITableBordersOptions = {
						top: {
							style: BorderStyle.SINGLE,
							size: 1,
							color: "000000"
						},
						bottom: {
							style: BorderStyle.SINGLE,
							size: 1,
							color: "000000"
						},
						left: {
							style: BorderStyle.SINGLE,
							size: 1,
							color: "000000"
						},
						right: {
							style: BorderStyle.SINGLE,
							size: 1,
							color: "000000"
						},
					}
					rows.forEach(row => {
						// cell[s] [label] [?label]
						const cols = colWidths.slice();
						const cells: TableCell[] = [];
						const checkingCells: string[] = [];
						let leftover = 100;
						row.forEach(([propertyName, bool]) => {
							const percent = Math.floor(cols.shift()! * portion);
							leftover -= percent;
							cells.push(new TableCell({
								borders: border,
								width: {
									size: percent,
									type: WidthType.PERCENTAGE
								},
								children: [new Paragraph({
									text: bool ? "X" : " "
								})]
							}));
							checkingCells.push(bool ? "X" : ".");
						});
						if(labelsToUse.length > 0) {
							const shift = labelsToUse.shift();
							const texts = Array.isArray(shift) ? shift : [ shift ];
							texts.forEach(text => {
								const percent = Math.floor(cols.shift()! * portion);
								leftover -= percent;
								cells.push(
									new TableCell({
										borders: border,
										width: {
											size: percent,
											type: WidthType.PERCENTAGE
										},
										children: [new Paragraph({
											text
										})]
									})
								);
								checkingCells.push(text!);
							});
						}
						const possibleTexts = labelsToUse.shift() || "";
						const texts = Array.isArray(possibleTexts) ? possibleTexts.slice() : [ possibleTexts ];
						texts.forEach(text => {
							cells.push(
								new TableCell({
									borders: border,
									width: {
										size: leftover,
										type: WidthType.PERCENTAGE
									},
									children: [new Paragraph({
										text
									})]
								})
							);
							checkingCells.push(text);
						});
						colCount = Math.max(colCount, cells.length);
						output.push(new TableRow({
							children: cells,
							cantSplit: true
						}));
						checkingOutput.push(`[${checkingCells.join("] [")}]`);
					});
					if(columnHeaders) {
						const cells: TableCell[] = [];
						const checkingCells: string[] = [];
						let leftover = 100;
						const cols = colWidths.slice();
						columnHeaders.forEach((columnHeader: string) => {
							const percent = (
								cols.length > 0 ?
									Math.floor(cols.shift()! * portion)
								:
									leftover
							);
							leftover -= percent;
							cells.push(new TableCell({
								borders: border,
								width: {
									size: percent,
									type: WidthType.PERCENTAGE
								},
								children: [new Paragraph({
									text: columnHeader
								})]
							}));
							checkingCells.push(columnHeader);
							colCount = Math.max(colCount, cells.length);
						});
						output.unshift(new TableRow({
							children: cells,
							cantSplit: true,
							tableHeader: true
						}));
						checkingOutput.unshift(`[${checkingCells.join("] [")}]`);
					}
					if(header) {
						// prepend one header using colCount
						output.unshift(new TableRow({
							tableHeader: true,
							cantSplit: true,
							children: [new TableCell({
								children: [new Paragraph({
									text: header
								})],
								width: {
									size: 100,
									type: WidthType.PERCENTAGE
								},
								borders: border,
								columnSpan: colCount
							})]
						}));
						checkingOutput.unshift(`[header]`);
					}
					children.push(new Table({
						rows: output,
						margins: {
							left: 75,
							right: 75,
							top: 50,
							bottom: 25
						},
						width: {
							size: 100,
							type: WidthType.PERCENTAGE
						}
					}));
					checksum.push("CHECKBOXES: " + checkingOutput.join(" "));
			}
		});
		// Only save section if there's something to save.
		children.length > 0 && sections.push({
			properties: { type: SectionType.CONTINUOUS },
			children
		});
	});
	log_original(null, checksum);
	const doc = new Document({
		creator: tc("Conlang Toolbox"),
		description: t("msDocumentDescription"),
		title: `${title} - ${t("msDocument", { context: "formal" })}`,
		sections
	});
	e.preventDefault();
	const filename =  tc("fileFormat", { title, date: (new Date()).toDateString(), extension: "docx" });
	setLoading(true);


	// FOR BROWSER TESTING ONLY
	//i18n not needed here
	if(!isPlatform("android")) {
		Packer.toBlob(doc).then((blob) => {
			saveAs(blob, filename);
			toast && toaster({
				message: `${filename} exported`,
				color: "success",
				duration: 5000,
				toast
			});
		}).catch((e = "Error blob") => {
			log(["Ex-Doc / Packer / toBlob", e]);
			toast && toaster({
				message: "UNABLE TO WRITE FILE: " + String(e).replace(/\n+/g, " "),
				color: "danger",
				duration: 10000,
				toast
			});
		});
		doClose();
		return;
	}
	// FOR BROWSER TESTING ONLY


	Packer.toBase64String(doc).then((output) => {
		doExport(output, filename, toast, null, false)
			.catch((e = "Error doexport docx") => {
				log(["Ex-Doc / Packer / doExport", e]);
				doClose();
			})
			.then(() => doClose());
	}).catch((e = "Error 64") => {
		log(["Ex-Doc / Packer", e]);
		doClose();
	});

};

export default doDocx;
