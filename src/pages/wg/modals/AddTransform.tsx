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

import { addTransformWG } from '../../../store/wgSlice';
import { ExtraCharactersModalOpener } from '../../../store/types';
import useTranslator from '../../../store/translationHooks';

import { $q, $a, $i } from '../../../components/DollarSignExports';
import repairRegexErrors from '../../../components/RepairRegex';
import toaster from '../../../components/toaster';

const AddTransformModal = (props: ExtraCharactersModalOpener) => {
	const { isOpen, setIsOpen, openECM } = props;
	const dispatch = useDispatch();
	const [ t ] = useTranslator('we');
	const [ tc ] = useTranslator('common');
	const [ tw ] = useTranslator('wgwe');
	const [doAlert] = useIonAlert();
	const toast = useIonToast();
	function resetError(prop: string) {
		// Remove danger color if present
		// Debounce means this sometimes doesn't exist by the time this is called.
		const where = $q("." + prop + "Label");
		where && where.classList.remove("invalidValue");
	}
	const maybeSaveNewTransform = (close: boolean = true) => {
		const searchEl = $i<HTMLInputElement>("searchEx");
		const err: string[] = [];
		// Test info for validness, then save if needed and reset the newTransform
		const seek = (searchEl && searchEl.value) || "";
		if(seek === "") {
			const el = $q(".seekLabel");
			el && el.classList.add("invalidValue");
			err.push(tw("No search expression present"));
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
		const descEl = $i<HTMLInputElement>("optDesc");
		const replaceEl = $i<HTMLInputElement>("replaceEx");
		const replace = repairRegexErrors((replaceEl && replaceEl.value) || "");
		const description = (descEl && descEl.value) || "";
		close && setIsOpen(false);
		dispatch(addTransformWG({
			id: uuidv4(),
			seek: repairRegexErrors(seek),
			replace,
			description
		}));
		$a<HTMLInputElement>("ion-list.wgAddTransform ion-input").forEach((input) => input.value = "");
		toaster({
			message: tc("thingAdded", { thing: t("Transformation")}),
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
					<IonTitle>{tc("addThing", { thing: t("Transformation") })}</IonTitle>
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
				<IonList lines="none" className="hasSpecialLabels wgAddTransform">
					<IonItem className="labelled">
						<IonLabel className="seekLabel">{tw("search expression", { context: "presentation" })}</IonLabel>
					</IonItem>
					<IonItem>
						<IonInput
							aria-label={tw("search expression")}
							id="searchEx"
							className="ion-margin-top serifChars"
							onIonChange={e => resetError("seek")}
						></IonInput>
					</IonItem>
					<IonItem className="labelled">
						<IonLabel className="replaceLabel">{tw("replacement expression", { context: "presentation" })}</IonLabel>
					</IonItem>
					<IonItem>
						<IonInput
							aria-label={tw("replacement expression")}
							id="replaceEx"
							className="ion-margin-top serifChars"
						></IonInput>
					</IonItem>
					<IonItem className="labelled">
						<IonLabel>{tw("Description of the transformation", { context: "presentation" })}</IonLabel>
					</IonItem>
					<IonItem>
						<IonInput
							aria-label={tw("Description of the transformation")}
							id="optDesc"
							className="ion-margin-top"
							placeholder={tc("optional")}
						></IonInput>
					</IonItem>
				</IonList>
			</IonContent>
			<IonFooter>
				<IonToolbar>
					<IonButton
						color="tertiary"
						slot="end"
						onClick={() => maybeSaveNewTransform(false)}
					>
						<IonIcon icon={addOutline} slot="start" />
						<IonLabel>{tc("addThing", { thing: tw("Transformation") })}</IonLabel>
					</IonButton>
					<IonButton
						color="success"
						slot="end"
						onClick={() => maybeSaveNewTransform()}
					>
						<IonIcon icon={addOutline} slot="start" />
						<IonLabel>{tc("Add and Close")}</IonLabel>
					</IonButton>
				</IonToolbar>
			</IonFooter>
		</IonModal>
	);
};

export default AddTransformModal;
