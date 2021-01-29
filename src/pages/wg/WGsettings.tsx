import React from 'react';
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
	IonInput
} from '@ionic/react';
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import {
	setMonoRate,
	setMaxSyllables,
	setCategoryDropoff,
	setSyllableDropoff,
	setCapitalizeSentences,
	setDeclarativePre,
	setDeclarativePost,
	setInterrogativePre,
	setInterrogativePost,
	setExclamatoryPre,
	setExclamatoryPost,
	Zero_OneHundred,
	Two_Fifteen,
	Zero_Fifty
} from '../../components/ReduxDucks';
import '../WordGen.css';

const WGSet = () => {
	const dispatch = useDispatch();
	const settingsWG = useSelector((state: any) => state.wordgenSettings, shallowEqual);
	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					 <IonButtons slot="start">
						 <IonMenuButton />
					 </IonButtons>
					<IonTitle>Settings</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen>
				<IonList>
					<IonItemDivider>Word Generation Controls</IonItemDivider>
					<IonItem>
						<IonLabel position="stacked">Rate of monosyllable words</IonLabel>
						<IonRange min={0} max={100} value={settingsWG.monosyllablesRate} pin={true} onIonChange={e => dispatch(setMonoRate(e.detail.value! as Zero_OneHundred))}>
							<IonLabel slot="start">Never</IonLabel>
							<IonLabel slot="end">Always</IonLabel>
						</IonRange>
					</IonItem>
					<IonItem>
						<IonLabel position="stacked">Maximum number of syllables per word</IonLabel>
						<IonRange min={2} max={15} value={settingsWG.maxSyllablesPerWord} pin={true} snaps={true} ticks={true} step={1} onIonChange={e => dispatch(setMaxSyllables(e.detail.value! as Two_Fifteen))}>
							<IonLabel slot="start">2</IonLabel>
							<IonLabel slot="end">15</IonLabel>
						</IonRange>
					</IonItem>
					<IonItem>
						<IonLabel position="stacked" className="ion-padding-bottom">Category run dropoff</IonLabel>
						<IonRange min={0} max={50} value={settingsWG.categoryRunDropoff} pin={true} onIonChange={e => dispatch(setCategoryDropoff(e.detail.value! as Zero_Fifty))}>
							<IonIcon size="small" slot="start" src="svg/flatAngle.svg" />
							<IonIcon size="small" slot="end" src="svg/steepAngle.svg" />
						</IonRange>
					</IonItem>
					<IonItem>
						<IonLabel position="stacked" className="ion-padding-bottom">Syllable box dropoff</IonLabel>
						<IonRange min={0} max={50} value={settingsWG.syllableBoxDropoff} pin={true} onIonChange={e => dispatch(setSyllableDropoff(e.detail.value! as Zero_Fifty))}>
							<IonIcon size="small" slot="start" src="svg/flatAngle.svg" />
							<IonIcon size="small" slot="end" src="svg/steepAngle.svg" />
						</IonRange>
					</IonItem>
					<IonItemDivider>Pseudo-text Controls</IonItemDivider>
					<IonItem>
						<IonLabel>Capitalize sentences</IonLabel>
						<IonToggle checked={settingsWG.capitalizeSentences} onIonChange={e => dispatch(setCapitalizeSentences(e.detail.checked))} />
					</IonItem>
					<IonItem>
						<IonLabel position="stacked" className="ion-padding-bottom">Declarative sentence beginning</IonLabel>
						<IonInput inputmode="text" maxlength={5} minlength={0} size={3} value={settingsWG.declarativeSentencePre} onIonChange={e => dispatch(setDeclarativePre(e.detail.value! as string))} />
					</IonItem>
					<IonItem>
						<IonLabel position="stacked" className="ion-padding-bottom">Declarative sentence ending</IonLabel>
						<IonInput inputmode="text" maxlength={5} minlength={0} size={3} value={settingsWG.declarativeSentencePost} onIonChange={e => dispatch(setDeclarativePost(e.detail.value! as string))} />
					</IonItem>
					<IonItem>
						<IonLabel position="stacked" className="ion-padding-bottom">Interrogative sentence beginning</IonLabel>
						<IonInput inputmode="text" maxlength={5} minlength={0} size={3} value={settingsWG.interrogativeSentencePre} onIonChange={e => dispatch(setInterrogativePre(e.detail.value! as string))} />
					</IonItem>
					<IonItem>
						<IonLabel position="stacked" className="ion-padding-bottom">Interrogative sentence ending</IonLabel>
						<IonInput inputmode="text" maxlength={5} minlength={0} size={3} value={settingsWG.interrogativeSentencePost} onIonChange={e => dispatch(setInterrogativePost(e.detail.value! as string))} />
					</IonItem>
					<IonItem>
						<IonLabel position="stacked" className="ion-padding-bottom">Exclamatory sentence beginning</IonLabel>
						<IonInput inputmode="text" maxlength={5} minlength={0} size={3} value={settingsWG.exclamatorySentencePre} onIonChange={e => dispatch(setExclamatoryPre(e.detail.value! as string))} />
					</IonItem>
					<IonItem>
						<IonLabel position="stacked" className="ion-padding-bottom">Exclamatory sentence ending</IonLabel>
						<IonInput inputmode="text" maxlength={5} minlength={0} size={3} value={settingsWG.exclamatorySentencePost} onIonChange={e => dispatch(setExclamatoryPost(e.detail.value! as string))} />
					</IonItem>
				</IonList>
			</IonContent>
		</IonPage>
	);
};

export default WGSet;
