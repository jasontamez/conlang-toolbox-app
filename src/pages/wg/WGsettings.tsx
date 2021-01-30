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
	IonButton,
	IonActionSheet
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
	closeModal,
	loadPreset
} from '../../components/ReduxDucks';
import { Plugins } from '@capacitor/core';
import { closeCircleSharp } from 'ionicons/icons';
import fireSwal from '../../components/Swal';
import { $i } from '../../components/DollarSignExports';
import '../WordGen.css';

const WGSet = () => {
	// eslint-disable-next-line
	const { Storage } = Plugins;
	const dispatch = useDispatch();
	const state = useSelector((state: any) => state, shallowEqual);
	const settingsWG = state.wordgenSettings;
	const presetPopup = state.modalState.PresetPopup;
	const maybeLoadPreset = (preset: string) => {
		fireSwal({
			title: "Load " + preset + " preset?",
			text: "This will clear and overwrite all current categories, syllables, rules and settings.",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: "Yes, load it."
		}).then((result: any) => {
			if(result.isConfirmed) {
				dispatch(loadPreset(preset));
				fireSwal({
					title: "Preset \"" + preset + "\" loaded",
					toast: true,
					position: 'bottom',
					timer: 2500,
					timerProgressBar: true,
					showConfirmButton: false
				});
			}
		});
	};
	const doOnBlur = (func: Function, value: any) => {
		dispatch(func(value));
	};
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
					<IonItemDivider>Presets and Stored Info</IonItemDivider>
					<IonItem>
						<IonButton className="ion-padding-horizontal" onClick={() => dispatch(openModal("PresetPopup"))} strong={true} color="secondary" shape="round">Load a preset</IonButton>
						<IonActionSheet
							isOpen={presetPopup}
							onDidDismiss={() => dispatch(closeModal("PresetPopup"))}
							cssClass="presetPopup"
							buttons={[
								{
									text: "Simple",
									handler: () => maybeLoadPreset("Simple")
								},
								{
									text: "Latinate",
									handler: () => maybeLoadPreset("Latinate")
								},
								{
									text: "Chinese",
									handler: () => maybeLoadPreset("Chinese")
								},
								{
									text: "Large Inventory",
									handler: () => maybeLoadPreset("Large Inventory")
								},
								{
									text: "Complex",
									handler: () => maybeLoadPreset("Complex")
								},
								{
									text: "Cancel",
									role: "cancel",
									icon: closeCircleSharp,
									handler: () => {}
								},
							]}
						/>
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
