import React, { useState, useEffect, useMemo } from 'react';
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
	IonToggle
} from '@ionic/react';
import { closeCircle, closeCircleOutline, sparkles } from "ionicons/icons";
import { useDispatch, useSelector } from 'react-redux';

import {
	DJCustomInfo,
	DJGroup,
	ImportExportObject,
	LexiconState,
	ModalProperties,
	MSState,
	SortSettings,
	StateObject
} from '../../store/types';
import { currentVersion } from '../../store/blankAppState';
import { validateImport } from '../../store/validators';

import {
	CustomStorageWE,
	CustomStorageWG,
	DeclenjugatorStorage,
	LexiconStorage,
	MorphoSyntaxStorage
} from '../../components/PersistentInfo';
import toaster from '../../components/toaster';
import { $i } from '../../components/DollarSignExports';
import log from '../../components/Logging';

type storedLex = [string, LexiconState][];
type storedMS = [string, MSState][];
type storedWG = [string, any][];
type storedWE = [string, any][];
type storedDJ = [string, DJCustomInfo][];

type SaveableSortSettings = Omit<SortSettings, "defaultSortLanguage">;

type OutputObject = Omit<StateObject, "sortSettings" | "lastView" | "logs"> & {
	currentVersion: string
	sortSettings: SaveableSortSettings
	lexStored: storedLex
	msStored: storedMS
	wgStored: storedWG
	weStored: storedWE
	djStored: storedDJ
};

