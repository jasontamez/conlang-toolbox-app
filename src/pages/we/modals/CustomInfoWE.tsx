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

import { WEPresetObject, ExtraCharactersModalOpener, StateObject, SetState } from '../../../store/types';
import { loadStateWE } from '../../../store/weSlice';

import escape from '../../../components/EscapeForHTML';
import { $i } from '../../../components/DollarSignExports';
import { CustomStorageWE } from '../../../components/PersistentInfo';
import yesNoAlert from '../../../components/yesNoAlert';
import toaster from '../../../components/toaster';

interface CustomInfoModalProps extends ExtraCharactersModalOpener {
	titles: string[]
	setTitles: SetState<string[]>
}

const ManageCustomInfoWE = (props: CustomInfoModalProps) => {
	const { isOpen, setIsOpen, openECM, titles, setTitles } = props;
	const dispatch = useDispatch();
	const { disableConfirms } = useSelector((state: StateObject) => state.appSettings);
	const { characterGroups, transforms, soundChanges } = useSelector((state: StateObject) => state.we)
	const [doAlert] = useIonAlert();
	const toast = useIonToast();
	const doCleanClose = () => {
		setTitles([]);
		setIsOpen(false);
	};
	const maybeSaveInfo = () => {
		const el = $i<HTMLInputElement>("currentInfoSaveName");
		const title = el ? escape(el.value).trim() : "";
		if(title === "") {
			return doAlert({
				header: "Please enter a title",
				cssClass: "warning",
				buttons: [
					{
						text: "Cancel",
						role: "cancel",
						cssClass: "cancel"
					}
				]
			});
		}
		const doSave = (title: string, msg: string = "saved") => {
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
					toast
				});
			}).finally(() => doCleanClose());
		};
		// Check if overwriting
		CustomStorageWE.getItem<WEPresetObject>(title).then((value) => {
			if(!value) {
				doSave(title);
			} else if (disableConfirms) {
				doSave(title, "overwritten");
			} else {
				yesNoAlert({
					header: `"${title}" Already Exists`,
					message: "This will clear and overwrite the previous save.",
					cssClass: "warning",
					submit: "Yes, Overwrite It",
					handler: () => doSave(title, "overwritten"),
					doAlert
				});
			}
		});
	};
	const maybeLoadInfo = (title: string) => {
		const handler = () => {
			CustomStorageWE.getItem<WEPresetObject>(title).then((value) => {
				if(value) {
					dispatch(loadStateWE(value));
					toaster({
						message: `Save "${title}" loaded.`,
						duration: 2500,
						position: "top",
						toast
					});
					doCleanClose();
				} else {
					doAlert({
						header: "Unknown Error",
						cssClass: "danger",
						message: `Save "${title}" not found.`,
						buttons: [
							{
								text: "Ok",
								role: "cancel",
								cssClass: "cancel"
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
				submit: "Yes, Load It",
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
					toast
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
				submit: "Yes, Delete It",
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
											slot="end"
											color="warning"
											onClick={() => maybeLoadInfo(title)}
											strong={true}
											className="weCustomButon"
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
