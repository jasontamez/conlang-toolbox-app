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

import { ModalProperties, StateObject, WEPresetObject } from '../../../store/types';
import { loadStateWE } from '../../../store/weSlice';
import WEPresets from '../../../store/wePresets';
import useTranslator from '../../../store/translationHooks';

import yesNoAlert from '../../../components/yesNoAlert';
import toaster from '../../../components/toaster';

const MaybeLoadPresetModal = (props: ModalProperties) => {
	const { isOpen, setIsOpen } = props;
	const [ t ] = useTranslator('we');
	const [ tc ] = useTranslator('common');
	const dispatch = useDispatch();
	const disableConfirms = useSelector((state: StateObject) => state.appSettings.disableConfirms);
	const [doAlert] = useIonAlert();
	const toast = useIonToast();
	const maybeLoadPreset = (presetTitle: string, object: WEPresetObject) => {
		const preset = t(presetTitle);
		const handler = () => {
			const copy = {...object};
			copy.characterGroups = object.characterGroups.map(group => {
				const { title, ...etc } = group;
				return {
					...etc,
					title: t(title)
				};
			});
			copy.transforms = object.transforms.map(group => {
				const { description, ...etc } = group;
				return {
					...etc,
					description: t(description)
				};
			});
			dispatch(loadStateWE(copy));
			toaster({
				message: tc("prefixTitleLoaded", { prefix: "Preset", title: preset }),
				duration: 2500,
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
				message: tc(
					"clearOverwriteGeneralThings",
					{ things: t("allThings") }
				),
				cssClass: "danger",
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
						<IonButton onClick={() => setIsOpen(false)} aria-label={tc("Close")}>
							<IonIcon icon={closeCircleOutline} />
						</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<IonList lines="none" className="buttonFilled">
					{WEPresets.map(([title, object]) => (
						<IonItem
							key={title}
							button={true}
							onClick={() => maybeLoadPreset(title, object)}
						>
							<IonLabel>{title}</IonLabel>
						</IonItem>
					))}
				</IonList>
			</IonContent>
			<IonFooter>
				<IonToolbar>
					<IonButton
						color="danger"
						slot="end"
						onClick={() => setIsOpen(false)}
					>
						<IonIcon icon={closeCircleSharp} slot="start" />
						<IonLabel>{tc("Cancel")}</IonLabel>
					</IonButton>
				</IonToolbar>
			</IonFooter>
		</IonModal>
	);
};

export default MaybeLoadPresetModal;
