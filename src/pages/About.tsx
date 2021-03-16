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
	IonContent
} from '@ionic/react';
import {
	createSharp,
	shuffleSharp,
	bookSharp
} from 'ionicons/icons';
import { shallowEqual, useSelector } from "react-redux";
import { VERSION } from '../components/ReduxDucksConst';

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
							<IonCard button={true} routerLink="/wg/settings" routerDirection="forward">
								<IonCardHeader className="ion-text-center">
									<IonIcon icon={createSharp} />
									<IonLabel className="ion-padding-start">WordGen</IonLabel>
								</IonCardHeader>
								<IonCardContent>
									<p>This tool is for creating words according to rules you set up.</p>
									<ul>
										<li>Organize your language's sounds into groups</li>
										<li>Construct syllable formations using those groups</li>
										<li>Tweak the output through transformations</li>
										<li>Jumpstart your process with built-in presets</li>
									</ul>
								</IonCardContent>
							</IonCard>
						</IonCol>
					</IonRow>
					<IonRow>
						<IonCol>
							<IonCard button={true} routerLink="/we/input" routerDirection="forward">
								<IonCardHeader className="ion-text-center">
									<IonIcon icon={shuffleSharp} />
									<IonLabel className="ion-padding-start">WordEvolve</IonLabel>
								</IonCardHeader>
								<IonCardContent>
									<p>
										This tool is for modifying words according to rules you set up,
										mimicking the evolution of natural languages.
									</p>
									<ul>
										<li>Start with words from a language (natural or otherwise)</li>
										<li>Use standard rules to determine how they evolve</li>
										<li>Tweak the output through transformations</li>
										{/*<li>Multiple presets to get you going</li>*/}
									</ul>
								</IonCardContent>
							</IonCard>
						</IonCol>
					</IonRow>
					<IonRow>
						<IonCol>
							<IonCard button={true} routerLink="/lex/" routerDirection="forward">
								<IonCardHeader className="ion-text-center">
									<IonIcon icon={bookSharp} className="ion-align-self-center" />
									<IonLabel className="ion-padding-start ion-align-self-start">Lexicon</IonLabel>
								</IonCardHeader>
								<IonCardContent>
									<p>A place to store your conlangs.</p>
									<ul>
										<li>Store bits of information for each word, such as part of speech or definition</li>
										<li>Sort your words by any criteria</li>
										<li>Easily add words from WordGen and WordEvolve</li>
										<li>Store multiple lexicons</li>
										<li>Export your data</li>
									</ul>
								</IonCardContent>
							</IonCard>
						</IonCol>
					</IonRow>
					<IonRow>
						<IonCol></IonCol>
					</IonRow>
					<IonRow>
						<IonCol></IonCol>
					</IonRow>
					<IonRow>
						<IonCol>
							<IonCard button={true} routerLink="/lex/" routerDirection="forward">
								<IonCardHeader className="ion-text-center">
									<IonLabel className="ion-align-self-start">App Info</IonLabel>
								</IonCardHeader>
								<IonCardContent>
									<div className="ion-text-center">v.{VERSION.current}</div>
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
