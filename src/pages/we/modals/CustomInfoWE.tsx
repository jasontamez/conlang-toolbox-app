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
	IonInput,
	useIonAlert,
	useIonToast
} from '@ionic/react';
import {
	closeCircleOutline,
	closeCircleSharp,
	trashOutline,
	globeOutline
} from 'ionicons/icons';
import { useSelector, useDispatch } from "react-redux";

import { WEPresetObject, ExtraCharactersModalOpener, StateObject } from '../../../store/types';
import { loadStateWE } from '../../../store/weSlice';

import escape from '../../../components/EscapeForHTML';
import { $i } from '../../../components/DollarSignExports';
import { CustomStorageWE } from '../../../components/PersistentInfo';
import yesNoAlert from '../../../components/yesNoAlert';
import toaster from '../../../components/toaster';

interface CustomInfoModalProps extends ExtraCharactersModalOpener {
	titles: string[]
	setTitles: Function
}

const ManageCustomInfoWE = (props: CustomInfoModalProps) => {
	const { isOpen, setIsOpen, openECM, titles, setTitles } = props;
	const dispatch = useDispatch();
	const { disableConfirms } = useSelector((state: StateObject) => state.appSettings);
	const { characterGroups, transforms, soundChanges } = useSelector((state: StateObject) => state.we)
	const [doAlert] = useIonAlert();
	const [doToast, undoToast] = useIonToast();
	const doCleanClose = () => {
		setTitles([]);
		setIsOpen(false);
	};
	const maybeSaveInfo = () => {
		const title = escape($i("currentInfoSaveName").value).trim();
		if(title === "") {
			return doAlert({
				header: "Please enter a title",
				buttons: [
					{
						text: "Cancel",
						role: "cancel"
					}
				]
			});
		}
		const doSave = (title: string, msg: string = "saved") => {
			// TO-DO: convert old storage to new format
			//const save: WECustomInfo = [
			//	charGroups,
			//	transforms,
			//	soundchanges
			//];
			const save: WEPresetObject = {
				characterGroups,
				transforms,
				soundChanges
			}
			CustomStorageWE.setItem(title, save).then(() => {
				toaster({
					message: `"${title}" ${msg}`,
					duration: 2500,
					color: "success",
					position: "top",
					doToast,
					undoToast
				});
			}).finally(() => doCleanClose());
		};
		// Check if overwriting
		CustomStorageWE.getItem(title).then((value: any) => {
			if(!value) {
				doSave(title);
			} else if (disableConfirms) {
				doSave(title, "overwritten");
			} else {
				yesNoAlert({
					header: `"${title}" already exists`,
					message: "This will clear and overwrite the previous save.",
					cssClass: "warning",
					submit: "Yes, overwrite it",
					handler: () => doSave(title, "overwritten"),
					doAlert
				});
			}
		});
	};
	const maybeLoadInfo = (title: string) => {
		const handler = () => {
			CustomStorageWE.getItem(title).then((value: any) => {
				if(value) {
					dispatch(loadStateWE(value as WEPresetObject));
					toaster({
						message: `Preset "${title}" loaded.`,
						duration: 2500,
						position: "top",
						doToast,
						undoToast
					});
					doCleanClose();
				} else {
					doAlert({
						header: "Unknown Error",
						message: `Preset "${title}" not found.`,
						buttons: [
							{
								text: "Ok",
								role: "cancel"
							}
						]
					});
				}
			});
		};
		if(disableConfirms) {
			handler();
		} else {
			yesNoAlert({
				header: `Load "${title}"?`,
				message: "This will clear and overwrite all current character groups, transformations and sound changes.",
				cssClass: "warning",
				submit: "Yes, load it",
				handler,
				doAlert
			});
		}
	};
	const maybeDeleteInfo = (title: string) => {
		const handler = () => {
			setTitles(titles.filter(ci => ci !== title));
			CustomStorageWE.removeItem(title).then(() => {
				toaster({
					message: `"${title}" deleted.`,
					duration: 2500,
					color: "danger",
					position: "top",
					doToast,
					undoToast
				});
			});
		};
		if(disableConfirms) {
			handler();
		} else {
			yesNoAlert({
				header: `Delete "${title}"?`,
				message: "This cannot be undone.",
				cssClass: "warning",
				submit: "Yes, delete it",
				handler,
				doAlert
			});
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
							<IonInput
								aria-label="Custom Info Name"
								id="currentInfoSaveName"
								inputmode="text"
								placeholder="Name your custom info"
								type="text"
							/>
							<IonButton
								slot="end"
								onClick={() => maybeSaveInfo()}
								strong={true}
								color="success"
							>Save</IonButton>
						</IonItem>
					</IonItemGroup>
					<IonItemGroup className="buttonFilled">
						<IonItemDivider>
							<IonLabel>Load Saved Info</IonLabel>
						</IonItemDivider>
						{(titles.length === 0) ?
							<IonItem color="warning"><IonLabel>No saved info</IonLabel></IonItem>
						:
							titles.map((title: string) => {
								return (
									<IonItem key={title}>
										<IonLabel className="ion-text-wrap">{title}</IonLabel>
										<IonButton
											style={ { margin: "0 1em"} }
											slot="end"
											color="warning"
											onClick={() => maybeLoadInfo(title)}
											strong={true}
										>Load</IonButton>
										<IonButton
											className="ion-no-margin"
											slot="end"
											color="danger"
											onClick={() => maybeDeleteInfo(title)}
										><IonIcon icon={trashOutline} /></IonButton>
									</IonItem>
								);
							})
						}
					</IonItemGroup>
				</IonList>
			</IonContent>
			<IonFooter>
				<IonToolbar>
					<IonButton color="danger" slot="end" onClick={() => doCleanClose()}>
						<IonIcon icon={closeCircleSharp} slot="start" />
						<IonLabel>Cancel</IonLabel>
					</IonButton>
				</IonToolbar>
			</IonFooter>
		</IonModal>
	);
};

export default ManageCustomInfoWE;
