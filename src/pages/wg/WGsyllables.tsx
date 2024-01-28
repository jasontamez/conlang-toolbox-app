import React, { useState, memo, useEffect } from 'react';
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
	IonRange,
	useIonToast,
	useIonAlert
} from '@ionic/react';
import {
	helpCircleOutline,
	globeOutline,
	saveSharp,
	trashBinOutline
} from 'ionicons/icons';
import { useSelector, useDispatch } from "react-redux";

import { PageData, StateObject, SyllableTypes, Zero_Fifty } from '../../store/types';
import { setSyllables, setSyllableBoxDropoff, setMultipleSyllableTypes, clearSyllables } from '../../store/wgSlice';

import toaster from '../../components/toaster';
import yesNoAlert from '../../components/yesNoAlert';
import ModalWrap from "../../components/ModalWrap";
import ExtraCharactersModal from '../modals/ExtraCharacters';
import { SylCard } from "./WGinfo";
import { $i } from '../../components/DollarSignExports';

const WGSyl = (props: PageData) => {
	const { modalPropsMaker } = props;
	const dispatch = useDispatch();
	const [isOpenECM, setIsOpenECM] = useState<boolean>(false);
	const [isOpenInfo, setIsOpenInfo] = useState<boolean>(false);
	const [isEditing, setIsEditing] = useState<SyllableTypes | null>(null);
	const [swDropoff, setSwDropoff] = useState<Zero_Fifty | null>(null);
	const [wiDropoff, setWiDropoff] = useState<Zero_Fifty | null>(null);
	const [wmDropoff, setWmDropoff] = useState<Zero_Fifty | null>(null);
	const [wfDropoff, setWfDropoff] = useState<Zero_Fifty | null>(null);
	const [sw, setSw] = useState<string>("");
	const [wi, setWi] = useState<string>("");
	const [wm, setWm] = useState<string>("");
	const [wf, setWf] = useState<string>("");
	const {
		singleWord,
		wordInitial,
		wordMiddle,
		wordFinal,
		syllableBoxDropoff,
		multipleSyllableTypes,
		syllableDropoffOverrides
	} = useSelector((state: StateObject) => state.wg);
	const { disableConfirms } = useSelector((state: StateObject) => state.appSettings);
	const [doAlert] = useIonAlert();
	const toast = useIonToast();
	useEffect(() => {
		setSwDropoff(syllableDropoffOverrides.singleWord);
	}, [syllableDropoffOverrides.singleWord]);
	useEffect(() => {
		setWiDropoff(syllableDropoffOverrides.wordInitial);
	}, [syllableDropoffOverrides.wordInitial]);
	useEffect(() => {
		setWmDropoff(syllableDropoffOverrides.wordMiddle);
	}, [syllableDropoffOverrides.wordMiddle]);
	useEffect(() => {
		setWfDropoff(syllableDropoffOverrides.wordFinal);
	}, [syllableDropoffOverrides.wordFinal]);
	useEffect(() => {
		setSw(singleWord);
	}, [singleWord]);
	useEffect(() => {
		setWi(wordInitial);
	}, [wordInitial]);
	useEffect(() => {
		setWm(wordMiddle);
	}, [wordMiddle]);
	useEffect(() => {
		setWf(wordFinal);
	}, [wordFinal]);
	const calculateRows = (input: string) => Math.min(Math.max(4, input.split(/\n/).length), 12);
	const toggleSeparateDropoff = (value: Zero_Fifty | null, func: Function) => {
		func(value === null ? syllableBoxDropoff : null);
	};
	const firstBox = multipleSyllableTypes ? "Single-Syllable\nWords" : "Syllables";
	const SyllableButton = memo((props: { prop: SyllableTypes, dropoff: Zero_Fifty | null }) => {
		const { prop, dropoff } = props;
		if (isEditing === prop) {
			return (
				<IonButton
					color="success"
					fill="solid"
					onClick={e => {
						const el = $i<HTMLInputElement>("Syl-" + prop);
						const value = (el && el.value) || "";
						dispatch(setSyllables({syllables: prop, value, override: dropoff }));
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
	const maybeClearEverything = () => {
		const handler = () => {
			dispatch(clearSyllables());
			toaster({
				message: "Syllables cleared.",
				duration: 2500,
				color: "danger",
				position: "top",
				toast
			});
		};
		if(disableConfirms) {
			handler();
		} else {
			yesNoAlert({
				header: "Clear All Syllables?",
				message: "This will delete all current syllables, and cannot be undone.",
				cssClass: "warning",
				submit: "Yes, Delete Them",
				handler,
				doAlert
			});
		}
	};
	return (
		<IonPage>
			<ExtraCharactersModal {...modalPropsMaker(isOpenECM, setIsOpenECM)} />
			<ModalWrap {...modalPropsMaker(isOpenInfo, setIsOpenInfo)}>
				<SylCard setIsOpenInfo={setIsOpenInfo} />
			</ModalWrap>
			<IonHeader>
				<IonToolbar>
					<IonButtons slot="start">
						<IonMenuButton />
					</IonButtons>
					<IonTitle>Syllables</IonTitle>
					<IonButtons slot="end">
						{(singleWord || wordInitial || wordMiddle || wordFinal) ?
							<IonButton onClick={() => maybeClearEverything()}>
								<IonIcon icon={trashBinOutline} />
							</IonButton>
						:
							<></>
						}
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
							<div className="minor ion-text-wrap">Syllables at the top of a box tend to be picked more often than syllables at the bottom of the box. This slider controls this tendency. A rate of zero is flat, making all syllables equiprobable.</div>
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
						<div className="header">
							<div className="title">{firstBox}</div>
							{swDropoff !== null ?
								<div className="percentage">{swDropoff}%</div>
							:
								<></>
							}
						</div>
						<IonTextarea
							aria-label={firstBox.replace("\n", " ")}
							disabled={isEditing !== "singleWord"}
							className="serifChars"
							id="Syl-singleWord"
							value={sw}
							rows={calculateRows(singleWord)}
							onIonChange={(e) => setSw(e.target.value as string)}
							inputmode="text"
							placeholder="Use character group labels to construct syllables"
						/>
						<div className="button">
							<SyllableButton prop="singleWord" dropoff={swDropoff} />
						</div>
					</IonItem>
					<IonItem
						className={multipleSyllableTypes && isEditing === "singleWord" ? "" : "hide"}
					>
						<IonList lines="none" className="sublist">
							<IonItem className="nonUnit ion-text-end">
								<IonToggle
									enableOnOffLabels
									onClick={() => toggleSeparateDropoff(swDropoff, setSwDropoff)}
									labelPlacement="start"
									checked={swDropoff !== null}
								>Use separate dropoff rate</IonToggle>
							</IonItem>
							<IonItem
								id="singleWordDropoff"
								className={swDropoff === null ? "hide" : "nonUnit"}
							>
								<IonRange
									aria-label="From 0 to 50"
									min={0} max={50}
									pin={true}
									value={(swDropoff || 0)}
									onIonChange={(e) => setSwDropoff(e.target.value as Zero_Fifty)}
								>
									<IonIcon size="small" slot="start" src="svg/flatAngle.svg" />
									<IonIcon size="small" slot="end" src="svg/steepAngle.svg" />
								</IonRange>
							</IonItem>
						</IonList>
					</IonItem>
					<IonItem className={multipleSyllableTypes ? "nonUnit" : "hide"}>
						<div className="header">
							<div className="title">Word-Initial<br />Syllables</div>
							{wiDropoff !== null ?
								<div className="percentage">{wiDropoff}%</div>
							:
								<></>
							}
						</div>
						<IonTextarea
							aria-label="Word-Initial Syllables"
							disabled={isEditing !== "wordInitial"}
							className="serifChars"
							id="Syl-wordInitial"
							value={wi}
							rows={calculateRows(wordInitial)}
							onIonChange={(e) => setWi(e.target.value as string)}
							inputmode="text"
							placeholder="These syllables are used to begin words"
						/>
						<div className="button">
							<SyllableButton prop="wordInitial" dropoff={wiDropoff} />
						</div>
					</IonItem>
					<IonItem className={isEditing === "wordInitial" ? "" : "hide"}>
						<IonList lines="none" className="sublist">
							<IonItem className="nonUnit ion-text-end">
								<IonToggle
									enableOnOffLabels
									onClick={() => toggleSeparateDropoff(wiDropoff, setWiDropoff)}
									labelPlacement="start"
									checked={wiDropoff !== null}
								>Use separate dropoff rate</IonToggle>
							</IonItem>
							<IonItem
								id="wordInitialDropoff"
								className={wiDropoff === null ? "hide" : "nonUnit"}
							>
								<IonRange
									aria-label="From 0 to 50"
									min={0} max={50}
									pin={true}
									value={(wiDropoff || 0)}
									onIonChange={(e) => setWiDropoff(e.target.value as Zero_Fifty)}
								>
									<IonIcon size="small" slot="start" src="svg/flatAngle.svg" />
									<IonIcon size="small" slot="end" src="svg/steepAngle.svg" />
								</IonRange>
							</IonItem>
						</IonList>
					</IonItem>
					<IonItem className={multipleSyllableTypes ? "nonUnit" : "hide"}>
						<div className="header">
							<div className="title">Mid-Word<br />Syllables</div>
							{wmDropoff !== null ?
								<div className="percentage">{wmDropoff}%</div>
							:
								<></>
							}
						</div>
						<IonTextarea
							aria-label="Mid-Word Syllables"
							disabled={isEditing !== "wordMiddle"}
							className="serifChars"
							id="Syl-wordMiddle"
							value={wm}
							rows={calculateRows(wordMiddle)}
							onIonChange={(e) => setWm(e.target.value as string)}
							inputmode="text"
							placeholder="These syllables are used between the first and last syllable of a word"
						/>
						<div className="button">
							<SyllableButton prop="wordMiddle" dropoff={wmDropoff} />
						</div>
					</IonItem>
					<IonItem className={isEditing === "wordMiddle" ? "" : "hide"}>
						<IonList lines="none" className="sublist">
							<IonItem className="nonUnit ion-text-end">
								<IonToggle
									enableOnOffLabels
									onClick={() => toggleSeparateDropoff(wmDropoff, setWmDropoff)}
									labelPlacement="start"
									checked={wmDropoff !== null}
								>Use separate dropoff rate</IonToggle>
							</IonItem>
							<IonItem
								id="wordMiddleDropoff"
								className={wmDropoff === null ? "hide" : "nonUnit"}
							>
								<IonRange
									aria-label="From 0 to 50"
									min={0} max={50}
									pin={true}
									value={(wmDropoff || 0)}
									onIonChange={(e) => setWmDropoff(e.target.value as Zero_Fifty)}
								>
									<IonIcon size="small" slot="start" src="svg/flatAngle.svg" />
									<IonIcon size="small" slot="end" src="svg/steepAngle.svg" />
								</IonRange>
							</IonItem>
						</IonList>
					</IonItem>
					<IonItem className={multipleSyllableTypes ? "nonUnit" : "hide"}>
						<div className="header">
							<div className="title">Word-Final<br />Syllables</div>
							{wfDropoff !== null ?
								<div className="percentage">{wfDropoff}%</div>
							:
								<></>
							}
						</div>
						<IonTextarea
							aria-label="Word-Final Syllables"
							disabled={isEditing !== "wordFinal"}
							className="serifChars"
							id="Syl-wordFinal"
							value={wf}
							rows={calculateRows(wordFinal)}
							onIonChange={(e) => setWf(e.target.value as string)}
							inputmode="text"
							placeholder="These syllables are used to end words"
						/>
						<div className="button">
							<SyllableButton prop="wordFinal" dropoff={wfDropoff} />
						</div>
					</IonItem>
					<IonItem className={isEditing === "wordFinal" ? "" : "hide"}>
						<IonList lines="none" className="sublist">
							<IonItem className="nonUnit ion-text-end">
								<IonToggle
									enableOnOffLabels
									onClick={() => toggleSeparateDropoff(wfDropoff, setWfDropoff)}
									labelPlacement="start"
									checked={wfDropoff !== null}
								>Use separate dropoff rate</IonToggle>
							</IonItem>
							<IonItem
								id="wordFinalDropoff"
								className={wfDropoff === null ? "hide" : "nonUnit"}
							>
								<IonRange
									aria-label="From 0 to 50"
									min={0} max={50}
									pin={true}
									value={(wfDropoff || 0)}
									onIonChange={(e) => setWfDropoff(e.target.value as Zero_Fifty)}
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
