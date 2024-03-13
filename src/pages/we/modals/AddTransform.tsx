import React, { useState } from 'react';
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
	IonItemDivider,
	IonRadioGroup,
	IonRadio,
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

import { WETransformDirection, ExtraCharactersModalOpener } from '../../../store/types';
import { addTransformWE } from '../../../store/weSlice';
import useTranslator from '../../../store/translationHooks';

import { $q, $a, $i } from '../../../components/DollarSignExports';
import toaster from '../../../components/toaster';

const AddTransformModal = (props: ExtraCharactersModalOpener) => {
	const { isOpen, setIsOpen, openECM } = props;
	const dispatch = useDispatch();
	const [ t ] = useTranslator('we');
	const [ tc ] = useTranslator('common');
	const [ tw ] = useTranslator('wgwe');
	const [doAlert] = useIonAlert();
	const toast = useIonToast();
	const [ direction, setDirection ] = useState<WETransformDirection>("both");
	function resetError(prop: string) {
		// Remove danger color if present
		// Debounce means this sometimes doesn't exist by the time this is called.
		const where = $q("." + prop + "Label");
		where && where.classList.remove("invalidValue");
	}
	const maybeSaveNewTransform = (close: boolean = true) => {
		const err: string[] = [];
		const seekEl = $i<HTMLInputElement>("searchExWE");
		const seek = seekEl ? seekEl.value : "";
		// Test info for validness, then save if needed and reset the newTransform
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
		const replaceEl = $i<HTMLInputElement>("replaceExWE");
		const replace = replaceEl ? replaceEl.value : "";
		const descriptionEl = $i<HTMLInputElement>("optDescWE");
		const description = descriptionEl ? descriptionEl.value : "";
		close && setIsOpen(false);
		dispatch(addTransformWE({
			id: uuidv4(),
			seek,
			replace,
			direction,
			description
		}));
		$a<HTMLInputElement>("ion-list.weAddTransform ion-input").forEach((input) => input.value = "");
		const el = $q<HTMLInputElement>("ion-list.weAddTransform ion-radio-group");
		el && (el.value = "both");
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
				<IonList lines="none" className="hasSpecialLabels weAddTransform">
					<IonItem className="labelled">
						<IonLabel className="seekLabel">{t("Input Expression", { context: "presentation" })}</IonLabel>
					</IonItem>
					<IonItem>
						<IonInput
							aria-label={t("Input Expression", { context: "presentation" })}
							id="searchExWE"
							className="ion-margin-top serifChars"
							helperText={tw("what to change")}
							onIonChange={e => resetError("seek")}
						></IonInput>
					</IonItem>
					<IonItem className="labelled">
						<IonLabel className="replaceLabel">{t("Output Expression", { context: "presentation" })}</IonLabel>
					</IonItem>
					<IonItem>
						<IonInput
							aria-label={t("Output Expression", { context: "presentation" })}
							id="replaceExWE"
							className="ion-margin-top serifChars"
							helperText={tw("what it changes into")}
						></IonInput>
					</IonItem>
					<IonItem className="labelled">
						<IonLabel>{tw("Description of the transformation", { context: "presentation" })}</IonLabel>
					</IonItem>
					<IonItem>
						<IonInput
							aria-label={tw("Description of the transformation")}
							id="optDescWE"
							className="ion-margin-top"
							placeholder={tc("optional")}
						></IonInput>
					</IonItem>
					<IonItemDivider>
						<IonLabel>{t("Transformation Direction", { context: "presentation" })}</IonLabel>
					</IonItemDivider>
					<IonRadioGroup
						value={direction}
						onIonChange={e => setDirection(e.detail.value as WETransformDirection)}
					>
						<IonItem>
							<IonRadio
								value="both"
								labelPlacement="end"
								justify="start"
							>{t("At input then undo at output", { context: "formal" })}</IonRadio>
						</IonItem>
						<IonItem>
							<IonRadio
								value="double"
								labelPlacement="end"
								justify="start"
							>{t("At input and at output", { context: "formal" })}</IonRadio>
						</IonItem>
						<IonItem>
							<IonRadio
								value="in"
								labelPlacement="end"
								justify="start"
							>{t("At input only", { context: "formal" })}</IonRadio>
						</IonItem>
						<IonItem>
							<IonRadio
								value="out"
								labelPlacement="end"
								justify="start"
							>{t("At output only", { context: "formal" })}</IonRadio>
						</IonItem>
					</IonRadioGroup>
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
