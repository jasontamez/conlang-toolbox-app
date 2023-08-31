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
	IonRange
} from '@ionic/react';
import {
	closeCircleOutline,
	addOutline,
	chevronBackOutline,
	globeOutline
} from 'ionicons/icons';
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { ExtraCharactersModalOpener, WGCharGroupObject, Zero_Fifty } from '../../components/ReduxDucksTypes';
import { addCharGroupWG } from '../../components/ReduxDucksFuncs';
import fireSwal from '../../components/Swal';
import { $q, $i, $a } from '../../components/DollarSignExports';

const AddCharGroupModal = (props: ExtraCharactersModalOpener) => {
	const { isOpen, setIsOpen, openECM } = props;
	let newCharGroup: WGCharGroupObject = {
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
	const [charGroupObject, settingsWG] = useSelector((state: any) => [state.wordgenCharGroups, state.wordgenSettings], shallowEqual);
	const charGroupMap = new Map(charGroupObject.map);
	function setNewInfo<
		KEY extends keyof WGCharGroupObject,
		VAL extends WGCharGroupObject[KEY]
	>(prop: KEY, value: VAL) {
		// Set the property
		newCharGroup[prop] = value;
		// Remove danger color if present
		// Debounce means this sometimes doesn't exist by the time this is called.
		const where = $q("." + prop + "Label");
		(where !== null) && where.classList.remove("invalidValue");
	}
	const toggleDropoff = () => {
		const DF = $i("charGroupDropoffAddC");
		if(newCharGroup.dropoffOverride !== undefined) {
			delete newCharGroup.dropoffOverride;
			DF.classList.add("hide");
		} else {
			DF.classList.remove("hide");
			$q("ion-range", DF).value = newCharGroup.dropoffOverride = settingsWG.charGroupRunDropoff;
		}
	};
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
		dispatch(addCharGroupWG(newCharGroup));
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
						<IonInput aria-label="Title or description" id="newCharGroupTitle" className="ion-margin-top" placeholder="Type description here" onIonChange={e => setNewInfo("title", (e.detail.value as string).trim())} autocomplete="on" debounce={250} />
					</IonItem>
					<IonItem style={{marginTop: "0.25rem"}}>
						<div slot="start" className="ion-margin-end labelLabel">Short Label:</div>
						<IonInput aria-label="Short Label" id="shortLabel" className="serifChars" placeholder="1 character only" onIonChange={e => setNewInfo("label", (e.detail.value as string).trim())} maxlength={1} />
						<IonButton slot="end" onClick={() => generateLabel()}>
							<IonIcon icon={chevronBackOutline} />Suggest
						</IonButton>
					</IonItem>
					<IonItem className="labelled">
						<IonLabel className="runLabel">Letters/Characters:</IonLabel>
					</IonItem>
					<IonItem>
						<IonInput aria-label="Letters, characters" className="ion-margin-top serifChars" placeholder="Enter characters in group here" onIonChange={e => setNewInfo("run", (e.detail.value as string).trim())} debounce={250} />
					</IonItem>
					<IonItem>
						<IonToggle
							enableOnOffLabels
							labelPlacement="start"
							aria-label="Use separate dropoff rate"
							justify="space-between"
							onIonChange={() => toggleDropoff()}
							checked={newCharGroup.dropoffOverride !== undefined}
						>Use separate dropoff rate</IonToggle>
					</IonItem>
					<IonItem id="charGroupDropoffAddC" className="hide">
						<IonRange min={0} max={50} pin={true} onIonChange={e => setNewInfo("dropoffOverride", (e.detail.value as Zero_Fifty))} debounce={250}>
							<IonIcon size="small" slot="start" src="svg/flatAngle.svg" />
							<IonIcon size="small" slot="end" src="svg/steepAngle.svg" />
						</IonRange>
					</IonItem>
				</IonList>
			</IonContent>
			<IonFooter>
				<IonToolbar>
					<IonButton color="secondary" slot="end" onClick={() => maybeSaveNewCharGroup(false)}>
						<IonIcon icon={addOutline} slot="start" />
						<IonLabel>Add Group</IonLabel>
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

export default AddCharGroupModal;
