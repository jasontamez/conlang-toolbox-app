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

import { WESoundChangeObject, ExtraCharactersModalOpener, StateObject, SetState } from '../../../store/types';
import { deleteSoundChangeWE, editSoundChangeWE } from '../../../store/weSlice';
import useTranslator from '../../../store/translationHooks';

import repairRegexErrors from '../../../components/RepairRegex';
import { $i, $q } from '../../../components/DollarSignExports';
import ltr from '../../../components/LTR';
import yesNoAlert from '../../../components/yesNoAlert';
import toaster from '../../../components/toaster';

interface ModalProps extends ExtraCharactersModalOpener {
	editing: null | WESoundChangeObject
	setEditing: SetState<null | WESoundChangeObject>
}

const EditSoundChangeModal = (props: ModalProps) => {
	const { isOpen, setIsOpen, openECM, editing, setEditing } = props;
	const dispatch = useDispatch();
	const [doAlert] = useIonAlert();
	const toast = useIonToast();
	const [ t ] = useTranslator('we');
	const [ tc ] = useTranslator('common');
	const [ tw ] = useTranslator('wgwe');
	const { disableConfirms } = useSelector((state: StateObject) => state.appSettings);

	const [seekEl, setSeekEl] = useState<HTMLInputElement | null>(null);
	const [replaceEl, setReplaceEl] = useState<HTMLInputElement | null>(null);
	const [contextEl, setContextEl] = useState<HTMLInputElement | null>(null);
	const [antiEl, setAntiEl] = useState<HTMLInputElement | null>(null);
	const [descEl, setDescEl] = useState<HTMLInputElement | null>(null);
	const onLoad = () => {
		const _seekEl = $i<HTMLInputElement>("editSeekExWESC");
		const _replaceEl = $i<HTMLInputElement>("editReplaceExWESC");
		const _contextEl = $i<HTMLInputElement>("editContextExWESC");
		const _antiEl = $i<HTMLInputElement>("editAnticontextExWESC");
		const _descEl = $i<HTMLInputElement>("editOptDescWESC");
		if(editing) {
			const { seek, replace, context, anticontext, description } = editing;
			_seekEl && (_seekEl.value = seek);
			_replaceEl && (_replaceEl.value = replace);
			_contextEl && (_contextEl.value = context);
			_antiEl && (_antiEl.value = anticontext);
			_descEl && (_descEl.value = description);
		} else {
			_seekEl && (_seekEl.value = "");
			_replaceEl && (_replaceEl.value = "");
			_contextEl && (_contextEl.value = "");
			_antiEl && (_antiEl.value = "");
			_descEl && (_descEl.value = "");
		}
		setSeekEl(_seekEl);
		setReplaceEl(_replaceEl);
		setContextEl(_contextEl);
		setAntiEl(_antiEl);
		setDescEl(_descEl);
	};

	const cancelEditing = () => {
		setEditing(null);
		setIsOpen(false);
	};
	function resetError(prop: string) {
		// Remove danger color if present
		// Debounce means this sometimes doesn't exist by the time this is called.
		const where = $q("." + prop + "Label");
		where && where.classList.remove("invalidValue");
	}
	const maybeSaveNewSoundChangeInfo = () => {
		const err: string[] = [];
		const contextTest = (context: string, element: string) => {
			let ind = context.indexOf("_");
			const what = t(element);
			if(ind === -1) {
				return t("noUnderscore", { what });
			} else if (context.indexOf("_", ind+1) !== -1) {
				return t("multiUnderscore", { what });
			}
			const max = context.length - 1;
			ind = context.indexOf("#");
			while(ind !== -1) {
				if(ind > 0 && ind !== max) {
					return t("wordBoundaryError", { what });
				}
				ind = context.indexOf("#", (ind + 1));
			}
			return false;
		};
		// Test info for validness, then save if needed and reset the editingSoundChange
		const seek = (seekEl && seekEl.value) || "";
		const context = (contextEl && contextEl.value) || "_";
		const anti = (antiEl && antiEl.value) || "";
		let temp: boolean | string;
		if(seek === "") {
			const el = $q(".seekLabel");
			el && el.classList.add("invalidValue");
			err.push(t("No search expression present"));
		}
		if((temp = contextTest(context, "Context"))) {
			err.push(temp);
			const el = $q(".contextLabel");
			el && el.classList.add("invalidValue");
		}
		if(anti && (temp = contextTest(anti, "Anticontext"))) {
			err.push(temp);
			const el = $q(".anticontextLabel");
			el && el.classList.add("invalidValue");
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
				cssClass: "danger",
				message: err.join("; "),
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
		const description = (descEl && descEl.value) || "";
		setIsOpen(false);
		dispatch(editSoundChangeWE({
			id: editing!.id,
			seek: repairRegexErrors(seek),
			replace,
			context: repairRegexErrors(context),
			anticontext: repairRegexErrors(anti),
			description
		}));
		toaster({
			message: tc("thingSaved", { thing: t("Sound Change") }),
			duration: 2500,
			color: "success",
			position: "top",
			toast
		});
	};
	const maybeDeleteSoundChange = () => {
		const groups = $q<HTMLIonListElement>((".soundChanges"));
		groups && groups.closeSlidingItems();
		const handler = () => {
			setIsOpen(false);
			dispatch(deleteSoundChangeWE(editing!.id));
			toaster({
				message: tc("thingDeleted", { thing: t("Sound Change") }),
				duration: 2500,
				color: "danger",
				position: "top",
				toast
			});
		};
		if(disableConfirms) {
			handler();
		} else {
			let soundChange =
				editing!.seek
				+ (ltr() ? "⟶" : "⟵")
				+ editing!.replace
				+ "/"
				+ editing!.context;
			if(editing!.anticontext) {
				soundChange += "/" + editing!.anticontext;
			}
			yesNoAlert({
				header: soundChange,
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
					<IonTitle>{t("editThing", { thing: t("Sound Change") })}</IonTitle>
					<IonButtons slot="end">
						<IonButton onClick={() => openECM(true)} aria-label={tc("Extra Characters")}>
							<IonIcon icon={globeOutline} />
						</IonButton>
						<IonButton onClick={() => cancelEditing()} aria-label={tc("Close")}>
							<IonIcon icon={closeCircleOutline} />
						</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<IonList lines="none" className="hasSpecialLabels">
					<IonItem className="labelled">
						<IonLabel className="seekLabel">{tw("search expression", { context: "presentation"})}</IonLabel>
					</IonItem>
					<IonItem>
						<IonInput
							aria-label={t("search expression", { context: "formal" })}
							id="editSeekExWESC"
							className="ion-margin-top serifChars"
							helperText={t("sound to change")}
							onIonChange={e => resetError("seek")}
						></IonInput>
					</IonItem>
					<IonItem className="labelled">
						<IonLabel className="replaceLabel">{tw("replacement expression", { context: "presentation" })}</IonLabel>
					</IonItem>
					<IonItem>
						<IonInput
							aria-label={tw("replacement expression", { context: "formal" })}
							id="editReplaceExWESC"
							helperText={t("sound changes into this")}
							className="ion-margin-top serifChars"
						></IonInput>
					</IonItem>
					<IonItem className="labelled">
						<IonLabel className="contextLabel">{t("context expression", { context: "presentation" })}</IonLabel>
					</IonItem>
					<IonItem>
						<IonInput
							aria-label={t("context expression", { context: "formal" })}
							id="editContextExWESC"
							className="ion-margin-top serifChars"
							helperText={t("where the change happens")}
							onIonChange={e => resetError("context")}
						></IonInput>
					</IonItem>
					<IonItem className="labelled">
						<IonLabel className="anticontextLabel">{t("anticontext expression", { context: "presentation" })}</IonLabel>
					</IonItem>
					<IonItem>
						<IonInput
							aria-label={t("anticontext expression", { context: "formal" })}
							id="editAnticontextExWESC"
							className="ion-margin-top serifChars"
							helperText={t("where the change cannot happen")}
							onIonChange={e => resetError("anticontext")}
						></IonInput>
					</IonItem>
					<IonItem className="labelled">
						<IonLabel>{t("sound change description", { context: "presentation" })}</IonLabel>
					</IonItem>
					<IonItem>
						<IonInput
							aria-label={t("sound change description")}
							id="editOptDescWESC"
							className="ion-margin-top"
							placeholder={tc("optional")}
						></IonInput>
					</IonItem>
				</IonList>
			</IonContent>
			<IonFooter>
				<IonToolbar>
					<IonButton
						color="primary"
						slot="end"
						onClick={() => maybeSaveNewSoundChangeInfo()}
					>
						<IonIcon icon={saveOutline} slot="start" />
						<IonLabel>{tc("saveThing", { thing: t("SChange") })}</IonLabel>
					</IonButton>
					<IonButton
						color="danger"
						slot="start"
						onClick={() => maybeDeleteSoundChange()}
					>
						<IonIcon icon={trashOutline} slot="start" />
						<IonLabel>{tc("deleteThing", { thing: t("SChange") })}</IonLabel>
					</IonButton>
				</IonToolbar>
			</IonFooter>
		</IonModal>
	);
};

export default EditSoundChangeModal;
