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
	IonButton,
	IonList,
	IonItem,
	IonCardTitle
} from '@ionic/react';
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { PageData } from '../components/ReduxDucksTypes';
import { setLog } from '../components/ReduxDucksFuncs';

const AppInfo = (props: PageData) => {
	const [originalTheme, logs] = useSelector((state: any) => [state.appSettings.theme, state.logs], shallowEqual);
	const theme = originalTheme.replace(/ /g, "") + "Theme";
	const dispatch = useDispatch();

	return (
		<IonPage className={theme}>
			<IonHeader>
				<IonToolbar>
					 <IonButtons slot="start">
						 <IonMenuButton />
					 </IonButtons>
					<IonTitle className="ion-text-center">App Info</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent className="containedCards">
				<IonGrid>
					<IonRow>
						<IonCol>
							<IonCard>
								<IonCardHeader className="ion-text-center">
									<IonCardTitle>Notice</IonCardTitle>
								</IonCardHeader>
								<IonCardContent>
									<p>The promised "major update" hit some unexpected, major snags and won't be happening.<br /><br />However, I <strong>WILL</strong> keep incrementally updating this app.</p>
								</IonCardContent>
							</IonCard>
						</IonCol>
					</IonRow>
					<IonRow>
						<IonCol>
							<IonCard>
								<IonCardHeader className="ion-text-center">
									<IonCardTitle>Changelog</IonCardTitle>
								</IonCardHeader>
								<IonCardContent className="ion-padding-start">
									<h2><strong>0.9.4</strong></h2>
									<ul className="changelog">
										<li>Hardware back button should no longer kick you from the app without notice.</li>
										<li>Fixed some MorphoSyntax information modals that had unreachable info off the side of the screen.</li>
										<li>Added "Landau 200" to Word Lists.</li>
									</ul>
									{/*<div>To-do: Make it more intuitive to add words to Lexicon from other pages</div>
									<div>To-do: Change Lexicon and others to use swipeable items for editing, deleting, etc (if possible)</div>
									<div>To-do: Change MorphoSyntax tab bar to scroll horizontally (if possible)</div>*/}
								</IonCardContent>
							</IonCard>
						</IonCol>
					</IonRow>
					<IonRow>
						<IonCol>
							<IonCard>
								<IonCardHeader className="ion-text-center">
									<IonCardTitle className="ion-align-self-start">Credits and Acknowledgements</IonCardTitle>
								</IonCardHeader>
								<IonCardContent>
									<IonList className="ion-text-center">
										<IonItem>
											<IonLabel className="ion-text-center ion-text-wrap">App icon is based on <a href="https://thenounproject.com/term/toolbox/2586725/">Toolbox by Maxicons</a> from the Noun Project</IonLabel>
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
							<IonCard>
								<IonCardHeader className="ion-text-center">
									<IonCardTitle>Logs</IonCardTitle>
								</IonCardHeader>
								<IonCardContent>
									{logs.map((log: string, i: number) => <div key={`${i}:${log}`}><strong>{i}:</strong> {log}</div>)}
									<IonButton onClick={() => dispatch(setLog([]))}>Clear Log</IonButton>
								</IonCardContent>
							</IonCard>
						</IonCol>
					</IonRow>
					<IonRow>
						<IonCol>
							<div className="ion-text-center">Contact: <a href="mailto:jasontankapps@gmail.com">jasontankapps@gmail.com</a></div>
						</IonCol>
					</IonRow>
					<IonRow>
						<IonCol>&nbsp;</IonCol>
					</IonRow>
					<IonRow>
						<IonCol>&nbsp;</IonCol>
					</IonRow>
					<IonRow>
						<IonCol>
							<div className="ion-text-center"><a href="https://www.buymeacoffee.com/jasontank"><img src="default-blue.webp" alt="Buy Me A Coffee" style={ { height: "40px", width: "144px" } } /></a></div>
						</IonCol>
					</IonRow>
				</IonGrid>
			</IonContent>
		</IonPage>
	);
};

export default AppInfo;
