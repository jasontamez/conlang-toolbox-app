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
	const [modalState, viewState] = useSelector((state: any) => [state.modalState, state.viewState], shallowEqual);
	const InnerContent = props.content;
	const [sub, page] = props.pageInfo;
	return (
		<IonModal
			isOpen={modalState.InfoModal && viewState.lastSection === sub && viewState[sub] === page}
			onDidDismiss={() => dispatch(closeModal('InfoModal'))}
		>
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
