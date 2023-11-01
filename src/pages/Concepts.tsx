import React, { useState, useCallback, useEffect } from 'react';
import {
	IonPage,
	IonHeader,
	IonTitle,
	IonToolbar,
	IonButtons,
	IonMenuButton,
	IonContent,
	IonList,
	IonLabel,
	IonChip,
	IonItem,
	IonButton,
	IonIcon,
	useIonAlert,
	useIonToast,
	useIonRouter,
	AlertInput,
	IonCard,
	IonCardContent
} from '@ionic/react';
import {
	helpCircleOutline,
	saveOutline,
	checkmarkDoneOutline
} from 'ionicons/icons';
import { useSelector, useDispatch } from "react-redux";

import {
	updateConceptsDisplay,
	toggleConceptsBoolean,
	addCustomHybridMeaning,
	deleteCustomHybridMeanings
} from '../store/conceptsSlice';
import { addItemsToLexiconColumn } from '../store/lexiconSlice';
import { LexiconColumn, PageData, Concept, ConceptCombo, StateObject, SortObject } from '../store/types';

import { Concepts, ConceptsSources } from '../components/Concepts';
import { ConceptsOutlineIcon, LexiconIcon, LexiconOutlineIcon } from '../components/icons';
import ModalWrap from "../components/ModalWrap";
import yesNoAlert from '../components/yesNoAlert';
import toaster from '../components/toaster';
import makeSorter from '../components/stringSorter';
import PermanentInfo from '../components/PermanentInfo';

interface SavedWord { id: string, word: string };

