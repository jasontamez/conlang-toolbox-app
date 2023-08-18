import React from 'react';
import {
	IonContent,
	IonPage,
	IonHeader,
	IonToolbar,
	IonMenuButton,
	IonButtons,
	IonButton,
	IonIcon,
	IonTitle,
	IonList,
	IonItem,
	IonLabel,
	IonTextarea,
	IonToggle,
	useIonViewDidEnter,
	IonRange
} from '@ionic/react';
import {
	helpCircleOutline,
	globeOutline,
	constructSharp,
	checkmarkDoneSharp
} from 'ionicons/icons';
import { openModal, toggleSyllables, editSyllables, changeView, setEditableSyllables, setSyllableDropoffWG, modSyllableDropoff } from '../../components/ReduxDucksFuncs';
import { AllWGSyllableObjects, WGSyllableObject, Zero_Fifty } from '../../components/ReduxDucksTypes';
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { SylCard } from "./WGCards";
import ModalWrap from "../../components/ModalWrap";
import ExtraCharactersModal from '../M-ExtraCharacters';
import { $i } from '../../components/DollarSignExports';

const WGSyl = () => {
	const dispatch = useDispatch();
	const viewInfo = ['wg', 'syllables'];
	useIonViewDidEnter(() => {
		dispatch(changeView(viewInfo));
	});
	const [syllableObject, settingsWG] = useSelector((state: any) => [state.wordgenSyllables, state.wordgenSettings], shallowEqual);
	const toggleableClassName = (base: string = "") => {
		let extra = " toggleable";
		if(syllableObject.toggle) {
			extra += " toggled";
		}
		return (base + extra).trim();
	};
	const objects = syllableObject.objects;
	const swO = objects.singleWord;
	const singleWord = swO.components.join("\n");
	const swI = objects.wordInitial;
	const wordInitial = swI.components.join("\n");
	const swM = objects.wordMiddle;
	const wordMiddle = swM.components.join("\n");
	const swF = objects.wordFinal;
	const wordFinal = swF.components.join("\n");
	const doIfEditing = (prop: keyof AllWGSyllableObjects, succ: any, fail: any) => {
		return syllableObject.editing === prop ? succ : fail;
	};
	const doAction = (prop: keyof AllWGSyllableObjects) => {
		if(syllableObject.editing === prop) {
			// Action is to save and remove editing
			let info: HTMLTextAreaElement = $i("Syl-" + prop);
			let value = info.value.trim().split(/\s*\r?\n\s*/);
			dispatch(editSyllables(prop, value.filter((v: string) => v !== "")));
			dispatch(setEditableSyllables(undefined));
		} else {
			// Action is to set editing
			dispatch(setEditableSyllables(prop));
		}
	};
	const calculateRows = (input: string) => Math.max(4, input.split(/\n/).length);
	const toggleDropoff = (prop: keyof AllWGSyllableObjects, o: WGSyllableObject) => {
		dispatch(modSyllableDropoff(prop, o.dropoffOverride !== undefined ? undefined : (settingsWG.syllableBoxDropoff as Zero_Fifty)))
	};
	return (
		<IonPage>
			<ExtraCharactersModal />
			<ModalWrap pageInfo={viewInfo} content={SylCard} />
			<IonHeader>
				<IonToolbar>
					<IonButtons slot="start">
						<IonMenuButton />
					</IonButtons>
					<IonTitle>Syllables</IonTitle>
					<IonButtons slot="end">
						<IonButton onClick={() => dispatch(openModal("ExtraCharacters"))}>
							<IonIcon icon={globeOutline} />
						</IonButton>
						<IonButton onClick={() => dispatch(openModal("InfoModal"))}>
							<IonIcon icon={helpCircleOutline} />
						</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen className="evenBackground disappearingHeaderKludgeFix">
				<IonList lines="none">
					<IonItem className="nonUnit">
						<IonLabel className="wrappableInnards belongsToBelow">
							<div><strong>Dropoff Rate</strong></div>
							<div className="minor">Syllables at the top of a box tend to be picked more often than syllables at the bottom of the box. This slider controls this tendency. A rate of zero is flat, making all syllables equiprobable.</div>
						</IonLabel>
					</IonItem>
					<IonItem>
						<IonRange min={0} max={50} value={settingsWG.syllableBoxDropoff} pin={true} id="syllableBoxDropoffC" onIonBlur={() => dispatch(setSyllableDropoffWG($i("syllableBoxDropoffC").value as Zero_Fifty))}>
							<IonIcon size="small" slot="start" src="svg/flatAngle.svg" />
							<IonIcon size="small" slot="end" src="svg/steepAngle.svg" />
						</IonRange>
					</IonItem>
					<IonItem className="ion-text-end">
						<IonLabel>Use multiple syllable types</IonLabel>
						<IonToggle checked={syllableObject.toggle} onClick={() => dispatch(toggleSyllables(!syllableObject.toggle))} />
					</IonItem>
				</IonList>
				<IonList className="syllables units" lines="none">
					<IonItem className="nonUnit">
						<div className={toggleableClassName("header reverseToggle")}>Syllables</div>
						<div className={toggleableClassName("header")}>Single-Syllable<br />Words</div>
						<IonTextarea disabled={doIfEditing("singleWord", false, true)} className="serifChars" id="Syl-singleWord" value={singleWord} rows={calculateRows(singleWord)} inputmode="text" placeholder="Use character group labels to construct syllables" />
						<div style={ { alignSelf: "center" } }>
							<IonButton color={doIfEditing("singleWord", "success", "warning")} disabled={syllableObject.editing && syllableObject.editing !== "singleWord"} onClick={e => doAction("singleWord")}>
								<IonIcon icon={doIfEditing("singleWord", checkmarkDoneSharp, constructSharp)} />
							</IonButton>
						</div>
					</IonItem>
					<IonItem className={syllableObject.toggle && syllableObject.editing === "singleWord" ? "" : "hide"}>
						<IonList lines="none" style={ { width: "100%" } }>
							<IonItem className="nonUnit ion-text-end">
								<IonLabel className="wrappableInnards"><div>Use separate dropoff rate</div></IonLabel>
								<IonToggle onClick={() => toggleDropoff("singleWord", swO)} slot="end" checked={swO.dropoffOverride !== undefined} />
							</IonItem>
							<IonItem id="singleWordDropoff" className={swO.dropoffOverride === undefined ? "hide" : "nonUnit"}>
								<IonRange min={0} max={50} pin={true} value={(swO.dropoffOverride === undefined ? settingsWG.categoryRunDropoff : swO.dropoffOverride)} id="singleWordDropoffRate" onIonBlur={() => dispatch(modSyllableDropoff("singleWord", $i("singleWordDropoffRate").value as Zero_Fifty))} debounce={250}>
									<IonIcon size="small" slot="start" src="svg/flatAngle.svg" />
									<IonIcon size="small" slot="end" src="svg/steepAngle.svg" />
								</IonRange>
							</IonItem>
						</IonList>
					</IonItem>
					<IonItem className={toggleableClassName("nonUnit")}>
						<div className="header">Word-Initial<br />Syllables</div>
						<IonTextarea disabled={doIfEditing("wordInitial", false, true)} className="serifChars" id="Syl-wordInitial" value={wordInitial} rows={calculateRows(wordInitial)} inputmode="text" placeholder="These syllables are used to begin words" />
						<div style={ { alignSelf: "center" } }>
							<IonButton color={doIfEditing("wordInitial", "success", "warning")} disabled={syllableObject.editing && syllableObject.editing !== "wordInitial"} onClick={e => doAction("wordInitial")}>
								<IonIcon icon={doIfEditing("wordInitial", checkmarkDoneSharp, constructSharp)} />
							</IonButton>
						</div>
					</IonItem>
					<IonItem className={syllableObject.editing === "wordInitial" ? "" : "hide"}>
						<IonList lines="none" style={ { width: "100%" } }>
							<IonItem className="nonUnit ion-text-end">
								<IonLabel className="wrappableInnards"><div>Use separate dropoff rate</div></IonLabel>
								<IonToggle onClick={() => toggleDropoff("wordInitial", swI)} slot="end" checked={swI.dropoffOverride !== undefined} />
							</IonItem>
							<IonItem id="wordInitialDropoff" className={swI.dropoffOverride === undefined ? "hide" : "nonUnit"}>
								<IonRange min={0} max={50} pin={true} value={(swI.dropoffOverride === undefined ? settingsWG.categoryRunDropoff : swI.dropoffOverride)} id="wordInitialDropoffRate" onIonBlur={() => dispatch(modSyllableDropoff("wordInitial", $i("wordInitialDropoffRate").value as Zero_Fifty))} debounce={250}>
									<IonIcon size="small" slot="start" src="svg/flatAngle.svg" />
									<IonIcon size="small" slot="end" src="svg/steepAngle.svg" />
								</IonRange>
							</IonItem>
						</IonList>
					</IonItem>
					<IonItem className={toggleableClassName("nonUnit")}>
						<div className="header">Mid-Word<br />Syllables</div>
						<IonTextarea disabled={doIfEditing("wordMiddle", false, true)} className="serifChars" id="Syl-wordMiddle" value={wordMiddle} rows={calculateRows(wordMiddle)} inputmode="text" placeholder="These syllables are used between the first and last syllable of a word" />
						<div style={ { alignSelf: "center" } }>
							<IonButton color={doIfEditing("wordMiddle", "success", "warning")} disabled={syllableObject.editing && syllableObject.editing !== "wordMiddle"} onClick={e => doAction("wordMiddle")}>
								<IonIcon icon={doIfEditing("wordMiddle", checkmarkDoneSharp, constructSharp)} />
							</IonButton>
						</div>
					</IonItem>
					<IonItem className={syllableObject.editing === "wordMiddle" ? "" : "hide"}>
						<IonList lines="none" style={ { width: "100%" } }>
							<IonItem className="nonUnit ion-text-end">
								<IonLabel className="wrappableInnards"><div>Use separate dropoff rate</div></IonLabel>
								<IonToggle onClick={() => toggleDropoff("wordMiddle", swM)} slot="end" checked={swM.dropoffOverride !== undefined} />
							</IonItem>
							<IonItem id="wordMiddleDropoff" className={swM.dropoffOverride === undefined ? "hide" : "nonUnit"}>
								<IonRange min={0} max={50} pin={true} value={(swM.dropoffOverride === undefined ? settingsWG.categoryRunDropoff : swM.dropoffOverride)} id="wordMiddleDropoffRate" onIonBlur={() => dispatch(modSyllableDropoff("wordMiddle", $i("wordMiddleDropoffRate").value as Zero_Fifty))} debounce={250}>
									<IonIcon size="small" slot="start" src="svg/flatAngle.svg" />
									<IonIcon size="small" slot="end" src="svg/steepAngle.svg" />
								</IonRange>
							</IonItem>
						</IonList>
					</IonItem>
					<IonItem className={toggleableClassName("nonUnit")}>
						<div className="header">Word-Final<br />Syllables</div>
						<IonTextarea disabled={doIfEditing("wordFinal", false, true)} className="serifChars" id="Syl-wordFinal" value={wordFinal} rows={calculateRows(wordFinal)} inputmode="text" placeholder="These syllables are used to end words" />
						<div style={ { alignSelf: "center" } }>
							<IonButton color={doIfEditing("wordFinal", "success", "warning")} disabled={syllableObject.editing && syllableObject.editing !== "wordFinal"} onClick={e => doAction("wordFinal")}>
								<IonIcon icon={doIfEditing("wordFinal", checkmarkDoneSharp, constructSharp)} />
							</IonButton>
						</div>
					</IonItem>
					<IonItem className={syllableObject.editing === "wordFinal" ? "" : "hide"}>
						<IonList lines="none" style={ { width: "100%" } }>
							<IonItem className="nonUnit ion-text-end">
								<IonLabel className="wrappableInnards"><div>Use separate dropoff rate</div></IonLabel>
								<IonToggle onClick={() => toggleDropoff("wordFinal", swF)} slot="end" checked={swF.dropoffOverride !== undefined} />
							</IonItem>
							<IonItem id="wordFinalDropoff" className={swF.dropoffOverride === undefined ? "hide" : "nonUnit"}>
								<IonRange min={0} max={50} pin={true} value={(swF.dropoffOverride === undefined ? settingsWG.categoryRunDropoff : swF.dropoffOverride)} id="wordFinalDropoffRate" onIonBlur={() => dispatch(modSyllableDropoff("wordFinal", $i("wordFinalDropoffRate").value as Zero_Fifty))} debounce={250}>
									<IonIcon size="small" slot="start" src="svg/flatAngle.svg" />
									<IonIcon size="small" slot="end" src="svg/steepAngle.svg" />
								</IonRange>
							</IonItem>
						</IonList>
					</IonItem>
				</IonList>
			</IonContent>
		</IonPage>
	);
};

export default WGSyl;
