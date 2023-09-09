import React from 'react';
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
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { ExtraCharactersModalOpener, WGCharGroupObject, Zero_Fifty } from '../../components/ReduxDucksTypes';
import { doEditCharGroupWG, cancelEditCharGroupWG, deleteCharGroupWG } from '../../components/ReduxDucksFuncs';
import { $q, $i } from '../../components/DollarSignExports';
import yesNoAlert from '../../components/yesNoAlert';

const EditCharGroupModal = (props: ExtraCharactersModalOpener) => {
	const { isOpen, setIsOpen, openECM } = props;
	const dispatch = useDispatch();
	const [charGroupObject, settings, settingsWG] = useSelector((state: any) => [state.wordgenCharGroups, state.appSettings, state.wordgenSettings], shallowEqual);
	const [doAlert] = useIonAlert();
	const [doToast] = useIonToast();
	const charGroupMap: Map<string, WGCharGroupObject> = new Map(charGroupObject.map);
	const editing = charGroupObject.editing;
	const sourceCharGroup = charGroupMap.get(editing)!;
	let editingCharGroup: WGCharGroupObject = {...sourceCharGroup};
	editingCharGroup.label = editing;
	const hardReset = () => {
		editingCharGroup = {
			title: "",
			label: "",
			run: ""
		};
	};
	const makeString = (input: any) => {
		if(input) {
			return input as string;
		}
		return "";
	};
	function setNewInfo (prop: keyof WGCharGroupObject, value: any) {
		// Set the property
		const madeString = makeString(value).trim();
		switch(prop) {
			case "title":
				editingCharGroup.title = madeString;
				break;
			case "run":
				editingCharGroup.run = madeString;
				break;
			case "label":
				editingCharGroup.label = madeString;
				break;
		}
		// Remove danger color if present
		// Debounce means this sometimes doesn't exist by the time this is called.
		const where = $q("." + prop + "LabelEdit");
		(where !== null) && where.classList.remove("invalidValue");
	}
	const toggleDropoff = () => {
		const DF = $i("charGroupDropoffEditC");
		if(!editingCharGroup) {
			// Skip
		} else if(editingCharGroup.dropoffOverride !== undefined) {
			delete editingCharGroup.dropoffOverride;
			DF.classList.add("hide");
		} else {
			DF.classList.remove("hide");
			$q("ion-range", DF).value = editingCharGroup.dropoffOverride = (!sourceCharGroup || (sourceCharGroup.dropoffOverride === undefined) ? settingsWG.charGroupRunDropoff : sourceCharGroup.dropoffOverride);
		}
	};
	const generateLabel = () => {
		//let invalid = "^$\\[]{}.*+()?|";
		const words = ($i("editingCharGroupTitle").value as string) // Get the title/description
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
			if(editing === char || !charGroupMap.has(char)) {
				label = char;
				return false;
			}
			return true;
		});
		if(!label) {
			// No suitable label found
			doToast({
				message: "Unable to suggest a unique label from the given descrption.",
				cssClass: "warning",
				duration: 4000
			});
		} else {
			// Suitable label found
			$i("editingShortLabel").value = label;
			setNewInfo("label", label);
		}
	};
	const cancelEditing = () => {
		dispatch(cancelEditCharGroupWG(editing));
		setIsOpen(false);
	};
	const maybeSaveNewInfo = () => {
		const err: string[] = [];
		// Test info for validness, then save if needed and reset the editingCharGroup
		if(editingCharGroup.title === "") {
			$q(".titleLabelEdit").classList.add("invalidValue");
			err.push("No title present");
		}
		if(editingCharGroup.label === "") {
			$q(".labelLabelEdit").classList.add("invalidValue");
			err.push("No label present");
		} else if (editing !== editingCharGroup.label && charGroupMap.has(editingCharGroup.label!)) {
			$q(".labelLabelEdit").classList.add("invalidValue");
			err.push("There is already a label \"" + editingCharGroup.label + "\"");
		} else {
			const invalid = "^$\\[]{}.*+()?|";
			if (invalid.indexOf(editingCharGroup.label as string) !== -1) {
				$q(".labelLabelEdit").classList.add("invalidValue");
				err.push("You cannot use \"" + editingCharGroup.label + "\" as a label.");
			}
		}
		if(editingCharGroup.run === "") {
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
		setIsOpen(false);
		dispatch(doEditCharGroupWG(editingCharGroup));
		hardReset();
		doToast({
			message: "Character Group saved!",
			duration: 2500,
			cssClass: "success"
		});
	};
	const maybeDeleteCharGroup = () => {
		$q(".charGroups").closeSlidingItems();
		const handler = () => {
			setIsOpen(false);
			dispatch(deleteCharGroupWG(editingCharGroup));
			doToast({
				message: "Character Group deleted.",
				duration: 2500,
				cssClass: "danger"
			});
		};
		if(settings.disableConfirms) {
			handler();
		} else {
			yesNoAlert({
				header: `Delete "${editingCharGroup.label}"?`,
				message: "Are you sure? This cannot be undone.",
				cssClass: "danger",
				submit: "Yes, delete it",
				handler,
				doAlert
			});
		}
	};
	return (
		<IonModal isOpen={isOpen} onDidDismiss={() => cancelEditing()}>
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
						<IonInput aria-label="Title or description" value={editingCharGroup.title} id="editingCharGroupTitle" className="ion-margin-top" placeholder="Type description here" onIonChange={e => setNewInfo("title", e.detail.value)} autocomplete="on" debounce={250} />
					</IonItem>
					<IonItem style={{marginTop: "0.25rem"}}>
						<div slot="start" className="ion-margin-end labelLabel">Short Label:</div>
						<IonInput aria-label="Short label" value={editingCharGroup.label} id="editingShortLabel" className="serifChars" placeholder="1 character only" onIonChange={e => setNewInfo("label", e.detail.value)} maxlength={1} />
						<IonButton slot="end" onClick={() => generateLabel()}>
							<IonIcon icon={chevronBackOutline} />Suggest
						</IonButton>
					</IonItem>
					<IonItem className="labelled">
						<IonLabel className="runLabelEdit">Letters/Characters:</IonLabel>
					</IonItem>
					<IonItem>
						<IonInput aria-label="Letters, characters" value={editingCharGroup.run} className="ion-margin-top serifChars" placeholder="Enter characters in group here" onIonChange={e => setNewInfo("run", e.detail.value)} debounce={250} />
					</IonItem>
					<IonItem>
						<IonToggle enableOnOffLabels aria-label="Use separate dropoff rate" onClick={() => toggleDropoff()} labelPlacement="start" checked={editingCharGroup.dropoffOverride !== undefined}>Use separate dropoff rate</IonToggle>
					</IonItem>
					<IonItem id="charGroupDropoffEditC" className={editingCharGroup.dropoffOverride === undefined ? "hide" : ""}>
						<IonRange min={0} max={50} pin={true} value={(editingCharGroup.dropoffOverride === undefined ? settingsWG.charGroupRunDropoff : editingCharGroup.dropoffOverride)} onIonChange={e => {editingCharGroup.dropoffOverride = (e.detail.value as Zero_Fifty)}} debounce={250}>
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
