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

import { ExtraCharactersModalOpener, WGTransformObject } from '../../store/types';
import { editTransformWG, deleteTransformWG } from '../../store/wgSlice';

import repairRegexErrors from '../../components/RepairRegex';
import { $i, $q } from '../../components/DollarSignExports';
import ltr from '../../components/LTR';
import yesNoAlert from '../../components/yesNoAlert';
import toaster from '../../components/toaster';

interface ModalProps extends ExtraCharactersModalOpener {
	editing: null | WGTransformObject
	setEditing: Function
}

const EditTransformModal = (props: ModalProps) => {
	const { isOpen, setIsOpen, openECM, editing, setEditing } = props;
	const dispatch = useDispatch();
	const [doAlert] = useIonAlert();
	const [doToast, undoToast] = useIonToast();
	const { disableConfirms } = useSelector((state: any) => state.appSettings)
	const [searchEl, setSearchEl] = useState<HTMLInputElement | null>(null);
	const [replaceEl, setReplaceEl] = useState<HTMLInputElement | null>(null);
	const [descEl, setDescEl] = useState<HTMLInputElement | null>(null);

	const onLoad = () => {
		const _searchEl = $i("editSearchExWG");
		const _replaceEl = $i("editReplaceExWG");
		const _descEl = $i("editOptDescWG");
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
		(where !== null) && where.classList.remove("invalidValue");
	}
	const maybeSaveNewTransformInfo = () => {
		const err: string[] = [];
		// Test info for validness, then save if needed and reset the editingTransform
		const seek = (searchEl && searchEl.value) || "";
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
			message: "Transformation saved!",
			duration: 2500,
			color: "success",
			position: "top",
			doToast,
			undoToast
		});
	};
	const maybeDeleteTransform = () => {
		$q(".transforms").closeSlidingItems();
		const handler = () => {
			setIsOpen(false);
			dispatch(deleteTransformWG(editing!.id));
			toaster({
				message: "Transformation deleted.",
				duration: 2500,
				color: "danger",
				position: "top",
				doToast,
				undoToast
			});
		};
		if(disableConfirms) {
			handler();
		} else if (editing) {
			const { seek, replace } = editing;
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
		<IonModal isOpen={isOpen} onDidDismiss={() => setIsOpen(false)} onIonModalDidPresent={onLoad}>
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
