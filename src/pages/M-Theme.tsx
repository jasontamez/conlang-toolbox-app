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
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { closeModal, changeTheme } from '../components/ReduxDucksFuncs';
//import fireSwal from '../components/Swal';

const MaybeLoadPresetModal = () => {
	const dispatch = useDispatch();
	const [modalState, settings] = useSelector((state: any) => [state.modalState, state.appSettings], shallowEqual);
	const cancel = () => {
		dispatch(closeModal('AppTheme'));
	};
	const appTheme = settings.theme || "Default";
	const changeAppTheme = (theme: string) => {
		dispatch(changeTheme(theme));
		dispatch(closeModal('AppTheme'));
	};
	const themes = [
		"Default",
		"Light",
		"Dark",
		"Solarized Light",
		"Solarized Dark"
	];
	return (
		<IonModal isOpen={modalState.AppTheme} onDidDismiss={() => dispatch(closeModal('AppTheme'))}>
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
					<IonButton color="danger" slot="end" onClick={() => cancel()}>
						<IonIcon icon={closeCircleSharp} slot="start" />
						<IonLabel>Cancel</IonLabel>
					</IonButton>
				</IonToolbar>
			</IonFooter>
		</IonModal>
	);
};

export default MaybeLoadPresetModal;
