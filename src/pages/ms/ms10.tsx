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
	const viewInfo = { key: "ms" as keyof ViewState, page: "ms10" };
	useIonViewDidEnter(() => {
		dispatch(saveView(viewInfo));
	});
	return (
		<IonPage>
			<SyntaxHeader title="10. Clause Combinations" {...props} />
			<IonContent fullscreen className="evenBackground disappearingHeaderKludgeFix" id="morphoSyntaxPage">
				<IonList lines="none" className="hasSpecialLabels">
					{parseMSJSON({page: "s10", ...props})}
				</IonList>
			</IonContent>
		</IonPage>
	);
};

/*
const OldSyntax = () => {
	const dispatch = useDispatch();
	const viewInfo = { key: "ms" as keyof ViewState, page: "ms10" };
	useIonViewDidEnter(() => {
		dispatch(changeView(viewInfo));
	});
	return (
		<IonPage>
			<SyntaxHeader title="10. Clause Combinations" />
			<IonContent fullscreen className="evenBackground disappearingHeaderKludgeFix" id="morphoSyntaxPage">
				<IonList lines="none">

					<HeaderItem level="1">10. Clause Combinations</HeaderItem>

					<InfoModal title="Terms" label="Quick Primer on Clauses">
						<ul>
							<li>An <strong>Independant Clause</strong> is one that is fully inflected and can stand on its own.</li>
							<li>A <strong>Dependant Clause</strong> depends on some other clause for at least a part of its inflectional information.</li>
							<li className="newSection">"The gull beat its wings, achieving liftoff easily."
								<ul>
									<li><em>The gull beat its wings</em> is Independant.</li>
									<li><em>Achieving liftoff easily</em> is Dependant.</li>
								</ul>
							</li>
							<li className="newSection">"Breathing heavily, the runner crossed the finish line."
								<ul>
									<li><em>The runner crossed the finish line</em> is Independant.</li>
									<li><em>Breathing heavily</em> is Dependant.</li>
								</ul>
							</li>
						</ul>
					</InfoModal>

					<HeaderItem level="1">10.1. Serial Verbs</HeaderItem>

					<InfoModal title="Serial Verbs" label="Go Tap on This">
						<ul>
							<li><strong>Serial Verbs</strong> are two or more verb roots that aren't compounded (8.2) or members of different clauses.</li>
							<li>These occur in all sorts of languages, but may be more common in isolating languages (1.1).</li>
							<li>English marginally employs serial verbs, e.g. "Run go get me a coffee" having three in a row.</li>
							<li className="newSection">Typically, verbs in a series will each express a facet of one complex event.
								<ul><li>For example, the English word "bring" has a facet "get something" and another that's "move towards place". In a language like Yoruba, this is expressed with serial verbs:
									<ul><li>"mo mú ìwé wá ilé" / I take book come house - "I brought a book home"</li></ul>
								</li></ul>
							</li>
							<li className="newSection">In general, serial verbs tend to follow these patterns:
								<ul>
									<li>TAM information is carried by the first verb.
										<ul><li>However, some languages mandate that at least some inflectional information gets carried by the second verb.</li></ul>
									</li>
									<li>If a constituent of the second verb is clefted, it moves to the front of the entire construction.
										<ul><li>Youruba: "ilé ni mo mú ìwé wá" / house is I take book come - "It was to the house that I brought a book"</li></ul>
									</li>
									<li>They can get ambiguous out of context.
										<ul>
											<li>Thai: "John khàp rót chon kwaay taay" / John drive car collide buffalo die</li>
											<li>The above means "John drove the car into the buffalo and [any one of those three] died." Only context can make it clear that John, the buffalo or the car died.</li></ul>
									</li>
								</ul>
							</li>
							<li className="newSection">Verbs of motion are often used in serial constructions to express TAM information.
								<ul>
									<li>"Go" is used in this way so much that it often becomes a marker for future tense, as in English and Spanish.
										<ul><li>"I'm going to finish this sandwich."</li></ul>
									</li>
									<li>Tibetan uses motion verbs in serial to provide directional information for the other verb.</li>
								</ul>
							</li>
							<li className="newSection">Verbs in serial will sometimes turn into other role markers.
								<ul>
									<li>Yoruba: "give" can mark a Recipient role.</li>
									<li>Efik: "give" has become a benefactive preposition.</li>
									<li>Sùpyìré: "use" has become a postpositional marker for an Instrumental role.</li>
								</ul>
							</li>
						</ul>
					</InfoModal>
					<TextItem text="serialVerbs" rows={4}>Does the language have serial verbs? What verbs are more likely to appear in serial constructions? Are any on the way to becoming auxilliaries or adpositions?</TextItem>

					<HeaderItem level="1">10.2. Complement Clauses</HeaderItem>

					<InfoModal title="Complement Clauses" label="Enter The Matrix">
						<ul>
							<li>A <strong>Complement Clause</strong> (or Embedded Clause) functions as an argument to another clause.</li>
							<li>A <strong>Matrix Clause</strong> (or Main Clause) has a Complement Clause as an argument.</li>
							<li className="newSection">Complements can be in the Agent or Patient role. They are marked with [brackets] below:
								<ul>
									<li><em>Agent</em>: [That he survived] was unexpected.
										<ul><li>English typically postposes an Agent Complement Clause and uses a dummy "It": <em>[It] was unexpected [that he survived].</em></li></ul>
									</li>
									<li><em>Patient</em>: He wants [to have a drink].</li>
								</ul>
							</li>
							<li>A Matrix Clause can be a Complement Clause to another Matrix Clause:
								<ul><li>Mulder wants [to believe [that aliens are real]].</li></ul>
							</li>
							<li className="newSection">Complement Clauses run in a continuum from <strong>finite clauses</strong> to <strong>non-finite clauses</strong>.
								<ul>
									<li><em>Finite</em>: [That he would be handsome] could not have been anticipated.
										<ul>
											<li>The complement can stand alone as a complete sentence (minus the marker "That").</li>
											<li>It can have completely different TAM markers than the maxtrix clause.</li>
											<li>The matrix verb will likely be an utterance verb or a verb of cognition.</li>
										</ul>
									</li>
									<li><em>Non-finite</em>: It's very easy [to make a sandwich].
										<ul>
											<li>The subject of the clause will almost always be the subject of the matrix clause.</li>
											<li>TAM markers are absent or highly constrained.</li>
											<li>The verb in the clause will likely be non-finite.</li>
										</ul>
									</li>
								</ul>
							</li>
							<li className="newSection"><strong>Indirect Questions</strong> are a subset of Complement Clauses.
								<ul>
									<li>Example: [Whether Mr. Wayne lied] is not relavant here.</li>
									<li>They may share formal properties with interrogative clauses and relative clauses.</li>
								</ul>
							</li>
						</ul>
					</InfoModal>
					<TextItem text="complClauses" rows={6}>What kinds of complement clauses does the language have? Are certain complement types more common for certain classes of verbs? Does the language allow Agent complements, or just Patient complements?</TextItem>

					<HeaderItem level="1">10.3. Adverbial Clauses</HeaderItem>

					<InfoModal title="Adverbial Clauses" label="Tap This When You're Ready">
						<ul>
							<li>Also called <em>Adjuncts</em>, <strong>Adverbial Clauses</strong> behave as adverbs.</li>
							<li>They can convey certain kinds of information:
								<ul>
									<li><em>Time</em>:
										<ul>
											<li>"We will go [when he gets here]."</li>
										</ul>
									</li>
									<li><em>Location</em>:
										<ul>
											<li>"I will meet you [where the old oak tree used to stand]."</li>
										</ul>
									</li>
									<li><em>Manner</em>:
										<ul>
											<li>"He talks [like a 3-year-old]."</li>
											<li>"He walks [as a mummy would shamble]."</li>
										</ul>
									</li>
									<li><em>Purpose</em>:
										<ul>
											<li>"He stands on tiptoes [in order to see better]."</li>
										</ul>
									</li>
									<li><em>Reason</em>:
										<ul>
											<li>"He arrived early [because he wanted a good seat]."</li>
										</ul>
									</li>
									<li><em>Circumstantial</em> adverbial clauses are rare:
										<ul>
											<li>"He got into the army [by lying about his age]."</li>
										</ul>
									</li>
									<li><em>Simultaneous</em>:
										<ul>
											<li>"He woke up [crying]."</li>
											<li>"She woke up [in a cold sweat]".</li>
										</ul>
									</li>
									<li><em>Conditional</em>:
										<ul>
											<li>"[If it's raining outside], then my car is getting wet."</li>
										</ul>
									</li>
									<li><em>Negative Conditional</em>:
										<ul>
											<li>"[Unless it rains], we will be having a picnic."</li>
										</ul>
									</li>
									<li><em>Concessive Clause</em>:
										<ul>
											<li>"[Even though the band sucks], she agreed to go to the concert."</li>
										</ul>
									</li>
									<li><em>Substitutive</em>:
										<ul>
											<li>"[Instead of barbecuing chicken], we went out to eat."</li>
										</ul>
									</li>
									<li><em>Additive</em>:
										<ul>
											<li>"You must have your hand stamped [in addition to having your ticket]."</li>
										</ul>
									</li>
									<li><em>Absolutive</em>:
										<ul>
											<li>"[Seeing a bully], Billy hid behind a curtain."</li>
										</ul>
									</li>
								</ul>
							</li>
						</ul>
					</InfoModal>
					<TextItem text="advClauses" rows={6}>How are adverbial clauses formed? What kinds are there? Can they occur in more than one place in a clause?</TextItem>

					<HeaderItem level="1">10.4. Clause Chaining, Medial Clauses, and Switch References</HeaderItem>

					<InfoModal title="Clause Chaining, Medial Clauses, and Switch References" label="Chain Chain Chain...">
						<ul>
							<li><strong>Clause Chains</strong> are clauses presented in series. They can form a large part of discourse in many languages, such as the ones of New Guinea, Australia, and the Americas.
								<ul>
									<li>Typially, the last clause in the chain will have inflections for Tense and Aspect.</li>
									<li>Panare and a minority of languages switch this up, giving the inflections to the first clause.</li>
									<li><strong>Medial clauses</strong> occur before the <strong>Final clause</strong>.
										<ul>
											<li>They tend to have a reduce range of Tense/Aspect possibilities.</li>
											<li>Their subject is referenced in terms of subject of the final clause.</li>
											<li>Their placement represents temporal relations such as overlapping or in succession.</li>
										</ul>
									</li>
								</ul>
							</li>
							<li className="newSection"><strong>Switch References</strong> are verbal inflections that indicate the subject of a verb is the same as the subject of another verb.
								<ul>
									<li>Yuman uses <em>-k</em> to indicate the next verb uses the same subject (SS) as this one, and <em>-m</em> to indicate the next verb will have a different subject (DS).
										<ul>
											<li>"I sang and danced"<br />
												<TransTable rows="Nyaa '-ashvar-k '-iima-k / I 1-sing-SS 1-dance-ASPECT" />
											</li>
											<li>"Bonnie sang and I danced"<br />
												<TransTable rows="Bonnie-sh 0-ashvar-m '-iima-k / Bon&shy;nie-SUBJ 3-sing-DS 1-dance-ASPECT" />
											</li>
										</ul>
									</li>
									<li className="newSection">Ergative languages often have complex Switch Reference systems that indicate the temporal relations of the clauses, whether or not the verbs' subjects agree, and strongly indicate a reason why the clauses are linked.
										<ul>
											<li>Panare: Suffix / Temporal / Agreement / Linkage<br />
												<ul>
													<li>-séjpe / succession / Actor = Actor / purpose</li>
													<li>-séñape / succession / Absolutive = Patient / result</li>
													<li>-ñére / succession / Actors are different / movement or purpose</li>
													<li>-npan / overlap / Actor = Actor / none</li>
													<li>-tááñe / overlap / Actor = Actor / none</li>
													<li>-jpómën / anteriority / Actor = Actor / reason</li>
												</ul>
											</li>
										</ul>
									</li>
								</ul>
							</li>
						</ul>
					</InfoModal>
					<IonItem className="content">
						<IonGrid className="cols2">
							<IonRow className="header">
								<IonCol>Which Clause is Inflected?</IonCol>
							</IonRow>
							<IonRow>
								<IonCol className="cbox"><RadioBox prop="chainFirst" /></IonCol>
								<IonCol>First</IonCol>
							</IonRow>
							<IonRow>
								<IonCol className="cbox"><RadioBox prop="chainLast" /></IonCol>
								<IonCol>Last</IonCol>
							</IonRow>
						</IonGrid>
					</IonItem>
					<IonItem className="content">
						<IonGrid className="cols2">
							<IonRow className="header">
								<IonCol>Which Element is Marked?</IonCol>
							</IonRow>
							<IonRow>
								<IonCol className="cbox"><RadioBox prop="chainN" /></IonCol>
								<IonCol>Noun</IonCol>
							</IonRow>
							<IonRow>
								<IonCol className="cbox"><RadioBox prop="chainV" /></IonCol>
								<IonCol>Verb</IonCol>
							</IonRow>
							<IonRow>
								<IonCol className="cbox"><RadioBox prop="chainCj" /></IonCol>
								<IonCol>Conjunction</IonCol>
							</IonRow>
						</IonGrid>
					</IonItem>
					<IonItem className="content">
						<IonGrid className="cols2">
							<IonRow className="header">
								<IonCol>What Other Information Does the Marker Encode?</IonCol>
							</IonRow>
							<IonRow>
								<IonCol className="cbox"><RadioBox prop="chainT" /></IonCol>
								<IonCol>Tense</IonCol>
							</IonRow>
							<IonRow>
								<IonCol className="cbox"><RadioBox prop="chainA" /></IonCol>
								<IonCol>Aspect</IonCol>
							</IonRow>
							<IonRow>
								<IonCol className="cbox"><RadioBox prop="chainPer" /></IonCol>
								<IonCol>Person</IonCol>
							</IonRow>
							<IonRow>
								<IonCol className="cbox"><RadioBox prop="chainNum" /></IonCol>
								<IonCol>Number</IonCol>
							</IonRow>
							<IonRow>
								<IonCol className="cbox"><RadioBox prop="chainOther" /></IonCol>
								<IonCol>Other</IonCol>
							</IonRow>
						</IonGrid>
					</IonItem>
					<TextItem text="clauseChainEtc" rows={6}>Is the coreference always the Subject, or can the Agent, Patient, or other nominals be referred to? Do the markers convey other information, like person, number, tense, aspect, and/or semantics? Can a clause be inflected for the person/number of another clause?</TextItem>

					<HeaderItem level="1">10.5. Relative Clauses</HeaderItem>

					<InfoModal title="Relative Clauses" label="Clauses as Adjectives">
						<ul>
							<li>A <strong>Relative Clause</strong> is a clause that functions as a nominal modifier. They can be identified by four points.
								<ul>
									<li>Example: "The fumes that made Chris faint."
										<ol>
											<li><em>Head</em>: The noun phrase modified by the clause (fumes)</li>
											<li><em>Restricting Clause</em>: The relative clause itself (made Chris faint)</li>
											<li><em>Relativized Noun Phrase</em>: The part of the Restricting Clause that refers to the Head (English uses a Gap Strategy, explained below)</li>
											<li><em>Relativizer</em>: Morpheme or particle that sets off the relative clause (that)</li>
										</ol>
									</li>
								</ul>
							</li>
							<li className="newSection">Relative Clauses (RCs) are usually positioned in the same place as other nominal modifiers, but there is a strong tendency towards placing them postnomial, even if other modifiers fall before the noun phrase.
								<ul>
									<li><em>Prenomial</em>: before the Head</li>
									<li><em>Postnomial</em>: after the Head (most common, especially in VP languages)</li>
									<li><em>Internally headed</em>: the Head is placed within the relative clause
										<ul>
											<li>This is common in PV languages, such as Bambara:<br />
												<TransTable rows="ne ye so ye / 1s PST horse see">"I saw a horse"</TransTable>
												<TransTable rows="ce ye [ne ye so min ye] san / man PST 1s PST horse REL see buy">"The man bought the horse that I saw"</TransTable>
											</li>
										</ul>
									</li>
									<li><em>Headless</em>: the clause itself refers to the Head
										<ul>
											<li>This is common in languages that use nouns to modify other nouns, such as Ndjuká:
												<ul>
													<li>Non-specific subject:<br />
														<TransTable rows="[Di o doo fosi] o wini / REL FUT arrive first FUT win">"Whoever arrives first will win"</TransTable>
													</li>
													<li>Specific subject:<br />
														<TransTable rows="A mainsí ya a [di e tan a ini se] / the eel here COP REL CONT stay LOC in&shy;side sea">"The eel is what (the one that) lives in the sea"</TransTable>
													</li>
												</ul>
											</li>
											<li>But it can happen in other languages, such as English:
												<ul>
													<li>Headless RC: [That which John said] annoyed her. (Something specific he said annoyed her)</li>
													<li>Complementary Clause: [That John said anything] annoyed her. (The action itself annoyed her)</li>
												</ul>
											</li>
											<li>In many languages, headless construction is allowed when the head noun is nonspecific.
												<ul><li>[Whenever I'm afraid] I call her. (Refers to a time that is not specified otherwise)</li></ul>
											</li>
										</ul>
									</li>
								</ul>
							</li>
							<li className="newSection">The Relativized Noun Phrase (RNP) can be expressed in different ways.
								<ul>
									<li><strong>Gap Strategy</strong>: the RNP is represented by a "gap" in the phrase, a missing space (0) where logically some argument would normally go.
										<ul>
											<li>English uses this:
												<ul>
													<li>Example: The man [that I loved 0] died.</li>
													<li>Full noun phrase: [I loved the man]</li>
												</ul>
											</li>
											<li>This is a useful strategy when the semantic role of the Head is different in the RC:
												<ul>
													<li>The alligator [that 0 saw me] ate Alice.</li>
													<li>The alligator [that I saw 0] ate Alice.</li>
												</ul>
											</li>
											<li>However, this can become ambiguous if the constituent order changes often, or when the A and P are next to each other in normal discourse:
												<ul>
													<li>Ithsmus Zapotee is a VAP language.<br />
														<TransTable rows="junaa ni [najii 0__Juan] / junaa ni [najii Juan__0] / woman REL loves John">This could be either "A woman that loves John" (top) or "A woman that Jon loves".</TransTable>
													</li>
												</ul>
											</li>
										</ul>
									</li>
									<li><strong>Pronoun Retention</strong>: a pronoun is retained to indicate grammatical role.
										<ul>
											<li>Typically, the pronoun is similar to other pronouns, either question words or pronouns used for non-specific, indefinite things.
												<ul><li>Example: That's the guy who [I can never remember <em>his</em> name]</li></ul>
											</li>
										</ul>
									</li>
									<li className="newSection">The Relativizer may be marked to show the NPR's role.
										<ul>
											<li>Chickasaw:<br />
												<TransTable rows="
													ihoo yamma-ay ofi' pĩs-tokat illi-tok
													/ woman that-SUB dog see-PST:DEP:SS die-PST
												">"The woman that saw the dog died"</TransTable>
												<br />
												<TransTable rows="
													ihoo-at ofi' yamma pĩs-tokã illi-tok
													/ woman-SUB dog that see-PST:DEP:DS die-PST
												">"The woman that the dog saw died"</TransTable>
											</li>
										</ul>
									</li>
								</ul>
							</li>
							<li className="newSection">Relativization Hierarchy:
								<ul>
									<li>Subject</li>
									<li>Direct Object</li>
									<li>Indirect Object</li>
									<li>Oblique</li>
									<li>Possessor</li>
								</ul>
							</li>
							<li>No language (that uses the above grammatical roles) allows relativization of an element, using a single strategy, without also allowing relativizing of the elements above it in the hierarchy. Other elements may have other relativization strategies. For example, English uses the Gap Strategy down through the Obliques, but it doesn't apply to the Possessors:
								<ul>
									<li><em>Subject</em>: I hate the guy that [0 dumped her].</li>
									<li><em>Direct Object</em>: I hate the guy that [she dated 0].</li>
									<li><em>Indirect Object</em>: I hate the guy that [she gave her heart to 0].</li>
									<li><em>Oblique</em>: I hate the guy that [she lived with 0].</li>
									<li><em>Oblique</em>: I hate the guy that [she is older than 0].</li>
									<li><em>Possessor</em>: <del>I hate the guy that [0 head is bald].</del>
										<ul>
											<li>This is not valid English. Another strategy has to be used: "I hate the guy [whose head is bald]."</li>
										</ul>
									</li>
								</ul>
							</li>
						</ul>
					</InfoModal>
					<IonItem className="content">
						<IonGrid className="cols2">
							<IonRow className="header">
								<IonCol>Types of Relative Clauses</IonCol>
							</IonRow>
							<IonRow>
								<IonCol className="cbox"><RadioBox prop="relPre" /></IonCol>
								<IonCol>Prenomial</IonCol>
							</IonRow>
							<IonRow>
								<IonCol className="cbox"><RadioBox prop="relPost" /></IonCol>
								<IonCol>Postnomial</IonCol>
							</IonRow>
							<IonRow>
								<IonCol className="cbox"><RadioBox prop="relInternal" /></IonCol>
								<IonCol>Internally Headed</IonCol>
							</IonRow>
							<IonRow>
								<IonCol className="cbox"><RadioBox prop="relHeadless" /></IonCol>
								<IonCol>Headless</IonCol>
							</IonRow>
						</IonGrid>
					</IonItem>
					<TextItem text="relClauses" rows={6}>Note what strategies are used in Relativizing Clauses, and where they fit on the hierarchy (if it applies).</TextItem>

					<HeaderItem level="1">10.6. Coordinating Clauses</HeaderItem>

					<InfoModal title="Coordinating Clauses" label="This And That">
						<ul>
							<li><strong>Coordinating Clauses</strong> are linked together, equal in grammatical status. They may be difficult to distinguish from juxtaposition.</li>
							<li>They often use methods identical to those used to join noun phrases:
								<ul>
									<li>John <em>and</em> Mary</li>
									<li>John cried <em>and</em> Mary laughed.</li>
								</ul>
							</li>
							<li>It's also common for special strategies to exist that do not work for noun phrases:
								<ul>
									<li>John cried <em>but</em> Mary laughed.</li>
								</ul>
							</li>
							<li className="newSection">CCs often express <strong>Coordination</strong> (x and y, neither x nor y), <strong>Disjunction</strong> (either x or y), and <strong>Exclusion</strong> (x and not y).</li>
							<li className="newSection">The <strong>Zero Strategy</strong> looks just like juxtaposition. Vietnamese:
								<ul>
									<li><em>Noun Phrases</em>:<br />
										<TransTable rows="Nháng tiráp [tilêt, callóh, acóq] / we pre&shy;pare bas&shy;ket spear knife">We prepared the basket, the spear and the knife.</TransTable>
									</li>
									<li><em>Prepositional Phrases</em>:<br />
										<TransTable rows="Do chô [tôq cyâq, tôq apây] / she re&shy;turn to hus&shy;band to grand&shy;moth&shy;er">She returned to her husband and to her grandmother.</TransTable>
									</li>
									<li><em>Verb Phrases</em>:<br />
										<TransTable rows="Do [chô tôq cayâq, chô tôq apây] / she re&shy;turn to hus&shy;band re&shy;turn to grand&shy;moth&shy;er">She returned to her husband and returned to her grandmother.</TransTable>
									</li>
								</ul>
							</li>
							<li className="newSection"><strong>Coordinating Conjunctions</strong> (CCs) are a common strategy.
								<li>The conjunction is often the same as "with". English uses "and" and "but", among others.</li>
								<li>In VP languages:
									<ul>
										<li>The CC is usually between the two clauses:
											<ul><li>The dog growled <em>and</em> the cat hissed.</li></ul>
										</li>
										<li>But sometimes, the CC comes after the first element of the second clause.
											<ul>
												<li>Yoruba:<br />
													<TransTable rows="mo mú ìwé; mo sì w's ilé / I take book I and come house">I took a book and I came home.</TransTable>
												</li>
											</ul>
										</li>
									</ul>
								</li>
								<li>In PV languages, the CC either comes between the two clauses (Farsi) or after the last element (Walapai).</li>
							</li>
						</ul>
					</InfoModal>
					<IonItem className="content">
						<IonGrid className="cols2">
							<IonRow className="header">
								<IonCol>Coordinating Conjunction Positions</IonCol>
							</IonRow>
							<IonRow>
								<IonCol className="cbox"><RadioBox prop="coordMid" /></IonCol>
								<IonCol>Between the clauses</IonCol>
							</IonRow>
							<IonRow>
								<IonCol className="cbox"><RadioBox prop="coordTwo" /></IonCol>
								<IonCol>After the first element of the second clause</IonCol>
							</IonRow>
							<IonRow>
								<IonCol className="cbox"><RadioBox prop="coordLast" /></IonCol>
								<IonCol>After the last element</IonCol>
							</IonRow>
						</IonGrid>
					</IonItem>
					<TextItem text="coords" rows={6}>Describe how Conjunction, Disjunction and Exclusion are expressed in the language.</TextItem>

				</IonList>
			</IonContent>
		</IonPage>
	);
};
*/

export default Syntax;