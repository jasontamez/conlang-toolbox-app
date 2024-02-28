import React from 'react';
import {
	IonPage,
	IonContent,
	IonList,
	useIonViewDidEnter
} from '@ionic/react';
import { useDispatch, useSelector } from "react-redux";

import { PageData, StateObject } from '../../store/types';
import { setLastViewMS } from '../../store/internalsSlice';
import useTranslator from '../../store/translationHooks';

import {
	CheckboxItem,
	CheckboxTransExportProps,
	CheckboxTransProps,
	HeaderItem,
	InfoModal,
	SyntaxHeader,
	TextItem,
	MSMarkdown
} from './MorphoSyntaxElements';

const Syntax = (props: PageData) => {
	const [ t ] = useTranslator('ms');
	const { modalPropsMaker } = props;
	const {
		BOOL_numSing,
		BOOL_numDual,
		BOOL_numTrial,
		BOOL_numPaucal,
		BOOL_numPlural,
		BOOL_classGen,
		BOOL_classAnim,
		BOOL_classShape,
		BOOL_classFunction,
		BOOL_classOther,
		BOOL_dimAugYes,
		BOOL_dimAugObligatory,
		BOOL_dimAugProductive,
		TEXT_compounding,
		TEXT_denoms,
		TEXT_nNumberOpt,
		TEXT_nNumberObl,
		TEXT_nCase,
		TEXT_articles,
		TEXT_demonstratives,
		TEXT_possessors,
		TEXT_classGender,
		TEXT_dimAug
	} = useSelector((state: StateObject) => state.ms);
	const dispatch = useDispatch();
	useIonViewDidEnter(() => {
		dispatch(setLastViewMS("ms04"));
	});
	return (
		<IonPage>
			<SyntaxHeader
				title={t("4-Noun and Noun Phrase Operations")}
				{...props}
			/>
			<IonContent fullscreen
				className="evenBackground disappearingHeaderKludgeFix"
				id="morphoSyntaxPage"
			>
				<IonList lines="none" className="hasSpecialLabels">
					<HeaderItem level={1}>{t("4-Noun and Noun Phrase Operations")}</HeaderItem>
					<HeaderItem level={2}>{t("4-1-Compounding")}</HeaderItem>
					<InfoModal
						title={t("Compounding")}
						label={t("Noun-Piles")}
						modalPropsMaker={modalPropsMaker}
					>
						<MSMarkdown>{t("info41", { joinArrays: "\n" })}</MSMarkdown>
					</InfoModal>
					<TextItem
						prop="TEXT_compounding"
						value={TEXT_compounding}
						rows={4}
					>{t("Describe the sorts of compounding that happen in the language (if any).")}</TextItem>
					<HeaderItem level={2}>{t("4-2-Denominalization")}</HeaderItem>
					<InfoModal
						title={t("Denominalization")}
						label={t("Verbing a Noun")}
						modalPropsMaker={modalPropsMaker}
					>
						<MSMarkdown>{t("info42", { joinArrays: "\n" })}</MSMarkdown>
					</InfoModal>
					<TextItem
						prop="TEXT_denoms"
						value={TEXT_denoms}
						rows={4}
					>{t("Are there any processes to make a verb from a noun? An adjective? An adverb?")}</TextItem>
					<HeaderItem level={2}>{t("4-3-Number Marking")}</HeaderItem>
					<InfoModal
						title={t("Number Marking")}
						label={t("Plurality, etc.")}
						modalPropsMaker={modalPropsMaker}
					>
						<MSMarkdown>{t("info43", { joinArrays: "\n" })}</MSMarkdown>
					</InfoModal>
					<CheckboxItem
						display={{
							class: "cols2",
							boxesPerRow: 1,
							...(t("checkboxNumberMarking", { returnObjects: true }) as CheckboxTransProps),
							export: t("checkboxNumberMarkingExport", { returnObjects: true }) as CheckboxTransExportProps
						}}
						boxes={["BOOL_numSing", "BOOL_numDual", "BOOL_numTrial", "BOOL_numPaucal", "BOOL_numPlural"]}
						values={[BOOL_numSing, BOOL_numDual, BOOL_numTrial, BOOL_numPaucal, BOOL_numPlural]}
					/>
					<TextItem
						prop="TEXT_nNumberOpt"
						value={TEXT_nNumberOpt}
						rows={3}
					>{t("Is the distinction between singular and non-singular obligatory, optional or absent? If number-marking is optional, when does it tend to occur? When does it not tend to occur?")}</TextItem>
					<TextItem
						prop="TEXT_nNumberObl"
						value={TEXT_nNumberObl}
						rows={6}
					>{t("If number-marking is obligatory, is number marking overtly expressed for all noun phrases, or only some subclasses (e.g. animates)?")}</TextItem>
					<HeaderItem level={2}>{t("4-4-Case Marking")}</HeaderItem>
					<InfoModal
						title={t("Case Marking")}
						label={t("How it works")}
						modalPropsMaker={modalPropsMaker}
					>
						<MSMarkdown>{t("info44", { joinArrays: "\n" })}</MSMarkdown>
					</InfoModal>
					<TextItem
						prop="TEXT_nCase"
						value={TEXT_nCase}
						rows={4}
					>{t("Do nouns exhibit morphological case? If so, what cases exist?")}</TextItem>
					<HeaderItem level={2}>{t("4-5-Articles and Demonstratives")}</HeaderItem>
					<InfoModal
						title={t("Articles")}
						label={t("What Are They?")}
						modalPropsMaker={modalPropsMaker}
					>
						<MSMarkdown>{t("info45", { joinArrays: "\n" })}</MSMarkdown>
					</InfoModal>
					<TextItem
						prop="TEXT_articles"
						value={TEXT_articles}
						rows={6}
					>{t("If articles exist, are they obligatory or optional? When do they occur? Are they separate words or bound morphemes?")}</TextItem>
					<TextItem
						prop="TEXT_demonstratives"
						value={TEXT_demonstratives}
						rows={6}
					>{t("How many levels of distance do demonstratives encode? Are there other distinctions besides distance?")}</TextItem>
					<HeaderItem level={2}>{t("4-6-Possessors")}</HeaderItem>
					<InfoModal
						title={t("Possessors")}
						label={t("Possessor Expressions")}
						modalPropsMaker={modalPropsMaker}
					>
						<MSMarkdown>{t("info46", { joinArrays: "\n" })}</MSMarkdown>
					</InfoModal>
					<TextItem
						prop="TEXT_possessors"
						value={TEXT_possessors}
						rows={3}
					>{t("Describe how possession works in a noun phrase.")}</TextItem>
					<HeaderItem level={2}>{t("4-7-Class (Gender)")}</HeaderItem>
					<InfoModal
						title={t("Class and Gender")}
						label={t("What They Are")}
						modalPropsMaker={modalPropsMaker}
					>
						<MSMarkdown>{t("info47", { joinArrays: "\n" })}</MSMarkdown>
					</InfoModal>
					<CheckboxItem
						display={{
							class: "cols2",
							boxesPerRow: 1,
							...(t("checkboxNounClasses", { returnObjects: true }) as CheckboxTransProps),
							export: t("checkboxNounClassesExport", { returnObjects: true }) as CheckboxTransExportProps
						}}
						boxes={["BOOL_classGen", "BOOL_classAnim", "BOOL_classShape", "BOOL_classFunction", "BOOL_classOther"]}
						values={[BOOL_classGen, BOOL_classAnim, BOOL_classShape, BOOL_classFunction, BOOL_classOther]}
					/>
					<TextItem
						prop="TEXT_classGender"
						value={TEXT_classGender}
						rows={8}
					>{t("Describe the language's class/gender system, if it has one. What classes/genders exist and how do they manifest? What dimension(s) of reality is central to the class system? How do they interact with numerals, verbs and adjectives?")}</TextItem>
					<HeaderItem level={2}>{t("4-8-Diminution/Augmentation")}</HeaderItem>
					<InfoModal
						title={t("Diminution and Augmentation")}
						label={t("Bigger and Smaller")}
						modalPropsMaker={modalPropsMaker}
					>
						<MSMarkdown>{t("info48", { joinArrays: "\n" })}</MSMarkdown>
					</InfoModal>
					<CheckboxItem
						display={{
							class: "cols2",
							boxesPerRow: 1,
							...(t("checkboxDimAugSystem", { returnObjects: true }) as CheckboxTransProps),
							export: t("checkboxDimAugSystemExport", { returnObjects: true }) as CheckboxTransExportProps
						}}
						boxes={["BOOL_dimAugYes", "BOOL_dimAugObligatory", "BOOL_dimAugProductive"]}
						values={[BOOL_dimAugYes, BOOL_dimAugObligatory, BOOL_dimAugProductive]}
					/>
					<TextItem
						prop="TEXT_dimAug"
						value={TEXT_dimAug}
						rows={8}
					>{t("Describe the language's relation to diminution and augmentation.")}</TextItem>
				</IonList>
			</IonContent>
		</IonPage>
	);
};


export default Syntax;
