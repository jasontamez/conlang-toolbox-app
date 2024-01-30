import React, { useCallback, useEffect, useState } from 'react';
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
	IonToggle,
	IonItemSliding,
	IonItemOptions,
	IonItemOption,
	IonReorderGroup,
	IonReorder
} from '@ionic/react';
import {
	closeCircleOutline,
	saveOutline,
	globeOutline,
	addOutline,
	trash,
	reorderThree
} from 'ionicons/icons';
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from 'uuid';
import { LanguageCode } from 'iso-639-1';

import {
	EqualityObject,
	ExtraCharactersModalOpener,
	ModalProperties,
	RelationObject,
	SetState,
	SortLanguage,
	SortObject,
	SortSensitivity,
	SortSeparator
} from '../../store/types';
import { addNewCustomSort } from '../../store/sortingSlice';

import { $i } from '../../components/DollarSignExports';
import toaster from '../../components/toaster';
import yesNoAlert from '../../components/yesNoAlert';

interface CustomSortModal extends ExtraCharactersModalOpener {
	langObj: {[key: string]: string}
	languages: LanguageCode[]

	addRelationModalInfo: ModalProperties
	savedRelation: RelationObject | null
	setSavedRelation: SetState<RelationObject | null>

	editRelationModalInfo: ModalProperties
	setIncomingRelation: SetState<RelationObject | null>
	outgoingRelation: RelationObject | null | string
	setOutgoingRelation: SetState<RelationObject | null | string>

	addEqualityModalInfo: ModalProperties
	savedEquality: EqualityObject | null
	setSavedEquality: SetState<EqualityObject | null>

	editEqualityModalInfo: ModalProperties
	setIncomingEquality: SetState<EqualityObject | null>
	outgoingEquality: EqualityObject | null | string
	setOutgoingEquality: SetState<EqualityObject | null | string>
}

