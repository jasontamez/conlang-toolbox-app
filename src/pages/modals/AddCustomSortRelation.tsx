import React, { useState } from 'react';
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
	IonSelect,
	IonSelectOption
} from '@ionic/react';
import {
	closeCircleOutline,
	saveOutline,
	globeOutline
} from 'ionicons/icons';
import { v4 as uuidv4 } from 'uuid';

import { ExtraCharactersModalOpener, RelationObject, SetState, SortSeparator } from '../../store/types';
import useTranslator from '../../store/translationHooks';

import toaster from '../../components/toaster';
import { $i } from '../../components/DollarSignExports';
import yesNoAlert from '../../components/yesNoAlert';

interface CustomSortModal extends ExtraCharactersModalOpener {
	setSavedRelation: SetState<RelationObject | null>
}

const AddCustomSortRelation = (props: CustomSortModal) => {
	const { isOpen, setIsOpen, openECM, setSavedRelation } = props;
	const [separator, setSeparator] = useState<SortSeparator>("");
	const [doAlert] = useIonAlert();
	const toast = useIonToast();
	const [ t ] = useTranslator('settings');
	const [ tc ] = useTranslator('common');
	const close = () => {
		const _base = $i<HTMLInputElement>("addBaseRelation");
		const _pre = $i<HTMLInputElement>("addPreRelation");
		const _post = $i<HTMLInputElement>("addPostRelation");
		_base && (_base.value = "");
		_pre && (_pre.value = "");
		_post && (_post.value = "");
		setIsOpen(false);
	};
	const maybeSaveRelation = () => {
		const _base = $i<HTMLInputElement>("addBaseRelation");
		const base = (_base && _base.value) || "";
		if(!base) {
			doAlert({
				message: t("You must provide a base character."),
				cssClass: "danger",
				buttons: [
					{
						text: tc("Ok"),
						role: "cancel",
						cssClass: "submit"
					}
				]
			})
			return;
		}
		const _pre = $i<HTMLInputElement>("addPreRelation");
		const _post = $i<HTMLInputElement>("addPostRelation");
		const pre = _pre && _pre.value ? _pre.value.split(separator) : [];
		const post = _post && _post.value ? _post.value.split(separator) : [];
		if(!(pre.length + post.length)) {
			doAlert({
				message: t("You must provide some pre or post characters."),
				cssClass: "danger",
				buttons: [
					{
						text: tc("Ok"),
						role: "cancel",
						cssClass: "submit"
					}
				]
			})
			return;
		}
		const relation: RelationObject = { id: uuidv4(), base, pre, post, separator };
		setSavedRelation(relation);
		close();
		toaster({
			message: t("Relation added."),
			position: "top",
			color: "success",
			duration: 2000,
			toast
		});
	};
	const maybeCancel = () => {
		const _base = $i<HTMLInputElement>("addBaseRelation");
		const _pre = $i<HTMLInputElement>("addPreRelation");
		const _post = $i<HTMLInputElement>("addPostRelation");
		if(_base && _pre && _post && (_base.value + _pre.value + _post.value)) {
			return yesNoAlert({
				header: tc("Unsaved Info"),
				message: tc("Are you sure you want to discard this?"),
				submit: tc("Yes, Discard"),
				cssClass: "warning",
				handler: close,
				doAlert
			});
		}
		close();
	};
	return (
		<IonModal isOpen={isOpen} backdropDismiss={false}>
			<IonHeader>
				<IonToolbar color="primary">
					<IonTitle>{t("Add Relation")}</IonTitle>
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
				<IonList lines="full" className="hasSpecialLabels">
					<IonItem>
						<div
							slot="start"
							className="ion-margin-end"
						>{t("Base Character[colon]")}</div>
						<IonInput
							aria-label={t("Base character")}
							id="addBaseRelation"
							placeholder={t("The base character")}
						/>
					</IonItem>
					<IonItem className="labelled" lines="none">
						<IonLabel>{t("Sorted Before the Base[colon]")}</IonLabel>
					</IonItem>
					<IonItem>
						<IonInput
							aria-label={t("Characters sorted before the base")}
							id="addPreRelation"
							helperText={t("End with the one just before the Base.")}
						/>
					</IonItem>
					<IonItem className="labelled" lines="none">
						<IonLabel>{t("Sorted After the Base[colon]")}</IonLabel>
					</IonItem>
					<IonItem>
						<IonInput
							aria-label={t("Characters sorted after the base")}
							id="addPostRelation"
							helperText={t("Start with the one just after the Base.")}
						/>
					</IonItem>
					<IonItem className="wrappableInnards">
						<IonSelect
							color="primary"
							className="ion-text-wrap settings"
							label={t("Pre/Post Separator[colon]")}
							value={separator}
							onIonChange={(e) => setSeparator(e.detail.value)}
						>
							<IonSelectOption
								className="ion-text-wrap ion-text-align-end"
								value=""
							>{t("No separator")}</IonSelectOption>
							<IonSelectOption
								className="ion-text-wrap ion-text-align-end"
								value=" "
							>{t("Space")}</IonSelectOption>
							<IonSelectOption
								className="ion-text-wrap ion-text-align-end"
								value=","
							>{t("Comma")}</IonSelectOption>
							<IonSelectOption
								className="ion-text-wrap ion-text-align-end"
								value="."
							>{t("Period")}</IonSelectOption>
							<IonSelectOption
								className="ion-text-wrap ion-text-align-end"
								value=";"
							>{t("Semicolon")}</IonSelectOption>
						</IonSelect>
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
						<IonIcon icon={saveOutline} slot="end" />
						<IonLabel>{tc("Cancel")}</IonLabel>
					</IonButton>
					<IonButton
						color="success"
						slot="end"
						onClick={maybeSaveRelation}
					>
						<IonIcon icon={saveOutline} slot="end" />
						<IonLabel>{tc("Save")}</IonLabel>
					</IonButton>
				</IonToolbar>
			</IonFooter>
		</IonModal>
	);
};

export default AddCustomSortRelation;
