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
/*import {
	addOutline,
	chevronUpCircleOutline,
	chevronDownCircleOutline
} from 'ionicons/icons';*/
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import {
	changeView
} from '../../components/ReduxDucksFuncs';
import '../App.css';

const WERew = () => {
	const dispatch = useDispatch();
	useIonViewDidEnter(() => {
		dispatch(changeView('we', 'input'));
	});
	const state = useSelector((state: any) => state, shallowEqual);
	if(!state) {
		console.log(6);
	}
	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonButtons slot="start">
						<IonMenuButton />
					</IonButtons>
					<IonTitle>Input Lexicon</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen className="evenBackground">

			</IonContent>
		</IonPage>
	);
};

export default WERew;
