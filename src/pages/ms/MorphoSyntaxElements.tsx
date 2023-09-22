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
import { checkmarkCircleOutline, informationCircleSharp } from 'ionicons/icons';
import { useSelector, useDispatch } from "react-redux";
import { Element, Text } from 'domhandler/lib/node';
import doParse from 'html-react-parser';

import {
	setSyntaxBool,
	setSyntaxNum,
	setSyntaxText
} from '../../store/msSlice';
import { MSBool, MSNum, MSText, StateObject } from '../../store/types';

import ExtraCharactersModal from '../M-ExtraCharacters';
import ms from './ms.json';

interface ModalProperties {
	title?: string
	modalPropsMaker: Function
}

function stripHtml (input: string) {
	return input.replace(/<[^>]*>/g, "");
};

export const SyntaxHeader = (props: ModalProperties) => {
	const {
		title = "MorphoSyntax",
		modalPropsMaker
	} = props;
	const [isOpenECM, setIsOpenECM] = useState<boolean>(false);
	return (
		<IonHeader>
			<ExtraCharactersModal {...modalPropsMaker(isOpenECM, setIsOpenECM)} />
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
const RadioBox = (props: {
	prop: MSBool,
	label: string
}) => {
	const dispatch = useDispatch();
	const ms = useSelector((state: StateObject) => state.ms);
	const {prop, label} = props;
	const setBool = (what: MSBool, value: boolean) => {
		dispatch(setSyntaxBool([what, value]));
	};
	return (
		<IonCheckbox aria-label={label} onIonChange={(e) => setBool(prop, e.detail.checked)} checked={ms[prop] || false} />
	);
};
const RangeItem = (props: {
	prop: MSNum,
	start: string | undefined,
	end: string | undefined,
	innerClass: string | undefined,
	max?: number,
	className?: string
}) => {
	const dispatch = useDispatch();
	const ms = useSelector((state: StateObject) => state.ms)
	const {
		prop,
		start = "",
		end = "",
		innerClass = "",
		max = 4,
		className
	} = props;
	const what = prop as MSNum;
	const classes = className ? className + " content" : "content";
	const setNum = useCallback((what: MSNum, value: number) => {
		dispatch(setSyntaxNum([what, value]));
	}, [dispatch]);
	return (
		<IonItem className={classes}>
			<IonRange
				aria-label={`Range from ${start} to ${end}`}
				onIonChange={(e) => setNum(what, e.target.value as number)}
				value={ms[what] || 0}
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
const TextItem = (props: {
	placeholder?: string,
	prop: MSText,
	rows?: number,
	className?: string,
	label?: string,
	children: any
}) => {
	const {
		placeholder = "",
		prop,
		rows = 3,
		className,
		label = "",
		children
	} = props;
	const dispatch = useDispatch();
	const ms = useSelector((state: StateObject) => state.ms);
	const text = ms[prop as MSText] || "";
	const classes = className ? className + " " : "";
	const setText = (what: MSText, value: string) => {
		dispatch(setSyntaxText([what, value]));
	};
	const expandedRows = Math.min(Math.max(rows, text.split(/\n/).length), 12);
	return (
		<>
			<IonItem className={`${classes} morphoSyntaxTextItem content labelled`}>
				<IonLabel>{children}</IonLabel>
			</IonItem>
			<IonItem className={`${classes} morphoSyntaxTextItem content`}>
				<IonTextarea aria-label={label} onIonChange={(e) => setText(prop, e.target.value || "")} value={text} placeholder={placeholder} rows={expandedRows} enterkeyhint="done" inputmode="text" />
			</IonItem>
		</>
	);
};
const HeaderItem = (props: { level?: number, children: any }) => (
	<IonItem className={"h" + (props.level ? " h" + String(props.level) : "")}>
		<IonLabel>{props.children}</IonLabel>
	</IonItem>
);
const TransTable = (props: {
	rows?: string,
	className?: string,
	children: any
}) => {
	const {
		rows,
		className,
		children
	} = props;
	const tableRows = (rows || "").trim().split(/\s+\/\s+/);
	let length = 1;
	const cName = "translation" + (className ? " " + className : "");
	const finalRow = children ? tableRows.length : -1;
	children && tableRows.push(children);
	const mainRows = tableRows.filter((row: string) => row).map((row: string, i: number) => {
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
interface InfoModalProps extends ModalProperties {
	label?: string,
	className?: string,
	children: any,
}
const InfoModal = (props: InfoModalProps) => {
	const [modalOpen, setModalOpen] = useState<boolean>(false);
	const dispatch = useDispatch();
	const {
		title = "MISSING TITLE",
		label = "Read About It",
		className,
		children,
		modalPropsMaker
	} = props;
	const {isOpen, setIsOpen} = modalPropsMaker(modalOpen, setModalOpen, dispatch);
	return (
		<IonItem className={className ? className + " infoModal" : "infoModal"}>
			<IonModal isOpen={isOpen} onDidDismiss={() => setIsOpen(false)}>
				<IonHeader>
					<IonToolbar color="primary">
						<IonTitle>{title}</IonTitle>
					</IonToolbar>
				</IonHeader>
				<IonContent className="morphoSyntaxModal">
					<IonList lines="none">
						<IonItem>
							{children}
						</IonItem>
					</IonList>
				</IonContent>
				<IonFooter>
					<IonToolbar className="ion-text-wrap">
						<IonButtons slot="end">
							<IonButton onClick={() => setIsOpen(false)} slot="end" fill="solid" color="success">
								<IonIcon icon={checkmarkCircleOutline} slot="start" />
								<IonLabel>Done</IonLabel>
							</IonButton>
						</IonButtons>
					</IonToolbar>
				</IonFooter>
			</IonModal>
			<IonButton color="primary" onClick={() => setIsOpen(true)}>
				<IonIcon icon={informationCircleSharp} slot="start" style={{ marginInlineStart: "0", marginInlineEnd: "0.5rem"}} />
				{label}
			</IonButton>
		</IonItem>
	);
};
export interface exportProp {
	title: string
	output?: ( (string | [string, string])[] )[]
	labels?: string[]
	labelOverrideDocx?: boolean
}
export interface displayProp {
	boxesPerRow: number
	rowLabels: string[]
	class?: string
	labels?: string[]
	labelClass?: string
	header?: string
	inlineHeaders?: string[]
	singleHeader?: string
	export?: exportProp
}
interface checkboxItemProps {
	boxes: MSBool[],
	display: displayProp
}
const CheckboxItem = (props: checkboxItemProps) => {
	const {
		display,
		boxes = []
	} = props;
	const {
		rowLabels,
		boxesPerRow,
		labels = [],
		header,
		inlineHeaders,
		labelClass = "label"
	} = display;
	const _rowLabels = rowLabels.slice();
	const _labels = labels.slice();
	let count = 0;
	const rows: MSBool[][] = [];
	let temp: MSBool[] = [];
	boxes.forEach((box) => {
		count++;
		temp.push(box || "Error");
		if(count >= boxesPerRow) {
			count = 0;
			rows.push(temp);
			temp = [];
		}
	});
	const printRow = (row: MSBool[], label: string, key: number, headers: undefined | string[]) => {
		const textLabel = stripHtml(label);
		let cc = 0;
		return (
			<IonRow key={"ROW-" + String(key)}>
				{row.map((prop, i) => (
					<IonCol className="cbox" key={"X-" + String(cc++)}>
						<RadioBox label={headers ? `${stripHtml(headers[i])}, ${textLabel}` : textLabel} prop={prop} />
					</IonCol>
				))}
				<IonCol key={"LX-" + String(cc++)}><div>{doParse(label)}</div></IonCol>
			</IonRow>
		);
	};
	const printRowWithLabel = (row: MSBool[], final: string, key: number, headers: undefined | string[]) => {
		const label = _labels.shift() || "";
		const textLabel = stripHtml(label) + (final ? ", " + stripHtml(final) : "") ;
		let cc = 0;
		return (
			<IonRow key={"ROW-" + String(key)}>
				{row.map((prop, i) => (
					<IonCol className="cbox" key={"C-" + String(cc++)}>
						<RadioBox label={headers ? `${stripHtml(headers[i])}, ${textLabel}` : textLabel} prop={prop} />
					</IonCol>
				))}
				{label ?
					<IonCol className={labelClass} key={"LC-" + String(cc++)}>
						<div>{doParse(label)}</div>
					</IonCol>
				:
					<></>
				}
				<IonCol key={"FC-" + String(cc++)}><div>{doParse(final)}</div></IonCol>
			</IonRow>
		);
	};
	const printHeaderRow = (row: string[], key: number, hasLabel = false) => {
		const final = row.pop() || "";
		const label = hasLabel ? row.pop() : undefined;
		let cc = 0;
		return (
			<IonRow className="header" key={"ROW-" + String(key)}>
				{row.map((c) => <IonCol className="cbox" key={"B-" + String(cc++)}>{c}</IonCol>)}
				{label && <IonCol className={labelClass} key={"L-" + String(cc++)}><div>{doParse(label)}</div></IonCol>}
				<IonCol key={"F-" + String(cc++)}><div>{doParse(final)}</div></IonCol>
			</IonRow>
		);
	};
	count = 1;
	return (
		<IonItem className="content">
			<IonGrid className={display.class}>
				{ header ?
					<IonRow key="headerRow-0" className="header">
						<IonCol><div>{doParse(header)}</div></IonCol>
					</IonRow>
				:
					<></>
				}
				{ inlineHeaders ?
					printHeaderRow(inlineHeaders.slice(), count++, !!labels)
				:
					<></>
				}
				{ rows.map((row) => (
					labels ?
						printRowWithLabel(row.slice(), _rowLabels.shift() || "Error", count++, inlineHeaders && inlineHeaders.slice())
					:
						printRow(row.slice(), _rowLabels.shift() || "Error", count++, inlineHeaders && inlineHeaders.slice())
				))}
			</IonGrid>
		</IonItem>
	);
};

export interface specificPageInfo {
	tag: string
	level?: number
	content?: string
	title?: string
	label?: string
	prop?: MSNum | MSText
	rows?: number
	start?: string
	end?: string
	spectrum?: boolean
	max?: number
	boxes?: MSBool[]
	display?: displayProp
}
interface parsingProp {
	page: keyof (typeof ms),
	modalPropsMaker: Function
}
export const parseMSJSON = (props: parsingProp) => {
	const {
		page,
		modalPropsMaker
	} = props;
	const doc = ms[page] as specificPageInfo[];
	const key = page + "-";
	let counter = 0;
	return doc.map((bit) => {
		counter++;
		const {
			tag = "",
			level,
			content = "",
			prop,
			start,
			end,
			spectrum,
			max,
			rows,
			label,
			title,
			display,
			boxes = []
		}: specificPageInfo = bit;
		switch(tag) {
			case "Header":
				return <HeaderItem key={key + String(counter)} level={level}>{content}</HeaderItem>;
			case "Range":
				return <RangeItem key={key + String(counter)} prop={prop as MSNum} start={start} end={end} innerClass={spectrum ? "spectrum" : undefined} max={max} />;
			case "Text":
				return <TextItem key={key + String(counter)} prop={prop as MSText} rows={rows} label={label || ""}>{content}</TextItem>
			case "Modal":
				return <InfoModal key={key + String(counter)} title={title} label={label} modalPropsMaker={modalPropsMaker}>{
					doParse(content, {
						replace: node => {
							if(node instanceof Element && node.attribs && node.name === "transtable") {
								return <TransTable rows={node.attribs.rows} className={node.attribs.className || ""}>{node.children.length ? (node.children[0] as Text).data : ""}</TransTable>;
							}
							return node;
						}
					})
				}</InfoModal>;
			case "Checkboxes":
				return display ?
					<CheckboxItem key={key + String(counter)} display={display} boxes={boxes} />
				:
					<div>CHECKBOX DISPLAY ERROR</div>
				;
		}
		return "";
	});
};

export default SyntaxHeader;