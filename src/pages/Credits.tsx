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
	IonContent,
	IonList,
	IonItem
} from '@ionic/react';
//import {
//	createSharp,
//} from 'ionicons/icons';
import { shallowEqual, useSelector } from "react-redux";

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
									<IonList className="ion-text-center">
										<IonItem>
											<IonLabel className="ion-text-center ion-text-wrap">App icon is based on <a href="https://thenounproject.com/term/toolbox/2586725/">Toolbox by Maxicons</a> from the Noun Project</IonLabel>
										</IonItem>
										<IonItem>
											<IonLabel className="ion-text-center ion-text-wrap">Globe-in-a-speech-bubble icon is based on <a href="https://thenounproject.com/term/international-languages/249165/">International Languages by Ed Piel</a> from the Noun Project</IonLabel>
										</IonItem>
										<IonItem>
											<IonLabel className="ion-text-center ion-text-wrap">WordGen and WordEvolve heavily inspired by <a href="http://www.zompist.com/gen.html">Gen</a> and <a href="https://www.zompist.com/sca2.html">SCA²</a> by Mark Rosenfelder</IonLabel>
										</IonItem>
									</IonList>
								</IonCardContent>
							</IonCard>
						</IonCol>
					</IonRow>
					<IonRow>
						<IonCol>
							<div className="ion-text-center"><a href="https://www.buymeacoffee.com/jasontank"><img src="default-blue.webp" alt="Buy Me A Coffee" style={ { height: "60px", width: "217px" } } /></a></div>
						</IonCol>
					</IonRow>
				</IonGrid>
			</IonContent>
		</IonPage>
	);
};

export default Home;
