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
import '../WordGen.css';
import { RewriteRuleObject, closeModal, addRewriteRule } from '../../components/ReduxDucks';
import fireSwal from '../../components/Swal';
import { $q } from '../../components/DollarSignExports';
import { v4 as uuidv4 } from 'uuid';

const AddRewriteRuleModal = () => {
	let newRule: RewriteRuleObject = {
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
	};
	const dispatch = useDispatch();
	const modalState = useSelector((state: any) => state.modalState, shallowEqual);
	function setNewInfo<
		KEY extends keyof RewriteRuleObject,
		VAL extends RewriteRuleObject[KEY]
	>(prop: KEY, value: VAL) {
		// Set the property
		newRule[prop] = value;
		// Remove danger color if present
		// Debounce means this sometimes doesn't exist by the time this is called.
		let where = $q("." + prop + "Label");
		(where !== null) && where.classList.remove("invalidValue");
	}
	const maybeSaveNewRule = () => {
		let err: string[] = [];
		// Test info for validness, then save if needed and reset the newRule
		if(newRule.seek === "") {
			$q(".seekLabel").classList.add("invalidValue");
			err.push("No search expression present");
		}
		if(newRule.replace === "") {
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
		// Create unique ID for this rule
		newRule.key = uuidv4();
		dispatch(closeModal('AddRewriteRule'));
		dispatch(addRewriteRule(newRule));
		hardReset();
		fireSwal({
			title: "Rewrite Rule added!",
			toast: true,
			position: 'bottom',
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
						<IonInput id="searchEx" className="ion-margin-top" placeholder="..." onIonChange={e => setNewInfo("seek", e.detail.value!.trim())}></IonInput>
					</IonItem>
					<IonItem>
						<IonLabel className="replaceLabel" position="stacked" style={ {fontSize: "20px"} }>Replacement Expression:</IonLabel>
						<IonInput id="replaceEx" className="ion-margin-top" placeholder="..." onIonChange={e => setNewInfo("replace", e.detail.value!.trim())}></IonInput>
					</IonItem>
					<IonItem>
						<IonLabel position="stacked">Rule Description:</IonLabel>
						<IonInput id="optDesc" className="ion-margin-top" placeholder="(optional)" onIonChange={e => setNewInfo("description", e.detail.value!.trim())}></IonInput>
					</IonItem>
				</IonList>
			</IonContent>
			<IonFooter>
				<IonToolbar>
					<IonButton color="tertiary" slot="end" onClick={() => maybeSaveNewRule()}>
						<IonIcon icon={addOutline} slot="start" />
						<IonLabel>Add Rule</IonLabel>
					</IonButton>
				</IonToolbar>
			</IonFooter>
		</IonModal>
	);
};

export default AddRewriteRuleModal;