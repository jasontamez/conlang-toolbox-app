import React, { useCallback, useMemo, useState } from 'react';
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
import { $i } from '../../components/DollarSignExports';
import yesNoAlert from '../../components/yesNoAlert';
import useI18Memo from '../../components/useI18Memo';

interface CustomSortModal extends ExtraCharactersModalOpener {
	incomingRelation: RelationObject | null
	setOutgoingRelation: SetState<RelationObject | null | string>
}

/*
', (and )?'

\btc?\b\(.+("|\})\)

*/
const translations = [
	"Base character", "Characters sorted after the base",
	"Characters sorted before the base", "Comma",
	"End with the one just before the Base.", "No separator", "Period",
	"Semicolon", "Space", "Start with the one just after the Base.",
	"The base character", "You must provide a base character.",
	"You must provide some pre or post characters."
];

const commons = [
	"Close", "Delete", "Extra Characters", "Ok", "Save",
	"areYouSure", "confirmDelIt", "emphasizedError"
];

const presentations = [ "Base Character", "Pre/Post Separator", "Sorted After the Base", "Sorted Before the Base" ];
const context = { context: "presentation" };

const EditCustomSortRelation = (props: CustomSortModal) => {
	const [ t ] = useTranslator('settings');
	const [ tc ] = useTranslator('common');
	const [ tClose, tDelete, tExChar, tOk, tSave, tRUSure, tConfDel, tError ] = useI18Memo(commons);
	const [
		tBase, tAfterBase, tBeforeBase, tComma, tEndBefore, tNoSep, tPeriod,
		tSemi, tSpace, tStartAfter, tTheBase, tNoBase, tNoPrePost
	] = useI18Memo(translations, "settings");
	const [ tpBase, tpPrePost, tpAfter, tpBefore ] = useI18Memo(presentations, "settings", context);
	const tDelThing = useMemo(() => tc("deleteThing", { thing: tc("This") }), [tc]);
	const tEditThing = useMemo(() => tc("editThing", { thing: t("Relation") }), [tc, t]);
	const tThingEdited = useMemo(() => tc("thingEdited", { thing: t("Relation") }), [tc, t]);
	
	const { isOpen, setIsOpen, openECM, incomingRelation, setOutgoingRelation } = props;
	const [doAlert] = useIonAlert();
	const toast = useIonToast();
	const [separator, setSeparator] = useState<SortSeparator>("");
	const [_base, setBase] = useState<HTMLInputElement | null>(null);
	const [_pre, setPre] = useState<HTMLInputElement | null>(null);
	const [_post, setPost] = useState<HTMLInputElement | null>(null);
	const onLoad = useCallback(() => {
		const error = tError;
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
	}, [incomingRelation, tError]);
	const close = useCallback(() => {
		_base && (_base.value = "");
		_pre && (_pre.value = "");
		_post && (_post.value = "");
		setIsOpen(false);
	}, [_base, _pre, _post, setIsOpen]);
	const maybeSaveRelation = useCallback(() => {
		const base = (_base && _base.value) || "";
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
		const pre = _pre && _pre.value ? _pre.value.split(separator) : [];
		const post = _post && _post.value ? _post.value.split(separator) : [];
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
	}, [_base, _post, _pre, close, doAlert, incomingRelation, separator, setOutgoingRelation, tNoBase, tNoPrePost, tOk, tThingEdited, toast]);
	const maybeDelete = useCallback(() => {
		const handler = () => {
			setOutgoingRelation(incomingRelation!.id);
			close();
		};
		yesNoAlert({
			header: tDelThing,
			message: tRUSure,
			submit: tConfDel,
			cssClass: "danger",
			handler,
			doAlert
		});
	}, [close, doAlert, incomingRelation, setOutgoingRelation, tConfDel, tDelThing, tRUSure]);
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
