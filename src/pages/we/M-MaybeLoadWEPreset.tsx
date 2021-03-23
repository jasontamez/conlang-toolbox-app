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
	IonFooter
} from '@ionic/react';
import {
	closeCircleOutline,
	closeCircleSharp
} from 'ionicons/icons';
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { closeModal, loadPresetWE } from '../../components/ReduxDucksFuncs';
import fireSwal from '../../components/Swal';

const MaybeLoadPresetModal = () => {
	const dispatch = useDispatch();
	const [modalState, settings] = useSelector((state: any) => [state.modalState, state.appSettings], shallowEqual);
	const maybeLoadPreset = (preset: string) => {
		const thenFunc = (result: any) => {
			if(result.isConfirmed) {
				dispatch(loadPresetWE(preset));
				fireSwal({
					title: "Preset \"" + preset + "\" loaded",
					toast: true,
					timer: 2500,
					timerProgressBar: true,
					showConfirmButton: false
				});
				dispatch(closeModal('WEPresetPopup'));
			}
		};
		if(settings.disableConfirms) {
			thenFunc({isConfirmed: true});
		} else {
			fireSwal({
				title: "Load " + preset + " preset?",
				text: "This will clear and overwrite all current character groups, transformations and sound changes.",
				icon: 'warning',
				showCancelButton: true,
				confirmButtonText: "Yes, load it."
			}).then(thenFunc);
		}
	};
	return (
		<IonModal isOpen={modalState.WEPresetPopup} onDidDismiss={() => dispatch(closeModal('WEPresetPopup'))}>
			<IonHeader>
				<IonToolbar color="primary">
					<IonTitle>Load Preset</IonTitle>
					<IonButtons slot="end">
						<IonButton onClick={() => dispatch(closeModal('WEPresetPopup'))}>
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
				<IonItem color="danger" button={true} onClick={() => dispatch(closeModal('WEPresetPopup'))}>
					<IonIcon icon={closeCircleSharp} slot="start" />
					<IonLabel>Cancel</IonLabel>
				</IonItem>
			</IonFooter>
		</IonModal>
	);
};

export default MaybeLoadPresetModal;
