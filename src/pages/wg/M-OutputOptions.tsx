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
	ModalProperties
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

const OutputOptionsModal = (props: ModalProperties) => {
	const { isOpen, setIsOpen } = props;
	const dispatch = useDispatch();
	const settingsWG = useSelector((state: any) => state.wordgenSettings, shallowEqual);
	const {
		output,
		showSyllableBreaks,
		sentencesPerText,
		capitalizeWords,
		sortWordlist,
		wordlistMultiColumn,
		wordsPerWordlist
	} = settingsWG;
	return (
		<IonModal isOpen={isOpen} onDidDismiss={() => setIsOpen(false)}>
			<IonHeader>
				<IonToolbar color="primary">
					<IonTitle>Output Options</IonTitle>
					<IonButtons slot="end">
						<IonButton onClick={() => setIsOpen(false)}>
							<IonIcon icon={closeCircleOutline} />
						</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<IonList lines="full" className="hasSpecialLabels">
					<IonItem>
						<IonToggle enableOnOffLabels labelPlacement="start" checked={showSyllableBreaks} onIonChange={e => dispatch(setSyllableBreaksWG(e.detail.checked))}>Show syllable breaks</IonToggle>
					</IonItem>
					<IonItemDivider>What to Generate:</IonItemDivider>
					<IonItem button={true} onClick={() => dispatch(setOutputTypeWG('text'))}>
						<IonLabel>Pseudo-text</IonLabel>
						<IonIcon icon={output === "text" ? checkmarkCircleOutline : ellipseOutline} />
					</IonItem>
					<IonItem button={true} onClick={() => dispatch(setOutputTypeWG('wordlist'))}>
						<IonLabel>Wordlist</IonLabel>
						<IonIcon icon={output === "wordlist" ? checkmarkCircleOutline : ellipseOutline} />
					</IonItem>
					<IonItem button={true} onClick={() => dispatch(setOutputTypeWG('syllables'))}>
						<IonLabel>All possible syllables</IonLabel>
						<IonIcon icon={output === "syllables" ? checkmarkCircleOutline : ellipseOutline} />
					</IonItem>
					<IonItemDivider>{output === "text" ? "Pseudo-text Controls" : "Wordlist and Syllable-List Controls"}</IonItemDivider>
					<IonItem className={(output === "text" ? "hide" : "") + " labelled"}>
						<IonLabel>Number of sentences</IonLabel>
					</IonItem>
					<IonItem className={output === "text" ? "" : "hide"}>
						<IonRange debounce={250} min={5} max={100} value={sentencesPerText} pin={true} onIonChange={e => dispatch(setSentencesPerTextWG(e.detail.value as Five_OneHundred))}>
							<div slot="start">5</div>
							<div slot="end">100</div>
						</IonRange>
					</IonItem>
					<IonItem className={output === "text" ? "hide" : ""}>
						<IonToggle enableOnOffLabels labelPlacement="start" checked={capitalizeWords} onIonChange={e => dispatch(setCapitalizeWordsWG(e.detail.checked))}>Capitalize words</IonToggle>
					</IonItem>
					<IonItem className={output === "text" ? "hide" : ""}>
						<IonToggle enableOnOffLabels labelPlacement="start" checked={sortWordlist} onIonChange={e => dispatch(setSortWordlistWG(e.detail.checked))}>Sort output</IonToggle>
					</IonItem>
					<IonItem className={output === "text" ? "hide" : ""}>
						<IonToggle enableOnOffLabels labelPlacement="start" checked={wordlistMultiColumn} onIonChange={e => dispatch(setWordlistMulticolumnWG(e.detail.checked))}>Multi-Column layout</IonToggle>
					</IonItem>
					<IonItem className={(output === "text" ? "hide" : "") + " labelled"}>
						<IonLabel>Wordlist size</IonLabel>
					</IonItem>
					<IonItem className={output === "text" ? "hide" : ""}>
						<IonRange debounce={250} min={50} max={1000} value={wordsPerWordlist} pin={true} onIonChange={e => dispatch(setWordsPerWordlistWG(e.detail.value as Fifty_OneThousand))}>
							<div slot="start">50</div>
							<div slot="end">1000</div>
						</IonRange>
					</IonItem>
				</IonList>
			</IonContent>
			<IonFooter>
				<IonItem button={true} onClick={() => setIsOpen(false)} color="success">
					<IonLabel>Done</IonLabel>
				</IonItem>
			</IonFooter>
		</IonModal>
	);
};

export default OutputOptionsModal;
