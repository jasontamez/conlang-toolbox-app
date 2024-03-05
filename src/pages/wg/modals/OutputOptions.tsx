import React, { useCallback } from 'react';
import {
	IonContent,
	IonHeader,
	IonToolbar,
	IonButtons,
	IonTitle,
	IonList,
	IonButton,
	IonItemDivider,
	IonItem,
	IonLabel,
	IonToggle,
	IonRange,
	IonModal,
	IonIcon,
	IonFooter,
	IonSelect,
	IonSelectOption,
	ToggleChangeEventDetail,
	RangeChangeEventDetail
} from '@ionic/react';
import { useSelector, useDispatch } from "react-redux";
import { Dispatch } from 'redux';
import { PayloadAction } from '@reduxjs/toolkit';
import {
	checkmarkCircleOutline,
	closeCircleOutline,
	ellipseOutline
} from 'ionicons/icons';

import {
	Fifty_OneThousand,
	Five_OneHundred,
	ModalProperties,
	StateObject
} from '../../../store/types';
import {
	setOutputTypeWG,
	setSyllableBreaksWG,
	setSentencesPerTextWG,
	setCapitalizeWordsWG,
	setSortWordlistWG,
	setWordlistMulticolumnWG,
	setWordsPerWordlistWG,
	setCustomSort
} from '../../../store/wgSlice';
import useTranslator from '../../../store/translationHooks';

import PermanentInfo from '../../../components/PermanentInfo';

const setChecked = (dispatch: Dispatch, action: (x: boolean) => PayloadAction<boolean>) => {
	return (e: CustomEvent<ToggleChangeEventDetail<any>>) => {
		dispatch(action(e.detail.checked));
	};
};

