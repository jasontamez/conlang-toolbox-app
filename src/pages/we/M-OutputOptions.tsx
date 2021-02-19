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
	IonToggle,
	IonSelect,
	IonSelectOption,
	IonModal,
	IonIcon,
	IonFooter
} from '@ionic/react';
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { WEOutputTypes } from '../../components/ReduxDucksTypes';
import {
	setOutputTypeWE,
	toggleShowChangesWE,
	toggleShowRulesWE
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
					<IonSelect className="ion-text-wrap" interface="popover" value={settingsWE.output} onIonChange={e => dispatch(setOutputTypeWE(e.detail.value! as WEOutputTypes))}>
						<IonSelectOption className="ion-text-wrap" value="single">Output, single-column</IonSelectOption>
						<IonSelectOption className="ion-text-wrap" value="multi">Output, multi-column</IonSelectOption>
						<IonSelectOption className="ion-text-wrap" value="inputFirst">Input, Output</IonSelectOption>
						<IonSelectOption className="ion-text-wrap" value="outputFirst">Output, Input</IonSelectOption>
					</IonSelect>
					<IonItem>
						<IonLabel className="ion-text-wrap">Show differences from last run</IonLabel>
						<IonToggle checked={settingsWE.showChanges} onIonChange={e => dispatch(toggleShowChangesWE(e.detail.checked))} />
					</IonItem>
					<IonItem>
						<IonLabel className="ion-text-wrap">Report which sound-change rules applied</IonLabel>
						<IonToggle checked={settingsWE.showRules} onIonChange={e => dispatch(toggleShowRulesWE(e.detail.checked))} />
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
