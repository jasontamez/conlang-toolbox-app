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
			<SyntaxHeader title="10. Clause Combinations" />
			<IonContent fullscreen className="evenBackground disappearingHeaderKludgeFix" id="morphoSyntaxPage">
				<IonList lines="none">

					<HeaderItem className="h h1">10. Clause Combinations</HeaderItem>

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

					<HeaderItem className="h h1">10.1. Serial Verbs</HeaderItem>

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

					<HeaderItem className="h h1">10.2. Complement Clauses</HeaderItem>

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
									<li>Example: [Whether or not aliens exist] is not relavant here.</li>
									<li>They may share formal properties with interrogative clauses and relative clauses.</li>
								</ul>
							</li>
						</ul>
					</InfoModal>
					<TextItem text="complClauses" rows={6}>What kinds of complement clauses does the language have? Are certain complement types more common for certain classes of verbs? Does the language allow Agent complements, or just Patient complements?</TextItem>

					<HeaderItem className="h h1">10.3. Adverbial Clauses</HeaderItem>

					<InfoModal title="Adverbial Clauses" label="Tap This When You're Ready">
						<ul>
							<li></li>
						</ul>
					</InfoModal>
					<TextItem text="advClauses" rows={6}>xxxxxxxxxx</TextItem>

				</IonList>
			</IonContent>
		</IonPage>
	);
};
 

export default Syntax;