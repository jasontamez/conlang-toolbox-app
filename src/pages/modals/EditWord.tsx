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
	useIonAlert,
	useIonToast
} from '@ionic/react';
import {
	closeCircleOutline,
	saveOutline,
	trashOutline,
	globeOutline
} from 'ionicons/icons';
import { useSelector, useDispatch } from "react-redux";

import { deleteLexiconItem, doEditLexiconItem } from '../../store/lexiconSlice';
import { ExtraCharactersModalOpener, Lexicon, LexiconColumn, SorterFunc, StateObject } from '../../store/types';
import useTranslator from '../../store/translationHooks';

import yesNoAlert from '../../components/yesNoAlert';
import toaster from '../../components/toaster';
import { $i } from '../../components/DollarSignExports';

interface LexItemProps extends ExtraCharactersModalOpener {
	itemToEdit: Lexicon | null
	columnInfo: LexiconColumn[]
	sorter: SorterFunc
}

function garble () {
	const e = Math.floor(Math.random() * 10) + 15;
	let output = "";
	for (let x = 0; x < e; x++) {
		output += "qwrtpsdfghjklzxcvbnm!"[Math.floor(Math.random() * 20)];
	}
	return output;
};
const nonsense = garble();

const EditLexiconItemModal = (props: LexItemProps) => {
	const { isOpen, setIsOpen, openECM, itemToEdit, columnInfo, sorter } = props;
	const dispatch = useDispatch();
	const [ tc ] = useTranslator('common');
	const [ t ] = useTranslator('lexicon');
	const disableConfirms = useSelector((state: StateObject) => state.appSettings.disableConfirms);
	const [ id, setId ] = useState<string>("");
	const [ cols, setCols ] = useState<string[]>([]);
	const [ originalString, setOriginalString ] = useState<string>("");
	const [doAlert] = useIonAlert();
	const toast = useIonToast();
	const onLoad = () => {
		const id = (itemToEdit ? itemToEdit.id : "");
		const cols = (itemToEdit ? [...itemToEdit.columns] : []);
		cols.forEach((col: string, i: number) => {
			const el = $i<HTMLInputElement>(`edit_lex_input_${id}_${i}`);
			el && (el.value = col);
		});
		setOriginalString(cols.join(nonsense));
		setId(id);
		setCols(cols);
	};
	const currentInfo = () => {
		const cols = (itemToEdit ? [...itemToEdit.columns] : []);
		return cols.map((col: string, i: number) => {
			const el = $i<HTMLInputElement>(`edit_lex_input_${id}_${i}`);
			return el ? el.value.trim() : "";
		});
	};
	const cancelEditing = () => {
		// If we're "open" and being closed by some other means, check and see if
		//   1) we have disabled confirms
		//   2) we haven't changed anything
		// and exit silently if both are true
		if(disableConfirms || currentInfo().join(nonsense) === originalString) {
			setIsOpen(false);
			return;
		}
		// Otherwise, doublecheck
		yesNoAlert({
			header: t("Exit Without Saving?"),
			cssClass: "warning",
			message: t("You have unsaved changes. Are you sure you want to exit?"),
			submit: tc("Yes Exit"),
			handler: () => setIsOpen(false),
			doAlert
		});
	};
	const maybeSaveNewInfo = () => {
		const cols = currentInfo();
		if(cols.join("") === "") {
			doAlert({
				header: tc("Error"),
				message: tc("You did not type any information into any text field."),
				cssClass: "danger",
				buttons: [
					{
						text: tc("Ok"),
						role: "cancel",
						cssClass: "cancel"
					}
				]
			});
			return;
		}
		// Everything ok!
		setIsOpen(false);
		dispatch(doEditLexiconItem([{id, columns: cols}, sorter]));
		toaster({
			message: tc("thingEdited", { thing: t("Item") }),
			color: "success",
			duration: 2500,
			toast
		})
	};
	const delFromLex = () => {
		const handler = () => {
			setIsOpen(false);
			dispatch(deleteLexiconItem(id));
			toaster({
				message: tc("thingDeleted", { thing: t("Item") }),
				duration: 2500,
				color: "danger",
				toast
			})
		};
		if(disableConfirms) {
			handler();
		} else {
			yesNoAlert({
				header: tc("areYouSure"),
				cssClass: "danger",
				message: tc("Are you sure you want to delete this? This cannot be undone."),
				submit: tc("confirmDelIt"),
				handler,
				doAlert
			});
		}
	};
	return (
		<IonModal isOpen={isOpen} backdropDismiss={false} onIonModalDidPresent={onLoad}>
			<IonHeader>
				<IonToolbar color="primary">
					<IonTitle>{tc("editThing", { thing: t("Lexicon Item")} )}</IonTitle>
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
			<IonContent className="hasSpecialLabels">
				<IonList lines="none">
					{columnInfo.map((col: LexiconColumn, i: number) => {
						return (
							<React.Fragment key={`${id}:fragment:${i}`}>
								<IonItem className="labelled">
									<IonLabel>{col.label}</IonLabel>
								</IonItem>
								<IonItem>
									<IonInput
										aria-label={`${col.label} input`}
										id={`edit_lex_input_${id}_${i}`}
										className="ion-margin-top serifChars"
										value={cols[i]}
									></IonInput>
								</IonItem>
							</React.Fragment>
						);
					})}
				</IonList>
			</IonContent>
			<IonFooter>
				<IonToolbar>
					<IonButton color="tertiary" slot="end" onClick={() => maybeSaveNewInfo()}>
						<IonIcon icon={saveOutline} slot="start" />
						<IonLabel>{tc("saveThing", { thing: t("Item") })}</IonLabel>
					</IonButton>
					<IonButton color="danger" slot="start" onClick={() => delFromLex()}>
						<IonIcon icon={trashOutline} slot="start" />
						<IonLabel>{tc("deleteThing", { thing: t("Item") })}</IonLabel>
					</IonButton>
				</IonToolbar>
			</IonFooter>
		</IonModal>
	);
};

export default EditLexiconItemModal;
