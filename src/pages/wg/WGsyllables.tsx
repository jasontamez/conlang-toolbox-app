import React, { useState, useEffect, ReactElement, Fragment, FC } from 'react';
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

import { PageData, SetState, StateObject, SyllableTypes, Zero_Fifty } from '../../store/types';
import { setSyllables, setSyllableBoxDropoff, setMultipleSyllableTypes, clearSyllables } from '../../store/wgSlice';
import useTranslator from '../../store/translationHooks';

import toaster from '../../components/toaster';
import yesNoAlert from '../../components/yesNoAlert';
import ModalWrap from "../../components/ModalWrap";
import { $i } from '../../components/DollarSignExports';
import ExtraCharactersModal from '../modals/ExtraCharacters';
import { SylCard } from "./WGinfo";
import useI18Memo from '../../components/useI18Memo';

const addLinebreaks = (input: string) => {
	const output: ReactElement[] = [];
	const split = input.split(/\s+/);
	output.push(<Fragment key={`${input}/-1`}>{split.shift()!}</Fragment>)
	split.forEach((bit, i) => {
		output.push(
			<br key={`${input}/br/${i}`} />,
			<Fragment key={`${input}/br/${i}`}>{bit}</Fragment>
		);
	});
	return output;
};

interface SyllableButtonProps {
	prop: SyllableTypes
	dropoff: Zero_Fifty | null
	isEditing: SyllableTypes | null
	setIsEditing: SetState<SyllableTypes | null>
	save: string
	edit: string
}

const SyllableButton: FC<SyllableButtonProps> = (props) => {
	const { prop, dropoff, isEditing, setIsEditing, save, edit } = props;
	const dispatch = useDispatch();
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
				aria-label={save}
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
			aria-label={edit}
		>
			<IonIcon src="svg/edit.svg" />
		</IonButton>
	);
};

// Translations
const commons = [
	"Save", "Edit", "Delete", "Help", "syllableDropoffExplanation"
];
const formals = [
	"single-word syllables", "dropoff rate", "word-initial syllables",
	"mid-word syllables", "word-final syllables"
];
const formal = { context: "formal" };
const translations = [
	"Syllables",
	"From 0 to 50",
	"Use multiple syllable types",
	"Use character group labels to construct syllables",
	"Use separate dropoff rate",
	"word-initial syllables",
	"These syllables are used to begin words",
	"mid-word syllables",
	"These syllables are used between the first and last syllable of a word",
	"word-final syllables",
	"These syllables are used to end words"
];

