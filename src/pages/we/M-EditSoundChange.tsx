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
	saveOutline,
	trashOutline
} from 'ionicons/icons';
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { WESoundChangeObject } from '../../components/ReduxDucksTypes';
import {
	closeModal,
	doEditSoundChangeWE,
	cancelEditSoundChangeWE,
	deleteSoundChangeWE
} from '../../components/ReduxDucksFuncs';
import fireSwal from '../../components/Swal';
import repairRegexErrors from '../../components/RepairRegex';
import { $q } from '../../components/DollarSignExports';
import ltr from '../../components/LTR';

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
	const [
		modalState,
		soundChangesObject,
		settings
	] = useSelector((state: any) => [
		state.modalState,
		state.wordevolveSoundChanges,
		state.appSettings
	], shallowEqual);
	const editing = soundChangesObject.editing;
	let editingSoundChange: WESoundChangeObject = {
		key: "",
		seek: "",
		replace: "",
		context: "",
		anticontext: "",
		description: ""
	};
	let currentSoundChange: WESoundChangeObject;
	soundChangesObject.list.every((change: WESoundChangeObject) => {
		if(change.key === editing) {
			editingSoundChange = {
				...change
			};
			currentSoundChange = change;
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
		// Test info for validness, then save if needed and reset the editingSoundChange
		let temp: boolean | string;
		if(editingSoundChange.seek === "") {
			$q(".seekLabel").classList.add("invalidValue");
			err.push("No search expression present");
		}
		if(editingSoundChange.context === "") {
			editingSoundChange.context = "_";
		} else if((temp = contextTest(editingSoundChange.context))) {
			err.push(temp);
			$q(".contextLabel").classList.add("invalidValue");
		}
		if(editingSoundChange.anticontext && (temp = contextTest(editingSoundChange.anticontext, "Anticontext"))) {
			err.push(temp);
			$q(".anticontextLabel").classList.add("invalidValue");
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
		// Fix any possible regex problems
		editingSoundChange.seek = repairRegexErrors(editingSoundChange.seek);
		editingSoundChange.context = repairRegexErrors(editingSoundChange.context);
		editingSoundChange.replace = repairRegexErrors(editingSoundChange.replace);
		editingSoundChange.anticontext = repairRegexErrors(editingSoundChange.anticontext);
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
	const maybeDeleteSoundChange = () => {
		$q(".soundChanges").closeSlidingItems();
		const thenFunc = (result: any) => {
			if(result.isConfirmed) {
				dispatch(deleteSoundChangeWE(currentSoundChange));
				fireSwal({
					title: "Rewrite Rule deleted",
					customClass: {popup: 'dangerToast'},
					toast: true,
					timer: 2500,
					timerProgressBar: true,
					showConfirmButton: false
				});
			}
		};
		if(settings.disableConfirms) {
			thenFunc({isConfirmed: true});
		} else {
			let soundChange =
				currentSoundChange.seek
				+ (ltr() ? "⟶" : "⟵")
				+ currentSoundChange.replace
				+ "/"
				+ currentSoundChange.context;
			if(currentSoundChange.anticontext) {
				soundChange +=  "/" + currentSoundChange.anticontext;
			}
			fireSwal({
				title: "Delete " + soundChange + "?",
				text: "Are you sure? This cannot be undone.",
				customClass: {popup: 'deleteConfirm'},
				icon: 'warning',
				showCancelButton: true,
				confirmButtonText: "Yes, delete it."
			}).then(thenFunc);
		}
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
					<IonButton color="danger" slot="start" onClick={() => maybeDeleteSoundChange()}>
						<IonIcon icon={trashOutline} slot="start" />
						<IonLabel>Delete Item</IonLabel>
					</IonButton>
				</IonToolbar>
			</IonFooter>
		</IonModal>
	);
};

export default EditSoundChangeModal;
