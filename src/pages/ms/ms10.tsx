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

					<InfoModal title="Complement Clauses" label="You Complete Me??????">
						<ul>
							<li></li>
						</ul>
					</InfoModal>

				</IonList>
			</IonContent>
		</IonPage>
	);
};
 

export default Syntax;