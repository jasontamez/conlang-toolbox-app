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
import { useSelector, useDispatch } from "react-redux";

import { ExtraCharactersModalOpener, SetState, StateObject, WETransformDirection, WETransformObject } from '../../../store/types';
import { editTransformWE, deleteTransformWE } from '../../../store/weSlice';
import useTranslator from '../../../store/translationHooks';

import { $i, $q } from '../../../components/DollarSignExports';
import ltr from '../../../components/LTR';
import yesNoAlert from '../../../components/yesNoAlert';
import toaster from '../../../components/toaster';

interface ModalProps extends ExtraCharactersModalOpener {
	editing: null | WETransformObject
	setEditing: SetState<null | WETransformObject>
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
	const [ direction, setDirection ] = useState<WETransformDirection>("both");
	const [searchEl, setSearchEl] = useState<HTMLInputElement | null>(null);
	const [replaceEl, setReplaceEl] = useState<HTMLInputElement | null>(null);
	const [descEl, setDescEl] = useState<HTMLInputElement | null>(null);
	const onLoad = () => {
		const _searchEl = $i<HTMLInputElement>("editSearchExWE");
		const _replaceEl = $i<HTMLInputElement>("editReplaceExWE");
		const _descEl = $i<HTMLInputElement>("editOptDescWE");
		if(editing) {
			const { seek, replace, description, direction } = editing;
			_searchEl && (_searchEl.value = seek);
			_replaceEl && (_replaceEl.value = replace);
			_descEl && (_descEl.value = description);
			setDirection(direction);
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
		const replace = (replaceEl && replaceEl.value) || "";
		const description = (descEl && descEl.value.trim()) || "";
		dispatch(editTransformWE({
			id: editing!.id,
			seek,
			replace,
			direction,
			description
		}));
		cancelEditing();
		toaster({
			message: tc("thingSaved", { thing: t("Transformation")}),
			duration: 2500,
			color: "success",
			position: "top",
			toast
		});
	};
	const maybeDeleteTransform = () => {
		const makeArrow = (dir: string) => (
			dir === "both" ?
				"⟷"
			:
				((ltr() ? dir === "in" : dir === "out") ? "⟶" : "⟵")
		);
		const groups = $q<HTMLIonListElement>((".transforms"));
		groups && groups.closeSlidingItems();
		const handler = () => {
			dispatch(deleteTransformWE(editing!.id));
			cancelEditing();
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
		} else {
			const { seek, direction, replace } = editing!;
			yesNoAlert({
				header: `${seek} ${makeArrow(direction)} ${replace}`,
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
						<IonLabel className="seekLabel">{t("Input Expression", { context: "presentation" })}</IonLabel>
					</IonItem>
					<IonItem>
						<IonInput
							aria-label={t("Input Expression", { context: "presentation" })}
							helperText={t("what to change")}
							id="editSearchExWE"
							className="ion-margin-top serifChars"
							onIonChange={e => resetError("seek")}
						></IonInput>
					</IonItem>
					<IonItem className="labelled">
						<IonLabel className="replaceLabel">{t("Output Expression", { context: "presentation" })}</IonLabel>
					</IonItem>
					<IonItem>
						<IonInput
							aria-label={t("Output Expression", { context: "presentation" })}
							helperText={t("what it changes into")}
							id="editReplaceExWE"
							className="ion-margin-top serifChars"
						></IonInput>
					</IonItem>
					<IonItem className="labelled">
						<IonLabel>{tw("Description of the transformation", { context: "presentation" })}</IonLabel>
					</IonItem>
					<IonItem>
						<IonInput
							aria-label={tw("Description of the transformation")}
							id="editOptDescWE"
							className="ion-margin-top"
							placeholder={tc("optional")}
						></IonInput>
					</IonItem>
					<IonItemDivider>
						<IonLabel>{t("Transformation Direction", { context: "presentation" })}</IonLabel>
					</IonItemDivider>
					<IonRadioGroup
						value={direction}
						onIonChange={e => setDirection(e.detail.value as WETransformDirection)}
					>
						<IonItem>
							<IonRadio
								value="both"
								labelPlacement="end"
								justify="start"
							>{t("At input then undo at output", { context: "formal" })}</IonRadio>
						</IonItem>
						<IonItem>
							<IonRadio
								value="double"
								labelPlacement="end"
								justify="start"
							>{t("At input and at output", { context: "formal" })}</IonRadio>
						</IonItem>
						<IonItem>
							<IonRadio
								value="in"
								labelPlacement="end"
								justify="start"
							>{t("At input only", { context: "formal" })}</IonRadio>
						</IonItem>
						<IonItem>
							<IonRadio
								value="out"
								labelPlacement="end"
								justify="start"
							>{t("At output only", { context: "formal" })}</IonRadio>
						</IonItem>
					</IonRadioGroup>
				</IonList>
			</IonContent>
			<IonFooter>
				<IonToolbar>
					<IonButton
						color="tertiary"
						slot="end"
						onClick={() => maybeSaveNewTransformInfo()}
					>
						<IonIcon icon={saveOutline} slot="start" />
						<IonLabel>{tc("saveThing", { thing: tw("Transformation") })}</IonLabel>
					</IonButton>
					<IonButton
						color="danger"
						slot="start"
						onClick={() => maybeDeleteTransform()}
					>
						<IonIcon icon={trashOutline} slot="start" />
						<IonLabel>{tc("deleteThing", { thing: tw("Transformation") })}</IonLabel>
					</IonButton>
				</IonToolbar>
			</IonFooter>
		</IonModal>
	);
};

export default EditTransformModal;
