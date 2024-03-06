import React, { useEffect, useCallback, useState, FC } from 'react';
import {
	IonItem,
	IonIcon,
	IonLabel,
	IonList,
	IonContent,
	IonHeader,
	IonToolbar,
	IonButtons,
	IonButton,
	IonTitle,
	IonModal,
	IonChip,
	IonFooter,
	IonInput,
	useIonToast
} from '@ionic/react';
import {
	checkmarkCircleOutline,
	helpCircleOutline,
	copyOutline,
	readerOutline,
	heartOutline
} from 'ionicons/icons';
import { Action, Dispatch } from 'redux';
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from 'react-i18next';

import { ExtraCharactersDisplayName, ModalProperties, StateObject } from '../../store/types';
import { setFaves, setNowShowing, setToCopy, toggleCopyImmediately, toggleShowNames } from '../../store/extraCharactersSlice';

import charData from '../../components/ExtraCharactersData';
import debounce from '../../components/Debounce';
import toaster from '../../components/toaster';
import copyText from '../../components/copyText';
import useI18Memo from '../../components/useI18Memo';

interface CurrentFavorites {
	[key: string]: boolean
}
const {
	objects,
	contents
} = charData;

const translations = [
	"Characters to be copied", "Copy", "Done", "Extra Characters", "Favorites",
	"Help", "Hide full character names", "Show full character names",
	"Start favoriting characters", "Stop favoriting characters",
	"Tap characters to add them here", "extraHelp.help1p1",
	"extraHelp.help1p2", "extraHelp.help1p3", "extraHelp.help1p4",
	"extraHelp.help2", "extraHelp.help3",
	"No longer copying directly to clipboard.",
	"Now copying immediately to clipboard.",
	"No longer saving to Favorites",
	"Now saving characters to Favorites"
];
const presenting = ["Display"];
const presentation = { context: "presentation" };

interface ChipProperties {
	title: ExtraCharactersDisplayName
	current: boolean
	toggleChars: (x: ExtraCharactersDisplayName) => void
}
const Chip: FC<ChipProperties> = (props) => {
	const { t } = useTranslation();
	const { title, current, toggleChars } = props;
	return (
		<IonChip
			outline={!current}
			onClick={() => toggleChars(title)}
			className={current ? "active" : ""}
		>
			<IonLabel>{t("characterInfo." + title)}</IonLabel>
		</IonChip>
	);
}

interface DisplayProps {
	character: string
	isFave: boolean
	characterClicked: (x: string) => void
}
const DisplayWithName: FC<DisplayProps> = (props) => {
	const { t } = useTranslation();
	const { character, isFave, characterClicked } = props;
	return (
		<div>
			<div
				className={isFave ? "char favorite" : "char"}
				onClick={() => characterClicked(character)}
			>{character}</div>
			<div
				className="label"
			>{t("characterInfo." + character)}</div>
		</div>
	);
};
const DisplayWithoutName: FC<DisplayProps> = (props) => {
	const { character, isFave, characterClicked } = props;
	return (
		<div
			className={isFave ? "char favorite" : "char"}
			onClick={() => characterClicked(character)}
		>{character}</div>
	);
};

