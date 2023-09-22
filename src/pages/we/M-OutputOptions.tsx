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
import { useSelector, useDispatch } from "react-redux";
import {
	closeCircleOutline
} from 'ionicons/icons';

import { WEOutputTypes, ModalProperties } from '../../store/types';
import { setOutputWE } from '../../store/weSlice';

const OutputOptionsModal = (props: ModalProperties) => {
	const { isOpen, setIsOpen } = props;
	const dispatch = useDispatch();
	const {
		outputStyle,
//		inputLower,
//		inputAlpha
	} = useSelector((state: any) => state.we);
	return (
		<IonModal isOpen={isOpen} onDidDismiss={() => setIsOpen(false)}>
			<IonHeader>
				<IonToolbar color="primary">
					<IonTitle>Output Options</IonTitle>
					<IonButtons slot="end">
						<IonButton onClick={() => setIsOpen(false)}>
							<IonIcon icon={closeCircleOutline} />
						</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<IonList lines="none">
					<IonRadioGroup value={outputStyle} onIonChange={e => dispatch(setOutputWE(e.detail.value as WEOutputTypes))}>
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
				<IonToolbar>
					<IonButton color="success" slot="end" onClick={() => setIsOpen(false)}>
						<IonLabel>Done</IonLabel>
					</IonButton>
				</IonToolbar>
			</IonFooter>
		</IonModal>
	);
};

export default OutputOptionsModal;
