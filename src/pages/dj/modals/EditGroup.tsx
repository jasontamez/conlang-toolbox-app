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
	reorderThree,
	trashOutline
} from 'ionicons/icons';

import {
	DJCustomInfo,
	DJGroup,
	DJSeparator,
	Declenjugation,
	ExtraCharactersModalOpener,
	ModalProperties,
	StateObject
} from '../../../store/types';
import { addGroup, deleteGroup, editGroup } from '../../../store/declenjugatorSlice';

import { $i } from '../../../components/DollarSignExports';
import toaster from '../../../components/toaster';
import yesNoAlert from '../../../components/yesNoAlert';
import ltr from '../../../components/LTR';

function clearBlanks (input: string[]) {
	return input.filter(line => line);
}

interface EditGroupProps extends ExtraCharactersModalOpener {
	editingGroupInfo: [keyof DJCustomInfo, DJGroup] | null

	addDeclenjugationModalInfo: ModalProperties
	savedDeclenjugation: Declenjugation | null
	setSavedDeclenjugation: Function
	setDeclenjugationType: Function

	editDeclenjugationModalInfo: ModalProperties
	setIncomingDeclenjugation: Function
	outgoingDeclenjugation: Declenjugation | null | string
	setOutgoingDeclenjugation: Function
}

