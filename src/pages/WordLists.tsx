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
	useIonViewDidEnter
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
import fireSwal from '../components/Swal';
import { WLCard } from "./wg/WGCards";

interface SavedWord { id: string, word: string };

const Home = (props: PageData) => {
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
		if(linking && !showingCombos) {
			setLinking(false);
		}
	}, [showingCombos, linking]);

	// // //
	// Save to Lexicon
	// // //
	const saveToLexicon = (words: SavedWord[]) => {
		const inputOptions: { [key: string]: number } = {};
		lexColumns.forEach((col: LexiconColumn, i: number) => {
			inputOptions[col.label] = i;
		})
		fireSwal({
			title: "Select a Column",
			text: "Your selected meanings will be added to the Lexicon under that column.",
			input: "select",
			inputOptions,
			showCancelButton: true
		}).then((result: { value?: number }) => {
			const value = result.value;
			if(value !== undefined) {
				// Send off to the lexicon
				dispatch(addItemstoLexiconColumn(words.map((obj: SavedWord) => obj.word), value));
				// Clear info
				setSavedWords([]);
				setSavedWordsObject({});
				setPickAndSave(false);
				fireSwal({
					title: `Selected meanings saved to Lexicon under "${lexColumns[value].label}"`,
					toast: true,
					timer: 3500,
					position: 'top',
					timerProgressBar: true,
					showConfirmButton: false
				});
			}
		});
	};
	const doPickAndSave = () => {
		if(lexColumns.length === 0) {
			return fireSwal({
				title: "You need to add columns to the Lexicon before you can add anything to it.",
				customClass: {popup: 'dangerToast'},
				toast: true,
				timer: 4000,
				position: 'top',
				timerProgressBar: true,
				showConfirmButton: false
			});
		}
		setPickAndSave(true);
		return fireSwal({
			title: "Tap words you want to save to Lexicon",
			toast: true,
			timer: 2500,
			position: 'top',
			timerProgressBar: true,
			showConfirmButton: false
		});	
	};
	const donePickingAndSaving = () => {
		setPickAndSave(false);
		if(savedWords.length > 0) {
			saveToLexicon(savedWords);
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
		} else if (unlinking && id.length !== 36) {
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
				const thenFunc = (result: any) => {
					if(result.isConfirmed === true) {
						// SAVE
						saveNewMeaning();
					} else if (result.isConfirmed !== false) {
						// Probably just cancelling the alert some other way?
						return;
					}
					setSavedWords([]);
					setSavedWordsObject({});
					setLinking(false);
				};
				if(!disableConfirms) {
					return fireSwal({
						title: "Stop Linking?",
						text: "You have selected some meanings. Do you want to save them?",
						customClass: {popup: 'deleteConfirm'},
						icon: 'warning',
						showCancelButton: true,
						cancelButtonText: "Discard",
						confirmButtonText: "Save"
					}).then(thenFunc);
				}
				return thenFunc({isConfirmed: false});
			}
			// 0-1 meanings selected: just ignore and toggle off
			setLinking(false);
			setSavedWords([]);
			setSavedWordsObject({});
			return;
		}
		setLinking(true);
		return fireSwal({
			title: "Tap meanings you want to link, in the order you wish to link them.",
			toast: true,
			timer: 5000,
			position: 'top',
			timerProgressBar: true,
			showConfirmButton: false
		});
	};
	const saveNewMeaning = (makeToast: boolean = true) => {
		dispatch(addCustomHybridMeaning(savedWords));
		makeToast && fireSwal({
			title: "Combination saved.",
			toast: true,
			timer: 2500,
			position: 'top',
			timerProgressBar: true,
			showConfirmButton: false
		});
	};
	const doneLinking = () => {
		saveNewMeaning();
		setSavedWords([]);
		setSavedWordsObject({});
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
							<IonButton fill="outline" onClick={() => doPickAndSave()}>
								<IonIcon slot="icon-only" icon={saveOutline} />
							</IonButton>
							<IonButton fill={linking ? "solid" : "outline"} color="secondary" onClick={() => toggleLinking()}>
								<IonIcon slot="icon-only" src="svg/link.svg" />
							</IonButton>
							{showingCombos &&
								<IonButton disabled={combinations.length === 0} fill={unlinking ? "solid" : "outline"} color="secondary" onClick={() => setUnlinking(!unlinking)}>
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
						<IonLabel>Current Combination: {savedWords.join("; ")}</IonLabel>
						<IonButton disabled={savedWords.length <= 1} slot="end" strong={true} color="success" onClick={() => doneLinking()}>
							<IonIcon icon={saveOutline} style={ { marginRight: "0.5em" } } /> Save
						</IonButton>
					</IonItem>
					<div id="outputPaneWL" className={"wordlist" + (pickAndSave || linking ? " pickAndSave" : "") + (unlinking ? " removingCombos" : "")}>
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

export default Home;
