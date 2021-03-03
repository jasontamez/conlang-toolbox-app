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
	IonItem,
	IonLabel,
	IonCard,
	IonButtons,
	IonMenuButton,
	IonLoading
} from '@ionic/react';
import {
	createSharp,
	shuffleSharp,
	bookSharp
} from 'ionicons/icons';
import { shallowEqual, useSelector } from "react-redux";


const Home = () => {
	const [originalTheme, modalState] = useSelector((state: any) => [state.appSettings.theme, state.modalState], shallowEqual);
	const theme = originalTheme.replace(/ /g, "") + "Theme";

	return (
		<IonPage className={theme}>
			<IonLoading
	        	cssClass='loadingPage pageSwitchBackground'
    	    	isOpen={modalState.loadingPage === "switchingOut"}
	        	message={'Loading...'}
				spinner="bubbles"
				duration={5000}
			/>
			<IonHeader>
				<IonToolbar>
					 <IonButtons slot="start">
						 <IonMenuButton />
					 </IonButtons>
					<IonTitle className="ion-text-center">Conlang Toolbox</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonGrid>
				<IonRow>
					<IonCol></IonCol>
				</IonRow>
				<IonRow>
					<IonCol>
						<IonCard button={true} routerLink="/wg/home" routerDirection="forward">
							<IonItem className="ion-text-center">
								<IonIcon icon={createSharp} />
								<IonLabel className="ion-padding-start">WordGen</IonLabel>
							</IonItem>
						</IonCard>
					</IonCol>
				</IonRow>
				<IonRow>
					<IonCol>
						<IonCard button={true} routerLink="/we/" routerDirection="forward">
							<IonItem className="ion-text-center">
								<IonIcon icon={shuffleSharp} />
								<IonLabel className="ion-padding-start">WordEvolve</IonLabel>
							</IonItem>
						</IonCard>
					</IonCol>
				</IonRow>
				<IonRow>
					<IonCol>
						<IonCard button={true} routerLink="/lex/" routerDirection="forward">
							<IonItem className="ion-text-center">
								<IonIcon icon={bookSharp} />
								<IonLabel className="ion-padding-start">Lexicon</IonLabel>
							</IonItem>
						</IonCard>
					</IonCol>
				</IonRow>
			</IonGrid>
		</IonPage>
	);
};

export default Home;
