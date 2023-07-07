import React from 'react';
import {
	IonContent,
	IonHeader,
	IonToolbar,
	IonButtons,
	IonTitle,
	IonList,
	IonButton,
	IonItemDivider,
	IonItem,
	IonLabel,
	IonToggle,
	IonRange,
	IonModal,
	IonIcon,
	IonFooter
} from '@ionic/react';
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import {
	Fifty_OneThousand,
	Five_OneHundred,
} from '../../components/ReduxDucksTypes';
import {
	setOutputTypeWG,
	setSyllableBreaksWG,
	setSentencesPerTextWG,
	setCapitalizeWordsWG,
	setSortWordlistWG,
	setWordlistMulticolumnWG,
	setWordsPerWordlistWG
} from '../../components/ReduxDucksFuncs';
import {
	checkmarkCircleOutline,
	closeCircleOutline,
	ellipseOutline
} from 'ionicons/icons';
import { closeModal } from '../../components/ReduxDucksFuncs';

const OutputOptionsModal = () => {
	const dispatch = useDispatch();
	const [modalState, settingsWG] = useSelector((state: any) => [state.modalState, state.wordgenSettings], shallowEqual);
	return (
		<IonModal isOpen={modalState.WGOutputOptions} onDidDismiss={() => dispatch(closeModal('WGOutputOptions'))}>
			<IonHeader>
				<IonToolbar color="primary">
					<IonTitle>Output Options</IonTitle>
					<IonButtons slot="end">
						<IonButton onClick={() => dispatch(closeModal('WGOutputOptions'))}>
							<IonIcon icon={closeCircleOutline} />
						</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<IonList lines="full">
					<IonItem>
						<IonLabel>Show syllable breaks</IonLabel>
						<IonToggle checked={settingsWG.showSyllableBreaks} onIonChange={e => dispatch(setSyllableBreaksWG(e.detail.checked))} />
					</IonItem>
					<IonItemDivider>What to Generate:</IonItemDivider>
					<IonItem button={true} onClick={() => dispatch(setOutputTypeWG('text'))}>
						<IonLabel>Pseudo-text</IonLabel>
						<IonIcon icon={settingsWG.output === "text" ? checkmarkCircleOutline : ellipseOutline}  />
					</IonItem>
					<IonItem button={true} onClick={() => dispatch(setOutputTypeWG('wordlist'))}>
						<IonLabel>Wordlist</IonLabel>
						<IonIcon icon={settingsWG.output === "wordlist" ? checkmarkCircleOutline : ellipseOutline}  />
					</IonItem>
					<IonItem button={true} onClick={() => dispatch(setOutputTypeWG('syllables'))}>
						<IonLabel>All possible syllables</IonLabel>
						<IonIcon icon={settingsWG.output === "syllables" ? checkmarkCircleOutline : ellipseOutline}  />
					</IonItem>
					<IonItemDivider>{settingsWG.output === "text" ? "Pseudo-text Controls" : "Wordlist and Syllable-List Controls"}</IonItemDivider>
					<IonItem className={settingsWG.output === "text" ? "" : "hide"}>
						<IonLabel position="stacked">Number of sentences</IonLabel>
						<IonRange debounce={250} min={5} max={100} value={settingsWG.sentencesPerText} pin={true} onIonChange={e => dispatch(setSentencesPerTextWG(e.detail.value as Five_OneHundred))}>
							<IonLabel slot="start">5</IonLabel>
							<IonLabel slot="end">100</IonLabel>
						</IonRange>
					</IonItem>
					<IonItem className={settingsWG.output === "text" ? "hide" : ""}>
						<IonLabel>Capitalize words</IonLabel>
						<IonToggle checked={settingsWG.capitalizeWords} onIonChange={e => dispatch(setCapitalizeWordsWG(e.detail.checked))} />
					</IonItem>
					<IonItem className={settingsWG.output === "text" ? "hide" : ""}>
						<IonLabel>Sort output</IonLabel>
						<IonToggle checked={settingsWG.sortWordlist} onIonChange={e => dispatch(setSortWordlistWG(e.detail.checked))} />
					</IonItem>
					<IonItem className={settingsWG.output === "text" ? "hide" : ""}>
						<IonLabel>Multi-Column layout</IonLabel>
						<IonToggle checked={settingsWG.wordlistMultiColumn} onIonChange={e => dispatch(setWordlistMulticolumnWG(e.detail.checked))} />
					</IonItem>
					<IonItem className={settingsWG.output === "text" ? "hide" : ""}>
						<IonLabel position="stacked">Wordlist size</IonLabel>
						<IonRange debounce={250} min={50} max={1000} value={settingsWG.wordsPerWordlist} pin={true} onIonChange={e => dispatch(setWordsPerWordlistWG(e.detail.value as Fifty_OneThousand))}>
							<IonLabel slot="start">50</IonLabel>
							<IonLabel slot="end">1000</IonLabel>
						</IonRange>
					</IonItem>
				</IonList>
			</IonContent>
			<IonFooter>
				<IonItem button={true} onClick={() => dispatch(closeModal('WGOutputOptions'))} color="success">
					<IonLabel>Done</IonLabel>
				</IonItem>
			</IonFooter>
		</IonModal>
	);
};

export default OutputOptionsModal;
