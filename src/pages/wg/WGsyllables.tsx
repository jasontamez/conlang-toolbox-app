import React from 'react';
import {
	IonContent,
	IonPage,
	IonHeader,
	IonToolbar,
	IonMenuButton,
	IonButtons,
	IonButton,
	IonIcon,
	IonTitle,
	IonList,
	IonItem,
	IonLabel,
	IonTextarea,
	IonToggle,
	useIonViewDidEnter
} from '@ionic/react';
import '../App.css';
import {
	helpCircleOutline
} from 'ionicons/icons';
import { $i } from '../../components/DollarSignExports';
import { openModal, toggleSyllables, editSyllables, changeView } from '../../components/ReduxDucksFuncs';
import { WGSyllableStateObject } from '../../components/ReduxDucksTypes';
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { SylCard } from "./WGCards";
import ModalWrap from "../../components/ModalWrap";

const WGSyl = () => {
	const dispatch = useDispatch();
	const viewInfo = ['wg', 'syllables'];
	useIonViewDidEnter(() => {
		dispatch(changeView(viewInfo));
	});
	const syllableObject = useSelector((state: any) => state.wordgenSyllables, shallowEqual);
	const toggleableClassName = (base: string = "") => {
		let extra = " toggleable";
		if(syllableObject.toggle) {
			extra += " toggled";
		}
		return (base + extra).trim();
	};
	const singleWord = syllableObject.objects.singleWord.components.join("\n");
	const wordInitial = syllableObject.objects.wordInitial.components.join("\n");
	const wordMiddle = syllableObject.objects.wordMiddle.components.join("\n");
	const wordFinal = syllableObject.objects.wordFinal.components.join("\n");
	const updateSyllables = (base: keyof WGSyllableStateObject["objects"]) => {
		let value = $i("Syl-" + base).value.split(/\s*\r?\n\s*/);
		dispatch(editSyllables(base, value.filter((v: string) => v !== "")));
	};
	const calculateRows = (input: string) => Math.max(4, input.split(/\n/).length);
	return (
		<IonPage>
			<ModalWrap pageInfo={viewInfo} content={SylCard} />
			<IonHeader>
				<IonToolbar>
					<IonButtons slot="start">
						<IonMenuButton />
					</IonButtons>
					<IonTitle>Syllables</IonTitle>
					<IonButtons slot="end">
						<IonButton onClick={() => dispatch(openModal("InfoModal"))}>
							<IonIcon icon={helpCircleOutline} />
						</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen className="evenBackground">
				<IonList lines="none">
					<IonItem class="ion-text-end">
						<IonLabel>Use multiple syllable types</IonLabel>
						<IonToggle checked={syllableObject.toggle} onIonChange={e => dispatch(toggleSyllables(e.detail.checked))} />
					</IonItem>
				</IonList>
				<IonList className="syllables units" lines="none">
					<IonItem>
						<div className={toggleableClassName("header reverseToggle")}>Syllables</div>
						<div className={toggleableClassName("header")}>Single-Syllable<br />Words</div>
						<IonTextarea className="serifChars" id="Syl-singleWord" onIonBlur={e => updateSyllables('singleWord')} value={singleWord} rows={calculateRows(singleWord)} inputmode="text" placeholder="Use category labels to construct syllables" />
					</IonItem>
					<IonItem className={toggleableClassName()}>
						<div className="header">Word-Initial<br />Syllables</div>
						<IonTextarea className="serifChars" id="Syl-wordInitial" onIonBlur={e => updateSyllables('wordInitial')} value={wordInitial} rows={calculateRows(wordInitial)} inputmode="text" placeholder="These syllables are used to begin words" />
					</IonItem>
					<IonItem className={toggleableClassName()}>
						<div className="header">Mid-Word<br />Syllables</div>
						<IonTextarea className="serifChars" id="Syl-wordMiddle" onIonBlur={e => updateSyllables('wordMiddle')} value={wordMiddle} rows={calculateRows(wordMiddle)} inputmode="text" placeholder="These syllables are used between the first and last syllable of a word" />
					</IonItem>
					<IonItem className={toggleableClassName()}>
						<div className="header">Word-Final<br />Syllables</div>
						<IonTextarea className="serifChars" id="Syl-wordFinal" onIonBlur={e => updateSyllables('wordFinal')} value={wordFinal} rows={calculateRows(wordFinal)} inputmode="text" placeholder="These syllables are used to end words" />
					</IonItem>
				</IonList>
			</IonContent>
		</IonPage>
	);
};

export default WGSyl;
