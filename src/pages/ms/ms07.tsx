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
		BOOL_markInv,
		BOOL_markDirInv,
		BOOL_verbAgreeInv,
		BOOL_wordOrderChange,
		TEXT_causation,
		TEXT_applicatives,
		TEXT_dativeShifts,
		TEXT_datOfInt,
		TEXT_possessRaising,
		TEXT_refls,
		TEXT_recips,
		TEXT_passives,
		TEXT_inverses,
		TEXT_middleCon,
		TEXT_antiP,
		TEXT_objDemOmInc
	} = useSelector((state: StateObject) => state.ms);
	const dispatch = useDispatch();
	useIonViewDidEnter(() => {
		dispatch(setLastViewMS("ms07"));
	});
	return (
		<IonPage>
			<SyntaxHeader
				title={t("7-Voice and Valence Adjusting Operations")}
				{...props}
			/>
			<IonContent fullscreen
				className="evenBackground disappearingHeaderKludgeFix"
				id="morphoSyntaxPage"
			>
				<IonList lines="none" className="hasSpecialLabels">
					<HeaderItem level={1}>{t("7-Voice and Valence Adjusting Operations")}</HeaderItem>
					<InfoModal
						title={t("Valence")}
						label={t("What is Valence?")}
						modalPropsMaker={modalPropsMaker}
					>
						<MSMarkdown>{t("info7", { joinArrays: "\n" })}</MSMarkdown>
					</InfoModal>
					<HeaderItem level={2}>{t("7-1-Valence-Increasing Operations")}</HeaderItem>
					<HeaderItem level={3}>{t("7-1-1-Causatives")}</HeaderItem>
					<InfoModal
						title={t("Causatives")}
						label={t("Forcing You to Read This")}
						modalPropsMaker={modalPropsMaker}
					>
						<MSMarkdown>{t("info711", { joinArrays: "\n" })}</MSMarkdown>
					</InfoModal>
					<TextItem
						prop="TEXT_causation"
						value={TEXT_causation}
						rows={4}
					>{t("Describe which method(s) the language uses to create causatives.")}</TextItem>
					<HeaderItem level={3}>{t("7-1-2-Applicatives")}</HeaderItem>
					<InfoModal
						title={t("Applicatives")}
						label={t("Adding a Third Participant")}
						modalPropsMaker={modalPropsMaker}
					>
						<MSMarkdown>{t("info712", { joinArrays: "\n" })}</MSMarkdown>
					</InfoModal>
					<TextItem
						prop="TEXT_applicatives"
						value={TEXT_applicatives}
						rows={4}
					>{t("Describe which method(s) the language uses for applicatives, if any.")}</TextItem>
					<HeaderItem level={3}>{t("7-1-3-Dative Shift")}</HeaderItem>
					<InfoModal
						title={t("Dative Shift")}
						label={t("Looking Shifty")}
						modalPropsMaker={modalPropsMaker}
					>
						<MSMarkdown>{t("info713", { joinArrays: "\n" })}</MSMarkdown>
					</InfoModal>
					<TextItem
						prop="TEXT_dativeShifts"
						value={TEXT_dativeShifts}
						rows={4}
					>{t("Is there a dative shift construction in the language? What is it? What semantic roles can be shifted? Is it obligatory?")}</TextItem>
					<HeaderItem level={3}>{t("7-1-4-Dative of Interest")}</HeaderItem>
					<InfoModal
						title={t("Dative of Interest")}
						label={t("Pique Your Interest")}
						modalPropsMaker={modalPropsMaker}
					>
						<MSMarkdown>{t("info714", { joinArrays: "\n" })}</MSMarkdown>
					</InfoModal>
					<TextItem
						prop="TEXT_datOfInt"
						value={TEXT_datOfInt}
						rows={4}
					>{t("Is there a dative-of-interest operation?")}</TextItem>
					<HeaderItem level={3}>{t("7-1-5-Possessor Raising (a.k.a. External Possession)")}</HeaderItem>
					<InfoModal
						title={t("Possessor Raising")}
						label={t("What is This?")}
						modalPropsMaker={modalPropsMaker}
					>
						<MSMarkdown>{t("info715", { joinArrays: "\n" })}</MSMarkdown>
					</InfoModal>
					<TextItem
						prop="TEXT_possessRaising"
						value={TEXT_possessRaising}
						rows={4}
					>{t("Does possessor raising occur?")}</TextItem>
					<HeaderItem level={2}>{t("7-2-Valence-Decreasing Operations")}</HeaderItem>
					<HeaderItem level={3}>{t("7-2-1-Reflexives")}</HeaderItem>
					<InfoModal
						title={t("Reflexives")}
						label={t("You Are Me?")}
						modalPropsMaker={modalPropsMaker}
					>
						<MSMarkdown>{t("info721", { joinArrays: "\n" })}</MSMarkdown>
					</InfoModal>
					<TextItem
						prop="TEXT_refls"
						value={TEXT_refls}
						rows={4}
					>{t("How are reflexives handled?")}</TextItem>
					<HeaderItem level={3}>{t("7-2-2-Reciprocals")}</HeaderItem>
					<InfoModal
						title={t("Reciprocals")}
						label={t("Working Together")}
						modalPropsMaker={modalPropsMaker}
					>
						<MSMarkdown>{t("info722", { joinArrays: "\n" })}</MSMarkdown>
					</InfoModal>
					<TextItem
						prop="TEXT_recips"
						value={TEXT_recips}
						rows={3}
					>{t("How are reciprocals handled?")}</TextItem>
					<HeaderItem level={3}>{t("7-2-3-Passives")}</HeaderItem>
					<InfoModal
						title={t("Passives")}
						label={t("Moving Focus From the Agent")}
						modalPropsMaker={modalPropsMaker}
					>
						<MSMarkdown>{t("info723", { joinArrays: "\n" })}</MSMarkdown>
					</InfoModal>
					<TextItem
						prop="TEXT_passives"
						value={TEXT_passives}
						rows={4}
					>{t("How are passives handled?")}</TextItem>
					<HeaderItem level={3}>{t("7-2-4-Inverses")}</HeaderItem>
					<InfoModal
						title={t("Inverses")}
						label={t("Playing The Reverse Card")}
						modalPropsMaker={modalPropsMaker}
					>
						<MSMarkdown>{t("info724", { joinArrays: "\n" })}</MSMarkdown>
					</InfoModal>
					<CheckboxItem
						display={{
							class: "cols2",
							boxesPerRow: 1,
							...(t("checkboxInverses", { returnObjects: true }) as CheckboxTransProps),
							export: t("checkboxInversesExport", { returnObjects: true }) as CheckboxTransExportProps
						}}
						boxes={["BOOL_markInv", "BOOL_markDirInv", "BOOL_verbAgreeInv", "BOOL_wordOrderChange"]}
						values={[BOOL_markInv, BOOL_markDirInv, BOOL_verbAgreeInv, BOOL_wordOrderChange]}
					/>
					<TextItem
						prop="TEXT_inverses"
						value={TEXT_inverses}
						rows={4}
					>{t("Describe any peculiarities of inverse constructions.")}</TextItem>
					<HeaderItem level={3}>{t("7-2-5-Middle Constructions")}</HeaderItem>
					<InfoModal
						title={t("Middle Constructions")}
						label={t("What Are These?")}
						modalPropsMaker={modalPropsMaker}
					>
						<MSMarkdown>{t("info725", { joinArrays: "\n" })}</MSMarkdown>
					</InfoModal>
					<TextItem
						prop="TEXT_middleCon"
						value={TEXT_middleCon}
						rows={3}
					>{t("How are middle constructions handled?")}</TextItem>
					<HeaderItem level={3}>{t("7-2-6-Antipassives")}</HeaderItem>
					<InfoModal
						title={t("Antipassives")}
						label={t("What Are These?")}
						modalPropsMaker={modalPropsMaker}
					>
						<MSMarkdown>{t("info726", { joinArrays: "\n" })}</MSMarkdown>
					</InfoModal>
					<TextItem
						prop="TEXT_antiP"
						value={TEXT_antiP}
						rows={3}
					>{t("Describe antipassive strategies in the language, if they exist.")}</TextItem>
					<HeaderItem level={3}>{t("7-2-7-Object Demotion/Omission/Incorporation")}</HeaderItem>
					<InfoModal
						title={t("Object Demotion and Related Functions")}
						label={t("What Are These?")}
						modalPropsMaker={modalPropsMaker}
					>
						<MSMarkdown>{t("info727", { joinArrays: "\n" })}</MSMarkdown>
					</InfoModal>
					<TextItem
						prop="TEXT_objDemOmInc"
						value={TEXT_objDemOmInc}
						rows={5}
					>{t("Is object demotion/omission allowed? How about incorporation?")}</TextItem>
				</IonList>
			</IonContent>
		</IonPage>
	);
};


export default Syntax;
