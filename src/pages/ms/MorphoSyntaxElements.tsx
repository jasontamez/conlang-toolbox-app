import React, { useState } from 'react';
import {
	IonHeader,
	IonToolbar,
	IonTitle,
	IonButtons,
	IonButton,
	IonIcon,
	IonList,
	IonItem,
	IonLabel,
	IonContent,
	IonCheckbox,
	IonTextarea,
	IonModal,
	IonFooter,
	IonGrid,
	IonRow,
	IonCol
} from '@ionic/react';
import { checkmarkCircleOutline, informationCircleSharp } from 'ionicons/icons';
import { useDispatch } from "react-redux";
import doParse from 'html-react-parser';

import {
	setSyntaxBool,
	setSyntaxText
} from '../../store/msSlice';
import { MSBool, MSNum, MSText } from '../../store/types';

import Header from '../../components/Header';

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
	return (
		<Header extraChars={modalPropsMaker} title={title} />
	);
};
const RadioBox = (props: {
	prop: MSBool,
	label: string,
	checked: boolean | undefined
}) => {
	const dispatch = useDispatch();
	const {prop, label, checked} = props;
	const setBool = (what: MSBool, value: boolean) => {
		dispatch(setSyntaxBool([what, value]));
	};
	return (
		<IonCheckbox
			aria-label={label}
			onIonChange={(e) => setBool(prop, e.detail.checked)}
			checked={checked}
		/>
	);
};
export const TextItem = (props: {
	placeholder?: string,
	prop: MSText,
	rows?: number,
	className?: string,
	label?: string,
	value?: string,
	children: any
}) => {
	const {
		placeholder = "",
		prop,
		rows = 3,
		className,
		label = "",
		value = "",
		children
	} = props;
	const dispatch = useDispatch();
	const classes = className ? className + " " : "";
	const setText = (what: MSText, value: string) => {
		dispatch(setSyntaxText([what, value]));
	};
	const expandedRows = Math.min(Math.max(rows, value.split(/\n/).length), 12);
	return (
		<>
			<IonItem className={`${classes}morphoSyntaxTextItem content labelled`}>
				<IonLabel>{children}</IonLabel>
			</IonItem>
			<IonItem className={`${classes}morphoSyntaxTextItem content`}>
				<IonTextarea
					aria-label={label}
					onIonChange={(e) => setText(prop, e.target.value || "")}
					value={value}
					placeholder={placeholder}
					rows={expandedRows}
					enterkeyhint="done"
					inputmode="text"
				/>
			</IonItem>
		</>
	);
};
export const HeaderItem = (props: { level?: number, children: any }) => (
	<IonItem className={"h" + (props.level ? " h" + String(props.level) : "")}>
		<IonLabel>{props.children}</IonLabel>
	</IonItem>
);
interface TransProps {
	rows?: string
	className?: string
	children?: any
}
export const TransTable = (props: TransProps) => {
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
		return (
			<tr key={"ROW-" + String(i)}>{
				tds.filter((el: string) => el).map(
					(el: string, i: number) => <td key={"TD-" + String(i)}>{el.replace(/__/g, " ")}</td>
				)
			}</tr>
		);
	});
	return <div className="scrollable"><table className={cName}><tbody>{mainRows}</tbody></table></div>;
};
interface InfoModalProps extends ModalProperties {
	label?: string,
	className?: string,
	children: any,
}
export const InfoModal = (props: InfoModalProps) => {
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
							<IonButton
								onClick={() => setIsOpen(false)}
								slot="end"
								fill="solid"
								color="success"
							>
								<IonIcon
									icon={checkmarkCircleOutline}
									slot="start"
								/>
								<IonLabel>Done</IonLabel>
							</IonButton>
						</IonButtons>
					</IonToolbar>
				</IonFooter>
			</IonModal>
			<IonButton color="primary" onClick={() => setIsOpen(true)}>
				<IonIcon
					icon={informationCircleSharp}
					className="msModalHelpIcon"
					slot="start"
				/>
				{label}
			</IonButton>
		</IonItem>
	);
};
export interface exportProp {
	title: string
	output?: ( (string | [string, string][])[] )[]
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
	values: (boolean | undefined)[]
	display: displayProp
}
export const CheckboxItem = (props: checkboxItemProps) => {
	const {
		display,
		boxes = [],
		values = []
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
	let temp2: (boolean | undefined)[] = [];
	const rowValues: (boolean | undefined)[][] = [];
	boxes.forEach((box, i) => {
		count++;
		temp.push(box || "Error");
		temp2.push(values[i]);
		if(count >= boxesPerRow) {
			count = 0;
			rows.push(temp);
			rowValues.push(temp2);
			temp = [];
			temp2 = [];
		}
	});
	const printRow = (
		row: MSBool[],
		values: (boolean | undefined)[],
		label: string,
		key: number,
		headers: undefined | string[]
	) => {
		const textLabel = stripHtml(label);
		let cc = 0;
		return (
			<IonRow key={"ROW-" + String(key)}>
				{row.map((prop, i) => (
					<IonCol className="cbox" key={"X-" + String(cc++)}>
						<RadioBox
							label={headers ? `${stripHtml(headers[i])}, ${textLabel}` : textLabel}
							prop={prop}
							checked={values[i]}
						/>
					</IonCol>
				))}
				<IonCol key={"LX-" + String(cc++)}><div>{doParse(label)}</div></IonCol>
			</IonRow>
		);
	};
	const printRowWithLabel = (
		row: MSBool[],
		values: (boolean | undefined)[],
		final: string,
		key: number,
		headers: undefined | string[]
	) => {
		const label = _labels.shift() || "";
		const textLabel = stripHtml(label) + (final ? ", " + stripHtml(final) : "") ;
		let cc = 0;
		return (
			<IonRow key={"ROW-" + String(key)}>
				{row.map((prop, i) => (
					<IonCol className="cbox" key={"C-" + String(cc++)}>
						<RadioBox
							label={headers ? `${stripHtml(headers[i])}, ${textLabel}` : textLabel}
							prop={prop}
							checked={values[i]}
						/>
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
	const printHeaderRow = (
		row: string[],
		key: number,
		hasLabel = false
	) => {
		const final = row.pop() || "";
		const label = hasLabel ? row.pop() : undefined;
		let cc = 0;
		return (
			<IonRow className="header" key={"ROW-" + String(key)}>
				{row.map(
					(c) => <IonCol className="cbox" key={"B-" + String(cc++)}>{c}</IonCol>
				)}
				{
					label ?
						<IonCol
							className={labelClass}
							key={"L-" + String(cc++)}
						><div>{doParse(label)}</div></IonCol>
					:
						<></>
				}
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
				{ rows.map((row, i) => (
					labels ?
						printRowWithLabel(
							row.slice(),
							rowValues[i].slice(),
							_rowLabels.shift() || "Error",
							count++,
							inlineHeaders && inlineHeaders.slice()
						)
					:
						printRow(
							row.slice(),
							rowValues[i].slice(),
							_rowLabels.shift() || "Error",
							count++,
							inlineHeaders && inlineHeaders.slice()
						)
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
