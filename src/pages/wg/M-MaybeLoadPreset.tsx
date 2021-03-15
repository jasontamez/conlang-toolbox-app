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
import { closeModal, loadPresetWG } from '../../components/ReduxDucksFuncs';
import fireSwal from '../../components/Swal';

const MaybeLoadPresetModal = () => {
	const dispatch = useDispatch();
	const [modalState, settings] = useSelector((state: any) => [state.modalState, state.appSettings], shallowEqual);
	const maybeLoadPreset = (preset: string) => {
		const thenFunc = (result: any) => {
			if(result.isConfirmed) {
				dispatch(loadPresetWG(preset));
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
				text: "This will clear and overwrite all current character groups, syllables, transformations and settings.",
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
						<IonButton onClick={() => dispatch(closeModal('PresetPopup'))}>
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
				</IonList>
			</IonContent>
			<IonFooter>
				<IonItem color="danger" button={true} onClick={() => dispatch(closeModal('PresetPopup'))}>
					<IonIcon icon={closeCircleSharp} slot="start" />
					<IonLabel>Cancel</IonLabel>
				</IonItem>
			</IonFooter>
		</IonModal>
	);
};

export default MaybeLoadPresetModal;
