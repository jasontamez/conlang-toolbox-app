import React, { useState } from 'react';
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
	useIonToast,
	IonToggle
} from '@ionic/react';
import {
	closeCircleOutline,
	codeOutline,
	documentOutline,
	documentTextOutline
} from 'ionicons/icons';
import { useDispatch, useSelector } from "react-redux";

import { ModalProperties, StateObject } from '../../../store/types';

import logger from '../../../components/Logging';
import doExport from '../../../components/ExportServices';
import doText from './Ex-Text';
import doDocx from './Ex-Docx';
import doXML from './Ex-XML';
import doJSON from './Ex-JSON';
//import doODT from './Ex-ODT';

interface ExportModalProps extends ModalProperties {
	setLoading: Function
}

const ExportSyntaxModal = (props: ExportModalProps) => {
	const { isOpen, setIsOpen, setLoading } = props;
	const [showUnused, setShowUnused] = useState<boolean>(true);
	const toast = useIonToast();
	const msInfo = useSelector((state: StateObject) => state.ms);
	const { title = "[Untitled]" } = msInfo;
	const doClose = () => {
		setIsOpen(false);
		setLoading(false);
	};
	const dispatch = useDispatch();
	const log = (info: string[]) => logger(dispatch, info);
	const doDownload = (e: Event, output: string, extension: string) => {
		e.preventDefault();
		const filename = `${title} - ${(new Date()).toDateString()}.${extension}`;
		setLoading(true);
		doExport(output, filename, toast, dispatch)
			.catch((e = "Error doexport") => {
				log(["ExportModal / doDownload", e]);
				doClose();
			})
			.then(() => doClose());
	};
	return (
		<IonModal isOpen={isOpen} onDidDismiss={() => doClose()}>
			<IonHeader>
				<IonToolbar color="primary">
					<IonTitle>Export: {title}</IonTitle>
					<IonButtons slot="end">
						<IonButton onClick={() => doClose()}>
							<IonIcon icon={closeCircleOutline} />
						</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent id="exportSyntaxModal">
				<IonList lines="none" className="buttonFilled multiLinePossible">
					<IonItem lines="full" className="wrappableInnards">
						<IonToggle
							labelPlacement="start"
							enableOnOffLabels
							checked={showUnused}
							onIonChange={() => setShowUnused(!showUnused)}
						>
							<h2>Show Unused Sections</h2>
							<p>
								Include sections that you did not fill out, leaving space for you to write in
								later. <strong>NOTE:</strong> this option has no effect on JSON and XML exports.
							</p>
						</IonToggle>
					</IonItem>
					<IonItem>Choose a format:</IonItem>
					<IonItem
						button={true}
						onClick={(e: any) => doText(e, msInfo, doDownload, showUnused)}
						className="striped"
					>
						<IonIcon icon={documentTextOutline} className="ion-padding-start" slot="start" />
						<IonLabel className="ion-text-wrap">Text Outline (plain)</IonLabel>
					</IonItem>
					<IonItem
						button={true}
						onClick={(e: any) => doText(e, msInfo, doDownload, showUnused, true)}
					>
						<IonIcon icon={documentTextOutline} className="ion-padding-start" slot="start" />
						<IonLabel className="ion-text-wrap">Text Outline (markdown)</IonLabel>
					</IonItem>
					<IonItem
						button={true}
						onClick={
							(e: any) => doDocx(
								e,
								msInfo,
								showUnused,
								doClose,
								setLoading,
								toast,
								log
							)}
						className="striped"
					>
						<IonIcon icon={documentOutline} className="ion-padding-start" slot="start" />
						<IonLabel className="ion-text-wrap">Word Document (docx)</IonLabel>
					</IonItem>
					<IonItem
						button={true}
						onClick={(e: any) => doJSON(e, msInfo, doDownload)}
					>
						<IonIcon icon={codeOutline} className="ion-padding-start" slot="start" />
						<IonLabel className="ion-text-wrap">JSON File</IonLabel>
					</IonItem>
					<IonItem
						button={true}
						onClick={(e: any) => doXML(e, msInfo, doDownload)}
						className="striped"
					>
						<IonIcon icon={codeOutline} className="ion-padding-start" slot="start" />
						<IonLabel className="ion-text-wrap">XML File</IonLabel>
					</IonItem>
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
