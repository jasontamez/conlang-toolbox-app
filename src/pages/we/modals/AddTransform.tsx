import React, { useState } from 'react';
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
	IonItemDivider,
	IonRadioGroup,
	IonRadio,
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

import { WETransformDirection, ExtraCharactersModalOpener } from '../../../store/types';
import { addTransformWE } from '../../../store/weSlice';

import { $q, $a, $i } from '../../../components/DollarSignExports';
import toaster from '../../../components/toaster';

const AddTransformModal = (props: ExtraCharactersModalOpener) => {
	const { isOpen, setIsOpen, openECM } = props;
	const dispatch = useDispatch();
	const [doAlert] = useIonAlert();
	const toast = useIonToast();
	const [ direction, setDirection ] = useState<WETransformDirection>("both");
	function resetError(prop: string) {
		// Remove danger color if present
		// Debounce means this sometimes doesn't exist by the time this is called.
		const where = $q("." + prop + "Label");
		(where !== null) && where.classList.remove("invalidValue");
	}
	const maybeSaveNewTransform = (close: boolean = true) => {
		const err: string[] = [];
		const seek = $i("searchExWE").value || "";
		// Test info for validness, then save if needed and reset the newTransform
		if(seek === "") {
			$q(".seekLabel").classList.add("invalidValue");
			err.push("No search expression present");
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
				cssClass: "danger",
				message: err.join("; "),
				buttons: [
					{
						text: "Cancel",
						role: "cancel",
						cssClass: "cancel"
					}
				]
			});
			return;
		}
		// Everything ok!
		const replace = $i("replaceExWE").value || "";
		const description = $i("optDescWE").value || "";
		close && setIsOpen(false);
		dispatch(addTransformWE({
			id: uuidv4(),
			seek,
			replace,
			direction,
			description
		}));
		$a("ion-list.weAddTransform ion-input").forEach((input: HTMLInputElement) => input.value = "");
		$q("ion-list.weAddTransform ion-radio-group").value = "both";
		toaster({
			message: "Transform added!",
			duration: 2500,
			color: "success",
			position: "top",
			toast
		});
	};
	return (
		<IonModal isOpen={isOpen} onDidDismiss={() => setIsOpen(false)}>
			<IonHeader>
				<IonToolbar color="primary">
					<IonTitle>Add Transform</IonTitle>
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
				<IonList lines="none" className="hasSpecialLabels weAddTransform">
					<IonItem className="labelled">
						<IonLabel className="seekLabel">Input Expression:</IonLabel>
					</IonItem>
					<IonItem>
						<IonInput
							aria-label="Input expression"
							id="searchExWE"
							className="ion-margin-top serifChars"
							placeholder="..."
							onIonChange={e => resetError("seek")}
						></IonInput>
					</IonItem>
					<IonItem className="labelled">
						<IonLabel className="replaceLabel">Output Expression:</IonLabel>
					</IonItem>
					<IonItem>
						<IonInput
							aria-label="Output expression"
							id="replaceExWE"
							className="ion-margin-top serifChars"
							placeholder="..."
						></IonInput>
					</IonItem>
					<IonItem className="labelled">
						<IonLabel>Transform Description:</IonLabel>
					</IonItem>
					<IonItem>
						<IonInput
							aria-label="Description of the transform"
							id="optDescWE"
							className="ion-margin-top"
							placeholder="(optional)"
						></IonInput>
					</IonItem>
					<IonItemDivider>
						<IonLabel>Transform Direction:</IonLabel>
					</IonItemDivider>
					<IonRadioGroup
						value={direction}
						onIonChange={e => setDirection(e.detail.value as WETransformDirection)}
					>
						<IonItem>
							<IonRadio
								value="both"
								labelPlacement="end"
								justify="start"
							>At Input, Then Undo At Output</IonRadio>
						</IonItem>
						<IonItem>
							<IonRadio
								value="double"
								labelPlacement="end"
								justify="start"
							>At Input and At Output</IonRadio>
						</IonItem>
						<IonItem>
							<IonRadio
								value="in"
								labelPlacement="end"
								justify="start"
							>At Input Only</IonRadio>
						</IonItem>
						<IonItem>
							<IonRadio
								value="out"
								labelPlacement="end"
								justify="start"
							>At Output Only</IonRadio>
						</IonItem>
					</IonRadioGroup>
				</IonList>
			</IonContent>
			<IonFooter>
				<IonToolbar>
				<IonButton
					color="tertiary"
					slot="end"
					onClick={() => maybeSaveNewTransform(false)}
				>
						<IonIcon icon={addOutline} slot="start" />
						<IonLabel>Add Transform</IonLabel>
					</IonButton>
					<IonButton
						color="success"
						slot="end"
						onClick={() => maybeSaveNewTransform()}
					>
						<IonIcon icon={addOutline} slot="start" />
						<IonLabel>Add and Close</IonLabel>
					</IonButton>
				</IonToolbar>
			</IonFooter>
		</IonModal>
	);
};

export default AddTransformModal;
