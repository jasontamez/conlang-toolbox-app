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
	SyntaxHeader
} from './MorphoSyntaxElements';
import {
	addCircleOutline,
	codeDownloadOutline,
	removeCircleOutline,
	saveOutline,
	trashOutline
} from 'ionicons/icons';
import {
	changeView,
	setMorphoSyntax,
	setMorphoSyntaxNum,
	setMorphoSyntaxText
} from '../../components/ReduxDucksFuncs';
import { useDispatch, useSelector } from "react-redux";
import { MorphoSyntaxObject, PageData } from '../../components/ReduxDucksTypes';
import { MorphoSyntaxStorage } from '../../components/PersistentInfo';
import { v4 as uuidv4 } from 'uuid';
import LoadMS from './M-LoadSyntaxDoc';
import DeleteMS from './M-DeleteSyntaxDoc';
import ExportMS from './M-ExportSyntaxDoc';
import debounce from '../../components/Debounce';
import { $i } from '../../components/DollarSignExports';
import yesNoAlert from '../../components/yesNoAlert';
import toaster from '../../components/toaster';

interface MSOmod extends MorphoSyntaxObject {
	boolStrings?: string[]
}

const Syntax = (props: PageData) => {
	const [isOpenLoadMS, setIsOpenLoadMS] = useState<boolean>(false);
	const [isOpenExportMS, setIsOpenExportMS] = useState<boolean>(false);
	const [isOpenDelMS, setIsOpenDelMS] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [storedInfo, setStoredInfo] = useState<[string, MSOmod][]>([]);
	const dispatch = useDispatch();
	const [
		msInfo,
		disableConfirms
	] = useSelector((state: any) => [
		state.morphoSyntaxInfo,
		state.appSettings.disableConfirms
	]);
	const {title, description, bool, num, text} = msInfo;
	const [doAlert] = useIonAlert();
	const [doToast, undoToast] = useIonToast();
	const allProps = (Object.keys(bool).length + Object.keys(num).length + Object.keys(text).length);
	const viewInfo = ['ms', 'msSettings'];
	useIonViewDidEnter(() => {
		dispatch(changeView(viewInfo));
	});
	const clearMS = () => {
		const handler = () => {
			const newMS: MorphoSyntaxObject = {
				key: "",
				lastSave: 0,
				title: "",
				description: "",
				bool: {},
				num: {},
				text: {}
			};
			dispatch(setMorphoSyntax(newMS));
		};
		if(!(title || msInfo.key || description || (allProps > 0))) {
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
		const info: [string, MSOmod][] = [];
		setIsLoading(true);
		MorphoSyntaxStorage.iterate((value: MorphoSyntaxObject, key: string) => {
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
	const saveMSDoc: any = (announce: string = "MorphoSyntax document saved.", key: string = msInfo.key, overwrite: boolean = true) => {
		// Save original key
		const firstKey = msInfo.key;
		// Save 'now'
		const now = Date.now();
		if(!title) {
			return MSSaveError();
		} else if(!key) {
			key = uuidv4();
			dispatch(setMorphoSyntaxText("key", key));
		}
		// Dispatch to state
		dispatch(setMorphoSyntaxNum("lastSave", now));
		setIsLoading(true);
		// These dispatches will NOT be ready by the time Storage loads and saves
		//  so we will need to do some creative variable work
		const ms: any = {
			...msInfo,
			// Use possibly-new key
			key: key,
			// Use 'now'
			lastSave: now,
			bool: {},
			boolStrings: Object.keys(bool),
			num: {...num},
			text: {...text}
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
		dispatch(setMorphoSyntaxText("key", key));
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
		debounce(dispatch, [setMorphoSyntaxText(prop, value)], (prop === "description" ? 2000 : 1000), "saveMS");
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
			<IonContent fullscreen className="evenBackground disappearingHeaderKludgeFix" id="morphoSyntaxPage">
				<IonList lines="none" className="hasSpecialLabels">
					<IonItem className="labelled">
						<IonLabel>MorphoSyntax Title:</IonLabel>
					</IonItem>
					<IonItem>
						<IonInput aria-label="Title" value={title} id="msTitle" className="ion-margin-top" placeholder="Usually the language name." onIonChange={() => setNewInfo("msTitle", "title")}></IonInput>
					</IonItem>
					<IonItem className="labelled">
						<IonLabel>Description:</IonLabel>
					</IonItem>
					<IonItem>
						<IonTextarea aria-label="Description" value={description} id="msDesc" className="ion-margin-top" placeholder="A short description of this document." rows={3} onIonChange={() => setNewInfo("msDesc", "description")} />
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
