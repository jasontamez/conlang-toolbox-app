import React, { FC, useCallback, useMemo } from 'react';
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

import { Base_WG, ExtraCharactersModalOpener, SetState, StateObject } from '../../../store/types';
import { loadStateWG } from '../../../store/wgSlice';
import useTranslator from '../../../store/translationHooks';

import escape from '../../../components/EscapeForHTML';
import { $i } from '../../../components/DollarSignExports';
import { CustomStorageWG } from '../../../components/PersistentInfo';
import yesNoAlert from '../../../components/yesNoAlert';
import toaster from '../../../components/toaster';
import useI18Memo from '../../../components/useI18Memo';

interface ExtraInfo extends ExtraCharactersModalOpener {
	titles: string[] | null
	setTitles: SetState<string[] | null>
}

interface SavedItemProps {
	title: string
	maybeLoad: () => void
	maybeDelete: () => void
	tLoad: string
	tDelete: string
}
const SavedItem: FC<SavedItemProps> = (props) => {
	const { title, maybeLoad, maybeDelete, tLoad, tDelete } = props;
	return (
		<IonItem key={title}>
			<IonLabel className="ion-text-wrap">{title}</IonLabel>
			<IonButton
				className="loadButton"
				slot="end"
				color="warning"
				onClick={maybeLoad}
				strong={true}
			>{tLoad}</IonButton>
			<IonButton
				aria-label={tDelete}
				className="ion-no-margin"
				slot="end"
				color="danger"
				onClick={maybeDelete}
			>
				<IonIcon icon={trashOutline} />
			</IonButton>
		</IonItem>
	)
};

const commons = [
	"Cancel", "Close", "Delete", "Extra Characters", "Load Error", "Load",
	"Manage Custom Info", "Name of save", "Name your custom info",
	"No saved info", "Ok", "Save", "Yes Overwrite It", "cannotUndo",
	"confirmDelIt", "confirmLoad"
];

