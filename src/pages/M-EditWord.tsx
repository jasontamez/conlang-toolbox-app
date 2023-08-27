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
	IonFooter
} from '@ionic/react';
import {
	closeCircleOutline,
	saveOutline,
	trashOutline,
	globeOutline
} from 'ionicons/icons';
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { ExtraCharactersModalOpener, Lexicon } from '../components/ReduxDucksTypes';
import {
	doEditLexiconItem,
	cancelEditLexiconItem,
	deleteLexiconItem
} from '../components/ReduxDucksFuncs';
import fireSwal from '../components/Swal';

const EditLexiconItemModal = (props: ExtraCharactersModalOpener) => {
	const { isOpen, setIsOpen, openECM } = props;
	const dispatch = useDispatch();
	const [settings, lexicon] = useSelector((state: any) => [state.appSettings, state.lexicon], shallowEqual);
	const thisSingularItem: Lexicon = {...lexicon.lexicon[lexicon.editing]};
	const editing = thisSingularItem.columns ? [...thisSingularItem.columns] : [];
	while(editing.length < lexicon.columns) {
		editing.push("");
	}
	const setNewInfo = (info: string, i: number) => {
		editing[i] = info;
	};
	const theOrder = lexicon.columnOrder;
	const theTitles = lexicon.columnTitles;
	const cancelEditing = () => {
		dispatch(cancelEditLexiconItem());
		setIsOpen(false);
	};
	const maybeSaveNewInfo = () => {
		if(editing.every((i: string) => !i)) {
			fireSwal({
				title: "Error",
				icon: "error",
				text: "You must put some text in at least one box."
			});
			return;
		}
		// Everything ok!
		thisSingularItem.columns = editing;
		setIsOpen(false);
		dispatch(doEditLexiconItem(thisSingularItem));
		fireSwal({
			title: "Item updated!",
			toast: true,
			timer: 2500,
			timerProgressBar: true,
			showConfirmButton: false
		});
	};
	const delFromLex = () => {
		const thenFunc = () => {
			setIsOpen(false);
			dispatch(deleteLexiconItem(lexicon.editing));
			fireSwal({
				title: "Item deleted",
				customClass: {popup: 'dangerToast'},
				toast: true,
				timer: 2500,
				timerProgressBar: true,
				showConfirmButton: false
			});
		};
		if(settings.disableConfirms) {
			thenFunc();
		} else {
			fireSwal({
				text: "Are you sure you want to delete this? This cannot be undone.",
				customClass: {popup: 'deleteConfirm'},
				icon: 'warning',
				showCancelButton: true,
				confirmButtonText: "Yes, delete it."
			}).then((result: any) => result.isConfirmed && thenFunc());
		}
	};
	return (
		<IonModal isOpen={isOpen} onDidDismiss={() => setIsOpen(false)}>
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
					{theOrder.map((i: number) => {
						return (
							<React.Fragment key={`${thisSingularItem.key}-label-input-${i}`}>
								<IonItem className="labelled">
									<IonLabel>{theTitles[i]}</IonLabel>
								</IonItem>
								<IonItem>
									<IonInput aria-label={`${theTitles[i]} input`} id={`thislex${i}`} className="ion-margin-top serifChars" value={editing[i]} onIonChange={e => setNewInfo((e.detail.value as string).trim(), i)}></IonInput>
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
