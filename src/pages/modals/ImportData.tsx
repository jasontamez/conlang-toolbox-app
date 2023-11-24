import React, { useState } from 'react';
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

import {
	AppSettings,
	ConceptDisplay,
	ConceptsState,
	DJCustomInfo,
	DJState,
	ExtraCharactersState,
	ImportExportObject,
	LexiconState,
	ModalProperties,
	MSState,
	SortSettings,
	StateObject,
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
import { $and, $i } from '../../components/DollarSignExports';
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

type storedLex = [string, LexiconState][];
type storedMS = [string, MSState][];
type storedWG = [string, any][];
type storedWE = [string, any][];
type storedDJ = [string, DJCustomInfo][];

type ImportSettings = [ AppSettings | null, SortSettings | null ];

function overwriteStorage (storage: LocalForage, data: [string, any][]) {
	storage.clear().then(
		() => data.forEach(([key, value]) => storage.setItem(key, value))
	);	
};

const ImportData = (props: ModalProperties) => {
	const { isOpen, setIsOpen } = props;
	const [doToast, undoToast] = useIonToast();
	const [ doAlert ] = useIonAlert();
	const dispatch = useDispatch();
	const [readyToImport, setReadyToImport] = useState<boolean>(false);
	const [import_wg, setImport_wg] = useState<boolean>(true);
	const [import_we, setImport_we] = useState<boolean>(true);
	const [import_ms, setImport_ms] = useState<boolean>(true);
	const [import_dj, setImport_dj] = useState<boolean>(true);
	const [import_lex, setImport_lex] = useState<boolean>(true);
	const [import_con, setImport_con] = useState<boolean>(true);
	const [import_ec, setImport_ec] = useState<boolean>(true);
	const [import_set, setImport_set] = useState<boolean>(true); // This covers settings AND sort settings
	const [import_wgStored, setImport_wgStored] = useState<boolean>(true);
	const [import_weStored, setImport_weStored] = useState<boolean>(true);
	const [import_msStored, setImport_msStored] = useState<boolean>(true);
	const [import_djStored, setImport_djStored] = useState<boolean>(true);
	const [import_lexStored, setImport_lexStored] = useState<boolean>(true);
	const { disableConfirms } = useSelector((state: StateObject) => state.appSettings);

	const [possible_wg, setPossible_wg] = useState<WGState | false>(false);
	const [possible_we, setPossible_we] = useState<WEState | false>(false);
	const [possible_ms, setPossible_ms] = useState<MSState | false>(false);
	const [possible_dj, setPossible_dj] = useState<DJState | false>(false);
	const [possible_lex, setPossible_lex] = useState<LexiconState | false>(false);
	const [possible_con, setPossible_con] = useState<ConceptsState | false>(false);
	const [possible_ec, setPossible_ec] = useState<ExtraCharactersState | false>(false);
	const [possible_set, setPossible_set] = useState<ImportSettings | false>(false); // This covers settings AND sort settings
	const [possible_wgStored, setPossible_wgStored] = useState<storedWG | false>(false);
	const [possible_weStored, setPossible_weStored] = useState<storedWE | false>(false);
	const [possible_msStored, setPossible_msStored] = useState<storedMS | false>(false);
	const [possible_djStored, setPossible_djStored] = useState<storedDJ | false>(false);
	const [possible_lexStored, setPossible_lexStored] = useState<storedLex | false>(false);

	const doClose = () => {
		doCancel();
		setIsOpen(false);
	};

	const doCancel = () => {
		const el = $i("importingData");
		el && (el.value = "");
		setReadyToImport(false);
		setPossible_wg(false);
		setPossible_we(false);
		setPossible_dj(false);
		setPossible_ms(false);
		setPossible_ec(false);
		setPossible_lex(false);
		setPossible_wgStored(false);
		setPossible_weStored(false);
		setPossible_djStored(false);
		setPossible_msStored(false);
		setPossible_lexStored(false);
	};

	function onLoad() {
		const el = $i("importingData");
		el && (el.value = "");
	};

	// Scan input for data and set state appropriately
	function parseInput(object: ImportExportObject) {
		const {
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
		setPossible_wg(wg || false);
		setPossible_we(we || false);
		setPossible_dj(dj || false);
		setPossible_ms(ms || false);
		setPossible_ec(ec || false);
		setPossible_lex(lexicon || false);
		setPossible_wgStored(wgStored || false);
		setPossible_weStored(weStored || false);
		setPossible_djStored(djStored || false);
		setPossible_msStored(msStored || false);
		setPossible_lexStored(lexStored || false);
		if(concepts) {
			setPossible_con(concepts);
		} else if (wordLists) {
			const display: ConceptDisplay[] = [];
			Object.entries(wordLists.listsDisplayed).forEach(([key, value]) => {
				value && display.push(key as ConceptDisplay);
			});
			const textCenter = wordLists.centerTheDisplayedWords.length > 0;
			setPossible_con({
				display,
				textCenter,
				showingCombos: false,
				combinations: []
			});
		} else {
			setPossible_con(false);
		}
		if(appSettings) {
			setPossible_set([appSettings, sortSettings || null]);
		} else if (sortSettings) {
			setPossible_set([null, sortSettings]);
		} else {
			setPossible_set(false);
		}
		setReadyToImport(true);
	};

	// Look at the pasted import and try to make an object out of it
	function analyze() {
		const el = $i("importingData");
		const incoming = (el && el.value) || "";
		try {
			const parsed: ImportExportObject = JSON.parse(incoming);
			if(parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
				try {
					VALIDATE_import(parsed);
					parseInput(parsed);
				} catch(e) {
					let message = (e instanceof Error) ? e.message : `${e}`;
					log(dispatch, ["Error validating Import", incoming, message]);
					toaster({
						message,
						color: "danger",
						doToast,
						undoToast
					});
				}
				return;
			}
			toaster({
				message: `ERROR 102: input was not an object`,
				color: "danger",
				doToast,
				undoToast
			});
		} catch (e) {
			let message = (e instanceof Error) ? e.message : `${e}`;
			log(dispatch, ["Error parsing Import", incoming, message]);
			return toaster({
				message: `PARSE ERROR 101: ${message}`,
				color: "danger",
				doToast,
				undoToast
			});
		}
	};

	// Actually import the given data
	function doImport() {
		// Get string list of data we're importing
		const overwriting: string[] = [];
		const storages: string[] = [];
		import_wg && possible_wg && overwriting.push("WordGen");
		import_we && possible_we && overwriting.push("WordEvolve");
		import_ms && possible_ms && overwriting.push("MorphoSyntax");
		import_dj && possible_dj && overwriting.push("Declenjugator");
		import_lex && possible_lex && overwriting.push("Lexicon");
		import_con && possible_con && overwriting.push("Concepts");
		import_ec && possible_ec && overwriting.push("Extra Characters");
		import_set && possible_set && overwriting.push("App Settings");
		import_wgStored && possible_wgStored && storages.push("WordGen");
		import_weStored && possible_weStored && storages.push("WordEvolve");
		import_msStored && possible_msStored && storages.push("MorphoSyntax");
		import_djStored && possible_djStored && storages.push("Declenjugator");
		import_lexStored && possible_lexStored && storages.push("Lexicon");
		// Create a handler that does the actual importing
		const handler = () => {
			// IMPORT!
			import_wg && possible_wg && dispatch(loadStateWG(possible_wg));
			import_we && possible_we && dispatch(loadStateWE(possible_we));
			import_ms && possible_ms && dispatch(loadStateMS(possible_ms));
			import_dj && possible_dj && dispatch(loadStateDJ(possible_dj));
			import_lex && possible_lex && dispatch(loadStateLex(possible_lex));
			import_con && possible_con && dispatch(loadStateConcepts(possible_con));
			import_ec && possible_ec && dispatch(loadStateEC(possible_ec));
			if(possible_set) {
				const [settings, sorting] = possible_set;
				settings && dispatch(loadStateSettings(settings));
				sorting && dispatch(loadSortSettingsState(sorting));
			}
			import_wgStored && possible_wgStored && overwriteStorage(CustomStorageWG, possible_wgStored);
			import_weStored && possible_weStored && overwriteStorage(CustomStorageWE, possible_weStored);
			import_msStored && possible_msStored && overwriteStorage(MorphoSyntaxStorage, possible_msStored);
			import_djStored && possible_djStored && overwriteStorage(DeclenjugatorStorage, possible_djStored);
			import_lexStored && possible_lexStored && overwriteStorage(LexiconStorage, possible_lexStored);
			// Create success message
			let message = overwriting.length > 0 ? "Imported new info for " + $and(overwriting) : "";
			if(storages.length > 0) {
				if(message) {
					message += "; also completely overwrote storage for " + $and(storages);
				} else {
					message = "Completely overwrote storage for " + $and(storages);
				}
			}
			toaster({
				message,
				color: "success",
				position: "middle",
				duration: 10000,
				doToast,
				undoToast
			});
		};
		// Sanity check
		if(storages.length + overwriting.length === 0) {
			return toaster({
				message: "You did not choose anything to import.",
				color: "danger",
				position: "middle",
				duration: 5000,
				doToast,
				undoToast
			});
		} else if(disableConfirms) {
			// Go right ahead
			return handler();
		}
		// Give them a chance to back out.
		let message = overwriting.length > 0 ? "This will overwrite all current data in " + $and(overwriting) : "";
		if(storages.length > 0) {
			if(message) {
				message += ". It will ALSO delete and replace stored data for " + $and(storages);
			} else {
				message = "This will delete and replace stored data for " + $and(storages);
			}
		}
		message += ". Are you SURE you want to do this?";
		yesNoAlert({
			header: "WARNING!",
			message,
			handler,
			submit: "Yes, I Want to Do This",
			doAlert
		});
	};

	// TO-DO: Scroll to import section when analyzed (and maybe shrink input box?)
	// TO-DO: Add "Are you sure?" confirm when exiting without importing

	return (
		<IonModal isOpen={isOpen} onDidDismiss={() => doClose()} onIonModalDidPresent={onLoad} backdropDismiss={false}>
			<IonHeader>
				<IonToolbar color="primary">
					<IonTitle>Import Info</IonTitle>
					<IonButtons slot="end">
						<IonButton onClick={() => doClose()}>
							<IonIcon icon={closeCircleOutline} />
						</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<IonList lines="full" id="importData" className={readyToImport ? "" : "waitingForInput"}>
					<IonItem lines="none" className="permanent">
						<IonLabel className="ion-text-center ion-text-wrap">
							<h2 className="ion-text-center ion-text-wrap">
								Paste your data below.
							</h2>
						</IonLabel>
					</IonItem>
					<IonItem lines="none" className="permanent">
						<IonTextarea
							aria-label="Data to Import"
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
							onClick={doCancel}
						>
							<IonLabel>Cancel</IonLabel>
							<IonIcon icon={closeCircle} slot="end" />
						</IonButton>
						<IonButton
							color="primary"
							disabled={readyToImport}
							slot="end"
							onClick={analyze}
						>
							<IonLabel>Analyze</IonLabel>
							<IonIcon icon={sparkles} slot="start" />
						</IonButton>
					</IonItem>
					<IonItemDivider>What to Import</IonItemDivider>
					<IonItem
						className={possible_ms ? "" : "notSelectable"}
						lines={possible_msStored ? "none" : "full"}
					>
						<IonToggle
							enableOnOffLabels
							aria-label="Current MorphoSyntax Settings"
							checked={import_ms}
							onIonChange={() => setImport_ms(!import_ms)}
						>Current MorphoSyntax Settings</IonToggle>
					</IonItem>
					<IonItem className={possible_msStored ? "" : "notSelectable"}>
						<IonToggle
							enableOnOffLabels
							aria-label="Stored MorphoSyntax Documents"
							checked={import_msStored}
							onIonChange={() => setImport_msStored(!import_msStored)}
						>Stored MorphoSyntax Documents</IonToggle>
					</IonItem>
					<IonItem
						className={possible_wg ? "" : "notSelectable"}
						lines={possible_wgStored ? "none" : "full"}
					>
						<IonToggle
							enableOnOffLabels
							aria-label="Current WordGen Settings"
							checked={import_wg}
							onIonChange={() => setImport_wg(!import_wg)}
						>Current WordGen Settings</IonToggle>
					</IonItem>
					<IonItem className={possible_wgStored ? "" : "notSelectable"}>
						<IonToggle
							enableOnOffLabels
							aria-label="Stored WordGen Settings"
							checked={import_wgStored}
							onIonChange={() => setImport_wgStored(!import_wgStored)}
						>Stored WordGen Settings</IonToggle>
					</IonItem>
					<IonItem
						className={possible_we ? "" : "notSelectable"}
						lines={possible_weStored ? "none" : "full"}
					>
						<IonToggle
							enableOnOffLabels
							aria-label="Current WordEvolve Settings"
							checked={import_we}
							onIonChange={() => setImport_we(!import_we)}
						>Current WordEvolve Settings</IonToggle>
					</IonItem>
					<IonItem className={possible_weStored ? "" : "notSelectable"}>
						<IonToggle
							enableOnOffLabels
							aria-label="Stored WordEvolve Settings"
							checked={import_weStored}
							onIonChange={() => setImport_weStored(!import_weStored)}
						>Stored WordEvolve Settings</IonToggle>
					</IonItem>
					<IonItem
						className={possible_dj ? "" : "notSelectable"}
						lines={possible_djStored ? "none" : "full"}
					>
						<IonToggle
							enableOnOffLabels
							aria-label="Current Declenjugator Settings"
							checked={import_dj}
							onIonChange={() => setImport_dj(!import_dj)}
						>Current Declenjugator Settings</IonToggle>
					</IonItem>
					<IonItem className={possible_djStored ? "" : "notSelectable"}>
						<IonToggle
							enableOnOffLabels
							aria-label="Stored Declenjugator Info"
							checked={import_djStored}
							onIonChange={() => setImport_djStored(!import_djStored)}
						>Stored Declenjugator Info</IonToggle>
					</IonItem>
					<IonItem
						className={possible_lex ? "" : "notSelectable"}
						lines={possible_lexStored ? "none" : "full"}
					>
						<IonToggle
							enableOnOffLabels
							aria-label="Current Lexicon Settings"
							checked={import_lex}
							onIonChange={() => setImport_lex(!import_lex)}
						>Current Lexicon Settings</IonToggle>
					</IonItem>
					<IonItem className={possible_lexStored ? "" : "notSelectable"}>
						<IonToggle
							enableOnOffLabels
							aria-label="Stored Lexicons"
							checked={import_lexStored}
							onIonChange={() => setImport_lexStored(!import_lexStored)}
						>Stored Lexicons</IonToggle>
					</IonItem>
					<IonItem className={possible_con ? "" : "notSelectable"}>
						<IonToggle
							enableOnOffLabels
							aria-label="Concepts Settings"
							checked={import_con}
							onIonChange={() => setImport_con(!import_con)}
						>Concepts Settings</IonToggle>
					</IonItem>
					<IonItem className={possible_ec ? "" : "notSelectable"}>
						<IonToggle
							enableOnOffLabels
							aria-label="Extra Characters Settings"
							checked={import_ec}
							onIonChange={() => setImport_ec(!import_ec)}
						>Extra Characters Settings</IonToggle>
					</IonItem>
					<IonItem className={possible_set ? "" : "notSelectable"}>
						<IonToggle
							enableOnOffLabels
							aria-label="Other App Settings"
							checked={import_set}
							onIonChange={() => setImport_set(!import_set)}
						>Other App Settings</IonToggle>
					</IonItem>
					<IonItem>
						<IonButton
							color="secondary"
							slot="end"
							onClick={doImport}
						>
							<IonLabel>Import</IonLabel>
							<IonIcon icon={arrowUpCircle} slot="start" />
						</IonButton>
					</IonItem>
				</IonList>
			</IonContent>
			<IonFooter>
				<IonToolbar>
					<IonButton color="success" slot="end" onClick={() => doClose()}>
						<IonIcon icon={closeCircleOutline} slot="start" />
						<IonLabel>Done</IonLabel>
					</IonButton>
				</IonToolbar>
			</IonFooter>
		</IonModal>
	);
};

export default ImportData;
