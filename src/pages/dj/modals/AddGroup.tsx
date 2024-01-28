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
	StateObject
} from '../../../store/types';
import { addGroup } from '../../../store/declenjugatorSlice';

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
	setSavedDeclenjugation: Function
	setDeclenjugationType: Function
	editDeclenjugationModalInfo: ModalProperties
	setIncomingDeclenjugation: Function
	outgoingDeclenjugation: Declenjugation | null | string
	setOutgoingDeclenjugation: Function
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
		let typingString: string;
		if(type === "other") {
			typingString = "Declensions/Conjugations/Etc.";
		} else {
			typingString = type.charAt(0).toLocaleUpperCase() + type.slice(1);
		}
		setDeclenjugationType(typingString);
		setTypeString(typingString);
	}, [type, setDeclenjugationType]);

	const onLoad = useCallback(() => {
		setSeparator(" ");
		setDeclenjugations([]);
		const addTitle = $i("addTitle");
		addTitle && (addTitle.value = "");
		const addAppliesTo = $i("addAppliesTo");
		addAppliesTo && (addAppliesTo.value = "");
		const addStarts = $i("addStarts");
		addStarts && (addStarts.value = "");
		const addEnds = $i("addEnds");
		addEnds && (addEnds.value = "");
		const addRegex1 = $i("addRegex1");
		addRegex1 && (addRegex1.value = "");
		const addRegex2 = $i("addRegex2");
		addRegex2 && (addRegex2.value = "");
	}, []);
	const grabInfo = () => {
		const addTitle = $i("addTitle");
		const title = addTitle ? addTitle.value.trim() : "";
		const addAppliesTo = $i("addAppliesTo");
		const appliesTo = addAppliesTo ? addAppliesTo.value.trim() : "";
		const addStarts = $i("addStarts");
		const startsWith: string[] = addStarts && addStarts.value ? clearBlanks(addStarts.value.split(separator)) : [];
		const addEnds = $i("addEnds");
		const endsWith: string[] = addEnds && addEnds.value ? clearBlanks(addEnds.value.split(separator)) : [];
		const addRegex1 = $i("addRegex1");
		const regex1: string = (addRegex1 && addRegex1.value) || "";
		const addRegex2 = $i("addRegex2");
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
			startsWith,
			endsWith,
			regex1,
			regex2
		} = grabInfo();
		if(title || regex1 || regex2 || (startsWith.length + endsWith.length > 0)) {
			return yesNoAlert({
				header: "Unsaved Info",
				message: "Are you sure you want to discard this?",
				cssClass: "warning",
				submit: "Yes, Close",
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
		$i("addingDJGroup").closeSlidingItems();
		setIncomingDeclenjugation(declenjugation);
		editDeclenjugationModalInfo.setIsOpen(true);
	};
	const maybeDeleteDeclenjugation = (id: string) => {
		$i("addingDJGroup").closeSlidingItems();
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
					<IonTitle>Add {typeString} Group</IonTitle>
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
						<IonLabel className="ion-text-wrap ion-padding-bottom">Title or Description of this {typeString.toLocaleLowerCase().slice(0, -1)} grouping:</IonLabel>
					</IonItem>
					<IonItem>
						<IonInput
							aria-label={`Title or Description of this ${typeString.toLocaleLowerCase().slice(0, -1)} grouping:`}
							id="addTitle"
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
							id="addAppliesTo"
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
							id="addRegex1"
							labelPlacement="stacked"
						/>
					</IonItem>
					<IonItem className={`labelled toggleable${useAdvancedMethod ? "" : " toggled"}`}>
						<IonLabel className="ion-text-wrap ion-padding-bottom">Replacement Expression:</IonLabel>
					</IonItem>
					<IonItem className={`toggleable${useAdvancedMethod ? "" : " toggled"}`}>
						<IonInput
							aria-label="Replacement Expression:"
							id="addRegex2"
							labelPlacement="stacked"
						/>
					</IonItem>
					<IonItem className={`labelled toggleable${useAdvancedMethod ? " toggled" : ""}`}>
						<IonLabel className="ion-text-wrap ion-padding-bottom">Remove from Start of Word to Find Root:</IonLabel>
					</IonItem>
					<IonItem className={`toggleable${useAdvancedMethod ? " toggled" : ""}`}>
						<IonInput
							aria-label="Remove from start of word to find stem:"
							id="addStarts"
						/>
					</IonItem>
					<IonItem className={`labelled toggleable${useAdvancedMethod ? " toggled" : ""}`}>
						<IonLabel className="ion-text-wrap ion-padding-bottom">Remove from End of Word to Find Root:</IonLabel>
					</IonItem>
					<IonItem className={`toggleable${useAdvancedMethod ? " toggled" : ""}`}>
						<IonInput
							aria-label="Remove From End:"
							id="addEnds"
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
						color="warning"
						slot="start"
						onClick={maybeCancel}
					>
						<IonIcon icon={closeCircleOutline} slot="start" />
						<IonLabel>Cancel</IonLabel>
					</IonButton>
					<IonButton
						color="success"
						slot="end"
						onClick={maybeSaveNewGroup}
					>
						<IonIcon icon={saveOutline} slot="end" />
						<IonLabel>Save</IonLabel>
					</IonButton>
				</IonToolbar>
			</IonFooter>
		</IonModal>
	);
};

export default AddGroup;
