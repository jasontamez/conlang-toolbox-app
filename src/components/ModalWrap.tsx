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
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';
import { SetBooleanState } from '../store/types';

const ModalWrap = (props: PropsWithChildren<{isOpen: boolean, setIsOpen: SetBooleanState}>) => {
	const {
		isOpen,
		setIsOpen,
		children
	} = props;
	const { t } = useTranslation('common');
	return (
		<IonModal
			isOpen={isOpen}
			onDidDismiss={() => setIsOpen(false)}
		>
			<IonHeader>
				<IonToolbar color="primary">
					<IonTitle>{i18n.t("Info")}</IonTitle>
					<IonButtons slot="end">
						<IonButton onClick={() => setIsOpen(false)} aria-label={t("Close")}>
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
