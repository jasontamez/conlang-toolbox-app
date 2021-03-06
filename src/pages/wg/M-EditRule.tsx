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
import { WGRewriteRuleObject } from '../../components/ReduxDucksTypes';
import {
	closeModal,
	doEditRewriteRuleWG,
	cancelEditRewriteRuleWG,
	deleteRewriteRuleWG
} from '../../components/ReduxDucksFuncs';
import fireSwal from '../../components/Swal';
import repairRegexErrors from '../../components/RepairRegex';
import { $q } from '../../components/DollarSignExports';
import ltr from '../../components/LTR';

const EditRewriteRuleModal = () => {
	const hardReset = () => {
		editingRule = {
			key: "",
			seek: "",
			replace: "",
			description: ""
		};
	};
	const dispatch = useDispatch();
	const [
		settings,
		modalState,
		rewritesObject
	] = useSelector((state: any) => [
		state.appSettings,
		state.modalState,
		state.wordgenRewriteRules
	], shallowEqual)
	const editing = rewritesObject.editing;
	let editingRule: WGRewriteRuleObject = {
		key: "",
		seek: "",
		replace: "",
		description: ""
	};
	let currentRule: WGRewriteRuleObject;
	rewritesObject.list.every((rr: WGRewriteRuleObject) => {
		if(rr.key === editing) {
			editingRule = {
				...rr
			};
			currentRule = rr;
			return false;
		}
		return true;
	});
	const cancelEditing = () => {
		dispatch(cancelEditRewriteRuleWG(editing));
		dispatch(closeModal('EditRewriteRule'));
	};
	function setNewInfo<
		KEY extends keyof WGRewriteRuleObject,
		VAL extends WGRewriteRuleObject[KEY]
	>(prop: KEY, value: VAL) {
		// Set the property
		editingRule[prop] = value;
		// Remove danger color if present
		// Debounce means this sometimes doesn't exist by the time this is called.
		let where = $q("." + prop + "Label");
		(where !== null) && where.classList.remove("invalidValue");
	}
	const maybeSaveNewRuleInfo = () => {
		let err: string[] = [];
		// Test info for validness, then save if needed and reset the editingRule
		if(editingRule.seek === "") {
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
		editingRule.seek = repairRegexErrors(editingRule.seek);
		editingRule.replace = repairRegexErrors(editingRule.replace);
		dispatch(closeModal('EditRewriteRule'));
		dispatch(doEditRewriteRuleWG(editingRule));
		hardReset();
		fireSwal({
			title: "Rewrite Rule saved!",
			toast: true,
			timer: 2500,
			timerProgressBar: true,
			showConfirmButton: false
		});
	};
	const maybeDeleteRewriteRule = () => {
		$q(".rewriterules").closeSlidingItems();
		const thenFunc = (result: any) => {
			if(result.isConfirmed) {
				dispatch(deleteRewriteRuleWG(currentRule));
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
			fireSwal({
				title: "Delete " + currentRule.seek + (ltr() ? "⟶" : "⟵") + currentRule.replace + "?",
				text: "Are you sure? This cannot be undone.",
				customClass: {popup: 'deleteConfirm'},
				icon: 'warning',
				showCancelButton: true,
				confirmButtonText: "Yes, delete it."
			}).then(thenFunc);
		}
	};
	return (
		<IonModal isOpen={modalState.EditRewriteRule} onDidDismiss={() => dispatch(closeModal('EditRewriteRule'))}>
			<IonHeader>
				<IonToolbar color="primary">
					<IonTitle>Edit Rewrite Rule</IonTitle>
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
						<IonLabel className="seekLabel " position="stacked" style={ {fontSize: "20px"} }>Search Expression:</IonLabel>
						<IonInput id="searchEx" className="ion-margin-top serifChars" value={editingRule!.seek} onIonChange={e => setNewInfo("seek", e.detail.value!.trim())}></IonInput>
					</IonItem>
					<IonItem>
						<IonLabel className="replaceLabel" position="stacked" style={ {fontSize: "20px"} }>Replacement Expression:</IonLabel>
						<IonInput id="replaceEx" className="ion-margin-top serifChars" value={editingRule!.replace} onIonChange={e => setNewInfo("replace", e.detail.value!.trim())}></IonInput>
					</IonItem>
					<IonItem>
						<IonLabel position="stacked">Rule Description:</IonLabel>
						<IonInput id="optDesc" className="ion-margin-top" value={editingRule!.description} placeholder="(optional)" onIonChange={e => setNewInfo("description", e.detail.value!.trim())}></IonInput>
					</IonItem>
				</IonList>
			</IonContent>
			<IonFooter>
				<IonToolbar>
					<IonButton color="tertiary" slot="end" onClick={() => maybeSaveNewRuleInfo()}>
						<IonIcon icon={saveOutline} slot="start" />
						<IonLabel>Save Rule</IonLabel>
					</IonButton>
					<IonButton color="danger" slot="start" onClick={() => maybeDeleteRewriteRule()}>
						<IonIcon icon={trashOutline} slot="start" />
						<IonLabel>Delete Item</IonLabel>
					</IonButton>
				</IonToolbar>
			</IonFooter>
		</IonModal>
	);
};

export default EditRewriteRuleModal;
