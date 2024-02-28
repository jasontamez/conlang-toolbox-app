import React, { useState } from 'react';
import {
	IonPage,
	IonContent,
	IonList,
	IonItem,
	useIonViewDidEnter,
	IonLoading,
	IonIcon,
	IonLabel,
	IonInput,
	IonTextarea,
	useIonAlert,
	useIonToast
} from '@ionic/react';
import {
	addCircleOutline,
	codeDownloadOutline,
	removeCircleOutline,
	saveOutline,
	trashOutline
} from 'ionicons/icons';
import { v4 as uuidv4 } from 'uuid';
import { Action, Dispatch } from 'redux';
import { useDispatch, useSelector } from "react-redux";

import { PageData, MSState, StateObject, SetBooleanState } from '../../store/types';
import { loadStateMS, setMorphoSyntaxNum, setMorphoSyntaxText } from '../../store/msSlice';
import { setLastViewMS } from '../../store/internalsSlice';
import blankAppState from '../../store/blankAppState';
import useTranslator from '../../store/translationHooks';

import { MorphoSyntaxStorage } from '../../components/PersistentInfo';
import debounce from '../../components/Debounce';
import { $i } from '../../components/DollarSignExports';
import yesNoAlert from '../../components/yesNoAlert';
import toaster from '../../components/toaster';

import { SyntaxHeader } from './MorphoSyntaxElements';
import LoadMS from './modals/LoadSyntaxDoc';
import DeleteMS from './modals/DeleteSyntaxDoc';
import ExportMS from './modals/ExportSyntaxDoc';

