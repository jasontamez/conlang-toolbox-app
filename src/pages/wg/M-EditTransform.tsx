import React, { useState } from 'react';
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
	useIonAlert,
	useIonToast
} from '@ionic/react';
import {
	closeCircleOutline,
	saveOutline,
	trashOutline,
	globeOutline
} from 'ionicons/icons';
import { shallowEqual, useSelector, useDispatch } from "react-redux";

import { ExtraCharactersModalOpener, WGTransformObject } from '../../components/ReduxDucksTypes';
import {
	doEditTransformWG,
	cancelEditTransformWG,
	deleteTransformWG
} from '../../components/ReduxDucksFuncs';
import repairRegexErrors from '../../components/RepairRegex';
import { $i, $q } from '../../components/DollarSignExports';
import ltr from '../../components/LTR';
import yesNoAlert from '../../components/yesNoAlert';
import toaster from '../../components/toaster';

const EditTransformModal = (props: ExtraCharactersModalOpener) => {
	const { isOpen, setIsOpen, openECM } = props;
	const dispatch = useDispatch();
	const [doAlert] = useIonAlert();
	const [doToast, undoToast] = useIonToast();
	const [
		disableConfirms,
		transformsObject
	] = useSelector((state: any) => [
		state.appSettings.disableConfirms,
		state.wordgenTransforms
	], shallowEqual)
	const editing = transformsObject.editing;

	const [ editSearchExWG, setEditSearchExWG ] = useState<HTMLInputElement | null>(null);
	const [ editReplaceExWG, setEditReplaceExWG ] = useState<HTMLInputElement | null>(null);
	const [ editOptDescWG, setEditOptDescWG ] = useState<HTMLInputElement | null>(null);
	const [ currentTransform, setCurrentTransform] = useState<WGTransformObject | null>(null);
	const loadInfo = () => {
		const searchEl = $i("editSearchExWG");
		const replaceEl = $i("editReplaceExWG");
		const descEl = $i("editOptDescWG");
		setEditSearchExWG(searchEl || null);
		setEditReplaceExWG(replaceEl || null);
		setEditOptDescWG(descEl || null);
		searchEl && (searchEl.value = "");
		replaceEl && (replaceEl.value = "");
		descEl && (descEl.value = "");
		transformsObject.list.forEach((obj: WGTransformObject) => {
			const {key, seek, replace, description} = obj;
			if(key === editing) {
				searchEl && (searchEl.value = seek);
				replaceEl && (replaceEl.value = replace);
				descEl && (descEl.value = description);
				setCurrentTransform(obj);
			}
		});
	};


	const cancelEditing = () => {
		dispatch(cancelEditTransformWG(editing));
		setIsOpen(false);
	};
	function resetError(prop: string) {
		// Remove danger color if present
		// Debounce means this sometimes doesn't exist by the time this is called.
		const where = $q("." + prop + "Label");
		(where !== null) && where.classList.remove("invalidValue");
	}
	const maybeSaveNewTransformInfo = () => {
		const err: string[] = [];
		// Test info for validness, then save if needed and reset the editingTransform
		const seek = editSearchExWG!.value || "";
		if(seek === "") {
			$q(".seekLabel").classList.add("invalidValue");
			err.push("No search expression present");
		}
		if(err.length > 0) {
			// Errors found.
			doAlert({
				header: "Error",
				message: err.join("; "),
				buttons: [
					{
						text: "Cancel",
						role: "cancel"
					}
				]
			});
			return;
		}
		// Everything ok!
		const replace = repairRegexErrors(editReplaceExWG!.value || "");
		const description = editOptDescWG!.value.trim() || "";
		setIsOpen(false);
		dispatch(doEditTransformWG({
			key: currentTransform!.key,
			seek: repairRegexErrors(seek),
			replace,
			description
		}));
		toaster({
			message: "Transformation saved!",
			duration: 2500,
			color: "success",
			doToast,
			undoToast
		});
	};
	const maybeDeleteTransform = () => {
		$q(".transforms").closeSlidingItems();
		const handler = () => {
			setIsOpen(false);
			dispatch(deleteTransformWG(currentTransform!));
			toaster({
				message: "Transformation deleted.",
				duration: 2500,
				color: "danger",
				doToast,
				undoToast
			});
		};
		if(disableConfirms) {
			handler();
		} else {
			const { seek, replace } = currentTransform!;
			yesNoAlert({
				header: `${seek}${ltr() ? "⟶" : "⟵"}${replace}`,
				message: "Are you sure you want to delete this? It cannot be undone.",
				cssClass: "danger",
				submit: "Yes, delete it",
				handler,
				doAlert
			});
		}
	};
	return (
		<IonModal isOpen={isOpen} onDidDismiss={() => setIsOpen(false)} onIonModalDidPresent={() => loadInfo()}>
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
						<IonLabel className="seekLabel">Search Expression:</IonLabel>
					</IonItem>
					<IonItem>
						<IonInput aria-label="Search expression" id="editSearchExWG" className="ion-margin-top serifChars" onIonChange={e => resetError("seek")}></IonInput>
					</IonItem>
					<IonItem className="labelled">
						<IonLabel className="replaceLabel">Replacement Expression:</IonLabel>
					</IonItem>
					<IonItem>
						<IonInput aria-label="Replacement expression" id="editReplaceExWG" className="ion-margin-top serifChars"></IonInput>
					</IonItem>
					<IonItem className="labelled">
						<IonLabel>Transformation Description:</IonLabel>
					</IonItem>
					<IonItem>
						<IonInput aria-label="Description of transformation" id="editOptDescWG" className="ion-margin-top" placeholder="(optional)"></IonInput>
					</IonItem>
				</IonList>
			</IonContent>
			<IonFooter>
				<IonToolbar>
					<IonButton color="tertiary" slot="end" onClick={() => maybeSaveNewTransformInfo()}>
						<IonIcon icon={saveOutline} slot="start" />
						<IonLabel>Save Transformation</IonLabel>
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
