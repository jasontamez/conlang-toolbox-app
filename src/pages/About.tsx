import React, { useState } from 'react';
import {
	IonPage,
	IonHeader,
	IonIcon,
	IonTitle,
	IonToolbar,
	IonGrid,
	IonRow,
	IonCol,
	IonCard,
	IonCardHeader,
	IonCardContent,
	IonButtons,
	IonMenuButton,
	IonContent,
	IonCardTitle
} from '@ionic/react';
import {
	globeOutline
} from 'ionicons/icons';
import { shallowEqual, useSelector } from "react-redux";

import { PageData } from '../store/types';
import { currentVersion } from '../store/blankAppState';

import { ConceptsIcon, LexiconIcon, WordEvolveIcon, WordGenIcon, MorphoSyntaxIcon } from '../components/icons';
import ExtraCharactersModal from './M-ExtraCharacters';

const Home = (props: PageData) => {
	const [isOpenECM, setIsOpenECM] = useState<boolean>(false);
	const originalTheme = useSelector((state: any) => state.appSettings.theme, shallowEqual);
	const views = useSelector((state: any) => state.viewState, shallowEqual);
	const {ms, we, wg} = views;
	const theme = originalTheme.replace(/ /g, "") + "Theme";

	return (
		<IonPage className={theme}>
			<ExtraCharactersModal {...props.modalPropsMaker(isOpenECM, setIsOpenECM)} />
			<IonHeader>
				<IonToolbar>
					 <IonButtons slot="start">
						 <IonMenuButton />
					 </IonButtons>
					<IonTitle>Conlang Toolbox</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent className="containedCards">
				<IonGrid>
					<IonRow>
						<IonCol>
							<IonCard button={true} routerLink={`/ms/${ms || "msSettings"}`} routerDirection="forward">
								<IonCardHeader className="ion-text-center">
									<MorphoSyntaxIcon />
									<IonCardTitle className="ion-padding-start">MorphoSyntax</IonCardTitle>
								</IonCardHeader>
								<IonCardContent>
									<p>This tool is for designing the basic structure of your language.</p>
									<ul>
										<li>Covers large-scale structures and small</li>
										<li>Grouped into ten sections</li>
										<li>Use as many or as little of the prompts as you like</li>
									</ul>
								</IonCardContent>
							</IonCard>
						</IonCol>
					</IonRow>
					<IonRow>
						<IonCol>
							<IonCard button={true} routerLink={`/wg/${wg || "settings"}`} routerDirection="forward">
								<IonCardHeader className="ion-text-center">
									<WordGenIcon />
									<IonCardTitle className="ion-padding-start">WordGen</IonCardTitle>
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
							<IonCard button={true} routerLink={`/we/${we || "input"}`} routerDirection="forward">
								<IonCardHeader className="ion-text-center">
									<WordEvolveIcon />
									<IonCardTitle className="ion-padding-start">WordEvolve</IonCardTitle>
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
							<IonCard button={true} routerLink="/lex" routerDirection="forward">
								<IonCardHeader className="ion-text-center">
									<LexiconIcon className="ion-align-self-center" />
									<IonCardTitle className="ion-padding-start ion-align-self-start">Lexicon</IonCardTitle>
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
						<IonCol>
							<IonCard button={true} routerLink="/wordlists" routerDirection="forward">
								<IonCardHeader className="ion-text-center">
									<ConceptsIcon className="ion-align-self-center" />
									<IonCardTitle className="ion-padding-start ion-align-self-start">Concepts</IonCardTitle>
								</IonCardHeader>
								<IonCardContent>
									<p>A small storehouse of basic meanings, useful for starting a lexicon.</p>
									<ul>
										<li>Easily add meanings to Lexicon</li>
										<li>Contains the Swadesh-100, -207 and other variants</li>
										<li>Also contains Dogolposky, Leipzig-Jakarta, and ASJP lists</li>
										<li>Create hybrid meanings for your own use</li>
									</ul>
								</IonCardContent>
							</IonCard>
						</IonCol>
					</IonRow>
					<IonRow>
						<IonCol>
							<IonCard button={true} onClick={() => setIsOpenECM(true)}>
								<IonCardHeader className="ion-text-center">
									<IonIcon icon={globeOutline} className="ion-align-self-center" />
									<IonCardTitle className="ion-padding-start ion-align-self-start">Extra Characters</IonCardTitle>
								</IonCardHeader>
								<IonCardContent>
									<p>On many pages, you'll see the Extra Characters icon at the top of the page.</p>
									<ul>
										<li>Contains hundreds of characters that may not appear on your mobile keyboard, organized according to groups such as Latin, Cyrillic, Arabic and Katakana</li>
										<li>All IPA (International Phonetic Alphabet) characters grouped together</li>
										<li>Save your often-used characters to the Favorites section for easy access</li>
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
						<IonCol></IonCol>
					</IonRow>
					<IonRow>
						<IonCol>
							<IonCard id="appInfo" button={true} routerLink="/appinfo" routerDirection="forward">
								<IonCardHeader className="ion-text-center">
									<IonCardTitle className="ion-align-self-start">App Info</IonCardTitle>
								</IonCardHeader>
								<IonCardContent>
									<div className="ion-text-center">v.{currentVersion}</div>
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
