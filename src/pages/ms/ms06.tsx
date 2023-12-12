import React from 'react';
import {
	IonPage,
	IonContent,
	IonList,
	useIonViewDidEnter
} from '@ionic/react';
import { useDispatch, useSelector } from "react-redux";

import { PageData, StateObject } from '../../store/types';
import { setLastViewMS } from '../../store/internalsSlice';

import {
	CheckboxItem,
	HeaderItem,
	InfoModal,
	SyntaxHeader,
	TextItem
} from './MorphoSyntaxElements';

const Syntax = (props: PageData) => {
	const { modalPropsMaker } = props;
	const {
		BOOL_nomAcc,
		BOOL_ergAbs,
		TEXT_ergative
	} = useSelector((state: StateObject) => state.ms);
	const dispatch = useDispatch();
	useIonViewDidEnter(() => {
		dispatch(setLastViewMS("ms06"));
	});
	return (
		<IonPage>
			<SyntaxHeader title="6. Grammatical Relations" {...props} />
			<IonContent fullscreen
				className="evenBackground disappearingHeaderKludgeFix"
				id="morphoSyntaxPage"
			>
				<IonList lines="none" className="hasSpecialLabels">
					<HeaderItem level={1}>6. Grammatical Relations</HeaderItem>
					<InfoModal
						title="Alignments"
						label="Show the Alignments"
						modalPropsMaker={modalPropsMaker}
					>
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
										<ul><li>I pushed <em>him</em>.</li></ul>
									</li>
									<li>S and A are both viewed as agents, having volition</li>
									<li>A tends to stick with the (V)erb, leaving the P floating:
										<ul><li>AVP; PAV; VAP; PVA</li></ul>
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
										<ul><li><em>Me</em> pushed he.</li></ul>
									</li>
									<li>S and P are both viewed as typically being new information, or undergoing change.</li>
									<li>P tends to stick with the (V)erb, leaving the A floating:
										<ul><li>AVP; VPA; APV; PVA</li></ul>
									</li>
									<li className="newSection"><strong>Split Ergativity</strong>:
										<ul>
											<li>In natural languages, ergativity tends to coexist with the nominative/accusative system in a hierarchy, with the latter system used for the higher level. Typical hierarchies:
												<ul>
													<li>1st person &gt; 2nd person &gt; human 3rd-persons &gt; 3rd-person animates &gt; 3rd-person inanimates</li>
													<li>agreement &gt; pronouns/case marking</li>
													<li>definite &gt; indefinite</li>
													<li>non-past tense &gt; past tense</li>
													<li>imperfect aspect &gt; perfect aspect</li>
												</ul>
											</li>
											<li>Below are some examples of real-world hierarchies. N/A is nominative/accusative, E/A is egrgative/absolutive.
												<ul>
													<li>Dyirbal uses N/A for 1st and 2nd person pronouns, E/A for everything else <em>(this is a very common split point)</em></li>
													<li>Cashinahua uses N/A for 1st and 2nd person, separate markings for Agent and Patient in 3rd person, and E/A for everything else</li>
													<li>Managalasi uses N/A for person marking on verbs and E/A for pronouns</li>
													<li>Hindi-Urdu uses N/A markings in the imperfective aspect, but E/A for the arguments of transitive, perfective verbs</li>
													<li>Sinaugoro uses N/A for agreement marking, but E/A for case marking</li>
												</ul>
											</li>
										</ul>
									</li>
								</ul>
							</li>
						</ul>
					</InfoModal>
					<CheckboxItem
						display={{
							class: "cols2",
							boxesPerRow: 1,
							header: "Primary Alignment System",
							rowLabels: ["Nominative / Accusative", "Ergative / Absolutive"],
							export: {
								title: "Primary Alignment System:"
							}
						}}
						boxes={["BOOL_nomAcc", "BOOL_ergAbs"]}
						values={[BOOL_nomAcc, BOOL_ergAbs]}
					/>
					<TextItem
						prop="TEXT_ergative"
						value={TEXT_ergative}
						rows={8}
					>Are there any exceptions to the primary alignment? Do they exist in a hierarchy?</TextItem>
				</IonList>
			</IonContent>
		</IonPage>
	);
};


export default Syntax;
