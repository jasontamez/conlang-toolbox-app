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
	TextItem,
	TransTable
} from './MorphoSyntaxElements';

const Syntax = (props: PageData) => {
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
				title="2. Grammatical Categories"
				{...props}
			/>
			<IonContent fullscreen
				className="evenBackground disappearingHeaderKludgeFix"
				id="morphoSyntaxPage"
			>
				<IonList lines="none" className="hasSpecialLabels">
					<HeaderItem level={1}>2. Grammatical Categories</HeaderItem>
					<HeaderItem level={2}>2.1. Nouns (the most time-stable concepts)</HeaderItem>
					<HeaderItem level={3}>2.1.1. Types of Nouns</HeaderItem>
					<HeaderItem level={4}>2.1.1.1. Proper Names</HeaderItem>
					<InfoModal
						title="Proper Names"
						label="Read About Them"
						modalPropsMaker={modalPropsMaker}
					>
						<ul>
							<li>In English, they do not easily take articles, quantifiers and other modifiers.</li>
							<li>Other languages may have special case markers (4.4) for them.</li>
						</ul>
					</InfoModal>
					<TextItem
						prop="TEXT_propNames"
						value={TEXT_propNames}
						rows={undefined}
					>Are there any special rules involving proper names?</TextItem>
					<HeaderItem level={4}>2.1.1.2. Possessability</HeaderItem>
					<InfoModal
						title="Possessability"
						label="Systems of Possession"
						modalPropsMaker={modalPropsMaker}
					>
						<ul>
							<li>Languages may have one of the following systems to differentiate nouns.
								<ul>
									<li className="newSection"><strong>Possessable vs Unpossessable</strong>:
										<ul><li>Some nouns cannot be possessed (e.g. land, stars).</li></ul>
									</li>
									<li className="newSection"><strong>Inherent vs Optional</strong>:
										<ul><li>Some nouns <em>must</em> be possessed (e.g. body parts, kinship terms).</li></ul>
									</li>
									<li className="newSection"><strong>Alienable vs Inalienable</strong>:
										<ul>
											<li>Alienable possession can be ended (my car becomes your car).</li>
											<li>Inalienable possession cannot be ended (my brother is always my brother).</li>
										</ul>
									</li>
								</ul>
							</li>
						</ul>
					</InfoModal>
					<TextItem
						prop="TEXT_possessable"
						value={TEXT_possessable}
						rows={4}
					>Describe how the language handles possession.</TextItem>
					<HeaderItem level={4}>2.1.1.3. Count vs Mass</HeaderItem>
					<InfoModal
						title="Count Nouns and Mass Nouns"
						label="A Piece of Information"
						modalPropsMaker={modalPropsMaker}
					>
						<ul>
							<li>Typically, most nouns are countable, while fewer are considered as a mass.</li>
							<li>e.g. "sand" requires "a grain of sand" to be countable, and "confetti" requires "a piece of confetti".</li>
						</ul>
					</InfoModal>
					<TextItem
						prop="TEXT_countMass"
						value={TEXT_countMass}
						rows={undefined}
					>Write any specific notes about count/mass noun distinctions here.</TextItem>
					<HeaderItem level={3}>2.1.2. Pronouns and Anaphoric Clitics</HeaderItem>
					<InfoModal
						title="Pronouns and Anaphoric Clitics"
						label="What Are They?"
						modalPropsMaker={modalPropsMaker}
					>
						<ul>
							<li><strong>Pronouns</strong>:
								<ul>
									<li>Free forms that are used to refer to or replace a word used earlier in a sentence, to avoid repetition.</li>
									<li>Also known as <em>anaphoric references</em>.</li>
								</ul>
							</li>
							<li className="newSection"><strong>Anaphoric Clitics</strong>:
								<ul>
									<li>A <em>clitic</em> is a bound morpheme that functions on the phrase or clause level, but is bound phonologically to another word.</li>
									<li>An Anaphoric Clitic functions as a full noun phrase.
										<ul><li>Spanish:<br /><TransTable rows="lav-o el auto / wash-1s the car">"I wash the car" :: <strong>-o</strong> functions as the noun phrase "I"</TransTable></li></ul>
									</li>
								</ul>
							</li>
							<li className="newSection">Both types often differ according to person (3rd/2nd/1st including inclusive/exclusive), number (singular/plural), noun class (gender/animacy), grammatical role (subject/object/ergative/etc), semantic role (Agent/Patient), definiteness and/or specificness (a/the), and honorifics.</li>
							<li>English has frequent pronouns that agree with the verb, and may be stressed for emphasis or contrast: "<strong>He</strong> died" (not her, as expected).</li>
							<li>Spanish has anaphoric forms attached to the verb, but will use pronouns for emphasis or contrast.</li>
						</ul>
					</InfoModal>
					<TextItem
						prop="TEXT_pronounAnaphClitic"
						value={TEXT_pronounAnaphClitic}
						rows={4}
					>Which system(s) are used by the language?</TextItem>
					<HeaderItem level={2}>2.2. Verbs (the least time-stable concepts)</HeaderItem>
					<HeaderItem level={3}>2.2.1. Semantic Roles</HeaderItem>
					<InfoModal
						title="Semantic Roles"
						label="A Quick Primer"
						modalPropsMaker={modalPropsMaker}
					>
						<ul>
							<li>Verbs can be divided into groups depending on which roles they require.
								<ul>
									<li className="newSection"><strong>Agent</strong>: active, physical, has volition</li>
									<li><strong>Patient</strong>: undergoes a change, no volition (direct object in English)</li>
									<li><strong>Recipient</strong>: moving object (indirect object in English), or often a destination</li>
									<li><strong>Force</strong>: directly instigates, not necessarily conscious or voluntary</li>
									<li><strong>Instrument</strong>: indirectly instigates (usually by an Agent)</li>
									<li><strong>Experiencer</strong>: does not participate, merely observes</li>
								</ul>
							</li>
							<li className="newSection">In English, all verbs require an Agent, and many also require a Patient, but no other roles are encoded into the verb.</li>
							<li className="newSection">NOTE: Roles can change according to the perspective of the speaker:
								<ul>
									<li>I hit Steve with the hammer.</li>
									<li>The hammer hit Steve.</li>
									<li>Steve was hit.</li>
								</ul>
							</li>
						</ul>
					</InfoModal>
					<TextItem
						prop="TEXT_semanticRole"
						value={TEXT_semanticRole}
						rows={6}
					>Describe which semantic roles are important.</TextItem>
					<HeaderItem level={3}>2.2.2. Verb Classes</HeaderItem>
					<CheckboxItem
						display={
							{
								class: "striped",
								boxesPerRow: 1,
								inlineHeaders: ["Special?", "Type", "Description"],
								labels: [
									"Actions",
									"Action-Processes",
									"Weather Verbs",
									"States",
									"Involuntary Processes",
									"Bodily Functions",
									"Motion",
									"Position",
									"Factive",
									"Cognition",
									"Sensation",
									"Emotion",
									"Utterance",
									"Manipulation",
									"Other Verb Class(es)"
								],
								rowLabels: [
									"Agent affects Patient.",
									"Agent only.",
									"In English, these require a dummy Agent (\"<em>It</em> is raining\"); this is not the case in many other languages!",
									"be hot, be broken, be frozen, etc; may be predicate-bound",
									"He grew; It broke; They died; etc.",
									"cough, sweat, bleed, cry, etc.",
									"go, float, proceed, etc.",
									"sit, stand, hang, etc.",
									"Something comes into being: e.g. build, form, ignite, create; rarely treated differently than Actions", "know, suspect, forget etc.",
									"hear, see, taste, etc.",
									"be happy, be afraid, be mellow, etc.",
									"say, yell, murmur, declare, chat, etc.",
									"force, urge, cause, let, permit, allow, compel, etc.",
									"(you might have a distinction different from those already listed)"
								],
								export: {
									title: "Verb Types that are handled in a special way:",
									labelOverrideDocx: true,
									labels: [
										"Agent affects Patient.",
										"Agent only.",
										"In English, these require a dummy Agent (\"_It_ is raining\"); this is not the case in many other languages!",
										"be hot, be broken, be frozen, etc; may be predicate-bound",
										"He grew; It broke; They died; etc.",
										"cough, sweat, bleed, cry, etc.",
										"go, float, proceed, etc.",
										"sit, stand, hang, etc.",
										"Something comes into being: e.g. build, form, ignite, create; rarely treated differently than Actions", "know, suspect, forget etc.",
										"hear, see, taste, etc.",
										"be happy, be afraid, be mellow, etc.",
										"say, yell, murmur, declare, chat, etc.",
										"force, urge, cause, let, permit, allow, compel, etc.",
										"(you might have a distinction different from those already listed)"
									]
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
					>If you've marked a verb class as "Special", describe how the language treats it differently than the "regular" verbs.</TextItem>
					<HeaderItem level={3}>2.2.3. Verb Structure</HeaderItem>
					<InfoModal
						title="Verb Structure"
						label="Structure and Operations Info"
						modalPropsMaker={modalPropsMaker}
					>
						<ul>
							<li>In polysynthetic languages, verbs tend to be the most complex.
								<ul>
									<li>English is very simple:
										<ul><li>root verb<br />+ (optional tense marker OR agreement marker)</li></ul>
									</li>
									<li>Panare is much more complex:
										<ul><li>person/neutral marker<br />+ (optional valence marker)<br />+ (optional detransification marker)<br />+ (optional incorporation marker)<br />+ root verb<br />+ (optional derivation marker)<br />+ tense/aspect/mode marker</li></ul>
									</li>
								</ul>
							</li>
							<li className="newSection">Polysynthetic languages may have any/all of these operations
								<ul>
									<li>Verb agreement (6)</li>
									<li>Semantic role markers (applicatives) (7.1.2)</li>
									<li>Valence increasing/decreasing (7.1, 7.2)</li>
									<li>Tense/Apect/Mode (8.3)</li>
									<li>Evidentials (8.5)</li>
									<li>Location and direction (8.4)</li>
									<li>Speech act markers (9.3)</li>
									<li>Verb and verb-phrase negation (9.2)</li>
									<li>Subordination/Nominalization (8.1, 10)</li>
									<li>Switch-Reference (10.4)</li>
								</ul>
							</li>
							<li>In more isolating languages, those operations are more likely to be expressed through particles or adverbs.</li>
							<li className="newSection">Things to consider:
								<ul>
									<li>Where does the stem lie in relation to any affixes/particles/etc?</li>
									<li>Are directional and/or locational notions expressed in the verb/phrase at all?</li>
									<li>Are particular operations obligatory? Productive (for all/most roots)?</li>
								</ul>
							</li>
						</ul>
					</InfoModal>
					<TextItem
						prop="TEXT_verbStructure"
						value={TEXT_verbStructure}
						rows={6}
					>Describe the verb structure here.</TextItem>
					<HeaderItem level={2}>2.3. Modifiers</HeaderItem>
					<HeaderItem level={3}>2.3.1. Property Concepts (Descriptive Adjectives)</HeaderItem>
					<CheckboxItem
						display={
							{
								class: "cols2",
								boxesPerRow: 1,
								header: "Different Ways Property Concepts Are Handled in Human Language",
								rowLabels: [
									"Lexicalized as verbs (Acehnese)",
									"Lexicalized as nouns (Finnish)",
									"Lexicalized as nouns or verbs depending on the demands of discourse (Dutch)",
									"Some are lexicalized as nouns, others are lexicalized as verbs (Yoruba)",
									"Distinct class of \"adjectives\" (English)"
								],
								export: {
									title: "Property Concepts:",
									labels: [
										"Lexicalized as verbs",
										"Lexicalized as nouns",
										"Lexicalized as nouns or verbs depending on the demands of discourse",
										"Some are lexicalized as nouns, others are lexicalized as verbs",
										"Distinct class of \"adjectives\""
									]
								}
							}
						}
						boxes={["BOOL_lexVerb", "BOOL_lexNoun", "BOOL_lexVN", "BOOL_lexVorN", "BOOL_adjectives"]}
						values={[BOOL_lexVerb, BOOL_lexNoun, BOOL_lexVN, BOOL_lexVorN, BOOL_adjectives]}
					/>
					<InfoModal
						title="Property Concepts"
						label="More Info"
						modalPropsMaker={modalPropsMaker}
					>
						<ul>
							<li>If Property Concepts (adjectives) exist as a separate category, they will express:
								<ul>
									<li>age</li>
									<li>dimension (big, short, long, tall, wide)</li>
									<li>value (good, bad)</li>
									<li>color</li>
								</ul>
							</li>
							<li>Other properties may be expressed:
								<ul>
									<li>physical properties (hard, smooth, heavy)</li>
									<li>shape</li>
									<li>speed</li>
									<li>human propensity (happy, jealous, smart, wary)</li>
								</ul>
							</li>
							<li className="newSection">In Acehnese, property concepts can take the same sort of morphology as verbs, thus they are lexicalized as verbs.</li>
							<li className="newSection">In Finnish, property concepts are required to take the same sort of morphology as the noun they modify, thus they are lexicalized as nouns.</li>
							<li className="newSection">In Dutch, property concepts are treated as verbs when used as a predicator ("That car is <em>pink</em>!") and as nouns when used as a modifier ("I love <em>pink</em> cars!").</li>
							<li className="newSection">In Yoruba, some property concepts are always treated as nouns, while others are always treated as verbs.</li>
							<li className="newSection">In English, they are labeled as a separate class because they don't follow the same patterns as nouns or verbs:
								<ol>
									<li>They cannot take past tense like a verb, nor do they "agree" with their head noun in the same way.</li>
									<li>They do not take plural markers like a noun, nor can they take articles, modifiers or quantifiers.
										<ul><li>Rarely, an adjective can be treated as a noun (e.g. "<em>The wealthy</em> are obnoxious", "Which car do you prefer, <em>the gray</em> or <em>the red</em>?"), but these are actually <em>zero derivations</em> (8.1).</li></ul>
									</li>
								</ol>
							</li>
						</ul>
					</InfoModal>
					<TextItem
						prop="TEXT_propClass"
						value={TEXT_propClass}
						rows={undefined}
					>How does the language handle Property Concepts (descriptive adjectives)? If they're not all treated the same way (as in Dutch or Yoruba), explain the differences.</TextItem>
					<HeaderItem level={3}>2.3.2. Non-Numeral Quantifiers (e.g. few, many, some)</HeaderItem>
					<TextItem
						prop="TEXT_quantifier"
						value={TEXT_quantifier}
						rows={undefined}
					>Which quantifiers exist?</TextItem>
					<HeaderItem level={3}>2.3.3. Numerals</HeaderItem>
					<InfoModal
						title="Numerals"
						label="Things to Consider"
						modalPropsMaker={modalPropsMaker}
					>
						<ul>
							<li><strong>Extent</strong>:
								<ul>
									<li>Some languages have restricted numerals: e.g. 1, 2, 3, many.</li>
									<li>Only very advanced societies will have a need for numbers beyond a thousand.</li>
									<li>Many societies will end up borrowing larger number words from nearby languages that invent them first.</li>
								</ul>
							</li>
							<li className="newSection"><strong>Base</strong>:
								<ul>
									<li>Usually base 5 or 10. Sometimes 20. (English is base 10.)</li>
									<li>Words for "five" usually come from the word for "hand". Words for "twenty" can come from the word for an entire human being.</li>
									<li>More advanced cultures with merchants or bureaucracies tend to create systems based around 12 as well, due to its greater number of factors, but this system almost never replaces the original base system.</li>
									<li>Numerals can be described from greatest to least ("twenty-two"), from least to greatest ("two-twenty"), or not give base multiples a special name ("two-two").</li>
								</ul>
							</li>
							<li className="newSection"><strong>Agreement</strong>:
								<ul>
									<li>Languages may inflect their numerals to agree with their head.</li>
									<li>Some languages use entirely different sets of numerals for different situations.
										<ul>
											<li>English has separate numerals for counting (one, two, three, etc.) and ordering things (first, second, third, etc.)</li>
											<li>Irish has a set of numbers that represent the numbers themselves, a second set for counting or ordering things (one goat, two goats, three goats, etc.), and third set of numerals used only for counting people.</li>
										</ul>
									</li>
								</ul>
							</li>
						</ul>
					</InfoModal>
					<CheckboxItem
						display={
							{
								class: "cols2",
								boxesPerRow: 1,
								header: "Number Base",
								rowLabels: [
									"Base Five",
									"Base Ten",
									"Base Twenty",
									"Other"
								],
								export: {
									title: "Number Base:",
									labels: [
										"Base Five",
										"Base Ten",
										"Base Twenty",
										"Not Base Five, Ten or Twenty"
									]
								}
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
								header: "Number Format",
								rowLabels: [
									"Greatest-to-Least (twenty-two)",
									"Least-to-Greatest (two-twenty)",
									"Single Digits Only (two-two)"
								],
								export: {
									title: "Number Format:",
									labels: [
										"Greatest-to-Least",
										"Least-to-Greatest",
										"Single Digits Only"
									]
								}
							}
						}
						boxes={["BOOL_numGL", "BOOL_numLG", "BOOL_numNone"]}
						values={[BOOL_numGL, BOOL_numLG, BOOL_numNone]}
					/>
					<CheckboxItem
						display={{
							class: "cols2",
							boxesPerRow: 1,
							header: "Other Properties",
							rowLabels: [
								"Multiple Sets of Numerals",
								"Numerals Agree With Head"
							],
							export: {
								title: "Other Number Properties:"
							}
						}}
						boxes={["BOOL_multiNumSets", "BOOL_inflectNum"]}
						values={[BOOL_multiNumSets, BOOL_inflectNum]}
					/>
					<TextItem
						prop="TEXT_numeral"
						value={TEXT_numeral}
						rows={6}
					>Describe the language's numeral system.</TextItem>
					<HeaderItem level={2}>2.4. Adverbs</HeaderItem>
					<InfoModal
						title="Adverbs"
						label={'A "Catch-All" Category'}
						modalPropsMaker={modalPropsMaker}
					>
						<ul>
							<li>These may or may not exist as a separate category of words.</li>
							<li>Languages may use adjectives in special phrases to fulfill this role.</li>
							<li>Adverbs can describe the following:
								<ul>
									<li><strong>Manner</strong>: e.g. quickly, slowly, patiently.</li>
									<li><strong>Time</strong>: e.g. yesterday, today, early, next year.</li>
									<li><strong>Direction/Location</strong>: e.g. up/downriver, north(ward), left(ward), hither.</li>
									<li><strong>Evidential/Epistemic</strong>: e.g. possibly, definitely, from conjecture, from direct observation, from second-hand information.</li>
								</ul>
							</li>
						</ul>
					</InfoModal>
					<TextItem
						prop="TEXT_adverb"
						value={TEXT_adverb}
						rows={4}
					>How are adverbs (or adverb-like phrases) handled?</TextItem>
				</IonList>
			</IonContent>
		</IonPage>
	);
};


export default Syntax;
