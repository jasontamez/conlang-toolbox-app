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

import WGPresets from '../../store/wgPresets';
import { WGBasic, ModalProperties } from '../../store/types';
import { loadStateWG } from '../../store/wgSlice';

import yesNoAlert from '../../components/yesNoAlert';
import toaster from '../../components/toaster';

const MaybeLoadPresetModal = (props: ModalProperties) => {
	const { isOpen, setIsOpen } = props;
	const dispatch = useDispatch();
	const [doAlert] = useIonAlert();
	const [doToast, undoToast] = useIonToast();
	const {disableConfirms} = useSelector((state: any) => state.appSettings);
	const maybeLoadPreset = (preset: string, object: WGBasic) => {
		const handler = () => {
			dispatch(loadStateWG(object));
			toaster({
				message: `Preset "${preset}" loaded.`,
				duration: 2500,
				color: "success",
				position: "top",
				doToast,
				undoToast
			});
			setIsOpen(false);
		};
		if(disableConfirms) {
			handler();
		} else {
			yesNoAlert({
				header: `Load "${preset}"?`,
				message: "This will clear and overwrite all current character groups, syllables, transformations and settings.",
				cssClass: "warning",
				submit: "Yes, load it",
				handler,
				doAlert
			});
		}
	};
	return (
		<IonModal isOpen={isOpen} onDidDismiss={() => setIsOpen(false)}>
			<IonHeader>
				<IonToolbar color="primary">
					<IonTitle>Load Preset</IonTitle>
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
						<IonItem button={true} onClick={() => maybeLoadPreset(title, object)}>
							<IonLabel>{title}</IonLabel>
						</IonItem>
					)))}
				</IonList>
			</IonContent>
			<IonFooter>
				<IonToolbar>
					<IonButton color="danger" slot="end" onClick={() => setIsOpen(false)}>
						<IonIcon icon={closeCircleSharp} slot="start" />
						<IonLabel>Cancel</IonLabel>
					</IonButton>
				</IonToolbar>
			</IonFooter>
		</IonModal>
	);
};

export default MaybeLoadPresetModal;
