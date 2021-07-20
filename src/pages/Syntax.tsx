import React from 'react';
import {
	IonPage,
	IonContent,
	IonList,
	IonItem,
	IonGrid,
	IonRow,
	IonCol
} from '@ionic/react';
//import { CustomStorageSyntax } from '../components/PersistentInfo';
import {
	SyntaxHeader,
	HeaderItem,
	InfoModal,
	RadioBox,
	RangeItem,
	TextItem
} from './ms/Header';

const Syntax = (props: any) => {
	return (
		<IonPage>
			<SyntaxHeader title="01" />
			<IonContent fullscreen className="evenBackground disappearingHeaderKludgeFix" id="syntaxSketchPage">
				<IonList lines="none">

					<HeaderItem className="h h1">1. Morphological Typology</HeaderItem>

						<HeaderItem className="h h2 l2">1.1. Traditional Typology</HeaderItem>

							<InfoModal className="l3" title="Synthesis and Fusion" label="Synthesis and Fusion">
								<ul>
									<li><strong>Synthesis</strong>: How many <em>morphemes</em> (the most basic unit of meaning) appear in a word?
										<ul>
											<li>Chinese is very <em>isolating</em>, tending towards one morpheme per word.</li>
											<li>Inuit and Quechua are very <em>polysynthetic</em>, with many morphemes per word.</li>
										</ul>
									</li>
									<li className="newSection"><strong>Fusion</strong>: How many meanings does a morpheme encode?
										<ul>
											<li>Spanish can be very <em>fusional</em>, with a single suffix capable of encoding tense, aspect, mood and number.</li>
											<li>English can be very <em>agglutinative</em>, with one meaning per morpheme (e.g. anti-dis-establish-ment-ari-an-ism), though fusional forms are possible (e.g. swam, was).</li>
											<li>NOTE: This section is not needed if the language is completely isolating.</li>
										</ul>
									</li>
								</ul>
							</InfoModal>
							<HeaderItem className="h h3 l3 content">Synthesis</HeaderItem>

								<RangeItem className="l4" text="synthesis" start="Isolating" end="Polysynthetic" innerClass="spectrum" max={10} />

							<HeaderItem className="h h3 l3 content">Fusion</HeaderItem>

								<RangeItem className="l4" text="fusion" start="Fusional" end="Agglutinative" innerClass="spectrum" max={10} />

							<TextItem className="l3" text="tradTypol">Give examples of the dominant pattern and any secondary patterns.</TextItem>

						<HeaderItem className="h h2 l2">1.2. Morphological Processes</HeaderItem>

							<InfoModal className="l3" title="Affixes and Other Modifications" label="What Are They?">
								<ul>
									<li><strong>Affixes</strong>:
										<ul>
											<li>Most natural languages use suffixes. Some also have prefixes and/or infixes or circumfixes. Few only have prefixes, and none have only infixes or circumfixes.</li>
											<li>NOTE: this section is not needed if the language is not agglutinative at all.</li>
										</ul>
									</li>
									<li className="newSection"><strong>Stem Modification</strong>:
										<ul><li>e.g. swim/swam/swum.</li></ul>
									</li>
									<li className="newSection"><strong>Suppletion</strong>:
										<ul><li>An entirely new stem is substituted for the root, e.g. "be" being replaced by is/am/are/was/were.</li></ul>
									</li>
									<li className="newSection"><strong>Reduplication</strong>:
										<ul>
											<li>Part or all of a word is duplicated.</li>
											<li>Often used for plurality.</li>
										</ul>
									</li>
									<li className="newSection"><strong>Suprasegmental Modification</strong>:
										<ul>
											<li>e.g. "permit" has different stress when a noun and a verb.</li>
											<li>Tone changes also fall under this category.</li>
										</ul>
									</li>
								</ul>
							</InfoModal>

							<HeaderItem className="h h3 l3 content">Affixes</HeaderItem>

								<IonItem className="l4 content">
									<IonGrid className="cols3">
										<IonRow className="header">
											<IonCol className="cbox">Used Most</IonCol>
											<IonCol className="cbox">Used Less</IonCol>
											<IonCol>Affix</IonCol>
										</IonRow>
										<IonRow>
											<IonCol className="cbox"><RadioBox prop="prefixMost" /></IonCol>
											<IonCol className="cbox"><RadioBox prop="prefixLess" /></IonCol>
											<IonCol>Prefix</IonCol>
										</IonRow>
										<IonRow>
											<IonCol className="cbox"><RadioBox prop="suffixMost" /></IonCol>
											<IonCol className="cbox"><RadioBox prop="suffixLess" /></IonCol>
											<IonCol>Suffix</IonCol>
										</IonRow>
										<IonRow>
											<IonCol className="cbox"><RadioBox prop="circumfixMost" /></IonCol>
											<IonCol className="cbox"><RadioBox prop="circumfixLess" /></IonCol>
											<IonCol>Circumfix</IonCol>
										</IonRow>
										<IonRow>
											<IonCol className="cbox"><RadioBox prop="infixMost" /></IonCol>
											<IonCol className="cbox"><RadioBox prop="infixLess" /></IonCol>
											<IonCol>Infix</IonCol>
										</IonRow>
									</IonGrid>
								</IonItem>

							<HeaderItem className="h h3 l3 content">Stem Modification</HeaderItem>

								<RangeItem className="l4" text="stemMod" start="Not Used" end="Used Often" />

							<HeaderItem className="h h3 l3 content">Suppletion</HeaderItem>

								<RangeItem className="l4" text="suppletion" start="Not Used" end="Used Often" />

							<HeaderItem className="h h3 l3 content">Reduplication</HeaderItem>

								<RangeItem className="l4" text="redupe" start="Not Used" end="Used Often" />

							<HeaderItem className="h h3 l3 content">Suprasegmental Modification</HeaderItem>

								<RangeItem className="l4" text="supraMod" start="Not Used" end="Used Often" />

							<TextItem className="l4" text="morphProcess" rows={6}>What sort of morphological processes are used? Illustrate the major and secondary pratterns.</TextItem>

						<HeaderItem className="h h2 l2">1.3. Head/Dependant Marking</HeaderItem>

							<RangeItem className="l3" text="headDepMarked" start="Head Marked" end="Dependant Marked" innerClass="spectrum" max={4} />
							<InfoModal className="l3" title="Head/Dependant Marking">
								<ul>
									<li>English is predominantly dependant-marked ("the queen's crown").</li>
									<li>Most languages are head-marked (*"the queen crown's").</li>
									<li>Some are mixed, but stay in one pattern for a certain class of phrases (noun, verb, adposition).</li>
								</ul>
							</InfoModal>
							<TextItem className="l3" text="headDepMark">Write any more specific notes here.</TextItem>

					<HeaderItem className="h h1">2. Grammatical Categories</HeaderItem>

						<HeaderItem className="h h2 l2">2.1. Nouns (the most time-stable concepts)</HeaderItem>

							<HeaderItem className="h h3 l3">2.1.1. Types of Nouns</HeaderItem>

								<HeaderItem className="h l4 content">2.1.1.1. Proper Names</HeaderItem>

									<InfoModal className="l5" title="Proper Names">
										<ul>
											<li>In English, they do not easily take articles, quantifiers and other modifiers.</li>
											<li>Other languages may have special case markers (4.4) for them.</li>
										</ul>
									</InfoModal>
									<TextItem className="l5" text="propNames">Are there any special rules involving proper names?</TextItem>

								<HeaderItem className="h l4 content">2.1.1.2. Possessability</HeaderItem>

									<InfoModal className="l5" title="Possessability" label="Systems of Possession">
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
									<TextItem className="l5" text="possessable" rows={4}>Describe how the language handles possession.</TextItem>

								<HeaderItem className="h l4 content">2.1.1.3. Count vs Mass</HeaderItem>

									<InfoModal className="l5" title="Count Nouns and Mass Nouns">
										<ul>
											<li>Typically, most nouns are countable, while fewer are considered as a mass.</li>
											<li>e.g. "sand" requires "a grain of sand" to be countable, and "confetti" requires "a piece of confetti".</li>
										</ul>
									</InfoModal>
									<TextItem className="l5" text="countMass">Write any specific notes about count/mass noun distinctions here.</TextItem>

							<HeaderItem className="h h3 l3">2.1.2. Pronouns and Anaphoric Clitics</HeaderItem>

								<InfoModal className="l4 following leading" label="What Are They?" title="Pronouns and Anaphoric Clitics">
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
								<TextItem className="l4 following" text="pronounAnaphClitic" rows={4}>Which system(s) are used by the language?</TextItem>

						<HeaderItem className="h h2 l2">2.2. Verbs (the least time-stable concepts)</HeaderItem>

							<HeaderItem className="h h3 l3">2.2.1. Semantic Roles</HeaderItem>

								<InfoModal className="l4" title="Semantic Roles" label="What Are They?">
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
								<TextItem className="l4" text="semanticRole" rows={6}>Describe which semantic roles are important.</TextItem>

							<HeaderItem className="h h3 l3">2.2.2. Verb Classes</HeaderItem>

								<IonItem className="l4 content">
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

								<TextItem className="l4" text="verbClass" rows={8}>Describe which verb classes exist as distinct categories in the language and how they are realized.</TextItem>

							<HeaderItem className="h h3 l3">2.2.3. Verb Structure</HeaderItem>

								<InfoModal className="l4" title="Verb Structure" label="Structure and Operations Info">
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
								<TextItem className="l4" text="verbStructure" rows={8}>Describe the verb structure here.</TextItem>

						<HeaderItem className="h h2 l2">2.3. Modifiers</HeaderItem>

							<HeaderItem className="h h3 l3 content">2.3.1. Property Concepts (Descriptive Adjectives)</HeaderItem>

								<IonItem className="l4 content">
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
								<InfoModal className="l4" title="Property Concepts">
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
								<TextItem className="l4" text="propClass">Which way does the language handle PCs? Do they agree with their head?</TextItem>

							<HeaderItem className="h h3 l3 content">2.3.2. Non-Numeral Quantifiers (e.g. few, many, some)</HeaderItem>

								<TextItem className="l4" text="quantifier">Which quantifiers exist?</TextItem>

							<HeaderItem className="h h3 l3 content">2.3.3. Numerals</HeaderItem>

								<InfoModal className="l4" title="Numerals" label="Things to Consider">
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
								<TextItem className="l4" text="numeral" rows={6}>Describe the language's numeral system.</TextItem>

						<HeaderItem className="h h2 l2">2.4. Adverbs (a "catch-all" category)</HeaderItem>

							<InfoModal className="l3" title="Adverbs">
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
							<TextItem className="l3" text="adverb" rows={4}>How are adverbs (or adverb-like phrases) handled?</TextItem>

					<HeaderItem className="h h1">3. Constituent Order Typology</HeaderItem>

						<HeaderItem className="h h2 l2">3.1. In Main Clauses</HeaderItem>

							<IonItem className="l3 content">
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
							<InfoModal className="l3" title="Basic Typology" label="What is this?">
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
							<TextItem className="l3" text="mainClause">Write any more specific notes here.</TextItem>

						<HeaderItem className="h h2 l2">3.2. Verb Phrases</HeaderItem>

							<TextItem className="l3" text="verbPhrase" rows={4}>Where do auxilliary verbs (semantically empty, e.g. to be/to have) appear in relation to the main verb? Where do adverbs fit in relation to the verb and auxilliaries?</TextItem>

						<HeaderItem className="h h2 l2">3.3. Noun Phrases</HeaderItem>

							<TextItem className="l3" text="nounPhrase" rows={4}>What is the order of the determiners (4.5), numerals (2.3.3), genitives (possessors), modifiers (2.3.1), relative clauses***, classifiers***, and the head noun?</TextItem>

						<HeaderItem className="h h2 l2">3.4. Adpositional Phrases</HeaderItem>

							<IonItem className="l3 content">
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
							<InfoModal className="l3" title="Adpositions">
								<ul>
									<li>Many derive from verbs, especially serial verbs***.</li>
									<li>Others derive from nouns, especially body parts (top, back, face, head, etc).</li>
									<li>Adpositional phrases may appear the same as possessed noun phrases (in front of vs. on his face) or regular nouns (top vs. on top of).</li>
								</ul>
							</InfoModal>
							<TextItem className="l3" text="adPhrase" rows={4}>Is the language dominantly prepositional or postpositional? Do many adpositions come from nouns or verbs?</TextItem>


						<HeaderItem className="h h2 l2">3.5 Comparatives</HeaderItem>

							<InfoModal className="l3" title="Comparatives" label="How do they work?">
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
							<TextItem className="l3" text="compare">Does the language have one or more comparitive constructions? If so, what is the order of the standard, the marker, and the quality being compared?</TextItem>


						<HeaderItem className="h h2 l2">3.6 Question Particles and Words</HeaderItem>

							<InfoModal className="l3" title="Questions">
								<ul>
									<li>In many languages, yes/no questions are indicated by a change in intonation. In others, a question particle is used; e.g. <em>do</em> you understand?</li>
									<li>Informal questions may require a specific question word.</li>
								</ul>
							</InfoModal>
							<TextItem className="l3" text="questions">How are questions handled in the language? In informational questions, where does the question word occur?</TextItem>


						<HeaderItem className="h h2 l2 content">3.7 Summary</HeaderItem>

							<TextItem className="l3" text="COType">When it comes to Agent/Patient/Verb order, is the language very consistent, fairly consistent, or very inconsistent? Note consistency and any deviations not already covered.</TextItem>


					<HeaderItem className="h h1">4. Noun and Noun Phrase Operations</HeaderItem>

						<HeaderItem className="h h2 l2">4.1. Compounding</HeaderItem>

							<InfoModal className="l3" title="Compounding">
								<ul>
									<li>When two nouns are combined into one, several changes may occur.
										<ul>
											<li>Stress pattern change, e.g. "<em>black</em>bird" vs "black <em>bird</em>".</li>
											<li>Unusual word order, e.g. "housekeeper" vs "keeper of the house".</li>
											<li>Morphology specific to compounds, e.g. "can-opener" does not imply the existence of a verb "to can-open".</li>
											<li>A resulting meaning that is either more specific than its components (e.g. "windshield" vs. "wind" or "shield") or altogether different (e.g. "heaven-breath" means "weather" in Mandarin).</li>
										</ul>
									</li>
								</ul>
							</InfoModal>
							<TextItem className="l3" text="compounding" rows={4}>Describe the sorts of compounding that happen in the language (if any).</TextItem>

						<HeaderItem className="h h2 l2">4.2. Denominalization</HeaderItem>

							<InfoModal className="l3" title="Denominalization">
								<ul>
									<li>Some languages have many ways of changing a noun into a non-noun.
										<ul>
											<li>English can append <em>-like</em> to make an adjective.</li>
											<li>Eskimo has many verbalizing forms, e.g. to be X, to go towards X, to play with X, to hunt X.</li>
										</ul>
									</li>
								</ul>
							</InfoModal>
							<TextItem className="l3" text="denoms" rows={4}>Are there any processes to make a verb from a noun? An adjecive? An adverb?</TextItem>

						<HeaderItem className="h h2 l2">4.3. Number Marking</HeaderItem>

							<InfoModal className="l3" title="Number Marking">
								<ul>
									<li>Some languages only mark number occassionally or optionally depending on the type of noun.</li>
									<li>This is often intertwined with other markers, such as case marking in Romance languages.</li>
									<li>Most languages leave the singular unmarked, but not all!</li>
									<li>Number marking may be as simple as singular/plural (more than one), or incorporate dual (two), trial (three), paucal (small amount), and/or plural (larger amounts).</li>
								</ul>
							</InfoModal>
							<TextItem className="l3" text="nNumber" rows={3}>Is number expressed in the noun phrase? Is the distinction between singular and non-singular obligatory, optional or absent? What non-singular distinctions are there?</TextItem>
							<TextItem className="l3" text="nNumberOpt" rows={4}>If number-marking is optional, when does it tend to occur? When does it not tend to occur?</TextItem>
							<TextItem className="l3" text="nNumberObl" rows={4}>If number-marking is obligatory, is number marking overtly expressed for all noun phrases, or only some subclasses (e.g. animates)?</TextItem>

						<HeaderItem className="h h2 l2">4.4. Case Marking</HeaderItem>

							<InfoModal className="l3" title="Case Marking" label="How it works">
								<ul>
									<li>Case markings can describe the role a noun plays in a sentence.</li>
									<li>In English, most case markings only survive in the pronouns, with word order doing the job for regular nouns. The major exception is the genitive case (possessive), which is marked with <em>'s</em>.</li>
									<li>Some cases, and the semantic role (2.2.1) they usually indicate, include:
										<ul>
											<li>nominative/ergative (Agent, see section 6)</li>
											<li>accusative/absolutive (Patient, see section 6)</li>
											<li>dative (Recipient)</li>
											<li>genitive (Possessor)</li>
										</ul>
									</li>
									<li>In Latin, if a Patient occurs in some other case, either the sentence is ungrammatical or another sense of the verb results.</li>
									<li>In some languages, verbs and/or adpositions <em>govern</em> their arguments, requiring a specific case marker on their nouns. This allows similar-sounding verbs to be discerned by these case markers. For example, in Yagua:
										<ul>
											<li>sa-dííy nurutú-0 (he-kill alligator-ACCUSATIVE)</li>
											<li>sa-dííy nurutí-íva (he-see alligator-DATIVE)</li>
										</ul>
									</li>
								</ul>
							</InfoModal>
							<TextItem className="l3" text="case" rows={4}>Do nouns exhibit morphological case? If so, what cases exist?</TextItem>

						<HeaderItem className="h h2 l2">4.5. Articles and Demonstratives</HeaderItem>

							<InfoModal className="l3" title="Articles" label="Articles Info">
								<ul>
									<li>English is relatively rare in having articles: a, an, the. More often, languages have a broader class of demonstratives.</li>
								</ul>
							</InfoModal>
							<TextItem className="l3" text="articles" rows={6}>If articles exist, are they obligatory or optional? When do they occur? Are they separate words or bound morphemes?</TextItem>
							<InfoModal className="l3" title="Determiners" label="Determiners Info">
								<ul>
									<li>Demonstratives are words that distinguish or identify a noun without modifying it, such as this, that, these and those.</li>
									<li>They tend to encode distance ("this" is closer to you than "that"; Spanish has a third level of distance, too).</li>
								</ul>
							</InfoModal>
							<TextItem className="l3" text="demonstratives" rows={6}>How many levels of distance do determiners encode? Are there other distinctions besides distance?</TextItem>

						<HeaderItem className="h h2 l2">4.6. Possessors</HeaderItem>

							<InfoModal className="l3" title="Possessors" label="Possessor Info">
								<ul>
									<li>Refer back to 2.1.1.2 to note your system of possession. This does <strong>not</strong> refer to possessive clauses! (5.4)</li>
									<li className="newSection">How are possessors expressed in the noun phrase?</li>
									<li>Do nouns agree with their possessors? Vice versa?</li>
								</ul>
							</InfoModal>
							<TextItem className="l3" text="possessors" rows={3}>Describe how possession works in a noun phrase.</TextItem>

						<HeaderItem className="h h2 l2">4.7. Class (Gender)</HeaderItem>

							<InfoModal className="l3" title="Class and Gender" label="Class and Gender Info">
								<ul>
									<li>Class system often require classifiers (special operators) to declare class.</li>
									<li>Pure gender systems use "agreement" instead of classifiers. At the very least, numerical expressions will "agree" with their head noun.</li>
									<li>Classes generally care about one dimension of reality, such as biological gender, animacy, shape, or function. (Other dimensions may be relevant, too.) There are almost always exceptions to the rule, however (e.g. Yagua treats rocks and pineapples as animates).</li>
									<li>Classifiers may occur with verbs, numerals and adjectives, though they may serve a different function in those cases.</li>
								</ul>
							</InfoModal>
							<TextItem className="l3" text="classGender" rows={8}>Describe the language's class/gender system, if it has one. What classes/genders exist and how do they manifest? What dimension(s) of reality is central to the class system? How do they interact with numerals, verbs and adjectives?</TextItem>

						<HeaderItem className="h h2 l2">4.8. Diminution/Augmentation</HeaderItem>

							<InfoModal className="l3" title="Diminution and Augmentation">
								<ul>
									<li>If diminution (making smaller) and/or augmentation (making bigger) is used in the language, answer the following questions:
										<ul>
											<li>Is it obligatory? Does one member have to occur in every full noun phrase?</li>
											<li>Is it productive? Does it work with all full noun phrases and does it have the same meaning for each?</li>
											<li>Is it expressed lexically, morphologically, or analytically?</li>
											<li>Where in the NP is this operation likely to be located? Can it occur in more than one place?</li>
										</ul>
									</li>
								</ul>
							</InfoModal>
							<IonItem className="l3 content">
								<IonGrid>
									<IonRow>
										<IonCol className="cbox"><RadioBox prop="dimAugYes" /></IonCol>
										<IonCol>Dim/Aug System Exists</IonCol>
									</IonRow>
									<IonRow>
										<IonCol className="cbox"><RadioBox prop="dimAugObligatory" /></IonCol>
										<IonCol>...and is Obligatory</IonCol>
									</IonRow>
									<IonRow>
										<IonCol className="cbox"><RadioBox prop="dimAugProductive" /></IonCol>
										<IonCol>...and is Productive</IonCol>
									</IonRow>
								</IonGrid>
							</IonItem>
							<TextItem className="l3" text="dimAug" rows={8}>Describe the language's relation to diminution and augmentation.</TextItem>

					<HeaderItem className="h h1">5. Predicate Nominals and Related Constructions</HeaderItem>

						<InfoModal className="l2" title="Predicate Nominals" label="General Information to Consider">
							<ul>
								<li>These forms generally encode the following information:
									<ul>
										<li><strong>Equation</strong>: X is Y</li>
										<li><strong>Proper Inclusion</strong>: X is a Y</li>
										<li><strong>Location</strong>: X is located Y</li>
										<li><strong>Attribution</strong>: X is made Y</li>
										<li><strong>Existence</strong>: X exists in Y</li>
										<li><strong>Possession</strong>: X has Y</li>
									</ul>
								</li>
								<li>The forms at the top of the list are much more likely to lack a semantically rich verb, while those at the bottom are less likely to.</li>
							</ul>
						</InfoModal>

						<HeaderItem className="h h2 l2">5.1. Predicate Nominals and Adjecives</HeaderItem>

							<InfoModal className="l3" title="Predicate Nominals and Adjecives">
								<ul>
									<li>May encode <em>proper inclusion</em> (X is a Y) and <em>equation</em> (X is Y)</li>
									<li>Predicate adjectives are usually handled the same as predicate nominals, though they will sometimes use a different copula than the nouns.</li>
									<li>If they use a verb, it will not be a very <em>semantically rich</em> verb (e.g. to be, to do)</li>
									<li>Will generally use one of the following strategies:
										<ul>
											<li><em>Juxtaposition</em>
												<ul>
													<li>Two nouns (or a noun and adjective) are placed next to each other.</li>
													<li>Ex: Steve doctor. Mouse small. (Steve is a doctor. A mouse is small.)</li>
												</ul>
											</li>
											<li><em>Joined by copula</em>
												<ul>
													<li>A <em>copula</em> is a morpheme that "couples" two elements. Often encodes tense/aspect, and can be restricted to certain situations (e.g. only in non-present tenses).</li>
													<li>The copula can take different forms:
														<ul>
															<li><em>Verb</em>
																<ul>
																	<li>These tend to be very irregular verbs.</li>
																	<li>They tend to belong to the same verb class as stative verbs.</li>
																	<li>They tend to function as auxilliaries in other constructions.</li>
																	<li>Ex: Steve is a doctor.</li>
																</ul>
															</li>
															<li><em>Pronoun</em>
																<ul>
																	<li>The pronoun corresponds to the subject.</li>
																	<li>Ex: Steve, he a doctor.</li>
																</ul>
															</li>
															<li><em>Invariant particle</em>
																<ul>
																	<li>This particle may derive from a verb or pronoun.</li>
																	<li>The particle will not encode tense/aspect/gender/anything.</li>
																	<li>Ex: Steve blorp doctor.</li>
																</ul>
															</li>
															<li><em>Derivational operation</em>
																<ul>
																	<li>Predicate noun becomes a verb.</li>
																	<li>Ex: Steve doctor-being.</li>
																</ul>
															</li>
														</ul>
													</li>
												</ul>
											</li>
										</ul>
									</li>
								</ul>
							</InfoModal>
							<TextItem className="l3" text="predNom" rows={6}>Describe the language's strategy for predicate nominals and adjectives.</TextItem>

						<HeaderItem className="h h2 l2">5.2. Predicate Locatives</HeaderItem>

							<InfoModal className="l3" title="Predicate Locatives">
								<ul>
									<li>Many languages use a word that gets translated as "be at".</li>
									<li>The locative word is often the same as a locative adposition.</li>
									<li>Word order usually distinguishes possessive clauses from locational clauses.
										<ul>
											<li>Ex: Steve has a cat; the cat is behind Steve.</li>
										</ul>
									</li>
									<li className="newSection">English bases locatives on possessive clauses, but with an inanimate possessor.</li>
									<li>Russian bases possessive clauses on locatives, but with an animate possessor.</li>
								</ul>
							</InfoModal>
							<TextItem className="l3" text="predLoc" rows={6}>How does the language handle predicate locatives?</TextItem>

						<HeaderItem className="h h2 l2">5.3. Existentials</HeaderItem>

							<InfoModal className="l3" title="Existentials">
								<ul>
									<li>These constructions usually serve a presentative function, introducing new participants.</li>
									<li>Usually, the nominal is indefinite: "There are lions in Africa" vs. "There are the lions in Africa".</li>
									<li>There is usually little to no case marking, verb agreement, etc.</li>
									<li>They often share features of predicate nominals (copula), but some languages prohibit such forms.</li>
									<li>They often have special negation stategies (e.g. a verb meaning 'to lack': "Under the bed lacks a cat").</li>
									<li>They often play a role in:
										<ul>
											<li>"Impersonal" or "circumstantial" constructions.
												<ul><li>e.g. There will be dancing in the streets!</li></ul>
											</li>
											<li>Situations that lack the need for any specific actor, or to downplay the significance of an actor.
												<ul><li>e.g. Someone is crying.</li></ul>
											</li>
										</ul>
									</li>
								</ul>
							</InfoModal>
							<TextItem className="l3" text="predEx" rows={6}>How are existential clauses formed? Does this vary according to tense, aspect or mood? Is there a special negation strategy? Is this form used to impart other information (such as possessives) as well?</TextItem>

						<HeaderItem className="h h2 l2">5.4. Possessive Clauses</HeaderItem>

							<InfoModal className="l3" title="Possessive Clauses">
								<ul>
									<li>Verb strategy: "I have a book."</li>
									<li>Copula strategy: "The book is at me."</li>
								</ul>
							</InfoModal>
							<TextItem className="l3" text="predEx" rows={3}>Does the language use a verb or copula strategy?</TextItem>

					<HeaderItem className="h h1">6. Grammatical Relations</HeaderItem>

						<InfoModal className="l2" title="Alignments" label="Show the Alignments">
							<ul>
								<li><strong>Nominative/Accusative Alignment</strong>:
									<ul>
										<li>(S)ubjects and (A)gents are treated the same, in the nominative case.
											<ul>
												<li><em>I</em> fell.</li>
												<li><em>I</em> pushed him.</li>
											</ul>
										</li>
										<li>(P)atients are given the accusative case.
											<ul>
												<li>I pushed <em>him</em>.</li>
											</ul>
										</li>
										<li>S and A are both viewed as agents, having volition</li>
										<li>A tends to stick with the (V)erb, leaving the P floating:
											<ul>
												<li>AVP; PAV; VAP; PVA</li>
											</ul>
										</li>
									</ul>
								</li>
								<li className="newSection"><strong>Ergative/Absolutive Alignment</strong>:
									<ul>
										<li>(S)ubjects and (P)atients are treated the same, in the ergative case.
											<ul>
												<li><em>I</em> fell.</li>
												<li>Me pushed <em>he</em>.</li>
											</ul>
										</li>
										<li>(A)gents are given the absolutive case.
											<ul>
												<li><em>Me</em> pushed he.</li>
											</ul>
										</li>
										<li>S and P are both viewed as typically being new information, or undergoing change.</li>
										<li>P tends to stick with the (V)erb, leaving the A floating:
											<ul>
												<li>AVP; VPA; APV; PVA</li>
											</ul>
										</li>
										<li className="newSection"><strong>Split Ergativity</strong>:
											<ul>
												<li>In natural languages, ergativity tends to coexist in a hierarchy, with the nominative/accusative system used for the higher level. Typical hierarchies:
													<ul>
														<li>1st person &gt; 2nd person &gt; 3rd person &gt; humans &gt; animates &gt; inanimates</li>
														<li>agreement &gt; pronouns/case marking</li>
														<li>definite &gt; indefinite</li>
														<li>non-past tense &gt; past tense</li>
														<li>imperfect aspect &gt; perfect aspect</li>
													</ul>
												</li>
												<li className="splitErgativity hide">The split in the hierarchy can happen at any point. e.g.
													<ul>
														<li>Dyirbal uses n/a for 1st/2nd person, e/a for everything else (this is a very common split point)</li>
														<li>Cashinawa uses n/a for 1/2, separate marking for A and P in 3rd person, and e/a for everything else</li>
														<li>Managalasi uses e/a for pronouns, n/a for person marking on verbs</li>
													</ul>
												</li>
											</ul>
										</li>
									</ul>
								</li>
							</ul>
						</InfoModal>

						<TextItem className="l2" text="ergative" rows={8}>Does the language use a nominative/accusative alignment, or an ergative/absolutive alignment? Are there any exceptions?</TextItem>

					<HeaderItem className="h h1">7. Voice and Valence Adjusting Operations</HeaderItem>

						<InfoModal className="l2" title="Valence" label="What is Valence?">
							<ul>
								<li><strong>Valence</strong> refers to the amount of arguments in a clause.
									<ul>
										<li>"I fell" has a valence of 1.</li>
										<li>"I pushed Steve" has a valence of 2.</li>
										<li>"I gave Steve a coconut" has a valence of 3.</li>
										<li>"I gave a coconut to Steve" has a valence of 2.
											<ul>
												<li>"To Steve" is in an oblique case, forming a verb modifier instead of being an argument of the verb.</li>
											</ul>
										</li>
									</ul>
								</li>
							</ul>
						</InfoModal>
						<HeaderItem className="h h2 l2">7.1. Valence-Increasing Operations</HeaderItem>

							<HeaderItem className="h l3">7.1.1. Causatives</HeaderItem>

								<InfoModal className="l4" title="Causatives">
									<ul>
										<li><strong>Lexical</strong>:
											<ul>
												<li>Most languages have at least some form of this. There are three major methods employed:
													<ul>
														<li>No change in the verb:
															<ul>
																<li>"The vase broke" becomes "Steve broke the vase".</li>
															</ul>
														</li>
														<li>Some idiosyncratic change the verb:
															<ul>
																<li>"The tree fell" becomes "Steve felled the tree".</li>
															</ul>
														</li>
														<li>Different verb:
															<ul>
																<li>"The tree died" becomes "Steve killed the tree".</li>
															</ul>
														</li>
													</ul>
												</li>
											</ul>
										</li>
										<li><strong>Morphological</strong>:
											<ul>
												<li>The verb change applies to all verbs (not just one, like <em>fell</em> vs <em>felled</em>).</li>
												<li>Often expresses causation and permission.</li>
												<li>May be restricted to only intransitive verbs.</li>
												<li>In transitive verbs, the causee often goes into a different case.</li>
											</ul>
										</li>
										<li><strong>Analytical</strong>:
											<ul>
												<li>A separate causative verb is used. This usually isn't valence-increasing!
													<ul>
														<li>"Steve caused the tree to die".</li>
														<li>"Steve forced the stick into the ground."</li>
													</ul>
												</li>
											</ul>
										</li>
										<li className="newSection"><strong>Coding Principles</strong>:
											<ul>
												<li><strong>Structural Distance</strong>
													<ul>
														<li>If the language has more than one formal type of causative, the "smaller" one will be used for more direct causation, while the "larger" one will be used for less direct causation. Longer linguistic distance correlates to greater conceptual distance.
															<ul>
																<li>"George killed Joe" is more direct than "George caused Joe to die".</li>
																<li>Amharic has an <em>a-</em> prefix for direct causation, <em>as-</em> for indirect.</li>
															</ul>
														</li>
														<li>Analytic causatives often "require" an animate causee.
															<ul>
																<li>Japanese has a morphological causative when the causee has some control over the event, but requires a lexical causative for inanimate causees.
																	<ul>
																		<li>Consider "Joe made George come down" vs "Joe brought the golf clubs down".</li>
																	</ul>
																</li>
															</ul>
														</li>
													</ul>
												</li>
												<li><strong>Finite vs. Non-Finite Verbs</strong>
													<ul>
														<li>The more distant the cause from the effect in space or time, the more finite the verb will be.
															<ul>
																<li>Ex: <em>"Jorge <strong>hizo comer</strong> pan a Josef"</em> indicates Jorge forced Josef to eat bread directly, while <em>"Jorge <strong>hizo</strong> que Josef <strong>comiera</strong> pan"</em> indicates he forced Josef indirectly, maybe by removing all other food.</li>
															</ul>
														</li>
													</ul>
												</li>
												<li><strong>Case</strong>
													<ul>
														<li>If the causee retains a high degree of control, it will appear in a case associated with Agents, but with little control, will appear in a Patient case.
															<ul>
																<li>Ex: "Steve asked that <em>he</em> leave" gives Steve more control than "Steve asked <em>him</em> to leave".</li>
															</ul>
														</li>
													</ul>
												</li>
											</ul>
										</li>
									</ul>
								</InfoModal>
								<TextItem className="l4" text="causation" rows={4}>Describe which method(s) the language uses to create causatives.</TextItem>

							<HeaderItem className="h l3">7.1.2. Applicatives</HeaderItem>

								<InfoModal className="l4" title="Applicatives">
									<ul>
										<li>The verb is marked for the role of a direct object, bringing a peripheral participant (the applied object) on stage in a more central role.
											<ul>
												<li>This may turn a transitive verb ditransitive, or it may replace the direct object entirely (which technically isn't valence-increasing!)<br />
													<span><br />"I arrived at Shionti's" in Nomatsiguenga.</span>
													<table>
														<tr>
															<td>n-areeka</td>
															<td>Sionti-ke</td>
														</tr>
														<tr>
															<td>I-arrive</td>
															<td>Shionti-LOC (valence: 1)</td>
														</tr>
														<tr>
															<td>n-areeka-ri</td>
															<td>Sionti</td>
														</tr>
														<tr>
															<td>I-arrive-him</td>
															<td>Shionti (valence: 2)</td>
														</tr>
													</table>
												</li>
											</ul>
										</li>
									</ul>
								</InfoModal>
								<TextItem className="l4" text="applicatives" rows={4}>Describe which method(s) the language uses for applicatives, if any.</TextItem>

							<HeaderItem className="h l3">7.1.3. Dative Shift</HeaderItem>

								<InfoModal className="l4" title="Dative Shift">
									<ul>
										<li>This only applies to verbs that take an Agent, a Patient and a Recipient or Experiencer. This latter argument is usually put in the <em>dative</em> case.</li>
										<li>Applicatives mark the verb, while a Dative Shift does not.</li>
										<li>Applicatives usually promote Instrumentals, while Dative Shifts usually promote Recipients and Benefactives.</li>
										<li>Example:
											<ul>
												<li>"Steve gave the ball to Linda." Valence: 2</li>
												<li>"Steve gave Linda the ball." Valence: 3, recipient promoted.</li>
											</ul>
										</li>
									</ul>
								</InfoModal>
								<TextItem className="l4" text="dativeShifts" rows={4}>Is there a dative shift construction in the language? What is it? What semantic roles can be shifted? Is it obligatory?</TextItem>

							<HeaderItem className="h l3">7.1.4. Dative of Interest</HeaderItem>

								<InfoModal className="l4" title="Dative of Interest">
									<ul>
										<li>This is adding a participant that is associated in some way.
											<ul>
												<li>"Dinner is burned [for me]" in Spanish<br />
													<table>
														<tr>
															<td>Se</td>
															<td>me</td>
															<td>quemó</td>
															<td>la</td>
															<td>cena.</td>
														</tr>
														<tr>
															<td>REFL</td>
															<td>1s</td>
															<td>burn.3s.PST</td>
															<td>DEF.F.s</td>
															<td>dinner</td>
														</tr>
													</table>
												</li>
												<li>"She cut the hair [on him]" in Spanish.<br />
													<table>
														<tr>
															<td>Le</td>
															<td>cortó</td>
															<td>el</td>
															<td>pelo</td>
														</tr>
														<tr>
															<td>3DAT</td>
															<td>cut.3s.PST</td>
															<td>DEF.M.s</td>
															<td>hair</td>
														</tr>
													</table>
												</li>
											</ul>
										</li>
									</ul>
								</InfoModal>
								<TextItem className="l4" text="datOfInt" rows={4}>Is there a dative-of-interest operation?</TextItem>

							<HeaderItem className="h l3">7.1.5. Possessor Raising (a.k.a. External Possession)</HeaderItem>

								<InfoModal className="l4" title="Possessor Raising" label="What is This?">
									<ul>
										<li>In many languages, this exists separate from a dative of interest.
											<ul>
												<li>"I fixed the railroad track" in Choctaw.<br />
													<table>
														<tr>
															<td>Tali</td>
															<td>i-hina-ya</td>
															<td>ayska-li-tok</td>
														</tr>
														<tr>
															<td>rock</td>
															<td>AGR(III)-road-NS</td>
															<td>fix-1s-PST (normal construction)</td>
														</tr>
														<tr>
															<td>Tali-ya</td>
															<td>hina</td>
															<td>im-ayska-li-tok</td>
														</tr>
														<tr>
															<td>rock-NS</td>
															<td>road</td>
															<td>AGR(III)-fix-1s-PST (possessor raised)</td>
														</tr>
													</table>
												</li>
											</ul>
										</li>
									</ul>
								</InfoModal>
								<TextItem className="l4" text="possessRaising" rows={4}>Does possessor raising occur?</TextItem>

						<HeaderItem className="h h2 l2">7.2. Valence-Decreasing Operations</HeaderItem>

							<HeaderItem className="h h3 l3">7.2.1. Reflexives</HeaderItem>

								<InfoModal className="l4" title="Reflexives">
									<ul>
										<li>The Agent and Patient are the same, so one is omitted.</li>
										<li className="newSection">Lexical reflexives:
											<ul>
												<li>The verb itself implies reflexivity.
													<ul>
														<li>e.g.: Steve washed, shaved, and got dressed.</li>
													</ul>
												</li>
											</ul>
										</li>
										<li>Morpholigical reflexives:
											<ul>
												<li>A word (or words) is modified to indicate the reflexive.
													<ul>
														<li>e.g.: Spanish: Jorge se lavo. (George washed himself, "se lavo" being a morphing of the root verb "lavarse".)</li>
													</ul>
												</li>
											</ul>
										</li>
										<li>Analytic reflexives:
											<ul>
												<li>Inserting a lexical word, making a semantic valence-lowering (but not a lexical one).
													<ul>
														<li>e.g.: Steve washed himself.</li>
													</ul>
												</li>
												<li>These are often based on body parts.
													<ul>
														<li>e.g.: Another face in the crowd; Move your butt!</li>
													</ul>
												</li>
											</ul>
										</li>
									</ul>
								</InfoModal>
								<TextItem className="l4" text="refls" rows={4}>How are reflexives handled?</TextItem>

							<HeaderItem className="h h3 l3">7.2.2. Reciprocals</HeaderItem>

								<InfoModal className="l4" title="Reciprocals">
									<ul>
										<li>The Agent and Patient are performing the same action, or performing an action together. These are often expressed the same way as reflexives.</li>
										<li className="newSection">Lexical reciprocals:
											<ul>
												<li>The verb itself implies reciprocity.
													<ul>
														<li>e.g.: Steve and Jane shook hands [with each other].</li>
													</ul>
												</li>
											</ul>
										</li>
										<li>Morpholigical and lexical reciprocals follow the same patterns as those for reflexives.</li>
									</ul>
								</InfoModal>
								<TextItem className="l4" text="recips" rows={3}>How are reciprocals handled?</TextItem>

							<HeaderItem className="h h3 l3">7.2.3. Passives</HeaderItem>

								<InfoModal className="l4" title="Passives">
									<ul>
										<li>A semantically transitive verb with omitted Agent, the Patient treated as Subject, and the verb behaves as if it is intransitive. (The Agent is made less topical than the Patient.)</li>
										<li className="newSection">Personal passive: Agent is implied, or expressed obliquely.
											<ul>
												<li>Lexical passives are rare.</li>
												<li>Morphological passives are more common, often the same morphology as perfect aspect. May be derived from copulas or nominalizations.</li>
												<li>English has analytic passives, with a copula and a "past participle" (Patient nominalization).
													<ul>
														<li>e.g.: The tree has been killed.</li>
													</ul>
												</li>
											</ul>
										</li>
										<li className="newSection">Impersonal passive: no Agent directly indicated; can be used for intransitive verbs as well as transitive.
											<ul>
												<li>No known languages uses a specific morphology for this!</li>
											</ul>
										</li>
										<li className="newSection">Other kinds of passives may exist.
											<ul>
												<li>English has the basic "Steve was eaten by a bear" but can also express it with other verbs, as in "Steve got eaten by a bear."</li>
												<li>Yup'ik has an adversative passive (to the detriment of the subject), abilitative passive (X can be Y [by Z]), and a negative abilitiative (X cannot be Y [by Z]).</li>
											</ul>
										</li>
										<li className="newSection">Passives construction may be obligatory in a particular environment, e.g. when the Patient outranks the Agent.</li>
									</ul>
								</InfoModal>
								<TextItem className="l4" text="passives" rows={4}>How are passives handled?</TextItem>

							<HeaderItem className="h h3 l3">7.2.4. Inverses</HeaderItem>

								<InfoModal className="l4" title="Inverses">
									<ul>
										<li>This is a valence "rearranging" device, e.g. "Steve taught him" becomes "Him, Steve taught."</li>
										<li>Often follows a hierarchy where a "higher" Agent requires direct and a "lower" Agent requires the inverse.</li>
									</ul>
								</InfoModal>
								<IonItem className="l4 content">
									<IonGrid className="cols2">
										<IonRow>
											<IonCol className="cbox"><RadioBox prop="markInv" /></IonCol>
											<IonCol>Marked inverse only.</IonCol>
										</IonRow>
										<IonRow>
											<IonCol className="cbox"><RadioBox prop="markDirInv" /></IonCol>
											<IonCol>Both direct and inverse explicitly marked.</IonCol>
										</IonRow>
										<IonRow>
											<IonCol className="cbox"><RadioBox prop="verbAgreeInv" /></IonCol>
											<IonCol>Special verb agreement markers for inverse.</IonCol>
										</IonRow>
										<IonRow>
											<IonCol className="cbox"><RadioBox prop="verbAgreeInv" /></IonCol>
											<IonCol>Functional inverse: word order changes, e.g. VAP becomes VPA.</IonCol>
										</IonRow>
									</IonGrid>
								</IonItem>
								<TextItem className="l4" text="inverses" rows={4}>Describe any pecularities of inverse constructions.</TextItem>

							<HeaderItem className="h h3 l3">7.2.5. Middle Constructions</HeaderItem>

								<InfoModal className="l4" title="Middle Constructions" label="What Are These?">
									<ul>
										<li>Also known as anticausatives or detransitivation: a semantically transitive situation expressed as a process undergone by a Patient (rather than carried out by an Agent).</li>
										<li>Many languages express this the same way as they express passives.</li>
										<li>This often express the notion that the subject is both controller and affected.
											<ul><li>e.g. "Steve broke the car" becomes "The car broke" (and it was no fault of Steve's).</li></ul>
										</li>
									</ul>
								</InfoModal>
								<TextItem className="l4" text="middleCon" rows={3}>How are middle constructions handled?</TextItem>

							<HeaderItem className="h h3 l3">7.2.6. Antipassives</HeaderItem>

								<InfoModal className="l4" title="Antipassives" label="What Are These?">
									<ul>
										<li>Similar to passives, but the Patient is downgraded instead of the Agent.</li>
										<li>Generally, this only happens in ergative languages or in languages without verbal agreement, but many exceptions exist.</li>
										<li>Often, the Patient is omitted or oblique, the verb is marked intrasitive, and the Agent is placed in absolutive case.</li>
									</ul>
								</InfoModal>
								<TextItem className="l4" text="antiP" rows={3}>Describe antipassive strategies in the language, if they exist.</TextItem>

							<HeaderItem className="h h3 l3">7.2.7. Object Demotion/Omission/Incorporation</HeaderItem>

								<InfoModal className="l4" title="Object Demotion and Related Functions" label="What Are These?">
									<ul>
										<li><strong>Demotion</strong>: "Steve shot Bob" becomes "Steve shot at Bob".</li>
										<li className="newSection"><strong>Omission</strong>: "Steve shot Bob" becomes "Steve shot".</li>
										<li className="newSection"><strong>Incorporation</strong>: "Steve shot Bob" becomes "Steve Bob-shot".
											<ul>
												<li>The incorporated object is usually the Patient, rarely the Agent.</li>
												<li>May have other semantic functions.
													<ul>
														<li>In Panare, incorporating a body part noun into a cutting verb means the part was cut completely off ("Darth Vader hand-cut"), whereas leaving it unincorporated means it was merely injured ("Darth Vader cut hand").</li>
													</ul>
												</li>
											</ul>
										</li>
									</ul>
								</InfoModal>
								<TextItem className="l4" text="objDemOmInc" rows={5}>Is object demotion/omission allowed? How about incorporation?</TextItem>

					<HeaderItem className="h h1">8. Other Verb and Verb Phrase Operations</HeaderItem>

						<HeaderItem className="h h2 l2">8.1. Nominalization</HeaderItem>

							<InfoModal className="l3" title="Nominalization">
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
												<ul>
													<li><em>hézuò</em> (cooperate) + <em>de</em> → cooperation</li>
												</ul>
											</li>
										</ul>
									</li>
									<li className="newSection">Types of nominalization:
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
											<ul>
												<li>Typically refers to an Agent who is characteristic of the root verb (teach → a teacher), but some languages instead refer to someone engaged in the activity at the moment (teach → one who is presently teaching).</li>
											</ul>
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
													<ul>
														<li>employ → employee : this form comes from the French past participle!</li>
													</ul>
												</li>
											</ul>
										</li>
										<li><strong>Instrument</strong>:
											<ul>
												<li>Refers to the object used in the action.</li>
												<li>In English, this usually follows the same format as an Agent nominalization.</li>
												<li>In Spanish, compounding a verb with a plural object makes an instrument.
													<ul>
														<li>e.g. <em>abre</em> (open) + <em>latas</em> (cans) → <em>el abrelatas</em> (can-opener)</li>
													</ul>
												</li>
											</ul>
										</li>
										<li><strong>Location</strong>:
											<ul>
												<li>Many languages use this to refer generally to a place where the action tends to occur, e.g. work → workshop, burn → fireplace.</li>
											</ul>
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
									</li>
								</ul>
							</InfoModal>

							<TextItem className="l3" text="verbNoms" rows={8}>Describe the nominalizations that exist in the language, and explain how productive they are.</TextItem>

						<HeaderItem className="h h2 l2">8.2. Compounding</HeaderItem>

							<InfoModal className="l3" title="Compounding">
								<ul>
									<li><strong>Noun Incorporation</strong>: noun becomes attached to a verb (see 7.2.7).
										<ul>
											<li>The most common form is Patient incorporation (sell pigs → to pig-sell).</li>
										</ul>
									</li>
									<li className="newSection"><strong>Verb Incorporation</strong>: two verbs merge, one modifying the other.
										<ul>
											<li>Often, verbs of motion enter into these pairings (shout-rise → he shouts rising).</li>
											<li>Verbs that freely compound like this typically lose their verbal character and become derivational affixes.</li>
										</ul>
									</li>
								</ul>
							</InfoModal>

							<TextItem className="l3" text="verbComp" rows={6}>Describe any compounding strategies that exist in the language.</TextItem>

						<HeaderItem className="h h2 l2">8.3. Tense/Aspect/Mode</HeaderItem>

							<InfoModal className="l3" title="Tense, Aspect and Mode" label="General Info">
								<ul>
									<li><strong>TAM</strong> (Tense, Aspect, Mode) are sometimes hard to tease apart, and may only be considered separate because of how they are in western language.</li>
									<li>Some languages pay more attention to tense (English), aspect (Austronesian languages), or mode (Eskimo).
										<ul><li>Furthermore, some verb stems may not allow certain operations while favoring others.</li></ul>
									</li>
									<li>Many languages don't morphologically indicate one or more of these divisions. (When not indicated morphologically, the language will use lexical or analytical methods.)
										<ul>
											<li>Aspect: only 74% of languages use morphology</li>
											<li>Mode: only 68% of languages do</li>
											<li>Tense: barely 50% of languages do!</li>
										</ul>
									</li>
									<li className="newSection">Certain TAM morphemes may cluster together with greater-than-chance frequency, forming hypermorphemes.</li>
									<li className="newSection">TAM morphemes often interact significantly with case or number marking (nom/acc in one aspect, erg/abs in another; merging aspect with number).</li>
								</ul>
							</InfoModal>
							<HeaderItem className="h h3 l3 content">8.3.1 Tense</HeaderItem>

								<InfoModal className="l4" title="Tense" label="Info on Tense">
									<ul>
										<li><strong>Tense</strong> sets an action in time in relation to "now".</li>
										<li>Languages can divide time up into different sets of tenses:
											<ul>
												<li>Past/Present/Future</li>
												<li>Past/Nonpast</li>
												<li>Nonfuture/Future</li>
												<li>Not-Now/Now/Not-Now (two tenses!)</li>
												<li>Distant Past/A Year Ago/A Month Ago/A Week Ago/Today or Yesterday/Now/Soon/Future
													<ul><li>When human languages have divided past or future into multiple segments, there are never more future segments than past segments!</li></ul>
												</li>
											</ul>
										</li>
										<li className="newSection">Future tense markers often derive from "want", "come", or "go".
											<ul><li>These verbs may still function separately!
												<ul>
													<li>He come (present)</li>
													<li>He come go (will go)</li>
													<li>He come come (will come)</li>
												</ul>
											</li></ul>
										</li>
									</ul>
								</InfoModal>
								<TextItem className="l4" text="tense" rows={6}>Is there a Tense system? How does it operate? How does it divide time?</TextItem>


							<HeaderItem className="h h3 l3 content">8.3.2 Aspect</HeaderItem>

								<InfoModal className="l4" title="Aspect" label="Info on Aspect">
									<ul>
										<li><strong>Aspect</strong> describes the internal structure of an event or state. Here are some typical aspects:
											<ul>
												<li><strong>Perfective</strong>: The situation is viewed as a single event.
													<ul>
														<li>"She wrote a letter."</li>
														<li>"He walked around the block."</li>
													</ul>
												</li>
												<li><strong>Imperfective</strong>: The situation is viewed from "inside" as an ongoing process.
													<ul>
														<li>"She writes a letter."</li>
														<li>"He walks around the block."</li>
													</ul>
												</li>
												<li><strong>Perfect</strong>: A currently relevant state brought about by the verb.
													<ul>
														<li>"She has written a letter."</li>
														<li>"He has walked around the block."</li>
													</ul>
												</li>
												<li><strong>Pluperfect</strong>: A combination of Perfect aspect and Past tense; the currently relevant state was brought about in the past.
													<ul>
														<li>"She had written a letter."</li>
														<li>"He had walked around the block."</li>
													</ul>
												</li>
												<li><strong>Completive</strong>: Refers to the end of a situation.
													<ul>
														<li>"She finished writing a letter."</li>
														<li>"He finished walking around the block."</li>
													</ul>
												</li>
												<li><strong>Inceptive</strong>: Refers to the beginning of a situation.
													<ul>
														<li>"She started writing a letter."</li>
														<li>"He began walking around the block."</li>
													</ul>
												</li>
												<li><strong>Continuative/Progressive</strong>: This implies an ongoing, dynamic situation.
													<ul>
														<li>"She is writing a letter."</li>
														<li>"He is walking around the block."</li>
													</ul>
												</li>
												<li><strong>Habitual</strong>: This implies an event or state happens regularly.
													<ul>
														<li>"She often writes a letter."</li>
														<li>"He usually walks around the block."</li>
													</ul>
												</li>
												<li><strong>Punctual</strong>: The state or event is too short to have an internal structure.
													<ul>
														<li>"She coughed."</li>
													</ul>
												</li>
												<li><strong>Iterative</strong>: A Punctual state or event takes place several times in succession.
													<ul>
														<li>"He is coughing."</li>
													</ul>
												</li>
												<li><strong>Atelic</strong>: An event that has no clearly defined end-point.
													<ul>
														<li>"He is coughing and coughing and coughing."</li>
													</ul>
												</li>
												<li><strong>Telic</strong>: Has a clearly defined end-point.
													<ul>
														<li>"She is near the end of her walk."</li>
													</ul>
												</li>
												<li><strong>Static</strong>: A changeless state.
													<ul>
														<li>"He is just plain boring."</li>
													</ul>
												</li>
											</ul>
										</li>
										<li className="newSection">Languages may handle certain aspects in different ways.
											<ul>
												<li>English uses context for most aspects.</li>
												<li>Spanish uses morphology for Perfective and Imperfective aspects, and uses a morphological/analytical combination for Perfect.</li>
												<li>Mandarin has a Perfective particle.</li>
												<li>Finnish uses an accusative case for Perfective and a "partitive" case for Progressive.
													<ul><li>In human languages, case markers like this can be mistaken for TAM markers!</li></ul>
												</li>
											</ul>
										</li>
										<li className="newSection">Progressive aspect constructions often derive from locational structures.
											<ul><li>English has gone from "He is at walking" to "He is a-walking" (still used in some places) to "He is walking".</li></ul>
										</li>
										<li className="newSection">There is often a link between aspect marking and location/direction marking. English has some examples:
											<ul>
												<li>I <em>came</em> to see it as an abberation (inceptive)</li>
												<li>I cut <em>away</em> at the handcuffs (imperfective)</li>
												<li>I drank your milkshake <em>up</em> (perfective)</li>
											</ul>
										</li>
									</ul>
								</InfoModal>
								<TextItem className="l4" text="aspect" rows={8}>Describe the way the language handles Aspect.</TextItem>

							<HeaderItem className="h h3 l3 content">8.3.3 Mode</HeaderItem>

								<InfoModal className="l4" title="Mode" label="Info on Mode">
									<ul>
										<li><strong>Mode</strong> describes a speaker's attitude toward a situation, including how likely or truthful it is, or how relevant the situation is to them.</li>
										<li>Mode, Mood and Modality are often used interchangeably, though some linguists make distinctions between them.</li>
										<li className="newSection">The highest-level Mode distinction is the Realis-Irrealis Continuum.
											<ul>
												<li><strong>Realis</strong>: the speaker insists the situation is real, or holds true.
												</li>
												<li><strong>Irrealis</strong>: the speaker makes no claim as to the situation's reality or truthfulness.
													<ul>
														<li>Conditional statements (if X...) are inherently Irrealis.</li>
														<li>Interrogative statements (questions) and imperative statements (commands) tend to be treated as Irrealis.</li>
														<li>Other statements that tend to be treated as Irrealis:
															<ul>
																<li>Subjunctive (possibility, what if)</li>
																<li>Optative (wishes)</li>
																<li>Hypothetical/Imaginary</li>
																<li>Probability</li>
																<li>Deontic (obligations: should, must, have to)</li>
																<li>Potential (might, ability to; sometimes considered very weak Deontic)</li>
															</ul>
														</li>
													</ul>
												</li>
												<li className="newSection">Evidentiality and Validationality are sometimes part of the Mode system. They can also stand alone (8.5).</li>
											</ul>
										</li>
										<li className="newSection">Negative assertions (see 9.2) can be Realis or Irrealis depending on how strongly the assertion is, but some languages still treat all negative statements as Irrealis.</li>
										<li className="newSection">Mode interacts strongly with Tense and Aspect.
											<ul>
												<li>Habitual aspect is inherently less Realis than Perfective aspect.</li>
												<li>Statements that are more Realis are more likely to be definite and referential.
													<ul>
														<li>Steve ate the candy. (Perfective)</li>
														<li>Steve always eats candy. (Habitual)</li>
														<li>Steve always eats the candy. (Technically grammatical, but sounds "wrong")</li>
													</ul>
												</li>
											</ul>
										</li>
									</ul>
								</InfoModal>
								<TextItem className="l4" text="mode" rows={6}>Describe how the language deals with Mode.</TextItem>

						<HeaderItem className="h h2 l2">8.4. Location/Direction</HeaderItem>

							<InfoModal className="l3" title="Location and Direction">
								<ul>
									<li>While Tense grounds statements in time, some languages grammaticize location and/or direction markers to ground statements in space. It may be even more central to discourse than tense in some languages.</li>
									<li className="newSection">Directional formatives are often related to basic verbs of motion (go, come, arrive, depart, return, go up, go down).</li>
									<li className="newSection">Some languages (Lahu, Tibeto-Burman languages) have one motion verb and use directional formatives to indicate progression towards (hither) or away from (thither) a point of reference.</li>
									<li className="newSection">Locational marking is often culturally or geographically relevant to the culture that speaks it.
										<ul>
											<li>Quechua, spoken in the Andes mountains, has suffixes that indicate uphill, downhill, and "at the same altitude".</li>
											<li>Yagua, spoken in Peruvian lowland rivers, has suffixes that indicate an action was performed upriver, downriver, or moving horizontally across land or water.
												<ul>
													<li>There are also suffixes that express the action happen on arrival at a new scene, or on arrival at the current scene.</li>
												</ul>
											</li>
										</ul>
									</li>
									<li className="newSection">Papuan languages have extensive markers that can be used in combination, i.e. "She moved it down and away from her."</li>
									<li>Otomí has auxilliaries than indicate an action is towards (centric) or away from (exocentric) a designated center (usually where the speaker is).</li>
								</ul>
							</InfoModal>
							<TextItem className="l3" text="locDirect" rows={8}>Does the language have affixes or other functions that represent spatial grounding?</TextItem>

						<HeaderItem className="h h2 l2">8.5. Evidentiality, Validationality and Mirativity</HeaderItem>

							<InfoModal className="l3" title="Evidentiality">
								<ul>
									<li><strong>Evidentiality</strong> expresses how much evidence the speaker has to make this assertion. For instance, first-hand knowledge is more evidential than third-hand suspect information.</li>
									<li><strong>Validationality</strong> is sometimes separate from Evidentiality. It is how languages express relative certainty of truth. We are more likely to be certain of:
										<ul>
											<li>Past events vs future events</li>
											<li>The completion of Perfective events vs still-in-progress events</li>
											<li>Realis assertions vs Irrealis assertions</li>
										</ul>
									</li>
									<li><strong>Mirativity</strong> expresses how well this information fits into the speaker's worldview.
										<ul>
											<li>"The cat was found on the roof" has high mirativity.</li>
											<li>"The elephant was found on the roof" would be surprising, and therefore has very low mirativity.</li>
										</ul>
									</li>
									<li className="newSection">These markers often operate on the clause level rather than the verb-phrase level. They tend to be tightly tied to TAM.</li>
									<li className="newSection">The most common type of evidential marker is the Hearsay particle.</li>
									<li className="newSection">Tuyuca has a complex, five-level system:
										<ul>
											<li>Witnessed by the speaker</li>
											<li>Not witnessed by the speaker</li>
											<li>General knowledge</li>
											<li>Inferred from evidence</li>
											<li>Hearsay</li>
										</ul>
									</li>
								</ul>
							</InfoModal>
							<TextItem className="l3" text="evidence" rows={6}>Are there any grammaticized indicators of Evidentiality, Validationality, or Mirativity?</TextItem>

						<HeaderItem className="h h2 l2">8.6. Miscellaneous</HeaderItem>

							<InfoModal className="l3" title="Miscelaneous">
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
							<TextItem className="l3" text="miscVerbFunc" rows={4}>Does the language have affixes or other functions that represent spatial grounding?</TextItem>

					<HeaderItem className="h h1">9. Pragmatically Marked Structures</HeaderItem>
					
						<InfoModal className="l3" title="Pragmatics" label="What are Pragmatics?">
							<ul>
								<li>Pragmatics is the interpretation of utterances, and Pragmatic Statuses relate the <em>content</em> of an utterance to its <em>context</em>. They cover the following concepts:
									<ul>
										<li><strong>Identifiability</strong>: can an argument be identified by the listener?
											<ul>
												<li>English uses proper names and "the" to indicate identifiability.</li>
											</ul>
										</li>
										<li><strong>Objective Referentiality</strong>: is an argument a bounded, individual entity?
											<ul>
												<li>English can be ambiguous: Does "I'm looking for a housekeeper" mean anyone who is housekeeper, or a specific housekeeper the speaker is not naming?</li>
												<li>Spanish has a particle <em>a</em> for human arguments that indicates a specific individual is being talked about.
													<ul>
														<li>"Buscando una empleada" - I'm looking for a (any) housekeeper</li>
														<li>"Buscando a una empleada" - I'm looking for a (specific) housekeeper</li>
													</ul>
												</li>
											</ul>
										</li>
										<li><strong>Discourse Referentiality</strong>: is an argument relevant to the discourse or just adjacent?
											<ul>
												<li>Panago: putting a new argument before a verb "foreshadows" that the argument will be important later. Putting it after the verb means it's just transitory.</li>
												<li>English often uses <em>this</em> to indicate importance. If you hear someone say, "Take a look at <em>this</em> guy," you can be sure they're going to continue talking about the guy!</li>
											</ul>
										</li>
										<li><strong>Focus</strong> covers multiple concepts:
											<ul>
												<li><strong>Marked Focus</strong>:
													<ul><li>"Mom <em>did</em> give me permission!" - English uses "do" to focus on the truth of a statement, often in opposition to the listener's beliefs.</li></ul>
												</li>
												<li><strong>Assertive Focus</strong>:
													<ul><li>"Mary was wearing <em>this hideous bridesmaid's dress</em>." - the speaker believes the listener has no knowledge of the information.</li></ul>
												</li>
												<li><strong>Counter-Presuppositional Focus</strong>:
													<ul><li>"The nerd and the cheerleader came to the party, but <em>the nerd</em> won everyone's hearts." - the speaker believes the listener believes the opposite.</li></ul>
												</li>
												<li><strong>Exhaustive Focus</strong>:
													<ul><li>"I <em>only</em> spoke to Ned." - the speaker excludes all other possible options.</li></ul>
												</li>
												<li><strong>Contrastive Focus</strong>:
													<ul><li>"<em>Mary</em> chose the dresses." - the listener may believe one participant had a specific role, but the speaker is saying someone else held that role.</li></ul>
												</li>
											</ul>
										</li>
										<li><strong>Topic</strong>:
											<ul><li>"<em>Beans</em>, how I hate them." - a new argument is declared as a topic of further discourse.</li></ul>
										</li>
									</ul>
								</li>
							</ul>
						</InfoModal>
						<HeaderItem className="h h2 l2">9.1 Focus, Contrast and Topicalization</HeaderItem>

							<InfoModal className="l3" title="Focus, Contrast, etc." label="This is a long one!">
								<ul>
									<li><strong>Intonation and Vocalization</strong>, such as tempo changes ("Do. Not. Do. That."), volume changes (screaming, whispering), and pitch changes ("Do <em>not</em> do that"), are nearly universal.</li>
									<li className="newSection"><strong>Constituent Order</strong>:
										<ul>
											<li>Practically all language use <strong>Preposing</strong>, moving an argument by itself to a position before a clause that it's relative to. The opposite is <strong>Postposing</strong>.
												<ul><li>"<em>Potatoes</em>, I like them."</li></ul>
											</li>
											<li><strong>Fronting</strong> is similar, but rearranges arguments so that Pragmatic Status is given to the moved argument.
												<ul><li>"<em>Potatoes</em> I like."</li></ul>
											</li>
											<li><strong>Apposition</strong> is adding a free noun phrase to a clause.
												<ul><li>"<em>Termites</em>. Why does the universe hate me?"</li></ul>
											</li>
											<li><strong>Clefting</strong> is a type of predicate nominal where a noun phrase is joined to a relative clause that references that original noun phrase. (See below.)
												<ul>
													<li>"<em>You</em> are <em>the one that I want</em>."</li>
												</ul>
											</li>
										</ul>
									</li>
									<li className="newSection"><strong>Formatives</strong> move along a continuum between morphological case markers (4.4) and pragmatic status markers:
										<ul>
											<li>The continuum:
												<ul>
													<li><strong>Pragmatic Status Markers</strong>: English articles, Aghem focus particles (see below), etc.</li>
													<li><strong>Overlay systems</strong>: Japanese and Korean "topic marking"</li>
													<li><strong>Case Markers</strong>: Latin, Eskimo, Russian, Quechua, etc.</li>
												</ul>
											</li>
											<li>Remember that these can partially correlate with grammatical roles: e.g. English <em>subjects</em> are often also <em>identifiable</em>.
												<ul>
													<li className="newSection">Aghem uses verb morphology and focus particles to express various pragmatic nuances.
														<ul>
															<li>"énáʔ <em>mɔ̀</em> fúo kí-bɛ́ â fín-ghɔ́" - Inah gave fufu to his friends.</li>
															<li>"énáʔ <em>má՚á</em> fúo kí-bɛ́ â fín-ghɔ́" - Inah <em>DID</em> give fufu to his friends. (truth focus)</li>
															<li className="newSection">"fú kí mɔ̀ ñiŋ <em>nò</em> á kí-՚bé" - The rat <em>ran</em> (did not walk, scurry, etc) in the compound.</li>
															<li>"fú kí mɔ̀ ñiŋ á kí-՚bé <em>nò</em>" - The rat ran in <em>the compound</em> (not in the house, church, etc.).</li>
														</ul>
													</li>
													<li className="newSection">Akam has a focus particle <em>na</em> and a contrastive particle <em>de</em>.
														<ul>
															<li>"Kwame <em>na</em> ɔbɛyɛ adwuma no." - It's Kwame (not anyone else) who will do the work.</li>
															<li>"Kwame <em>de</em> ɔbɛkɔ, na Kofi <em>de</em> ɔbɛtena ha." - Kwame will go, but Kofi will stay here.</li>
														</ul>
													</li>
													<li className="newSection"><strong>Overlay</strong> systems are a combination of case-marking systems and pragmatic status-marking systems: one or more basic case markers are replaced (overlaid) by the status marker when a nominal is singled out for pragmatic treatment.
														<ul><li>The Japanese topic marker <em>wa</em> can overlay the subject marker <em>ga</em> or the object marker <em>o</em>.
															<ul>
																<li>"taroo <em>ga</em> hon <em>o</em> katta." - Taro bought a book.</li>
																<li>"taroo <em>wa</em> hon o katta." - As for Taro, he bought a book.</li>
																<li>"hon <em>wa</em> taroo ga katta." - As for the book, Taro bought it.</li>
															</ul>
														</li></ul>
													</li>
												</ul>
											</li>
										</ul>
									</li>
								</ul>
							</InfoModal>
							<TextItem className="l3" text="pragFocusEtc" rows={8}>Are there special devices for indicating Pragmatic Statuses in basic clauses? Describe cleft constructions, if there are any.</TextItem>

						<HeaderItem className="h h2 l2">9.2 Negation</HeaderItem>

							<InfoModal className="l3" title="Negation">
								<ul>
									<li>Common negation strategies:
										<ul>
											<li><strong>Clausal negation</strong> - negates an entire proposition
												<ul><li>"I didn't do it."</li></ul>
											</li>
											<li><strong>Constituent negation</strong> - negates a particular constituent of a proposition
												<ul><li>"I have no motive."</li></ul>
											</li>
										</ul>
									</li>
									<li className="newSection"><strong>Lexical Negation</strong>
										<ul><li>Some verbs just function as the opposite of other verbs, such as "have" vs "lack".</li></ul>
									</li>
									<li className="newSection"><strong>Morphological Negation</strong>
										<ul>
											<li>Clausal negations are usually associated with the verb.</li>
											<li>Often tied to other verbal inflections, such as expressing aspect or tense.</li>
										</ul>
									</li>
									<li className="newSection"><strong>Analytical Negation</strong>
										<ul>
											<li>This includes negative particles and negative finite verbs.</li>
											<li className="newSection"><strong>Multiple Expressions of Negation</strong>
												<ul>
													<li>It's common for negative constructions to have multiple operators, e.g:
														<ul>
															<li>two particles</li>
															<li>a particle and an affix</li>
															<li>a particle, an affix, and a word order change</li>
														</ul>
													</li>
												</ul>
											</li>
											<li className="newSection"><strong>Different Kinds of Negation</strong>
												<ul>
													<li>In many languages, the negative affix or particle varies according to tense, aspect, mode, or other factors.
														<ul>
															<li>It's fairly common for negative imperatives to differ from negative assertions (e.g. Mandarin, Hebrew, Tennet).</li>
															<li>Tagalog and many Austronesian languages use different particles for plain negatives and negation of existence.
																<ul>
																	<li>"Mayroon ka ang pera?" "Wala." - Do you have any money? None.</li>
																	<li>"Pupunta ka ba sa sayawan?" "Hindi." - Are you going to the dance? No.</li>
																</ul>
															</li>
															<li>Mandarin has <em>méi</em> for existential negatives, <em>bié</em> for negative imperatives, and <em>bu</em> for everything else.</li>
															<li>Iraqi Arabic has one particle (mɑː) for verbal predicates and another (muː) for verbless predicates (predicate nominals, locationals, existentials, etc.).</li>
														</ul>
													</li>
												</ul>
											</li>
										</ul>
									</li>
									<li className="newSection"><strong>Analytical Negation</strong>
										<ul>
											<li>This includes negative particles and negative finite verbs.</li>
										</ul>
									</li>
								</ul>
							</InfoModal>

				</IonList>
			</IonContent>
		</IonPage>
	);
};
 
export default Syntax;
