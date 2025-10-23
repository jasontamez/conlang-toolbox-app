import React, { useCallback, FC } from 'react';
import {
	IonItem,
	IonIcon,
	IonLabel,
	IonList,
	IonContent,
	IonToolbar,
	IonButton,
	IonModal,
	IonInput,
	IonFooter,
	useIonAlert,
	useIonToast
} from '@ionic/react';
import {
	saveOutline,
	trashOutline
} from 'ionicons/icons';
import { useSelector, useDispatch } from "react-redux";

import { ExtraCharactersModalOpener, SetState, StateObject, WGTransformObject } from '../../../store/types';
import { editTransformWG, deleteTransformWG } from '../../../store/wgSlice';
import useTranslator from '../../../store/translationHooks';

import repairRegexErrors from '../../../components/RepairRegex';
import ltr from '../../../components/LTR';
import yesNoAlert from '../../../components/yesNoAlert';
import toaster from '../../../components/toaster';
import useI18Memo from '../../../components/useI18Memo';
import ModalHeader from '../../../components/ModalHeader';
import useElement from '../../../components/useElement';
import getSetValue from '../../../components/getSetValue';

interface ModalProps extends ExtraCharactersModalOpener {
	editing: null | WGTransformObject
	setEditing: SetState<null | WGTransformObject>
}

const commons = [
	"deleteThisCannotUndo", "Cancel", "error", "optional"
];

const translations = [
	"DescOfTheTransformation", "noSearchMsg",
	"replacementExpression", "searchExpression", "DeleteTrans",
	"EditTrans", "SaveTrans", "TransDeleted", "TransSaved"
];

const presentations = [
	"DescOfTheTransformation", "replacementExpression", "searchExpression"
];
const context = { context: "presentation" };

