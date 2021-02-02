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
	IonModal
} from '@ionic/react';
import {
	closeCircleOutline,
	closeCircleSharp
} from 'ionicons/icons';
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import '../WordGen.css';
import { closeModal, loadPreset } from '../../components/ReduxDucksFuncs';
import fireSwal from '../../components/Swal';

const MaybeLoadPresetModal = () => {
	const dispatch = useDispatch();
	const state = useSelector((state: any) => state, shallowEqual);
	const modalState = state.modalState;
	const cancelLoadPreset = () => {
		dispatch(closeModal('PresetPopup'));
	};
	const settings = state.appSettings;
	const maybeLoadPreset = (preset: string) => {
		const thenFunc = (result: any) => {
			if(result.isConfirmed) {
				dispatch(loadPreset(preset));
				fireSwal({
					title: "Preset \"" + preset + "\" loaded",
					toast: true,
					timer: 2500,
					timerProgressBar: true,
					showConfirmButton: false
				});
				dispatch(closeModal('PresetPopup'));
			}
		};
		if(settings.disableConfirms) {
			thenFunc({isConfirmed: true});
		} else {
			fireSwal({
				title: "Load " + preset + " preset?",
				text: "This will clear and overwrite all current categories, syllables, rules and settings.",
				icon: 'warning',
				showCancelButton: true,
				confirmButtonText: "Yes, load it."
			}).then(thenFunc);
		}
	};
	return (
		<IonModal isOpen={modalState.PresetPopup} onDidDismiss={() => dispatch(closeModal('PresetPopup'))}>
			<IonHeader>
				<IonToolbar color="primary">
					<IonTitle>Load Preset</IonTitle>
					<IonButtons slot="end">
						<IonButton onClick={() => cancelLoadPreset()}>
							<IonIcon icon={closeCircleOutline} />
						</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<IonList lines="none">
					<IonItem button={true} onClick={() => maybeLoadPreset('Simple')}>
						<IonLabel>Simple</IonLabel>
					</IonItem>
					<IonItem button={true} onClick={() => maybeLoadPreset('Medium')}>
						<IonLabel>Medium</IonLabel>
					</IonItem>
					<IonItem button={true} onClick={() => maybeLoadPreset('Complex')}>
						<IonLabel>Complex</IonLabel>
					</IonItem>
					<IonItem button={true} onClick={() => maybeLoadPreset('Large Inventory')}>
						<IonLabel>Large Inventory</IonLabel>
					</IonItem>
					<IonItem button={true} onClick={() => maybeLoadPreset('Pseudo-Latin')}>
						<IonLabel>Pseudo-Latin</IonLabel>
					</IonItem>
					<IonItem button={true} onClick={() => maybeLoadPreset('Pseudo-Chinese')}>
						<IonLabel>Pseudo-Chinese</IonLabel>
					</IonItem>
					<IonItem button={true} onClick={() => maybeLoadPreset('Pseudo-English')}>
						<IonLabel>Pseudo-English</IonLabel>
					</IonItem>
					<IonItem color="danger" button={true} onClick={() => cancelLoadPreset()}>
						<IonIcon icon={closeCircleSharp} slot="start" />
						<IonLabel>Cancel</IonLabel>
					</IonItem>
				</IonList>
			</IonContent>
		</IonModal>
	);
};

export default MaybeLoadPresetModal;
