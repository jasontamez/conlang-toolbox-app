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
	IonToggle,
	IonItemDivider
} from '@ionic/react';
import {
	closeCircleOutline,
	saveOutline,
	globeOutline,
	trashOutline
} from 'ionicons/icons';

import {
	Declenjugation,
	ExtraCharactersModalOpener,
	StateObject
} from '../../../store/types';

import { $i } from '../../../components/DollarSignExports';
import toaster from '../../../components/toaster';
import yesNoAlert from '../../../components/yesNoAlert';
import { useSelector } from 'react-redux';

interface EditDJModal extends ExtraCharactersModalOpener {
	incomingDeclenjugation: Declenjugation | null
	setOutgoingDeclenjugation: Function
}

const EditDeclenjugation = (props: EditDJModal) => {
	const {
		isOpen,
		setIsOpen,
		openECM,
		incomingDeclenjugation,
		setOutgoingDeclenjugation
	} = props;
	const [doAlert] = useIonAlert();
	const [doToast, undoToast] = useIonToast();
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
		const editDJTitle = $i("editDJTitle");
		editDJTitle && (editDJTitle.value = title);
		const editDJPrefix = $i("editDJPrefix");
		editDJPrefix && (editDJPrefix.value = prefix);
		const editDJSuffix = $i("editDJSuffix");
		editDJSuffix && (editDJSuffix.value = suffix);
		const editDJRegex1 = $i("editDJRegex1");
		editDJRegex1 && (editDJRegex1.value = regex1);
		const editDJRegex2 = $i("editDJRegex2");
		editDJRegex2 && (editDJRegex2.value = regex2);
	}, [incomingDeclenjugation]);
	const closeModal = useCallback(() => {
		setIsOpen(false);
	}, [setIsOpen]);
	const grabInfo = () => {
		const editDJTitle = $i("editDJTitle");
		const title = editDJTitle ? editDJTitle.value.trim() : "";
		const editDJPrefix = $i("editDJPrefix");
		const prefix = editDJPrefix && editDJPrefix.value ? editDJPrefix.value : "";
		const editDJSuffix = $i("editDJSuffix");
		const suffix = editDJSuffix && editDJSuffix.value ? editDJSuffix.value : "";
		const editDJRegex1 = $i("editDJRegex1");
		const regex1 = editDJRegex1 && editDJRegex1.value ? editDJRegex1.value : "";
		const editDJRegex2 = $i("editDJRegex2");
		const regex2 = editDJRegex2 && editDJRegex2.value ? editDJRegex2.value : "";
		return {
			title,
			prefix,
			suffix,
			regex1,
			regex2
		};
	};
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
		const editedDJ: Declenjugation = {
			id,
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
			editedDJ.regex = [regex1, regex2];
		} else {
			editedDJ.prefix = prefix;
			editedDJ.suffix = suffix;
		}
		setOutgoingDeclenjugation(editedDJ);
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
	const maybeDelete = () => {
		const handler = () => {
			setOutgoingDeclenjugation(id);
			closeModal();
			toaster({
				message: "Deleted.",
				position: "middle",
				color: "danger",
				duration: 2000,
				doToast,
				undoToast
			});
		};
		if(!disableConfirms) {
			return yesNoAlert({
				header: "Delete Declension/Conjugation",
				message: "Are you sure you want to delete this? It cannot be undone.",
				cssClass: "danger",
				submit: "Yes, Delete",
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
					<IonTitle>Add Unit</IonTitle>
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
				<IonList lines="full" id="addingCustomDeclenjugatorList" className="hasSpecialLabels">
					<IonItem className="labelled">
						<IonLabel className="ion-text-wrap ion-padding-bottom">Title or Description of this Declension or Conjugation:</IonLabel>
					</IonItem>
					<IonItem>
						<IonInput
							aria-label="Title or description of this declension or conjugation:"
							id="editDJTitle"
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
					<IonItemDivider>Modification</IonItemDivider>
					{useAdvancedMethod ?
						<>
							<IonItem className="labelled">
								<IonLabel className="ion-text-wrap ion-padding-bottom">Match Expression:</IonLabel>
							</IonItem>
							<IonItem className="wrappableInnards">
								<IonInput
									id="editDJRegex1"
									aria-label="Match Expression:"
								/>
							</IonItem>
							<IonItem className="labelled">
								<IonLabel className="ion-text-wrap ion-padding-bottom">Replacement Expression:</IonLabel>
							</IonItem>
							<IonItem className="wrappableInnards">
								<IonInput
									id="editDJRegex2"
									aria-label="Replacement Expression:"
								/>
							</IonItem>
						</>
					:
						<>
							<IonItem className="labelled">
								<div slot="start">Prefix</div>
								<div slot="end">Suffix</div>
							</IonItem>
							<IonItem className="wrappableInnards prefixSuffix">
								<IonInput
									id="editDJPrefix"
									aria-label="Prefix"
									className="ion-text-end"
								/>
								<div
									className="ion-text-center stem"
									style={{paddingInline: "1rem"}}
								><strong>{useWholeWord ? "word" : "stem"}</strong></div>
								<IonInput
									id="editDJSuffix"
									aria-label="Suffix"
									className="ion-text-start"
								/>
							</IonItem>
						</>
					}
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
						<IonLabel>Delete</IonLabel>
					</IonButton>
					<IonButton
						color="success"
						slot="end"
						onClick={maybeSaveEditedDeclenjugation}
					>
						<IonIcon icon={saveOutline} slot="end" />
						<IonLabel>Save</IonLabel>
					</IonButton>
				</IonToolbar>
			</IonFooter>
		</IonModal>
	);
};

export default EditDeclenjugation;
