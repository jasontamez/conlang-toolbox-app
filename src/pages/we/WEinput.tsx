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
	useIonToast,
	AlertInput
} from '@ionic/react';
import {
	helpCircleOutline,
	enterOutline,
	trashBinOutline,
	globeOutline
} from 'ionicons/icons';
import { useSelector, useDispatch } from "react-redux";

import { Lexicon, LexiconColumn, PageData, StateObject, ViewState } from '../../store/types';
import { setInputWE } from '../../store/weSlice';
import { saveView } from '../../store/viewSlice';

import ModalWrap from "../../components/ModalWrap";
import { $i } from '../../components/DollarSignExports';
import debounce from '../../components/Debounce';
import yesNoAlert from '../../components/yesNoAlert';
import toaster from '../../components/toaster';
import ExtraCharactersModal from '../modals/ExtraCharacters';
import { InpCard } from "./WECards";

const WEInput = (props: PageData) => {
	const { modalPropsMaker } = props;
	const dispatch = useDispatch();
	const [isOpenECM, setIsOpenECM] = useState<boolean>(false);
	const [isOpenInfo, setIsOpenInfo] = useState<boolean>(false);
	const viewInfo = { key: "we" as keyof ViewState, page: "input" };
	useIonViewDidEnter(() => {
		dispatch(saveView(viewInfo));
	});
	const [doAlert] = useIonAlert();
	const [doToast, undoToast] = useIonToast();
	const { columns, lexicon } = useSelector((state: StateObject) => state.lexicon);
	const { disableConfirms } = useSelector((state: StateObject) => state.appSettings);
	const { input } = useSelector((state: StateObject) => state.we);
	const updateInput = useCallback((value: string) => {
		const trimmed = value.replace(/(?:\s*\r?\n\s*)+/g, "\n").trim();
		dispatch(setInputWE(trimmed));
	}, [dispatch]);
	const inputUpdated = useCallback((e: any) => {
		let value: string;
		if(e.target && e.target.value !== undefined) {
			value = (e.target.value);
		} else {
			value = ($i("weInput").value);
		}
		debounce(updateInput, [value], 500, "WEinput");
	}, [updateInput]);
	const clearInput = () => {
		const handler = () => {
			$i("weInput").value = "";
			updateInput("");
		};
		if(disableConfirms) {
			handler();
		} else {
			yesNoAlert({
				header: "Clear Input",
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
			let newInput = $i("weInput").value;
			if(newInput) {
				newInput += "\n"
			}
			lexicon.forEach((word: Lexicon) => {
				const imp = word.columns[col];
				imp && (newInput += imp + "\n");
			});
			$i("weInput").value = newInput;
			updateInput(newInput);
		};
		if(columns.length === 1) {
			thenFunc(0);
		} else {
			doAlert({
				header: "Import from Lexicon",
				message: "Which column do you want to input?",
				inputs: columns.map((col: LexiconColumn, i: number) => {
					const input: AlertInput = {
						type: 'radio',
						label: col.label,
						value: i + 1,
						checked: !i
					};
					return input;
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
							toaster({
								message: `Imported words from "${columns[col - 1].label}"`,
								duration: 3500,
								position: "top",
								color: "success",
								doToast,
								undoToast
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
					<IonTitle>Input</IonTitle>
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
					<textarea
						spellCheck={false}
						aria-label="Words to Evolve"
						id="weInput"
						placeholder="Enter words here, one per line"
						defaultValue={input}
						onChange={inputUpdated}
					/>
				</div>
				<IonToolbar>
					<IonButtons slot="start">
						<IonButton
							onClick={clearInput}
							disabled={!input}
							color="warning"
							fill="solid"
							shape="round"
						><IonIcon icon={trashBinOutline} slot="start" /> Clear</IonButton>
					</IonButtons>
					<IonButtons slot="end">
						<IonButton
							onClick={importLexicon}
							disabled={lexicon.length === 0}
							color="primary"
							fill="solid"
							shape="round"
						><IonIcon icon={enterOutline} slot="start" /> Import from Lexicon</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonContent>
		</IonPage>
	);
};

export default WEInput;
