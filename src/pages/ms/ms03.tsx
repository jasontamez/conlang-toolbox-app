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

import {
	CheckboxItem,
	HeaderItem,
	InfoModal,
	SyntaxHeader,
	TextItem
} from './MorphoSyntaxElements';

const Syntax = (props: PageData) => {
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
				title="3. Constituent Order Typology"
				{...props}
			/>
			<IonContent fullscreen
				className="evenBackground disappearingHeaderKludgeFix"
				id="morphoSyntaxPage"
			>
				<IonList lines="none" className="hasSpecialLabels">
					<HeaderItem level={1}>3. Constituent Order Typology</HeaderItem>
					<HeaderItem level={2}>3.1. In Main Clauses</HeaderItem>
					<CheckboxItem
						display={{
							class: "cols2",
							boxesPerRow: 1,
							inlineHeaders: ["Primary?", "Order", "Example"],
							labels: ["APV/SV", "AVP/SV", "VAP/VS", "VPA/VS", "PAV/SV", "PVA/VS"],
							labelClass: "cbox leftA",
							rowLabels: [
								"\"Steve softballs pitches; Steve pitches.\"",
								"\"Steve pitches softballs; Steve pitches.\"",
								"\"Pitches Steve softballs; Pitches Steve.\"",
								"\"Pitches softballs Steve; Pitches Steve.\"",
								"\"Softballs Steve pitches; Steve pitches.\"",
								"\"Softballs pitches Steve; Pitches Steve.\""
							],
							export: {
								title: "Constituent Order Typology:"
							}
						}}
						boxes={["BOOL_APV", "BOOL_AVP", "BOOL_VAP", "BOOL_VPA", "BOOL_PAV", "BOOL_PVA"]}
						values={[BOOL_APV, BOOL_AVP, BOOL_VAP, BOOL_VPA, BOOL_PAV, BOOL_PVA]}
					/>
					<InfoModal
						title="Basic Typology"
						label="What is This?"
						modalPropsMaker={modalPropsMaker}
					>
						<ul>
							<li>Human languages tend towards one of six different basic forms.
								<ul>
									<li><strong>S</strong> is the Subject of an intransitive clause.
										<ul><li><em>Steve</em> pitches.</li></ul>
									</li>
									<li><strong>V</strong> is the verb in a clause.
										<ul><li>Steve <em>pitches</em>.</li></ul>
									</li>
									<li><strong>A</strong> is the Agent of a transitive clause.
										<ul><li><em>Steve</em> pitches softballs.</li></ul>
									</li>
									<li><strong>P</strong> is the Patient of a transitive clause.
										<ul><li>Steve pitches <em>softballs</em>.</li></ul>
									</li>
								</ul>
							</li>
							<li className="newSection">Languages may use one typology most of the time, but switch to another for certain clauses:
								<ul>
									<li>Dependant clauses</li>
									<li>Paragraph-initial clauses</li>
									<li>Clauses that introduce participants</li>
									<li>Questions</li>
									<li>Negative clauses</li>
									<li>Clearly contrastive clauses</li>
								</ul>
							</li>
							<li className="newSection">"Rigid" systems may put other constituents into the <strong>P</strong> slot on a regular basis.
								<ul>
									<li>The softball was <em>filthy</em>: predicate adjective.</li>
									<li>Steve was <em>an awful pitcher</em>: predicate nominative.</li>
									<li>Steve went <em>to the dugouts</em>: oblique.</li>
								</ul>
							</li>
							<li className="newSection">"Flexible" or "free" systems use something other than grammatical relations to determine order:
								<ul>
									<li>Biblical Hebrew puts new, indefinite info pre-verb, definite info post-verb.</li>
									<li>Some will fix PV or AV relations in almost all cases, leaving the other "free".
										<ul>
											<li>Fixed PV → may allow APV and PVA.</li>
											<li>Fixed AV → may allow PAV and AVP.</li>
											<li>Fixed VP → may allow AVP and VPA.</li>
											<li>Fixed VA → may allow VAP and PVA.</li>
										</ul>
									</li>
								</ul>
							</li>
						</ul>
					</InfoModal>
					<TextItem
						prop="TEXT_mainClause"
						value={TEXT_mainClause}
						rows={undefined}
					>Write any more specific notes here.</TextItem>
					<HeaderItem level={2}>3.2. Verb Phrases</HeaderItem>
					<TextItem
						prop="TEXT_verbPhrase"
						value={TEXT_verbPhrase}
						rows={4}
					>Where do auxiliary verbs (semantically empty, e.g. to be/to have) appear in relation to the main verb? Where do adverbs fit in relation to the verb and auxiliaries?</TextItem>
					<HeaderItem level={2}>3.3. Noun Phrases</HeaderItem>
					<TextItem
						prop="TEXT_nounPhrase"
						value={TEXT_nounPhrase}
						rows={4}
					>What is the order of the determiners (4.5), numerals (2.3.3), genitives (possessors), modifiers (2.3.1), relative clauses (10.5), classifiers (4.7), and the head noun?</TextItem>
					<HeaderItem level={2}>3.4. Adpositional Phrases</HeaderItem>
					<CheckboxItem
						display={{
							class: "cols2",
							boxesPerRow: 1,
							rowLabels: ["Preposition (<em>with</em> an apple)", "Postpostition (an apple <em>with</em>)", "Circumposition (rare; <em>with</em> an apple <em>with</em>)"],
							export: {
								title: "Adpositions Used:",
								labels: ["Preposition", "Postposition", "Circumposition"],
								labelOverrideDocx: true
							}
						}}
						boxes={["BOOL_preP", "BOOL_postP", "BOOL_circumP"]}
						values={[BOOL_preP, BOOL_postP, BOOL_circumP]}
					/>
					<InfoModal
						title="Adpositions"
						label="More Info"
						modalPropsMaker={modalPropsMaker}
					>
						<ul>
							<li>Many <strong>Adpositions</strong> derive from verbs, especially serial verbs (see 10.1).</li>
							<li>Others derive from nouns, especially body parts (top, back, face, head, etc).</li>
							<li>Adpositional phrases may appear the same as possessed noun phrases (in front of vs. on his face) or regular nouns (top vs. on top of).</li>
						</ul>
					</InfoModal>
					<TextItem
						prop="TEXT_adPhrase"
						value={TEXT_adPhrase}
						rows={4}
					>Which adposition dominates? Do many adpositions come from nouns or verbs?</TextItem>
					<HeaderItem level={2}>3.5 Comparatives</HeaderItem>
					<InfoModal
						title="Comparatives"
						label="Comparing Things"
						modalPropsMaker={modalPropsMaker}
					>
						<ul>
							<li>Does the language even have a form? Some languages get by with strategies like "X is big, Y is very big."</li>
							<li>A comparison phrase requires a known standard, a marker that signals this is a comparison, and the quality of comparison.
								<ul><li>For example, in <em>"X is bigger than Y"</em>, (<em>Y</em>) is the known standard, (<em>is __er than</em>) is a comparison marker, and (<em>big</em>) is the quality.</li></ul>
							</li>
							<li>PV languages generally use a Standard-Quality-Marker order.</li>
							<li>VP languages tend towards Quality-Marker-Standard.</li>
						</ul>
					</InfoModal>
					<TextItem
						prop="TEXT_compare"
						value={TEXT_compare}
						rows={undefined}
					>Does the language have one or more comparative constructions? If so, what is the order of the standard, the marker, and the quality being compared?</TextItem>
					<HeaderItem level={2}>3.6 Question Particles and Words</HeaderItem>
					<InfoModal
						title="Questions"
						modalPropsMaker={modalPropsMaker}
					>
						<ul>
							<li>In many languages, yes/no questions are indicated by a change in intonation. In others, a question particle is used; e.g. <em>do</em> you understand?</li>
							<li>Informal questions may require a specific question word.</li>
							<li className="newSection">This subject is handled in depth in 9.3.1.</li>
						</ul>
					</InfoModal>
					<TextItem
						prop="TEXT_questions"
						value={TEXT_questions}
						rows={undefined}
					>How are questions handled in the language? In informational questions, where does the question word occur?</TextItem>
					<HeaderItem level={2}>3.7 Summary</HeaderItem>
					<TextItem
						prop="TEXT_COType"
						value={TEXT_COType}
						rows={undefined}
					>When it comes to Agent/Patient/Verb order, is the language very consistent, fairly consistent, or very inconsistent? Note consistency and any deviations not already covered.</TextItem>
				</IonList>
			</IonContent>
		</IonPage>
	);
};


export default Syntax;
