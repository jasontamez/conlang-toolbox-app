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
import ExploreContainer from '../../components/ExploreContainer';
import '../WordGen.css';

const WGSyl = () => {
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
				<ExploreContainer name="Syllables page" />
			</IonContent>
		</IonPage>
	);
};

export default WGSyl;
