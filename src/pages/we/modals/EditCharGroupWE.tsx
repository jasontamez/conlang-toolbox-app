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
	chevronBackOutline,
	saveOutline,
	trashOutline,
	globeOutline
} from 'ionicons/icons';
import { useSelector, useDispatch } from "react-redux";

import { deleteCharacterGroupWE, editCharacterGroupWE } from '../../../store/weSlice';
import { ExtraCharactersModalOpener, SetState, StateObject, WECharGroupObject } from '../../../store/types';
import useTranslator from '../../../store/translationHooks';

import { $q, $i } from '../../../components/DollarSignExports';
import yesNoAlert from '../../../components/yesNoAlert';
import toaster from '../../../components/toaster';

interface ModalProps extends ExtraCharactersModalOpener {
	editing: null | WECharGroupObject
	setEditing: SetState<null | WECharGroupObject>
}

const EditCharGroupWEModal = (props: ModalProps) => {
	const { isOpen, setIsOpen, openECM, editing, setEditing } = props;
	const dispatch = useDispatch();
	const [ tc ] = useTranslator('common');
	const [ tw ] = useTranslator('wgwe');
	const [doAlert] = useIonAlert();
	const toast = useIonToast();
	const { characterGroups } = useSelector((state: StateObject) => state.we);
	const { disableConfirms } = useSelector((state: StateObject) => state.appSettings);
	const [charGroupMap, setCharGroupMap] = useState<{ [key: string]: WECharGroupObject }>({});
	const [titleEl, setTitleEl] = useState<HTMLInputElement | null>(null);
	const [labelEl, setLabelEl] = useState<HTMLInputElement | null>(null);
	const [runEl, setRunEl] = useState<HTMLInputElement | null>(null);
	const onLoad = () => {
		const _titleEl = $i<HTMLInputElement>("editingWECharGroupTitle");
		const _labelEl = $i<HTMLInputElement>("editingWEShortLabel");
		const _runEl = $i<HTMLInputElement>("editingWECharGroupRun");
			if(editing) {
			const { label, title, run } = editing;
			_titleEl && (_titleEl.value = title);
			_labelEl && (_labelEl.value = label || "");
			_runEl && (_runEl.value = run);
			const cgm: { [key: string]: WECharGroupObject } = {};
			characterGroups.forEach((chg: WECharGroupObject) => {
				cgm[chg.label || ""] = chg;
			});
			setCharGroupMap(cgm);
		} else {
			_titleEl && (_titleEl.value = "");
			_labelEl && (_labelEl.value = "");
			_runEl && (_runEl.value = "");
		}
		setTitleEl(_titleEl);
		setLabelEl(_labelEl);
		setRunEl(_runEl);
	};

	function resetError (prop: keyof WECharGroupObject) {
		// Remove danger color if present
		// Debounce means this sometimes doesn't exist by the time this is called.
		const where = $q(`.${prop}LabelEdit`);
		where && where.classList.remove("invalidValue");
	}
	const generateLabel = () => {
		//let invalid = "^$\\[]{}.*+()?|";
		const words = (titleEl!.value as string) // Get the title/description
			.trim() // trim leading/trailing whitespace
			.replace(/[$\\[\]{}.*+()?^|]/g, "") // remove invalid characters
			.toLocaleUpperCase() // uppercase everything
			.split(/[-\s_/]+/) // split along word and word-ish boundaries
		// Create an array of single character strings starting with the first characters
		//   of every word, followed by the remaining characters of every word
		const potentials = words.map(word => word[0]).concat(...words.map(word => word.slice(1).split('')));
		// Now check every character one at a time to see if it's a good candidate
		let label: string | undefined;
		potentials.every(char => {
			if(editing!.label === char || !charGroupMap[char]) {
				label = char;
				return false;
			}
			return true;
		});
		if(!label) {
			// No suitable label found
			toaster({
				message: tw("Unable to suggest a unique label from the given descrption."),
				color: "warning",
				duration: 4000,
				position: "top",
				toast
			});
		} else {
			// Suitable label found
			labelEl!.value = label;
			resetError("label");
		}
	};
	const cancelEditing = () => {
		setEditing(null);
		setIsOpen(false);
	};
	const maybeSaveNewInfo = () => {
		const err: string[] = [];
		const title = titleEl!.value.trim();
		const label = labelEl!.value.trim();
		const run = runEl!.value.trim();
		// Test info for validness, then save if needed and reset the editingCharGroup
		if(title === "") {
			const el = $q(".titleLabelEdit");
			el && el.classList.add("invalidValue");
			err.push(tw("No title present"));
		}
		if(label === "") {
			const el = $q(".labelLabelEdit");
			el && el.classList.add("invalidValue");
			err.push(tw("No label present"));
		} else if (editing!.label !== label && charGroupMap[label!]) {
			const el = $q(".labelLabelEdit");
			el && el.classList.add("invalidValue");
			err.push(tw("duplicateLabel", { label }));
		} else {
			const invalid = "^$\\[]{}.*+()?|";
			if (invalid.indexOf(label as string) !== -1) {
				const el = $q(".labelLabelEdit");
				el && el.classList.add("invalidValue");
				err.push(tw("invalidLabel", { label }));
			}
		}
		if(run === "") {
			const el = $q(".runLabelEdit");
			el && el.classList.add("invalidValue");
			err.push(tw("No run present"));
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
		dispatch(editCharacterGroupWE({
			label: (editing && editing.label) || "",
			edited: {
				title,
				label,
				run
			}
		}));
		cancelEditing();
		toaster({
			message: tc("thingSaved", { thing: tw("CharGroup") }),
			duration: 2500,
			color: "success",
			position: "top",
			toast
		});
	};
	const maybeDeleteCharGroup = () => {
		const { label = "", run } = editing!;
		const handler = () => {
			dispatch(deleteCharacterGroupWE(editing!));
			cancelEditing();
			toaster({
				message: tc("thingDeleted", { thing: tw("CharGroup") }),
				duration: 2500,
				color: "danger",
				position: "top",
				toast
			});
		};
		if(disableConfirms) {
			handler();
		} else {
			yesNoAlert({
				header: `${label}=${run}`,
				message: tc("Are you sure you want to delete this? This cannot be undone."),
				cssClass: "warning",
				submit: tc("confirmDelIt"),
				handler,
				doAlert
			});
		}
	};
	return (
		<IonModal isOpen={isOpen} onDidDismiss={() => cancelEditing()} onIonModalDidPresent={onLoad}>
			<IonHeader>
				<IonToolbar color="primary">
					<IonTitle>{tc("editThing", { thing: tw("CharGroup") })}</IonTitle>
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
						<IonLabel className="titleLabelEdit">{tw("Title or description", { context: "presentation" })}</IonLabel>
					</IonItem>
					<IonItem>
						<IonInput
							aria-label={tw("Title or description")}
							id="editingWECharGroupTitle"
							className="ion-margin-top"
							onIonChange={e => resetError("title")}
							autocomplete="on"
						></IonInput>
					</IonItem>
					<IonItem className="margin-top-quarter">
						<div
							slot="start"
							className="ion-margin-end labelLabelEdit"
						>{tw("Short Label", { context: "presentation" })}</div>
						<IonInput
							aria-label={tw("Short Label")}
							id="editingWEShortLabel"
							className="serifChars"
							helperText={tw("1 character only")}
							onIonChange={e => resetError("label")}
							maxlength={1}
						></IonInput>
						<IonButton slot="end" onClick={() => generateLabel()}>
							<IonIcon icon={chevronBackOutline} />{tw("Suggest")}
						</IonButton>
					</IonItem>
					<IonItem className="labelled">
						<IonLabel className="runLabelEdit">{tw("Letters Characters", { context: "presentation" })}</IonLabel>
					</IonItem>
					<IonItem>
						<IonInput
							id="editingWECharGroupRun"
							aria-label={tw("Letters Characters")}
							className="ion-margin-top serifChars"
							helperText={tw("Enter characters in group here")}
							onIonChange={e => resetError("run")}
						></IonInput>
					</IonItem>
				</IonList>
			</IonContent>
			<IonFooter>
				<IonToolbar>
					<IonButton
						color="secondary"
						slot="end"
						onClick={() => maybeSaveNewInfo()}
					>
						<IonIcon icon={saveOutline} slot="start" />
						<IonLabel>{tc("saveThing", { thing: tw("CharGroup") })}</IonLabel>
					</IonButton>
					<IonButton
						color="danger"
						slot="start"
						onClick={() => maybeDeleteCharGroup()}
					>
						<IonIcon icon={trashOutline} slot="start" />
						<IonLabel>{tc("deleteThing", { thing: tw("CharGroup") })}</IonLabel>
					</IonButton>
				</IonToolbar>
			</IonFooter>
		</IonModal>
	);
};

export default EditCharGroupWEModal;
