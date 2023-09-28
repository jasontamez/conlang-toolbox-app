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
	IonItemOption
} from '@ionic/react';
import {
	closeCircleOutline,
	saveOutline,
	globeOutline,
	addOutline,
	trash
} from 'ionicons/icons';
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from 'uuid';
import { LanguageCode } from 'iso-639-1';

import {
	EqualityObject,
	ExtraCharactersModalOpener,
	ModalProperties,
	RelationObject,
	SortLanguage,
	SortObject,
	SortSensitivity,
	SortSeparator
} from '../../store/types';
import { deleteCustomSort, editCustomSort } from '../../store/sortingSlice';

import { $i } from '../../components/DollarSignExports';
import toaster from '../../components/toaster';
import yesNoAlert from '../../components/yesNoAlert';

interface CustomSortModal extends ExtraCharactersModalOpener {
	langObj: {[key: string]: string}
	languages: LanguageCode[]

	editingCustomSort: SortObject | null

	addRelationModalInfo: ModalProperties
	savedRelation: RelationObject | null
	setSavedRelation: Function

	editRelationModalInfo: ModalProperties
	setIncomingRelation: Function
	outgoingRelation: RelationObject | null | string
	setOutgoingRelation: Function

	addEqualityModalInfo: ModalProperties
	savedEquality: EqualityObject | null
	setSavedEquality: Function

	editEqualityModalInfo: ModalProperties
	setIncomingEquality: Function
	outgoingEquality: EqualityObject | null | string
	setOutgoingEquality: Function
}

