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
	HeaderItem,
	InfoModal,
	MSMarkdown,
	SyntaxHeader,
	TextItem
} from './MorphoSyntaxElements';

const Syntax = (props: PageData) => {
	const [ t ] = useTranslator('ms');
	const { modalPropsMaker } = props;
	const {
		TEXT_predNom,
		TEXT_predLoc,
		TEXT_predEx,
		TEXT_predPoss
	} = useSelector((state: StateObject) => state.ms);
	const dispatch = useDispatch();
	useIonViewDidEnter(() => {
		dispatch(setLastViewMS("ms05"));
	});
	return (
		<IonPage>
			<SyntaxHeader
				title={t("5-Predicate Nominals and Related Constructions")}
				{...props}
			/>
			<IonContent fullscreen
				className="evenBackground disappearingHeaderKludgeFix"
				id="morphoSyntaxPage"
			>
				<IonList lines="none" className="hasSpecialLabels">
					<HeaderItem level={1}>{t("5-Predicate Nominals and Related Constructions")}</HeaderItem>
					<InfoModal
						title={t("Predicate Nominals")}
						label={t("General Information to Consider")}
						modalPropsMaker={modalPropsMaker}
					>
						<MSMarkdown>{t("info5", { joinArrays: "\n" })}</MSMarkdown>
					</InfoModal>
					<HeaderItem level={2}>{t("5-1-Predicate Nominals and Adjectives")}</HeaderItem>
					<InfoModal
						title={t("Predicate Nominals and Adjectives")}
						label={t("What It Is and What It Seems Like")}
						modalPropsMaker={modalPropsMaker}
					>
						<MSMarkdown>{t("info51", { joinArrays: "\n" })}</MSMarkdown>
					</InfoModal>
					<TextItem
						prop="TEXT_predNom"
						value={TEXT_predNom}
						rows={6}
					>{t("Describe the language's strategy for predicate nominals and adjectives.")}</TextItem>
					<HeaderItem level={2}>{t("5-2-Predicate Locatives")}</HeaderItem>
					<InfoModal
						title={t("Predicate Locatives")}
						label={t("Where It Is")}
						modalPropsMaker={modalPropsMaker}
					>
						<MSMarkdown>{t("info52", { joinArrays: "\n" })}</MSMarkdown>
					</InfoModal>
					<TextItem
						prop="TEXT_predLoc"
						value={TEXT_predLoc}
						rows={6}
					>{t("How does the language handle predicate locatives?")}</TextItem>
					<HeaderItem level={2}>{t("5-3-Existentials")}</HeaderItem>
					<InfoModal
						title={t("Existentials")}
						label={t("These Exist")}
						modalPropsMaker={modalPropsMaker}
					>
						<MSMarkdown>{t("info53", { joinArrays: "\n" })}</MSMarkdown>
					</InfoModal>
					<TextItem
						prop="TEXT_predEx"
						value={TEXT_predEx}
						rows={6}
					>{t("How are existential clauses formed? Does this vary according to tense, aspect or mood? Is there a special negation strategy? Is this form used to impart other information (such as possessives) as well?")}</TextItem>
					<HeaderItem level={2}>{t("5-4-Possessive Clauses")}</HeaderItem>
					<InfoModal
						title={t("Possessive Clauses")}
						modalPropsMaker={modalPropsMaker}
					>
						<MSMarkdown>{t("info54", { joinArrays: "\n" })}</MSMarkdown>
					</InfoModal>
					<TextItem
						prop="TEXT_predPoss"
						value={TEXT_predPoss}
						rows={3}
					>{t("Does the language use a verb or copula strategy?")}</TextItem>
				</IonList>
			</IonContent>
		</IonPage>
	);
};


export default Syntax;
