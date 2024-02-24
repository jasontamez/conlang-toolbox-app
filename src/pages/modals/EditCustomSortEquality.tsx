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

import { ExtraCharactersModalOpener, EqualityObject, SortSeparator, SetState } from '../../store/types';
import useTranslator from '../../store/translationHooks';

import toaster from '../../components/toaster';
import { $i } from '../../components/DollarSignExports';
import yesNoAlert from '../../components/yesNoAlert';

interface CustomSortModal extends ExtraCharactersModalOpener {
	incomingEquality: EqualityObject | null
	setOutgoingEquality: SetState<EqualityObject | null | string>
}

const EditCustomSortEquality = (props: CustomSortModal) => {
	const { isOpen, setIsOpen, openECM, incomingEquality, setOutgoingEquality } = props;
	const [doAlert] = useIonAlert();
	const toast = useIonToast();
	const [ t ] = useTranslator('settings');
	const [ tc ] = useTranslator('common');
	const [separator, setSeparator] = useState<SortSeparator>("");
	const [_base, setBase] = useState<HTMLInputElement | null>(null);
	const [_equals, setEquals] = useState<HTMLInputElement | null>(null);
	const onLoad = () => {
		const error = tc("errorEmphasized");
		const {
			separator = ",",
			base = error,
			equals = [error]
		} = incomingEquality || {};
		setSeparator(separator);
		const _base = $i<HTMLInputElement>("editBaseEquality");
		const _equals = $i<HTMLInputElement>("editEqualsEquality");
		setBase(_base);
		setEquals(_equals);
		_base && (_base.value = base);
		_equals && (_equals.value = equals.join(separator));
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
		const equals = _equals && _equals.value ? _equals.value.split(separator) : [];
		if(equals.length === 0) {
			doAlert({
				message: t("You must provide some equal characters."),
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
		const equality: EqualityObject = { id: incomingEquality!.id, base, equals, separator };
		setOutgoingEquality(equality);
		close();
		toaster({
			message: tc("thingEdited", { thing: t("Equality") }),
			position: "top",
			color: "success",
			duration: 2000,
			toast
		});
	};
	const maybeDelete = () => {
		const handler = () => {
			setOutgoingEquality(incomingEquality!.id);
			close();
		};
		yesNoAlert({
			header: tc("deleteThing", { thing: tc("This") }),
			message: tc("areYouSure"),
			submit: tc("confirmDelIt"),
			cssClass: "danger",
			handler,
			doAlert
		});
	};
	return (
		<IonModal isOpen={isOpen} backdropDismiss={false} onIonModalDidPresent={onLoad}>
			<IonHeader>
				<IonToolbar color="primary">
					<IonTitle>{tc("editThing", { thing: t("Equality") })}</IonTitle>
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
						<div
							slot="start"
							className="ion-margin-end"
						>{t("Base Character[colon]")}</div>
						<IonInput
							aria-label={t("Base character")}
							id="editBaseEquality"
							placeholder={t("The base character")}
						/>
					</IonItem>
					<IonItem
						className="labelled"
						lines="none"
					>
						<IonLabel>{t("Equal to the Base[colon]")}</IonLabel>
					</IonItem>
					<IonItem>
						<IonInput
							aria-label={t("Characters equal to the base")}
							id="editEqualsEquality"
							placeholder={t("Characters to be equal to the Base.")}
						/>
					</IonItem>
					<IonItem className="wrappableInnards">
						<IonSelect
							color="primary"
							className="ion-text-wrap settings"
							label={t("Equalities Separator[colon]")}
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
						color="danger"
						slot="start"
						onClick={maybeDelete}
					>
						<IonIcon icon={trashOutline} slot="end" />
						<IonLabel>{tc("Delete")}</IonLabel>
					</IonButton>
					<IonButton
						color="success"
						slot="end"
						onClick={maybeSaveEquality}
					>
						<IonIcon icon={saveOutline} slot="end" />
						<IonLabel>{tc("Save")}</IonLabel>
					</IonButton>
				</IonToolbar>
			</IonFooter>
		</IonModal>
	);
};

export default EditCustomSortEquality;
