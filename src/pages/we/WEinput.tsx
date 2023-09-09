import React, { useState, useCallback } from 'react';
import {
	IonContent,
	IonPage,
	IonHeader,
	IonToolbar,
	IonMenuButton,
	IonButtons,
	IonTitle,
	useIonViewDidEnter,
	IonButton,
	IonIcon,
	useIonAlert,
	useIonToast
} from '@ionic/react';
import {
	helpCircleOutline,
	enterOutline,
	trashBinOutline,
	globeOutline
} from 'ionicons/icons';
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import {
	changeView,
	updateInputLexicon
} from '../../components/ReduxDucksFuncs';
import { InpCard } from "./WECards";
import ModalWrap from "../../components/ModalWrap";
import { Lexicon, LexiconColumn, PageData } from '../../components/ReduxDucksTypes';
import { $i } from '../../components/DollarSignExports';
import ExtraCharactersModal from '../M-ExtraCharacters';
import debounce from '../../components/Debounce';
import yesNoAlert from '../../components/yesNoAlert';

const WERew = (props: PageData) => {
	const { modalPropsMaker } = props;
	const dispatch = useDispatch();
	const [isOpenECM, setIsOpenECM] = useState<boolean>(false);
	const [isOpenInfo, setIsOpenInfo] = useState<boolean>(false);
	const viewInfo = ['we', 'input'];
	useIonViewDidEnter(() => {
		dispatch(changeView(viewInfo));
	});
	const [doAlert] = useIonAlert();
	const [doToast] = useIonToast();
	const [rawInput, disableConfirms, lexiconObj] = useSelector((state: any) => [state.wordevolveInput, state.appSettings.disableConfirms, state.lexicon], shallowEqual);
	const { columns, lexicon } = lexiconObj;
	const input = rawInput.join("\n");
	const updateInput = useCallback((value: string) => {
		const newInput: string[] = value.split("\n").map(v => v.trim()).filter(v => v);
		dispatch(updateInputLexicon(newInput));
	}, [dispatch]);
	const inputUpdated = useCallback((e: any) => {
		let value: string;
		if(e.target && e.target.value !== undefined) {
			value = (e.target.value);
		} else {
			value = ($i("lexiconInput").value);
		}
		debounce(updateInput, [value], 500, "WEinput");
	}, [updateInput]);
	const clearInput = () => {
		const handler = () => {
			$i("lexiconInput").value = "";
			updateInput("");
		};
		if(disableConfirms) {
			handler();
		} else {
			yesNoAlert({
				header: "Clear Lexicon",
				message: "Are you sure? This will clear the entire input, and cannot be undone.",
				cssClass: "danger",
				submit: "Yes, clear it",
				handler,
				doAlert
			});
		}
	};
	const importLexicon = () => {
		const inputOptions: { [key: string]: string } = {};
		columns.forEach((col: LexiconColumn) => {
			inputOptions[col.id] = col.label;
		});
		const thenFunc = (col: number) => {
			let newInput = $i("lexiconInput").value;
			if(newInput) {
				newInput += "\n"
			}
			lexicon.forEach((word: Lexicon) => {
				const imp = word.columns[col];
				imp && (newInput += imp + "\n");
			});
			$i("lexiconInput").value = newInput;
			updateInput(newInput);
		};
		if(columns.length === 1) {
			thenFunc(0);
		} else {
			doAlert({
				header: "Import Lexicon",
				message: "Which column do you want to input?",
				inputs: columns.map((col: LexiconColumn, i: number) => {
					return {
						type: 'radio',
						label: col.label,
						value: i + 1,
						checked: !i
					};
				}),
				buttons: [
					{
						text: "Cancel",
						role: 'cancel'
					},
					{
						text: "Import",
						handler: (col: number | undefined) => {
							if(!col) {
								// Treat as cancel
								return;
							}
							thenFunc(col - 1);
							// Toast
							doToast({
								message: `Imported words from "${columns[col - 1].label}"`,
								duration: 3500,
								position: "top",
								cssClass: "success"
							});
						}
					}
				]
			});
		}
	};
	return (
		<IonPage>
			<ExtraCharactersModal {...modalPropsMaker(isOpenECM, setIsOpenECM)} />
			<ModalWrap {...modalPropsMaker(isOpenInfo, setIsOpenInfo)}><InpCard /></ModalWrap>
			<IonHeader>
				<IonToolbar>
					<IonButtons slot="start">
						<IonMenuButton />
					</IonButtons>
					<IonTitle>Input Lexicon</IonTitle>
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
			<IonContent fullscreen className="evenBackground">
				<div className="WEinput">
					<textarea spellCheck={false} aria-label="Words to Evolve" id="lexiconInput" placeholder="Enter words here, one per line" defaultValue={input} onChange={inputUpdated} />
				</div>
				<IonToolbar>
					<IonButtons slot="start">
						<IonButton onClick={clearInput} disabled={!input} color="warning" fill="solid" shape="round"><IonIcon icon={trashBinOutline} slot="start" /> Clear</IonButton>
					</IonButtons>
					<IonButtons slot="end">
						<IonButton onClick={importLexicon} disabled={lexicon.length === 0} color="primary" fill="solid" shape="round"><IonIcon icon={enterOutline} slot="start" /> Import from Lexicon</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonContent>
		</IonPage>
	);
};

export default WERew;
