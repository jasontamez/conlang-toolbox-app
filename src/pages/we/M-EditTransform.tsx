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
	IonRadioGroup,
	IonRadio,
	IonItemDivider,
	useIonAlert,
	useIonToast
} from '@ionic/react';
import {
	closeCircleOutline,
	saveOutline,
	trashOutline,
	globeOutline
} from 'ionicons/icons';
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { ExtraCharactersModalOpener, WETransformObject } from '../../components/ReduxDucksTypes';
import {
	doEditTransformWE,
	cancelEditTransformWE,
	deleteTransformWE
} from '../../components/ReduxDucksFuncs';
import { $q } from '../../components/DollarSignExports';
import ltr from '../../components/LTR';
import yesNoAlert from '../../components/yesNoAlert';
import toaster from '../../components/toaster';

const EditTransformModal = (props: ExtraCharactersModalOpener) => {
	const { isOpen, setIsOpen, openECM } = props;
	const hardReset = () => {
		editingTransform = {
			key: "",
			seek: "",
			replace: "",
			direction: "both",
			description: ""
		};
	};
	const dispatch = useDispatch();
	const [doAlert] = useIonAlert();
	const [doToast, undoToast] = useIonToast();
	const [
		transformsObject,
		settings
	] = useSelector((state: any) => [
		state.wordevolveTransforms,
		state.appSettings
	], shallowEqual);
	const editing = transformsObject.editing;
	let editingTransform: WETransformObject = {
		key: "",
		seek: "",
		replace: "",
		direction: "both",
		description: ""
	};
	let currentTransform: WETransformObject;
	transformsObject.list.every((trans: WETransformObject) => {
		if(trans.key === editing) {
			editingTransform = {
				...trans
			};
			currentTransform = trans;
			return false;
		}
		return true;
	});
	const cancelEditing = () => {
		dispatch(cancelEditTransformWE(editing));
		setIsOpen(false);
	};
	function setNewInfo<
		KEY extends keyof WETransformObject,
		VAL extends WETransformObject[KEY]
	>(prop: KEY, value: VAL) {
		// Set the property
		editingTransform[prop] = value;
		// Remove danger color if present
		// Debounce means this sometimes doesn't exist by the time this is called.
		const where = $q("." + prop + "Label");
		(where !== null) && where.classList.remove("invalidValue");
	}
	const maybeSaveNewTransformInfo = () => {
		const err: string[] = [];
		// Test info for validness, then save if needed and reset the editingTransform
		if(editingTransform.seek === "") {
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
		setIsOpen(false);
		dispatch(doEditTransformWE(editingTransform));
		hardReset();
		toaster({
			message: "Transform saved!",
			duration: 2500,
			color: "success",
			doToast,
			undoToast
		});
	};
	const maybeDeleteTransform = () => {
		const makeArrow = (dir: string) => (dir === "both" ? "⟷" : ((ltr() ? dir === "in" : dir === "out") ? "⟶" : "⟵"));
		$q(".transforms").closeSlidingItems();
		const handler = () => {
			setIsOpen(false);
			dispatch(deleteTransformWE(currentTransform));
			toaster({
				message: "Transform deleted.",
				duration: 2500,
				color: "danger",
				doToast,
				undoToast
			});
		};
		if(settings.disableConfirms) {
			handler();
		} else {
			const { seek, direction, replace } = currentTransform;
			yesNoAlert({
				header: `${seek} ${makeArrow(direction)} ${replace}`,
				message: "Are you sure you want to delete this? This cannot be undone.",
				cssClass: "danger",
				submit: "Yes, delete it",
				handler,
				doAlert
			});
		}
	};
	return (
		<IonModal isOpen={isOpen} onDidDismiss={() => setIsOpen(false)}>
			<IonHeader>
				<IonToolbar color="primary">
					<IonTitle>Edit Transform</IonTitle>
					<IonButtons slot="end">
						<IonButton onClick={() => openECM(true)}>
							<IonIcon icon={globeOutline} />
						</IonButton>
						<IonButton onClick={() => cancelEditing()}>
							<IonIcon icon={closeCircleOutline} />
						</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<IonList lines="none" className="hasSpecialLabels">
					<IonItem className="labelled">
						<IonLabel className="seekLabel">Input Expression:</IonLabel>
					</IonItem>
					<IonItem>
						<IonInput aria-label="Input expression" id="searchEx" className="ion-margin-top serifChars" value={editingTransform!.seek} onIonChange={e => setNewInfo("seek", (e.detail.value as string).trim())}></IonInput>
					</IonItem>
					<IonItem className="labelled">
						<IonLabel className="replaceLabel">Output Expression:</IonLabel>
					</IonItem>
					<IonItem>
						<IonInput aria-label="Output expression" id="replaceEx" className="ion-margin-top serifChars" value={editingTransform!.replace} onIonChange={e => setNewInfo("replace", (e.detail.value as string).trim())}></IonInput>
					</IonItem>
					<IonItem className="labelled">
						<IonLabel>Transform Description:</IonLabel>
					</IonItem>
					<IonItem>
						<IonInput aria-label="Description of the transform" id="optDesc" className="ion-margin-top" value={editingTransform!.description} placeholder="(optional)" onIonChange={e => setNewInfo("description", (e.detail.value as string).trim())}></IonInput>
					</IonItem>
					<IonItemDivider>
						<IonLabel>Transform Direction:</IonLabel>
					</IonItemDivider>
					<IonRadioGroup value={editingTransform!.direction} onIonChange={e => setNewInfo("direction", e.detail.value as "both" | "in" | "out" | "double")}>
						<IonItem>
							<IonRadio value="both" labelPlacement="end" justify="start">At Input, Then Undo At Output</IonRadio>
						</IonItem>
						<IonItem>
							<IonRadio value="double" labelPlacement="end" justify="start">At Input and At Output</IonRadio>
						</IonItem>
						<IonItem>
							<IonRadio value="in" labelPlacement="end" justify="start">At Input Only</IonRadio>
						</IonItem>
						<IonItem>
							<IonRadio value="out" labelPlacement="end" justify="start">At Output Only</IonRadio>
						</IonItem>
					</IonRadioGroup>
				</IonList>
			</IonContent>
			<IonFooter>
				<IonToolbar>
					<IonButton color="tertiary" slot="end" onClick={() => maybeSaveNewTransformInfo()}>
						<IonIcon icon={saveOutline} slot="start" />
						<IonLabel>Save Transform</IonLabel>
					</IonButton>
					<IonButton color="danger" slot="start" onClick={() => maybeDeleteTransform()}>
						<IonIcon icon={trashOutline} slot="start" />
						<IonLabel>Delete Item</IonLabel>
					</IonButton>
				</IonToolbar>
			</IonFooter>
		</IonModal>
	);
};

export default EditTransformModal;
