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
	setTemporaryInfo,
	setLoadingPage
} from '../components/ReduxDucksFuncs';
import { Lexicon } from '../components/ReduxDucksTypes';
import doExport from '../components/ExportServices';
//import { $q, $delay } from '../components/DollarSignExports';

const ExportLexiconModal = () => {
	const dispatch = useDispatch();
	const [modalState, temp, lexicon] = useSelector((state: any) => [state.modalState, state.temporaryInfo, state.lexicon], shallowEqual);
	const data = temp ? temp.data : undefined;
	const doClose = () => {
		dispatch(setTemporaryInfo(undefined));
		dispatch(closeModal('ExportLexicon'));
		modalState.loadingPage === "deletingLexicon" && dispatch(setLoadingPage(false));
	};
	const doTabbed = (e: Event) => doText(e, "\t");
	const doSemicolons = (e: Event) => doText(e, "; ");
	const doNewlines = (e: Event) => doText(e, "\n", "\n\n");
	const doText = (e: Event, separator: string, unitSplit: string = "\n") => {
		let lines: string[] = [lexicon.columnTitles.join(separator)];
		lexicon.lexicon.forEach((lex: Lexicon) => lines.push(lex.columns.join(separator)));
		let output = lexicon.title + "\n" + lexicon.description + "\n\n" + lines.join(unitSplit) + "\n";
		doDownload(e, output, "txt");
	};
	const doCSV = (e: Event) => {
		const quotify = (input: string) => JSON.stringify(input).replace(/\\"/g, "\"\"");
		let lines: string[] = [lexicon.columnTitles.map((title: string) => quotify(title)).join(",")];
		lexicon.lexicon.forEach(
			(lex: Lexicon) => lines.push(lex.columns.map((title: string) => quotify(title)).join(","))
		);
		let cols = lexicon.columns;
		let final = cols < 2 ? "," : "";
		let filler = "";
		if(cols > 2) {
			let x = 2;
			while(x < cols) {
				x++;
				filler = filler + ",";
			}
		}
		let output =
			"\"TITLE\"," + quotify(lexicon.title) + filler
			+ "\n\"Description\"," + lexicon.description + filler
			+ "\n" + lines.join(final + "\n") + "\n";
		doDownload(e, output, "csv");
	};
	const doJSON = (e: Event) => {
		let base: any = {};
		let colTitles: string[] = [];
		lexicon.columnTitles.forEach((title: string) => {
			if(base[title] !== undefined) {
				let c = 0;
				while(base[title + c.toString()] !== undefined) {
					c++;
				}
				title = title + c.toString();
			}
			base[title] = 1;
			colTitles.push(title);
		});
		let colMax = lexicon.columns;
		base = {
			title: lexicon.title,
			description: lexicon.description,
			content: []
		};
		lexicon.lexicon.forEach((lex: Lexicon) => {
			let item: any = {};
			for(let x = 0; x < colMax; x++) {
				item[colTitles[x]] = lex.columns[x];
			}
			base.content.push(item);
		});
		let output = JSON.stringify(base);
		doDownload(e, output, "json");
	};
	const doXML = (e: Event) => {
		let XML: string =
			'<?xml version="1.0" encoding="UTF-8"?>'
			+ "\n<Lexicon>\n\t<Title>"
			+ lexicon.title
			+ "</Title>\n\t<Description>"
			+ lexicon.description
			+ "</Description>\n\t<Headers>\n";
		lexicon.columnTitles.forEach((title: string, ind: number) => {
			let i = String(ind + 1);
			XML = XML + "\t\t<Column" + i + ">" + title + "</Column" + i + ">\n";
		});
		XML = XML + "\t</Headers>\n\t<Content>\n";
		lexicon.lexicon.forEach((lex: Lexicon) => {
			XML = XML + "\t\t<Item>\n";
			lex.columns.forEach((value: string, ind: number) => {
				let i = String(ind + 1);
				XML = XML + "\t\t\t<Column" + i + ">" + value + "</Column" + i + ">\n";
			});
			XML = XML + "\t\t</Item>\n"
		});
		let output = XML + "\t</Content>\n</Lexicon>";
		doDownload(e, output, "xml");
	};
	const doDownload = (e: Event, output: string, extension: string) => {
		e.preventDefault();
		const filename = lexicon.title + " - " + (new Date()).toDateString() + "." + extension;
		dispatch(setLoadingPage("deletingLexicon"));
		doExport(output, filename)
			.catch((e = "Error?") => console.log(e))
			.then(() => doClose());
	};
	return (
		<IonModal isOpen={modalState.ExportLexicon} onDidDismiss={() => doClose()}>
			<IonHeader>
				<IonToolbar color="primary">
					<IonTitle>Export Lexicon: {lexicon.title}</IonTitle>
					<IonButtons slot="end">
						<IonButton onClick={() => doClose()}>
							<IonIcon icon={closeCircleOutline} />
						</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<IonList lines="none" className="buttonFilled">
					<IonItem>Choose a format:</IonItem>
					<IonItem button={true} onClick={(e: any) => doTabbed(e)}>Text, Tabbed</IonItem>
					<IonItem button={true} onClick={(e: any) => doSemicolons(e)}>Text, Semicolons</IonItem>
					<IonItem button={true} onClick={(e: any) => doNewlines(e)}>Text, Newlines</IonItem>
					<IonItem button={true} onClick={(e: any) => doCSV(e)}>CSV File</IonItem>
					<IonItem button={true} onClick={(e: any) => doJSON(e)}>JSON File</IonItem>
					<IonItem button={true} onClick={(e: any) => doXML(e)}>XML File</IonItem>
				</IonList>
				<a className="hide downloader" download={false} href=".">download it</a>
			</IonContent>
			<IonFooter>
				<IonToolbar className={data ? "" : "hide"}>
					<IonButton color="warning" slot="end" onClick={() => doClose()}>
						<IonIcon icon={closeCircleOutline} slot="start" />
						<IonLabel>Cancel</IonLabel>
					</IonButton>
				</IonToolbar>
			</IonFooter>
		</IonModal>
	);
};

export default ExportLexiconModal;
