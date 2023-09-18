import React, { useState } from 'react';
import {
	IonContent,
	IonPage,
	IonHeader,
	IonToolbar,
	IonMenuButton,
	IonButtons,
	IonTitle,
	IonList,
	IonItem,
	IonRange,
	IonLabel,
	IonItemDivider,
	IonIcon,
	IonToggle,
	IonInput,
	IonButton,
	IonLoading,
	useIonViewDidEnter,
	useIonAlert,
	useIonToast
} from '@ionic/react';
import { useSelector, useDispatch } from "react-redux";
import {
	helpCircleOutline,
	globeOutline
} from 'ionicons/icons';

import {
	Zero_OneHundred,
	Two_Fifteen,
	Zero_Fifty,
	PageData,
} from '../../store/types';
import {
	setMonosyllablesRate,
	setMaxSyllablesPerWord,
	setCharacterGroupDropoff,
	setSyllableBoxDropoff,
	setCapitalizeSentences,
	setDeclarativeSentencePre,
	setDeclarativeSentencePost,
	setInterrogativeSentencePre,
	setInterrogativeSentencePost,
	setExclamatorySentencePre,
	setExclamatorySentencePost,
	loadStateWG
} from '../../store/wgSlice';

import {
	changeView
} from '../../components/ReduxDucksFuncs';
import { CustomStorageWG } from '../../components/PersistentInfo';
import yesNoAlert from '../../components/yesNoAlert';
import toaster from '../../components/toaster';
import ModalWrap from "../../components/ModalWrap";

import ExtraCharactersModal from '../M-ExtraCharacters';
import MaybeLoadPreset from './M-MaybeLoadPreset';
import ManageCustomInfo from './M-CustomInfo';
import { OptCard } from "./WGCards";

