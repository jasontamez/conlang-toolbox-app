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

import { DJCustomInfo, ExtraCharactersModalOpener, SetState, StateObject } from '../../../store/types';
import useTranslator from '../../../store/translationHooks';
import { loadStateDJ } from '../../../store/declenjugatorSlice';

import escape from '../../../components/EscapeForHTML';
import { $i } from '../../../components/DollarSignExports';
import { DeclenjugatorStorage } from '../../../components/PersistentInfo';
import yesNoAlert from '../../../components/yesNoAlert';
import toaster from '../../../components/toaster';

interface ExtraInfo extends ExtraCharactersModalOpener {
	titles: string[] | null
	setTitles: SetState<string[] | null>
}

const ManageCustomInfo = (props: ExtraInfo) => {
	const [ t ] = useTranslator('dj');
	const [ tc ] = useTranslator('common');
	const { isOpen, setIsOpen, openECM, titles, setTitles } = props;
	const dispatch = useDispatch();
	const [doAlert] = useIonAlert();
	const toast = useIonToast();
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
		const el = $i<HTMLInputElement>("currentDJInfoSaveName");
		const title = (el && escape(el.value).trim()) || "";
		if(title === "") {
			return doAlert({
				message: t("You must provide a title or description before saving."),
				cssClass: "warning",
				buttons: [
					{
						text: tc("Ok"),
						role: "cancel",
						cssClass: "cancel"
					}
				]
			});
		}
		const doSave = (title: string, msg: string = "savedToStorage") => {
			const save: DJCustomInfo = {
				declensions,
				conjugations,
				other
			};
			DeclenjugatorStorage.setItem(title, save).then(() => {
				toaster({
					message: tc(msg, { title }),
					duration: 2500,
					position: "top",
					toast
				});
			}).finally(() => doCleanClose());
		};
		// Check if overwriting
		DeclenjugatorStorage.getItem<DJCustomInfo>(title).then((value) => {
			if(!value) {
				doSave(title);
			} else if (disableConfirms) {
				doSave(title, "overwriteStorage");
			} else {
				yesNoAlert({
					header: tc("alreadyExists", { title }),
					message: tc("clearOverride", { things: "the previous save." }),
					cssClass: "warning",
					submit: tc("Yes Overwrite It"),
					handler: () => doSave(title, "overwriteStorage"),
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
						message: tc("saveLoaded", { title }),
						duration: 2500,
						color: "success",
						position: "top",
						toast
					});
					doCleanClose();
				} else {
					doAlert({
						header: tc("Load Error"),
						cssClass: "danger",
						message: tc("saveNotFound", { title }),
						buttons: [
							{
								text: tc("Ok"),
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
				header:  tc("loadTitle", { title }),
				message: tc("clearOverwrite", { things: "all current groups" }),
				cssClass: "warning",
				submit: tc("confirmLoad"),
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
					message: tc("saveDeleted", { title }),
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
				header: tc("deleteTitle", { title }),
				message: tc("Are you sure you want to delete this? This cannot be undone."),
				cssClass: "danger",
				submit: tc("confirmDelIt"),
				handler,
				doAlert
			});
		}
	};
	return (
		<IonModal isOpen={isOpen} onDidDismiss={() => doCleanClose()}>
			<IonHeader>
				<IonToolbar color="primary">
					<IonTitle>{tc("Manage Custom Info")}</IonTitle>
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
							<IonLabel>{tc("Save Current Info")}</IonLabel>
						</IonItemDivider>
						<IonItem>
							<IonInput
								aria-label={tc("Name of save")}
								id="currentDJInfoSaveName"
								inputmode="text"
								placeholder={tc("Name your custom info")}
								type="text"
							/>
							<IonButton
								slot="end"
								onClick={() => maybeSaveInfo()}
								strong={true}
								color="success"
							>{tc("Save")}</IonButton>
						</IonItem>
					</IonItemGroup>
					<IonItemGroup className="buttonFilled">
						<IonItemDivider>
							<IonLabel>{tc("Load Saved Info")}</IonLabel>
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
									>{tc("Load")}</IonButton>
									<IonButton
										className="ion-no-margin"
										slot="end"
										color="danger"
										onClick={() => maybeDeleteInfo(title)}
									>
										<IonIcon icon={trashOutline} />
									</IonButton>
								</IonItem>
							);
						})}
						{
							(customInfo.length === 0) ?
								<IonItem color="warning"><IonLabel>{tc("No saved info")}</IonLabel></IonItem>
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
						<IonLabel>{tc("Cancel")}</IonLabel>
					</IonButton>
				</IonToolbar>
			</IonFooter>
		</IonModal>
	);
};

export default ManageCustomInfo;
