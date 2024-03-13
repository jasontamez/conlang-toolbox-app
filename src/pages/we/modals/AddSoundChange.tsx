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
	globeOutline
} from 'ionicons/icons';
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from 'uuid';

import { addSoundChangeWE } from '../../../store/weSlice';
import { ExtraCharactersModalOpener } from '../../../store/types';
import useTranslator from '../../../store/translationHooks';

import { $q, $a, $i } from '../../../components/DollarSignExports';
import repairRegexErrors from '../../../components/RepairRegex';
import toaster from '../../../components/toaster';

const AddSoundChangeModal = (props: ExtraCharactersModalOpener) => {
	const { isOpen, setIsOpen, openECM } = props;
	const [ t ] = useTranslator('we');
	const [ tc ] = useTranslator('common');
	const [ tw ] = useTranslator('wgwe');
	const dispatch = useDispatch();
	const [doAlert] = useIonAlert();
	const toast = useIonToast();
	function resetError(prop: string) {
		// Remove danger color if present
		// Debounce means this sometimes doesn't exist by the time this is called.
		const where = $q("." + prop + "Label");
		where && where.classList.remove("invalidValue");
	}
	const maybeSaveNewSoundChange = (close: boolean = true) => {
		const err: string[] = [];
		const contextTest = (context: string, element: string) => {
			let ind = context.indexOf("_");
			const what = t(element);
			if(ind === -1) {
				return t("noUnderscore", { what });
			} else if (context.indexOf("_", ind+1) !== -1) {
				return t("multiUnderscore", { what });
			}
			const max = context.length - 1;
			ind = context.indexOf("#");
			while(ind !== -1) {
				if(ind > 0 && ind !== max) {
					return t("wordBoundaryError", { what });
				}
				ind = context.indexOf("#", (ind + 1));
			}
			return false;
		};
		// Test info for validness, then save if needed and reset the newSoundChange
		let temp: boolean | string;
		const seekEl = $i<HTMLInputElement>("searchExWESC");
		const seek = seekEl ? seekEl.value : "";
		const contextEl = $i<HTMLInputElement>("contextExWESC");
		const context = contextEl ? contextEl.value : "_";
		const anticontextEl = $i<HTMLInputElement>("antiExWESC");
		const anticontext = anticontextEl ? anticontextEl.value : "";
		if(seek === "") {
			const el = $q(".seekLabel");
			el && el.classList.add("invalidValue");
			err.push(t("No search expression present"));
		}
		if((temp = contextTest(context, "Context"))) {
			const el = $q(".contextLabel");
			el && el.classList.add("invalidValue");
			err.push(temp);
		}
		if(anticontext && (temp = contextTest(anticontext, "Anticontext"))) {
			const el = $q(".anticontextLabel");
			el && el.classList.add("invalidValue");
			err.push(temp);
		}
		try {
			new RegExp(seek);
		} catch(e) {
			err.push(`${e}`);
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
		// Fix any possible regex problems<HTMLInputElement>
		const replaceEl = $i<HTMLInputElement>("replaceExWESC");
		const descEl = $i<HTMLInputElement>("optDescWESC");
		const replace = repairRegexErrors(replaceEl ? replaceEl.value : "");
		const description = descEl ? descEl.value.trim() : "";
		close && setIsOpen(false);
		dispatch(addSoundChangeWE({
			id: uuidv4(),
			seek: repairRegexErrors(seek),
			replace,
			context: repairRegexErrors(context),
			anticontext: repairRegexErrors(anticontext),
			description
		}));
		$a<HTMLInputElement>("ion-list.addSoundChangeWE ion-input").forEach(
			(input) => input.value = ""
		);
		toaster({
			message: tc("thingSaved", { thing: t("Sound Change") }),
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
					<IonTitle>{tc("addThing", { thing: t("Sound Change") })}</IonTitle>
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
				<IonList lines="none" className="hasSpecialLabels addSoundChangeWE">
					<IonItem className="labelled">
						<IonLabel className="seekLabel">{tw("search expression", { context: "presentation"})}</IonLabel>
					</IonItem>
					<IonItem>
						<IonInput
							aria-label={tw("search expression", { context: "formal" })}
							id="searchExWESC"
							className="ion-margin-top serifChars"
							helperText={t("sound to change")}
							onIonChange={e => resetError("seek")}
						></IonInput>
					</IonItem>
					<IonItem className="labelled">
						<IonLabel className="replaceLabel">{tw("replacement expression", { context: "presentation" })}</IonLabel>
					</IonItem>
					<IonItem>
						<IonInput
							aria-label={tw("replacement expression", { context: "formal" })}
							id="replaceExWESC"
							className="ion-margin-top serifChars"
							helperText={t("sound changes into this")}
							placeholder="Changes into..."
						></IonInput>
					</IonItem>
					<IonItem className="labelled">
						<IonLabel className="contextLabel">{t("context expression", { context: "presentation" })}</IonLabel>
					</IonItem>
					<IonItem>
						<IonInput
							aria-label={t("context expression", { context: "formal" })}
							id="contextExWESC"
							className="ion-margin-top serifChars"
							helperText={t("where the change happens")}
							onIonChange={e => resetError("context")}
						></IonInput>
					</IonItem>
					<IonItem className="labelled">
						<IonLabel className="anticontextLabel">{t("exception expression", { context: "presentation" })}</IonLabel>
					</IonItem>
					<IonItem>
						<IonInput
							aria-label={t("exception expression", { context: "formal" })}
							id="antiExWESC"
							className="ion-margin-top serifChars"
							helperText={t("where the change cannot happen")}
							onIonChange={e => resetError("anticontext")}
						></IonInput>
					</IonItem>
					<IonItem className="labelled">
						<IonLabel>{t("sound change description", { context: "presentation" })}</IonLabel>
					</IonItem>
					<IonItem>
						<IonInput
							aria-label={t("sound change description")}
							id="optDescWESC"
							className="ion-margin-top"
							placeholder={tc("optional")}
						></IonInput>
					</IonItem>
				</IonList>
			</IonContent>
			<IonFooter>
				<IonToolbar>
					<IonButton
						color="primary"
						slot="end"
						onClick={() => maybeSaveNewSoundChange(false)}
					>
						<IonIcon icon={addOutline} slot="start" />
						<IonLabel>{tc("addThing", { what: t("SChange_one") })}</IonLabel>
					</IonButton>
					<IonButton
						color="success"
						slot="end"
						onClick={() => maybeSaveNewSoundChange()}
					>
						<IonIcon icon={addOutline} slot="start" />
						<IonLabel>{tc("Add and Close")}</IonLabel>
					</IonButton>
				</IonToolbar>
			</IonFooter>
		</IonModal>
	);
};

export default AddSoundChangeModal;
