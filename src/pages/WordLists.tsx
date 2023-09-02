import React, { useState, useCallback } from 'react';
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
	addItemstoLexiconColumn
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
	const [wordListsState, lexColumns] = useSelector((state: any) => [state.wordListsState, state.lexicon.columns], shallowEqual);
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
		const newObject = {...savedWordsObject};
		if(pickAndSave || linking) {
			if(savedWordsObject[id]) {
				setSavedWords(savedWords.filter(word => word.id !== id));
				delete newObject[id];
			} else {
				setSavedWords([...savedWords, { id, word: text }]);
				newObject[id] = true;
			}
			setSavedWordsObject(newObject);
		}
	}, [savedWords, savedWordsObject, pickAndSave, linking]);

	// // //
	// Combine Into New Meaning
	// // //

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
							<IonButton fill={linking ? "solid" : "outline"} color="secondary" onClick={() => setLinking(!linking)}>
								<IonIcon slot="icon-only" src="svg/link.svg" />
							</IonButton>
							{showingCombos && <IonButton fill={unlinking ? "solid" : "outline"} color="secondary" onClick={() => setUnlinking(!unlinking)}>
								<IonIcon slot="icon-only" src="svg/unlink.svg" />
							</IonButton>}
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
					<div id="outputPaneWL" className={(pickAndSave ? "pickAndSave " : "") + "wordList"}>
						{showingCombos && combinations.map((combo: WLCombo) => {
							const { id, parts } = combo;
							const word = parts.map((w: WL) => w.word).join("; ");
							const classes =
								(savedWordsObject[id] ? "saved " : "")
								+ "word ion-text-"
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
