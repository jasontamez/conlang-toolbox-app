import React, { useMemo, useState } from 'react';
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
import { useSelector } from "react-redux";
import { caretForwardCircleOutline, codeDownloadOutline } from 'ionicons/icons';
//import { Clipboard } from '@capacitor/clipboard';

import { DJGroup, PageData, SortObject, StateObject } from '../../store/types';
//import { addItemsToLexiconColumn } from '../../store/lexiconSlice';

//import { $a, $i } from '../../components/DollarSignExports';
//import toaster from '../../components/toaster';
//import { LexiconOutlineIcon } from '../../components/icons';
//import PermanentInfo from '../../components/PermanentInfo';
import makeSorter from '../../components/stringSorter';
import PermanentInfo from '../../components/PermanentInfo';

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
type DisplayTypes = "text" | "chart";
type Orders = "group" | "groupAlpha" | "input" | "inputAlpha";
type Data = null | {
	order: Orders,
	input: string[]
};

const doGenerate = (
	displayType: DisplayTypes,
	declenjugationGroups: DJGroup[],
	data: Data
) => {
	switch(displayType) {
		case "text":
			return;
		case "chart":
			return;
	}
	console.log("ERROR: " + displayType);
};

const DJOutput = (props: PageData) => {
//	const { modalPropsMaker } = props;
//	const dispatch = useDispatch();
//	const [doAlert] = useIonAlert();
//	const [doToast, undoToast] = useIonToast();
//	const navigator = useIonRouter();
	const [displayType, setDisplayType] = useState<DisplayTypes>("chart");
	const [usingInput, setUsingInput] = useState<boolean>(false);
	const [order, setOrder] = useState<Orders>("group");
	const { declenjugationGroups, input } = useSelector((state: StateObject) => state.dj);
	const {
		sortLanguage,
		sensitivity,
		defaultCustomSort,
		defaultSortLanguage,
		customSorts
	} = useSelector((state: StateObject) => state.sortSettings);

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
	const data: Data = useMemo(() => {
		if(usingInput) {
			// Grab input
			const newInput = input.split(/\n/);
			//
			// Handle alphabetization
			let newOrder = order;
			if(order === "groupAlpha" || order === "inputAlpha") {
				newOrder = order.slice(0, 5) as Orders;
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
				<IonList lines="full" className="djOutput">
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
					<IonItem className={"toggleable" + (usingInput ? "" : " toggled")}>
						<IonSelect
							color="primary"
							className="ion-text-wrap settings"
							label="Sort Input:"
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
				</IonList>
				<div className="DJOutputButtons">
					<IonButton
						strong={true}
						size="small"
						color="tertiary"
						style={{
							width: "max-content",
							fontSize: "1.35rem",
							padding: "0.5rem 0"
						}}
						onClick={() => 44}
					>
						Export
						<IonIcon
							icon={codeDownloadOutline}
							style={ { marginInlineStart: "0.25em" } }
						/>
					</IonButton>
					<IonButton
						strong={true}
						size="small"
						color="success"
						style={{
							width: "max-content",
							fontSize: "1.35rem",
							padding: "0.5rem 0"
						}}
						onClick={() => doGenerate(displayType, declenjugationGroups, data)}
					>
						Generate
						<IonIcon
							icon={caretForwardCircleOutline}
							style={ { marginInlineStart: "0.25em" } }
						/>
					</IonButton>
				</div>
				<div id="DJOutput" className="selectable">
				</div>
			</IonContent>
		</IonPage>
	);
};

export default DJOutput;