const ConceptsPage = (props: PageData) => {
	const { modalPropsMaker } = props;
	const [isOpenInfo, setIsOpenInfo] = useState<boolean>(false);
	const [pickAndSave, setPickAndSave] = useState<boolean>(false);
	const [linking, setLinking] = useState<boolean>(false);
	const [unlinking, setUnlinking] = useState<boolean>(false);
	const [savedWords, setSavedWords] = useState<SavedWord[]>([]);
	const [savedWordsObject, setSavedWordsObject] = useState<{ [key: string]: boolean }>({});
	const disableConfirms = useSelector((state: StateObject) => state.appSettings.disableConfirms);
	const {
		sortLanguage,
		sensitivity,
		defaultCustomSort,
		defaultSortLanguage,
		customSorts
	} = useSelector((state: StateObject) => state.sortSettings);
	const {
		columns: lexColumns,
		customSort
	} = useSelector((state: StateObject) => state.lexicon);
	let customSortObj: SortObject | undefined;
	let defaultCustomSortObj: SortObject | undefined;
	customSorts.concat(PermanentInfo.sort.permanentCustomSortObjs).every(obj => {
		if(obj.id === customSort) {
			customSortObj = obj;
		} else if (obj.id === defaultCustomSort) {
			defaultCustomSortObj = obj;
		}
		return !(customSortObj && defaultCustomSortObj);
	})
	const sorter = makeSorter(sortLanguage || defaultSortLanguage, sensitivity, customSortObj || defaultCustomSortObj);
	const {
		display,
		showingCombos,
		combinations,
		textCenter
	} = useSelector((state: StateObject) => state.concepts);
	const dispatch = useDispatch();
	const [doAlert] = useIonAlert();
	const [doToast, undoToast] = useIonToast();
	const navigator = useIonRouter();
	const toggleChars = (what: keyof Concept) => {
		if(display.some((p: keyof Concept) => p === what)) {
			return dispatch(updateConceptsDisplay(display.filter((p: keyof Concept) => p !== what)));
		}
		dispatch(updateConceptsDisplay([...display, what]));
	};
	const shown = Concepts.filter((word: Concept) => display.some((p: keyof Concept) => word[p]));
	useEffect(() => {
		if(unlinking && (!showingCombos || combinations.length === 0)) {
			setUnlinking(false);
		}
	}, [showingCombos, unlinking, combinations]);

	// // //
	// Save to Lexicon
	// // //
	const saveToLexicon = (words: SavedWord[]) => {
		doAlert({
			header: "Select a column",
			message: "Your selected meanings will be added to the Lexicon under that column.",
			inputs: lexColumns.map((col: LexiconColumn, i: number) => {
				const obj: AlertInput = {
					type: 'radio',
					label: col.label || "",
					value: col,
					checked: !i
				};
				return obj;
			}),
			buttons: [
				{
					text: "Cancel",
					role: 'cancel'
				},
				{
					text: "Save",
					handler: (col: LexiconColumn | undefined) => {
						if(!col) {
							// Treat as cancel
							return;
						}
						// Send off to the lexicon
						dispatch(addItemsToLexiconColumn([words.map((obj: SavedWord) => obj.word), col.id, sorter]));
						// Clear info
						setSavedWords([]);
						setSavedWordsObject({});
						setPickAndSave(false);
						// Toast
						toaster({
							message: `Selected meanings saved to Lexicon under "${col.label}"`,
							duration: 3500,
							position: "top",
							buttons: [
								{
									text: "Go to Lexicon",
									handler: () => navigator.push("/lex")
								}
							],
							color: "success",
							doToast,
							undoToast
						});
					}
				}
			]
		});
	};
	const doPickAndSave = () => {
		if (pickAndSave) {
			// Stop saving
			return donePickingAndSaving();
		} else if(lexColumns.length === 0) {
			return toaster({
				message: "You need to add columns to the Lexicon before you can add anything to it.",
				color: "danger",
				duration: 4000,
				position: "top",
				doToast,
				undoToast
			});
		}
		setPickAndSave(true);
		return toaster({
			message: "Tap words you want to save to Lexicon",
			duration: 2500,
			position: "top",
			doToast,
			undoToast
		});
	};
	const donePickingAndSaving = () => {
		if(savedWords.length > 0) {
			// Attempt to save
			saveToLexicon(savedWords);
		} else {
			// Just stop saving
			setPickAndSave(false);
		}
	};
	const saveEverything = () => {
		const words = shown.map(word => ({id: word.id, word: word.word}));
		if(showingCombos) {
			combinations.forEach((combo: ConceptCombo) => {
				const { id, parts } = combo;
				words.push({
					id,
					word: parts.map((w: Concept) => w.word).join("; ")
				})
			});
		}
		setSavedWords(words);
		saveToLexicon(words);
	};
	const maybeSaveThisWord = useCallback((id: string, text: string, isCombo: boolean = false) => {
		if(unlinking && !isCombo) {
			// Ignore
		} else if(pickAndSave || linking || unlinking) {
			const newObject = {...savedWordsObject};
			if(savedWordsObject[id]) {
				setSavedWords(savedWords.filter(word => word.id !== id));
				delete newObject[id];
			} else {
				setSavedWords([...savedWords, { id, word: text }]);
				newObject[id] = true;
			}
			setSavedWordsObject(newObject);
		}
	}, [savedWords, savedWordsObject, pickAndSave, linking, unlinking]);

	// // //
	// Combine Into New Meaning
	// // //

	const toggleLinking = () => {
		if(linking) {
			if(savedWords.length > 1) {
				// We have information left over. Do we want to keep it?
				const handler = () => {
					setSavedWords([]);
					setSavedWordsObject({});
					setLinking(false);
				};
				if(!disableConfirms) {
					return doAlert({
						header: "Stop Linking?",
						cssClass: "danger",
						message: "You have some meanings still selected. Do you want to link them?",
						buttons: [
							{
								text: "Cancel",
								role: "cancel",
								cssClass: "cancel"
							},
							{
								text: "Yes, Save Them",
								cssClass: "submit",
								handler: () => {
									saveNewMeaning();
									handler();
								}
							},
							{
								text: "No, Discard Them",
								cssClass: "cancel",
								handler
							}
						]
					});
				}
				return handler();
			}
			// 0-1 meanings selected: just ignore and toggle off
			setLinking(false);
			setSavedWords([]);
			setSavedWordsObject({});
			return;
		}
		setLinking(true);
		return toaster({
			message: "Tap meanings you want to link, in the order you wish to link them.",
			duration: 5000,
			position: "top",
			doToast,
			undoToast
		})
	};
	const saveNewMeaning = (makeToast: boolean = true) => {
		dispatch(addCustomHybridMeaning(savedWords));
		makeToast && toaster({
			message: "Combination saved",
			duration: 2500,
			position: "top",
			color: "success",
			doToast,
			undoToast
		});
	};
	const doneLinking = () => {
		saveNewMeaning();
		setSavedWords([]);
		setSavedWordsObject({});
	};
	const toggleUnlinking = () => {
		if(!unlinking) {
			toaster({
				message: "Tap combinations you want to delete, then tap the Unlink button again.",
				duration: 3000,
				position: "top",
				color: "warning",
				doToast,
				undoToast
			});
		} else if (savedWords.length > 0) {
			const handler = () => {
				dispatch(deleteCustomHybridMeanings(savedWords.map(word => word.id)));
				setSavedWords([]);
				setSavedWordsObject({});
				setUnlinking(false);
			};
			if(!disableConfirms) {
				return yesNoAlert({
					header: `Delete ${savedWords.length} meanings?`,
					cssClass: "danger",
					message: "The selected meanings will be removed. This cannot be undone.",
					submit: "Yes, Delete Them",
					handler,
					doAlert
				});
			}
			return handler();
		}
		setUnlinking(!unlinking);
	};

	return (
		<IonPage>
			<ModalWrap {...modalPropsMaker(isOpenInfo, setIsOpenInfo)}><ConceptCard /></ModalWrap>
			<IonHeader>
				<IonToolbar>
					 <IonButtons slot="start">
						 <IonMenuButton disabled={pickAndSave} />
					 </IonButtons>
					<IonTitle>Concepts</IonTitle>
					<IonButtons slot="end">
						<IonButton onClick={() => dispatch(toggleConceptsBoolean("textCenter"))}>
							<IonIcon
								flipRtl
								size="small"
								slot="end"
								src={`svg/align-${textCenter ? "left" : "center" }-material.svg`}
							/>
						</IonButton>
						<IonButton disabled={pickAndSave} onClick={() => setIsOpenInfo(true)}>
							<IonIcon icon={helpCircleOutline} />
						</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<IonList lines="none">
					<IonItem className="conceptsChips">
						<div className="chips">
							<span>Display:</span>
							{ConceptsSources.map((pair: [string, keyof Concept], ind: number) => {
								const [list, prop] = pair;
								const current = display.some((p: keyof Concept) => p === prop);
								return (
									<IonChip
										key={prop}
										outline={!current}
										onClick={() => toggleChars(prop)}
										className={
											(ind === 0 ?
												("ion-margin-start" + (current ? " " : ""))
											:
												""
											) + (current ? "active" : "")
										}
									>
										<IonLabel>{list}</IonLabel>
									</IonChip>
								);
							})}
							{(
								<IonChip
									key="combinations"
									outline={!showingCombos}
									onClick={() => dispatch(toggleConceptsBoolean("showingCombos"))}
									className={showingCombos ? "active" : undefined}
								>
									<IonLabel>My Combinations</IonLabel>
								</IonChip>
							)}
						</div>
						<div className="controls">
							<IonButton
								disabled={linking || unlinking}
								fill={pickAndSave ? "solid" : "outline"}
								onClick={() => doPickAndSave()}
							>
								<LexiconIcon slot="icon-only" />
							</IonButton>
							<IonButton
								disabled={pickAndSave || unlinking}
								fill={linking ? "solid" : "outline"}
								color="secondary"
								onClick={() => toggleLinking()}
							>
								<IonIcon slot="icon-only" src="svg/link.svg" />
							</IonButton>
							{showingCombos &&
								<IonButton
									disabled={combinations.length === 0 || linking || pickAndSave}
									fill={unlinking ? "solid" : "outline"}
									color="secondary"
									onClick={() => toggleUnlinking()}
								>
									<IonIcon slot="icon-only" src="svg/unlink.svg" />
								</IonButton>
							}
						</div>
					</IonItem>
					<IonItem className={pickAndSave ? "" : "hide"}>
						<IonButton
							strong={true}
							color="tertiary"
							onClick={() => saveEverything()}
						>
							<IonIcon icon={saveOutline} style={ { marginInlineEnd: "0.5em" } } /> Save All Words
						</IonButton>
					</IonItem>
					<IonItem className={pickAndSave ? "" : "hide"}>
						<IonButton
							strong={true}
							color="secondary"
							onClick={() => donePickingAndSaving()}
						>
							<IonIcon icon={checkmarkDoneOutline} style={ { marginInlineEnd: "0.5em" } } /> Save Selected Words
						</IonButton>
					</IonItem>
					<IonItem className={linking ? "" : "hide"}>
						<IonLabel className="ion-text-wrap">
							Current Combination: {savedWords.map(word => word.word).join("; ")}
						</IonLabel>
						<IonButton
							disabled={savedWords.length <= 1}
							slot="end"
							strong={true}
							color="success"
							onClick={() => doneLinking()}
						>
							<IonIcon icon={saveOutline} style={ { marginInlineEnd: "0.5em" } } /> Save
						</IonButton>
					</IonItem>
					<div
						id="outputPaneWL"
						className={
							"concepts"
							+ (pickAndSave || linking ? " pickAndSave" : "")
							+ (unlinking ? " removingCombos" : "")
						}
					>
						{showingCombos && combinations.map((combo: ConceptCombo) => {
							const { id, parts } = combo;
							const word = parts.map((w: Concept) => w.word).join("; ");
							const classes =
								(savedWordsObject[id] ? "saved " : "")
								+ "word combo ion-text-"
								+ (textCenter ? "center" : "start");
							return (
								<div
									onClick={() => maybeSaveThisWord(id, word, true)}
									key={id}
									id={id}
									className={classes}
								>{word}</div>
							);
						})}
						{shown.map((wordObj: Concept) => {
							const { id, word } = wordObj;
							const classes =
								(savedWordsObject[id] ? "saved " : "")
								+ "word ion-text-"
								+ (textCenter ? "center" : "start");
							return (
								<div
									onClick={() => maybeSaveThisWord(id, word)}
									key={id}
									id={id}
									className={classes}
								>{word}</div>
							)
						})}
					</div>
				</IonList>
			</IonContent>
		</IonPage>
	);
};

