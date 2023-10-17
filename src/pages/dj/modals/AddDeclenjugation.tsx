import React, { useCallback, useState } from 'react';
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
	IonToggle
} from '@ionic/react';
import {
	closeCircleOutline,
	saveOutline,
	globeOutline
} from 'ionicons/icons';
import { v4 as uuidv4 } from 'uuid';

import {
	Declenjugation,
	ExtraCharactersModalOpener
} from '../../../store/types';

import { $i } from '../../../components/DollarSignExports';
import toaster from '../../../components/toaster';
import yesNoAlert from '../../../components/yesNoAlert';

interface AddDJModal extends ExtraCharactersModalOpener {
	setSavedDeclenjugation: Function
}

const AddDeclenjugation = (props: AddDJModal) => {
	const {
		isOpen,
		setIsOpen,
		openECM,
		setSavedDeclenjugation
	} = props;
	const [doAlert] = useIonAlert();
	const [doToast, undoToast] = useIonToast();
	const [useWholeWord, setUseWholeWord] = useState<boolean>(false);
	const [useAdvancedMethod, setUseAdvancedMethod] = useState<boolean>(false);
	const closeModal = useCallback(() => {
		setIsOpen(false);
		setUseAdvancedMethod(false);
		setUseWholeWord(false);
		const addDJTitle = $i("addDJTitle");
		addDJTitle && (addDJTitle.value = "");
		const addDJPrefix = $i("addDJPrefix");
		addDJPrefix && (addDJPrefix.value = "");
		const addDJSuffix = $i("addDJSuffix");
		addDJSuffix && (addDJSuffix.value = "");
		const addDJRegex1 = $i("addDJRegex1");
		addDJRegex1 && (addDJRegex1.value = "");
		const addDJRegex2 = $i("addDJRegex2");
		addDJRegex2 && (addDJRegex2.value = "");
	}, [setIsOpen]);
	const grabInfo = () => {
		const addDJTitle = $i("addDJTitle");
		const title = addDJTitle ? addDJTitle.value.trim() : "";
		const addDJPrefix = $i("addDJPrefix");
		const prefix = addDJPrefix && addDJPrefix.value ? addDJPrefix.value.trim() : "";
		const addDJSuffix = $i("addDJSuffix");
		const suffix = addDJSuffix && addDJSuffix.value ? addDJSuffix.value.trim() : "";
		const addDJRegex1 = $i("addDJRegex1");
		const regex1 = addDJRegex1 && addDJRegex1.value ? addDJRegex1.value.trim() : "";
		const addDJRegex2 = $i("addDJRegex2");
		const regex2 = addDJRegex2 && addDJRegex2.value ? addDJRegex2.value.trim() : "";
		return {
			title,
			prefix,
			suffix,
			regex1,
			regex2
		};
	};
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
			})
			return;
		}
		const newDJ: Declenjugation = {
			id: uuidv4(),
			title,
			useWholeWord
		};
		if(useAdvancedMethod && !regex1) {
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
			})
			return;
		}
		if(useAdvancedMethod) {
			newDJ.regex = [regex1, regex2];
		} else {
			newDJ.prefix = prefix;
			newDJ.suffix = suffix;
		}
		setSavedDeclenjugation(newDJ);
		closeModal();
		toaster({
			message: "Declension/conjugation saved.",
			position: "middle",
			color: "success",
			duration: 2000,
			doToast,
			undoToast
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
		<IonModal isOpen={isOpen} backdropDismiss={false}>
			<IonHeader>
				<IonToolbar color="primary">
					<IonTitle>Add Custom Sort</IonTitle>
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
				<IonList lines="full" id="addingCustomDJList" className="hasSpecialLabels">
					<IonItem>
						<div slot="start" className="ion-margin-end">Title/Description:</div>
						<IonInput
							aria-label="Title"
							id="addDJTitle"
							placeholder="Title/Description for this declension/conjugation"
						/>
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
							<p>Use regular expressions to craft a declension or conjugation.</p>
						</IonToggle>
					</IonItem>
					{useAdvancedMethod ?
						<>
							<IonItem className="wrappableInnards">
								<IonInput
									aria-label="Match expression"
									id="addDJRegex1"
									label="Match Expression:"
									label-placement="stacked"
								/>
							</IonItem>
							<IonItem className="wrappableInnards">
								<IonInput
									aria-label="Replacement expression"
									id="addDJRegex2"
									label="Replacement Expression:"
									label-placement="stacked"
								/>
							</IonItem>
						</>
					:
						<>
							<IonItem className="labelled" lines="none">
								<IonLabel>Prefix/Suffix/Circumfix:</IonLabel>
							</IonItem>
							<IonItem className="wrappableInnards">
								<IonInput
									aria-label="Prefix"
									id="addDJPrefix"
									label="Prefix"
									label-labelPlacement="stacked"
									className="ion-text-end"
								/>
								<div
									className="ion-text-center"
									style={{paddingInline: "1rem"}}
								><strong>{useWholeWord ? "word" : "stem"}</strong></div>
								<IonInput
									aria-label="Suffix"
									id="addDJSuffix"
									label="Suffix"
									label-labelPlacement="stacked"
									className="ion-text-start"
								/>
							</IonItem>
						</>
					}
				</IonList>
			</IonContent>
			<IonFooter style={{borderTop: "2px solid #00000033"}}>
				<IonToolbar>
					<IonButton
						color="warning"
						slot="start"
						onClick={maybeCancel}
					>
						<IonIcon icon={saveOutline} slot="end" />
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
