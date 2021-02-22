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
	TraCard,
	SChCard,
	InpCard,
	OutCard
} from './WECards';
import '../App.css';

const WEHome = () => {
	const dispatch = useDispatch();
	useIonViewDidEnter(() => {
		dispatch(changeView(['we', 'home']));
	});	
	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					 <IonButtons slot="start">
						 <IonMenuButton />
					 </IonButtons>
					<IonTitle>WordEvolve</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen>
				<InpCard />
				<CatCard />
				<TraCard />
				<SChCard />
				<OutCard />
			</IonContent>
		</IonPage>
	);
};

export default WEHome;
