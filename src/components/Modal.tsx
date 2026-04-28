import React, { PropsWithChildren, FC, useMemo, ReactElement, useContext } from 'react';
import {
	IonIcon,
	IonContent,
	IonHeader,
	IonToolbar,
	IonButtons,
	IonButton,
	IonTitle,
	IonModal,
	IonFooter,
	ModalOptions
} from '@ionic/react';
import {
	addOutline,
	checkmarkOutline,
	chevronDownCircleOutline,
	closeOutline,
	downloadOutline,
	globeOutline,
	saveOutline,
	trashOutline
} from 'ionicons/icons';
import i18n from "../i18n";
import useI18Memo from './useI18Memo';
import { ExCharContext } from './contexts';

interface BaseProps extends Omit<ModalOptions, "component"> {
	isOpen: boolean
	closeFunc: () => void
	title: string
	action: () => void
	cancel?: string
	pre?: ReactElement
	post?: ReactElement
	extraChars?: boolean
}

type Types = "save" | "load" | "export" | "delete" | "add";

interface TextButtonProps extends BaseProps {
	button: string
	icon: string
	type?: never
}

interface PreSelectedProps extends BaseProps {
	type: Types
	icon?: never
	button?: never
}

type ModalProps = TextButtonProps | PreSelectedProps;

const translations = ["Close", "Cancel", "ExtraChars"];

const getIcon = (input: Types) => {
	switch(input) {
		case "save":
			return saveOutline;
		case "add":
			return addOutline;
		case "load":
			return chevronDownCircleOutline;
		case "export":
			return downloadOutline;
		case "delete":
			return trashOutline;
	}
};

const Modal: FC<PropsWithChildren<ModalProps>> = (props) => {
	const {
		isOpen,
		closeFunc,
		title,
		button,
		icon,
		type,
		action,
		cancel,
		backdropDismiss,
		pre,
		post,
		extraChars,
		children
	} = props;
	const openEx = useContext(ExCharContext);
	const [tClose, tCancel, tExChar] = useI18Memo(translations);
	const text = useMemo(() => {
		if(button) {
			return button;
		} else if (type) {
			return i18n.t(type.replace(/^(.+)$/, "modal.$1Info"), { context: { title } });
		}
		return "ERROR MODAL 1.1";
	}, [button, type, title]);
	const iconString = icon ? icon : (type ? getIcon(type) : checkmarkOutline);
	return (
		<IonModal
			isOpen={isOpen}
			onDidDismiss={closeFunc}
			backdropDismiss={backdropDismiss}
		>
			<IonHeader>
				<IonToolbar color="primary">
					<IonTitle>{title}</IonTitle>
					<IonButtons slot="end">
						{extraChars ?
							<IonButton onClick={openEx} aria-label={tExChar}>
								<IonIcon icon={globeOutline} />
							</IonButton>
						: <></>}
						{pre || <></>}
						<IonButton onClick={closeFunc} aria-label={tClose}>
							<IonIcon icon={closeOutline} />
						</IonButton>
						{post || <></>}
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				{children}
			</IonContent>
			<IonFooter>
				<IonToolbar>
					<IonButtons slot="start">
						<IonButton onClick={closeFunc} aria-label={tClose} color="danger">
							{cancel || tCancel}
							<IonIcon icon={closeOutline} slot="end" />
						</IonButton>
					</IonButtons>
					<IonButtons slot="end">
						<IonButton onClick={action} color="warning">
							{text}
							<IonIcon icon={iconString} slot="end" />
						</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonFooter>
		</IonModal>
	);
};

export default Modal;
