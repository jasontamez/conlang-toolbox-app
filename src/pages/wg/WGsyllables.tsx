import React, { useState, memo } from 'react';
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
	saveSharp
} from 'ionicons/icons';
import { useSelector, useDispatch } from "react-redux";

import { PageData, StateObject, SyllableTypes, ViewState, Zero_Fifty } from '../../store/types';
import { setSyllableOverride, setSyllables, setSyllableBoxDropoff, setMultipleSyllableTypes } from '../../store/wgSlice';
import { saveView } from '../../store/viewSlice';

import ModalWrap from "../../components/ModalWrap";
import { $i } from '../../components/DollarSignExports';
import ExtraCharactersModal from '../modals/ExtraCharacters';
import { SylCard } from "./WGCards";

const WGSyl = (props: PageData) => {
	const { modalPropsMaker } = props;
	const dispatch = useDispatch();
	const [isOpenECM, setIsOpenECM] = useState<boolean>(false);
	const [isOpenInfo, setIsOpenInfo] = useState<boolean>(false);
	const [isEditing, setIsEditing] = useState<SyllableTypes | null>(null);
	const viewInfo = { key: "wg" as keyof ViewState, page: "syllables" };
	useIonViewDidEnter(() => {
		dispatch(saveView(viewInfo));
	});
	const {
		singleWord,
		wordInitial,
		wordMiddle,
		wordFinal,
		syllableBoxDropoff,
		multipleSyllableTypes,
		syllableDropoffOverrides
	} = useSelector((state: StateObject) => state.wg);
	const toggleableClassName = (base: string = "") => {
		return (`${base} toggleable ${(multipleSyllableTypes ? " toggled" : "")}`).trim();
	};
	const calculateRows = (input: string) => Math.min(Math.max(4, input.split(/\n/).length), 12);
	const setSeparateDropoff = (which: SyllableTypes, value: null | Zero_Fifty) => {
		dispatch(setSyllableOverride({ syllables: which, value }));
	};
	const toggleSeparateDropoff = (prop: SyllableTypes) => {
		setSeparateDropoff(prop, syllableDropoffOverrides[prop] !== undefined ? syllableBoxDropoff : null)
	};
	const firstBox = multipleSyllableTypes ? "Single-Syllable\nWords" : "Syllables";
	const SyllableButton = memo((props: { prop: SyllableTypes }) => {
		const { prop } = props;
		if (isEditing === prop) {
			return (
				<IonButton
					color="success"
					fill="solid"
					onClick={e => {
						const info: HTMLTextAreaElement = $i("Syl-" + prop);
						dispatch(setSyllables({syllables: prop, value: info.value}));
						setIsEditing(null);
					}}
				>
					<IonIcon icon={saveSharp} />
				</IonButton>
			);
		}
		return (
			<IonButton
				color="primary"
				fill="clear"
				disabled={!!isEditing}
				onClick={e => setIsEditing(prop)}
			>
				<IonIcon src="svg/edit.svg" />
			</IonButton>
		);
	});
	return (
		<IonPage>
			<ExtraCharactersModal {...modalPropsMaker(isOpenECM, setIsOpenECM)} />
			<ModalWrap {...modalPropsMaker(isOpenInfo, setIsOpenInfo)}><SylCard /></ModalWrap>
			<IonHeader>
				<IonToolbar>
					<IonButtons slot="start">
						<IonMenuButton />
					</IonButtons>
					<IonTitle>Syllables</IonTitle>
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
			<IonContent fullscreen className="evenBackground disappearingHeaderKludgeFix">
				<IonList lines="none">
					<IonItem className="nonUnit">
						<IonLabel className="wrappableInnards belongsToBelow">
							<div><strong>Dropoff Rate</strong></div>
							<div className="minor">Syllables at the top of a box tend to be picked more often than syllables at the bottom of the box. This slider controls this tendency. A rate of zero is flat, making all syllables equiprobable.</div>
						</IonLabel>
					</IonItem>
					<IonItem>
						<IonRange
							aria-label="From 0 to 50"
							min={0} max={50}
							value={syllableBoxDropoff}
							pin={true}
							onIonChange={(e) => dispatch(setSyllableBoxDropoff(e.target.value as Zero_Fifty))}
						>
							<IonIcon size="small" slot="start" src="svg/flatAngle.svg" />
							<IonIcon size="small" slot="end" src="svg/steepAngle.svg" />
						</IonRange>
					</IonItem>
					<IonItem className="ion-text-end">
						<IonToggle
							enableOnOffLabels
							labelPlacement="start"
							justify="start"
							disabled={!!isEditing}
							checked={multipleSyllableTypes}
							onClick={() => dispatch(setMultipleSyllableTypes(!multipleSyllableTypes))}
						>Use multiple syllable types</IonToggle>
					</IonItem>
				</IonList>
				<IonList className="syllables units" lines="none">
					<IonItem className="nonUnit">
						<div className="header">{firstBox}</div>
						<IonTextarea
							aria-label={firstBox.replace("\n", " ")}
							disabled={isEditing !== "singleWord"}
							className="serifChars"
							id="Syl-singleWord"
							value={singleWord}
							rows={calculateRows(singleWord)}
							inputmode="text"
							placeholder="Use character group labels to construct syllables"
						/>
						<div style={ { alignSelf: "center", margin: "0 0 0 1rem" } }>
							<SyllableButton prop="singleWord" />
						</div>
					</IonItem>
					<IonItem className={multipleSyllableTypes && isEditing === "singleWord" ? "" : "hide"}>
						<IonList lines="none" style={ { width: "100%" } }>
							<IonItem className="nonUnit ion-text-end">
								<IonToggle
									enableOnOffLabels
									onClick={() => toggleSeparateDropoff("singleWord")}
									labelPlacement="start"
									checked={syllableDropoffOverrides.singleWord !== undefined}
								>Use separate dropoff rate</IonToggle>
							</IonItem>
							<IonItem id="singleWordDropoff" className={syllableDropoffOverrides.singleWord === undefined ? "hide" : "nonUnit"}>
								<IonRange
									aria-label="From 0 to 50"
									min={0} max={50}
									pin={true}
									value={(syllableDropoffOverrides.singleWord || 0)}
									onIonChange={(e) => dispatch(setSeparateDropoff("singleWord", e.target.value as Zero_Fifty))}
									debounce={250}
								>
									<IonIcon size="small" slot="start" src="svg/flatAngle.svg" />
									<IonIcon size="small" slot="end" src="svg/steepAngle.svg" />
								</IonRange>
							</IonItem>
						</IonList>
					</IonItem>
					<IonItem className={toggleableClassName("nonUnit")}>
						<div className="header">Word-Initial<br />Syllables</div>
						<IonTextarea
							aria-label="Word-Initial Syllables"
							disabled={isEditing !== "wordInitial"}
							className="serifChars"
							id="Syl-wordInitial"
							value={wordInitial}
							rows={calculateRows(wordInitial)}
							inputmode="text"
							placeholder="These syllables are used to begin words"
						/>
						<div style={ { alignSelf: "center", margin: "0 0 0 1rem" } }>
							<SyllableButton prop="wordInitial" />
						</div>
					</IonItem>
					<IonItem className={isEditing === "wordInitial" ? "" : "hide"}>
						<IonList lines="none" style={ { width: "100%" } }>
							<IonItem className="nonUnit ion-text-end">
								<IonToggle
									enableOnOffLabels
									onClick={() => toggleSeparateDropoff("wordInitial")}
									labelPlacement="start"
									checked={syllableDropoffOverrides.wordInitial !== undefined}
								>Use separate dropoff rate</IonToggle>
							</IonItem>
							<IonItem id="wordInitialDropoff" className={syllableDropoffOverrides.wordInitial === undefined ? "hide" : "nonUnit"}>
								<IonRange
									aria-label="From 0 to 50"
									min={0} max={50}
									pin={true}
									value={(syllableDropoffOverrides.wordInitial || 0)}
									onIonChange={(e) => dispatch(setSeparateDropoff("wordInitial", e.target.value as Zero_Fifty))}
									debounce={250}
								>
									<IonIcon size="small" slot="start" src="svg/flatAngle.svg" />
									<IonIcon size="small" slot="end" src="svg/steepAngle.svg" />
								</IonRange>
							</IonItem>
						</IonList>
					</IonItem>
					<IonItem className={toggleableClassName("nonUnit")}>
						<div className="header">Mid-Word<br />Syllables</div>
						<IonTextarea
							aria-label="Mid-Word Syllables"
							disabled={isEditing !== "wordMiddle"}
							className="serifChars"
							id="Syl-wordMiddle"
							value={wordMiddle}
							rows={calculateRows(wordMiddle)}
							inputmode="text"
							placeholder="These syllables are used between the first and last syllable of a word"
						/>
						<div style={ { alignSelf: "center", margin: "0 0 0 1rem" } }>
							<SyllableButton prop="wordMiddle" />
						</div>
					</IonItem>
					<IonItem className={isEditing === "wordMiddle" ? "" : "hide"}>
						<IonList lines="none" style={ { width: "100%" } }>
							<IonItem className="nonUnit ion-text-end">
								<IonToggle
									enableOnOffLabels
									onClick={() => toggleSeparateDropoff("wordMiddle")}
									labelPlacement="start"
									checked={syllableDropoffOverrides.wordMiddle !== undefined}
								>Use separate dropoff rate</IonToggle>
							</IonItem>
							<IonItem id="wordMiddleDropoff" className={syllableDropoffOverrides.wordMiddle === undefined ? "hide" : "nonUnit"}>
								<IonRange
									aria-label="From 0 to 50"
									min={0} max={50}
									pin={true}
									value={(syllableDropoffOverrides.wordMiddle || 0)}
									onIonChange={(e) => dispatch(setSeparateDropoff("wordMiddle", e.target.value as Zero_Fifty))}
									debounce={250}
								>
									<IonIcon size="small" slot="start" src="svg/flatAngle.svg" />
									<IonIcon size="small" slot="end" src="svg/steepAngle.svg" />
								</IonRange>
							</IonItem>
						</IonList>
					</IonItem>
					<IonItem className={toggleableClassName("nonUnit")}>
						<div className="header">Word-Final<br />Syllables</div>
						<IonTextarea
							aria-label="Word-Final Syllables"
							disabled={isEditing !== "wordFinal"}
							className="serifChars"
							id="Syl-wordFinal"
							value={wordFinal}
							rows={calculateRows(wordFinal)}
							inputmode="text"
							placeholder="These syllables are used to end words"
						/>
						<div style={ { alignSelf: "center", margin: "0 0 0 1rem" } }>
							<SyllableButton prop="wordFinal" />
						</div>
					</IonItem>
					<IonItem className={isEditing === "wordFinal" ? "" : "hide"}>
						<IonList lines="none" style={ { width: "100%" } }>
							<IonItem className="nonUnit ion-text-end">
								<IonToggle
									enableOnOffLabels
									onClick={() => toggleSeparateDropoff("wordFinal")}
									labelPlacement="start"
									checked={syllableDropoffOverrides.wordFinal !== undefined}
								>Use separate dropoff rate</IonToggle>
							</IonItem>
							<IonItem id="wordFinalDropoff" className={syllableDropoffOverrides.wordFinal === undefined ? "hide" : "nonUnit"}>
								<IonRange
									aria-label="From 0 to 50"
									min={0} max={50}
									pin={true}
									value={(syllableDropoffOverrides.wordFinal || 0)}
									onIonChange={(e) => dispatch(setSeparateDropoff("wordFinal", e.target.value as Zero_Fifty))}
									debounce={250}
								>
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
