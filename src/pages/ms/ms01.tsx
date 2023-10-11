import React from 'react';
import {
	IonPage,
	IonContent,
	IonList,
	useIonViewDidEnter,
	IonItem,
	IonRange
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
import { setSyntaxNum } from '../../store/msSlice';

const Syntax = (props: PageData) => {
	const { modalPropsMaker } = props;
	const {
		BOOL_prefixMost,
		BOOL_prefixLess,
		BOOL_suffixMost,
		BOOL_suffixLess,
		BOOL_circumfixMost,
		BOOL_circumfixLess,
		BOOL_infixMost,
		BOOL_infixLess,
		NUM_fusion,
		NUM_headDepMarked,
		NUM_redupe,
		NUM_stemMod,
		NUM_suppletion,
		NUM_supraMod,
		NUM_synthesis,
		TEXT_tradTypol,
		TEXT_morphProcess,
		TEXT_headDepMark
	} = useSelector((state: StateObject) => state.ms);
	const dispatch = useDispatch();
	const viewInfo = { key: "ms" as keyof ViewState, page: "ms01" };
	useIonViewDidEnter(() => {
		dispatch(saveView(viewInfo));
	});
	return (
		<IonPage>
			<SyntaxHeader
				title="1. Morphological Typology"
				{...props}
			/>
			<IonContent fullscreen
				className="evenBackground disappearingHeaderKludgeFix"
				id="morphoSyntaxPage"
			>
				<IonList lines="none" className="hasSpecialLabels">
					<HeaderItem level={1}>1. Morphological Typology</HeaderItem>
					<HeaderItem level={2}>1.1. Traditional Typology</HeaderItem>
					<InfoModal
						title="Synthesis and Fusion"
						label="The Basic Building Blocks of Words"
						modalPropsMaker={modalPropsMaker}
					>
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
										<ul><li>e.g. "antidisestablishmentarianism"<br /><TransTable rows="anti dis es&shy;tab&shy;lish ment ary an ism / against undo es&shy;tab&shy;lish in&shy;stance__of__verb of__or__like__the__noun per&shy;son be&shy;lief__sys&shy;tem"></TransTable>(The "establishment" in question is actually contextually fusional, as it refers to the Church of England receiving government patronage, so the full meaning of the word is "the belief system of opposing the people who want to remove the government patronage of the Church of England.")</li></ul>
									</li>
								</ul>
							</li>
						</ul>
					</InfoModal>
					<HeaderItem level={3}>Synthesis</HeaderItem>
					<IonItem className="content" style={{ background: "#ffffff66" }}>
						<IonRange
							aria-label="Range from Isolating to Polysynthetic"
							onIonChange={(e) => dispatch(setSyntaxNum(["NUM_synthesis", e.target.value as number]))}
							value={NUM_synthesis}
							className="spectrum"
							color="secondary"
							snaps={true}
							step={1}
							ticks={true}
							min={0}
							max={10}
						>
							<div slot="start">Isolating</div>
							<div slot="end">Polysynthetic</div>
						</IonRange>
					</IonItem>
					<HeaderItem level={3}>Fusion</HeaderItem>
					<IonItem className="content">
						<IonRange
							aria-label="Range from Agglutinative to Fusional"
							onIonChange={(e) => dispatch(setSyntaxNum(["NUM_fusion", e.target.value as number]))}
							value={NUM_fusion}
							className="spectrum"
							color="secondary"
							snaps={true}
							step={1}
							ticks={true}
							min={0}
							max={10}
						>
							<div slot="start">Agglutinative</div>
							<div slot="end">Fusional</div>
						</IonRange>
					</IonItem>
					<TextItem
						prop="TEXT_tradTypol"
						value={TEXT_tradTypol}
						rows={undefined}
					>Give examples of the dominant pattern and any secondary patterns.</TextItem>
					<HeaderItem level={2}>1.2 Morphological Processes</HeaderItem>
					<InfoModal
						title="Affixes and Other Modifications"
						label="Read About Them"
						modalPropsMaker={modalPropsMaker}
					>
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
					<HeaderItem level={3}>Affixes</HeaderItem>
					<CheckboxItem
						display={
							{
								class: "cols3",
								boxesPerRow: 2,
								inlineHeaders: [
									"Used Most", "Used Less", "Affix"
								],
								rowLabels: ["Prefix", "Suffix", "Circumfix", "Infix"],
								export: {
									title: "Affixes",
									output: [
										["Used Most: ", [
											["prefixMost", "Prefixes"],
											["suffixMost", "Suffixes"],
											["circumfixMost", "Circumfixes"],
											["infixMost", "Infixes"]
										], "."],
										["Used Less: ", [
											["prefixLess", "Prefixes"],
											["suffixLess", "Suffixes"],
											["circumfixLess", "Circumfixes"],
											["infixLess", "Infixes"]
										], "."]
									]
								}
							}
						}
						boxes={["BOOL_prefixMost", "BOOL_prefixLess", "BOOL_suffixMost", "BOOL_suffixLess", "BOOL_circumfixMost", "BOOL_circumfixLess", "BOOL_infixMost", "BOOL_infixLess"]}
						values={[BOOL_prefixMost, BOOL_prefixLess, BOOL_suffixMost, BOOL_suffixLess, BOOL_circumfixMost, BOOL_circumfixLess, BOOL_infixMost, BOOL_infixLess]}
					/>
					<HeaderItem level={3}>Stem Modification</HeaderItem>
					<IonItem className="content">
						<IonRange
							aria-label="Range from Not Used to Used Often"
							onIonChange={(e) => dispatch(setSyntaxNum(["NUM_stemMod", e.target.value as number]))}
							value={NUM_stemMod}
							color="secondary"
							snaps={true}
							step={1}
							ticks={true}
							min={0}
							max={4}
						>
							<div slot="start">Not Used</div>
							<div slot="end">Used Often</div>
						</IonRange>
					</IonItem>
					<HeaderItem level={3}>Suppletion</HeaderItem>
					<IonItem className="content">
						<IonRange
							aria-label="Range from Not Used to Used Often"
							onIonChange={(e) => dispatch(setSyntaxNum(["NUM_suppletion", e.target.value as number]))}
							value={NUM_suppletion}
							color="secondary"
							snaps={true}
							step={1}
							ticks={true}
							min={0}
							max={4}
						>
							<div slot="start">Not Used</div>
							<div slot="end">Used Often</div>
						</IonRange>
					</IonItem>
					<HeaderItem level={3}>Reduplication</HeaderItem>
					<IonItem className="content">
						<IonRange
							aria-label="Range from Not Used to Used Often"
							onIonChange={(e) => dispatch(setSyntaxNum(["NUM_redupe", e.target.value as number]))}
							value={NUM_redupe}
							color="secondary"
							snaps={true}
							step={1}
							ticks={true}
							min={0}
							max={4}
						>
							<div slot="start">Not Used</div>
							<div slot="end">Used Often</div>
						</IonRange>
					</IonItem>
					<HeaderItem level={3}>Suprasegmental Modification</HeaderItem>
					<IonItem className="content">
						<IonRange
							aria-label="Range from Not Used to Used Often"
							onIonChange={(e) => dispatch(setSyntaxNum(["NUM_supraMod", e.target.value as number]))}
							value={NUM_supraMod}
							color="secondary"
							snaps={true}
							step={1}
							ticks={true}
							min={0}
							max={4}
						>
							<div slot="start">Not Used</div>
							<div slot="end">Used Often</div>
						</IonRange>
					</IonItem>
					<TextItem
						prop="TEXT_morphProcess"
						value={TEXT_morphProcess}
						rows={6}
					>What sort of morphological processes are used? Which are primary and which are used less?</TextItem>
					<HeaderItem level={2}>1.3. Head/Dependant Marking</HeaderItem>
					<IonItem className="content">
						<IonRange
							aria-label="Range from Head Marked to Dependant Marked"
							onIonChange={(e) => dispatch(setSyntaxNum(["NUM_headDepMarked", e.target.value as number]))}
							value={NUM_headDepMarked}
							className="spectrum"
							color="secondary"
							snaps={true}
							step={1}
							ticks={true}
							min={0}
							max={4}
						>
							<div slot="start">Head Marked</div>
							<div slot="end">Dependant Marked</div>
						</IonRange>
					</IonItem>
					<InfoModal
						title="Head/Dependant Marking"
						modalPropsMaker={modalPropsMaker}
					>
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
					<TextItem
						prop="TEXT_headDepMark"
						value={TEXT_headDepMark}
						rows={undefined}
					>Describe when the head/dependant marking system changes, if needed.</TextItem>
				</IonList>
			</IonContent>
		</IonPage>
	);
};


export default Syntax;
