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
import ExportAllData from './M-ExportAllData';
import { PageData } from '../components/ReduxDucksTypes';


const AppSettings = (props: PageData) => {
	const dispatch = useDispatch();
	const appSettings = useSelector((state: any) => state.appSettings, shallowEqual);
	return (
		<IonPage>
			<ChooseThemeModal />
			<ExportAllData />
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
					<IonItem className="wrappableInnards">
						<IonToggle
							labelPlacement="start"
							enableOnOffLabels
							checked={appSettings.disableConfirms}
							onIonChange={e => dispatch(toggleDisableConfirm(e.detail.checked))}
						>
							<h2>Disable Confirmation Prompts</h2>
							<p>Eliminates yes/no prompts when deleting or overwriting data.</p>
						</IonToggle>
					</IonItem>
					<IonItem button={true} onClick={() => dispatch(openModal('AppTheme'))}>
						<IonLabel>Change Theme</IonLabel>
						<IonNote slot="end" color="primary" style={ { color: "var(--ion-color-primary"} } >{appSettings.theme || "Default"}</IonNote>
					</IonItem>
					<IonItem button={true} onClick={() => dispatch(openModal('ExportAll'))}>
						<IonLabel className="possiblyLargeLabel">
							<h2>Export All App Info</h2>
						</IonLabel>
					</IonItem>
				</IonList>
			</IonContent>
		</IonPage>
	);
};
 
export default AppSettings;
