import React, { useCallback, useMemo, FC } from 'react';
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
	useIonAlert,
	useIonToast
} from '@ionic/react';
import {
	closeCircleOutline
} from 'ionicons/icons';
import { useSelector } from "react-redux";

import { LexiconState, ModalProperties, SetBooleanState, SetState, StateObject } from '../../store/types';
import useTranslator from '../../store/translationHooks';

import { LexiconStorage } from '../../components/PersistentInfo';
import yesNoAlert from '../../components/yesNoAlert';
import toaster from '../../components/toaster';
import useI18Memo from '../../components/useI18Memo';

interface SavedLexProperties extends ModalProperties {
	lexInfo: [string, LexiconState][]
	setLexInfo: SetState<[string, LexiconState][]>
	setLoadingScreen: SetBooleanState
}

const commons = [
	"deleteThisCannotUndo", "Cancel", "Close", "confirmDelIt", "Lexicon"
];

const DeleteLexiconModal: FC<SavedLexProperties> = (props) => {
	const [ t ] = useTranslator('lexicon');
	const [ tc ] = useTranslator('common');
	const tNoSaved = useMemo(() => t("No Saved Lexicons"), [t]);
	const [ tYouSure, tCancel, tClose, tConfDel, tLexicon ] = useI18Memo(commons);
	const tDeleteLexicon = useMemo(() => tc("deleteThing", { thing: tLexicon }), [tc, tLexicon]);

	const { isOpen, setIsOpen, lexInfo, setLexInfo, setLoadingScreen } = props;
	const disableConfirms = useSelector((state: StateObject) => state.appSettings.disableConfirms);
	const [doAlert] = useIonAlert();
	const toast = useIonToast();
	const data = useMemo(() => (lexInfo && lexInfo.length > 0) ? lexInfo : [], [lexInfo]);
	const doClose = useCallback(() => {
		setLexInfo([]);
		setIsOpen(false);
	}, [setIsOpen, setLexInfo]);
	const deleteThis = useCallback((key: string, title: string) => {
		const handler = () => {
			setLoadingScreen(true);
			LexiconStorage.removeItem(key).then(() => {
				setLoadingScreen(false);
				setLexInfo([]);
				setIsOpen(false);
				toaster({
					message: tc("thingDeleted", { thing: tLexicon }),
					duration: 2500,
					toast
				});
			});
		};
		if(disableConfirms) {
			handler();
		} else {
			yesNoAlert({
				header: tc("deleteTitleQ", { title }),
				cssClass: "danger",
				message: tYouSure,
				submit: tConfDel,
				handler,
				doAlert
			});
		}
	}, [disableConfirms, doAlert, setIsOpen, setLexInfo, setLoadingScreen, tConfDel, tYouSure, tc, toast, tLexicon]);
	const listOfLexicons = useMemo(() => data.map((pair: [string, LexiconState]) => {
		const key = pair[0];
		const lex = pair[1];
		const time = new Date(lex.lastSave);
		return (
			<IonItem
				key={key}
				button={true}
				onClick={() => deleteThis(key, lex.title)}
			>
				<IonLabel
					className="ion-text-wrap"
				>
					{lex.title}
					[{t("lexitems", { count: lex.lexicon.length })}]
				</IonLabel>
				<IonNote
					className="ion-text-wrap ital"
					slot="end"
				>{tc("SavedAt", { time: time.toLocaleString() })}</IonNote>
			</IonItem>
		);
	}), [data, deleteThis, t, tc]);
	return (
		<IonModal isOpen={isOpen} onDidDismiss={doClose}>
			<IonHeader>
				<IonToolbar color="primary">
					<IonTitle>{tDeleteLexicon}</IonTitle>
					<IonButtons slot="end">
						<IonButton onClick={doClose} aria-label={tClose}>
							<IonIcon icon={closeCircleOutline} />
						</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<IonList lines="none" className="buttonFilled">
					{data.length > 0 ? listOfLexicons : <h1>{tNoSaved}</h1> }
				</IonList>
			</IonContent>
			<IonFooter>
				<IonToolbar className={data.length > 0 ? "" : "hide"}>
					<IonButton color="warning" slot="end" onClick={doClose}>
						<IonIcon icon={closeCircleOutline} slot="start" />
						<IonLabel>{tCancel}</IonLabel>
					</IonButton>
				</IonToolbar>
			</IonFooter>
		</IonModal>
	);
};

export default DeleteLexiconModal;