const WGSet = (props: PageData) => {
	const dispatch = useDispatch();
	const [isOpenECM, setIsOpenECM] = useState<boolean>(false);
	const [isOpenInfo, setIsOpenInfo] = useState<boolean>(false);
	const [loadingOpen, setLoadingOpen] = useState<boolean>(false);
	const [isOpenLoadPreset, setIsOpenLoadPreset] = useState<boolean>(false);
	const [isOpenManageCustom, setIsOpenManageCustom] = useState<boolean>(false);
	const [infoModalTitles, setInfoModalTitles] = useState<string[] | null>(null);
	const { modalPropsMaker } = props;
	const viewInfo = ['wg', 'settings'];
	useIonViewDidEnter(() => {
		dispatch(changeView(viewInfo));
	});
	const { disableConfirms }= useSelector((state: any) => state.appSettings);
	const {
		monosyllablesRate,
		maxSyllablesPerWord,
		charGroupRunDropoff,
		syllableBoxDropoff,
		capitalizeSentences,
		declarativeSentencePre,
		declarativeSentencePost,
		interrogativeSentencePre,
		interrogativeSentencePost,
		exclamatorySentencePre,
		exclamatorySentencePost
	} = useSelector((state: any) => state.wg);
	const [doAlert] = useIonAlert();
	const [doToast, undoToast] = useIonToast();
	const doOnBlur = (func: Function, value: any) => {
		dispatch(func(value));
	};
	const maybeClearEverything = () => {
		const handler = () => {
			dispatch(loadStateWG(null));
			toaster({
				message: "Character Groups, Syllables and Transformations have been deleted, and the other settings have been reset.",
				duration: 2500,
				color: "danger",
				position: "top",
				doToast,
				undoToast
			});
		};
		if(disableConfirms) {
			handler();
		} else {
			yesNoAlert({
				header: "Clear Everything?",
				message: "This will delete all current character groups, syllables and transformations, and reset all values on this page to their default values.",
				cssClass: "warning",
				submit: "Yes, clear everything",
				handler,
				doAlert
			});
		}
	};
	const openCustomInfoModal = () => {
		const titles: string[] = [];
		CustomStorageWG.iterate((value: any, title: string) => {
			titles.push(title);
			return; // Blank return keeps the loop going
		}).then(() => {
			setInfoModalTitles(titles);
			setLoadingOpen(false);
			setIsOpenManageCustom(true);
		}).catch((err: any) => {
			console.log(err);
		});
		setLoadingOpen(true);
	};
	return (
		<IonPage>
			<MaybeLoadPreset {...props.modalPropsMaker(isOpenLoadPreset, setIsOpenLoadPreset)} />
			<ManageCustomInfo {...props.modalPropsMaker(isOpenManageCustom, setIsOpenManageCustom)} openECM={setIsOpenECM} titles={infoModalTitles} setTitles={setInfoModalTitles} />
			<ExtraCharactersModal {...modalPropsMaker(isOpenECM, setIsOpenECM)} />
			<ModalWrap {...modalPropsMaker(isOpenInfo, setIsOpenInfo)}><OptCard /></ModalWrap>
			<IonLoading
				cssClass='loadingPage'
				isOpen={loadingOpen}
				onDidDismiss={() => setLoadingOpen(false)}
				message={'Please wait...'}
				spinner="bubbles"
				/*duration={300000}*/
				duration={1000}
			/>
			<IonHeader>
				<IonToolbar>
					 <IonButtons slot="start">
						 <IonMenuButton />
					 </IonButtons>
					<IonTitle>Settings</IonTitle>
					<IonButtons slot="end">
						<IonButton onClick={() => setIsOpenECM(true)}>
							<IonIcon icon={globeOutline} />
						</IonButton>
						<IonButton onClick={() => setIsOpenInfo(true)}>
							<IonIcon icon={helpCircleOutline} />
						</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen>
				<IonList className="hasSpecialLabels" lines="full">
					<IonItemDivider>Presets and Stored Info</IonItemDivider>
					<IonItem style={ { padding: "0.5em" } } lines="none">
						<div style={ { display: "flex", justifyContent: "center", alignContent: "flex-start", alignItems: "center", flexFlow: "row wrap" } }>
							<IonButton style={ { margin: "0.25em 0.5em" } } onClick={() => setIsOpenLoadPreset(true)} strong={true} color="secondary" shape="round">Load Preset</IonButton>
							<IonButton style={ { margin: "0.25em 0.5em" } } onClick={() => maybeClearEverything()} strong={true} color="danger" shape="round">Clear All Fields</IonButton>
							<IonButton style={ { margin: "0.25em 0.5em" } } onClick={() => openCustomInfoModal()} strong={true} color="secondary" shape="round">Save/Load Custom Info</IonButton>
						</div>
					</IonItem>
					<IonItemDivider>Word Generation Controls</IonItemDivider>
					<IonItem className="labelled">
						<IonLabel>Rate of monosyllable words</IonLabel>
					</IonItem>
					<IonItem>
						<IonRange aria-label="From 0% to 100%" debounce={250} min={0} max={100} value={monosyllablesRate} pin={true} onIonChange={(e) => doOnBlur(setMonosyllablesRate, e.target.value as Zero_OneHundred)}>
							<div slot="start">Never</div>
							<div slot="end">Always</div>
						</IonRange>
					</IonItem>
					<IonItem className="labelled">
						<IonLabel>Maximum number of syllables per word</IonLabel>
					</IonItem>
					<IonItem>
						<IonRange aria-label="From 2 to 15" debounce={250} min={2} max={15} value={maxSyllablesPerWord} pin={true} snaps={true} ticks={true} step={1} onIonChange={(e) => doOnBlur(setMaxSyllablesPerWord, e.target.value as Two_Fifteen)}>
							<div slot="start">2</div>
							<div slot="end">15</div>
						</IonRange>
					</IonItem>
					<IonItem className="labelled">
						<IonLabel className="ion-padding-bottom">Character Group run dropoff</IonLabel>
					</IonItem>
					<IonItem>
						<IonRange aria-label="From 0 to 50" debounce={250} min={0} max={50} value={charGroupRunDropoff} pin={true} onIonChange={(e) => doOnBlur(setCharacterGroupDropoff, e.target.value as Zero_Fifty)}>
							<IonIcon size="small" slot="start" src="svg/flatAngle.svg" />
							<IonIcon size="small" slot="end" src="svg/steepAngle.svg" />
						</IonRange>
					</IonItem>
					<IonItem className="labelled">
						<IonLabel className="ion-padding-bottom">Syllable box dropoff</IonLabel>
					</IonItem>
					<IonItem>
						<IonRange aria-label="From 0 to 50" debounce={250} min={0} max={50} value={syllableBoxDropoff} pin={true} onIonChange={(e) => doOnBlur(setSyllableBoxDropoff, e.target.value as Zero_Fifty)}>
							<IonIcon size="small" slot="start" src="svg/flatAngle.svg" />
							<IonIcon size="small" slot="end" src="svg/steepAngle.svg" />
						</IonRange>
					</IonItem>
					<IonItemDivider>Pseudo-text Controls</IonItemDivider>
					<IonItem>
						<IonToggle enableOnOffLabels aria-label="Capitalize sentences" checked={capitalizeSentences} onIonChange={e => dispatch(setCapitalizeSentences(e.detail.checked))}>Capitalize sentences</IonToggle>
					</IonItem>
					<IonItem className="labelled">
						<IonLabel className="ion-padding-bottom">Declarative sentence beginning</IonLabel>
					</IonItem>
					<IonItem>
						<IonInput aria-label="Declarative sentence beginning" inputmode="text" maxlength={5} minlength={0} size={3} value={declarativeSentencePre} onIonChange={(e) => doOnBlur(setDeclarativeSentencePre, e.target.value as string)} />
					</IonItem>
					<IonItem className="labelled">
						<IonLabel className="ion-padding-bottom">Declarative sentence ending</IonLabel>
					</IonItem>
					<IonItem>
						<IonInput aria-label="Declarative sentence ending" inputmode="text" maxlength={5} minlength={0} size={3} value={declarativeSentencePost} onIonChange={(e) => doOnBlur(setDeclarativeSentencePost, e.target.value as string)} />
					</IonItem>
					<IonItem className="labelled">
						<IonLabel className="ion-padding-bottom">Interrogative sentence beginning</IonLabel>
					</IonItem>
					<IonItem>
						<IonInput aria-label="Interrogative sentence beginning" inputmode="text" maxlength={5} minlength={0} size={3} value={interrogativeSentencePre} onIonChange={(e) => doOnBlur(setInterrogativeSentencePre, e.target.value as string)} />
					</IonItem>
					<IonItem className="labelled">
						<IonLabel className="ion-padding-bottom">Interrogative sentence ending</IonLabel>
					</IonItem>
					<IonItem>
						<IonInput aria-label="Interrogative sentence ending" inputmode="text" maxlength={5} minlength={0} size={3} value={interrogativeSentencePost} onIonChange={(e) => doOnBlur(setInterrogativeSentencePost, e.target.value as string)} />
					</IonItem>
					<IonItem className="labelled">
						<IonLabel className="ion-padding-bottom">Exclamatory sentence beginning</IonLabel>
					</IonItem>
					<IonItem>
						<IonInput aria-label="Exclamatory sentence beginning" inputmode="text" maxlength={5} minlength={0} size={3} value={exclamatorySentencePre} onIonChange={(e) => doOnBlur(setExclamatorySentencePre, e.target.value as string)} />
					</IonItem>
					<IonItem className="labelled">
						<IonLabel className="ion-padding-bottom">Exclamatory sentence ending</IonLabel>
					</IonItem>
					<IonItem>
						<IonInput aria-label="Exclamatory sentence ending" inputmode="text" maxlength={5} minlength={0} size={3} value={exclamatorySentencePost} onIonChange={(e) => doOnBlur(setExclamatorySentencePost, e.target.value as string)} />
					</IonItem>
				</IonList>
			</IonContent>
		</IonPage>
	);
};

export default WGSet;