export default ConceptsPage;

const ConceptCard = () => {
	return (
		<IonCard>
			<IonItem lines="full">
				<ConceptsOutlineIcon slot="start" color="primary" />
				<IonLabel>Concepts</IonLabel>
			</IonItem>
			<IonCardContent>
				<p>
					Presented here are a number of lists of basic concepts, created for the purposes
					of historical-comparative linguistics. These may serve as a useful source of meanings
					to start a conlang with.
				</p>
				<h2>Controls</h2>
				<div className="ion-text-center"><LexiconOutlineIcon color="primary" size="large" /></div>
				<p>
					Use the "lexicon" button to quickly save meanings to the Lexicon.
				</p>
				<div className="ion-text-center"><IonIcon color="primary" size="large" src="svg/link.svg" /></div>
				<p>
					Use the "join" button to create compound meanings.
				</p>
				<div className="ion-text-center"><IonIcon color="primary" size="large" src="svg/unlink.svg" /></div>
				<p>
					Use the "unjoin" button to delete compound meanings.
				</p>
				<h2>Swadesh Lists</h2>
				<p>
					Originally assembled by Morris Swadesh, this list of concepts was chosen for their
					universal, culturally independent availability in as many languages as possible.
					However, he relied more on his intuition than on a rigorous set of criteria. <strong>Swadesh
					100</strong> is his final list from 1971. The <strong>Swadesh 207</strong> is
					adapted from his original list from 1952. <strong>Swadesh-Yakhontov</strong> is
					a subset of the 207 assembled by Sergei Yakhontov. And the <strong>Swadesh-Woodward
					Sign List</strong> was assembled by James Woodward to take into account the ways
					sign languages behave.
				</p>
				<h2>Dolgopolsky List</h2>
				<p>
					Compiled by Aharon Dolgopolsky in 1964, this lists the 15 lexical items that are
					the least likely to be replaced by other words as a language evolves. It was based
					on a study of 140 languages from across Eurasia, only.
				</p>
				<h2>Leipzig-Jakarta List</h2>
				<p>
					Similar to the Dolgopolsky list, this is a list of words judged to be the most
					resistant to borrowing. Experts on 41 languages from across the world were given a
					uniform vocabulary list and asked to provide the words for each item in the language
					on which they were an expert, as well as information on how strong the evidence that
					each word was borrowed was. The 100 concepts that were found in most languages and
					were most resistant to borrowing formed the Leipzig-Jakarta list.
				</p>
				<h2>ASJP List</h2>
				<p>
					<strong>Automated Similarity Judgment Program</strong> is a collaborative project
					applying computational approaches to comparative linguistics using a database of word
					lists. It uses a 40-word list to evaluate the similarity of words with the same
					meaning from different languages.
				</p>
				<h2>Landau 200</h2>
				<p>
					The <strong>Basic 200 List</strong> is a subset of the <strong>Landau Core Vocabulary
					(LCV)</strong> developed by James Landau. It is Part I of the entire LCV. This list
					consists of 200 basic concepts that basically all anthropic cultures will have and
					have words for. This list makes many semantic distinctions that are not made in
					English (e.g "leaf (on plant)" vs. "leaf (fallen off)"), and some that are not made
					in any "Standard Average European" language (e.g. "river (flowing into the sea)" vs.
					"river (flowing into another river)").
				</p>
			</IonCardContent>
		</IonCard>
	);
}