const EditCustomSort = (props: CustomSortModal) => {
	const {
		isOpen,
		setIsOpen,
		openECM,
		editingCustomSort,

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
	const [doToast, undoToast] = useIonToast();
	const [id, setId] = useState<string>("");
	const [sortLang, setSortLang] = useState<SortLanguage | "unicode" | "default">("default");
	const [sortSensitivity, setSortSensitivity] = useState<SortSensitivity | "default">("default");
	const [usingAlpha, setUsingAlpha] = useState<boolean>(false);
	const [separator, setSeparator] = useState<SortSeparator>("");
	const [relations, setRelations] = useState<RelationObject[]>([]);
	const [equalities, setEqualities] = useState<EqualityObject[]>([]);
	const onLoad = () => {
		const {
			id = "ERROR",
			title = "ERROR",
			sortLanguage = "default",
			sensitivity = "default",
			customAlphabet = [],
			separator = ",",
			relations = [],
			equalities = []
		} = editingCustomSort || {};
		setId(id);
		const editSortTitle = $i("editSortTitle");
		editSortTitle && (editSortTitle.value = title);
		setSortLang(sortLanguage);
		setSortSensitivity(sensitivity);
		if(customAlphabet.length > 0) {
			setUsingAlpha(true);
		}
		const editCustomAlphabet = $i("editCustomAlphabet");
		editCustomAlphabet && (editCustomAlphabet.value = customAlphabet.join(separator));
		setSeparator(separator);
		setRelations(relations);
		setEqualities(equalities);
	};
	const closeModal = useCallback(() => {
		setIsOpen(false);
		setId("");
		const editSortTitle = $i("editSortTitle");
		editSortTitle && (editSortTitle.value = "");
		setSortLang("default");
		setSortSensitivity("default");
		setUsingAlpha(false);
		const editCustomAlphabet = $i("editCustomAlphabet");
		editCustomAlphabet && (editCustomAlphabet.value = "");
		setSeparator(",");
		setRelations([]);
		setEqualities([]);
	}, [setIsOpen]);
	// Accept new relation from other modal
	useEffect(() => {
		if(isOpen && savedRelation) {
			if(relations.length === 0) {
				setRelations([savedRelation]);
			} else {
				if(relations.slice().pop()!.id === savedRelation.id) {
					// We already saved this.
					return;
				}
				setRelations([...relations, savedRelation]);
			}
			setSavedRelation(null);
		}
	}, [isOpen, savedRelation, setSavedRelation, relations]);
	// Accept edited relation from other modal
	useEffect(() => {
		if(isOpen && outgoingRelation) {
			if(typeof outgoingRelation === "string") {
				// a string means the relation was deleted
				setRelations(relations.filter(obj => obj.id !== outgoingRelation));
			} else {
				setRelations(relations.map(obj => (obj.id === outgoingRelation.id ? outgoingRelation : obj)));
			}
			setOutgoingRelation(null);
		}
	}, [isOpen, outgoingRelation, setOutgoingRelation, relations]);
	// Accept new equality from other modal
	useEffect(() => {
		if(isOpen && savedEquality) {
			if(equalities.length === 0) {
				setEqualities([savedEquality]);
			} else {
				if(equalities.slice().pop()!.id === savedEquality.id) {
					// We already saved this.
					return;
				}
				setEqualities([...equalities, savedEquality]);
			}
			setSavedEquality(null);
		}
	}, [isOpen, savedEquality, setSavedEquality, equalities]);
	// Accept edited equality from other modal
	useEffect(() => {
		if(isOpen && outgoingEquality) {
			if(typeof outgoingEquality === "string") {
				// a string means the relation was deleted
				setEqualities(equalities.filter(obj => obj.id !== outgoingEquality));
			} else {
				setEqualities(equalities.map(obj => (obj.id === outgoingEquality.id ? outgoingEquality : obj)));
			}
			setOutgoingEquality(null);
		}
	}, [isOpen, outgoingEquality, setOutgoingEquality, equalities]);
	const maybeSaveEditedSort = () => {
		const editSortTitle = $i("editSortTitle");
		const title = editSortTitle ? editSortTitle.value.trim() : "";
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
			const editCustomAlphabet = $i("editCustomAlphabet");
			const alpha: string[] = editCustomAlphabet.value.split(separator).filter((char: string) => char);
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
		if(relations.length > 0) {
			customSort.relations = relations;
			test = true;
		}
		if(equalities.length > 0) {
			customSort.equalities = equalities;
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
		dispatch(editCustomSort([id, customSort]));
		closeModal();
		toaster({
			message: "Custom sort saved.",
			position: "middle",
			color: "success",
			duration: 2000,
			doToast,
			undoToast
		});
	};
	const maybeDeleteSort = () => {
		const handler = () => {
			dispatch(deleteCustomSort(id));
			setIsOpen(false);
			toaster({
				message: "Custom sort deleted.",
				color: "danger",
				duration: 2000,
				position: "top",
				doToast,
				undoToast
			});
		};
		yesNoAlert({
			header: "Delete This Sort",
			message: "Are you sure you want to do this? It cannot be undone.",
			submit: "Yes, Delete It",
			cssClass: "danger",
			handler,
			doAlert
		});
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
		$i("editingCustomSortList").closeSlidingItems();
		setIncomingRelation(relation);
		editRelationModalInfo.setIsOpen(true);
	};
	const maybeDeleteRelation = (id: string) => {
		yesNoAlert({
			header: "Delete This",
			message: "Are you sure?",
			submit: "Yes, Delete It",
			cssClass: "danger",
			handler: () => setRelations(relations.filter(obj => obj.id !== id)),
			doAlert
		});
	};
	const editEquality = (relation: EqualityObject) => {
		$i("editingCustomSortList").closeSlidingItems();
		setIncomingEquality(relation);
		editEqualityModalInfo.setIsOpen(true);
	};
	const maybeDeleteEquality = (id: string) => {
		yesNoAlert({
			header: "Delete This",
			message: "Are you sure?",
			submit: "Yes, Delete It",
			cssClass: "danger",
			handler: () => setEqualities(equalities.filter(obj => obj.id !== id)),
			doAlert
		});
	};
	return (
		<IonModal isOpen={isOpen} backdropDismiss={false} onIonModalDidPresent={onLoad}>
			<IonHeader>
				<IonToolbar color="primary">
					<IonTitle>Edit Custom Sort</IonTitle>
					<IonButtons slot="end">
						<IonButton onClick={() => openECM(true)}>
							<IonIcon icon={globeOutline} />
						</IonButton>
						<IonButton onClick={closeModal}>
							<IonIcon icon={closeCircleOutline} />
						</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<IonList lines="full" id="editingCustomSortList">
					<IonItem>
						<div slot="start" className="ion-margin-end">Title:</div>
						<IonInput aria-label="Title" id="editSortTitle" placeholder="Title for this sort" />
					</IonItem>
					<IonItem className="wrappableInnards">
						<IonSelect
							color="primary"
							className="ion-text-wrap settings"
							label="Sort Language:"
							value={sortLang}
							onIonChange={(e) => setSortLang(e.detail.value)}
						>
							<IonSelectOption className="ion-text-wrap ion-text-align-end" value="default">Default sort</IonSelectOption>
							{languages.map((language) => (
								<IonSelectOption key={`knownLang:${language}`} className="ion-text-wrap ion-text-align-end" value={language}>{langObj[language] || language}</IonSelectOption>
							))}
							<IonSelectOption className="ion-text-wrap ion-text-align-end" value="unicode">Unicode sort (language-independent)</IonSelectOption>
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
							<IonSelectOption className="ion-text-wrap ion-text-align-end" value="default">Default sensitivity</IonSelectOption>
							<IonSelectOption className="ion-text-wrap ion-text-align-end" value="base">[ȁ = Ȁ, a = ȁ]: Base letters only</IonSelectOption>
							<IonSelectOption className="ion-text-wrap ion-text-align-end" value="accent">[ȁ = Ȁ, a ≠ ȁ]: Diacritics</IonSelectOption>
							<IonSelectOption className="ion-text-wrap ion-text-align-end" value="case">[ȁ ≠ Ȁ, a = ȁ]: Upper/lowercase</IonSelectOption>
							<IonSelectOption className="ion-text-wrap ion-text-align-end" value="variant">[ȁ ≠ Ȁ, a ≠ ȁ]: Diacritics and upper/lowercase</IonSelectOption>
						</IonSelect>
					</IonItem>
					<IonItem className="wrappableInnards" lines={usingAlpha ? "none" : undefined}>
						<IonToggle
							labelPlacement="start"
							enableOnOffLabels
							checked={usingAlpha}
							onIonChange={e => setUsingAlpha(!usingAlpha)}
						>
							<h2>Use alternate alphabet</h2>
							<p>Items will be sorted according to the order you provide. Characters not in your alphabet will be sorted according to the rules above.</p>
						</IonToggle>
					</IonItem>
					{ usingAlpha ?
						<>
							<IonItem lines="none">
								<IonInput
									aria-label="Custom Alphabet"
									id="editCustomAlphabet"
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
									<IonSelectOption className="ion-text-wrap ion-text-align-end" value="">[abcde]: No separator</IonSelectOption>
									<IonSelectOption className="ion-text-wrap ion-text-align-end" value=" ">[a b c d e]: Space</IonSelectOption>
									<IonSelectOption className="ion-text-wrap ion-text-align-end" value=",">[a,b,c,d,e]: Comma</IonSelectOption>
									<IonSelectOption className="ion-text-wrap ion-text-align-end" value=".">[a.b.c.d.e]: Period</IonSelectOption>
									<IonSelectOption className="ion-text-wrap ion-text-align-end" value=";">[a;b;c;d;e]: Semicolon</IonSelectOption>
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
						<IonButton color="secondary" slot="end" onClick={maybeAddNewRelation}>
							<IonIcon icon={addOutline} slot="end" />
							<IonLabel>Add New</IonLabel>
						</IonButton>
					</IonItem>
					{
						relations.length > 0 ?
							relations.map(rel => {
								const {
									id,
									base,
									pre,
									post,
									separator
								} = rel;
								return (
									<IonItemSliding className="customSortItem" key={`relation:${id}`}>
										<IonItemOptions side="end" className="serifChars">
											<IonItemOption
												color="primary"
												aria-label="Edit"
												onClick={() => editRelation(rel)}
											>
												<IonIcon slot="icon-only" src="svg/edit.svg" />
											</IonItemOption>
											<IonItemOption
												color="danger"
												aria-label="Delete"
												onClick={() => maybeDeleteRelation(id)}
											>
												<IonIcon slot="icon-only" icon={trash} />
											</IonItemOption>
										</IonItemOptions>
										<IonItem className="relation">
											<div className={pre.length ? "pre" : "hidden"}>
												{pre.map((ch, i) => <div key={`pre:${ch}:${i}`}>{i ? separator : ""}{ch}</div>)}
											</div>
											<div className="base">{base}</div>
											<div className={post.length ? "post" : "hidden"}>
												{post.map((ch, i) => <div key={`post:${ch}:${i}`}>{i ? separator : ""}{ch}</div>)}
											</div>
											<div className="icon"><IonIcon size="small" src="svg/slide-indicator.svg" /></div>
										</IonItem>
									</IonItemSliding>
								);
							})
						:
							<IonItem>
								<IonLabel className="ion-text-align-end"><em>(none)</em></IonLabel>
							</IonItem>
					}
					<IonItem className="wrappableInnards" lines="none">
						<IonLabel>
							<h2>Equalities</h2>
							<p>Characters that should be sorted together as if they were strictly equal.</p>
						</IonLabel>
						<IonButton color="secondary" slot="end" onClick={maybeAddNewEquality}>
							<IonIcon icon={addOutline} slot="end" />
							<IonLabel>Add New</IonLabel>
						</IonButton>
					</IonItem>
					{
						equalities.length > 0 ?
							equalities.map(eq => {
								const {
									id,
									base,
									equals,
									separator
								} = eq;
								return (
									<IonItemSliding className="customSortItem" key={`relation:${id}`}>
										<IonItemOptions side="end" className="serifChars">
											<IonItemOption color="primary" aria-label="Edit" onClick={() => editEquality(eq)}>
												<IonIcon slot="icon-only" src="svg/edit.svg" />
											</IonItemOption>
											<IonItemOption color="danger" aria-label="Delete" onClick={() => maybeDeleteEquality(id)}>
												<IonIcon slot="icon-only" icon={trash} />
											</IonItemOption>
										</IonItemOptions>
										<IonItem className="equality">
											<div>{base}</div>
											<div>=</div>
											<div>{equals.map((ch, i) => <div key={`equality:${ch}:${i}`}>{i ? separator : ""}{ch}</div>)}</div>
											<div><IonIcon size="small" src="svg/slide-indicator.svg" /></div>
										</IonItem>
									</IonItemSliding>
								);
							})
						:
							<IonItem>
								<IonLabel className="ion-text-align-end"><em>(none)</em></IonLabel>
							</IonItem>
					}
				</IonList>
			</IonContent>
			<IonFooter style={{borderTop: "2px solid #00000033"}}>
				<IonToolbar>
					<IonButton color="danger" slot="start" onClick={maybeDeleteSort}>
						<IonIcon icon={trash} slot="end" />
						<IonLabel>Delete Sort</IonLabel>
					</IonButton>
					<IonButton color="success" slot="end" onClick={maybeSaveEditedSort}>
						<IonIcon icon={saveOutline} slot="end" />
						<IonLabel>Save</IonLabel>
					</IonButton>
				</IonToolbar>
			</IonFooter>
		</IonModal>
	);
};

export default EditCustomSort;
