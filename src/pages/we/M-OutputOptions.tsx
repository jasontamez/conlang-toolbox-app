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
	IonSelect,
	IonSelectOption,
	IonModal,
	IonIcon,
	IonFooter
} from '@ionic/react';
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { WEOutputTypes, WEArrowTypes } from '../../components/ReduxDucksTypes';
import {
	setOutputTypeWE,
	setArrowWE
} from '../../components/ReduxDucksFuncs';
import {
	closeCircleOutline
} from 'ionicons/icons';
import { closeModal } from '../../components/ReduxDucksFuncs';
import '../App.css';

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
				<IonList>
					<IonItem className="ion-text-wrap">
						<IonLabel position="stacked">What to Display:</IonLabel>
						<IonSelect className="ion-text-wrap" interface="popover" value={settingsWE.output} onIonChange={e => dispatch(setOutputTypeWE(e.detail.value! as WEOutputTypes))}>
							<IonSelectOption className="ion-text-wrap" value="outputOnly">Output only</IonSelectOption>
							<IonSelectOption className="ion-text-wrap" value="rulesApplied">Output and Sound-Change Rules</IonSelectOption>
							<IonSelectOption className="ion-text-wrap" value="inputFirst">Input, then Output</IonSelectOption>
							<IonSelectOption className="ion-text-wrap" value="outputFirst">Output, then Input</IonSelectOption>
						</IonSelect>
					</IonItem>
					<IonItem className="ion-text-wrap">
						<IonLabel position="stacked">Output arrow style</IonLabel>
						<IonSelect className="ion-text-wrap" interface="popover" value={settingsWE.arrow} onIonChange={e => dispatch(setArrowWE(e.detail.value! as WEArrowTypes))}>
							<IonSelectOption className="ion-text-wrap" value="none">No Arrow</IonSelectOption>
							<IonSelectOption className="ion-text-wrap" value="simple">→</IonSelectOption>
							<IonSelectOption className="ion-text-wrap" value="tailed">↣</IonSelectOption>
							<IonSelectOption className="ion-text-wrap" value="stroked">⇸</IonSelectOption>
							<IonSelectOption className="ion-text-wrap" value="doubleStroke">⇻</IonSelectOption>
							<IonSelectOption className="ion-text-wrap" value="paired">⇉</IonSelectOption>
							<IonSelectOption className="ion-text-wrap" value="triplet">⇶</IonSelectOption>
							<IonSelectOption className="ion-text-wrap" value="double">⇒</IonSelectOption>
							<IonSelectOption className="ion-text-wrap" value="triple">⇛</IonSelectOption>
							<IonSelectOption className="ion-text-wrap" value="dashed">⇢</IonSelectOption>
							<IonSelectOption className="ion-text-wrap" value="open">⇾</IonSelectOption>
							<IonSelectOption className="ion-text-wrap" value="thick">⇨</IonSelectOption>
						</IonSelect>
					</IonItem>
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
