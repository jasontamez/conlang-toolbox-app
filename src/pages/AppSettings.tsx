import React, { useState } from 'react';
import {
	IonLabel,
	IonPage,
	IonContent,
	IonList,
	IonItem,
	IonToggle
} from '@ionic/react';
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from 'react-i18next';

import { PageData, StateObject } from '../store/types';
import { setDisableConfirms } from '../store/settingsSlice';

import Header from '../components/Header';
import ChooseThemeModal from './modals/Theme';
import ExportAllData from './modals/ExportAllData';
import ImportData from './modals/ImportData';


const AppSettings = (props: PageData) => {
	const { modalPropsMaker } = props;
	const dispatch = useDispatch();
	const { t } = useTranslation(['common']);
	const [isOpenTheme, setIsOpenTheme] = useState<boolean>(false);
	const [isOpenExportAll, setIsOpenExportAll] = useState<boolean>(false);
	const [isOpenImport, setIsOpenImport] = useState<boolean>(false);
	const {
		disableConfirms,
		theme
	} = useSelector((state: StateObject) => state.appSettings);
	return (
		<IonPage>
			<ChooseThemeModal {...modalPropsMaker(isOpenTheme, setIsOpenTheme)} />
			<ExportAllData {...modalPropsMaker(isOpenExportAll, setIsOpenExportAll)} />
			<ImportData {...modalPropsMaker(isOpenImport, setIsOpenImport)} />
			<Header title={t("App Settings")} />
			<IonContent fullscreen>
				<IonList lines="full">
					<IonItem className="wrappableInnards">
						<IonToggle
							labelPlacement="start"
							enableOnOffLabels
							checked={disableConfirms}
							onIonChange={e => dispatch(setDisableConfirms(e.detail.checked))}
						>
							<h2>{t("Disable Confirmation Prompts")}</h2>
							<p>{t("Eliminates yes/no prompts when deleting or overwriting data.")}</p>
						</IonToggle>
					</IonItem>
					<IonItem button={true} onClick={() => setIsOpenTheme(true)}>
						<IonLabel>{t("Change Theme")}</IonLabel>
						<IonLabel slot="end" color="primary">{t(theme || "Default")}</IonLabel>
					</IonItem>
					<IonItem button={true} routerLink="/sortSettings" routerDirection="forward">
						<IonLabel>{t("Sort Settings")}</IonLabel>
					</IonItem>
					<IonItem button={true} onClick={() => setIsOpenExportAll(true)}>
						<IonLabel className="possiblyLargeLabel">
							<h2>{t("Export App Info")}</h2>
						</IonLabel>
					</IonItem>
					<IonItem button={true} onClick={() => setIsOpenImport(true)}>
						<IonLabel className="possiblyLargeLabel">
							<h2>{t("Import App Info")}</h2>
						</IonLabel>
					</IonItem>
				</IonList>
			</IonContent>
		</IonPage>
	);
};

export default AppSettings;
