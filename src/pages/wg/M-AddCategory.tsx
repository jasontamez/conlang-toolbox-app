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
	addOutline,
	chevronBackOutline
} from 'ionicons/icons';
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import '../WordGen.css';
import { CategoryObject, closeModal, addCategory } from '../../components/ReduxDucks';
import fireSwal from '../../components/Swal';
import { $q, $i } from '../../components/DollarSignExports';

const AddCategoryModal = () => {
	let newCat: CategoryObject = {
		title: "",
		label: "",
		run: ""
	};
	const hardReset = () => {
		newCat = {
			title: "",
			label: "",
			run: ""
		};
	};
	const dispatch = useDispatch();
	const categoryObject = useSelector((state: any) => state.categories, shallowEqual);
	const catMap = categoryObject.map;
	const modalState = useSelector((state: any) => state.modalState, shallowEqual);
	function setNewInfo<
		KEY extends keyof CategoryObject,
		VAL extends CategoryObject[KEY]
	>(prop: KEY, value: VAL) {
		// Set the property
		newCat[prop] = value;
		// Remove danger color if present
		// Debounce means this sometimes doesn't exist by the time this is called.
		let where = $q("." + prop + "Label");
		(where !== null) && where.classList.remove("invalidValue");
	}
	const generateLabel = () => {
		let v = $i("newCatTitle").value as string;
		let cap = v.charAt(0).toUpperCase();
		let label = cap;
		let keepLooking = !cap;
		// Check for 1-letter version
		if(catMap.has(cap)) {
			// Look for 2-letter version
			v = v.replace(/[^0-9a-zA-Z]/g, "").slice(1).toLowerCase();
			let l = v.length;
			let pointer = -1;
			keepLooking = true;
			do {
				pointer++;
				label = cap + v.charAt(pointer);
				if(!catMap.has(label)) {
					keepLooking = false;
					pointer = l;
				}
			} while (pointer < l);
			if(keepLooking) {
				// Look for 3-letter version
				pointer = -1;
				do {
					let p2 = ++pointer;
					label = cap + v.charAt(pointer);
					do {
						p2++;
						label = label + v.charAt(p2);
						if(!catMap.has(label)) {
							keepLooking = false;
							p2 = l;
						}
					} while(p2 < l);
				} while (pointer < l && keepLooking);
			}
		}
		if(keepLooking) {
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
			$i("shortLabel").value = label;
		}
	};
	const maybeSaveNewCat = () => {
		let err: string[] = [];
		// Test info for validness, then save if needed and reset the newCat
		if(newCat.title === "") {
			$q(".titleLabel").classList.add("invalidValue");
			err.push("No title present");
		}
		if(newCat.label === "") {
			$q(".labelLabel").classList.add("invalidValue");
			err.push("No label present");
		} else if (catMap.has(newCat.label)) {
			$q(".labelLabel").classList.add("invalidValue");
			err.push("There is already a label \"" + newCat.label + "\"");
		}
		if(newCat.run === "") {
			$q(".runLabel").classList.add("invalidValue");
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
		dispatch(closeModal('AddCategory'));
		dispatch(addCategory(newCat));
		hardReset();
		fireSwal({
			title: "Category added!",
			toast: true,
			position: 'bottom',
			timer: 2500,
			timerProgressBar: true,
			showConfirmButton: false
		});
	};
	return (
		<IonModal isOpen={modalState.AddCategory} onDidDismiss={() => dispatch(closeModal('AddCategory'))}>
			<IonHeader>
				<IonToolbar color="primary">
					<IonTitle>Add Category</IonTitle>
					<IonButtons slot="end">
						<IonButton onClick={() => dispatch(closeModal('AddCategory'))}>
							<IonIcon icon={closeCircleOutline} />
						</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<IonList lines="none">
					<IonItem>
						<IonLabel className="titleLabel" position="stacked" style={ {fontSize: "20px"} }>Category Description:</IonLabel>
						<IonInput id="newCatTitle" className="ion-margin-top" placeholder="Type description here" onIonChange={e => setNewInfo("title", e.detail.value!.trim())} autocomplete="on" debounce={500}></IonInput>
					</IonItem>
					<IonItem>
						<IonLabel className="ion-margin-end labelLabel">Short Label:</IonLabel>
						<IonInput id="shortLabel" placeholder="1-3 characters" onIonChange={e => setNewInfo("label", e.detail.value!.trim())} maxlength={3}></IonInput>
						<IonButton slot="end" onClick={() => generateLabel()}>
							<IonIcon icon={chevronBackOutline} />Suggest
						</IonButton>
					</IonItem>
					<IonItem>
						<IonLabel className="runLabel" position="stacked" style={ {fontSize: "20px"} }>Letters/Characters:</IonLabel>
						<IonInput className="categoryRun ion-margin-top" placeholder="Enter letters/characters in category here" onIonChange={e => setNewInfo("run", e.detail.value!.trim())}></IonInput>
					</IonItem>
				</IonList>
			</IonContent>
			<IonFooter>
				<IonToolbar>
					<IonButton color="secondary" slot="end" onClick={() => maybeSaveNewCat()}>
						<IonIcon icon={addOutline} slot="start" />
						<IonLabel>Add Category</IonLabel>
					</IonButton>
				</IonToolbar>
			</IonFooter>
		</IonModal>
	);
};

export default AddCategoryModal;
