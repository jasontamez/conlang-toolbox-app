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
	IonToggle,
	IonRange,
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

import { WGCharGroupObject, Zero_Fifty, ExtraCharactersModalOpener, StateObject } from '../../store/types';
import { editCharacterGroupWG, deleteCharGroupWG } from '../../store/wgSlice';

import { $q, $i } from '../../components/DollarSignExports';
import yesNoAlert from '../../components/yesNoAlert';
import toaster from '../../components/toaster';

interface ModalProps extends ExtraCharactersModalOpener {
	editing: null | WGCharGroupObject
	setEditing: Function
}

const EditCharGroupModal = (props: ModalProps) => {
	const { isOpen, setIsOpen, openECM, editing, setEditing } = props;
	const dispatch = useDispatch();
	const { characterGroups, characterGroupDropoff } = useSelector((state: StateObject) => state.wg);
	const { disableConfirms } = useSelector((state: StateObject) => state.appSettings);
	const [doAlert] = useIonAlert();
	const [doToast, undoToast] = useIonToast();
	const [hasDropoff, setHasDropoff] = useState<boolean>(false);
	const [dropoff, setDropoff] = useState<Zero_Fifty>(characterGroupDropoff);
	const [charGroupMap, setCharGroupMap] = useState<{ [ key: string]: boolean }>({});
	const [titleEl, setTitleEl] = useState<HTMLInputElement | null>(null);
	const [labelEl, setLabelEl] = useState<HTMLInputElement | null>(null);
	const [runEl, setRunEl] = useState<HTMLInputElement | null>(null);
	const onLoad = () => {
		const _titleEl = $i("editingWGCharGroupTitle");
		const _labelEl = $i("editingWGShortLabel");
		const _runEl = $i("editingWGCharGroupRun");
		if(editing) {
			const { title, run, dropoffOverride, label } = editing;
			_titleEl && (_titleEl.value = title);
			_labelEl && (_labelEl.value = label);
			_runEl && (_runEl.value = run);
			if(dropoffOverride !== undefined) {
				setHasDropoff(true);
				setDropoff(dropoffOverride);
			} else {
				setHasDropoff(false);
				setDropoff(characterGroupDropoff);
			}
			const newMap: { [ key: string]: boolean } = {};
			characterGroups.forEach((item: WGCharGroupObject) => {
				newMap[item.label!] = true;
			});
			setCharGroupMap(newMap);
		} else {
			_titleEl && (_titleEl.value = "");
			_labelEl && (_labelEl.value = "");
			_runEl && (_runEl.value = "");	
		}
		setTitleEl(_titleEl);
		setLabelEl(_labelEl);
		setRunEl(_runEl);
	};

	function resetError (prop: keyof WGCharGroupObject) {
		// Remove danger color if present
		// Debounce means this sometimes doesn't exist by the time this is called.
		const where = $q("." + prop + "LabelEdit");
		(where !== null) && where.classList.remove("invalidValue");
	}
	const generateLabel = () => {
		//let invalid = "^$\\[]{}.*+()?|";
		const words = (titleEl!.value as string) // Get the title/description
			.trim() // trim leading/trailing whitespace
			.replace(/[$\\[\]{}.*+()?^|]/g, "") // remove invalid characters
			.toUpperCase() // uppercase everything
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
				message: "Unable to suggest a unique label from the given descrption.",
				color: "warning",
				duration: 4000,
				position: "top",
				doToast,
				undoToast
			});
		} else {
			// Suitable label found
			labelEl!.value = label;
			resetError("label");
		}
	};
	const cancelEditing = () => {
		setIsOpen(false);
		setEditing(null);
	};
	const maybeSaveNewInfo = () => {
		const err: string[] = [];
		// Test info for validness, then save if needed and reset the editingWGCharGroup
		const title = titleEl!.value.trim(),
			label = labelEl!.value.trim(),
			run = runEl!.value.trim();
		if(title === "") {
			$q(".titleLabelEdit").classList.add("invalidValue");
			err.push("No title present");
		}
		if(label === "") {
			$q(".labelLabelEdit").classList.add("invalidValue");
			err.push("No label present");
		} else if (editing!.label !== label && charGroupMap[label]) {
			$q(".labelLabelEdit").classList.add("invalidValue");
			err.push("There is already a label \"" + label + "\"");
		} else {
			const invalid = "^$\\[]{}.*+()?|";
			if (invalid.indexOf(label as string) !== -1) {
				$q(".labelLabelEdit").classList.add("invalidValue");
				err.push("You cannot use \"" + label + "\" as a label.");
			}
		}
		if(run === "") {
			$q(".runLabelEdit").classList.add("invalidValue");
			err.push("No run present");
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
		cancelEditing();
		dispatch(editCharacterGroupWG({
			old: editing!,
			edited: {
				title,
				label,
				run,
				dropoffOverride: hasDropoff ? dropoff : undefined
			}
		}));
		toaster({
			message: "Character Group saved!",
			duration: 2500,
			color: "success",
			position: "top",
			doToast,
			undoToast
		});
	};
	const maybeDeleteCharGroup = () => {
		const title = titleEl!.value.trim(),
			label = labelEl!.value.trim(),
			run = runEl!.value.trim();
		const handler = () => {
			cancelEditing();
			dispatch(deleteCharGroupWG({
				title,
				label,
				run,
				dropoffOverride: hasDropoff ? dropoff : undefined
			}));
			toaster({
				message: "Character Group deleted.",
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
			yesNoAlert({
				header: `${label}=${run}`,
				message: "Are you sure you want to delete this Character Group? This cannot be undone.",
				cssClass: "danger",
				submit: "Yes, delete it",
				handler,
				doAlert
			});
		}
	};
	return (
		<IonModal isOpen={isOpen} onDidDismiss={() => cancelEditing()} onIonModalDidPresent={onLoad}>
			<IonHeader>
				<IonToolbar color="primary">
					<IonTitle>Edit Character Group</IonTitle>
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
				<IonList lines="none" class="hasSpecialLabels">
					<IonItem className="labelled">
						<IonLabel className="titleLabelEdit">Title/Description:</IonLabel>
					</IonItem>
					<IonItem>
						<IonInput aria-label="Title or description" id="editingWGCharGroupTitle" className="ion-margin-top" placeholder="Type description here" onIonChange={e => resetError("title")} autocomplete="on" />
					</IonItem>
					<IonItem style={{marginTop: "0.25rem"}}>
						<div slot="start" className="ion-margin-end labelLabel">Short Label:</div>
						<IonInput aria-label="Short label" id="editingWGShortLabel" className="serifChars" placeholder="1 character only" onIonChange={e => resetError("label")} maxlength={1} />
						<IonButton slot="end" onClick={() => generateLabel()}>
							<IonIcon icon={chevronBackOutline} />Suggest
						</IonButton>
					</IonItem>
					<IonItem className="labelled">
						<IonLabel className="runLabelEdit">Letters/Characters:</IonLabel>
					</IonItem>
					<IonItem>
						<IonInput aria-label="Letters, characters" id="editingWGCharGroupRun" className="ion-margin-top serifChars" placeholder="Enter characters in group here" onIonChange={e => resetError("run")} />
					</IonItem>
					<IonItem>
						<IonToggle enableOnOffLabels aria-label="Use separate dropoff rate" onClick={() => setHasDropoff(!hasDropoff)} labelPlacement="start" checked={hasDropoff}>Use separate dropoff rate</IonToggle>
					</IonItem>
					<IonItem id="charGroupDropoffEditC" className={hasDropoff ? "" : "hide"}>
						<IonRange min={0} max={50} pin={true} value={dropoff} onIonChange={e => {setDropoff(e.detail.value as Zero_Fifty)}}>
							<IonIcon size="small" slot="start" src="svg/flatAngle.svg" />
							<IonIcon size="small" slot="end" src="svg/steepAngle.svg" />
						</IonRange>
					</IonItem>
				</IonList>
			</IonContent>
			<IonFooter>
				<IonToolbar>
					<IonButton color="secondary" slot="end" onClick={() => maybeSaveNewInfo()}>
						<IonIcon icon={saveOutline} slot="start" />
						<IonLabel>Save Character Group</IonLabel>
					</IonButton>
					<IonButton color="danger" slot="start" onClick={() => maybeDeleteCharGroup()}>
						<IonIcon icon={trashOutline} slot="start" />
						<IonLabel>Delete Group</IonLabel>
					</IonButton>
				</IonToolbar>
			</IonFooter>
		</IonModal>
	);
};

export default EditCharGroupModal;
