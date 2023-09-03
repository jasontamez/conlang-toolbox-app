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
	addOutline,
	chevronBackOutline,
	globeOutline
} from 'ionicons/icons';
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { ExtraCharactersModalOpener, WECharGroupObject } from '../../components/ReduxDucksTypes';
import { addCharGroupWE } from '../../components/ReduxDucksFuncs';
import fireSwal from '../../components/Swal';
import { $q, $a, $i } from '../../components/DollarSignExports';

const AddCharGroupWEModal = (props: ExtraCharactersModalOpener) => {
	const { isOpen, setIsOpen, openECM } = props;
	let newCharGroup: WECharGroupObject = {
		title: "",
		label: "",
		run: ""
	};
	const hardReset = () => {
		newCharGroup = {
			title: "",
			label: "",
			run: ""
		};
		$a("ion-input").forEach((input: HTMLInputElement) => input.value = "");
	};
	const dispatch = useDispatch();
	const charGroupObject = useSelector((state: any) => state.wordevolveCharGroups, shallowEqual);
	const charGroupMap = new Map(charGroupObject.map);
	function setNewInfo<
		KEY extends keyof WECharGroupObject,
		VAL extends WECharGroupObject[KEY]
	>(prop: KEY, value: VAL) {
		// Set the property
		newCharGroup[prop] = value;
		// Remove danger color if present
		// Debounce means this sometimes doesn't exist by the time this is called.
		const where = $q("." + prop + "Label");
		(where !== null) && where.classList.remove("invalidValue");
	}
	const generateLabel = () => {
		const words = ($i("newCharGroupTitle").value as string) // Get the title/description
			.trim() // trim leading/trailing whitespace
			.replace(/[$\\[\]{}.*+()?^|]/g, "") // remove invalid characters
			.toUpperCase() // uppercase everything
			.split(/[-\s_/]+/) // split along word and word-ish boundaries
		// Create an array of single character strings starting with the first characters
		//   of every word, followed by the remaining characters of every word
		const potentials = words.map(word => word[0]).concat(...words.map(word => word.slice(1).split('')));
		let label: string | undefined;
		potentials.every(char => {
			if(!charGroupMap.has(char)) {
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
			$i("shortLabel").value = label;
			setNewInfo("label", label);
		}
	};
	const maybeSaveNewCharGroup = (close: boolean = true) => {
		const err: string[] = [];
		// Test info for validness, then save if needed and reset the newCharGroup
		if(newCharGroup.title === "") {
			$q(".titleLabel").classList.add("invalidValue");
			err.push("No title present");
		}
		if(newCharGroup.label === "") {
			$q(".labelLabel").classList.add("invalidValue");
			err.push("No label present");
		} else if (charGroupMap.has(newCharGroup.label)) {
			$q(".labelLabel").classList.add("invalidValue");
			err.push("There is already a label \"" + newCharGroup.label + "\"");
		} else {
			const invalid = "^$\\[]{}.*+()?|";
			if (invalid.indexOf(newCharGroup.label as string) !== -1) {
				$q(".labelLabel").classList.add("invalidValue");
				err.push("You cannot use \"" + newCharGroup.label + "\" as a label.");
			}
		}
		if(newCharGroup.run === "") {
			$q(".runLabel").classList.add("invalidValue");
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
		close && setIsOpen(false);
		dispatch(addCharGroupWE(newCharGroup));
		hardReset();
		fireSwal({
			title: "Character Group added!",
			toast: true,
			timer: 2500,
			timerProgressBar: true,
			showConfirmButton: false
		});
	};
	return (
		<IonModal isOpen={isOpen} onDidDismiss={() => setIsOpen(false)}>
			<IonHeader>
				<IonToolbar color="primary">
					<IonTitle>Add Character Group</IonTitle>
					<IonButtons slot="end">
						<IonButton onClick={() => openECM(true)}>
							<IonIcon icon={globeOutline} />
						</IonButton>
						<IonButton onClick={() => setIsOpen(false)}>
							<IonIcon icon={closeCircleOutline} />
						</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<IonList lines="none" className="hasSpecialLabels">
					<IonItem className="labelled">
						<IonLabel className="titleLabel">Title/Description:</IonLabel>
					</IonItem>
					<IonItem>
						<IonInput aria-label="Title/Description" id="newCharGroupTitle" className="ion-margin-top" placeholder="Type description here" onIonChange={e => setNewInfo("title", (e.detail.value as string).trim())} autocomplete="on" debounce={250}></IonInput>
					</IonItem>
					<IonItem style={{marginTop: "0.25rem"}}>
						<div slot="start" className="ion-margin-end labelLabelEdit">Short Label:</div>
						<IonInput id="shortLabel" label="Short Label:" aria-label="Short Label" labelPlacement="start" className="serifChars" placeholder="1 character only" onIonChange={e => setNewInfo("label", (e.detail.value as string).trim())} maxlength={1}></IonInput>
						<IonButton slot="end" onClick={() => generateLabel()}>
							<IonIcon icon={chevronBackOutline} />Suggest
						</IonButton>
					</IonItem>
					<IonItem className="labelled">
						<IonLabel className="runLabel">Letters/Characters:</IonLabel>
					</IonItem>
					<IonItem>
						<IonInput aria-label="Letters/Characters" className="importantElement ion-margin-top serifChars" placeholder="Enter characters in group here" onIonChange={e => setNewInfo("run", (e.detail.value as string).trim())} debounce={250}></IonInput>
					</IonItem>
				</IonList>
			</IonContent>
			<IonFooter>
				<IonToolbar>
					<IonButton color="secondary" slot="end" onClick={() => maybeSaveNewCharGroup(false)}>
						<IonIcon icon={addOutline} slot="start" />
						<IonLabel>Add Character Group</IonLabel>
					</IonButton>
					<IonButton color="success" slot="end" onClick={() => maybeSaveNewCharGroup()}>
						<IonIcon icon={addOutline} slot="start" />
						<IonLabel>Add and Close</IonLabel>
					</IonButton>
				</IonToolbar>
			</IonFooter>
		</IonModal>
	);
};

export default AddCharGroupWEModal;
