import React, { useState } from 'react';
import {
	IonPage,
	IonIcon,
	IonGrid,
	IonRow,
	IonCol,
	IonCard,
	IonCardHeader,
	IonCardContent,
	IonContent,
	IonCardTitle,
	IonButton,
	IonLabel
} from '@ionic/react';
//import { globeOutline } from 'ionicons/icons';
import { helpCircle } from 'ionicons/icons';
import { useSelector } from "react-redux";

import { PageData, StateObject } from '../store/types';
import { currentVersion } from '../store/blankAppState';

import {
	ConceptsIcon,
	LexiconIcon,
	WordEvolveIcon,
	WordGenIcon,
	MorphoSyntaxIcon,
	DeclenjugatorIcon
} from '../components/icons';
import Header from '../components/Header';
import { appPagesObject } from '../components/appPagesInfo';
import ModalWrap from '../components/ModalWrap';
import ExtraCharactersModal from './modals/ExtraCharacters';
import { ConceptCard } from './Concepts';
import { LexCard } from './Lex';

// TO-DO: Fix "app Info" at bottom, and the AppInfo page
// TO-DO: Add 'overview' pages as help pages
//         - extra chars will need its own somehow

const Home = (props: PageData) => {
	const [isOpenECM, setIsOpenECM] = useState<boolean>(false);
	const [isOpenConcepts, setIsOpenConcepts] = useState<boolean>(false);
	const [isOpenLexicon, setIsOpenLexicon] = useState<boolean>(false);
	const originalTheme = useSelector((state: StateObject) => state.appSettings.theme);
	const theme = originalTheme.replace(/ /g, "") + "Theme";

	return (
		<IonPage className={theme}>
			<ExtraCharactersModal {...props.modalPropsMaker(isOpenECM, setIsOpenECM)} />
			<ModalWrap {...props.modalPropsMaker(isOpenConcepts, setIsOpenConcepts)}><ConceptCard /></ModalWrap>
			<ModalWrap {...props.modalPropsMaker(isOpenLexicon, setIsOpenLexicon)}><LexCard /></ModalWrap>
			<Header title="Conlang Toolbox" />
			<IonContent className="containedCards" id="about">
				<IonGrid>

					<IonRow className="major">
						<IonCol>
							<IonButton size="large" routerLink="/ms/msSettings" routerDirection="forward">
								<MorphoSyntaxIcon slot="start" />
								<IonLabel>MorphoSyntax</IonLabel>
							</IonButton>
						</IonCol>
					</IonRow>
					<IonRow>
						<IonCol>
							{appPagesObject.ms.map((obj, i) => {
								const { url, tab, icon, Icon } = obj;
								return (
									<IonButton routerLink={url} routerDirection="forward" key={"msBtn-" + tab}>
										{Icon ? <Icon /> : (icon ? <IonIcon icon={icon} /> : <IonLabel>p.{i}</IonLabel>)}
									</IonButton>
								);
							})}
							<IonButton routerLink="{url}" className="help" routerDirection="forward">
								<IonIcon icon={helpCircle} />
							</IonButton>
						</IonCol>
					</IonRow>

					<IonRow className="major">
						<IonCol>
							<IonButton size="large" routerLink="/wg/overview" routerDirection="forward">
								<WordGenIcon slot="start" />
								<IonLabel>WordGen</IonLabel>
							</IonButton>
						</IonCol>
					</IonRow>
					<IonRow>
						<IonCol>
							{appPagesObject.wg.filter(obj => !obj.hidden).map((obj, i) => {
								const { url, tab, icon, Icon } = obj;
								return (
									<IonButton routerLink={url} routerDirection="forward" key={"wgBtn-" + tab}>
										{Icon ? <Icon /> : (icon ? <IonIcon icon={icon} /> : <IonLabel>{i}</IonLabel>)}
									</IonButton>
								);
							})}
							<IonButton routerLink="/wg/overview" className="help" routerDirection="forward">
								<IonIcon icon={helpCircle} />
							</IonButton>
						</IonCol>
					</IonRow>

					<IonRow className="major">
						<IonCol>
							<IonButton size="large" routerLink="/we/overview" routerDirection="forward">
								<WordEvolveIcon slot="start" />
								<IonLabel>WordEvolve</IonLabel>
							</IonButton>
						</IonCol>
					</IonRow>
					<IonRow>
						<IonCol>
							{appPagesObject.we.filter(obj => !obj.hidden).map((obj, i) => {
								const { url, tab, icon, Icon } = obj;
								return (
									<IonButton routerLink={url} routerDirection="forward" key={"weBtn-" + tab}>
										{Icon ? <Icon /> : (icon ? <IonIcon icon={icon} /> : <IonLabel>{i}</IonLabel>)}
									</IonButton>
								);
							})}
							<IonButton routerLink="/we/overview" className="help" routerDirection="forward">
								<IonIcon icon={helpCircle} />
							</IonButton>
						</IonCol>
					</IonRow>

					<IonRow className="major">
						<IonCol>
							<IonButton size="large" routerLink="/dj/groups" routerDirection="forward">
								<DeclenjugatorIcon slot="start" />
								<IonLabel>Declenjugator</IonLabel>
							</IonButton>
						</IonCol>
					</IonRow>
					<IonRow>
						<IonCol>
							{appPagesObject.dj.map((obj, i) => {
								const { url, tab, icon, Icon } = obj;
								return (
									<IonButton routerLink={url} routerDirection="forward" key={"weBtn-" + tab}>
										{Icon ? <Icon /> : (icon ? <IonIcon icon={icon} /> : <IonLabel>{i}</IonLabel>)}
									</IonButton>
								);
							})}
							<IonButton routerLink="/dj/overview" className="help" routerDirection="forward">
								<IonIcon icon={helpCircle} />
							</IonButton>
						</IonCol>
					</IonRow>

					<IonRow className="major">
						<IonCol>
							<IonButton size="large" routerLink="/lex" routerDirection="forward">
								<LexiconIcon slot="start" />
								<IonLabel>Lexicon</IonLabel>
							</IonButton>
						</IonCol>
					</IonRow>
					<IonRow>
						<IonCol>
							<IonButton className="help" onClick={() => setIsOpenLexicon(true)}>
								<IonIcon icon={helpCircle} />
							</IonButton>
						</IonCol>
					</IonRow>

					<IonRow className="major">
						<IonCol>
							<IonButton size="large" routerLink="/wordlists" routerDirection="forward">
								<ConceptsIcon slot="start" />
								<IonLabel>Concepts</IonLabel>
							</IonButton>
						</IonCol>
					</IonRow>
					<IonRow>
						<IonCol>
							<IonButton className="help" onClick={() => setIsOpenConcepts(true)}>
								<IonIcon icon={helpCircle} />
							</IonButton>
						</IonCol>
					</IonRow>

					{/*TO-DO: Make this into a modal
					<IonRow>
						<IonCol>
							<IonCard button={true} onClick={() => setIsOpenECM(true)}>
								<IonCardHeader className="ion-text-center">
									<IonIcon icon={globeOutline} className="ion-align-self-center" />
									<IonCardTitle
										className="ion-padding-start ion-align-self-start"
									>Extra Characters</IonCardTitle>
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
					</IonRow>*/}
					<IonRow className="final">
						<IonCol>
							<IonCard
								button={true}
								routerLink="/appinfo"
								routerDirection="forward"
							>
								<IonCardHeader className="ion-text-center">
									<IonCardTitle
										className="ion-align-self-start"
									>App Info</IonCardTitle>
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
