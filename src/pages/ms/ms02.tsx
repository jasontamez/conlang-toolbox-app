import React from 'react';
import {
	IonPage,
	IonContent,
	IonList,
	IonItem,
	IonGrid,
	IonRow,
	IonCol,
	useIonViewDidEnter
} from '@ionic/react';
import {
	SyntaxHeader,
	HeaderItem,
	InfoModal,
	RadioBox,
	TextItem
} from './MorphoSyntaxElements';
import { changeView } from '../../components/ReduxDucksFuncs';
import { useDispatch } from "react-redux";

const Syntax = () => {
	const dispatch = useDispatch();
	const viewInfo = ['ms', 'ms02']; /// CONSIDER REMOVING INDENTATIONS FROM CSS, AND KILL THE HEADER DROPDOWN
	useIonViewDidEnter(() => {
		dispatch(changeView(viewInfo));
	});
	return (
		<IonPage>
			<SyntaxHeader title="2. Grammatical Categories"/ >
			<IonContent fullscreen className="evenBackground disappearingHeaderKludgeFix" id="morphoSyntaxPage">
				<IonList lines="none">

					<HeaderItem className="h h1">2. Grammatical Categories</HeaderItem>

					<HeaderItem className="h h2">2.1. Nouns (the most time-stable concepts)</HeaderItem>

					<HeaderItem className="h h3">2.1.1. Types of Nouns</HeaderItem>

					<HeaderItem className="h">2.1.1.1. Proper Names</HeaderItem>

					<InfoModal title="Proper Names">
						<ul>
							<li>In English, they do not easily take articles, quantifiers and other modifiers.</li>
							<li>Other languages may have special case markers (4.4) for them.</li>
						</ul>
					</InfoModal>
					<TextItem text="propNames">Are there any special rules involving proper names?</TextItem>

					<HeaderItem className="h">2.1.1.2. Possessability</HeaderItem>

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

					<HeaderItem className="h">2.1.1.3. Count vs Mass</HeaderItem>

					<InfoModal title="Count Nouns and Mass Nouns">
						<ul>
							<li>Typically, most nouns are countable, while fewer are considered as a mass.</li>
							<li>e.g. "sand" requires "a grain of sand" to be countable, and "confetti" requires "a piece of confetti".</li>
						</ul>
					</InfoModal>
					<TextItem text="countMass">Write any specific notes about count/mass noun distinctions here.</TextItem>

					<HeaderItem className="h h3">2.1.2. Pronouns and Anaphoric Clitics</HeaderItem>

					<InfoModal className="following leading" label="What Are They?" title="Pronouns and Anaphoric Clitics">
						<ul>
							<li><strong>Pronouns</strong>:
								<ul>
									<li>Free forms that are used to refer to or replace a word used earlier in a sentence, to avoid repetition.</li>
									<li>Also known as <em>anaphoric references</em>.</li>
								</ul>
							</li>
							<li className="newSection"><strong>Anaphoric Clitics</strong>:
								<ul>
									<li>Must attach to another word, but function as a full noun phrase.</li>
								</ul>
							</li>
							<li className="newSection">Both types often differ according to person (3rd/2nd/1st including inclusive/exclusive), number (singular/plural), noun class (gender/animacy), grammatical role (subject/object/ergative/etc), semantic role (Agent/Patient), definiteness and/or specificness (a/the), and honorifics.</li>
							<li>English has frequent pronouns that agree with the verb, and may be stressed for emphasis or contrast: "<strong>He</strong> died" (not her, as expected).</li>
							<li>Spanish has anaphoric forms attached to the verb, but will use pronouns for emphasis or contrast.</li>
						</ul>
					</InfoModal>
					<TextItem className="following" text="pronounAnaphClitic" rows={4}>Which system(s) are used by the language?</TextItem>

					<HeaderItem className="h h2">2.2. Verbs (the least time-stable concepts)</HeaderItem>

					<HeaderItem className="h h3">2.2.1. Semantic Roles</HeaderItem>

					<InfoModal title="Semantic Roles" label="What Are They?">
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

					<HeaderItem className="h h3">2.2.2. Verb Classes</HeaderItem>

					<IonItem className="content">
						<IonGrid className="striped">
							<IonRow className="header">
								<IonCol className="cbox">Exists?</IonCol>
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
						</IonGrid>
					</IonItem>

					<TextItem text="verbClass" rows={8}>Describe which verb classes exist as distinct categories in the language and how they are realized.</TextItem>

					<HeaderItem className="h h3">2.2.3. Verb Structure</HeaderItem>

					<InfoModal title="Verb Structure" label="Structure and Operations Info">
						<ul>
							<li>Describe the structure of the verb phrase.
								<ul>
									<li>Where does the stem lie in relation to any affixes/particles/etc?</li>
									<li>Are directional and/or locational notions expressed in the verb/phrase at all?</li>
								</ul>
							</li>
							<li className="newSection">Describe any verbal operations.
								<ul>
									<li>Is this operation obligatory?</li>
									<li>Is it productive (for all/most stems)?</li>
									<li>Is this coded morphologically (modifying the verb), analytically (particles and word order), lexically (using other verbs)? Any exceptions?</li>
									<li>Where in the word/phrase is the operation likely to appear? Can it appear in more than one place?</li>
								</ul>
							</li>
						</ul>
					</InfoModal>
					<TextItem text="verbStructure" rows={8}>Describe the verb structure here.</TextItem>

					<HeaderItem className="h h2">2.3. Modifiers</HeaderItem>

					<HeaderItem className="h h3">2.3.1. Property Concepts (Descriptive Adjectives)</HeaderItem>

					<IonItem className="content">
						<IonGrid className="cols2">
							<IonRow>
								<IonCol className="header">Different Ways Property Concepts Are Handled in Human Language</IonCol>
							</IonRow>
							<IonRow>
								<IonCol className="cbox"><RadioBox prop="lexVerb" /></IonCol>
								<IonCol>Lexicalized as verbs (austronesian languages)</IonCol>
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
					<InfoModal title="Property Concepts">
						<ul>
							<li>If these exist as a separate category, they will express:
								<ul>
									<li>age</li>
									<li>dimension (big, short, long, tall, wide)</li>
									<li>value (good, bad)</li>
									<li>color</li>
								</ul>
							</li>
							<li className="newSection">Other properties may be expressed:
								<ul>
									<li>physical properties (hard, smooth, heavy)</li>
									<li>shape</li>
									<li>speed</li>
									<li>human propensity (happy, jealous, smart, wary)</li>
								</ul>
							</li>
						</ul>
					</InfoModal>
					<TextItem text="propClass">Which way does the language handle PCs? Do they agree with their head?</TextItem>

					<HeaderItem className="h h3">2.3.2. Non-Numeral Quantifiers (e.g. few, many, some)</HeaderItem>

					<TextItem text="quantifier">Which quantifiers exist?</TextItem>

					<HeaderItem className="h h3">2.3.3. Numerals</HeaderItem>

					<InfoModal title="Numerals" label="Things to Consider">
						<ul>
							<li><strong>Extent</strong>:
								<ul>
									<li>Some languages have restricted numerals: e.g. 1, 2, 3, many.</li>
									<li>Only very advanced societies will have a need for numbers beyond a thousand.</li>
								</ul>
							</li>
							<li className="newSection"><strong>Base</strong>:
								<ul>
									<li>Usually base 5 or 10. Sometimes 20.</li>
									<li>Numerals can be described from greatest to least ("twenty-two"), from least to greatest ("two-twenty"), or not give base multiples a special name ("two-two").</li>
								</ul>
							</li>
							<li className="newSection"><strong>Agreement</strong>:
								<ul>
									<li>Some languages use different sets of numerals for different classes of nouns.</li>
									<li>Other languages inflect their numerals to agree with their head.</li>
								</ul>
							</li>
						</ul>
					</InfoModal>
					<TextItem text="numeral" rows={6}>Describe the language's numeral system.</TextItem>

					<HeaderItem className="h h2">2.4. Adverbs (a "catch-all" category)</HeaderItem>

					<InfoModal title="Adverbs">
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
 
export default Syntax;
