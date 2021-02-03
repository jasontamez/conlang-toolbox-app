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
	IonSelect,
	IonSelectOption,
	IonModal,
	IonIcon,
	IonFooter
} from '@ionic/react';
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import {
	OutputTypes,
	Fifty_OneThousand,
	Five_OneHundred,
} from '../../components/ReduxDucksTypes';
import {
	setOutputType,
	setSyllableBreaks,
	setSentencesPerText,
	setCapitalizeWords,
	setSortWordlist,
	setWordlistMulticolumn,
	setWordsPerWordlist
} from '../../components/ReduxDucksFuncs';
import {
	closeCircleOutline
} from 'ionicons/icons';
import { closeModal } from '../../components/ReduxDucksFuncs';
import '../WordGen.css';

const OutputOptionsModal = () => {
	const dispatch = useDispatch();
	const state = useSelector((state: any) => state, shallowEqual);
	const modalState = state.modalState;
	const settingsWG = state.wordgenSettings;
	return (
		<IonModal isOpen={modalState.OutputOptions} onDidDismiss={() => dispatch(closeModal('OutputOptions'))}>
			<IonHeader>
				<IonToolbar color="primary">
					<IonTitle>Output Options</IonTitle>
					<IonButtons slot="end">
						<IonButton onClick={() => dispatch(closeModal('OutputOptions'))}>
							<IonIcon icon={closeCircleOutline} />
						</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<IonList>
					<IonItemDivider>What to Generate:</IonItemDivider>
					<IonSelect interface="popover" value={settingsWG.output} onIonChange={e => dispatch(setOutputType(e.detail.value! as OutputTypes))}>
						<IonSelectOption value="text">Pseudo-text</IonSelectOption>
						<IonSelectOption value="wordlist">Wordlist</IonSelectOption>
						<IonSelectOption value="syllables">All possible syllables</IonSelectOption>
					</IonSelect>
					<IonItem>
						<IonLabel>Show syllable breaks</IonLabel>
						<IonToggle checked={settingsWG.showSyllableBreaks} onIonChange={e => dispatch(setSyllableBreaks(e.detail.checked))} />
					</IonItem>
					<IonItemDivider>Pseudo-text Controls</IonItemDivider>
					<IonItem>
						<IonLabel position="stacked">Number of sentences</IonLabel>
						<IonRange min={5} max={100} value={settingsWG.sentencesPerText} pin={true} onIonChange={e => dispatch(setSentencesPerText(e.detail.value! as Five_OneHundred))}>
							<IonLabel slot="start">5</IonLabel>
							<IonLabel slot="end">100</IonLabel>
						</IonRange>
					</IonItem>
					<IonItemDivider>Wordlist and Syllable-List Controls</IonItemDivider>
					<IonItem>
						<IonLabel>Capitalize words</IonLabel>
						<IonToggle checked={settingsWG.capitalizeWords} onIonChange={e => dispatch(setCapitalizeWords(e.detail.checked))} />
					</IonItem>
					<IonItem>
						<IonLabel>Sort output</IonLabel>
						<IonToggle checked={settingsWG.sortWordlist} onIonChange={e => dispatch(setSortWordlist(e.detail.checked))} />
					</IonItem>
					<IonItem>
						<IonLabel>Multi-Column layout</IonLabel>
						<IonToggle checked={settingsWG.wordlistMultiColumn} onIonChange={e => dispatch(setWordlistMulticolumn(e.detail.checked))} />
					</IonItem>
					<IonItem>
						<IonLabel position="stacked">Wordlist size</IonLabel>
						<IonRange min={50} max={1000} value={settingsWG.wordsPerWordlist} pin={true} onIonChange={e => dispatch(setWordsPerWordlist(e.detail.value! as Fifty_OneThousand))}>
							<IonLabel slot="start">50</IonLabel>
							<IonLabel slot="end">1000</IonLabel>
						</IonRange>
					</IonItem>
				</IonList>
			</IonContent>
			<IonFooter>
				<IonItem button={true} onClick={() => dispatch(closeModal('OutputOptions'))} color="success">
					<IonLabel>Done</IonLabel>
				</IonItem>
			</IonFooter>
		</IonModal>
	);
};

export default OutputOptionsModal;
