import React, { useCallback, useEffect, useState, FC, useMemo } from 'react';
import {
	IonItem,
	IonIcon,
	IonLabel,
	IonList,
	IonContent,
	IonToolbar,
	IonButton,
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
	saveOutline,
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
import useI18Memo from '../../../components/useI18Memo';
import ModalHeader from '../../../components/ModalHeader';

interface EditDJModal extends ExtraCharactersModalOpener {
	incomingDeclenjugation: Declenjugation | null
	setOutgoingDeclenjugation: SetState<Declenjugation | null | string>
	caseMakerModalInfo: ModalProperties
	savedTitle: string
	setSavedTitle: SetState<string>
	typeString: string
}

const translations = [
	"Modification", "Prefix", "Suffix",
	"This applies your modifications to the base word instead of the stem.",
	"Use advanced method", "Use entire word",
	"You did not enter a match expression.",
	"You must provide a title or description before saving."
];

const commons = [
	"Are you sure you want to delete this? This cannot be undone.",
	"Are you sure you want to discard your edits?", "Delete", "Deleted", "Ok",
	"Save", "Unsaved Info", "Yes Discard", "confirmDelIt"
];

const presentations = [ "Matching Expression", "Replacement Expression" ];

const context = { context: "presentation" };

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
	const [ tYouSureDel, tYouSureDiscard, tDel, tDeleted, tOk, tSave, tUnsaved, tYes, tConfDel ] = useI18Memo(commons);
	const [ tMod, tPref, tSuff, tBaseWord, tAdvMeth, tWord, tNoMatch, tNoTitle ] = useI18Memo(translations, "dj");
	const tTitleMethod = useMemo(() => t("Title Method", { method: typeString.toLocaleLowerCase() }), [t, typeString]);
	const tAdvExpl = useMemo(() => t("advancedExplanation", { method: typeString.toLocaleLowerCase() }), [t, typeString]);
	const [ tpMatch, tpReplace ] = useI18Memo(presentations, "dj", context);
	const [ tMatch, tReplace ] = useI18Memo(presentations, "dj");
	const tTypeString = useMemo(() => typeString ? t(typeString) : "", [typeString, t]);
	const tEditThing = useMemo(() => tc("editThing", { thing: tTypeString }), [tTypeString, tc]);
	const tDelThing = useMemo(() => tc("deleteThing", { thing: tTypeString }), [tTypeString, tc]);
	const tTitleSaved = useMemo(() => tc("titleSaved", { method: tTypeString }), [tTypeString, tc]);

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
	const grabInfo = useCallback(() => {
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
	}, []);

	const tWordOrStem = useMemo(() => t(useWholeWord ? "word" : "stem"), [t, useWholeWord]);

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

	const maybeSaveEditedDeclenjugation = useCallback(() => {
		const {
			title,
			prefix,
			suffix,
			regex1,
			regex2
		} = grabInfo();
		if(!title) {
			doAlert({
				message: tNoTitle,
				cssClass: "danger",
				buttons: [
					{
						text: tOk,
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
					message: tNoMatch,
					cssClass: "danger",
					buttons: [
						{
							text: tOk,
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
							text: tOk,
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
			message: tTitleSaved,
			position: "middle",
			color: "success",
			duration: 2000,
			toast
		});
	}, [
		closeModal, doAlert, grabInfo, id, setOutgoingDeclenjugation, t,
		tTitleSaved, tNoMatch, tNoTitle, tOk, toast, useAdvancedMethod,
		useWholeWord
	]);
	const maybeCancel = useCallback(() => {
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
				header: tUnsaved,
				message: tYouSureDiscard,
				cssClass: "warning",
				submit: tYes,
				handler: closeModal,
				doAlert
			});
		}
		closeModal();
	}, [closeModal, doAlert, grabInfo, incomingDeclenjugation, tUnsaved, tYes, tYouSureDiscard]);
	const maybeDelete = useCallback(() => {
		const handler = () => {
			setOutgoingDeclenjugation(id);
			closeModal();
			toaster({
				message: tDeleted,
				position: "middle",
				color: "danger",
				duration: 2000,
				toast
			});
		};
		if(!disableConfirms) {
			return yesNoAlert({
				header: tDelThing,
				message: tYouSureDel,
				cssClass: "danger",
				submit: tConfDel,
				handler,
				doAlert
			});
		}
		handler();
	}, [
		closeModal, disableConfirms, doAlert, id, setOutgoingDeclenjugation,
		tDelThing, tConfDel, tDeleted, tYouSureDel, toast
	]);
	const openCase = useCallback(() => caseMakerModalInfo.setIsOpen(true), [caseMakerModalInfo]);
	const toggleUseWholeWord = useCallback(() => setUseWholeWord(!useWholeWord), [useWholeWord]);
	const toggleUseAdvanced = useCallback(() => setUseAdvancedMethod(!useAdvancedMethod), [useAdvancedMethod]);
	return (
		<IonModal isOpen={isOpen} backdropDismiss={false} onIonModalDidPresent={onLoad}>
			<ModalHeader title={tEditThing} openECM={openECM} closeModal={maybeCancel} />
			<IonContent>
				<IonList lines="full" id="addingCustomDeclenjugatorList" className="hasSpecialLabels hasToggles">
					<IonItem className="labelled">
						<IonLabel className="ion-text-wrap ion-padding-bottom">{tTitleMethod}</IonLabel>
					</IonItem>
					<IonItem>
						<IonInput
							aria-label={tTitleMethod}
							id="editDJTitle"
						/>
						<IonButton color="primary" onClick={openCase} slot="end">
							<IonIcon icon={addCircle} slot="icon-only" />
						</IonButton>
					</IonItem>
					<IonItem className="wrappableInnards">
						<IonToggle
							labelPlacement="start"
							enableOnOffLabels
							checked={useWholeWord}
							onIonChange={toggleUseWholeWord}
						>
							<h2>{tWord}</h2>
							<p>{tBaseWord}</p>
						</IonToggle>
					</IonItem>
					<IonItem className="wrappableInnards">
						<IonToggle
							labelPlacement="start"
							enableOnOffLabels
							checked={useAdvancedMethod}
							onIonChange={toggleUseAdvanced}
						>
							<h2>{tAdvMeth}</h2>
							<p>{tAdvExpl}</p>
						</IonToggle>
					</IonItem>
					<IonItemDivider>{tMod}</IonItemDivider>
					<IonItem className={`"labelled toggleable${useAdvancedMethod ? "" : " toggled"}`}>
						<IonLabel className="ion-text-wrap ion-padding-bottom">{tpMatch}</IonLabel>
					</IonItem>
					<IonItem className={`"wrappableInnards toggleable${useAdvancedMethod ? "" : " toggled"}`}>
						<IonInput
							id="editDJRegex1"
							aria-label={tMatch}
						/>
					</IonItem>
					<IonItem className={`"labelled toggleable${useAdvancedMethod ? "" : " toggled"}`}>
						<IonLabel className="ion-text-wrap ion-padding-bottom">{tpReplace}</IonLabel>
					</IonItem>
					<IonItem className={`"wrappableInnards toggleable${useAdvancedMethod ? "" : " toggled"}`}>
						<IonInput
							id="editDJRegex2"
							aria-label={tReplace}
						/>
					</IonItem>
					<IonItem className={`"labelled toggleable${useAdvancedMethod ? " toggled" : ""}`}>
						<div slot="start">{tPref}</div>
						<div slot="end">{tSuff}</div>
					</IonItem>
					<IonItem className={`"wrappableInnards prefixSuffix toggleable${useAdvancedMethod ? " toggled" : ""}`}>
						<IonInput
							id="editDJPrefix"
							aria-label={tPref}
							className="ion-text-end"
						/>
						<div className="ion-text-center stem pad-horizontal-rem">
							<strong>{tWordOrStem}</strong>
						</div>
						<IonInput
							id="editDJSuffix"
							aria-label={tSuff}
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
						<IonLabel>{tDel}</IonLabel>
					</IonButton>
					<IonButton
						color="success"
						slot="end"
						onClick={maybeSaveEditedDeclenjugation}
					>
						<IonIcon icon={saveOutline} slot="end" />
						<IonLabel>{tSave}</IonLabel>
					</IonButton>
				</IonToolbar>
			</IonFooter>
		</IonModal>
	);
};

export default EditDeclenjugation;
