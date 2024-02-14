import React from 'react';
import {
	IonPage,
	IonContent,
	IonSpinner,
	IonText
} from '@ionic/react';
import { useTranslation } from 'react-i18next';

const Loading = () => {
	const { t } = useTranslation(['common']);
	return (
		<IonPage>
			<IonContent id="loadingPage">
				<div>
					<IonText color="primary"><h1>{t("Loading")}</h1></IonText>
					<IonSpinner name="bubbles" color="secondary" />
				</div>
			</IonContent>
		</IonPage>
	);
};

export default Loading;
