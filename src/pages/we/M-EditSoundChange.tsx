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
import { ExtraCharactersModalOpener, WESoundChangeObject } from '../../components/ReduxDucksTypes';
import {
	doEditSoundChangeWE,
	cancelEditSoundChangeWE,
	deleteSoundChangeWE
} from '../../components/ReduxDucksFuncs';
import repairRegexErrors from '../../components/RepairRegex';
import { $i, $q } from '../../components/DollarSignExports';
import ltr from '../../components/LTR';
import yesNoAlert from '../../components/yesNoAlert';
import toaster from '../../components/toaster';

const EditSoundChangeModal = (props: ExtraCharactersModalOpener) => {
	const { isOpen, setIsOpen, openECM } = props;
	const dispatch = useDispatch();
	const [doAlert] = useIonAlert();
	const [doToast, undoToast] = useIonToast();
	const [
		soundChangesObject,
		disableConfirms
	] = useSelector((state: any) => [
		state.wordevolveSoundChanges,
		state.appSettings.disableConfirms
	], shallowEqual);
	const editing = soundChangesObject.editing;

	const [ editSeekExWESC, setEditSeekExWESC ] = useState<HTMLInputElement | null>(null);
	const [ editReplaceExWESC, setEditReplaceExWESC ] = useState<HTMLInputElement | null>(null);
	const [ editContextExWESC, setEditContextExWESC ] = useState<HTMLInputElement | null>(null);
	const [ editAnticontextExWESC, setEditAnticontextExWESC ] = useState<HTMLInputElement | null>(null);
	const [ editOptDescWESC, setEditOptDescWESC ] = useState<HTMLInputElement | null>(null);
	const [ currentSoundChange, setCurrentSoundChange] = useState<WESoundChangeObject | null>(null);
	const loadInfo = () => {
		const seekEl = $i("editSeekExWESC");
		const replaceEl = $i("editReplaceExWESC");
		const contextEl = $i("editContextExWESC");
		const antiEl = $i("editAnticontextExWESC");
		const descEl = $i("editOptDescWESC");
		setEditSeekExWESC(seekEl || null);
		setEditReplaceExWESC(replaceEl || null);
		setEditContextExWESC(contextEl || null);
		setEditAnticontextExWESC(antiEl || null);
		setEditOptDescWESC(descEl || null);
		seekEl && (seekEl.value = "");
		replaceEl && (replaceEl.value = "");
		contextEl && (contextEl.value = "");
		antiEl && (antiEl.value = "");
		descEl && (descEl.value = "");
		soundChangesObject.list.forEach((obj: WESoundChangeObject) => {
			const {key, seek, replace, context, anticontext, description} = obj;
			if(key === editing) {
				seekEl && (seekEl.value = seek);
				replaceEl && (replaceEl.value = replace);
				contextEl && (contextEl.value = context);
				antiEl && (antiEl.value = anticontext);
				descEl && (descEl.value = description);
				setCurrentSoundChange(obj);
			}
		});
	};

	const cancelEditing = () => {
		dispatch(cancelEditSoundChangeWE(currentSoundChange!));
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
		const seek = editSeekExWESC!.value || "";
		const context = editContextExWESC!.value || "_";
		const anti = editAnticontextExWESC!.value || "";
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
		const replace = editReplaceExWESC!.value || "";
		const description = editOptDescWESC!.value || "";
		setIsOpen(false);
		dispatch(doEditSoundChangeWE({
			key: currentSoundChange!.key,
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
			doToast,
			undoToast
		});
	};
	const maybeDeleteSoundChange = () => {
		$q(".soundChanges").closeSlidingItems();
		const handler = () => {
			setIsOpen(false);
			dispatch(deleteSoundChangeWE(currentSoundChange!));
			toaster({
				message: "Sound Change deleted.",
				duration: 2500,
				color: "danger",
				position: "top",
				doToast,
				undoToast
			});
		};
		if(disableConfirms) {
			handler();
		} else {
			let soundChange =
				currentSoundChange!.seek
				+ (ltr() ? "⟶" : "⟵")
				+ currentSoundChange!.replace
				+ "/"
				+ currentSoundChange!.context;
			if(currentSoundChange!.anticontext) {
				soundChange += "/" + currentSoundChange!.anticontext;
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
		<IonModal isOpen={isOpen} onDidDismiss={() => setIsOpen(false)} onIonModalDidPresent={() => loadInfo()}>
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
						<IonInput aria-label="Beginning expression" id="editSeekExWESC" className="ion-margin-top serifChars" onIonChange={e => resetError("seek")}></IonInput>
					</IonItem>
					<IonItem className="labelled">
						<IonLabel className="replaceLabel">Ending Expression:</IonLabel>
					</IonItem>
					<IonItem>
						<IonInput aria-label="Ending expression" id="editReplaceExWESC" className="ion-margin-top serifChars"></IonInput>
					</IonItem>
					<IonItem className="labelled">
						<IonLabel className="contextLabel">Context Expression:</IonLabel>
					</IonItem>
					<IonItem>
						<IonInput aria-label="Context expression" id="editContextExWESC" className="ion-margin-top serifChars" onIonChange={e => resetError("context")}></IonInput>
					</IonItem>
					<IonItem className="labelled">
						<IonLabel className="anticontextLabel">Anticontext Expression:</IonLabel>
					</IonItem>
					<IonItem>
						<IonInput aria-label="Anticontext expression" id="editAnticontextExWESC" className="ion-margin-top serifChars" onIonChange={e => resetError("anticontext")}></IonInput>
					</IonItem>
					<IonItem className="labelled">
						<IonLabel>Sound Change Description:</IonLabel>
					</IonItem>
					<IonItem>
						<IonInput aria-label="Description of the sound change" id="editOptDescWESC" className="ion-margin-top" placeholder="(optional)"></IonInput>
					</IonItem>
				</IonList>
			</IonContent>
			<IonFooter>
				<IonToolbar>
					<IonButton color="primary" slot="end" onClick={() => maybeSaveNewSoundChangeInfo()}>
						<IonIcon icon={saveOutline} slot="start" />
						<IonLabel>Save Sound Change</IonLabel>
					</IonButton>
					<IonButton color="danger" slot="start" onClick={() => maybeDeleteSoundChange()}>
						<IonIcon icon={trashOutline} slot="start" />
						<IonLabel>Delete Item</IonLabel>
					</IonButton>
				</IonToolbar>
			</IonFooter>
		</IonModal>
	);
};

export default EditSoundChangeModal;
