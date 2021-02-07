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
	saveOutline
} from 'ionicons/icons';
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import '../App.css';
import { WESoundChangeObject } from '../../components/ReduxDucksTypes';
import { closeModal, doEditSoundChangeWE, cancelEditSoundChangeWE } from '../../components/ReduxDucksFuncs';
import fireSwal from '../../components/Swal';
import { $q } from '../../components/DollarSignExports';

const EditSoundChangeModal = () => {
	const hardReset = () => {
		editingSoundChange = {
			key: "",
			seek: "",
			replace: "",
			context: "",
			anticontext: "",
				description: ""
		};
	};
	const dispatch = useDispatch();
	const modalState = useSelector((state: any) => state.modalState, shallowEqual);
	const rewritesObject = useSelector((state: any) => state.wordevolveSoundChanges, shallowEqual);
	const editing = rewritesObject.editing;
	let editingSoundChange: WESoundChangeObject = {
		key: "",
		seek: "",
		replace: "",
		context: "",
		anticontext: "",
		description: ""
	};
	rewritesObject.list.every((trans: WESoundChangeObject) => {
		if(trans.key === editing) {
			editingSoundChange = {
				...trans
			};
			return false;
		}
		return true;
	});
	const cancelEditing = () => {
		dispatch(cancelEditSoundChangeWE(editing));
		dispatch(closeModal('EditSoundChange'));
	};
	function setNewInfo<
		KEY extends keyof WESoundChangeObject,
		VAL extends WESoundChangeObject[KEY]
	>(prop: KEY, value: VAL) {
		// Set the property
		editingSoundChange[prop] = value;
		// Remove danger color if present
		// Debounce means this sometimes doesn't exist by the time this is called.
		let where = $q("." + prop + "Label");
		(where !== null) && where.classList.remove("invalidValue");
	}
	const maybeSaveNewSoundChangeInfo = () => {
		let err: string[] = [];
		// Test info for validness, then save if needed and reset the editingSoundChange
		if(editingSoundChange.seek === "") {
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
		if(editingSoundChange.context === "") {
			editingSoundChange.context = "_";
		}
		// Everything ok!
		dispatch(closeModal('EditSoundChange'));
		dispatch(doEditSoundChangeWE(editingSoundChange));
		hardReset();
		fireSwal({
			title: "Sound Change saved!",
			toast: true,
			timer: 2500,
			timerProgressBar: true,
			showConfirmButton: false
		});
	};
	return (
		<IonModal isOpen={modalState.EditSoundChange} onDidDismiss={() => dispatch(closeModal('EditSoundChange'))}>
			<IonHeader>
				<IonToolbar color="primary">
					<IonTitle>Edit Sound Change</IonTitle>
					<IonButtons slot="end">
						<IonButton onClick={() => cancelEditing()}>
							<IonIcon icon={closeCircleOutline} />
						</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<IonList lines="none">
					<IonItem>
						<IonLabel className="seekLabel" position="stacked" style={ {fontSize: "20px"} }>Beginning Expression:</IonLabel>
						<IonInput id="searchEx" className="ion-margin-top serifChars" value={editingSoundChange!.seek} onIonChange={e => setNewInfo("seek", e.detail.value!.trim())}></IonInput>
					</IonItem>
					<IonItem>
						<IonLabel className="replaceLabel" position="stacked" style={ {fontSize: "20px"} }>Ending Expression:</IonLabel>
						<IonInput id="replaceEx" className="ion-margin-top serifChars" value={editingSoundChange!.replace} onIonChange={e => setNewInfo("replace", e.detail.value!.trim())}></IonInput>
					</IonItem>
					<IonItem>
						<IonLabel className="contextLabel" position="stacked" style={ {fontSize: "20px"} }>Context Expression:</IonLabel>
						<IonInput id="replaceEx" className="ion-margin-top serifChars" value={editingSoundChange!.context} onIonChange={e => setNewInfo("context", e.detail.value!.trim())}></IonInput>
					</IonItem>
					<IonItem>
						<IonLabel className="anticontextLabel" position="stacked" style={ {fontSize: "20px"} }>Anticontext Expression:</IonLabel>
						<IonInput id="replaceEx" className="ion-margin-top serifChars" value={editingSoundChange!.anticontext} onIonChange={e => setNewInfo("anticontext", e.detail.value!.trim())}></IonInput>
					</IonItem>
					<IonItem>
						<IonLabel position="stacked">Sound Change Description:</IonLabel>
						<IonInput id="optDesc" className="ion-margin-top" value={editingSoundChange!.description} placeholder="(optional)" onIonChange={e => setNewInfo("description", e.detail.value!.trim())}></IonInput>
					</IonItem>
				</IonList>
			</IonContent>
			<IonFooter>
				<IonToolbar>
					<IonButton color="primary" slot="end" onClick={() => maybeSaveNewSoundChangeInfo()}>
						<IonIcon icon={saveOutline} slot="start" />
						<IonLabel>Save Sound Change</IonLabel>
					</IonButton>
				</IonToolbar>
			</IonFooter>
		</IonModal>
	);
};

export default EditSoundChangeModal;
