import React, { useEffect, useState } from 'react';
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
	addOutline,
	chevronBackOutline,
	globeOutline
} from 'ionicons/icons';
import { useSelector, useDispatch } from "react-redux";

import { ExtraCharactersModalOpener, StateObject, WGCharGroupObject, Zero_Fifty } from '../../../store/types';
import { addCharGroupWG } from '../../../store/wgSlice';

import { $q, $i, $a } from '../../../components/DollarSignExports';
import toaster from '../../../components/toaster';

const AddCharGroupModal = (props: ExtraCharactersModalOpener) => {
	const { isOpen, setIsOpen, openECM } = props;
	const dispatch = useDispatch();
	const [doAlert] = useIonAlert();
	const [doToast, undoToast] = useIonToast();
	const { characterGroups, characterGroupDropoff } = useSelector((state: StateObject) => state.wg);
	const [hasDropoff, setHasDropoff] = useState<boolean>(false);
	const [dropoff, setDropoff] = useState<Zero_Fifty>(characterGroupDropoff);
	const [charGroupMap, setCharGroupMap] = useState<{ [key: string]: boolean }>({});
	useEffect(() => {
		const newMap: { [key: string]: boolean } = {};
		characterGroups.forEach((cg: WGCharGroupObject) => {
			newMap[cg.label] = true;
		});
		setCharGroupMap(newMap);
	}, [characterGroups]);
	function resetError(prop: string) {
		// Remove danger color if present
		// Debounce means this sometimes doesn't exist by the time this is called.
		const where = $q("." + prop + "Label");
		(where !== null) && where.classList.remove("invalidValue");
	}
	const generateLabel = () => {
		const words = ($i("newWGCharGroupTitle").value as string) // Get the title/description
			.trim() // trim leading/trailing whitespace
			.replace(/[$\\[\]{}.*+()?^|]/g, "") // remove invalid characters
			.toUpperCase() // uppercase everything
			.split(/[-\s_/]+/) // split along word and word-ish boundaries
		// Create an array of single character strings starting with the first characters
		//   of every word, followed by the remaining characters of every word
		const potentials = words.map(word => word[0]).concat(...words.map(word => word.slice(1).split('')));
		let label: string = "";
		potentials.every(char => {
			if(!charGroupMap[char]) {
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
			$i("newWGShortLabel").value = label;
			resetError("label");
		}
	};
	const maybeSaveNewCharGroup = (close: boolean = true) => {
		const err: string[] = [];
		// Test info for validness, then save if needed and reset the newCharGroup
		const title = $i("newWGCharGroupTitle").value.trim(),
			label = $i("newWGShortLabel").value.trim(),
			run = $i("newWGCharGroupRun").value.trim();
		if(title === "") {
			$q(".titleLabel").classList.add("invalidValue");
			err.push("No title present");
		}
		if(!label) {
			$q(".labelLabel").classList.add("invalidValue");
			err.push("No label present");
		} else if (charGroupMap[label]) {
			$q(".labelLabel").classList.add("invalidValue");
			err.push("There is already a label \"" + label + "\"");
		} else {
			const invalid = "^$\\[]{}.*+()?|";
			if (invalid.indexOf(label) !== -1) {
				$q(".labelLabel").classList.add("invalidValue");
				err.push("You cannot use \"" + label + "\" as a label.");
			}
		}
		if(run === "") {
			$q(".runLabel").classList.add("invalidValue");
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
		close && setIsOpen(false);
		dispatch(addCharGroupWG({
			title,
			label,
			run,
			dropoffOverride: hasDropoff ? dropoff : undefined
		}));
		$a("ion-list.addWGCharGroup ion-input").forEach((input: HTMLInputElement) => input.value = "");
		setHasDropoff(false);
		setDropoff(characterGroupDropoff);
		toaster({
			message: "Character Group added!",
			duration: 2500,
			color: "success",
			position: "top",
			doToast,
			undoToast
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
				<IonList lines="none" className="hasSpecialLabels addWGCharGroup">
					<IonItem className="labelled">
						<IonLabel className="titleLabel">Title/Description:</IonLabel>
					</IonItem>
					<IonItem>
						<IonInput
							aria-label="Title or description"
							id="newWGCharGroupTitle"
							className="ion-margin-top"
							placeholder="Type description here"
							onIonChange={e => resetError("title")}
							autocomplete="on"
						/>
					</IonItem>
					<IonItem style={{marginTop: "0.25rem"}}>
						<div slot="start" className="ion-margin-end labelLabel">Short Label:</div>
						<IonInput
							aria-label="Short Label"
							id="newWGShortLabel"
							className="serifChars"
							placeholder="1 character only"
							onIonChange={e => resetError("label")}
							maxlength={1}
						/>
						<IonButton slot="end" onClick={() => generateLabel()}>
							<IonIcon icon={chevronBackOutline} />Suggest
						</IonButton>
					</IonItem>
					<IonItem className="labelled">
						<IonLabel className="runLabel">Letters/Characters:</IonLabel>
					</IonItem>
					<IonItem>
						<IonInput
							aria-label="Letters, characters"
							id="newWGCharGroupRun"
							className="ion-margin-top serifChars"
							placeholder="Enter characters in group here"
							onIonChange={e => resetError("run")}
						/>
					</IonItem>
					<IonItem>
						<IonToggle
							enableOnOffLabels
							labelPlacement="start"
							aria-label="Use separate dropoff rate"
							justify="space-between"
							onIonChange={() => setHasDropoff(!hasDropoff)}
							checked={hasDropoff}
						>Use separate dropoff rate</IonToggle>
					</IonItem>
					<IonItem id="charGroupDropoffAddCWG" className={hasDropoff ? "" : "hide"}>
						<IonRange
							min={0}
							max={50}
							pin={true}
							value={dropoff}
							onIonChange={e => setDropoff(e.detail.value as Zero_Fifty)}
							debounce={250}
						>
							<IonIcon size="small" slot="start" src="svg/flatAngle.svg" />
							<IonIcon size="small" slot="end" src="svg/steepAngle.svg" />
						</IonRange>
					</IonItem>
				</IonList>
			</IonContent>
			<IonFooter>
				<IonToolbar>
					<IonButton
						color="secondary"
						slot="end"
						onClick={() => maybeSaveNewCharGroup(false)}
					>
						<IonIcon icon={addOutline} slot="start" />
						<IonLabel>Add Group</IonLabel>
					</IonButton>
					<IonButton
						color="success"
						slot="end"
						onClick={() => maybeSaveNewCharGroup()}
					>
						<IonIcon icon={addOutline} slot="start" />
						<IonLabel>Add and Close</IonLabel>
					</IonButton>
				</IonToolbar>
			</IonFooter>
		</IonModal>
	);
};

export default AddCharGroupModal;