const ImportData = (props: ModalProperties) => {
	const { isOpen, setIsOpen } = props;
	const [doToast, undoToast] = useIonToast();
	const dispatch = useDispatch();
	const [preparingForImport, setPreparingForImport] = useState<boolean>(false);
	const [output, setOutput] = useState<OutputObject | null>(null);
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
	const {
		wg,
		we,
		ms,
		dj,
		lexicon,
		concepts,
		ec,
		appSettings,
		sortSettings
	} = useSelector((state: StateObject) => state);

	const exportedSortSettings = useMemo(() => {
		const { defaultSortLanguage, customSorts, ...etc } = sortSettings;
		const exportedSettings: SaveableSortSettings = {
			...etc,
			customSorts: customSorts.map(obj => {
				return {
					...obj,
					customAlphabet: obj.customAlphabet && [...obj.customAlphabet],
					multiples: obj.multiples && [...obj.multiples],
					customizations: obj.customizations && obj.customizations.map(custom => {
						if("equals" in custom) {
							return {
								...custom,
								equals: [...custom.equals]
							};
						}
						return {
							...custom,
							pre: [...custom.pre],
							post: [...custom.post]
						};
					})
				};
			})
		};
		return exportedSettings;
	}, [sortSettings]);

	const doClose = () => {
		setIsOpen(false);
	};

	useEffect(() => {
		const lexS: storedLex = [];
		const msS: storedMS = [];
		const wgS: storedWG = [];
		const weS: storedWE = [];
		const djS: storedDJ = [];
//		setOutputString("...loading");
		const where = $i("importingData");
		where && (where.value = "...loading");

		const copyDJGroup = (input: DJGroup) => {
			const {startsWith, endsWith, regex, declenjugations} = input;
			const output: DJGroup = {
				...input,
				startsWith: [...startsWith],
				endsWith: [...endsWith],
				regex: regex ? [regex[0], regex[1]] : undefined,
				declenjugations: declenjugations.map(obj => {
					return obj.regex ?
						{
							...obj,
							regex: [obj.regex[0], obj.regex[1]]
						}
					:
						{...obj}
				})
			};
			return output;
		};

		LexiconStorage.iterate((value: LexiconState, key: string) => {
			lexS.push([key, value]);
			return; // Blank return keeps the loop going
		}).then(() => {
			return MorphoSyntaxStorage.iterate((value: MSState, key: string) => {
				msS.push([key, value]);
				return; // Blank return keeps the loop going
			});
		}).then(() => {
			return CustomStorageWE.iterate((value: any, title: string) => {
				weS.push([title, value]);
				return; // Blank return keeps the loop going
			});
		}).then(() => {
			return CustomStorageWG.iterate((value: any, title: string) => {
				wgS.push([title, value]);
				return; // Blank return keeps the loop going
			});
		}).then(() => {
			return DeclenjugatorStorage.iterate((value: DJCustomInfo, title: string) => {
				djS.push([title, value]);
				return; // Blank return keeps the loop going
			});
		}).then(() => {
			setOutput({
				currentVersion,
				wg: {
					...wg,
					characterGroups: wg.characterGroups.map((obj) => ({...obj})),
					transforms: wg.transforms.map((obj) => ({...obj}))
				},
				we: {
					...we,
					characterGroups: we.characterGroups.map((obj) => ({...obj})),
					transforms: we.transforms.map((obj) => ({...obj})),
					soundChanges: we.soundChanges.map((obj) => ({...obj})),
				},
				ms: {
					...ms,
					lastView: "msSettings"
				},
				dj: { // versions >= 0.11.0
					input: dj.input,
					declensions: dj.declensions.map((obj) => ({...copyDJGroup(obj)})),
					conjugations: dj.conjugations.map((obj) => ({...copyDJGroup(obj)})),
					other: dj.other.map((obj) => ({...copyDJGroup(obj)}))
				},
				appSettings: {...appSettings},
				lexicon: {
					...lexicon,
					sortPattern: [...lexicon.sortPattern],
					columns: lexicon.columns.map((obj) => ({...obj})),
					lexicon: lexicon.lexicon.map((obj) => ({
						id: obj.id,
						columns: [...obj.columns]
					}))
				},
//				wordLists: { // versions <= 0.9.4
//					centerTheDisplayedWords: wordListsState.textcenter ? [ "center" ] : [],
//					listsDisplayed: convertedListsDisplayed
//				},
				concepts: { // versions >= 0.9.5
					...concepts,
					display: [...concepts.display],
					combinations: concepts.combinations.map((obj) => ({
						id: obj.id,
						parts: obj.parts.map((obj) => ({...obj}))
					}))
				},
				sortSettings: exportedSortSettings, // versions >= 0.10.0
				ec: {
					...ec,
					faves: [...ec.faves]
				},
//				storages: { // versions <= 0.10.1
//					lex: lexS,
//					mx: msS, // Note the misspelling
//					wg: wgS,
//					we: weS
//				}
				lexStored: lexS, // versions >= 0.11.0
				msStored: msS,   // versions >= 0.11.0
				wgStored: wgS,   // versions >= 0.11.0
				weStored: weS,   // versions >= 0.11.0
				djStored: djS    // versions >= 0.11.0
			});
		});
	}, [
		wg,
		we,
		ms,
		dj,
		lexicon,
		concepts,
		ec,
		appSettings,
		exportedSortSettings
	]);

	useEffect(() => {
		const exportable: any = {...output};
		if(!import_wg) {
			delete exportable.wg;
		}
		if(!import_we) {
			delete exportable.we;
		}
		if(!import_ms) {
			delete exportable.ms;
		}
		if(!import_dj) {
			delete exportable.dj;
		}
		if(!import_lex) {
			delete exportable.lexicon;
		}
		if(!import_con) {
			delete exportable.concepts;
		}
		if(!import_ec) {
			delete exportable.ec;
		}
		if(!import_set) {
			delete exportable.appSettings;
			delete exportable.sortSettings;
		}
		if(!import_wgStored) {
			delete exportable.wgStored;
		}
		if(!import_weStored) {
			delete exportable.weStored;
		}
		if(!import_msStored) {
			delete exportable.msStored;
		}
		if(!import_djStored) {
			delete exportable.djStored;
		}
		if(!import_lexStored) {
			delete exportable.lexStored;
		}
		const final = JSON.stringify(exportable);
//		setOutputString(final);
		const where = $i("importingData");
		where && (where.value = final);
	}, [
		output,
		import_wg,
		import_we,
		import_ms,
		import_dj,
		import_lex,
		import_con,
		import_ec,
		import_set,
		import_wgStored,
		import_weStored,
		import_msStored,
		import_djStored,
		import_lexStored
	]);

	function onLoad() {
		setImport_wg(true);
		setImport_we(true);
		setImport_ms(true);
		setImport_dj(true);
		setImport_lex(true);
		setImport_con(true);
		setImport_ec(true);
		setImport_set(true);
		setImport_wgStored(true);
		setImport_weStored(true);
		setImport_msStored(true);
		setImport_djStored(true);
		setImport_lexStored(true);
	};

	function parseInput(object: ImportExportObject) {};
	function analyze() {
		const el = $i("importingData");
		const incoming = (el && el.value) || "";
		let error = "";
		try {
			const parsed: ImportExportObject = JSON.parse(incoming);
			if(parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
				validateImport(parsed);
				return parseInput(parsed);
			}
			toaster({
				message: `ERROR (102): input was not an object`,
				color: "danger",
				doToast,
				undoToast
			});
		} catch (e) {
			log(dispatch, ["Error parsing Import", incoming, error || e]);
			return toaster({
				message: error || `PARSE ERROR (101): [${e}]`,
				color: "danger",
				doToast,
				undoToast
			});
		}
		setPreparingForImport(true);
	};

	return (
		<IonModal isOpen={isOpen} onDidDismiss={() => doClose()} onIonModalDidPresent={onLoad}>
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
				<IonList lines="full" id="importData" className={preparingForImport ? "" : "waitingForInput"}>
					<IonItem className="permanent">
						<IonLabel className="ion-text-center ion-text-wrap">
							<h2 className="ion-text-center ion-text-wrap">
								Save this info to a note or file.
								<br />You will be able to use it later to restore your data.
							</h2>
						</IonLabel>
					</IonItem>
					<IonItem lines="none" className="permanent">
						<IonTextarea
							aria-label="Data to Import"
							wrap="soft"
							rows={12}
							id="importingData"
							disabled={preparingForImport}
						></IonTextarea>
					</IonItem>
					<IonItem lines="none" className="permanent">
						<IonButton
							id="cancelButton"
							color="primary"
							slot="start"
							className={preparingForImport ? "showing" : "hiding"}
						>
							<IonLabel>Cancel</IonLabel>
							<IonIcon icon={closeCircle} slot="end" />
						</IonButton>
						<IonButton
							color="primary"
							disabled={preparingForImport}
							slot="end"
							onClick={analyze}
						>
							<IonLabel>Analyze</IonLabel>
							<IonIcon icon={sparkles} slot="start" />
						</IonButton>
					</IonItem>
					<IonItemDivider>What to Import</IonItemDivider>
					<IonItem lines="none">
						<IonToggle
							enableOnOffLabels
							aria-label="Current MorphoSyntax Settings"
							checked={import_ms}
							onIonChange={() => setImport_ms(!import_ms)}
						>Current MorphoSyntax Settings</IonToggle>
					</IonItem>
					<IonItem>
						<IonToggle
							enableOnOffLabels
							aria-label="Stored MorphoSyntax Documents"
							checked={import_msStored}
							onIonChange={() => setImport_msStored(!import_msStored)}
						>Stored MorphoSyntax Documents</IonToggle>
					</IonItem>
					<IonItem lines="none">
						<IonToggle
							enableOnOffLabels
							aria-label="Current WordGen Settings"
							checked={import_wg}
							onIonChange={() => setImport_wg(!import_wg)}
						>Current WordGen Settings</IonToggle>
					</IonItem>
					<IonItem>
						<IonToggle
							enableOnOffLabels
							aria-label="Stored WordGen Settings"
							checked={import_wgStored}
							onIonChange={() => setImport_wgStored(!import_wgStored)}
						>Stored WordGen Settings</IonToggle>
					</IonItem>
					<IonItem lines="none">
						<IonToggle
							enableOnOffLabels
							aria-label="Current WordEvolve Settings"
							checked={import_we}
							onIonChange={() => setImport_we(!import_we)}
						>Current WordEvolve Settings</IonToggle>
					</IonItem>
					<IonItem>
						<IonToggle
							enableOnOffLabels
							aria-label="Stored WordEvolve Settings"
							checked={import_weStored}
							onIonChange={() => setImport_weStored(!import_weStored)}
						>Stored WordEvolve Settings</IonToggle>
					</IonItem>
					<IonItem lines="none">
						<IonToggle
							enableOnOffLabels
							aria-label="Current Declenjugator Settings"
							checked={import_dj}
							onIonChange={() => setImport_dj(!import_dj)}
						>Current Declenjugator Settings</IonToggle>
					</IonItem>
					<IonItem>
						<IonToggle
							enableOnOffLabels
							aria-label="Stored Declenjugator Info"
							checked={import_djStored}
							onIonChange={() => setImport_djStored(!import_djStored)}
						>Stored Declenjugator Info</IonToggle>
					</IonItem>
					<IonItem lines="none">
						<IonToggle
							enableOnOffLabels
							aria-label="Current Lexicon Settings"
							checked={import_lex}
							onIonChange={() => setImport_lex(!import_lex)}
						>Current Lexicon Settings</IonToggle>
					</IonItem>
					<IonItem>
						<IonToggle
							enableOnOffLabels
							aria-label="Stored Lexicons"
							checked={import_lexStored}
							onIonChange={() => setImport_lexStored(!import_lexStored)}
						>Stored Lexicons</IonToggle>
					</IonItem>
					<IonItem>
						<IonToggle
							enableOnOffLabels
							aria-label="Concepts Settings"
							checked={import_con}
							onIonChange={() => setImport_con(!import_con)}
						>Concepts Settings</IonToggle>
					</IonItem>
					<IonItem>
						<IonToggle
							enableOnOffLabels
							aria-label="Extra Characters Settings"
							checked={import_ec}
							onIonChange={() => setImport_ec(!import_ec)}
						>Extra Characters Settings</IonToggle>
					</IonItem>
					<IonItem>
						<IonToggle
							enableOnOffLabels
							aria-label="Other App Settings"
							checked={import_set}
							onIonChange={() => setImport_set(!import_set)}
						>Other App Settings</IonToggle>
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
