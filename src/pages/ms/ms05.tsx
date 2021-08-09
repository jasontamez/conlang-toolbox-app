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
	const viewInfo = ['ms', 'ms05'];
	useIonViewDidEnter(() => {
		dispatch(changeView(viewInfo));
	});
	return (
		<IonPage>
			<SyntaxHeader title="5. Predicate Nominals and Related Constructions" />
			<IonContent fullscreen className="evenBackground disappearingHeaderKludgeFix" id="morphoSyntaxPage">
				<IonList lines="none">

					<HeaderItem className="h h1">5. Predicate Nominals and Related Constructions</HeaderItem>

					<InfoModal title="Predicate Nominals" label="General Information to Consider">
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

					<HeaderItem className="h h2">5.1. Predicate Nominals and Adjecives</HeaderItem>

					<InfoModal title="Predicate Nominals and Adjecives" label="What It Is and What It Seems Like">
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
											<li>A <em>copula</em> is a morpheme that "couples" two elements. Often encodes Tense/Aspect (8.3), and can be restricted to certain situations (e.g. only in non-present tenses).</li>
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
					<TextItem text="predNom" rows={6}>Describe the language's strategy for predicate nominals and adjectives.</TextItem>

					<HeaderItem className="h h2">5.2. Predicate Locatives</HeaderItem>

					<InfoModal title="Predicate Locatives" label="Where It Is">
						<ul>
							<li>Many languages use a word that gets translated as "be at".</li>
							<li>The locative word is often the same as a locative adposition.</li>
							<li>Word order usually distinguishes possessive clauses from locational clauses.
								<ul>
									<li>Ex: Steve has a cat (possessive); the cat is behind Steve (locational).</li>
								</ul>
							</li>
							<li className="newSection">English bases locatives on possessive clauses, but with an inanimate possessor.</li>
							<li>Russian bases possessive clauses on locatives, but with an animate possessor.</li>
						</ul>
					</InfoModal>
					<TextItem text="predLoc" rows={6}>How does the language handle predicate locatives?</TextItem>

					<HeaderItem className="h h2">5.3. Existentials</HeaderItem>

					<InfoModal title="Existentials" label="These Exist">
						<ul>
							<li>These constructions usually serve a presentative function, introducing new participants.</li>
							<li>Usually, the nominal is indefinite: Consider "There are lions in Africa" (valid) vs. "There are the lions in Africa" (invalid).</li>
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
					<TextItem text="predEx" rows={6}>How are existential clauses formed? Does this vary according to tense, aspect or mood? Is there a special negation strategy? Is this form used to impart other information (such as possessives) as well?</TextItem>

					<HeaderItem className="h h2">5.4. Possessive Clauses</HeaderItem>

					<InfoModal title="Possessive Clauses">
						<ul>
							<li>These follow two main strategies:
								<ul>
									<li>Verb strategy: "I have a book."</li>
									<li>Copula strategy: "The book is at me."</li>
								</ul>
							</li>
						</ul>
					</InfoModal>
					<TextItem text="predEx" rows={3}>Does the language use a verb or copula strategy?</TextItem>

				</IonList>
			</IonContent>
		</IonPage>
	);
};
 
export default Syntax;
