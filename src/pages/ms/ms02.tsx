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
	CheckboxTransProps,
	CheckboxTransExportProps,
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
		BOOL_actions,
		BOOL_actionProcesses,
		BOOL_weather,
		BOOL_states,
		BOOL_involuntaryProcesses,
		BOOL_bodyFunctions,
		BOOL_motion,
		BOOL_position,
		BOOL_factive,
		BOOL_cognition,
		BOOL_sensation,
		BOOL_emotion,
		BOOL_utterance,
		BOOL_manipulation,
		BOOL_otherVerbClass,
		BOOL_lexVerb,
		BOOL_lexNoun,
		BOOL_lexVN,
		BOOL_lexVorN,
		BOOL_adjectives,
		BOOL_baseFive,
		BOOL_baseTen,
		BOOL_baseTwenty,
		BOOL_baseOther,
		BOOL_numGL,
		BOOL_numLG,
		BOOL_numNone,
		BOOL_multiNumSets,
		BOOL_inflectNum,
		TEXT_propNames,
		TEXT_possessable,
		TEXT_countMass,
		TEXT_pronounAnaphClitic,
		TEXT_semanticRole,
		TEXT_verbClass,
		TEXT_verbStructure,
		TEXT_propClass,
		TEXT_quantifier,
		TEXT_numeral,
		TEXT_adverb
	} = useSelector((state: StateObject) => state.ms);
	const dispatch = useDispatch();
	useIonViewDidEnter(() => {
		dispatch(setLastViewMS("ms02"));
	});
	return (
		<IonPage>
			<SyntaxHeader
				title={t("2-Grammatical Categories")}
				{...props}
			/>
			<IonContent fullscreen
				className="evenBackground disappearingHeaderKludgeFix"
				id="morphoSyntaxPage"
			>
				<IonList lines="none" className="hasSpecialLabels">
					<HeaderItem level={1}>{t("2-Grammatical Categories")}</HeaderItem>
					<HeaderItem level={2}>{t("2-1-Nouns (the most time-stable concepts)")}</HeaderItem>
					<HeaderItem level={3}>{t("2-1-1-Types of Nouns")}</HeaderItem>
					<HeaderItem level={4}>{t("2-1-1-1-Proper Names")}</HeaderItem>
					<InfoModal
						title={t("Proper Names")}
						label={t("Read About Them")}
						modalPropsMaker={modalPropsMaker}
					>
						<MSMarkdown>{t("info2111", { joinArrays: "\n" })}</MSMarkdown>
					</InfoModal>
					<TextItem
						prop="TEXT_propNames"
						value={TEXT_propNames}
						rows={undefined}
					>{t("Are there any special rules involving proper names?")}</TextItem>
					<HeaderItem level={4}>{t("2-1-1-2-Possessability")}</HeaderItem>
					<InfoModal
						title={t("Possessability")}
						label={t("Systems of Possession")}
						modalPropsMaker={modalPropsMaker}
					>
						<MSMarkdown>{t("info2112", { joinArrays: "\n" })}</MSMarkdown>
					</InfoModal>
					<TextItem
						prop="TEXT_possessable"
						value={TEXT_possessable}
						rows={4}
					>{t("Describe how the language handles possession.")}</TextItem>
					<HeaderItem level={4}>{t("2-1-1-3-Count vs Mass")}</HeaderItem>
					<InfoModal
						title={t("Count Nouns and Mass Nouns")}
						label={t("A Piece of Information")}
						modalPropsMaker={modalPropsMaker}
					>
						<MSMarkdown>{t("info2113", { joinArrays: "\n" })}</MSMarkdown>
					</InfoModal>
					<TextItem
						prop="TEXT_countMass"
						value={TEXT_countMass}
						rows={undefined}
					>{t("Write any specific notes about count/mass noun distinctions here.")}</TextItem>
					<HeaderItem level={3}>{t("2-1-2-Pronouns and Anaphoric Clitics")}</HeaderItem>
					<InfoModal
						title={t("Pronouns and Anaphoric Clitics")}
						label={t("What Are They?")}
						modalPropsMaker={modalPropsMaker}
					>
						<MSMarkdown>{t("info212", { joinArrays: "\n" })}</MSMarkdown>
					</InfoModal>
					<TextItem
						prop="TEXT_pronounAnaphClitic"
						value={TEXT_pronounAnaphClitic}
						rows={4}
					>{t("Which system(s) are used by the language?")}</TextItem>
					<HeaderItem level={2}>{t("2-2-Verbs (the least time-stable concepts)")}</HeaderItem>
					<HeaderItem level={3}>{t("2-2-1-Semantic Roles")}</HeaderItem>
					<InfoModal
						title={t("Semantic Roles")}
						label={t("A Quick Primer")}
						modalPropsMaker={modalPropsMaker}
					>
						<MSMarkdown>{t("info221", { joinArrays: "\n" })}</MSMarkdown>
					</InfoModal>
					<TextItem
						prop="TEXT_semanticRole"
						value={TEXT_semanticRole}
						rows={6}
					>{t("Describe which semantic roles are important.")}</TextItem>
					<HeaderItem level={3}>{t("2-2-2-Verb Classes")}</HeaderItem>
					<CheckboxItem
						display={
							{
								class: "striped",
								boxesPerRow: 1,
								...(t("checkboxVerbClasses", { returnObjects: true }) as CheckboxTransProps),
								export: {
									labelOverrideDocx: true,
									...(t("checkboxVerbClassesExport", { returnObjects: true }) as CheckboxTransExportProps)
								}
							}
						}
						boxes={["BOOL_actions", "BOOL_actionProcesses", "BOOL_weather", "BOOL_states", "BOOL_involuntaryProcesses", "BOOL_bodyFunctions", "BOOL_motion", "BOOL_position", "BOOL_factive", "BOOL_cognition", "BOOL_sensation", "BOOL_emotion", "BOOL_utterance", "BOOL_manipulation", "BOOL_otherVerbClass"]}
						values={[BOOL_actions, BOOL_actionProcesses, BOOL_weather, BOOL_states, BOOL_involuntaryProcesses, BOOL_bodyFunctions, BOOL_motion, BOOL_position, BOOL_factive, BOOL_cognition, BOOL_sensation, BOOL_emotion, BOOL_utterance, BOOL_manipulation, BOOL_otherVerbClass]}
					/>
					<TextItem
						prop="TEXT_verbClass"
						value={TEXT_verbClass}
						rows={8}
					>{t("If you've marked a verb class as \"Special\", describe how the language treats it differently than the \"regular\" verbs.")}</TextItem>
					<HeaderItem level={3}>{t("2-2-3-Verb Structure")}</HeaderItem>
					<InfoModal
						title={t("Verb Structure")}
						label={t("Structure and Operations Info")}
						modalPropsMaker={modalPropsMaker}
					>
						<MSMarkdown>{t("info223", { joinArrays: "\n" })}</MSMarkdown>
					</InfoModal>
					<TextItem
						prop="TEXT_verbStructure"
						value={TEXT_verbStructure}
						rows={6}
					>{t("Describe the verb structure here.")}</TextItem>
					<HeaderItem level={2}>{t("2-3-Modifiers")}</HeaderItem>
					<HeaderItem level={3}>{t("2-3-1-Property Concepts (Descriptive Adjectives)")}</HeaderItem>
					<CheckboxItem
						display={
							{
								class: "cols2",
								boxesPerRow: 1,
								...(t("checkboxVerbPropConcepts", { returnObjects: true }) as CheckboxTransProps),
								export: t("checkboxVerbClassesExport", { returnObjects: true }) as CheckboxTransExportProps
							}
						}
						boxes={["BOOL_lexVerb", "BOOL_lexNoun", "BOOL_lexVN", "BOOL_lexVorN", "BOOL_adjectives"]}
						values={[BOOL_lexVerb, BOOL_lexNoun, BOOL_lexVN, BOOL_lexVorN, BOOL_adjectives]}
					/>
					<InfoModal
						title={t("Property Concepts")}
						label={t("More Info")}
						modalPropsMaker={modalPropsMaker}
					>
						<MSMarkdown>{t("info231", { joinArrays: "\n" })}</MSMarkdown>
					</InfoModal>
					<TextItem
						prop="TEXT_propClass"
						value={TEXT_propClass}
						rows={undefined}
					>{t("How does the language handle Property Concepts (descriptive adjectives)? If they're not all treated the same way (as in Dutch or Yoruba), explain the differences.")}</TextItem>
					<HeaderItem level={3}>{t("2-3-2-Non-Numeral Quantifiers (e.g. few, many, some)")}</HeaderItem>
					<TextItem
						prop="TEXT_quantifier"
						value={TEXT_quantifier}
						rows={undefined}
					>{t("Which quantifiers exist?")}</TextItem>
					<HeaderItem level={3}>{t("2-3-3-Numerals")}</HeaderItem>
					<InfoModal
						title={t("Numerals")}
						label={t("Things to Consider")}
						modalPropsMaker={modalPropsMaker}
					>
						<MSMarkdown>{t("info233", { joinArrays: "\n" })}</MSMarkdown>
					</InfoModal>
					<CheckboxItem
						display={
							{
								class: "cols2",
								boxesPerRow: 1,
								...(t("checkboxNumberBase", { returnObjects: true }) as CheckboxTransProps),
								export: t("checkboxNumberBaseExport", { returnObjects: true }) as CheckboxTransExportProps
							}
						}
						boxes={["BOOL_baseFive", "BOOL_baseTen", "BOOL_baseTwenty", "BOOL_baseOther"]}
						values={[BOOL_baseFive, BOOL_baseTen, BOOL_baseTwenty, BOOL_baseOther]}
					/>
					<CheckboxItem
						display={
							{
								class: "cols2",
								boxesPerRow: 1,
								...(t("checkboxNumberFormat", { returnObjects: true }) as CheckboxTransProps),
								export: t("checkboxNumberFormatExport", { returnObjects: true }) as CheckboxTransExportProps
							}
						}
						boxes={["BOOL_numGL", "BOOL_numLG", "BOOL_numNone"]}
						values={[BOOL_numGL, BOOL_numLG, BOOL_numNone]}
					/>
					<CheckboxItem
						display={{
							class: "cols2",
							boxesPerRow: 1,
							...(t("checkboxNumberOtherProps", { returnObjects: true }) as CheckboxTransProps),
							export: t("checkboxNumberOtherPropsExport", { returnObjects: true }) as CheckboxTransExportProps
					}}
						boxes={["BOOL_multiNumSets", "BOOL_inflectNum"]}
						values={[BOOL_multiNumSets, BOOL_inflectNum]}
					/>
					<TextItem
						prop="TEXT_numeral"
						value={TEXT_numeral}
						rows={6}
					>{t("Describe the language's numeral system.")}</TextItem>
					<HeaderItem level={2}>{t("2-4-Adverbs")}</HeaderItem>
					<InfoModal
						title={t("Adverbs")}
						label={'A "Catch-All" Category'}
						modalPropsMaker={modalPropsMaker}
					>
						<MSMarkdown>{t("info24", { joinArrays: "\n" })}</MSMarkdown>
					</InfoModal>
					<TextItem
						prop="TEXT_adverb"
						value={TEXT_adverb}
						rows={4}
					>{t("How are adverbs (or adverb-like phrases) handled?")}</TextItem>
				</IonList>
			</IonContent>
		</IonPage>
	);
};


export default Syntax;
