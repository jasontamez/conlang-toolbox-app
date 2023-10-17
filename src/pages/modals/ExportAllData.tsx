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
	IonTextarea
} from '@ionic/react';
import { closeCircleOutline } from "ionicons/icons";
import { useSelector } from 'react-redux';

import { DJColumnIdentifier, DJGroup, LexiconState, ModalProperties, MSState, StateObject } from '../../store/types';
import { currentVersion } from '../../store/blankAppState';

import {
	CustomStorageWE,
	CustomStorageWG,
	LexiconStorage,
	MorphoSyntaxStorage
} from '../../components/PersistentInfo';

const MExportAllData = (props: ModalProperties) => {
	const { isOpen, setIsOpen } = props;
	const [output, setOutput] = useState<string>("...loading");
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
		return {
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
	}, [sortSettings]);

	const doClose = () => {
		setIsOpen(false);
	};

	useEffect(() => {
		const lexS: any[] = [];
		const msS: any[] = [];
		const wgS: any[] = [];
		const weS: any[] = [];
		setOutput("...loading");

		const copyDJIdentifiers = (input: DJColumnIdentifier | DJGroup) => {
			return {
				...input,
				startsWith: [...input.startsWith],
				endsWith: [...input.endsWith],
				regex: [...input.regex]
			};
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
			setOutput(JSON.stringify({
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
				ms,
				dj: { // v.0.11.0+ only
					input: [...dj.input],
					usingLexiconForInput: dj.usingLexiconForInput ? copyDJIdentifiers(dj.usingLexiconForInput) : null,
					identifiers: dj.identifiers.map((obj) => copyDJIdentifiers(obj)),
					declenjugationGroups: dj.declenjugationGroups.map(
						(obj) => ({
							...copyDJIdentifiers(obj),
							declenjugations: obj.declenjugations.map(obj => {
								return obj.regex ?
									{
										...obj,
										regex: [...obj.regex]
									}
								:
									{...obj}
							})
						})
					)
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
//				wordLists: { // v.0.9.4 only
//					centerTheDisplayedWords: wordListsState.textcenter ? [ "center" ] : [],
//					listsDisplayed: convertedListsDisplayed
//				},
				concepts: { // v.0.9.5+ only
					...concepts,
					display: [...concepts.display],
					combinations: concepts.combinations.map((obj) => ({
						id: obj.id,
						parts: obj.parts.map((obj) => ({...obj}))
					}))
				},
				sortSettings: exportedSortSettings, // v.0.10.0+ only
				ec: {
					...ec,
					faves: [...ec.faves]
				},
				storages: {
					lex: lexS,
					mx: msS,
					wg: wgS,
					we: weS
				}
			}));
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
							value={output}
						></IonTextarea>
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
