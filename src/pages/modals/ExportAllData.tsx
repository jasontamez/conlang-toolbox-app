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
	DJCustomInfo,
	DJGroup,
	LexiconState,
	ModalProperties,
	MSState,
	SortSettings,
	StateObject
} from '../../store/types';
import { currentVersion } from '../../store/blankAppState';

import {
	CustomStorageWE,
	CustomStorageWG,
	DeclenjugatorStorage,
	LexiconStorage,
	MorphoSyntaxStorage
} from '../../components/PersistentInfo';
import toaster from '../../components/toaster';
import { $i } from '../../components/DollarSignExports';

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

const MExportAllData = (props: ModalProperties) => {
	const { isOpen, setIsOpen } = props;
	const [doToast, undoToast] = useIonToast();
	const [outputString, setOutputString] = useState<string>("...loading");
	const [output, setOutput] = useState<OutputObject | null>(null);
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
		setOutputString("...loading");
		const where = $i("exportedData");
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

		// TO-DO: Add the inevitable DJ storage to this chain
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
					declenjugationGroups: dj.declenjugationGroups.map((obj) => ({...copyDJGroup(obj)}))
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
		const where = $i("exportedData");
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

	return (
		<IonModal isOpen={isOpen} onDidDismiss={() => doClose()} onIonModalDidPresent={onLoad}>
			<IonHeader>
				<IonToolbar color="primary">
					<IonTitle>Export Info</IonTitle>
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
								Save this info to a note or file.
								<br />You will be able to use it later to restore your data.
							</h2>
						</IonLabel>
					</IonItem>
					<IonItem lines="none">
						<IonTextarea
							aria-label="Exported Data"
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
								message: `Copied to clipboard`,
								position: "middle",
								duration: 1500,
								doToast,
								undoToast
							}))}
							slot="end"
						>Copy to Clipboard</IonButton>
					</IonItem>
					<IonItemDivider>What to Export</IonItemDivider>
					<IonItem lines="none">
						<IonToggle
							enableOnOffLabels
							aria-label="Current MorphoSyntax Settings"
							checked={export_ms}
							onIonChange={() => setExport_ms(!export_ms)}
						>Current MorphoSyntax Settings</IonToggle>
					</IonItem>
					<IonItem>
						<IonToggle
							enableOnOffLabels
							aria-label="Stored MorphoSyntax Documents"
							checked={export_msStored}
							onIonChange={() => setExport_msStored(!export_msStored)}
						>Stored MorphoSyntax Documents</IonToggle>
					</IonItem>
					<IonItem lines="none">
						<IonToggle
							enableOnOffLabels
							aria-label="Current WordGen Settings"
							checked={export_wg}
							onIonChange={() => setExport_wg(!export_wg)}
						>Current WordGen Settings</IonToggle>
					</IonItem>
					<IonItem>
						<IonToggle
							enableOnOffLabels
							aria-label="Stored WordGen Settings"
							checked={export_wgStored}
							onIonChange={() => setExport_wgStored(!export_wgStored)}
						>Stored WordGen Settings</IonToggle>
					</IonItem>
					<IonItem lines="none">
						<IonToggle
							enableOnOffLabels
							aria-label="Current WordEvolve Settings"
							checked={export_we}
							onIonChange={() => setExport_we(!export_we)}
						>Current WordEvolve Settings</IonToggle>
					</IonItem>
					<IonItem>
						<IonToggle
							enableOnOffLabels
							aria-label="Stored WordEvolve Settings"
							checked={export_weStored}
							onIonChange={() => setExport_weStored(!export_weStored)}
						>Stored WordEvolve Settings</IonToggle>
					</IonItem>
					<IonItem lines="none">
						<IonToggle
							enableOnOffLabels
							aria-label="Current Declenjugator Settings"
							checked={export_dj}
							onIonChange={() => setExport_dj(!export_dj)}
						>Current Declenjugator Settings</IonToggle>
					</IonItem>
					<IonItem>
						<IonToggle
							enableOnOffLabels
							aria-label="Stored Declenjugator Info"
							checked={export_djStored}
							onIonChange={() => setExport_djStored(!export_djStored)}
						>Stored Declenjugator Info</IonToggle>
					</IonItem>
					<IonItem lines="none">
						<IonToggle
							enableOnOffLabels
							aria-label="Current Lexicon Settings"
							checked={export_lex}
							onIonChange={() => setExport_lex(!export_lex)}
						>Current Lexicon Settings</IonToggle>
					</IonItem>
					<IonItem>
						<IonToggle
							enableOnOffLabels
							aria-label="Stored Lexicons"
							checked={export_lexStored}
							onIonChange={() => setExport_lexStored(!export_lexStored)}
						>Stored Lexicons</IonToggle>
					</IonItem>
					<IonItem>
						<IonToggle
							enableOnOffLabels
							aria-label="Concepts Settings"
							checked={export_con}
							onIonChange={() => setExport_con(!export_con)}
						>Concepts Settings</IonToggle>
					</IonItem>
					<IonItem>
						<IonToggle
							enableOnOffLabels
							aria-label="Extra Characters Settings"
							checked={export_ec}
							onIonChange={() => setExport_ec(!export_ec)}
						>Extra Characters Settings</IonToggle>
					</IonItem>
					<IonItem>
						<IonToggle
							enableOnOffLabels
							aria-label="Other App Settings"
							checked={export_set}
							onIonChange={() => setExport_set(!export_set)}
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

export default MExportAllData;
