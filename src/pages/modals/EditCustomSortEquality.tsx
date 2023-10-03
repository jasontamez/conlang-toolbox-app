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
	globeOutline,
	trashOutline
} from 'ionicons/icons';

import { ExtraCharactersModalOpener, EqualityObject, SortSeparator } from '../../store/types';

import toaster from '../../components/toaster';
import { $i } from '../../components/DollarSignExports';
import yesNoAlert from '../../components/yesNoAlert';

interface CustomSortModal extends ExtraCharactersModalOpener {
	incomingEquality: EqualityObject | null
	setOutgoingEquality: Function
}

const EditCustomSortEquality = (props: CustomSortModal) => {
	const { isOpen, setIsOpen, openECM, incomingEquality, setOutgoingEquality } = props;
	const [doAlert] = useIonAlert();
	const [doToast, undoToast] = useIonToast();
	const [separator, setSeparator] = useState<SortSeparator>("");
	const [_base, setBase] = useState<HTMLInputElement | null>(null);
	const [_equals, setEquals] = useState<HTMLInputElement | null>(null);
	const onLoad = () => {
		const {
			separator = ",",
			base = "ERROR",
			equals = ["ERROR"]
		} = incomingEquality || {};
		setSeparator(separator);
		const _base = $i("editBaseEquality");
		const _equals = $i("editEqualsEquality");
		setBase(_base);
		setEquals(_equals);
		_base.value = base;
		_equals.value = equals.join(separator);
	};
	const close = () => {
		_base && (_base.value = "");
		_equals && (_equals.value = "");
		setIsOpen(false);
	};
	const maybeSaveEquality = () => {
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
		const equals = _equals && _equals.value ? _equals.value.split(separator) : [];
		if(equals.length === 0) {
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
		const equality: EqualityObject = { id: incomingEquality!.id, base, equals, separator };
		setOutgoingEquality(equality);
		close();
		toaster({
			message: "Equality edited.",
			position: "top",
			color: "success",
			duration: 2000,
			doToast,
			undoToast
		});
	};
	const maybeDelete = () => {
		const handler = () => {
			setOutgoingEquality(incomingEquality!.id);
			close();
		};
		yesNoAlert({
			header: "Delete This",
			message: "Are you sure?",
			submit: "Yes, Delete It",
			cssClass: "danger",
			handler,
			doAlert
		});
	};
	return (
		<IonModal isOpen={isOpen} backdropDismiss={false} onIonModalDidPresent={onLoad}>
			<IonHeader>
				<IonToolbar color="primary">
					<IonTitle>Add Equality</IonTitle>
					<IonButtons slot="end">
						<IonButton onClick={() => openECM(true)}>
							<IonIcon icon={globeOutline} />
						</IonButton>
						<IonButton onClick={close}>
							<IonIcon icon={closeCircleOutline} />
						</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<IonList lines="full" className="hasSpecialLabels">
					<IonItem>
						<div slot="start" className="ion-margin-end">Base Character:</div>
						<IonInput aria-label="Base character" id="editBaseEquality" placeholder="The base character" />
					</IonItem>
					<IonItem className="labelled" lines="none"><IonLabel>Equal to the Base:</IonLabel></IonItem>
					<IonItem>
						<IonInput
							aria-label="Characters sorted before the base"
							id="editEqualsEquality"
							placeholder="End with the one just before the Base."
						/>
					</IonItem>
					<IonItem className="wrappableInnards">
						<IonSelect color="primary" className="ion-text-wrap settings" label="Equalities Separator:" value={separator} onIonChange={(e) => setSeparator(e.detail.value)}>
							<IonSelectOption className="ion-text-wrap ion-text-align-end" value="">[abcde]: No separator</IonSelectOption>
							<IonSelectOption className="ion-text-wrap ion-text-align-end" value=" ">[a b c d e]: Space</IonSelectOption>
							<IonSelectOption className="ion-text-wrap ion-text-align-end" value=",">[a,b,c,d,e]: Comma</IonSelectOption>
							<IonSelectOption className="ion-text-wrap ion-text-align-end" value=".">[a.b.c.d.e]: Period</IonSelectOption>
							<IonSelectOption className="ion-text-wrap ion-text-align-end" value=";">[a;b;c;d;e]: Semicolon</IonSelectOption>
						</IonSelect>
					</IonItem>
				</IonList>
			</IonContent>
			<IonFooter style={{borderTop: "2px solid #00000033"}}>
				<IonToolbar>
					<IonButton color="danger" slot="start" onClick={maybeDelete}>
						<IonIcon icon={trashOutline} slot="end" />
						<IonLabel>Delete</IonLabel>
					</IonButton>
					<IonButton color="success" slot="end" onClick={maybeSaveEquality}>
						<IonIcon icon={saveOutline} slot="end" />
						<IonLabel>Save</IonLabel>
					</IonButton>
				</IonToolbar>
			</IonFooter>
		</IonModal>
	);
};

export default EditCustomSortEquality;
