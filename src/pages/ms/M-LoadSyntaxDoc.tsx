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
	useIonAlert,
} from '@ionic/react';
import {
	closeCircleOutline
} from 'ionicons/icons';
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import {
	setMorphoSyntax
} from '../../components/ReduxDucksFuncs';
import { ModalProperties, MorphoSyntaxBoolObject, MorphoSyntaxObject } from '../../components/ReduxDucksTypes';
import yesNoAlert from '../../components/yesNoAlert';

interface MSOmod extends MorphoSyntaxObject {
	boolStrings?: string[]
}
interface MSmodalProps extends ModalProperties {
	storedInfo: [string, MSOmod][]
	setStoredInfo: Function
}

const LoadMSModal = (props: MSmodalProps) => {
	const { isOpen, setIsOpen, storedInfo, setStoredInfo } = props;
	const dispatch = useDispatch();
	const settings = useSelector((state: any) => state.appSettings, shallowEqual);
	const [doAlert] = useIonAlert();
	const data = (storedInfo && storedInfo.length > 0) ? storedInfo : [];
	const doClose = () => {
		setStoredInfo([]);
		setIsOpen(false);
	};
	const loadThis = (key: string) => {
		data.every((pair: [string, MSOmod]) => {
			if(pair[0] !== key) {
				// Continue the loop
				return true;
			}
			const newBool: MorphoSyntaxBoolObject = {};
			const old = pair[1];
			(old.boolStrings || []).forEach((s) => (newBool[s as keyof MorphoSyntaxBoolObject] = true));
			delete old.boolStrings;
			const newObj: MorphoSyntaxObject = {
				...old,
				bool: newBool
			};
			const handler = () => {
				dispatch(setMorphoSyntax(newObj));
				setIsOpen(false);
			};
			if(settings.disableConfirms) {
				handler();
			} else {
				yesNoAlert({
					message: "Are you sure you want to load this? It will overwrite your current MorphoSyntax information and cannot be reversed.",
					cssClass: "warning",
					submit: "Yes, load it",
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
					<IonTitle>Load MorphoSyntax Document</IonTitle>
					<IonButtons slot="end">
						<IonButton onClick={() => doClose()}>
							<IonIcon icon={closeCircleOutline} />
						</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<IonList lines="none" className="buttonFilled">
					{data.length > 0 ? data.map((pair: [string, MorphoSyntaxObject]) => {
						const key = pair[0];
						const ms = pair[1];
						const time = new Date(ms.lastSave);
						return (
							<IonItem key={key} button={true} onClick={() => loadThis(key)}>
								<IonLabel className="ion-text-wrap">{ms.title}</IonLabel>
								<IonNote className="ion-text-wrap" slot="end" style={ { fontStyle: "italic" } }>Saved: {time.toLocaleString()}</IonNote>
							</IonItem>
						);
					}) : (
						<h1 style={ { margin: "2rem auto", textAlign: "center" } }>No Saved MorphoSyntax Documents</h1>
					)}
				</IonList>
			</IonContent>
			<IonFooter>
				<IonToolbar className={data.length > 0 ? "" : "hide"}>
					<IonButton color="warning" slot="end" onClick={() => doClose()}>
						<IonIcon icon={closeCircleOutline} slot="start" />
						<IonLabel>Cancel</IonLabel>
					</IonButton>
				</IonToolbar>
			</IonFooter>
		</IonModal>
	);
};

export default LoadMSModal;
