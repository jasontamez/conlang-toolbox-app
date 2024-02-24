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

import { ExtraCharactersModalOpener, RelationObject, SetState, SortSeparator } from '../../store/types';
import useTranslator from '../../store/translationHooks';

import toaster from '../../components/toaster';
import { $i } from '../../components/DollarSignExports';
import yesNoAlert from '../../components/yesNoAlert';

interface CustomSortModal extends ExtraCharactersModalOpener {
	incomingRelation: RelationObject | null
	setOutgoingRelation: SetState<RelationObject | null | string>
}

const EditCustomSortRelation = (props: CustomSortModal) => {
	const { isOpen, setIsOpen, openECM, incomingRelation, setOutgoingRelation } = props;
	const [doAlert] = useIonAlert();
	const toast = useIonToast();
	const [ t ] = useTranslator('settings');
	const [ tc ] = useTranslator('common');
	const [separator, setSeparator] = useState<SortSeparator>("");
	const [_base, setBase] = useState<HTMLInputElement | null>(null);
	const [_pre, setPre] = useState<HTMLInputElement | null>(null);
	const [_post, setPost] = useState<HTMLInputElement | null>(null);
	const onLoad = () => {
		const error = tc("errorEmphasized");
		const {
			separator = ",",
			base = error,
			pre = [error],
			post = [error]
		} = incomingRelation || {};
		setSeparator(separator);
		const _base = $i<HTMLInputElement>("editBaseRelation");
		const _pre = $i<HTMLInputElement>("editPreRelation");
		const _post = $i<HTMLInputElement>("editPostRelation");
		setBase(_base);
		setPre(_pre);
		setPost(_post);
		_base && (_base.value = base);
		_pre && (_pre.value = pre.join(separator));
		_post && (_post.value = post.join(separator));
	};
	const close = () => {
		_base && (_base.value = "");
		_pre && (_pre.value = "");
		_post && (_post.value = "");
		setIsOpen(false);
	};
	const maybeSaveRelation = () => {
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
		const relation: RelationObject = { id: incomingRelation!.id, base, pre, post, separator };
		setOutgoingRelation(relation);
		close();
		toaster({
			message: tc("thingEdited", { thing: t("Relation") }),
			position: "top",
			color: "success",
			duration: 2000,
			toast
		});
	};
	const maybeDelete = () => {
		const handler = () => {
			setOutgoingRelation(incomingRelation!.id);
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
					<IonTitle>{tc("editThing", { thing: t("Relation") })}</IonTitle>
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
							id="editBaseRelation"
							placeholder={t("The base character")}
						/>
					</IonItem>
					<IonItem className="labelled" lines="none">
						<IonLabel>{t("Sorted Before the Base[colon]")}</IonLabel>
					</IonItem>
					<IonItem>
						<IonInput
							aria-label={t("Characters sorted before the base")}
							id="editPreRelation"
							helperText={t("End with the one just before the Base.")}
						/>
					</IonItem>
					<IonItem className="labelled" lines="none">
					<IonLabel>{t("Sorted After the Base[colon]")}</IonLabel>
					</IonItem>
					<IonItem>
						<IonInput
							aria-label={t("Characters sorted after the base")}
							id="editPostRelation"
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

export default EditCustomSortRelation;
