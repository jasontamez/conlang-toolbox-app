import React from 'react';
import {
	IonItem,
	IonIcon,
	IonLabel,
	IonNote,
	IonList,
	IonContent,
	IonHeader,
	IonToolbar,
	IonButtons,
	IonButton,
	IonTitle,
	IonModal,
	IonFooter,
	useIonAlert,
	useIonToast
} from '@ionic/react';
import {
	closeCircleOutline
} from 'ionicons/icons';
import { useSelector } from "react-redux";

import { LexiconState, ModalProperties, SetBooleanState, SetState, StateObject } from '../../store/types';
import useTranslator from '../../store/translationHooks';

import { LexiconStorage } from '../../components/PersistentInfo';
import yesNoAlert from '../../components/yesNoAlert';
import toaster from '../../components/toaster';

interface SavedLexProperties extends ModalProperties {
	lexInfo: [string, LexiconState][]
	setLexInfo: SetState<[string, LexiconState][]>
	setLoadingScreen: SetBooleanState
}

const DeleteLexiconModal = (props: SavedLexProperties) => {
	const { isOpen, setIsOpen, lexInfo, setLexInfo, setLoadingScreen } = props;
	const disableConfirms = useSelector((state: StateObject) => state.appSettings.disableConfirms);
	const [ t ] = useTranslator('lexicon');
	const [ tc ] = useTranslator('common');
	const [doAlert] = useIonAlert();
	const toast = useIonToast();
	const data = (lexInfo && lexInfo.length > 0) ? lexInfo : [];
	const doClose = () => {
		setLexInfo([]);
		setIsOpen(false);
	};
	const deleteThis = (key: string, title: string) => {
		const handler = () => {
			setLoadingScreen(true);
			LexiconStorage.removeItem(key).then(() => {
				setLoadingScreen(false);
				setLexInfo([]);
				setIsOpen(false);
				toaster({
					message: t("Lexicon deleted."),
					duration: 2500,
					toast
				});
			});
		};
		if(disableConfirms) {
			handler();
		} else {
			yesNoAlert({
				header: tc("deleteTitle", { title }),
				cssClass: "danger",
				message: tc("Are you sure you want to delete this? It cannot be undone."),
				submit: tc("confirmDelIt"),
				handler,
				doAlert
			});
		}
	};
	return (
		<IonModal isOpen={isOpen} onDidDismiss={() => doClose()}>
			<IonHeader>
				<IonToolbar color="primary">
					<IonTitle>{t("Delete Lexicon")}</IonTitle>
					<IonButtons slot="end">
						<IonButton onClick={() => doClose()}>
							<IonIcon icon={closeCircleOutline} />
						</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<IonList lines="none" className="buttonFilled">
					{data.length > 0 ? data.map((pair: [string, LexiconState]) => {
						const key = pair[0];
						const lex = pair[1];
						const time = new Date(lex.lastSave);
						return (
							<IonItem
								key={key}
								button={true}
								onClick={() => deleteThis(key, lex.title)}
							>
								<IonLabel
									className="ion-text-wrap"
								>
									{lex.title}
									[{t('lexitems', { count: lex.lexicon.length })}]
								</IonLabel>
								<IonNote
									className="ion-text-wrap ital"
									slot="end"
								>{tc("SavedAt", { time: time.toLocaleString() })}</IonNote>
							</IonItem>
						);
					}) : (
						<h1>{t('No Saved Lexicons')}</h1>
					)}
				</IonList>
			</IonContent>
			<IonFooter>
				<IonToolbar className={data.length > 0 ? "" : "hide"}>
					<IonButton color="warning" slot="end" onClick={() => doClose()}>
						<IonIcon icon={closeCircleOutline} slot="start" />
						<IonLabel>{tc('Cancel')}</IonLabel>
					</IonButton>
				</IonToolbar>
			</IonFooter>
		</IonModal>
	);
};

export default DeleteLexiconModal;
