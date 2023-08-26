import React from 'react';
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
	IonToggle,
	IonRange
} from '@ionic/react';
import {
	closeCircleOutline,
	chevronBackOutline,
	saveOutline,
	trashOutline,
	globeOutline
} from 'ionicons/icons';
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { ExtraCharactersModalOpener, WGCategoryObject, Zero_Fifty } from '../../components/ReduxDucksTypes';
import { closeModal, doEditCategoryWG, cancelEditCategoryWG, deleteCategoryWG } from '../../components/ReduxDucksFuncs';
import fireSwal from '../../components/Swal';
import { $q, $i } from '../../components/DollarSignExports';

const EditCategoryModal = (props: ExtraCharactersModalOpener) => {
	const dispatch = useDispatch();
	const [categoryObject, settings, settingsWG, modalState] = useSelector((state: any) => [state.wordgenCategories, state.appSettings, state.wordgenSettings, state.modalState], shallowEqual);
	const catMap: Map<string, WGCategoryObject> = new Map(categoryObject.map);
	const editing = categoryObject.editing;
	const sourceCat = catMap.get(editing)!;
	let editingCat: WGCategoryObject = {...sourceCat};
	editingCat.label = editing;
	const hardReset = () => {
		editingCat = {
			title: "",
			label: "",
			run: ""
		};
	};
	const makeString = (input: any) => {
		if(input) {
			return input as string;
		}
		return "";
	};
	function setNewInfo (prop: keyof WGCategoryObject, value: any) {
		// Set the property
		let madeString = makeString(value).trim();
		switch(prop) {
			case "title":
				editingCat.title = madeString;
				break;
			case "run":
				editingCat.run = madeString;
				break;
			case "label":
				editingCat.label = madeString;
				break;
		}
		// Remove danger color if present
		// Debounce means this sometimes doesn't exist by the time this is called.
		let where = $q("." + prop + "LabelEdit");
		(where !== null) && where.classList.remove("invalidValue");
	}
	const toggleDropoff = () => {
		let DF = $i("categoryDropoffEditC");
		if(!editingCat) {
			// Skip
		} else if(editingCat.dropoffOverride !== undefined) {
			delete editingCat.dropoffOverride;
			DF.classList.add("hide");
		} else {
			DF.classList.remove("hide");
			$q("ion-range", DF).value = editingCat.dropoffOverride = (!sourceCat || (sourceCat.dropoffOverride === undefined) ? settingsWG.categoryRunDropoff : sourceCat.dropoffOverride);
		}
	};
	const generateLabel = () => {
		let v = ($i("editingCatTitle").value as string).toUpperCase().replace(/[^A-Z0-9]/g, "");
		let length = v.length;
		let pos = 0;
		let label = null;
		let invalid = "^$\\[]{}.*+()?|";
		while(!label && pos < length) {
			let test = v.charAt(pos);
			if(invalid.indexOf(test) === -1 && (editing === test || !catMap.has(test))) {
				label = test;
			}
			pos++;
		}
		if(!label) {
			// No suitable label found
			fireSwal({
				title: "Unable to suggest a unique label from the given descrption.",
				customClass: {popup: 'warnToast'},
				toast: true,
				timer: 4000,
				timerProgressBar: true,
				showConfirmButton: false
			});
		} else {
			// Suitable label found
			$i("editingShortLabel").value = label;
		}
	};
	const cancelEditing = () => {
		dispatch(cancelEditCategoryWG(editing));
		dispatch(closeModal('EditCategory'));
	};
	const maybeSaveNewInfo = () => {
		let err: string[] = [];
		// Test info for validness, then save if needed and reset the editingCat
		if(editingCat.title === "") {
			$q(".titleLabelEdit").classList.add("invalidValue");
			err.push("No title present");
		}
		if(editingCat.label === "") {
			$q(".labelLabelEdit").classList.add("invalidValue");
			err.push("No label present");
		} else if (editing !== editingCat.label && catMap.has(editingCat.label!)) {
			$q(".labelLabelEdit").classList.add("invalidValue");
			err.push("There is already a label \"" + editingCat.label + "\"");
		} else {
			let invalid = "^$\\[]{}.*+()?|";
			if (invalid.indexOf(editingCat.label as string) !== -1) {
				$q(".labelLabelEdit").classList.add("invalidValue");
				err.push("You cannot use \"" + editingCat.label + "\" as a label.");
			}
		}
		if(editingCat.run === "") {
			$q(".runLabelEdit").classList.add("invalidValue");
			err.push("No run present");
		}
		if(err.length > 0) {
			// Errors found.
			fireSwal({
				title: "Error",
				icon: "error",
				text: err.join("; ")
			});
			return;
		}
		// Everything ok!
		dispatch(closeModal('EditCategory'));
		dispatch(doEditCategoryWG(editingCat));
		hardReset();
		fireSwal({
			title: "Character Group saved!",
			toast: true,
			timer: 2500,
			timerProgressBar: true,
			showConfirmButton: false
		});
	};
	const maybeDeleteCategory = () => {
		$q(".categories").closeSlidingItems();
		const thenFunc = (result: any) => {
			if(result.isConfirmed) {
				dispatch(closeModal('EditCategory'));
				dispatch(deleteCategoryWG(editingCat));
				fireSwal({
					title: "Character Group deleted",
					customClass: {popup: 'dangerToast'},
					toast: true,
					timer: 2500,
					timerProgressBar: true,
					showConfirmButton: false
				});
			}
		};
		if(settings.disableConfirms) {
			thenFunc({isConfirmed: true});
		} else {
			fireSwal({
				title: "Delete " + editingCat.label + "?",
				text: "Are you sure? This cannot be undone.",
				customClass: {popup: 'deleteConfirm'},
				icon: 'warning',
				showCancelButton: true,
				confirmButtonText: "Yes, delete it."
			}).then(thenFunc);
		}
	};
	return (
		<IonModal isOpen={modalState.EditCategory} onDidDismiss={() => cancelEditing()}>
			<IonHeader>
				<IonToolbar color="primary">
					<IonTitle>Edit Character Group</IonTitle>
					<IonButtons slot="end">
						<IonButton onClick={() => props.openECM(true)}>
							<IonIcon icon={globeOutline} />
						</IonButton>
						<IonButton onClick={() => cancelEditing()}>
							<IonIcon icon={closeCircleOutline} />
						</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<IonList lines="none" class="hasSpecialLabels">
					<IonItem className="labelled">
						<IonLabel className="titleLabelEdit">Title/Description:</IonLabel>
					</IonItem>
					<IonItem>
						<IonInput aria-label="Title or description" value={editingCat.title} id="editingCatTitle" className="ion-margin-top" placeholder="Type description here" onIonChange={e => setNewInfo("title", e.detail.value)} autocomplete="on" debounce={250} />
					</IonItem>
					<IonItem style={{marginTop: "0.25rem"}}>
						<div slot="start" className="ion-margin-end labelLabel">Short Label:</div>
						<IonInput aria-label="Short label" value={editingCat.label} id="editingShortLabel" className="serifChars" placeholder="1 character only" onIonChange={e => setNewInfo("label", e.detail.value)} maxlength={1} />
						<IonButton slot="end" onClick={() => generateLabel()}>
							<IonIcon icon={chevronBackOutline} />Suggest
						</IonButton>
					</IonItem>
					<IonItem className="labelled">
						<IonLabel className="runLabelEdit">Letters/Characters:</IonLabel>
					</IonItem>
					<IonItem>
						<IonInput aria-label="Letters, characters" value={editingCat.run} className="ion-margin-top serifChars" placeholder="Enter characters in group here" onIonChange={e => setNewInfo("run", e.detail.value)} debounce={250} />
					</IonItem>
					<IonItem>
						<IonToggle enableOnOffLabels aria-label="Use separate dropoff rate" onClick={() => toggleDropoff()} labelPlacement="start" checked={editingCat.dropoffOverride !== undefined}>Use separate dropoff rate</IonToggle>
					</IonItem>
					<IonItem id="categoryDropoffEditC" className={editingCat.dropoffOverride === undefined ? "hide" : ""}>
						<IonRange min={0} max={50} pin={true} value={(editingCat.dropoffOverride === undefined ? settingsWG.categoryRunDropoff : editingCat.dropoffOverride)} onIonChange={e => {editingCat.dropoffOverride = (e.detail.value as Zero_Fifty)}} debounce={250}>
							<IonIcon size="small" slot="start" src="svg/flatAngle.svg" />
							<IonIcon size="small" slot="end" src="svg/steepAngle.svg" />
						</IonRange>
					</IonItem>
				</IonList>
			</IonContent>
			<IonFooter>
				<IonToolbar>
					<IonButton color="secondary" slot="end" onClick={() => maybeSaveNewInfo()}>
						<IonIcon icon={saveOutline} slot="start" />
						<IonLabel>Save Character Group</IonLabel>
					</IonButton>
					<IonButton color="danger" slot="start" onClick={() => maybeDeleteCategory()}>
						<IonIcon icon={trashOutline} slot="start" />
						<IonLabel>Delete Group</IonLabel>
					</IonButton>
				</IonToolbar>
			</IonFooter>
		</IonModal>
	);
};

export default EditCategoryModal;
