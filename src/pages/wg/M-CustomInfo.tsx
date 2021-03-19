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
	IonItemGroup,
	IonItemDivider,
	IonInput
} from '@ionic/react';
import {
	closeCircleOutline,
	closeCircleSharp,
	trashOutline
} from 'ionicons/icons';
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { openModal, closeModal, loadCustomInfoWG, setTemporaryInfo } from '../../components/ReduxDucksFuncs';
import { WGCustomInfo } from '../../components/ReduxDucksTypes';
import escape from '../../components/EscapeForHTML';
import { $i } from '../../components/DollarSignExports';
import { CustomStorageWG } from '../../components/PersistentInfo';
import fireSwal from '../../components/Swal';
import doExport from '../../components/ExportServices';

const ManageCustomInfo = () => {
	const dispatch = useDispatch();
	const [
		modalState,
		settings,
		settingsWG,
		categories,
		syllables,
		rules,
		temporaryInfo
	] = useSelector((state: any) => [
		state.modalState,
		state.appSettings,
		state.wordgenSettings,
		state.wordgenCategories,
		state.wordgenSyllables,
		state.wordgenRewriteRules,
		state.temporaryInfo
	], shallowEqual);
	let customInfo: string[] = (temporaryInfo && Array.isArray(temporaryInfo.data)) ? temporaryInfo.data : [];
	const doCleanClose = () => {
		dispatch(setTemporaryInfo(undefined));
		dispatch(closeModal('ManageCustomInfo'));
	};
	const maybeSaveInfo = () => {
		let title = escape($i("currentInfoSaveName").value).trim();
		if(title === "") {
			return fireSwal({
				title: "Please enter a title",
				icon: "error",
			});
		}
		const doSave = (title: string, msg: string = "saved") => {
			const save: WGCustomInfo = [
				categories,
				syllables,
				rules,
				{...settingsWG}
			];
			CustomStorageWG.setItem(title, save).then(() => {
				fireSwal({
					title: "\"" + title + "\" " + msg,
					toast: true,
					timer: 2500,
					timerProgressBar: true,
					showConfirmButton: false
				});
			}).finally(() => doCleanClose());
		};
		// Check if overwriting
		CustomStorageWG.getItem(title).then((value) => {
			if(!value) {
				doSave(title);
			} else if (settings.disableConfirms) {
				doSave(title, "overwritten");
			} else {
				fireSwal({
					title: "\"" + title + "\" already exists",
					text: "This will clear and overwrite the previous save.",
					icon: 'warning',
					showCancelButton: true,
					confirmButtonText: "Yes, overwrite it."
				}).then((result: any) => {
					if(result.isConfirmed) {
						doSave(title, "overwritten");
					}
				});
			}
		});
	};
	const maybeExportInfo = () => {
		let title = escape($i("currentInfoExportName").value).trim();
		if(title === "") {
			return fireSwal({
				title: "Please enter a title",
				icon: "error",
			});
		}
		title = title + ".json";
		const exporting = {
			categories,
			syllables,
			rules,
			settingsWG: {...settingsWG}
		}
		doExport(JSON.stringify(exporting), title)
			.catch((e = "Error?") => console.log(e))
			.then(() => doCleanClose());
	};
	const maybeLoadInfo = (title: string) => {
		const thenFunc = () => {
			CustomStorageWG.getItem(title).then((value) => {
				if(value) {
					dispatch(loadCustomInfoWG(value as WGCustomInfo));
					fireSwal({
						title: "Preset \"" + title + "\" loaded",
						toast: true,
						timer: 2500,
						timerProgressBar: true,
						showConfirmButton: false
					});
					doCleanClose()
				} else {
					fireSwal({
						title: "Unknown Error",
						text: "Preset \"" + title + "\" not found",
						icon: 'error'
					});
				}
			});
		};
		if(settings.disableConfirms) {
			thenFunc();
		} else {
			fireSwal({
				title: "Load \"" + title + "\"?",
				text: "This will clear and overwrite all current character groups, syllables, transformations and settings.",
				icon: 'warning',
				showCancelButton: true,
				confirmButtonText: "Yes, load it."
			}).then((result: any) => { result.isConfirmed && thenFunc() });
		}
	};
	const maybeDeleteInfo = (title: string) => {
		const thenFunc = () => {
			let newCustom = customInfo.filter(ci => ci !== title);
			dispatch(setTemporaryInfo({data: newCustom}));
			CustomStorageWG.removeItem(title).then(() => {
				fireSwal({
					title: "\"" + title + "\" deleted",
					toast: true,
					timer: 2500,
					customClass: {popup: 'dangerToast'},
					timerProgressBar: true,
					showConfirmButton: false
				});
			});
		};
		if(settings.disableConfirms) {
			thenFunc();
		} else {
			fireSwal({
				title: "Delete \"" + title + "\"?",
				text: "This cannot be undone.",
				icon: 'warning',
				showCancelButton: true,
				confirmButtonText: "Yes, delete it."
			}).then((result: any) => { result.isConfirmed && thenFunc() });
		}
	};
	return (
		<IonModal isOpen={modalState.ManageCustomInfo} onDidDismiss={() => doCleanClose()}>
			<IonHeader>
				<IonToolbar color="primary">
					<IonTitle>Manage Custom Info</IonTitle>
					<IonButtons slot="end">
						<IonButton onClick={() => dispatch(openModal("ExtraCharacters"))}>
							<IonIcon src="svg/noun_International Languages_249165.svg" size="large" />
						</IonButton>
						<IonButton onClick={() => doCleanClose()}>
							<IonIcon icon={closeCircleOutline} />
						</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<IonList lines="none">
				<IonItemGroup>
						<IonItemDivider>
							<IonLabel>Save Current Info</IonLabel>
						</IonItemDivider>
						<IonItem>
							<IonInput id="currentInfoSaveName" inputmode="text" placeholder="Name your custom info" type="text" />
							<IonButton slot="end" onClick={() => maybeSaveInfo()} strong={true} color="success">Save</IonButton>
						</IonItem>
					</IonItemGroup>
					<IonItemGroup>
						<IonItemDivider>
							<IonLabel className="ion-text-wrap">Export Current Info to File</IonLabel>
						</IonItemDivider>
						<IonItem>
							<IonInput id="currentInfoExportName" inputmode="text" placeholder="Name your custom info" type="text" />
							<IonButton slot="end" onClick={() => maybeExportInfo()} strong={true} color="success">Export</IonButton>
						</IonItem>
					</IonItemGroup>
					<IonItemGroup className="buttonFilled">
						<IonItemDivider>
							<IonLabel>Load Saved Info</IonLabel>
						</IonItemDivider>
						{customInfo.map((title: string) => {
							return (
								<IonItem key={title}>
									<IonLabel className="ion-text-wrap">{title}</IonLabel>
									<IonButton style={ { margin: "0 1em"} } slot="end" color="warning" onClick={() => maybeLoadInfo(title)} strong={true}>Load</IonButton>
									<IonButton className="ion-no-margin" slot="end" color="danger" onClick={() => maybeDeleteInfo(title)}><IonIcon icon={trashOutline} /></IonButton>
								</IonItem>
							);
						})}
						{(customInfo.length === 0) ? (<IonItem color="warning"><IonLabel>No saved info</IonLabel></IonItem>) : ""}
					</IonItemGroup>
				</IonList>
			</IonContent>
			<IonFooter>
				<IonItem color="danger" button={true} onClick={() => doCleanClose()}>
					<IonIcon icon={closeCircleSharp} slot="start" />
					<IonLabel>Cancel</IonLabel>
				</IonItem>
			</IonFooter>
		</IonModal>
	);
};

export default ManageCustomInfo;
