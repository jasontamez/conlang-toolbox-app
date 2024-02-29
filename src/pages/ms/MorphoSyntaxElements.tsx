import React, { FC, PropsWithChildren, useCallback, useState } from 'react';
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
	IonCol,
	CheckboxChangeEventDetail
} from '@ionic/react';
import { checkmarkCircleOutline, helpCircleOutline, informationCircleSharp } from 'ionicons/icons';
import { useDispatch } from "react-redux";
import doParse from 'html-react-parser';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm'

import {
	setSyntaxBool,
	setSyntaxText
} from '../../store/msSlice';
import { MSBool, MSNum, MSText, ModalPropsMaker } from '../../store/types';
import useTranslator from '../../store/translationHooks';

import { tMaker, tc } from '../../components/translators';
import Header from '../../components/Header';

interface ModalProperties {
	title?: string
	modalPropsMaker: ModalPropsMaker
}

const t = tMaker({ ns: "ms"});

export const SyntaxHeader = (props: ModalProperties) => {
	const [ tc ] = useTranslator('common');
	const {
		title,
		modalPropsMaker
	} = props;
	return (
		<Header
			extraChars={modalPropsMaker}
			title={title || tc("MorphoSyntax")}
			endButtons={[
				<IonButton key="msHelpButton" routerLink="/ms/overview" routerDirection="forward">
					<IonIcon icon={helpCircleOutline} />
				</IonButton>
			]}
		/>
	);
};
const RadioBox = (props: {
	prop: MSBool,
	label: string,
	checked: boolean | undefined
}) => {
	const dispatch = useDispatch();
	const {prop, label, checked} = props;
	const onChange = useCallback(
		(e: CustomEvent<CheckboxChangeEventDetail<any>>) =>
			dispatch(setSyntaxBool([prop, e.detail.checked])),
		[dispatch, prop]
	);
	return (
		<IonCheckbox
			aria-label={label}
			onIonChange={onChange}
			checked={checked}
		/>
	);
};
export const TextItem = (props: PropsWithChildren<{
	placeholder?: string,
	prop: MSText,
	rows?: number,
	className?: string,
	label?: string,
	value?: string
}>) => {
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
export const HeaderItem = (props: PropsWithChildren<{ level?: number }>) => (
	<IonItem className={"h" + (props.level ? " h" + String(props.level) : "")}>
		<IonLabel>{props.children}</IonLabel>
	</IonItem>
);
interface TransProps {
	rows?: string
	className?: string
	convertedRows?: string[]
}
export const TransTable = (props: PropsWithChildren<TransProps>) => {
	const {
		rows,
		className,
		convertedRows,
		children
	} = props;
	const tableRows = convertedRows || (rows || "").trim().split(/\s+\/\s+/);
	let length = 1;
	const cName = "translation" + (className ? " " + className : "");
	const finalRow = children ? tableRows.length : -1;
	children && tableRows.push(children as string);
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
	label?: string
	className?: string
}
export const InfoModal = (props: PropsWithChildren<InfoModalProps>) => {
	const [modalOpen, setModalOpen] = useState<boolean>(false);
	const {
		title,
		label,
		className,
		children,
		modalPropsMaker
	} = props;
	const {isOpen, setIsOpen} = modalPropsMaker(modalOpen, setModalOpen);
	return (
		<IonItem className={className ? className + " infoModal" : "infoModal"}>
			<IonModal isOpen={isOpen} onDidDismiss={() => setIsOpen(false)}>
				<IonHeader>
					<IonToolbar color="primary">
						<IonTitle>{title || t("MISSING TITLE")}</IonTitle>
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
								<IonLabel>{tc("Done")}</IonLabel>
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
				{label || t("Read About It")}
			</IonButton>
		</IonItem>
	);
};
export interface exportProp {
	output?: ( (string | [MSBool, string][])[] )[]
	labelOverrideDocx?: boolean
	i18: string
	header?: string
	labels?: string[]
	textOutputBooleans: MSBool[][]
}
export interface displayProp {
	boxesPerRow: number
	class?: string
	labelClass?: string
	singleHeader?: string
	export?: exportProp
	i18: string
}
export interface CheckboxTransProps {
	header?: string
	columnHeaders?: string[]
	labels: string[] | [string, string][]
}
export interface CheckboxTransExportProps {
	header: string
	labels?: string[]
	textFormat?: {
		chosenHeaders: string[]
		chosenLabelsInOrder: string[]
	}
}
interface checkboxItemProps {
	boxes: MSBool[],
	values: (boolean | undefined)[]
	display: displayProp
}
interface CheckboxRowProps {
	row: MSBool[],
	values: (boolean | undefined)[],
	label: string | [string, string],
	id: string,
	headers: undefined | string[]
}
const CheckboxRow: FC<CheckboxRowProps> = (props) => {
	const {
		row,
		values,
		label,
		id,
		headers
	} = props;
	const labels = Array.isArray(label) ? label : [ label ];
	return (
		<IonRow key={`ROW-${id}`}>
			{row.map((prop, i) => (
				<IonCol className="cbox" key={`COL-${id}-${i}`}>
					<RadioBox
						label={headers ? `${t(headers[i])}, ${t(labels.join(", "))}` : t(labels.join(", "))}
						prop={prop}
						checked={values[i]}
					/>
				</IonCol>
			))}
			{labels.map((label, i) => (
				<IonCol key={`LABEL-${id}-${i}`}><div>{t(label)}</div></IonCol>
			))}
		</IonRow>
	);
};
interface HeaderRowProps {
	row: string[]
	id: string
	hasLabel: boolean
	labelClass: string
}
const HeaderRow: FC<HeaderRowProps> = (props) => {
	const {
		row,
		id,
		hasLabel,
		labelClass
	} = props;
	const final = row.pop() || "";
	const label = hasLabel ? row.pop() : undefined;
	return (
		<IonRow className="header">
			{row.map(
				(c, i) => <IonCol className="cbox" key={`B-${id}-${i}`}>{c}</IonCol>
			)}
			{
				label ?
					<IonCol
						className={labelClass}
						key={`L-${id}`}
					><div>{doParse(label)}</div></IonCol>
				:
					<></>
			}
			<IonCol key={`F-${id}`}><div>{doParse(final)}</div></IonCol>
		</IonRow>
	);
};
export const CheckboxItem = (props: checkboxItemProps) => {
	const [ t ] = useTranslator();
	const {
		display,
		boxes = [],
		values = []
	} = props;
	const {
		i18,
		boxesPerRow,
		labelClass = "label"
	} = display;
	const {
		labels,
		header,
		columnHeaders
	} = t(i18, { returnObjects: true }) as CheckboxTransProps;
	let count = 0;
	const rows: MSBool[][] = [];
	let temp: MSBool[] = [];
	let temp2: (boolean | undefined)[] = [];
	const rowValues: (boolean | undefined)[][] = [];
	const error = tc("error");
	boxes.forEach((box, i) => {
		count++;
		temp.push(box || error);
		temp2.push(values[i]);
		if(count >= boxesPerRow) {
			count = 0;
			rows.push(temp);
			rowValues.push(temp2);
			temp = [];
			temp2 = [];
		}
	});
	count = 1;
	const key = boxes.join(",");
	return (
		<IonItem className="content">
			<IonGrid className={display.class}>
				{ header ?
					<IonRow key={`HEADER-ROW-${key}-0`} className="header">
						<IonCol><div>{doParse(header)}</div></IonCol>
					</IonRow>
				:
					<></>
				}
				{ columnHeaders ?
					<HeaderRow
						key={`HEADER-ROW-${key}`}
						row={columnHeaders.slice()}
						id={key}
						hasLabel={!!labels}
						labelClass={labelClass}
					/>
				:
					<></>
				}
				{ rows.map((row, i) => (
					<CheckboxRow
						row={row.slice()}
						key={key}
						values={rowValues[i].slice()}
						label={labels[i] || error }
						id={key}
						headers={columnHeaders && columnHeaders.slice()}
					/>
				))}
			</IonGrid>
		</IonItem>
	);
};

const TDMarkdown: FC<{children: string, length?: number}> = (props) => {
	const { children, length } = props;
	return (
		<Markdown
			remarkPlugins={[remarkGfm]}
			components={{
				p: (pprops) => <td {...(length ? { colSpan: length } : {})}>{pprops.children}</td>
			}}
		>{children}</Markdown>
	);
};

export const MSMarkdown: FC<{children: string}> = (props) => {
	return (
		<Markdown
			remarkPlugins={[remarkGfm]}
			components={{
				code: (codeprops) => {
					const { children } = codeprops;
					if(typeof(children) === "string") {
						if(children.indexOf("[translationTable]") !== 0) {
							// return the plain string
							return children as string;
						}
						// Look for a plain text section
						const [info, text] =
							children.slice(18).trim()
//								.replace(/\[-\]/g, String.fromCodePoint(0x00ad)) // turn [-] into &shy;
								.split(" ||| ");
						// Split into rows
						let length = 1;
						const rows = info.split(" || ").map((row, i) => {
							const cells = row.split(" | ").map((cell, j) => {
								return <TDMarkdown key={`TD-${i}-${j}-${cell}`}>{cell}</TDMarkdown>;
							});
							length = Math.max(length, cells.length);
							return <tr key={`ROW-${i}-${row}`}>{cells}</tr>;
						});
						if(text) {
							rows.push(<tr key={`ROW-FINAL-${text}`}><TDMarkdown length={length}>{text}</TDMarkdown></tr>);
						}
						return <div className="scrollable"><table className="translation"><tbody>{rows}</tbody></table></div>;
					}
					return `${children}`;
				},
				table: (tableprops) => {
					const { node, ...rest } = tableprops;
					return <table {...rest} className="informational" />;
				},
				li: (liprops) => {
					const { node, children, ...rest } = liprops;
					if(typeof children === "string") {
						if(children.indexOf("[newSection]") === 0) {
							return <li {...rest} className="newSection">{children.slice(12)}</li>;
						}
					} else if (Array.isArray(children)) {
						const [tester, ...kids] = children;
						if(typeof tester === "string" && tester.indexOf("[newSection]") === 0) {
							if(tester.length > 12) {
								kids.unshift(tester.slice(12));
							}
							return <li {...rest} className="newSection">{kids}</li>;
						}
					} else {
						console.log("NON-STRING, NON-ARRAY CHILDREN");
						console.log(children);
						console.log({...liprops});
					}
					return <li {...rest}>{children}</li>;
				}
			}}
		>{props.children}</Markdown>
	);
};

export interface specificPageInfo {
	tag: string
	level?: number
	heads?: (MSBool | MSText | true)[]
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
