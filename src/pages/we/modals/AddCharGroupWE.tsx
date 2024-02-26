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
import useTranslator from '../../../store/translationHooks';

import { $q, $a, $i } from '../../../components/DollarSignExports';
import toaster from '../../../components/toaster';

const AddCharGroupWEModal = (props: ExtraCharactersModalOpener) => {
	const { isOpen, setIsOpen, openECM } = props;
	const dispatch = useDispatch();
	const [ tc ] = useTranslator('common');
	const [ tw ] = useTranslator('wgwe');
	const [doAlert] = useIonAlert();
	const toast = useIonToast();
	const charGroupMap: { [key: string]: boolean } = {};
	const { characterGroups } = useSelector((state: StateObject) => state.we);
	characterGroups.forEach((cg: WECharGroupObject) => {
		charGroupMap[cg.label || ""] = true;
	});
	function resetError(prop: string) {
		// Remove danger color if present
		// Debounce means this sometimes doesn't exist by the time this is called.
		const where = $q(`.${prop}Label`);
		where && where.classList.remove("invalidValue");
	}
	const generateLabel = () => {
		const el = $i<HTMLInputElement>("newWECharGroupTitle");
		const words = (el ? el.value as string : "") // Get the title/description
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
				message: tw("Unable to suggest a unique label from the given descrption."),
				color: "warning",
				duration: 4000,
				position: "top",
				toast
			});
		} else {
			// Suitable label found
			const el = $i<HTMLInputElement>("newWEShortLabel");
			el && (el.value = label);
			resetError("label");
		}
	};
	const maybeSaveNewCharGroup = (close: boolean = true) => {
		const err: string[] = [];
		// Test info for validness, then save if needed and reset the info
		const titleEl = $i<HTMLInputElement>("newWECharGroupTitle");
		const title = titleEl ? titleEl.value.trim() : "";;
		const labelEl = $i<HTMLInputElement>("newWEShortLabel");
		const label = labelEl ? labelEl.value.trim() : "";;
		const runEl = $i<HTMLInputElement>("newWECharGroupRun");
		const run = runEl ? runEl.value.trim() : "";;
		if(title === "") {
			const el = $q(".titleLabel");
			el && el.classList.add("invalidValue");
			err.push(tw("No title present"));
		}
		if(label === "") {
			const el = $q(".labelLabel");
			el && el.classList.add("invalidValue");
			err.push(tw("No label present"));
		} else if (charGroupMap[label]) {
			const el = $q(".labelLabel");
			el && el.classList.add("invalidValue");
			err.push(tw("duplicateLabel", { label }));
		} else {
			const invalid = "^$\\[]{}.*+()?|";
			if (invalid.indexOf(label as string) !== -1) {
				const el = $q(".labelLabel");
				el && el.classList.add("invalidValue");
				err.push(tw("invalidLabel", { label }));
			}
		}
		if(run === "") {
			const el = $q(".runLabel");
			el && el.classList.add("invalidValue");
			err.push(tw("No run present"));
		}
		if(err.length > 0) {
			// Errors found.
			doAlert({
				header: tc("error"),
				message: err.join("; "),
				cssClass: "danger",
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
		close && setIsOpen(false);
		dispatch(addCharacterGroupWE({title, label, run}));
		$a<HTMLInputElement>("ion-list.addWECharGroup ion-input").forEach(
			(input) => input.value = ""
		);
		toaster({
			message: tc("thingAdded", { thing: tw("CharGroup") }),
			duration: 2500,
			color: "success",
			position: "top",
			toast
		});
	};
	return (
		<IonModal isOpen={isOpen} onDidDismiss={() => setIsOpen(false)}>
			<IonHeader>
				<IonToolbar color="primary">
					<IonTitle>{tc("addThing", { thing: tw("CharGroup") })}</IonTitle>
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
						<IonLabel className="titleLabel">{tw("Title or description", { context: "presentation" })}</IonLabel>
					</IonItem>
					<IonItem>
						<IonInput
							aria-label={tw("Title or description")}
							id="newWECharGroupTitle"
							className="ion-margin-top"
							autocomplete="on"
							onIonChange={() => resetError("title")}
						></IonInput>
					</IonItem>
					<IonItem className="margin-top-quarter">
						<div
							slot="start"
							className="ion-margin-end labelLabel"
						>{tw("Short Label", { context: "presentation" })}</div>
						<IonInput
							id="newWEShortLabel"
							aria-label={tw("Short Label")}
							labelPlacement="start"
							className="serifChars labelLabel"
							helperText={tw("1 character only")}
							maxlength={1}
							onIonChange={() => resetError("title")}
						></IonInput>
						<IonButton slot="end" onClick={() => generateLabel()}>
							<IonIcon icon={chevronBackOutline} />{tw("Suggest")}
						</IonButton>
					</IonItem>
					<IonItem className="labelled">
						<IonLabel className="runLabel">{tw("Letters Characters", { context: "presentation" })}</IonLabel>
					</IonItem>
					<IonItem>
						<IonInput
							id="newWECharGroupRun"
							aria-label={tw("Letters Characters")}
							className="importantElement ion-margin-top serifChars"
							helperText={tw("Enter characters in group here")}
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
						<IonLabel>{tc("addThing", { thing: tw("CharGroup") })}</IonLabel>
					</IonButton>
					<IonButton
						color="success"
						slot="end"
						onClick={() => maybeSaveNewCharGroup()}
					>
						<IonIcon icon={addOutline} slot="start" />
						<IonLabel>{tc("Add and Close")}</IonLabel>
					</IonButton>
				</IonToolbar>
			</IonFooter>
		</IonModal>
	);
};

export default AddCharGroupWEModal;
