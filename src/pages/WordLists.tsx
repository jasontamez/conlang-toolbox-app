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
	useIonViewDidEnter,
	useIonAlert,
	useIonToast,
	useIonRouter
} from '@ionic/react';
import {
	helpCircleOutline,
	saveOutline,
	checkmarkDoneOutline
} from 'ionicons/icons';
import { shallowEqual, useSelector, useDispatch } from "react-redux";

import {
	updateWordListsDisplay,
	changeView,
	toggleWordListsBoolean,
	addItemstoLexiconColumn,
	addCustomHybridMeaning,
	deleteCustomHybridMeaning
} from '../components/ReduxDucksFuncs';
import { LexiconColumn, PageData, WL, WLCombo } from '../components/ReduxDucksTypes';
import { WordList, WordListSources } from '../components/WordLists';
import ModalWrap from "../components/ModalWrap";
import { WLCard } from "./wg/WGCards";

interface SavedWord { id: string, word: string };

const WordLists = (props: PageData) => {
	const { modalPropsMaker } = props;
	const [isOpenInfo, setIsOpenInfo] = useState<boolean>(false);
	const [pickAndSave, setPickAndSave] = useState<boolean>(false);
	const [linking, setLinking] = useState<boolean>(false);
	const [unlinking, setUnlinking] = useState<boolean>(false);
	const [savedWords, setSavedWords] = useState<SavedWord[]>([]);
	const [savedWordsObject, setSavedWordsObject] = useState<{ [key: string]: boolean }>({});
	const [disableConfirms, wordListsState, lexColumns] = useSelector((state: any) => [state.appSettings.disableConfirms, state.wordListsState, state.lexicon.columns], shallowEqual);
	const {
		display,
		showingCombos,
		combinations,
		textCenter
	} = wordListsState;
	const dispatch = useDispatch();
	const [doAlert] = useIonAlert();
	const [doToast] = useIonToast();
	const navigator = useIonRouter();
	const toggleChars = (what: keyof WL) => {
		if(display.some((p: keyof WL) => p === what)) {
			return dispatch(updateWordListsDisplay(display.filter((p: keyof WL) => p !== what)));
		}
		dispatch(updateWordListsDisplay([...display, what]));
	};
	const shown = WordList.filter((word: WL) => display.some((p: keyof WL) => word[p]));
	const viewInfo = ['wl', 'home'];
	useIonViewDidEnter(() => {
		dispatch(changeView(viewInfo));
	});
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
				return {
					type: 'radio',
					label: col.label,
					value: col,
					checked: !i
				};
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
						console.log(col);
						// Send off to the lexicon
						dispatch(addItemstoLexiconColumn(words.map((obj: SavedWord) => obj.word), col.id));
						// Clear info
						setSavedWords([]);
						setSavedWordsObject({});
						setPickAndSave(false);
						// Toast
						doToast({
							message: `Selected meanings saved to Lexicon under "${col.label}"`,
							duration: 3500,
							position: "top",
							buttons: [
								{
									text: "Go to Lexicon",
									handler: () => navigator.push("/lex")
								}
							]
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
			return doToast({
				message: "You need to add columns to the Lexicon before you can add anything to it.",
				cssClass: "danger",
				duration: 4000,
				position: "top"
			});
		}
		setPickAndSave(true);
		return doToast({
			message: "Tap words you want to save to Lexicon",
			duration: 2500,
			position: "top"
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
			combinations.forEach((combo: WLCombo) => {
				const { id, parts } = combo;
				words.push({
					id,
					word: parts.map((w: WL) => w.word).join("; ")
				})
			});
		}
		setSavedWords(words);
		saveToLexicon(words);
	};
	const maybeSaveThisWord = useCallback((id: string, text: string) => {
		if(pickAndSave || linking) {
			const newObject = {...savedWordsObject};
			if(savedWordsObject[id]) {
				setSavedWords(savedWords.filter(word => word.id !== id));
				delete newObject[id];
			} else {
				setSavedWords([...savedWords, { id, word: text }]);
				newObject[id] = true;
			}
			setSavedWordsObject(newObject);
		} else if (unlinking && id.length === 36) {
			dispatch(deleteCustomHybridMeaning(id));
		}
	}, [savedWords, savedWordsObject, pickAndSave, linking, unlinking, dispatch]);

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
						message: "You have selected some meanings. Do you want to save them?",
						cssClass: "danger",
						buttons: [
							{
								text: "No, Discard",
								role: "cancel",
								cssClass: "cancel",
								handler
							},
							{
								text: "Yes, Save Them",
								cssClass: "submit",
								handler: () => {
									saveNewMeaning();
									handler();
								}
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
		return doToast({
			message: "Tap meanings you want to link, in the order you wish to link them.",
			duration: 5000,
			position: "top"
		})
	};
	const saveNewMeaning = (makeToast: boolean = true) => {
		dispatch(addCustomHybridMeaning(savedWords));
		makeToast && doToast({
			message: "Combination saved",
			duration: 2500,
			position: "top",
			cssClass: "success"
		});
	};
	const doneLinking = () => {
		saveNewMeaning();
		setSavedWords([]);
		setSavedWordsObject({});
	};
	const toggleUnlinking = () => {
		if(!unlinking) {
			doToast({
				message: "Tap combinations you want to delete.",
				duration: 3000,
				position: "top",
				cssClass: "warning"
			});
		}
		setUnlinking(!unlinking);
	};

	return (
		<IonPage>
			<ModalWrap {...modalPropsMaker(isOpenInfo, setIsOpenInfo)}><WLCard /></ModalWrap>
			<IonHeader>
				<IonToolbar>
					 <IonButtons slot="start">
						 <IonMenuButton />
					 </IonButtons>
					<IonTitle>Word Lists</IonTitle>
					<IonButtons slot="end">
						<IonButton onClick={() => dispatch(toggleWordListsBoolean("textCenter"))}>
							<IonIcon size="small" slot="end" src={`svg/align-${textCenter ? "left" : "center" }-material.svg`} />
						</IonButton>
						<IonButton onClick={() => setIsOpenInfo(true)}>
							<IonIcon icon={helpCircleOutline} />
						</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<IonList lines="none">
					<IonItem className="wordListChips">
						<div className="chips">
							<span>Display:</span>
							{WordListSources.map((pair: [string, keyof WL], ind: number) => {
								const [list, prop] = pair;
								const current = display.some((p: keyof WL) => p === prop);
								return (
									<IonChip key={prop} outline={!current} onClick={() => toggleChars(prop)} className={(ind === 0 ? ("ion-margin-start" + (current ? " " : "")) : "") + (current ? "active" : "")}>
										<IonLabel>{list}</IonLabel>
									</IonChip>	
								);
							})}
							{(
								<IonChip key="combinations" outline={!showingCombos} onClick={() => dispatch(toggleWordListsBoolean("showingCombos"))} className={showingCombos ? "active" : undefined}>
									<IonLabel>My Combinations</IonLabel>
								</IonChip>	
							)}
						</div>
						<div className="controls">
							<IonButton fill={pickAndSave ? "solid" : "outline"} onClick={() => doPickAndSave()}>
								<IonIcon slot="icon-only" icon={saveOutline} />
							</IonButton>
							<IonButton fill={linking ? "solid" : "outline"} color="secondary" onClick={() => toggleLinking()}>
								<IonIcon slot="icon-only" src="svg/link.svg" />
							</IonButton>
							{showingCombos &&
								<IonButton disabled={combinations.length === 0} fill={unlinking ? "solid" : "outline"} color="secondary" onClick={() => toggleUnlinking()}>
									<IonIcon slot="icon-only" src="svg/unlink.svg" />
								</IonButton>
							}
						</div>
					</IonItem>
					<IonItem className={pickAndSave ? "" : "hide"}>
						<IonButton strong={true} color="tertiary" onClick={() => saveEverything()}>
							<IonIcon icon={saveOutline} style={ { marginRight: "0.5em" } } /> Save All Words
						</IonButton>
					</IonItem>
					<IonItem className={pickAndSave ? "" : "hide"}>
						<IonButton strong={true} color="secondary" onClick={() => donePickingAndSaving()}>
							<IonIcon icon={checkmarkDoneOutline} style={ { marginRight: "0.5em" } } /> Finish Saving
						</IonButton>
					</IonItem>
					<IonItem className={linking ? "" : "hide"}>
						<IonLabel className="ion-text-wrap">Current Combination: {savedWords.map(word => word.word).join("; ")}</IonLabel>
						<IonButton disabled={savedWords.length <= 1} slot="end" strong={true} color="success" onClick={() => doneLinking()}>
							<IonIcon icon={saveOutline} style={ { marginRight: "0.5em" } } /> Save
						</IonButton>
					</IonItem>
					<div id="outputPaneWL" className={"wordList" + (pickAndSave || linking ? " pickAndSave" : "") + (unlinking ? " removingCombos" : "")}>
						{showingCombos && combinations.map((combo: WLCombo) => {
							const { id, parts } = combo;
							const word = parts.map((w: WL) => w.word).join("; ");
							const classes =
								(savedWordsObject[id] ? "saved " : "")
								+ "word combo ion-text-"
								+ (textCenter ? "center" : "start");
							return (
								<div onClick={() => maybeSaveThisWord(id, word)} key={id} id={id} className={classes}>{word}</div>
							);
						})}
						{shown.map((wordObj: WL) => {
							const { id, word } = wordObj;
							const classes =
								(savedWordsObject[id] ? "saved " : "")
								+ "word ion-text-"
								+ (textCenter ? "center" : "start");
							return (
								<div onClick={() => maybeSaveThisWord(id, word)} key={id} id={id} className={classes}>{word}</div>
							)
						})}
					</div>
				</IonList>
			</IonContent>
		</IonPage>
	);
};

export default WordLists;
