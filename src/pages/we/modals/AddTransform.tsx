import React, { useCallback, useMemo, useState, FC } from 'react';
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
	IonItemDivider,
	IonRadioGroup,
	IonRadio,
	useIonAlert,
	useIonToast
} from '@ionic/react';
import { addOutline } from 'ionicons/icons';
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from 'uuid';

import { WETransformDirection, ExtraCharactersModalOpener } from '../../../store/types';
import { addTransformWE } from '../../../store/weSlice';
import useTranslator from '../../../store/translationHooks';

import toaster from '../../../components/toaster';
import ModalHeader from '../../../components/ModalHeader';
import useI18Memo from '../../../components/useI18Memo';
import useElement from '../../../components/useElement';
import getSetValue from '../../../components/getSetValue';

const commons = [
	"AddAndClose", "Cancel", "error", "optional"
];
const translations = [
	"DescOfTheTransformation", "noSearchMsg",
	"WhatItChangesTo", "WhatToChange",
	"TransformationAdded", "AddTransformation"
];
const formals = [
	"atInputAtOutput", "atInput",
	"atInputUndoOutput", "atOutput"
];
const presentations = [
	"InputExpression", "OutputExpression"
];
const formal = { context: "formal" };
const context = { context: "presentation" };

const AddTransformModal: FC<ExtraCharactersModalOpener> = (props) => {
	const [ t ] = useTranslator('we');
	const [ tw ] = useTranslator('wgwe');
	const [ tAddClose, tCancel, tError, tOptional ] = useI18Memo(commons);
	const [ tDesc, tNoSeek, tReplace, tSeek, tThingAdd, tAddThing ] = useI18Memo(translations, "wgwe");
	const tpTrDir = useMemo(() => t("TransformationDirection"), [t]);
	const [ tInOut, tIn, tInUnOut, tOut ] = useI18Memo(formals, "we", formal);
	const [ tInEx, tOutEx ] = useI18Memo(presentations, "we");
	const [ tpInEx, tpOutEx ] = useI18Memo(presentations, "we", context);
	const tpDesc = useMemo(() => tw("DescOfTheTransformation", context), [tw]);
	const [seekLabel, seekLabelRef] = useElement<HTMLIonLabelElement>();
	const [searchExWE, searchExWERef] = useElement<HTMLIonInputElement>();
	const [replaceExWE, replaceExWERef] = useElement<HTMLIonInputElement>();
	const [optDescWE, optDescWERef] = useElement<HTMLIonInputElement>();
	const [radioGroup, radioGroupRef] = useElement<HTMLIonRadioGroupElement>();

	const { isOpen, setIsOpen, openECM } = props;
	const dispatch = useDispatch();
	const [doAlert] = useIonAlert();
	const toast = useIonToast();
	const [ direction, setDirection ] = useState<WETransformDirection>("both");

	const maybeSaveNewTransform = useCallback((close: boolean = true) => {
		const err: string[] = [];
		const seek = getSetValue(searchExWE);
		// Test info for validness, then save if needed and reset the newTransform
		if(seek === "") {
			seekLabel && seekLabel.classList.add("invalidValue")
			err.push(tNoSeek);
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
				cssClass: "danger",
				message: err.join("; "),
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
		const replace = getSetValue(replaceExWE);
		const description = getSetValue(optDescWE).trim();
		if(close) { setIsOpen(false); }
		dispatch(addTransformWE({
			id: uuidv4(),
			seek,
			replace,
			direction,
			description
		}));
		getSetValue(searchExWE, "");
		getSetValue(replaceExWE, "");
		getSetValue(optDescWE, "");
		radioGroup && (radioGroup.value = "both");
		toaster({
			message: tThingAdd,
			duration: 2500,
			color: "success",
			position: "top",
			toast
		});
	}, [
		direction, dispatch, doAlert, setIsOpen, tCancel,
		tError, tNoSeek, tThingAdd, toast, seekLabel,
		searchExWE, replaceExWE, optDescWE, radioGroup
	]);
	const saveClose = useCallback(() => maybeSaveNewTransform(), [maybeSaveNewTransform]);
	const saveAdd = useCallback(() => maybeSaveNewTransform(false), [maybeSaveNewTransform]);
	const closer = useCallback(() => setIsOpen(false), [setIsOpen]);
	return (
		<IonModal isOpen={isOpen} onDidDismiss={closer}>
			<ModalHeader title={tAddThing} openECM={openECM} closeModal={setIsOpen} />
			<IonContent>
				<IonList lines="none" className="hasSpecialLabels weAddTransform">
					<IonItem className="labelled">
						<IonLabel className="seekLabel" ref={seekLabelRef}>{tpInEx}</IonLabel>
					</IonItem>
					<IonItem>
						<IonInput
							aria-label={tInEx}
							id="searchExWE"
							ref={searchExWERef}
							className="ion-margin-top serifChars"
							helperText={tSeek}
							onIonChange={() => seekLabel && seekLabel.classList.remove("invalidValue")}
						></IonInput>
					</IonItem>
					<IonItem className="labelled">
						<IonLabel className="replaceLabel">{tpOutEx}</IonLabel>
					</IonItem>
					<IonItem>
						<IonInput
							aria-label={tOutEx}
							id="replaceExWE"
							ref={replaceExWERef}
							className="ion-margin-top serifChars"
							helperText={tReplace}
						></IonInput>
					</IonItem>
					<IonItem className="labelled">
						<IonLabel>{tpDesc}</IonLabel>
					</IonItem>
					<IonItem>
						<IonInput
							aria-label={tDesc}
							id="optDescWE"
							ref={optDescWERef}
							className="ion-margin-top"
							placeholder={tOptional}
						></IonInput>
					</IonItem>
					<IonItemDivider>
						<IonLabel>{tpTrDir}</IonLabel>
					</IonItemDivider>
					<IonRadioGroup
						value={direction}
						onIonChange={e => setDirection(e.detail.value as WETransformDirection)}
						ref={radioGroupRef}
					>
						<IonItem>
							<IonRadio
								value="both"
								labelPlacement="end"
								justify="start"
							>{tInUnOut}</IonRadio>
						</IonItem>
						<IonItem>
							<IonRadio
								value="double"
								labelPlacement="end"
								justify="start"
							>{tInOut}</IonRadio>
						</IonItem>
						<IonItem>
							<IonRadio
								value="in"
								labelPlacement="end"
								justify="start"
							>{tIn}</IonRadio>
						</IonItem>
						<IonItem>
							<IonRadio
								value="out"
								labelPlacement="end"
								justify="start"
							>{tOut}</IonRadio>
						</IonItem>
					</IonRadioGroup>
				</IonList>
			</IonContent>
			<IonFooter>
				<IonToolbar>
					<IonButton
						color="tertiary"
						slot="end"
						onClick={saveAdd}
					>
						<IonIcon icon={addOutline} slot="start" />
						<IonLabel>{tAddThing}</IonLabel>
					</IonButton>
					<IonButton
						color="success"
						slot="end"
						onClick={saveClose}
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
