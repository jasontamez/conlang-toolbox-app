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
	useIonViewDidEnter
} from '@ionic/react';
import {
	helpCircleOutline,
	globeOutline,
	constructSharp,
	checkmarkDoneSharp
} from 'ionicons/icons';
import { openModal, toggleSyllables, editSyllables, changeView, setEditableSyllables } from '../../components/ReduxDucksFuncs';
import { AllWGSyllableObjects } from '../../components/ReduxDucksTypes';
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
	const syllableObject = useSelector((state: any) => state.wordgenSyllables, shallowEqual);
	const toggleableClassName = (base: string = "") => {
		let extra = " toggleable";
		if(syllableObject.toggle) {
			extra += " toggled";
		}
		return (base + extra).trim();
	};
	const singleWord = syllableObject.objects.singleWord.components.join("\n");
	const wordInitial = syllableObject.objects.wordInitial.components.join("\n");
	const wordMiddle = syllableObject.objects.wordMiddle.components.join("\n");
	const wordFinal = syllableObject.objects.wordFinal.components.join("\n");
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
			<IonContent fullscreen className="evenBackground">
				<IonList lines="none">
					<IonItem class="ion-text-end">
						<IonLabel>Use multiple syllable types</IonLabel>
						<IonToggle checked={syllableObject.toggle} onClick={() => dispatch(toggleSyllables(!syllableObject.toggle))} />
					</IonItem>
				</IonList>
				<IonList className="syllables units" lines="none">
					<IonItem>
						<div className={toggleableClassName("header reverseToggle")}>Syllables</div>
						<div className={toggleableClassName("header")}>Single-Syllable<br />Words</div>
						<IonTextarea disabled={doIfEditing("singleWord", false, true)} className="serifChars" id="Syl-singleWord" value={singleWord} rows={calculateRows(singleWord)} inputmode="text" placeholder="Use character group labels to construct syllables" />
						<div style={ { alignSelf: "center" } }>
							<IonButton color={doIfEditing("singleWord", "success", "warning")} disabled={syllableObject.editing && syllableObject.editing !== "singleWord"} onClick={e => doAction("singleWord")}>
								<IonIcon icon={doIfEditing("singleWord", checkmarkDoneSharp, constructSharp)} />
							</IonButton>
						</div>
					</IonItem>
					<IonItem className={toggleableClassName()}>
						<div className="header">Word-Initial<br />Syllables</div>
						<IonTextarea disabled={doIfEditing("wordInitial", false, true)} className="serifChars" id="Syl-wordInitial" value={wordInitial} rows={calculateRows(wordInitial)} inputmode="text" placeholder="These syllables are used to begin words" />
						<div style={ { alignSelf: "center" } }>
							<IonButton color={doIfEditing("wordInitial", "success", "warning")} disabled={syllableObject.editing && syllableObject.editing !== "wordInitial"} onClick={e => doAction("wordInitial")}>
								<IonIcon icon={doIfEditing("wordInitial", checkmarkDoneSharp, constructSharp)} />
							</IonButton>
						</div>
					</IonItem>
					<IonItem className={toggleableClassName()}>
						<div className="header">Mid-Word<br />Syllables</div>
						<IonTextarea disabled={doIfEditing("wordMiddle", false, true)} className="serifChars" id="Syl-wordMiddle" value={wordMiddle} rows={calculateRows(wordMiddle)} inputmode="text" placeholder="These syllables are used between the first and last syllable of a word" />
						<div style={ { alignSelf: "center" } }>
							<IonButton color={doIfEditing("wordMiddle", "success", "warning")} disabled={syllableObject.editing && syllableObject.editing !== "wordMiddle"} onClick={e => doAction("wordMiddle")}>
								<IonIcon icon={doIfEditing("wordMiddle", checkmarkDoneSharp, constructSharp)} />
							</IonButton>
						</div>
					</IonItem>
					<IonItem className={toggleableClassName()}>
						<div className="header">Word-Final<br />Syllables</div>
						<IonTextarea disabled={doIfEditing("wordFinal", false, true)} className="serifChars" id="Syl-wordFinal" value={wordFinal} rows={calculateRows(wordFinal)} inputmode="text" placeholder="These syllables are used to end words" />
						<div style={ { alignSelf: "center" } }>
							<IonButton color={doIfEditing("wordFinal", "success", "warning")} disabled={syllableObject.editing && syllableObject.editing !== "wordFinal"} onClick={e => doAction("wordFinal")}>
								<IonIcon icon={doIfEditing("wordFinal", checkmarkDoneSharp, constructSharp)} />
							</IonButton>
						</div>
					</IonItem>
				</IonList>
			</IonContent>
		</IonPage>
	);
};

export default WGSyl;
