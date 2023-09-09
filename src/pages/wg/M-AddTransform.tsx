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
	useIonAlert,
	useIonToast
} from '@ionic/react';
import {
	closeCircleOutline,
	addOutline,
	globeOutline
} from 'ionicons/icons';
import { useDispatch } from "react-redux";
import { addTransformWG } from '../../components/ReduxDucksFuncs';
import { ExtraCharactersModalOpener, WGTransformObject } from '../../components/ReduxDucksTypes';
import { $q, $a } from '../../components/DollarSignExports';
import repairRegexErrors from '../../components/RepairRegex';
import { v4 as uuidv4 } from 'uuid';

const AddTransformModal = (props: ExtraCharactersModalOpener) => {
	const { isOpen, setIsOpen, openECM } = props;
	let newTransform: WGTransformObject = {
		key: "",
		seek: "",
		replace: "",
		description: ""
	};
	const hardReset = () => {
		newTransform = {
			key: "",
			seek: "",
			replace: "",
			description: ""
		};
		$a("ion-input").forEach((input: HTMLInputElement) => input.value = "");
	};
	const dispatch = useDispatch();
	const [doAlert] = useIonAlert();
	const [doToast] = useIonToast();
	function setNewInfo<
		KEY extends keyof WGTransformObject,
		VAL extends WGTransformObject[KEY]
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
		newTransform.seek = repairRegexErrors(newTransform.seek);
		newTransform.replace = repairRegexErrors(newTransform.replace);
		close && setIsOpen(false);
		dispatch(addTransformWG(newTransform));
		hardReset();
		doToast({
			message: "Transformation added!",
			duration: 2500,
			cssClass: "success"
		});
	};
	return (
		<IonModal isOpen={isOpen} onDidDismiss={() => setIsOpen(false)}>
			<IonHeader>
				<IonToolbar color="primary">
					<IonTitle>Add Transformation</IonTitle>
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
						<IonLabel className="seekLabel">Search Expression:</IonLabel>
					</IonItem>
					<IonItem>
						<IonInput aria-label="Search expression" id="searchEx" className="ion-margin-top serifChars" placeholder="..." onIonChange={e => setNewInfo("seek", (e.detail.value as string).trim())}></IonInput>
					</IonItem>
					<IonItem className="labelled">
						<IonLabel className="replaceLabel">Replacement Expression:</IonLabel>
					</IonItem>
					<IonItem>
						<IonInput aria-label="Replacement expression" id="replaceEx" className="ion-margin-top serifChars" placeholder="..." onIonChange={e => setNewInfo("replace", (e.detail.value as string).trim())}></IonInput>
					</IonItem>
					<IonItem className="labelled">
						<IonLabel>Transformation Description:</IonLabel>
					</IonItem>
					<IonItem>
						<IonInput aria-label="Transformation description" id="optDesc" className="ion-margin-top" placeholder="(optional)" onIonChange={e => setNewInfo("description", (e.detail.value as string).trim())}></IonInput>
					</IonItem>
				</IonList>
			</IonContent>
			<IonFooter>
				<IonToolbar>
				<IonButton color="tertiary" slot="end" onClick={() => maybeSaveNewTransform(false)}>
						<IonIcon icon={addOutline} slot="start" />
						<IonLabel>Add Transformation</IonLabel>
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
