import React from 'react';
import {
	IonIcon,
	IonContent,
	IonHeader,
	IonToolbar,
	IonButtons,
	IonButton,
	IonTitle,
	IonModal
} from '@ionic/react';
import { closeCircleOutline } from 'ionicons/icons';
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { closeModal } from './ReduxDucksFuncs';

const ModalWrap = (props: any) => {
	const dispatch = useDispatch();
	const modalState = useSelector((state: any) => state.modalState, shallowEqual);
	const InnerContent = props.content;
	return (
		<IonModal isOpen={modalState.InfoModal} onDidDismiss={() => dispatch(closeModal('InfoModal'))}>
			<IonHeader>
				<IonToolbar color="primary">
					<IonTitle>Info</IonTitle>
					<IonButtons slot="end">
						<IonButton onClick={() => dispatch(closeModal('InfoModal'))}>
							<IonIcon icon={closeCircleOutline} />
						</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<InnerContent />
			</IonContent>
		</IonModal>
	);
};

export default ModalWrap;
