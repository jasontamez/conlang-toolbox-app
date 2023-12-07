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

import { MSBool, MSNum, MSState, MSText } from "../../../store/types";

import doExport from '../../../components/ExportServices';
import log_original from '../../../components/Logging';

import { specificPageInfo } from '../MorphoSyntaxElements';
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

const doDocx = (
	e: Event,
	msInfo: MSState,
	showUnused: boolean,
	doClose: Function,
	setLoading: Function,
	doToast: Function,
	undoToast: Function,
	log: Function
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
								text: String(lesser) + "% " + start
							}),
							new TextRun({
								text: String(100 - lesser) + "% " + end,
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
						const tArr: string[] = (msInfo[prop as MSText] || "[NO TEXT ENTERED]").split(/\n\n+/);
						tArr.forEach((t: string, i: number) => {
							const run: TextRun[] = [];
							t.split(/\n/).forEach((x: string, j: number) => {
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
					const boxMap: {[key in MSBool]?: boolean} = {};
					const boxesCopy: [MSBool, boolean][] = [];
					let found = false;
					boxes!.forEach(prop => {
						const value = msInfo[prop] || false;
						found = found || value;
						boxMap[prop] = value;
						boxesCopy.push([prop, value]);
					});
					if (!showUnused && !found) {
						// Nothing to show, so skip.
						break;
					}
					// Use general output format
					const {
						header,
						inlineHeaders,
						labels,
						rowLabels,
						export: expo
					} = display;
					const { labelOverrideDocx, labels: expoLabels } = expo || {};
					const perRow = display.boxesPerRow || 1;
					const labelsCopy = labels ? labels.slice() : [];
					const labelsForTheRow = (
						labelOverrideDocx ?
							(expoLabels || labelsCopy).slice()
						:
							rowLabels.slice()
					) || [];
					const rows: [MSBool, boolean][][] = [];
					let colCount = 0;
					let temp: [MSBool, boolean][] = [];
					let count = 0;
					const output: TableRow[] = [];
					const colWidths: number[] = [];
					const checkingOutput: string[] = [];
					let allColumns = 6;
					for(let x = 0; x < perRow; x++) {
						colWidths.push(1);
						allColumns++;
					}
					if(labelsCopy.length > 0) {
						colWidths.push(4);
						allColumns = allColumns + 4;
					}
					const portion = 100 / allColumns;
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
						// cell[s] [label] rowLabel
						const cols = colWidths.slice();
						const cells: TableCell[] = [];
						const checkingCells: string[] = [];
						let leftover = 100;
						row.forEach(([cell, bool]) => {
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
						if(labelsCopy.length > 0) {
							const percent = Math.floor(cols.shift()! * portion);
							leftover -= percent;
							const text = labelsCopy.shift() || "";
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
							checkingCells.push(text);
						}
						const text = labelsForTheRow.shift() || "";
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
						colCount = Math.max(colCount, cells.length);
						output.push(new TableRow({
							children: cells,
							cantSplit: true
						}));
						checkingOutput.push(`[${checkingCells.join("] [")}]`);
					});
					if(inlineHeaders) {
						const cells: TableCell[] = [];
						const checkingCells: string[] = [];
						let leftover = 100;
						const cols = colWidths.slice();
						inlineHeaders.forEach((cell: string) => {
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
									text: cell
								})]
							}));
							checkingCells.push(cell);
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
		creator: "Conlang Toolbox",
		description: "A MorphoSyntax document exported from Conlang Toolbox.",
		title: `${title} - MorphoSyntax Document`,
		sections
	});
	e.preventDefault();
	const filename = `${title} - ${(new Date()).toDateString()}.docx`;
	setLoading(true);


	// FOR BROWSER TESTING ONLY
	if(!isPlatform("android")) {
		Packer.toBlob(doc).then((blob) => {
			saveAs(blob, filename);
			doToast && undoToast && toaster({
				message: `${filename} exported`,
				color: "success",
				duration: 5000,
				doToast,
				undoToast
			});
		}).catch((e = "Error blob") => {
			log(["Ex-Doc / Packer / toBlob", e]);
			doToast && undoToast && toaster({
				message: "UNABLE TO WRITE FILE: " + String(e).replace(/\n+/g, " "),
				color: "danger",
				duration: 10000,
				doToast,
				undoToast
			});
		});
		doClose();
		return;
	}
	// FOR BROWSER TESTING ONLY


	Packer.toBase64String(doc).then((output) => {
		doExport(output, filename, doToast, undoToast, null, false)
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
