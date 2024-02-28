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
		BOOL_chainFirst,
		BOOL_chainLast,
		BOOL_chainN,
		BOOL_chainV,
		BOOL_chainCj,
		BOOL_chainT,
		BOOL_chainA,
		BOOL_chainPer,
		BOOL_chainNum,
		BOOL_chainOther,
		BOOL_relPre,
		BOOL_relPost,
		BOOL_relInternal,
		BOOL_relHeadless,
		BOOL_coordMid,
		BOOL_coordTwo,
		BOOL_coordLast,
		TEXT_serialVerbs,
		TEXT_complClauses,
		TEXT_advClauses,
		TEXT_clauseChainEtc,
		TEXT_relClauses,
		TEXT_coords
	} = useSelector((state: StateObject) => state.ms);
	const dispatch = useDispatch();
	useIonViewDidEnter(() => {
		dispatch(setLastViewMS("ms10"));
	});
	return (
		<IonPage>
			<SyntaxHeader title={t("10-Clause Combinations")} {...props} />
			<IonContent fullscreen
				className="evenBackground disappearingHeaderKludgeFix"
				id="morphoSyntaxPage"
			>
				<IonList lines="none" className="hasSpecialLabels">
					<HeaderItem level={1}>{t("10-Clause Combinations")}</HeaderItem>
					<InfoModal
						title={t("Terms")}
						label={t("Quick Primer on Clauses")}
						modalPropsMaker={modalPropsMaker}
					>
						<MSMarkdown>{t("info10", { joinArrays: "\n" })}</MSMarkdown>
					</InfoModal>
					<HeaderItem level={2}>{t("10-1-Serial Verbs")}</HeaderItem>
					<InfoModal
						title={t("Serial Verbs")}
						label={t("Go Tap on This")}
						modalPropsMaker={modalPropsMaker}
					>
						<MSMarkdown>{t("info101", { joinArrays: "\n" })}</MSMarkdown>
					</InfoModal>
					<TextItem
						prop="TEXT_serialVerbs"
						value={TEXT_serialVerbs}
						rows={4}
					>{t("Does the language have serial verbs? What verbs are more likely to appear in serial constructions? Are any on the way to becoming auxiliaries or adpositions?")}</TextItem>
					<HeaderItem level={2}>{t("10-2-Complement Clauses")}</HeaderItem>
					<InfoModal
						title={t("Complement Clauses")}
						label={t("Enter The Matrix")}
						modalPropsMaker={modalPropsMaker}
					>
						<MSMarkdown>{t("info102", { joinArrays: "\n" })}</MSMarkdown>
					</InfoModal>
					<TextItem
						prop="TEXT_complClauses"
						value={TEXT_complClauses}
						rows={6}
					>{t("What kinds of complement clauses does the language have? Are certain complement types more common for certain classes of verbs? Does the language allow Agent complements, or just Patient complements?")}</TextItem>
					<HeaderItem level={2}>{t("10-3-Adverbial Clauses")}</HeaderItem>
					<InfoModal
						title={t("Adverbial Clauses")}
						label={t("Tap This When You're Ready")}
						modalPropsMaker={modalPropsMaker}
					>
						<MSMarkdown>{t("info103", { joinArrays: "\n" })}</MSMarkdown>
					</InfoModal>
					<TextItem
						prop="TEXT_advClauses"
						value={TEXT_advClauses}
						rows={6}
					>{t("How are adverbial clauses formed? What kinds are there? Can they occur in more than one place in a clause?")}</TextItem>
					<HeaderItem level={2}>{t("10-4-Clause Chaining, Medial Clauses, and Switch References")}</HeaderItem>
					<InfoModal
						title={t("Clause Chaining, Medial Clauses, and Switch References")}
						label={t("Chain Chain Chain...")}
						modalPropsMaker={modalPropsMaker}
					>
						<MSMarkdown>{t("info104", { joinArrays: "\n" })}</MSMarkdown>
					</InfoModal>
					<CheckboxItem
						display={{
							class: "cols2",
							boxesPerRow: 1,
							...(t("checkboxInflectedClauses", { returnObjects: true }) as CheckboxTransProps),
							export: t("checkboxInflectedClausesExport", { returnObjects: true }) as CheckboxTransExportProps
						}}
						boxes={["BOOL_chainFirst", "BOOL_chainLast"]}
						values={[BOOL_chainFirst, BOOL_chainLast]}
					/>
					<CheckboxItem
						display={{
							class: "cols2",
							boxesPerRow: 1,
							...(t("checkboxMarkedElement", { returnObjects: true }) as CheckboxTransProps),
							export: t("checkboxMarkedElementExport", { returnObjects: true }) as CheckboxTransExportProps
						}}
						boxes={["BOOL_chainN", "BOOL_chainV", "BOOL_chainCj"]}
						values={[BOOL_chainN, BOOL_chainV, BOOL_chainCj]}
					/>
					<CheckboxItem
						display={{
							class: "cols2",
							boxesPerRow: 1,
							...(t("checkboxMarkerInfo", { returnObjects: true }) as CheckboxTransProps),
							export: t("checkboxMarkerInfoExport", { returnObjects: true }) as CheckboxTransExportProps
						}}
						boxes={["BOOL_chainT", "BOOL_chainA", "BOOL_chainPer", "BOOL_chainNum", "BOOL_chainOther"]}
						values={[BOOL_chainT, BOOL_chainA, BOOL_chainPer, BOOL_chainNum, BOOL_chainOther]}
					/>
					<TextItem
						prop="TEXT_clauseChainEtc"
						value={TEXT_clauseChainEtc}
						rows={6}
					>{t("Is the coreference always the Subject, or can the Agent, Patient, or other nominals be referred to? Do the markers convey other information, like person, number, tense, aspect, and/or semantics? Can a clause be inflected for the person/number of another clause?")}</TextItem>
					<HeaderItem level={2}>{t("10-5-Relative Clauses")}</HeaderItem>
					<InfoModal
						title={t("Relative Clauses")}
						label={t("Clauses as Adjectives")}
						modalPropsMaker={modalPropsMaker}
					>
						<MSMarkdown>{t("info105", { joinArrays: "\n" })}</MSMarkdown>
					</InfoModal>
					<CheckboxItem
						display={{
							class: "cols2",
							boxesPerRow: 1,
							...(t("checkboxRelative", { returnObjects: true }) as CheckboxTransProps),
							export: t("checkboxRelativeExport", { returnObjects: true }) as CheckboxTransExportProps
						}}
						boxes={["BOOL_relPre", "BOOL_relPost", "BOOL_relInternal", "BOOL_relHeadless"]}
						values={[BOOL_relPre, BOOL_relPost, BOOL_relInternal, BOOL_relHeadless]}
					/>
					<TextItem
						prop="TEXT_relClauses"
						value={TEXT_relClauses}
						rows={6}
					>{t("Note what strategies are used in Relativizing Clauses, and where they fit on the hierarchy (if it applies).")}</TextItem>
					<HeaderItem level={2}>{t("10-6-Coordinating Clauses")}</HeaderItem>
					<InfoModal
						title={t("Coordinating Clauses")}
						label={t("This And That")}
						modalPropsMaker={modalPropsMaker}
					>
						<MSMarkdown>{t("info106", { joinArrays: "\n" })}</MSMarkdown>
					</InfoModal>
					<CheckboxItem
						display={{
							class: "cols2",
							boxesPerRow: 1,
							...(t("checkboxCoord", { returnObjects: true }) as CheckboxTransProps),
							export: t("checkboxCoordExport", { returnObjects: true }) as CheckboxTransExportProps
						}}
						boxes={["BOOL_coordMid", "BOOL_coordTwo", "BOOL_coordLast"]}
						values={[BOOL_coordMid, BOOL_coordTwo, BOOL_coordLast]}
					/>
					<TextItem
						prop="TEXT_coords"
						value={TEXT_coords}
						rows={6}
					>{t("Describe how Conjunction, Disjunction and Exclusion are expressed in the language.")}</TextItem>
				</IonList>
			</IonContent>
		</IonPage>
	);
};


export default Syntax;