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

import { MSBasic, MSBool, ModalProperties, StateObject } from '../../../store/types';

import { MorphoSyntaxStorage } from '../../../components/PersistentInfo';
import yesNoAlert from '../../../components/yesNoAlert';
import toaster from '../../../components/toaster';

interface OldStyleSave extends MSBasic {
	boolStrings?: MSBool[]
}
interface MSmodalProps extends ModalProperties {
	setLoadingScreen: Function
	storedInfo: [string, OldStyleSave][]
	setStoredInfo: Function
}

const DeleteSyntaxDocModal = (props: MSmodalProps) => {
	const { isOpen, setIsOpen, setLoadingScreen, storedInfo, setStoredInfo } = props;
	const disableConfirms = useSelector((state: StateObject) => state.appSettings.disableConfirms);
	const [doAlert] = useIonAlert();
	const [doToast, undoToast] = useIonToast();
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
					message: "MorphoSyntax document deleted.",
					duration: 2500,
					position: "top",
					doToast,
					undoToast
				});
			});
		};
		if(disableConfirms) {
			handler();
		} else {
			yesNoAlert({
				header: "Are you sure?",
				message: `This will delete "${title}", and cannot be undone.`,
				cssClass: "danger",
				submit: "Yes, delete it",
				handler,
				doAlert
			});
		}
	};
	return (
		<IonModal isOpen={isOpen} onDidDismiss={() => doClose()}>
			<IonHeader>
				<IonToolbar color="primary">
					<IonTitle>Delete MorphoSyntax Document</IonTitle>
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
							<IonItem key={key} button={true} onClick={() => deleteThis(key, ms.title)}>
								<IonLabel className="ion-text-wrap">{ms.title}</IonLabel>
								<IonNote className="ion-text-wrap" slot="end" style={ { fontStyle: "italic" } }>Saved: {time.toLocaleString()}</IonNote>
							</IonItem>
						);
					}) : (
						<h1 style={ { margin: "2rem auto", textAlign: "center" } }>No Saved MorphoSyntax Documents</h1>
					)}
				</IonList>
			</IonContent>
			<IonFooter>
				<IonToolbar className={data.length > 0 ? "" : "hide"}>
					<IonButton color="warning" slot="end" onClick={() => doClose()}>
						<IonIcon icon={closeCircleOutline} slot="start" />
						<IonLabel>Cancel</IonLabel>
					</IonButton>
				</IonToolbar>
			</IonFooter>
		</IonModal>
	);
};

export default DeleteSyntaxDocModal;
