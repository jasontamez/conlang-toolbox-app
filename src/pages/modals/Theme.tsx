import React, { useCallback, useMemo, FC } from 'react';
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

import { setTheme } from '../../store/settingsSlice';
import { ThemeNames, ModalProperties, StateObject } from '../../store/types';
import useTranslator from '../../store/translationHooks';
import useI18Memo from '../../components/useI18Memo';

const themes: ThemeNames[] = [
	"Default",
	"Light",
	"Dark",
	"Solarized Light",
	"Solarized Dark"
];

const commons = [ "Cancel", "Close" ];

const ThemeModal: FC<ModalProperties> = (props) => {
	const [ t ] = useTranslator("settings");
	const tChooseTheme = useMemo(() => t("Choose a Theme"), [t]);
	const [ tCancel, tClose ] = useI18Memo(commons);

	const { isOpen, setIsOpen } = props;
	const dispatch = useDispatch();
	const { theme = "Default" } = useSelector((state: StateObject) => state.appSettings);

	const cancel = useCallback(() => { setIsOpen(false); }, [setIsOpen]);
	const changeAppTheme = useCallback((theme: ThemeNames) => {
		dispatch(setTheme(theme));
		cancel();
	}, [dispatch, cancel]);
	const themeItems = useMemo(() => themes.map((themeName) => (
		<IonItem key={themeName} button={true} onClick={() => changeAppTheme(themeName)}>
			<IonLabel>{t(themeName)}</IonLabel>
			{theme === themeName ? (<IonIcon icon={checkmarkCircleOutline} slot="end" />) : ""}
		</IonItem>
	)), [changeAppTheme, t, theme]);

	return (
		<IonModal isOpen={isOpen} onDidDismiss={cancel}>
			<IonHeader>
				<IonToolbar color="primary">
					<IonTitle>{tChooseTheme}</IonTitle>
					<IonButtons slot="end">
						<IonButton onClick={cancel} aria-label={tClose}>
							<IonIcon icon={closeCircleOutline} />
						</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<IonList lines="none" className="buttonFilled">
					{themeItems}
				</IonList>
			</IonContent>
			<IonFooter>
				<IonToolbar>
					<IonButton color="danger" slot="end" onClick={cancel}>
						<IonIcon icon={closeCircleSharp} slot="start" />
						<IonLabel>{tCancel}</IonLabel>
					</IonButton>
				</IonToolbar>
			</IonFooter>
		</IonModal>
	);
};

export default ThemeModal;
