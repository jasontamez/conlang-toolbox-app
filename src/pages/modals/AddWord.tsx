import React, { useCallback } from 'react';
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

import { addLexiconItem } from '../../store/lexiconSlice';
import { ExtraCharactersModalOpener, LexiconColumn } from '../../store/types';

import toaster from '../../components/toaster';
import { $i } from '../../components/DollarSignExports';

interface LexItemProps extends ExtraCharactersModalOpener {
	columnInfo: LexiconColumn[]
	sorter: Function
}

const AddLexiconItemModal = (props: LexItemProps) => {
	const { isOpen, setIsOpen, openECM, columnInfo, sorter } = props;
	const dispatch = useDispatch();
	const [doAlert] = useIonAlert();
	const [doToast, undoToast] = useIonToast();
	const maybeSaveNewInfo = useCallback(() => {
		const newInfo: string[] = [];
		const newBlank: { [key: string]: string } = {};
		let foundFlag = false;
		columnInfo.forEach((col: LexiconColumn) => {
			const id = col.id;
			const info = $i(`input_lexicon_modal_${id}`).value || "";
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
		dispatch(addLexiconItem([{
			id: uuidv4(),
			columns: newInfo
		}, sorter]));
		// close modal
		setIsOpen(false);
		// toast
		toaster({
			message: "Item added!",
			duration: 2500,
			color: "success",
			doToast,
			undoToast
		});
	}, [columnInfo, dispatch, setIsOpen, doAlert, doToast, undoToast, sorter]);
	const cancel = useCallback(() => {
		setIsOpen(false);
	}, [setIsOpen]);
	const input = useCallback((label: string, id: string, size: string) => {
		if(size === "l") {
			//const rows = Math.min(12, Math.max(3, value.split(/\n/).length));
			return (
				<IonTextarea
					aria-label={label}
					id={`input_lexicon_modal_${id}`}
					className="ion-margin-top serifChars"
					rows={5}
				></IonTextarea>
			);
		}
		return (
			<IonInput
				aria-label={label}
				id={`input_lexicon_modal_${id}`}
				className="ion-margin-top serifChars"
			></IonInput>
		);
	}, []);
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
									{input(`${label} input`, id, size)}
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
