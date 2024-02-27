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
	SyntaxHeader,
	MSMarkdown,
	TextItem
} from './MorphoSyntaxElements';

const Syntax = (props: PageData) => {
	const [ t ] = useTranslator('ms');
	const { modalPropsMaker } = props;
	const {
		TEXT_pragFocusEtc,
		TEXT_negation,
		TEXT_declaratives,
		TEXT_YNQs,
		TEXT_QWQs,
		TEXT_imperatives
	} = useSelector((state: StateObject) => state.ms);
	const dispatch = useDispatch();
	useIonViewDidEnter(() => {
		dispatch(setLastViewMS("ms09"));
	});
	return (
		<IonPage>
			<SyntaxHeader title={t("9. Pragmatically Marked Structures")} {...props} />
			<IonContent fullscreen
				className="evenBackground disappearingHeaderKludgeFix"
				id="morphoSyntaxPage"
			>
				<IonList lines="none" className="hasSpecialLabels">
					<HeaderItem level={1}>{t("9-Pragmatically Marked Structures")}</HeaderItem>
					<InfoModal
						title={t("Pragmatics")}
						label={t("What are Pragmatics?")}
						modalPropsMaker={modalPropsMaker}
					>
						<MSMarkdown>{t("info9", { joinArray: "\n" })}</MSMarkdown>
					</InfoModal>
					<HeaderItem level={2}>{t("9-1-Focus, Contrast and Topicalization")}</HeaderItem>
					<InfoModal
						title={t("Focus, Contrast, etc.")}
						label={t("Focus is What This is About")}
						modalPropsMaker={modalPropsMaker}
					>
						<MSMarkdown>{t("info91", { joinArray: "\n" })}</MSMarkdown>
					</InfoModal>
					<TextItem
						prop="TEXT_pragFocusEtc"
						value={TEXT_pragFocusEtc}
						rows={8}
					>{t("Are there special devices for indicating Pragmatic Statuses in basic clauses? Describe cleft constructions, if there are any.")}</TextItem>
					<HeaderItem level={2}>{t("9-2-Negation")}</HeaderItem>
					<InfoModal
						title={t("Negation")}
						label={t("Don't not read this.")}
						modalPropsMaker={modalPropsMaker}
					>
						<MSMarkdown>{t("info92", { joinArray: "\n" })}</MSMarkdown>
					</InfoModal>
					<TextItem
						prop="TEXT_negation"
						value={TEXT_negation}
						rows={8}
					>{t("Describe the standard way of creating a negative clause, plus any secondary strategies that may exist. Is there constituent or derivational negation?")}</TextItem>
					<HeaderItem level={2}>{t("9-3-Non-Declarative Speech")}</HeaderItem>
					<InfoModal
						title={t("Declarative Statements")}
						label={t("Minor Note on Declaratives")}
						modalPropsMaker={modalPropsMaker}
					>
						<MSMarkdown>{t("info93", { joinArray: "\n" })}</MSMarkdown>
					</InfoModal>
					<TextItem
						prop="TEXT_declaratives"
						value={TEXT_declaratives}
						rows={3}
					>{t("If declaratives are marked, describe how.")}</TextItem>
					<HeaderItem level={3}>{t("9-3-1-Interrogatives")}</HeaderItem>
					<HeaderItem level={4}>{t("9-3-1-1-Yes/No Questions")}</HeaderItem>
					<InfoModal
						title={t("Yes/No Questions")}
						label={t("Yes? No?")}
						modalPropsMaker={modalPropsMaker}
					>
						<MSMarkdown>{t("info9311", { joinArray: "\n" })}</MSMarkdown>
					</InfoModal>
					<TextItem
						prop="TEXT_YNQs"
						value={TEXT_YNQs}
						rows={4}
					>{t("How are yes/no questions formed? Do they serve other discourse functions other than the obvious?")}</TextItem>
					<HeaderItem level={4}>{t("9-3-1-2-Questions-Word Questions")}</HeaderItem>
					<InfoModal
						title={t("Question-Word Questions")}
						label={t("Who? What? Why?")}
						modalPropsMaker={modalPropsMaker}
					>
						<MSMarkdown>{t("info9312", { joinArray: "\n" })}</MSMarkdown>
					</InfoModal>
					<TextItem
						prop="TEXT_QWQs"
						value={TEXT_QWQs}
						rows={4}
					>{t("How are information questions formed?")}</TextItem>
					<HeaderItem level={3}>{t("9-3-2-Imperatives")}</HeaderItem>
					<InfoModal
						title={t("Imperatives")}
						label={t("Command Sentences")}
						modalPropsMaker={modalPropsMaker}
					>
						<MSMarkdown>{t("info932", { joinArray: "\n" })}</MSMarkdown>
					</InfoModal>
					<TextItem
						prop="TEXT_imperatives"
						value={TEXT_imperatives}
						rows={4}
					>{t("How are imperatives formed? Are there \"polite\" imperatives that contrast with more direct imperatives?")}</TextItem>
				</IonList>
			</IonContent>
		</IonPage>
	);
};


export default Syntax;