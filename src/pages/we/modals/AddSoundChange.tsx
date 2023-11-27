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

import { addSoundChangeWE } from '../../../store/weSlice';
import { ExtraCharactersModalOpener } from '../../../store/types';

import { $q, $a, $i } from '../../../components/DollarSignExports';
import repairRegexErrors from '../../../components/RepairRegex';
import toaster from '../../../components/toaster';

const AddSoundChangeModal = (props: ExtraCharactersModalOpener) => {
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
	const maybeSaveNewSoundChange = (close: boolean = true) => {
		const err: string[] = [];
		const contextTest = (context: string, what: string = "Context") => {
			let ind = context.indexOf("_");
			if(ind === -1) {
				return what + " must contain one underscore (_)";
			} else if (context.indexOf("_", ind+1) !== -1) {
				return what + " can only have one underscore (_)";
			}
			const max = context.length - 1;
			ind = context.indexOf("#");
			while(ind !== -1) {
				if(ind > 0 && ind !== max) {
					return what + " can only have word-boundaries (#) at beginning and/or end";
				}
				ind = context.indexOf("#", (ind + 1));
			}
			return false;
		};
		// Test info for validness, then save if needed and reset the newSoundChange
		let temp: boolean | string;
		const seek = $i("searchExWESC").value || "";
		const context = $i("contextExWESC").value || "_";
		const anticontext = $i("antiExWESC").value || "";
		if(seek === "") {
			$q(".seekLabel").classList.add("invalidValue");
			err.push("No search expression present");
		}
		if((temp = contextTest(context))) {
			$q(".contextLabel").classList.add("invalidValue");
			err.push(temp);
		}
		if(anticontext && (temp = contextTest(anticontext, "Anticontext"))) {
			$q(".anticontextLabel").classList.add("invalidValue");
			err.push(temp);
		}
		try {
			new RegExp(seek);
		} catch(e) {
			err.push(`${e}`);
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
		// Fix any possible regex problems
		const replace = repairRegexErrors($i("replaceExWESC").value || "");
		const description = $i("optDescWESC").value.trim() || "";
		close && setIsOpen(false);
		dispatch(addSoundChangeWE({
			id: uuidv4(),
			seek: repairRegexErrors(seek),
			replace,
			context: repairRegexErrors(context),
			anticontext: repairRegexErrors(anticontext),
			description
		}));
		$a("ion-list.addSoundChangeWE ion-input").forEach(
			(input: HTMLInputElement) => input.value = ""
		);
		toaster({
			message: "Sound Change added!",
			duration: 2500,
			color: "success",
			position: "top",
			doToast,
			undoToast
		});
	};
	return (
		<IonModal isOpen={isOpen} onDidDismiss={() => setIsOpen(false)}>
			<IonHeader>
				<IonToolbar color="primary">
					<IonTitle>Add Sound Change</IonTitle>
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
				<IonList lines="none" className="hasSpecialLabels addSoundChangeWE">
					<IonItem className="labelled">
						<IonLabel className="seekLabel">Search Expression:</IonLabel>
					</IonItem>
					<IonItem>
						<IonInput
							aria-label="Search Expression"
							id="searchExWESC"
							className="ion-margin-top serifChars"
							placeholder="Sound..."
							onIonChange={e => resetError("seek")}
						></IonInput>
					</IonItem>
					<IonItem className="labelled">
						<IonLabel className="replaceLabel">Replace Expression:</IonLabel>
					</IonItem>
					<IonItem>
						<IonInput
							aria-label="Replace Expression"
							id="replaceExWESC"
							className="ion-margin-top serifChars"
							placeholder="Changes into..."
						></IonInput>
					</IonItem>
					<IonItem className="labelled">
						<IonLabel className="contextLabel">Context Expression:</IonLabel>
					</IonItem>
					<IonItem>
						<IonInput
							aria-label="Context Expression"
							id="contextExWESC"
							className="ion-margin-top serifChars"
							placeholder="Where the change takes place"
							onIonChange={e => resetError("context")}
						></IonInput>
					</IonItem>
					<IonItem className="labelled">
						<IonLabel className="anticontextLabel">Anticontext Expression:</IonLabel>
					</IonItem>
					<IonItem>
						<IonInput
							aria-label="Anticontext Expression"
							id="antiExWESC"
							className="ion-margin-top serifChars"
							placeholder="Where it doesn't"
							onIonChange={e => resetError("anticontext")}
						></IonInput>
					</IonItem>
					<IonItem className="labelled">
						<IonLabel>Sound Change Description:</IonLabel>
					</IonItem>
					<IonItem>
						<IonInput
							aria-label="Sound Change Description"
							id="optDescWESC"
							className="ion-margin-top"
							placeholder="(optional)"
						></IonInput>
					</IonItem>
				</IonList>
			</IonContent>
			<IonFooter>
				<IonToolbar>
					<IonButton
						color="primary"
						slot="end"
						onClick={() => maybeSaveNewSoundChange(false)}
					>
						<IonIcon icon={addOutline} slot="start" />
						<IonLabel>Add Sound Change</IonLabel>
					</IonButton>
					<IonButton
						color="success"
						slot="end"
						onClick={() => maybeSaveNewSoundChange()}
					>
						<IonIcon icon={addOutline} slot="start" />
						<IonLabel>Add and Close</IonLabel>
					</IonButton>
				</IonToolbar>
			</IonFooter>
		</IonModal>
	);
};

export default AddSoundChangeModal;
