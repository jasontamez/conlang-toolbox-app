import React from 'react';
import {
	IonContent,
	IonPage,
	IonHeader,
	IonToolbar,
	IonMenuButton,
	IonButtons,
	IonTitle,
	IonList,
	IonItem,
	IonLabel,
	IonTextarea,
	IonToggle
} from '@ionic/react';
import '../WordGen.css';
import { $i } from '../../components/DollarSignExports';
import { toggleSyllables, editSyllables, WGSyllableStateObject } from '../../components/ReduxDucks';
import { shallowEqual, useSelector, useDispatch } from "react-redux";

const WGSyl = () => {
	const dispatch = useDispatch();
	const syllableObject = useSelector((state: any) => state.syllables, shallowEqual);
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
			<IonHeader>
				<IonToolbar>
					<IonButtons slot="start">
						<IonMenuButton />
					</IonButtons>
					<IonTitle>Syllables</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen>
				<IonList lines="none">
					<IonItem class="ion-text-end">
						<IonLabel>Use multiple syllable types</IonLabel>
						<IonToggle checked={syllableObject.toggle} onIonChange={() => dispatch(toggleSyllables())} />
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
