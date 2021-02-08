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
	openModal
} from '../components/ReduxDucksFuncs';
import ChooseThemeModal from './M-Theme';


/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import '../theme/variables.css';

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
