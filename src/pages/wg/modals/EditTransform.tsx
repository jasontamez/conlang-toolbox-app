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
import { useSelector, useDispatch } from "react-redux";

import { ExtraCharactersModalOpener, SetState, StateObject, WGTransformObject } from '../../../store/types';
import { editTransformWG, deleteTransformWG } from '../../../store/wgSlice';
import useTranslator from '../../../store/translationHooks';

import repairRegexErrors from '../../../components/RepairRegex';
import { $i, $q } from '../../../components/DollarSignExports';
import ltr from '../../../components/LTR';
import yesNoAlert from '../../../components/yesNoAlert';
import toaster from '../../../components/toaster';

interface ModalProps extends ExtraCharactersModalOpener {
	editing: null | WGTransformObject
	setEditing: SetState<null | WGTransformObject>
}

const EditTransformModal = (props: ModalProps) => {
	const { isOpen, setIsOpen, openECM, editing, setEditing } = props;
	const dispatch = useDispatch();
	const [ t ] = useTranslator('we');
	const [ tc ] = useTranslator('common');
	const [ tw ] = useTranslator('wgwe');
	const [doAlert] = useIonAlert();
	const toast = useIonToast();
	const { disableConfirms } = useSelector((state: StateObject) => state.appSettings)
	const [searchEl, setSearchEl] = useState<HTMLInputElement | null>(null);
	const [replaceEl, setReplaceEl] = useState<HTMLInputElement | null>(null);
	const [descEl, setDescEl] = useState<HTMLInputElement | null>(null);

	const onLoad = () => {
		const _searchEl = $i<HTMLInputElement>("editSearchExWG");
		const _replaceEl = $i<HTMLInputElement>("editReplaceExWG");
		const _descEl = $i<HTMLInputElement>("editOptDescWG");
		if(editing) {
			const { seek, replace, description } = editing;
			_searchEl && (_searchEl.value = seek);
			_replaceEl && (_replaceEl.value = replace);
			_descEl && (_descEl.value = description);
		} else {
			_searchEl && (_searchEl.value = "");
			_replaceEl && (_replaceEl.value = "");
			_descEl && (_descEl.value = "");
		}
		setSearchEl(_searchEl);
		setReplaceEl(_replaceEl);
		setDescEl(_descEl);
	};

	const cancelEditing = () => {
		setIsOpen(false);
		setEditing(null);
	};
	function resetError(prop: string) {
		// Remove danger color if present
		// Debounce means this sometimes doesn't exist by the time this is called.
		const where = $q("." + prop + "Label");
		where && where.classList.remove("invalidValue");
	}
	const maybeSaveNewTransformInfo = () => {
		const err: string[] = [];
		// Test info for validness, then save if needed and reset the editingTransform
		const seek = (searchEl && searchEl.value) || "";
		if(seek === "") {
			const el = $q(".seekLabel");
			el && el.classList.add("invalidValue");
			err.push(tw("No search expression present"));
		}
		try {
			new RegExp(seek);
		} catch(e) {
			err.push(`${e}`);
		}
		if(err.length > 0) {
			// Errors found.
			doAlert({
				header: tc("error"),
				message: err.join("; "),
				cssClass: "danger",
				buttons: [
					{
						text: tc("Cancel"),
						role: "cancel",
						cssClass: "cancel"
					}
				]
			});
			return;
		}
		// Everything ok!
		const replace = repairRegexErrors((replaceEl && replaceEl.value) || "");
		const description = (descEl && descEl.value.trim()) || "";
		setIsOpen(false);
		dispatch(editTransformWG({
			id: editing!.id,
			seek: repairRegexErrors(seek),
			replace,
			description
		}));
		toaster({
			message: tc("thingSaved", { thing: t("Transformation")}),
			duration: 2500,
			color: "success",
			position: "top",
			toast
		});
	};
	const maybeDeleteTransform = () => {
		const groups = $q<HTMLIonListElement>((".transforms"));
		groups && groups.closeSlidingItems();
		const handler = () => {
			setIsOpen(false);
			dispatch(deleteTransformWG(editing!.id));
			toaster({
				message: tc("thingDeleted", { thing: t("Transformation") }),
				duration: 2500,
				color: "danger",
				position: "top",
				toast
			});
		};
		if(disableConfirms) {
			handler();
		} else if (editing) {
			const { seek, replace } = editing;
			yesNoAlert({
				header: `${seek}${ltr() ? "⟶" : "⟵"}${replace}`,
				message: tc("Are you sure you want to delete this? This cannot be undone."),
				cssClass: "danger",
				submit: tc("confirmDelIt"),
				handler,
				doAlert
			});
		}
	};
	return (
		<IonModal
			isOpen={isOpen}
			onDidDismiss={() => setIsOpen(false)}
			onIonModalDidPresent={onLoad}
		>
			<IonHeader>
				<IonToolbar color="primary">
					<IonTitle>{tc("editThing", { thing: t("Transformation") })}</IonTitle>
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
						<IonLabel className="seekLabel">{tw("search expression", { context: "presentation" })}</IonLabel>
					</IonItem>
					<IonItem>
						<IonInput
							aria-label={tw("search expression")}
							id="editSearchExWG"
							className="ion-margin-top serifChars"
							onIonChange={e => resetError("seek")}
						></IonInput>
					</IonItem>
					<IonItem className="labelled">
						<IonLabel className="replaceLabel">{tw("replacement expression", { context: "presentation" })}</IonLabel>
					</IonItem>
					<IonItem>
						<IonInput
							aria-label={tw("replacement expression")}
							id="editReplaceExWG"
							className="ion-margin-top serifChars"
						></IonInput>
					</IonItem>
					<IonItem className="labelled">
						<IonLabel>{tw("Description of the transformation", { context: "presentation" })}</IonLabel>
					</IonItem>
					<IonItem>
						<IonInput
							aria-label={tw("Description of the transformation")}
							id="editOptDescWG"
							className="ion-margin-top"
							placeholder={tc("optional")}
						></IonInput>
					</IonItem>
				</IonList>
			</IonContent>
			<IonFooter>
				<IonToolbar>
					<IonButton color="tertiary" slot="end" onClick={() => maybeSaveNewTransformInfo()}>
						<IonIcon icon={saveOutline} slot="start" />
						<IonLabel>{tc("saveThing", { thing: tw("Transformation") })}</IonLabel>
					</IonButton>
					<IonButton color="danger" slot="start" onClick={() => maybeDeleteTransform()}>
						<IonIcon icon={trashOutline} slot="start" />
						<IonLabel>{tc("deleteThing", { thing: tw("Transformation") })}</IonLabel>
					</IonButton>
				</IonToolbar>
			</IonFooter>
		</IonModal>
	);
};

export default EditTransformModal;
