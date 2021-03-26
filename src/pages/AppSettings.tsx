import React from 'react';
import {
	IonLabel,
	IonPage,
	IonContent,
	IonHeader,
	IonToolbar,
	IonTitle,
	IonList,
	IonItem,
	IonToggle,
	IonButtons,
	IonMenuButton,
	IonNote
} from '@ionic/react';
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import {
	toggleDisableConfirm,
	openModal
} from '../components/ReduxDucksFuncs';
import ChooseThemeModal from './M-Theme';


const AppSettings = () => {
	const dispatch = useDispatch();
	const settings = useSelector((state: any) => state.appSettings, shallowEqual);
	return (
		<IonPage>
			<ChooseThemeModal />
			<IonHeader>
				<IonToolbar>
					<IonButtons slot="start">
						<IonMenuButton />
					</IonButtons>
					<IonTitle>App Settings</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen>
				<IonList>
					<IonItem>
						<IonLabel className="possiblyLargeLabel">
							<h2>Disable Confirmation Prompts</h2>
							<p>Eliminates yes/no prompts when deleting or overwriting data.</p>
						</IonLabel>
						<IonToggle slot="end" checked={settings.disableConfirms} onIonChange={e => dispatch(toggleDisableConfirm(e.detail.checked))} />
					</IonItem>
					<IonItem button={true} onClick={() => dispatch(openModal('AppTheme'))}>
						<IonLabel>Change Theme</IonLabel>
						<IonNote slot="end" color="primary" style={ { color: "var(--ion-color-primary"} } >{settings.theme || "Default"}</IonNote>
					</IonItem>
				</IonList>
			</IonContent>
		</IonPage>
	);
};
 
export default AppSettings;
