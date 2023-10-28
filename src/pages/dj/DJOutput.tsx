import React, { useState } from 'react';
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
//import { useSelector, useDispatch } from "react-redux";
import { caretForwardCircleOutline, codeDownloadOutline } from 'ionicons/icons';
//import { Clipboard } from '@capacitor/clipboard';

import {
	PageData
} from '../../store/types';
//import { addItemsToLexiconColumn } from '../../store/lexiconSlice';

//import { $a, $i } from '../../components/DollarSignExports';
//import toaster from '../../components/toaster';
//import { LexiconOutlineIcon } from '../../components/icons';
//import PermanentInfo from '../../components/PermanentInfo';

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

sort output by group?
and by declenjugation?
only by input?
some other sort?

display without any input?

*/
type DisplayTypes = "text" | "chart";
type Orders = "group" | "input" | "inputAlpha"

const DJOutput = (props: PageData) => {
//	const { modalPropsMaker } = props;
//	const dispatch = useDispatch();
//	const [doAlert] = useIonAlert();
//	const [doToast, undoToast] = useIonToast();
//	const navigator = useIonRouter();
	const [displayType, setDisplayType] = useState<DisplayTypes>("chart");
	const [usingInput, setUsingInput] = useState<boolean>(false);
	const [order, setOrder] = useState<Orders>("group");

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
							<IonSelectOption className="ion-text-wrap ion-text-align-end" value="chart">Chart</IonSelectOption>
							<IonSelectOption className="ion-text-wrap ion-text-align-end" value="text">Text</IonSelectOption>
						</IonSelect>
					</IonItem>
					<IonItem lines={usingInput ? "none" : "full"} className={"wrappableInnards doubleable" + (usingInput ? " toggled" : "")}>
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
							<IonSelectOption className="ion-text-wrap ion-text-align-end" value="group">by Group</IonSelectOption>
							<IonSelectOption className="ion-text-wrap ion-text-align-end" value="input">by Input (unsorted)</IonSelectOption>
							<IonSelectOption className="ion-text-wrap ion-text-align-end" value="inputAlpha">by Input (alphabetized)</IonSelectOption>
						</IonSelect>
					</IonItem>
				</IonList>
				<div id="DJOutput">
					<div className="buttons">
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
								style={ { marginLeft: "0.25em" } }
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
							onClick={() => 33}
						>
							Generate
							<IonIcon
								icon={caretForwardCircleOutline}
								style={ { marginLeft: "0.25em" } }
							/>
						</IonButton>
					</div>
				</div>
			</IonContent>
		</IonPage>
	);
};

export default DJOutput;
