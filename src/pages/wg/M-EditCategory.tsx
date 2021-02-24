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
	IonFooter
} from '@ionic/react';
import {
	closeCircleOutline,
	chevronBackOutline,
	saveOutline
} from 'ionicons/icons';
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { WGCategoryObject } from '../../components/ReduxDucksTypes';
import { closeModal, doEditCategoryWG, cancelEditCategoryWG } from '../../components/ReduxDucksFuncs';
import fireSwal from '../../components/Swal';
import { $q, $i } from '../../components/DollarSignExports';

const EditCategoryModal = () => {
	const dispatch = useDispatch();
	const categoryObject = useSelector((state: any) => state.wordgenCategories, shallowEqual);
	const catMap: Map<string, WGCategoryObject> = new Map(categoryObject.map);
	const editing = categoryObject.editing;
	//const sourceCat = catMap.get(editing);
	const modalState = useSelector((state: any) => state.modalState, shallowEqual);
	let editingCat: WGCategoryObject = {...catMap.get(editing)!};
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
	const generateLabel = () => {
		let v = ($i("editingCatTitle").value as string).toUpperCase().replace(/[^A-Z0-9]/g, "");
		let length = v.length;
		let pos = 0;
		let label = null;
		while(!label && pos < length) {
			let test = v.charAt(pos);
			if(editing === test || !catMap.has(test)) {
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
			title: "Category saved!",
			toast: true,
			timer: 2500,
			timerProgressBar: true,
			showConfirmButton: false
		});
	};
	return (
		<IonModal isOpen={modalState.EditCategory} onDidDismiss={() => cancelEditing()}>
			<IonHeader>
				<IonToolbar color="primary">
					<IonTitle>Edit Category</IonTitle>
					<IonButtons slot="end">
						<IonButton onClick={() => cancelEditing()}>
							<IonIcon icon={closeCircleOutline} />
						</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<IonList lines="none">
					<IonItem>
						<IonLabel className="titleLabelEdit" position="stacked" style={ {fontSize: "20px"} }>Category Description:</IonLabel>
						<IonInput value={editingCat.title} id="editingCatTitle" className="ion-margin-top" placeholder="Type description here" onIonChange={e => setNewInfo("title", e.detail.value)} autocomplete="on" debounce={500}></IonInput>
					</IonItem>
					<IonItem>
						<IonLabel className="ion-margin-end labelLabelEdit">Short Label:</IonLabel>
						<IonInput value={editingCat.label} id="editingShortLabel" className="serifChars" placeholder="1 character only" onIonChange={e => setNewInfo("label", e.detail.value)} maxlength={1}></IonInput>
						<IonButton slot="end" onClick={() => generateLabel()}>
							<IonIcon icon={chevronBackOutline} />Suggest
						</IonButton>
					</IonItem>
					<IonItem>
						<IonLabel className="runLabelEdit" position="stacked" style={ {fontSize: "20px"} }>Letters/Characters:</IonLabel>
						<IonInput value={editingCat.run} className="ion-margin-top serifChars" placeholder="Enter letters/characters in category here" onIonChange={e => setNewInfo("run", e.detail.value)}></IonInput>
					</IonItem>
				</IonList>
			</IonContent>
			<IonFooter>
				<IonToolbar>
					<IonButton color="secondary" slot="end" onClick={() => maybeSaveNewInfo()}>
						<IonIcon icon={saveOutline} slot="start" />
						<IonLabel>Save Category</IonLabel>
					</IonButton>
				</IonToolbar>
			</IonFooter>
		</IonModal>
	);
};

export default EditCategoryModal;
