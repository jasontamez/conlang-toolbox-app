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

const Home = (props: PageData) => {
	const [isOpenECM, setIsOpenECM] = useState<boolean>(false);
	const [isOpenConcepts, setIsOpenConcepts] = useState<boolean>(false);
	const [isOpenLexicon, setIsOpenLexicon] = useState<boolean>(false);
	const originalTheme = useSelector((state: StateObject) => state.appSettings.theme);
	const lastViewMS = useSelector((state: StateObject) => state.internals.lastViewMS);
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
							<IonButton size="large" routerLink={"/ms/" + lastViewMS} routerDirection="forward">
								<MorphoSyntaxIcon slot="start" />
								<IonLabel>MorphoSyntax</IonLabel>
							</IonButton>
						</IonCol>
					</IonRow>
					<IonRow>
						<IonCol>
							{appPagesObject.ms.filter(obj => !obj.hidden).map(obj => {
								const { url, tab, icon, Icon, noIcon } = obj;
								return (
									<IonButton routerLink={url} routerDirection="forward" key={"msBtn-" + tab}>
										{Icon ? <Icon /> : (icon ? <IonIcon icon={icon} /> : <IonLabel>p.{noIcon}</IonLabel>)}
									</IonButton>
								);
							})}
							<IonButton routerLink="/ms/overview" className="help" routerDirection="forward">
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
							<IonButton size="large" routerLink="/dj/overview" routerDirection="forward">
								<DeclenjugatorIcon slot="start" />
								<IonLabel>Declenjugator</IonLabel>
							</IonButton>
						</IonCol>
					</IonRow>
					<IonRow>
						<IonCol>
							{appPagesObject.dj.filter(obj => !obj.hidden).map((obj, i) => {
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
