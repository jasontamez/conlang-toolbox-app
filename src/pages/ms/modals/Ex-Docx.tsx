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
import { exportProp, specificPageInfo } from '../MorphoSyntaxElements';
import msRawInfo from '../ms.json';

// FOR BROWSER TESTING ONLY
import { saveAs } from 'file-saver';
import { isPlatform } from "@ionic/react";
// FOR BROWSER TESTING ONLY

type Child = (Paragraph | Table);
interface Section {
	properties: { type: SectionType }
	children: Child[]
}

const doDocx = (
	e: Event,
	msInfo: MSState,
	doClose: Function,
	setLoading: Function,
	doToast: Function,
	undoToast: Function
) => {
	const msSections: string[] = msRawInfo.sections;
	const sections: Section[] = [];
	const spacing = {
		before: 200
	}
	msSections.forEach((sec: string) => {
		const msSection = (msRawInfo[sec as keyof typeof msRawInfo] as specificPageInfo[]);
		const children: Child[] = [];
		msSection.forEach((item: specificPageInfo) => {
			const {
				tag,
				level,
				max = 4,
				prop,
				spectrum,
				start = "[MISSING]",
				end = "[MISSING]",
				display,
				boxes = [],
				content = ""
			} = item;
			switch(tag) {
				case "Header":
					type heads = "HEADING_1" | "HEADING_2" | "HEADING_3" | "HEADING_4" | "HEADING_5" | "HEADING_6"
					const head = ("HEADING_" + String(level)) as heads;
					children.push(new Paragraph({
						text: content,
						heading: HeadingLevel[head],
						spacing: spacing
					}))
					break;
				case "Range":
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
					}
					children.push(new Paragraph({
						children: paragraph,
						spacing: spacing
					}))
					break;
				case "Text":
					children.push(new Paragraph({
						text: (content || "[TEXT PROMPT]"),
						spacing: spacing
					}))
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
							spacing: spacing
						}))
					});
					break;
				case "Checkboxes":
					if(!display) {
						children.push(new Paragraph({ text: "CHECKBOX DISPLAY ERROR", spacing: spacing }))
					} else {
						const expo: exportProp = display.export!;
						const {
							header,
							inlineHeaders,
							labels,
							rowLabels
						} = display;
						const perRow = display.boxesPerRow || 1;
						const labelsCopy = labels ? labels.slice() : [];
						const labelsForTheRow = (expo.labelOverrideDocx ? (expo.labels || labelsCopy).slice() : rowLabels.slice()) || [];
						const rows: string[][] = [];
						let colCount = 0;
						let temp: string[] = [];
						let count = 0;
						const output: TableRow[] = [];
						const colWidths: number[] = [];
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
						boxes.forEach((box) => {
							count++;
							temp.push(box || "Error");
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
						rows.forEach((row: string[]) => {
							// cell[s] [label] rowLabel
							const cols = colWidths.slice();
							const cells: TableCell[] = [];
							let leftover = 100;
							row.forEach((cell) => {
								const percent = Math.floor(cols.shift()! * portion);
								leftover -= percent;
								cells.push(new TableCell({
									borders: border,
									width: {
										size: percent,
										type: WidthType.PERCENTAGE
									},
									children: [new Paragraph({
										text: msInfo[cell as MSBool] ? "X" : " "
									})]
								}));
							});
							if(labelsCopy.length > 0) {
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
											text: labelsCopy.shift() || ""
										})]
									})
								);
							}
							cells.push(
								new TableCell({
									borders: border,
									width: {
										size: leftover,
										type: WidthType.PERCENTAGE
									},
									children: [new Paragraph({
										text: labelsForTheRow.shift() || ""
									})]
								})
							);
							colCount = Math.max(colCount, cells.length);
							output.push(new TableRow({
								children: cells,
								cantSplit: true
							}));
						});
						if(inlineHeaders) {
							const cells: TableCell[] = [];
							let leftover = 100;
							const cols = colWidths.slice();
							inlineHeaders.forEach((cell: string) => {
								const percent = cols.length > 0 ? Math.floor(cols.shift()! * portion) : leftover;
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
								colCount = Math.max(colCount, cells.length);
							});
							output.unshift(new TableRow({
								children: cells,
								cantSplit: true,
								tableHeader: true
							}));
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
					}
			}
		});
		sections.push({
			properties: { type: SectionType.CONTINUOUS },
			children: children
		});
	});
	const doc = new Document({
		creator: "Conlang Toolbox",
		description: "A MorphoSyntax document exported from Conlang Toolbox.",
		title: msInfo.title + " - MorphoSyntax Document",
		sections: sections
	});
	e.preventDefault();
	const filename = msInfo.title + " - " + (new Date()).toDateString() + ".docx";
	setLoading(true);


	// FOR BROWSER TESTING ONLY
	if(!isPlatform("android")) {
		Packer.toBlob(doc).then((blob) => {
			saveAs(blob, filename);
		}).catch((e = "Error blob") => {
			console.log(e);
		});
		return;
	}
	// FOR BROWSER TESTING ONLY


	Packer.toBase64String(doc).then((output) => {
		doExport(output, filename, doToast, undoToast, false)
			.catch((e = "Error doexport docx") => {
				console.log(e);
				doClose();
			})
			.then(() => doClose());
	}).catch((e = "Error 64") => {
		console.log(e);
		doClose();
	});

};

export default doDocx;