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
	IonModal,
	IonFooter
} from '@ionic/react';
import {
	closeCircleOutline,
	closeCircleSharp,
	checkmarkCircleOutline
} from 'ionicons/icons';
import { useSelector, useDispatch } from "react-redux";

import { setTheme } from '../store/settingsSlice';
import { ThemeNames, ModalProperties, StateObject } from '../store/types';

const MaybeLoadPresetModal = (props: ModalProperties) => {
	const { isOpen, setIsOpen } = props;
	const dispatch = useDispatch();
	const appTheme = useSelector((state: StateObject) => state.appSettings.theme) || "Default";
	const cancel = () => {
		setIsOpen(false);
	};
	const changeAppTheme = (theme: ThemeNames) => {
		dispatch(setTheme(theme));
		setIsOpen(false);
	};
	const themes: ThemeNames[] = [
		"Default",
		"Light",
		"Dark",
		"Solarized Light",
		"Solarized Dark"
	];
	return (
		<IonModal isOpen={isOpen} onDidDismiss={() => setIsOpen(false)}>
			<IonHeader>
				<IonToolbar color="primary">
					<IonTitle>Choose a Theme</IonTitle>
					<IonButtons slot="end">
						<IonButton onClick={() => cancel()}>
							<IonIcon icon={closeCircleOutline} />
						</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<IonList lines="none" className="buttonFilled">
					{themes.map((theme) => (
						<IonItem key={theme} button={true} onClick={() => changeAppTheme(theme)}>
							<IonLabel>{theme}</IonLabel>
							{appTheme === theme ? (<IonIcon icon={checkmarkCircleOutline} slot="end" />) : ""}
						</IonItem>
					))}
				</IonList>
			</IonContent>
			<IonFooter>
				<IonToolbar>
					<IonButton color="danger" slot="end" onClick={() => setIsOpen(false)}>
						<IonIcon icon={closeCircleSharp} slot="start" />
						<IonLabel>Cancel</IonLabel>
					</IonButton>
				</IonToolbar>
			</IonFooter>
		</IonModal>
	);
};

export default MaybeLoadPresetModal;
