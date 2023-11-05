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
	useIonToast
} from '@ionic/react';
import { useDispatch, useSelector } from "react-redux";
import { caretForwardCircleOutline, codeDownloadOutline } from 'ionicons/icons';
//import { Clipboard } from '@capacitor/clipboard';

import { DJCustomInfo, PageData, SortObject, StateObject } from '../../store/types';
//import { addItemsToLexiconColumn } from '../../store/lexiconSlice';

//import { $a, $i } from '../../components/DollarSignExports';
import toaster from '../../components/toaster';
//import { LexiconOutlineIcon } from '../../components/icons';
//import PermanentInfo from '../../components/PermanentInfo';
import {
	DJChartDirection,
	DJDisplayData,
	DJDisplayTypes,
	DJOrders,
	DJTypeObject,
	displayChart,
	displayText
} from '../../components/DJOutputFormat';
import makeSorter from '../../components/stringSorter';
import PermanentInfo from '../../components/PermanentInfo';
import log from '../../components/Logging';
import Header from '../../components/Header';

/*

async function copyText (copyString: string, doToast: Function, undoToast: Function) {
	if(copyString) {
		await Clipboard.write({string: copyString});
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

*/

const DJOutput = (props: PageData) => {
//	const { modalPropsMaker } = props;
//	const dispatch = useDispatch();
//	const [doAlert] = useIonAlert();
	const [doToast, undoToast] = useIonToast();
//	const navigator = useIonRouter();
	const [displayType, setDisplayType] = useState<DJDisplayTypes>("chartH");
	const [usingInput, setUsingInput] = useState<boolean>(false);
	const [showUnmatched, setShowUnmatched] = useState<boolean>(false);
	const [showGroupInfo, setShowGroupInfo] = useState<boolean>(true);
	const [order, setOrder] = useState<DJOrders>("group");
	const [type, setType] = useState<(keyof DJCustomInfo)[]>([]);
	const [typeObj, setTypeObj] = useState<DJTypeObject>({});
	const [displayOutput, setDisplayOutput] = useState<ReactElement[]>([]);
	const { declensions, conjugations, other, input } = useSelector((state: StateObject) => state.dj);
	const numberOfTypes =
		(declensions.length > 0 ? 1 : 0)
		+ (conjugations.length > 0 ? 1 : 0)
		+ (other.length > 0 ? 1 : 0);
	const {
		sortLanguage,
		sensitivity,
		defaultCustomSort,
		defaultSortLanguage,
		customSorts
	} = useSelector((state: StateObject) => state.sortSettings);
	const dispatch = useDispatch();

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
			// Grab input
			const newInput = input.split(/\n/);
			//
			// Handle alphabetization
			let newOrder = order;
			if(order === "groupAlpha" || order === "inputAlpha") {
				newOrder = order.slice(0, 5) as DJOrders;
				newInput.sort(sortObject);
			}
			// Return data
			return {
				order: newOrder,
				input: newInput,
				showGroups: showGroupInfo
			};
		}
		// Not using input? Leave as null.
		return null;
	}, [usingInput, input, order, sortObject, showGroupInfo]);

	const doGenerate = (
		displayType: DJDisplayTypes,
		types: (keyof DJCustomInfo)[],
		data: DJDisplayData
	) => {
		if(types.length === 0) {
			return toaster({
				message: "Please choose at least one group to display.",
				color: "danger",
				doToast,
				undoToast
			});
		}
		let which: DJChartDirection = "v";
		const output: ReactElement[] = [];
		const {declensions: dec, conjugations: con, other: oth} = typeObj;
		switch(displayType) {
			case "text":
				dec && output.push(...displayText(declensions, data));
				con && output.push(...displayText(conjugations, data));
				oth && output.push(...displayText(other, data));
				break;
			case "chartH":
				which = "h";
				//eslint-disable-next-line no-fallthrough
			case "chartV":
				dec && output.push(...displayChart(declensions, data, which));
				con && output.push(...displayChart(conjugations, data, which));
				oth && output.push(...displayChart(other, data, which));
				break;
			default:
				log(dispatch, [`Invalid display type? [${displayType}]`]);
				toaster({
					message: "ERROR. Please report to the developer.",
					color: "danger",
					doToast,
					undoToast
				});
		}
		setDisplayOutput(output);
	};

	return (
		<IonPage>
			<Header title="Output" />
						{/*<IonButton onClick={() => setIsOpenInfo(true)} disabled={isPickingSaving}>
							<IonIcon icon={helpCircleOutline} />
						</IonButton>*/}
			<IonContent fullscreen>
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
								value="chartH"
							>Chart, Horizontal Headers</IonSelectOption>
							<IonSelectOption
								className="ion-text-wrap ion-text-align-end"
								value="chartV"
							>Chart, Vertical Headers</IonSelectOption>
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
					<IonItem
						lines={usingInput ? "none" : "full"}
						className={"wrappableInnards doubleable" + (usingInput ? " toggled" : "")}
					>
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
						lines="none"
						className={"wrappableInnards toggleable" + (usingInput ? "" : " toggled")}
					>
						<IonToggle
							labelPlacement="start"
							enableOnOffLabels
							checked={showGroupInfo}
							onIonChange={e => setShowGroupInfo(!showGroupInfo)}
						>
							<h2>Show Group Info</h2>
							<p>Include the group information along with the declensions/conjugations.</p>
						</IonToggle>
					</IonItem>
					<IonItem lines="none" className={"toggleable" + (usingInput ? "" : " toggled")}>
						<IonSelect
							color="primary"
							className="ion-text-wrap settings"
							label="Organize Output:"
							value={order}
							onIonChange={(e) => setOrder(e.detail.value)}
						>
							<IonSelectOption
								className="ion-text-wrap ion-text-align-end"
								value="input"
							>by Input (unsorted)</IonSelectOption>
							<IonSelectOption
								className="ion-text-wrap ion-text-align-end"
								value="inputAlpha"
							>by Input (alphabetized)</IonSelectOption>
							<IonSelectOption
								className="ion-text-wrap ion-text-align-end"
								value="group"
							>by Group (unsorted input)</IonSelectOption>
							<IonSelectOption
								className="ion-text-wrap ion-text-align-end"
								value="groupAlpha"
							>by Group (alphabetized input)</IonSelectOption>
						</IonSelect>
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
						onClick={() => 44}
					>
						Export
						<IonIcon icon={codeDownloadOutline} />
					</IonButton>
					<IonButton
						strong={true}
						size="small"
						color="success"
						onClick={() => doGenerate(displayType, type, data)}
					>
						Generate
						<IonIcon icon={caretForwardCircleOutline} />
					</IonButton>
				</div>
				<div id="DJOutput" className="selectable">
					{displayOutput}
				</div>
			</IonContent>
		</IonPage>
	);
};

export default DJOutput;
