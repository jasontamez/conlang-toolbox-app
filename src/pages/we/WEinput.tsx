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
	useIonAlert
} from '@ionic/react';
import {
	helpCircleOutline,
	enterOutline,
	trashBinOutline,
	globeOutline
} from 'ionicons/icons';
import { useSelector, useDispatch } from "react-redux";

import { PageData, StateObject } from '../../store/types';
import { setInputWE } from '../../store/weSlice';

import ModalWrap from "../../components/ModalWrap";
import { $i } from '../../components/DollarSignExports';
import debounce from '../../components/Debounce';
import yesNoAlert from '../../components/yesNoAlert';
import ExtraCharactersModal from '../modals/ExtraCharacters';
import LexiconImporterModal from '../modals/ImportFromLexicon';
import { InpCard } from "./WEinfo";

const WEInput = (props: PageData) => {
	const { modalPropsMaker } = props;
	const dispatch = useDispatch();
	const [isOpenECM, setIsOpenECM] = useState<boolean>(false);
	const [isOpenInfo, setIsOpenInfo] = useState<boolean>(false);
	const [isOpenLexImport, setIsOpenLexImport] = useState<boolean>(false);
	const [doAlert] = useIonAlert();
	const { lexicon } = useSelector((state: StateObject) => state.lexicon);
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
			const el = $i<HTMLInputElement>("weInput");
			value = el ? el.value : "";
		}
		debounce(updateInput, [value], 500, "WEinput");
	}, [updateInput]);
	const acceptImport = useCallback((value: string) => {
		const el = $i<HTMLInputElement>("weInput");
		el && (el.value = value);
		updateInput(value);
	}, [updateInput]);
	const clearInput = () => {
		const handler = () => {
			const el = $i<HTMLInputElement>("weInput");
			el && (el.value = "");
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
	return (
		<IonPage>
			<ExtraCharactersModal {...modalPropsMaker(isOpenECM, setIsOpenECM)} />
			<ModalWrap {...modalPropsMaker(isOpenInfo, setIsOpenInfo)}>
				<InpCard setIsOpenInfo={setIsOpenInfo} />
			</ModalWrap>
			<LexiconImporterModal
				{...modalPropsMaker(isOpenLexImport, setIsOpenLexImport)}
				openECM={setIsOpenECM}
				currentInput={input}
				importFunc={acceptImport}
			/>
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
				<div className="hasMaxTextArea">
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
							onClick={() => setIsOpenLexImport(true)}
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
