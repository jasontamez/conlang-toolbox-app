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
	IonMenuButton
} from '@ionic/react';
import { useSelector, useDispatch } from "react-redux";

import { PageData, StateObject } from '../store/types';
import { setDisableConfirms } from '../store/settingsSlice';

import ChooseThemeModal from './modals/Theme';
import ExportAllData from './modals/ExportAllData';
import SortSettingsModal from './modals/SortSettings';


const AppSettings = (props: PageData) => {
	const dispatch = useDispatch();
	const [isOpenTheme, setIsOpenTheme] = useState<boolean>(false);
	const [isOpenSort, setIsOpenSort] = useState<boolean>(false);
	const [isOpenExportAll, setIsOpenExportAll] = useState<boolean>(false);
	const {
		disableConfirms,
		theme
	} = useSelector((state: StateObject) => state.appSettings);
	return (
		<IonPage>
			<ChooseThemeModal {...props.modalPropsMaker(isOpenTheme, setIsOpenTheme)} />
			<SortSettingsModal {...props.modalPropsMaker(isOpenSort, setIsOpenSort)} />
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
					<IonItem button={true} onClick={() => setIsOpenSort(true)}>
						<IonLabel>Sort Settings</IonLabel>
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
