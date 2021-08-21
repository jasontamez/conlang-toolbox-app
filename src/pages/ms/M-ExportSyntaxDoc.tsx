import React from 'react';
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
	IonItem,
	IonIcon,
	IonLabel,
	IonList,
	IonContent,
	IonHeader,
	IonToolbar,
	IonButtons,
	IonButton,
	IonTitle,
	IonModal,
	IonFooter
} from '@ionic/react';
import {
	closeCircleOutline
} from 'ionicons/icons';
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import {
	closeModal,
	setLoadingPage
} from '../../components/ReduxDucksFuncs';
import doExport from '../../components/ExportServices';
import ms from './ms.json';
import { exporter, display, anything } from './MorphoSyntaxElements';
import {
	MorphoSyntaxTextObject,
	MorphoSyntaxNumberObject,
	MorphoSyntaxBoolObject
} from '../../components/ReduxDucksTypes';


// FOR BROWSER TESTING ONLY
import { saveAs } from 'file-saver';
// FOR BROWSER TESTING ONLY


const ExportSyntaxModal = () => {
	const dispatch = useDispatch();
	const [modalState, msInfo] = useSelector((state: any) => [state.modalState, state.morphoSyntaxInfo], shallowEqual);
	const doClose = () => {
		dispatch(closeModal('ExportMS'));
		modalState.loadingPage === "deletingSyntaxDoc" && dispatch(setLoadingPage(false));
	};
	const doText = (e: Event, md = false) => {
		let lines: string[] = [];
		const bool = msInfo.bool;
		const num = msInfo.num;
		const text = msInfo.text;
		const sections: string[] = ms.sections;
		sections.forEach((sec: string) => {
			const section = (ms[sec as keyof typeof ms] as anything[]);
			section.forEach((item: anything) => {
				let content = item.content || "";
				switch(item.tag) {
					case "Header":
						if(md) {
							content = " " + content;
							let c = item.level || 4;
							while(c > 0) {
								content = "#" + content;
								c--;
							}
						}
						lines.push(content);
						break;
					case "Range":
						const min = 0;
						const max = item.max || 4;
						const value = num[item.prop as keyof MorphoSyntaxNumberObject] || min;
						if(item.spectrum) {
							const div = 100 / (max - min);
							const lesser = Math.floor(((value - min) * div) + 0.5);
							if(md) {
								lines.push(
									"**" + String(lesser) + "%** "
									+ (item.start || "[MISSING]") + "  \n"
									+ "**" + String(100 - lesser) + "%** "
									+ (item.end || "[MISSING]")
								);
							} else {
								lines.push(
									String(lesser) + "% " + item.start + "\n"
									+ String(100 - lesser) + "% " + item.end
								);	
							}
						} else {
							let counter = min;
							let range = (item.start || "[MISSING]");
							while(counter <= max) {
								let c = String(counter);
								if(counter === value) {
									range += md ? " **(" + c + ")**" : " (" + c + ")";
								} else {
									range += " " + c;
								}
								counter++;
							}
							let end = (item.end || "[MISSING]");
							if(md) {
								range = "**" + range + "**";
								end = "**" + end + "**";
							}
							lines.push(range + " " + end);
						}
						break;
					case "Text":
						if(md) {
							let txt = "";
							let tArr: string[] = (text[item.prop as keyof MorphoSyntaxTextObject] || "[NO TEXT ENTERED]").split(/\n\n+/);
							tArr.forEach((t: string, i: number) => {
								if(i > 0) {
									txt += "\n\n"; // inserts paragraph break
								}
								t.split(/\n/).forEach((x: string, j: number) => {
									if(j > 0) {
										txt += "  \n"; // inserts line break
									}
									txt += x.trim();
								});
							});
							lines.push(content || "[TEXT PROMPT]", txt);
						} else {
							lines.push(content || "[TEXT PROMPT]", text[item.prop as keyof MorphoSyntaxTextObject] || "[NO TEXT ENTERED]");
						}
						break;
					case "Checkboxes":
						//const value = bool[item.prop as keyof MorphoSyntaxBoolObject];
						const disp: display = item.display!;
						const expo: exporter = disp.export!;
						const output = expo.output;
						if(output) {
							const map = output.map((bit) => bit.map((b) => {
									if(typeof b === "string") {
										return b;
									}
									const found: string[] = [];
									b.forEach((pair) => {
										if(bool[pair[0] as keyof MorphoSyntaxBoolObject]) {
											found.push(pair[1]);
										}
									});
									if (found.length === 0) {
										return md ? "*[NONE SELECTED]*" : "[NONE SELECTED]";
									} else if (found.length === 1) {
										return md ? "*" + found[0] + "*" : found[0];
									} else if (found.length === 2) {
										return md ? "*" + found[0] + "* and *" + found[1] : found[0] + " and " + found[1];
									}
									const final = found.pop();
									if(md) {
										return "*" + found.join("*, *") + "*, and *" + final + "*";
									}
									return found.join(", ") + ", and " + final;
								}).join(""));
							lines.push(map.join("\n"));
						} else {
							const title = expo.title || "";
							const boxes = item.boxes!.slice();
							const labels = (expo.labels || disp.labels || disp.rowLabels || boxes).slice();
							let result = "";
							let found: string[] = [];
							while(boxes.length > 0) {
								const box = boxes.shift();
								const label = labels.shift();
								if(bool[box as keyof MorphoSyntaxBoolObject]) {
									found.push(label || "[ERROR]");
								}
							}
							if (found.length === 0) {
								result = md ? "*[NONE SELECTED]*" : "[NONE SELECTED]";
							} else if (found.length === 1) {
								result = md ? "*" + found[0] + "*" : found[0];
							} else if (found.length === 2) {
								const final = found.pop();
								result = md ? ("*" + found.join("*, *") + "*, and *" + final) : (found.join(", ") + ", and " + final);
							}
							lines.push(title + " " + result);
						}
				}
			});
		});
		const output = msInfo.title + "\n\n" + (md ? "*" : "") + (msInfo.description || "[NO DESCRIPTION PROVIDED]") + (md ? "*" : "") + "\n\n" + lines.join("\n\n") + "\n";
		doDownload(e, output, md ? "md" : "txt");
	};
	const doDocx = (e: Event) => {
		const bool = msInfo.bool;
		const num = msInfo.num;
		const text = msInfo.text;
		const msSections: string[] = ms.sections;
		let sections: any[] = [];
		const spacing = {
			before: 200
		}
		msSections.forEach((sec: string) => {
			const msSection = (ms[sec as keyof typeof ms] as anything[]);
			let children: any[] = [];
			msSection.forEach((item: anything) => {
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
									text: String(lesser) + "%"
								}),
								new TextRun({
									text: " " +item.start
								}),
								new TextRun({
									text: String(100 - lesser) + "%",
									break: 1
								}),
								new TextRun({
									text: " " + item.end
								}),
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
							const disp: display = item.display!;
							const expo: exporter = disp.export!;
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
							console.log("All: " + String(allColumns));
							console.log("Portion: " + String(portion));
							console.log("Columns: " + JSON.stringify(colWidths));
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
								console.log("----");
								// cell[s] [label] rowLabel
								let cols = colWidths.slice();
								leftover = 100;
								row.forEach((cell) => {
									const percent = Math.floor(cols.shift()! * portion);
									console.log("BOX: " + String(percent));
									leftover -= percent;
									cells.push(new TableCell({
										borders: border,
										width: {
											size: percent,
											type: WidthType.PERCENTAGE
										},
										children: [new Paragraph({
											text: bool[cell] ? "X" : " "
										})]
									}));
								});
								if(labels.length > 0) {
									const percent = Math.floor(cols.shift()! * portion);
									leftover -= percent;
									console.log("LABEL: " + String(percent));
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
								console.log("FINAL: " + String(leftover));
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
		dispatch(setLoadingPage("deletingSyntaxDoc"));


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
	const doJSON = (e: Event) => {
		const output: any = {
			title: msInfo.title,
			description: msInfo.description,
			bool: {...msInfo.bool},
			num: {...msInfo.num},
			text: {...msInfo.text}
		};
		doDownload(e, JSON.stringify(output), "json");
	};
	const doXML = (e: Event) => {
		let XML: string =
				'<?xml version="1.0" encoding="UTF-8"?>'
				+ "\n<MorphoSyntaxObject>\n\t<Title>"
				+ msInfo.title
				+ "</Title>\n\t<Description>"
				+ msInfo.description
				+ "</Description>\n\t<Bool>\n";
		const msb = msInfo.bool,
			msn = msInfo.num,
			mst = msInfo.text;
		Object.keys(msb).forEach((prop) => {
			XML += "\t\t<Item prop=\"" + prop + "\"></Item>\n";
		});
		XML += "\t</Bool>\n\t<Num>\n";
		Object.keys(msn).forEach((prop) => {
			XML += "\t\t<Item prop=\"" + prop + "\">" + msn[prop] + "</Item>\n";
		});
		XML += "\t</Num>\n\t<Text>\n";
		Object.keys(mst).forEach((prop) => {
			XML += "\t\t<Item prop=\"" + prop + "\">" + mst[prop] + "</Item>\n";
		});
		let output = XML + "\t</Text>\n</MorphoSyntaxObject>";
		doDownload(e, output, "xml");
	};
	const doDownload = (e: Event, output: string, extension: string) => {
		e.preventDefault();
		const filename = msInfo.title + " - " + (new Date()).toDateString() + "." + extension;
		dispatch(setLoadingPage("deletingSyntaxDoc"));
		doExport(output, filename)
			.catch((e = "Error doexport") => {
				console.log(e);
				doClose();
			})
			.then(() => doClose());
	};
	return (
		<IonModal isOpen={modalState.ExportMS} onDidDismiss={() => doClose()}>
			<IonHeader>
				<IonToolbar color="primary">
					<IonTitle>Export MorphoSyntax Document: {msInfo.title || "[Untitled]"}</IonTitle>
					<IonButtons slot="end">
						<IonButton onClick={() => doClose()}>
							<IonIcon icon={closeCircleOutline} />
						</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<IonList lines="none" className="buttonFilled multiLinePossible">
					<IonItem>Choose a format:</IonItem>
					<IonItem button={true} onClick={(e: any) => doText(e)}>Text Outline (plain)</IonItem>
					<IonItem button={true} onClick={(e: any) => doText(e, true)}>Text Outline (markdown)</IonItem>
					<IonItem button={true} onClick={(e: any) => doDocx(e)}>DOCX Document</IonItem>
					<IonItem button={true} onClick={(e: any) => doJSON(e)}>JSON File</IonItem>
					<IonItem button={true} onClick={(e: any) => doXML(e)}>XML File</IonItem>
				</IonList>
				<a className="hide downloader" download={false} href=".">download it</a>
			</IonContent>
			<IonFooter>
				<IonToolbar>
					<IonButton color="warning" slot="end" onClick={() => doClose()}>
						<IonIcon icon={closeCircleOutline} slot="start" />
						<IonLabel>Cancel</IonLabel>
					</IonButton>
				</IonToolbar>
			</IonFooter>
		</IonModal>
	);
};

export default ExportSyntaxModal;
