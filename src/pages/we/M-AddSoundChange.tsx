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
	IonFooter
} from '@ionic/react';
import {
	closeCircleOutline,
	addOutline
} from 'ionicons/icons';
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { closeModal, addSoundChangeWE } from '../../components/ReduxDucksFuncs';
import { WESoundChangeObject } from '../../components/ReduxDucksTypes';
import fireSwal from '../../components/Swal';
import { $q, $a } from '../../components/DollarSignExports';
import repairRegexErrors from '../../components/RepairRegex';
import { v4 as uuidv4 } from 'uuid';

const AddSoundChangeModal = () => {
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
	const modalState = useSelector((state: any) => state.modalState, shallowEqual);
	function setNewInfo<
		KEY extends keyof WESoundChangeObject,
		VAL extends WESoundChangeObject[KEY]
	>(prop: KEY, value: VAL) {
		// Set the property
		newSoundChange[prop] = value;
		// Remove danger color if present
		// Debounce means this sometimes doesn't exist by the time this is called.
		let where = $q("." + prop + "Label");
		(where !== null) && where.classList.remove("invalidValue");
	}
	const maybeSaveNewSoundChange = (close: boolean = true) => {
		let err: string[] = [];
		let contextTest = (context: string, what: string = "Context") => {
			let ind = context.indexOf("_");
			if(ind === -1) {
				return what + " must contain one underscore (_)";
			} else if (context.indexOf("_", ind+1) !== -1) {
				return what + " can only have one underscore (_)";
			}
			let max = context.length - 1;
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
			fireSwal({
				title: "Error",
				icon: "error",
				text: err.join("; ")
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
		close && dispatch(closeModal('AddSoundChange'));
		dispatch(addSoundChangeWE(newSoundChange));
		hardReset();
		fireSwal({
			title: "Sound Change added!",
			toast: true,
			timer: 2500,
			timerProgressBar: true,
			showConfirmButton: false
		});
	};
	return (
		<IonModal isOpen={modalState.AddSoundChange} onDidDismiss={() => dispatch(closeModal('AddSoundChange'))}>
			<IonHeader>
				<IonToolbar color="primary">
					<IonTitle>Add Sound Change</IonTitle>
					<IonButtons slot="end">
						<IonButton onClick={() => dispatch(closeModal('AddSoundChange'))}>
							<IonIcon icon={closeCircleOutline} />
						</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<IonList lines="none">
					<IonItem>
						<IonLabel className="seekLabel" position="stacked" style={ {fontSize: "20px"} }>Search Expression:</IonLabel>
						<IonInput id="searchEx" className="ion-margin-top serifChars" placeholder="Sound..." onIonChange={e => setNewInfo("seek", e.detail.value!.trim())}></IonInput>
					</IonItem>
					<IonItem>
						<IonLabel className="replaceLabel" position="stacked" style={ {fontSize: "20px"} }>Replace Expression:</IonLabel>
						<IonInput id="replaceEx" className="ion-margin-top serifChars" placeholder="Changes into..." onIonChange={e => setNewInfo("replace", e.detail.value!.trim())}></IonInput>
					</IonItem>
					<IonItem>
						<IonLabel className="contextLabel" position="stacked" style={ {fontSize: "20px"} }>Context Expression:</IonLabel>
						<IonInput id="replaceEx" className="ion-margin-top serifChars" placeholder="Where the change takes place" onIonChange={e => setNewInfo("context", e.detail.value!.trim())}></IonInput>
					</IonItem>
					<IonItem>
						<IonLabel className="anticontextLabel" position="stacked" style={ {fontSize: "20px"} }>Anticontext Expression:</IonLabel>
						<IonInput id="replaceEx" className="ion-margin-top serifChars" placeholder="Where it doesn't" onIonChange={e => setNewInfo("anticontext", e.detail.value!.trim())}></IonInput>
					</IonItem>
					<IonItem>
						<IonLabel position="stacked">Sound Change Description:</IonLabel>
						<IonInput id="optDesc" className="ion-margin-top" placeholder="(optional)" onIonChange={e => setNewInfo("description", e.detail.value!.trim())}></IonInput>
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
