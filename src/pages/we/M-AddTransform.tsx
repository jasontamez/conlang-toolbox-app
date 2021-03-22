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
	IonRadio
} from '@ionic/react';
import {
	closeCircleOutline,
	addOutline,
	globeOutline
} from 'ionicons/icons';
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { openModal, closeModal, addTransformWE } from '../../components/ReduxDucksFuncs';
import { WETransformObject } from '../../components/ReduxDucksTypes';
import fireSwal from '../../components/Swal';
import { $q, $a } from '../../components/DollarSignExports';
import { v4 as uuidv4 } from 'uuid';

const AddTransformModal = () => {
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
	const modalState = useSelector((state: any) => state.modalState, shallowEqual);
	function setNewInfo<
		KEY extends keyof WETransformObject,
		VAL extends WETransformObject[KEY]
	>(prop: KEY, value: VAL) {
		// Set the property
		newTransform[prop] = value;
		// Remove danger color if present
		// Debounce means this sometimes doesn't exist by the time this is called.
		let where = $q("." + prop + "Label");
		(where !== null) && where.classList.remove("invalidValue");
	}
	const maybeSaveNewTransform = (close: boolean = true) => {
		let err: string[] = [];
		// Test info for validness, then save if needed and reset the newTransform
		if(newTransform.seek === "") {
			$q(".seekLabel").classList.add("invalidValue");
			err.push("No search expression present");
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
		// Create unique ID for this transform
		newTransform.key = uuidv4();
		close && dispatch(closeModal('AddTransform'));
		dispatch(addTransformWE(newTransform));
		hardReset();
		fireSwal({
			title: "Transform added!",
			toast: true,
			timer: 2500,
			timerProgressBar: true,
			showConfirmButton: false
		});
	};
	return (
		<IonModal isOpen={modalState.AddTransform} onDidDismiss={() => dispatch(closeModal('AddTransform'))}>
			<IonHeader>
				<IonToolbar color="primary">
					<IonTitle>Add Transform</IonTitle>
					<IonButtons slot="end">
						<IonButton onClick={() => dispatch(openModal("ExtraCharacters"))}>
							<IonIcon icon={globeOutline} />
						</IonButton>
						<IonButton onClick={() => dispatch(closeModal('AddTransform'))}>
							<IonIcon icon={closeCircleOutline} />
						</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<IonList lines="none">
					<IonItem>
						<IonLabel className="seekLabel" position="stacked" style={ { fontSize: "20px" } }>Input Expression:</IonLabel>
						<IonInput id="searchEx" className="ion-margin-top serifChars" placeholder="..." onIonChange={e => setNewInfo("seek", (e.detail.value as string).trim())}></IonInput>
					</IonItem>
					<IonItem>
						<IonLabel className="replaceLabel" position="stacked" style={ {fontSize: "20px"} }>Output Expression:</IonLabel>
						<IonInput id="replaceEx" className="ion-margin-top serifChars" placeholder="..." onIonChange={e => setNewInfo("replace", (e.detail.value as string).trim())}></IonInput>
					</IonItem>
					<IonItem>
						<IonLabel position="stacked">Transform Description:</IonLabel>
						<IonInput id="optDesc" className="ion-margin-top" placeholder="(optional)" onIonChange={e => setNewInfo("description", (e.detail.value as string).trim())}></IonInput>
					</IonItem>
					<IonItemDivider>
						<IonLabel position="stacked">Transform Direction:</IonLabel>
					</IonItemDivider>
					<IonRadioGroup value={newTransform.direction} onIonChange={e => setNewInfo("direction", e.detail.value as "both" | "in" | "out" | "double")}>
						<IonItem>
							<IonLabel>At Input, Then Undo At Output</IonLabel>
							<IonRadio slot="start" value="both" />
						</IonItem>
						<IonItem>
							<IonLabel>At Input and At Output</IonLabel>
							<IonRadio slot="start" value="double" />
						</IonItem>
						<IonItem>
							<IonLabel>At Input Only</IonLabel>
							<IonRadio slot="start" value="in" />
						</IonItem>
						<IonItem>
							<IonLabel>At Output Only</IonLabel>
							<IonRadio slot="start" value="out" />
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