const ManageCustomInfo: FC<ExtraInfo> = (props) => {
	const [ t ] = useTranslator('we');
	const [ tc ] = useTranslator('common');
	const [
		tCancel, tClose, tDelete, tExChar, tLoadError, tLoad,
		tManage, tNameSave, tNameCustom, tNoSaved, tOk, tSave,
		tYesOverwrite, tCannotUndo, tConfirmDel, tConfirmLoad
	] = useI18Memo(commons);
	const [tSaveInfo, tLoadInfo] = useMemo(() => {
		const tCurr = tc("Current Info");
		const save = tc("saveThing", { thing: tCurr });
		const load = tc("loadThing", { thing: tCurr });
		return [save, load];
	}, [tc]);
	const tMissingTitle = useMemo(() => {
		return tc("missingThing", { thing: tc("title") });
	}, [tc]);
	const tClearPrevSave = useMemo(() => {
		return tc("clearOverrideGeneralThings", { things: tc("the previous save") });
	}, [tc]);
	const tClearAll = useMemo(() => tc("clearOverrideGeneralThings", { things: t("allThings") }), [t, tc]);

	const { isOpen, setIsOpen, openECM, titles, setTitles } = props;
	const dispatch = useDispatch();
	const [doAlert] = useIonAlert();
	const toast = useIonToast();
	const wg = useSelector((state: StateObject) => state.wg);
	const { disableConfirms } = useSelector((state: StateObject) => state.appSettings);
	const customInfo: string[] = useMemo(() => titles || [], [titles]);
	const doCleanClose = useCallback(() => {
		setTitles(null);
		setIsOpen(false);
	}, [setIsOpen, setTitles]);
	const maybeSaveInfo = useCallback(() => {
		const el = $i<HTMLInputElement>("currentInfoSaveNameWG");
		const title = el ? escape(el.value).trim() : "";
		if(title === "") {
			return doAlert({
				header: tMissingTitle,
				cssClass: "warning",
				buttons: [
					{
						text: tOk,
						role: "cancel",
						cssClass: "cancel"
					}
				]
			});
		}
		const doSave = (title: string, msg: string) => {
			const {
				// Remove props we aren't saving
				output,
				showSyllableBreaks,
				sentencesPerText,
				capitalizeWords,
				sortWordlist,
				wordlistMultiColumn,
				wordsPerWordlist,
				...save
			} = wg;
			CustomStorageWG.setItem(title, save).then(() => {
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
		CustomStorageWG.getItem<Base_WG>(title).then((value) => {
			if(!value) {
				doSave(title, "titleSaved");
			} else if (disableConfirms) {
				doSave(title, "titleOverwritten");
			} else {
				yesNoAlert({
					header: tc("titleAlreadyExists", { title }),
					message: tClearPrevSave,
					cssClass: "warning",
					submit: tYesOverwrite,
					handler: () => doSave(title, "titleOverwritten"),
					doAlert
				});
			}
		});
	}, [disableConfirms, doAlert, doCleanClose, tc, toast, wg, tOk, tYesOverwrite, tClearPrevSave, tMissingTitle]);
	const maybeLoadInfo = useCallback((title: string) => {
		const handler = () => {
			CustomStorageWG.getItem<Base_WG>(title).then((value) => {
				if(value) {
					dispatch(loadStateWG(value));
					toaster({
						message: tc("titleLoaded", { title }),
						duration: 2500,
						color: "success",
						position: "top",
						toast
					});
					doCleanClose();
				} else {
					doAlert({
						header: tLoadError,
						cssClass: "danger",
						message: tc("titleNotFound", { title }),
						buttons: [
							{
								text: tOk,
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
				message: tClearAll,
				cssClass: "warning",
				submit: tConfirmLoad,
				handler,
				doAlert
			});
		}
	}, [disableConfirms, dispatch, doAlert, doCleanClose, tc, tClearAll, toast, tConfirmLoad, tOk, tLoadError]);
	const maybeDeleteInfo = useCallback((title: string) => {
		const handler = () => {
			const newCustom = customInfo.filter(ci => ci !== title);
			setTitles(newCustom.length > 0 ? newCustom : null);
			CustomStorageWG.removeItem(title).then(() => {
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
				message: tCannotUndo,
				cssClass: "warning",
				submit: tConfirmDel,
				handler,
				doAlert
			});
		}
	}, [customInfo, disableConfirms, doAlert, setTitles, tc, toast, tCannotUndo, tConfirmDel]);
	const mapSavedItems = useCallback(
		(title: string, i: number) => <SavedItem
			title={title}
			maybeDelete={() => maybeDeleteInfo(title)}
			maybeLoad={() => maybeLoadInfo(title)}
			tLoad={tLoad}
			tDelete={tDelete}
			key={`wgPreset/1::${title}`}
		/>,
		[maybeDeleteInfo, maybeLoadInfo, tLoad, tDelete]
	);
	const openEx = useCallback(() => openECM(true), [openECM]);
	return (
		<IonModal isOpen={isOpen} onDidDismiss={doCleanClose}>
			<IonHeader>
				<IonToolbar color="primary">
				<IonTitle>{tManage}</IonTitle>
					<IonButtons slot="end">
						<IonButton onClick={openEx} aria-label={tExChar}>
							<IonIcon icon={globeOutline} />
						</IonButton>
						<IonButton onClick={doCleanClose} aria-label={tClose}>
							<IonIcon icon={closeCircleOutline} />
						</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<IonList lines="none">
					<IonItemGroup>
						<IonItemDivider>
							<IonLabel>{tSaveInfo}</IonLabel>
						</IonItemDivider>
						<IonItem>
							<IonInput
								aria-label={tNameSave}
								id="currentInfoSaveNameWG"
								inputmode="text"
								placeholder={tNameCustom}
								type="text"
							/>
							<IonButton
								slot="end"
								onClick={maybeSaveInfo}
								strong={true}
								color="success"
							>{tSave}</IonButton>
						</IonItem>
					</IonItemGroup>
					<IonItemGroup className="buttonFilled">
						<IonItemDivider>
							<IonLabel>{tLoadInfo}</IonLabel>
						</IonItemDivider>
						{(customInfo.length === 0) ?
							<IonItem color="warning"><IonLabel>{tNoSaved}</IonLabel></IonItem>
						:
							customInfo.map(mapSavedItems)
						}
					</IonItemGroup>
				</IonList>
			</IonContent>
			<IonFooter>
				<IonToolbar>
					<IonButton color="danger" slot="end" onClick={doCleanClose}>
						<IonIcon icon={closeCircleSharp} slot="start" />
						<IonLabel>{tCancel}</IonLabel>
					</IonButton>
				</IonToolbar>
			</IonFooter>
		</IonModal>
	);
};

export default ManageCustomInfo;
