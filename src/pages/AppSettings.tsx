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
//	IonSelect,
//	IonSelectOption
} from '@ionic/react';
import { useSelector, useDispatch } from "react-redux";

import { PageData, StateObject } from '../store/types';
import { setDisableConfirms } from '../store/settingsSlice';

import ChooseThemeModal from './M-Theme';
import ExportAllData from './M-ExportAllData';


const AppSettings = (props: PageData) => {
	const dispatch = useDispatch();
	const [isOpenTheme, setIsOpenTheme] = useState<boolean>(false);
	const [isOpenExportAll, setIsOpenExportAll] = useState<boolean>(false);
	const {
		disableConfirms,
		theme,
//		sensitivity,
//		sortLanguage
	} = useSelector((state: StateObject) => state.appSettings);
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
				<IonList lines="full">
					<IonItem className="wrappableInnards">
						<IonToggle
							labelPlacement="start"
							enableOnOffLabels
							checked={disableConfirms}
							onIonChange={e => dispatch(setDisableConfirms(e.detail.checked))}
						>
							<h2>Disable Confirmation Prompts</h2>
							<p>Eliminates yes/no prompts when deleting or overwriting data.</p>
						</IonToggle>
					</IonItem>
					<IonItem button={true} onClick={() => setIsOpenTheme(true)}>
						<IonLabel>Change Theme</IonLabel>
						<IonLabel slot="end" color="primary">{theme || "Default"}</IonLabel>
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

/*

					<IonItem className="wrappableInnards">
						<IonSelect color="primary" className="ion-text-wrap settings" label="Sort Sensitivity:" value={sensitivity || "default"} onIonChange={(e) => dispatch(setSortSensitivity(e.detail.value))}>
							<IonSelectOption className="ion-text-wrap ion-text-align-right" value="base">Compare base letters only</IonSelectOption>
							<IonSelectOption className="ion-text-wrap ion-text-align-right" value="accent">Compare diacritics</IonSelectOption>
							<IonSelectOption className="ion-text-wrap ion-text-align-right" value="case">Compare upper/lowercase</IonSelectOption>
							<IonSelectOption className="ion-text-wrap ion-text-align-right" value="variant">Compare diacritics, upper/lowercase</IonSelectOption>
							<IonSelectOption className="ion-text-wrap ion-text-align-right" value="default">Default behavior for language "{sortLanguage}"</IonSelectOption>
						</IonSelect>
					</IonItem>

*/
