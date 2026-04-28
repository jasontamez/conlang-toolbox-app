import React, { useCallback, FC } from 'react';
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
import { ExtraCharactersModalOpener, LexiconColumn, SorterFunc } from '../../store/types';

import toaster from '../../components/toaster';
import useI18Memo from '../../components/useI18Memo';
import getSetValue from '../../components/getSetValue';
import useElement, {useElementList} from '../../components/useElement';
import Modal from '../../components/Modal';

interface LexItemProps extends ExtraCharactersModalOpener {
	columnInfo: LexiconColumn[]
	sorter: SorterFunc
}

const commons = [ "Close", "ExtraChars", "Ok", "error" ];

const translations = [ "AddItem", "ItemSaved", "noInfoProvided", "AddLexiconItem" ];

type IonInput = HTMLIonInputElement | HTMLIonTextareaElement;

interface InputItemProps {
	col: LexiconColumn
	getElement: (col: IonInput | null) => void
}

const InputItem: FC<InputItemProps> = ({col, getElement}) => {
	const {id, size, label} = col;
	const [, inputRef] = useElement<IonInput>(getElement);
	return (
		<React.Fragment>
			<IonItem className="labelled">
				<IonLabel>{label}</IonLabel>
			</IonItem>
			<IonItem>
				{(size === "l") ?
					//const rows = Math.min(12, Math.max(3, value.split(/\n/).length));
					(
						<IonTextarea
							aria-label={label}
							id={`input_lexicon_modal_${id}`}
							className="ion-margin-top serifChars"
							rows={5}
							ref={inputRef}
						></IonTextarea>
					)
				:
					(
						<IonInput
							aria-label={label}
							id={`input_lexicon_modal_${id}`}
							className="ion-margin-top serifChars"
							ref={inputRef}
						></IonInput>
					)
				}
			</IonItem>
		</React.Fragment>
	);
};

const AddLexiconItemModal: FC<LexItemProps> = (props) => {
	const [ tClose, tExChar, tOk, tError ] = useI18Memo(commons);
	const [ tAddItem, tThingAdded, tNoInfo, tAddLexItem ] = useI18Memo(translations, "lexicon");

	const { isOpen, setIsOpen, openECM, columnInfo, sorter } = props;
	const dispatch = useDispatch();
	const [doAlert] = useIonAlert();
	const toast = useIonToast();
	const [inputElements, updater] = useElementList<LexiconColumn, IonInput | null>(columnInfo, col => col.id);

	const maybeSaveNewInfo = () => {
		const newInfo: string[] = [];
		const newBlank: { [key: string]: string } = {};
		let foundFlag = false;
		columnInfo.forEach((col: LexiconColumn) => {
			const id = col.id;
			const el = inputElements.current[id];
			const info = getSetValue(el);
			newInfo.push(info);
			if(info) { foundFlag = true; }
			newBlank[id] = "";
		});
		if(!foundFlag) {
			doAlert({
				header: tError,
				message: tNoInfo,
				cssClass: "warning",
				buttons: [
					{
						text: tOk,
						role: "cancel",
						cssClass: "cancel"
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
			message: tThingAdded,
			duration: 2500,
			color: "success",
			toast
		});
	};
	const cancel = useCallback(() => {
		setIsOpen(false);
	}, [setIsOpen]);
	const opener = useCallback(() => openECM(true), [openECM]);

	return (
		<Modal
			isOpen={isOpen}
			closeFunc={cancel}
			backdropDismiss={false}
			title={tAddLexItem}
			action={maybeSaveNewInfo}
			type="add"
			extraChars
		>
			<IonHeader>
				<IonToolbar color="primary">
					<IonTitle>{tAddLexItem}</IonTitle>
					<IonButtons slot="end">
						<IonButton onClick={opener} aria-label={tExChar}>
							<IonIcon icon={globeOutline} />
						</IonButton>
						<IonButton onClick={cancel} aria-label={tClose}>
							<IonIcon icon={closeCircleOutline} />
						</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<IonList lines="none" className="hasSpecialLabels ion-margin-end">
					{columnInfo.map((col: LexiconColumn) => {
						const getElement = (node: IonInput | null) => updater(col, node);
						return <InputItem col={col} key={`${col.id}:addFragment`} getElement={getElement} />;
					})}
				</IonList>
			</IonContent>
			<IonFooter className="modalBorderTop">
				<IonToolbar>
					<IonButton
						color="tertiary"
						slot="end"
						onClick={maybeSaveNewInfo}
					>
						<IonIcon icon={saveOutline} slot="start" />
						<IonLabel>{tAddItem}</IonLabel>
					</IonButton>
				</IonToolbar>
			</IonFooter>
		</Modal>
	);
};

export default AddLexiconItemModal;