const EditTransformModal: FC<ModalProps> = (props) => {
	const [ tc ] = useTranslator('common');
	const [ tYouSure, tCancel, tError, tOptional ] = useI18Memo(commons);
	const [
		tTransDesc, tNoSrch, tRepl, tSrch, tDelThing, tEditThing,
		tSaveThing, tThingDel, tThingSaved
	] = useI18Memo(translations, 'wgwe');
	const [ tpTransDesc, tpRepl, tpSrch ] = useI18Memo(presentations, 'wgwe', context);

	const { isOpen, setIsOpen, openECM, editing, setEditing } = props;
	const dispatch = useDispatch();
	const [doAlert] = useIonAlert();
	const toast = useIonToast();
	const { disableConfirms } = useSelector((state: StateObject) => state.appSettings)
	const [seekLabel, seekLabelRef] = useElement<HTMLIonLabelElement>();
	const [editSearchExWG, editSearchExWGRef] = useElement<HTMLIonInputElement>();
	const [editReplaceExWG, editReplaceExWGRef] = useElement<HTMLIonInputElement>();
	const [editOptDescWG, editOptDescWGRef] = useElement<HTMLIonInputElement>();

	const onLoad = useCallback(() => {
		if(editing) {
			const { seek, replace, description } = editing;
			getSetValue(editSearchExWG, seek);
			getSetValue(editReplaceExWG, replace);
			getSetValue(editOptDescWG, description);
		} else {
			getSetValue(editSearchExWG, "");
			getSetValue(editReplaceExWG, "");
			getSetValue(editOptDescWG, "");
		}
	}, [editing, editSearchExWG, editReplaceExWG, editOptDescWG]);

	const cancelEditing = useCallback(() => {
		setIsOpen(false);
		setEditing(null);
	}, [setEditing, setIsOpen]);
	const maybeSaveNewTransformInfo = useCallback(() => {
		const err: string[] = [];
		// Test info for validness, then save if needed and reset the editingTransform
		const seek = getSetValue(editSearchExWG);
		if(seek === "") {
			if(seekLabel) { seekLabel.classList.add("invalidValue"); }
			err.push(tNoSrch);
		}
		try {
			new RegExp(seek);
		} catch(e) {
			err.push(`${e}`);
		}
		if(err.length > 0) {
			// Errors found.
			doAlert({
				header: tError,
				message: err.join("; "),
				cssClass: "danger",
				buttons: [
					{
						text: tCancel,
						role: "cancel",
						cssClass: "cancel"
					}
				]
			});
			return;
		}
		// Everything ok!
		const replace = repairRegexErrors(getSetValue(editReplaceExWG));
		const description = getSetValue(editOptDescWG).trim();
		setIsOpen(false);
		dispatch(editTransformWG({
			id: editing!.id,
			seek: repairRegexErrors(seek),
			replace,
			description
		}));
		toaster({
			message: tThingSaved,
			duration: 2500,
			color: "success",
			position: "top",
			toast
		});
	}, [
		editOptDescWG, dispatch, doAlert, editing,
		editReplaceExWG, editSearchExWG, setIsOpen, tThingSaved,
		toast, tCancel, tError, tNoSrch, seekLabel
	]);
	const maybeDeleteTransform = useCallback(() => {
		const handler = () => {
			setIsOpen(false);
			dispatch(deleteTransformWG(editing!.id));
			toaster({
				message: tThingDel,
				duration: 2500,
				color: "danger",
				position: "top",
				toast
			});
		};
		if(disableConfirms) {
			handler();
		} else if (editing) {
			const { seek, replace } = editing;
			yesNoAlert({
				header: `${seek}${ltr() ? "⟶" : "⟵"}${replace}`,
				message: tYouSure,
				cssClass: "danger",
				submit: tc("confirmDel", { count: 1 }),
				handler,
				doAlert
			});
		}
	}, [disableConfirms, dispatch, doAlert, editing, setIsOpen, toast, tc, tYouSure, tThingDel]);

	return (
		<IonModal
			isOpen={isOpen}
			onDidDismiss={cancelEditing}
			onIonModalDidPresent={onLoad}
		>
			<ModalHeader title={tEditThing} openECM={openECM} closeModal={cancelEditing} />
			<IonContent>
				<IonList lines="none" className="hasSpecialLabels">
					<IonItem className="labelled">
						<IonLabel className="seekLabel" ref={seekLabelRef}>{tpSrch}</IonLabel>
					</IonItem>
					<IonItem>
						<IonInput
							aria-label={tSrch}
							id="editSearchExWG"
							ref={editSearchExWGRef}
							className="ion-margin-top serifChars"
							onIonChange={() => seekLabel && seekLabel.classList.remove("invalidValue")}
						></IonInput>
					</IonItem>
					<IonItem className="labelled">
						<IonLabel className="replaceLabel">{tpRepl}</IonLabel>
					</IonItem>
					<IonItem>
						<IonInput
							aria-label={tRepl}
							id="editReplaceExWG"
							ref={editReplaceExWGRef}
							className="ion-margin-top serifChars"
						></IonInput>
					</IonItem>
					<IonItem className="labelled">
						<IonLabel>{tpTransDesc}</IonLabel>
					</IonItem>
					<IonItem>
						<IonInput
							aria-label={tTransDesc}
							id="editOptDescWG"
							ref={editOptDescWGRef}
							className="ion-margin-top"
							placeholder={tOptional}
						></IonInput>
					</IonItem>
				</IonList>
			</IonContent>
			<IonFooter>
				<IonToolbar>
					<IonButton color="tertiary" slot="end" onClick={maybeSaveNewTransformInfo}>
						<IonIcon icon={saveOutline} slot="start" />
						<IonLabel>{tSaveThing}</IonLabel>
					</IonButton>
					<IonButton color="danger" slot="start" onClick={maybeDeleteTransform}>
						<IonIcon icon={trashOutline} slot="start" />
						<IonLabel>{tDelThing}</IonLabel>
					</IonButton>
				</IonToolbar>
			</IonFooter>
		</IonModal>
	);
};

export default EditTransformModal;
