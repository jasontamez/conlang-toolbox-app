import React, { useCallback, useEffect, useState, FC } from 'react';
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
	IonInput,
	IonFooter,
	useIonAlert,
	useIonToast,
	IonToggle,
	IonItemDivider
} from '@ionic/react';
import { useSelector } from 'react-redux';
import {
	closeCircleOutline,
	saveOutline,
	globeOutline,
	trashOutline,
	addCircle
} from 'ionicons/icons';

import {
	Declenjugation,
	ExtraCharactersModalOpener,
	ModalProperties,
	SetState,
	StateObject
} from '../../../store/types';
import useTranslator from '../../../store/translationHooks';

import { $i } from '../../../components/DollarSignExports';
import toaster from '../../../components/toaster';
import yesNoAlert from '../../../components/yesNoAlert';

interface EditDJModal extends ExtraCharactersModalOpener {
	incomingDeclenjugation: Declenjugation | null
	setOutgoingDeclenjugation: SetState<Declenjugation | null | string>
	caseMakerModalInfo: ModalProperties
	savedTitle: string
	setSavedTitle: SetState<string>
	typeString: string
}

const EditDeclenjugation: FC<EditDJModal> = (props) => {
	const {
		isOpen,
		setIsOpen,
		openECM,
		incomingDeclenjugation,
		setOutgoingDeclenjugation,
		caseMakerModalInfo,
		savedTitle,
		setSavedTitle,
		typeString: pluralType
	} = props;
	const typeString = pluralType.slice(0, -1);
	const [ t ] = useTranslator('dj');
	const [ tc ] = useTranslator('common');
	const [doAlert] = useIonAlert();
	const toast = useIonToast();
	const [id, setId] = useState<string>("");
	const [useWholeWord, setUseWholeWord] = useState<boolean>(false);
	const [useAdvancedMethod, setUseAdvancedMethod] = useState<boolean>(false);
	const { disableConfirms } = useSelector((state: StateObject) => state.appSettings);
	const onLoad = useCallback(() => {
		const {
			title = "",
			id = "",
			prefix = "",
			suffix = "",
			regex = ["", ""],
			useWholeWord: uww = false
		} = incomingDeclenjugation || {};
		const [regex1, regex2] = regex;
		setUseAdvancedMethod((regex1 || regex2) ? true : false);
		setUseWholeWord(uww);
		setId(id);
		const editDJTitle = $i<HTMLInputElement>("editDJTitle");
		editDJTitle && (editDJTitle.value = title);
		const editDJPrefix = $i<HTMLInputElement>("editDJPrefix");
		editDJPrefix && (editDJPrefix.value = prefix);
		const editDJSuffix = $i<HTMLInputElement>("editDJSuffix");
		editDJSuffix && (editDJSuffix.value = suffix);
		const editDJRegex1 = $i<HTMLInputElement>("editDJRegex1");
		editDJRegex1 && (editDJRegex1.value = regex1);
		const editDJRegex2 = $i<HTMLInputElement>("editDJRegex2");
		editDJRegex2 && (editDJRegex2.value = regex2);
	}, [incomingDeclenjugation]);
	useEffect(() => {
		onLoad();
	}, [onLoad])
	const closeModal = useCallback(() => {
		setIsOpen(false);
	}, [setIsOpen]);
	const grabInfo = () => {
		const editDJTitle = $i<HTMLInputElement>("editDJTitle");
		const title = editDJTitle ? editDJTitle.value.trim() : "";
		const editDJPrefix = $i<HTMLInputElement>("editDJPrefix");
		const prefix = editDJPrefix && editDJPrefix.value ? editDJPrefix.value : "";
		const editDJSuffix = $i<HTMLInputElement>("editDJSuffix");
		const suffix = editDJSuffix && editDJSuffix.value ? editDJSuffix.value : "";
		const editDJRegex1 = $i<HTMLInputElement>("editDJRegex1");
		const regex1 = editDJRegex1 && editDJRegex1.value ? editDJRegex1.value : "";
		const editDJRegex2 = $i<HTMLInputElement>("editDJRegex2");
		const regex2 = editDJRegex2 && editDJRegex2.value ? editDJRegex2.value : "";
		return {
			title,
			prefix,
			suffix,
			regex1,
			regex2
		};
	};

	// Accept new title from other modal
	useEffect(() => {
		const editDJTitle = $i<HTMLInputElement>("editDJTitle");
		if(isOpen && savedTitle && editDJTitle) {
			const title = editDJTitle ? editDJTitle.value.trim() : "";
			if(!title) {
				editDJTitle.value = savedTitle;
			} else {
				editDJTitle.value = editDJTitle.value + " " + savedTitle;
			}
			setSavedTitle("");
		}
	}, [isOpen, savedTitle, setSavedTitle]);

	const maybeSaveEditedDeclenjugation = () => {
		const {
			title,
			prefix,
			suffix,
			regex1,
			regex2
		} = grabInfo();
		if(!title) {
			doAlert({
				message: t("You must provide a title or description before saving."),
				cssClass: "danger",
				buttons: [
					{
						text: tc("Ok"),
						role: "cancel",
						cssClass: "submit"
					}
				]
			});
			return;
		}
		const editedDJ: Declenjugation = {
			id,
			title,
			useWholeWord
		};
		if(useAdvancedMethod) {
			if(!regex1) {
				doAlert({
					message: t("You did not enter a match expression."),
					cssClass: "danger",
					buttons: [
						{
							text: tc("Ok"),
							role: "cancel",
							cssClass: "submit"
						}
					]
				});
				return;
			}
			try {
				new RegExp(regex1);
			} catch(e) {
				doAlert({
					header: t("regexpError", { regex: regex1 }),
					message: `${e}`,
					cssClass: "danger",
					buttons: [
						{
							text: tc("Ok"),
							role: "cancel",
							cssClass: "submit"
						}
					]
				});
				return;
			}
			editedDJ.regex = [regex1, regex2];
		} else {
			editedDJ.prefix = prefix;
			editedDJ.suffix = suffix;
		}
		setOutgoingDeclenjugation(editedDJ);
		closeModal();
		toaster({
			message: tc("titleSaved", { method: t(typeString) }),
			position: "middle",
			color: "success",
			duration: 2000,
			toast
		});
	};
	const maybeCancel = () => {
		const {
			title,
			prefix,
			suffix,
			regex1,
			regex2
		} = grabInfo();
		const {
			title: _title = "",
			prefix: _prefix = "",
			suffix: _suffix = "",
			regex = ["", ""]
		} = incomingDeclenjugation || {};
		if(
			title !== _title
			|| prefix !== _prefix
			|| suffix !== _suffix
			|| regex.join("^^^") !== `${regex1}^^^${regex2}`
		) {
			return yesNoAlert({
				header: tc("Unsaved Info"),
				message: tc("Are you sure you want to discard this?"),
				cssClass: "warning",
				submit: tc("Yes Discard"),
				handler: closeModal,
				doAlert
			});
		}
		closeModal();
	};
	const maybeDelete = () => {
		const handler = () => {
			setOutgoingDeclenjugation(id);
			closeModal();
			toaster({
				message: tc("Deleted."),
				position: "middle",
				color: "danger",
				duration: 2000,
				toast
			});
		};
		if(!disableConfirms) {
			return yesNoAlert({
				header: tc("deleteThing", { thing: t(typeString) }),
				message: tc("Are you sure you want to delete this? This cannot be undone."),
				cssClass: "danger",
				submit: tc("confirmDelIt"),
				handler,
				doAlert
			});
		}
		handler();
	};
	return (
		<IonModal isOpen={isOpen} backdropDismiss={false} onIonModalDidPresent={onLoad}>
			<IonHeader>
				<IonToolbar color="primary">
					<IonTitle>{tc("editThing", { thing: typeString && t(typeString) })}</IonTitle>
					<IonButtons slot="end">
						<IonButton onClick={() => openECM(true)} aria-label={tc("Extra Characters")}>
							<IonIcon icon={globeOutline} />
						</IonButton>
						<IonButton onClick={maybeCancel} aria-label={tc("Close")}>
							<IonIcon icon={closeCircleOutline} />
						</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<IonList lines="full" id="addingCustomDeclenjugatorList" className="hasSpecialLabels hasToggles">
					<IonItem className="labelled">
						<IonLabel className="ion-text-wrap ion-padding-bottom">{t("Title Method", { method: typeString.toLocaleLowerCase() })}</IonLabel>
					</IonItem>
					<IonItem>
						<IonInput
							aria-label={t("Title Method", { method: typeString.toLocaleLowerCase() })}
							id="editDJTitle"
						/>
						<IonButton color="primary" onClick={() => caseMakerModalInfo.setIsOpen(true)} slot="end">
							<IonIcon icon={addCircle} slot="icon-only" />
						</IonButton>
					</IonItem>
					<IonItem className="wrappableInnards">
						<IonToggle
							labelPlacement="start"
							enableOnOffLabels
							checked={useWholeWord}
							onIonChange={e => setUseWholeWord(!useWholeWord)}
						>
							<h2>{t("Use entire word")}</h2>
							<p>{t("This applies your modifications to the base word instead of the stem.")}</p>
						</IonToggle>
					</IonItem>
					<IonItem className="wrappableInnards">
						<IonToggle
							labelPlacement="start"
							enableOnOffLabels
							checked={useAdvancedMethod}
							onIonChange={e => setUseAdvancedMethod(!useAdvancedMethod)}
						>
							<h2>{t("Use advanced method")}</h2>
							<p>{t("advancedExplanation", { method: typeString.toLocaleLowerCase() })}</p>
						</IonToggle>
					</IonItem>
					<IonItemDivider>{t("Modification")}</IonItemDivider>
					<IonItem className={`"labelled toggleable${useAdvancedMethod ? "" : " toggled"}`}>
						<IonLabel className="ion-text-wrap ion-padding-bottom">{t("Matching Expression", { context: "presentation" })}</IonLabel>
					</IonItem>
					<IonItem className={`"wrappableInnards toggleable${useAdvancedMethod ? "" : " toggled"}`}>
						<IonInput
							id="editDJRegex1"
							aria-label={t("Matching Expression", { context: "presentation" })}
						/>
					</IonItem>
					<IonItem className={`"labelled toggleable${useAdvancedMethod ? "" : " toggled"}`}>
						<IonLabel className="ion-text-wrap ion-padding-bottom">{t("Replacement Expression", { context: "presentation" })}</IonLabel>
					</IonItem>
					<IonItem className={`"wrappableInnards toggleable${useAdvancedMethod ? "" : " toggled"}`}>
						<IonInput
							id="editDJRegex2"
							aria-label={t("Replacement Expression", { context: "presentation" })}
						/>
					</IonItem>
					<IonItem className={`"labelled toggleable${useAdvancedMethod ? " toggled" : ""}`}>
						<div slot="start">{t("Prefix")}</div>
						<div slot="end">{t("Suffix")}</div>
					</IonItem>
					<IonItem className={`"wrappableInnards prefixSuffix toggleable${useAdvancedMethod ? " toggled" : ""}`}>
						<IonInput
							id="editDJPrefix"
							aria-label={t("Prefix")}
							className="ion-text-end"
						/>
						<div className="ion-text-center stem pad-horizontal-rem">
							<strong>{t(useWholeWord ? "word" : "stem")}</strong>
						</div>
						<IonInput
							id="editDJSuffix"
							aria-label={t("Suffix")}
							className="ion-text-start"
						/>
					</IonItem>
				</IonList>
			</IonContent>
			<IonFooter className="modalBorderTop">
				<IonToolbar>
					<IonButton
						color="warning"
						slot="start"
						onClick={maybeDelete}
					>
						<IonIcon icon={trashOutline} slot="end" />
						<IonLabel>{tc("Delete")}</IonLabel>
					</IonButton>
					<IonButton
						color="success"
						slot="end"
						onClick={maybeSaveEditedDeclenjugation}
					>
						<IonIcon icon={saveOutline} slot="end" />
						<IonLabel>{tc("Save")}</IonLabel>
					</IonButton>
				</IonToolbar>
			</IonFooter>
		</IonModal>
	);
};

export default EditDeclenjugation;
