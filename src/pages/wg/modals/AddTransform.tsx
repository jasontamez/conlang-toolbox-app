import React, { useCallback, useMemo } from 'react';
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
import useI18Memo from '../../../components/useI18Memo';

function resetError() {
	// Remove danger color if present
	// Debounce means this sometimes doesn't exist by the time this is called.
	const where = $q(".seekLabel");
	where && where.classList.remove("invalidValue");
}

const wgweWords = [
	"Description of the transformation", "No search expression present",
	"replacement expression", "search expression"
];

const presentational = [
	"Description of the transformation",
	"replacement expression", "search expression"
];
const context = { context: "presentational" };

const commons = [
	"Add and Close", "Cancel", "Close", "Extra Characters", "error", "optional", "dummy"
];

const addies = [ "thingAdded", "addThing" ];

const AddTransformModal = (props: ExtraCharactersModalOpener) => {
	const [ t ] = useTranslator('we');
	const [ tc ] = useTranslator('common');
	const [ tThingAdd, tAddThing ] = useMemo(() => {
		const tTransformation = t("Transformation");
		return addies.map(term => tc(term, { thing: tTransformation }));
	}, [t, tc]);
	const [ tAddClose, tCancel, tClose, tExChar, tError, tOptional ] = useI18Memo(commons);
	const [ tTransDesc, tNoSearch, tRepl, tSrch ] = useI18Memo(wgweWords, "wgwe");
	const [ tpTrandDesc, tpRepl, tpSrch ] = useI18Memo(presentational, "wgwe", context);

	const { isOpen, setIsOpen, openECM } = props;
	const dispatch = useDispatch();
	const [doAlert] = useIonAlert();
	const toast = useIonToast();

	const maybeSaveNewTransform = useCallback((close: boolean = true) => {
		const searchEl = $i<HTMLInputElement>("searchEx");
		const err: string[] = [];
		// Test info for validness, then save if needed and reset the newTransform
		const seek = (searchEl && searchEl.value) || "";
		if(seek === "") {
			const el = $q(".seekLabel");
			el && el.classList.add("invalidValue");
			err.push(tNoSearch);
		}
		try {
			new RegExp(seek);
		} catch(e) {
			err.push(`${e}`);
		}
		if(err.length > 0) {
			// Errors found.
			doAlert({
				header: tError,
				message: err.join("; "),
				cssClass: "danger",
				buttons: [
					{
						text: tCancel,
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
			message: tThingAdd,
			duration: 2500,
			color: "success",
			position: "top",
			toast
		});
	}, [dispatch, doAlert, setIsOpen, toast, tThingAdd, tCancel, tError, tNoSearch]);
	const maybeSaveAndAdd = useCallback(() => maybeSaveNewTransform(false), [maybeSaveNewTransform]);
	const maybeSaveAndClose = useCallback(() => maybeSaveNewTransform(), [maybeSaveNewTransform]);
	const closer = useCallback(() => setIsOpen(false), [setIsOpen]);
	const openEx = useCallback(() => openECM(true), [openECM]);

	return (
		<IonModal isOpen={isOpen} onDidDismiss={closer}>
			<IonHeader>
				<IonToolbar color="primary">
					<IonTitle>{tAddThing}</IonTitle>
					<IonButtons slot="end">
						<IonButton onClick={openEx} aria-label={tExChar}>
							<IonIcon icon={globeOutline} />
						</IonButton>
						<IonButton onClick={closer} aria-label={tClose}>
							<IonIcon icon={closeCircleOutline} />
						</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<IonList lines="none" className="hasSpecialLabels wgAddTransform">
					<IonItem className="labelled">
						<IonLabel className="seekLabel">{tpSrch}</IonLabel>
					</IonItem>
					<IonItem>
						<IonInput
							aria-label={tSrch}
							id="searchEx"
							className="ion-margin-top serifChars"
							onIonChange={resetError}
						></IonInput>
					</IonItem>
					<IonItem className="labelled">
						<IonLabel className="replaceLabel">{tpRepl}</IonLabel>
					</IonItem>
					<IonItem>
						<IonInput
							aria-label={tRepl}
							id="replaceEx"
							className="ion-margin-top serifChars"
						></IonInput>
					</IonItem>
					<IonItem className="labelled">
						<IonLabel>{tpTrandDesc}</IonLabel>
					</IonItem>
					<IonItem>
						<IonInput
							aria-label={tTransDesc}
							id="optDesc"
							className="ion-margin-top"
							placeholder={tOptional}
						></IonInput>
					</IonItem>
				</IonList>
			</IonContent>
			<IonFooter>
				<IonToolbar>
					<IonButton
						color="tertiary"
						slot="end"
						onClick={maybeSaveAndAdd}
					>
						<IonIcon icon={addOutline} slot="start" />
						<IonLabel>{tAddThing}</IonLabel>
					</IonButton>
					<IonButton
						color="success"
						slot="end"
						onClick={maybeSaveAndClose}
					>
						<IonIcon icon={addOutline} slot="start" />
						<IonLabel>{tAddClose}</IonLabel>
					</IonButton>
				</IonToolbar>
			</IonFooter>
		</IonModal>
	);
};

export default AddTransformModal;
