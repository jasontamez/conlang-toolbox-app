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
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import {
	setMonoRateWG,
	setMaxSyllablesWG,
	setCharGroupDropoffWG,
	setSyllableDropoffWG,
	setCapitalizeSentencesWG,
	setDeclarativePreWG,
	setDeclarativePostWG,
	setInterrogativePreWG,
	setInterrogativePostWG,
	setExclamatoryPreWG,
	setExclamatoryPostWG,
	clearEverything,
	changeView
} from '../../components/ReduxDucksFuncs';
import {
	Zero_OneHundred,
	Two_Fifteen,
	Zero_Fifty,
	PageData,
} from '../../components/ReduxDucksTypes';
import {
	helpCircleOutline,
	globeOutline
} from 'ionicons/icons';
import MaybeLoadPreset from './M-MaybeLoadPreset';
import ManageCustomInfo from './M-CustomInfo';
import { CustomStorageWG } from '../../components/PersistentInfo';
import { OptCard } from "./WGCards";
import ModalWrap from "../../components/ModalWrap";
import ExtraCharactersModal from '../M-ExtraCharacters';
import yesNoAlert from '../../components/yesNoAlert';
import toaster from '../../components/toaster';

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
	const [
		settingsWG,
		settings
	] = useSelector((state: any) => [
		state.wordgenSettings,
		state.appSettings
	], shallowEqual);
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
	} = settingsWG;
	const [doAlert] = useIonAlert();
	const [doToast, undoToast] = useIonToast();
	const doOnBlur = (func: Function, value: any) => {
		dispatch(func(value));
	};
	const maybeClearEverything = () => {
		const handler = () => {
			dispatch(clearEverything());
			toaster({
				message: "Groups, Syllables and Transformations deleted.",
				duration: 2500,
				color: "danger",
				doToast,
				undoToast
			});
		};
		if(settings.disableConfirms) {
			handler();
		} else {
			yesNoAlert({
				header: "Clear Everything?",
				message: "This will delete all current character groups, syllables and transformations.",
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
						<IonRange aria-label="From 0% to 100%" debounce={250} min={0} max={100} value={monosyllablesRate} pin={true} onIonChange={(e) => doOnBlur(setMonoRateWG, e.target.value as Zero_OneHundred)}>
							<div slot="start">Never</div>
							<div slot="end">Always</div>
						</IonRange>
					</IonItem>
					<IonItem className="labelled">
						<IonLabel>Maximum number of syllables per word</IonLabel>
					</IonItem>
					<IonItem>
						<IonRange aria-label="From 2 to 15" debounce={250} min={2} max={15} value={maxSyllablesPerWord} pin={true} snaps={true} ticks={true} step={1} onIonChange={(e) => doOnBlur(setMaxSyllablesWG, e.target.value as Two_Fifteen)}>
							<div slot="start">2</div>
							<div slot="end">15</div>
						</IonRange>
					</IonItem>
					<IonItem className="labelled">
						<IonLabel className="ion-padding-bottom">Character Group run dropoff</IonLabel>
					</IonItem>
					<IonItem>
						<IonRange aria-label="From 0 to 50" debounce={250} min={0} max={50} value={charGroupRunDropoff} pin={true} onIonChange={(e) => doOnBlur(setCharGroupDropoffWG, e.target.value as Zero_Fifty)}>
							<IonIcon size="small" slot="start" src="svg/flatAngle.svg" />
							<IonIcon size="small" slot="end" src="svg/steepAngle.svg" />
						</IonRange>
					</IonItem>
					<IonItem className="labelled">
						<IonLabel className="ion-padding-bottom">Syllable box dropoff</IonLabel>
					</IonItem>
					<IonItem>
						<IonRange aria-label="From 0 to 50" debounce={250} min={0} max={50} value={syllableBoxDropoff} pin={true} onIonChange={(e) => doOnBlur(setSyllableDropoffWG, e.target.value as Zero_Fifty)}>
							<IonIcon size="small" slot="start" src="svg/flatAngle.svg" />
							<IonIcon size="small" slot="end" src="svg/steepAngle.svg" />
						</IonRange>
					</IonItem>
					<IonItemDivider>Pseudo-text Controls</IonItemDivider>
					<IonItem>
						<IonToggle enableOnOffLabels aria-label="Capitalize sentences" checked={capitalizeSentences} onIonChange={e => dispatch(setCapitalizeSentencesWG(e.detail.checked))}>Capitalize sentences</IonToggle>
					</IonItem>
					<IonItem className="labelled">
						<IonLabel className="ion-padding-bottom">Declarative sentence beginning</IonLabel>
					</IonItem>
					<IonItem>
						<IonInput aria-label="Declarative sentence beginning" inputmode="text" maxlength={5} minlength={0} size={3} value={declarativeSentencePre} onIonChange={(e) => doOnBlur(setDeclarativePreWG, e.target.value as string)} />
					</IonItem>
					<IonItem className="labelled">
						<IonLabel className="ion-padding-bottom">Declarative sentence ending</IonLabel>
					</IonItem>
					<IonItem>
						<IonInput aria-label="Declarative sentence ending" inputmode="text" maxlength={5} minlength={0} size={3} value={declarativeSentencePost} onIonChange={(e) => doOnBlur(setDeclarativePostWG, e.target.value as string)} />
					</IonItem>
					<IonItem className="labelled">
						<IonLabel className="ion-padding-bottom">Interrogative sentence beginning</IonLabel>
					</IonItem>
					<IonItem>
						<IonInput aria-label="Interrogative sentence beginning" inputmode="text" maxlength={5} minlength={0} size={3} value={interrogativeSentencePre} onIonChange={(e) => doOnBlur(setInterrogativePreWG, e.target.value as string)} />
					</IonItem>
					<IonItem className="labelled">
						<IonLabel className="ion-padding-bottom">Interrogative sentence ending</IonLabel>
					</IonItem>
					<IonItem>
						<IonInput aria-label="Interrogative sentence ending" inputmode="text" maxlength={5} minlength={0} size={3} value={interrogativeSentencePost} onIonChange={(e) => doOnBlur(setInterrogativePostWG, e.target.value as string)} />
					</IonItem>
					<IonItem className="labelled">
						<IonLabel className="ion-padding-bottom">Exclamatory sentence beginning</IonLabel>
					</IonItem>
					<IonItem>
						<IonInput aria-label="Exclamatory sentence beginning" inputmode="text" maxlength={5} minlength={0} size={3} value={exclamatorySentencePre} onIonChange={(e) => doOnBlur(setExclamatoryPreWG, e.target.value as string)} />
					</IonItem>
					<IonItem className="labelled">
						<IonLabel className="ion-padding-bottom">Exclamatory sentence ending</IonLabel>
					</IonItem>
					<IonItem>
						<IonInput aria-label="Exclamatory sentence ending" inputmode="text" maxlength={5} minlength={0} size={3} value={exclamatorySentencePost} onIonChange={(e) => doOnBlur(setExclamatoryPostWG, e.target.value as string)} />
					</IonItem>
				</IonList>
			</IonContent>
		</IonPage>
	);
};

export default WGSet;
