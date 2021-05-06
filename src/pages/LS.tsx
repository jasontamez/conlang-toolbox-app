import React from 'react';
import {
	IonPage,
	IonContent,
	IonHeader,
	IonToolbar,
	IonTitle,
	IonButtons,
	IonButton,
	IonMenuButton,
	IonIcon,
	IonList,
	IonItem,
	IonLabel,
	IonRange
} from '@ionic/react';
import { globeOutline } from 'ionicons/icons';
import { /*useSelector,*/ useDispatch } from "react-redux";
import {
	openModal
} from '../components/ReduxDucksFuncs';
//import { Lexicon } from '../components/ReduxDucksTypes';
//import { CustomStorageLS } from '../components/PersistentInfo';
import ExtraCharactersModal from './M-ExtraCharacters';

const Lex = () => {
	const dispatch = useDispatch();
//	const [appSettings, lexicon] = useSelector((state: any) => [state.appSettings, state.lexicon]);
	return (
		<IonPage>
			<ExtraCharactersModal />
			<IonHeader>
				<IonToolbar>
					<IonButtons slot="start">
						<IonMenuButton />
					</IonButtons>
					<IonTitle>LangSketch</IonTitle>
					<IonButtons slot="end">
						<IonButton onClick={() => dispatch(openModal("ExtraCharacters"))}>
							<IonIcon icon={globeOutline} />
						</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen className="evenBackground" id="langSketchPage">
				<IonList lines="none">
					<IonItem>
						<ol>
							<li className="h h1"><strong>[1]</strong> <em>Morphological Typology</em></li>
							<li><ol>
								<li className="h h2"><strong>[1.1]</strong> <em>Traditional Typology</em></li>
								<li><ol>
									<li className="h h3"><strong>[1.1.1]</strong> <em>Synthesis</em></li>
									<li><IonRange color="secondary" snaps={true} step={1} ticks={true} min={0} max={10}>
										<IonLabel slot="start">Isolating</IonLabel>
										<IonLabel slot="end">Polysynthetic</IonLabel>
									</IonRange></li>
									<li><ul>
										<li>How many <em>morphemes</em> (the most basic unit of meaning) appear in a word?</li>
										<li>Chinese is very <em>isolating</em>, tending towards one morpheme per word.</li>
										<li>Inuit and Quechua are very <em>polysynthetic</em>, with many morphemes per word.</li>
									</ul></li>
									<li className="h h3"><strong>[1.1.2]</strong> <em>Fusion</em></li>
									<li><IonRange color="secondary" snaps={true} step={1} ticks={true} min={0} max={10}>
										<IonLabel slot="start">Fusional</IonLabel>
										<IonLabel slot="end">Agglutinative</IonLabel>
									</IonRange></li>
									<li><ul>
										<li>How many meanings does a morpheme encode?</li>
										<li>Spanish can be very <em>fusional</em>, with a single suffix capable of encoding tense, aspect, mood and number.</li>
										<li>English can be very <em>agglutinative</em>, with one meaning per morpheme (e.g. anti-dis-establish-ment-ari-an-ism), though fusional forms are possible (e.g. swam, was).</li>
									</ul></li>
								</ol></li>
								<li className="h h2"><strong>[1.2]</strong> <em>Morphological Processes</em></li>
								<li><ol>
									<li className="h h3"><strong>[1.2.1]</strong> <em>Affixes</em></li>
									<li><ul>
										<li>Prefixes, suffixes, circumfixes, infixes</li>
										<li>Which form predominates?</li>
									</ul></li>
									<li className="h h3"><strong>[1.2.2]</strong> <em>Stem Modification</em></li>
									<li><IonRange color="secondary" snaps={true} step={1} ticks={true} min={0} max={4}>
										<IonLabel slot="start">Used Often</IonLabel>
										<IonLabel slot="end">Not Used</IonLabel>
									</IonRange></li>
									<li><ul>
										<li>e.g. swim/swam/swum.</li>
									</ul></li>
									<li className="h h3"><strong>[1.2.3]</strong> <em>Reduplication</em></li>
									<li><IonRange color="secondary" snaps={true} step={1} ticks={true} min={0} max={4}>
										<IonLabel slot="start">Used Often</IonLabel>
										<IonLabel slot="end">Not Used</IonLabel>
									</IonRange></li>
									<li><ul>
										<li>Often used for plurality.</li>
									</ul></li>
									<li className="h h3"><strong>[1.2.4]</strong> <em>Suprasegmental Modification</em></li>
									<li><IonRange color="secondary" snaps={true} step={1} ticks={true} min={0} max={4}>
										<IonLabel slot="start">Used Often</IonLabel>
										<IonLabel slot="end">Not Used</IonLabel>
									</IonRange></li>
									<li><ul>
										<li>e.g. "permit" has different stress when a noun and a verb.</li>
										<li>Tone changes also fall under this category.</li>
									</ul></li>
								</ol></li>
								<li className="h h2"><strong>[1.3]</strong> <em>Head/Dependant Marking</em></li>
								<li><IonRange color="secondary" snaps={true} step={1} ticks={true} min={0} max={4}>
										<IonLabel slot="start">Head Marked</IonLabel>
										<IonLabel slot="end">Dependant Marked</IonLabel>
									</IonRange></li>
								<li><ul>
									<li>English is predominantly dependant-marked ("the queen's crown")</li>
									<li>Most languages are head-marked (*"the queen crown's")</li>
									<li>Some are mixed, but stay in one pattern for a certain class of phrases (noun, verb, adposition)</li>
								</ul></li>
							</ol></li>
							<li className="h h1"><strong>[2]</strong> <em>Grammatical Categories</em></li>
							<li><ol>
								<li className="h h2"><strong>[2.1]</strong> <em>Nouns (the most time-stable concepts)</em></li>
								<li><ol>
									<li className="h h3"><strong>[2.1.1]</strong> <em>Types of Nouns</em></li>
										<li><ol>
											<li className="h"><strong>[2.1.1.1]</strong> <em>Proper Names</em></li>
											<li><ul>
												<li>In English, they do not easily take articles, quantifiers and other modifiers</li>
												<li>Other languages may have special case markers for them</li>
											</ul></li>
											<li className="h"><strong>[2.1.1.2]</strong> <em>Possessability</em></li>
											<li><ul>
												<li>Languages may have one of the following systems to differentiate nouns</li>
											</ul></li>
											<li><ol>
												<li className="h"><strong>[2.1.1.2.1]</strong> <em>Possessable vs unpossessable</em></li>
												<li><ul>
													<li>Some nouns cannot be possessed (land, stars, etc)</li>
												</ul></li>
												<li className="h"><strong>[2.1.1.2.2]</strong> <em>Inherently vs optionally possessed</em></li>
												<li><ul>
													<li>Some nouns <em>must</em> be possessed (body parts, kinship terms, etc)</li>
												</ul></li>
												<li className="h"><strong>[2.1.1.2.3]</strong> <em>Alienably vs inalienbly possessed</em></li>
												<li><ul>
													<li><em>Alienable</em>: possession can be ended (my car becomes your car)</li>
													<li><em>Inalienable</em>: possession cannot be ended (my brother is always my brother)</li>
												</ul></li>
											</ol></li>
											<li className="h"><strong>[2.1.1.3]</strong> <em>Count noun vs mass noun</em></li>
											<li><ul>
												<li>Typically, most nouns are countable, while fewer are considered as a mass</li>
												<li>e.g. "sand" requires "a grain of sand" to be countable, and "confetti" requires "a piece of confetti"</li>
											</ul></li>
										</ol></li>
									<li className="h h3"><strong>[2.1.2]</strong> <em>Pronouns and/or anaphoric clitics</em></li>
									<li><ol>
										<li className="h"><strong>[2.1.2.1]</strong> <em>Pronouns</em></li>
										<li><ul>
											<li>Free forms that function as nouns</li>
										</ul></li>
										<li className="h"><strong>[2.1.2.2]</strong> <em>Anaphoric clitics</em></li>
										<li><ul>
											<li>Must attach to another word, but function as a full noun phrase</li>
										</ul></li>
									</ol></li>
									<li><ul>
										<li>Both types often differ according to person (3rs/2nd/1st including inclusive/exclusive), number (singular/plural), noun class (gender), grammatical role (subject/object/ergative/etc), semantic role (agent/patient), definiteness and/or specificness (a/the), and honorifics</li>
										<li>English has frequent pronouns that agree with the verb, and may be stressed for emphasis or contrast: "<strong>He</strong> died" (not her, as expected)</li>
										<li>Spanish has anaphoric forms attached to the verb, but will use pronouns for emphasis or contrast</li>
									</ul></li>
								</ol></li>
								<li className="h h2"><strong>[2.2]</strong> <em>Verbs (the least time-stable concepts)</em></li>
								<li><ol>
									<li className="h h3"><strong>[2.2.1]</strong> <em>Semantic roles</em></li>
									<li><ol>
										<li className="h"><strong>[2.2.1.1]</strong> <em>Agent</em></li>
										<li><ul><li>active, physical, has volition</li></ul></li>
										<li className="h"><strong>[2.2.1.2]</strong> <em>Force</em></li>
										<li><ul><li>directly instigates, not necessarily conscious or voluntary</li></ul></li>
										<li className="h"><strong>[2.2.1.3]</strong> <em>Instrument</em></li>
										<li><ul><li>indirectly instigates (usually by an agent)</li></ul></li>
										<li className="h"><strong>[2.2.1.4]</strong> <em>Experiencer</em></li>
										<li><ul><li>does not participate, merely observes</li></ul></li>
										<li className="h"><strong>[2.2.1.5]</strong> <em>Recipient</em></li>
										<li><ul><li>moving object, or often a destination</li></ul></li>
										<li className="h"><strong>[2.2.1.6]</strong> <em>Patient</em></li>
										<li><ul><li>undergoes a change, no volition</li></ul></li>
									</ol></li>
									<li><ul>
										<li>Often required by the language</li>
										<li>Roles can change according to the perspective of the speaker
											<ul>
												<li>I hit Bob with the hammer</li>
												<li>The hammer hit Bob</li>
												<li>Bob was hit</li>
											</ul>
										</li>
									</ul></li>
									<li className="h h3"><strong>[2.2.2]</strong> <em>Verb classes</em></li>
									<li><ol>
										<li className="h"><strong>[2.2.2.1]</strong> <em>Weather verbs</em></li>
										<li className="h"><strong>[2.2.2.2]</strong> <em>States</em></li>
										<li><ul>
											<li>be hot, be broken, be frozen, etc</li>
											<li>may be predicate-bound</li>
										</ul></li>
										<li className="h"><strong>[2.2.2.3]</strong> <em>Involuntary Processes</em></li>
										<li><ul><li>He grew; It broke; They died; etc</li></ul></li>
										<li className="h"><strong>[2.2.2.4]</strong> <em>Bodily Functions</em></li>
										<li><ul><li>cough, sweat, bleed, cry, etc</li></ul></li>
										<li className="h"><strong>[2.2.2.5]</strong> <em>Motion</em></li>
										<li className="h"><strong>[2.2.2.6]</strong> <em>Position</em></li>
										<li><ul><li>stand, sit, hang, etc.</li></ul></li>
										<li className="h"><strong>[2.2.2.7]</strong> <em>Actions</em></li>
										<li><ul><li>Agent only</li></ul></li>
										<li className="h"><strong>[2.2.2.8]</strong> <em>Action-Processes</em></li>
										<li><ul><li>Agent affects Patient</li></ul></li>
										<li className="h"><strong>[2.2.2.9]</strong> <em>Factive</em></li>
										<li><ul><li>3.2.1.9 -  something comes into being; build, form, ignite, create, etc</li></ul></li>
										<li className="h"><strong>[2.2.2.10]</strong> <em>Cognition</em></li>
										<li><ul><li>know, suspect, forget, etc</li></ul></li>
										<li className="h"><strong>[2.2.2.11]</strong> <em>Sensation</em></li>
										<li><ul><li>hear, see, taste, etc</li></ul></li>
										<li className="h"><strong>[2.2.2.12]</strong> <em>Emotion</em></li>
										<li><ul><li>be happy, be afraid, be mellow, etc</li></ul></li>
										<li className="h"><strong>[2.2.2.13]</strong> <em>Utterance</em></li>
										<li><ul><li>say, yell, murmur, declare, chat, etc</li></ul></li>
										<li className="h"><strong>[2.2.2.14]</strong> <em>Manipulation</em></li>
										<li><ul><li>force, urge, cause, let, permit, allow, compel, etc</li></ul></li>
									</ol></li>
									<li><ul>
										<li>Which classes exist as distinct categories in the language?</li>
										<li>How are they realized?</li>
									</ul></li>
									<li className="h h3"><strong>[2.2.3]</strong> <em>Verb structure</em></li>
									<li><ul>
										<li>This is more necessary in polysynthetic languages</li>
										<li>Describe the structure of the verb phrase.
											<ul>
												<li>Where does the stem lie in relation to any affixes/particles/etc?</li>
												<li>Are directional and/or locational notions expressed in the verb/phrase at all?</li>
											</ul>
										</li>
										<li>Describe any verbal operations.
											<ul>
												<li>Is this operation obligatory?</li>
												<li>Is it productive (for all/most stems)?</li>
												<li>Is this coded morphologically/analytically/lexically? Any exceptions?</li>
												<li>Where in the word/phrase is the operation likely to appear? Can it appear in more than one place?</li>
											</ul>
										</li>
									</ul></li>
								</ol></li>
								<li className="h h2"><strong>[2.3]</strong> <em>Modifiers</em></li>
								<li><ol>
									<li className="h h3"><strong>[2.3.1]</strong> <em>Property Concepts (Descriptive Adjectives)</em></li>
									<li><ul>
										<li>If these exist as a separate category, they will express age, dimension (big, short, long, tall, wide), value (good, bad), color</li>
										<li>Other properties may be expressed: physical properties (hard, smooth, heavy), shape, speed, human propensity (happy, jealous, smart, wary)</li>
										<li>Human languages handle these in five distinct ways:
											<ol>
												<li className="h"><strong>[2.3.1.1]</strong> <em>Lexicalized as verbs (austronesian languages)</em></li>
												<li className="h"><strong>[2.3.1.2]</strong> <em>Lexicalized as nouns (Finnish)</em></li>
												<li className="h"><strong>[2.3.1.3]</strong> <em>Lexicalized as nouns or verbs depending on the demand of discourse (Dutch)</em></li>
												<li className="h"><strong>[2.3.1.4]</strong> <em>Some are lexicalized as nouns, others are lexicalized as verbs (Yoruba)</em></li>
												<li className="h"><strong>[2.3.1.5]</strong> <em>Distinct class of "adjectives" (English)</em></li>
											</ol>
										</li>
										<li>Which way does the language handle PCs?</li>
										<li>Do they agree with their head?</li>
									</ul></li>
									<li className="h h3"><strong>[2.3.2]</strong> <em>Non-Numeral Quantifiers</em></li>
									<li><ul>
										<li>e.g. Few, many, some, etc</li>
										<li>Which quantifiers exist?</li>
									</ul></li>
									<li className="h h3"><strong>[2.3.3]</strong> <em>Numerals</em></li>
									<li><ol>
										<li className="h"><strong>[2.3.3.1]</strong> <em>Extent</em></li>
										<li><ul>
											<li>Some languages have limited numerals: e.g. "1, 2, 3, many"</li>
											<li>More languages have distinct numerals from 1 to Infinity</li>
										</ul></li>
										<li className="h"><strong>[2.3.3.2]</strong> <em>Base</em></li>
										<li><ul>
											<li>Usually base 5 or 10. Sometimes base 20.</li>
										</ul></li>
										<li className="h"><strong>[2.3.3.3]</strong> <em>Agreement</em></li>
										<li><ul>
											<li>Some languages use different sets of numerals for different classes of nouns</li>
										</ul></li>
									</ol></li>
									<li><ul>
										<li>Describe the language's numeral system</li>
									</ul></li>
								</ol></li>
								<li className="h h2"><strong>[2.4]</strong> <em>Adverbs: a "Catch All" Category</em></li>
								<li><ol>
								</ol></li>
							</ol></li>
							<li className="h h1"><strong>[3]</strong> <em>Constituent Order Typology</em></li>
							<li className="h h1"><strong>[4]</strong> <em>Noun and Noun Phrase Operations</em></li>
							<li className="h h1"><strong>[5]</strong> <em>Predicate Nominals and Related Constructions</em></li>
							<li className="h h1"><strong>[6]</strong> <em>Grammatical Relations</em></li>
							<li className="h h1"><strong>[7]</strong> <em>Voice and Valence Adjusting Operations</em></li>
							<li className="h h1"><strong>[8]</strong> <em>Other Verb and Verb Phrase Operations</em></li>
						</ol>
					</IonItem>
				</IonList>
			</IonContent>
		</IonPage>
	);
};
 
export default Lex;
