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
	IonFooter
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
import {
	openModal,
	updateLexiconText,
	updateLexiconNumber,
	updateLexicon,
	setLoadingPage,
	setTemporaryInfo,
	closeModal
} from '../components/ReduxDucksFuncs';
import { Lexicon, LexiconObject, ModalStateObject } from '../components/ReduxDucksTypes';
import { LexiconStorage } from '../components/PersistentInfo';
import fireSwal from '../components/Swal';

const LexiconStorageModal = () => {
	const dispatch = useDispatch();
	const [appSettings, modalState, lexicon] = useSelector((state: any) => [state.appSettings, state.modalState, state.lexicon]);
	const closeThisModal = () => {
		dispatch(closeModal("LexiconStorage"));
	};
	const clearLexicon = () => {
		const thenFunc = () => {
			const newLex: LexiconObject = {
				key: "",
				lastSave: 0,
				title: "",
				description: "",
				columns: lexicon.columns,
				columnOrder: [...lexicon.columnOrder],
				columnTitles: [...lexicon.columnTitles],
				columnSizes: [...lexicon.columnSizes],
				sort: [...lexicon.sort],
				sorted: true,
				lexicon: [],
				waitingToAdd: [...lexicon.waitingToAdd],
				editing: undefined,
				colEdit: undefined,
				lexiconWrap: lexicon.lexiconWrap
			};
			dispatch(updateLexicon(newLex));
			closeThisModal();
		};
		if(!appSettings.disableConfirms && (lexicon.title || lexicon.key || lexicon.description || lexicon.lexicon.length > 0)) {
			fireSwal({
				title: "Delete everything?",
				text: "This will erase everything currently displayed (but not anything previously saved). Are you sure you want to do this?",
				customClass: {popup: 'deleteConfirm'},
				icon: 'warning',
				showCancelButton: true,
				confirmButtonText: "Yes, erase it."
			}).then((result: any) => result.isConfirmed && thenFunc());
		} else {
			thenFunc();
		}
	};
	const openLexiconModal = (which: keyof ModalStateObject) => {
		let info: [string, LexiconObject][] = [];
		LexiconStorage.iterate((value: LexiconObject, key: string) => {
			info.push([key, value]);
			return; // Blank return keeps the loop going
		}).then(() => {
			info.length > 0 && dispatch(setTemporaryInfo({ type: "storedlexicons", data: info }));
			dispatch(setLoadingPage(false));
			dispatch(openModal(which));
		});
		closeThisModal();
		dispatch(setLoadingPage("lookingForLexicons"));
	};
	const saveLexicon: any = (
		announce: string = "Lexicon saved.",
		key: string = lexicon.key,
		overwrite: boolean = true
	) => {
		// Save original key
		const firstKey = lexicon.key;
		// Save 'now'
		const now = Date.now();
		if(!lexicon.title) {
			return lexiconSaveError();
		} else if(!key) {
			key = uuidv4();
			dispatch(updateLexiconText("key", key));
		}
		// Dispatch to state
		dispatch(updateLexiconNumber("lastSave", now));
		dispatch(setLoadingPage("lookingForLexicons"));
		// These dispatches will NOT be ready by the time Storage loads and saves
		//  so we will need to do some creative variable work
		let lex: LexiconObject = {...lexicon};
		// Use possibly-new key
		lex.key = key;
		// Use 'now'
		lex.lastSave = now;
		// Deep copy lex.lexicon
		lex.lexicon = lex.lexicon.map((lx: Lexicon) => {
			let x = {...lx};
			x.columns = [...lx.columns];
			return x;
		});
		// Deep copy column info
		lex.columnOrder = [...lex.columnOrder];
		lex.columnTitles = [...lex.columnTitles];
		lex.columnSizes = [...lex.columnSizes];
		lex.sort = [...lex.sort];
		LexiconStorage.setItem(key, lex)
			.then(() => {
				// If we're overwriting, and it's a new key, delete the old one
				if(overwrite && key !== firstKey) {
					LexiconStorage.removeItem(firstKey);
				}
				dispatch(setLoadingPage(false));
				fireSwal({
					title: announce,
					toast: true,
					timer: 2500,
					timerProgressBar: true,
					showConfirmButton: false
				});
			});
		dispatch(closeModal("LexiconStorage"));
	};
	const saveLexiconNew = () => {
		if(!lexicon.title) {
			return lexiconSaveError();
		}
		let key = uuidv4();
		dispatch(updateLexiconText("key", key));
		saveLexicon("Lexicon saved as new lexicon!", key, false);
	};
	const lexiconSaveError = () => {
		fireSwal({
			title: "Error",
			text: "You must input a title before saving.",
			icon: 'warning'
		});
	};
	const maybeExportLexicon = () => {
		if(!lexicon.title) {
			return fireSwal({
				title: "Error",
				text: "Please give your lexicon a title before exporting it.",
				icon: 'warning'
			});
		} else if (lexicon.lexicon.length < 1) {
			return fireSwal({
				title: "Error",
				text: "Please add words to your lexicon before exporting it.",
				icon: 'warning'
			});
		}
		dispatch(openModal("ExportLexicon"));
		dispatch(closeModal("LexiconStorage"));
	};
	// TO-DO: MOVE TEXT WRAP (and sort) TO EDIT LEXICON MODAL
	/*
					<IonItem button={true} onClick={() => toggleWrap()}>
						<IonLabel>{lexicon.lexiconWrap ? "Disable" : "Allow"} Text Wrapping</IonLabel>
					</IonItem>
	*/
	return (
		<IonModal isOpen={modalState.LexiconStorage} onDidDismiss={() => closeThisModal()}>
			<IonHeader>
				<IonToolbar color="primary">
					<IonTitle>Lexicon Storage</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<IonList lines="none">
					<IonItem button={true} onClick={() => clearLexicon()}>
						<IonIcon icon={removeCircleOutline} className="ion-padding-end" />
						<IonLabel>Clear Lexicon</IonLabel>
					</IonItem>
					<IonItem button={true} onClick={() => openLexiconModal("LoadLexicon")}>
						<IonIcon icon={addCircleOutline} className="ion-padding-end" />
						<IonLabel>Load Lexicon</IonLabel>
					</IonItem>
					<IonItem button={true} onClick={() => saveLexicon()}>
						<IonIcon icon={saveOutline} className="ion-padding-end" />
						<IonLabel>Save Lexicon</IonLabel>
					</IonItem>
					<IonItem button={true} onClick={() => saveLexiconNew()}>
						<IonIcon icon={saveOutline} className="ion-padding-end" />
						<IonLabel>Save As New</IonLabel>
					</IonItem>
					<IonItem button={true} onClick={() => maybeExportLexicon()}>
						<IonIcon icon={codeDownloadOutline} className="ion-padding-end" />
						<IonLabel>Export Lexicon</IonLabel>
					</IonItem>
					<IonItem button={true} onClick={() => openLexiconModal("DeleteLexicon")}>
						<IonIcon icon={trashOutline} className="ion-padding-end" />
						<IonLabel>Delete Saved Lexicon</IonLabel>
					</IonItem>
				</IonList>
			</IonContent>
			<IonFooter>
				<IonToolbar className="ion-text-wrap">
					<IonButtons slot="end">
						<IonButton onClick={() => closeThisModal()} slot="end" fill="solid" color="success">
							<IonIcon icon={checkmarkCircleOutline} slot="start" />
							<IonLabel>Done</IonLabel>
						</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonFooter>
		</IonModal>
	);
};

export default LexiconStorageModal;
