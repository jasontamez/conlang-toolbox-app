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
	useIonViewDidEnter
} from '@ionic/react';
import {
	helpCircleOutline,
	saveOutline,
	checkmarkDoneOutline
} from 'ionicons/icons';
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { v4 as uuidv4 } from 'uuid';
import {
	updateWordListsDisplay,
	openModal,
	closeModal,
	changeView,
	toggleWordListsBoolean,
	addDeferredLexiconItems,
	removeDeferredLexiconItem
} from '../components/ReduxDucksFuncs';
import { PageData, WL } from '../components/ReduxDucksTypes';
import { $a, $i } from '../components/DollarSignExports';
import { WordList, WordListSources } from '../components/WordLists';
import ModalWrap from "../components/ModalWrap";
import { WLCard } from "./wg/WGCards";
import fireSwal from '../components/Swal';

const Home = (props: PageData) => {
	const { modalPropsMaker } = props;
	const [isOpenInfo, setIsOpenInfo] = React.useState<boolean>(false);
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
		dispatch(openModal("PickAndSaveWG"));
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
		dispatch(closeModal("PickAndSaveWG"));
	};
	const saveEverything = () => {
		let wordsToSave: string[] = [];
		dispatch(closeModal("PickAndSaveWG"));
		$a(".word", outputPane).forEach((word: HTMLElement) => {
			word.textContent && wordsToSave.push(word.textContent);
		});
		dispatch(addDeferredLexiconItems(wordsToSave));
		return fireSwal({
			title: "All words have been sent to Lexicon",
			toast: true,
			timer: 2500,
			position: 'top',
			timerProgressBar: true,
			showConfirmButton: false
		});	
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
			<ModalWrap {...modalPropsMaker(isOpenInfo, setIsOpenInfo)} content={WLCard} />
			<IonHeader>
				<IonToolbar>
					 <IonButtons slot="start">
						 <IonMenuButton />
					 </IonButtons>
					<IonTitle>Word Lists</IonTitle>
					<IonButtons slot="end">
						<IonButton onClick={() => dispatch(toggleWordListsBoolean("textCenter"))}>
							{
								wordListsState.textCenter ?
									<IonIcon size="small" slot="end" src="svg/align-left-material.svg" />
								:
									<IonIcon size="small" slot="end" src="svg/align-center-material.svg" />
							}
						</IonButton>
						<IonButton onClick={() => pickAndSave()}>
							<IonIcon icon={saveOutline} />
						</IonButton>
						<IonButton onClick={() => setIsOpenInfo(true)}>
							<IonIcon icon={helpCircleOutline} />
						</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<IonList lines="none">
					<IonItem className={modalState.PickAndSaveWG ? "" : "hide"}>
						<IonButton strong={true} color="tertiary" onClick={() => saveEverything()}>
							<IonIcon icon={saveOutline} style={ { marginRight: "0.5em" } } /> Save All Words
						</IonButton>
					</IonItem>
					<IonItem className={modalState.PickAndSaveWG ? "" : "hide"}>
						<IonButton strong={true} color="secondary" onClick={() => donePickingAndSaving()}>
							<IonIcon icon={checkmarkDoneOutline} style={ { marginRight: "0.5em" } } /> Finish Saving
						</IonButton>
					</IonItem>
					<IonItem className="wordListChips">
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
