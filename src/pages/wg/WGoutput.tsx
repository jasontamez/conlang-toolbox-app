import React from 'react';
import {
	IonContent,
	IonPage,
	IonHeader,
	IonToolbar,
	IonMenuButton,
	IonButtons,
	IonTitle,
	IonList,
	IonButton
} from '@ionic/react';
import '../WordGen.css';

const WGOut = () => {
	let textWidthTester = document.createElement("canvas").getContext("2d");
	textWidthTester!.font = "var(--ion-default-font)";
	const determineWidth = (input: string) => {
		return Math.ceil(textWidthTester!.measureText(input).width);
	};
	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					 <IonButtons slot="start">
						 <IonMenuButton />
					 </IonButtons>
					<IonTitle>Output</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen>
				<IonList id="outerOutputPane">
					<IonButton className="collapse ion-margin-horizontal" expand="block" color="primary" strong={true} onClick={() => determineWidth("text")}>Generate</IonButton>
					<div id="outputPane">...output...</div>
				</IonList>
			</IonContent>
		</IonPage>
	);
};

export default WGOut;
