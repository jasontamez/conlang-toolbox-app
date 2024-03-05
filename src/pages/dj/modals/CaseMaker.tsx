import React, { useCallback, useState, FC, Fragment } from 'react';
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
	useIonAlert,
	useIonToast,
	IonItemDivider
} from '@ionic/react';
import {
	closeCircleOutline,
	saveOutline,
	globeOutline
} from 'ionicons/icons';

import {
	ExtraCharactersModalOpener,
	SetState
} from '../../../store/types';
import useTranslator from '../../../store/translationHooks';

import toaster from '../../../components/toaster';
import yesNoAlert from '../../../components/yesNoAlert';

interface CaseMakerModal extends ExtraCharactersModalOpener {
	setSavedTitle: SetState<string>
}

type caseBit = string | [string, string];

interface CaseObject {
	header: string
	content: caseBit[],
	extended?: caseBit[]
}
interface CaseItemProps {
	caseObject: CaseObject
	add: (x: caseBit) => void
	toggleTitleGroup: (c: string) => void
	titleGroup: {[key: string]: boolean}
}

const CaseItem: FC<CaseItemProps> = (props) => {
	const { caseObject, add, toggleTitleGroup, titleGroup } = props;
	const { header, content, extended } = caseObject;
	const [ t ] = useTranslator('dj');
	return (
		<IonItem className="wrappableInnards">
			<div className="caseObjects">
				<div className="title">{header}</div>
				<div className="options">
					{content.map((option) => {
						const title = Array.isArray(option) ? option[0] : option;
						return (
							<div
								key={`opt:${header}:${title}`}
								onClick={() => add(option)}
								className="option"
							>{title}</div>
						)
					})}
					{extended ? (
						<Fragment key={`opt-extra:${header}`}>
							<div
								className="toggleButton option"
								onClick={() => toggleTitleGroup(header)}
							>{t(titleGroup[header] ? "Hide" : "Show More")}</div>
							<div
								className={
									"toggleGroup " +
									(titleGroup[header]
										? "active"
										: "inactive")
								}
							>
								{extended.map((option) => {
									const title = Array.isArray(option) ? option[0] : option;
									return (
										<div
											key={`opt:${header}:${title}`}
											onClick={() => add(option)}
											className="option"
										>{title}</div>
									);
								})}
							</div>
						</Fragment>
					) : <></>}
				</div>
			</div>
		</IonItem>
	);
};

const CaseMaker = (props: CaseMakerModal) => {
	const {
		isOpen,
		setIsOpen,
		openECM,
		setSavedTitle
	} = props;
	const [doAlert] = useIonAlert();
	const toast = useIonToast();
	const [ t ] = useTranslator('dj');
	const [ tc ] = useTranslator('common');
	const [titleParts, setTitleParts] = useState<caseBit[]>([]);
	const [titleGroup, setTitleGroup] = useState<{[key: string]: boolean}>({});
	const onLoad = useCallback(() => {
		setTitleParts([]);
		setTitleGroup({});
	}, []);
	const closeModal = useCallback(() => {
		setIsOpen(false);
		setTitleParts([]);
		setTitleGroup({});
	}, [setIsOpen]);
	const caseObjects = t("cases", { returnObjects: true }) as CaseObject[];

	const toggleTitleGroup = useCallback((group: string) => {
		setTitleGroup({
			...titleGroup,
			[group]: !titleGroup[group]
		});
	}, [titleGroup]);
	const maybeSaveTitle = () => {
		if(titleParts.length === 0) {
			closeModal();
			return toaster({
				message: tc("Nothing to save."),
				position: "middle",
				color: "warning",
				duration: 2000,
				toast
			});
		}
		setSavedTitle(titleParts.map(part => Array.isArray(part) ? part.join("") : part + " ").join("").trim());
		closeModal();
		toaster({
			message: tc("thingSaved", { thing: tc("Title") }),
			position: "middle",
			color: "success",
			duration: 2000,
			toast
		});
	};

	const maybeCancel = () => {
		if(titleParts.length > 0) {
			return yesNoAlert({
				header: tc("Unsaved Info"),
				message: tc("Are you sure you want to discard this?"),
				cssClass: "warning",
				submit: tc("Yes Discard"),
				handler: closeModal,
				doAlert
			});
		}
		closeModal();
	};

	const add = useCallback((what: caseBit) => {
		setTitleParts([...titleParts, what]);
	}, [titleParts]);

	const remove = useCallback((what: number) => {
		setTitleParts(titleParts.filter((str, i) => i !== what));
	}, [titleParts]);

	return (
		<IonModal isOpen={isOpen} backdropDismiss={false} onIonModalDidPresent={onLoad}>
			<IonHeader>
				<IonToolbar color="primary">
					<IonTitle>{t("declenjugatorTitle")}</IonTitle>
					<IonButtons slot="end">
						<IonButton onClick={() => openECM(true)} aria-label={tc("Extra Characters")}>
							<IonIcon icon={globeOutline} />
						</IonButton>
						<IonButton onClick={maybeCancel} aria-label={tc("Close")}>
							<IonIcon icon={closeCircleOutline} />
						</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<IonList lines="full" id="makingTitle" className="hasSpecialLabels">
					<IonItem>
						<IonLabel className="ion-text-wrap ion-text-center">{t("caseMakerInstructions")}</IonLabel>
					</IonItem>
					<IonItemDivider sticky>
						<div id="titleOutput">
							{titleParts.map((part: caseBit, i: number) => {
								const title = Array.isArray(part) ? part[0] : part;
								return <div onClick={() => remove(i)} key={`title-output:${title}:${i}`}>{title}</div>
							})}
						</div>
					</IonItemDivider>
					{
						caseObjects.map((group) => {
							return (
								<CaseItem
									key={`grouping:${group.header}`} 
									caseObject={group}
									add={add}
									toggleTitleGroup={toggleTitleGroup}
									titleGroup={titleGroup}
								/>
							);
						})
					}
				</IonList>
			</IonContent>
			<IonFooter className="modalBorderTop">
				<IonToolbar>
					<IonButton
						color="warning"
						slot="start"
						onClick={maybeCancel}
					>
						<IonIcon icon={closeCircleOutline} slot="end" />
						<IonLabel>{tc("Cancel")}</IonLabel>
					</IonButton>
					<IonButton
						color="success"
						slot="end"
						onClick={maybeSaveTitle}
					>
						<IonIcon icon={saveOutline} slot="end" />
						<IonLabel>{tc("Save")}</IonLabel>
					</IonButton>
				</IonToolbar>
			</IonFooter>
		</IonModal>
	);
};

export default CaseMaker;
