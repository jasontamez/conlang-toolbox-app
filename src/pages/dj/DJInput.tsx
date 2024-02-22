import React, { useState, useCallback, ChangeEventHandler } from 'react';
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
	enterOutline,
	trashBinOutline,
	globeOutline,
	helpCircleOutline
} from 'ionicons/icons';
import { useSelector, useDispatch } from "react-redux";

import { PageData, StateObject } from '../../store/types';
import { setInput } from '../../store/declenjugatorSlice';
import useTranslator from '../../store/translationHooks';

import { $i } from '../../components/DollarSignExports';
import debounce from '../../components/Debounce';
import yesNoAlert from '../../components/yesNoAlert';
import ExtraCharactersModal from '../modals/ExtraCharacters';
import LexiconImporterModal from '../modals/ImportFromLexicon';
import ModalWrap from '../../components/ModalWrap';
import { InputCard } from './DJinfo';

const DJInput = (props: PageData) => {
	const [ t ] = useTranslator('dj');
	const [ tc ] = useTranslator('common');
	const { modalPropsMaker } = props;
	const dispatch = useDispatch();
	const [isOpenECM, setIsOpenECM] = useState<boolean>(false);
	const [isOpenInfo, setIsOpenInfo] = useState<boolean>(false);
	const [isOpenLexImport, setIsOpenLexImport] = useState<boolean>(false);
	const [doAlert] = useIonAlert();
	const { input } = useSelector((state: StateObject) => state.dj);
	const { lexicon } = useSelector((state: StateObject) => state.lexicon);
	const { disableConfirms } = useSelector((state: StateObject) => state.appSettings);

	const updateInput = useCallback((value: string) => {
		const trimmed = value.replace(/(?:\s*\r?\n\s*)+/g, "\n").trim();
		dispatch(setInput(trimmed));
	}, [dispatch]);
	const inputUpdated: ChangeEventHandler<HTMLTextAreaElement> = useCallback((e) => {
		let value: string;
		if(e.target && e.target.value) {
			value = String(e.target.value);
		} else {
			const el = $i<HTMLInputElement>("djInput");
			value = el ? el.value : "";
		}
		debounce<(x: string) => void, string>(updateInput, [value], 500, "DJInput");
	}, [updateInput]);
	const acceptImport = useCallback((value: string) => {
		const el = $i<HTMLInputElement>("djInput");
		el && (el.value = value);
		updateInput(value);
	}, [updateInput]);
	const clearInput = () => {
		const handler = () => {
			const el = $i<HTMLInputElement>("djInput");
			el && (el.value = "");
			updateInput("");
		};
		if(disableConfirms) {
			handler();
		} else {
			yesNoAlert({
				header: tc("Clear Input"),
				message: tc("Are you sure? This will clear the entire input and cannot be undone."),
				cssClass: "danger",
				submit: tc("Yes Clear It"),
				handler,
				doAlert
			});
		}
	};
	return (
		<IonPage>
			<ExtraCharactersModal {...modalPropsMaker(isOpenECM, setIsOpenECM)} />
			<ModalWrap {...props.modalPropsMaker(isOpenInfo, setIsOpenInfo)}>
				<InputCard setIsOpenInfo={setIsOpenInfo} />
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
					<IonTitle>{tc("Input")}</IonTitle>
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
						aria-label={t("Words to send through Declenjugator")}
						id="djInput"
						placeholder={t("Enter words here, one per line")}
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
						><IonIcon icon={trashBinOutline} slot="start" /> {tc("Clear")}</IonButton>
					</IonButtons>
					<IonButtons slot="end">
						<IonButton
							onClick={() => setIsOpenLexImport(true)}
							disabled={lexicon.length === 0}
							color="primary"
							fill="solid"
							shape="round"
						><IonIcon icon={enterOutline} slot="start" /> {tc("ImportFrom", { source: tc("Lexicon") })}</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonContent>
		</IonPage>
	);
};

export default DJInput;