const ExtraCharactersModal = (props: ModalProperties) => {
	//interface ExtraCharDataFlags {
	//	[key: string]: boolean
	//}
	const {
		isOpen,
		setIsOpen
	} = props;
	const dispatch = useDispatch();
	const {
		nowShowing,
		faves,
		copyImmediately,
		toCopy,
		showNames
	} = useSelector((state: StateObject) => state.ec);
	const { t } = useTranslation();
	const data: string[] = nowShowing === "Favorites" ? faves : objects[nowShowing] || [];
	const [currentFaves, setCurrentFaves] = useState<CurrentFavorites>({});
	const [isFavoriting, setIsFavoriting] = useState<boolean>(false);
	const [showHelp, setShowHelp] = useState<boolean>(false);
	const [tNowShowingCharInfo, setNowShowingCharInfo] = useState<string>("");
	const toast = useIonToast();
	const [
		tCharsToCopy, tCopy, tDone, tExtraCharacters, tFavorites, tHelp,
		tHideCharNames, tShowCharNames, tStartFave, tStopFave, tTapToAdd,
		tHelp1p1, tHelp1p2, tHelp1p3, tHelp1p4, tHelp2, tHelp3, tNotCopying,
		tCopying, tNotSaving, tSaving
	] = useI18Memo(translations);
	const [ tDisplay ] = useI18Memo(presenting, "common", presentation);

	useEffect(() => {
		const newFaves: CurrentFavorites = {};
		faves.forEach((selected: string) => (newFaves[selected] = true));
		setCurrentFaves(newFaves);
	}, [faves]);
	useEffect(() => {
		setNowShowingCharInfo(t("characterInfo." + nowShowing));
	}, [nowShowing, t]);

	const cancel = useCallback(() => {
		setIsOpen(false);
	}, [setIsOpen]);
	const toggleChars = useCallback((what: ExtraCharactersDisplayName) => {
		if(nowShowing !== what) {
			dispatch(setNowShowing(what));
		}
	}, [dispatch, nowShowing]);
	const toggleFave = useCallback((char: string) => {
		if(!currentFaves[char]) {
			// New fave
			dispatch(setFaves([...faves, char]));
			return;
		}
		// Deleting fave
		dispatch(setFaves(faves.filter((fave: string) => fave !== char)));
	}, [currentFaves, faves, dispatch]);
	const copyNow = useCallback(
		(char: string) => copyText(char, toast, t("copiedCharToClipboard", { char })),
		[toast, t]
	);
	const saveToBeCopied = useCallback((char: string) => {
		dispatch(setToCopy(toCopy + char));
	}, [dispatch, toCopy]);
	const characterClicked = useCallback(async (char: string) => {
		if(isFavoriting) {
			toggleFave(char);
		} else if (copyImmediately) {
			// Copy now
			copyNow(char);
		} else {
			// Save to be copied
			saveToBeCopied(char);
		}
	}, [toggleFave, copyImmediately, isFavoriting, copyNow, saveToBeCopied]);
	const toggleCopy = useCallback(() => {
		toaster({
			message: copyImmediately ? tNotCopying : tCopying,
			duration: 2500,
			position: "middle",
			toast
		});
		dispatch(toggleCopyImmediately());
	}, [dispatch, copyImmediately, toast, tNotCopying, tCopying]);
	const modifySavedToBeCopied = useCallback((toCopy: string) => {
		debounce<Dispatch, Action>(dispatch, [setToCopy(toCopy)], 250, "copyExtraChars");
	}, [dispatch]);
	const toggleFavoriting = useCallback((newValue: boolean) => {
		setIsFavoriting(newValue);
		toaster({
			message: newValue ? tSaving : tNotSaving,
			duration: 2500,
			position: "middle",
			toast
		});
	}, [toast, tSaving, tNotSaving]);

	const mapChips = useCallback(
		(title: ExtraCharactersDisplayName) =>
			<Chip key={title} title={title} current={nowShowing === title} toggleChars={toggleChars} />,
		[nowShowing, toggleChars]
	);
	const mapCharsWithNames = useCallback(
		(character: string) => 
			<DisplayWithName
				key={"mNamed" + nowShowing + character}
				character={character}
				isFave={currentFaves[character]}
				characterClicked={characterClicked}
			/>,
		[currentFaves, characterClicked, nowShowing]
	);
	const mapChars = useCallback(
		(character: string) => 
			<DisplayWithoutName
				key={"mUnnamed" + nowShowing + character}
				character={character}
				isFave={currentFaves[character]}
				characterClicked={characterClicked}
			/>,
		[currentFaves, characterClicked, nowShowing]
	);

	return (
		<IonModal isOpen={isOpen} onDidDismiss={cancel}>
			<IonHeader>
				<IonToolbar color="primary">
					<IonTitle>{tExtraCharacters}</IonTitle>
					<IonButtons slot="end">
						<IonButton
							onClick={() => setShowHelp(!showHelp)}
							color={showHelp ? "secondary" : undefined}
							fill={showHelp ? "solid" : "clear"}
							aria-label={tHelp}
						>
							<IonIcon icon={helpCircleOutline} />
						</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<IonList
					id="ExtraCharactersModalList"
					lines="none"
					className={showHelp ? "showingHelp" : undefined}
				>
					<IonItem className="extraHelp">
						<div>
							<div>{tHelp1p1}</div>
							<div className="central"><IonIcon icon={copyOutline} /></div>
							<div>{tHelp1p2}</div>
							<div className="central"><IonIcon icon={heartOutline} /></div>
							<div>{tHelp1p3}</div>
							<div className="central"><IonIcon icon={readerOutline} /></div>
							<div>{tHelp1p4}</div>
						</div>
					</IonItem>
					<IonItem className={"inputItem" + (copyImmediately ? "" : " sticky")}>
						<IonButton
							size="default"
							slot="start"
							disabled={isFavoriting}
							onClick={() => toggleCopy()}
							color={copyImmediately ? "secondary" : undefined}
							fill={copyImmediately ? "solid" : "clear"}
							aria-label={tCopy}
						>
							<IonIcon icon={copyOutline} />
						</IonButton>
						<IonButton
							size="default"
							slot="start"
							disabled={copyImmediately}
							onClick={() => toggleFavoriting(!isFavoriting)}
							color={isFavoriting ? "secondary" : undefined}
							fill={isFavoriting ? "solid" : "clear"}
							aria-label={isFavoriting ? tStopFave : tStartFave}
						>
							<IonIcon icon={heartOutline} />
						</IonButton>
						<IonInput
							aria-label={tCharsToCopy}
							id="toBeCopied"
							value={toCopy}
							onIonChange={(e) => modifySavedToBeCopied(e.detail.value as string)}
							placeholder={tTapToAdd}
						/>
						<IonButton
							size="default"
							slot="end"
							onClick={() => dispatch(toggleShowNames())}
							color={showNames ? "secondary" : undefined}
							fill={showNames ? "solid" : "clear"}
							aria-label={showNames ? tHideCharNames : tShowCharNames}
						>
							<IonIcon icon={readerOutline} />
						</IonButton>
					</IonItem>
					<IonItem className="extraHelp">
						<div>{tHelp2}</div>
					</IonItem>
					<IonItem>
						<div className="ion-flex-row-wrap ion-align-items-center ion-justify-content-center displayChips">
							<span>{tDisplay}</span>
							<IonChip
								outline={nowShowing !== "Favorites"}
								onClick={() => toggleChars("Favorites")}
								className={"ion-margin-start" + (nowShowing === "Favorites" ? " active" : "")}
							>
								<IonLabel>{tFavorites}</IonLabel>
							</IonChip>
							{contents.map(mapChips)}
						</div>
					</IonItem>
					<IonItem className="extraHelp">
						<div>{tHelp3}</div>
					</IonItem>
					{data ? (
						<IonItem key={`${nowShowing}-Group`}>
							{showNames ? (
								<div className="twoColumnsEC centralized">
									<h2>{tNowShowingCharInfo}</h2>
									{data.map(mapCharsWithNames)}
								</div>
							) : (
								<div className="multiColumnEC centralized">
									<h2>{tNowShowingCharInfo}</h2>
									<div>
										{data.map(mapChars)}
									</div>
								</div>
							)}
						</IonItem>
					) : <></>}
				</IonList>
			</IonContent>
			<IonFooter id="ExtraCharactersModalFooter">
				<IonToolbar className="ion-text-wrap">
					<IonButtons slot="end">
						<IonButton onClick={() => cancel()} slot="end" fill="solid" color="success">
							<IonIcon icon={checkmarkCircleOutline} slot="start" />
							<IonLabel>{tDone}</IonLabel>
						</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonFooter>
		</IonModal>
	);
};

export default ExtraCharactersModal;
