import React from 'react';
import {
	IonItem,
	IonIcon,
	IonLabel,
	IonList,
	IonContent,
	IonHeader,
	IonToolbar,
	IonButtons,
	IonButton,
	IonTitle,
	IonModal,
	IonInput,
	IonFooter,
	IonItemDivider,
	IonRadioGroup,
	IonRadio,
	useIonAlert,
	useIonToast
} from '@ionic/react';
import {
	closeCircleOutline,
	addOutline,
	globeOutline
} from 'ionicons/icons';
import { useDispatch } from "react-redux";
import { addTransformWE } from '../../components/ReduxDucksFuncs';
import { ExtraCharactersModalOpener, WETransformObject } from '../../components/ReduxDucksTypes';
import { $q, $a } from '../../components/DollarSignExports';
import { v4 as uuidv4 } from 'uuid';

const AddTransformModal = (props: ExtraCharactersModalOpener) => {
	const { isOpen, setIsOpen, openECM } = props;
	let newTransform: WETransformObject = {
		key: "",
		seek: "",
		replace: "",
		direction: "both",
		description: ""
	};
	const hardReset = () => {
		newTransform = {
			key: "",
			seek: "",
			replace: "",
			direction: "both",
			description: ""
		};
		$a("ion-input").forEach((input: HTMLInputElement) => input.value = "");
		$q("ion-radio-group").value = "both";
	};
	const dispatch = useDispatch();
	const [doAlert] = useIonAlert();
	const [doToast] = useIonToast();
	function setNewInfo<
		KEY extends keyof WETransformObject,
		VAL extends WETransformObject[KEY]
	>(prop: KEY, value: VAL) {
		// Set the property
		newTransform[prop] = value;
		// Remove danger color if present
		// Debounce means this sometimes doesn't exist by the time this is called.
		const where = $q("." + prop + "Label");
		(where !== null) && where.classList.remove("invalidValue");
	}
	const maybeSaveNewTransform = (close: boolean = true) => {
		const err: string[] = [];
		// Test info for validness, then save if needed and reset the newTransform
		if(newTransform.seek === "") {
			$q(".seekLabel").classList.add("invalidValue");
			err.push("No search expression present");
		}
		if(err.length > 0) {
			// Errors found.
			doAlert({
				header: "Error",
				message: err.join("; "),
				buttons: [
					{
						text: "Cancel",
						role: "cancel"
					}
				]
			});
			return;
		}
		// Everything ok!
		// Create unique ID for this transform
		newTransform.key = uuidv4();
		close && setIsOpen(false);
		dispatch(addTransformWE(newTransform));
		hardReset();
		doToast({
			message: "Transform added!",
			duration: 2500,
			cssClass: "success"
		});
	};
	return (
		<IonModal isOpen={isOpen} onDidDismiss={() => setIsOpen(false)}>
			<IonHeader>
				<IonToolbar color="primary">
					<IonTitle>Add Transform</IonTitle>
					<IonButtons slot="end">
						<IonButton onClick={() => openECM(true)}>
							<IonIcon icon={globeOutline} />
						</IonButton>
						<IonButton onClick={() => setIsOpen(false)}>
							<IonIcon icon={closeCircleOutline} />
						</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<IonList lines="none" className="hasSpecialLabels">
					<IonItem className="labelled">
						<IonLabel className="seekLabel">Input Expression:</IonLabel>
					</IonItem>
					<IonItem>
						<IonInput aria-label="Input expression" id="searchEx" className="ion-margin-top serifChars" placeholder="..." onIonChange={e => setNewInfo("seek", (e.detail.value as string).trim())}></IonInput>
					</IonItem>
					<IonItem className="labelled">
						<IonLabel className="replaceLabel">Output Expression:</IonLabel>
					</IonItem>
					<IonItem>
						<IonInput aria-label="Output expression" id="replaceEx" className="ion-margin-top serifChars" placeholder="..." onIonChange={e => setNewInfo("replace", (e.detail.value as string).trim())}></IonInput>
					</IonItem>
					<IonItem className="labelled">
						<IonLabel>Transform Description:</IonLabel>
					</IonItem>
					<IonItem>
						<IonInput aria-label="Description of the transform" id="optDesc" className="ion-margin-top" placeholder="(optional)" onIonChange={e => setNewInfo("description", (e.detail.value as string).trim())}></IonInput>
					</IonItem>
					<IonItemDivider>
						<IonLabel>Transform Direction:</IonLabel>
					</IonItemDivider>
					<IonRadioGroup value={newTransform.direction} onIonChange={e => setNewInfo("direction", e.detail.value as "both" | "in" | "out" | "double")}>
						<IonItem>
							<IonRadio value="both" labelPlacement="end" justify="start">At Input, Then Undo At Output</IonRadio>
						</IonItem>
						<IonItem>
							<IonRadio value="double" labelPlacement="end" justify="start">At Input and At Output</IonRadio>
						</IonItem>
						<IonItem>
							<IonRadio value="in" labelPlacement="end" justify="start">At Input Only</IonRadio>
						</IonItem>
						<IonItem>
							<IonRadio value="out" labelPlacement="end" justify="start">At Output Only</IonRadio>
						</IonItem>
					</IonRadioGroup>
				</IonList>
			</IonContent>
			<IonFooter>
				<IonToolbar>
				<IonButton color="tertiary" slot="end" onClick={() => maybeSaveNewTransform(false)}>
						<IonIcon icon={addOutline} slot="start" />
						<IonLabel>Add Transform</IonLabel>
					</IonButton>
					<IonButton color="success" slot="end" onClick={() => maybeSaveNewTransform()}>
						<IonIcon icon={addOutline} slot="start" />
						<IonLabel>Add and Close</IonLabel>
					</IonButton>
				</IonToolbar>
			</IonFooter>
		</IonModal>
	);
};

export default AddTransformModal;
