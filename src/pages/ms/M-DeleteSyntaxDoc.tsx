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
	IonFooter
} from '@ionic/react';
import {
	closeCircleOutline
} from 'ionicons/icons';
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import {
	setTemporaryInfo
} from '../../components/ReduxDucksFuncs';
import { ModalProperties, MorphoSyntaxObject } from '../../components/ReduxDucksTypes';
import { MorphoSyntaxStorage } from '../../components/PersistentInfo';
import fireSwal from '../../components/Swal';

interface LexModalProps extends ModalProperties {
	setLoadingScreen: Function
}

const DeleteLexiconModal = (props: LexModalProps) => {
	const { isOpen, setIsOpen, setLoadingScreen } = props;
	const dispatch = useDispatch();
	const [settings, temp] = useSelector((state: any) => [state.appSettings, state.temporaryInfo], shallowEqual);
	const data = (temp && temp.type === "storedsyntaxes" && temp.data.length > 0) ? temp.data : undefined;
	const doClose = () => {
		dispatch(setTemporaryInfo(undefined));
		setIsOpen(false);
	};
	const deleteThis = (key: string, title: string) => {
		const thenFunc = () => {
			setLoadingScreen(true);
			MorphoSyntaxStorage.removeItem(key).then(() => {
				setLoadingScreen(false);
				dispatch(setTemporaryInfo(undefined));
				setIsOpen(false);
				fireSwal({
					title: "MorphoSyntax document deleted.",
					toast: true,
					timer: 2500,
					timerProgressBar: true,
					showConfirmButton: false
				});
			});
		};
		if(settings.disableConfirms) {
			thenFunc();
		} else {
			fireSwal({
				text: "Are you sure you want to delete \"" + title + "\"? It cannot be reversed.",
				customClass: {popup: 'dangerConfirm'},
				icon: 'warning',
				showCancelButton: true,
				confirmButtonText: "Yes, delete it."
			}).then((result: any) => result.isConfirmed && thenFunc());
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
					{data ? data.map((pair: [string, MorphoSyntaxObject]) => {
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
				<IonToolbar className={data ? "" : "hide"}>
					<IonButton color="warning" slot="end" onClick={() => doClose()}>
						<IonIcon icon={closeCircleOutline} slot="start" />
						<IonLabel>Cancel</IonLabel>
					</IonButton>
				</IonToolbar>
			</IonFooter>
		</IonModal>
	);
};

export default DeleteLexiconModal;
