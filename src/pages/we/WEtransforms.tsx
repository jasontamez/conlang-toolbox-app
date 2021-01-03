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

const WETrn = () => {
	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					 <IonButtons slot="start">
						 <IonMenuButton />
					 </IonButtons>
					<IonTitle>Helpful Transformations</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen>
				<ExploreContainer name="Transformations page" />
			</IonContent>
		</IonPage>
	);
};

export default WETrn;
