import React from 'react';
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
	IonFooter,
	useIonAlert,
	useIonToast
} from '@ionic/react';
import {
	closeCircleOutline,
	closeCircleSharp
} from 'ionicons/icons';
import { useSelector, useDispatch } from "react-redux";

import WGPresets from '../../../store/wgPresets';
import { Base_WG, ModalProperties, StateObject } from '../../../store/types';
import { loadStateWG } from '../../../store/wgSlice';
import useTranslator from '../../../store/translationHooks';

import yesNoAlert from '../../../components/yesNoAlert';
import toaster from '../../../components/toaster';

const MaybeLoadPresetModal = (props: ModalProperties) => {
	const { isOpen, setIsOpen } = props;
	const dispatch = useDispatch();
	const [ t ] = useTranslator('we');
	const [ tc ] = useTranslator('common');
	const [doAlert] = useIonAlert();
	const toast = useIonToast();
	const {disableConfirms} = useSelector((state: StateObject) => state.appSettings);
	const maybeLoadPreset = (preset: string, object: Base_WG) => {
		const handler = () => {
			dispatch(loadStateWG(object));
			toaster({
				message: tc("titleLoaded", { title: preset }),
				duration: 2500,
				color: "success",
				position: "top",
				toast
			});
			setIsOpen(false);
		};
		if(disableConfirms) {
			handler();
		} else {
			yesNoAlert({
				header: tc("loadTitle", { title: preset }),
				message: tc("clearOverrideGeneralThings", { things: t("allThings") }),
				cssClass: "warning",
				submit: tc("confirmLoad"),
				handler,
				doAlert
			});
		}
	};
	return (
		<IonModal isOpen={isOpen} onDidDismiss={() => setIsOpen(false)}>
			<IonHeader>
				<IonToolbar color="primary">
					<IonTitle>{tc("Load Preset")}</IonTitle>
					<IonButtons slot="end">
						<IonButton onClick={() => setIsOpen(false)}>
							<IonIcon icon={closeCircleOutline} />
						</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<IonList lines="none" className="buttonFilled">
					{WGPresets.map((([title, object]) => (
						<IonItem key={title} button={true} onClick={() => maybeLoadPreset(title, object)}>
							<IonLabel>{title}</IonLabel>
						</IonItem>
					)))}
				</IonList>
			</IonContent>
			<IonFooter>
				<IonToolbar>
					<IonButton color="danger" slot="end" onClick={() => setIsOpen(false)}>
						<IonIcon icon={closeCircleSharp} slot="start" />
						<IonLabel>{tc("Cancel")}</IonLabel>
					</IonButton>
				</IonToolbar>
			</IonFooter>
		</IonModal>
	);
};

export default MaybeLoadPresetModal;
