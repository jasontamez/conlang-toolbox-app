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

import { MSState, MSBool, ModalProperties, StateObject, SetBooleanState, SetState } from '../../../store/types';
import useTranslator from '../../../store/translationHooks';

import { MorphoSyntaxStorage } from '../../../components/PersistentInfo';
import yesNoAlert from '../../../components/yesNoAlert';
import toaster from '../../../components/toaster';

interface OldStyleSave extends MSState {
	boolStrings?: MSBool[]
}
interface MSmodalProps extends ModalProperties {
	setLoadingScreen: SetBooleanState
	storedInfo: [string, OldStyleSave][]
	setStoredInfo: SetState<[string, OldStyleSave][]>
}

const DeleteSyntaxDocModal = (props: MSmodalProps) => {
	const { isOpen, setIsOpen, setLoadingScreen, storedInfo, setStoredInfo } = props;
	const [ t ] = useTranslator('ms');
	const [ tc ] = useTranslator('common');
	const disableConfirms = useSelector((state: StateObject) => state.appSettings.disableConfirms);
	const [doAlert] = useIonAlert();
	const toast = useIonToast();
	const data = (storedInfo && storedInfo.length > 0) ? storedInfo : [];
	const doClose = () => {
		setStoredInfo([]);
		setIsOpen(false);
	};
	const deleteThis = (key: string, title: string) => {
		const handler = () => {
			setLoadingScreen(true);
			MorphoSyntaxStorage.removeItem(key).then(() => {
				setLoadingScreen(false);
				setStoredInfo([]);
				setIsOpen(false);
				toaster({
					message: tc("thingDeleted", { thing: t("msDocument") }),
					duration: 2500,
					position: "top",
					toast
				});
			});
		};
		if(disableConfirms) {
			handler();
		} else {
			yesNoAlert({
				header: tc("deleteTitle", { title }),
				message: tc("cannotUndo"),
				cssClass: "danger",
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
					<IonTitle>{tc("deleteThing", { thing: t("msDocument", { context: "formal" }) })}</IonTitle>
					<IonButtons slot="end">
						<IonButton onClick={() => doClose()}>
							<IonIcon icon={closeCircleOutline} />
						</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<IonList lines="none" className="buttonFilled">
					{data.length > 0 ? data.map((pair: [string, OldStyleSave]) => {
						const key = pair[0];
						const ms = pair[1];
						const time = new Date(ms.lastSave);
						return (
							<IonItem
								key={key}
								button={true}
								onClick={() => deleteThis(key, ms.title)}
							>
								<IonLabel className="ion-text-wrap">{ms.title}</IonLabel>
								<IonNote
									className="ion-text-wrap ital"
									slot="end"
								>{tc("SavedAt", { time: time.toLocaleString() })}</IonNote>
							</IonItem>
						);
					}) : (
						<h1>{t("No Saved MorphoSyntax Documents")}</h1>
					)}
				</IonList>
			</IonContent>
			<IonFooter>
				<IonToolbar className={data.length > 0 ? "" : "hide"}>
					<IonButton color="warning" slot="end" onClick={() => doClose()}>
						<IonIcon icon={closeCircleOutline} slot="start" />
						<IonLabel>{tc("Cancel")}</IonLabel>
					</IonButton>
				</IonToolbar>
			</IonFooter>
		</IonModal>
	);
};

export default DeleteSyntaxDocModal;
