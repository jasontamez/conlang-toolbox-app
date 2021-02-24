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
import { closeModal, addRewriteRuleWG } from '../../components/ReduxDucksFuncs';
import { WGRewriteRuleObject } from '../../components/ReduxDucksTypes';
import fireSwal from '../../components/Swal';
import { $q, $a } from '../../components/DollarSignExports';
import repairRegexErrors from '../../components/RepairRegex';
import { v4 as uuidv4 } from 'uuid';

const AddRewriteRuleModal = () => {
	let newRule: WGRewriteRuleObject = {
		key: "",
		seek: "",
		replace: "",
		description: ""
	};
	const hardReset = () => {
		newRule = {
			key: "",
			seek: "",
			replace: "",
			description: ""
		};
		$a("ion-input").forEach((input: HTMLInputElement) => input.value = "");
	};
	const dispatch = useDispatch();
	const modalState = useSelector((state: any) => state.modalState, shallowEqual);
	function setNewInfo<
		KEY extends keyof WGRewriteRuleObject,
		VAL extends WGRewriteRuleObject[KEY]
	>(prop: KEY, value: VAL) {
		// Set the property
		newRule[prop] = value;
		// Remove danger color if present
		// Debounce means this sometimes doesn't exist by the time this is called.
		let where = $q("." + prop + "Label");
		(where !== null) && where.classList.remove("invalidValue");
	}
	const maybeSaveNewRule = (close: boolean = true) => {
		let err: string[] = [];
		// Test info for validness, then save if needed and reset the newRule
		if(newRule.seek === "") {
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
		// Create unique ID for this rule
		newRule.key = uuidv4();
		newRule.seek = repairRegexErrors(newRule.seek);
		newRule.replace = repairRegexErrors(newRule.replace);
		close && dispatch(closeModal('AddRewriteRule'));
		dispatch(addRewriteRuleWG(newRule));
		hardReset();
		fireSwal({
			title: "Rewrite Rule added!",
			toast: true,
			timer: 2500,
			timerProgressBar: true,
			showConfirmButton: false
		});
	};
	return (
		<IonModal isOpen={modalState.AddRewriteRule} onDidDismiss={() => dispatch(closeModal('AddRewriteRule'))}>
			<IonHeader>
				<IonToolbar color="primary">
					<IonTitle>Add Rewrite Rule</IonTitle>
					<IonButtons slot="end">
						<IonButton onClick={() => dispatch(closeModal('AddRewriteRule'))}>
							<IonIcon icon={closeCircleOutline} />
						</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<IonList lines="none">
					<IonItem>
						<IonLabel className="seekLabel" position="stacked" style={ {fontSize: "20px"} }>Search Expression:</IonLabel>
						<IonInput id="searchEx" className="ion-margin-top serifChars" placeholder="..." onIonChange={e => setNewInfo("seek", e.detail.value!.trim())}></IonInput>
					</IonItem>
					<IonItem>
						<IonLabel className="replaceLabel" position="stacked" style={ {fontSize: "20px"} }>Replacement Expression:</IonLabel>
						<IonInput id="replaceEx" className="ion-margin-top serifChars" placeholder="..." onIonChange={e => setNewInfo("replace", e.detail.value!.trim())}></IonInput>
					</IonItem>
					<IonItem>
						<IonLabel position="stacked">Rule Description:</IonLabel>
						<IonInput id="optDesc" className="ion-margin-top" placeholder="(optional)" onIonChange={e => setNewInfo("description", e.detail.value!.trim())}></IonInput>
					</IonItem>
				</IonList>
			</IonContent>
			<IonFooter>
				<IonToolbar>
				<IonButton color="tertiary" slot="end" onClick={() => maybeSaveNewRule(false)}>
						<IonIcon icon={addOutline} slot="start" />
						<IonLabel>Add Rule</IonLabel>
					</IonButton>
					<IonButton color="success" slot="end" onClick={() => maybeSaveNewRule()}>
						<IonIcon icon={addOutline} slot="start" />
						<IonLabel>Add and Close</IonLabel>
					</IonButton>
				</IonToolbar>
			</IonFooter>
		</IonModal>
	);
};

export default AddRewriteRuleModal;
