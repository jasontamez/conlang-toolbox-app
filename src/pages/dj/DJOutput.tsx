import React, { ReactElement, useEffect, useMemo, useState } from 'react';
import {
	IonContent,
	IonPage,
	IonList,
	IonItem,
	IonSelect,
	IonSelectOption,
	IonToggle,
	IonButton,
	IonIcon,
	useIonToast,
	useIonAlert,
	AlertInput
} from '@ionic/react';
import { useDispatch, useSelector } from "react-redux";
import {
	caretForwardCircleOutline,
	codeDownloadOutline,
	helpCircleOutline,
	copyOutline
} from 'ionicons/icons';

import useTranslator from '../../store/translationHooks';
import { DJCustomInfo, PageData, SortObject, StateObject } from '../../store/types';
//import { addItemsToLexiconColumn } from '../../store/lexiconSlice';

//import { $a, $i } from '../../components/DollarSignExports';
import toaster from '../../components/toaster';
//import { LexiconOutlineIcon } from '../../components/icons';
//import PermanentInfo from '../../components/PermanentInfo';
import {
	DJDisplayData,
	DJDisplayMethods,
	DJFormatTypes,
	DJTypeObject,
	display,
	exporter,
	findCommons
} from '../../components/DJOutputFormat';
import copyText from '../../components/copyText';
import makeSorter from '../../components/stringSorter';
import PermanentInfo from '../../components/PermanentInfo';
import Header from '../../components/Header';
import ModalWrap from '../../components/ModalWrap';
import { OutputCard } from './DJinfo';

