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
import { loadPresetWG } from '../../components/ReduxDucksFuncs';
import fireSwal from '../../components/Swal';
import { ModalProperties } from '../../components/ReduxDucksTypes';

const MaybeLoadPresetModal = (props: ModalProperties) => {
	const { isOpen, setIsOpen } = props;
	const dispatch = useDispatch();
	const settings = useSelector((state: any) => state.appSettings, shallowEqual);
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
				setIsOpen(false);
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
