import React, { PropsWithChildren } from 'react';
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

const ModalWrap = (props: PropsWithChildren<{isOpen: boolean, setIsOpen: Function}>) => {
	const {
		isOpen,
		setIsOpen,
		children
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
				{children}
			</IonContent>
		</IonModal>
	);
};

export default ModalWrap;
