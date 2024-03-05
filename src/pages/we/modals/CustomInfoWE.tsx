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
import useTranslator from '../../../store/translationHooks';

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
	const [ t ] = useTranslator('we');
	const [ tc ] = useTranslator('common');
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
				header: tc("missingThing", { what: tc("title") }),
				cssClass: "warning",
				buttons: [
					{
						text: tc("Cancel"),
						role: "cancel",
						cssClass: "cancel"
					}
				]
			});
		}
		const doSave = (title: string, msg: string) => {
			const save: WEPresetObject = {
				characterGroups,
				transforms,
				soundChanges
			}
			CustomStorageWE.setItem(title, save).then(() => {
				toaster({
					message: tc(msg, { title }),
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
				doSave(title, "titleSaved");
			} else if (disableConfirms) {
				doSave(title, "titleOverwritten");
			} else {
				yesNoAlert({
					header: tc("titleAlreadyExists", { title }),
					message: tc("clearOverrideGeneralThings", { things: tc("the previous save") }),
					cssClass: "warning",
					submit: tc("Yes Overwrite It"),
					handler: () => doSave(title, "titleOverwritten"),
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
						message: tc("titleLoaded", { title }),
						duration: 2500,
						position: "top",
						toast
					});
					doCleanClose();
				} else {
					doAlert({
						header: tc("Load Error"),
						cssClass: "danger",
						message: tc("titleNotFound", { title }),
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
				header: tc("loadTitle", { title }),
				message: tc("clearOverrideGeneralThings", { title: t("allThings") }),
				cssClass: "warning",
				submit: tc("confirmLoad"),
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
					message: tc("titleDeleted", { title }),
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
				message: tc("cannotUndo"),
				cssClass: "warning",
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
						<IonButton onClick={() => openECM(true)} aria-label={tc("Extra Characters")}>
							<IonIcon icon={globeOutline} />
						</IonButton>
						<IonButton onClick={() => doCleanClose()} aria-label={tc("Close")}>
							<IonIcon icon={closeCircleOutline} />
						</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<IonList lines="none">
					<IonItemGroup>
						<IonItemDivider>
							<IonLabel>{tc("saveThing", { thing: tc("Current Info") })}</IonLabel>
						</IonItemDivider>
						<IonItem>
							<IonInput
								aria-label={tc("Name of save")}
								id="currentInfoSaveName"
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
							<IonLabel>{tc("loadThing", { thing: tc("Current Info") })}</IonLabel>
						</IonItemDivider>
						{(titles.length === 0) ?
							<IonItem color="warning"><IonLabel>{tc("No saved info")}</IonLabel></IonItem>
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
										>{tc("Load")}</IonButton>
										<IonButton
											className="ion-no-margin"
											aria-label={tc("Delete")}
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
						<IonLabel>{tc("Cancel")}</IonLabel>
					</IonButton>
				</IonToolbar>
			</IonFooter>
		</IonModal>
	);
};

export default ManageCustomInfoWE;
