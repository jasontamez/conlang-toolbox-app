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
} from '@ionic/react';
import {
	closeCircleOutline
} from 'ionicons/icons';
import { useSelector, useDispatch } from "react-redux";

import { MSState, MSBool, ModalProperties, StateObject, SetState } from '../../../store/types';
import { loadStateMS } from '../../../store/msSlice';
import useTranslator from '../../../store/translationHooks';

import yesNoAlert from '../../../components/yesNoAlert';


interface MSmodalProps extends ModalProperties {
	storedInfo: [string, MSState][]
	setStoredInfo: SetState<[string, MSState][]>
}
interface OldStyleSave extends MSState {
	boolStrings?: MSBool[]
}

const LoadMSModal = (props: MSmodalProps) => {
	const { isOpen, setIsOpen, storedInfo, setStoredInfo } = props;
	const [ t ] = useTranslator('ms');
	const [ tc ] = useTranslator('common');
	const dispatch = useDispatch();
	const disableConfirms = useSelector((state: StateObject) => state.appSettings.disableConfirms);
	const [doAlert] = useIonAlert();
	const data = (storedInfo && storedInfo.length > 0) ? storedInfo : [];
	const doClose = () => {
		setStoredInfo([]);
		setIsOpen(false);
	};
	const loadThis = (key: string) => {
		data.every((pair: [string, OldStyleSave]) => {
			if(pair[0] !== key) {
				// Continue the loop
				return true;
			}
			const handler = () => {
				const {boolStrings, ...newObj} = pair[1];
				boolStrings && boolStrings.forEach((s) => (newObj[s as MSBool] = true));
				dispatch(loadStateMS(newObj));
				setIsOpen(false);
			};
			if(disableConfirms) {
				handler();
			} else {
				yesNoAlert({
					header: tc("areYouSure"),
					message: tc("clearOverrideGeneralThings", { things: t("your current MorphoSyntax information") }),
					cssClass: "warning",
					submit: tc("confirmLoad"),
					handler,
					doAlert
				});
			}
			// End loop
			return false;
		});
	};
	return (
		<IonModal isOpen={isOpen} onDidDismiss={() => doClose()}>
			<IonHeader>
				<IonToolbar color="primary">
					<IonTitle>{tc("loadThing", { thing: t("msDocument") })}</IonTitle>
					<IonButtons slot="end">
						<IonButton onClick={() => doClose()}>
							<IonIcon icon={closeCircleOutline} />
						</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<IonList lines="none" className="buttonFilled">
					{data.length > 0 ? data.map((pair: [string, MSState]) => {
						const key = pair[0];
						const ms = pair[1];
						const time = new Date(ms.lastSave);
						return (
							<IonItem key={key} button={true} onClick={() => loadThis(key)}>
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

export default LoadMSModal;
