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
import '../WordGen.css';
import { WGRewriteRuleObject, closeModal, doEditRewriteRule, cancelEditRewriteRule } from '../../components/ReduxDucks';
import fireSwal from '../../components/Swal';
import { $q } from '../../components/DollarSignExports';

const EditRewriteRuleModal = () => {
	const hardReset = () => {
		editingRule = {
			key: "",
			seek: "",
			replace: "",
			description: "",
			regex: new RegExp("")
		};
	};
	const dispatch = useDispatch();
	const modalState = useSelector((state: any) => state.modalState, shallowEqual);
	const rewritesObject = useSelector((state: any) => state.rewriteRules, shallowEqual);
	const editing = rewritesObject.editing;
	let editingRule: WGRewriteRuleObject = {
		key: "",
		seek: "",
		replace: "",
		description: "",
		regex: new RegExp("")
	};
	rewritesObject.list.every((rr: WGRewriteRuleObject) => {
		if(rr.key === editing) {
			editingRule = {
				...rr
			};
			return false;
		}
		return true;
	});
	const cancelEditing = () => {
		dispatch(cancelEditRewriteRule(editing));
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
		if(editingRule.replace === "") {
			$q(".replaceLabel").classList.add("invalidValue");
			err.push("No replacement expression present");
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
		editingRule.regex = new RegExp(editingRule.seek, "g");
		dispatch(closeModal('EditRewriteRule'));
		dispatch(doEditRewriteRule(editingRule));
		hardReset();
		fireSwal({
			title: "Rewrite Rule saved!",
			toast: true,
			position: 'bottom',
			timer: 2500,
			timerProgressBar: true,
			showConfirmButton: false
		});
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
						<IonLabel className="seekLabel" position="stacked" style={ {fontSize: "20px"} }>Search Expression:</IonLabel>
						<IonInput id="searchEx" className="ion-margin-top" value={editingRule!.seek} onIonChange={e => setNewInfo("seek", e.detail.value!.trim())}></IonInput>
					</IonItem>
					<IonItem>
						<IonLabel className="replaceLabel" position="stacked" style={ {fontSize: "20px"} }>Replacement Expression:</IonLabel>
						<IonInput id="replaceEx" className="ion-margin-top" value={editingRule!.replace} onIonChange={e => setNewInfo("replace", e.detail.value!.trim())}></IonInput>
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
				</IonToolbar>
			</IonFooter>
		</IonModal>
	);
};

export default EditRewriteRuleModal;
