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
	IonFooter,
	useIonToast
} from '@ionic/react';
import {
	closeCircleOutline
} from 'ionicons/icons';
import { useSelector } from "react-redux";
import { Lexicon, ModalProperties, StateObject } from '../../store/types';
import doExport from '../../components/ExportServices';

interface ExportModalProps extends ModalProperties {
	setLoading: Function
}

const ExportLexiconModal = (props: ExportModalProps) => {
	const { isOpen, setIsOpen, setLoading } = props;
	const {
		title,
		description,
		lexicon,
		columns
	} = useSelector((state: StateObject) => state.lexicon);
	const doClose = () => {
		setIsOpen(false);
		setLoading(false);
	};
	const columnTitles = columns.map((obj) => obj.label);
	const length = columns.length;
	const [doToast, undoToast] = useIonToast();
	const doTabbed = (e: Event) => doText(e, "\t");
	const doSemicolons = (e: Event) => doText(e, "; ");
	const doNewlines = (e: Event) => doText(e, "\n", "\n\n");
	const doText = (e: Event, separator: string, unitSplit: string = "\n") => {
		const lines: string[] = [columnTitles.join(separator)];
		lexicon.forEach((lex: Lexicon) => lines.push(lex.columns.join(separator)));
		const output = title + "\n" + description + "\n\n" + lines.join(unitSplit) + "\n";
		doDownload(e, output, "txt");
	};
	const doCSVall = (e: Event) => {
		const quotify = (input: string) => JSON.stringify(input).replace(/\\"/g, "\"\"");
		const lines: string[] = [columnTitles.map((colTitle: string) => quotify(colTitle)).join(",")];
		lexicon.forEach(
			(lex: Lexicon) => lines.push(lex.columns.map((title: string) => quotify(title)).join(","))
		);
		let filler = "";
		if(length > 2) {
			let x = 2;
			while(x < length) {
				x++;
				filler = filler + ",";
			}
		}
		const output = `"TITLE",${quotify(title)}${filler}\n`
			+ `"Description",${description}${filler}\n`
			+ lines.join(length < 2 ? ",\n" : "\n") + "\n";
		doDownload(e, output, "csv");
	};
	const doCSV = (e: Event) => {
		const quotify = (input: string) => JSON.stringify(input).replace(/\\"/g, "\"\"");
		const lines: string[] = [columnTitles.map((colTitle: string) => quotify(colTitle)).join(",")];
		lexicon.forEach(
			(lex: Lexicon) => lines.push(lex.columns.map((line: string) => quotify(line)).join(","))
		);
		const output = lines.join("\n") + "\n";
		doDownload(e, output, "csv");
	};
	const doJSON = (e: Event) => {
		const counter: {[key: string]: number} = {};
		const colTitles: string[] = [];
		columnTitles.forEach((columnTitle: string) => {
			let colTitle = columnTitle;
			if(counter[colTitle] !== undefined) {
				let c = 0;
				while(counter[colTitle + c.toString()] !== undefined) {
					c++;
				}
				colTitle = colTitle + c.toString();
			}
			counter[colTitle] = 1;
			colTitles.push(colTitle);
		});
		const base: {
			title: string,
			description: string,
			content: any[]
		} = {
			title,
			description,
			content: []
		};
		lexicon.forEach((lex: Lexicon) => {
			const item: any = {};
			for(let x = 0; x < length; x++) {
				item[colTitles[x]] = lex.columns[x];
			}
			base.content.push(item);
		});
		const output = JSON.stringify(base);
		doDownload(e, output, "json");
	};
	const doXML = (e: Event) => {
		let XML: string =
			'<?xml version="1.0" encoding="UTF-8"?>'
			+ `\n<Lexicon>\n\t<Title>${title}</Title>\n\t<Description>${description}</Description>\n\t<Headers>\n`;
		columnTitles.forEach((colTitle: string, ind: number) => {
			const i = String(ind + 1);
			XML = XML + `\t\t<Column${i}>${colTitle}</Column${i}>\n`;
		});
		XML = XML + "\t</Headers>\n\t<Content>\n";
		lexicon.forEach((lex: Lexicon) => {
			XML = XML + "\t\t<Item>\n";
			lex.columns.forEach((value: string, ind: number) => {
				const i = String(ind + 1);
				XML = XML + `\t\t\t<Column${i}>${value}</Column${i}>\n`;
			});
			XML = XML + "\t\t</Item>\n"
		});
		const output = XML + "\t</Content>\n</Lexicon>";
		doDownload(e, output, "xml");
	};
	const doDownload = (e: Event, output: string, extension: string) => {
		e.preventDefault();
		const filename = title + " - " + (new Date()).toDateString() + "." + extension;
		setLoading(true);
		doExport(output, filename, doToast, undoToast)
			.catch((e = "Error?") => console.log(e))
			.then(() => doClose());
	};
	return (
		<IonModal isOpen={isOpen} onDidDismiss={() => doClose()}>
			<IonHeader>
				<IonToolbar color="primary">
					<IonTitle>Export Lexicon: {title}</IonTitle>
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
					<IonItem
						button={true}
						onClick={(e: any) => doTabbed(e)}
					>Text, Tabbed</IonItem>
					<IonItem
						button={true}
						onClick={(e: any) => doSemicolons(e)}
					>Text, Semicolons</IonItem>
					<IonItem
						button={true}
						onClick={(e: any) => doNewlines(e)}
					>Text, Newlines</IonItem>
					<IonItem
						button={true}
						onClick={(e: any) => doCSVall(e)}
					>CSV File</IonItem>
					<IonItem
						button={true}
						onClick={(e: any) => doCSV(e)}
					>CSV File, no title/description</IonItem>
					<IonItem
						button={true}
						onClick={(e: any) => doJSON(e)}
					>JSON File</IonItem>
					<IonItem
						button={true}
						onClick={(e: any) => doXML(e)}
					>XML File</IonItem>
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

export default ExportLexiconModal;
