import React from 'react';
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

const ExportSyntaxModal = () => {
	const dispatch = useDispatch();
	const [modalState, msInfo] = useSelector((state: any) => [state.modalState, state.morphoSyntaxInfo], shallowEqual);
	const doClose = () => {
		dispatch(closeModal('ExportMS'));
		modalState.loadingPage === "deletingSyntaxDoc" && dispatch(setLoadingPage(false));
	};
	const doText = (e: Event) => {
		let lines: string[] = [];
		const bool = msInfo.bool;
		const num = msInfo.num;
		const text = msInfo.text;
		const sections: string[] = ms.sections;
		sections.forEach((sec: string) => {
			const section = (ms[sec as keyof typeof ms] as anything[]);
			section.forEach((item: anything) => {
				switch(item.tag) {
					case "Header":
						lines.push(item.content || "");
						break;
					case "Range":
						const min = 0;
						const max = item.max || 4;
						const value = num[item.prop as keyof MorphoSyntaxNumberObject] || min;
						if(item.spectrum) {
							const div = 100 / (max - min);
							const lesser = Math.floor(((value - min) * div) + 0.5);
							lines.push(
								String(lesser) + "% " + item.start+ "\n"
								+ String(100 - lesser) + "% " + item.end
							);
						} else {
							let counter = min;
							let range = item.start;
							while(counter <= max) {
								let c = String(counter);
								if(counter === value) {
									range += " (" + c + ")";
								} else {
									range += " " + c;
								}
								counter++;
							}
							lines.push(range + " " + item.end);
						}
						break;
					case "Text":
						lines.push(item.content || "[TEXT PROMPT]", text[item.prop as keyof MorphoSyntaxTextObject] || "[BLANK]");
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
										return "[NONE SELECTED]";
									} else if (found.length === 1) {
										return found[0];
									} else if (found.length === 2) {
										return found[0] + " and " + found[1];
									}
									const final = found.pop();
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
								result = "[NONE SELECTED]";
							} else if (found.length === 1) {
								result = found[0];
							} else if (found.length === 2) {
								result = found[0] + " and " + found[1];
							} else {
								const final = found.pop();
								result = found.join(", ") + ", and " + final;
							}
							lines.push(title + " " + result);
						}
				}
			});
		});
		const output = msInfo.title + "\n\n" + msInfo.description + "\n\n" + lines.join("\n\n") + "\n";
		doDownload(e, output, "txt");
	};
	const doJSON = (e: Event) => {
		const base: any = {
			title: msInfo.title,
			description: msInfo.description,
			bool: {...msInfo.bool},
			num: {...msInfo.num},
			text: {...msInfo.text}
		};
		let output = JSON.stringify(base);
		doDownload(e, output, "json");
	};
	const doXML = (e: Event) => {
		let XML: string =
				'<?xml version="1.0" encoding="UTF-8"?>'
				+ "\n<MorphoSyntaxObject>\n\t<Title>"
				+ msInfo.title
				+ "</Title>\n\t<Description>"
				+ msInfo.description
				+ "</Description>\n\t<Bool>\n",
			msb = msInfo.bool,
			msn = msInfo.num,
			mst = msInfo.text;
		Object.keys(msb).forEach((prop) => {
			XML += "\t\t<Item prop=\"" + prop + "\"></Item>\n";
		});
		XML += "\t</Prop>\n\t<Num>\n";
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
			.catch((e = "Error?") => console.log(e))
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
					<IonItem button={true} onClick={(e: any) => doText(e)}>Text Outline</IonItem>
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
