import React from 'react';
import {
	IonContent,
	IonPage,
	IonHeader,
	IonToolbar,
	IonMenuButton,
	IonButtons,
	IonTitle
} from '@ionic/react';
import I from '../../components/IPA';
import '../WordGen.css';

const WGHome = () => {
	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					 <IonButtons slot="start">
						 <IonMenuButton />
					 </IonButtons>
					<IonTitle>WordGen</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen>
				<div>
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
			</IonContent>
		</IonPage>
	);
};

export default WGHome;
