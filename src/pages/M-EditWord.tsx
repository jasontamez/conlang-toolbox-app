import React, { useEffect, useState } from 'react';
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
import { ExtraCharactersModalOpener, Lexicon, LexiconColumn } from '../components/ReduxDucksTypes';
import {
	doEditLexiconItem,
	deleteLexiconItem
} from '../components/ReduxDucksFuncs';
import yesNoAlert from '../components/yesNoAlert';

interface LexItemProps extends ExtraCharactersModalOpener {
	itemToEdit: Lexicon | null
	columnInfo: LexiconColumn[]
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
	const { isOpen, setIsOpen, openECM, itemToEdit, columnInfo } = props;
	const dispatch = useDispatch();
	const disableConfirms = useSelector((state: any) => state.appSettings.disableConfirms);
	const { id, columns } = itemToEdit || { id: '', columns: [] };
	const [ cols, setCols ] = useState<string[]>([...columns]);
	const [doAlert] = useIonAlert();
	const [doToast] = useIonToast();
	useEffect(() => {
		if(!isOpen && cols.join(nonsense) !== columns.join(nonsense)) {
			setCols([...columns]);
		}
	}, [cols, columns, isOpen]);
	const setNewInfo = (info: string, i: number) => {
		const newCols = [...cols];
		newCols[i] = info;
		setCols(newCols);
	};
	const cancelEditing = () => {
		// If we're "open" and being closed by some other means, check and see if
		//   1) we have disabled confirms
		//   2) we haven't changed anything
		// and exit silently if both are true
		if(disableConfirms || cols.join(nonsense) === columns.join(nonsense)) {
			setIsOpen(false);
			return;
		}
		// Otherwise, doublecheck
		yesNoAlert({
			header: "Delete everything?",
			cssClass: "warning",
			message: "You have unsaved changed. Are you sure you want to exit?",
			submit: "Yes, exit",
			handler: () => setIsOpen(false),
			doAlert
		});
	};
	const maybeSaveNewInfo = () => {
		if(cols.every((i: string) => !i.trim())) {
			doAlert({
				header: "Error",
				message: "You must put some text in at least one box.",
				cssClass: "danger",
				buttons: [
					{
						text: "Ok",
						role: "cancel"
					}
				]
			});
			return;
		}
		// Everything ok!
		setIsOpen(false);
		dispatch(doEditLexiconItem({id, columns: cols}));
		doToast({
			message: "Item updated!",
			cssClass: "success",
			duration: 2500
		})
	};
	const delFromLex = () => {
		const handler = () => {
			setIsOpen(false);
			dispatch(deleteLexiconItem(id));
			doToast({
				message: "Item deleted.",
				duration: 2500
			})
		};
		if(disableConfirms) {
			handler();
		} else {
			yesNoAlert({
				header: "Are you sure?",
				cssClass: "danger",
				message: "Deleting this cannot be undone.",
				submit: "Yes, delete it",
				handler,
				doAlert
			});
		}
	};
	return (
		<IonModal isOpen={isOpen} backdropDismiss={false}>
			<IonHeader>
				<IonToolbar color="primary">
					<IonTitle>Edit Lexicon Item</IonTitle>
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
										id={`${id}:input:column${i}`}
										className="ion-margin-top serifChars"
										value={cols[i]}
										onIonChange={e => setNewInfo((e.detail.value as string).trim(), i)}
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
						<IonLabel>Save Item</IonLabel>
					</IonButton>
					<IonButton color="danger" slot="start" onClick={() => delFromLex()}>
						<IonIcon icon={trashOutline} slot="start" />
						<IonLabel>Delete Item</IonLabel>
					</IonButton>
				</IonToolbar>
			</IonFooter>
		</IonModal>
	);
};

export default EditLexiconItemModal;
