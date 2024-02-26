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

import { Base_WG, ExtraCharactersModalOpener, SetState, StateObject } from '../../../store/types';
import { loadStateWG } from '../../../store/wgSlice';
import useTranslator from '../../../store/translationHooks';

import escape from '../../../components/EscapeForHTML';
import { $i } from '../../../components/DollarSignExports';
import { CustomStorageWG } from '../../../components/PersistentInfo';
import yesNoAlert from '../../../components/yesNoAlert';
import toaster from '../../../components/toaster';

interface ExtraInfo extends ExtraCharactersModalOpener {
	titles: string[] | null
	setTitles: SetState<string[] | null>
}

const ManageCustomInfo = (props: ExtraInfo) => {
	const { isOpen, setIsOpen, openECM, titles, setTitles } = props;
	const dispatch = useDispatch();
	const [ t ] = useTranslator('we');
	const [ tc ] = useTranslator('common');
	const [doAlert] = useIonAlert();
	const toast = useIonToast();
	const {
		characterGroups,
		multipleSyllableTypes,
		singleWord,
		wordInitial,
		wordMiddle,
		wordFinal,
		syllableDropoffOverrides,
		transforms,
		monosyllablesRate,
		maxSyllablesPerWord,
		characterGroupDropoff,
		syllableBoxDropoff,
		capitalizeSentences,
		declarativeSentencePre,
		declarativeSentencePost,
		interrogativeSentencePre,
		interrogativeSentencePost,
		exclamatorySentencePre,
		exclamatorySentencePost,
		customSort
	} = useSelector((state: StateObject) => state.wg);
	const { disableConfirms } = useSelector((state: StateObject) => state.appSettings);
	const customInfo: string[] = titles || [];
	const doCleanClose = () => {
		setTitles(null);
		setIsOpen(false);
	};
	const maybeSaveInfo = () => {
		const el = $i<HTMLInputElement>("currentInfoSaveNameWG");
		const title = el ? escape(el.value).trim() : "";
		if(title === "") {
			return doAlert({
				header: tc("missingThing", { thing: tc("title") }),
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
		const doSave = (title: string, msg: string) => {
			const save: Base_WG = {
				characterGroups,
				multipleSyllableTypes,
				singleWord,
				wordInitial,
				wordMiddle,
				wordFinal,
				syllableDropoffOverrides,
				transforms,
				monosyllablesRate,
				maxSyllablesPerWord,
				characterGroupDropoff,
				syllableBoxDropoff,
				capitalizeSentences,
				declarativeSentencePre,
				declarativeSentencePost,
				interrogativeSentencePre,
				interrogativeSentencePost,
				exclamatorySentencePre,
				exclamatorySentencePost,
				customSort
			};
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
							<IonLabel>{tc("saveThing", { thing: tc("Current Info") })}</IonLabel>
						</IonItemDivider>
						<IonItem>
							<IonInput
								aria-label={tc("Name of save")}
								id="currentInfoSaveNameWG"
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
										onClick={() => maybeDeleteInfo(title)}><IonIcon
										icon={trashOutline}
									/></IonButton>
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
						<IonLabel>Cancel</IonLabel>
					</IonButton>
				</IonToolbar>
			</IonFooter>
		</IonModal>
	);
};

export default ManageCustomInfo;
