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
	IonLoading
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
	StateObject
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
	setExclamatorySentencePost
} from '../../store/wgSlice';
import useTranslator from '../../store/translationHooks';

import { CustomStorageWG } from '../../components/PersistentInfo';
import ModalWrap from "../../components/ModalWrap";
import log from '../../components/Logging';

import ExtraCharactersModal from '../modals/ExtraCharacters';
import MaybeLoadPreset from './modals/MaybeLoadPreset';
import ManageCustomInfo from './modals/CustomInfo';
import { OptCard } from "./WGinfo";

// TO-DO: Introduce other sentence types? Adjust ratios?
// [pre] sentence label [post] weight: [number]
//   []  declarative     [.]   weight: [9]
//   []  interrogative   [?]   weight: [2]
//   []  exclamatory     [!]   weight: [1]

const WGSet = (props: PageData) => {
	const [ t ] = useTranslator('wg');
	const [ tc ] = useTranslator('common');
	const dispatch = useDispatch();
	const [isOpenECM, setIsOpenECM] = useState<boolean>(false);
	const [isOpenInfo, setIsOpenInfo] = useState<boolean>(false);
	const [loadingOpen, setLoadingOpen] = useState<boolean>(false);
	const [isOpenLoadPreset, setIsOpenLoadPreset] = useState<boolean>(false);
	const [isOpenManageCustom, setIsOpenManageCustom] = useState<boolean>(false);
	const [infoModalTitles, setInfoModalTitles] = useState<string[] | null>(null);
	const { modalPropsMaker } = props;
	const {
		monosyllablesRate,
		maxSyllablesPerWord,
		characterGroupDropoff,
		syllableBoxDropoff,
		capitalizeSentences,
		declarativeSentencePre,
		declarativeSentencePost,
		interrogativeSentencePre,
		interrogativeSentencePost,
		exclamatorySentencePre,
		exclamatorySentencePost
	} = useSelector((state: StateObject) => state.wg);
	const openCustomInfoModal = () => {
		const titles: string[] = [];
		CustomStorageWG.iterate((value: unknown, title: string) => {
			titles.push(title);
			return; // Blank return keeps the loop going
		}).then(() => {
			setInfoModalTitles(titles);
			setLoadingOpen(false);
			setIsOpenManageCustom(true);
		}).catch((err: any) => {
			log(dispatch, ["WG Custom Info Modal", err]);
		});
		setLoadingOpen(true);
	};
	return (
		<IonPage>
			<MaybeLoadPreset {...modalPropsMaker(isOpenLoadPreset, setIsOpenLoadPreset)} />
			<ManageCustomInfo
				{...modalPropsMaker(isOpenManageCustom, setIsOpenManageCustom)}
				openECM={setIsOpenECM}
				titles={infoModalTitles}
				setTitles={setInfoModalTitles}
			/>
			<ExtraCharactersModal {...modalPropsMaker(isOpenECM, setIsOpenECM)} />
			<ModalWrap {...modalPropsMaker(isOpenInfo, setIsOpenInfo)}>
				<OptCard setIsOpenInfo={setIsOpenInfo} />
			</ModalWrap>
			<IonLoading
				cssClass='loadingPage'
				isOpen={loadingOpen}
				onDidDismiss={() => setLoadingOpen(false)}
				message={tc("Please wait...")}
				spinner="bubbles"
				/*duration={300000}*/
				duration={1000}
			/>
			<IonHeader>
				<IonToolbar>
					<IonButtons slot="start">
						<IonMenuButton />
					</IonButtons>
					<IonTitle>{tc("Settings")}</IonTitle>
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
					<IonItemDivider>{t("Presets and Stored Info")}</IonItemDivider>
					<IonItem lines="none" id="presetsSection">
						<div>
							<IonButton
								onClick={() => setIsOpenLoadPreset(true)}
								strong={true}
								color="secondary"
								shape="round"
							>{tc("Load Preset")}</IonButton>
							<IonButton
								onClick={() => openCustomInfoModal()}
								strong={true}
								color="tertiary"
								shape="round"
							>{t("Save/Load Custom Info")}</IonButton>
						</div>
					</IonItem>
					<IonItemDivider>{t("Word Generation Controls")}</IonItemDivider>
					<IonItem className="labelled">
						<IonLabel>{t("Rate of monosyllable words")}</IonLabel>
					</IonItem>
					<IonItem>
						<IonRange
							aria-label={t("From 0% to 100%")}
							debounce={250}
							min={0}
							max={100}
							value={monosyllablesRate}
							pin={true}
							onIonChange={(e) => dispatch(setMonosyllablesRate(e.target.value as Zero_OneHundred))}
						>
							<div slot="start">{t("Never")}</div>
							<div slot="end">{t("Always")}</div>
						</IonRange>
					</IonItem>
					<IonItem className="labelled">
						<IonLabel>{t("Maximum number of syllables per word")}</IonLabel>
					</IonItem>
					<IonItem>
						<IonRange
							aria-label={t("From 2 to 15")}
							debounce={250}
							min={2}
							max={15}
							value={maxSyllablesPerWord}
							pin={true}
							snaps={true}
							ticks={true}
							step={1}
							onIonChange={(e) => dispatch(setMaxSyllablesPerWord(e.target.value as Two_Fifteen))}
						>
							<div slot="start">2</div>
							<div slot="end">15</div>
						</IonRange>
					</IonItem>
					<IonItem className="labelled">
						<IonLabel className="ion-padding-bottom">{t("Character Group run dropoff")}</IonLabel>
					</IonItem>
					<IonItem>
						<IonRange
							aria-label={t("From 0 to 50")}
							debounce={250}
							min={0}
							max={50}
							value={characterGroupDropoff}
							pin={true}
							onIonChange={(e) => dispatch(setCharacterGroupDropoff(e.target.value as Zero_Fifty))}
						>
							<IonIcon size="small" slot="start" src="svg/flatAngle.svg" />
							<IonIcon size="small" slot="end" src="svg/steepAngle.svg" />
						</IonRange>
					</IonItem>
					<IonItem className="labelled">
						<IonLabel className="ion-padding-bottom">{t("Syllable box dropoff")}</IonLabel>
					</IonItem>
					<IonItem>
						<IonRange
							aria-label={t("From 0 to 50")}
							debounce={250}
							min={0}
							max={50}
							value={syllableBoxDropoff}
							pin={true}
							onIonChange={(e) => dispatch(setSyllableBoxDropoff(e.target.value as Zero_Fifty))}
						>
							<IonIcon size="small" slot="start" src="svg/flatAngle.svg" />
							<IonIcon size="small" slot="end" src="svg/steepAngle.svg" />
						</IonRange>
					</IonItem>
					<IonItemDivider>{t("Pseudo-text Controls")}</IonItemDivider>
					<IonItem>
						<IonToggle
							enableOnOffLabels
							aria-label={t("Capitalize sentences")}
							checked={capitalizeSentences}
							onIonChange={e => dispatch(setCapitalizeSentences(e.detail.checked))}
						>{t("Capitalize sentences")}</IonToggle>
					</IonItem>
					<IonItem className="labelled">
						<IonLabel className="ion-padding-bottom">{t("sentenceBeginning", { type: "declarative" })}</IonLabel>
					</IonItem>
					<IonItem>
						<IonInput
							aria-label={t("sentenceBeginning", { type: "declarative" })}
							inputmode="text"
							maxlength={5}
							minlength={0}
							size={3}
							value={declarativeSentencePre}
							onIonChange={(e) => dispatch(setDeclarativeSentencePre(e.target.value as string))}
						/>
					</IonItem>
					<IonItem className="labelled">
						<IonLabel className="ion-padding-bottom">{t("sentenceEnding", { type: "declarative" })}</IonLabel>
					</IonItem>
					<IonItem>
						<IonInput
							aria-label={t("sentenceEnding", { type: "declarative" })}
							inputmode="text"
							maxlength={5}
							minlength={0}
							size={3}
							value={declarativeSentencePost}
							onIonChange={(e) => dispatch(setDeclarativeSentencePost(e.target.value as string))}
						/>
					</IonItem>
					<IonItem className="labelled">
						<IonLabel className="ion-padding-bottom">{t("sentenceBeginning", { type: "interrogative" })}</IonLabel>
					</IonItem>
					<IonItem>
						<IonInput
							aria-label={t("sentenceBeginning", { type: "interrogative" })}
							inputmode="text"
							maxlength={5}
							minlength={0}
							size={3}
							value={interrogativeSentencePre}
							onIonChange={(e) => dispatch(setInterrogativeSentencePre(e.target.value as string))}
						/>
					</IonItem>
					<IonItem className="labelled">
						<IonLabel className="ion-padding-bottom">{t("sentenceEnding", { type: "interrogative" })}</IonLabel>
					</IonItem>
					<IonItem>
						<IonInput
							aria-label={t("sentenceEnding", { type: "interrogative" })}
							inputmode="text"
							maxlength={5}
							minlength={0}
							size={3}
							value={interrogativeSentencePost}
							onIonChange={(e) => dispatch(setInterrogativeSentencePost(e.target.value as string))}
						/>
					</IonItem>
					<IonItem className="labelled">
						<IonLabel className="ion-padding-bottom">{t("sentenceBeginning", { type: "exclamatory" })}</IonLabel>
					</IonItem>
					<IonItem>
						<IonInput
							aria-label={t("sentenceBeginning", { type: "exclamatory" })}
							inputmode="text"
							maxlength={5}
							minlength={0}
							size={3}
							value={exclamatorySentencePre}
							onIonChange={(e) => dispatch(setExclamatorySentencePre(e.target.value as string))}
						/>
					</IonItem>
					<IonItem className="labelled">
						<IonLabel className="ion-padding-bottom">{t("sentenceEnding", { type: "exclamatory" })}</IonLabel>
					</IonItem>
					<IonItem>
						<IonInput
							aria-label={t("sentenceEnding", { type: "exclamatory" })}
							inputmode="text"
							maxlength={5}
							minlength={0}
							size={3}
							value={exclamatorySentencePost}
							onIonChange={(e) => dispatch(setExclamatorySentencePost(e.target.value as string))}
						/>
					</IonItem>
				</IonList>
			</IonContent>
		</IonPage>
	);
};

export default WGSet;
