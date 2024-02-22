import React, { useEffect, useState } from 'react';
import {
	IonIcon,
	IonLabel,
	IonList,
	IonItem,
	IonContent,
	IonHeader,
	IonToolbar,
	IonButtons,
	IonButton,
	IonTitle,
	IonModal,
	IonFooter,
	IonTextarea,
	useIonToast,
	IonItemDivider,
	IonToggle,
	useIonAlert
} from '@ionic/react';
import { arrowUpCircle, closeCircle, closeCircleOutline, sparkles } from "ionicons/icons";
import { useDispatch, useSelector } from 'react-redux';
import { compare } from "compare-versions";

import {
	AppSettings,
	ConceptDisplay,
	ConceptDisplayObject,
	ConceptsState,
	DJState,
	ExtraCharactersState,
	ImportExportObject,
	LexiconState,
	ModalProperties,
	MSState,
	SortSettings,
	StateObject,
	storedDJ,
	storedLex,
	storedMS,
	storedWE,
	storedWG,
	WEState,
	WGState
} from '../../store/types';
import { VALIDATE_import } from '../../store/validators';

import {
	CustomStorageWE,
	CustomStorageWG,
	DeclenjugatorStorage,
	LexiconStorage,
	MorphoSyntaxStorage
} from '../../components/PersistentInfo';
import toaster from '../../components/toaster';
import { $and, $delay, $i, $q } from '../../components/DollarSignExports';
import log from '../../components/Logging';
import { loadSortSettingsState } from '../../store/sortingSlice';
import { loadStateSettings } from '../../store/settingsSlice';
import { loadStateWG } from '../../store/wgSlice';
import { loadStateWE } from '../../store/weSlice';
import { loadStateMS } from '../../store/msSlice';
import { loadStateDJ } from '../../store/declenjugatorSlice';
import { loadStateLex } from '../../store/lexiconSlice';
import { loadStateConcepts } from '../../store/conceptsSlice';
import { loadStateEC } from '../../store/extraCharactersSlice';
import yesNoAlert from '../../components/yesNoAlert';
import useTranslator from '../../store/translationHooks';

type ImportSettings = [ AppSettings | null, SortSettings | null ];

function overwriteStorage (storage: LocalForage, data: [string, any][]) {
	storage.clear().then(
		() => data.forEach(([key, value]) => storage.setItem(key, value))
	);
};

