import React from 'react';
import {
	IonItem,
	IonIcon,
	IonLabel,
	IonList,
	IonContent,
	IonHeader,
	IonToolbar,
	IonButtons,
	IonButton,
	IonTitle,
	IonModal
} from '@ionic/react';
import {
	closeCircleOutline,
	closeCircleSharp
} from 'ionicons/icons';
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { closeModal } from '../components/ReduxDucksFuncs';
import charData from '../components/ExtraCharactersData';

// chardata is {} with props latin, greek, etc.
//   each prop is {} with title = "", content: [ ["NAME", character]... ]

// charSettings has
//   display: (keyof ExtraCharactersData)[] - what is being shown
//   saved: string[] - characters currently saved to favorites bar
//   copyImmediately: boolean - true to copy when clicked, false to use the bar below
//   copyLater: string[] - characters currently stored to be copied later
//   adding: boolean - currently clicking
//   deleting: boolean - currently deleting
//   showNames: boolean - true to show a list of the name : character, false to have columns of characters


const ExtraCharactersModal = () => {
	const dispatch = useDispatch();
	const [modalState, charSettings] = useSelector((state: any) => [state.modalState, state.extraCharactersState], shallowEqual);
	const cancel = () => {
		dispatch(closeModal('ExtraCharacters'));
	};
	return (
		<IonModal isOpen={modalState.ExtraCharacters} onDidDismiss={() => dispatch(closeModal('ExtraCharacters'))}>
			<IonHeader>
				<IonToolbar color="primary">
					<IonTitle>Extra Characters</IonTitle>
					<IonButtons slot="end">
						<IonButton onClick={() => cancel()}>
							<IonIcon icon={closeCircleOutline} />
						</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<IonList lines="none">
					<IonItem color="danger" button={true} onClick={() => cancel()}>
						<IonIcon icon={closeCircleSharp} slot="start" />
						<IonLabel>Cancel</IonLabel>
					</IonItem>
				</IonList>
			</IonContent>
		</IonModal>
	);
};

export default ExtraCharactersModal;
