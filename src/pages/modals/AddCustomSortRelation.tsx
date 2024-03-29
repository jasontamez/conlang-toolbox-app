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
				message: `You must provide a "base" character.`,
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
		const _pre = $i<HTMLInputElement>("addPreRelation");
		const _post = $i<HTMLInputElement>("addPostRelation");
		const pre = _pre && _pre.value ? _pre.value.split(separator) : [];
		const post = _post && _post.value ? _post.value.split(separator) : [];
		if(!(pre.length + post.length)) {
			doAlert({
				message: `You must provide some "pre" or "post" characters.`,
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
		const relation: RelationObject = { id: uuidv4(), base, pre, post, separator };
		setSavedRelation(relation);
		close();
		toaster({
			message: "Relation added.",
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
				header: "Unsaved Info",
				message: "Are you sure you want to discard this?",
				submit: "Yes, Close",
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
					<IonTitle>Add Relation</IonTitle>
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
						>Base Character:</div>
						<IonInput
							aria-label="Base character"
							id="addBaseRelation"
							placeholder="The base character"
						/>
					</IonItem>
					<IonItem className="labelled" lines="none">
						<IonLabel>Sorted Before the Base:</IonLabel>
					</IonItem>
					<IonItem>
						<IonInput
							aria-label="Characters sorted before the base"
							id="addPreRelation"
							placeholder="End with the one just before the Base."
						/>
					</IonItem>
					<IonItem className="labelled" lines="none">
						<IonLabel>Sorted After the Base:</IonLabel>
					</IonItem>
					<IonItem>
						<IonInput
							aria-label="Characters sorted after the base"
							id="addPostRelation"
							placeholder="Start with the one just after the Base."
						/>
					</IonItem>
					<IonItem className="wrappableInnards">
						<IonSelect
							color="primary"
							className="ion-text-wrap settings"
							label="Pre/Post Separator:"
							value={separator}
							onIonChange={(e) => setSeparator(e.detail.value)}
						>
							<IonSelectOption
								className="ion-text-wrap ion-text-align-end"
								value=""
							>[abcde]: No separator</IonSelectOption>
							<IonSelectOption
								className="ion-text-wrap ion-text-align-end"
								value=" "
							>[a b c d e]: Space</IonSelectOption>
							<IonSelectOption
								className="ion-text-wrap ion-text-align-end"
								value=","
							>[a,b,c,d,e]: Comma</IonSelectOption>
							<IonSelectOption
								className="ion-text-wrap ion-text-align-end"
								value="."
							>[a.b.c.d.e]: Period</IonSelectOption>
							<IonSelectOption
								className="ion-text-wrap ion-text-align-end"
								value=";"
							>[a;b;c;d;e]: Semicolon</IonSelectOption>
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
						<IonLabel>Cancel</IonLabel>
					</IonButton>
					<IonButton
						color="success"
						slot="end"
						onClick={maybeSaveRelation}
					>
						<IonIcon icon={saveOutline} slot="end" />
						<IonLabel>Save</IonLabel>
					</IonButton>
				</IonToolbar>
			</IonFooter>
		</IonModal>
	);
};

export default AddCustomSortRelation;
