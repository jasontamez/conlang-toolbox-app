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
import { addOutline } from 'ionicons/icons';
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from 'uuid';

import { addTransformWG } from '../../../store/wgSlice';
import { ExtraCharactersModalOpener } from '../../../store/types';

import repairRegexErrors from '../../../components/RepairRegex';
import toaster from '../../../components/toaster';
import useI18Memo from '../../../components/useI18Memo';
import ModalHeader from '../../../components/ModalHeader';
import useElement from '../../../components/useElement';
import getSetValue from '../../../components/getSetValue';


const wgweWords = [
	"DescOfTheTransformation", "noSearchMsg",
	"replacementExpression", "searchExpression",
	"TransformationAdded", "AddTransformation"
];

const presentational = [
	"DescOfTheTransformation",
	"replacementExpression", "searchExpression"
];
const context = { context: "presentation" };

const commons = [
	"AddAndClose", "Cancel", "error", "optional"
];

const AddTransformModal: FC<ExtraCharactersModalOpener> = (props) => {
	const [ tAddClose, tCancel, tError, tOptional ] = useI18Memo(commons);
	const [ tTransDesc, tNoSearch, tRepl, tSrch, tThingAdd, tAddThing ] = useI18Memo(wgweWords, "wgwe");
	const [ tpTrandDesc, tpRepl, tpSrch ] = useI18Memo(presentational, "wgwe", context);

	const { isOpen, setIsOpen, openECM } = props;
	const dispatch = useDispatch();
	const [doAlert] = useIonAlert();
	const toast = useIonToast();
	const [seekLabel, seekLabelRef] = useElement<HTMLIonLabelElement>();
	const [searchEx, searchExRef] = useElement<HTMLIonInputElement>();
	const [replaceEx, replaceExRef] = useElement<HTMLIonInputElement>();
	const [optDesc, optDescRef] = useElement<HTMLIonInputElement>();

	const maybeSaveNewTransform = useCallback((close: boolean = true) => {
		const err: string[] = [];
		// Test info for validness, then save if needed and reset the newTransform
		const seek = getSetValue(searchEx);
		if(seek === "") {
			if(seekLabel) { seekLabel.classList.add("invalidValue"); }
			err.push(tNoSearch);
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
		const replace = repairRegexErrors(getSetValue(replaceEx));
		const description = getSetValue(optDesc);
		if(close) { setIsOpen(false); }
		dispatch(addTransformWG({
			id: uuidv4(),
			seek: repairRegexErrors(seek),
			replace,
			description
		}));
		getSetValue(searchEx, "");
		getSetValue(replaceEx, "");
		getSetValue(optDesc, "");
		toaster({
			message: tThingAdd,
			duration: 2500,
			color: "success",
			position: "top",
			toast
		});
	}, [
		dispatch, doAlert, setIsOpen, toast, tThingAdd,
		tCancel, tError, tNoSearch, searchEx, replaceEx,
		optDesc, seekLabel
	]);
	const maybeSaveAndAdd = useCallback(() => maybeSaveNewTransform(false), [maybeSaveNewTransform]);
	const maybeSaveAndClose = useCallback(() => maybeSaveNewTransform(), [maybeSaveNewTransform]);
	const closer = useCallback(() => setIsOpen(false), [setIsOpen]);

	return (
		<IonModal isOpen={isOpen} onDidDismiss={closer}>
			<ModalHeader title={tAddThing} openECM={openECM} closeModal={setIsOpen} />
			<IonContent>
				<IonList lines="none" className="hasSpecialLabels wgAddTransform">
					<IonItem className="labelled">
						<IonLabel className="seekLabel" ref={seekLabelRef}>{tpSrch}</IonLabel>
					</IonItem>
					<IonItem>
						<IonInput
							aria-label={tSrch}
							id="searchEx"
							ref={searchExRef}
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
							id="replaceEx"
							ref={replaceExRef}
							className="ion-margin-top serifChars"
						></IonInput>
					</IonItem>
					<IonItem className="labelled">
						<IonLabel>{tpTrandDesc}</IonLabel>
					</IonItem>
					<IonItem>
						<IonInput
							aria-label={tTransDesc}
							id="optDesc"
							ref={optDescRef}
							className="ion-margin-top"
							placeholder={tOptional}
						></IonInput>
					</IonItem>
				</IonList>
			</IonContent>
			<IonFooter>
				<IonToolbar>
					<IonButton
						color="tertiary"
						slot="end"
						onClick={maybeSaveAndAdd}
					>
						<IonIcon icon={addOutline} slot="start" />
						<IonLabel>{tAddThing}</IonLabel>
					</IonButton>
					<IonButton
						color="success"
						slot="end"
						onClick={maybeSaveAndClose}
					>
						<IonIcon icon={addOutline} slot="start" />
						<IonLabel>{tAddClose}</IonLabel>
					</IonButton>
				</IonToolbar>
			</IonFooter>
		</IonModal>
	);
};

export default AddTransformModal;
