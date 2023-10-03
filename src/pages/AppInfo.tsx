import React, { useState } from 'react';
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
	IonList,
	IonItem,
	IonCardTitle,
	useIonAlert,
	getPlatforms,
	useIonToast
} from '@ionic/react';
import { useSelector } from "react-redux";
import { Clipboard } from '@capacitor/clipboard';

import { PageData, StateObject } from '../store/types';

import toaster from '../components/toaster';

const AppInfo = (props: PageData) => {
	const originalTheme = useSelector((state: StateObject) => state.appSettings.theme);
	const [debug, setDebug] = useState<number>(1);
	const [doAlert] = useIonAlert();
	const [doToast, undoToast] = useIonToast();
	const theme = originalTheme.replace(/ /g, "") + "Theme";

	const maybeDebug = () => {
		if(debug < 7) {
			setDebug(debug + 1);
			return;
		}
		setDebug(1);
		const info = getPlatforms().join(", ");
		doAlert({
			header: "Debug Info",
			message: info,
			cssClass: "warning",
			buttons: [
				{
					text: "Copy",
					cssClass: "submit",
					handler: () => Clipboard.write({string: info}).then(() => toaster({
						message: `Copied to clipboard`,
						position: "middle",
						duration: 1500,
						doToast,
						undoToast
					}))
				},
				{
					text: "Ok",
					role: "cancel",
					cssClass: "cancel"
				}
			]
		});
	};

	return (
		<IonPage className={theme}>
			<IonHeader>
				<IonToolbar>
					 <IonButtons slot="start">
						 <IonMenuButton />
					 </IonButtons>
					<IonTitle>App Info</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent className="containedCards">
				<IonGrid>
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
									<IonCardTitle>Changelog</IonCardTitle>
								</IonCardHeader>
								<IonCardContent className="ion-padding-start">
									<h2 className="ion-text-center" onClick={maybeDebug}><strong>v.0.9.6</strong></h2>
									<ul className="changelog">
										<li>Added sorting settings under the main Settings page. Your options are limited to the languages supported by your device, but you can create custom sorting routines to alphabetize your data if you need it. These routines can be used inside WordGen, WordEvolve and Lexicon.</li>
										<li><em>WordGen</em>
											<ul><li>Presets now use their own special sorting routine when generating a wordlist.</li></ul>
										</li>
										<li><em>WordEvolve</em>
											<ul><li>Added options to transform input to lowercase and/or sort input before applying sound changes.</li></ul>
										</li>
										<li>Numerous changes invisible to the user.</li>
									</ul>
									<h2 className="ion-text-center"><strong>v.0.9.5</strong></h2>
									<ul className="changelog">
										<li>You can now swipe left on Lexicon items, Character Groups, Transforms and Sound Changes to edit or delete them.</li>
										<li>Changed the way you export information into the Lexicon from other components. It should be more intuitive now.</li>
										<li>Changed many icons.</li>
										<li><em>MorphoSyntax</em>
											<ul><li>On smaller screens where all pages can't fit into the tab bar, you will find left and right buttons to scroll through the tabs.</li></ul>
										</li>
										<li><em>WordGen</em>
											<ul><li>When making a word list, it will make sure each word is unique. If it can't generate enough unique words, it will fail with an error message.</li></ul>
										</li>
										<li><em>Lexicon</em>
											<ul>
												<li>Added a button to the header that will toggle the Title and Description, giving you more room to look at your lexicon items when needed.</li>
												<li>If you need more space than the inline input boxes provide, tap the button at the lower right side of the screen. You'll get a pop-up with full-size inputs.</li>
												<li>You can tap on an overflowing field to see a pop-up with the full text.</li>
												<li>Made sorting options easier to find and use.</li>
												<li>Added an option to handle blank columns while sorting. The default is that they are always sorted to the end, no matter if you sort alphabetically or in reverse alphabetic order.</li>
												<li>Created a way to merge Lexicon items together. To begin, swipe right on an item and tap the button underneath. Once you have at least two marked, the merge button will appear in the lower left.
													<ul><li>This lets you import new words from WordGen, new meanings from Concepts, and merge them together without having to copy and paste.</li></ul>
												</li>
											</ul>
										</li>
										<li><em>Concepts</em>
											<ul>
												<li>Renamed the "Word Lists" component to "Concepts".</li>
												<li>Added a way to create compound meanings.</li>
											</ul>
										</li>
										<li>Many under-the-hood changes.</li>
									</ul>
									<h2 className="ion-text-center"><strong>v.0.9.4</strong></h2>
									<ul className="changelog">
										<li>Hardware back button should no longer kick you from the app without notice.</li>
										<li>Fixed some MorphoSyntax information modals that had unreachable info off the side of the screen.</li>
										<li>Added "Landau 200" to Concepts.</li>
									</ul>
								</IonCardContent>
							</IonCard>
						</IonCol>
					</IonRow>
					{/*<IonRow>
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
					</IonRow>*/}
					<IonRow>
						<IonCol>
							<div className="ion-text-center">Contact: <a href="mailto:jasontankapps@gmail.com">jasontankapps@gmail.com</a></div>
						</IonCol>
					</IonRow>
					<IonRow>
						<IonCol>
							<div className="ion-text-center" style={{paddingBottom: "1em", paddingTop: "10em"}}><a href="https://www.buymeacoffee.com/jasontank"><img src="default-blue.webp" alt="Buy Me A Coffee" style={ { height: "40px", width: "144px" } } /></a></div>
						</IonCol>
					</IonRow>
				</IonGrid>
			</IonContent>
		</IonPage>
	);
};

export default AppInfo;
