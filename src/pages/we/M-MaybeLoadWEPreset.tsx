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
import { loadPresetWE } from '../../components/ReduxDucksFuncs';
import { ModalProperties } from '../../components/ReduxDucksTypes';
import yesNoAlert from '../../components/yesNoAlert';
import toaster from '../../components/toaster';

const MaybeLoadPresetModal = (props: ModalProperties) => {
	const { isOpen, setIsOpen } = props;
	const dispatch = useDispatch();
	const disableConfirms = useSelector((state: any) => state.appSettings.disableConfirms, shallowEqual);
	const [doAlert] = useIonAlert();
	const [doToast, undoToast] = useIonToast();
	const maybeLoadPreset = (preset: string) => {
		const handler = () => {
			dispatch(loadPresetWE(preset));
			toaster({
				message: `Preset "${preset}" loaded.`,
				duration: 2500,
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
				header: `Load "${preset}" preset?`,
				message: "This will clear and overwrite all current character groups, transformations and sound changes.",
				cssClass: "danger",
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
					<IonItem button={true} onClick={() => maybeLoadPreset('Grassmann\'s Law')}>
						<IonLabel>Grassmann's Law</IonLabel>
					</IonItem>
					<IonItem button={true} onClick={() => maybeLoadPreset('Ruki Rule')}>
						<IonLabel>Ruki Rule</IonLabel>
					</IonItem>
					<IonItem button={true} onClick={() => maybeLoadPreset('Dahl\'s Law')}>
						<IonLabel>Dahl's Law</IonLabel>
					</IonItem>
					<IonItem button={true} onClick={() => maybeLoadPreset('Ingvaeonic Nasal Spirant Law')}>
						<IonLabel>Ingvaeonic Nasal Spirant Law</IonLabel>
					</IonItem>
					<IonItem button={true} onClick={() => maybeLoadPreset('Grim\'s Law')}>
						<IonLabel>Grim's Law</IonLabel>
					</IonItem>
					<IonItem button={true} onClick={() => maybeLoadPreset('Great English Vowel Shift')}>
						<IonLabel>Great English Vowel Shift</IonLabel>
					</IonItem>
					<IonItem button={true} onClick={() => maybeLoadPreset('High German Consonant Shift')}>
						<IonLabel>High German Consonant Shift</IonLabel>
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
