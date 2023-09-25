import React, { useEffect, useMemo, useState } from 'react';
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
	IonFooter,
	IonItemDivider,
	IonSelect,
	IonSelectOption,
	IonPage,
	useIonRouter,
	IonItemSliding,
	IonItemOptions,
	IonItemOption
} from '@ionic/react';
import {
	closeCircleOutline,
	checkmarkCircleSharp,
	addCircleSharp,
	trash
} from 'ionicons/icons';
import { useSelector, useDispatch } from "react-redux";
import ISO6391, { LanguageCode } from "iso-639-1";

import { EqualityObject, PageData, RelationObject, SortSensitivity, StateObject } from '../store/types';
import { setSortLanguageCustom, setSortSensitivity } from '../store/sortingSlice';

import ExtraCharactersModal from './modals/ExtraCharacters';
import AddCustomSort from './modals/AddCustomSort';
import AddCustomSortRelation from './modals/AddCustomSortRelation';
import AddCustomSortEquality from './modals/AddCustomSortEquality';

const SortSettings = (props: PageData) => {
	const { modalPropsMaker } = props;
	const dispatch = useDispatch();
	const nav = useIonRouter();
	const [langObj, setLangObj] = useState<{[key: string]: string}>({});
	const [isOpenECM, setIsOpenECM] = useState<boolean>(false);
	const [addModalOpen, setAddModalOpen] = useState<boolean>(false);
	const [addRelationOpen, setAddRelationOpen] = useState<boolean>(false);
	const [savedRelation, setSavedRelation] = useState<RelationObject | null>(null);
	const [addEqualityOpen, setAddEqualityOpen] = useState<boolean>(false);
	const [savedEquality, setSavedEquality] = useState<EqualityObject | null>(null);
	const { defaultSortLanguage, sortLanguage, sensitivity, customSorts } = useSelector((state: StateObject) => state.sortSettings);
	const codes = ISO6391.getAllCodes();
	const names = ISO6391.getAllNativeNames();
	const languages = Intl.Collator.supportedLocalesOf(codes);
	const setCustomLang = (value: LanguageCode | "unicode") => {
		dispatch(setSortLanguageCustom(value === "unicode" ? null : value));
	};
	const setSensitivity = (value: SortSensitivity | "unicode") => {
		dispatch(setSortSensitivity(value === "unicode" ? null : value));
	};
	useEffect(() => {
		const newLangs: {[key: string]: string} = {};
		codes.forEach((code, i) => {
			newLangs[code] = names[i];
		});
		setLangObj(newLangs);
	}, [codes, names]);
	const addRelationModalInfo = useMemo(() => modalPropsMaker(addRelationOpen, setAddRelationOpen), [addRelationOpen, modalPropsMaker]);
	const addEqualityModalInfo = useMemo(() => modalPropsMaker(addEqualityOpen, setAddEqualityOpen), [addEqualityOpen, modalPropsMaker]);
	return (
		<IonPage>
			<AddCustomSort
				{...modalPropsMaker(addModalOpen, setAddModalOpen)}
				openECM={setIsOpenECM}
				langObj={langObj}
				languages={languages}
				addRelationModalInfo={addRelationModalInfo}
				savedRelation={savedRelation}
				setSavedRelation={setSavedRelation}
				addEqualityModalInfo={addEqualityModalInfo}
				savedEquality={savedEquality}
				setSavedEquality={setSavedEquality}
			/>
			<AddCustomSortRelation
				{...addRelationModalInfo}
				openECM={setIsOpenECM}
				langObj={langObj}
				languages={languages}
				setSavedRelation={setSavedRelation}
			/>
			<AddCustomSortEquality
				{...addEqualityModalInfo}
				openECM={setIsOpenECM}
				langObj={langObj}
				languages={languages}
				setSavedEquality={setSavedEquality}
			/>
			{ /* Eventual Edit modal will need access to the two adders above */}
			<ExtraCharactersModal {...modalPropsMaker(isOpenECM, setIsOpenECM)} />
			<IonHeader>
				<IonToolbar color="primary">
					<IonTitle>Manage Sort Methods</IonTitle>
					<IonButtons slot="end">
						<IonButton onClick={() => nav.goBack()}>
							<IonIcon icon={closeCircleOutline} />
						</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<IonList lines="full" className="buttonFilled">
					<IonItemDivider>Basic Sort</IonItemDivider>
					<IonItem className="wrappableInnards">
						<IonSelect color="primary" className="ion-text-wrap settings" label="Sort Language:" value={sortLanguage || defaultSortLanguage || "unicode"} onIonChange={(e) => setCustomLang(e.detail.value)}>
							{languages.map((language) => (
								<IonSelectOption key={`knownLang:${language}`} className="ion-text-wrap ion-text-align-end" value={language}>{langObj[language] || language}</IonSelectOption>
							))}
							<IonSelectOption className="ion-text-wrap ion-text-align-end" value="unicode">Unicode sort (language-independent)</IonSelectOption>
						</IonSelect>
					</IonItem>
					<IonItem className="wrappableInnards">
						<IonSelect color="primary" className="ion-text-wrap settings" label="Sort Sensitivity:" value={sensitivity || "variant"} onIonChange={(e) => setSensitivity(e.detail.value)}>
							<IonSelectOption className="ion-text-wrap ion-text-align-end" value="base">[ȁ = Ȁ, a = ȁ]: Base letters only</IonSelectOption>
							<IonSelectOption className="ion-text-wrap ion-text-align-end" value="accent">[ȁ = Ȁ, a ≠ ȁ]: Diacritics</IonSelectOption>
							<IonSelectOption className="ion-text-wrap ion-text-align-end" value="case">[ȁ ≠ Ȁ, a = ȁ]: Upper/lowercase</IonSelectOption>
							<IonSelectOption className="ion-text-wrap ion-text-align-end" value="variant">[ȁ ≠ Ȁ, a ≠ ȁ]: Diacritics and upper/lowercase</IonSelectOption>
						</IonSelect>
					</IonItem>
					<IonItemDivider>Custom Sort Methods</IonItemDivider>
					{customSorts.length > 0 ?
						customSorts.map(sorter => {
							const {
								id,
								title,
								defaultSortLanguage,
								sensitivity = "variant",
								customAlphabet,
								relations,
								equalities
							} = sorter;
							const desc: string[] = [];
							defaultSortLanguage && desc.push(defaultSortLanguage);
							desc.push(sensitivity || "variant");
							customAlphabet && desc.push("custom alphabet");
							relations && relations.length > 0 && desc.push(`${relations.length} relations`);
							equalities && equalities.length > 0 && desc.push(`${equalities.length} equalities`);
							return (
								<IonItemSliding key={id}>
									<IonItemOptions side="end" className="serifChars">
										<IonItemOption color="primary" aria-label="Edit" onClick={() => 3}>
											<IonIcon slot="icon-only" src="svg/edit.svg" />
										</IonItemOption>
										<IonItemOption color="danger" aria-label="Delete" onClick={() => 3}>
											<IonIcon slot="icon-only" icon={trash} />
										</IonItemOption>
									</IonItemOptions>
									<IonItem>
										<IonLabel>
											<h2>{title}</h2>
											<p>{desc.join("; ")}</p>
										</IonLabel>
										<IonIcon size="small" slot="end" src="svg/slide-indicator.svg" />
									</IonItem>
								</IonItemSliding>
							);
						})
					:
						<IonItem>
							<IonLabel className="ion-text-align-end"><em>(none)</em></IonLabel>
						</IonItem>
					}
				</IonList>
			</IonContent>
			<IonFooter>
				<IonToolbar>
					<IonButton color="primary" slot="start" onClick={() => 333}>
						<IonIcon icon={addCircleSharp} slot="end" />
						<IonLabel>New Custom Sort</IonLabel>
					</IonButton>
					<IonButton color="success" slot="end" onClick={() => nav.goBack()}>
						<IonIcon icon={checkmarkCircleSharp} slot="end" />
						<IonLabel>Done</IonLabel>
					</IonButton>
				</IonToolbar>
			</IonFooter>
		</IonPage>
	);
};

export default SortSettings;
