import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
	IonItemDivider,
	IonReorder,
	IonItemOption,
	IonItemOptions,
	IonItemSliding,
	IonToggle,
	IonReorderGroup
} from '@ionic/react';
import {
	closeCircleOutline,
	saveOutline,
	globeOutline,
	addCircleOutline,
	trash,
	reorderThree
} from 'ionicons/icons';
import { v4 as uuidv4 } from 'uuid';

import {
	DJCustomInfo,
	DJGroup,
	DJSeparator,
	Declenjugation,
	ExtraCharactersModalOpener,
	ModalProperties,
	SetState,
	StateObject
} from '../../../store/types';
import { addGroup } from '../../../store/declenjugatorSlice';
import useTranslator from '../../../store/translationHooks';

import { $i } from '../../../components/DollarSignExports';
import toaster from '../../../components/toaster';
import yesNoAlert from '../../../components/yesNoAlert';
import ltr from '../../../components/LTR';

function clearBlanks (input: string[]) {
	return input.filter(line => line);
}

interface AddGroupProps extends ExtraCharactersModalOpener {
	addDeclenjugationModalInfo: ModalProperties
	savedDeclenjugation: Declenjugation | null
	setSavedDeclenjugation: SetState<Declenjugation | null>
	setDeclenjugationType: SetState<string>
	editDeclenjugationModalInfo: ModalProperties
	setIncomingDeclenjugation: SetState<Declenjugation | null>
	outgoingDeclenjugation: Declenjugation | null | string
	setOutgoingDeclenjugation: SetState<Declenjugation | null | string>
}

