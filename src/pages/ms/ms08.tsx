import React from 'react';
import {
	IonPage,
	IonContent,
	IonList,
	useIonViewDidEnter
} from '@ionic/react';
import { useDispatch, useSelector } from "react-redux";

import { ViewState, PageData, StateObject } from '../../store/types';
import { saveView } from '../../store/viewSlice';

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
	const viewInfo = { key: "ms" as keyof ViewState, page: "ms08" };
	useIonViewDidEnter(() => {
		dispatch(saveView(viewInfo));
	});
	return (
		<IonPage>
			<SyntaxHeader
				title="8. Other Verb and Verb Phrase Operations"
				{...props}
			/>
			<IonContent fullscreen
				className="evenBackground disappearingHeaderKludgeFix"
				id="morphoSyntaxPage"
			>
				<IonList lines="none" className="hasSpecialLabels">
					<HeaderItem level={1}>8. Other Verb and Verb Phrase Operations</HeaderItem>
					<HeaderItem level={2}>8.1. Nominalization</HeaderItem>
					<InfoModal
						title="Nominalization"
						label="Making Nouns"
						modalPropsMaker={modalPropsMaker}
					>
						<ul>
							<li>Every language has strategies of adjusting the grammatical category of a root. Turning a word into a noun is <em>nominalization</em>.</li>
							<li className="newSection">English has multiple methods, with differing levels of productivity.</li>
							<li>Typically, a language will use differing methods to create nominalizations according to the result.</li>
							<li className="newSection">Some methods:
								<ul>
									<li><strong>Zero Operator</strong>: walk → a walk, look → a look</li>
									<li><strong>Affix</strong>: walk → walking, employ → employment, grow → growth, construct → construction</li>
									<li><strong>Merge with Adposition</strong>: hang + up → hangup, make + over → makeover, talk + to → talking to</li>
									<li><strong>Analytical</strong>: Mandarin uses a particle <em>de</em> to indicate some nominalizations
										<ul><li><em>hézuò</em> (cooperate) + <em>de</em> → cooperation</li></ul>
									</li>
								</ul>
							</li>
							<li className="newSection">Types of nominalization:
								<ul>
									<li><strong>Action</strong>:
										<ul>
											<li>Usually refers to the action in the abstract.
												<ul>
													<li>walk → walking</li>
													<li>think → thinking</li>
												</ul>
											</li>
										</ul>
									</li>
									<li><strong>Agent</strong>:
										<ul><li>Typically refers to an Agent who is characteristic of the root verb (teach → a teacher), but some languages instead refer to someone engaged in the activity at the moment (teach → one who is presently teaching).</li></ul>
									</li>
									<li><strong>Patient</strong>:
										<ul>
											<li>In English, this mostly happens with the modifiers "good" and "bad".
												<ul>
													<li>buy → a good buy</li>
													<li>fall → a bad fall</li>
												</ul>
											</li>
											<li>This can also form the "past participle" in a language.
												<ul><li>employ → employee : this form comes from the French past participle!</li></ul>
											</li>
										</ul>
									</li>
									<li><strong>Instrument</strong>:
										<ul>
											<li>Refers to the object used in the action.</li>
											<li>In English, this usually follows the same format as an Agent nominalization.</li>
											<li>In Spanish, compounding a verb with a plural object makes an instrument.
												<ul><li>e.g. <em>abre</em> (open) + <em>latas</em> (cans) → <em>el abrelatas</em> (can-opener)</li></ul>
											</li>
										</ul>
									</li>
									<li><strong>Location</strong>:
										<ul><li>Many languages use this to refer generally to a place where the action tends to occur, e.g. work → workshop, burn → fireplace.</li></ul>
									</li>
									<li><strong>Product</strong>:
										<ul>
											<li>This refers to something that exists because of an action.</li>
											<li>English tends to do this with zero operators (scratch → a scratch) or by changing the stress pattern (permit → a permit, reject → a reject, convert → a convert).</li>
										</ul>
									</li>
									<li><strong>Manner</strong>:
										<ul>
											<li>This is uncommon among languages, but English has a couple, generally confined to sports terminology.
												<ul>
													<li>curve → a curve (That pitcher's curve is unhittable.)</li>
													<li>serve → a serve (Serena's serve is imposing.)</li>
												</ul>
											</li>
										</ul>
									</li>
								</ul>
							</li>
						</ul>
					</InfoModal>
					<TextItem
						prop="TEXT_verbNoms"
						value={TEXT_verbNoms}
						rows={8}
					>Describe the nominalizations that exist in the language, and explain how productive they are.</TextItem>
					<HeaderItem level={2}>8.2. Compounding</HeaderItem>
					<InfoModal
						title="Compounding"
						label="Word-Making"
						modalPropsMaker={modalPropsMaker}
					>
						<ul><li><strong>Noun Incorporation</strong>: noun becomes attached to a verb (see 7.2.7).<ul><li>The most common form is Patient incorporation (sell pigs → to pig-sell).</li></ul></li><li className="newSection"><strong>Verb Incorporation</strong>: two verbs merge, one modifying the other.<ul><li>Often, verbs of motion enter into these pairings (shout-rise → he shouts rising).</li><li>Verbs that freely compound like this typically lose their verbal character and become derivational affixes.</li></ul></li></ul>
					</InfoModal>
					<TextItem
						prop="TEXT_verbComp"
						value={TEXT_verbComp}
						rows={6}
					>Describe any compounding strategies that exist in the language.</TextItem>
					<HeaderItem level={2}>8.3. Tense/Aspect/Mode</HeaderItem>
					<InfoModal
						title="Tense, Aspect and Mode"
						label="What Are They?"
						modalPropsMaker={modalPropsMaker}
					>
						<ul><li><strong>TAM</strong> (Tense, Aspect, Mode) are sometimes hard to tease apart, and may only be considered separate because of how they are in western language.</li><li>Some languages pay more attention to tense (English), aspect (Austronesian languages), or mode (Eskimo).<ul><li>Furthermore, some verb stems may not allow certain operations while favoring others.</li></ul></li><li>Many languages don't morphologically indicate one or more of these divisions. (When not indicated morphologically, the language will use lexical or analytical methods.)<ul><li>Aspect: only 74% of languages use morphology</li><li>Mode: only 68% of languages do</li><li>Tense: barely 50% of languages do!</li></ul></li><li className="newSection">TAM morphemes often interact significantly with case or number marking (nom/acc in one aspect, erg/abs in another; merging aspect with number).</li></ul>
					</InfoModal>
					<CheckboxItem
						display={{
							class: "cols2",
							boxesPerRow: 1,
							header: "Morphology Exists For:",
							rowLabels: ["Tense", "Aspect", "Mode", "Other (see below)"],
							export: {
								title: "Morphology Exists For:",
							labels: ["Tense", "Aspect", "Mode", "Other"] } }}
						boxes={["BOOL_tenseMorph", "BOOL_aspectMorph", "BOOL_modeMorph", "BOOL_otherMorph"]}
						values={[BOOL_tenseMorph, BOOL_aspectMorph, BOOL_modeMorph, BOOL_otherMorph]}
					/>
					<HeaderItem level={3}>8.3.1 Tense</HeaderItem>
					<InfoModal
						title="Tense"
						label="Info on Tense"
						modalPropsMaker={modalPropsMaker}
					>
						<ul><li><strong>Tense</strong> sets an action in time in relation to "now".</li><li>Languages can divide time up into different sets of tenses:<ul><li>Past/Present/Future</li><li>Past/Nonpast</li><li>Nonfuture/Future</li><li>Not-Now/Now/Not-Now (two tenses!)</li><li>Distant Past/A Year Ago/A Month Ago/A Week Ago/Today or Yesterday/Now/Soon/Future<ul><li>When human languages have divided past or future into multiple segments, there are never more future segments than past segments!</li></ul></li></ul></li><li className="newSection">Future tense markers often derive from "want", "come", or "go".<ul><li>These verbs may still function separately!<ul><li>He come (present)</li><li>He come go (will go)</li><li>He come come (will come)</li></ul></li></ul></li></ul>
					</InfoModal>
					<TextItem
						prop="TEXT_tense"
						value={TEXT_tense}
						rows={6}
					>Is there a Tense system? How does it operate? How does it divide time?</TextItem>
					<HeaderItem level={3}>8.3.2 Aspect</HeaderItem>
					<InfoModal
						title="Aspect"
						label="Info on Aspect"
						modalPropsMaker={modalPropsMaker}
					>
						<ul><li><strong>Aspect</strong> describes the internal structure of an event or state. Here are some typical aspects:<ul><li><strong>Perfective</strong>: The situation is viewed as a single event.<ul><li>"She wrote a letter."</li><li>"He walked around the block."</li></ul></li><li><strong>Imperfective</strong>: The situation is viewed from "inside" as an ongoing process.<ul><li>"She writes a letter."</li><li>"He walks around the block."</li></ul></li><li><strong>Perfect</strong>: A currently relevant state brought about by the verb.<ul><li>"She has written a letter."</li><li>"He has walked around the block."</li></ul></li><li><strong>Pluperfect</strong>: A combination of Perfect aspect and Past tense; the currently relevant state was brought about in the past.<ul><li>"She had written a letter."</li><li>"He had walked around the block."</li></ul></li><li><strong>Completive</strong>: Refers to the end of a situation.<ul><li>"She finished writing a letter."</li><li>"He finished walking around the block."</li></ul></li><li><strong>Inceptive</strong>: Refers to the beginning of a situation.<ul><li>"She started writing a letter."</li><li>"He began walking around the block."</li></ul></li><li><strong>Continuative/Progressive</strong>: This implies an ongoing, dynamic situation.<ul><li>"She is writing a letter."</li><li>"He is walking around the block."</li></ul></li><li><strong>Habitual</strong>: This implies an event or state happens regularly.<ul><li>"She often writes a letter."</li><li>"He usually walks around the block."</li></ul></li><li><strong>Punctual</strong>: The state or event is too short to have an internal structure.<ul><li>"She coughed."</li></ul></li><li><strong>Iterative</strong>: A Punctual state or event takes place several times in succession.<ul><li>"He is coughing."</li></ul></li><li><strong>Atelic</strong>: An event that has no clearly defined end-point.<ul><li>"He is coughing and coughing and coughing."</li></ul></li><li><strong>Telic</strong>: Has a clearly defined end-point.<ul><li>"She is near the end of her walk."</li></ul></li><li><strong>Static</strong>: A changeless state.<ul><li>"He is just plain boring."</li></ul></li></ul></li><li className="newSection">Languages may handle certain aspects in different ways.<ul><li>English uses context for most aspects.</li><li>Spanish uses morphology for Perfective and Imperfective aspects, and uses a morphological/analytical combination for Perfect.</li><li>Mandarin has a Perfective particle.</li><li>Finnish uses an accusative case for Perfective and a "partitive" case for Progressive.<ul><li>In human languages, case markers like this can be mistaken for TAM markers!</li></ul></li></ul></li><li className="newSection">Progressive aspect constructions often derive from locational structures.<ul><li>English has gone from "He is at walking" to "He is a-walking" (still used in some places) to "He is walking".</li></ul></li><li className="newSection">There is often a link between aspect marking and location/direction marking. English has some examples:<ul><li>I <em>came</em> to see it as an abberation (inceptive)</li><li>I cut <em>away</em> at the handcuffs (imperfective)</li><li>I drank your milkshake <em>up</em> (perfective)</li></ul></li></ul>
					</InfoModal>
					<TextItem
						prop="TEXT_aspect"
						value={TEXT_aspect}
						rows={8}
					>Describe the way the language handles Aspect.</TextItem>
					<HeaderItem level={3}>8.3.3 Mode</HeaderItem>
					<InfoModal
						title="Mode"
						label="Info on Mode"
						modalPropsMaker={modalPropsMaker}
					>
						<ul><li><strong>Mode</strong> describes a speaker's attitude toward a situation, including how likely or truthful it is, or how relevant the situation is to them.</li><li>Mode, Mood and Modality are often used interchangeably, though some linguists make distinctions between them.</li><li className="newSection">The highest-level Mode distinction is the Realis-Irrealis Continuum.<ul><li><strong>Realis</strong>: the speaker insists the situation is real, or holds true.</li><li><strong>Irrealis</strong>: the speaker makes no claim as to the situation's reality or truthfulness.<ul><li>Conditional statements (if X...) are inherently Irrealis.</li><li>Interrogative statements (questions) and imperative statements (commands) tend to be treated as Irrealis.</li><li>Other statements that tend to be treated as Irrealis:<ul><li>Subjunctive (possibility, what if)</li><li>Optative (wishes)</li><li>Hypothetical/Imaginary</li><li>Probability</li><li>Deontic (obligations: should, must, have to)</li><li>Potential (might, ability to; sometimes considered very weak Deontic)</li></ul></li></ul></li><li className="newSection">Evidentiality and Validationality are sometimes part of the Mode system. They can also stand alone (8.5).</li></ul></li><li className="newSection">Negative assertions (see 9.2) can be Realis or Irrealis depending on how strongly the assertion is, but some languages still treat all negative statements as Irrealis.</li><li className="newSection">Mode interacts strongly with Tense and Aspect.<ul><li>Habitual aspect is inherently less Realis than Perfective aspect.</li><li>Statements that are more Realis are more likely to be definite and referential.<ul><li>Steve ate the candy. (Perfective)</li><li>Steve always eats candy. (Habitual)</li><li>Steve always eats the candy. (Technically grammatical, but sounds "wrong")</li></ul></li></ul></li></ul>
					</InfoModal>
					<TextItem
						prop="TEXT_mode"
						value={TEXT_mode}
						rows={6}
					>Describe how the language deals with Mode.</TextItem>
					<HeaderItem level={2}>8.4. Location/Direction</HeaderItem>
					<InfoModal
						title="Location and Direction"
						label="Where?"
						modalPropsMaker={modalPropsMaker}
					>
						<ul><li>While Tense grounds statements in time, some languages grammaticize location and/or direction markers to ground statements in space. It may be even more central to discourse than tense in some languages.</li><li className="newSection">Directional formatives are often related to basic verbs of motion (go, come, arrive, depart, return, go up, go down).</li><li className="newSection">Some languages (Lahu, Tibeto-Burman languages) have one motion verb and use directional formatives to indicate progression towards (hither) or away from (thither) a point of reference.</li><li className="newSection">Locational marking is often culturally or geographically relevant to the culture that speaks it.<ul><li>Quechua, spoken in the Andes mountains, has suffixes that indicate uphill, downhill, and "at the same altitude".</li><li>Yagua, spoken in Peruvian lowland rivers, has suffixes that indicate an action was performed upriver, downriver, or moving horizontally across land or water.<ul><li>There are also suffixes that express if an action happened on arrival at a new scene, or on arrival at the current scene.</li></ul></li></ul></li><li className="newSection">Papuan languages have extensive markers that can be used in combination, i.e. "She moved it down and away from her."</li><li>Otomí has auxiliaries than indicate an action is towards (centric) or away from (exocentric) a designated center (usually where the speaker is).</li></ul>
					</InfoModal>
					<TextItem
						prop="TEXT_locDirect"
						value={TEXT_locDirect}
						rows={8}
					>Does the language have affixes or other functions that represent spatial grounding?</TextItem>
					<HeaderItem level={2}>8.5. Evidentiality, Validationality and Mirativity</HeaderItem>
					<InfoModal
						title="Evidentiality"
						label="Truth and Certainty"
						modalPropsMaker={modalPropsMaker}
					>
						<ul><li><strong>Evidentiality</strong> expresses how much evidence the speaker has to make this assertion. For instance, first-hand knowledge is more evidential than third-hand suspect information.</li><li><strong>Validationality</strong> is sometimes separate from Evidentiality. It is how languages express relative certainty of truth. We are more likely to be certain of:<ul><li>Past events vs future events</li><li>The completion of Perfective events vs still-in-progress events</li><li>Realis assertions vs Irrealis assertions</li></ul></li><li><strong>Mirativity</strong> expresses how well this information fits into the speaker's worldview.<ul><li>"The cat was found on the roof" has high mirativity.</li><li>"The elephant was found on the roof" would be surprising, and therefore has very low mirativity.</li></ul></li><li className="newSection">These markers often operate on the clause level rather than the verb-phrase level. They tend to be tightly tied to TAM.</li><li className="newSection">The most common type of evidential marker is the Hearsay particle.</li><li className="newSection">Tuyuca has a complex, five-level system:<ul><li>Witnessed by the speaker</li><li>Not witnessed by the speaker</li><li>General knowledge</li><li>Inferred from evidence</li><li>Hearsay</li></ul></li></ul>
					</InfoModal>
					<TextItem
						prop="TEXT_evidence"
						value={TEXT_evidence}
						rows={6}
					>Are there any grammaticized indicators of Evidentiality, Validationality, or Mirativity?</TextItem>
					<HeaderItem level={2}>8.6. Miscellaneous</HeaderItem>
					<InfoModal
						title="Miscelaneous"
						label="Leftovers"
						modalPropsMaker={modalPropsMaker}
					>
						<ul>
							<li>There are miscellaneous verb-phrase operations that might or might not exist.
								<ul>
									<li>Lexical time reference (as opposed to tense)
										<ul>
											<li>English: "Yesterday", "today"</li>
											<li>Koyukon: "ee-" means "once only"</li>
											<li>Yagua: "-jásiy" means "earlier today"</li>
										</ul>
									</li>
									<li>Distributive, i.e. "back and forth" or "all over the place"</li>
									<li>Environmental modification of motion verbs, i.e. "at night", "over water"</li>
									<li>Speaker attitude, i.e. "disgusted" or "complaining"</li>
								</ul>
							</li>
						</ul>
					</InfoModal>
					<TextItem
						prop="TEXT_miscVerbFunc"
						value={TEXT_miscVerbFunc}
						rows={4}
					>Does the language have any other notable verb phrase operations?</TextItem>
				</IonList>
			</IonContent>
		</IonPage>
	);
};


export default Syntax;
