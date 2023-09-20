import React from 'react';
import {
	IonPage,
	IonContent,
	IonList,
	useIonViewDidEnter
} from '@ionic/react';
import { useDispatch } from "react-redux";

import { ViewState, PageData } from '../../store/types';
import { saveView } from '../../store/viewSlice';

import {
	SyntaxHeader,
	parseMSJSON
} from './MorphoSyntaxElements';

const Syntax = (props: PageData) => {
	const dispatch = useDispatch();
	const viewInfo = { key: "ms" as keyof ViewState, page: "ms03" };
	useIonViewDidEnter(() => {
		dispatch(saveView(viewInfo));
	});
	return (
		<IonPage>
			<SyntaxHeader title="3. Constituent Order Typology" {...props} />
			<IonContent fullscreen className="evenBackground disappearingHeaderKludgeFix" id="morphoSyntaxPage">
				<IonList lines="none" className="hasSpecialLabels">
					{parseMSJSON({page: "s3", ...props})}
				</IonList>
			</IonContent>
		</IonPage>
	);
};

/*
const OldSyntax = () => {
	const dispatch = useDispatch();
	const viewInfo = { key: "ms" as keyof ViewState, page: "ms03" };
	useIonViewDidEnter(() => {
		dispatch(changeView(viewInfo));
	});
	return (
		<IonPage>
			<SyntaxHeader title="3. Constituent Order Typology" />
			<IonContent fullscreen className="evenBackground disappearingHeaderKludgeFix" id="morphoSyntaxPage">
				<IonList lines="none">

					<HeaderItem level="1">3. Constituent Order Typology</HeaderItem>

					<HeaderItem level="2">3.1. In Main Clauses</HeaderItem>

					<IonItem className="content">
						<IonGrid className="cols3">
							<IonRow className="header">
								<IonCol className="header">The Six Basic Forms of Human Language</IonCol>
							</IonRow>
							<IonRow className="header">
								<IonCol className="cbox">Primary?</IonCol>
								<IonCol className="cbox leftA">Order</IonCol>
								<IonCol>Example</IonCol>
							</IonRow>
							<IonRow>
								<IonCol className="cbox"><RadioBox prop="APV" /></IonCol>
								<IonCol className="cbox leftA"><strong>APV/SV</strong></IonCol>
								<IonCol><em>Steve softballs pitches; Steve pitches.</em></IonCol>
							</IonRow>
							<IonRow>
								<IonCol className="cbox"><RadioBox prop="AVP" /></IonCol>
								<IonCol className="cbox leftA"><strong>AVP/SV</strong></IonCol>
								<IonCol><em>Steve pitches softballs; Steve pitches.</em></IonCol>
							</IonRow>
							<IonRow>
								<IonCol className="cbox"><RadioBox prop="VAP" /></IonCol>
								<IonCol className="cbox leftA"><strong>VAP/VS</strong></IonCol>
								<IonCol><em>Pitches Steve softballs; Pitches Steve.</em></IonCol>
							</IonRow>
							<IonRow>
								<IonCol className="cbox"><RadioBox prop="VPA" /></IonCol>
								<IonCol className="cbox leftA"><strong>VPA/VS</strong></IonCol>
								<IonCol><em>Pitches softballs Steve; Pitches Steve.</em></IonCol>
							</IonRow>
							<IonRow>
								<IonCol className="cbox"><RadioBox prop="PAV" /></IonCol>
								<IonCol className="cbox leftA"><strong>PAV/SV</strong></IonCol>
								<IonCol><em>Softballs Steve pitches; Steve pitches.</em></IonCol>
							</IonRow>
							<IonRow>
								<IonCol className="cbox"><RadioBox prop="PVA" /></IonCol>
								<IonCol className="cbox leftA"><strong>PVA/VS</strong></IonCol>
								<IonCol><em>Softballs pitches Steve; Pitches Steve.</em></IonCol>
							</IonRow>
						</IonGrid>
					</IonItem>
					<InfoModal title="Basic Typology" label="What is This?">
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
					<TextItem text="mainClause">Write any more specific notes here.</TextItem>

					<HeaderItem level="2">3.2. Verb Phrases</HeaderItem>

					<TextItem text="verbPhrase" rows={4}>Where do auxilliary verbs (semantically empty, e.g. to be/to have) appear in relation to the main verb? Where do adverbs fit in relation to the verb and auxilliaries?</TextItem>

					<HeaderItem level="2">3.3. Noun Phrases</HeaderItem>

					<TextItem text="nounPhrase" rows={4}>What is the order of the determiners (4.5), numerals (2.3.3), genitives (possessors), modifiers (2.3.1), relative clauses (10.5), classifiers (4.7), and the head noun?</TextItem>

					<HeaderItem level="2">3.4. Adpositional Phrases</HeaderItem>

					<IonItem className="content">
						<IonGrid className="cols2">
							<IonRow>
								<IonCol className="cbox"><RadioBox prop="preP" /></IonCol>
								<IonCol>Preposition (<em>with</em> an apple)</IonCol>
							</IonRow>
							<IonRow>
								<IonCol className="cbox"><RadioBox prop="postP" /></IonCol>
								<IonCol>Postpostition (an apple <em>with</em>)</IonCol>
							</IonRow>
							<IonRow>
								<IonCol className="cbox"><RadioBox prop="circumP" /></IonCol>
								<IonCol>Circumposition (rare; <em>with</em> an apple <em>with</em>)</IonCol>
							</IonRow>
						</IonGrid>
					</IonItem>
					<InfoModal title="Adpositions" label="More Info">
						<ul>
							<li>Many <strong>Adpositions</strong> derive from verbs, especially serial verbs (see 10.1).</li>
							<li>Others derive from nouns, especially body parts (top, back, face, head, etc).</li>
							<li>Adpositional phrases may appear the same as possessed noun phrases (in front of vs. on his face) or regular nouns (top vs. on top of).</li>
						</ul>
					</InfoModal>
					<TextItem text="adPhrase" rows={4}>Is the language dominantly prepositional or postpositional? Do many adpositions come from nouns or verbs?</TextItem>


					<HeaderItem level="2">3.5 Comparatives</HeaderItem>

					<InfoModal title="Comparatives" label="Comparing Things">
						<ul>
							<li>Does the language even have a form? Some languages get by with strategies like "X is big, Y is very big."</li>
							<li>A comparison phrase requires a known standard, a marker that signals this is a comparison, and the quality of comparison.
								<ul>
									<li>For example, in <em>"X is bigger than Y"</em>, (<em>Y</em>) is the known standard, (<em>is __er than</em>) is a comparison marker, and (<em>big</em>) is the quality.</li>
								</ul>
							</li>
							<li>PV languages generally use a Standard-Quality-Marker order.</li>
							<li>VP languages tend towards Quality-Marker-Standard.</li>
						</ul>
					</InfoModal>
					<TextItem text="compare">Does the language have one or more comparitive constructions? If so, what is the order of the standard, the marker, and the quality being compared?</TextItem>


					<HeaderItem level="2">3.6 Question Particles and Words</HeaderItem>

					<InfoModal title="Questions">
						<ul>
							<li>In many languages, yes/no questions are indicated by a change in intonation. In others, a question particle is used; e.g. <em>do</em> you understand?</li>
							<li>Informal questions may require a specific question word.</li>
							<li className="newSection">This subject is handled in depth in 9.3.1.</li>
						</ul>
					</InfoModal>
					<TextItem text="questions">How are questions handled in the language? In informational questions, where does the question word occur?</TextItem>

					<HeaderItem level="2">3.7 Summary</HeaderItem>

					<TextItem text="COType">When it comes to Agent/Patient/Verb order, is the language very consistent, fairly consistent, or very inconsistent? Note consistency and any deviations not already covered.</TextItem>

				</IonList>
			</IonContent>
		</IonPage>
	);
};
*/

export default Syntax;
