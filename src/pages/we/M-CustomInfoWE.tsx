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
	trashOutline,
	globeOutline
} from 'ionicons/icons';
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { openModal, closeModal, loadCustomInfoWE, setTemporaryInfo } from '../../components/ReduxDucksFuncs';
import { WECustomInfo } from '../../components/ReduxDucksTypes';
import escape from '../../components/EscapeForHTML';
import { $i } from '../../components/DollarSignExports';
import { CustomStorageWE } from '../../components/PersistentInfo';
import fireSwal from '../../components/Swal';
import doExport from '../../components/ExportServices';

const ManageCustomInfoWE = () => {
	const dispatch = useDispatch();
	const [
		modalState,
		settings,
		categories,
		transforms,
		soundchanges,
		temporaryInfo
	] = useSelector((state: any) => [
		state.modalState,
		state.appSettings,
		state.wordevolveCategories,
		state.wordevolveTransforms,
		state.wordevolveSoundChanges,
		state.temporaryInfo
	], shallowEqual);
	let customInfo: string[] = (temporaryInfo && temporaryInfo.type === "custominfoWE") ? temporaryInfo.data : [];
	const doCleanClose = () => {
		dispatch(setTemporaryInfo(undefined));
		dispatch(closeModal('ManageCustomInfoWE'));
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
			const save: WECustomInfo = [
				categories,
				transforms,
				soundchanges
			];
			CustomStorageWE.setItem(title, save).then(() => {
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
		CustomStorageWE.getItem(title).then((value) => {
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
			transforms,
			soundchanges
		};
		doExport(JSON.stringify(exporting), title)
			.catch((e = "Error?") => console.log(e))
			.then(() => doCleanClose());
	};
	const maybeLoadInfo = (title: string) => {
		const thenFunc = () => {
			CustomStorageWE.getItem(title).then((value) => {
				if(value) {
					dispatch(loadCustomInfoWE(value as WECustomInfo));
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
				text: "This will clear and overwrite all current character groups, transformations and sound changes.",
				icon: 'warning',
				showCancelButton: true,
				confirmButtonText: "Yes, load it."
			}).then((result: any) => { result.isConfirmed && thenFunc() });
		}
	};
	const maybeDeleteInfo = (title: string) => {
		const thenFunc = () => {
			let newCustom = customInfo.filter(ci => ci !== title);
			dispatch(setTemporaryInfo({type: "custominfo", data: newCustom}));
			CustomStorageWE.removeItem(title).then(() => {
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
		<IonModal isOpen={modalState.ManageCustomInfoWE} onDidDismiss={() => doCleanClose()}>
			<IonHeader>
				<IonToolbar color="primary">
					<IonTitle>Manage Custom Info</IonTitle>
					<IonButtons slot="end">
						<IonButton onClick={() => dispatch(openModal("ExtraCharacters"))}>
							<IonIcon icon={globeOutline} />
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

export default ManageCustomInfoWE;
