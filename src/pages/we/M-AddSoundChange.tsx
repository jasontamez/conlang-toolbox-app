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
import { addSoundChangeWE } from '../../components/ReduxDucksFuncs';
import { ExtraCharactersModalOpener, WESoundChangeObject } from '../../components/ReduxDucksTypes';
import { $q, $a } from '../../components/DollarSignExports';
import repairRegexErrors from '../../components/RepairRegex';
import { v4 as uuidv4 } from 'uuid';

const AddSoundChangeModal = (props: ExtraCharactersModalOpener) => {
	const { isOpen, setIsOpen, openECM } = props;
	let newSoundChange: WESoundChangeObject = {
		key: "",
		seek: "",
		replace: "",
		context: "",
		anticontext: "",
		description: ""
	};
	const hardReset = () => {
		newSoundChange = {
			key: "",
			seek: "",
			replace: "",
			context: "",
			anticontext: "",
			description: ""
		};
		$a("ion-input").forEach((input: HTMLInputElement) => input.value = "");
	};
	const dispatch = useDispatch();
	const [doAlert] = useIonAlert();
	const [doToast] = useIonToast();
	function setNewInfo<
		KEY extends keyof WESoundChangeObject,
		VAL extends WESoundChangeObject[KEY]
	>(prop: KEY, value: VAL) {
		// Set the property
		newSoundChange[prop] = value;
		// Remove danger color if present
		// Debounce means this sometimes doesn't exist by the time this is called.
		const where = $q("." + prop + "Label");
		(where !== null) && where.classList.remove("invalidValue");
	}
	const maybeSaveNewSoundChange = (close: boolean = true) => {
		const err: string[] = [];
		const contextTest = (context: string, what: string = "Context") => {
			let ind = context.indexOf("_");
			if(ind === -1) {
				return what + " must contain one underscore (_)";
			} else if (context.indexOf("_", ind+1) !== -1) {
				return what + " can only have one underscore (_)";
			}
			const max = context.length - 1;
			ind = context.indexOf("#");
			while(ind !== -1) {
				if(ind > 0 && ind !== max) {
					return what + " can only have word-boundaries (#) at beginning and/or end";
				}
				ind = context.indexOf("#", (ind + 1));
			}
			return false;
		};
		// Test info for validness, then save if needed and reset the newSoundChange
		let temp: boolean | string;
		if(newSoundChange.seek === "") {
			$q(".seekLabel").classList.add("invalidValue");
			err.push("No search expression present");
		}
		if(newSoundChange.context === "") {
			newSoundChange.context = "_";
		} else if((temp = contextTest(newSoundChange.context))) {
			err.push(temp);
		}
		if(newSoundChange.anticontext && (temp = contextTest(newSoundChange.anticontext, "Anticontext"))) {
			err.push(temp);
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
		// Create unique ID for this sound change
		newSoundChange.key = uuidv4();
		// Fix any possible regex problems
		newSoundChange.seek = repairRegexErrors(newSoundChange.seek);
		newSoundChange.context = repairRegexErrors(newSoundChange.context);
		newSoundChange.replace = repairRegexErrors(newSoundChange.replace);
		newSoundChange.anticontext = repairRegexErrors(newSoundChange.anticontext);
		close && setIsOpen(false);
		dispatch(addSoundChangeWE(newSoundChange));
		hardReset();
		doToast({
			message: "Sound Change added!",
			duration: 2500,
			cssClass: "success"
		});
	};
	return (
		<IonModal isOpen={isOpen} onDidDismiss={() => setIsOpen(false)}>
			<IonHeader>
				<IonToolbar color="primary">
					<IonTitle>Add Sound Change</IonTitle>
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
						<IonInput aria-label="Search Expression" id="searchEx" className="ion-margin-top serifChars" placeholder="Sound..." onIonChange={e => setNewInfo("seek", (e.detail.value as string).trim())}></IonInput>
					</IonItem>
					<IonItem className="labelled">
						<IonLabel className="replaceLabel">Replace Expression:</IonLabel>
					</IonItem>
					<IonItem>
						<IonInput aria-label="Replace Expression" id="replaceEx" className="ion-margin-top serifChars" placeholder="Changes into..." onIonChange={e => setNewInfo("replace", (e.detail.value as string).trim())}></IonInput>
					</IonItem>
					<IonItem className="labelled">
						<IonLabel className="contextLabel">Context Expression:</IonLabel>
					</IonItem>
					<IonItem>
						<IonInput aria-label="Context Expression" id="replaceEx" className="ion-margin-top serifChars" placeholder="Where the change takes place" onIonChange={e => setNewInfo("context", (e.detail.value as string).trim())}></IonInput>
					</IonItem>
					<IonItem className="labelled">
						<IonLabel className="anticontextLabel">Anticontext Expression:</IonLabel>
					</IonItem>
					<IonItem>
						<IonInput aria-label="Anticontext Expression" id="replaceEx" className="ion-margin-top serifChars" placeholder="Where it doesn't" onIonChange={e => setNewInfo("anticontext", (e.detail.value as string).trim())}></IonInput>
					</IonItem>
					<IonItem className="labelled">
						<IonLabel>Sound Change Description:</IonLabel>
					</IonItem>
					<IonItem>
						<IonInput aria-label="Sound Change Description" id="optDesc" className="ion-margin-top" placeholder="(optional)" onIonChange={e => setNewInfo("description", (e.detail.value as string).trim())}></IonInput>
					</IonItem>
				</IonList>
			</IonContent>
			<IonFooter>
				<IonToolbar>
				<IonButton color="primary" slot="end" onClick={() => maybeSaveNewSoundChange(false)}>
						<IonIcon icon={addOutline} slot="start" />
						<IonLabel>Add Sound Change</IonLabel>
					</IonButton>
					<IonButton color="success" slot="end" onClick={() => maybeSaveNewSoundChange()}>
						<IonIcon icon={addOutline} slot="start" />
						<IonLabel>Add and Close</IonLabel>
					</IonButton>
				</IonToolbar>
			</IonFooter>
		</IonModal>
	);
};

export default AddSoundChangeModal;
