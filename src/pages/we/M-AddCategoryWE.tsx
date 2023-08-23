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
	chevronBackOutline,
	globeOutline
} from 'ionicons/icons';
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { WECategoryObject } from '../../components/ReduxDucksTypes';
import { openModal, closeModal, addCategoryWE } from '../../components/ReduxDucksFuncs';
import fireSwal from '../../components/Swal';
import { $q, $a, $i } from '../../components/DollarSignExports';

const AddCategoryWEModal = () => {
	let newCat: WECategoryObject = {
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
		$a("ion-input").forEach((input: HTMLInputElement) => input.value = "");
	};
	const dispatch = useDispatch();
	const categoryObject = useSelector((state: any) => state.wordevolveCategories, shallowEqual);
	const catMap = new Map(categoryObject.map);
	const modalState = useSelector((state: any) => state.modalState, shallowEqual);
	function setNewInfo<
		KEY extends keyof WECategoryObject,
		VAL extends WECategoryObject[KEY]
	>(prop: KEY, value: VAL) {
		// Set the property
		newCat[prop] = value;
		// Remove danger color if present
		// Debounce means this sometimes doesn't exist by the time this is called.
		let where = $q("." + prop + "Label");
		(where !== null) && where.classList.remove("invalidValue");
	}
	const generateLabel = () => {
		let v = ($i("newCatTitle").value as string).toUpperCase().replace(/[^A-Z0-9]/g, "");
		let length = v.length;
		let pos = 0;
		let label = null;
		while(!label && pos < length) {
			let test = v.charAt(pos);
			if(!catMap.has(test)) {
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
			$i("shortLabel").value = label;
		}
	};
	const maybeSaveNewCat = (close: boolean = true) => {
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
		} else {
			let invalid = "^$\\[]{}.*+()?|";
			if (invalid.indexOf(newCat.label as string) !== -1) {
				$q(".labelLabel").classList.add("invalidValue");
				err.push("You cannot use \"" + newCat.label + "\" as a label.");
			}
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
		close && dispatch(closeModal('AddCategoryWE'));
		dispatch(addCategoryWE(newCat));
		hardReset();
		fireSwal({
			title: "Character Group added!",
			toast: true,
			timer: 2500,
			timerProgressBar: true,
			showConfirmButton: false
		});
	};
	return (
		<IonModal isOpen={modalState.AddCategoryWE} onDidDismiss={() => dispatch(closeModal('AddCategoryWE'))}>
			<IonHeader>
				<IonToolbar color="primary">
					<IonTitle>Add Character Group</IonTitle>
					<IonButtons slot="end">
						<IonButton onClick={() => dispatch(openModal("ExtraCharacters"))}>
							<IonIcon icon={globeOutline} />
						</IonButton>
						<IonButton onClick={() => dispatch(closeModal('AddCategoryWE'))}>
							<IonIcon icon={closeCircleOutline} />
						</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<IonList lines="none" className="hasSpecialLabels">
					<IonItem className="labelled">
						<IonLabel className="titleLabel">Title/Description:</IonLabel>
					</IonItem>
					<IonItem>
						<IonInput aria-label="Title/Description" id="newCatTitle" className="ion-margin-top" placeholder="Type description here" onIonChange={e => setNewInfo("title", (e.detail.value as string).trim())} autocomplete="on" debounce={250}></IonInput>
					</IonItem>
					<IonItem style={{marginTop: "0.25rem"}}>
						<div slot="start" className="ion-margin-end labelLabelEdit">Short Label:</div>
						<IonInput id="shortLabel" label="Short Label:" aria-label="Short Label" labelPlacement="start" className="serifChars" placeholder="1 character only" onIonChange={e => setNewInfo("label", (e.detail.value as string).trim())} maxlength={1}></IonInput>
						<IonButton slot="end" onClick={() => generateLabel()}>
							<IonIcon icon={chevronBackOutline} />Suggest
						</IonButton>
					</IonItem>
					<IonItem className="labelled">
						<IonLabel className="runLabel">Letters/Characters:</IonLabel>
					</IonItem>
					<IonItem>
						<IonInput aria-label="Letters/Characters" className="importantElement ion-margin-top serifChars" placeholder="Enter characters in group here" onIonChange={e => setNewInfo("run", (e.detail.value as string).trim())} debounce={250}></IonInput>
					</IonItem>
				</IonList>
			</IonContent>
			<IonFooter>
				<IonToolbar>
					<IonButton color="secondary" slot="end" onClick={() => maybeSaveNewCat(false)}>
						<IonIcon icon={addOutline} slot="start" />
						<IonLabel>Add Character Group</IonLabel>
					</IonButton>
					<IonButton color="success" slot="end" onClick={() => maybeSaveNewCat()}>
						<IonIcon icon={addOutline} slot="start" />
						<IonLabel>Add and Close</IonLabel>
					</IonButton>
				</IonToolbar>
			</IonFooter>
		</IonModal>
	);
};

export default AddCategoryWEModal;
