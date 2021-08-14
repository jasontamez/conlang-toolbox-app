import React from 'react';
import {
	IonPage,
	IonContent,
	IonList,
	useIonViewDidEnter
} from '@ionic/react';
import {
	SyntaxHeader,
	HeaderItem,
	InfoModal,
	TextItem,
	TransTable
} from './MorphoSyntaxElements';
import { changeView } from '../../components/ReduxDucksFuncs';
import { useDispatch } from "react-redux";

const Syntax = () => {
	const dispatch = useDispatch();
	const viewInfo = ['ms', 'ms09'];
	useIonViewDidEnter(() => {
		dispatch(changeView(viewInfo));
	});
	return (
		<IonPage>
			<SyntaxHeader title="9. Pragmatically Marked Structures" />
			<IonContent fullscreen className="evenBackground disappearingHeaderKludgeFix" id="morphoSyntaxPage">
				<IonList lines="none">

					<HeaderItem level="1">9. Pragmatically Marked Structures</HeaderItem>
					
					<InfoModal title="Pragmatics" label="What are Pragmatics?">
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
					<HeaderItem level="2">9.1 Focus, Contrast and Topicalization</HeaderItem>

					<InfoModal title="Focus, Contrast, etc." label="Focus is What This is About">
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
					<TextItem text="pragFocusEtc" rows={8}>Are there special devices for indicating Pragmatic Statuses in basic clauses? Describe cleft constructions, if there are any.</TextItem>

					<HeaderItem level="2">9.2 Negation</HeaderItem>

					<InfoModal title="Negation" label="Don't not read this.">
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
							<li className="newSection"><strong>Clausal Negation</strong>
								<ul>
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
													<li className="newSection">Another method is a finite negative verb and a complement clause (10, 10.2)
														<ul>
															<li>The negative verb will take finite inflectional morphology and occur in the normal position for a verb. The affirmative verb will be treated like a complement verb.</li>
															<li>This occurs primarily in verb-initial and verb-final languages.
																<ul>
																	<li>Tungan, a verb-initial language:
																		<ul>
																			<li>"Na'e-<em>alu</em> 'a Siale" - Charlie went.</li>
																			<li>"Na'e-<em>'ikai</em> ke <em>'alu</em> 'a Siele" - Charlie didn't go.</li>
																		</ul>
																	</li>
																</ul>
															</li>
														</ul>
													</li>
												</ul>
											</li>
										</ul>
									</li>
									<li className="newSection"><strong>Secondary Methods of Negation</strong>
										<ul>
											<li>Alternate word order:
												<ul><li>Many VP languages change their order for negative clauses. For example, Kru uses AVP for affirmative clauses and APV in negative clauses.</li></ul>
											</li>
											<li>Change in tone:
												<ul><li>Igbo carries a low tone in affirmative clauses and a high tone in negative clauses.</li></ul>
											</li>
											<li>Neutralization of tense-aspect distinctions:
												<ul>
													<li>Komi has a present-future distinction in affirmative, but no such distinction in the negative.</li>
													<li>Bembe allows two future tense markers in affirmative, but only one of them in the negative.</li>
												</ul>
											</li>
											<li>Special inflections:
												<ul><li>A few languages have special person/number ot TAM markers on verbs in negative clauses. (Negative verbs tend to hold onto older patterns that have been lost in affirmative clauses!)</li></ul>
											</li>
											<li>Alternative case-marking patterns:
												<ul>
													<li>Special case-marking patterns may occur in negative clauses. For example, with certain Russian verbs, the object will be in accusative for affirmative clauses and in genitive case in negative clauses.</li>
												</ul>
											</li>
										</ul>
									</li>
									<li className="newSection"><strong>Constituent Negation</strong>
										<ul>
											<li className="newSection"><strong>Derivational Negation</strong>:
												<ul>
													<li>Some languages allow a derivation of a stem to transform it into its opposite.</li>
													<li>English has the not-fully-productive <em>non-</em> and <em>un-</em> prefixes that only work on adjectives and nominals.</li>
													<li>Panare has a verbal suffix <em>-(i)ka</em> that forms something akin to the opposite of the root verb.</li>
												</ul>
											</li>
											<li className="newSection"><strong>Negative Quantifiers</strong>:
												<ul>
													<li>Many languages have inherently negative quantifiers ("none", "nothing") or can be negated independent of clause ("not many").</li>
													<li>Most languages allow or require such quantifiers to be accompanied by clausal negation.
														<ul><li>Standard English is rare in disallowing such use of "double negatives".</li></ul>
													</li>
												</ul>
											</li>
										</ul>
									</li>
									<li className="newSection"><strong>Negative Scope</strong>:
										<ul>
											<li>Sometimes the two types of negation interact to cause variations in the scope of what can be negated.
												<table className="informational">
													<tr>
														<th>Statement</th>
														<th>Scope</th>
													</tr>
													<tr>
														<td>"Not many rats survive to adulthood."</td>
														<td>Quantifier only</td>
													</tr>
													<tr>
														<td>"Many rats do not survive to adulthood."</td>
														<td>Entire clause</td>
													</tr>
													<tr>
														<td>"I deliberately didn't eat the cheese."</td>
														<td>Entire clause</td>
													</tr>
													<tr>
														<td>"I didn't deliberately eat the cheese."</td>
														<td>Adverb only</td>
													</tr>
													<tr>
														<td>"He won't force you to volunteer."</td>
														<td>Entire clause</td>
													</tr>
													<tr>
														<td>"He will force you not to volunteer."</td>
														<td>Complement clause</td>
													</tr>
												</table>
											</li>
										</ul>
									</li>
								</ul>
							</li>
						</ul>
					</InfoModal>
					<TextItem text="negation" rows={8}>Describe the standard way of creating a negative clause, plus any secondary strategies that may exist. Is there constituent or derivational negation?</TextItem>

					<HeaderItem level="2">9.3 Non-Declarative Speech</HeaderItem>

					<InfoModal title="Declarative Statements" label="Minor Note on Declaratives">
						<ul>
							<li>A declarative statement is an assertion. Most speech is declarative.</li>
							<li>Other types of statements are usually handled as "modes" in a language, such as interrogative (questions) and imperatives (commands).</li>
							<li className="newSection">Most often, a language will leave declarative statements unmarked and only mark the others. But some (e.g. Tibetan) will mark declaratives, too.</li>
						</ul>
					</InfoModal>
					<TextItem text="declaratives" rows={3}>If declaratives are marked, describe how.</TextItem>

					<HeaderItem level="3">9.3.1 Interrogatives</HeaderItem>

					<HeaderItem level="4">9.3.1.1. Yes/No Questions</HeaderItem>

					<InfoModal title="Yes/NoQuestions" label="Yes? No?">
						<ul>
							<li><strong>Yes/No Questions</strong>, hereafter referred to as <em>YNQs</em>, are interrogative clauses where the expected answer is either "yes" or "no". They can employ any or all of the strategies below.</li>
							<li className="newSection"><em>Intonation</em>:
								<ul>
									<li>There tends to be distinct intonation patterns in YNQs.</li>
									<li>The pattern is usually rising, as in English, but can be falling, as in Russian.</li>
									<li className="newSection">Some languages <em>only</em> employ intonation!</li>
								</ul>
							</li>
							<li className="newSection"><em>Word Order</em>:
								<ul>
									<li>Many languages, especially VP languages, use distinctive constituent orders for YNQs.</li>
									<li>Usually, this is an inversion of the Agent and Verb, as in many European and Austronesian languages.
										<ul>
											<li>"bapak datangkah nanti" - Father will come later (Malay)</li>
											<li>"datangkah bapak nanti" - Will father come later?</li>
										</ul>
									</li>
									<li>English has a strange system where it reverses the Agent and the auxilliary verb. If no auxilliary is present, the verb "do" is inserted.
										<ul>
											<li>"He will arrive on time" → "Will he arrive on time?"</li>
											<li>"They can eat cake" → "Can they eat cake?"</li>
											<li>"You want to join me" (no auxilliary) → "Do you want to join me?"</li>
										</ul>
									</li>
									<li>American English uses simple Agent/Verb inversion in predicate nominals, existential and locational clauses. British English extends this to possessive constructions.
										<ul>
											<li>"He is a cat" → "Is he a cat?"</li>
											<li>"Cats are under the bed" → "Are cats under the bed?"</li>
											<li>"You were in the garden" → "Were you in the garden?"</li>
											<li>"You have a match" → "Have you a match?" (British)</li>
										</ul>
									</li>
								</ul>
							</li>
							<li className="newSection"><em>Interrogative Particle</em>:
								<ul>
									<li>Question Particles (QPs) are very common, especially among PV languages, but they do appear in VP languages, too.</li>
									<li>The QP can be cliticized to the first constituent in the clause, either before or after it.
										<ul>
											<li>Latin:<br />
												<TransTable rows="erat-ne te-cum / he:was-QP you-with">Was he with you?</TransTable>
											</li>
											<li>Mandarin:<br />
												<TransTable rows="tā xihuan chī pǐngguǒ ma / she like eat apple QP">Does she like to eat apples?</TransTable>
											</li>
											<li>Tagalog:<br />
												<TransTable rows="mabait ba si Pilar? / kind QP is Pilar">Is Pilar kind?</TransTable>
											</li>
										</ul>
									</li>
									<li>Often, the QP can be omitted, letting context and intonation do the job instead.</li>
									<li className="newSection">Some varieties of English has developed a QP as an alternative to word order inversion
										<ul>
											<li>"You want to go for a ride, <em>eh</em>?"</li>
										</ul>
									</li>
								</ul>
							</li>
							<li className="newSection"><em>Tag Question</em>:
								<ul>
									<li>This involves a simple declarative statement, followed by a Tag that requests confirmation or disconfirmation of the statement.</li>
									<li>These are universally a secondary way of forming YNQs, though they are often the historical source of the currently-used QPs.</li>
									<li className="newSection">English has Tags for certain times the speaker is assuming they'll get a Yes response:
										<ul>
											<li>"Nice day, <em>isn't it</em>?"</li>
											<li>"You're going to the club with us tonight, <em>right</em>?"</li>
										</ul>
									</li>
								</ul>
							</li>
							<li className="newSection"><strong>Functions</strong>:
								<ul>
									<li>YNQs are used for additional purposes other than simply asking questions in most languages.</li>
									<li className="newSection"><em>To request action</em>: "Could you close the door?"</li>
									<li><em>Rhetorical effect</em>: "Are you always so messy?"</li>
									<li><em>Confirmation</em>: "Aren't you going?"</li>
									<li><em>Intensification</em>: "Did he ever yell!"</li>
								</ul>
							</li>
						</ul>
					</InfoModal>
					<TextItem text="YNQs" rows={4}>How are yes/no questions formed? Do they serve other discourse functions other than the obvious?</TextItem>

					<HeaderItem level="4">9.3.1.2. Questions-Word Questions</HeaderItem>

					<InfoModal title="Question-Word Questions" label="Who? What? Why?">
						<ul>
							<li>Also known as <strong>Content Questions</strong> or <strong>Information Questions</strong>, Question-Word Questions (QWs) are best exemplified by the English words who, whom, what, where, when, why, which, and how.</li>
							<li>All languages have a set of special QWQs. Often, they're similar or identical to a set of pronouns used elsewhere in the language. (e.g. English's who, where, when.)</li>
							<li>QWs accomplish two things:
								<ol>
									<li>Mark the clause as a question.</li>
									<li>Indicate what information is being requested.</li>
								</ol>
							</li>
							<li className="newSection">In VP languages (like English) it is typical for the QW to appear at the start of the clause, possibly leaving a gap in the normal position.
								<ul>
									<li>"Mark gave the cakes to Jimmy." → "Who gave the cakes to Jimmy?" → "Who did Mark give the cakes to?"</li>
								</ul>
							</li>
							<li>Many PV languages leave the QW in the "normal" position, such as Japanese and Tibetan.</li>
							<li>Most PV languages can either leave the QW in position, or it can move to the front.</li>
							<li>Some VP languages allow or require leaving the QW in position, such as Mandarin and many eastern African languages.</li>
							<li className="newSection">QWs can usually take case markers and/or adpositions.</li>
							<li>When the QW from an oblique clause is fronted, the adposition may or may not come with it.
								<ul>
									<li><em>What</em> did you travel <em>with</em>?</li>
									<li><em>With what</em> did you travel?</li>
								</ul>
							</li>
						</ul>
					</InfoModal>
					<TextItem text="QWQs" rows={4}>How are information questions formed?</TextItem>

					<HeaderItem level="4">9.3.2. Imperatives</HeaderItem>

					<InfoModal title="Imperatives" label="Command Sentences">
						<ul>
							<li>Imperatives are direct commands to an addressee.</li>
							<li>It is often not necessary to indicate the Agent (addressee), since the actor is obvious.</li>
							<li>Fewer TAM constructs are typically allowed, since it is pragmatically impossible to perform certain actions (past tense, present progressive, etc).</li>
							<li>Sometimes imperatives take special verb forms or affixes, as in Greenlandic Iñupiat, and/or special negation strategies.</li>
							<li className="newSection">Imperatives are often associated with Irrealis modes (8.3.3)</li>
							<li className="newSection">Sometimes imperatives affect case marking.
								<ul><li>Finnish puts the Patients of imperatives in nominative case instead of accusative case.</li></ul>
							</li>
							<li className="newSection">Different types of imperatives may exist.
								<ul><li>In Panare, the suffix <em>-kë</em> is for plain imperatives, while <em>-ta'</em> is used for imperatives involving motion.</li></ul>
							</li>
							<li className="newSection">First-person imperatives are rare. (e.g. "Let's eat." vs "Come eat with me.")</li>
						</ul>
					</InfoModal>
					<TextItem text="imperatives" rows={4}>How are imperatives formed? Are there "polite" imperatives that contrast with more direct imperatives?</TextItem>

				</IonList>
			</IonContent>
		</IonPage>
	);
};
 

export default Syntax;