import React, { useState } from 'react';
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
	toggleDisableConfirm
} from '../components/ReduxDucksFuncs';
import ChooseThemeModal from './M-Theme';
import ExportAllData from './M-ExportAllData';
import { PageData } from '../components/ReduxDucksTypes';


const AppSettings = (props: PageData) => {
	const dispatch = useDispatch();
	const appSettings = useSelector((state: any) => state.appSettings, shallowEqual);
	const [isOpenTheme, setIsOpenTheme] = useState<boolean>(false);
	const [isOpenExportAll, setIsOpenExportAll] = useState<boolean>(false);
	return (
		<IonPage>
			<ChooseThemeModal {...props.modalPropsMaker(isOpenTheme, setIsOpenTheme)} />
			<ExportAllData {...props.modalPropsMaker(isOpenExportAll, setIsOpenExportAll)} />
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
					<IonItem button={true} onClick={() => setIsOpenTheme(true)}>
						<IonLabel>Change Theme</IonLabel>
						<IonNote slot="end" color="primary" style={ { color: "var(--ion-color-primary"} } >{appSettings.theme || "Default"}</IonNote>
					</IonItem>
					<IonItem button={true} onClick={() => setIsOpenExportAll(true)}>
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
