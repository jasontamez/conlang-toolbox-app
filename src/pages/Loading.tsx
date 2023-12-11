import React from 'react';
import {
	IonPage,
	IonContent,
	IonSpinner,
	IonText
} from '@ionic/react';

const Loading = () => {
	return (
		<IonPage>
			<IonContent id="loadingPage">
				<div>
					<IonText color="primary"><h1>Loading</h1></IonText>
					<IonSpinner name="bubbles" color="secondary" />
				</div>
			</IonContent>
		</IonPage>
	);
};

export default Loading;
