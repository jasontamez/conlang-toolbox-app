import React, { FC, useCallback, useMemo, useState } from 'react';
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
	globeOutline
} from 'ionicons/icons';
import { v4 as uuidv4 } from 'uuid';

import { ExtraCharactersModalOpener, RelationObject, SetState, SortSeparator } from '../../store/types';
import useTranslator from '../../store/translationHooks';

import toaster from '../../components/toaster';
import { $i } from '../../components/DollarSignExports';
import yesNoAlert from '../../components/yesNoAlert';
import useI18Memo from '../../components/useI18Memo';

interface CustomSortModal extends ExtraCharactersModalOpener {
	setSavedRelation: SetState<RelationObject | null>
}

const translations = [
	"Base character", "Characters sorted after the base",
	"Characters sorted before the base", "Comma", "Relation",
	"End with the one just before the Base.", "No separator", "Period",
	"Semicolon", "Space", "Start with the one just after the Base.",
	"The base character", "You must provide a base character.",
	"You must provide some pre or post characters."
];
const commons = [
	"Are you sure you want to discard this?", "Cancel", "Close",
	"Extra Characters", "Ok", "Save", "Unsaved Info", "Yes Discard"
];

const presentations = [ "Base Character", "Pre/Post Separator", "Sorted After the Base", "Sorted Before the Base" ];
const context = { context: "presentation" };

const AddCustomSortRelation: FC<CustomSortModal> = (props) => {
	const [ tc ] = useTranslator('common');
	const [ tYouSure, tCancel, tClose, tExChar, tOk, tSave, tUnsaved, tYesDisc ] = useI18Memo(commons);
	const [
		tBase, tAfterBase, tBeforeBase, tComma, tRelation, tEndBefore, tNoSep,
		tPeriod, tSemi, tSpace, tStartAfter, tTheBase, tNoBase, tNoPrePost
	] = useI18Memo(translations, "settings");
	const [
		tpBase, tpSep, tpAfter, tpBefore
	] = useI18Memo(presentations, "settings", context);
	const [ tAddThing, tThingAdded ] = useMemo(
		() => [ "addThing", "thingAdded" ].map(thing => tc(thing, { thing: tRelation })),
		[tc, tRelation]
	);

	const { isOpen, setIsOpen, openECM, setSavedRelation } = props;
	const [separator, setSeparator] = useState<SortSeparator>("");
	const [doAlert] = useIonAlert();
	const toast = useIonToast();
	const maybeSaveRelation = useCallback(() => {
		const _base = $i<HTMLInputElement>("addBaseRelation");
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
		const _pre = $i<HTMLInputElement>("addPreRelation");
		const _post = $i<HTMLInputElement>("addPostRelation");
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
		const relation: RelationObject = { id: uuidv4(), base, pre, post, separator };
		setSavedRelation(relation);
		_base && (_base.value = "");
		_pre && (_pre.value = "");
		_post && (_post.value = "");
		setIsOpen(false);
		toaster({
			message: tThingAdded,
			position: "top",
			color: "success",
			duration: 2000,
			toast
		});
	}, [doAlert, separator, setIsOpen, setSavedRelation, tNoBase, tNoPrePost, tOk, tThingAdded, toast]);
	const maybeCancel = useCallback(() => {
		const _base = $i<HTMLInputElement>("addBaseRelation");
		const _pre = $i<HTMLInputElement>("addPreRelation");
		const _post = $i<HTMLInputElement>("addPostRelation");
		if(_base && _pre && _post && (_base.value + _pre.value + _post.value)) {
			return yesNoAlert({
				header: tUnsaved,
				message: tYouSure,
				submit: tYesDisc,
				cssClass: "warning",
				handler: () => {
					_base && (_base.value = "");
					_pre && (_pre.value = "");
					_post && (_post.value = "");
					setIsOpen(false);
				},
				doAlert
			});
		}
		_base && (_base.value = "");
		_pre && (_pre.value = "");
		_post && (_post.value = "");
		setIsOpen(false);
	}, [doAlert, setIsOpen, tUnsaved, tYesDisc, tYouSure]);
	const opener = useCallback(() => openECM(true), [openECM]);
	const doSetSeparator = useCallback((e: SelectCustomEvent) => setSeparator(e.detail.value), []);

	return (
		<IonModal isOpen={isOpen} backdropDismiss={false}>
			<IonHeader>
				<IonToolbar color="primary">
					<IonTitle>{tAddThing}</IonTitle>
					<IonButtons slot="end">
						<IonButton onClick={opener} aria-label={tExChar}>
							<IonIcon icon={globeOutline} />
						</IonButton>
						<IonButton onClick={maybeCancel} aria-label={tClose}>
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
							id="addBaseRelation"
							placeholder={tTheBase}
						/>
					</IonItem>
					<IonItem className="labelled" lines="none">
						<IonLabel>{tpBefore}</IonLabel>
					</IonItem>
					<IonItem>
						<IonInput
							aria-label={tBeforeBase}
							id="addPreRelation"
							helperText={tEndBefore}
						/>
					</IonItem>
					<IonItem className="labelled" lines="none">
						<IonLabel>{tpAfter}</IonLabel>
					</IonItem>
					<IonItem>
						<IonInput
							aria-label={tAfterBase}
							id="addPostRelation"
							helperText={tStartAfter}
						/>
					</IonItem>
					<IonItem className="wrappableInnards">
						<IonSelect
							color="primary"
							className="ion-text-wrap settings"
							label={tpSep}
							value={separator}
							onIonChange={doSetSeparator}
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
						color="warning"
						slot="start"
						onClick={maybeCancel}
					>
						<IonIcon icon={saveOutline} slot="end" />
						<IonLabel>{tCancel}</IonLabel>
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

export default AddCustomSortRelation;
