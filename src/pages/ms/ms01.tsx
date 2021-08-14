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
	RangeItem,
	TextItem,
	TransTable
} from './MorphoSyntaxElements';
import { changeView } from '../../components/ReduxDucksFuncs';
import { useDispatch } from "react-redux";

const Syntax = () => {
	const dispatch = useDispatch();
	const viewInfo = ['ms', 'ms01'];
	useIonViewDidEnter(() => {
		dispatch(changeView(viewInfo));
	});
	return (
		<IonPage>
			<SyntaxHeader title="1. Morphological Typology" />
			<IonContent fullscreen className="evenBackground disappearingHeaderKludgeFix" id="morphoSyntaxPage">
				<IonList lines="none">

					<HeaderItem level="1">1. Morphological Typology</HeaderItem>

					<HeaderItem level="2">1.1. Traditional Typology</HeaderItem>

					<InfoModal title="Synthesis and Fusion" label="The Basic Building Blocks of Words">
						<ul>
							<li>Languages can be broadly classified on two continuums based on their <strong>morphemes</strong>.
								<ul><li>A morpheme is the most basic unit of meaning in a language. For example, the word "cats" has two morphemes: "cat" (a feline animal) and "s" (more than one of them are being talked about).</li></ul>
							</li>
							<li className="newSection"><strong>Synthesis</strong> is a measure of how many morphemes appear in a word.
								<ul>
									<li>Chinese is very <em>isolating</em>, tending towards one morpheme per word.</li>
									<li>Inuit and Quechua are very <em>polysynthetic</em>, with many morphemes per word.</li>
								</ul>
							</li>
							<li className="newSection"><strong>Fusion</strong> is a measure of how many meanings a single morpheme can encode.
								<ul>
									<li>Completely isolating languages, be definiton, always lack fusion.</li>
									<li>Spanish can be very <em>fusional</em>, with a single suffix capable of encoding tense (8.3.1), aspect (8.3.2), mood (8.3.3) and number (4.3).</li>
									<li>Though fusional forms are possible (e.g. swam, was), English is mostly <em>agglutinative</em>, with one meaning per morpheme.
										<ul>
											<li>e.g. "antidisestablishmentarianism"<br />
												<TransTable rows="anti dis es&shy;tab&shy;lish ment ary an ism / against undo es&shy;tab&shy;lish in&shy;stance__of__verb of__or__like__the__noun per&shy;son be&shy;lief__sys&shy;tem" />
												(The "establishment" in question is actually contextually fusional, as it refers to the Church of England receiving government patronage, so the full meaning of the word is "the belief system of opposing the people who want to remove the government patronage of the Church of England.")
											</li>
										</ul>
									</li>
								</ul>
							</li>
						</ul>
					</InfoModal>
					<HeaderItem level="3">Synthesis</HeaderItem>

					<RangeItem text="synthesis" start="Isolating" end="Polysynthetic" innerClass="spectrum" max={10} />

					<HeaderItem level="3">Fusion</HeaderItem>

					<RangeItem text="fusion" start="Agglutinative" end="Fusional" innerClass="spectrum" max={10} />

					<TextItem text="tradTypol">Give examples of the dominant pattern and any secondary patterns.</TextItem>

					<HeaderItem level="2">1.2. Morphological Processes</HeaderItem>

					<InfoModal title="Affixes and Other Modifications" label="Read About Them">
						<ul>
							<li><strong>Affixes</strong>:
								<ul>
									<li>Completely fusional languages will usually lack affixes.</li>
									<li>Most natural languages use suffixes. Some also have prefixes and/or infixes or circumfixes. Few only use prefixes, and none have only infixes or circumfixes.</li>
									<li>NOTE: this section is not needed if the language is not agglutinative at all.</li>
								</ul>
							</li>
							<li className="newSection"><strong>Stem Modification</strong>:
								<ul><li>e.g. swim/swam/swum.</li></ul>
							</li>
							<li className="newSection"><strong>Suppletion</strong>:
								<ul><li>An entirely new stem is substituted for the root, e.g. "be" being replaced by is/am/are/was/were.</li></ul>
							</li>
							<li className="newSection"><strong>Reduplication</strong>:
								<ul>
									<li>Part or all of a word is duplicated.</li>
									<li>Often used for plurality.</li>
								</ul>
							</li>
							<li className="newSection"><strong>Suprasegmental Modification</strong>:
								<ul>
									<li>Words can change stress when in different roles.
										<ul><li>e.g. "permit" has different stress when used as a noun or as a verb.</li></ul>
									</li>
									<li>Tone changes also fall under this category.</li>
								</ul>
							</li>
						</ul>
					</InfoModal>

					<HeaderItem level="3">Affixes</HeaderItem>

					<IonItem className="content">
						<IonGrid className="cols3">
							<IonRow className="header">
								<IonCol className="cbox">Used Most</IonCol>
								<IonCol className="cbox">Used Less</IonCol>
								<IonCol>Affix</IonCol>
							</IonRow>
							<IonRow>
								<IonCol className="cbox"><RadioBox prop="prefixMost" /></IonCol>
								<IonCol className="cbox"><RadioBox prop="prefixLess" /></IonCol>
								<IonCol>Prefix</IonCol>
							</IonRow>
							<IonRow>
								<IonCol className="cbox"><RadioBox prop="suffixMost" /></IonCol>
								<IonCol className="cbox"><RadioBox prop="suffixLess" /></IonCol>
								<IonCol>Suffix</IonCol>
							</IonRow>
							<IonRow>
								<IonCol className="cbox"><RadioBox prop="circumfixMost" /></IonCol>
								<IonCol className="cbox"><RadioBox prop="circumfixLess" /></IonCol>
								<IonCol>Circumfix</IonCol>
							</IonRow>
							<IonRow>
								<IonCol className="cbox"><RadioBox prop="infixMost" /></IonCol>
								<IonCol className="cbox"><RadioBox prop="infixLess" /></IonCol>
								<IonCol>Infix</IonCol>
							</IonRow>
						</IonGrid>
					</IonItem>

					<HeaderItem level="3">Stem Modification</HeaderItem>

					<RangeItem text="stemMod" start="Not Used" end="Used Often" />

					<HeaderItem level="3">Suppletion</HeaderItem>

					<RangeItem text="suppletion" start="Not Used" end="Used Often" />

					<HeaderItem level="3">Reduplication</HeaderItem>

					<RangeItem text="redupe" start="Not Used" end="Used Often" />

					<HeaderItem level="3">Suprasegmental Modification</HeaderItem>

					<RangeItem text="supraMod" start="Not Used" end="Used Often" />

					<TextItem text="morphProcess" rows={6}>What sort of morphological processes are used? Which are primary and which are used less?</TextItem>

					<HeaderItem level="2">1.3. Head/Dependant Marking</HeaderItem>

					<RangeItem text="headDepMarked" start="Head Marked" end="Dependant Marked" innerClass="spectrum" max={4} />

					<InfoModal title="Head/Dependant Marking">
						<ul>
							<li>The <strong>Head</strong> of a phrase is the element that determines the syntactic function of the whole phrase.
								<ul>
									<li>Example sentence: <em>"The smallest dog ate a porkchop with Mark's approval."</em>
										<ul>
											<li>"dog" is Head of "the smallest dog" (noun phrase)</li>
											<li>"porkchop" is Head of "a porkchop" (noun phrase)</li>
											<li>"with" is Head of "with Mark's approval" (prepositional phrase)</li>
											<li>"approval" is Head of "Mark's approval" (noun phrase)</li>
										</ul>
									</li>
								</ul>
							</li>
							<li>English is predominantly dependant-marked ("the queen's crown").</li>
							<li>Most languages are head-marked ("the queen crown's").</li>
							<li>Some are mixed, but use only one pattern for certain types of phrases (e.g. head-marked for noun phrases, but dependant-marked for verb and adpositional phrases).</li>
						</ul>
					</InfoModal>
					<TextItem text="headDepMark">Describe when the head/dependant marking system changes, if needed.</TextItem>

				</IonList>
			</IonContent>
		</IonPage>
	);
};
 
export default Syntax;