const WGSyl: FC<PageData> = (props) => {
	const [ t ] = useTranslator('wg');
	const [ tc ] = useTranslator('common');
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
	const [tSave, tEdit, tDelete, tHelp, tSyllableDropoffExplanation] = useI18Memo(commons);
	const [
		tSwSyllFormal, tDropoffFormal, tWiSyllFormal, tMwSyllFormal, tWfSyllFormal
	] = useI18Memo(formals, "wg", formal);
	const [
		tSyllablesTitle, tFromZeroFifty, tUseMultiSyll, tUseCharLabel,
		tUseDrop, tWiSyll, tWiSyllExpl, tMwSyll, tMwSyllExpl, tWeSyll,
		tWeSyllExpl
	] = useI18Memo(translations, "wg");
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
	const toggleSeparateDropoff = (value: Zero_Fifty | null, func: SetState<Zero_Fifty | null>) => {
		func(value === null ? syllableBoxDropoff : null);
	};
	const firstBox = multipleSyllableTypes ? tSwSyllFormal : tSyllablesTitle;
	const maybeClearEverything = () => {
		const count = wi.length + wm.length + wf.length + sw.length;
		const handler = () => {
			dispatch(clearSyllables());
			toaster({
				message: tc("thingsDeleted", { count, things: t("Syllable", { count }) }),
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
				header: tc("clearThings?", { count, things: t("Syllable", { count }) }),
				message: t("delAllSyllables", { count }),
				cssClass: "warning",
				submit: tc("confirmDel", { count }),
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
					<IonTitle>{tSyllablesTitle}</IonTitle>
					<IonButtons slot="end">
						{(singleWord || wordInitial || wordMiddle || wordFinal) ?
							<IonButton onClick={() => maybeClearEverything()} aria-label={tDelete}>
								<IonIcon icon={trashBinOutline} />
							</IonButton>
						:
							<></>
						}
						<IonButton onClick={() => setIsOpenECM(true)}>
							<IonIcon icon={globeOutline} />
						</IonButton>
						<IonButton onClick={() => setIsOpenInfo(true)} aria-label={tHelp}>
							<IonIcon icon={helpCircleOutline} />
						</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen className="evenBackground disappearingHeaderKludgeFix">
				<IonList lines="none">
					<IonItem className="nonUnit">
						<IonLabel className="wrappableInnards belongsToBelow">
							<div><strong>{tDropoffFormal}</strong></div>
							<div className="minor ion-text-wrap">{tSyllableDropoffExplanation}</div>
						</IonLabel>
					</IonItem>
					<IonItem>
						<IonRange
							aria-label={tFromZeroFifty}
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
						>{tUseMultiSyll}</IonToggle>
					</IonItem>
				</IonList>
				<IonList className="syllables units" lines="none">
					<IonItem className="nonUnit">
						<div className="header">
							<div className="title">{addLinebreaks(firstBox)}</div>
							{swDropoff !== null ?
								<div className="percentage">{swDropoff}%</div>
							:
								<></>
							}
						</div>
						<IonTextarea
							aria-label={firstBox}
							disabled={isEditing !== "singleWord"}
							className="serifChars"
							id="Syl-singleWord"
							value={sw}
							rows={calculateRows(singleWord)}
							onIonChange={(e) => setSw(e.target.value as string)}
							inputmode="text"
							placeholder={tUseCharLabel}
						/>
						<div className="button">
							<SyllableButton
								prop="singleWord"
								dropoff={swDropoff}
								isEditing={isEditing}
								setIsEditing={setIsEditing}
								save={tSave}
								edit={tEdit}
							/>
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
								>{tUseDrop}</IonToggle>
							</IonItem>
							<IonItem
								id="singleWordDropoff"
								className={swDropoff === null ? "hide" : "nonUnit"}
							>
								<IonRange
									aria-label={tFromZeroFifty}
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
							<div className="title">{addLinebreaks(tWiSyllFormal)}</div>
							{wiDropoff !== null ?
								<div className="percentage">{wiDropoff}%</div>
							:
								<></>
							}
						</div>
						<IonTextarea
							aria-label={tWiSyll}
							disabled={isEditing !== "wordInitial"}
							className="serifChars"
							id="Syl-wordInitial"
							value={wi}
							rows={calculateRows(wordInitial)}
							onIonChange={(e) => setWi(e.target.value as string)}
							inputmode="text"
							placeholder={tWiSyllExpl}
						/>
						<div className="button">
							<SyllableButton
								prop="wordInitial"
								dropoff={swDropoff}
								isEditing={isEditing}
								setIsEditing={setIsEditing}
								save={tSave}
								edit={tEdit}
							/>
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
								>{tUseDrop}</IonToggle>
							</IonItem>
							<IonItem
								id="wordInitialDropoff"
								className={wiDropoff === null ? "hide" : "nonUnit"}
							>
								<IonRange
									aria-label={tFromZeroFifty}
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
							<div className="title">{addLinebreaks(tMwSyllFormal)}</div>
							{wmDropoff !== null ?
								<div className="percentage">{wmDropoff}%</div>
							:
								<></>
							}
						</div>
						<IonTextarea
							aria-label={tMwSyll}
							disabled={isEditing !== "wordMiddle"}
							className="serifChars"
							id="Syl-wordMiddle"
							value={wm}
							rows={calculateRows(wordMiddle)}
							onIonChange={(e) => setWm(e.target.value as string)}
							inputmode="text"
							placeholder={tMwSyllExpl}
						/>
						<div className="button">
							<SyllableButton
								prop="wordMiddle"
								dropoff={swDropoff}
								isEditing={isEditing}
								setIsEditing={setIsEditing}
								save={tSave}
								edit={tEdit}
							/>
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
								>{tUseDrop}</IonToggle>
							</IonItem>
							<IonItem
								id="wordMiddleDropoff"
								className={wmDropoff === null ? "hide" : "nonUnit"}
							>
								<IonRange
									aria-label={tFromZeroFifty}
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
							<div className="title">{addLinebreaks(tWfSyllFormal)}</div>
							{wfDropoff !== null ?
								<div className="percentage">{wfDropoff}%</div>
							:
								<></>
							}
						</div>
						<IonTextarea
							aria-label={tWeSyll}
							disabled={isEditing !== "wordFinal"}
							className="serifChars"
							id="Syl-wordFinal"
							value={wf}
							rows={calculateRows(wordFinal)}
							onIonChange={(e) => setWf(e.target.value as string)}
							inputmode="text"
							placeholder={tWeSyllExpl}
						/>
						<div className="button">
							<SyllableButton
								prop="wordFinal"
								dropoff={swDropoff}
								isEditing={isEditing}
								setIsEditing={setIsEditing}
								save={tSave}
								edit={tEdit}
							/>
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
								>{tUseDrop}</IonToggle>
							</IonItem>
							<IonItem
								id="wordFinalDropoff"
								className={wfDropoff === null ? "hide" : "nonUnit"}
							>
								<IonRange
									aria-label={tFromZeroFifty}
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
