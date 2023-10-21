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
import { useDispatch, useSelector } from "react-redux";

import { ViewState, PageData, MSState, StateObject } from '../../store/types';
import { saveView } from '../../store/viewSlice';
import { loadStateMS, setMorphoSyntaxNum, setMorphoSyntaxText } from '../../store/msSlice';
import blankAppState from '../../store/blankAppState';

import { MorphoSyntaxStorage } from '../../components/PersistentInfo';
import debounce from '../../components/Debounce';
import { $i } from '../../components/DollarSignExports';
import yesNoAlert from '../../components/yesNoAlert';
import toaster from '../../components/toaster';

import {
	SyntaxHeader
} from './MorphoSyntaxElements';
import LoadMS from './modals/LoadSyntaxDoc';
import DeleteMS from './modals/DeleteSyntaxDoc';
import ExportMS from './modals/ExportSyntaxDoc';

const Syntax = (props: PageData) => {
	const [isOpenLoadMS, setIsOpenLoadMS] = useState<boolean>(false);
	const [isOpenExportMS, setIsOpenExportMS] = useState<boolean>(false);
	const [isOpenDelMS, setIsOpenDelMS] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [storedInfo, setStoredInfo] = useState<[string, MSState][]>([]);
	const dispatch = useDispatch();
	const [doAlert] = useIonAlert();
	const [doToast, undoToast] = useIonToast();
	const disableConfirms = useSelector((state: StateObject) => state.appSettings.disableConfirms);
	const {
		title,
		description,
		id,
		lastSave,
		...msRemainder
	} = useSelector((state: StateObject) => state.ms);
	const allProps = Object.keys(msRemainder).length;
	const viewInfo = { key: "ms" as keyof ViewState, page: "msSettings" };
	useIonViewDidEnter(() => {
		dispatch(saveView(viewInfo));
	});
	const clearMS = () => {
		const handler = () => {
			dispatch(loadStateMS(blankAppState.ms));
		};
		if(!(title || id || description || (allProps > 0))) {
			toaster({
				message: "You have no information to clear.",
				duration: 2500,
				color: "warning",
				position: "top",
				doToast,
				undoToast
			});
		} else if(!disableConfirms) {
			yesNoAlert({
				header: "Delete everything?",
				message: "This will erase everything currently in MorphoSyntax (but not anything previously saved). Are you sure you want to do this?",
				cssClass: "danger",
				submit: "Yes, erase it",
				handler,
				doAlert
			});
		} else {
			handler();
		}
	};
	const openMSModal = (modalOpener: Function) => {
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
				header: "Error",
				message: "Please give your MorphoSyntax document a title before exporting it.",
				cssClass: "warning",
				buttons: [
					{
						text: "Cancel",
						role: "cancel"
					}
				]
			});
		} else if (allProps < 1) {
			return doAlert({
				header: "Error",
				message: "Please add information to your MorphoSyntax document in at least one section before exporting it.",
				cssClass: "warning",
				buttons: [
					{
						text: "Cancel",
						role: "cancel"
					}
				]
			});
		}
		setIsOpenExportMS(true);
	};
	const saveMSDoc = (
		announce: string = "MorphoSyntax document saved.",
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
					message: announce,
					duration: 2500,
					position: "top",
					doToast,
					undoToast
				});
			});
	};
	const saveMSNew = () => {
		if(!title) {
			return MSSaveError();
		}
		const key = uuidv4();
		dispatch(setMorphoSyntaxText(["id", key]));
		saveMSDoc("Information saved as new MorphoSyntax document!", key, false);
	};
	const MSSaveError = () => {
		doAlert({
			header: "Error",
			message: "You must input a title before saving.",
			cssClass: "danger",
			buttons: [
				{
					text: "Ok",
					role: "cancel"
				}
			]
		});
};
	const setNewInfo = (id: string, prop: "description" | "title") => {
		const el = $i(id);
		const value = el.value.trim();
		debounce(
			dispatch,
			[setMorphoSyntaxText([prop, value])],
			(prop === "description" ? 2000 : 1000),
			"saveMS"
		);
	};
	return (
		<IonPage>
			<IonLoading
				cssClass='loadingPage'
				isOpen={isLoading}
				onDidDismiss={() => setIsLoading(false)}
				message={'Please wait...'}
				spinner="bubbles"
				/*duration={300000}*/
				duration={1000}
			/>
			<LoadMS
				{...props.modalPropsMaker(isOpenLoadMS, setIsOpenLoadMS)}
				storedInfo={storedInfo}
				setStoredInfo={setStoredInfo}
			/>
			<ExportMS {...props.modalPropsMaker(isOpenExportMS, setIsOpenExportMS)} />
			<DeleteMS
				{...props.modalPropsMaker(isOpenDelMS, setIsOpenDelMS)}
				storedInfo={storedInfo}
				setStoredInfo={setStoredInfo}
				setLoadingScreen={setIsLoading}
			/>
			<SyntaxHeader title="MorphoSyntax Settings" {...props} />
			<IonContent fullscreen
				className="evenBackground disappearingHeaderKludgeFix"
				id="morphoSyntaxPage"
			>
				<IonList lines="none" className="hasSpecialLabels">
					<IonItem className="labelled">
						<IonLabel>MorphoSyntax Title:</IonLabel>
					</IonItem>
					<IonItem>
						<IonInput
							aria-label="Title"
							value={title}
							id="msTitle"
							className="ion-margin-top"
							placeholder="Usually the language name."
							onIonChange={() => setNewInfo("msTitle", "title")}
						></IonInput>
					</IonItem>
					<IonItem className="labelled">
						<IonLabel>Description:</IonLabel>
					</IonItem>
					<IonItem>
						<IonTextarea
							aria-label="Description"
							value={description}
							id="msDesc"
							className="ion-margin-top"
							placeholder="A short description of this document."
							rows={3}
							onIonChange={() => setNewInfo("msDesc", "description")}
						/>
					</IonItem>
				</IonList>
				<IonList lines="none" className="ion-float-end aside">
					<IonItem button={true} onClick={() => clearMS()}>
						<IonIcon icon={removeCircleOutline} className="ion-padding-end" />
						<IonLabel>Clear MorphoSyntax Info</IonLabel>
					</IonItem>
					<IonItem button={true} onClick={() => openMSModal(setIsOpenLoadMS)}>
						<IonIcon icon={addCircleOutline} className="ion-padding-end" />
						<IonLabel>Load MorphoSyntax Info</IonLabel>
					</IonItem>
					<IonItem button={true} onClick={() => saveMSDoc()}>
						<IonIcon icon={saveOutline} className="ion-padding-end" />
						<IonLabel>Save MorphoSyntax Info</IonLabel>
					</IonItem>
					<IonItem button={true} onClick={() => saveMSNew()}>
						<IonIcon icon={saveOutline} className="ion-padding-end" />
						<IonLabel>Save As New</IonLabel>
					</IonItem>
					<IonItem button={true} onClick={() => maybeExportMS()}>
						<IonIcon icon={codeDownloadOutline} className="ion-padding-end" />
						<IonLabel>Export MorphoSyntax Info</IonLabel>
					</IonItem>
					<IonItem button={true} onClick={() => openMSModal(setIsOpenDelMS)}>
						<IonIcon icon={trashOutline} className="ion-padding-end" />
						<IonLabel>Delete Saved MorphoSyntax Info</IonLabel>
					</IonItem>
				</IonList>
			</IonContent>
		</IonPage>
	);
};

export default Syntax;
