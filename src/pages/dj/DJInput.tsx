import React, { useState, useCallback } from 'react';
import {
	IonContent,
	IonPage,
	IonHeader,
	IonToolbar,
	IonMenuButton,
	IonButtons,
	IonTitle,
	IonButton,
	IonIcon,
	useIonAlert,
	useIonToast,
	AlertInput
} from '@ionic/react';
import {
	enterOutline,
	trashBinOutline,
	globeOutline
} from 'ionicons/icons';
import { useSelector, useDispatch } from "react-redux";

import { Lexicon, LexiconColumn, PageData, StateObject } from '../../store/types';
import { setInput } from '../../store/declenjugatorSlice';

import { $i } from '../../components/DollarSignExports';
import debounce from '../../components/Debounce';
import yesNoAlert from '../../components/yesNoAlert';
import toaster from '../../components/toaster';
import ExtraCharactersModal from '../modals/ExtraCharacters';

const DJInput = (props: PageData) => {
	const { modalPropsMaker } = props;
	const dispatch = useDispatch();
	const [isOpenECM, setIsOpenECM] = useState<boolean>(false);
	const [doAlert] = useIonAlert();
	const [doToast, undoToast] = useIonToast();
	const { input } = useSelector((state: StateObject) => state.dj);
	const { columns, lexicon } = useSelector((state: StateObject) => state.lexicon);
	const { disableConfirms } = useSelector((state: StateObject) => state.appSettings);

	const updateInput = useCallback((value: string) => {
		const trimmed = value.replace(/(?:\s*\r?\n\s*)+/g, "\n").trim();
		dispatch(setInput(trimmed));
	}, [dispatch]);
	const inputUpdated = useCallback((e: any) => {
		let value: string;
		if(e.target && e.target.value !== undefined) {
			value = (e.target.value);
		} else {
			value = ($i("djInput").value);
		}
		debounce(updateInput, [value], 500, "DJInput");
	}, [updateInput]);
	const clearInput = () => {
		const handler = () => {
			$i("djInput").value = "";
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
			let newInput = $i("djInput").value;
			if(newInput) {
				newInput += "\n"
			}
			lexicon.forEach((word: Lexicon) => {
				const imp = word.columns[col];
				imp && (newInput += imp + "\n");
			});
			$i("djInput").value = newInput;
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
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen className="evenBackground">
				<div className="hasMaxTextArea">
					<textarea
						spellCheck={false}
						aria-label="Words to Send through Declenjugator"
						id="djInput"
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

export default DJInput;
