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
	helpCircleOutline
} from 'ionicons/icons';
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { updateWordListsDisplay, openModal, openPopover, closePopover, changeView } from '../components/ReduxDucksFuncs';
import { WL } from '../components/ReduxDucksTypes';
import ExtraCharactersModal from './M-ExtraCharacters';
import { WordList, WordListSources } from '../components/WordLists';
import ModalWrap from "../components/ModalWrap";
import { OutCard } from "./wg/WGCards";

const Home = () => {
	const [modalState, wordListsState] = useSelector((state: any) => [state.modalState, state.wordListsState], shallowEqual);
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

	return (
		<IonPage>
			<ExtraCharactersModal />
			<ModalWrap pageInfo={viewInfo} content={OutCard} />
			<IonHeader>
				<IonToolbar>
					 <IonButtons slot="start">
						 <IonMenuButton />
					 </IonButtons>
					<IonTitle className="ion-text-center">Word Lists</IonTitle>
					<IonButtons slot="end">
						<IonButton onClick={() => dispatch(openModal("InfoModal"))}>
							<IonIcon icon={helpCircleOutline} />
						</IonButton>
						<IonButton onClick={(e: any) => {
							e.persist();
							dispatch(openPopover("WESaveToLexicon", e));
						}}>
							<IonIcon icon={ellipsisVertical} />
						</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<IonPopover
				        {/*cssClass='my-custom-class'*/ ...""}
						event={modalState.WESaveToLexicon}
						isOpen={modalState.WESaveToLexicon !== undefined}
						onDidDismiss={() => dispatch(closePopover("WESaveToLexicon"))}
				>
					<IonList lines="none">
						<IonItem button={true} onClick={() => {}}>
							<IonLabel className="ion-text-wrap">Save everything</IonLabel>
						</IonItem>
						<IonItem button={true} onClick={() => {}}>
							<IonLabel className="ion-text-wrap">Choose what to save</IonLabel>
						</IonItem>
					</IonList>
				</IonPopover>
				<IonList lines="none">
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
					<div className="wordList">
						{shown.map((word: WL) => <div key={word.word}>{word.word}</div> )}
					</div>
				</IonList>
			</IonContent>
		</IonPage>
	);
};

export default Home;
