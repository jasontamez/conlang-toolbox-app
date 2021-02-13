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
} from '@ionic/react';/*
import {
	gridOutline,
	optionsOutline,
	swapHorizontalOutline,
	documentTextOutline,
	informationCircleOutline,
	fileTrayStackedOutline
} from 'ionicons/icons';*/
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import {
	toggleDisableConfirm,
	openModal,
	toggleLexiconHorizontalScroll
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
					<IonItem>
						<IonLabel className="possiblyLargeLabel">
							<h2>Enable Horizontal Scroll on Lexicon</h2>
							<p>Allows the Lexicon page to scroll left and right.</p>
						</IonLabel>
						<IonToggle slot="end" checked={settings.lexiconHorizontalScroll} onIonChange={() => dispatch(toggleLexiconHorizontalScroll())} />
					</IonItem>
				</IonList>
			</IonContent>
		</IonPage>
	);
};
 
export default AppSettings;
