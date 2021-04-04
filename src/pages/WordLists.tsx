import React from 'react';
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
	IonPopover,
	useIonViewDidEnter
} from '@ionic/react';
import {
	ellipsisVertical,
	helpCircleOutline,
	saveOutline,
	textOutline
} from 'ionicons/icons';
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import {
	updateWordListsDisplay,
	openModal,
	closeModal,
	openPopover,
	closePopover,
	changeView,
	toggleWordListsBoolean,
	addDeferredLexiconItems,
	removeDeferredLexiconItem
} from '../components/ReduxDucksFuncs';
import { WL } from '../components/ReduxDucksTypes';
import ExtraCharactersModal from './M-ExtraCharacters';
import { $a, $i } from '../components/DollarSignExports';
import { WordList, WordListSources } from '../components/WordLists';
import ModalWrap from "../components/ModalWrap";
import { WLCard } from "./wg/WGCards";
import { v4 as uuidv4 } from 'uuid';

const Home = () => {
	const [modalState, wordListsState, waitingToAdd] = useSelector((state: any) => [state.modalState, state.wordListsState, state.lexicon.waitingToAdd], shallowEqual);
	const theDisplay = wordListsState.display;
	const dispatch = useDispatch();
	const toggleChars = (what: keyof WL) => {
		if(theDisplay.some((p: keyof WL) => p === what)) {
			return dispatch(updateWordListsDisplay(theDisplay.filter((p: keyof WL) => p !== what)));
		}
		dispatch(updateWordListsDisplay([...theDisplay, what]));
	};
	const shown = WordList.filter((word: WL) => theDisplay.some((p: keyof WL) => word[p]));
	const viewInfo = ['wl', 'home'];
	useIonViewDidEnter(() => {
		dispatch(changeView(viewInfo));
	});
	const outputPane = $i("outputPaneWL");

	// // //
	// Save to Lexicon
	// // //
	const pickAndSave = () => {
		dispatch(closePopover("WordListsEllipsis"));
		dispatch(openModal("PickAndSaveWG"));
	};
	const donePickingAndSaving = () => {
		dispatch(closeModal("PickAndSaveWG"));
	};
	const saveEverything = () => {
		let wordsToSave: string[] = [];
		dispatch(closePopover("WordListsEllipsis"));
		$a(".word", outputPane).forEach((word: HTMLElement) => {
			word.textContent && wordsToSave.push(word.textContent);
		});
		dispatch(addDeferredLexiconItems(wordsToSave));
	};
	const maybeSaveThisWord = (text: string, id: string) => {
		if(outputPane.classList.contains("pickAndSave")) {
			let CL = ($i(id) as HTMLElement).classList;
			if(CL.contains("saved")) {
				CL.remove("saved");
				dispatch(removeDeferredLexiconItem(text));
			} else {
				CL.add("saved");
				dispatch(addDeferredLexiconItems([text]));
			}
		}
	};

	return (
		<IonPage>
			<ExtraCharactersModal />
			<ModalWrap pageInfo={viewInfo} content={WLCard} />
			<IonHeader>
				<IonToolbar>
					 <IonButtons slot="start">
						 <IonMenuButton />
					 </IonButtons>
					<IonTitle>Word Lists</IonTitle>
					<IonButtons slot="end">
						<IonButton onClick={() => dispatch(openModal("InfoModal"))}>
							<IonIcon icon={helpCircleOutline} />
						</IonButton>
						<IonButton onClick={(e: any) => {
							e.persist();
							dispatch(openPopover("WordListsEllipsis", e));
						}}>
							<IonIcon icon={ellipsisVertical} />
						</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<IonPopover
			        {/*cssClass='my-custom-class'*/ ...""}
					event={modalState.WordListsEllipsis}
					isOpen={modalState.WordListsEllipsis !== undefined}
					onDidDismiss={() => dispatch(closePopover("WordListsEllipsis"))}
				>
					<IonList lines="none">
						<IonItem button={true} onClick={() => dispatch(toggleWordListsBoolean("textCenter"))}>
							<IonIcon icon={textOutline} slot="start" />
							<IonLabel className="ion-text-wrap">{wordListsState.textCenter ? "De-center Text" : "Center Text"}</IonLabel>
						</IonItem>
						<IonItem button={true} onClick={() => saveEverything()}>
							<IonIcon icon={saveOutline} slot="start" />
							<IonLabel className="ion-text-wrap">Save All to Lexicon</IonLabel>
						</IonItem>
						<IonItem button={true} onClick={() => pickAndSave()}>
							<IonIcon icon={saveOutline} slot="start" />
							<IonLabel className="ion-text-wrap">Choose what to save</IonLabel>
						</IonItem>
					</IonList>
				</IonPopover>
				<IonList lines="none">
					<IonItem className={modalState.PickAndSaveWG ? "" : "hide"}>
						<IonButton expand="block" strong={true} color="secondary" onClick={() => donePickingAndSaving()}>
							<IonIcon icon={saveOutline} style={ { marginRight: "0.5em" } } /> Done Saving
						</IonButton>
					</IonItem>
					<IonItem>
						<div>
							<span>Display:</span>
							{WordListSources.map((pair: [string, keyof WL], ind: number) => {
								let [list, prop] = pair;
								const current = theDisplay.some((p: keyof WL) => p === prop);
								return (
									<IonChip key={prop} outline={!current} onClick={() => toggleChars(prop)} className={(ind === 0 ? ("ion-margin-start" + (current ? " " : "")) : "") + (current ? "active" : "")}>
										<IonLabel>{list}</IonLabel>
									</IonChip>	
								);
							})}
						</div>
					</IonItem>
					<div id="outputPaneWL" className={(modalState.PickAndSaveWG ? "pickAndSave " : "") + "wordList"}>
						{shown.map((word: WL) => {
							const ww = word.word;
							const id = uuidv4();
							let c = "word ";
							if(waitingToAdd.some((w: string) => w === ww)) {
								c = "word saved ";
							}
							return (
								<div onClick={() => maybeSaveThisWord(ww, id)} key={id} id={id} className={c + (wordListsState.textCenter ? "ion-text-center" : "ion-text-start")}>{ww}</div>
							)
						})}
					</div>
				</IonList>
			</IonContent>
		</IonPage>
	);
};

export default Home;
