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
	saveOutline,
	trashOutline,
	globeOutline
} from 'ionicons/icons';
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { ExtraCharactersModalOpener, WGTransformObject } from '../../components/ReduxDucksTypes';
import {
	doEditTransformWG,
	cancelEditTransformWG,
	deleteTransformWG
} from '../../components/ReduxDucksFuncs';
import repairRegexErrors from '../../components/RepairRegex';
import { $q } from '../../components/DollarSignExports';
import ltr from '../../components/LTR';
import yesNoAlert from '../../components/yesNoAlert';

const EditTransformModal = (props: ExtraCharactersModalOpener) => {
	const { isOpen, setIsOpen, openECM } = props;
	const hardReset = () => {
		editingTransform = {
			key: "",
			seek: "",
			replace: "",
			description: ""
		};
	};
	const dispatch = useDispatch();
	const [doAlert] = useIonAlert();
	const [doToast] = useIonToast();
	const [
		settings,
		transformsObject
	] = useSelector((state: any) => [
		state.appSettings,
		state.wordgenTransforms
	], shallowEqual)
	const editing = transformsObject.editing;
	let editingTransform: WGTransformObject = {
		key: "",
		seek: "",
		replace: "",
		description: ""
	};
	let currentTransform: WGTransformObject;
	transformsObject.list.every((transform: WGTransformObject) => {
		if(transform.key === editing) {
			editingTransform = {
				...transform
			};
			currentTransform = transform;
			return false;
		}
		return true;
	});
	const cancelEditing = () => {
		dispatch(cancelEditTransformWG(editing));
		setIsOpen(false);
	};
	function setNewInfo<
		KEY extends keyof WGTransformObject,
		VAL extends WGTransformObject[KEY]
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
		editingTransform.seek = repairRegexErrors(editingTransform.seek);
		editingTransform.replace = repairRegexErrors(editingTransform.replace);
		setIsOpen(false);
		dispatch(doEditTransformWG(editingTransform));
		hardReset();
		doToast({
			message: "Transformation saved!",
			duration: 2500,
			cssClass: "success"
		});
	};
	const maybeDeleteTransform = () => {
		$q(".transforms").closeSlidingItems();
		const handler = () => {
			setIsOpen(false);
			dispatch(deleteTransformWG(currentTransform));
			doToast({
				message: "Transformation deleted.",
				duration: 2500,
				cssClass: "danger"
			});
		};
		if(settings.disableConfirms) {
			handler();
		} else {
			const { seek, replace } = currentTransform;
			yesNoAlert({
				header: `${seek}${ltr() ? "⟶" : "⟵"}${replace}`,
				message: "Are you sure you want to delete this? It cannot be undone.",
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
					<IonTitle>Edit Transformation</IonTitle>
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
						<IonLabel className="seekLabel ">Search Expression:</IonLabel>
					</IonItem>
					<IonItem>
						<IonInput aria-label="Search expression" id="searchEx" className="ion-margin-top serifChars" value={editingTransform!.seek} onIonChange={e => setNewInfo("seek", (e.detail.value as string).trim())}></IonInput>
					</IonItem>
					<IonItem className="labelled">
						<IonLabel className="replaceLabel">Replacement Expression:</IonLabel>
					</IonItem>
					<IonItem>
						<IonInput aria-label="Replacement expression" id="replaceEx" className="ion-margin-top serifChars" value={editingTransform!.replace} onIonChange={e => setNewInfo("replace", (e.detail.value as string).trim())}></IonInput>
					</IonItem>
					<IonItem className="labelled">
						<IonLabel>Transformation Description:</IonLabel>
					</IonItem>
					<IonItem>
						<IonInput aria-label="Description of transformation" id="optDesc" className="ion-margin-top" value={editingTransform!.description} placeholder="(optional)" onIonChange={e => setNewInfo("description", (e.detail.value as string).trim())}></IonInput>
					</IonItem>
				</IonList>
			</IonContent>
			<IonFooter>
				<IonToolbar>
					<IonButton color="tertiary" slot="end" onClick={() => maybeSaveNewTransformInfo()}>
						<IonIcon icon={saveOutline} slot="start" />
						<IonLabel>Save Transformation</IonLabel>
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
