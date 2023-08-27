import {
	BorderStyle,
	Document,
	HeadingLevel,
	Packer,
	Paragraph,
	SectionType,
	Table,
	TableCell,
	TableRow,
	TextRun,
	WidthType
} from "docx";
import {
	MorphoSyntaxTextObject,
	MorphoSyntaxNumberObject,
	MorphoSyntaxBoolObject,
	MorphoSyntaxObject
} from '../../components/ReduxDucksTypes';
import { exportProp, displayProp, specificPageInfo } from './MorphoSyntaxElements';
import ms from './ms.json';
import doExport from '../../components/ExportServices';


// FOR BROWSER TESTING ONLY
import { saveAs } from 'file-saver';
// FOR BROWSER TESTING ONLY

const doDocx = (e: Event, msInfo: MorphoSyntaxObject, dispatch: Function, doClose: Function, setLoading: Function) => {
	const bool = msInfo.bool;
	const num = msInfo.num;
	const text = msInfo.text;
	const msSections: string[] = ms.sections;
	let sections: any[] = [];
	const spacing = {
		before: 200
	}
	msSections.forEach((sec: string) => {
		const msSection = (ms[sec as keyof typeof ms] as specificPageInfo[]);
		let children: any[] = [];
		msSection.forEach((item: specificPageInfo) => {
			let content = item.content || "";
			switch(item.tag) {
				case "Header":
					type heads = "HEADING_1" | "HEADING_2" | "HEADING_3" | "HEADING_4" | "HEADING_5" | "HEADING_6"
					let head = ("HEADING_" + String(item.level)) as heads;
					children.push(new Paragraph({
						text: content,
						heading: HeadingLevel[head],
						spacing: spacing
					}))
					break;
				case "Range":
					const min = 0;
					const max = item.max || 4;
					const value = num[item.prop as keyof MorphoSyntaxNumberObject] || min;
					let paragraph: any[] = [];
					if(item.spectrum) {
						const div = 100 / (max - min);
						const lesser = Math.floor(((value - min) * div) + 0.5);
						paragraph.push(
							new TextRun({
								text: String(lesser) + "% " + (item.start || "[MISSING]")
							}),
							new TextRun({
								text: String(100 - lesser) + "% " + (item.end || "[MISSING]"),
								break: 1
							})
						);
					} else {
						let counter = min;
						paragraph.push(new TextRun({
							text: (item.start || "[MISSING]"),
							bold: true
						}));
						while(counter <= max) {
							let c = String(counter);
							if(counter === value) {
								paragraph.push(
									new TextRun({
										text: " "
									}),
									new TextRun({
										text: "(" + c + ")",
										bold: true
									})
								);
							} else {
								paragraph.push(new TextRun({
									text: " " + c
								}));
							}
							counter++;
						}
						paragraph.push(new TextRun({
							text: " " + (item.end || "[MISSING]"),
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
					let tArr: string[] = (text[item.prop as keyof MorphoSyntaxTextObject] || "[NO TEXT ENTERED]").split(/\n\n+/);
					tArr.forEach((t: string, i: number) => {
						let run: any[] = [];
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
					//const value = bool[item.prop as keyof MorphoSyntaxBoolObject];
					const disp = item.display;
					if(!disp) {
						children.push(new Paragraph({ text: "CHECKBOX DISPLAY ERROR", spacing: spacing }))
					} else {
						const disp: displayProp = item.display!;
						const expo: exportProp = disp.export!;
						const boxes = (item.boxes || []);
						const perRow = disp.boxesPerRow || 1;
						const labels = (disp.labels || []).slice();
						const rowLabels = ((expo.labelOverrideDocx ? (expo.labels || labels) : disp.rowLabels) || []).slice();
						const header = disp.header;
						const inlineHeaders = disp.inlineHeaders;
						let cells: any[] = [];
						let rows: string[][] = [];
						let colCount = 0;
						let temp:any[] = [];
						let count = 0;
						let output: any[] = [];
						let colWidths: number[] = [];
						let allColumns = 6;
						for(let x = 0; x < perRow; x++) {
							colWidths.push(1);
							allColumns++;
						}
						if(labels.length > 0) {
							colWidths.push(4);
							allColumns = allColumns + 4;
						}
						let leftover = 100;
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
						const border: any = {
							style: BorderStyle.SINGLE,
							size: 1,
							color: "000000"
						}
						rows.forEach((row: string[]) => {
							// cell[s] [label] rowLabel
							let cols = colWidths.slice();
							leftover = 100;
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
										text: bool[cell as keyof MorphoSyntaxBoolObject] ? "X" : " "
									})]
								}));
							});
							if(labels.length > 0) {
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
											text: labels.shift() || ""
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
										text: rowLabels.shift() || ""
									})]
								})
							);
							colCount = Math.max(colCount, cells.length);
							output.push(new TableRow({
								children: cells,
								cantSplit: true
							}));
							cells = [];
						});
						if(inlineHeaders) {
							leftover = 100;
							let cols = colWidths.slice();
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
	Packer.toBlob(doc).then((blob) => {
		saveAs(blob, filename);
	}).catch((e = "Error blob") => {
		console.log(e);
	});
	// FOR BROWSER TESTING ONLY


	Packer.toBase64String(doc).then((output) => {
		doExport(output, filename, false)
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
