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
	IonFab,
	IonFabButton,
	useIonAlert,
	AlertInput
} from '@ionic/react';
import { useDispatch, useSelector } from "react-redux";
import {
	caretForwardCircleOutline,
	codeDownloadOutline,
	helpCircleOutline,
	copy
} from 'ionicons/icons';
import { Clipboard } from '@capacitor/clipboard';

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
import makeSorter from '../../components/stringSorter';
import PermanentInfo from '../../components/PermanentInfo';
import Header from '../../components/Header';
import ModalWrap from '../../components/ModalWrap';
import { OutputCard } from './DJinfo';

async function copyText (copyStrings: string[], doToast: Function, undoToast: Function) {
	const toCopy = copyStrings.filter(line => line).join("\n\n\n");
	if(toCopy) {
		await Clipboard.write({string: toCopy});
		//navigator.clipboard.writeText(copyText);
		return toaster({
			message: "Copied to clipboard.",
			duration: 1500,
			position: "top",
			doToast,
			undoToast
		});
	}
	toaster({
		message: "Nothing to copy.",
		color: "danger",
		duration: 1500,
		position: "top",
		doToast,
		undoToast
	});
};

const DJOutput = (props: PageData) => {
//	const { modalPropsMaker } = props;
	const dispatch = useDispatch();
	const [doAlert] = useIonAlert();
	const [doToast, undoToast] = useIonToast();
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
				message: "You didn't select a format.",
				color: "danger",
				duration: 3000,
				doToast,
				undoToast
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
			doToast,
			undoToast
		);
	};

	const maybeDoExport = () => {
		if(type.length === 0) {
			doAlert("ok")
			return toaster({
				message: "Please choose at least one group to display.",
				color: "danger",
				doToast,
				undoToast
			});
		}
		const inputs: AlertInput[] = [
			{
				label: "Word Document (docx)",
				type: "radio",
				value: "docx"
			},
			{
				label: "Text File",
				type: "radio",
				value: "text"
			}
		];
		displayType !== "text" && inputs.unshift({
			label: "Spreadsheet (csv)",
			type: "radio",
			value: "csv"
		});
		doAlert({
			header: "Choose a Format",
			inputs,
			buttons: [
				{
					text: "Cancel",
					role: "cancel",
					cssClass: "cancel"
				},
				{
					text: "Export",
					cssClass: "submit",
					handler: doExport
				}
			]	
		});
	};

	const doGenerate = () => {
		if(type.length === 0) {
			return toaster({
				message: "Please choose at least one group to display.",
				color: "danger",
				doToast,
				undoToast
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
					<div className="title">Unmatched Words</div>
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
				title="Output"
				endButtons={[
					<IonButton key="djOutputHelpButton" onClick={() => setIsOpenInfo(true)}>
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
							label="Display as:"
							value={displayType}
							onIonChange={(e) => setDisplayType(e.detail.value)}
						>
							<IonSelectOption
								className="ion-text-wrap ion-text-align-end"
								value="chartTH"
							>Chart, Top Headers</IonSelectOption>
							<IonSelectOption
								className="ion-text-wrap ion-text-align-end"
								value="chartSH"
							>Chart, Side Headers</IonSelectOption>
							<IonSelectOption
								className="ion-text-wrap ion-text-align-end"
								value="text"
							>Text</IonSelectOption>
						</IonSelect>
					</IonItem>
					{
						numberOfTypes > 2 ?
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
													>Declensions</IonSelectOption>
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
													>Conjugations</IonSelectOption>
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
													>Other</IonSelectOption>
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
							<h2>Use Input</h2>
							<p>Display the declensions/conjugations of words in the input.</p>
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
							<h2>Show Group Info</h2>
							<p>Include general group information.</p>
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
							<h2>Show Examples</h2>
							<p>Include generic example.</p>
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
							<h2>Sort Input</h2>
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
							<h2>One Match</h2>
							<p>Input words can only match one declension/conjugation/etc.</p>
						</IonToggle>
					</IonItem>
					<IonItem className={"wrappableInnards toggleable" + (usingInput ? "" : " toggled")}>
						<IonToggle
							labelPlacement="start"
							enableOnOffLabels
							checked={showUnmatched}
							onIonChange={e => setShowUnmatched(!showUnmatched)}
						>
							<h2>Show Unmatched Words</h2>
							<p>Display any words that were not matched by any group.</p>
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
						Export
						<IonIcon icon={codeDownloadOutline} />
					</IonButton>
					<IonButton
						strong={true}
						size="small"
						color="success"
						onClick={() => doGenerate()}
					>
						Generate
						<IonIcon icon={caretForwardCircleOutline} />
					</IonButton>
				</div>
				<div id="DJOutput" className="selectable">
					{displayOutput}
					{displayUnmatched}
				</div>
				<IonFab
					vertical="bottom"
					horizontal="start"
					slot="fixed"
					className={(displayOutput.length + displayUnmatched.length) > 0 ? "" : "hide"}
				>
					<IonFabButton
						color="primary"
						title="Add new group"
						onClick={() => copyText(copyStrings, doToast, undoToast)}
					>
						<IonIcon icon={copy} />
					</IonFabButton>
				</IonFab>
			</IonContent>
		</IonPage>
	);
};

export default DJOutput;