const Syntax = (props: PageData) => {
	const [ t ] = useTranslator('ms');
	const [ tc ] = useTranslator('common');
	const [isOpenLoadMS, setIsOpenLoadMS] = useState<boolean>(false);
	const [isOpenExportMS, setIsOpenExportMS] = useState<boolean>(false);
	const [isOpenDelMS, setIsOpenDelMS] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [storedInfo, setStoredInfo] = useState<[string, MSState][]>([]);
	const dispatch = useDispatch();
	const [doAlert] = useIonAlert();
	const toast = useIonToast();
	const disableConfirms = useSelector((state: StateObject) => state.appSettings.disableConfirms);
	const {
		title,
		description,
		id,
		lastSave,
		...msRemainder
	} = useSelector((state: StateObject) => state.ms);
	const allProps = Object.keys(msRemainder).length;
	useIonViewDidEnter(() => {
		dispatch(setLastViewMS("msSettings"));
	});
	const clearMS = () => {
		const handler = () => {
			dispatch(loadStateMS(blankAppState.ms));
		};
		if(!(title || id || description || (allProps > 0))) {
			toaster({
				message: t("You have no information to clear."),
				duration: 2500,
				color: "warning",
				position: "top",
				toast
			});
		} else if(!disableConfirms) {
			yesNoAlert({
				header: tc("Delete Everything?"),
				message: tc("clearOverrideGeneralThings", { things: t("morphoSyntaxInfo") }),
				cssClass: "danger",
				submit: tc("confirmDelIt"),
				handler,
				doAlert
			});
		} else {
			handler();
		}
	};
	const openMSModal = (modalOpener: SetBooleanState) => {
		const info: [string, MSState][] = [];
		setIsLoading(true);
		MorphoSyntaxStorage.iterate((value: MSState, key: string) => {
			info.push([key, value]);
			return; // Blank return keeps the loop going
		}).then(() => {
			setStoredInfo(info);
			setIsLoading(false);
			modalOpener(true);
		});
	};
	const maybeExportMS = () => {
		if(!title) {
			return doAlert({
				header: tc("error"),
				message: tc("missingThing", tc("title")),
				cssClass: "warning",
				buttons: [
					{
						text: tc("Cancel"),
						role: "cancel",
						cssClass: "cancel"
					}
				]
			});
		} else if (allProps < 1) {
			return doAlert({
				header: tc("error"),
				message: t("Please add information to your MorphoSyntax document in at least one section before exporting it."),
				cssClass: "warning",
				buttons: [
					{
						text: tc("Cancel"),
						role: "cancel",
						cssClass: "cancel"
					}
				]
			});
		}
		setIsOpenExportMS(true);
	};
	const saveMSDoc = (
		announce: string = "msDocument",
		key: string = id,
		overwrite: boolean = true
	) => {
		// Save original id
		const firstKey = key;
		// Save 'now'
		const now = Date.now();
		if(!title) {
			return MSSaveError();
		} else if(!key) {
			key = uuidv4();
			dispatch(setMorphoSyntaxText(["id", key]));
		}
		// Dispatch to state
		dispatch(setMorphoSyntaxNum(["lastSave", now]));
		setIsLoading(true);
		// These dispatches will NOT be ready by the time Storage loads and saves
		//  so we will need to do some creative variable work
		const ms: MSState = {
			// Use possibly-new key
			id: key,
			// Use 'now'
			lastSave: now,
			title,
			description,
			...msRemainder
		};
		MorphoSyntaxStorage.setItem(key, ms)
			.then(() => {
				// If we're overwriting, and it's a new key, delete the old one
				if(overwrite && key !== firstKey) {
					MorphoSyntaxStorage.removeItem(firstKey);
				}
				setIsLoading(false);
				toaster({
					message: tc("thingSaved", { thing: t(announce) }),
					duration: 2500,
					position: "top",
					toast
				});
			});
	};
	const saveMSNew = () => {
		if(!title) {
			return MSSaveError();
		}
		const key = uuidv4();
		dispatch(setMorphoSyntaxText(["id", key]));
		saveMSDoc("newMsDocument", key, false);
	};
	const MSSaveError = () => {
		doAlert({
			header: tc("Error"),
			message: tc("missingThing", { thing: tc("title") }),
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
	const setNewInfo = (id: string, prop: "description" | "title") => {
		const el = $i<HTMLInputElement>(id);
		const value = el ? el.value.trim() : "";
		debounce<Dispatch, Action>(
			dispatch,
			[setMorphoSyntaxText([prop, value])],
			(prop === "description" ? 2000 : 1000),
			"saveMS"
		);
	};
	const info = t("MorphoSyntax Info");
	return (
		<IonPage>
			<IonLoading
				cssClass='loadingPage'
				isOpen={isLoading}
				onDidDismiss={() => setIsLoading(false)}
				message={tc("Please wait...")}
				spinner="bubbles"
				/*duration={300000}*/
				duration={1000}
			/>
			<LoadMS
				{...props.modalPropsMaker(isOpenLoadMS, setIsOpenLoadMS)}
				storedInfo={storedInfo}
				setStoredInfo={setStoredInfo}
			/>
			<ExportMS
				{...props.modalPropsMaker(isOpenExportMS, setIsOpenExportMS)}
				setLoading={setIsLoading}
			/>
			<DeleteMS
				{...props.modalPropsMaker(isOpenDelMS, setIsOpenDelMS)}
				storedInfo={storedInfo}
				setStoredInfo={setStoredInfo}
				setLoadingScreen={setIsLoading}
			/>
			<SyntaxHeader title={t("MorphoSyntax Settings")} {...props} />
			<IonContent fullscreen
				className="evenBackground disappearingHeaderKludgeFix"
				id="morphoSyntaxPage"
			>
				<IonList lines="none" className="hasSpecialLabels">
					<IonItem className="labelled">
						<IonLabel>{t("msTitle", { context: "presentation" })}</IonLabel>
					</IonItem>
					<IonItem>
						<IonInput
							aria-label={t("msTitle")}
							value={title}
							id="msTitle"
							className="ion-margin-top"
							placeholder={t("Usually the language name.")}
							onIonChange={() => setNewInfo("msTitle", "title")}
						></IonInput>
					</IonItem>
					<IonItem className="labelled">
						<IonLabel>{tc("description", { context: "presentation" })}</IonLabel>
					</IonItem>
					<IonItem>
						<IonTextarea
							aria-label={tc("description", { context: "formal" })}
							value={description}
							id="msDesc"
							className="ion-margin-top"
							placeholder={t("A short description of this document.")}
							rows={3}
							onIonChange={() => setNewInfo("msDesc", "description")}
						/>
					</IonItem>
				</IonList>
				<IonList lines="none" className="ion-float-end aside">
					<IonItem button={true} onClick={() => clearMS()}>
						<IonIcon icon={removeCircleOutline} className="ion-padding-end" />
						<IonLabel>{tc("clearGeneralThings", { things: info })}</IonLabel>
					</IonItem>
					<IonItem button={true} onClick={() => openMSModal(setIsOpenLoadMS)}>
						<IonIcon icon={addCircleOutline} className="ion-padding-end" />
						<IonLabel>{tc("loadThing", { thing: info })}</IonLabel>
					</IonItem>
					<IonItem button={true} onClick={() => saveMSDoc()}>
						<IonIcon icon={saveOutline} className="ion-padding-end" />
						<IonLabel>{tc("saveThing", { thing: info })}</IonLabel>
					</IonItem>
					<IonItem button={true} onClick={() => saveMSNew()}>
						<IonIcon icon={saveOutline} className="ion-padding-end" />
						<IonLabel>{tc("Save as New")}</IonLabel>
					</IonItem>
					<IonItem button={true} onClick={() => maybeExportMS()}>
						<IonIcon icon={codeDownloadOutline} className="ion-padding-end" />
						<IonLabel>{tc("exportThing", { thing: info })}</IonLabel>
					</IonItem>
					<IonItem button={true} onClick={() => openMSModal(setIsOpenDelMS)}>
						<IonIcon icon={trashOutline} className="ion-padding-end" />
						<IonLabel>{tc("deleteThing", { thing: t("Saved MorphoSyntax Info") })}</IonLabel>
					</IonItem>
				</IonList>
			</IonContent>
		</IonPage>
	);
};

export default Syntax;
