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
	saveOutline
} from 'ionicons/icons';
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import './App.css';
import { LexiconObject } from '../components/ReduxDucksTypes';
import { closeModal, cancelEditRewriteRuleWG, updateLexicon } from '../components/ReduxDucksFuncs';
import fireSwal from '../components/Swal';
import { $i } from '../components/DollarSignExports';

const EditLexiconOrderModal = () => {
	const dispatch = useDispatch();
	const state = useSelector((state: any) => state, shallowEqual);
	const modalState = state.modalState;
	const lexicon = state.lexicon;
	const setNewInfo = (id: string, prop: keyof LexiconObject, index1: number = 0, index2: number = 0) => {
		const el = $i(id);
		const value = el.value;
		if(prop === "lexicon") {
			lexicon.lexicon[index1][index2] = value;
		} else if (prop === "sort") {
			lexicon.sort = [index1, index2];
		} else {
			lexicon[prop] = value;
		}
		dispatch(updateLexicon(lexicon));
	};
	//const theOrder = lexicon.columnOrder;
	//const theTitles = lexicon.columnTitles;
	//const theSizes = lexicon.columnSizes;
	const editing = lexicon.editing;
	const cancelEditing = () => {
		dispatch(cancelEditRewriteRuleWG(editing));
		dispatch(closeModal('EditLexiconOrder'));
	};
	const maybeSaveNewRuleInfo = () => {
		let err: string[] = [];
		// Test info for validness, then save if needed and reset the editingRule
		if(err.length > 0) {
			// Errors found.
			fireSwal({
				title: "Error",
				icon: "error",
				text: err.join("; ")
			});
			return;
		}
		// Everything ok!
		dispatch(closeModal('EditLexiconOrder'));
		//dispatch(doEditRewriteRuleWG(editingRule));
		fireSwal({
			title: "Rewrite Rule saved!",
			toast: true,
			timer: 2500,
			timerProgressBar: true,
			showConfirmButton: false
		});
	};
	return (
		<IonModal isOpen={modalState.EditLexiconOrder} onDidDismiss={() => dispatch(closeModal('EditLexiconOrder'))}>
			<IonHeader>
				<IonToolbar color="primary">
					<IonTitle>Edit Rewrite Rule</IonTitle>
					<IonButtons slot="end">
						<IonButton onClick={() => cancelEditing()}>
							<IonIcon icon={closeCircleOutline} />
						</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<IonList lines="none">
					<IonItem>
						<IonLabel position="stacked" style={ {fontSize: "20px"} }>Search Expression:</IonLabel>
						<IonInput id="searchEx" className="ion-margin-top serifChars" value={""} onIonChange={e => setNewInfo("seek", "sort", 3, 2)}></IonInput>
					</IonItem>
				</IonList>
			</IonContent>
			<IonFooter>
				<IonToolbar>
					<IonButton color="tertiary" slot="end" onClick={() => maybeSaveNewRuleInfo()}>
						<IonIcon icon={saveOutline} slot="start" />
						<IonLabel>Save Rule</IonLabel>
					</IonButton>
				</IonToolbar>
			</IonFooter>
		</IonModal>
	);
};

export default EditLexiconOrderModal;
