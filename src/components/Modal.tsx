import React, { PropsWithChildren, useCallback, FC, useMemo, ReactElement, useContext } from 'react';
import {
	IonIcon,
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
	addOutline,
	checkmarkOutline,
	chevronDownCircleOutline,
	closeOutline,
	downloadOutline,
	globeOutline,
	saveOutline,
	trashOutline
} from 'ionicons/icons';
import { SetBooleanState } from '../store/types';
import i18n from "../i18n";
import useI18Memo from './useI18Memo';
import { ExCharContext } from './contexts';

interface BaseProps {
	isOpen: boolean
	setIsOpen: SetBooleanState
	title: string
	action: () => void
	cancel?: string
	backdropDismiss?: boolean
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
		setIsOpen,
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
	const closer = useCallback(() => setIsOpen(false), [setIsOpen]);
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
			onDidDismiss={closer}
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
						<IonButton onClick={closer} aria-label={tClose}>
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
						<IonButton onClick={closer} aria-label={tClose} color="danger">
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
