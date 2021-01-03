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
import '../WordEvolve.css';

const WESyl = () => {
	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					 <IonButtons slot="start">
						 <IonMenuButton />
					 </IonButtons>
					<IonTitle>Sound Changes</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen>
				<ExploreContainer name="Sound Changes page" />
			</IonContent>
		</IonPage>
	);
};

export default WESyl;
