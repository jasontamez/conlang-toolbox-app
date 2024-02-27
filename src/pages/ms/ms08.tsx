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
	MSMarkdown,
	HeaderItem,
	InfoModal,
	SyntaxHeader,
	TextItem
} from './MorphoSyntaxElements';

const Syntax = (props: PageData) => {
	const [ t ] = useTranslator('ms');
	const { modalPropsMaker } = props;
	const {
		BOOL_tenseMorph,
		BOOL_aspectMorph,
		BOOL_modeMorph,
		BOOL_otherMorph,
		TEXT_verbNoms,
		TEXT_verbComp,
		TEXT_tense,
		TEXT_aspect,
		TEXT_mode,
		TEXT_locDirect,
		TEXT_evidence,
		TEXT_miscVerbFunc
	} = useSelector((state: StateObject) => state.ms);
	const dispatch = useDispatch();
	useIonViewDidEnter(() => {
		dispatch(setLastViewMS("ms08"));
	});
	return (
		<IonPage>
			<SyntaxHeader
				title={t("8. Other Verb and Verb Phrase Operations")}
				{...props}
			/>
			<IonContent fullscreen
				className="evenBackground disappearingHeaderKludgeFix"
				id="morphoSyntaxPage"
			>
				<IonList lines="none" className="hasSpecialLabels">
					<HeaderItem level={1}>{t("8-Other Verb and Verb Phrase Operations")}</HeaderItem>
					<HeaderItem level={2}>{t("8-1-Nominalization")}</HeaderItem>
					<InfoModal
						title={t("Nominalization")}
						label={t("Making Nouns")}
						modalPropsMaker={modalPropsMaker}
					>
						<MSMarkdown>{t("info81", { joinArray: "\n" })}</MSMarkdown>
					</InfoModal>
					<TextItem
						prop="TEXT_verbNoms"
						value={TEXT_verbNoms}
						rows={8}
					>{t("Describe the nominalizations that exist in the language, and explain how productive they are.")}</TextItem>
					<HeaderItem level={2}>{t("8-2-Compounding")}</HeaderItem>
					<InfoModal
						title={t("Compounding")}
						label={t("Word-Making")}
						modalPropsMaker={modalPropsMaker}
					>
						<MSMarkdown>{t("info82", { joinArray: "\n" })}</MSMarkdown>
					</InfoModal>
					<TextItem
						prop="TEXT_verbComp"
						value={TEXT_verbComp}
						rows={6}
					>{t("Describe any compounding strategies that exist in the language.")}</TextItem>
					<HeaderItem level={2}>{t("8-3-Tense/Aspect/Mode")}</HeaderItem>
					<InfoModal
						title={t("Tense, Aspect and Mode")}
						label={t("What Are They?")}
						modalPropsMaker={modalPropsMaker}
					>
						<MSMarkdown>{t("info83", { joinArray: "\n" })}</MSMarkdown>
					</InfoModal>
					<CheckboxItem
						display={{
							class: "cols2",
							boxesPerRow: 1,
							...(t("checkboxTAM", { returnObjects: true }) as CheckboxTransProps),
							export: t("checkboxTAMExport", { returnObjects: true }) as CheckboxTransExportProps
						}}
						boxes={["BOOL_tenseMorph", "BOOL_aspectMorph", "BOOL_modeMorph", "BOOL_otherMorph"]}
						values={[BOOL_tenseMorph, BOOL_aspectMorph, BOOL_modeMorph, BOOL_otherMorph]}
					/>
					<HeaderItem level={3}>{t("8-3-1-Tense")}</HeaderItem>
					<InfoModal
						title={t("Tense")}
						label={t("Info on Tense")}
						modalPropsMaker={modalPropsMaker}
					>
						<MSMarkdown>{t("info831", { joinArray: "\n" })}</MSMarkdown>
					</InfoModal>
					<TextItem
						prop="TEXT_tense"
						value={TEXT_tense}
						rows={6}
					>{t("Is there a Tense system? How does it operate? How does it divide time?")}</TextItem>
					<HeaderItem level={3}>{t("8-3-2-Aspect")}</HeaderItem>
					<InfoModal
						title={t("Aspect")}
						label={t("Info on Aspect")}
						modalPropsMaker={modalPropsMaker}
					>
						<MSMarkdown>{t("info832", { joinArray: "\n" })}</MSMarkdown>
					</InfoModal>
					<TextItem
						prop="TEXT_aspect"
						value={TEXT_aspect}
						rows={8}
					>{t("Describe the way the language handles Aspect.")}</TextItem>
					<HeaderItem level={3}>{t("8-3-3-Mode")}</HeaderItem>
					<InfoModal
						title={t("Mode")}
						label={t("Info on Mode")}
						modalPropsMaker={modalPropsMaker}
					>
						<MSMarkdown>{t("info833", { joinArray: "\n" })}</MSMarkdown>
					</InfoModal>
					<TextItem
						prop="TEXT_mode"
						value={TEXT_mode}
						rows={6}
					>{t("Describe how the language deals with Mode.")}</TextItem>
					<HeaderItem level={2}>{t("8-4-Location/Direction")}</HeaderItem>
					<InfoModal
						title={t("Location and Direction")}
						label={t("Where?")}
						modalPropsMaker={modalPropsMaker}
					>
						<MSMarkdown>{t("info84", { joinArray: "\n" })}</MSMarkdown>
					</InfoModal>
					<TextItem
						prop="TEXT_locDirect"
						value={TEXT_locDirect}
						rows={8}
					>{t("Does the language have affixes or other functions that represent spatial grounding?")}</TextItem>
					<HeaderItem level={2}>{t("8-5-Evidentiality, Validationality and Mirativity")}</HeaderItem>
					<InfoModal
						title={t("Evidentiality")}
						label={t("Truth and Certainty")}
						modalPropsMaker={modalPropsMaker}
					>
						<MSMarkdown>{t("info85", { joinArray: "\n" })}</MSMarkdown>
					</InfoModal>
					<TextItem
						prop="TEXT_evidence"
						value={TEXT_evidence}
						rows={6}
					>{t("Are there any grammaticized indicators of Evidentiality, Validationality, or Mirativity?")}</TextItem>
					<HeaderItem level={2}>{t("8-6-Miscellaneous")}</HeaderItem>
					<InfoModal
						title={t("Miscelaneous")}
						label={t("Leftovers")}
						modalPropsMaker={modalPropsMaker}
					>
						<MSMarkdown>{t("info86", { joinArray: "\n" })}</MSMarkdown>
					</InfoModal>
					<TextItem
						prop="TEXT_miscVerbFunc"
						value={TEXT_miscVerbFunc}
						rows={4}
					>{t("Does the language have any other notable verb phrase operations?")}</TextItem>
				</IonList>
			</IonContent>
		</IonPage>
	);
};


export default Syntax;
