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
	IonFooter,
	useIonAlert
} from '@ionic/react';
import {
	closeCircleOutline
} from 'ionicons/icons';
import { useSelector, useDispatch } from "react-redux";

import { LexiconState, ModalProperties, SetState, StateObject } from '../../store/types';
import { loadStateLex } from '../../store/lexiconSlice';
import useTranslator from '../../store/translationHooks';

import yesNoAlert from '../../components/yesNoAlert';

interface SavedLexProperties extends ModalProperties {
	lexInfo: [string, LexiconState][]
	setLexInfo: SetState<[string, LexiconState][]>
}

const LoadLexiconModal = (props: SavedLexProperties) => {
	const { isOpen, setIsOpen, lexInfo, setLexInfo } = props;
	const dispatch = useDispatch();
	const [ tc ] = useTranslator('common');
	const [ t ] = useTranslator('lexicon');
	const disableConfirms = useSelector((state: StateObject) => state.appSettings.disableConfirms);
	const [doAlert] = useIonAlert();
	const data = (lexInfo && lexInfo.length > 0) ? lexInfo : [];
	const doClose = () => {
		setLexInfo([]);
		setIsOpen(false);
	};
	const loadThis = (key: string) => {
		data.every((pair: [string, LexiconState]) => {
			if(pair[0] !== key) {
				// Continue the loop
				return true;
			}
			const handler = () => {
				dispatch(loadStateLex(pair[1]));
				setIsOpen(false);
			};
			if(disableConfirms) {
				handler();
			} else {
				yesNoAlert({
					message: t("loadLexiconConfirm"),
					cssClass: "warning",
					submit: tc("confirmLoad"),
					handler,
					doAlert
				});
			}
			// End loop
			return false;
		});
	};
	return (
		<IonModal isOpen={isOpen} onDidDismiss={() => doClose()}>
			<IonHeader>
				<IonToolbar color="primary">
					<IonTitle>{tc("loadThing", { thing: tc("Lexicon")} )}</IonTitle>
					<IonButtons slot="end">
						<IonButton onClick={() => doClose()}>
							<IonIcon icon={closeCircleOutline} />
						</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<IonList lines="none" className="buttonFilled">
					{data && data.length > 0 ? data.map((pair: [string, LexiconState]) => {
						const key = pair[0];
						const lex = pair[1];
						const time = new Date(lex.lastSave);
						return (
							<IonItem key={key} button={true} onClick={() => loadThis(key)}>
								<IonLabel
									className="ion-text-wrap"
								>{lex.title} [{t("lexitems", { count: lex.lexicon.length })}]</IonLabel>
								<IonNote
									className="ion-text-wrap ital"
									slot="end"
								>{tc("SavedAt", { time: time.toLocaleString() })}</IonNote>
							</IonItem>
						);
					}) : (
						<h1>{t("No Saved Lexicons")}</h1>
					)}
				</IonList>
			</IonContent>
			<IonFooter>
				<IonToolbar className={data ? "" : "hide"}>
					<IonButton color="warning" slot="end" onClick={() => doClose()}>
						<IonIcon icon={closeCircleOutline} slot="start" />
						<IonLabel>{tc("Cancel")}</IonLabel>
					</IonButton>
				</IonToolbar>
			</IonFooter>
		</IonModal>
	);
};

export default LoadLexiconModal;