const DJOutput = (props: PageData) => {
//	const { modalPropsMaker } = props;
	const dispatch = useDispatch();
	const [doAlert] = useIonAlert();
	const [ t ] = useTranslator('dj');
	const [ tc ] = useTranslator('common');
	const toast = useIonToast();
//	const navigator = useIonRouter();
	const [isOpenInfo, setIsOpenInfo] = useState<boolean>(false);

	// Settings
	const [displayType, setDisplayType] = useState<DJDisplayMethods>("chartTH");
	const [usingInput, setUsingInput] = useState<boolean>(false);
	const [showUnmatched, setShowUnmatched] = useState<boolean>(false);
	const [showGroupInfo, setShowGroupInfo] = useState<boolean>(true);
	const [sortInput, setSortInput] = useState<boolean>(false);
	const [showExamples, setShowExamples] = useState<boolean>(true);
	const [wordsMatchOneTimeOnly, setWordsMatchOneTimeOnly] = useState<boolean>(false);

	// Display
	const [type, setType] = useState<(keyof DJCustomInfo)[]>([]);
	const [typeObj, setTypeObj] = useState<DJTypeObject>({});
	const [displayOutput, setDisplayOutput] = useState<ReactElement[]>([]);
	const [displayUnmatched, setDisplayUnmatched] = useState<ReactElement[]>([]);
	const [copyStrings, setCopyStrings] = useState<string[]>([]);
	const { declensions, conjugations, other, input } = useSelector((state: StateObject) => state.dj);
	const numberOfTypes =
		(declensions.length > 0 ? 1 : 0)
		+ (conjugations.length > 0 ? 1 : 0)
		+ (other.length > 0 ? 1 : 0);
	const {
		sortLanguage,
		sensitivity,
		defaultCustomSort,
		customSorts
	} = useSelector((state: StateObject) => state.sortSettings);
	const defaultSortLanguage = useSelector((state: StateObject) => state.internals.defaultSortLanguage);

	useEffect(() => {
		const types: (keyof DJCustomInfo)[] = [];
		declensions.length > 0 && types.push("declensions");
		conjugations.length > 0 && types.push("conjugations");
		other.length > 0 && types.push("other");
		setType(types);
	}, [declensions, conjugations, other]);
	useEffect(() => {
		const obj: DJTypeObject = {};
		type.forEach(key => (obj[key] = true));
		setTypeObj(obj);
	}, [type]);

	// Memoized stuff
	const sortObject = useMemo(() => {
		let defaultCustomSortObj: SortObject | undefined;
		customSorts.concat(PermanentInfo.sort.permanentCustomSortObjs).every(obj => {
			if (obj.id === defaultCustomSort) {
				defaultCustomSortObj = obj;
			}
			return !(defaultCustomSortObj);
		});
		return makeSorter(
			sortLanguage || defaultSortLanguage,
			sensitivity,
			defaultCustomSortObj
		);
	}, [customSorts, defaultCustomSort, defaultSortLanguage, sensitivity, sortLanguage]);
	const data: DJDisplayData = useMemo(() => {
		if(usingInput) {
			// Grab input, removing duplicates
			const newInput = [...(new Set(input.split(/\n/)))];
			//
			// Handle alphabetization
			if(sortInput) {
				newInput.sort(sortObject);
			}
			// Return data
			return {
				input: newInput,
				showGroupInfo,
				showExamples,
				wordsMatchOneTimeOnly
			};
		}
		// Not using input? Leave as null.
		return null;
	}, [usingInput, input, sortInput, sortObject, showGroupInfo, showExamples, wordsMatchOneTimeOnly]);

	const doExport = (format: null | "" | undefined | DJFormatTypes) => {
		if(!format) {
			return toaster({
				message: t("You didn't select a format."),
				color: "danger",
				duration: 3000,
				toast
			});
		}
		exporter(
			typeObj,
			declensions,
			conjugations,
			other,
			data,
			displayType,
			format,
			data ? showUnmatched : null,
			dispatch,
			toast
		);
	};

	const maybeDoExport = () => {
		if(type.length === 0) {
			return toaster({
				message: t("Please choose at least one group to display."),
				color: "danger",
				toast
			});
		}
		const inputs: AlertInput[] = [
			{
				label: tc("Word Document (docx)"),
				type: "radio",
				value: "docx"
			},
			{
				label: tc("Text File"),
				type: "radio",
				value: "text"
			}
		];
		displayType !== "text" && inputs.unshift({
			label: tc("Spreadsheet (csv)"),
			type: "radio",
			value: "csv"
		});
		doAlert({
			header: tc("Choose a Format"),
			inputs,
			buttons: [
				{
					text: tc("Cancel"),
					role: "cancel",
					cssClass: "cancel"
				},
				{
					text: tc("Export"),
					cssClass: "submit",
					handler: doExport
				}
			]
		});
	};

	const doGenerate = () => {
		if(type.length === 0) {
			return toaster({
				message: t("Please choose at least one group to display."),
				color: "danger",
				toast
			});
		}
		const output: ReactElement[] = [];
		const toCopy: string[] = [];
		const unmatched: string[][] = [];
		const {declensions: dec, conjugations: con, other: oth} = typeObj;
		let newData: DJDisplayData = data && {...data};
		function handleRemainder (data: DJDisplayData, remainder: string[]) {
			if(data && data.wordsMatchOneTimeOnly) {
				newData = {
					...data,
					input: remainder
				};
				return;
			}
			unmatched.push(remainder);
		}
		if (dec) {
			const [els, remainder, copy] = display(declensions, newData, displayType, "declensions");
			output.push(...els);
			toCopy.push(copy);
			handleRemainder(newData, remainder);
		}
		if (con) {
			const [els, remainder, copy] = display(conjugations, newData, displayType, "conjugations");
			output.push(...els);
			toCopy.push(copy);
			handleRemainder(newData, remainder);
		}
		if (oth) {
			const [els, remainder, copy] = display(other, newData, displayType, "other");
			output.push(...els);
			toCopy.push(copy);
			handleRemainder(newData, remainder);
		}
		setCopyStrings(toCopy);
		setDisplayOutput(output);
		// Handle unmatched
		if(showUnmatched) {
			const unfound: string[] = (newData && newData.wordsMatchOneTimeOnly) ? newData.input : findCommons(unmatched);
			setDisplayUnmatched(unfound.length > 0 ? [
				<div className="unmatchedWords" key="unmatched:all">
					<div className="title">{t("Unmatched Words")}</div>
					<div className="contents">{
						unfound.map((word, i) => <span key={`unmatched:${word}:${i}`}>{word}</span>)
					}</div>
				</div>
			] : []);
		} else {
			setDisplayUnmatched([]);
		}
	};

	return (
		<IonPage>
			<ModalWrap {...props.modalPropsMaker(isOpenInfo, setIsOpenInfo)}>
				<OutputCard setIsOpenInfo={setIsOpenInfo} />
			</ModalWrap>
			<Header
				title={tc("Output")}
				endButtons={[
					<IonButton key="djOutputHelpButton" aria-label={tc("Help")} onClick={() => setIsOpenInfo(true)}>
						<IonIcon icon={helpCircleOutline} />
					</IonButton>
				]}
			/>
			<IonContent className="hasFabButton">
				<IonList lines="full" className="djOutput hasToggles">
					<IonItem>
						<IonSelect
							color="primary"
							className="ion-text-wrap settings"
							label={t("Display as", { context: "presentation" })}
							value={displayType}
							onIonChange={(e) => setDisplayType(e.detail.value)}
						>
							<IonSelectOption
								className="ion-text-wrap ion-text-align-end"
								value="chartTH"
							>{t("Chart, Top Headers")}</IonSelectOption>
							<IonSelectOption
								className="ion-text-wrap ion-text-align-end"
								value="chartSH"
							>{t("Chart, Side Headers")}</IonSelectOption>
							<IonSelectOption
								className="ion-text-wrap ion-text-align-end"
								value="text"
							>{t("Text")}</IonSelectOption>
						</IonSelect>
					</IonItem>
					{
						numberOfTypes > 1 ?
							(
								<IonItem>
									<IonSelect
										color="primary"
										className="ion-text-wrap settings"
										label="Group(s):"
										value={type}
										onIonChange={(e) => setType(e.detail.value)}
										multiple
									>
										{
											declensions.length > 0 ?
												(
													<IonSelectOption
														className="ion-text-wrap ion-text-align-end"
														value="declensions"
													>{t("Declensions")}</IonSelectOption>
												)
											:
												<></>
										}
										{
											conjugations.length > 0 ?
												(
													<IonSelectOption
														className="ion-text-wrap ion-text-align-end"
														value="conjugations"
													>t{("Conjugations")}</IonSelectOption>
												)
											:
												<></>
										}
										{
											other.length > 0 ?
												(
													<IonSelectOption
														className="ion-text-wrap ion-text-align-end"
														value="other"
													>{t("Other")}</IonSelectOption>
												)
											:
												<></>
										}
									</IonSelect>
								</IonItem>
							)
						:
							<></>
					}
					<IonItem className="wrappableInnards">
						<IonToggle
							labelPlacement="start"
							enableOnOffLabels
							checked={usingInput}
							onIonChange={e => setUsingInput(!usingInput)}
						>
							<h2>{t("Use Input")}</h2>
							<p>{t("Display the declensions/conjugations of words in the input.")}</p>
						</IonToggle>
					</IonItem>
					<IonItem
						className={"wrappableInnards toggleable" + (usingInput ? "" : " toggled")}
					>
						<IonToggle
							labelPlacement="start"
							enableOnOffLabels
							checked={showGroupInfo}
							onIonChange={e => setShowGroupInfo(!showGroupInfo)}
						>
							<h2>{t("Show Group Info")}</h2>
							<p>{t("Include general group information.")}</p>
						</IonToggle>
					</IonItem>
					<IonItem
						className={"wrappableInnards toggleable" + (usingInput ? "" : " toggled")}
					>
						<IonToggle
							labelPlacement="start"
							enableOnOffLabels
							checked={showExamples}
							onIonChange={e => setShowExamples(!showExamples)}
						>
							<h2>{t("Show Examples")}</h2>
							<p>{t("Include generic example.")}</p>
						</IonToggle>
					</IonItem>
					<IonItem
						className={"wrappableInnards toggleable" + (usingInput ? "" : " toggled")}
					>
						<IonToggle
							labelPlacement="start"
							enableOnOffLabels
							checked={sortInput}
							onIonChange={e => setSortInput(!sortInput)}
						>
							<h2>{t("Sort Input")}</h2>
						</IonToggle>
					</IonItem>
					<IonItem
						className={"wrappableInnards toggleable" + (usingInput ? "" : " toggled")}
					>
						<IonToggle
							labelPlacement="start"
							enableOnOffLabels
							checked={wordsMatchOneTimeOnly}
							onIonChange={e => setWordsMatchOneTimeOnly(!wordsMatchOneTimeOnly)}
						>
							<h2>{t("One Match")}</h2>
							<p>{t("Input words can only match one <method>")}</p>
						</IonToggle>
					</IonItem>
					<IonItem className={"wrappableInnards toggleable" + (usingInput ? "" : " toggled")}>
						<IonToggle
							labelPlacement="start"
							enableOnOffLabels
							checked={showUnmatched}
							onIonChange={e => setShowUnmatched(!showUnmatched)}
						>
							<h2>{t("Show Unmatched Words")}</h2>
							<p>{t("Display any words that were not matched by any group.")}</p>
						</IonToggle>
					</IonItem>
				</IonList>
				<div id="DJOutputButtons">
					<IonButton
						strong={true}
						size="small"
						color="tertiary"
						onClick={() => maybeDoExport()}
					>
						{tc("Export")}
						<IonIcon icon={codeDownloadOutline} />
					</IonButton>
					<IonButton
						strong={true}
						size="small"
						color="success"
						onClick={() => doGenerate()}
					>
						{tc("Generate")}
						<IonIcon icon={caretForwardCircleOutline} />
					</IonButton>
				</div>
				<div id="DJOutput" className="selectable">
					{displayOutput}
					{displayUnmatched}
				</div>
				<div className={(displayOutput.length + displayUnmatched.length) > 0 ? "ion-padding-start ion-padding-bottom" : "hide"}>
					<IonButton
						color="primary"
						onClick={() => copyText(copyStrings.filter(line => line).join("\n\n\n"), toast)}
					>
						{tc("Copy to Clipboard")}
						<IonIcon icon={copyOutline} slot="start" />
					</IonButton>
				</div>
			</IonContent>
		</IonPage>
	);
};

export default DJOutput;
