import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
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
	IonToggle,
	IonSelect,
	IonSelectOption,
	IonItemDivider
} from '@ionic/react';
import {
	closeCircleOutline,
	saveOutline,
	globeOutline
} from 'ionicons/icons';
import { v4 as uuidv4 } from 'uuid';

import {
	DJIdentifier,
	DJSeparator,
	ExtraCharactersModalOpener
} from '../../../store/types';
import { addIdentifier } from '../../../store/declenjugatorSlice';

import { $i } from '../../../components/DollarSignExports';
import toaster from '../../../components/toaster';
import yesNoAlert from '../../../components/yesNoAlert';

function clearBlanks (input: string[]) {
	return input.filter(line => line);
}

const AddDeclenjugation = (props: ExtraCharactersModalOpener) => {
	const {
		isOpen,
		setIsOpen,
		openECM
	} = props;
	const dispatch = useDispatch();
	const [doAlert] = useIonAlert();
	const [doToast, undoToast] = useIonToast();
	const [usingAND, setUsingAND] = useState<boolean>(false);
	const [inverse, setInverse] = useState<boolean>(false);
	const [separator, setSeparator] = useState<DJSeparator>(" ");
	const onLoad = useCallback(() => {
		setIsOpen(false);
		setUsingAND(false);
		setSeparator(" ");
		const addTitle = $i("addTitle");
		addTitle && (addTitle.value = "");
		const addStarts = $i("addStarts");
		addStarts && (addStarts.value = "");
		const addEnds = $i("addEnds");
		addEnds && (addEnds.value = "");
		const addRegex = $i("addRegex");
		addRegex && (addRegex.value = "");
	}, [setIsOpen]);
	const grabInfo = () => {
		const addTitle = $i("addTitle");
		const title = addTitle ? addTitle.value.trim() : "";
		const addEquals = $i("addEquals");
		const equals: string[] = addEquals && addEquals.value ? clearBlanks(addEquals.value.split(separator)) : [];
		const addStarts = $i("addStarts");
		const startsWith: string[] = addStarts && addStarts.value ? clearBlanks(addStarts.value.split(separator)) : [];
		const addEnds = $i("addEnds");
		const endsWith: string[] = addEnds && addEnds.value ? clearBlanks(addEnds.value.split(separator)) : [];
		const addRegex = $i("addRegex");
		const regex: string[] = addRegex && addRegex.value ? clearBlanks(addRegex.value.split(separator)) : [];
		return {
			title,
			equals,
			startsWith,
			endsWith,
			regex
		};
	};
	const maybeSaveNewIdentifier = () => {
		const {
			title,
			equals,
			startsWith,
			endsWith,
			regex
		} = grabInfo();
		if(!title) {
			doAlert({
				message: "You must provide a title or description before saving.",
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
		} else if(equals.length + startsWith.length + endsWith.length + regex.length === 0) {
			doAlert({
				message: "You must provide at least one condition (equal, start, end or regex) before saving.",
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
		const newID: DJIdentifier = {
			id: uuidv4(),
			title,
			usingAND,
			inverse,
			equals,
			startsWith,
			endsWith,
			regex,
			separator
		};
		dispatch(addIdentifier(newID));
		setIsOpen(false);
		toaster({
			message: "Identifier saved.",
			position: "middle",
			color: "success",
			duration: 2000,
			doToast,
			undoToast
		});
	};
	const maybeCancel = () => {
		const {
			title,
			equals,
			startsWith,
			endsWith,
			regex
		} = grabInfo();
		if(title || (equals.length + startsWith.length + endsWith.length + regex.length === 0)) {
			return yesNoAlert({
				header: "Unsaved Info",
				message: "Are you sure you want to discard this?",
				cssClass: "warning",
				submit: "Yes, Close",
				handler: () => setIsOpen(false),
				doAlert
			});
		}
		setIsOpen(false);
	};
	return (
		<IonModal isOpen={isOpen} backdropDismiss={false} onIonModalDidPresent={onLoad}>
			<IonHeader>
				<IonToolbar color="primary">
					<IonTitle>Add Identifier</IonTitle>
					<IonButtons slot="end">
						<IonButton onClick={() => openECM(true)}>
							<IonIcon icon={globeOutline} />
						</IonButton>
						<IonButton onClick={maybeCancel}>
							<IonIcon icon={closeCircleOutline} />
						</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<IonList lines="full" id="addingDJColumnIdentifierList">
					<IonItem>
						<IonInput
							label="Title/Description"
							id="addTitle"
							labelPlacement="stacked"
						/>
					</IonItem>
					<IonItem className="wrappableInnards">
						<IonToggle
							labelPlacement="start"
							enableOnOffLabels
							checked={usingAND}
							onIonChange={e => setUsingAND(!usingAND)}
						>
							<h2>Match All Conditions</h2>
							<p>If off, only one condition needs to be matched.</p>
							<div>Off: <em>"Starts with 'en'"</em> and <em>"Ends with 'en'"</em> does not match <em>'enter' or 'men'</em></div>
							<div>On: <em>"Starts with 'en'"</em> and <em>"Ends with 'en'"</em> matches both <em>'enter' and 'men'</em></div>
						</IonToggle>
					</IonItem>
					<IonItem className="wrappableInnards">
						<IonToggle
							labelPlacement="start"
							enableOnOffLabels
							checked={inverse}
							onIonChange={e => setInverse(!inverse)}
						>
							<h2>Reverse Conditions</h2>
							<p>If on, the opposite of the condition needs to be matched.</p>
							<div>Off: <em>"Starts with 'en'"</em> matches <em>'enter'</em> and not <em>'men'</em></div>
							<div>On: <em>"Starts with 'en'"</em> matches <em>'men'</em> but not <em>'enter'</em></div>
						</IonToggle>
					</IonItem>
					<IonItemDivider>Conditions</IonItemDivider>
					<IonItem>
						<IonInput
							label="Info Is Exactly..."
							id="addEquals"
							labelPlacement="stacked"
						/>
					</IonItem>
					<IonItem>
						<IonInput
							label="Info Starts With..."
							id="addStarts"
							labelPlacement="stacked"
						/>
					</IonItem>
					<IonItem>
						<IonInput
							label="Info Ends With..."
							id="addEnds"
							labelPlacement="stacked"
						/>
					</IonItem>
					<IonItem>
						<IonInput
							label="Info Matches Regex:"
							id="addRegex"
							labelPlacement="stacked"
						/>
					</IonItem>
					<IonItem className="wrappableInnards">
						<IonSelect
							color="primary"
							className="ion-text-wrap settings"
							label="Separate Multiple Conditions With:"
							value={separator}
							onIonChange={(e) => setSeparator(e.detail.value)}
						>
							<IonSelectOption
								className="ion-text-wrap ion-text-align-end"
								value=" "
							>[ ] Space</IonSelectOption>
							<IonSelectOption
								className="ion-text-wrap ion-text-align-end"
								value=","
							>[,] Comma</IonSelectOption>
							<IonSelectOption
								className="ion-text-wrap ion-text-align-end"
								value=";"
							>[;] Semicolon</IonSelectOption>
							<IonSelectOption
								className="ion-text-wrap ion-text-align-end"
								value="/"
							>[/] Slash</IonSelectOption>
						</IonSelect>
					</IonItem>
				</IonList>
			</IonContent>
			<IonFooter className="modalBorderTop">
				<IonToolbar>
					<IonButton
						color="warning"
						slot="start"
						onClick={maybeCancel}
					>
						<IonIcon icon={saveOutline} slot="end" />
						<IonLabel>Cancel</IonLabel>
					</IonButton>
					<IonButton
						color="success"
						slot="end"
						onClick={maybeSaveNewIdentifier}
					>
						<IonIcon icon={saveOutline} slot="end" />
						<IonLabel>Save</IonLabel>
					</IonButton>
				</IonToolbar>
			</IonFooter>
		</IonModal>
	);
};

export default AddDeclenjugation;
