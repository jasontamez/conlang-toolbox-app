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
	IonItemDivider,
	IonSelect,
	IonSelectOption,
	IonNote
} from '@ionic/react';
import {
	closeCircleOutline,
	checkmarkCircleSharp,
	addCircleSharp
} from 'ionicons/icons';
import { useSelector, useDispatch } from "react-redux";
import ISO6391, { LanguageCode } from "iso-639-1";

import { ModalProperties, SortSensitivity, StateObject } from '../store/types';
import { setSortLanguageCustom, setSortSensitivity } from '../store/sortingSlice';

const SortSettingsModal = (props: ModalProperties) => {
	const { isOpen, setIsOpen } = props;
	const dispatch = useDispatch();
	const [langObj, setLangObj] = useState<{[key: string]: string}>({});
	const { sortLanguage, sortLanguageCustom, sensitivity, customSorts } = useSelector((state: StateObject) => state.sortSettings);
	const cancel = () => {
		setIsOpen(false);
	};
	const codes = ISO6391.getAllCodes();
	const names = ISO6391.getAllNativeNames();
	const languages = Intl.Collator.supportedLocalesOf(codes);
	const setCustomLang = (value: LanguageCode | "default") => {
		dispatch(setSortLanguageCustom(value === "default" ? null : value));
	};
	const setSensitivity = (value: SortSensitivity | "default") => {
		dispatch(setSortSensitivity(value === "default" ? null : value));
	};
	const fixObject = () => {
		const newLangs: {[key: string]: string} = {};
		codes.forEach((code, i) => {
			newLangs[code] = names[i];
		});
		setLangObj(newLangs);
	};
	return (
		<IonModal isOpen={isOpen} onDidDismiss={() => setIsOpen(false)} onIonModalWillPresent={fixObject}>
			<IonHeader>
				<IonToolbar color="primary">
					<IonTitle>Manage Sort Methods</IonTitle>
					<IonButtons slot="end">
						<IonButton onClick={() => cancel()}>
							<IonIcon icon={closeCircleOutline} />
						</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<IonList lines="none" className="buttonFilled">
					<IonItemDivider>Basic Sort</IonItemDivider>
					<IonItem className="wrappableInnards">
						<IonSelect color="primary" className="ion-text-wrap settings" label="Sort Language:" value={sortLanguageCustom || sortLanguage || "default"} onIonChange={(e) => setCustomLang(e.detail.value)}>
							{languages.map((language) => (
								<IonSelectOption key={`knownLang:${language}`} className="ion-text-wrap ion-text-align-right" value={language}>{langObj[language] || language}</IonSelectOption>
							))}
							<IonSelectOption className="ion-text-wrap ion-text-align-right" value="default">Default device sort</IonSelectOption>
						</IonSelect>
					</IonItem>
					<IonItem className="wrappableInnards">
						<IonSelect color="primary" className="ion-text-wrap settings" label="Sort Sensitivity:" value={sensitivity || "variant"} onIonChange={(e) => setSensitivity(e.detail.value)}>
							<IonSelectOption className="ion-text-wrap ion-text-align-right" value="base">[ȁ = Ȁ, a = ȁ]: Base letters only</IonSelectOption>
							<IonSelectOption className="ion-text-wrap ion-text-align-right" value="accent">[ȁ = Ȁ, a ≠ ȁ]: Diacritics</IonSelectOption>
							<IonSelectOption className="ion-text-wrap ion-text-align-right" value="case">[ȁ ≠ Ȁ, a = ȁ]: Upper/lowercase</IonSelectOption>
							<IonSelectOption className="ion-text-wrap ion-text-align-right" value="variant">[ȁ ≠ Ȁ, a ≠ ȁ]: Diacritics and upper/lowercase</IonSelectOption>
						</IonSelect>
					</IonItem>
					<IonItemDivider>Custom Sort Methods</IonItemDivider>
					{customSorts.map(sorter => {
						const {
							id,
							title,
							sortLanguage,
							sensitivity = "variant",
							customAlphabet,
							comparisons,
							equalities
						} = sorter;
						const desc: string[] = [];
						sortLanguage && desc.push(sortLanguage);
						desc.push(sensitivity || "variant");
						customAlphabet && desc.push("custom alphabet");
						comparisons && comparisons.length > 0 && desc.push(`${comparisons.length} comparisons`);
						equalities && equalities.length > 0 && desc.push(`${equalities.length} equalities`);
						return (
							<IonItem key={id}>
								<IonLabel>{title}</IonLabel>
								<IonNote>{desc.join("; ")}</IonNote>
							</IonItem>
						);
					})}
				</IonList>
			</IonContent>
			<IonFooter>
				<IonToolbar>
					<IonButton color="primary" slot="start" onClick={() => setIsOpen(false)}>
						<IonIcon icon={addCircleSharp} slot="end" />
						<IonLabel>New Custom Sort</IonLabel>
					</IonButton>
					<IonButton color="success" slot="end" onClick={() => setIsOpen(false)}>
						<IonIcon icon={checkmarkCircleSharp} slot="end" />
						<IonLabel>Done</IonLabel>
					</IonButton>
				</IonToolbar>
			</IonFooter>
		</IonModal>
	);
};

export default SortSettingsModal;
