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
	TextItem,
	TransTable
} from './MorphoSyntaxElements';
import { changeView } from '../../components/ReduxDucksFuncs';
import { useDispatch } from "react-redux";

const Syntax = () => {
	const dispatch = useDispatch();
	const viewInfo = ['ms', 'ms07'];
	useIonViewDidEnter(() => {
		dispatch(changeView(viewInfo));
	});
	return (
		<IonPage>
			<SyntaxHeader title="7. Voice and Valence Adjusting Operations" />
			<IonContent fullscreen className="evenBackground disappearingHeaderKludgeFix" id="morphoSyntaxPage">
				<IonList lines="none">

					<HeaderItem className="h h1">7. Voice and Valence Adjusting Operations</HeaderItem>

					<InfoModal title="Valence" label="What is Valence?">
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
					<HeaderItem className="h h2">7.1. Valence-Increasing Operations</HeaderItem>

					<HeaderItem className="h">7.1.1. Causatives</HeaderItem>

					<InfoModal title="Causatives" label="Forcing You to Read This">
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
													<li>Ex: "Steve asked that <em>he</em> leave" gives Steve less control over the situation than "Steve asked <em>him</em> to leave".</li>
												</ul>
											</li>
										</ul>
									</li>
								</ul>
							</li>
						</ul>
					</InfoModal>
					<TextItem text="causation" rows={4}>Describe which method(s) the language uses to create causatives.</TextItem>

					<HeaderItem className="h">7.1.2. Applicatives</HeaderItem>

					<InfoModal title="Applicatives" label="Adding a Third Participant">
						<ul>
							<li>The verb is marked for the role of a direct object, bringing a peripheral participant (the applied object) on stage in a more central role.
								<ul>
									<li>This may turn a transitive verb ditransitive, or it may replace the direct object entirely (which technically isn't valence-increasing!)<br />
										<span><br />"I arrived at Shionti's" in Nomatsiguenga.</span>
										<TransTable rows="
											n-areeka Sionti-ke
											/ I-arrive Shionti-LOC__(valence:__1)
											/ n-areeka-re Sionti
											/ I-arrive-him Shionti__(valence:__2)
										" />
									</li>
								</ul>
							</li>
						</ul>
					</InfoModal>
					<TextItem text="applicatives" rows={4}>Describe which method(s) the language uses for applicatives, if any.</TextItem>

					<HeaderItem className="h">7.1.3. Dative Shift</HeaderItem>

					<InfoModal title="Dative Shift" label="Looking Shifty">
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
					<TextItem text="dativeShifts" rows={4}>Is there a dative shift construction in the language? What is it? What semantic roles can be shifted? Is it obligatory?</TextItem>

					<HeaderItem className="h">7.1.4. Dative of Interest</HeaderItem>

					<InfoModal title="Dative of Interest" label="Pique Your Interest">
						<ul>
							<li>This is adding a participant that is associated in some way.
								<ul>
									<li>"Dinner is burned [for me]" in Spanish<br />
										<TransTable rows="Se me quemó la cena. / REFL 1s burn.3s.PST DEF.f.s din&shy;ner" />
									</li>
									<li>"She cut the hair [on him]" in Spanish.<br />
										<TransTable rows="Le cortó el pelo. / 3.DAT cut.3s.PST DEF.M.s hair" />
									</li>
								</ul>
							</li>
						</ul>
					</InfoModal>
					<TextItem text="datOfInt" rows={4}>Is there a dative-of-interest operation?</TextItem>

					<HeaderItem className="h">7.1.5. Possessor Raising (a.k.a. External Possession)</HeaderItem>

					<InfoModal title="Possessor Raising" label="What is This?">
						<ul>
							<li>In many languages, this exists separate from a dative of interest.
								<ul>
									<li>"I fixed the railroad track" in Choctaw.<br />
										<TransTable rows="
											Tali i-hina-ya ayska-li-tok
											/ rock AGR(III)-road-NS fix-1s-PST__(nor&shy;mal__con&shy;struc&shy;tion)
											/ Tali-ya hina im-ayska-li-tok
											/ rock-NS road AGR(III)-fix-1s-PST__(pos&shy;ses&shy;sor__raised)
										" />
									</li>
								</ul>
							</li>
						</ul>
					</InfoModal>
					<TextItem text="possessRaising" rows={4}>Does possessor raising occur?</TextItem>

					<HeaderItem className="h h2">7.2. Valence-Decreasing Operations</HeaderItem>

					<HeaderItem className="h h3">7.2.1. Reflexives</HeaderItem>

					<InfoModal title="Reflexives" label="You Are Me?">
						<ul>
							<li>The Agent and Patient are the same, so one is omitted.</li>
							<li className="newSection">Lexical reflexives:
								<ul>
									<li>The verb itself implies reflexivity.
										<ul>
											<li>e.g.: Steve washed and shaved every morning.</li>
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
					<TextItem text="refls" rows={4}>How are reflexives handled?</TextItem>

					<HeaderItem className="h h3">7.2.2. Reciprocals</HeaderItem>

					<InfoModal title="Reciprocals" label="Working Together">
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
					<TextItem text="recips" rows={3}>How are reciprocals handled?</TextItem>

					<HeaderItem className="h h3">7.2.3. Passives</HeaderItem>

					<InfoModal title="Passives" label="Moving Focus From the Agent">
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
							<li className="newSection">Passive construction may be obligatory in a particular environment, e.g. when the Patient outranks the Agent.</li>
						</ul>
					</InfoModal>
					<TextItem text="passives" rows={4}>How are passives handled?</TextItem>

					<HeaderItem className="h h3">7.2.4. Inverses</HeaderItem>

					<InfoModal title="Inverses" label="Playing The Reverse Card">
						<ul>
							<li>This is a valence "rearranging" device, e.g. "Steve taught him" becomes "Him, Steve taught."</li>
							<li>Often follows a hierarchy where a "higher" Agent requires direct and a "lower" Agent requires the inverse.</li>
						</ul>
					</InfoModal>
					<IonItem className="content">
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
					<TextItem text="inverses" rows={4}>Describe any pecularities of inverse constructions.</TextItem>

					<HeaderItem className="h h3">7.2.5. Middle Constructions</HeaderItem>

					<InfoModal title="Middle Constructions" label="What Are These?">
						<ul>
							<li>Also known as anticausatives or detransitivation: a semantically transitive situation expressed as a process undergone by a Patient (rather than carried out by an Agent).</li>
							<li>Many languages express this the same way as they express passives.</li>
							<li>This often express the notion that the subject is both controller and affected.
								<ul><li>e.g. "Steve broke the car" becomes "The car broke" (and it was no fault of Steve's).</li></ul>
							</li>
						</ul>
					</InfoModal>
					<TextItem text="middleCon" rows={3}>How are middle constructions handled?</TextItem>

					<HeaderItem className="h h3">7.2.6. Antipassives</HeaderItem>

					<InfoModal title="Antipassives" label="What Are These?">
						<ul>
							<li>Similar to passives, but the Patient is downgraded instead of the Agent.</li>
							<li>Generally, this only happens in ergative languages or in languages without verbal agreement, but many exceptions exist.</li>
							<li>Often, the Patient is omitted or oblique, the verb is marked intrasitive, and the Agent is placed in absolutive case.</li>
						</ul>
					</InfoModal>
					<TextItem text="antiP" rows={3}>Describe antipassive strategies in the language, if they exist.</TextItem>

					<HeaderItem className="h h3">7.2.7. Object Demotion/Omission/Incorporation</HeaderItem>

					<InfoModal title="Object Demotion and Related Functions" label="What Are These?">
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
					<TextItem text="objDemOmInc" rows={5}>Is object demotion/omission allowed? How about incorporation?</TextItem>

				</IonList>
			</IonContent>
		</IonPage>
	);
};
 
export default Syntax;
