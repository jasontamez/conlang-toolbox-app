import React from 'react';
import {
	IonPage,
	IonHeader,
//	IonIcon,
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
	IonContent
} from '@ionic/react';
//import {
//	createSharp,
//} from 'ionicons/icons';
import { shallowEqual, useSelector } from "react-redux";

/*
https://thenounproject.com/term/toolbox/2586725/ Toolbox by Maxicons from the Noun Project
https://thenounproject.com/term/international-languages/249165/ International Languages by Ed Piel from the Noun Project
*/

const Home = () => {
	const [originalTheme] = useSelector((state: any) => [state.appSettings.theme], shallowEqual);
	const theme = originalTheme.replace(/ /g, "") + "Theme";

	return (
		<IonPage className={theme}>
			<IonHeader>
				<IonToolbar>
					 <IonButtons slot="start">
						 <IonMenuButton />
					 </IonButtons>
					<IonTitle className="ion-text-center">Conlang Toolbox</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent id="aboutPage">
				<IonGrid>
					<IonRow>
						<IonCol></IonCol>
					</IonRow>
					<IonRow>
						<IonCol>
							<IonCard>
								<IonCardHeader className="ion-text-center">
									<IonLabel className="ion-padding-start ion-align-self-start">Credits and Acknowledgements</IonLabel>
								</IonCardHeader>
								<IonCardContent>
									<div className="ion-text-center"><a href="https://www.buymeacoffee.com/jasontank"><img src="default-blue.webp" alt="Buy Me A Coffee" style={ { height: "60px", width: "217px" } } /></a></div>
								</IonCardContent>
							</IonCard>
						</IonCol>
					</IonRow>
				</IonGrid>
			</IonContent>
		</IonPage>
	);
};

export default Home;
