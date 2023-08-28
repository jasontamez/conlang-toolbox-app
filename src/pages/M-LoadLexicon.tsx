import React from 'react';
import {
	IonItem,
	IonIcon,
	IonLabel,
	IonNote,
	IonList,
	IonContent,
	IonHeader,
	IonToolbar,
	IonButtons,
	IonButton,
	IonTitle,
	IonModal,
	IonFooter
} from '@ionic/react';
import {
	closeCircleOutline
} from 'ionicons/icons';
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import {
	updateLexicon
} from '../components/ReduxDucksFuncs';
import { LexiconObject, ModalProperties } from '../components/ReduxDucksTypes';
import fireSwal from '../components/Swal';

interface SavedLexProperties extends ModalProperties {
	lexInfo: [string, LexiconObject][]
	setLexInfo: Function
}

const LoadLexiconModal = (props: SavedLexProperties) => {
	const { isOpen, setIsOpen, lexInfo, setLexInfo } = props;
	const dispatch = useDispatch();
	const settings = useSelector((state: any) => state.appSettings, shallowEqual);
	const data = (lexInfo && lexInfo.length > 0) ? lexInfo : [];
	const doClose = () => {
		setLexInfo([]);
		setIsOpen(false);
	};
	const loadThis = (key: string) => {
		data.every((pair: [string, LexiconObject]) => {
			if(pair[0] !== key) {
				// Continue the loop
				return true;
			}
			const thenFunc = () => {
				dispatch(updateLexicon(pair[1]));
				setIsOpen(false);
			};
			if(settings.disableConfirms) {
				thenFunc();
			} else {
				fireSwal({
					text: "Are you sure you want to load this? It will overwrite your current lexicon and cannot be reversed.",
					customClass: {popup: 'warningConfirm'},
					icon: 'warning',
					showCancelButton: true,
					confirmButtonText: "Yes, load it."
				}).then((result: any) => result.isConfirmed && thenFunc());
			}
			// End loop
			return false;
		});
	};
	return (
		<IonModal isOpen={isOpen} onDidDismiss={() => doClose()}>
			<IonHeader>
				<IonToolbar color="primary">
					<IonTitle>Load Lexicon</IonTitle>
					<IonButtons slot="end">
						<IonButton onClick={() => doClose()}>
							<IonIcon icon={closeCircleOutline} />
						</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<IonList lines="none" className="buttonFilled">
					{data && data.length > 0 ? data.map((pair: [string, LexiconObject]) => {
						const key = pair[0];
						const lex = pair[1];
						const time = new Date(lex.lastSave);
						return (
							<IonItem key={key} button={true} onClick={() => loadThis(key)}>
								<IonLabel className="ion-text-wrap">{lex.title} [{lex.lexicon.length.toString()}&nbsp;words]</IonLabel>
								<IonNote className="ion-text-wrap" slot="end" style={ { fontStyle: "italic" } }>Saved: {time.toLocaleString()}</IonNote>
							</IonItem>
						);
					}) : (
						<h1 style={ { margin: "2rem auto", textAlign: "center" } }>No Saved Lexicons</h1>
					)}
				</IonList>
			</IonContent>
			<IonFooter>
				<IonToolbar className={data ? "" : "hide"}>
					<IonButton color="warning" slot="end" onClick={() => doClose()}>
						<IonIcon icon={closeCircleOutline} slot="start" />
						<IonLabel>Cancel</IonLabel>
					</IonButton>
				</IonToolbar>
			</IonFooter>
		</IonModal>
	);
};

export default LoadLexiconModal;
