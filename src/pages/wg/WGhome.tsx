import React from 'react';
import {
	IonContent,
	IonPage,
	IonHeader,
	IonToolbar,
	IonMenuButton,
	IonButtons,
	IonTitle,
	useIonViewDidEnter
} from '@ionic/react';
import { useDispatch } from "react-redux";
import { changeView } from '../../components/ReduxDucksFuncs';
import {
	CatCard,
	SylCard,
	RewCard,
	OutCard,
	OptCard
} from './WGCards';

const WGHome = () => {
	const dispatch = useDispatch();
	useIonViewDidEnter(() => {
		dispatch(changeView(['wg', 'home']));
	});	
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
				<CatCard />
				<SylCard />
				<RewCard />
				<OutCard />
				<OptCard />
			</IonContent>
		</IonPage>
	);
};

export default WGHome;
