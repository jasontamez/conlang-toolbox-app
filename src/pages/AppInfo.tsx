import React from 'react';
import {
	IonPage,
	IonHeader,
	IonTitle,
	IonToolbar,
	IonGrid,
	IonRow,
	IonCol,
	IonLabel,
	IonCard,
	IonCardHeader,
	IonCardContent,
	IonButtons,
	IonMenuButton,
	IonContent,
	IonButton
} from '@ionic/react';
import { shallowEqual, useSelector } from "react-redux";
import { PageData } from '../components/ReduxDucksTypes';

const Warning = (props: PageData) => {
	const [originalTheme] = useSelector((state: any) => [state.appSettings.theme], shallowEqual);
	const theme = originalTheme.replace(/ /g, "") + "Theme";
	const {temp, modals, setModals, pages, setPages, history} = props;

	return (
		<IonPage className={theme}>
			<IonHeader>
				<IonToolbar>
					 <IonButtons slot="start">
						 <IonMenuButton />
						 <IonButton onClick={() => temp(modals, setModals, pages, setPages, history)}>??</IonButton>
					 </IonButtons>
					<IonTitle className="ion-text-center">App Info</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent id="aboutPage">
				<IonGrid>
					<IonRow>
						<IonCol>
							<IonCard button={false}>
								<IonCardHeader className="ion-text-center">
									<IonLabel className="ion-padding-start">Notice</IonLabel>
								</IonCardHeader>
								<IonCardContent>
									<p>The promised "major update" hit some unexpected, major snags and won't be happening.</p>
									<p>I <strong>WILL</strong> keep incrementally updating this app.</p>
									<div>Changelog</div>
									<div>Hardware back button should no longer kick you from the app without notice.</div>
									<div>Fixed some MorphoSyntax information modals that had unreachable info off the side of the screen.</div>
									<div>Added "Landau 200" to Word Lists.</div>
									<div>To-do: Make it more intuitive to add words to Lexicon from other pages</div>
									<div>To-do: Change Lexicon and others to use swipeable items for editing, deleting, etc (if possible)</div>
									<div>To-do: Change MorphoSyntax tab bar to scroll horizontally (if possible)</div>
									<div className="ion-text-center">Contact: <a href="mailto:jasontankapps@gmail.com">jasontankapps@gmail.com</a></div>
								</IonCardContent>
							</IonCard>
						</IonCol>
					</IonRow>
				</IonGrid>
			</IonContent>
		</IonPage>
	);
};

export default Warning;
