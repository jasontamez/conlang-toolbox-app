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

import { loadCustomInfoWG } from '../../components/ReduxDucksFuncs';
import { ExtraCharactersModalOpener, WGCustomInfo } from '../../components/ReduxDucksTypes';
import escape from '../../components/EscapeForHTML';
import { $i } from '../../components/DollarSignExports';
import { CustomStorageWG } from '../../components/PersistentInfo';
import fireSwal from '../../components/Swal';

interface ExtraInfo extends ExtraCharactersModalOpener {
	titles: string[] | null
	setTitles: Function
}

const ManageCustomInfo = (props: ExtraInfo) => {
	const { isOpen, setIsOpen, openECM, titles, setTitles } = props;
	const dispatch = useDispatch();
	const [
		settings,
		settingsWG,
		charGroups,
		syllables,
		transforms
	] = useSelector((state: any) => [
		state.appSettings,
		state.wordgenSettings,
		state.wordgenCharGroups,
		state.wordgenSyllables,
		state.wordgenTransforms
	], shallowEqual);
	const customInfo: string[] = titles || [];
	const doCleanClose = () => {
		setTitles(null);
		setIsOpen(false);
	};
	const maybeSaveInfo = () => {
		const title = escape($i("currentInfoSaveName").value).trim();
		if(title === "") {
			return fireSwal({
				title: "Please enter a title",
				icon: "error",
			});
		}
		const doSave = (title: string, msg: string = "saved") => {
			const save: WGCustomInfo = [
				charGroups,
				syllables,
				transforms,
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
		CustomStorageWG.getItem(title).then((value: any) => {
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
	const maybeLoadInfo = (title: string) => {
		const thenFunc = () => {
			CustomStorageWG.getItem(title).then((value: any) => {
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
			const newCustom = customInfo.filter(ci => ci !== title);
			setTitles(newCustom.length > 0 ? newCustom : null);
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
		<IonModal isOpen={isOpen} onDidDismiss={() => doCleanClose()}>
			<IonHeader>
				<IonToolbar color="primary">
					<IonTitle>Manage Custom Info</IonTitle>
					<IonButtons slot="end">
						<IonButton onClick={() => openECM(true)}>
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
							<IonInput aria-label="Name of save" id="currentInfoSaveName" inputmode="text" placeholder="Name your custom info" type="text" />
							<IonButton slot="end" onClick={() => maybeSaveInfo()} strong={true} color="success">Save</IonButton>
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
