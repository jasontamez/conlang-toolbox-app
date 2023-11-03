import React, { useEffect, useMemo, useState } from 'react';
import {
	IonContent,
	IonPage,
	IonHeader,
	IonToolbar,
	IonMenuButton,
	IonButtons,
	IonTitle,
	IonList,
	IonItem,
	IonSelect,
	IonSelectOption,
	IonToggle,
	IonButton,
	IonIcon
} from '@ionic/react';
import { useDispatch, useSelector } from "react-redux";
import { caretForwardCircleOutline, codeDownloadOutline } from 'ionicons/icons';
//import { Clipboard } from '@capacitor/clipboard';

import { DJCustomInfo, PageData, SortObject, StateObject } from '../../store/types';
//import { addItemsToLexiconColumn } from '../../store/lexiconSlice';

//import { $a, $i } from '../../components/DollarSignExports';
//import toaster from '../../components/toaster';
//import { LexiconOutlineIcon } from '../../components/icons';
//import PermanentInfo from '../../components/PermanentInfo';
import {
	DJDisplayData,
	DJDisplayTypes,
	DJOrders,
	displayChart,
	displayText
} from '../../components/DJOutputFormat';
import makeSorter from '../../components/stringSorter';
import PermanentInfo from '../../components/PermanentInfo';
import log from '../../components/Logging';

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
//	const [doToast, undoToast] = useIonToast();
//	const navigator = useIonRouter();
	const [displayType, setDisplayType] = useState<DJDisplayTypes>("chart");
	const [usingInput, setUsingInput] = useState<boolean>(false);
	const [showUnmatched, setShowUnmatched] = useState<boolean>(false);
	const [order, setOrder] = useState<DJOrders>("group");
	const [outputText, setOutputText] = useState<string[]>([]);
	const [type, setType] = useState<(keyof DJCustomInfo)[]>([]);
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
				input: newInput
			};
		}
		return null;
	}, [usingInput, input, order, sortObject]);

	const doGenerate = (
		displayType: DJDisplayTypes,
		types: (keyof DJCustomInfo)[],
		data: DJDisplayData
	) => {
		switch(displayType) {
			case "text":
				setOutputText(displayText(declensions, data));
				setOutputText(displayText(conjugations, data));
				setOutputText(displayText(other, data));
				break;
			case "chart":
				displayChart(declensions, data);
				displayChart(conjugations, data);
				displayChart(other, data);
				break;
			default:
				log(dispatch, [`Invalid display type? [${displayType}]`]);
		}
	};
	
	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					 <IonButtons slot="start">
						 <IonMenuButton />
					 </IonButtons>
					<IonTitle>Output</IonTitle>
					<IonButtons slot="end">
						{/*<IonButton onClick={() => setIsOpenInfo(true)} disabled={isPickingSaving}>
							<IonIcon icon={helpCircleOutline} />
						</IonButton>*/}
					</IonButtons>
				</IonToolbar>
			</IonHeader>
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
								value="chart"
							>Chart</IonSelectOption>
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
										label="Display:"
										value={type}
										onIonChange={(e) => setType(e.detail.value)}
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
					<IonItem lines="none" className={"toggleable" + (usingInput ? "" : " toggled")}>
						<IonSelect
							color="primary"
							className="ion-text-wrap settings"
							label="Sort Output:"
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
					{outputText.length > 0 ?
						outputText.map(text => text)
					:
						<></>
					}
					{/*Chart info here */}
				</div>
			</IonContent>
		</IonPage>
	);
};

export default DJOutput;
