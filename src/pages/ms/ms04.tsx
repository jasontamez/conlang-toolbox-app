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
	TextItem
} from './MorphoSyntaxElements';
import { changeView } from '../../components/ReduxDucksFuncs';
import { useDispatch } from "react-redux";

const Syntax = (props: any) => {
	const dispatch = useDispatch();
	const viewInfo = ['ms', 'ms04'];
	useIonViewDidEnter(() => {
		dispatch(changeView(viewInfo));
	});
	return (
		<IonPage>
			<SyntaxHeader title="4. Noun and Noun Phrase Operations" />
			<IonContent fullscreen className="evenBackground disappearingHeaderKludgeFix" id="syntaxSketchPage">
				<IonList lines="none">

					<HeaderItem className="h h1">4. Noun and Noun Phrase Operations</HeaderItem>

						<HeaderItem className="h h2">4.1. Compounding</HeaderItem>

							<InfoModal title="Compounding">
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
							<TextItem text="compounding" rows={4}>Describe the sorts of compounding that happen in the language (if any).</TextItem>

						<HeaderItem className="h h2">4.2. Denominalization</HeaderItem>

							<InfoModal title="Denominalization">
								<ul>
									<li>Some languages have many ways of changing a noun into a non-noun.
										<ul>
											<li>English can append <em>-like</em> to make an adjective.</li>
											<li>Eskimo has many verbalizing forms, e.g. to be X, to go towards X, to play with X, to hunt X.</li>
										</ul>
									</li>
								</ul>
							</InfoModal>
							<TextItem text="denoms" rows={4}>Are there any processes to make a verb from a noun? An adjecive? An adverb?</TextItem>

						<HeaderItem className="h h2">4.3. Number Marking</HeaderItem>

							<InfoModal title="Number Marking">
								<ul>
									<li>Some languages only mark number occassionally or optionally depending on the type of noun.</li>
									<li>This is often intertwined with other markers, such as case marking in Romance languages.</li>
									<li>Most languages leave the singular unmarked, but not all!</li>
									<li>Number marking may be as simple as singular/plural (more than one), or incorporate dual (two), trial (three), paucal (small amount), and/or plural (larger amounts).</li>
								</ul>
							</InfoModal>
							<TextItem text="nNumber" rows={3}>Is number expressed in the noun phrase? Is the distinction between singular and non-singular obligatory, optional or absent? What non-singular distinctions are there?</TextItem>
							<TextItem text="nNumberOpt" rows={4}>If number-marking is optional, when does it tend to occur? When does it not tend to occur?</TextItem>
							<TextItem text="nNumberObl" rows={4}>If number-marking is obligatory, is number marking overtly expressed for all noun phrases, or only some subclasses (e.g. animates)?</TextItem>

						<HeaderItem className="h h2">4.4. Case Marking</HeaderItem>

							<InfoModal title="Case Marking" label="How it works">
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
									<li>In some languages, verbs and/or adpositions <em>govern</em> their arguments, requiring a specific case marker on their nouns. This allows similar-sounding verbs to be discerned by these case markers. For example, in Yagua:
										<ul>
											<li>sa-dííy nurutú-0 (he-kill alligator-ACCUSATIVE)</li>
											<li>sa-dííy nurutí-íva (he-see alligator-DATIVE)</li>
										</ul>
									</li>
								</ul>
							</InfoModal>
							<TextItem text="case" rows={4}>Do nouns exhibit morphological case? If so, what cases exist?</TextItem>

						<HeaderItem className="h h2">4.5. Articles and Demonstratives</HeaderItem>

							<InfoModal title="Articles" label="Articles Info">
								<ul>
									<li>English is relatively rare in having articles: a, an, the. More often, languages have a broader class of demonstratives.</li>
								</ul>
							</InfoModal>
							<TextItem text="articles" rows={6}>If articles exist, are they obligatory or optional? When do they occur? Are they separate words or bound morphemes?</TextItem>
							<InfoModal title="Determiners" label="Determiners Info">
								<ul>
									<li>Demonstratives are words that distinguish or identify a noun without modifying it, such as this, that, these and those.</li>
									<li>They tend to encode distance ("this" is closer to you than "that"; Spanish has a third level of distance, too).</li>
								</ul>
							</InfoModal>
							<TextItem text="demonstratives" rows={6}>How many levels of distance do determiners encode? Are there other distinctions besides distance?</TextItem>

						<HeaderItem className="h h2">4.6. Possessors</HeaderItem>

							<InfoModal title="Possessors" label="Possessor Info">
								<ul>
									<li>Refer back to 2.1.1.2 to note your system of possession. This does <strong>not</strong> refer to possessive clauses! (5.4)</li>
									<li className="newSection">How are possessors expressed in the noun phrase?</li>
									<li>Do nouns agree with their possessors? Vice versa?</li>
								</ul>
							</InfoModal>
							<TextItem text="possessors" rows={3}>Describe how possession works in a noun phrase.</TextItem>

						<HeaderItem className="h h2">4.7. Class (Gender)</HeaderItem>

							<InfoModal title="Class and Gender" label="Class and Gender Info">
								<ul>
									<li>Class system often require classifiers (special operators) to declare class.</li>
									<li>Pure gender systems use "agreement" instead of classifiers. At the very least, numerical expressions will "agree" with their head noun.</li>
									<li>Classes generally care about one dimension of reality, such as biological gender, animacy, shape, or function. (Other dimensions may be relevant, too.) There are almost always exceptions to the rule, however (e.g. Yagua treats rocks and pineapples as animates).</li>
									<li>Classifiers may occur with verbs, numerals and adjectives, though they may serve a different function in those cases.</li>
								</ul>
							</InfoModal>
							<TextItem text="classGender" rows={8}>Describe the language's class/gender system, if it has one. What classes/genders exist and how do they manifest? What dimension(s) of reality is central to the class system? How do they interact with numerals, verbs and adjectives?</TextItem>

						<HeaderItem className="h h2">4.8. Diminution/Augmentation</HeaderItem>

							<InfoModal title="Diminution and Augmentation">
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
							<IonItem className="content">
								<IonGrid>
									<IonRow>
										<IonCol className="cbox"><RadioBox prop="dimAugYes" /></IonCol>
										<IonCol>Dim/Aug System Exists</IonCol>
									</IonRow>
									<IonRow>
										<IonCol className="cbox"><RadioBox prop="dimAugObligatory" /></IonCol>
										<IonCol>...and is Obligatory</IonCol>
									</IonRow>
									<IonRow>
										<IonCol className="cbox"><RadioBox prop="dimAugProductive" /></IonCol>
										<IonCol>...and is Productive</IonCol>
									</IonRow>
								</IonGrid>
							</IonItem>
							<TextItem text="dimAug" rows={8}>Describe the language's relation to diminution and augmentation.</TextItem>

				</IonList>
			</IonContent>
		</IonPage>
	);
};
 
export default Syntax;
