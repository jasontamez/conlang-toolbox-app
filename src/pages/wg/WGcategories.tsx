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
//import ExploreContainer from '../../components/ExploreContainer';
import '../WordGen.css';
import List from '../../components/List';
import Form from '../../components/Form';

const WGCat = () => {
	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					 <IonButtons slot="start">
						 <IonMenuButton />
					 </IonButtons>
					<IonTitle>Categories</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen>
				<div>
					<h2>Articles</h2>
					<List />
				</div>
				<div>
					<h2>Add a new article</h2>
					<Form />
				</div>
			</IonContent>
		</IonPage>
	);
};

export default WGCat;
