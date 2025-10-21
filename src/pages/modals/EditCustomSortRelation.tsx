import React, { FC, useCallback, useState } from 'react';
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
	IonSelectOption,
	SelectCustomEvent
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
import yesNoAlert from '../../components/yesNoAlert';
import useI18Memo from '../../components/useI18Memo';
import useElement from '../../components/useElement';
import getSetValue from '../../components/getSetValue';

interface CustomSortModal extends ExtraCharactersModalOpener {
	incomingRelation: RelationObject | null
	setOutgoingRelation: SetState<RelationObject | null | string>
}


const translations = [
	"Basecharacter", "CharsPostBase",
	"CharsPreBase", "Comma",
	"charsPreBaseMsg", "NoSeparator", "Period",
	"Semicolon", "Space", "charsPostBaseMsg",
	"TheBaseCharacter", "noBaseCharMsg",
	"noPostPreCharMsg",
	"BaseChar", "PrePostSeparator", "SortedAfterBase",
	"SortedBeforeBase", "DeleteRelation",
	"RelationEdited", "EditRelation"
];

const commons = [
	"Close", "Delete", "ExtraChars", "Ok", "Save",
	"areYouSure", "emphasizedError"
];

const EditCustomSortRelation: FC<CustomSortModal> = (props) => {
	const [ tc ] = useTranslator('common');
	const [ tClose, tDelete, tExChar, tOk, tSave, tRUSure, tError ] = useI18Memo(commons);
	const [
		tBase, tAfterBase, tBeforeBase, tComma, tEndBefore, tNoSep, tPeriod,
		tSemi, tSpace, tStartAfter, tTheBase, tNoBase, tNoPrePost, tpBase,
		tpPrePost, tpAfter, tpBefore, tDelThing, tThingEdited, tEditThing
	] = useI18Memo(translations, "settings");

	const { isOpen, setIsOpen, openECM, incomingRelation, setOutgoingRelation } = props;
	const [doAlert] = useIonAlert();
	const toast = useIonToast();
	const [separator, setSeparator] = useState<SortSeparator>("");
	const [editBaseRelation, editBaseRelationRef] = useElement<HTMLIonInputElement>();
	const [editPreRelation, editPreRelationRef] = useElement<HTMLIonInputElement>();
	const [editPostRelation, editPostRelationRef] = useElement<HTMLIonInputElement>();
	const onLoad = useCallback(() => {
		const error = tError;
		const {
			separator = ",",
			base = error,
			pre = [error],
			post = [error]
		} = incomingRelation || {};
		setSeparator(separator);
		getSetValue(editBaseRelation, base);
		getSetValue(editPreRelation, pre.join(separator));
		getSetValue(editPostRelation, post.join(separator));
	}, [incomingRelation, tError, editBaseRelation, editPreRelation, editPostRelation]);
	const close = useCallback(() => {
		getSetValue(editBaseRelation, "");
		getSetValue(editPreRelation, "");
		getSetValue(editPostRelation, "");
		setIsOpen(false);
	}, [editBaseRelation, editPreRelation, editPostRelation, setIsOpen]);
	const maybeSaveRelation = useCallback(() => {
		const base = getSetValue(editBaseRelation);
		if(!base) {
			doAlert({
				message: tNoBase,
				cssClass: "danger",
				buttons: [
					{
						text: tOk,
						role: "cancel",
						cssClass: "submit"
					}
				]
			})
			return;
		}
		const pre = getSetValue(editPreRelation).split(separator);
		const post = getSetValue(editPostRelation).split(separator);
		if(!(pre.length + post.length)) {
			doAlert({
				message: tNoPrePost,
				cssClass: "danger",
				buttons: [
					{
						text: tOk,
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
			message: tThingEdited,
			position: "top",
			color: "success",
			duration: 2000,
			toast
		});
	}, [
		editBaseRelation, editPostRelation, editPreRelation,
		close, doAlert, incomingRelation, separator,
		setOutgoingRelation, tNoBase, tNoPrePost, tOk,
		tThingEdited, toast
	]);
	const maybeDelete = useCallback(() => {
		const handler = () => {
			setOutgoingRelation(incomingRelation!.id);
			close();
		};
		yesNoAlert({
			header: tDelThing,
			message: tRUSure,
			submit: tc("confirmDel", { count: 1 }),
			cssClass: "danger",
			handler,
			doAlert
		});
	}, [close, doAlert, incomingRelation, setOutgoingRelation, tc, tDelThing, tRUSure]);
	const openEx = useCallback(() => openECM(true), [openECM]);
	const doSetSep = useCallback((e: SelectCustomEvent) => setSeparator(e.detail.value), []);
	return (
		<IonModal isOpen={isOpen} backdropDismiss={false} onIonModalDidPresent={onLoad}>
			<IonHeader>
				<IonToolbar color="primary">
					<IonTitle>{tEditThing}</IonTitle>
					<IonButtons slot="end">
						<IonButton onClick={openEx} aria-label={tExChar}>
							<IonIcon icon={globeOutline} />
						</IonButton>
						<IonButton onClick={close} aria-label={tClose}>
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
						>{tpBase}</div>
						<IonInput
							aria-label={tBase}
							id="editBaseRelation"
							placeholder={tTheBase}
							ref={editBaseRelationRef}
						/>
					</IonItem>
					<IonItem className="labelled" lines="none">
						<IonLabel>{tpBefore}</IonLabel>
					</IonItem>
					<IonItem>
						<IonInput
							aria-label={tBeforeBase}
							id="editPreRelation"
							helperText={tEndBefore}
							ref={editPreRelationRef}
						/>
					</IonItem>
					<IonItem className="labelled" lines="none">
					<IonLabel>{tpAfter}</IonLabel>
					</IonItem>
					<IonItem>
						<IonInput
							aria-label={tAfterBase}
							id="editPostRelation"
							helperText={tStartAfter}
							ref={editPostRelationRef}
						/>
					</IonItem>
					<IonItem className="wrappableInnards">
						<IonSelect
							color="primary"
							className="ion-text-wrap settings"
							label={tpPrePost}
							value={separator}
							onIonChange={doSetSep}
						>
							<IonSelectOption
								className="ion-text-wrap ion-text-align-end"
								value=""
							>{tNoSep}</IonSelectOption>
							<IonSelectOption
								className="ion-text-wrap ion-text-align-end"
								value=" "
							>{tSpace}</IonSelectOption>
							<IonSelectOption
								className="ion-text-wrap ion-text-align-end"
								value=","
							>{tComma}</IonSelectOption>
							<IonSelectOption
								className="ion-text-wrap ion-text-align-end"
								value="."
							>{tPeriod}</IonSelectOption>
							<IonSelectOption
								className="ion-text-wrap ion-text-align-end"
								value=";"
							>{tSemi}</IonSelectOption>
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
						<IonLabel>{tDelete}</IonLabel>
					</IonButton>
					<IonButton
						color="success"
						slot="end"
						onClick={maybeSaveRelation}
					>
						<IonIcon icon={saveOutline} slot="end" />
						<IonLabel>{tSave}</IonLabel>
					</IonButton>
				</IonToolbar>
			</IonFooter>
		</IonModal>
	);
};

export default EditCustomSortRelation;
