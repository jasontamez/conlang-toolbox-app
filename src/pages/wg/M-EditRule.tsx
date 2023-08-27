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
	trashOutline,
	globeOutline
} from 'ionicons/icons';
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { ExtraCharactersModalOpener, WGRewriteRuleObject } from '../../components/ReduxDucksTypes';
import {
	doEditRewriteRuleWG,
	cancelEditRewriteRuleWG,
	deleteRewriteRuleWG
} from '../../components/ReduxDucksFuncs';
import fireSwal from '../../components/Swal';
import repairRegexErrors from '../../components/RepairRegex';
import { $q } from '../../components/DollarSignExports';
import ltr from '../../components/LTR';

const EditRewriteRuleModal = (props: ExtraCharactersModalOpener) => {
	const { isOpen, setIsOpen, openECM } = props;
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
		rewritesObject
	] = useSelector((state: any) => [
		state.appSettings,
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
		setIsOpen(false);
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
		setIsOpen(false);
		dispatch(doEditRewriteRuleWG(editingRule));
		hardReset();
		fireSwal({
			title: "Transformation saved!",
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
				setIsOpen(false);
				dispatch(deleteRewriteRuleWG(currentRule));
				fireSwal({
					title: "Transformation deleted",
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
		<IonModal isOpen={isOpen} onDidDismiss={() => setIsOpen(false)}>
			<IonHeader>
				<IonToolbar color="primary">
					<IonTitle>Edit Transformation</IonTitle>
					<IonButtons slot="end">
						<IonButton onClick={() => openECM(true)}>
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
						<IonLabel className="seekLabel ">Search Expression:</IonLabel>
					</IonItem>
					<IonItem>
						<IonInput aria-label="Search expression" id="searchEx" className="ion-margin-top serifChars" value={editingRule!.seek} onIonChange={e => setNewInfo("seek", (e.detail.value as string).trim())}></IonInput>
					</IonItem>
					<IonItem className="labelled">
						<IonLabel className="replaceLabel">Replacement Expression:</IonLabel>
					</IonItem>
					<IonItem>
						<IonInput aria-label="Replacement expression" id="replaceEx" className="ion-margin-top serifChars" value={editingRule!.replace} onIonChange={e => setNewInfo("replace", (e.detail.value as string).trim())}></IonInput>
					</IonItem>
					<IonItem className="labelled">
						<IonLabel>Transformation Description:</IonLabel>
					</IonItem>
					<IonItem>
						<IonInput aria-label="Description of transformation" id="optDesc" className="ion-margin-top" value={editingRule!.description} placeholder="(optional)" onIonChange={e => setNewInfo("description", (e.detail.value as string).trim())}></IonInput>
					</IonItem>
				</IonList>
			</IonContent>
			<IonFooter>
				<IonToolbar>
					<IonButton color="tertiary" slot="end" onClick={() => maybeSaveNewRuleInfo()}>
						<IonIcon icon={saveOutline} slot="start" />
						<IonLabel>Save Transformation</IonLabel>
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
