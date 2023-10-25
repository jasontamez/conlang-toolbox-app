import React from 'react';
import {
	IonContent,
	IonPage,
	IonHeader,
	IonToolbar,
	IonMenuButton,
	IonButtons,
	IonTitle
} from '@ionic/react';
//import { useSelector, useDispatch } from "react-redux";
import {
//	caretForwardCircleOutline,
//	settingsOutline,
//	saveOutline,
//	helpCircleOutline,
//	copyOutline
} from 'ionicons/icons';
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

const DJOutput = (props: PageData) => {
//	const { modalPropsMaker } = props;
//	const dispatch = useDispatch();
//	const [doAlert] = useIonAlert();
//	const [doToast, undoToast] = useIonToast();
//	const navigator = useIonRouter();

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
				<div id="DJOutput">
					<div className="leftHandSide">
						{/*<IonButton
							strong={true}
							size="small"
							color="success"
							style={{
								width: "max-content",
								fontSize: "1.35rem",
								padding: "0.5rem 0",
								minHeight: "3.25rem"
							}}
							onClick={() => {new Promise(() => generateOutput())}}
							disabled={isPickingSaving}
						>
							{
								isGenerating ? (
									<span style={ {fontStyle: "italic"} }>Loading...</span>
								) : "Generate"
							}<IonIcon
								icon={caretForwardCircleOutline}
								style={ { marginLeft: "0.25em" } }
							/>
						</IonButton>
						<div
							id="outputPane"
							style={{columnWidth: wordlistMultiColumn ? colsNum : "auto"}}
							className={"largePane selectable" + (isPickingSaving ? " pickAndSave" : "")}
						>
							{makeOutput()}
						</div>*/}
					</div>
					<div className="rightHandSide">
						{/*<IonButton
							expand="block"
							strong={false}
							color="secondary"
							onClick={() => setIsOpenOptions(true)}
							disabled={isPickingSaving}
						><IonIcon slot="icon-only" icon={settingsOutline} /></IonButton>
						<IonButton
							expand="block"
							strong={false}
							color="secondary"
							onClick={() => copyText(copyString, doToast, undoToast)}
							disabled={isPickingSaving}
						><IonIcon slot="icon-only" icon={copyOutline} /></IonButton>
						<IonButton
							expand="block"
							strong={true}
							className={isPickingSaving ? "hide" : ""}
							color="secondary"
							onClick={() => pickAndSave()}
						><LexiconOutlineIcon slot="icon-only" /></IonButton>
						<IonButton
							className={isPickingSaving ? "" : "hide"}
							id="doneSavingButton"
							expand="block"
							strong={true}
							color="success"
							onClick={() => donePickingAndSaving()}
						><IonIcon slot="icon-only" icon={saveOutline} /></IonButton>*/}
					</div>
				</div>
			</IonContent>
		</IonPage>
	);
};

export default DJOutput;