const AddGroup = (props: AddGroupProps) => {
	const {
		isOpen,
		setIsOpen,
		openECM,

		addDeclenjugationModalInfo,
		savedDeclenjugation,
		setSavedDeclenjugation,
		setDeclenjugationType,

		editDeclenjugationModalInfo,
		setIncomingDeclenjugation,
		outgoingDeclenjugation,
		setOutgoingDeclenjugation
	} = props;
	const [ t ] = useTranslator('dj');
	const [ tc ] = useTranslator('common');
	const dispatch = useDispatch();
	const [doAlert] = useIonAlert();
	const toast = useIonToast();
	const [separator, setSeparator] = useState<DJSeparator>(" ");
	const [declenjugations, setDeclenjugations] = useState<Declenjugation[]>([]);
	const [useAdvancedMethod, setUseAdvancedMethod] = useState<boolean>(false);
	const [type, setType] = useState<keyof DJCustomInfo>("declensions");
	const [typeString, setTypeString] = useState<string>("Declensions");
	const { disableConfirms } = useSelector((state: StateObject) => state.appSettings);

	// Accept new declenjugation from other modal
	useEffect(() => {
		if(isOpen && savedDeclenjugation) {
			if(declenjugations.length === 0) {
				setDeclenjugations([savedDeclenjugation]);
			} else {
				if(declenjugations.slice().pop()!.id === savedDeclenjugation.id) {
					// We already saved this.
					return;
				}
				setDeclenjugations([...declenjugations, savedDeclenjugation]);
			}
			setSavedDeclenjugation(null);
		}
	}, [isOpen, savedDeclenjugation, setSavedDeclenjugation, declenjugations]);
	// Accept edited declenjugation from other modal
	useEffect(() => {
		if(isOpen && outgoingDeclenjugation) {
			if(typeof outgoingDeclenjugation === "string") {
				// a string means the declenjugation was deleted
				setDeclenjugations(
					declenjugations.filter(obj => obj.id !== outgoingDeclenjugation)
				);
			} else {
				setDeclenjugations(
					declenjugations.map(
						obj => (obj.id === outgoingDeclenjugation.id ? outgoingDeclenjugation : obj)
					)
				);
			}
			setOutgoingDeclenjugation(null);
		}
	}, [isOpen, outgoingDeclenjugation, setOutgoingDeclenjugation, declenjugations]);
	// Set typeString
	useEffect(() => {
		const typingString = type.charAt(0).toLocaleUpperCase() + type.slice(1);
		setDeclenjugationType(typingString);
		setTypeString(typingString);
	}, [type, setDeclenjugationType]);

	const onLoad = useCallback(() => {
		setSeparator(" ");
		setDeclenjugations([]);
		const addTitle = $i<HTMLInputElement>("addTitle");
		addTitle && (addTitle.value = "");
		const addAppliesTo = $i<HTMLInputElement>("addAppliesTo");
		addAppliesTo && (addAppliesTo.value = "");
		const addStarts = $i<HTMLInputElement>("addStarts");
		addStarts && (addStarts.value = "");
		const addEnds = $i<HTMLInputElement>("addEnds");
		addEnds && (addEnds.value = "");
		const addRegex1 = $i<HTMLInputElement>("addRegex1");
		addRegex1 && (addRegex1.value = "");
		const addRegex2 = $i<HTMLInputElement>("addRegex2");
		addRegex2 && (addRegex2.value = "");
	}, []);
	const grabInfo = () => {
		const addTitle = $i<HTMLInputElement>("addTitle");
		const title = addTitle ? addTitle.value.trim() : "";
		const addAppliesTo = $i<HTMLInputElement>("addAppliesTo");
		const appliesTo = addAppliesTo ? addAppliesTo.value.trim() : "";
		const addStarts = $i<HTMLInputElement>("addStarts");
		const startsWith: string[] = addStarts && addStarts.value ? clearBlanks(addStarts.value.split(separator)) : [];
		const addEnds = $i<HTMLInputElement>("addEnds");
		const endsWith: string[] = addEnds && addEnds.value ? clearBlanks(addEnds.value.split(separator)) : [];
		const addRegex1 = $i<HTMLInputElement>("addRegex1");
		const regex1: string = (addRegex1 && addRegex1.value) || "";
		const addRegex2 = $i<HTMLInputElement>("addRegex2");
		const regex2: string = (addRegex2 && addRegex2.value) || "";
		return {
			title,
			appliesTo,
			startsWith,
			endsWith,
			regex1,
			regex2
		};
	};
	const maybeSaveNewGroup = () => {
		const {
			title,
			appliesTo,
			startsWith,
			endsWith,
			regex1,
			regex2
		} = grabInfo();
		if(!title) {
			doAlert({
				message: t("You must provide a title or description before saving."),
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
		} else if (useAdvancedMethod) {
			if(!regex1 || !regex2) {
				doAlert({
					message: t("If using regular expressions you must provide both match and replacement expressions."),
					cssClass: "danger",
					buttons: [
						{
							text: tc("Ok"),
							role: "cancel",
							cssClass: "submit"
						}
					]
				});
				return;
			}
			try {
				new RegExp(regex1);
			} catch(e) {
				doAlert({
					header: tc("regexpError", { regex: regex1 }),
					message: `${e}`,
					cssClass: "danger",
					buttons: [
						{
							text: tc("Ok"),
							role: "cancel",
							cssClass: "submit"
						}
					]
				});
				return;
			}
		} else if((startsWith.length + endsWith.length) === 0) {
			doAlert({
				message: t("You must provide at least one condition (start or end) before saving."),
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
		const newGroup: DJGroup = {
			id: uuidv4(),
			title,
			appliesTo,
			startsWith,
			endsWith,
			separator,
			declenjugations
		};
		if(regex1) {
			newGroup.regex = [regex1, regex2];
		}
		dispatch(addGroup({type, group: newGroup}));
		setIsOpen(false);
		toaster({
			message: t("Group saved."),
			position: "middle",
			color: "success",
			duration: 2000,
			toast
		});
	};
	const maybeCancel = () => {
		const {
			title,
			startsWith,
			endsWith,
			regex1,
			regex2
		} = grabInfo();
		if(title || regex1 || regex2 || (startsWith.length + endsWith.length > 0)) {
			return yesNoAlert({
				header: tc("Unsaved Info"),
				message: tc("Are you sure you want to discard your edits?"),
				cssClass: "warning",
				submit: tc("Yes, Discard"),
				handler: () => setIsOpen(false),
				doAlert
			});
		}
		setIsOpen(false);
	};

	const maybeAddNewDeclenjugation = () => {
		setSavedDeclenjugation(null);
		addDeclenjugationModalInfo.setIsOpen(true);
	};
	const editDeclenjugation = (declenjugation: Declenjugation) => {
		const el = $i<HTMLIonListElement>("addingDJGroup");
		el && el.closeSlidingItems();
		setIncomingDeclenjugation(declenjugation);
		editDeclenjugationModalInfo.setIsOpen(true);
	};
	const maybeDeleteDeclenjugation = (id: string) => {
		const el = $i<HTMLIonListElement>("addingDJGroup");
		el && el.closeSlidingItems();
		const handler = () => {
			setDeclenjugations(declenjugations.filter(obj => obj.id !== id));
			toaster({
				message: tc("Deleted."),
				position: "middle",
				color: "danger",
				duration: 2000,
				toast
			});
		};
		disableConfirms ? handler() : yesNoAlert({
			header: tc("Delete This"),
			message: tc("Are you sure?"),
			submit: tc("confirmDelIt"),
			cssClass: "danger",
			handler,
			doAlert
		});
	};
	const doReorder = (event: CustomEvent) => {
		const ed = event.detail;
		// move things around
		const { from, to } = ed;
		const moved = declenjugations[from];
		const remains = declenjugations.slice(0, from).concat(declenjugations.slice(from + 1));
		const final = remains.slice(0, to).concat(moved, remains.slice(to));
		// save result
		setDeclenjugations(final);
		ed.complete();
	};

	return (
		<IonModal isOpen={isOpen} backdropDismiss={false} onIonModalDidPresent={onLoad}>
			<IonHeader>
				<IonToolbar color="primary">
					<IonTitle>{t("Add Group", { type: typeString })}</IonTitle>
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
				<IonList lines="full" id="addingDJGroup" className="hasSpecialLabels hasToggles">
					<IonItem className="labelled">
						<IonLabel className="ion-text-wrap ion-padding-bottom">{t("Title Input", { type: typeString })}</IonLabel>
					</IonItem>
					<IonItem>
						<IonInput
							aria-label={t("Title Input", { type: typeString })}
							id="addTitle"
						/>
					</IonItem>
					<IonItem>
						<IonSelect
							color="primary"
							className="ion-text-wrap settings"
							label={t("Type[colon]")}
							value={type}
							onIonChange={(e) => setType(e.detail.value)}
							interfaceOptions={{header: t("Type")}}
						>
							<IonSelectOption
								className="ion-text-wrap ion-text-align-end"
								value="declensions"
							>{t("Declension_one")}</IonSelectOption>
							<IonSelectOption
								className="ion-text-wrap ion-text-align-end"
								value="conjugations"
							>{t("Conjugation_one")}</IonSelectOption>
							<IonSelectOption
								className="ion-text-wrap ion-text-align-end"
								value="other"
							>{t("Other_one")}</IonSelectOption>
							</IonSelect>
					</IonItem>
					<IonLabel className="ion-text-wrap ion-padding-bottom">
						{t("Type(s) of word this group affects[colon]")}
					</IonLabel>
					<IonItem>
						<IonInput
							aria-label={t("Type(s) of word this group affects[colon]")}
							id="addAppliesTo"
							placeholder={t("exampleAppliesTo")}
						/>
					</IonItem>
					<IonItem className="wrappableInnards">
						<IonToggle
							labelPlacement="start"
							enableOnOffLabels
							checked={useAdvancedMethod}
							onIonChange={e => setUseAdvancedMethod(!useAdvancedMethod)}
						>
							<h2>{t("Use advanced method")}</h2>
							<p>{t("Use regular expressions to identify the stem.")}</p>
						</IonToggle>
					</IonItem>
					<IonItemDivider>{useAdvancedMethod ? tc("Regular Expression") : t("Simple Root Finder")}</IonItemDivider>
					<IonItem className={`labelled toggleable${useAdvancedMethod ? "" : " toggled"}`}>
						<IonLabel className="ion-text-wrap ion-padding-bottom">{t("Matching Expression[colon]")}</IonLabel>
					</IonItem>
					<IonItem lines="none" className={`toggleable${useAdvancedMethod ? "" : " toggled"}`}>
						<IonInput
							aria-label={t("Matching Expression[colon]")}
							id="addRegex1"
							labelPlacement="stacked"
						/>
					</IonItem>
					<IonItem className={`labelled toggleable${useAdvancedMethod ? "" : " toggled"}`}>
						<IonLabel className="ion-text-wrap ion-padding-bottom">{t("Replacement Expression[colon]")}</IonLabel>
					</IonItem>
					<IonItem className={`toggleable${useAdvancedMethod ? "" : " toggled"}`}>
						<IonInput
							aria-label={t("Replacement Expression[colon]")}
							id="addRegex2"
							labelPlacement="stacked"
						/>
					</IonItem>
					<IonItem className={`labelled toggleable${useAdvancedMethod ? " toggled" : ""}`}>
						<IonLabel className="ion-text-wrap ion-padding-bottom">{t("Remove from Start of Word to Find Root[colon]")}</IonLabel>
					</IonItem>
					<IonItem className={`toggleable${useAdvancedMethod ? " toggled" : ""}`}>
						<IonInput
							aria-label={t("Remove from Start of Word to Find Root[colon]")}
							id="addStarts"
						/>
					</IonItem>
					<IonItem className={`labelled toggleable${useAdvancedMethod ? " toggled" : ""}`}>
						<IonLabel className="ion-text-wrap ion-padding-bottom">{t("Remove from End of Word to Find Root:")}</IonLabel>
					</IonItem>
					<IonItem className={`toggleable${useAdvancedMethod ? " toggled" : ""}`}>
						<IonInput
							aria-label={t("Remove from End of Word to Find Root[colon]")}
							id="addEnds"
							labelPlacement="stacked"
						/>
					</IonItem>
					<IonItem className={`labelled toggleable${useAdvancedMethod ? " toggled" : ""}`}>
						<IonLabel className="ion-text-wrap ion-padding-bottom">{t("Separate Multiple Conditions With[colon]")}</IonLabel>
					</IonItem>
					<IonItem className={`wrappableInnards toggleable${useAdvancedMethod ? " toggled" : ""}`}>
						<IonSelect
							color="primary"
							className="ion-text-wrap settings"
							aria-label={t("Choose Separator")}
							value={separator}
							onIonChange={(e) => setSeparator(e.detail.value)}
							interfaceOptions={{header: "Separator"}}
						>
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
								value=";"
							>{t("Semicolon")}</IonSelectOption>
							<IonSelectOption
								className="ion-text-wrap ion-text-align-end"
								value="/"
							>{t("Slash")}</IonSelectOption>
						</IonSelect>
					</IonItem>
					<IonItemDivider color="secondary">{typeString}</IonItemDivider>
					<IonItem>
						<IonButton slot="end" onClick={maybeAddNewDeclenjugation}>
							<IonIcon slot="start" icon={addCircleOutline} />
							{tc("Add New")}
						</IonButton>
					</IonItem>
					<IonReorderGroup
						disabled={false}
						onIonItemReorder={doReorder}
					>
						{declenjugations.map(dj => {
							const {
								title,
								id,
								prefix,
								suffix,
								regex,
								useWholeWord
							} = dj;
							let stem = "";
							if(regex) {
								const arrow = (ltr() ? "⟶" : "⟵");
								const [match, replace] = regex;
								stem = `/${match}/ ${arrow} ${replace}`;
							} else {
								stem = "-";
								prefix && (stem = prefix + stem);
								suffix && (stem = stem + suffix);
							}
							return (
								<IonItemSliding
									className="groupedDeclenjugation"
									key={`add:${id}`}
								>
									<IonItemOptions side="end" className="serifChars">
										<IonItemOption
											color="primary"
											aria-label={tc("Edit")}
											onClick={() => editDeclenjugation(dj)}
										>
											<IonIcon
												slot="icon-only"
												src="svg/edit.svg"
											/>
										</IonItemOption>
										<IonItemOption
											color="danger"
											aria-label={tc("Delete")}
											onClick={() => maybeDeleteDeclenjugation(id)}
										>
											<IonIcon
												slot="icon-only"
												icon={trash}
											/>
										</IonItemOption>
									</IonItemOptions>
									<IonItem className="groupedDeclenjugation">
										<IonReorder className="ion-padding-end"><IonIcon icon={reorderThree} /></IonReorder>
										<div className="title"><strong>{title}</strong></div>
										<div className="stem">
											<em>{stem}</em>
											{
												useWholeWord ?
													<em className="mini">{t("wordMarker")}</em>
												:
													<></>
											}
										</div>
										<div className="icon"><IonIcon size="small" src="svg/slide-indicator.svg" /></div>
									</IonItem>
								</IonItemSliding>
							);
						})}
					</IonReorderGroup>
				</IonList>
			</IonContent>
			<IonFooter className="modalBorderTop">
				<IonToolbar>
					<IonButton
						color="warning"
						slot="start"
						onClick={maybeCancel}
					>
						<IonIcon icon={closeCircleOutline} slot="start" />
						<IonLabel>{tc("Cancel")}</IonLabel>
					</IonButton>
					<IonButton
						color="success"
						slot="end"
						onClick={maybeSaveNewGroup}
					>
						<IonIcon icon={saveOutline} slot="end" />
						<IonLabel>{tc("Save")}</IonLabel>
					</IonButton>
				</IonToolbar>
			</IonFooter>
		</IonModal>
	);
};

export default AddGroup;
