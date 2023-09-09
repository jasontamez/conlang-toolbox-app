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
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { loadPresetWG } from '../../components/ReduxDucksFuncs';
import { ModalProperties } from '../../components/ReduxDucksTypes';
import yesNoAlert from '../../components/yesNoAlert';
import toaster from '../../components/toaster';

const MaybeLoadPresetModal = (props: ModalProperties) => {
	const { isOpen, setIsOpen } = props;
	const dispatch = useDispatch();
	const [doAlert] = useIonAlert();
	const [doToast, undoToast] = useIonToast();
	const settings = useSelector((state: any) => state.appSettings, shallowEqual);
	const maybeLoadPreset = (preset: string) => {
		const handler = () => {
			dispatch(loadPresetWG(preset));
			toaster({
				message: `Preset "${preset}" loaded.`,
				duration: 2500,
				color: "success",
				doToast,
				undoToast
			});
			setIsOpen(false);
		};
		if(settings.disableConfirms) {
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
					<IonItem button={true} onClick={() => maybeLoadPreset('Simple')}>
						<IonLabel>Simple</IonLabel>
					</IonItem>
					<IonItem button={true} onClick={() => maybeLoadPreset('Medium')}>
						<IonLabel>Medium</IonLabel>
					</IonItem>
					<IonItem button={true} onClick={() => maybeLoadPreset('Complex')}>
						<IonLabel>Complex</IonLabel>
					</IonItem>
					<IonItem button={true} onClick={() => maybeLoadPreset('Pseudo-Latin')}>
						<IonLabel>Pseudo-Latin</IonLabel>
					</IonItem>
					<IonItem button={true} onClick={() => maybeLoadPreset('Pseudo-Greek')}>
						<IonLabel>Pseudo-Greek</IonLabel>
					</IonItem>
					<IonItem button={true} onClick={() => maybeLoadPreset('Pseudo-Chinese')}>
						<IonLabel>Pseudo-Chinese</IonLabel>
					</IonItem>
					<IonItem button={true} onClick={() => maybeLoadPreset('Pseudo-English')}>
						<IonLabel>Pseudo-English</IonLabel>
					</IonItem>
				</IonList>
			</IonContent>
			<IonFooter>
				<IonItem color="danger" button={true} onClick={() => setIsOpen(false)}>
					<IonIcon icon={closeCircleSharp} slot="start" />
					<IonLabel>Cancel</IonLabel>
				</IonItem>
			</IonFooter>
		</IonModal>
	);
};

export default MaybeLoadPresetModal;
