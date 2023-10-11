import React from 'react';
import {
	IonPage,
	IonContent,
	IonList,
	useIonViewDidEnter
} from '@ionic/react';
import { useDispatch, useSelector } from "react-redux";

import { ViewState, PageData, StateObject } from '../../store/types';
import { saveView } from '../../store/viewSlice';

import {
	CheckboxItem,
	HeaderItem,
	InfoModal,
	SyntaxHeader,
	TextItem,
	TransTable
} from './MorphoSyntaxElements';

const Syntax = (props: PageData) => {
	const { modalPropsMaker } = props;
	const {
		BOOL_numSing,
		BOOL_numDual,
		BOOL_numTrial,
		BOOL_numPaucal,
		BOOL_numPlural,
		BOOL_classGen,
		BOOL_classAnim,
		BOOL_classShape,
		BOOL_classFunction,
		BOOL_classOther,
		BOOL_dimAugYes,
		BOOL_dimAugObligatory,
		BOOL_dimAugProductive,
		TEXT_compounding,
		TEXT_denoms,
		TEXT_nNumberOpt,
		TEXT_nNumberObl,
		TEXT_nCase,
		TEXT_articles,
		TEXT_demonstratives,
		TEXT_possessors,
		TEXT_classGender,
		TEXT_dimAug
	} = useSelector((state: StateObject) => state.ms);
	const dispatch = useDispatch();
	const viewInfo = { key: "ms" as keyof ViewState, page: "ms04" };
	useIonViewDidEnter(() => {
		dispatch(saveView(viewInfo));
	});
	return (
		<IonPage>
			<SyntaxHeader
				title="4. Noun and Noun Phrase Operations"
				{...props}
			/>
			<IonContent fullscreen
				className="evenBackground disappearingHeaderKludgeFix"
				id="morphoSyntaxPage"
			>
				<IonList lines="none" className="hasSpecialLabels">
					<HeaderItem level={1}>4. Noun and Noun Phrase Operations</HeaderItem>
					<HeaderItem level={2}>4.1. Compounding</HeaderItem>
					<InfoModal
						title="Compounding"
						label="Noun-Piles"
						modalPropsMaker={modalPropsMaker}
					>
						<ul>
							<li>When two nouns are combined into one, several changes may occur.
								<ul>
									<li>Stress pattern change, e.g. "<em>black</em>bird" vs "black <em>bird</em>".</li>
									<li>Unusual word order, e.g. "housekeeper" vs "keeper of the house".</li>
									<li>Morphology specific to compounds, e.g. "can-opener" does not imply the existence of a verb "to can-open".</li>
									<li>A resulting meaning that is either more specific than its components (e.g. "windshield" vs. "wind" or "shield") or altogether different (e.g. "heaven-breath" means "weather" in Mandarin).</li>
								</ul>
							</li>
						</ul>
					</InfoModal>
					<TextItem
						prop="TEXT_compounding"
						value={TEXT_compounding}
						rows={4}
					>Describe the sorts of compounding that happen in the language (if any).</TextItem>
					<HeaderItem level={2}>4.2. Denominalization</HeaderItem>
					<InfoModal
						title="Denominalization"
						label="Verbing a Noun"
						modalPropsMaker={modalPropsMaker}
					>
						<ul>
							<li>Some languages have many ways of changing a noun into a non-noun.
								<ul>
									<li>English can append <em>-like</em> to make an adjective.</li>
									<li>Eskimo has many verbalizing forms, e.g. to be X, to go towards X, to play with X, to hunt X.</li>
								</ul>
							</li>
						</ul>
					</InfoModal>
					<TextItem
						prop="TEXT_denoms"
						value={TEXT_denoms}
						rows={4}
					>Are there any processes to make a verb from a noun? An adjective? An adverb?</TextItem>
					<HeaderItem level={2}>4.3. Number Marking</HeaderItem>
					<InfoModal
						title="Number Marking"
						label="Plurality, etc."
						modalPropsMaker={modalPropsMaker}
					>
						<ul>
							<li>Some languages only mark number occassionally or optionally depending on the type of noun.</li>
							<li>This is often intertwined with other markers, such as case marking in Romance languages.</li>
							<li>Most languages leave the singular unmarked, but not all!</li>
							<li>Number marking may have many distinctions:
								<ul>
									<li>singular (one)</li>
									<li>dual (two)</li>
									<li>trial (three)</li>
									<li>paucal (small amount)</li>
									<li>plural (any amount larger than the others used)</li>
								</ul>
							</li>
						</ul>
					</InfoModal>
					<CheckboxItem
						display={{
							class: "cols2",
							boxesPerRow: 1,
							header: "Which Distinctions Are Marked in the Noun Phrase?",
							rowLabels: ["Singular", "Dual", "Trial", "Paucal", "Plural"],
							export: {
								title: "Number Marking:"
							}
						}}
						boxes={["BOOL_numSing", "BOOL_numDual", "BOOL_numTrial", "BOOL_numPaucal", "BOOL_numPlural"]}
						values={[BOOL_numSing, BOOL_numDual, BOOL_numTrial, BOOL_numPaucal, BOOL_numPlural]}
					/>
					<TextItem
						prop="TEXT_nNumberOpt"
						value={TEXT_nNumberOpt}
						rows={3}
					>Is the distinction between singular and non-singular obligatory, optional or absent? If number-marking is optional, when does it tend to occur? When does it not tend to occur?</TextItem>
					<TextItem
						prop="TEXT_nNumberObl"
						value={TEXT_nNumberObl}
						rows={6}
					>If number-marking is obligatory, is number marking overtly expressed for all noun phrases, or only some subclasses (e.g. animates)?</TextItem>
					<HeaderItem level={2}>4.4. Case Marking</HeaderItem>
					<InfoModal
						title="Case Marking"
						label="How it works"
						modalPropsMaker={modalPropsMaker}
					>
						<ul>
							<li>Case markings can describe the role a noun plays in a sentence.</li>
							<li>In English, most case markings only survive in the pronouns, with word order doing the job for regular nouns. The major exception is the genitive case (possessive), which is marked with <em>'s</em>.</li>
							<li>Some cases, and the semantic role (2.2.1) they usually indicate, include:
								<ul>
									<li>nominative/ergative (Agent, see section 6)</li>
									<li>accusative/absolutive (Patient, see section 6)</li>
									<li>dative (Recipient)</li>
									<li>genitive (Possessor)</li>
								</ul>
							</li>
							<li>In Latin, if a Patient occurs in some other case, either the sentence is ungrammatical or another sense of the verb results.</li>
							<li>In some languages, verbs and/or adpositions <em>govern</em> their arguments, requiring a specific case marker on their nouns. This allows similar-sounding verbs to be discerned by these case markers. For example, in Yagua, the verb
								<em>dííy</em> can mean either "kill" or "see" depending on which case the Patient is in:
								<ul>
									<li>He killed the alligator:<br /><TransTable rows="sa-dííy nurutú-0 / he-kill alligator-ACC" /></li>
									<li>He saw the alligator:<TransTable rows="sa-dííy nurutí-íva / he-see alligator-DAT" /></li>
								</ul>
							</li>
						</ul>
					</InfoModal>
					<TextItem
						prop="TEXT_nCase"
						value={TEXT_nCase}
						rows={4}
					>Do nouns exhibit morphological case? If so, what cases exist?</TextItem>
					<HeaderItem level={2}>4.5. Articles and Demonstratives</HeaderItem>
					<InfoModal
						title="Articles"
						label="What Are They?"
						modalPropsMaker={modalPropsMaker}
					>
						<ul>
							<li>English is relatively rare in having <strong>Articles</strong>: a, an, the. More often, languages have a broader class of demonstratives.</li>
							<li className="newSection"><strong>Demonstratives</strong> are words that distinguish or identify a noun without modifying it, such as this, that, these and those.</li>
							<li>They tend to encode distance ("this" is closer to you than "that"; Spanish has a third level of distance, too).</li>
						</ul>
					</InfoModal>
					<TextItem
						prop="TEXT_articles"
						value={TEXT_articles}
						rows={6}
					>If articles exist, are they obligatory or optional? When do they occur? Are they separate words or bound morphemes?</TextItem>
					<TextItem
						prop="TEXT_demonstratives"
						value={TEXT_demonstratives}
						rows={6}
					>How many levels of distance do demonstratives encode? Are there other distinctions besides distance?</TextItem>
					<HeaderItem level={2}>4.6. Possessors</HeaderItem>
					<InfoModal
						title="Possessors"
						label="Possessor Expressions"
						modalPropsMaker={modalPropsMaker}
					>
						<ul>
							<li>Refer back to 2.1.1.2 to note your system of possession. This does <strong>not</strong> refer to possessive clauses! (5.4)</li>
							<li className="newSection">How are possessors expressed in the noun phrase?</li>
							<li>Do nouns agree with their possessors? Vice versa?</li>
						</ul>
					</InfoModal>
					<TextItem
						prop="TEXT_possessors"
						value={TEXT_possessors}
						rows={3}
					>Describe how possession works in a noun phrase.</TextItem>
					<HeaderItem level={2}>4.7. Class (Gender)</HeaderItem>
					<InfoModal
						title="Class and Gender"
						label="What They Are"
						modalPropsMaker={modalPropsMaker}
					>
						<ul>
							<li>Class system often require classifiers (special operators) to declare class.</li>
							<li>Pure gender systems use "agreement" instead of classifiers. At the very least, numerical expressions will "agree" with their head noun.</li>
							<li>Classes generally care about one dimension of reality, such as biological gender, animacy, shape, or function. (Other dimensions may be relevant, too.) There are almost always exceptions to the rule, however (e.g. Yagua treats rocks and
								pineapples as animates).
							</li>
							<li>Classifiers may occur with verbs, numerals and adjectives, though they may serve a different function in those cases.</li>
						</ul>
					</InfoModal>
					<CheckboxItem
						display={{
							class: "cols2",
							boxesPerRow: 1,
							header: "Which Class Distinctions Exist?",
							rowLabels: ["Gender", "Animacy", "Shape", "Function", "Other"],
							export: {
								title: "Class Distinctions:"
							}
						}}
						boxes={["BOOL_classGen", "BOOL_classAnim", "BOOL_classShape", "BOOL_classFunction", "BOOL_classOther"]}
						values={[BOOL_classGen, BOOL_classAnim, BOOL_classShape, BOOL_classFunction, BOOL_classOther]}
					/>
					<TextItem
						prop="TEXT_classGender"
						value={TEXT_classGender}
						rows={8}
					>Describe the language's class/gender system, if it has one. What classes/genders exist and how do they manifest? What dimension(s) of reality is central to the class system? How do they interact with numerals, verbs and adjectives?</TextItem>
					<HeaderItem level={2}>4.8. Diminution/Augmentation</HeaderItem>
					<InfoModal
						title="Diminution and Augmentation"
						label="Bigger and Smaller"
						modalPropsMaker={modalPropsMaker}
					>
						<ul>
							<li>If diminution (making smaller) and/or augmentation (making bigger) is used in the language, answer the following questions:
								<ul>
									<li>Is it obligatory? Does one member have to occur in every full noun phrase?</li>
									<li>Is it productive? Does it work with all full noun phrases and does it have the same meaning for each?</li>
									<li>Is it expressed lexically, morphologically, or analytically?</li>
									<li>Where in the NP is this operation likely to be located? Can it occur in more than one place?</li>
								</ul>
							</li>
						</ul>
					</InfoModal>
					<CheckboxItem
						display={{
							class: "cols2",
							boxesPerRow: 1,
							rowLabels: ["Dim/Aug System Exists", "...and is Obligatory", "...and is Productive"],
							export: {
								title: "Diminution/Augmentation System:",
								labels: ["Exists", "Is Obligatory", "Is Productive"]
							}
						}}
						boxes={["BOOL_dimAugYes", "BOOL_dimAugObligatory", "BOOL_dimAugProductive"]}
						values={[BOOL_dimAugYes, BOOL_dimAugObligatory, BOOL_dimAugProductive]}
					/>
					<TextItem
						prop="TEXT_dimAug"
						value={TEXT_dimAug}
						rows={8}
					>Describe the language's relation to diminution and augmentation.</TextItem>
				</IonList>
			</IonContent>
		</IonPage>
	);
};


export default Syntax;