const ImportData = (props: ModalProperties) => {
	const { isOpen, setIsOpen } = props;
	const toast = useIonToast();
	const [ doAlert ] = useIonAlert();
	const dispatch = useDispatch();
	const [ t ] = useTranslator('common');
	const [ ts ] = useTranslator('settings');
	const [readyToImport, setReadyToImport] = useState<boolean>(false);
	const [hasImported, setHasImported] = useState<boolean>(false);

	const [do_import_wg, setDo_import_wg] = useState<boolean>(true);
	const [do_import_we, setDo_import_we] = useState<boolean>(true);
	const [do_import_ms, setDo_import_ms] = useState<boolean>(true);
	const [do_import_dj, setDo_import_dj] = useState<boolean>(true);
	const [do_import_lex, setDo_import_lex] = useState<boolean>(true);
	const [do_import_con, setDo_import_con] = useState<boolean>(true);
	const [do_import_ec, setDo_import_ec] = useState<boolean>(true);
	// Below covers settings AND sort settings
	const [do_import_set, setDo_import_set] = useState<boolean>(true);
	const [do_import_wgStored, setDo_import_wgStored] = useState<boolean>(true);
	const [do_import_weStored, setDo_import_weStored] = useState<boolean>(true);
	const [do_import_msStored, setDo_import_msStored] = useState<boolean>(true);
	const [do_import_djStored, setDo_import_djStored] = useState<boolean>(true);
	const [do_import_lexStored, setDo_import_lexStored] = useState<boolean>(true);
	const { disableConfirms } = useSelector((state: StateObject) => state.appSettings);

	const [potential_import_wg, setPotential_import_wg] = useState<WGState | false>(false);
	const [potential_import_we, setPotential_import_we] = useState<WEState | false>(false);
	const [potential_import_ms, setPotential_import_ms] = useState<MSState | false>(false);
	const [potential_import_dj, setPotential_import_dj] = useState<DJState | false>(false);
	const [potential_import_lex, setPotential_import_lex] = useState<LexiconState | false>(false);
	const [potential_import_con, setPotential_import_con] = useState<ConceptsState | false>(false);
	const [potential_import_ec, setPotential_import_ec] = useState<ExtraCharactersState | false>(false);
	// Below covers settings AND sort settings
	const [potential_import_set, setPotential_import_set] = useState<ImportSettings | false>(false);
	const [potential_import_wgStored, setPotential_import_wgStored] = useState<storedWG | false>(false);
	const [potential_import_weStored, setPotential_import_weStored] = useState<storedWE | false>(false);
	const [potential_import_msStored, setPotential_import_msStored] = useState<storedMS | false>(false);
	const [potential_import_djStored, setPotential_import_djStored] = useState<storedDJ | false>(false);
	const [potential_import_lexStored, setPotential_import_lexStored] = useState<storedLex | false>(false);

	const morphosyntax = t("MorphoSyntax");
	const wordgen = t("WordGen");
	const wordevolve = t("WordEvolve");
	const declenjugator = t("Declenjugator");
	const lexicon = t("Lexicon");
	const concepts = t("Concepts");
	const extraCharacters = t("Extra Characters");

	const doClose = () => {
		resetAnalysis();
		setIsOpen(false);
	};

	const resetAnalysis = () => {
		const el = $i<HTMLInputElement>("importingData");
		el && (el.value = "");
		setReadyToImport(false);
		setHasImported(false);
		setPotential_import_wg(false);
		setPotential_import_we(false);
		setPotential_import_dj(false);
		setPotential_import_ms(false);
		setPotential_import_ec(false);
		setPotential_import_lex(false);
		setPotential_import_wgStored(false);
		setPotential_import_weStored(false);
		setPotential_import_djStored(false);
		setPotential_import_msStored(false);
		setPotential_import_lexStored(false);
	};

	const maybeClose = () => {
		return readyToImport && !hasImported ? yesNoAlert({
			header: t("areYouSure"),
			message: ts("You haven't imported anything yet."),
			handler: doClose,
			submit: ts("Yes Close This"),
			cssClass: "warning",
			doAlert
		}) : doClose();
	};

	function onLoad() {
		const el = $i<HTMLInputElement>("importingData");
		el && (el.value = "");
		setDo_import_wg(true);
		setDo_import_we(true);
		setDo_import_dj(true);
		setDo_import_ms(true);
		setDo_import_ec(true);
		setDo_import_lex(true);
		setDo_import_wgStored(true);
		setDo_import_weStored(true);
		setDo_import_djStored(true);
		setDo_import_msStored(true);
		setDo_import_lexStored(true);
	};

	// Scan input for data and set state appropriately
	function parseInput(object: ImportExportObject) {
		const {
			currentVersion,
			wg,
			we,
			dj,
			ms,
			lexicon,
			concepts,
			wordLists,
			ec,
			appSettings,
			sortSettings,
			wgStored,
			weStored,
			msStored,
			djStored,
			lexStored
		} = object;
		setPotential_import_wg(wg || false);
		setPotential_import_we(we || false);
		setPotential_import_dj(dj || false);
		setPotential_import_ms(ms || false);
		setPotential_import_ec(ec || false);
		setPotential_import_lex(lexicon || false);
		setPotential_import_wgStored(wgStored || false);
		setPotential_import_weStored(weStored || false);
		setPotential_import_djStored(djStored || false);
		setPotential_import_msStored(msStored || false);
		setPotential_import_lexStored(lexStored || false);
		if(concepts) {
			if(compare(currentVersion, "0.12.0", "<")) {
				const { display: oldDisplay, ...etc } = concepts;
				const display: ConceptDisplayObject = {};
				(Object.keys(oldDisplay) as ConceptDisplay[]).forEach((prop) => {
					display[prop] = true;
				});
				setPotential_import_con({display, ...etc});
			} else {
				setPotential_import_con(concepts);
			}
		} else if (wordLists) {
			const display: ConceptDisplayObject = {};
			(Object.keys(wordLists.listsDisplayed) as ConceptDisplay[]).forEach((prop) => {
				display[prop] = true;
			});
			const textCenter = wordLists.centerTheDisplayedWords.length > 0;
			setPotential_import_con({
				display,
				textCenter,
				showingCombos: false,
				combinations: []
			});
		} else {
			setPotential_import_con(false);
		}
		if(appSettings) {
			setPotential_import_set([appSettings, sortSettings || null]);
		} else if (sortSettings) {
			setPotential_import_set([null, sortSettings]);
		} else {
			setPotential_import_set(false);
		}
		setReadyToImport(true);
	};

	useEffect(() => {
		$delay(500).then(() => {
			const el = $i<HTMLIonContentElement>("importDataContent");
			if(el && readyToImport) {
				const inner = $q("ion-item-divider", el);
				inner && el.scrollToPoint(0, (inner.offsetTop || 50) - 50, 1500);
			} else if(el) {
				el.scrollToTop(1500);
			}
		});
	}, [readyToImport]);

	// Look at the pasted import and try to make an object out of it
	function analyze() {
		const el = $i<HTMLInputElement>("importingData");
		const incoming = (el && el.value) || "";
		try {
			const parsed: ImportExportObject = JSON.parse(incoming);
			if(parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
				try {
					VALIDATE_import(parsed);
					parseInput(parsed);
				} catch(e) {
					let message = (e instanceof Error) ? e.message : `${e}`;
					log(dispatch, [ts("Error validating Import"), message], parsed);
					toaster({
						message,
						color: "danger",
						toast
					});
				}
				return;
			}
			toaster({
				message: `ERROR 102: input was not an object`,
				color: "danger",
				toast
			});
		} catch (e) {
			let message = (e instanceof Error) ? e.message : `${e}`;
			log(dispatch, ["Error parsing Import", message]);
			return toaster({
				message: `PARSE ERROR 101: ${message}`,
				color: "danger",
				toast
			});
		}
	};

	// Actually import the given data
	function doImport() {
		// Get string list of data we're importing
		const overwriting: string[] = [];
		const storages: string[] = [];
		const wordgen = t("WordGen");
		do_import_wg && potential_import_wg && overwriting.push(wordgen);
		const wordevolve = t("WordEvolve");
		do_import_we && potential_import_we && overwriting.push(wordevolve);
		const morphosyntax = t("MorphoSyntax");
		do_import_ms && potential_import_ms && overwriting.push(morphosyntax);
		const declenjugator = t("Declenjugator");
		do_import_dj && potential_import_dj && overwriting.push(declenjugator);
		const lexicon = t("Lexicon");
		do_import_lex && potential_import_lex && overwriting.push(lexicon);
		do_import_con && potential_import_con && overwriting.push(t("Concepts"));
		do_import_ec && potential_import_ec && overwriting.push(t("Extra Characters"));
		do_import_set && potential_import_set && overwriting.push(t("App Settings"));
		do_import_wgStored && potential_import_wgStored && storages.push(wordgen);
		do_import_weStored && potential_import_weStored && storages.push(wordevolve);
		do_import_msStored && potential_import_msStored && storages.push(morphosyntax);
		do_import_djStored && potential_import_djStored && storages.push(declenjugator);
		do_import_lexStored && potential_import_lexStored && storages.push(lexicon);
		// Create a handler that does the actual importing
		const handler = () => {
			// IMPORT!
			do_import_wg && potential_import_wg && dispatch(loadStateWG(potential_import_wg));
			do_import_we && potential_import_we && dispatch(loadStateWE(potential_import_we));
			do_import_ms && potential_import_ms && dispatch(loadStateMS(potential_import_ms));
			do_import_dj && potential_import_dj && dispatch(loadStateDJ(potential_import_dj));
			do_import_lex && potential_import_lex && dispatch(loadStateLex(potential_import_lex));
			do_import_con && potential_import_con && dispatch(loadStateConcepts(potential_import_con));
			do_import_ec && potential_import_ec && dispatch(loadStateEC(potential_import_ec));
			if(do_import_set && potential_import_set) {
				const [settings, sorting] = potential_import_set;
				settings && dispatch(loadStateSettings(settings));
				sorting && dispatch(loadSortSettingsState(sorting));
			}
			do_import_wgStored && potential_import_wgStored
				&& overwriteStorage(CustomStorageWG, potential_import_wgStored);
			do_import_weStored && potential_import_weStored
				&& overwriteStorage(CustomStorageWE, potential_import_weStored);
			do_import_msStored && potential_import_msStored
				&& overwriteStorage(MorphoSyntaxStorage, potential_import_msStored);
			do_import_djStored && potential_import_djStored
				&& overwriteStorage(DeclenjugatorStorage, potential_import_djStored);
			do_import_lexStored && potential_import_lexStored
				&& overwriteStorage(LexiconStorage, potential_import_lexStored);
			// Create success message
			let message = overwriting.length > 0 ? ts("successImport", { listing: $and(overwriting) }) : "";
			if(storages.length > 0) {
				if(message) {
					message += ts("alsoOverwrote", { listing: $and(storages) });
				} else {
					message = ts("successOverwrote", { listing: $and(storages) });
				}
			}
			toaster({
				message,
				color: "success",
				position: "middle",
				duration: 10000,
				toast
			});
			setHasImported(true);
		};
		// Sanity check
		if(storages.length + overwriting.length === 0) {
			return toaster({
				message: ts("You did not choose anything to import."),
				color: "danger",
				position: "middle",
				duration: 5000,
				toast
			});
		} else if(disableConfirms) {
			// Go right ahead
			return handler();
		}
		// Give them a chance to back out.
		let message = overwriting.length > 0 ? ts("willOverwriteCurrent", { listing: $and(overwriting) }) : "";
		if(storages.length > 0) {
			if(message) {
				message += " " + ts("alsoOverwriteStorage", { listing: $and(storages) });
			} else {
				message = ts("willOverwriteStorage", { listing: $and(storages) });
			}
		}
		message += " " + ts("Are you SURE you want to do this?");
		yesNoAlert({
			header: ts("WARNING!"),
			message,
			cssClass: "danger",
			handler,
			submit: ts("Yes I Want to Do This"),
			doAlert
		});
	};

	return (
		<IonModal isOpen={isOpen} onDidDismiss={() => doClose()} onIonModalDidPresent={onLoad} backdropDismiss={false}>
			<IonHeader>
				<IonToolbar color="primary">
					<IonTitle>{ts("Import Info")}</IonTitle>
					<IonButtons slot="end">
						<IonButton onClick={maybeClose}>
							<IonIcon icon={closeCircleOutline} />
						</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent id="importDataContent">
				<IonList lines="full" id="importData" className={readyToImport ? "" : "waitingForInput"}>
					<IonItem lines="none" className="permanent">
						<IonLabel className="ion-text-center ion-text-wrap">
							<h2 className="ion-text-center ion-text-wrap">{ts("importDescription")}</h2>
						</IonLabel>
					</IonItem>
					<IonItem lines="none" className="permanent">
						<IonTextarea
							aria-label={ts("Data to Import")}
							wrap="soft"
							rows={12}
							id="importingData"
							disabled={readyToImport}
						></IonTextarea>
					</IonItem>
					<IonItem className="permanent">
						<IonButton
							id="cancelButton"
							color="warning"
							slot="start"
							className={readyToImport ? "showing" : "hiding"}
							onClick={resetAnalysis}
						>
							<IonLabel>{ts("Reset")}</IonLabel>
							<IonIcon icon={closeCircle} slot="end" />
						</IonButton>
						<IonButton
							color="primary"
							disabled={readyToImport}
							slot="end"
							onClick={analyze}
						>
							<IonLabel>{ts("Analyze")}</IonLabel>
							<IonIcon icon={sparkles} slot="start" />
						</IonButton>
					</IonItem>
					<IonItemDivider>{ts("What to Import")}</IonItemDivider>
					<IonItem
						className={potential_import_ms ? "" : "notSelectable"}
						lines={potential_import_msStored ? "none" : "full"}
					>
						<IonToggle
							enableOnOffLabels
							aria-label={ts("currentSettings", { tool: morphosyntax })}
							checked={do_import_ms}
							onIonChange={() => setDo_import_ms(!do_import_ms)}
						>{ts("currentSettings", { tool: morphosyntax })}</IonToggle>
					</IonItem>
					<IonItem className={potential_import_msStored ? "" : "notSelectable"}>
						<IonToggle
							enableOnOffLabels
							aria-label={ts("storedDocuments", { tool: morphosyntax })}
							checked={do_import_msStored}
							onIonChange={() => setDo_import_msStored(!do_import_msStored)}
						>{ts("storedDocuments", { tool: morphosyntax })}</IonToggle>
					</IonItem>
					<IonItem
						className={potential_import_wg ? "" : "notSelectable"}
						lines={potential_import_wgStored ? "none" : "full"}
					>
						<IonToggle
							enableOnOffLabels
							aria-label={ts("currentSettings", { tool: wordgen })}
							checked={do_import_wg}
							onIonChange={() => setDo_import_wg(!do_import_wg)}
						>{ts("currentSettings", { tool: wordgen })}</IonToggle>
					</IonItem>
					<IonItem className={potential_import_wgStored ? "" : "notSelectable"}>
						<IonToggle
							enableOnOffLabels
							aria-label={ts("storedSettings", { tool: wordgen })}
							checked={do_import_wgStored}
							onIonChange={() => setDo_import_wgStored(!do_import_wgStored)}
						>{ts("storedSettings", { tool: wordgen })}</IonToggle>
					</IonItem>
					<IonItem
						className={potential_import_we ? "" : "notSelectable"}
						lines={potential_import_weStored ? "none" : "full"}
					>
						<IonToggle
							enableOnOffLabels
							aria-label={ts("currentSettings", { tool: wordevolve })}
							checked={do_import_we}
							onIonChange={() => setDo_import_we(!do_import_we)}
						>{ts("currentSettings", { tool: wordevolve })}</IonToggle>
					</IonItem>
					<IonItem className={potential_import_weStored ? "" : "notSelectable"}>
						<IonToggle
							enableOnOffLabels
							aria-label={ts("storedSettings", { tool: wordevolve })}
							checked={do_import_weStored}
							onIonChange={() => setDo_import_weStored(!do_import_weStored)}
						>{ts("storedSettings", { tool: wordevolve })}</IonToggle>
					</IonItem>
					<IonItem
						className={potential_import_dj ? "" : "notSelectable"}
						lines={potential_import_djStored ? "none" : "full"}
					>
						<IonToggle
							enableOnOffLabels
							aria-label={ts("currentSettings", { tool: declenjugator })}
							checked={do_import_dj}
							onIonChange={() => setDo_import_dj(!do_import_dj)}
						>{ts("currentSettings", { tool: declenjugator })}</IonToggle>
					</IonItem>
					<IonItem className={potential_import_djStored ? "" : "notSelectable"}>
						<IonToggle
							enableOnOffLabels
							aria-label={ts("storedSettings", { tool: declenjugator })}
							checked={do_import_djStored}
							onIonChange={() => setDo_import_djStored(!do_import_djStored)}
						>{ts("storedSettings", { tool: declenjugator })}</IonToggle>
					</IonItem>
					<IonItem
						className={potential_import_lex ? "" : "notSelectable"}
						lines={potential_import_lexStored ? "none" : "full"}
					>
						<IonToggle
							enableOnOffLabels
							aria-label={ts("currentSettings", { tool: lexicon })}
							checked={do_import_lex}
							onIonChange={() => setDo_import_lex(!do_import_lex)}
						>{ts("currentSettings", { tool: lexicon })}</IonToggle>
					</IonItem>
					<IonItem className={potential_import_lexStored ? "" : "notSelectable"}>
						<IonToggle
							enableOnOffLabels
							aria-label={ts("storedDocuments", { tool: lexicon })}
							checked={do_import_lexStored}
							onIonChange={() => setDo_import_lexStored(!do_import_lexStored)}
						>{ts("storedDocuments", { tool: lexicon })}</IonToggle>
					</IonItem>
					<IonItem className={potential_import_con ? "" : "notSelectable"}>
						<IonToggle
							enableOnOffLabels
							aria-label={ts("appSettings", { tool: concepts })}
							checked={do_import_con}
							onIonChange={() => setDo_import_con(!do_import_con)}
						>{ts("appSettings", { tool: concepts })}</IonToggle>
					</IonItem>
					<IonItem className={potential_import_ec ? "" : "notSelectable"}>
						<IonToggle
							enableOnOffLabels
							aria-label={ts("appSettings", { tool: extraCharacters })}
							checked={do_import_ec}
							onIonChange={() => setDo_import_ec(!do_import_ec)}
						>{ts("appSettings", { tool: extraCharacters })}</IonToggle>
					</IonItem>
					<IonItem className={potential_import_set ? "" : "notSelectable"}>
						<IonToggle
							enableOnOffLabels
							aria-label={ts("Other App Settings")}
							checked={do_import_set}
							onIonChange={() => setDo_import_set(!do_import_set)}
						>{ts("Other App Settings")}</IonToggle>
					</IonItem>
					<IonItem>
						<IonButton
							color="secondary"
							slot="end"
							onClick={doImport}
						>
							<IonLabel>{ts("Import")}</IonLabel>
							<IonIcon icon={arrowUpCircle} slot="start" />
						</IonButton>
					</IonItem>
				</IonList>
			</IonContent>
			<IonFooter>
				<IonToolbar>
					<IonButton color="success" slot="end" onClick={maybeClose}>
						<IonIcon icon={closeCircleOutline} slot="start" />
						<IonLabel>{t("Cancel")}</IonLabel>
					</IonButton>
				</IonToolbar>
			</IonFooter>
		</IonModal>
	);
};

export default ImportData;
