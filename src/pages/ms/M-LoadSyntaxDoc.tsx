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
	setMorphoSyntax,
	setTemporaryInfo
} from '../../components/ReduxDucksFuncs';
import { ModalProperties, MorphoSyntaxBoolObject, MorphoSyntaxObject } from '../../components/ReduxDucksTypes';
import fireSwal from '../../components/Swal';

const LoadMSModal = (props: ModalProperties) => {
	const { isOpen, setIsOpen } = props;
	const dispatch = useDispatch();
	const [settings, temp] = useSelector((state: any) => [state.appSettings, state.temporaryInfo], shallowEqual);
	const data = (temp && temp.type === "storedsyntaxes" && temp.data.length > 0) ? temp.data : undefined;
	const doClose = () => {
		dispatch(setTemporaryInfo(undefined));
		setIsOpen(false);
	};
	interface MSOmod extends MorphoSyntaxObject {
		boolStrings?: string[]
	}
	const loadThis = (key: string) => {
		data.every((pair: [string, MSOmod]) => {
			if(pair[0] !== key) {
				// Continue the loop
				return true;
			}
			let newBool: MorphoSyntaxBoolObject = {};
			let old = pair[1];
			(old.boolStrings || []).forEach((s) => (newBool[s as keyof MorphoSyntaxBoolObject] = true));
			delete old.boolStrings;
			const newObj: MorphoSyntaxObject = {
				...old,
				bool: newBool
			};
			const thenFunc = () => {
				dispatch(setMorphoSyntax(newObj));
				setIsOpen(false);
			};
			if(settings.disableConfirms) {
				thenFunc();
			} else {
				fireSwal({
					text: "Are you sure you want to load this? It will overwrite your current MorphoSyntax information and cannot be reversed.",
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
					{data && data.length > 0 ? data.map((pair: [string, MorphoSyntaxObject]) => {
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

export default LoadMSModal;
