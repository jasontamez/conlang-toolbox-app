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
import { closeCircleOutline } from "ionicons/icons";
import { useSelector } from 'react-redux';
import { Clipboard } from '@capacitor/clipboard';

import {
	Base_WG,
	DJCustomInfo,
	DJGroup,
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
	WEPresetObject
} from '../../store/types';
import { currentVersion } from '../../store/blankAppState';
import useTranslator from '../../store/translationHooks';

import {
	CustomStorageWE,
	CustomStorageWG,
	DeclenjugatorStorage,
	LexiconStorage,
	MorphoSyntaxStorage
} from '../../components/PersistentInfo';
import toaster from '../../components/toaster';
import { $i } from '../../components/DollarSignExports';

const MExportAllData = (props: ModalProperties) => {
	const { isOpen, setIsOpen } = props;
	const [ t ] = useTranslator('common');
	const [ ts ] = useTranslator('settings');
	const loadingText = useMemo(() => t("Loading"), [t]);
	const toast = useIonToast();
	const [outputString, setOutputString] = useState<string>(loadingText);
	const [output, setOutput] = useState<ImportExportObject | null>(null);
	const [export_wg, setExport_wg] = useState<boolean>(true);
	const [export_we, setExport_we] = useState<boolean>(true);
	const [export_ms, setExport_ms] = useState<boolean>(true);
	const [export_dj, setExport_dj] = useState<boolean>(true);
	const [export_lex, setExport_lex] = useState<boolean>(true);
	const [export_con, setExport_con] = useState<boolean>(true);
	const [export_ec, setExport_ec] = useState<boolean>(true);
	const [export_set, setExport_set] = useState<boolean>(true); // This covers settings AND sort settings
	const [export_wgStored, setExport_wgStored] = useState<boolean>(true);
	const [export_weStored, setExport_weStored] = useState<boolean>(true);
	const [export_msStored, setExport_msStored] = useState<boolean>(true);
	const [export_djStored, setExport_djStored] = useState<boolean>(true);
	const [export_lexStored, setExport_lexStored] = useState<boolean>(true);
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
		const { customSorts, ...etc } = sortSettings;
		const exportedSettings: SortSettings = {
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
		setOutputString(loadingText);
		const where = $i<HTMLInputElement>("exportedData");
		where && (where.value = loadingText);

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
			return CustomStorageWE.iterate((value: WEPresetObject, title: string) => {
				weS.push([title, value]);
				return; // Blank return keeps the loop going
			});
		}).then(() => {
			return CustomStorageWG.iterate((value: Base_WG, title: string) => {
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
				ms: {...ms},
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
					display: {...concepts.display},
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
		exportedSortSettings,
		loadingText
	]);

	useEffect(() => {
		if(!output) {
			return;
		}
		const exportable: ImportExportObject = {...output};
		if(!export_wg) {
			delete exportable.wg;
		}
		if(!export_we) {
			delete exportable.we;
		}
		if(!export_ms) {
			delete exportable.ms;
		}
		if(!export_dj) {
			delete exportable.dj;
		}
		if(!export_lex) {
			delete exportable.lexicon;
		}
		if(!export_con) {
			delete exportable.concepts;
		}
		if(!export_ec) {
			delete exportable.ec;
		}
		if(!export_set) {
			delete exportable.appSettings;
			delete exportable.sortSettings;
		}
		if(!export_wgStored) {
			delete exportable.wgStored;
		}
		if(!export_weStored) {
			delete exportable.weStored;
		}
		if(!export_msStored) {
			delete exportable.msStored;
		}
		if(!export_djStored) {
			delete exportable.djStored;
		}
		if(!export_lexStored) {
			delete exportable.lexStored;
		}
		const final = JSON.stringify(exportable);
		setOutputString(final);
		const where = $i<HTMLInputElement>("exportedData");
		where && (where.value = final);
	}, [
		output,
		export_wg,
		export_we,
		export_ms,
		export_dj,
		export_lex,
		export_con,
		export_ec,
		export_set,
		export_wgStored,
		export_weStored,
		export_msStored,
		export_djStored,
		export_lexStored
	]);

	function onLoad() {
		setExport_wg(true);
		setExport_we(true);
		setExport_ms(true);
		setExport_dj(true);
		setExport_lex(true);
		setExport_con(true);
		setExport_ec(true);
		setExport_set(true);
		setExport_wgStored(true);
		setExport_weStored(true);
		setExport_msStored(true);
		setExport_djStored(true);
		setExport_lexStored(true);
	};

	const whatToExport = ts("What to Export");
	const currentMorphoSyntaxSettings = ts("currentSettings", { tool: t("MorphoSyntax") });
	const storedMorphoSyntaxDocuments = ts("storedDocuments", { tool: t("MorphoSyntax") });
	const currentWordGenSettings = ts("currentSettings", { tool: t("WordGen") });
	const storedWordGenSettings = ts("storedSettings", { tool: t("WordGen") });
	const currentWordEvolveSettings = ts("currentSettings", { tool: t("WordEvolve") });
	const storedWordEvolveSettings = ts("storedSettings", { tool: t("WordEvolve") });
	const currentDeclenjugatorSettings = ts("currentSettings", { tool: t("Declenjugator") });
	const storedDeclenjugatorSettings = ts("storedSettings", { tool: t("Declenjugator") });
	const currentLexiconSettings = ts("currentSettings", { tool: t("Lexicon") });
	const storedLexiconDocuments = ts("storedDocuments", { tool: t("Lexicon") });
	const conceptsSettings = ts("appSettings", { tool: t("Extra Characters") });
	const extraCharactersSettings = ts("appSettings", { tool: t("Extra Characters") });
	const otherAppSettings = ts("Other App Settings");

	return (
		<IonModal isOpen={isOpen} onDidDismiss={() => doClose()} onIonModalDidPresent={onLoad}>
			<IonHeader>
				<IonToolbar color="primary">
					<IonTitle>{t("Export Info")}</IonTitle>
					<IonButtons slot="end">
						<IonButton onClick={() => doClose()}>
							<IonIcon icon={closeCircleOutline} />
						</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<IonList lines="full">
					<IonItem>
						<IonLabel className="ion-text-center ion-text-wrap">
							<h2 className="ion-text-center ion-text-wrap">
								{ts("exportAllMsg1")}
								<br />{ts("exportAllMsg2")}
							</h2>
						</IonLabel>
					</IonItem>
					<IonItem lines="none">
						<IonTextarea
							aria-label={ts("Exported Data")}
							wrap="soft"
							rows={12}
							id="exportedData"
							value={outputString}
						></IonTextarea>
					</IonItem>
					<IonItem lines="none">
						<IonButton
							color="primary"
							onClick={() => Clipboard.write({string: outputString}).then(() => toaster({
								message: t("Copied to clipboard"),
								position: "middle",
								duration: 1500,
								toast
							}))}
							slot="end"
						>{t("Copy to Clipboard")}</IonButton>
					</IonItem>
					<IonItemDivider>{whatToExport}</IonItemDivider>
					<IonItem lines="none">
						<IonToggle
							enableOnOffLabels
							aria-label={currentMorphoSyntaxSettings}
							checked={export_ms}
							onIonChange={() => setExport_ms(!export_ms)}
						>{currentMorphoSyntaxSettings}</IonToggle>
					</IonItem>
					<IonItem>
						<IonToggle
							enableOnOffLabels
							aria-label={storedMorphoSyntaxDocuments}
							checked={export_msStored}
							onIonChange={() => setExport_msStored(!export_msStored)}
						>{storedMorphoSyntaxDocuments}</IonToggle>
					</IonItem>
					<IonItem lines="none">
						<IonToggle
							enableOnOffLabels
							aria-label={currentWordGenSettings}
							checked={export_wg}
							onIonChange={() => setExport_wg(!export_wg)}
						>{currentWordGenSettings}</IonToggle>
					</IonItem>
					<IonItem>
						<IonToggle
							enableOnOffLabels
							aria-label={storedWordGenSettings}
							checked={export_wgStored}
							onIonChange={() => setExport_wgStored(!export_wgStored)}
						>{storedWordGenSettings}</IonToggle>
					</IonItem>
					<IonItem lines="none">
						<IonToggle
							enableOnOffLabels
							aria-label={currentWordEvolveSettings}
							checked={export_we}
							onIonChange={() => setExport_we(!export_we)}
						>{currentWordEvolveSettings}</IonToggle>
					</IonItem>
					<IonItem>
						<IonToggle
							enableOnOffLabels
							aria-label={storedWordEvolveSettings}
							checked={export_weStored}
							onIonChange={() => setExport_weStored(!export_weStored)}
						>{storedWordEvolveSettings}</IonToggle>
					</IonItem>
					<IonItem lines="none">
						<IonToggle
							enableOnOffLabels
							aria-label={currentDeclenjugatorSettings}
							checked={export_dj}
							onIonChange={() => setExport_dj(!export_dj)}
						>{currentDeclenjugatorSettings}</IonToggle>
					</IonItem>
					<IonItem>
						<IonToggle
							enableOnOffLabels
							aria-label={storedDeclenjugatorSettings}
							checked={export_djStored}
							onIonChange={() => setExport_djStored(!export_djStored)}
						>{storedDeclenjugatorSettings}</IonToggle>
					</IonItem>
					<IonItem lines="none">
						<IonToggle
							enableOnOffLabels
							aria-label={currentLexiconSettings}
							checked={export_lex}
							onIonChange={() => setExport_lex(!export_lex)}
						>{currentLexiconSettings}</IonToggle>
					</IonItem>
					<IonItem>
						<IonToggle
							enableOnOffLabels
							aria-label={storedLexiconDocuments}
							checked={export_lexStored}
							onIonChange={() => setExport_lexStored(!export_lexStored)}
						>{storedLexiconDocuments}</IonToggle>
					</IonItem>
					<IonItem>
						<IonToggle
							enableOnOffLabels
							aria-label={conceptsSettings}
							checked={export_con}
							onIonChange={() => setExport_con(!export_con)}
						>{conceptsSettings}</IonToggle>
					</IonItem>
					<IonItem>
						<IonToggle
							enableOnOffLabels
							aria-label={extraCharactersSettings}
							checked={export_ec}
							onIonChange={() => setExport_ec(!export_ec)}
						>{extraCharactersSettings}</IonToggle>
					</IonItem>
					<IonItem>
						<IonToggle
							enableOnOffLabels
							aria-label={otherAppSettings}
							checked={export_set}
							onIonChange={() => setExport_set(!export_set)}
						>{otherAppSettings}</IonToggle>
					</IonItem>
				</IonList>
			</IonContent>
			<IonFooter>
				<IonToolbar>
					<IonButton color="success" slot="end" onClick={() => doClose()}>
						<IonIcon icon={closeCircleOutline} slot="start" />
						<IonLabel>{t("Done")}</IonLabel>
					</IonButton>
				</IonToolbar>
			</IonFooter>
		</IonModal>
	);
};

export default MExportAllData;
