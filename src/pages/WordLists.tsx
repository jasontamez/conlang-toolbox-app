import React from 'react';
import {
	IonPage,
	IonHeader,
	IonTitle,
	IonToolbar,
	IonButtons,
	IonMenuButton,
	IonContent,
	IonList,
	IonLabel,
	IonChip,
	IonItem,
	IonButton,
	IonIcon,
	useIonViewDidEnter
} from '@ionic/react';
import {
	helpCircleOutline,
	saveOutline,
	checkmarkDoneOutline
} from 'ionicons/icons';
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import {
	updateWordListsDisplay,
	changeView,
	toggleWordListsBoolean,
	addDeferredLexiconItems,
	removeDeferredLexiconItem
} from '../components/ReduxDucksFuncs';
import { PageData, WL, WLCombo } from '../components/ReduxDucksTypes';
import { $a, $i } from '../components/DollarSignExports';
import { WordList, WordListSources } from '../components/WordLists';
import ModalWrap from "../components/ModalWrap";
import { WLCard } from "./wg/WGCards";
import fireSwal from '../components/Swal';

const Home = (props: PageData) => {
	const { modalPropsMaker } = props;
	const [isOpenInfo, setIsOpenInfo] = React.useState<boolean>(false);
	const [pickAndSave, setPickAndSave] = React.useState<boolean>(false);
	const [linking, setLinking] = React.useState<boolean>(false);
	const [unlinking, setUnlinking] = React.useState<boolean>(false);
	const [wordListsState, waitingToAdd] = useSelector((state: any) => [state.wordListsState, state.lexicon.waitingToAdd], shallowEqual);
	const {
		display,
		showingCombos,
		combinations,
		textCenter
	} = wordListsState;
	const dispatch = useDispatch();
	const toggleChars = (what: keyof WL) => {
		if(display.some((p: keyof WL) => p === what)) {
			return dispatch(updateWordListsDisplay(display.filter((p: keyof WL) => p !== what)));
		}
		dispatch(updateWordListsDisplay([...display, what]));
	};
	const shown = WordList.filter((word: WL) => display.some((p: keyof WL) => word[p]));
	const viewInfo = ['wl', 'home'];
	useIonViewDidEnter(() => {
		dispatch(changeView(viewInfo));
	});
	const outputPane = $i("outputPaneWL");

	// // //
	// Save to Lexicon
	// // //
	const doPickAndSave = () => {
		setPickAndSave(true);
		return fireSwal({
			title: "Tap words you want to save to Lexicon",
			toast: true,
			timer: 2500,
			position: 'top',
			timerProgressBar: true,
			showConfirmButton: false
		});	
	};
	const donePickingAndSaving = () => {
		setPickAndSave(false);
	};
	const saveEverything = () => {
		const wordsToSave: string[] = [];
		setPickAndSave(false);
		$a(".word", outputPane).forEach((word: HTMLElement) => {
			word.textContent && wordsToSave.push(word.textContent);
		});
		dispatch(addDeferredLexiconItems(wordsToSave));
		return fireSwal({
			title: "All words have been sent to Lexicon",
			toast: true,
			timer: 2500,
			position: 'top',
			timerProgressBar: true,
			showConfirmButton: false
		});	
	};
	const maybeSaveThisWord = (text: string) => {
		if(outputPane.classList.contains("pickAndSave")) {
			const CL = ($i(text) as HTMLElement).classList;
			if(CL.contains("saved")) {
				CL.remove("saved");
				dispatch(removeDeferredLexiconItem(text));
			} else {
				CL.add("saved");
				dispatch(addDeferredLexiconItems([text]));
			}
		}
	};

	return (
		<IonPage>
			<ModalWrap {...modalPropsMaker(isOpenInfo, setIsOpenInfo)}><WLCard /></ModalWrap>
			<IonHeader>
				<IonToolbar>
					 <IonButtons slot="start">
						 <IonMenuButton />
					 </IonButtons>
					<IonTitle>Word Lists</IonTitle>
					<IonButtons slot="end">
						<IonButton onClick={() => dispatch(toggleWordListsBoolean("textCenter"))}>
							{
								textCenter ?
									<IonIcon size="small" slot="end" src="svg/align-left-material.svg" />
								:
									<IonIcon size="small" slot="end" src="svg/align-center-material.svg" />
							}
						</IonButton>
						<IonButton onClick={() => setIsOpenInfo(true)}>
							<IonIcon icon={helpCircleOutline} />
						</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<IonList lines="none">
					<IonItem className="wordListChips">
						<div className="chips">
							<span>Display:</span>
							{WordListSources.map((pair: [string, keyof WL], ind: number) => {
								const [list, prop] = pair;
								const current = display.some((p: keyof WL) => p === prop);
								return (
									<IonChip key={prop} outline={!current} onClick={() => toggleChars(prop)} className={(ind === 0 ? ("ion-margin-start" + (current ? " " : "")) : "") + (current ? "active" : "")}>
										<IonLabel>{list}</IonLabel>
									</IonChip>	
								);
							})}
							{(
								<IonChip key="combinations" outline={!showingCombos} onClick={() => dispatch(toggleWordListsBoolean("showingCombos"))} className={showingCombos ? "active" : undefined}>
									<IonLabel>My Combinations</IonLabel>
								</IonChip>	
							)}
						</div>
						<div className="controls">
							<IonButton fill="outline" onClick={() => doPickAndSave()}>
								<IonIcon slot="icon-only" icon={saveOutline} />
							</IonButton>
							<IonButton fill={linking ? "solid" : "outline"} color="secondary" onClick={() => setLinking(!linking)}>
								<IonIcon slot="icon-only" src="svg/link.svg" />
							</IonButton>
							{showingCombos && <IonButton fill={unlinking ? "solid" : "outline"} color="secondary" onClick={() => setUnlinking(!unlinking)}>
								<IonIcon slot="icon-only" src="svg/unlink.svg" />
							</IonButton>}
						</div>
					</IonItem>
					<IonItem className={pickAndSave ? "" : "hide"}>
						<IonButton strong={true} color="tertiary" onClick={() => saveEverything()}>
							<IonIcon icon={saveOutline} style={ { marginRight: "0.5em" } } /> Save All Words
						</IonButton>
					</IonItem>
					<IonItem className={pickAndSave ? "" : "hide"}>
						<IonButton strong={true} color="secondary" onClick={() => donePickingAndSaving()}>
							<IonIcon icon={checkmarkDoneOutline} style={ { marginRight: "0.5em" } } /> Finish Saving
						</IonButton>
					</IonItem>
					<div id="outputPaneWL" className={(pickAndSave ? "pickAndSave " : "") + "wordList"}>
						{showingCombos && combinations.map((combo: WLCombo) => {
							const { id, parts } = combo;
							const word = parts.map((w: WL) => w.word).join("; ");
							const classes =
								((waitingToAdd.some((w: string) => w === word)) ? "saved " : "")
								+ "word ion-text-"
								+ (textCenter ? "center" : "start");
							return (
								<div onClick={() => maybeSaveThisWord(word)} key={id} id={id} className={classes}>{word}</div>
							);
						})}
						{shown.map((word: WL) => {
							const ww = word.word;
							const classes =
								((waitingToAdd.some((w: string) => w === ww)) ? "saved" : "")
								+ "word ion-text-"
								+ (textCenter ? "center" : "start");
							return (
								<div onClick={() => maybeSaveThisWord(ww)} key={ww} id={ww} className={classes}>{ww}</div>
							)
						})}
					</div>
				</IonList>
			</IonContent>
		</IonPage>
	);
};

export default Home;
