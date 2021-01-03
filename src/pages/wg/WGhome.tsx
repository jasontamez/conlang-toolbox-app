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
				<ExploreContainer name="Home page" />
			</IonContent>
		</IonPage>
	);
};

export default WGHome;
