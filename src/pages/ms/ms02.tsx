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
	const viewInfo = { key: "ms" as keyof ViewState, page: "ms02" };
	useIonViewDidEnter(() => {
		dispatch(saveView(viewInfo));
	});
	return (
		<IonPage>
			<SyntaxHeader title="2. Grammatical Categories" {...props} />
			<IonContent fullscreen className="evenBackground disappearingHeaderKludgeFix" id="morphoSyntaxPage">
				<IonList lines="none" className="hasSpecialLabels">
					{parseMSJSON({page: "s2", ...props})}
				</IonList>
			</IonContent>
		</IonPage>
	);
};

/*
const OldSyntax = () => {
	const dispatch = useDispatch();
	const viewInfo = { key: "ms" as keyof ViewState, page: "ms02" };
	useIonViewDidEnter(() => {
		dispatch(changeView(viewInfo));
	});
	return (
		<IonPage>
			<SyntaxHeader title="2. Grammatical Categories" />
			<IonContent fullscreen className="evenBackground disappearingHeaderKludgeFix" id="morphoSyntaxPage">
				<IonList lines="none">

					<HeaderItem level="1">2. Grammatical Categories</HeaderItem>

					<HeaderItem level="2">2.1. Nouns (the most time-stable concepts)</HeaderItem>

					<HeaderItem level="3">2.1.1. Types of Nouns</HeaderItem>

					<HeaderItem>2.1.1.1. Proper Names</HeaderItem>

					<InfoModal title="Proper Names" label="Read About Them">
						<ul>
							<li>In English, they do not easily take articles, quantifiers and other modifiers.</li>
							<li>Other languages may have special case markers (4.4) for them.</li>
						</ul>
					</InfoModal>
					<TextItem text="propNames">Are there any special rules involving proper names?</TextItem>

					<HeaderItem>2.1.1.2. Possessability</HeaderItem>

					<InfoModal title="Possessability" label="Systems of Possession">
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
					<TextItem text="possessable" rows={4}>Describe how the language handles possession.</TextItem>

					<HeaderItem>2.1.1.3. Count vs Mass</HeaderItem>

					<InfoModal title="Count Nouns and Mass Nouns" label="A Piece of Information">
						<ul>
							<li>Typically, most nouns are countable, while fewer are considered as a mass.</li>
							<li>e.g. "sand" requires "a grain of sand" to be countable, and "confetti" requires "a piece of confetti".</li>
						</ul>
					</InfoModal>
					<TextItem text="countMass">Write any specific notes about count/mass noun distinctions here.</TextItem>

					<HeaderItem level="3">2.1.2. Pronouns and Anaphoric Clitics</HeaderItem>

					<InfoModal label="What Are They?" title="Pronouns and Anaphoric Clitics">
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
										<ul>
											<li>Spanish:<br />
												<TransTable rows="lav-o el auto / wash-1s the car">"I wash the car" :: <strong>-o</strong> functions as the noun phrase "I"</TransTable>
											</li>
										</ul>
									</li>
								</ul>
							</li>
							<li className="newSection">Both types often differ according to person (3rd/2nd/1st including inclusive/exclusive), number (singular/plural), noun class (gender/animacy), grammatical role (subject/object/ergative/etc), semantic role (Agent/Patient), definiteness and/or specificness (a/the), and honorifics.</li>
							<li>English has frequent pronouns that agree with the verb, and may be stressed for emphasis or contrast: "<strong>He</strong> died" (not her, as expected).</li>
							<li>Spanish has anaphoric forms attached to the verb, but will use pronouns for emphasis or contrast.</li>
						</ul>
					</InfoModal>
					<TextItem text="pronounAnaphClitic" rows={4}>Which system(s) are used by the language?</TextItem>

					<HeaderItem level="2">2.2. Verbs (the least time-stable concepts)</HeaderItem>

					<HeaderItem level="3">2.2.1. Semantic Roles</HeaderItem>

					<InfoModal title="Semantic Roles" label="A Quick Primer">
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
					<TextItem text="semanticRole" rows={6}>Describe which semantic roles are important.</TextItem>

					<HeaderItem level="3">2.2.2. Verb Classes</HeaderItem>

					<IonItem className="content">
						<IonGrid className="striped">
							<IonRow className="header">
								<IonCol className="cbox">Special?</IonCol>
								<IonCol className="label">Type</IonCol>
								<IonCol>Description</IonCol>
							</IonRow>
							<IonRow>
								<IonCol className="cbox"><RadioBox prop="actions" /></IonCol>
								<IonCol className="label">Actions</IonCol>
								<IonCol>Agent affects Patient.</IonCol>
							</IonRow>
							<IonRow>
								<IonCol className="cbox"><RadioBox prop="actionProcesses" /></IonCol>
								<IonCol className="label">Action-Processes</IonCol>
								<IonCol>Agent only.</IonCol>
							</IonRow>
							<IonRow>
								<IonCol className="cbox"><RadioBox prop="weather" /></IonCol>
								<IonCol className="label">Weather Verbs</IonCol>
								<IonCol>In English, these require a dummy Agent ("<em>It</em> is raining"); this is not the case in many other languages!</IonCol>
							</IonRow>
							<IonRow>
								<IonCol className="cbox"><RadioBox prop="states" /></IonCol>
								<IonCol className="label">States</IonCol>
								<IonCol>be hot, be broken, be frozen, etc; may be predicate-bound.</IonCol>
							</IonRow>
							<IonRow>
								<IonCol className="cbox"><RadioBox prop="involuntaryProcesses" /></IonCol>
								<IonCol className="label">Involuntary Processes</IonCol>
								<IonCol>He grew; It broke; They died; etc</IonCol>
							</IonRow>
							<IonRow>
								<IonCol className="cbox"><RadioBox prop="bodyFunctions" /></IonCol>
								<IonCol className="label">Bodily Functions</IonCol>
								<IonCol>cough, sweat, bleed, cry, etc</IonCol>
							</IonRow>
							<IonRow>
								<IonCol className="cbox"><RadioBox prop="motion" /></IonCol>
								<IonCol className="label">Motion</IonCol>
								<IonCol>go, float, proceed, etc</IonCol>
							</IonRow>
							<IonRow>
								<IonCol className="cbox"><RadioBox prop="position" /></IonCol>
								<IonCol className="label">Position</IonCol>
								<IonCol>sit, stand, hang, etc</IonCol>
							</IonRow>
							<IonRow>
								<IonCol className="cbox"><RadioBox prop="factive" /></IonCol>
								<IonCol className="label">Factive</IonCol>
								<IonCol>Something comes into being: e.g. build, form, ignite, create; rarely treated differently than Actions</IonCol>
							</IonRow>
							<IonRow>
								<IonCol className="cbox"><RadioBox prop="cognition" /></IonCol>
								<IonCol className="label">Cognition</IonCol>
								<IonCol>know, suspect, forget etc</IonCol>
							</IonRow>
							<IonRow>
								<IonCol className="cbox"><RadioBox prop="sensation" /></IonCol>
								<IonCol className="label">Sensation</IonCol>
								<IonCol>hear, see, taste, etc</IonCol>
							</IonRow>
							<IonRow>
								<IonCol className="cbox"><RadioBox prop="emotion" /></IonCol>
								<IonCol className="label">Emotion</IonCol>
								<IonCol>be happy, be afraid, be mellow, etc</IonCol>
							</IonRow>
							<IonRow>
								<IonCol className="cbox"><RadioBox prop="utterance" /></IonCol>
								<IonCol className="label">Utterance</IonCol>
								<IonCol>say, yell, murmur, declare, chat, etc</IonCol>
							</IonRow>
							<IonRow>
								<IonCol className="cbox"><RadioBox prop="manipulation" /></IonCol>
								<IonCol className="label">Manipulation</IonCol>
								<IonCol>force, urge, cause, let, permit, allow, compel, etc</IonCol>
							</IonRow>
							<IonRow>
								<IonCol className="cbox"><RadioBox prop="otherVerbClass" /></IonCol>
								<IonCol className="label">Other Verb Class(es)</IonCol>
								<IonCol>(you might have a distinction different from those already listed)</IonCol>
							</IonRow>
						</IonGrid>
					</IonItem>

					<TextItem text="verbClass" rows={8}>If you've marked a verb class as "Special", describe how the language treats it differently than the "regular" verbs.</TextItem>

					<HeaderItem level="3">2.2.3. Verb Structure</HeaderItem>

					<InfoModal title="Verb Structure" label="Structure and Operations Info">
						<ul>
							<li>In polysynthetic languages, verbs tend to be the most complex.
								<ul>
									<li>English is very simple:
										<ul><li>root verb
											<br />+ (optional tense marker OR agreement marker)</li></ul>
									</li>
									<li>Panare is much more complex:
										<ul>
											<li>person/neutral marker
												<br />+ (optional valence marker)
												<br />+ (optional detransification marker)
												<br />+ (optional incorporation marker)
												<br />+ root verb
												<br />+ (optional derivation marker)
												<br />+ tense/aspect/mode marker</li>
										</ul>
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
					<TextItem text="verbStructure" rows={6}>Describe the verb structure here.</TextItem>

					<HeaderItem level="2">2.3. Modifiers</HeaderItem>

					<HeaderItem level="3">2.3.1. Property Concepts (Descriptive Adjectives)</HeaderItem>

					<IonItem className="content">
						<IonGrid className="cols2">
							<IonRow>
								<IonCol className="header">Different Ways Property Concepts Are Handled in Human Language</IonCol>
							</IonRow>
							<IonRow>
								<IonCol className="cbox"><RadioBox prop="lexVerb" /></IonCol>
								<IonCol>Lexicalized as verbs (Acehnese)</IonCol>
							</IonRow>
							<IonRow>
								<IonCol className="cbox"><RadioBox prop="lexNoun" /></IonCol>
								<IonCol>Lexicalized as nouns (Finnish)</IonCol>
							</IonRow>
							<IonRow>
								<IonCol className="cbox"><RadioBox prop="lexVN" /></IonCol>
								<IonCol>Lexicalized as nouns or verbs depending on the demands of discourse (Dutch)</IonCol>
							</IonRow>
							<IonRow>
								<IonCol className="cbox"><RadioBox prop="lexVorN" /></IonCol>
								<IonCol>Some are lexicalized as nouns, others are lexicalized as verbs (Yoruba)</IonCol>
							</IonRow>
							<IonRow>
								<IonCol className="cbox"><RadioBox prop="adjectives" /></IonCol>
								<IonCol>Distinct class of "adjectives" (English)</IonCol>
							</IonRow>
						</IonGrid>
					</IonItem>
					<InfoModal title="Property Concepts" label="More Info">
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
										<ul>
											<li>Rarely, an adjective can be treated as a noun (e.g. "<em>The wealthy</em> are obnoxious", "Which car do you prefer, <em>the gray</em> or <em>the red</em>?"), but these are actually <em>zero derivations</em> (8.1).</li>
										</ul>
									</li>
								</ol>
							</li>
						</ul>
					</InfoModal>
					<TextItem text="propClass">How does the language handle PCs? If they're not all treated the same way (as in Dutch or Yoruba), explain the differences.</TextItem>

					<HeaderItem level="3">2.3.2. Non-Numeral Quantifiers (e.g. few, many, some)</HeaderItem>

					<TextItem text="quantifier">Which quantifiers exist?</TextItem>

					<HeaderItem level="3">2.3.3. Numerals</HeaderItem>

					<InfoModal title="Numerals" label="Things to Consider">
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
					<IonItem className="content">
						<IonGrid className="cols2">
							<IonRow className="header">
								<IonCol>Number Base</IonCol>
							</IonRow>
							<IonRow>
								<IonCol className="cbox"><RadioBox prop="baseFive" /></IonCol>
								<IonCol>Base Five</IonCol>
							</IonRow>
							<IonRow>
								<IonCol className="cbox"><RadioBox prop="baseTen" /></IonCol>
								<IonCol>Base Ten</IonCol>
							</IonRow>
							<IonRow>
								<IonCol className="cbox"><RadioBox prop="baseTwenty" /></IonCol>
								<IonCol>Base Twenty</IonCol>
							</IonRow>
							<IonRow>
								<IonCol className="cbox"><RadioBox prop="baseOther" /></IonCol>
								<IonCol>Other</IonCol>
							</IonRow>
							<IonRow className="header">
								<IonCol>Number Format</IonCol>
							</IonRow>
							<IonRow>
								<IonCol className="cbox"><RadioBox prop="numGL" /></IonCol>
								<IonCol>Greatest-to-Least (twenty-two)</IonCol>
							</IonRow>
							<IonRow>
								<IonCol className="cbox"><RadioBox prop="numLG" /></IonCol>
								<IonCol>Least-to-Greatest (two-twenty)</IonCol>
							</IonRow>
							<IonRow>
								<IonCol className="cbox"><RadioBox prop="numNone" /></IonCol>
								<IonCol>Single Digits Only (two-two)</IonCol>
							</IonRow>
							<IonRow className="header">
								<IonCol>Other Properties</IonCol>
							</IonRow>
							<IonRow>
								<IonCol className="cbox"><RadioBox prop="multiNumSets" /></IonCol>
								<IonCol>Multiple Sets of Numerals</IonCol>
							</IonRow>
							<IonRow>
								<IonCol className="cbox"><RadioBox prop="inflectNum" /></IonCol>
								<IonCol>Numerals Agree With Head</IonCol>
							</IonRow>
						</IonGrid>
					</IonItem>
					<TextItem text="numeral" rows={6}>Describe the language's numeral system.</TextItem>

					<HeaderItem level="2">2.4. Adverbs</HeaderItem>

					<InfoModal title="Adverbs" label='A "Catch-All" Category'>
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
					<TextItem text="adverb" rows={4}>How are adverbs (or adverb-like phrases) handled?</TextItem>

				</IonList>
			</IonContent>
		</IonPage>
	);
};
*/

export default Syntax;
