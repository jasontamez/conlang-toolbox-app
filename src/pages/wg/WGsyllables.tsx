import React from 'react';
import {
	IonContent,
	IonPage,
	IonHeader,
	IonToolbar,
	IonMenuButton,
	IonButtons,
	IonButton,
	IonTitle,
	IonList,
	IonItem,
	IonLabel,
	IonTextarea,
	IonIcon,
	IonToggle
} from '@ionic/react';
import {
	helpOutline
} from 'ionicons/icons';
import '../WordGen.css';
import { $togID } from '../../components/DollarSignExports';
import I from '../../components/IPA';
import { toggleSyllables } from '../../components/ReduxDucks';
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
	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					 <IonButtons slot="start">
							<IonMenuButton />
					 </IonButtons>
					<IonTitle>Syllables</IonTitle>
					<IonButtons slot="end">
						<IonButton className="helpy" onClick={() => $togID('expanded', 'syllablesCTE')} size="small" shape="round" color="primary" fill="outline">
							<IonIcon icon={helpOutline} size="small" />
						</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen>
				<div className="clickToExpand" id="syllablesCTE">
					<p>
						This is where you define categories of sounds. The two simplest categories
						are <em>consonants</em> and <em>vowels</em>, but you may want to create multiple
						categories depending on how you want your language's syllables formed. For example,
						the consonants <I>pbk</I> in English may be followed by the consonants <I>lr</I> at
						the beginning of syllables. So you might choose them as categories, while also
						putting <I>pbklr</I> in a third category for general consonants.
					</p><p>
						These <strong>Categories</strong> of sounds will be used in
						the <strong>Syllables</strong> tab to generate your words.
					</p>
				</div>
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
						<IonTextarea />
					</IonItem>
					<IonItem className={toggleableClassName()}>
						<div className="header">Word-Initial<br />Syllables</div>
						<IonTextarea />
					</IonItem>
					<IonItem className={toggleableClassName()}>
						<div className="header">Mid-Word<br />Syllables</div>
						<IonTextarea />
					</IonItem>
					<IonItem className={toggleableClassName()}>
						<div className="header">Word-Final<br />Syllables</div>
						<IonTextarea />
					</IonItem>
				</IonList>
			</IonContent>
		</IonPage>
	);
};

export default WGSyl;
