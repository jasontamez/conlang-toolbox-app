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
//import { CustomStorageSyntax } from '../components/PersistentInfo';
import {
	SyntaxHeader,
	HeaderItem,
	InfoModal,
	RadioBox,
	RangeItem,
	TextItem
} from './MorphoSyntaxElements';
import { changeView } from '../../components/ReduxDucksFuncs';
import { useDispatch } from "react-redux";

const Syntax = (props: any) => {
	const dispatch = useDispatch();
	const viewInfo = ['ms', 'ms01'];
	useIonViewDidEnter(() => {
		dispatch(changeView(viewInfo));
	});
	return (
		<IonPage>
			<SyntaxHeader title="01" />
			<IonContent fullscreen className="evenBackground disappearingHeaderKludgeFix" id="syntaxSketchPage">
				<IonList lines="none">

					<HeaderItem className="h h1">1. Morphological Typology</HeaderItem>

						<HeaderItem className="h h2 l2">1.1. Traditional Typology</HeaderItem>

							<InfoModal className="l3" title="Synthesis and Fusion" label="Synthesis and Fusion">
								<ul>
									<li><strong>Synthesis</strong>: How many <em>morphemes</em> (the most basic unit of meaning) appear in a word?
										<ul>
											<li>Chinese is very <em>isolating</em>, tending towards one morpheme per word.</li>
											<li>Inuit and Quechua are very <em>polysynthetic</em>, with many morphemes per word.</li>
										</ul>
									</li>
									<li className="newSection"><strong>Fusion</strong>: How many meanings does a morpheme encode?
										<ul>
											<li>Spanish can be very <em>fusional</em>, with a single suffix capable of encoding tense, aspect, mood and number.</li>
											<li>English can be very <em>agglutinative</em>, with one meaning per morpheme (e.g. anti-dis-establish-ment-ari-an-ism), though fusional forms are possible (e.g. swam, was).</li>
											<li>NOTE: This section is not needed if the language is completely isolating.</li>
										</ul>
									</li>
								</ul>
							</InfoModal>
							<HeaderItem className="h h3 l3 content">Synthesis</HeaderItem>

								<RangeItem className="l4" text="synthesis" start="Isolating" end="Polysynthetic" innerClass="spectrum" max={10} />

							<HeaderItem className="h h3 l3 content">Fusion</HeaderItem>

								<RangeItem className="l4" text="fusion" start="Fusional" end="Agglutinative" innerClass="spectrum" max={10} />

							<TextItem className="l3" text="tradTypol">Give examples of the dominant pattern and any secondary patterns.</TextItem>

						<HeaderItem className="h h2 l2">1.2. Morphological Processes</HeaderItem>

							<InfoModal className="l3" title="Affixes and Other Modifications" label="What Are They?">
								<ul>
									<li><strong>Affixes</strong>:
										<ul>
											<li>Most natural languages use suffixes. Some also have prefixes and/or infixes or circumfixes. Few only have prefixes, and none have only infixes or circumfixes.</li>
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
											<li>e.g. "permit" has different stress when a noun and a verb.</li>
											<li>Tone changes also fall under this category.</li>
										</ul>
									</li>
								</ul>
							</InfoModal>

							<HeaderItem className="h h3 l3 content">Affixes</HeaderItem>

								<IonItem className="l4 content">
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

							<HeaderItem className="h h3 l3 content">Stem Modification</HeaderItem>

								<RangeItem className="l4" text="stemMod" start="Not Used" end="Used Often" />

							<HeaderItem className="h h3 l3 content">Suppletion</HeaderItem>

								<RangeItem className="l4" text="suppletion" start="Not Used" end="Used Often" />

							<HeaderItem className="h h3 l3 content">Reduplication</HeaderItem>

								<RangeItem className="l4" text="redupe" start="Not Used" end="Used Often" />

							<HeaderItem className="h h3 l3 content">Suprasegmental Modification</HeaderItem>

								<RangeItem className="l4" text="supraMod" start="Not Used" end="Used Often" />

							<TextItem className="l4" text="morphProcess" rows={6}>What sort of morphological processes are used? Illustrate the major and secondary pratterns.</TextItem>

						<HeaderItem className="h h2 l2">1.3. Head/Dependant Marking</HeaderItem>

							<RangeItem className="l3" text="headDepMarked" start="Head Marked" end="Dependant Marked" innerClass="spectrum" max={4} />
							<InfoModal className="l3" title="Head/Dependant Marking">
								<ul>
									<li>English is predominantly dependant-marked ("the queen's crown").</li>
									<li>Most languages are head-marked (*"the queen crown's").</li>
									<li>Some are mixed, but stay in one pattern for a certain class of phrases (noun, verb, adposition).</li>
								</ul>
							</InfoModal>
							<TextItem className="l3" text="headDepMark">Write any more specific notes here.</TextItem>

				</IonList>
			</IonContent>
		</IonPage>
	);
};
 
export default Syntax;
