import React, { useCallback, useMemo, FC } from 'react';
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
	StateObject,
	WGOutputTypes
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
import useI18Memo from '../../../components/useI18Memo';

const setChecked = (dispatch: Dispatch, action: (x: boolean) => PayloadAction<boolean>) => {
	return (e: CustomEvent<ToggleChangeEventDetail<any>>) => {
		dispatch(action(e.detail.checked));
	};
};

const translations = [
	"All possible syllables", "Capitalize words", "Default",
	"Multi-column layout", "Number of sentences", "Pseudo-text",
	"Show syllable breaks", "Sort output", "What to Generate",
	"Wordlist size", "Wordlist", "Pseudo-text Controls",
	"Wordlist and Syllable-List Controls"
];

const commons = [ "Close", "Done" ];

const OutputOptionsModal: FC<ModalProperties> = (props) => {
	const [ tc ] = useTranslator('common');
	const [ tw ] = useTranslator('wgwe');
	const tOutOpts = useMemo(() => tw("Output Options"), [tw]);
	const tSortMethod = useMemo(() => tc("Sort method", { context: "presentation" }), [tc]);
	const [
		tAllSyll, tCap, tDefault, tMulti, tNumSent,
		tPseudo, tSyllBr, tSort, tWhat, tWLSize, tWL,
		tPsCtrl, tWLSyllCtrl
	] = useI18Memo(translations, 'wg');
	const [ tClose, tDone ] = useI18Memo(commons);

	const { isOpen, setIsOpen } = props;
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
	const closer = useCallback(() => setIsOpen(false), [setIsOpen]);
	const dispatchOutputType = useCallback((type: WGOutputTypes) => dispatch(setOutputTypeWG(type)), [dispatch]);
	const toText = useCallback(() => dispatchOutputType('text'), [dispatchOutputType]);
	const toWL = useCallback(() => dispatchOutputType('wordlist'), [dispatchOutputType]);
	const toSyll = useCallback(() => dispatchOutputType('syllables'), [dispatchOutputType]);
	return (
		<IonModal isOpen={isOpen} onDidDismiss={closer}>
			<IonHeader>
				<IonToolbar color="primary">
					<IonTitle>{tOutOpts}</IonTitle>
					<IonButtons slot="end">
						<IonButton onClick={closer} aria-label={tClose}>
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
						>{tSyllBr}</IonToggle>
					</IonItem>
					<IonItemDivider>{tWhat}</IonItemDivider>
					<IonItem button={true} onClick={toText}>
						<IonLabel>{tPseudo}</IonLabel>
						<IonIcon
							icon={output === "text" ? checkmarkCircleOutline : ellipseOutline}
						/>
					</IonItem>
					<IonItem button={true} onClick={toWL}>
						<IonLabel>{tWL}</IonLabel>
						<IonIcon
							icon={output === "wordlist" ? checkmarkCircleOutline : ellipseOutline}
						/>
					</IonItem>
					<IonItem button={true} onClick={toSyll}>
						<IonLabel>{tAllSyll}</IonLabel>
						<IonIcon
							icon={output === "syllables" ? checkmarkCircleOutline : ellipseOutline}
						/>
					</IonItem>
					<IonItemDivider>{output === "text" ? tPsCtrl : tWLSyllCtrl}</IonItemDivider>
					<IonItem className={(output === "text" ? "" : "hide") + " labelled"}>
						<IonLabel>{tNumSent}</IonLabel>
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
						>{tCap}</IonToggle>
					</IonItem>
					<IonItem className={output === "text" ? "hide" : ""}>
						<IonToggle
							enableOnOffLabels
							labelPlacement="start"
							checked={sortWordlist}
							onIonChange={setChecked(dispatch, setSortWordlistWG)}
						>{tSort}</IonToggle>
					</IonItem>
					<IonItem className={(output === "text" || !sortWordlist) ? "hide" : ""}>
						<IonSelect
							color="primary"
							className="ion-text-wrap settings"
							label={tSortMethod}
							value={customSort || null}
							onIonChange={onChangeCustomSort}
						>
							<IonSelectOption
								className="ion-text-wrap ion-text-align-end"
								value={null}
							>{tDefault}</IonSelectOption>
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
						>{tMulti}</IonToggle>
					</IonItem>
					<IonItem className={(output === "text" ? "hide" : "") + " labelled"}>
						<IonLabel>{tWLSize}</IonLabel>
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
					<IonButton color="success" slot="end" onClick={closer}>
						<IonLabel>{tDone}</IonLabel>
					</IonButton>
				</IonToolbar>
			</IonFooter>
		</IonModal>
	);
};

export default OutputOptionsModal;
