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
	IonFooter
} from '@ionic/react';
import {
	closeCircleOutline,
	chevronBackOutline,
	saveOutline,
	trashOutline,
	globeOutline
} from 'ionicons/icons';
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { ExtraCharactersModalOpener, WECharGroupObject } from '../../components/ReduxDucksTypes';
import { doEditCharGroupWE, cancelEditCharGroupWE, deleteCharGroupWE } from '../../components/ReduxDucksFuncs';
import fireSwal from '../../components/Swal';
import { $q, $i } from '../../components/DollarSignExports';

const EditCharGroupWEModal = (props: ExtraCharactersModalOpener) => {
	const { isOpen, setIsOpen, openECM } = props;
	const dispatch = useDispatch();
	const [charGroupObject, settings] = useSelector((state: any) => [state.wordevolveCharGroups, state.appSettings], shallowEqual);
	const charGroupMap: Map<string, WECharGroupObject> = new Map(charGroupObject.map);
	const editing = charGroupObject.editing;
	//const sourceCharGroup = charGroupMap.get(editing);
	let editingCharGroup: WECharGroupObject = {...charGroupMap.get(editing)!};
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
	function setNewInfo (prop: keyof WECharGroupObject, value: any) {
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
			fireSwal({
				title: "Unable to suggest a unique label from the given descrption.",
				customClass: {popup: 'warnToast'},
				toast: true,
				timer: 4000,
				timerProgressBar: true,
				showConfirmButton: false
			});
		} else {
			// Suitable label found
			$i("editingShortLabel").value = label;
			setNewInfo("label", label);
		}
	};
	const cancelEditing = () => {
		dispatch(cancelEditCharGroupWE(editing));
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
			fireSwal({
				title: "Error",
				icon: "error",
				text: err.join("; ")
			});
			return;
		}
		// Everything ok!
		setIsOpen(false);
		dispatch(doEditCharGroupWE(editingCharGroup));
		hardReset();
		fireSwal({
			title: "Character Group saved!",
			toast: true,
			timer: 2500,
			timerProgressBar: true,
			showConfirmButton: false
		});
	};
	const maybeDeleteCharGroup = () => {
		$q(".charGroups").closeSlidingItems();
		const thenFunc = (result: any) => {
			if(result.isConfirmed) {
				setIsOpen(false);
				dispatch(deleteCharGroupWE(editingCharGroup));
				fireSwal({
					title: "Character Group deleted",
					customClass: {popup: 'dangerToast'},
					toast: true,
					timer: 2500,
					timerProgressBar: true,
					showConfirmButton: false
				});
			}
		};
		if(settings.disableConfirms) {
			thenFunc({isConfirmed: true});
		} else {
			fireSwal({
				title: "Delete " + editingCharGroup.label + "?",
				text: "Are you sure? This cannot be undone.",
				customClass: {popup: 'deleteConfirm'},
				icon: 'warning',
				showCancelButton: true,
				confirmButtonText: "Yes, delete it."
			}).then(thenFunc);
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
				<IonList lines="none" className="hasSpecialLabels">
					<IonItem className="labelled">
						<IonLabel className="titleLabelEdit">Title/Description:</IonLabel>
					</IonItem>
					<IonItem>
						<IonInput aria-label="Title or description" value={editingCharGroup.title} id="editingCharGroupTitle" className="ion-margin-top" placeholder="Type description here" onIonChange={e => setNewInfo("title", e.detail.value)} autocomplete="on" debounce={250}></IonInput>
					</IonItem>
					<IonItem style={{marginTop: "0.25rem"}}>
						<div slot="start" className="ion-margin-end labelLabelEdit">Short Label:</div>
						<IonInput aria-label="Short Label" value={editingCharGroup.label} id="editingShortLabel" className="serifChars" placeholder="1 character only" onIonChange={e => setNewInfo("label", e.detail.value)} maxlength={1}></IonInput>
						<IonButton slot="end" onClick={() => generateLabel()}>
							<IonIcon icon={chevronBackOutline} />Suggest
						</IonButton>
					</IonItem>
					<IonItem className="labelled">
						<IonLabel className="runLabelEdit">Letters/Characters:</IonLabel>
					</IonItem>
					<IonItem>
						<IonInput aria-label="Letters, Characters" value={editingCharGroup.run} className="ion-margin-top serifChars" placeholder="Enter characters in group here" onIonChange={e => setNewInfo("run", e.detail.value)} debounce={250}></IonInput>
					</IonItem>
				</IonList>
			</IonContent>
			<IonFooter>
				<IonToolbar>
					<IonButton color="secondary" slot="end" onClick={() => maybeSaveNewInfo()}>
						<IonIcon icon={saveOutline} slot="start" />
						<IonLabel>Save Group</IonLabel>
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

export default EditCharGroupWEModal;
