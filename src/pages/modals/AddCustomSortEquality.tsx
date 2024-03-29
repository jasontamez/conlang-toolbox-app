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

import { EqualityObject, ExtraCharactersModalOpener, SetState, SortSeparator } from '../../store/types';

import toaster from '../../components/toaster';
import { $i } from '../../components/DollarSignExports';
import yesNoAlert from '../../components/yesNoAlert';

interface CustomSortModal extends ExtraCharactersModalOpener {
	setSavedEquality: SetState<EqualityObject | null>
}

const AddCustomSortEquality = (props: CustomSortModal) => {
	const { isOpen, setIsOpen, openECM, setSavedEquality } = props;
	const [separator, setSeparator] = useState<SortSeparator>("");
	const [doAlert] = useIonAlert();
	const toast = useIonToast();
	const close = () => {
		const _base = $i<HTMLInputElement>("addBaseEquality");
		const _equals = $i<HTMLInputElement>("addEquality");
		_base && (_base.value = "");
		_equals && (_equals.value = "");
		setIsOpen(false);
	};
	const maybeSaveEquality = () => {
		const _base = $i<HTMLInputElement>("addBaseEquality");
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
		const _equals = $i<HTMLInputElement>("addEquality");
		const equals = _equals && _equals.value ? _equals.value.split(separator) : [];
		if(!equals.length) {
			doAlert({
				message: `You must provide some "equal" characters.`,
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
		const equality: EqualityObject = { id: uuidv4(), base, equals, separator };
		setSavedEquality(equality);
		close();
		toaster({
			message: "Equality added.",
			position: "top",
			color: "success",
			duration: 2000,
			toast
		});
	};
	const maybeCancel = () => {
		const _base = $i<HTMLInputElement>("addBaseEquality");
		const _equals = $i<HTMLInputElement>("addEquality");
		if(_base && _equals && (_base.value + _equals.value)) {
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
					<IonTitle>Add Equality</IonTitle>
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
							id="addBaseEquality"
							placeholder="The base character"
						/>
					</IonItem>
					<IonItem className="labelled" lines="none">
						<IonLabel>Equal to the Base:</IonLabel>
					</IonItem>
					<IonItem>
						<IonInput
							aria-label="Characters equal to the base"
							id="addEquality"
							placeholder="Characters to be equal to the Base."
						/>
					</IonItem>
					<IonItem className="wrappableInnards">
						<IonSelect
							color="primary"
							className="ion-text-wrap settings"
							label="Characters Separator:"
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
						onClick={maybeSaveEquality}
					>
						<IonIcon icon={saveOutline} slot="end" />
						<IonLabel>Save</IonLabel>
					</IonButton>
				</IonToolbar>
			</IonFooter>
		</IonModal>
	);
};

export default AddCustomSortEquality;