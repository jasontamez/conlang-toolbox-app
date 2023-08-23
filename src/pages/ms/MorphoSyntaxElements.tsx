import React, { useState, useCallback } from 'react';
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
	setSyntaxBool,
	setSyntaxNum,
	setSyntaxText,
	setSyntaxState
} from '../../components/ReduxDucksFuncs';
import { MorphoSyntaxBoolObject, MorphoSyntaxNumberObject, MorphoSyntaxTextObject } from '../../components/ReduxDucksTypes';
import doParse from 'html-react-parser';
import ms from './ms.json';
import { Element, Text } from 'domhandler/lib/node';

interface ModalProperties {
	title?: string
}

function stripHtml (input: string) {
	return input.replace(/<[^>]*>/g, "");
};

export const SyntaxHeader = (props: ModalProperties) => {
	const {
		title = "MorphoSyntax"
	} = props;
	const [isOpenECM, setIsOpenECM] = useState<boolean>(false);
	return (
		<IonHeader>
			<ExtraCharactersModal isOpen={isOpenECM} setIsOpen={setIsOpenECM} />
			<IonToolbar>
				<IonButtons slot="start">
					<IonMenuButton />
				</IonButtons>
				<IonTitle>{title}</IonTitle>
				<IonButtons slot="end">
					<IonButton onClick={() => setIsOpenECM(true)}>
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
		<IonCheckbox aria-label={props.label} onIonChange={(e) => setBool(what, e.detail.checked)} checked={synBool[what] || false} />
	);
};
const RangeItem = (props: any) => {
	const dispatch = useDispatch();
	const synNum = useSelector((state: any) => state.morphoSyntaxInfo.num)
	const {
		prop,
		start = "",
		end = "",
		innerClass = "",
		max = 4,
		className
	} = props;
	const what = prop as keyof MorphoSyntaxNumberObject;
	const classes = className ? className + " content" : "content";
	const setNum = useCallback((what: keyof MorphoSyntaxNumberObject, value: number) => {
		dispatch(setSyntaxNum(what, value));
	}, [dispatch]);
	return (
		<IonItem className={classes}>
			<IonRange
				aria-label={`Range from ${start} to ${end}`}
				onBlur={(e) => setNum(what, e.target.value as number)}
				value={synNum[what] || 0}
				className={innerClass}
				color="secondary"
				snaps={true}
				step={1}
				ticks={true}
				min={0}
				max={max}
			>
				<div slot="start">{start}</div>
				<div slot="end">{end}</div>
			</IonRange>
		</IonItem>
	);
};
const TextItem = (props: any) => {
	const {
		placeholder = "",
		prop,
		rows = 3,
		className,
		label = "",
		children
	} = props;
	const dispatch = useDispatch();
	const synText = useSelector((state: any) => state.morphoSyntaxInfo.text)
	const classes = className ? className + " " : "";
	const setText = (what: keyof MorphoSyntaxTextObject, value: string) => {
		dispatch(setSyntaxText(what, value));
	};
	return (
		<>
			<IonItem className={`${classes} morphoSyntaxTextItem content labelled`}>
				<IonLabel>{children}</IonLabel>
			</IonItem>
			<IonItem className={`${classes} morphoSyntaxTextItem content`}>
				<IonTextarea aria-label={label} onBlur={(e) => setText(prop, e.target.value || "")} value={synText[prop] || ""} placeholder={placeholder} rows={rows} enterkeyhint="done" inputmode="text" />
			</IonItem>
		</>
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
	return <div className="scrollable"><table className={cName}><tbody>{mainRows}</tbody></table></div>;
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
				{label}
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
				return <TextItem key={key + String(counter)} prop={bit.prop} rows={bit.rows || undefined} label={bit.label || ""}>{bit.content || ""}</TextItem>
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
				const printRow = (row: string[], key: number, headers: undefined | string[]) => {
					const label = row.pop() || "";
					const textLabel = stripHtml(label);
					let cc = 0;
					return (
						<IonRow key={"ROW-" + String(key)}>
							{row.map((c, i) => <IonCol className="cbox" key={"X-" + String(cc++)}><RadioBox label={headers ? `${stripHtml(headers[i])}, ${textLabel}` : textLabel} prop={String(c)} /></IonCol>)}
							<IonCol key={"LX-" + String(cc++)}>{doParse(label)}</IonCol>
						</IonRow>
					);
				};
				const printRowWithLabel = (row: string[], key: number, headers: undefined | string[]) => {
					const final = row.pop() || "";
					const label = labels.shift() || "";
					const labelClass = disp.labelClass || "label";
					const textLabel = final ? stripHtml(label) + ", " + stripHtml(final) : stripHtml(label) ;
					let cc = 0;
					return (
						<IonRow key={"ROW-" + String(key)}>
							{row.map((c, i) => <IonCol className="cbox" key={"C-" + String(cc++)}><RadioBox label={headers ? `${stripHtml(headers[i])}, ${textLabel}` : textLabel} prop={String(c)} /></IonCol>)}
							<IonCol className={labelClass} key={"LC-" + String(cc++)}>{doParse(label)}</IonCol>
							<IonCol key={"FC-" + String(cc++)}>{doParse(final)}</IonCol>
						</IonRow>
					);
				};
				const printHeaderRow = (row: string[], key: number, hasLabel = false) => {
					const final = row.pop() || "";
					let label: any = undefined;
					if(hasLabel) {
						label = row.pop();
					}
					let cc = 0;
					return (
						<IonRow className="header" key={"ROW-" + String(key)}>
							{row.map((c) => <IonCol className="cbox" key={"B-" + String(cc++)}>{c}</IonCol>)}
							{label && <IonCol className={disp.labelClass || "label"} key={"L-" + String(cc++)}>{doParse(label)}</IonCol>}
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
							{rows.map((r) => disp.labels ? printRowWithLabel(r.slice(), count++, inlineHeaders && inlineHeaders.slice()) : printRow(r.slice(), count++, inlineHeaders && inlineHeaders.slice()))}
						</IonGrid>
					</IonItem>
				);
		}
		return "";
	});
};

export default SyntaxHeader;