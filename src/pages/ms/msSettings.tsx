import React from 'react';
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
	IonTextarea
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
	openModal,
	setLoadingPage,
	setMorphoSyntax,
	setMorphoSyntaxNum,
	setMorphoSyntaxText,
	setTemporaryInfo
} from '../../components/ReduxDucksFuncs';
import { useDispatch, useSelector } from "react-redux";
import { ModalStateObject, MorphoSyntaxObject } from '../../components/ReduxDucksTypes';
import fireSwal from '../../components/Swal';
import { MorphoSyntaxStorage } from '../../components/PersistentInfo';
import { v4 as uuidv4 } from 'uuid';
import LoadMS from './M-LoadSyntaxDoc';
import DeleteMS from './M-DeleteSyntaxDoc';
import ExportMS from './M-ExportSyntaxDoc';
import debounce from '../../components/Debounce';
import { $i } from '../../components/DollarSignExports';

const Syntax = () => {
	const dispatch = useDispatch();
	const [
		msInfo,
		modalState,
		appSettings
	] = useSelector((state: any) => [
		state.morphoSyntaxInfo,
		state.morphoSyntaxModalState,
		state.appSettings
	]);
	const {title, description, bool, num, text} = msInfo;
	const allProps = (Object.keys(bool).length + Object.keys(num).length + Object.keys(text).length);
	const viewInfo = ['ms', 'msSettings'];
	useIonViewDidEnter(() => {
		dispatch(changeView(viewInfo));
	});
	const clearMS = () => {
		const thenFunc = () => {
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
			fireSwal({
				title: "You have no information to clear.",
				customClass: {popup: 'warnToast'},
				toast: true,
				timer: 2500,
				timerProgressBar: true,
				showConfirmButton: false
			});
		} else if(!appSettings.disableConfirms) {
			fireSwal({
				title: "Delete everything?",
				text: "This will erase everything currently in MorphoSyntax (but not anything previously saved). Are you sure you want to do this?",
				customClass: {popup: 'deleteConfirm'},
				icon: 'warning',
				showCancelButton: true,
				confirmButtonText: "Yes, erase it."
			}).then((result: any) => result.isConfirmed && thenFunc());
		} else {
			thenFunc();
		}
	};
	const openMSModal = (which: keyof ModalStateObject) => {
		let info: [string, MorphoSyntaxObject][] = [];
		MorphoSyntaxStorage.iterate((value: MorphoSyntaxObject, key: string) => {
			info.push([key, value]);
			return; // Blank return keeps the loop going
		}).then(() => {
			info.length > 0 && dispatch(setTemporaryInfo({ type: "storedsyntaxes", data: info }));
			dispatch(setLoadingPage(false));
			dispatch(openModal(which));
		});
		dispatch(setLoadingPage("lookingForSyntaxDocs"));
	};
	const maybeExportMS = () => {
		if(!title) {
			return fireSwal({
				title: "Error",
				text: "Please give your MorphoSyntax document a title before exporting it.",
				icon: 'warning'
			});
		} else if (allProps < 1) {
			return fireSwal({
				title: "Error",
				text: "Please add information to your MorphoSyntax document in at least one section before exporting it.",
				icon: 'warning'
			});
		}
		dispatch(openModal("ExportMS"));
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
		dispatch(setLoadingPage("lookingForSyntaxDocs"));
		// These dispatches will NOT be ready by the time Storage loads and saves
		//  so we will need to do some creative variable work
		let ms: any = {
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
				dispatch(setLoadingPage(false));
				fireSwal({
					title: announce,
					toast: true,
					timer: 2500,
					timerProgressBar: true,
					showConfirmButton: false
				});
			});
	};
	const saveMSNew = () => {
		if(!title) {
			return MSSaveError();
		}
		let key = uuidv4();
		dispatch(setMorphoSyntaxText("key", key));
		saveMSDoc("Information saved as new MorphoSyntax document!", key, false);
	};
	const MSSaveError = () => {
		fireSwal({
			title: "Error",
			text: "You must input a title before saving.",
			icon: 'warning'
		});
	};
	const setNewInfo = (id: string, prop: "description" | "title") => {
		const el = $i(id);
		const value = el.value.trim();
		debounce(dispatch, [setMorphoSyntaxText(prop, value)], (prop === "description" ? 2000 : 1000));
	};
	return (
		<IonPage>
			<IonLoading
	        	cssClass='loadingPage'
    	    	isOpen={modalState.loadingPage === "lookingForSyntaxDocs"}
    		    onDidDismiss={() => dispatch(setLoadingPage(false))}
	        	message={'Please wait...'}
				spinner="bubbles"
				/*duration={300000}*/
				duration={1000}
			/>
			<LoadMS />
			<ExportMS />
			<DeleteMS />
			<SyntaxHeader title="MorphoSyntax Settings" />
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
					<IonItem button={true} onClick={() => openMSModal("LoadMS")}>
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
					<IonItem button={true} onClick={() => openMSModal("DeleteMS")}>
						<IonIcon icon={trashOutline} className="ion-padding-end" />
						<IonLabel>Delete Saved MorphoSyntax Info</IonLabel>
					</IonItem>
				</IonList>
			</IonContent>
		</IonPage>
	);
};
 
export default Syntax;
