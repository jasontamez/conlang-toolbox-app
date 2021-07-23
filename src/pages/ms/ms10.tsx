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
	TextItem
} from './MorphoSyntaxElements';
import { changeView } from '../../components/ReduxDucksFuncs';
import { useDispatch } from "react-redux";

const Syntax = () => {
	const dispatch = useDispatch();
	const viewInfo = ['ms', 'ms10'];
	useIonViewDidEnter(() => {
		dispatch(changeView(viewInfo));
	});
	return (
		<IonPage>
			<SyntaxHeader title="10." />
			<IonContent fullscreen className="evenBackground disappearingHeaderKludgeFix" id="morphoSyntaxPage">
				<IonList lines="none">

					<HeaderItem className="h h1">10.</HeaderItem>
					
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
					<HeaderItem className="h h2">9.1 Focus, Contrast and Topicalization</HeaderItem>

					<InfoModal title="Focus, Contrast, etc." label="This is a long one!">
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

				</IonList>
			</IonContent>
		</IonPage>
	);
};
 

export default Syntax;