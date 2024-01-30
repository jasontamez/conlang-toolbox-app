import React, { useCallback, useEffect, useState } from 'react';
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
import {
	closeCircleOutline,
	saveOutline,
	globeOutline,
	addCircle
} from 'ionicons/icons';
import { v4 as uuidv4 } from 'uuid';

import {
	Declenjugation,
	ExtraCharactersModalOpener,
	ModalProperties,
	SetState
} from '../../../store/types';

import { $i } from '../../../components/DollarSignExports';
import toaster from '../../../components/toaster';
import yesNoAlert from '../../../components/yesNoAlert';

interface AddDJModal extends ExtraCharactersModalOpener {
	setSavedDeclenjugation: SetState<Declenjugation | null>
	caseMakerModalInfo: ModalProperties
	savedTitle: string
	setSavedTitle: SetState<string>
	typeString: string
}

const AddDeclenjugation = (props: AddDJModal) => {
	const {
		isOpen,
		setIsOpen,
		openECM,
		setSavedDeclenjugation,
		caseMakerModalInfo,
		savedTitle,
		setSavedTitle,
		typeString
	} = props;
	const [doAlert] = useIonAlert();
	const toast = useIonToast();
	const [useWholeWord, setUseWholeWord] = useState<boolean>(false);
	const [useAdvancedMethod, setUseAdvancedMethod] = useState<boolean>(false);
	const onLoad = useCallback(() => {
		setUseAdvancedMethod(false);
		setUseWholeWord(false);
		const addDJTitle = $i<HTMLInputElement>("addDJTitle");
		addDJTitle && (addDJTitle.value = "");
		const addDJPrefix = $i<HTMLInputElement>("addDJPrefix");
		addDJPrefix && (addDJPrefix.value = "");
		const addDJSuffix = $i<HTMLInputElement>("addDJSuffix");
		addDJSuffix && (addDJSuffix.value = "");
		const addDJRegex1 = $i<HTMLInputElement>("addDJRegex1");
		addDJRegex1 && (addDJRegex1.value = "");
		const addDJRegex2 = $i<HTMLInputElement>("addDJRegex2");
		addDJRegex2 && (addDJRegex2.value = "");
	}, []);
	const closeModal = useCallback(() => {
		setIsOpen(false);
	}, [setIsOpen]);
	const grabInfo = () => {
		const addDJTitle = $i<HTMLInputElement>("addDJTitle");
		const title = addDJTitle ? addDJTitle.value.trim() : "";
		const addDJPrefix = $i<HTMLInputElement>("addDJPrefix");
		const prefix = addDJPrefix && addDJPrefix.value ? addDJPrefix.value : "";
		const addDJSuffix = $i<HTMLInputElement>("addDJSuffix");
		const suffix = addDJSuffix && addDJSuffix.value ? addDJSuffix.value : "";
		const addDJRegex1 = $i<HTMLInputElement>("addDJRegex1");
		const regex1 = addDJRegex1 && addDJRegex1.value ? addDJRegex1.value : "";
		const addDJRegex2 = $i<HTMLInputElement>("addDJRegex2");
		const regex2 = addDJRegex2 && addDJRegex2.value ? addDJRegex2.value : "";
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
		const addDJTitle = $i<HTMLInputElement>("addDJTitle");
		if(isOpen && savedTitle && addDJTitle) {
			const title = addDJTitle ? addDJTitle.value.trim() : "";
			if(!title) {
				addDJTitle.value = savedTitle;
			} else {
				addDJTitle.value = addDJTitle.value + " " + savedTitle;
			}
			setSavedTitle("");
		}
	}, [isOpen, savedTitle, setSavedTitle]);

	const maybeSaveNewDeclenjugation = () => {
		const {
			title,
			prefix,
			suffix,
			regex1,
			regex2
		} = grabInfo();
		if(!title) {
			doAlert({
				message: "You must provide a title or description before saving.",
				cssClass: "danger",
				buttons: [
					{
						text: "Ok",
						role: "cancel",
						cssClass: "submit"
					}
				]
			});
			return;
		}
		const newDJ: Declenjugation = {
			id: uuidv4(),
			title,
			useWholeWord
		};
		if(useAdvancedMethod) {
			if(!regex1) {
				doAlert({
					message: "You did not enter a match expression.",
					cssClass: "danger",
					buttons: [
						{
							text: "Ok",
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
					header: `Error trying to parse "${regex1}"`,
					message: `${e}`,
					cssClass: "danger",
					buttons: [
						{
							text: "Ok",
							role: "cancel",
							cssClass: "submit"
						}
					]
				});
				return;
			}
			newDJ.regex = [regex1, regex2];
		} else {
			newDJ.prefix = prefix;
			newDJ.suffix = suffix;
		}
		setSavedDeclenjugation(newDJ);
		closeModal();
		toaster({
			message: typeString + " saved.",
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
		if(
			title ||
			(useAdvancedMethod ?
				(regex1 || regex2)
			:
				(prefix || suffix)
			)
		) {
			return yesNoAlert({
				header: "Unsaved Info",
				message: "Are you sure you want to discard this?",
				cssClass: "warning",
				submit: "Yes, Close",
				handler: closeModal,
				doAlert
			});
		}
		closeModal();
	};
	return (
		<IonModal isOpen={isOpen} backdropDismiss={false} onIonModalDidPresent={onLoad}>
			<IonHeader>
				<IonToolbar color="primary">
					<IonTitle>Add {typeString.slice(0, -1)}</IonTitle>
					<IonButtons slot="end">
						<IonButton onClick={() => openECM(true)}>
							<IonIcon icon={globeOutline} />
						</IonButton>
						<IonButton onClick={maybeCancel}>
							<IonIcon icon={closeCircleOutline} />
						</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<IonList lines="full" id="addingCustomDeclenjugatorList" className="hasSpecialLabels hasToggles">
					<IonItem className="labelled">
						<IonLabel className="ion-text-wrap ion-padding-bottom">Title or Description of this {typeString.slice(0, -1)}:</IonLabel>
					</IonItem>
					<IonItem>
						<IonInput
							aria-label={`Title or description of this ${typeString.slice(0, -1)}:`}
							id="addDJTitle"
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
							<h2>Use entire word</h2>
							<p>This applies your modifications to the base word instead of the stem.</p>
						</IonToggle>
					</IonItem>
					<IonItem className="wrappableInnards">
						<IonToggle
							labelPlacement="start"
							enableOnOffLabels
							checked={useAdvancedMethod}
							onIonChange={e => setUseAdvancedMethod(!useAdvancedMethod)}
						>
							<h2>Use advanced method</h2>
							<p>Use regular expressions to craft a {typeString.toLocaleLowerCase()}.</p>
						</IonToggle>
					</IonItem>
					<IonItemDivider>Modification</IonItemDivider>
					<IonItem className={`"labelled toggleable${useAdvancedMethod ? "" : " toggled"}`}>
						<IonLabel className="ion-text-wrap ion-padding-bottom">Match Expression:</IonLabel>
					</IonItem>
					<IonItem className={`"wrappableInnards toggleable${useAdvancedMethod ? "" : " toggled"}`}>
						<IonInput
							id="addDJRegex1"
							aria-label="Match Expression:"
						/>
					</IonItem>
					<IonItem className={`"labelled toggleable${useAdvancedMethod ? "" : " toggled"}`}>
						<IonLabel className="ion-text-wrap ion-padding-bottom">Replacement Expression:</IonLabel>
					</IonItem>
					<IonItem className={`"wrappableInnards toggleable${useAdvancedMethod ? "" : " toggled"}`}>
						<IonInput
							id="addDJRegex2"
							aria-label="Replacement Expression:"
						/>
					</IonItem>
					<IonItem className={`"labelled toggleable${useAdvancedMethod ? " toggled" : ""}`}>
						<div slot="start">Prefix</div>
						<div slot="end">Suffix</div>
					</IonItem>
					<IonItem className={`"wrappableInnards prefixSuffix toggleable${useAdvancedMethod ? " toggled" : ""}`}>
						<IonInput
							id="addDJPrefix"
							aria-label="Prefix"
							className="ion-text-end"
						/>
						<div className="ion-text-center stem pad-horizontal-rem">
							<strong>{useWholeWord ? "word" : "stem"}</strong>
						</div>
						<IonInput
							id="addDJSuffix"
							aria-label="Suffix"
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
						onClick={maybeCancel}
					>
						<IonIcon icon={closeCircleOutline} slot="end" />
						<IonLabel>Cancel</IonLabel>
					</IonButton>
					<IonButton
						color="success"
						slot="end"
						onClick={maybeSaveNewDeclenjugation}
					>
						<IonIcon icon={saveOutline} slot="end" />
						<IonLabel>Save</IonLabel>
					</IonButton>
				</IonToolbar>
			</IonFooter>
		</IonModal>
	);
};

export default AddDeclenjugation;
