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

import { DJCustomInfo, ExtraCharactersModalOpener, StateObject } from '../../../store/types';

import escape from '../../../components/EscapeForHTML';
import { $i } from '../../../components/DollarSignExports';
import { DeclenjugatorStorage } from '../../../components/PersistentInfo';
import yesNoAlert from '../../../components/yesNoAlert';
import toaster from '../../../components/toaster';
import { loadStateDJ } from '../../../store/declenjugatorSlice';

interface ExtraInfo extends ExtraCharactersModalOpener {
	titles: string[] | null
	setTitles: Function
}

const ManageCustomInfo = (props: ExtraInfo) => {
	const { isOpen, setIsOpen, openECM, titles, setTitles } = props;
	const dispatch = useDispatch();
	const [doAlert] = useIonAlert();
	const [doToast, undoToast] = useIonToast();
	const {
		declensions,
		conjugations,
		other
	} = useSelector((state: StateObject) => state.dj);
	const { disableConfirms } = useSelector((state: StateObject) => state.appSettings);
	const customInfo: string[] = titles || [];
	const doCleanClose = () => {
		setTitles(null);
		setIsOpen(false);
	};
	const maybeSaveInfo = () => {
		const title = escape($i("currentDJInfoSaveName").value).trim();
		if(title === "") {
			return doAlert({
				header: "Please enter a title before saving.",
				cssClass: "warning",
				buttons: [
					{
						text: "Ok",
						role: "cancel",
						cssClass: "cancel"
					}
				]
			});
		}
		const doSave = (title: string, msg: string = "saved") => {
			const save: DJCustomInfo = {
				declensions,
				conjugations,
				other
			};
			DeclenjugatorStorage.setItem(title, save).then(() => {
				toaster({
					message: `"${title}" ${msg}`,
					duration: 2500,
					position: "top",
					doToast,
					undoToast
				});
			}).finally(() => doCleanClose());
		};
		// Check if overwriting
		DeclenjugatorStorage.getItem<DJCustomInfo>(title).then((value) => {
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
			DeclenjugatorStorage.getItem<DJCustomInfo>(title).then((value) => {
				if(value) {
					dispatch(loadStateDJ(value));
					toaster({
						message: `Save "${title}" loaded.`,
						duration: 2500,
						color: "success",
						position: "top",
						doToast,
						undoToast
					});
					doCleanClose();
				} else {
					doAlert({
						header: "Unknown Error",
						cssClass: "danger",
						message: `Save :${title}" not found.`,
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
				message: "This will clear and overwrite all current groups.",
				cssClass: "warning",
				submit: "Yes, load it",
				handler,
				doAlert
			});
	}
	};
	const maybeDeleteInfo = (title: string) => {
		const handler = () => {
			const newCustom = customInfo.filter(ci => ci !== title);
			setTitles(newCustom.length > 0 ? newCustom : null);
			DeclenjugatorStorage.removeItem(title).then(() => {
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
				message: "Are you sure? This cannot be undone.",
				cssClass: "danger",
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
								aria-label="Name of save"
								id="currentDJInfoSaveName"
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
						{customInfo.map((title: string) => {
							return (
								<IonItem key={title}>
									<IonLabel className="ion-text-wrap">{title}</IonLabel>
									<IonButton
										className="loadButton"
										slot="end"
										color="warning"
										onClick={() => maybeLoadInfo(title)}
										strong={true}
									>Load</IonButton>
									<IonButton
										className="ion-no-margin"
										slot="end"
										color="danger"
										onClick={() => maybeDeleteInfo(title)}><IonIcon
										icon={trashOutline}
									/></IonButton>
								</IonItem>
							);
						})}
						{
							(customInfo.length === 0) ?
								<IonItem color="warning"><IonLabel>No saved info</IonLabel></IonItem>
							:
								<></>
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

export default ManageCustomInfo;
