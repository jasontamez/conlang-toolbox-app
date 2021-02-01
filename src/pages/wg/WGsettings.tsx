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
	IonInput,
	IonButton
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
	Zero_Fifty,
	openModal,
	clearEverything
} from '../../components/ReduxDucks';
import { $i } from '../../components/DollarSignExports';
import MaybeLoadPreset from './M-MaybeLoadPreset';
import fireSwal from '../../components/Swal';
import '../WordGen.css';

const WGSet = () => {
	const dispatch = useDispatch();
	const state = useSelector((state: any) => state, shallowEqual);
	const settingsWG = state.wordgenSettings;
	const doOnBlur = (func: Function, value: any) => {
		dispatch(func(value));
	};
	const maybeClearEverything = () => {
		fireSwal({
			title: "Clear Everything?",
			text: "This will delete all current categories, syllables and rewrite rules.",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: "Yes, clear everything."
		}).then((result: any) => {
			if(result.isConfirmed) {
				dispatch(clearEverything());
				fireSwal({
					title: "Categories, Syllables and Rules deleted.",
					toast: true,
					timer: 2500,
					timerProgressBar: true,
					showConfirmButton: false
				});
			}
		});
	};
	return (
		<IonPage>
			<MaybeLoadPreset />
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
					<IonItemDivider>Presets and Stored Info</IonItemDivider>
					<IonItem style={ { padding: "0.5em" } } lines="none">
						<div style={ { display: "flex", justifyContent: "center", alignContent: "flex-start", alignItems: "center", flexFlow: "row wrap" } }>
							<IonButton style={ { margin: "0.25em 0.5em" } } onClick={() => dispatch(openModal("PresetPopup"))} strong={true} color="secondary" shape="round">Load Preset</IonButton>
							<IonButton style={ { margin: "0.25em 0.5em" } } onClick={() => maybeClearEverything()} strong={true} color="danger" shape="round">Clear All Fields</IonButton>
							<IonButton style={ { margin: "0.25em 0.5em" } } onClick={() => maybeClearEverything()} strong={true} color="primary" shape="round">Save Custom Info</IonButton>
							<IonButton style={ { margin: "0.25em 0.5em" } } onClick={() => maybeClearEverything()} strong={true} color="warning" shape="round">Load Custom Info</IonButton>
						</div>
					</IonItem>
					<IonItemDivider>Word Generation Controls</IonItemDivider>
					<IonItem>
						<IonLabel position="stacked">Rate of monosyllable words</IonLabel>
						<IonRange min={0} max={100} value={settingsWG.monosyllablesRate} pin={true} id="monoRate" onIonBlur={() => doOnBlur(setMonoRate, $i("monoRate").value as Zero_OneHundred)}>
							<IonLabel slot="start">Never</IonLabel>
							<IonLabel slot="end">Always</IonLabel>
						</IonRange>
					</IonItem>
					<IonItem>
						<IonLabel position="stacked">Maximum number of syllables per word</IonLabel>
						<IonRange min={2} max={15} value={settingsWG.maxSyllablesPerWord} pin={true} snaps={true} ticks={true} step={1} id="maxSyllables" onIonBlur={() => doOnBlur(setMaxSyllables, $i("maxSyllables").value as Two_Fifteen)}>
							<IonLabel slot="start">2</IonLabel>
							<IonLabel slot="end">15</IonLabel>
						</IonRange>
					</IonItem>
					<IonItem>
						<IonLabel position="stacked" className="ion-padding-bottom">Category run dropoff</IonLabel>
						<IonRange min={0} max={50} value={settingsWG.categoryRunDropoff} pin={true} id="categoryDropoff" onIonBlur={() => doOnBlur(setCategoryDropoff, $i("categoryDropoff").value as Zero_Fifty)}>
							<IonIcon size="small" slot="start" src="svg/flatAngle.svg" />
							<IonIcon size="small" slot="end" src="svg/steepAngle.svg" />
						</IonRange>
					</IonItem>
					<IonItem>
						<IonLabel position="stacked" className="ion-padding-bottom">Syllable box dropoff</IonLabel>
						<IonRange min={0} max={50} value={settingsWG.syllableBoxDropoff} pin={true} id="syllableDropoff" onIonBlur={() => doOnBlur(setSyllableDropoff, $i("syllableDropoff").value as Zero_Fifty)}>
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
						<IonInput inputmode="text" maxlength={5} minlength={0} size={3} value={settingsWG.declarativeSentencePre} id="decPre" onIonBlur={() => doOnBlur(setDeclarativePre, $i("decPre").value as string)} />
					</IonItem>
					<IonItem>
						<IonLabel position="stacked" className="ion-padding-bottom">Declarative sentence ending</IonLabel>
						<IonInput inputmode="text" maxlength={5} minlength={0} size={3} value={settingsWG.declarativeSentencePost} id="decPost" onIonBlur={() => doOnBlur(setDeclarativePost, $i("decPost").value as string)} />
					</IonItem>
					<IonItem>
						<IonLabel position="stacked" className="ion-padding-bottom">Interrogative sentence beginning</IonLabel>
						<IonInput inputmode="text" maxlength={5} minlength={0} size={3} value={settingsWG.interrogativeSentencePre} id="interPre" onIonBlur={() => doOnBlur(setInterrogativePre, $i("interPre").value as string)} />
					</IonItem>
					<IonItem>
						<IonLabel position="stacked" className="ion-padding-bottom">Interrogative sentence ending</IonLabel>
						<IonInput inputmode="text" maxlength={5} minlength={0} size={3} value={settingsWG.interrogativeSentencePost} id="interPost" onIonBlur={() => doOnBlur(setInterrogativePost, $i("interPost").value as string)} />
					</IonItem>
					<IonItem>
						<IonLabel position="stacked" className="ion-padding-bottom">Exclamatory sentence beginning</IonLabel>
						<IonInput inputmode="text" maxlength={5} minlength={0} size={3} value={settingsWG.exclamatorySentencePre} id="exclPre" onIonBlur={() => doOnBlur(setExclamatoryPre, $i("exclPre").value as string)} />
					</IonItem>
					<IonItem>
						<IonLabel position="stacked" className="ion-padding-bottom">Exclamatory sentence ending</IonLabel>
						<IonInput inputmode="text" maxlength={5} minlength={0} size={3} value={settingsWG.exclamatorySentencePost} id="exclPost" onIonBlur={() => doOnBlur(setExclamatoryPost, $i("exclPost").value as string)} />
					</IonItem>
				</IonList>
			</IonContent>
		</IonPage>
	);
};

export default WGSet;
