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

import { WESoundChangeObject, ExtraCharactersModalOpener, StateObject } from '../../../store/types';
import { deleteSoundChangeWE, editSoundChangeWE } from '../../../store/weSlice';

import repairRegexErrors from '../../../components/RepairRegex';
import { $i, $q } from '../../../components/DollarSignExports';
import ltr from '../../../components/LTR';
import yesNoAlert from '../../../components/yesNoAlert';
import toaster from '../../../components/toaster';

interface ModalProps extends ExtraCharactersModalOpener {
	editing: null | WESoundChangeObject
	setEditing: Function
}

const EditSoundChangeModal = (props: ModalProps) => {
	const { isOpen, setIsOpen, openECM, editing, setEditing } = props;
	const dispatch = useDispatch();
	const [doAlert] = useIonAlert();
	const toast = useIonToast();
	const { disableConfirms } = useSelector((state: StateObject) => state.appSettings);

	const [seekEl, setSeekEl] = useState<HTMLInputElement | null>(null);
	const [replaceEl, setReplaceEl] = useState<HTMLInputElement | null>(null);
	const [contextEl, setContextEl] = useState<HTMLInputElement | null>(null);
	const [antiEl, setAntiEl] = useState<HTMLInputElement | null>(null);
	const [descEl, setDescEl] = useState<HTMLInputElement | null>(null);
	const onLoad = () => {
		const _seekEl = $i("editSeekExWESC");
		const _replaceEl = $i("editReplaceExWESC");
		const _contextEl = $i("editContextExWESC");
		const _antiEl = $i("editAnticontextExWESC");
		const _descEl = $i("editOptDescWESC");
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
		(where !== null) && where.classList.remove("invalidValue");
	}
	const maybeSaveNewSoundChangeInfo = () => {
		const err: string[] = [];
		const contextTest = (context: string, what: string = "Context") => {
			let ind = context.indexOf("_");
			if(ind === -1) {
				return what + " must contain one underscore (_)";
			} else if (context.indexOf("_", ind+1) !== -1) {
				return what + " can only have one underscore (_)";
			}
			const max = context.length - 1;
			ind = context.indexOf("#");
			while(ind !== -1) {
				if(ind > 0 && ind !== max) {
					return what + " can only have word-boundaries (#) at beginning and/or end";
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
			$q(".seekLabel").classList.add("invalidValue");
			err.push("No search expression present");
		}
		if((temp = contextTest(context))) {
			err.push(temp);
			$q(".contextLabel").classList.add("invalidValue");
		}
		if(anti && (temp = contextTest(anti, "Anticontext"))) {
			err.push(temp);
			$q(".anticontextLabel").classList.add("invalidValue");
		}
		try {
			new RegExp(seek);
		} catch(e) {
			err.push(`${e}`);
		}
		if(err.length > 0) {
			// Errors found.
			doAlert({
				header: "Error",
				cssClass: "danger",
				message: err.join("; "),
				buttons: [
					{
						text: "Cancel",
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
			message: "Sound Change saved!",
			duration: 2500,
			color: "success",
			position: "top",
			toast
		});
	};
	const maybeDeleteSoundChange = () => {
		$q(".soundChanges").closeSlidingItems();
		const handler = () => {
			setIsOpen(false);
			dispatch(deleteSoundChangeWE(editing!.id));
			toaster({
				message: "Sound Change deleted.",
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
				message: "Are you sure you want to delete this sound change? This cannot be undone.",
				cssClass: "danger",
				submit: "Yes, delete it",
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
					<IonTitle>Edit Sound Change</IonTitle>
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
						<IonLabel className="seekLabel">Beginning Expression:</IonLabel>
					</IonItem>
					<IonItem>
						<IonInput
							aria-label="Beginning expression"
							id="editSeekExWESC"
							className="ion-margin-top serifChars"
							onIonChange={e => resetError("seek")}
						></IonInput>
					</IonItem>
					<IonItem className="labelled">
						<IonLabel className="replaceLabel">Ending Expression:</IonLabel>
					</IonItem>
					<IonItem>
						<IonInput
							aria-label="Ending expression"
							id="editReplaceExWESC"
							className="ion-margin-top serifChars"
						></IonInput>
					</IonItem>
					<IonItem className="labelled">
						<IonLabel className="contextLabel">Context Expression:</IonLabel>
					</IonItem>
					<IonItem>
						<IonInput
							aria-label="Context expression"
							id="editContextExWESC"
							className="ion-margin-top serifChars"
							onIonChange={e => resetError("context")}
						></IonInput>
					</IonItem>
					<IonItem className="labelled">
						<IonLabel className="anticontextLabel">Anticontext Expression:</IonLabel>
					</IonItem>
					<IonItem>
						<IonInput
							aria-label="Anticontext expression"
							id="editAnticontextExWESC"
							className="ion-margin-top serifChars"
							onIonChange={e => resetError("anticontext")}
						></IonInput>
					</IonItem>
					<IonItem className="labelled">
						<IonLabel>Sound Change Description:</IonLabel>
					</IonItem>
					<IonItem>
						<IonInput
							aria-label="Description of the sound change"
							id="editOptDescWESC"
							className="ion-margin-top"
							placeholder="(optional)"
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
						<IonLabel>Save Sound Change</IonLabel>
					</IonButton>
					<IonButton
						color="danger"
						slot="start"
						onClick={() => maybeDeleteSoundChange()}
					>
						<IonIcon icon={trashOutline} slot="start" />
						<IonLabel>Delete Item</IonLabel>
					</IonButton>
				</IonToolbar>
			</IonFooter>
		</IonModal>
	);
};

export default EditSoundChangeModal;
