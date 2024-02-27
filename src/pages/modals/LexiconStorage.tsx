import React from 'react';
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
	IonFooter,
	useIonAlert,
	useIonToast
} from '@ionic/react';
import {
	addCircleOutline,
	checkmarkCircleOutline,
	removeCircleOutline,
	trashOutline,
	saveOutline,
	codeDownloadOutline
} from 'ionicons/icons';
import { useSelector, useDispatch } from "react-redux";
import { v4 as uuidv4 } from 'uuid';

import { loadStateLex, updateLexiconNumber, updateLexiconText } from '../../store/lexiconSlice';
import { Lexicon, LexiconState, ModalProperties, SetBooleanState, SetState, StateObject } from '../../store/types';
import blankAppState from '../../store/blankAppState';
import useTranslator from '../../store/translationHooks';

import { LexiconStorage } from '../../components/PersistentInfo';
import yesNoAlert from '../../components/yesNoAlert';
import toaster from '../../components/toaster';

// load, delete, export
interface StorageModalProps extends ModalProperties {
	openLoad: SetBooleanState,
	openDelete: SetBooleanState,
	openExport: SetBooleanState,
	setLoading: SetBooleanState,
	setLexInfo: SetState<[string, LexiconState][]>
}

const LexiconStorageModal = (props: StorageModalProps) => {
	const {
		isOpen,
		setIsOpen,
		openLoad,
		openDelete,
		openExport,
		setLoading,
		setLexInfo
	} = props;
	const dispatch = useDispatch();
	const [ tc ] = useTranslator('common');
	const [ t ] = useTranslator('lexicon');
	const [disableConfirms, stateLexicon]: [boolean, LexiconState] = useSelector(
		(state: StateObject) => [state.appSettings.disableConfirms, state.lexicon]
	);
	const {
		id,
		title,
		description,
		lexicon
	} = stateLexicon;
	const [doAlert] = useIonAlert();
	const toast = useIonToast();
	const clearLexicon = () => {
		const handler = () => {
			const newLex: LexiconState = {
				...blankAppState.lexicon
			};
			dispatch(loadStateLex(newLex));
			setIsOpen(false);
			toaster({
				message: t("Lexicon cleared"),
				duration: 4000,
				toast
			});
		};
		if(!(title || id || description || lexicon.length > 0)) {
			toaster({
				message: t("Nothing to clear"),
				color: "danger",
				duration: 3000,
				position: "top",
				toast
			});
		} else if(disableConfirms) {
			handler();
		} else {
			yesNoAlert({
				header: tc("Delete Everything?"),
				cssClass: "danger",
				message: t("deleteEverythingMessage"),
				submit: tc("confirmDelIt"),
				handler,
				doAlert
			});
		}
	};
	const openLexiconModal = (whichToOpen: SetBooleanState) => {
		const info: [string, LexiconState][] = [];
		setLoading(true);
		LexiconStorage.iterate((value: LexiconState, key: string) => {
			info.push([key, value]);
			return; // Blank return keeps the loop going
		}).then(() => {
			info.length > 0 && setLexInfo(info);
			setLoading(false);
			setIsOpen(false);
			whichToOpen(true);
		});
	};
	const saveLexicon = (
		announce: string = tc("thingSaved", { thing: tc("Lexicon") }),
		saveKey: string = id,
		overwrite: boolean = true
	) => {
		// Save original key
		const firstKey = saveKey;
		// Save 'now'
		const now = Date.now();
		if(!title) {
			return lexiconSaveError();
		} else if(!saveKey) {
			saveKey = uuidv4();
			dispatch(updateLexiconText(["id", saveKey]));
		}
		// Dispatch to state
		dispatch(updateLexiconNumber(["lastSave", now]));
		setLoading(true);
		// These dispatches will NOT be ready by the time Storage loads and saves
		//  so we will need to do some creative variable work
		const lex: LexiconState = {...stateLexicon};
		// Use possibly-new key
		lex.id = saveKey;
		// Use 'now'
		lex.lastSave = now;
		// Deep copy lex.lexicon
		lex.lexicon = lexicon.map((lx: Lexicon) => {
			const { id, columns } = lx;
			return {
				id,
				columns: [...columns]
			};
		});
		// Deep copy column info
		lex.sortPattern = [...lex.sortPattern];
		lex.columns = lex.columns.map(lx => ({...lx}));
		LexiconStorage.setItem(saveKey, lex).then(
			() => {
				// If we're overwriting, and it's a new key, delete the old one
				if(overwrite && saveKey !== firstKey) {
					LexiconStorage.removeItem(firstKey);
				}
				setLoading(false);
				setIsOpen(false);
				toaster({
					message: announce,
					duration: 2500,
					toast
				});
			}
		);
	};
	const saveLexiconNew = () => {
		if(!title) {
			return lexiconSaveError();
		}
		const newKey = uuidv4();
		dispatch(updateLexiconText(["id", newKey]));
		saveLexicon(t("Lexicon saved as new lexicon!"), newKey, false);
	};
	const lexiconSaveError = () => {
		doAlert({
			header: tc("error"),
			message: t("You must input a title before saving."),
			cssClass: "danger",
			buttons: [
				{
					text: tc("Ok"),
					role: "cancel",
					cssClass: "cancel"
				}
			]
		});
};
	const maybeExportLexicon = () => {
		if(!title) {
			return doAlert({
				header: tc("error"),
				message: t("Please give your lexicon a title before exporting it."),
				cssClass: "warning",
				buttons: [
					{
						text: tc("Ok"),
						role: "cancel",
						cssClass: "cancel"
					}
				]
			});
		} else if (lexicon.length < 1) {
			return doAlert({
				header: tc("error"),
				message: t("Please add words to your lexicon before exporting it."),
				cssClass: "warning",
				buttons: [
					{
						text: tc("Ok"),
						role: "cancel",
						cssClass: "cancel"
					}
				]
			});
		}
		setIsOpen(false);
		openExport(true);
	};
	return (
		<IonModal isOpen={isOpen} onDidDismiss={() => setIsOpen(false)}>
			<IonHeader>
				<IonToolbar color="primary">
					<IonTitle>{t("Lexicon Storage")}</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<IonList lines="none">
					<IonItem button={true} onClick={() => clearLexicon()}>
						<IonIcon icon={removeCircleOutline} className="ion-padding-end" />
						<IonLabel>{t("clearGeneralThings", { things: tc("Lexicon") })}</IonLabel>
					</IonItem>
					<IonItem button={true} onClick={() => openLexiconModal(openLoad)}>
						<IonIcon icon={addCircleOutline} className="ion-padding-end" />
						<IonLabel>{tc("loadThing", { thing: tc("Lexicon") })}</IonLabel>
					</IonItem>
					<IonItem button={true} onClick={() => saveLexicon()}>
						<IonIcon icon={saveOutline} className="ion-padding-end" />
						<IonLabel>{tc("saveThing", { thing: tc("Lexicon") })}</IonLabel>
					</IonItem>
					<IonItem button={true} onClick={() => saveLexiconNew()}>
						<IonIcon icon={saveOutline} className="ion-padding-end" />
						<IonLabel>{tc("Save as New")}</IonLabel>
					</IonItem>
					<IonItem button={true} onClick={() => maybeExportLexicon()}>
						<IonIcon icon={codeDownloadOutline} className="ion-padding-end" />
						<IonLabel>{tc("exportThing", { thing: tc("Lexicon") })}</IonLabel>
					</IonItem>
					<IonItem button={true} onClick={() => openLexiconModal(openDelete)}>
						<IonIcon icon={trashOutline} className="ion-padding-end" />
						<IonLabel>{tc("deleteThing", { thing: t("Saved Lexicon") })}</IonLabel>
					</IonItem>
				</IonList>
			</IonContent>
			<IonFooter>
				<IonToolbar className="ion-text-wrap">
					<IonButtons slot="end">
						<IonButton
							onClick={() => setIsOpen(false)}
							slot="end"
							fill="solid"
							color="success"
						>
							<IonIcon icon={checkmarkCircleOutline} slot="start" />
							<IonLabel>{tc("Done")}</IonLabel>
						</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonFooter>
		</IonModal>
	);
};

export default LexiconStorageModal;
