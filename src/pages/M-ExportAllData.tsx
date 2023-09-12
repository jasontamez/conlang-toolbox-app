import React, { useState, useEffect } from 'react';
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
	IonTextarea
} from '@ionic/react';
import { closeCircleOutline } from "ionicons/icons";
import { shallowEqual, useSelector } from 'react-redux';
import { CustomStorageWE, CustomStorageWG, LexiconStorage, MorphoSyntaxStorage } from '../components/PersistentInfo';
import { LexiconObject, ModalProperties, MorphoSyntaxObject } from '../components/ReduxDucksTypes';

const MExportAllData = (props: ModalProperties) => {
	const { isOpen, setIsOpen } = props;
	const [output, setOutput] = useState<string>("...loading");
	const {
		currentVersion,
		appSettings,
		wordgenCharGroups,
		wordgenSyllables,
		wordgenTransforms,
		wordgenSettings,
		wordevolveCharGroups,
		wordevolveTransforms,
		wordevolveSoundChanges,
		wordevolveInput,
		wordevolveSettings,
		morphoSyntaxInfo,
		lexicon,
		extraCharactersState,
		conceptsState
	} = useSelector((state: any) => state, shallowEqual);
	const doClose = () => {
		setIsOpen(false);
	};

	useEffect(() => {
		const lex: any[] = [];
		const ms: any[] = [];
		const wg: any[] = [];
		const we: any[] = [];
		const convertedListsDisplayed: any = {};
		setOutput("...loading");
		conceptsState.display.forEach((item: string) => {
			const total:any = {
				asjp: "ASJP",
				lj: "Leipzig-Jakarta",
				d: "Dolgopolsky",
				sy: "Swadesh-Yakhontov",
				s100: "Swadesh 100",
				s207: "Swadesh 207",
				ssl: "Swadesh-Woodward"
			};
			const maybe:(string | undefined) = total[item];
			if(maybe) {
				convertedListsDisplayed[maybe] = true;
			}
		});
		const morphoSyntax = {...morphoSyntaxInfo};
		Object.keys(morphoSyntaxInfo.bool).forEach((prop: string) => {
			morphoSyntax["BOOL_" + prop] = true;
		});
		Object.keys(morphoSyntaxInfo.num).forEach((prop: string) => {
			morphoSyntax["NUM_" + prop] = morphoSyntaxInfo.num[prop];
		});
		Object.keys(morphoSyntaxInfo.text).forEach((prop: string) => {
			morphoSyntax["TEXT_" + prop] = morphoSyntaxInfo.text[prop];
		});
		delete morphoSyntax.bool;
		delete morphoSyntax.num;
		delete morphoSyntax.text;
		
		LexiconStorage.iterate((value: LexiconObject, key: string) => {
			lex.push([key, value]);
			return; // Blank return keeps the loop going
		}).then(() => {
			return MorphoSyntaxStorage.iterate((value: MorphoSyntaxObject, key: string) => {
				ms.push([key, value]);
				return; // Blank return keeps the loop going
			});
		}).then(() => {
			return CustomStorageWE.iterate((value: any, title: string) => {
				we.push([title, value]);
				return; // Blank return keeps the loop going
			});
		}).then(() => {
			return CustomStorageWG.iterate((value: any, title: string) => {
				wg.push([title, value]);
				return; // Blank return keeps the loop going
			});
		}).then(() => {
			setOutput(JSON.stringify({
				currentVersion,
				wg: {
					characterGroups: wordgenCharGroups.map.map((obj: any) => {
						const {title, run, dropoffOverride} = obj[1];
						return {
							label: obj[0],
							description: title,
							run,
							dropoffOverride
						};
					}),
					transforms: wordgenTransforms.list.map((obj: any) => {
						const {key, seek, replace, description} = obj;
						return {
							id: key,
							search: seek,
							replace,
							description
						};
					}),
					multipleSyllableTypes: wordgenSyllables.toggle,
					syllableDropoffOverrides: {
						singleWord: wordgenSyllables.objects.singleWord.dropoffOverride === undefined ? null : wordgenSyllables.objects.singleWord.dropoffOverride,
						wordInitial: wordgenSyllables.objects.wordInitial.dropoffOverride === undefined ? null : wordgenSyllables.objects.wordInitial.dropoffOverride,
						wordMiddle: wordgenSyllables.objects.wordMiddle.dropoffOverride === undefined ? null : wordgenSyllables.objects.wordMiddle.dropoffOverride,
						wordFinal: wordgenSyllables.objects.wordFinal.dropoffOverride === undefined ? null : wordgenSyllables.objects.wordFinal.dropoffOverride
					},
					singleWord: wordgenSyllables.objects.singleWord.components.join("\n"),
					wordInitial: wordgenSyllables.objects.wordInitial.components.join("\n"),
					wordMiddle: wordgenSyllables.objects.wordMiddle.components.join("\n"),
					wordFinal: wordgenSyllables.objects.wordFinal.components.join("\n"),
					...wordgenSettings
				},
				we: {
					characterGroups: wordevolveCharGroups.map.map((obj: any) => {
						const {title, run} = obj[1];
						return {
							label: obj[0],
							description: title,
							run
						};
					}),
					transforms: wordevolveTransforms.list.map((obj: any) => {
						const {key, seek, replace, direction, description} = obj;
						return {
							id: key,
							search: seek,
							replace,
							direction,
							description
						};
					}),
					input: wordevolveInput.join("\n"),
					soundChanges: wordevolveSoundChanges.list.map((obj: any) => {
						const { key, seek, replace, context, anticontext, description } = obj;
						return {
							id: key,
							beginning: seek,
							ending: replace,
							context,
							exception: anticontext,
							description
						};
					}),
					settings: {
						outputStyle: {
							outputOnly: "output",
							rulesApplied: "rules",
							inputFirst: "inputoutput",
							outputFirst: "outputinput"
						}[wordevolveSettings.output as "outputOnly" | "rulesApplied" | "inputFirst" | "outputFirst"]
					}
				},
				morphoSyntax,
				appState: appSettings,
				lexicon : lexicon,
//				wordLists: {
//					centerTheDisplayedWords: wordListsState.textcenter ? [ "center" ] : [],
//					listsDisplayed: convertedListsDisplayed
//				},
				concepts: {
					...conceptsState,
					listsDisplayed: convertedListsDisplayed
				},
				extraCharacters: {
					nowShowing: extraCharactersState.display,
					faves: extraCharactersState.saved,
					copyImmediately: extraCharactersState.copyImmediately,
					toCopy: extraCharactersState.copyLater,
					showNames: extraCharactersState.showNames
				},
				storages: {
					lex,
					ms,
					wg,
					we
				}
			}));
		});
	}, [
		currentVersion,
		appSettings,
		wordgenCharGroups,
		wordgenSyllables,
		wordgenTransforms,
		wordgenSettings,
		wordevolveCharGroups,
		wordevolveTransforms,
		wordevolveSoundChanges,
		wordevolveInput,
		wordevolveSettings,
		morphoSyntaxInfo,
		lexicon,
		extraCharactersState,
		conceptsState
	]);

	return (
		<IonModal isOpen={isOpen} onDidDismiss={() => doClose()}>
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
				<IonList>
					<IonItem lines="full">
						<IonLabel className="ion-text-center ion-text-wrap">
							<h2 className="ion-text-center ion-text-wrap">Save this info to a note or file.<br />You will be able to use it later to restore your data.</h2>
						</IonLabel>
					</IonItem>
					<IonItem lines="none">
						<IonTextarea aria-label="Exported Data" wrap="soft" rows={12} value={output}></IonTextarea>
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