const EditGroup = (props: EditGroupProps) => {
	const {
		isOpen,
		setIsOpen,
		openECM,

		editingGroupInfo,

		addDeclenjugationModalInfo,
		savedDeclenjugation,
		setSavedDeclenjugation,
		setDeclenjugationType,

		editDeclenjugationModalInfo,
		setIncomingDeclenjugation,
		outgoingDeclenjugation,
		setOutgoingDeclenjugation
	} = props;
	const dispatch = useDispatch();
	const [doAlert] = useIonAlert();
	const toast = useIonToast();
	const [id, setId] = useState<string>("");
	const [separator, setSeparator] = useState<DJSeparator>(" ");
	const [declenjugations, setDeclenjugations] = useState<Declenjugation[]>([]);
	const [useAdvancedMethod, setUseAdvancedMethod] = useState<boolean>(false);
	const [type, setType] = useState<keyof DJCustomInfo>("declensions");
	const [typeString, setTypeString] = useState<string>("Declensions");
	const { disableConfirms } = useSelector((state: StateObject) => state.appSettings);

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
		let typingString: string;
		if(type === "other") {
			typingString = "Declensions/Conjugations/Etc.";
		} else {
			typingString = type.charAt(0).toLocaleUpperCase() + type.slice(1);
		}
		setDeclenjugationType(typingString);
		setTypeString(typingString);
	}, [type, setDeclenjugationType]);

	const onLoad = () => {
		const [editingType, editingGroup] = editingGroupInfo || [type, null];
		const {
			id = "ERROR",
			title = "ERROR",
			appliesTo = "",
			startsWith = ["ERROR"],
			endsWith = ["ERROR"],
			regex,
			separator = " ",
			declenjugations = []
		} = editingGroup || {};
		setId(id);
		setSeparator(separator);
		editingType && setType(editingType);
		setDeclenjugations(declenjugations);
		const editTitle = $i<HTMLInputElement>("editTitle");
		editTitle && (editTitle.value = title);
		const editAppliesTo = $i<HTMLInputElement>("editAppliesTo");
		editAppliesTo && (editAppliesTo.value = appliesTo);
		const editStarts = $i<HTMLInputElement>("editStarts");
		editStarts && (editStarts.value = startsWith.join(separator));
		const editEnds = $i<HTMLInputElement>("editEnds");
		editEnds && (editEnds.value = endsWith.join(separator));
		if(regex) {
			setUseAdvancedMethod(true);
			const editRegex1 = $i<HTMLInputElement>("editRegex1");
			editRegex1 && (editRegex1.value = regex[0]);
			const editRegex2 = $i<HTMLInputElement>("editRegex2");
			editRegex2 && (editRegex2.value = regex[1]);
		} else {
			setUseAdvancedMethod(false);
		}
	};

	const closeModal = useCallback(() => {
		setIsOpen(false);
		setId("");
		const editSortTitle = $i<HTMLInputElement>("editSortTitle");
		editSortTitle && (editSortTitle.value = "");
		const editAppliesTo = $i<HTMLInputElement>("editAppliesTo");
		editAppliesTo && (editAppliesTo.value = "");
		setSeparator(" ");
		setDeclenjugations([]);
		const editStarts = $i<HTMLInputElement>("editStarts");
		editStarts && (editStarts.value = "");
		const editEnds = $i<HTMLInputElement>("editEnds");
		editEnds && (editEnds.value = "");
		const editRegex1 = $i<HTMLInputElement>("editRegex1");
		editRegex1 && (editRegex1.value = "");
		const editRegex2 = $i<HTMLInputElement>("editRegex2");
		editRegex2 && (editRegex2.value = "");
	}, [setIsOpen]);

	const grabInfo = () => {
		const editTitle = $i<HTMLInputElement>("editTitle");
		const title = editTitle ? editTitle.value.trim() : "";
		const editAppliesTo = $i<HTMLInputElement>("editAppliesTo");
		const appliesTo = editAppliesTo ? editAppliesTo.value.trim() : "";
		const editStarts = $i<HTMLInputElement>("editStarts");
		const startsWith: string[] = editStarts && editStarts.value ? clearBlanks(editStarts.value.split(separator)) : [];
		const editEnds = $i<HTMLInputElement>("editEnds");
		const endsWith: string[] = editEnds && editEnds.value ? clearBlanks(editEnds.value.split(separator)) : [];
		const editRegex1 = $i<HTMLInputElement>("editRegex1");
		const regex1: string = (editRegex1 && editRegex1.value) || "";
		const editRegex2 = $i<HTMLInputElement>("editRegex2");
		const regex2: string = (editRegex2 && editRegex2.value) || "";
		return {
			title,
			appliesTo,
			startsWith,
			endsWith,
			regex1,
			regex2
		};
	};
	const maybeSaveGroup = () => {
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
				message: "You must provide a title or description before saving.",
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
		} else if (useAdvancedMethod) {
			if(!regex1 || !regex2) {
				doAlert({
					message: "If using regular expressions, you must provide both match and replacement expressions.",
					cssClass: "danger",
					buttons: [
						{
							text: "Ok",
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
					header: `Error trying to parse "${regex1}"`,
					message: `${e}`,
					cssClass: "danger",
					buttons: [
						{
							text: "Ok",
							role: "cancel",
							cssClass: "submit"
						}
					]
				});
				return;
			}
		} else if((startsWith.length + endsWith.length) === 0) {
			doAlert({
				message: "You must provide at least one condition (start or end) before saving.",
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
		const editedGroup: DJGroup = {
			id,
			title,
			appliesTo,
			startsWith,
			endsWith,
			separator,
			declenjugations
		};
		if(regex1) {
			editedGroup.regex = [regex1, regex2];
		}
		const editingType = editingGroupInfo![0];
		if(type === editingType) {
			dispatch(editGroup({type, group: editedGroup}));
		} else {
			dispatch(deleteGroup([editingType, id]));
			dispatch(addGroup({type, group: editedGroup}))
		}
		closeModal();
		toaster({
			message: "Group saved.",
			position: "middle",
			color: "success",
			duration: 2000,
			toast
		});
	};
	const maybeCancel = () => {
		const {
			title,
			appliesTo,
			startsWith,
			endsWith,
			regex1,
			regex2
		} = grabInfo();
		const [editingType, editingGroup] = editingGroupInfo!;
		const {
			title: _title,
			appliesTo: _appliesTo,
			startsWith: starts = [],
			endsWith: ends = [],
			regex = ["",""],
			separator: _sep,
			declenjugations: _dec = []
		} = editingGroup || {};
		const mapper = (decl: Declenjugation) => {
			const {
				title,
				prefix = "",
				suffix = "",
				regex = [],
				useWholeWord
			} = decl;
			return `${title}...${prefix},,,${suffix}---${regex.join("///")}===${useWholeWord}`;
		};
		const changed = (
			title !== _title
			|| type !== editingType
			|| appliesTo !== _appliesTo
			|| _sep !== separator
			|| starts.join(separator) !== startsWith.join(separator)
			|| ends.join(separator) !== endsWith.join(separator)
			|| regex.join(separator) !== `${regex1}${separator}${regex2}`
			|| _dec.length !== declenjugations.length
			|| _dec.map(mapper).join(separator) !== declenjugations.map(mapper).join(separator)
		);
		if(changed) {
			return yesNoAlert({
				header: "Unsaved Changes",
				message: "Are you sure you want to discard your edits?",
				cssClass: "warning",
				submit: "Yes, Close",
				handler: closeModal,
				doAlert
			});
		}
		closeModal();
	};
	const maybeDeleteGroup = () => {
		const handler = () => {
			dispatch(deleteGroup([editingGroupInfo![0], id]));
			closeModal();
			toaster({
				message: "Group deleted.",
				position: "middle",
				color: "danger",
				duration: 2000,
				toast
			});
		};
		if(!disableConfirms) {
			return yesNoAlert({
				header: "Delete Entire Group",
				message: "Are you sure you want to delete this entire Group? It cannot be undone.",
				cssClass: "danger",
				submit: "Yes, Delete",
				handler,
				doAlert
			});
		}
		handler();
	};

	const maybeAddNewDeclenjugation = () => {
		setSavedDeclenjugation(null);
		addDeclenjugationModalInfo.setIsOpen(true);
	};
	const editDeclenjugation = (declenjugation: Declenjugation) => {
		const el = $i<HTMLIonListElement>("editingDJGroup");
		el && el.closeSlidingItems();
		setIncomingDeclenjugation(declenjugation);
		editDeclenjugationModalInfo.setIsOpen(true);
	};
	const maybeDeleteDeclenjugation = (id: string) => {
		const el = $i<HTMLIonListElement>("editingDJGroup");
		el && el.closeSlidingItems();
		const handler = () => {
			setDeclenjugations(declenjugations.filter(obj => obj.id !== id));
			toaster({
				message: "Deleted.",
				position: "middle",
				color: "danger",
				duration: 2000,
				toast
			});
		};
		disableConfirms ? handler() : yesNoAlert({
			header: "Delete This",
			message: "Are you sure?",
			submit: "Yes, Delete It",
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
					<IonTitle>Edit {typeString} Group</IonTitle>
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
				<IonList lines="full" id="editingDJGroup" className="hasSpecialLabels hasToggles">
					<IonItem className="labelled">
						<IonLabel className="ion-text-wrap ion-padding-bottom">Title or Description of this {typeString.toLocaleLowerCase().slice(0, -1)} grouping:</IonLabel>
					</IonItem>
					<IonItem>
						<IonInput
							aria-label={`Title or Description of this ${typeString.toLocaleLowerCase().slice(0, -1)} grouping:`}
							id="editTitle"
						/>
					</IonItem>
					<IonItem>
						<IonSelect
							color="primary"
							className="ion-text-wrap settings"
							label="Type:"
							value={type}
							onIonChange={(e) => setType(e.detail.value)}
							interfaceOptions={{header: "Type"}}
						>
							<IonSelectOption
								className="ion-text-wrap ion-text-align-end"
								value="declensions"
							>Declension</IonSelectOption>
							<IonSelectOption
								className="ion-text-wrap ion-text-align-end"
								value="conjugations"
							>Conjugation</IonSelectOption>
							<IonSelectOption
								className="ion-text-wrap ion-text-align-end"
								value="other"
							>Other</IonSelectOption>
						</IonSelect>
					</IonItem>
					<IonItem className="labelled">
						<IonLabel className="ion-text-wrap ion-padding-bottom">Type(s) of word this group affects:</IonLabel>
					</IonItem>
					<IonItem>
						<IonInput
							aria-label="Type(s) of word this group affects:"
							id="editAppliesTo"
							placeholder="nouns? verbs? adjectives?"
						/>
					</IonItem>
					<IonItem className="wrappableInnards">
						<IonToggle
							labelPlacement="start"
							enableOnOffLabels
							checked={useAdvancedMethod}
							onIonChange={e => setUseAdvancedMethod(!useAdvancedMethod)}
						>
							<h2>Use advanced method</h2>
							<p>Use regular expressions to identify the stem.</p>
						</IonToggle>
					</IonItem>
					<IonItemDivider>{useAdvancedMethod ? "Regular Expression" : "Simple Root Finder"}</IonItemDivider>
					<IonItem className={`labelled toggleable${useAdvancedMethod ? "" : " toggled"}`}>
						<IonLabel className="ion-text-wrap ion-padding-bottom">Matching Expression:</IonLabel>
					</IonItem>
					<IonItem lines="none" className={`toggleable${useAdvancedMethod ? "" : " toggled"}`}>
						<IonInput
							aria-label="Matching Expression:"
							id="editRegex1"
							labelPlacement="stacked"
						/>
					</IonItem>
					<IonItem className={`labelled toggleable${useAdvancedMethod ? "" : " toggled"}`}>
						<IonLabel className="ion-text-wrap ion-padding-bottom">Replacement Expression:</IonLabel>
					</IonItem>
					<IonItem className={`toggleable${useAdvancedMethod ? "" : " toggled"}`}>
						<IonInput
							aria-label="Replacement Expression:"
							id="editRegex2"
							labelPlacement="stacked"
						/>
					</IonItem>
					<IonItem className={`labelled toggleable${useAdvancedMethod ? " toggled" : ""}`}>
						<IonLabel className="ion-text-wrap ion-padding-bottom">Remove from Start of Word to Find Root:</IonLabel>
					</IonItem>
					<IonItem className={`toggleable${useAdvancedMethod ? " toggled" : ""}`}>
						<IonInput
							aria-label="Remove from start of word to find stem:"
							id="editStarts"
						/>
					</IonItem>
					<IonItem className={`labelled toggleable${useAdvancedMethod ? " toggled" : ""}`}>
						<IonLabel className="ion-text-wrap ion-padding-bottom">Remove from End of Word to Find Root:</IonLabel>
					</IonItem>
					<IonItem className={`toggleable${useAdvancedMethod ? " toggled" : ""}`}>
						<IonInput
							aria-label="Remove From End:"
							id="editEnds"
							labelPlacement="stacked"
						/>
					</IonItem>
					<IonItem className={`labelled toggleable${useAdvancedMethod ? " toggled" : ""}`}>
						<IonLabel className="ion-text-wrap ion-padding-bottom">Separate Multiple Conditions With:</IonLabel>
					</IonItem>
					<IonItem className={`wrappableInnards toggleable${useAdvancedMethod ? " toggled" : ""}`}>
						<IonSelect
							color="primary"
							className="ion-text-wrap settings"
							aria-label="Choose Separator"
							value={separator}
							onIonChange={(e) => setSeparator(e.detail.value)}
							interfaceOptions={{header: "Separator"}}
						>
							<IonSelectOption
								className="ion-text-wrap ion-text-align-end"
								value=" "
							>[ ] Space</IonSelectOption>
							<IonSelectOption
								className="ion-text-wrap ion-text-align-end"
								value=","
							>[,] Comma</IonSelectOption>
							<IonSelectOption
								className="ion-text-wrap ion-text-align-end"
								value=";"
							>[;] Semicolon</IonSelectOption>
							<IonSelectOption
								className="ion-text-wrap ion-text-align-end"
								value="/"
								>[/] Slash</IonSelectOption>
						</IonSelect>
					</IonItem>
					<IonItemDivider color="secondary">{typeString}</IonItemDivider>
					<IonItem>
						<IonButton slot="end" onClick={maybeAddNewDeclenjugation}>
							<IonIcon slot="start" icon={addCircleOutline} />
							Add New
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
											aria-label="Edit"
											onClick={() => editDeclenjugation(dj)}
										>
											<IonIcon
												slot="icon-only"
												src="svg/edit.svg"
											/>
										</IonItemOption>
										<IonItemOption
											color="danger"
											aria-label="Delete"
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
													<em className="mini">[W]</em>
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
						color="danger"
						slot="start"
						onClick={maybeDeleteGroup}
					>
						<IonIcon icon={trashOutline} slot="start" />
						<IonLabel>Delete</IonLabel>
					</IonButton>
					<IonButton
						color="success"
						slot="end"
						onClick={maybeSaveGroup}
					>
						<IonIcon icon={saveOutline} slot="end" />
						<IonLabel>Save</IonLabel>
					</IonButton>
				</IonToolbar>
			</IonFooter>
		</IonModal>
	);
};

export default EditGroup;