const AddCustomSort = (props: CustomSortModal) => {
	const {
		isOpen,
		setIsOpen,
		openECM,

		langObj,
		languages,

		addRelationModalInfo,
		savedRelation,
		setSavedRelation,

		editRelationModalInfo,
		setIncomingRelation,
		outgoingRelation,
		setOutgoingRelation,

		addEqualityModalInfo,
		savedEquality,
		setSavedEquality,

		editEqualityModalInfo,
		setIncomingEquality,
		outgoingEquality,
		setOutgoingEquality,
	} = props;
	const dispatch = useDispatch();
	const [doAlert] = useIonAlert();
	const toast = useIonToast();
	const [sortLang, setSortLang] = useState<SortLanguage | "unicode" | "default">("default");
	const [sortSensitivity, setSortSensitivity] = useState<SortSensitivity | "default">("default");
	const [usingAlpha, setUsingAlpha] = useState<boolean>(false);
	const [separator, setSeparator] = useState<SortSeparator>("");
	const [customizations, setCustomizations] = useState<(RelationObject | EqualityObject)[]>([]);
	const closeModal = useCallback(() => {
		setIsOpen(false);
		setCustomizations([]);
		setSortLang("default");
		setSortSensitivity("default");
		setUsingAlpha(false);
		const addSortTitle = $i<HTMLInputElement>("addSortTitle");
		addSortTitle && (addSortTitle.value = "");
		const addCustomAlphabet = $i<HTMLInputElement>("addCustomAlphabet");
		addCustomAlphabet && (addCustomAlphabet.value = "");
	}, [setIsOpen]);
	// Accept new relation from other modal
	useEffect(() => {
		if(isOpen && savedRelation) {
			if(customizations.length === 0) {
				setCustomizations([savedRelation]);
			} else {
				if(customizations.slice().pop()!.id === savedRelation.id) {
					// We already saved this.
					return;
				}
				setCustomizations([...customizations, savedRelation]);
			}
			setSavedRelation(null);
		}
	}, [isOpen, savedRelation, setSavedRelation, customizations]);
	// Accept edited relation from other modal
	useEffect(() => {
		if(isOpen && outgoingRelation) {
			if(typeof outgoingRelation === "string") {
				// a string means the relation was deleted
				setCustomizations(
					customizations.filter(obj => obj.id !== outgoingRelation)
				);
			} else {
				setCustomizations(
					customizations.map(
						obj => (obj.id === outgoingRelation.id ? outgoingRelation : obj)
					)
				);
			}
			setOutgoingRelation(null);
		}
	}, [isOpen, outgoingRelation, setOutgoingRelation, customizations]);
	// Accept new equality from other modal
	useEffect(() => {
		if(isOpen && savedEquality) {
			if(customizations.length === 0) {
				setCustomizations([savedEquality]);
			} else {
				if(customizations.slice().pop()!.id === savedEquality.id) {
					// We already saved this.
					return;
				}
				setCustomizations([...customizations, savedEquality]);
			}
			setSavedEquality(null);
		}
	}, [isOpen, savedEquality, setSavedEquality, customizations]);
	// Accept edited equality from other modal
	useEffect(() => {
		if(isOpen && outgoingEquality) {
			if(typeof outgoingEquality === "string") {
				// a string means the relation was deleted
				setCustomizations(
					customizations.filter(
						obj => obj.id !== outgoingEquality
					)
				);
			} else {
				setCustomizations(
					customizations.map(
						obj => (obj.id === outgoingEquality.id ? outgoingEquality : obj)
					)
				);
			}
			setOutgoingEquality(null);
		}
	}, [isOpen, outgoingEquality, setOutgoingEquality, customizations]);
	const maybeSaveNewSort = () => {
		const addSortTitle = $i<HTMLInputElement>("addSortTitle");
		const title = addSortTitle ? addSortTitle.value.trim() : "";
		if(!title) {
			doAlert({
				message: "You must provide a title before saving.",
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
		let test: boolean = false;
		const customSort: SortObject = {
			id: uuidv4(),
			title
		};
		if(usingAlpha) {
			const addCustomAlphabet = $i<HTMLInputElement>("addCustomAlphabet");
			const alpha: string[] = (addCustomAlphabet ? addCustomAlphabet.value : "")
				.split(separator)
				.filter((char: string) => char);
			if(alpha.length === 0) {
				doAlert({
					message: "Blank alphabet provided.",
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
			customSort.customAlphabet = alpha;
			customSort.separator = separator;
			test = true;
		}
		if(sortLang !== "default") {
			customSort.sortLanguage = sortLang;
			test = true;
		}
		if(sortSensitivity !== "default") {
			customSort.sensitivity = sortSensitivity;
			test = true;
		}
		if(customizations.length > 0) {
			customSort.customizations = customizations;
			test = true;
		}
		if(!test) {
			doAlert({
				message: "You did not enter any information.",
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
		dispatch(addNewCustomSort(customSort));
		closeModal();
		toaster({
			message: "Custom sort saved.",
			position: "middle",
			color: "success",
			duration: 2000,
			toast
		});
	};
	const maybeCancel = () => {
		const addCustomAlphabet = $i<HTMLInputElement>("addCustomAlphabet");
		if(
			sortLang !== "default" || sortSensitivity !== "default"
			|| (usingAlpha && addCustomAlphabet && addCustomAlphabet.value.trim())
			|| (customizations.length > 0)
		) {
			return yesNoAlert({
				header: "Unsaved Info",
				message: "Are you sure you want to discard this?",
				cssClass: "warning",
				submit: "Yes, Close",
				handler: closeModal,
				doAlert
			});
		}
		closeModal();
	};
	const maybeAddNewRelation = () => {
		setSavedRelation(null);
		addRelationModalInfo.setIsOpen(true);
	};
	const maybeAddNewEquality = () => {
		setSavedEquality(null);
		addEqualityModalInfo.setIsOpen(true);
	};
	const editRelation = (relation: RelationObject) => {
		const el = $i<HTMLIonListElement>("addingCustomSortList");
		el && el.closeSlidingItems();
		setIncomingRelation(relation);
		editRelationModalInfo.setIsOpen(true);
	};
	const maybeDeleteRelation = (id: string) => {
		const el = $i<HTMLIonListElement>("addingCustomSortList");
		el && el.closeSlidingItems();
		yesNoAlert({
			header: "Delete This",
			message: "Are you sure?",
			submit: "Yes, Delete It",
			cssClass: "danger",
			handler: () => setCustomizations(customizations.filter(obj => obj.id !== id)),
			doAlert
		});
	};
	const editEquality = (relation: EqualityObject) => {
		const el = $i<HTMLIonListElement>("addingCustomSortList");
		el && el.closeSlidingItems();
		setIncomingEquality(relation);
		editEqualityModalInfo.setIsOpen(true);
	};
	const maybeDeleteEquality = (id: string) => {
		const el = $i<HTMLIonListElement>("addingCustomSortList");
		el && el.closeSlidingItems();
		yesNoAlert({
			header: "Delete This",
			message: "Are you sure?",
			submit: "Yes, Delete It",
			cssClass: "danger",
			handler: () => setCustomizations(customizations.filter(obj => obj.id !== id)),
			doAlert
		});
	};
	const doReorder = (event: CustomEvent) => {
		const ed = event.detail;
		// move things around
		const { from, to } = ed;
		const moved = customizations[from];
		const remains = customizations.slice(0, from).concat(customizations.slice(from + 1));
		const final = remains.slice(0, to).concat(moved, remains.slice(to));
		// save result
		setCustomizations(final);
		ed.complete();
	};
	return (
		<IonModal isOpen={isOpen} backdropDismiss={false}>
			<IonHeader>
				<IonToolbar color="primary">
					<IonTitle>Add Custom Sort</IonTitle>
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
				<IonList lines="full" id="addingCustomSortList">
					<IonItem>
						<div slot="start" className="ion-margin-end">Title:</div>
						<IonInput
							aria-label="Title"
							id="addSortTitle"
							placeholder="Title for this sort"
						/>
					</IonItem>
					<IonItem className="wrappableInnards">
						<IonSelect
							color="primary"
							className="ion-text-wrap settings"
							label="Sort Language:"
							value={sortLang}
							onIonChange={(e) => setSortLang(e.detail.value)}
						>
							<IonSelectOption
								className="ion-text-wrap ion-text-align-end"
								value="default"
							>Default sort</IonSelectOption>
							{languages.map((language) => (
								<IonSelectOption
									key={`knownLang:${language}`}
									className="ion-text-wrap ion-text-align-end"
									value={language}
								>{langObj[language] || language}</IonSelectOption>
							))}
							<IonSelectOption
								className="ion-text-wrap ion-text-align-end"
								value="unicode"
							>Unicode sort (language-independent)</IonSelectOption>
						</IonSelect>
					</IonItem>
					<IonItem className="wrappableInnards">
						<IonSelect
							color="primary"
							className="ion-text-wrap settings"
							label="Sort Sensitivity:"
							value={sortSensitivity}
							onIonChange={(e) => setSortSensitivity(e.detail.value)}
						>
							<IonSelectOption
								className="ion-text-wrap ion-text-align-end"
								value="default"
							>Default sensitivity</IonSelectOption>
							<IonSelectOption
								className="ion-text-wrap ion-text-align-end"
								value="base"
							>[ȁ = Ȁ, a = ȁ]: Base letters only</IonSelectOption>
							<IonSelectOption
								className="ion-text-wrap ion-text-align-end"
								value="accent"
							>[ȁ = Ȁ, a ≠ ȁ]: Diacritics</IonSelectOption>
							<IonSelectOption
								className="ion-text-wrap ion-text-align-end"
								value="case"
							>[ȁ ≠ Ȁ, a = ȁ]: Upper/lowercase</IonSelectOption>
							<IonSelectOption
								className="ion-text-wrap ion-text-align-end"
								value="variant"
							>[ȁ ≠ Ȁ, a ≠ ȁ]: Diacritics and upper/lowercase</IonSelectOption>
						</IonSelect>
					</IonItem>
					<IonItem
						className="wrappableInnards"
						lines={usingAlpha ? "none" : undefined}
					>
						<IonToggle
							labelPlacement="start"
							enableOnOffLabels
							checked={usingAlpha}
							onIonChange={e => setUsingAlpha(!usingAlpha)}
						>
							<h2>Use alternate alphabet</h2>
							<p>
								Items will be sorted according to the order you provide. Characters
								not in your alphabet will be sorted according to the rules above.
							</p>
						</IonToggle>
					</IonItem>
					{ usingAlpha ?
						<>
							<IonItem lines="none">
								<IonInput
									aria-label="Custom Alphabet"
									id="addCustomAlphabet"
									placeholder="Write your alphabet here."
								/>
							</IonItem>
							<IonItem className="wrappableInnards">
								<IonSelect
									color="primary"
									className="ion-text-wrap settings"
									label="Alphabet separator:"
									value={separator}
									onIonChange={(e) => setSeparator(e.detail.value)}
								>
									<IonSelectOption
										className="ion-text-wrap ion-text-align-end"
										value=""
									>[abcde]: No separator</IonSelectOption>
									<IonSelectOption
										className="ion-text-wrap ion-text-align-end"
										value=" "
									>[a b c d e]: Space</IonSelectOption>
									<IonSelectOption
										className="ion-text-wrap ion-text-align-end"
										value=","
									>[a,b,c,d,e]: Comma</IonSelectOption>
									<IonSelectOption
										className="ion-text-wrap ion-text-align-end"
										value="."
									>[a.b.c.d.e]: Period</IonSelectOption>
									<IonSelectOption
										className="ion-text-wrap ion-text-align-end"
										value=";"
									>[a;b;c;d;e]: Semicolon</IonSelectOption>
								</IonSelect>
							</IonItem>
						</>
					:
						<></>
					}
					<IonItem className="wrappableInnards" lines="none">
						<IonLabel>
							<h2>Relations</h2>
							<p>Similar characters that should be sorted separately.</p>
						</IonLabel>
						<IonButton
							color="secondary"
							slot="end"
							onClick={maybeAddNewRelation}
						>
							<IonIcon icon={addOutline} slot="end" />
							<IonLabel>Add New</IonLabel>
						</IonButton>
					</IonItem>
					<IonItem className="wrappableInnards" lines="none">
						<IonLabel>
							<h2>Equalities</h2>
							<p>Characters that should be sorted together as if they were strictly equal.</p>
						</IonLabel>
						<IonButton
							color="secondary"
							slot="end"
							onClick={maybeAddNewEquality}
						>
							<IonIcon icon={addOutline} slot="end" />
							<IonLabel>Add New</IonLabel>
						</IonButton>
					</IonItem>
					<IonReorderGroup
						disabled={false}
						onIonItemReorder={doReorder}
					>
						{customizations.length > 0 ?
							customizations.map(obj => {
								const {
									id,
									base,
									separator
								} = obj;
								if("equals" in obj) {
									const {
										equals
									} = obj;
									return (
										<IonItemSliding
											className="customSortItem"
											key={`relation:${id}`}
										>
											<IonItemOptions side="end" className="serifChars">
												<IonItemOption
													color="primary"
													aria-label="Edit"
													onClick={() => editEquality(obj)}
												>
													<IonIcon
														slot="icon-only"
														src="svg/edit.svg"
													/>
												</IonItemOption>
												<IonItemOption
													color="danger"
													aria-label="Delete"
													onClick={() => maybeDeleteEquality(id)}
												>
													<IonIcon
														slot="icon-only"
														icon={trash}
													/>
												</IonItemOption>
											</IonItemOptions>
											<IonItem
												className="equality customization"
											>
												<IonReorder
													className="ion-padding-end"
												><IonIcon icon={reorderThree} /></IonReorder>
												<div
													className="base"
												>{base}</div>
												<div
													className="equals"
												>=</div>
												<div
													className="equalities"
												>{
													equals.map(
														(ch, i) => (
															<div
																key={`equality:${ch}:${i}`}
															>{i ? separator : ""}{ch}</div>
														)
													)
												}</div>
												<div
													className="icon"
												><IonIcon
													size="small"
													src="svg/slide-indicator.svg"
												/></div>
											</IonItem>
										</IonItemSliding>
									);
								} else {
									const {
										pre,
										post
									} = obj;
									return (
										<IonItemSliding
											className="customSortItem"
											key={`relation:${id}`}
										>
											<IonItemOptions
												side="end"
												className="serifChars"
											>
												<IonItemOption
													color="primary"
													aria-label="Edit"
													onClick={() => editRelation(obj)}
												>
													<IonIcon
														slot="icon-only"
														src="svg/edit.svg"
													/>
												</IonItemOption>
												<IonItemOption
													color="danger"
													aria-label="Delete"
													onClick={() => maybeDeleteRelation(id)}
												>
													<IonIcon slot="icon-only" icon={trash} />
												</IonItemOption>
											</IonItemOptions>
											<IonItem className="relation customization">
											<IonReorder
												className="ion-padding-end"
											><IonIcon icon={reorderThree} /></IonReorder>
												{pre.length ?
													<>
														<div className="pre">
															{
																pre.map(
																	(ch, i) => (
																		<div
																			key={`pre:${ch}:${i}`}
																		>{i ? separator : ""}{ch}</div>
																	)
																)
															}
														</div>
														<div className="lessthan">&lt;</div>
													</>
												:
													<></>
												}
												<div className="base">{base}</div>
												{post.length ?
													<>
														<div className="lessthan">&lt;</div>
														<div className="post">
															{
																post.map(
																	(ch, i) => (
																		<div
																			key={`post:${ch}:${i}`}
																		>{i ? separator : ""}{ch}</div>
																	)
																)
															}
														</div>
													</>
												:
													<></>
												}
												<div
													className="icon"
												><IonIcon
													size="small"
													src="svg/slide-indicator.svg"
												/></div>
											</IonItem>
										</IonItemSliding>
									);
								}
							})
						:
							<IonItem>
								<IonLabel
									className="ion-text-align-end"
								><em>(none)</em></IonLabel>
							</IonItem>
						}
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
						<IonIcon icon={saveOutline} slot="end" />
						<IonLabel>Cancel</IonLabel>
					</IonButton>
					<IonButton
						color="success"
						slot="end"
						onClick={maybeSaveNewSort}
					>
						<IonIcon icon={saveOutline} slot="end" />
						<IonLabel>Save</IonLabel>
					</IonButton>
				</IonToolbar>
			</IonFooter>
		</IonModal>
	);
};

export default AddCustomSort;
