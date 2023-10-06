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

import { WECharGroupObject, ExtraCharactersModalOpener, StateObject } from '../../../store/types';
import { addCharacterGroupWE } from '../../../store/weSlice';

import { $q, $a, $i } from '../../../components/DollarSignExports';
import toaster from '../../../components/toaster';

const AddCharGroupWEModal = (props: ExtraCharactersModalOpener) => {
	const { isOpen, setIsOpen, openECM } = props;
	const dispatch = useDispatch();
	const [doAlert] = useIonAlert();
	const [doToast, undoToast] = useIonToast();
	const charGroupMap: { [key: string]: boolean } = {};
	const { characterGroups } = useSelector((state: StateObject) => state.we);
	characterGroups.forEach((cg: WECharGroupObject) => {
		charGroupMap[cg.label || ""] = true;
	});
	function resetError(prop: string) {
		// Remove danger color if present
		// Debounce means this sometimes doesn't exist by the time this is called.
		const where = $q(`.${prop}Label`);
		(where !== null) && where.classList.remove("invalidValue");
	}
	const generateLabel = () => {
		const words = ($i("newWECharGroupTitle").value as string) // Get the title/description
			.trim() // trim leading/trailing whitespace
			.replace(/[$\\[\]{}.*+()?^|]/g, "") // remove invalid characters
			.toUpperCase() // uppercase everything
			.split(/[-\s_/]+/); // split along word and word-ish boundaries
		// Create an array of single character strings starting with the first characters
		//   of every word, followed by the remaining characters of every word
		const potentials = words.map(word => word[0]).concat(...words.map(word => word.slice(1).split('')));
		let label: string | undefined;
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
			$i("newWEShortLabel").value = label;
			resetError("label");
		}
	};
	const maybeSaveNewCharGroup = (close: boolean = true) => {
		const err: string[] = [];
		// Test info for validness, then save if needed and reset the info
		const title = $i("newWECharGroupTitle").value.trim(),
			label = $i("newWEShortLabel").value.trim(),
			run = $i("newWECharGroupRun").value.trim();
		if(title === "") {
			$q(".titleLabel").classList.add("invalidValue");
			err.push("No title present");
		}
		if(label === "") {
			$q(".labelLabel").classList.add("invalidValue");
			err.push("No label present");
		} else if (charGroupMap[label]) {
			$q(".labelLabel").classList.add("invalidValue");
			err.push("There is already a label \"" + label + "\"");
		} else {
			const invalid = "^$\\[]{}.*+()?|";
			if (invalid.indexOf(label as string) !== -1) {
				$q(".labelLabel").classList.add("invalidValue");
				err.push("You cannot use \"" + label + "\" as a label");
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
		dispatch(addCharacterGroupWE({title, label, run}));
		$a("ion-list.addWECharGroup ion-input").forEach(
			(input: HTMLInputElement) => input.value = ""
		);
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
				<IonList lines="none" className="hasSpecialLabels addWECharGroup">
					<IonItem className="labelled">
						<IonLabel className="titleLabel">Title/Description:</IonLabel>
					</IonItem>
					<IonItem>
						<IonInput
							aria-label="Title/Description"
							id="newWECharGroupTitle"
							className="ion-margin-top"
							placeholder="Type description here"
							autocomplete="on"
							onIonChange={() => resetError("title")}
						></IonInput>
					</IonItem>
					<IonItem style={{marginTop: "0.25rem"}}>
						<div
							slot="start"
							className="ion-margin-end labelLabelEdit"
						>Short Label:</div>
						<IonInput
							id="newWEShortLabel"
							aria-label="Short Label"
							labelPlacement="start"
							className="serifChars labelLabel"
							placeholder="1 character only"
							maxlength={1}
							onIonChange={() => resetError("title")}
						></IonInput>
						<IonButton slot="end" onClick={() => generateLabel()}>
							<IonIcon icon={chevronBackOutline} />Suggest
						</IonButton>
					</IonItem>
					<IonItem className="labelled">
						<IonLabel className="runLabel">Letters/Characters:</IonLabel>
					</IonItem>
					<IonItem>
						<IonInput
							id="newWECharGroupRun"
							aria-label="Letters/Characters"
							className="importantElement ion-margin-top serifChars"
							placeholder="Enter characters in group here"
							onIonChange={() => resetError("run")}
						></IonInput>
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
						<IonLabel>Add Character Group</IonLabel>
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

export default AddCharGroupWEModal;
