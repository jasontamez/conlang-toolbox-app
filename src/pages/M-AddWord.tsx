import React, { useEffect, useState, useCallback } from 'react';
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
	IonTextarea,
	useIonAlert,
	useIonToast
} from '@ionic/react';
import {
	closeCircleOutline,
	saveOutline,
	globeOutline
} from 'ionicons/icons';
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from 'uuid';

import { ExtraCharactersModalOpener, LexiconColumn } from '../components/ReduxDucksTypes';
import {
	addLexiconItem
} from '../components/ReduxDucksFuncs';
import toaster from '../components/toaster';

interface LexItemProps extends ExtraCharactersModalOpener {
	adding: { [keys: string]: string }
	setAdding: Function
	columnInfo: LexiconColumn[]
}

const AddLexiconItemModal = (props: LexItemProps) => {
	const { isOpen, setIsOpen, openECM, adding, setAdding, columnInfo } = props;
	const dispatch = useDispatch();
	const [ cols, setCols ] = useState<{ [keys: string]: string }>({});
	const [doAlert] = useIonAlert();
	const [doToast, undoToast] = useIonToast();
	useEffect(() => {
		if(!isOpen) {
			setCols({...adding});
		}
	}, [adding, isOpen]);
	const maybeSaveNewInfo = useCallback(() => {
		const newInfo: string[] = [];
		const newBlank: { [key: string]: string } = {};
		let foundFlag = false;
		columnInfo.forEach((col: LexiconColumn) => {
			const id = col.id;
			const info = cols[id] || "";
			newInfo.push(info);
			info && (foundFlag = true);
			newBlank[id] = "";
		});
		if(!foundFlag) {
			doAlert({
				header: "Error",
				message: "You did not type any information into any text field.",
				cssClass: "warning",
				buttons: [
					{
						text: "Ok",
						role: "cancel"
					}
				]
			});
			return;
		}
		// send to store
		dispatch(addLexiconItem({
			id: uuidv4(),
			columns: newInfo
		}));
		// clear current info
		setAdding(newBlank);
		// close modal
		setIsOpen(false);
		// toast
		toaster({
			message: "Item added!",
			duration: 2500,
			color: "success",
			buttons: [
				{
					text: "Ok",
					role: "cancel"
				}
			],
			doToast,
			undoToast
		});
	}, [cols, columnInfo, dispatch, setAdding, setIsOpen, doAlert, doToast, undoToast]);
	const cancel = useCallback(() => {
		setAdding({});
		setIsOpen(false);
	}, [setAdding, setIsOpen]);
	const setAddInput = useCallback((id: string, value: string) => {
		const newObj = {...cols};
		newObj[id] = value;
		setCols(newObj);
	}, [cols]);
	const input = useCallback((label: string, value: string, id: string, size: string) => {
		if(size === "l") {
			//const rows = Math.min(12, Math.max(3, value.split(/\n/).length));
			return (
				<IonTextarea
					aria-label={label}
					id={`${id}:input:column:add`}
					className="ion-margin-top serifChars"
					value={value}
					onIonChange={(e) => setAddInput(id, e.detail.value || "")}
					rows={5}
				></IonTextarea>
			);
		}
		return (
			<IonInput
				aria-label={label}
				id={`${id}:input:column:add`}
				className="ion-margin-top serifChars"
				value={value}
				onIonChange={(e) => setAddInput(id, e.detail.value || "")}
			></IonInput>
		);
	}, [setAddInput]);
	return (
		<IonModal isOpen={isOpen} backdropDismiss={false}>
			<IonHeader>
				<IonToolbar color="primary">
					<IonTitle>Add Lexicon Item</IonTitle>
					<IonButtons slot="end">
						<IonButton onClick={() => openECM(true)}>
							<IonIcon icon={globeOutline} />
						</IonButton>
						<IonButton onClick={() => cancel()}>
							<IonIcon icon={closeCircleOutline} />
						</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<IonList lines="none" className="hasSpecialLabels ion-margin-end">
					{columnInfo.map((col: LexiconColumn) => {
						const {id, size, label} = col;
						return (
							<React.Fragment key={`${id}:addFragment`}>
								<IonItem className="labelled">
									<IonLabel>{label}</IonLabel>
								</IonItem>
								<IonItem>
									{input(`${label} input`, cols[id], id, size)}
								</IonItem>
							</React.Fragment>
						);
					})}
				</IonList>
			</IonContent>
			<IonFooter style={{borderTop: "2px solid #00000033"}}>
				<IonToolbar>
					<IonButton color="tertiary" slot="end" onClick={() => maybeSaveNewInfo()}>
						<IonIcon icon={saveOutline} slot="start" />
						<IonLabel>Add Item</IonLabel>
					</IonButton>
				</IonToolbar>
			</IonFooter>
		</IonModal>
	);
};

export default AddLexiconItemModal;
