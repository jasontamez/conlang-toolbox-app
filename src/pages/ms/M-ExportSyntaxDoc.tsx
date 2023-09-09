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
	IonFooter,
	useIonToast
} from '@ionic/react';
import {
	closeCircleOutline
} from 'ionicons/icons';
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import doExport from '../../components/ExportServices';
import doText from './Ex-Text';
import doDocx from './Ex-Docx';
import doXML from './Ex-XML';
import doJSON from './Ex-JSON';
import { ModalProperties } from '../../components/ReduxDucksTypes';
//import doODT from './Ex-ODT';

interface ExportModalProps extends ModalProperties {
	setLoading: Function
}

const ExportSyntaxModal = (props: ExportModalProps) => {
	const { isOpen, setIsOpen, setLoading } = props;
	const dispatch = useDispatch();
	const [doToast] = useIonToast();
	const msInfo = useSelector((state: any) => state.morphoSyntaxInfo, shallowEqual);
	const doClose = () => {
		setIsOpen(false);
		setLoading(false);
	};
	const doDownload = (e: Event, output: string, extension: string) => {
		e.preventDefault();
		const filename = msInfo.title + " - " + (new Date()).toDateString() + "." + extension;
		setLoading(true);
		doExport(output, filename, doToast)
			.catch((e = "Error doexport") => {
				console.log(e);
				doClose();
			})
			.then(() => doClose());
	};
	return (
		<IonModal isOpen={isOpen} onDidDismiss={() => doClose()}>
			<IonHeader>
				<IonToolbar color="primary">
					<IonTitle>Export MorphoSyntax Document: {msInfo.title || "[Untitled]"}</IonTitle>
					<IonButtons slot="end">
						<IonButton onClick={() => doClose()}>
							<IonIcon icon={closeCircleOutline} />
						</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<IonList lines="none" className="buttonFilled multiLinePossible">
					<IonItem>Choose a format:</IonItem>
					<IonItem button={true} onClick={(e: any) => doText(e, msInfo, doDownload)}>Text Outline (plain)</IonItem>
					<IonItem button={true} onClick={(e: any) => doText(e, msInfo, doDownload, true)}>Text Outline (markdown)</IonItem>
					<IonItem button={true} onClick={(e: any) => doDocx(e, msInfo, dispatch, doClose, setLoading, doToast)}>Word Document (docx)</IonItem>
					<IonItem button={true} onClick={(e: any) => doJSON(e, msInfo, doDownload)}>JSON File</IonItem>
					<IonItem button={true} onClick={(e: any) => doXML(e, msInfo, doDownload)}>XML File</IonItem>
				</IonList>
				<a className="hide downloader" download={false} href=".">download it</a>
			</IonContent>
			<IonFooter>
				<IonToolbar>
					<IonButton color="warning" slot="end" onClick={() => doClose()}>
						<IonIcon icon={closeCircleOutline} slot="start" />
						<IonLabel>Cancel</IonLabel>
					</IonButton>
				</IonToolbar>
			</IonFooter>
		</IonModal>
	);
};

export default ExportSyntaxModal;
