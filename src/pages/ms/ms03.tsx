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
	MSMarkdown,
	InfoModal,
	SyntaxHeader,
	TextItem
} from './MorphoSyntaxElements';

const Syntax = (props: PageData) => {
	const [ t ] = useTranslator('ms');
	const { modalPropsMaker } = props;
	const {
		BOOL_APV,
		BOOL_AVP,
		BOOL_PAV,
		BOOL_PVA,
		BOOL_VAP,
		BOOL_VPA,
		BOOL_preP,
		BOOL_postP,
		BOOL_circumP,
		TEXT_mainClause,
		TEXT_verbPhrase,
		TEXT_nounPhrase,
		TEXT_adPhrase,
		TEXT_compare,
		TEXT_questions,
		TEXT_COType
	} = useSelector((state: StateObject) => state.ms);
	const dispatch = useDispatch();
	useIonViewDidEnter(() => {
		dispatch(setLastViewMS("ms03"));
	});
	return (
		<IonPage>
			<SyntaxHeader
				title={t("3. Constituent Order Typology")}
				{...props}
			/>
			<IonContent fullscreen
				className="evenBackground disappearingHeaderKludgeFix"
				id="morphoSyntaxPage"
			>
				<IonList lines="none" className="hasSpecialLabels">
					<HeaderItem level={1}>{t("3-Constituent Order Typology")}</HeaderItem>
					<HeaderItem level={2}>{t("3-1-In Main Clauses")}</HeaderItem>
					<CheckboxItem
						display={{
							class: "cols2",
							boxesPerRow: 1,
							labelClass: "cbox leftA",
							...(t("checkboxMainClauses", { returnObjects: true }) as CheckboxTransProps),
							export: t("checkboxMainClausesExport", { returnObjects: true }) as CheckboxTransExportProps
						}}
						boxes={["BOOL_APV", "BOOL_AVP", "BOOL_VAP", "BOOL_VPA", "BOOL_PAV", "BOOL_PVA"]}
						values={[BOOL_APV, BOOL_AVP, BOOL_VAP, BOOL_VPA, BOOL_PAV, BOOL_PVA]}
					/>
					<InfoModal
						title={t("Basic Typology")}
						label={t("What is This?")}
						modalPropsMaker={modalPropsMaker}
					>
						<MSMarkdown>{t("info31", { joinArray: "\n" })}</MSMarkdown>
					</InfoModal>
					<TextItem
						prop="TEXT_mainClause"
						value={TEXT_mainClause}
						rows={undefined}
					>{t("Write any more specific notes here.")}</TextItem>
					<HeaderItem level={2}>{t("3-2-Verb Phrases")}</HeaderItem>
					<TextItem
						prop="TEXT_verbPhrase"
						value={TEXT_verbPhrase}
						rows={4}
					>{t("Where do auxiliary verbs (semantically empty, e.g. to be/to have) appear in relation to the main verb? Where do adverbs fit in relation to the verb and auxiliaries?")}</TextItem>
					<HeaderItem level={2}>{t("3-3-Noun Phrases")}</HeaderItem>
					<TextItem
						prop="TEXT_nounPhrase"
						value={TEXT_nounPhrase}
						rows={4}
					>{t("What is the order of the determiners (4.5), numerals (2.3.3), genitives (possessors), modifiers (2.3.1), relative clauses (10.5), classifiers (4.7), and the head noun?")}</TextItem>
					<HeaderItem level={2}>{t("3-4-Adpositional Phrases")}</HeaderItem>
					<CheckboxItem
						display={{
							class: "cols2",
							boxesPerRow: 1,
							export: {
								labelOverrideDocx: true,
								...t("checkboxAdpositionalPhrasesExport", { returnObjects: true }) as CheckboxTransExportProps
							},
							...(t("checkboxAdpositionalPhrasesProps", { returnObjects: true }) as CheckboxTransProps),
							

						}}
						boxes={["BOOL_preP", "BOOL_postP", "BOOL_circumP"]}
						values={[BOOL_preP, BOOL_postP, BOOL_circumP]}
					/>
					<InfoModal
						title={t("Adpositions")}
						label={t("More Info")}
						modalPropsMaker={modalPropsMaker}
					>
						<MSMarkdown>{t("info34", { joinArray: "\n" })}</MSMarkdown>
					</InfoModal>
					<TextItem
						prop="TEXT_adPhrase"
						value={TEXT_adPhrase}
						rows={4}
					>{t("Which adposition dominates? Do many adpositions come from nouns or verbs?")}</TextItem>
					<HeaderItem level={2}>{t("3-5-Comparatives")}</HeaderItem>
					<InfoModal
						title={t("Comparatives")}
						label={t("Comparing Things")}
						modalPropsMaker={modalPropsMaker}
					>
						<MSMarkdown>{t("info35", { joinArray: "\n" })}</MSMarkdown>
					</InfoModal>
					<TextItem
						prop="TEXT_compare"
						value={TEXT_compare}
						rows={undefined}
					>{t("Does the language have one or more comparative constructions? If so, what is the order of the standard, the marker, and the quality being compared?")}</TextItem>
					<HeaderItem level={2}>{t("3-6-Question Particles and Words")}</HeaderItem>
					<InfoModal
						title={t("Questions")}
						modalPropsMaker={modalPropsMaker}
					>
						<MSMarkdown>{t("info36", { joinArray: "\n" })}</MSMarkdown>
					</InfoModal>
					<TextItem
						prop="TEXT_questions"
						value={TEXT_questions}
						rows={undefined}
					>{t("How are questions handled in the language? In informational questions, where does the question word occur?")}</TextItem>
					<HeaderItem level={2}>{t("3-7-Summary")}</HeaderItem>
					<TextItem
						prop="TEXT_COType"
						value={TEXT_COType}
						rows={undefined}
					>{t("When it comes to Agent/Patient/Verb order, is the language very consistent, fairly consistent, or very inconsistent? Note consistency and any deviations not already covered.")}</TextItem>
				</IonList>
			</IonContent>
		</IonPage>
	);
};


export default Syntax;
