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
	IonFooter
} from '@ionic/react';
import {
	closeCircleOutline
} from 'ionicons/icons';
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import {
	closeModal,
	setTemporaryInfo
} from '../components/ReduxDucksFuncs';
import ReactExport from "react-data-export";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const ExportLexiconModal = () => {
	const dispatch = useDispatch();
	const [modalState, temp, lexicon] = useSelector((state: any) => [state.modalState, state.temporaryInfo, state.lexicon], shallowEqual);
	const data = temp ? temp.data : undefined;
	const doClose = () => {
		dispatch(setTemporaryInfo(undefined));
		dispatch(closeModal('ExportLexicon'));
	};
	const exportExcel = () => {
		return (
			<ExcelFile>
				<ExcelSheet data = {[]} name={lexicon.title}>
					<ExcelColumn label="" value="moddedLabel" />
				</ExcelSheet>
			</ExcelFile>
		);
	};
	return (
		<IonModal isOpen={modalState.ExportLexicon} onDidDismiss={() => doClose()}>
			<IonHeader>
				<IonToolbar color="primary">
					<IonTitle>Export Lexicon</IonTitle>
					<IonButtons slot="end">
						<IonButton onClick={() => doClose()}>
							<IonIcon icon={closeCircleOutline} />
						</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<IonList lines="none" className="buttonFilled">
					<IonItem button={true} onClick={() => {}}>Plain Text</IonItem>
					<IonItem button={true} onClick={() => {}}>CSV File</IonItem>
					<IonItem button={true} onClick={() => exportExcel()}>Excel File</IonItem>
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

export default ExportLexiconModal;