const OutputOptionsModal = (props: ModalProperties) => {
	const { isOpen, setIsOpen } = props;
	const [ t ] = useTranslator('we');
	const [ tc ] = useTranslator('common');
	const [ tw ] = useTranslator('wgwe');
	const dispatch = useDispatch();
	const {
		output,
		showSyllableBreaks,
		sentencesPerText,
		capitalizeWords,
		sortWordlist,
		wordlistMultiColumn,
		wordsPerWordlist,
		customSort
	} = useSelector((state: StateObject) => state.wg);
	const { customSorts } = useSelector((state: StateObject) => state.sortSettings);
	const onChangeWordsWordlist = useCallback(
		(e: CustomEvent<RangeChangeEventDetail>) => dispatch(setWordsPerWordlistWG(e.detail.value as Fifty_OneThousand)),
		[dispatch]
	);
	const onChangeSentencesWordlist = useCallback(
		(e: CustomEvent<RangeChangeEventDetail>) => dispatch(setSentencesPerTextWG(e.detail.value as Five_OneHundred)),
		[dispatch]
	);
	const onChangeCustomSort = useCallback(
		(e: CustomEvent) => dispatch(setCustomSort(e.detail.value)),
		[dispatch]
	);
	return (
		<IonModal isOpen={isOpen} onDidDismiss={() => setIsOpen(false)}>
			<IonHeader>
				<IonToolbar color="primary">
					<IonTitle>{tw("Output Options")}</IonTitle>
					<IonButtons slot="end">
						<IonButton onClick={() => setIsOpen(false)} aria-label={tc("Close")}>
							<IonIcon icon={closeCircleOutline} />
						</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<IonList lines="full" className="hasSpecialLabels">
					<IonItem>
						<IonToggle
							enableOnOffLabels
							labelPlacement="start"
							checked={showSyllableBreaks}
							onIonChange={setChecked(dispatch, setSyllableBreaksWG)}
						>{t("Show syllable breaks")}</IonToggle>
					</IonItem>
					<IonItemDivider>{t("What to Generate")}</IonItemDivider>
					<IonItem button={true} onClick={() => dispatch(setOutputTypeWG('text'))}>
						<IonLabel>{t("Pseudo-text")}</IonLabel>
						<IonIcon
							icon={output === "text" ? checkmarkCircleOutline : ellipseOutline}
						/>
					</IonItem>
					<IonItem button={true} onClick={() => dispatch(setOutputTypeWG('wordlist'))}>
						<IonLabel>{t("Wordlist")}</IonLabel>
						<IonIcon
							icon={output === "wordlist" ? checkmarkCircleOutline : ellipseOutline}
						/>
					</IonItem>
					<IonItem button={true} onClick={() => dispatch(setOutputTypeWG('syllables'))}>
						<IonLabel>{t("All possible syllables")}</IonLabel>
						<IonIcon
							icon={output === "syllables" ? checkmarkCircleOutline : ellipseOutline}
						/>
					</IonItem>
					<IonItemDivider>{t(
						output === "text" ?
							"Pseudo-text Controls"
						:
							"Wordlist and Syllable-List Controls"
					)}</IonItemDivider>
					<IonItem className={(output === "text" ? "" : "hide") + " labelled"}>
						<IonLabel>{t("Number of sentences")}</IonLabel>
					</IonItem>
					<IonItem className={output === "text" ? "" : "hide"}>
						<IonRange
							debounce={250}
							min={5} max={100}
							value={sentencesPerText}
							pin={true}
							onIonChange={onChangeSentencesWordlist}
						>
							<div slot="start">5</div>
							<div slot="end">100</div>
						</IonRange>
					</IonItem>
					<IonItem className={output === "text" ? "hide" : ""}>
						<IonToggle
							enableOnOffLabels
							labelPlacement="start"
							checked={capitalizeWords}
							onIonChange={setChecked(dispatch, setCapitalizeWordsWG)}
						>{t("Capitalize words")}</IonToggle>
					</IonItem>
					<IonItem className={output === "text" ? "hide" : ""}>
						<IonToggle
							enableOnOffLabels
							labelPlacement="start"
							checked={sortWordlist}
							onIonChange={setChecked(dispatch, setSortWordlistWG)}
						>{t("Sort output")}</IonToggle>
					</IonItem>
					<IonItem className={(output === "text" || !sortWordlist) ? "hide" : ""}>
						<IonSelect
							color="primary"
							className="ion-text-wrap settings"
							label={tc("Sort method", { context: "presentation" })}
							value={customSort || null}
							onIonChange={onChangeCustomSort}
						>
							<IonSelectOption
								className="ion-text-wrap ion-text-align-end"
								value={null}
							>{t("Default")}</IonSelectOption>
							{customSorts.concat(PermanentInfo.sort.permanentCustomSortObjs).map(sorter => (
								<IonSelectOption
									className="ion-text-wrap ion-text-align-end"
									key={`customSortChooser:${sorter.id}:${sorter.title}`}
									value={sorter.id}
								>{sorter.title}</IonSelectOption>
							))}
						</IonSelect>
					</IonItem>
					<IonItem className={output === "text" ? "hide" : ""}>
						<IonToggle
							enableOnOffLabels
							labelPlacement="start"
							checked={wordlistMultiColumn}
							onIonChange={setChecked(dispatch, setWordlistMulticolumnWG)}
						>{t("Multi-column layout")}</IonToggle>
					</IonItem>
					<IonItem className={(output === "text" ? "hide" : "") + " labelled"}>
						<IonLabel>{t("Wordlist size")}</IonLabel>
					</IonItem>
					<IonItem className={output === "text" ? "hide" : ""}>
						<IonRange
							debounce={250}
							min={50} max={1000}
							value={wordsPerWordlist}
							pin={true}
							onIonChange={onChangeWordsWordlist}
						>
							<div slot="start">50</div>
							<div slot="end">1000</div>
						</IonRange>
					</IonItem>
				</IonList>
			</IonContent>
			<IonFooter>
				<IonToolbar>
					<IonButton color="success" slot="end" onClick={() => setIsOpen(false)}>
						<IonLabel>{tc("Done")}</IonLabel>
					</IonButton>
				</IonToolbar>
			</IonFooter>
		</IonModal>
	);
};

export default OutputOptionsModal;
