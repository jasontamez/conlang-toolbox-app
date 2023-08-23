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
	IonRadioGroup,
	IonRadio,
	IonItemDivider
} from '@ionic/react';
import {
	closeCircleOutline,
	saveOutline,
	trashOutline,
	globeOutline
} from 'ionicons/icons';
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { WETransformObject } from '../../components/ReduxDucksTypes';
import {
	openModal,
	closeModal,
	doEditTransformWE,
	cancelEditTransformWE,
	deleteTransformWE
} from '../../components/ReduxDucksFuncs';
import fireSwal from '../../components/Swal';
import { $q } from '../../components/DollarSignExports';
import ltr from '../../components/LTR';

const EditTransformModal = () => {
	const hardReset = () => {
		editingTransform = {
			key: "",
			seek: "",
			replace: "",
			direction: "both",
			description: ""
		};
	};
	const dispatch = useDispatch();
	const [
		modalState,
		rewritesObject,
		settings
	] = useSelector((state: any) => [
		state.modalState,
		state.wordevolveTransforms,
		state.appSettings
	], shallowEqual);
	const editing = rewritesObject.editing;
	let editingTransform: WETransformObject = {
		key: "",
		seek: "",
		replace: "",
		direction: "both",
		description: ""
	};
	let currentTransform: WETransformObject;
	rewritesObject.list.every((trans: WETransformObject) => {
		if(trans.key === editing) {
			editingTransform = {
				...trans
			};
			currentTransform = trans;
			return false;
		}
		return true;
	});
	const cancelEditing = () => {
		dispatch(cancelEditTransformWE(editing));
		dispatch(closeModal('EditTransform'));
	};
	function setNewInfo<
		KEY extends keyof WETransformObject,
		VAL extends WETransformObject[KEY]
	>(prop: KEY, value: VAL) {
		// Set the property
		editingTransform[prop] = value;
		// Remove danger color if present
		// Debounce means this sometimes doesn't exist by the time this is called.
		let where = $q("." + prop + "Label");
		(where !== null) && where.classList.remove("invalidValue");
	}
	const maybeSaveNewTransformInfo = () => {
		let err: string[] = [];
		// Test info for validness, then save if needed and reset the editingTransform
		if(editingTransform.seek === "") {
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
		dispatch(closeModal('EditTransform'));
		dispatch(doEditTransformWE(editingTransform));
		hardReset();
		fireSwal({
			title: "Transform saved!",
			toast: true,
			timer: 2500,
			timerProgressBar: true,
			showConfirmButton: false
		});
	};
	const maybeDeleteTransform = () => {
		const makeArrow = (dir: string) => (dir === "both" ? "⟷" : ((ltr() ? dir === "in" : dir === "out") ? "⟶" : "⟵"));
		$q(".transforms").closeSlidingItems();
		const thenFunc = (result: any) => {
			if(result.isConfirmed) {
				dispatch(closeModal('EditTransform'));
				dispatch(deleteTransformWE(currentTransform));
				fireSwal({
					title: "Transform deleted",
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
			fireSwal({
				title:
					"Delete "
					+ currentTransform.seek
					+ " "
					+ makeArrow(currentTransform.direction)
					+ " "
					+ currentTransform.replace
					+ "?",
				text: "Are you sure? This cannot be undone.",
				customClass: {popup: 'deleteConfirm'},
				icon: 'warning',
				showCancelButton: true,
				confirmButtonText: "Yes, delete it."
			}).then(thenFunc);
		}
	};
	return (
		<IonModal isOpen={modalState.EditTransform} onDidDismiss={() => dispatch(closeModal('EditTransform'))}>
			<IonHeader>
				<IonToolbar color="primary">
					<IonTitle>Edit Transform</IonTitle>
					<IonButtons slot="end">
						<IonButton onClick={() => dispatch(openModal("ExtraCharacters"))}>
							<IonIcon icon={globeOutline} />
						</IonButton>
						<IonButton onClick={() => cancelEditing()}>
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
						<IonInput id="searchEx" className="ion-margin-top serifChars" value={editingTransform!.seek} onIonChange={e => setNewInfo("seek", (e.detail.value as string).trim())}></IonInput>
					</IonItem>
					<IonItem className="labelled">
						<IonLabel className="replaceLabel">Output Expression:</IonLabel>
					</IonItem>
					<IonItem>
						<IonInput id="replaceEx" className="ion-margin-top serifChars" value={editingTransform!.replace} onIonChange={e => setNewInfo("replace", (e.detail.value as string).trim())}></IonInput>
					</IonItem>
					<IonItem className="labelled">
						<IonLabel>Transform Description:</IonLabel>
					</IonItem>
					<IonItem>
						<IonInput id="optDesc" className="ion-margin-top" value={editingTransform!.description} placeholder="(optional)" onIonChange={e => setNewInfo("description", (e.detail.value as string).trim())}></IonInput>
					</IonItem>
					<IonItemDivider>
						<IonLabel>Transform Direction:</IonLabel>
					</IonItemDivider>
					<IonRadioGroup value={editingTransform!.direction} onIonChange={e => setNewInfo("direction", e.detail.value as "both" | "in" | "out" | "double")}>
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
					<IonButton color="tertiary" slot="end" onClick={() => maybeSaveNewTransformInfo()}>
						<IonIcon icon={saveOutline} slot="start" />
						<IonLabel>Save Transform</IonLabel>
					</IonButton>
					<IonButton color="danger" slot="start" onClick={() => maybeDeleteTransform()}>
						<IonIcon icon={trashOutline} slot="start" />
						<IonLabel>Delete Item</IonLabel>
					</IonButton>
				</IonToolbar>
			</IonFooter>
		</IonModal>
	);
};

export default EditTransformModal;
