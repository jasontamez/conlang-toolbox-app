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
import '../App.css';
import { closeModal, loadCustomInfoWG, setCustomInfoWG } from '../../components/ReduxDucksFuncs';
import { WGCustomInfo } from '../../components/ReduxDucksTypes';
import escape from '../../components/EscapeForHTML';
import { $i } from '../../components/DollarSignExports';
import { Plugins } from '@capacitor/core';
import fireSwal from '../../components/Swal';

const ManageCustomInfo = () => {
	const dispatch = useDispatch();
	const state = useSelector((state: any) => state, shallowEqual);
	const modalState = state.modalState;
	const settings = state.appSettings;
	let customInfo: string[] = state.wordgenSettings.customInfo || [];
	const { Storage } = Plugins;
	const maybeSaveInfo = () => {
		let title = escape($i("currentInfoSaveName").value).trim();
		let newInfo: string[] = [];
		if(title === "") {
			// Do nothing
			return;
		}
		const doSave = (newInfo: string[], title: string, msg: string = "saved") => {
			let setts = state.wordgenSettings;
			delete setts.customInfo;
			const save: WGCustomInfo = [
				state.wordgenCategories,
				state.wordgenSyllables,
				state.wordgenRewriteRules,
				setts
			];
			Storage.set({key: "customInfo", value: JSON.stringify(newInfo)});
			Storage.set({key: "customInfo"+title, value: JSON.stringify(save)});
			dispatch(setCustomInfoWG(newInfo));
			fireSwal({
				title: "\"" + title + "\" " + msg,
				toast: true,
				timer: 2500,
				timerProgressBar: true,
				showConfirmButton: false
			});
			dispatch(closeModal('ManageCustomInfo'));
		};
		let isNew = true;
		newInfo = customInfo.map(ci => {
			if(ci === title) {
				isNew = false;
			}
			return ci;
		});
		if(!isNew) {
			if(settings.disableConfirms) {
				doSave(newInfo, title, "overwritten");
			} else {
				fireSwal({
					title: "\"" + title + "\" already exists",
					text: "This will clear and overwrite the previous save.",
					icon: 'warning',
					showCancelButton: true,
					confirmButtonText: "Yes, overwrite it."
				}).then((result: any) => {
					if(result.isConfirmed) {
						doSave(newInfo, title, "overwritten");
					}
				});
			}
		} else {
			newInfo.push(title);
			doSave(newInfo, title);
		}
	};
	const maybeLoadInfo = (title: string) => {
		const thenFunc = () => {
			Storage.get({key: "customInfo"+title}).then((result) => {
				let value = result.value;
				if(value) {
					let info = JSON.parse(value);
					dispatch(loadCustomInfoWG(info));
					fireSwal({
						title: "Preset \"" + title + "\" loaded",
						toast: true,
						timer: 2500,
						timerProgressBar: true,
						showConfirmButton: false
					});
					dispatch(closeModal('ManageCustomInfo'));
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
				text: "This will clear and overwrite all current categories, syllables, rules and settings.",
				icon: 'warning',
				showCancelButton: true,
				confirmButtonText: "Yes, load it."
			}).then((result: any) => { result.isConfirmed && thenFunc() });
		}
	};
	const maybeDeleteInfo = (title: string) => {
		const thenFunc = () => {
			let newCI: string[] = customInfo.filter(item => item !== title);
			dispatch(setCustomInfoWG(newCI));
			Storage.remove({key: "customInfo"+title}).then(() => {
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
		<IonModal isOpen={modalState.ManageCustomInfo} onDidDismiss={() => dispatch(closeModal('ManageCustomInfo'))}>
			<IonHeader>
				<IonToolbar color="primary">
					<IonTitle>Manage Custom Info</IonTitle>
					<IonButtons slot="end">
						<IonButton onClick={() => dispatch(closeModal('ManageCustomInfo'))}>
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
							<IonLabel>Load Saved Info</IonLabel>
						</IonItemDivider>
						{customInfo.map((title: string) => {
							return (
								<IonItem key={title}>
									<IonLabel className="possiblyLargeLabel">
										<h2 className="important">{title}</h2>
									</IonLabel>
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
				<IonItem color="danger" button={true} onClick={() => dispatch(closeModal('ManageCustomInfo'))}>
					<IonIcon icon={closeCircleSharp} slot="start" />
					<IonLabel>Cancel</IonLabel>
				</IonItem>
			</IonFooter>
		</IonModal>
	);
};

export default ManageCustomInfo;
