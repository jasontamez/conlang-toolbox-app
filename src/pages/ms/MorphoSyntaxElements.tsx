import React from 'react';
import {
	IonHeader,
	IonToolbar,
	IonTitle,
	IonButtons,
	IonButton,
	IonMenuButton,
	IonIcon,
	IonList,
	IonItem,
	IonLabel,
	IonRange,
	IonContent,
	IonCheckbox,
	IonTextarea,
	IonModal,
	IonFooter,
	IonGrid,
	IonRow,
	IonCol
} from '@ionic/react';
import { globeOutline } from 'ionicons/icons';
import ExtraCharactersModal from '../M-ExtraCharacters';
import { checkmarkCircleOutline, informationCircleSharp } from 'ionicons/icons';
import { useSelector, useDispatch } from "react-redux";
import {
	openModal,
	setSyntaxBool,
	setSyntaxNum,
	setSyntaxText,
	setSyntaxState
} from '../../components/ReduxDucksFuncs';
import { MorphoSyntaxBoolObject, MorphoSyntaxNumberObject, MorphoSyntaxTextObject } from '../../components/ReduxDucksTypes';
import doParse from 'html-react-parser';
import ms from './ms.json';
import { Element, Text } from 'domhandler/lib/node';

export const SyntaxHeader = (props: any) => {
	const dispatch = useDispatch();
	const title = props.title || "MorphoSyntax";
	return (
		<IonHeader>
			<ExtraCharactersModal />
			<IonToolbar>
				<IonButtons slot="start">
					<IonMenuButton />
				</IonButtons>
				<IonTitle>{title}</IonTitle>
				<IonButtons slot="end">
					<IonButton onClick={() => dispatch(openModal("ExtraCharacters"))}>
						<IonIcon icon={globeOutline} />
					</IonButton>
				</IonButtons>
			</IonToolbar>
		</IonHeader>
	);
};
const RadioBox = (props: any) => {
	const dispatch = useDispatch();
	const synBool = useSelector((state: any) => state.morphoSyntaxInfo.bool)
	const what = props.prop as keyof MorphoSyntaxBoolObject
	const setBool = (what: keyof MorphoSyntaxBoolObject, value: boolean) => {
		dispatch(setSyntaxBool(what, value));
	};
	return (
		<IonCheckbox onIonChange={(e) => setBool(what, e.detail.checked)} checked={synBool[what] || false} />
	);
};
const RangeItem = (props: any) => {
	const dispatch = useDispatch();
	const synNum = useSelector((state: any) => state.morphoSyntaxInfo.num)
	const what = props.prop as keyof MorphoSyntaxNumberObject;
	const start = (props.start || "") as string;
	const end = (props.end || "") as string;
	const cls = (props.innerClass || "") as string;
	const max = props.max === undefined ? 4 : (props.max as number);
	const classes = props.className ? props.className + " content" : "content";
	const setNum = (what: keyof MorphoSyntaxNumberObject, value: number) => {
		dispatch(setSyntaxNum(what, value));
	};
	return (
		<IonItem className={classes}>
			<IonRange onBlur={(e) => setNum(what, e.target.value as number)} value={synNum[what] || 0} className={cls} color="secondary" snaps={true} step={1} ticks={true} min={0} max={max}>
				<IonLabel slot="start">{start}</IonLabel>
				<IonLabel slot="end">{end}</IonLabel>
			</IonRange>
		</IonItem>
	);
};
const TextItem = (props: any) => {
	const dispatch = useDispatch();
	const synText = useSelector((state: any) => state.morphoSyntaxInfo.text)
	const ph = (props.placeholder || "") as string;
	const what = props.prop as keyof MorphoSyntaxTextObject;
	const rows = props.rows === undefined ? 3 : (props.rows as number);
	const classes = props.className ? props.className + " morphoSyntaxTextItem content" : "morphoSyntaxTextItem content";
	const setText = (what: keyof MorphoSyntaxTextObject, value: string) => {
		dispatch(setSyntaxText(what, value));
	};
	return (
		<IonItem className={classes}>
			<IonLabel position="stacked">{props.children}</IonLabel>
			<IonTextarea onBlur={(e) => setText(what, e.target.value || "")} value={synText[what] || ""} placeholder={ph} rows={rows} enterkeyhint="done" inputmode="text" />
		</IonItem>
	);
};
const HeaderItem = (props: any) => (
	<IonItem className={"h" + (props.level ? " h" + String(props.level) : "")}>
		<IonLabel>{props.children}</IonLabel>
	</IonItem>
);
const TransTable = (props: any) => {
	const rows = (props.rows || "").trim().split(/\s+\/\s+/);
	let length = 1;
	let cName = "translation";
	if(props.className) {
		cName += " " + props.className;
	}
	const final = props.children;
	let finalRow = -1;
	if(final) {
		finalRow = rows.length;
		rows.push(final);
	}
	const mainRows = rows.filter((row: string) => row).map((row: string, i: number) => {
		if(i === finalRow) {
			return <tr key={"ROW-" + String(i)}><td colSpan={length}>{row}</td></tr>;
		}
		const tds = row.split(/\s+/);
		length = Math.max(length, tds.length);
		return <tr key={"ROW-" + String(i)}>{
				tds.filter((el: string) => el).map((el: string, i: number) => <td key={"TD-" + String(i)}>{el.replace(/__/g, " ")}</td>)
			}</tr>;
		});
	return <table className={cName}><tbody>{mainRows}</tbody></table>;
};
const InfoModal = (props: any) => {
	const dispatch = useDispatch();
	const synState = useSelector((state: any) => state.morphoSyntaxModalState);
	const id = "modal" + (props.title as string).replace(/[^a-zA-Z0-9]/g, "");
	const label = props.label || "Read About It";
	return (
		<IonItem className={props.className ? props.className + " infoModal" : "infoModal"}>
			<IonModal isOpen={synState[id] !== undefined} onDidDismiss={() => dispatch(setSyntaxState(id, false))}>
				<IonHeader>
					<IonToolbar color="primary">
						<IonTitle>{props.title}</IonTitle>
					</IonToolbar>
				</IonHeader>
				<IonContent className="morphoSyntaxModal">
					<IonList lines="none">
						<IonItem>
							{props.children}
						</IonItem>
					</IonList>
				</IonContent>
				<IonFooter>
					<IonToolbar className="ion-text-wrap">
						<IonButtons slot="end">
							<IonButton onClick={() => dispatch(setSyntaxState(id, false))} slot="end" fill="solid" color="success">
								<IonIcon icon={checkmarkCircleOutline} slot="start" />
								<IonLabel>Done</IonLabel>
							</IonButton>
						</IonButtons>
					</IonToolbar>
				</IonFooter>
			</IonModal>
			<IonButton color="primary" onClick={() => dispatch(setSyntaxState(id, true))}>
				<IonIcon icon={informationCircleSharp} slot="start" style={{ marginInlineStart: "0", marginInlineEnd: "0.5rem"}} />
				<IonLabel>{label}</IonLabel>
			</IonButton>
		</IonItem>
	);
};
export interface exporter {
	title: string
	output?: ( (string | [string, string])[] )[]
	labels?: string[]
	labelOverrideDocx?: boolean
}
export interface display {
	boxesPerRow: number
	rowLabels: string[]
	class?: string
	labels?: string[]
	labelClass?: string
	header?: string
	inlineHeaders?: string[]
	singleHeader?: string
	export?: exporter
}
export interface anything {
	tag: string
	level?: number
	content?: string
	title?: string
	label?: string
	prop?: string
	rows?: number
	start?: string
	end?: string
	spectrum?: boolean
	max?: number
	boxes?: string[]
	display?: display
}
export const parseMSJSON = (page: keyof (typeof ms)) => {
	const doc = ms[page] as anything[];
	const key = page + "-";
	let counter = 0;
	return doc.map((bit) => {
		counter++;
		const tag = (bit.tag || "");
		switch(tag) {
			case "Header":
				return <HeaderItem key={key + String(counter)} level={bit.level}>{bit.content}</HeaderItem>;
			case "Range":
				return <RangeItem key={key + String(counter)} prop={bit.prop} start={bit.start} end={bit.end} innerClass={bit.spectrum ? "spectrum" : undefined} max={bit.max || undefined} />;
			case "Text":
				return <TextItem key={key + String(counter)} prop={bit.prop} rows={bit.rows || undefined}>{bit.content || ""}</TextItem>
			case "Modal":
				return <InfoModal key={key + String(counter)} title={bit.title} label={bit.label || undefined}>{
					doParse(bit.content || "", {
						replace: node => {
							if(node instanceof Element && node.attribs && node.name === "transtable") {
								return <TransTable rows={node.attribs.rows} className={node.attribs.className || ""}>{node.children.length ? (node.children[0] as Text).data : ""}</TransTable>;
							}
							return node;
						}
					})
				}</InfoModal>;
			case "Checkboxes":
				const disp = bit.display;
				if(!disp) {
					return "<div>CHECKBOX DISPLAY ERROR</div>";
				}
				const boxes = (bit.boxes || []);
				const rowLabels = (disp.rowLabels || []).slice();
				const perRow = disp.boxesPerRow;
				const labels = (disp.labels || []).slice();
				const header = disp.header;
				const inlineHeaders = disp.inlineHeaders;
				let count = 0;
				let rows: string[][] = [];
				let temp: string[] = [];
				boxes.forEach((box) => {
					count++;
					temp.push(box || "Error");
					if(count >= perRow) {
						temp.push(rowLabels.shift() || "Error");
						count = 0;
						rows.push(temp);
						temp = [];
					}
				});
				const printRow = (row: string[], key: number, cn = "") => {
					const label = row.pop() || "";
					let cc = 0;
					return (
						<IonRow className={cn || undefined} key={"ROW-" + String(key)}>
							{row.map((c) => <IonCol className="cbox" key={"X-" + String(cc++)}><RadioBox prop={String(c)} /></IonCol>)}
							<IonCol key={"LX-" + String(cc++)}>{doParse(label)}</IonCol>
						</IonRow>
					);
				};
				const printRowWithLabel = (row: string[], key: number, cn = "") => {
					const final = row.pop() || "";
					const label = labels.shift() || "";
					const labelClass = disp.labelClass || "label"
					let cc = 0;
					return (
						<IonRow className={cn || undefined} key={"ROW-" + String(key)}>
							{row.map((c) => <IonCol className="cbox" key={"C-" + String(cc++)}><RadioBox prop={String(c)} /></IonCol>)}
							<IonCol className={labelClass} key={"LC-" + String(cc++)}>{doParse(label)}</IonCol>
							<IonCol key={"FC-" + String(cc++)}>{doParse(final)}</IonCol>
						</IonRow>
					);
				};
				const printHeaderRow = (row: string[], key: number, hasLabel = false) => {
					const final = row.pop() || "";
					let label: any = "";
					if(hasLabel) {
						label = row.pop();
					}
					let cc = 0;
					return (
						<IonRow className="header" key={"ROW-" + String(key)}>
							{row.map((c) => <IonCol className="cbox" key={"B-" + String(cc++)}>{c}</IonCol>)}
							{label ? <IonCol className={disp.labelClass || "label"} key={"L-" + String(cc++)}>{doParse(label)}</IonCol> : label}
							<IonCol key={"F-" + String(cc++)}>{doParse(final)}</IonCol>
						</IonRow>
					);
				};
				count = 1;
				return (
					<IonItem className="content" key={key + String(counter)}>
						<IonGrid className={disp.class || undefined}>
							{header ? <IonRow key="headerRow-0" className="header"><IonCol>{doParse(header)}</IonCol></IonRow> : ""}
							{inlineHeaders ? printHeaderRow(inlineHeaders.slice(), count++, !!disp.labels) : ""}
							{rows.map((r) => disp.labels ? printRowWithLabel(r.slice(), count++) : printRow(r.slice(), count++))}
						</IonGrid>
					</IonItem>
				);
		}
		return "";
	});
};

export default SyntaxHeader;