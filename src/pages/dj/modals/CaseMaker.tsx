import React, { useCallback, useState } from 'react';
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
	ExtraCharactersModalOpener
} from '../../../store/types';

import toaster from '../../../components/toaster';
import yesNoAlert from '../../../components/yesNoAlert';

interface CaseMakerModal extends ExtraCharactersModalOpener {
	setSavedTitle: Function
}

const titleOptions = [
	["Modifiers", "non-", "high-", "low-", "formal ", "diminutive ", "augmentative ", "emphatic "],
	["Number", "singular ", "plural ", "dual ", "trial ", "paucal ", "definite ", "indefinite "],
	["Noun Case", "male ", "female ", "neuter ", "animate ", "inanimate "],
	["Grammatical Case", "nominative ", "accusative ", "genitive ", "locative ", "vocative ",
		"dative ", "ablative ", "instrumental ", "ergative ", "partitive ", "absolutive ",
		"abessive ", "adessive ", "allative ", "benefactive ", "causal ", "comitative ",
		"delative ", "distributive ", "elative ", "essive ", "illative ", "inessive ",
		"instructive ", "interrogative ", "semblative ", "sociative ", "sublative ",
		"superessive ", "temporal ", "terminative ", "translative ", "proximal ", "relative ",
		"adverbial ", "oblique ", "prepositional "
	],
	["Tense", "past ", "present ", "future "],
	["Aspect", "perfective ", "imperfective ", "perfect ", "pluperfect ", "completive ",
		"inceptive ", "progressive ", "continuative ", "habitual ", "punctual ", "iterative ",
		"atelic ", "telic ", "static "],
	["Mode", "realis ", "irrealis ", "subjunctive ", "optative ", "deontic ", "hypothetical ",
		"potential ", "evidentiality ", "validationality ", "mirativity "],
	["Valence", "causative ", "applicative ", "reflexive ", "reciprocal ", "passive ", "inverse ",
		"anticausative ", "antipassive "]
];

const CaseMaker = (props: CaseMakerModal) => {
	const {
		isOpen,
		setIsOpen,
		openECM,
		setSavedTitle
	} = props;
	const [doAlert] = useIonAlert();
	const [doToast, undoToast] = useIonToast();
	const [titleParts, setTitleParts] = useState<string[]>([]);
	const onLoad = useCallback(() => {
		setTitleParts([]);
	}, []);
	const closeModal = useCallback(() => {
		setIsOpen(false);
	}, [setIsOpen]);

	const maybeSaveTitle = () => {
		if(titleParts.length === 0) {
			closeModal();
			return toaster({
				message: "Nothing to save.",
				position: "middle",
				color: "warning",
				duration: 2000,
				doToast,
				undoToast
			});
		}
		setSavedTitle(titleParts.join("").trim());
		closeModal();
		toaster({
			message: "Title saved.",
			position: "middle",
			color: "success",
			duration: 2000,
			doToast,
			undoToast
		});
	};

	const maybeCancel = () => {
		if(titleParts.length > 0) {
			return yesNoAlert({
				header: "Unsaved Info",
				message: "Are you sure you want to discard this?",
				cssClass: "warning",
				submit: "Yes, Close",
				handler: closeModal,
				doAlert
			});
		}
		closeModal();
	};

	const add = (what: string) => {
		setTitleParts([...titleParts, what]);
	};

	const remove = (what: number) => {
		setTitleParts(titleParts.filter((str, i) => i !== what));
	};

	return (
		<IonModal isOpen={isOpen} backdropDismiss={false} onIonModalDidPresent={onLoad}>
			<IonHeader>
				<IonToolbar color="primary">
					<IonTitle>Declension/Conjugation Title</IonTitle>
					<IonButtons slot="end">
						<IonButton onClick={() => openECM(true)}>
							<IonIcon icon={globeOutline} />
						</IonButton>
						<IonButton onClick={maybeCancel}>
							<IonIcon icon={closeCircleOutline} />
						</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<IonList lines="full" id="makingTitle" className="hasSpecialLabels">
					<IonItem>
						<IonLabel className="ion-text-wrap ion-text-center">Tap on terms to add them. Tap them again to remove them. Tap save button when you're finished.</IonLabel>
					</IonItem>
					<IonItemDivider sticky>
						<div id="titleOutput">
							{titleParts.map((part: string, i: number) => {
								return <div onClick={() => remove(i)} key={`title-output:${part}:${i}`}>{part}</div>
							})}
						</div>
					</IonItemDivider>
					{
						titleOptions.map((group: string[]) => {
							const [header, ...rest] = group;
							return (
								<IonItem key={`grouping:${header}`} className="wrappableInnards">
									<div className="titleOptions">
										<div className="title">{header}</div>
										<div className="options">
											{rest.map(option => (
												<div
													key={`opt:${header}:${option}`}
													onClick={() => add(option)}
												>{option}</div>
											))}
										</div>
									</div>
								</IonItem>
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
						<IonLabel>Cancel</IonLabel>
					</IonButton>
					<IonButton
						color="success"
						slot="end"
						onClick={maybeSaveTitle}
					>
						<IonIcon icon={saveOutline} slot="end" />
						<IonLabel>Save</IonLabel>
					</IonButton>
				</IonToolbar>
			</IonFooter>
		</IonModal>
	);
};

export default CaseMaker;
