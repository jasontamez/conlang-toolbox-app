import React, { MouseEvent, useState } from 'react';
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

import { ModalProperties, SetBooleanState, StateObject } from '../../../store/types';
import useTranslator from '../../../store/translationHooks';

import logger from '../../../components/Logging';
import doExport from '../../../components/ExportServices';
import doText from './Ex-Text';
import doDocx from './Ex-Docx';
import doXML from './Ex-XML';
import doJSON from './Ex-JSON';
//import doODT from './Ex-ODT';

interface ExportModalProps extends ModalProperties {
	setLoading: SetBooleanState
}

type IonItemEvent = MouseEvent<HTMLIonItemElement, globalThis.MouseEvent>;

const ExportSyntaxModal = (props: ExportModalProps) => {
	const [ t ] = useTranslator('ms');
	const [ tc ] = useTranslator('common');
	const { isOpen, setIsOpen, setLoading } = props;
	const [showUnused, setShowUnused] = useState<boolean>(true);
	const toast = useIonToast();
	const msInfo = useSelector((state: StateObject) => state.ms);
	const { title = tc("[Untitled]") } = msInfo;
	const doClose = () => {
		setIsOpen(false);
		setLoading(false);
	};
	const dispatch = useDispatch();
	const log = (info: string[]) => logger(dispatch, info);
	const doDownload = (e: MouseEvent<HTMLIonItemElement, globalThis.MouseEvent>, output: string, extension: string) => {
		e.preventDefault();
		const filename =  tc("fileFormat", { title, date: (new Date()).toDateString(), extension });
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
					<IonTitle>{tc("exportTitle", {title})}</IonTitle>
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
							<h2>{t("Show Unused Sections")}</h2>
							<p>
								{t("showUnusedDesc1")}
								<strong>{t("showUnusedDesc2")}</strong>
							</p>
						</IonToggle>
					</IonItem>
					<IonItem>{tc("Choose a format", { context: "presentation" })}</IonItem>
					<IonItem
						button={true}
						onClick={(e: IonItemEvent) => doText(e, msInfo, doDownload, showUnused)}
						className="striped"
					>
						<IonIcon icon={documentTextOutline} className="ion-padding-start" slot="start" />
						<IonLabel className="ion-text-wrap">{tc("Text File (plain)")}</IonLabel>
					</IonItem>
					<IonItem
						button={true}
						onClick={(e: IonItemEvent) => doText(e, msInfo, doDownload, showUnused, true)}
					>
						<IonIcon icon={documentTextOutline} className="ion-padding-start" slot="start" />
						<IonLabel className="ion-text-wrap">{tc("Text File (markdown)")}</IonLabel>
					</IonItem>
					<IonItem
						button={true}
						onClick={
							(e: IonItemEvent) => doDocx(
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
						<IonLabel className="ion-text-wrap">{tc("Word Document (docx)")}</IonLabel>
					</IonItem>
					<IonItem
						button={true}
						onClick={(e: IonItemEvent) => doJSON(e, msInfo, doDownload)}
					>
						<IonIcon icon={codeOutline} className="ion-padding-start" slot="start" />
						<IonLabel className="ion-text-wrap">{tc("JSON File")}</IonLabel>
					</IonItem>
					<IonItem
						button={true}
						onClick={(e: IonItemEvent) => doXML(e, msInfo, doDownload)}
						className="striped"
					>
						<IonIcon icon={codeOutline} className="ion-padding-start" slot="start" />
						<IonLabel className="ion-text-wrap">{tc("XML File")}</IonLabel>
					</IonItem>
				</IonList>
				<a className="hide downloader" download={false} href=".">download it</a>
			</IonContent>
			<IonFooter>
				<IonToolbar>
					<IonButton color="warning" slot="end" onClick={() => doClose()}>
						<IonIcon icon={closeCircleOutline} slot="start" />
						<IonLabel>{tc("Cancel")}</IonLabel>
					</IonButton>
				</IonToolbar>
			</IonFooter>
		</IonModal>
	);
};

export default ExportSyntaxModal;
