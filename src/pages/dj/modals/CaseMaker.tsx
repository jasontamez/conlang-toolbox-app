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
	ExtraCharactersModalOpener,
	SetState
} from '../../../store/types';

import toaster from '../../../components/toaster';
import yesNoAlert from '../../../components/yesNoAlert';

interface CaseMakerModal extends ExtraCharactersModalOpener {
	setSavedTitle: SetState<string>
}

const titleOptions: [string, ...(string | string[])[]][] = [
	["Modifiers", "non-", "high-", "low-", "formal ", "diminutive ", "augmentative ", "emphatic "],
	["Number", "singular ", "plural ", "dual ", "trial ", "paucal ", "definite ", "indefinite "],
	["Noun Case", "male ", "female ", "neuter ", "animate ", "inanimate "],
	["Grammatical Case", "nominative ", "accusative ", "genitive ", "dative ", "ablative ",
		"instrumental ", "locative ",
		[
			"vocative ", "ergative ", "absolutive ", "partitive ", "abessive ", "adessive ",
			"allative ", "benefactive ", "causal ", "comitative ", "delative ", "distributive ",
			"elative ", "essive ", "illative ", "inessive ", "instructive ", "interrogative ",
			"semblative ", "sociative ", "sublative ", "superessive ", "temporal ", "terminative ",
			"translative ", "proximal ", "relative ", "adverbial ", "oblique ", "prepositional "
		]
	],
	["Person", "1st-person ", "2nd-person ", "3rd-person ", "1s ", "1pl ", "2s ", "2pl ",
		"3s ", "3pl "],
	["Tense", "past ", "present ", "future "],
	["Aspect", "perfective ", "imperfective ", "perfect ", "continuative ", "progressive ",
		[
			"pluperfect ", "habitual ", "punctual ", "iterative ", "completive ",
			"inceptive ", "atelic ", "telic ", "static "
		]
	],
	["Mode", "realis ", "irrealis ", "conditional", "subjunctive ", "interrogative",
		[
			"optative ", "deontic ", "hypothetical ", "imaginary ", "potential ", "evidentiality ",
			"validationality ", "mirativity "
		]
	],
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
	const toast = useIonToast();
	const [titleParts, setTitleParts] = useState<string[]>([]);
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

	const toggleTitleGroup = (group: string) => {
		setTitleGroup({
			...titleGroup,
			[group]: !titleGroup[group]
		});
	};
	const maybeSaveTitle = () => {
		if(titleParts.length === 0) {
			closeModal();
			return toaster({
				message: "Nothing to save.",
				position: "middle",
				color: "warning",
				duration: 2000,
				toast
			});
		}
		setSavedTitle(titleParts.join("").trim());
		closeModal();
		toaster({
			message: "Title saved.",
			position: "middle",
			color: "success",
			duration: 2000,
			toast
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
						titleOptions.map((group) => {
							const [header, ...rest] = group;
							return (
								<IonItem key={`grouping:${header}`} className="wrappableInnards">
									<div className="titleOptions">
										<div className="title">{header}</div>
										<div className="options">
											{rest.map((option: string| string[]) => {
												if (Array.isArray(option)) {
													return (<React.Fragment key={`opt-extra:${header}`}>
														<div
															className="toggleButton option"
															onClick={() => toggleTitleGroup(header)}
														>{titleGroup[header] ? "Hide" : "Show More"}</div>
														<div
															className={
																"toggleGroup " +
																(titleGroup[header]
																	? "active"
																	: "inactive")
															}
														>
															{option.map((innerOption: string) => {
																return (
																	<div
																		key={`opt:${header}:${innerOption}`}
																		onClick={() => add(innerOption)}
																		className="option"
																	>{innerOption}</div>
																);
															})}
														</div>
													</React.Fragment>);
												}
												return (
													<div
														key={`opt:${header}:${option}`}
														onClick={() => add(option)}
														className="option"
													>{option}</div>
												)
											})}
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
