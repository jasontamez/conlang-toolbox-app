import React from 'react';
import {
	IonPage,
	IonHeader,
	IonIcon,
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
import {
	settingsOutline,
	warningSharp
} from 'ionicons/icons';
import { shallowEqual, useSelector } from "react-redux";
import ExtraCharactersModal from './M-ExtraCharacters';

const Warning = () => {
	const [originalTheme] = useSelector((state: any) => [state.appSettings.theme], shallowEqual);
	const theme = originalTheme.replace(/ /g, "") + "Theme";

	return (
		<IonPage className={theme}>
			<ExtraCharactersModal />
			<IonHeader>
				<IonToolbar>
					 <IonButtons slot="start">
						 <IonMenuButton />
					 </IonButtons>
					<IonTitle className="ion-text-center">Update Coming Soon</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent id="aboutPage">
				<IonGrid>
					<IonRow>
						<IonCol>
							<IonCard button={false}>
								<IonCardHeader className="ion-text-center">
									<IonIcon icon={warningSharp} />
									<IonLabel className="ion-padding-start">Warning</IonLabel>
								</IonCardHeader>
								<IonCardContent>
									<p>This version of the app will be going away soon, replaced with a similar one with the same capacities and tools, but with some major bugs fixed.</p>
									<p>Estimated date of change: <strong>mid-September 2023</strong>. If you opted in to beta testing on Google Play, you will receive the new app about <em>two weeks sooner</em>.</p>
								</IonCardContent>
							</IonCard>
						</IonCol>
					</IonRow>
					<IonRow>
						<IonCol>
							<IonCard button={false}>
								<IonCardHeader className="ion-text-center">
									<IonIcon icon={warningSharp} />
									<IonLabel className="ion-padding-start">Save Your Data</IonLabel>
								</IonCardHeader>
								<IonCardContent>
									<p>Information saved in this app <strong>may not survive the update</strong>. I am trying to keep the transition as smooth as possible, but bugs may happen.</p>
									<p><IonButton routerLink="/settings" strong routerDirection="forward" fill="solid" size="small" color="tertiary"><IonIcon slot="start" icon={settingsOutline} />Settings</IonButton></p>
									<p>Keep your info secure by going to <strong>Settings</strong> and tapping on "Export All App Info". Copy the text inside the box and save it to a note, document, or somewhere else on your device. When the new version arrives, it will have an Import option under Settings. Use the saved text to restore your app info.</p>
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
