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
	useIonAlert,
	useIonToast
} from '@ionic/react';
import {
	closeCircleOutline,
	addOutline,
	globeOutline
} from 'ionicons/icons';
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from 'uuid';

import { addTransformWG } from '../../components/ReduxDucksFuncs';
import { ExtraCharactersModalOpener } from '../../components/ReduxDucksTypes';
import { $q, $a, $i } from '../../components/DollarSignExports';
import repairRegexErrors from '../../components/RepairRegex';
import toaster from '../../components/toaster';

const AddTransformModal = (props: ExtraCharactersModalOpener) => {
	const { isOpen, setIsOpen, openECM } = props;
	const dispatch = useDispatch();
	const [doAlert] = useIonAlert();
	const [doToast, undoToast] = useIonToast();
	function resetError(prop: string) {
		// Remove danger color if present
		// Debounce means this sometimes doesn't exist by the time this is called.
		const where = $q("." + prop + "Label");
		(where !== null) && where.classList.remove("invalidValue");
	}
	const maybeSaveNewTransform = (close: boolean = true) => {
		const err: string[] = [];
		// Test info for validness, then save if needed and reset the newTransform
		const seek = $i("searchEx").value || "";
		if(seek === "") {
			$q(".seekLabel").classList.add("invalidValue");
			err.push("No search expression present");
		}
		if(err.length > 0) {
			// Errors found.
			doAlert({
				header: "Error",
				message: err.join("; "),
				buttons: [
					{
						text: "Cancel",
						role: "cancel"
					}
				]
			});
			return;
		}
		// Everything ok!
		const replace = repairRegexErrors($i("replaceEx").value || "");
		const description = $i("optDesc").value || "";
		close && setIsOpen(false);
		dispatch(addTransformWG({
			key: uuidv4(),
			seek: repairRegexErrors(seek),
			replace,
			description
		}));
		$a("ion-list.wgAddTransform ion-input").forEach((input: HTMLInputElement) => input.value = "");
		toaster({
			message: "Transformation added!",
			duration: 2500,
			color: "success",
			doToast,
			undoToast
		});
	};
	return (
		<IonModal isOpen={isOpen} onDidDismiss={() => setIsOpen(false)}>
			<IonHeader>
				<IonToolbar color="primary">
					<IonTitle>Add Transformation</IonTitle>
					<IonButtons slot="end">
						<IonButton onClick={() => openECM(true)}>
							<IonIcon icon={globeOutline} />
						</IonButton>
						<IonButton onClick={() => setIsOpen(false)}>
							<IonIcon icon={closeCircleOutline} />
						</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<IonList lines="none" className="hasSpecialLabels wgAddTransform">
					<IonItem className="labelled">
						<IonLabel className="seekLabel">Search Expression:</IonLabel>
					</IonItem>
					<IonItem>
						<IonInput aria-label="Search expression" id="searchEx" className="ion-margin-top serifChars" placeholder="..." onIonChange={e => resetError("seek")}></IonInput>
					</IonItem>
					<IonItem className="labelled">
						<IonLabel className="replaceLabel">Replacement Expression:</IonLabel>
					</IonItem>
					<IonItem>
						<IonInput aria-label="Replacement expression" id="replaceEx" className="ion-margin-top serifChars" placeholder="..."></IonInput>
					</IonItem>
					<IonItem className="labelled">
						<IonLabel>Transformation Description:</IonLabel>
					</IonItem>
					<IonItem>
						<IonInput aria-label="Transformation description" id="optDesc" className="ion-margin-top" placeholder="(optional)"></IonInput>
					</IonItem>
				</IonList>
			</IonContent>
			<IonFooter>
				<IonToolbar>
				<IonButton color="tertiary" slot="end" onClick={() => maybeSaveNewTransform(false)}>
						<IonIcon icon={addOutline} slot="start" />
						<IonLabel>Add Transformation</IonLabel>
					</IonButton>
					<IonButton color="success" slot="end" onClick={() => maybeSaveNewTransform()}>
						<IonIcon icon={addOutline} slot="start" />
						<IonLabel>Add and Close</IonLabel>
					</IonButton>
				</IonToolbar>
			</IonFooter>
		</IonModal>
	);
};

export default AddTransformModal;
