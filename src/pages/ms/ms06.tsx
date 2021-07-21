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

const Syntax = (props: any) => {
	const dispatch = useDispatch();
	const viewInfo = ['ms', 'ms06'];
	useIonViewDidEnter(() => {
		dispatch(changeView(viewInfo));
	});
	return (
		<IonPage>
			<SyntaxHeader title="6. Grammatical Relations" />
			<IonContent fullscreen className="evenBackground disappearingHeaderKludgeFix" id="syntaxSketchPage">
				<IonList lines="none">

					<HeaderItem className="h h1">6. Grammatical Relations</HeaderItem>

						<InfoModal title="Alignments" label="Show the Alignments">
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

						<TextItem text="ergative" rows={8}>Does the language use a nominative/accusative alignment, or an ergative/absolutive alignment? Are there any exceptions?</TextItem>

				</IonList>
			</IonContent>
		</IonPage>
	);
};
 
export default Syntax;
