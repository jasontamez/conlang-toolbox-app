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
	IonRadioGroup,
	IonRadio,
	IonItemDivider,
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

import { ExtraCharactersModalOpener, WETransformObject } from '../../components/ReduxDucksTypes';
import {
	doEditTransformWE,
	cancelEditTransformWE,
	deleteTransformWE
} from '../../components/ReduxDucksFuncs';
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
		transformsObject,
		settings
	] = useSelector((state: any) => [
		state.wordevolveTransforms,
		state.appSettings
	], shallowEqual);
	const editing = transformsObject.editing;

	const [ editSearchExWE, setEditSearchExWE ] = useState<HTMLInputElement | null>(null);
	const [ editReplaceExWE, setEditReplaceExWE ] = useState<HTMLInputElement | null>(null);
	const [ editOptDescWE, setEditOptDescWE ] = useState<HTMLInputElement | null>(null);
	const [ direction, setDirection] = useState<"both" | "in" | "out" | "double">("both");
	const [ currentTransform, setCurrentTransform] = useState<WETransformObject | null>(null);
	const loadInfo = () => {
		const searchEl = $i("editSearchExWE");
		const replaceEl = $i("editReplaceExWE");
		const descEl = $i("editOptDescWE");
		setEditSearchExWE(searchEl || null);
		setEditReplaceExWE(replaceEl || null);
		setEditOptDescWE(descEl || null);
		searchEl && (searchEl.value = "");
		replaceEl && (replaceEl.value = "");
		descEl && (descEl.value = "");
		transformsObject.list.forEach((obj: WETransformObject) => {
			const {key, seek, replace, description, direction} = obj;
			if(key === editing) {
				searchEl && (searchEl.value = seek);
				replaceEl && (replaceEl.value = replace);
				descEl && (descEl.value = description);
				setDirection(direction);
				setCurrentTransform(obj);
			}
		});
	};


	const cancelEditing = () => {
		dispatch(cancelEditTransformWE(editing));
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
		const seek = editSearchExWE!.value || "";
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
		const replace = editReplaceExWE!.value || "";
		const description = editOptDescWE!.value.trim() || "";
		setIsOpen(false);
		dispatch(doEditTransformWE({
			key: currentTransform!.key,
			seek,
			replace,
			direction,
			description
		}));
		toaster({
			message: "Transform saved!",
			duration: 2500,
			color: "success",
			doToast,
			undoToast
		});
	};
	const maybeDeleteTransform = () => {
		const makeArrow = (dir: string) => (dir === "both" ? "⟷" : ((ltr() ? dir === "in" : dir === "out") ? "⟶" : "⟵"));
		$q(".transforms").closeSlidingItems();
		const handler = () => {
			setIsOpen(false);
			dispatch(deleteTransformWE(currentTransform!));
			toaster({
				message: "Transform deleted.",
				duration: 2500,
				color: "danger",
				doToast,
				undoToast
			});
		};
		if(settings.disableConfirms) {
			handler();
		} else {
			const { seek, direction, replace } = currentTransform!;
			yesNoAlert({
				header: `${seek} ${makeArrow(direction)} ${replace}`,
				message: "Are you sure you want to delete this? This cannot be undone.",
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
					<IonTitle>Edit Transform</IonTitle>
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
						<IonLabel className="seekLabel">Input Expression:</IonLabel>
					</IonItem>
					<IonItem>
						<IonInput aria-label="Input expression" id="editSearchExWE" className="ion-margin-top serifChars" onIonChange={e => resetError("seek")}></IonInput>
					</IonItem>
					<IonItem className="labelled">
						<IonLabel className="replaceLabel">Output Expression:</IonLabel>
					</IonItem>
					<IonItem>
						<IonInput aria-label="Output expression" id="editReplaceExWE" className="ion-margin-top serifChars"></IonInput>
					</IonItem>
					<IonItem className="labelled">
						<IonLabel>Transform Description:</IonLabel>
					</IonItem>
					<IonItem>
						<IonInput aria-label="Description of the transform" id="editOptDescWE" className="ion-margin-top" placeholder="(optional)"></IonInput>
					</IonItem>
					<IonItemDivider>
						<IonLabel>Transform Direction:</IonLabel>
					</IonItemDivider>
					<IonRadioGroup value={direction} onIonChange={e => setDirection(e.detail.value as "both" | "in" | "out" | "double")}>
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
