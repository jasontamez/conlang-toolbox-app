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
import useTranslator from '../../../store/translationHooks';

import { $q, $i, $a } from '../../../components/DollarSignExports';
import toaster from '../../../components/toaster';

const AddCharGroupModal = (props: ExtraCharactersModalOpener) => {
	const { isOpen, setIsOpen, openECM } = props;
	const dispatch = useDispatch();
	const [doAlert] = useIonAlert();
	const [ t ] = useTranslator('wg');
	const [ tc ] = useTranslator('common');
	const [ tw ] = useTranslator('wgwe');
	const toast = useIonToast();
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
		where && where.classList.remove("invalidValue");
	}
	const generateLabel = () => {
		const el = $i<HTMLInputElement>("newWGCharGroupTitle");
		const words = (el ? el.value as string : "") // Get the title/description
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
				message: tw("Unable to suggest a unique label from the given descrption."),
				color: "warning",
				duration: 4000,
				position: "top",
				toast
			});
		} else {
			// Suitable label found
			const el = $i<HTMLInputElement>("newWGShortLabel");
			el && (el.value = label);
			resetError("label");
		}
	};
	const maybeSaveNewCharGroup = (close: boolean = true) => {
		const err: string[] = [];
		// Test info for validness, then save if needed and reset the newCharGroup
		const titleEl = $i<HTMLInputElement>("newWGCharGroupTitle");
		const title = titleEl ? titleEl.value.trim() : "";;
		const labelEl = $i<HTMLInputElement>("newWGShortLabel");
		const label = labelEl ? labelEl.value.trim() : "";;
		const runEl = $i<HTMLInputElement>("newWGCharGroupRun");
		const run = runEl ? runEl.value.trim() : "";;
		if(title === "") {
			const el = $q(".titleLabel");
			el && el.classList.add("invalidValue");
			err.push(tw("No title present"));
		}
		if(!label) {
			const el = $q(".labelLabel");
			el && el.classList.add("invalidValue");
			err.push("No label present");
		} else if (charGroupMap[label]) {
			const el = $q(".labelLabel");
			el && el.classList.add("invalidValue");
			err.push(tw("duplicateLabel", { label }));
		} else {
			const invalid = "^$\\[]{}.*+()?|";
			if (invalid.indexOf(label) !== -1) {
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
		close && setIsOpen(false);
		dispatch(addCharGroupWG({
			title,
			label,
			run,
			dropoffOverride: hasDropoff ? dropoff : undefined
		}));
		$a<HTMLInputElement>("ion-list.addWGCharGroup ion-input").forEach((input) => input.value = "");
		setHasDropoff(false);
		setDropoff(characterGroupDropoff);
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
						<IonButton onClick={() => openECM(true)} aria-label={tc("Extra Characters")}>
							<IonIcon icon={globeOutline} />
						</IonButton>
						<IonButton onClick={() => setIsOpen(false)} aria-label={tc("Close")}>
							<IonIcon icon={closeCircleOutline} />
						</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<IonList lines="none" className="hasSpecialLabels addWGCharGroup">
					<IonItem className="labelled">
						<IonLabel className="titleLabel">{tw("Title or description", { context: "presentation" })}</IonLabel>
					</IonItem>
					<IonItem>
						<IonInput
							aria-label={tw("Title or description")}
							id="newWGCharGroupTitle"
							className="ion-margin-top"
							onIonChange={e => resetError("title")}
							autocomplete="on"
						/>
					</IonItem>
					<IonItem className="margin-top-quarter">
						<div
							slot="start"
							className="ion-margin-end labelLabel"
						>{tw("Short Label", { context: "presentation" })}</div>
						<IonInput
							aria-label={tw("Short Label")}
							id="newWGShortLabel"
							className="serifChars"
							helperText={tw("1 character only")}
							onIonChange={e => resetError("label")}
							maxlength={1}
						/>
						<IonButton slot="end" onClick={() => generateLabel()}>
							<IonIcon icon={chevronBackOutline} />{tw("Suggest")}
						</IonButton>
					</IonItem>
					<IonItem className="labelled">
						<IonLabel className="runLabel">{tw("Letters Characters", { context: "presentation" })}</IonLabel>
					</IonItem>
					<IonItem>
						<IonInput
							aria-label={tw("Letters Characters")}
							id="newWGCharGroupRun"
							className="ion-margin-top serifChars"
							helperText={tw("Enter characters in group here")}
							onIonChange={e => resetError("run")}
						/>
					</IonItem>
					<IonItem>
						<IonToggle
							enableOnOffLabels
							labelPlacement="start"
							aria-label={t("Use separate dropoff rate")}
							justify="space-between"
							onIonChange={() => setHasDropoff(!hasDropoff)}
							checked={hasDropoff}
						>{t("Use separate dropoff rate")}</IonToggle>
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

export default AddCharGroupModal;
