import React from 'react';
import {
	IonContent,
	IonHeader,
	IonToolbar,
	IonButtons,
	IonTitle,
	IonList,
	IonButton,
	IonItem,
	IonLabel,
	IonModal,
	IonIcon,
	IonFooter,
	IonRadioGroup,
	IonRadio
} from '@ionic/react';
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { WEOutputTypes } from '../../components/ReduxDucksTypes';
import {
	setOutputTypeWE
} from '../../components/ReduxDucksFuncs';
import {
	closeCircleOutline
} from 'ionicons/icons';
import { closeModal } from '../../components/ReduxDucksFuncs';

const OutputOptionsModal = () => {
	const dispatch = useDispatch();
	const [modalState, settingsWE] = useSelector((state: any) => [state.modalState, state.wordevolveSettings], shallowEqual);
	return (
		<IonModal isOpen={modalState.WEOutputOptions} onDidDismiss={() => dispatch(closeModal('WEOutputOptions'))}>
			<IonHeader>
				<IonToolbar color="primary">
					<IonTitle>Output Options</IonTitle>
					<IonButtons slot="end">
						<IonButton onClick={() => dispatch(closeModal('WEOutputOptions'))}>
							<IonIcon icon={closeCircleOutline} />
						</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<IonList lines="none">
					<IonRadioGroup value={settingsWE.output} onIonChange={e => dispatch(setOutputTypeWE(e.detail.value as WEOutputTypes))}>
						<IonItem className="ion-text-wrap">
							<IonRadio value="outputOnly" labelPlacement="end" justify="start">Output Only</IonRadio>
						</IonItem>
						<IonItem className="ion-text-wrap">
							<IonRadio value="rulesApplied" labelPlacement="end" justify="start">Output and Sound-Change Rules</IonRadio>
						</IonItem>
						<IonItem className="ion-text-wrap">
							<IonRadio value="inputFirst" labelPlacement="end" justify="start">Input, then Output</IonRadio>
						</IonItem>
						<IonItem className="ion-text-wrap">
							<IonRadio value="outputFirst" labelPlacement="end" justify="start">Output, then Input</IonRadio>
						</IonItem>
					</IonRadioGroup>
				</IonList>
			</IonContent>
			<IonFooter>
				<IonItem button={true} onClick={() => dispatch(closeModal('WEOutputOptions'))} color="success">
					<IonLabel>Done</IonLabel>
				</IonItem>
			</IonFooter>
		</IonModal>
	);
};

export default OutputOptionsModal;
