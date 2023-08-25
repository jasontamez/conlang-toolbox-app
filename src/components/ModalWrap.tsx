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

const ModalWrap = (props: {isOpen: boolean, setIsOpen: Function, content: any}) => {
	const {
		content,
		isOpen,
		setIsOpen
	} = props;
	return (
		<IonModal
			isOpen={isOpen}
			onDidDismiss={() => setIsOpen(false)}
		>
			<IonHeader>
				<IonToolbar color="primary">
					<IonTitle>Info</IonTitle>
					<IonButtons slot="end">
						<IonButton onClick={() => setIsOpen(false)}>
							<IonIcon icon={closeCircleOutline} />
						</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				{content}
			</IonContent>
		</IonModal>
	);
};

export default ModalWrap;
