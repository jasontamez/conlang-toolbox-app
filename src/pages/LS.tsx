import React from 'react';
import {
	IonPage,
	IonContent,
	IonHeader,
	IonToolbar,
	IonTitle,
	IonButtons,
	IonButton,
	IonMenuButton,
	IonIcon,
	IonList,
	IonItem,
	IonLabel,
	IonRange,
	IonGrid,
	IonRow,
	IonCol,
	IonCheckbox,
	IonTextarea
} from '@ionic/react';
import { addCircleSharp, globeOutline, removeCircleSharp } from 'ionicons/icons';
import { useSelector, useDispatch } from "react-redux";
import {
	openModal,
	setLSBool,
	setLSNum,
	setLSText,
	toggleLSState
} from '../components/ReduxDucksFuncs';
import { LangSketchBoolObject, LangSketchNumberObject, LangSketchTextObject } from '../components/ReduxDucksTypes';
//import { CustomStorageLS } from '../components/PersistentInfo';
import ExtraCharactersModal from './M-ExtraCharacters';

const Lex = () => {
	const dispatch = useDispatch();
	const [lsState, lsInfo] = useSelector((state: any) => [state.langSketchState, state.langSketchInfo]);
	const [lsBool, lsNum, lsText] = [lsInfo.bool, lsInfo.num, lsInfo.text];
	const toggle = (what: string) => {
		dispatch(toggleLSState(what));
	};
	const classy = (...folders: string[]) => {
		let primary = folders.shift();
		//return primary;
		return folders.every((prop: string) => lsState[prop]) ? primary : "toggled";
	};
	const setBool = (what: keyof LangSketchBoolObject, value: boolean) => {
		dispatch(setLSBool(what, value));
	};
	const setNum = (what: keyof LangSketchNumberObject, value: number) => {
		dispatch(setLSNum(what, value));
	};
	const setText = (what: keyof LangSketchTextObject, value: string) => {
		dispatch(setLSText(what, value));
	};
	const makeButton = (what: string) => {
		return (
			<IonButton color={lsState[what] ? "primary" : "secondary"} onClick={() => toggle(what)} slot="start">
				<IonIcon icon={lsState[what] ? removeCircleSharp : addCircleSharp} slot="icon-only" />
			</IonButton>
		);
	};
	return (
		<IonPage>
			<ExtraCharactersModal />
			<IonHeader>
				<IonToolbar>
					<IonButtons slot="start">
						<IonMenuButton />
					</IonButtons>
					<IonTitle>LangSketch</IonTitle>
					<IonButtons slot="end">
						<IonButton onClick={() => dispatch(openModal("ExtraCharacters"))}>
							<IonIcon icon={globeOutline} />
						</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen className="evenBackground disappearingHeaderKludgeFix" id="langSketchPage">
				<IonList lines="none">

					<IonItem className="h h1">
						{makeButton("morphTypo")}
						<IonLabel>Morphological Typology</IonLabel>
					</IonItem>

						<IonItem className={classy("h h2 l2", "morphTypo")}>
							{makeButton("tradTypo")}
							<IonLabel>Traditional Typology</IonLabel>
						</IonItem>

							<IonItem className={classy("h h3 l3", "morphTypo", "tradTypo")}>
								{makeButton("synth")}
								<IonLabel>Synthesis</IonLabel>
							</IonItem>

								<IonItem className={classy("l4", "morphTypo", "tradTypo", "synth")}>
									<IonRange onBlur={(e) => setNum("synthesis", e.target.value as number)} value={lsNum.synthesis || 0} className="spectrum" color="secondary" snaps={true} step={1} ticks={true} min={0} max={10}>
										<IonLabel slot="start">Isolating</IonLabel>
										<IonLabel slot="end">Polysynthetic</IonLabel>
									</IonRange>
								</IonItem>
								<IonItem className={classy("l4", "morphTypo", "tradTypo", "synth")}>
									<ul>
										<li>How many <em>morphemes</em> (the most basic unit of meaning) appear in a word?</li>
										<li>Chinese is very <em>isolating</em>, tending towards one morpheme per word.</li>
										<li>Inuit and Quechua are very <em>polysynthetic</em>, with many morphemes per word.</li>
									</ul>
								</IonItem>
								<IonItem className={classy("l4", "morphTypo", "tradTypo", "synth")}>
									<IonTextarea onBlur={(e) => setText("synthesis", e.target.value || "")} value={lsText.synthesis || ""} rows={3} placeholder="" enterkeyhint="done" inputmode="text" />
								</IonItem>

							<IonItem className={classy("h h3 l3", "morphTypo", "tradTypo")}>
								{makeButton("fusion")}
								<IonLabel>Fusion</IonLabel>
							</IonItem>

								<IonItem className={classy("l4", "morphTypo", "tradTypo", "fusion")}>
									<IonRange className="spectrum" color="secondary" snaps={true} step={1} ticks={true} min={0} max={10}>
										<IonLabel slot="start">Fusional</IonLabel>
										<IonLabel slot="end">Agglutinative</IonLabel>
									</IonRange>
								</IonItem>
								<IonItem className={classy("l4", "morphTypo", "tradTypo", "fusion")}>
									<ul>
										<li>How many meanings does a morpheme encode?</li>
										<li>Spanish can be very <em>fusional</em>, with a single suffix capable of encoding tense, aspect, mood and number.</li>
										<li>English can be very <em>agglutinative</em>, with one meaning per morpheme (e.g. anti-dis-establish-ment-ari-an-ism), though fusional forms are possible (e.g. swam, was).</li>
									</ul>
								</IonItem>
								<IonItem className={classy("l4", "morphTypo", "tradTypo", "fusion")}>
									<IonTextarea rows={3} placeholder="" enterkeyhint="done" inputmode="text" />
								</IonItem>

						<IonItem className={classy("h h2 l2", "morphTypo")}>
							{makeButton("morphProc")}
							<IonLabel>Morphological Processes</IonLabel>
						</IonItem>

							<IonItem className={classy("h h3 l3", "morphTypo", "morphProc")}>
								{makeButton("affixes")}
								<IonLabel>Affixes</IonLabel>
							</IonItem>

								<IonItem className={classy("l4", "morphTypo", "morphProc", "affixes")}>
									<IonGrid className="cols3">
										<IonRow className="header">
											<IonCol className="cbox">Used Most</IonCol>
											<IonCol className="cbox">Used Less</IonCol>
											<IonCol>Affix</IonCol>
										</IonRow>
										<IonRow>
											<IonCol className="cbox"><IonCheckbox onIonChange={(e) => setBool("prefixMost", e.detail.checked)} value={lsBool.prefixMost || false} /></IonCol>
											<IonCol className="cbox"><IonCheckbox onIonChange={(e) => setBool("prefixLess", e.detail.checked)} value={lsBool.prefixLess || false} /></IonCol>
											<IonCol>Prefix</IonCol>
										</IonRow>
										<IonRow>
											<IonCol className="cbox"><IonCheckbox onIonChange={(e) => setBool("suffixMost", e.detail.checked)} value={lsBool.suffixMost || false} /></IonCol>
											<IonCol className="cbox"><IonCheckbox onIonChange={(e) => setBool("suffixLess", e.detail.checked)} value={lsBool.suffixLess || false} /></IonCol>
											<IonCol>Suffix</IonCol>
										</IonRow>
										<IonRow>
											<IonCol className="cbox"><IonCheckbox onIonChange={(e) => setBool("circumfixMost", e.detail.checked)} value={lsBool.circumfixMost || false} /></IonCol>
											<IonCol className="cbox"><IonCheckbox onIonChange={(e) => setBool("circumfixLess", e.detail.checked)} value={lsBool.circumfixLess || false} /></IonCol>
											<IonCol>Circumfix</IonCol>
										</IonRow>
										<IonRow>
											<IonCol className="cbox"><IonCheckbox onIonChange={(e) => setBool("infixMost", e.detail.checked)} value={lsBool.infixMost || false} /></IonCol>
											<IonCol className="cbox"><IonCheckbox onIonChange={(e) => setBool("infixLess", e.detail.checked)} value={lsBool.infixLess || false} /></IonCol>
											<IonCol>Infix</IonCol>
										</IonRow>
									</IonGrid>
								</IonItem>
								<IonItem className={classy("l4", "morphTypo", "morphProc", "affixes")}>
									<ul><li>Which form predominates?</li></ul>
								</IonItem>

							<IonItem className={classy("h h3 l3", "morphTypo", "morphProc")}>
								{makeButton("stemMod")}
								<IonLabel>Stem Modification</IonLabel>
							</IonItem>

								<IonItem className={classy("l4", "morphTypo", "morphProc", "stemMod")}>
									<IonRange color="secondary" snaps={true} step={1} ticks={true} min={0} max={4}>
										<IonLabel slot="start">Not Used</IonLabel>
										<IonLabel slot="end">Used Often</IonLabel>
									</IonRange>
								</IonItem>
								<IonItem className={classy("l4", "morphTypo", "morphProc", "stemMod")}>
									<ul><li>e.g. swim/swam/swum.</li></ul>
								</IonItem>

							<IonItem className={classy("h h3 l3", "morphTypo", "morphProc")}>
								{makeButton("redup")}
								<IonLabel>Reduplication</IonLabel>
							</IonItem>

								<IonItem className={classy("l4", "morphTypo", "morphProc", "redup")}>
									<IonRange color="secondary" snaps={true} step={1} ticks={true} min={0} max={4}>
											<IonLabel slot="start">Not Used</IonLabel>
										<IonLabel slot="end">Used Often</IonLabel>
									</IonRange>
								</IonItem>
								<IonItem className={classy("l4", "morphTypo", "morphProc", "redup")}>
									<ul><li>Often used for plurality.</li></ul>
								</IonItem>

							<IonItem className={classy("h h3 l3", "morphTypo", "morphProc")}>
								{makeButton("supsegMod")}
								<IonLabel>Suprasegmental Modification</IonLabel>
							</IonItem>

								<IonItem className={classy("l4", "morphTypo", "morphProc", "supsegMod")}>
									<IonRange color="secondary" snaps={true} step={1} ticks={true} min={0} max={4}>
										<IonLabel slot="start">Not Used</IonLabel>
										<IonLabel slot="end">Used Often</IonLabel>
									</IonRange>
								</IonItem>
								<IonItem className={classy("l4", "morphTypo", "morphProc", "supsegMod")}>
									<ul>
										<li>e.g. "permit" has different stress when a noun and a verb.</li>
										<li>Tone changes also fall under this category.</li>
									</ul>
								</IonItem>

							<IonItem className={classy("l4", "morphTypo", "morphProc")}>
								<IonTextarea rows={3} placeholder="" enterkeyhint="done" inputmode="text" />
							</IonItem>

						<IonItem className={classy("h h2 l2", "morphTypo")}>
							{makeButton("headDepMark")}
							<IonLabel>Head/Dependant Marking</IonLabel>
						</IonItem>

							<IonItem className={classy("l3", "morphTypo", "headDepMark")}>
								<IonRange className="spectrum" color="secondary" snaps={true} step={1} ticks={true} min={0} max={4}>
									<IonLabel slot="start">Head Marked</IonLabel>
									<IonLabel slot="end">Dependant Marked</IonLabel>
								</IonRange>
							</IonItem>
							<IonItem className={classy("l3", "morphTypo", "headDepMark")}>
								<ul>
									<li>English is predominantly dependant-marked ("the queen's crown").</li>
									<li>Most languages are head-marked (*"the queen crown's").</li>
									<li>Some are mixed, but stay in one pattern for a certain class of phrases (noun, verb, adposition).</li>
								</ul>
							</IonItem>
							<IonItem className={classy("l3", "morphTypo", "headDepMark")}>
								<IonTextarea rows={3} placeholder="" enterkeyhint="done" inputmode="text" />
							</IonItem>

					<IonItem className="h h1">
						{makeButton("grammCateg")}
						<IonLabel>Grammatical Categories</IonLabel>
					</IonItem>

						<IonItem className={classy("h h2 l2", "grammCateg")}>
							{makeButton("nouns")}
							<IonLabel>Nouns (the most time-stable concepts)</IonLabel>
						</IonItem>

							<IonItem className={classy("h h3 l3", "grammCateg", "nouns")}>
								{makeButton("nounTypes")}
								<IonLabel>Types of Nouns</IonLabel>
							</IonItem>

								<IonItem className={classy("h l4", "grammCateg", "nouns", "nounTypes")}>
									{makeButton("properNames")}
									<IonLabel>Proper Names</IonLabel>
								</IonItem>

									<IonItem className={classy("l5", "grammCateg", "nouns", "nounTypes", "properNames")}>
										<ul>
											<li>In English, they do not easily take articles, quantifiers and other modifiers.</li>
											<li>Other languages may have special case markers for them.</li>
										</ul>
									</IonItem>
									<IonItem className={classy("l5", "grammCateg", "nouns", "nounTypes", "properNames")}>
										<IonTextarea rows={3} placeholder="" enterkeyhint="done" inputmode="text" />
									</IonItem>

								<IonItem className={classy("h l4", "grammCateg", "nouns", "nounTypes")}>
									{makeButton("possess")}
									<IonLabel>Possessability</IonLabel>
								</IonItem>

									<IonItem className={classy("l5", "grammCateg", "nouns", "nounTypes", "possess")}>
										<ul>
											<li>Languages may have one of the following systems to differentiate nouns.</li>
										</ul>
									</IonItem>
									<IonItem className={classy("h l5 leading", "grammCateg", "nouns", "nounTypes", "possess")}>
										<IonLabel>Possessable vs Unpossessable</IonLabel>
									</IonItem>

										<IonItem className={classy("l6 following", "grammCateg", "nouns", "nounTypes", "possess")}>
											<ul>
												<li>Some nouns cannot be possessed (e.g. land, stars).</li>
											</ul>
										</IonItem>

									<IonItem className={classy("h l5 leading", "grammCateg", "nouns", "nounTypes", "possess")}>
										<IonLabel>Inherent vs Optional</IonLabel>
									</IonItem>

										<IonItem className={classy("l6 following", "grammCateg", "nouns", "nounTypes", "possess")}>
											<ul>
												<li>Some nouns <em>must</em> be possessed (e.g. body parts, kinship terms).</li>
											</ul>
										</IonItem>
									<IonItem className={classy("h l5 leading", "grammCateg", "nouns", "nounTypes", "possess")}>
										<IonLabel>Alienable vs Inalienable</IonLabel>
									</IonItem>

										<IonItem className={classy("l6 following", "grammCateg", "nouns", "nounTypes", "possess")}>
											<ul>
												<li><em>Alienable</em>: possession can be ended (my car becomes your car).</li>
												<li><em>Inalienable</em>: possession cannot be ended (my brother is always my brother).</li>
											</ul>
										</IonItem>

									<IonItem className={classy("l5", "grammCateg", "nouns", "nounTypes", "possess")}>
										<IonTextarea rows={3} placeholder="" enterkeyhint="done" inputmode="text" />
									</IonItem>

								<IonItem className={classy("h l4", "grammCateg", "nouns", "nounTypes")}>
									{makeButton("countMass")}
									<IonLabel>Count vs Mass</IonLabel>
								</IonItem>

									<IonItem className={classy("l5", "grammCateg", "nouns", "nounTypes", "countMass")}>
										<ul>
											<li>Typically, most nouns are countable, while fewer are considered as a mass.</li>
											<li>e.g. "sand" requires "a grain of sand" to be countable, and "confetti" requires "a piece of confetti".</li>
										</ul>
									</IonItem>
									<IonItem className={classy("l5", "grammCateg", "nouns", "nounTypes", "countMass")}>
										<IonTextarea rows={3} placeholder="" enterkeyhint="done" inputmode="text" />
									</IonItem>

							<IonItem className={classy("h h3 l3", "grammCateg", "nouns")}>
								{makeButton("pronounAnaph")}
								<IonLabel>Pronouns and Anaphoric Clitics</IonLabel>
							</IonItem>

								<IonItem className={classy("h l4 leading", "grammCateg", "nouns", "pronounAnaph")}>
									<IonLabel>Pronouns</IonLabel>
								</IonItem>

									<IonItem className={classy("l5 following leading", "grammCateg", "nouns", "pronounAnaph")}>
										<ul>
											<li>Free forms that are used to refer to or replace a word used earlier in a sentence, to avoid repetition.</li>
											<li>Also known as <em>anaphoric references</em>.</li>
										</ul>
									</IonItem>

								<IonItem className={classy("h l4 leading following", "grammCateg", "nouns", "pronounAnaph")}>
									<IonLabel>Anaphoric Clitics</IonLabel>
								</IonItem>

									<IonItem className={classy("l5 following", "grammCateg", "nouns", "pronounAnaph")}>
										<ul>
											<li>Must attach to another word, but functions as a full noun phrase.</li>
										</ul>
									</IonItem>

								<IonItem className={classy("l4 following", "grammCateg", "nouns", "pronounAnaph")}>
									<ul>
										<li>Both types often differ according to person (3rd/2nd/1st including inclusive/exclusive), number (singular/plural), noun class (gender/animacy), grammatical role (subject/object/ergative/etc), semantic role (agent/patient), definiteness and/or specificness (a/the), and honorifics.</li>
										<li>English has frequent pronouns that agree with the verb, and may be stressed for emphasis or contrast: "<strong>He</strong> died" (not her, as expected).</li>
										<li>Spanish has anaphoric forms attached to the verb, but will use pronouns for emphasis or contrast.</li>
									</ul>
								</IonItem>
								<IonItem className={classy("l4 following", "grammCateg", "nouns", "pronounAnaph")}>
									<IonTextarea rows={3} placeholder="" enterkeyhint="done" inputmode="text" />
								</IonItem>

						<IonItem className={classy("h h2 l2", "grammCateg")}>
							{makeButton("verbs")}
							<IonLabel>Verbs (the least time-stable concepts)</IonLabel>
						</IonItem>

							<IonItem className={classy("h h3 l3", "grammCateg", "verbs")}>
								{makeButton("semanRole")}
								<IonLabel>Semantic Roles</IonLabel>
							</IonItem>

								<IonItem className={classy("h l4 leading", "grammCateg", "verbs", "semanRole")}>
									<IonLabel>Agent</IonLabel>
								</IonItem>

									<IonItem className={classy("l5 following", "grammCateg", "verbs", "semanRole")}>
										<ul><li>active, physical, has volition</li></ul>
									</IonItem>

								<IonItem className={classy("h l4 leading", "grammCateg", "verbs", "semanRole")}>
									<IonLabel>Patient</IonLabel>
								</IonItem>

									<IonItem className={classy("l5 following", "grammCateg", "verbs", "semanRole")}>
										<ul><li>undergoes a change, no volition (direct object in English)</li></ul>
									</IonItem>

								<IonItem className={classy("h l4 leading", "grammCateg", "verbs", "semanRole")}>
									<IonLabel>Recipient</IonLabel>
								</IonItem>

									<IonItem className={classy("l5 following", "grammCateg", "verbs", "semanRole")}>
										<ul><li>moving object (indirect object in English), or often a destination</li></ul>
									</IonItem>

								<IonItem className={classy("h l4 leading", "grammCateg", "verbs", "semanRole")}>
									<IonLabel>Force</IonLabel>
								</IonItem>

									<IonItem className={classy("l5 following", "grammCateg", "verbs", "semanRole")}>
										<ul><li>directly instigates, not necessarily conscious or voluntary</li></ul>
									</IonItem>

								<IonItem className={classy("h l4 leading", "grammCateg", "verbs", "semanRole")}>
									<IonLabel>Instrument</IonLabel>
								</IonItem>

									<IonItem className={classy("l5 following", "grammCateg", "verbs", "semanRole")}>
										<ul><li>indirectly instigates (usually by an agent)</li></ul>
									</IonItem>

								<IonItem className={classy("h l4 leading", "grammCateg", "verbs", "semanRole")}>
									<IonLabel>Experiencer</IonLabel>
								</IonItem>

									<IonItem className={classy("l5 following", "grammCateg", "verbs", "semanRole")}>
										<ul><li>does not participate, merely observes</li></ul>
									</IonItem>

								<IonItem className={classy("l4", "grammCateg", "verbs", "semanRole")}>
									<ul>
										<li>Verbs can be divided into groups depending on which roles they require.</li>
										<li>In English, all verbs require an Agent, and many also require a Patient, but no other roles are encoded into the verb.</li>
										<li>Roles can change according to the perspective of the speaker:
											<ul>
												<li>I hit Bob with the hammer.</li>
												<li>The hammer hit Bob.</li>
												<li>Bob was hit.</li>
											</ul>
										</li>
									</ul>
								</IonItem>
								<IonItem className={classy("l4", "grammCateg", "verbs", "semanRole")}>
									<IonTextarea rows={3} placeholder="" enterkeyhint="done" inputmode="text" />
								</IonItem>

							<IonItem className={classy("h h3 l3", "grammCateg", "verbs")}>
								{makeButton("classes")}
								<IonLabel>Verb Classes</IonLabel>
							</IonItem>

								<IonItem className={classy("l4", "grammCateg", "verbs", "classes")}>
									<IonGrid className="striped">
										<IonRow className="header">
											<IonCol className="cbox">Exists?</IonCol>
											<IonCol className="label">Type</IonCol>
											<IonCol>Description</IonCol>
										</IonRow>
										<IonRow>
											<IonCol className="cbox"><IonCheckbox /></IonCol>
											<IonCol className="label">Actions</IonCol>
											<IonCol>Agent affects Patient.</IonCol>
										</IonRow>
										<IonRow>
											<IonCol className="cbox"><IonCheckbox /></IonCol>
											<IonCol className="label">Action-Processes</IonCol>
											<IonCol>Agent only.</IonCol>
										</IonRow>
										<IonRow>
											<IonCol className="cbox"><IonCheckbox /></IonCol>
											<IonCol className="label">Weather Verbs</IonCol>
											<IonCol>In English, these require a dummy Agent ("<em>It</em> is raining"); this is not the case in many other languages!</IonCol>
										</IonRow>
										<IonRow>
											<IonCol className="cbox"><IonCheckbox /></IonCol>
											<IonCol className="label">States</IonCol>
											<IonCol>be hot, be broken, be frozen, etc; may be predicate-bound.</IonCol>
										</IonRow>
										<IonRow>
											<IonCol className="cbox"><IonCheckbox /></IonCol>
											<IonCol className="label">Involuntary Processes</IonCol>
											<IonCol>He grew; It broke; They died; etc</IonCol>
										</IonRow>
										<IonRow>
											<IonCol className="cbox"><IonCheckbox /></IonCol>
											<IonCol className="label">Bodily Functions</IonCol>
											<IonCol>cough, sweat, bleed, cry, etc</IonCol>
										</IonRow>
										<IonRow>
											<IonCol className="cbox"><IonCheckbox /></IonCol>
											<IonCol className="label">Motion</IonCol>
											<IonCol>go, float, proceed, etc</IonCol>
										</IonRow>
										<IonRow>
											<IonCol className="cbox"><IonCheckbox /></IonCol>
											<IonCol className="label">Position</IonCol>
											<IonCol>sit, stand, hang, etc</IonCol>
										</IonRow>
										<IonRow>
											<IonCol className="cbox"><IonCheckbox /></IonCol>
											<IonCol className="label">Factive</IonCol>
											<IonCol>Something comes into being: e.g. build, form, ignite, create</IonCol>
										</IonRow>
										<IonRow>
											<IonCol className="cbox"><IonCheckbox /></IonCol>
											<IonCol className="label">Cognition</IonCol>
											<IonCol>know, suspect, forget etc</IonCol>
										</IonRow>
										<IonRow>
											<IonCol className="cbox"><IonCheckbox /></IonCol>
											<IonCol className="label">Sensation</IonCol>
											<IonCol>hear, see, taste, etc</IonCol>
										</IonRow>
										<IonRow>
											<IonCol className="cbox"><IonCheckbox /></IonCol>
											<IonCol className="label">Emotion</IonCol>
											<IonCol>be happy, be afraid, be mellow, etc</IonCol>
										</IonRow>
										<IonRow>
											<IonCol className="cbox"><IonCheckbox /></IonCol>
											<IonCol className="label">Utterance</IonCol>
											<IonCol>say, yell, murmur, declare, chat, etc</IonCol>
										</IonRow>
										<IonRow>
											<IonCol className="cbox"><IonCheckbox /></IonCol>
											<IonCol className="label">Manipulation</IonCol>
											<IonCol>force, urge, cause, let, permit, allow, compel, etc</IonCol>
										</IonRow>
									</IonGrid>
								</IonItem>

								<IonItem className={classy("l4", "grammCateg", "verbs", "classes")}>
									<ul>
										<li>Which classes exist as distinct categories in the language?</li>
										<li>How are they realized?</li>
									</ul>
								</IonItem>
								<IonItem className={classy("l4", "grammCateg", "verbs", "classes")}>
									<IonTextarea rows={3} placeholder="" enterkeyhint="done" inputmode="text" />
								</IonItem>

							<IonItem className={classy("h h3 l3", "grammCateg", "verbs")}>
								{makeButton("verStruc")}
								<IonLabel>Verb Structure</IonLabel>
							</IonItem>

								<IonItem className={classy("l4", "grammCateg", "verbs", "verStruc")}>
									<ul>
										<li>Describe the structure of the verb phrase.
											<ul>
												<li>Where does the stem lie in relation to any affixes/particles/etc?</li>
												<li>Are directional and/or locational notions expressed in the verb/phrase at all?</li>
											</ul>
										</li>
										<li>Describe any verbal operations.
											<ul>
												<li>Is this operation obligatory?</li>
												<li>Is it productive (for all/most stems)?</li>
												<li>Is this coded morphologically (modifying the verb), analytically (particles and word order), lexically (using other verbs)? Any exceptions?</li>
												<li>Where in the word/phrase is the operation likely to appear? Can it appear in more than one place?</li>
											</ul>
										</li>
									</ul>
								</IonItem>
								<IonItem className={classy("l4", "grammCateg", "verbs", "verStruc")}>
									<IonTextarea rows={3} placeholder="" enterkeyhint="done" inputmode="text" />
								</IonItem>

						<IonItem className={classy("h h2 l2", "grammCateg")}>
							{makeButton("modif")}
							<IonLabel>Modifiers</IonLabel>
						</IonItem>

							<IonItem className={classy("h h3 l3", "grammCateg", "modif")}>
								{makeButton("pcda")}
								<IonLabel>Property Concepts (Descriptive Adjectives)</IonLabel>
							</IonItem>

								<IonItem className={classy("l4", "grammCateg", "modif", "pcda")}>
									<ul>
										<li>If these exist as a separate category, they will express age, dimension (big, short, long, tall, wide), value (good, bad), color.</li>
										<li>Other properties may be expressed: physical properties (hard, smooth, heavy), shape, speed, human propensity (happy, jealous, smart, wary).</li>
										<li>Human languages handle these in five distinct ways:</li>
									</ul>
								</IonItem>
								<IonItem className={classy("l4", "grammCateg", "modif", "pcda")}>
									<IonGrid className="cols2">
											<IonRow>
											<IonCol className="cbox"><IonCheckbox /></IonCol>
											<IonCol>Lexicalized as verbs (austronesian languages)</IonCol>
										</IonRow>
										<IonRow>
											<IonCol className="cbox"><IonCheckbox /></IonCol>
											<IonCol>Lexicalized as nouns (Finnish)</IonCol>
										</IonRow>
										<IonRow>
											<IonCol className="cbox"><IonCheckbox /></IonCol>
											<IonCol>Lexicalized as nouns or verbs depending on the demands of discourse (Dutch)</IonCol>
										</IonRow>
										<IonRow>
											<IonCol className="cbox"><IonCheckbox /></IonCol>
											<IonCol>Some are lexicalized as nouns, others are lexicalized as verbs (Yoruba)</IonCol>
										</IonRow>
										<IonRow>
											<IonCol className="cbox"><IonCheckbox /></IonCol>
											<IonCol>Distinct class of "adjectives" (English)</IonCol>
										</IonRow>
									</IonGrid>
								</IonItem>
								<IonItem className={classy("l4", "grammCateg", "modif", "pcda")}>
									<ul>
										<li>Which way does the language handle PCs?</li>
										<li>Do they agree with their head?</li>
									</ul>
								</IonItem>
								<IonItem className={classy("l4", "grammCateg", "modif", "pcda")}>
									<IonTextarea rows={3} placeholder="" enterkeyhint="done" inputmode="text" />
								</IonItem>

							<IonItem className={classy("h h3 l3", "grammCateg", "modif")}>
								{makeButton("nonNumQ")}
								<IonLabel>Non-Numeral Quantifiers</IonLabel>
							</IonItem>

								<IonItem className={classy("l4", "grammCateg", "modif", "nonNumQ")}>
									<ul>
										<li>e.g. few, many, some</li>
										<li>Which quantifiers exist?</li>
									</ul>
								</IonItem>
								<IonItem className={classy("l4", "grammCateg", "modif", "nonNumQ")}>
									<IonTextarea rows={3} placeholder="" enterkeyhint="done" inputmode="text" />
								</IonItem>

							<IonItem className={classy("h h3 l3", "grammCateg", "modif")}>
								{makeButton("numer")}
								<IonLabel>Numerals</IonLabel>
							</IonItem>

								<IonItem className={classy("h l4 leading", "grammCateg", "modif", "numer")}>
									<IonLabel>Extent</IonLabel>
								</IonItem>

									<IonItem className={classy("l5 following", "grammCateg", "modif", "numer")}>
										<ul>
											<li>Some languages have very limited numerals: e.g. 1, 2, 3, many.</li>
											<li>Only very advanced societies will have a need for numbers beyond a thousand.</li>
										</ul>
									</IonItem>

								<IonItem className={classy("h l4 leading", "grammCateg", "modif", "numer")}>
									<IonLabel>Base</IonLabel>
								</IonItem>

									<IonItem className={classy("l5 following", "grammCateg", "modif", "numer")}>
										<ul>
											<li>Usually base 5 or 10. Sometimes 20.</li>
										</ul>
									</IonItem>

								<IonItem className={classy("h l4 leading", "grammCateg", "modif", "numer")}>
									<IonLabel>Agreement</IonLabel>
								</IonItem>

									<IonItem className={classy("l5 following", "grammCateg", "modif", "numer")}>
										<ul>
											<li>Some languages use different sets of numerals for different classes of nouns.</li>
											<li>Other languages inflect their numerals to agree with their head.</li>
										</ul>
									</IonItem>

								<IonItem className={classy("l4", "grammCateg", "modif", "numer")}>
									<ul>
										<li>Describe the language's numeral system.</li>
									</ul>
								</IonItem>
								<IonItem className={classy("l4", "grammCateg", "modif", "numer")}>
									<IonTextarea rows={3} placeholder="" enterkeyhint="done" inputmode="text" />
								</IonItem>

						<IonItem className={classy("h h2 l2", "grammCateg")}>
							{makeButton("adv")}
							<IonLabel>Adverbs (a "catch-all" category)</IonLabel>
						</IonItem>

							<IonItem className={classy("l3", "grammCateg", "adv")}>
								<ul>
									<li>May or may not exist as a separate category of words.</li>
									<li>Languages may use adjectives in special phrases to fulfill this role.</li>
									<li>Adverbs can describe the following:
										<ul>
											<li><strong>Manner</strong>: e.g. quickly, slowly, patiently.</li>
											<li><strong>Time</strong>: e.g. yesterday, today, early, next year.</li>
											<li><strong>Direction/Location</strong>: e.g. up/downriver, north(ward), left(ward), hither.</li>
											<li><strong>Evidential/Epistemic</strong>: e.g. possibly, definitely, from conjecture, from direct observation, from second-hand information.</li>
										</ul>
									</li>
								</ul>
							</IonItem>
							<IonItem className={classy("l3", "grammCateg", "adv")}>
								<IonTextarea rows={3} placeholder="" enterkeyhint="done" inputmode="text" />
							</IonItem>

					<IonItem className="h h1">
						{makeButton("constOrd")}
						<IonLabel>Constituent Order Typology</IonLabel>
					</IonItem>

						<IonItem className={classy("h h2 l2", "constOrd")}>
							{makeButton("mainClause")}
							<IonLabel>In Main Clauses</IonLabel>
						</IonItem>

							<IonItem className={classy("l3", "constOrd", "mainClause")}>
								<ul>
									<li>Human languages tend towards one of six different basic forms.
										<ul>
											<li><strong>S</strong> is the Subject of an intransitive clause.
												<ul><li><em>Bob</em> pitches.</li></ul>
											</li>
											<li><strong>V</strong> is the verb in a clause.
												<ul><li>Bob <em>pitches</em>.</li></ul>
											</li>
											<li><strong>A</strong> is the Agent of a transitive clause.
												<ul><li><em>Bob</em> pitches softballs.</li></ul>
											</li>
											<li><strong>P</strong> is the Patient of a transitive clause.
												<ul><li>Bob pitches <em>softballs</em>.</li></ul>
											</li>
										</ul>
									</li>
								</ul>
							</IonItem>
							<IonItem className={classy("l3", "constOrd", "mainClause")}>
								<IonGrid className="cols3">
									<IonRow className="header">
										<IonCol className="cbox">Primary?</IonCol>
										<IonCol className="cbox leftA">Order</IonCol>
										<IonCol>Example</IonCol>
									</IonRow>
									<IonRow>
										<IonCol className="cbox"><IonCheckbox /></IonCol>
										<IonCol className="cbox leftA"><strong>APV/SV</strong></IonCol>
										<IonCol><em>Bob softballs pitches; Bob pitches.</em></IonCol>
									</IonRow>
									<IonRow>
										<IonCol className="cbox"><IonCheckbox /></IonCol>
										<IonCol className="cbox leftA"><strong>AVP/SV</strong></IonCol>
										<IonCol><em>Bob pitches softballs; Bob pitches.</em></IonCol>
									</IonRow>
									<IonRow>
										<IonCol className="cbox"><IonCheckbox /></IonCol>
										<IonCol className="cbox leftA"><strong>PAV/SV</strong></IonCol>
										<IonCol><em>Softballs Bob pitches; Bob pitches.</em></IonCol>
									</IonRow>
									<IonRow>
										<IonCol className="cbox"><IonCheckbox /></IonCol>
										<IonCol className="cbox leftA"><strong>PVA/VS</strong></IonCol>
										<IonCol><em>Softballs pitches Bob; Pitches Bob.</em></IonCol>
									</IonRow>
									<IonRow>
										<IonCol className="cbox"><IonCheckbox /></IonCol>
										<IonCol className="cbox leftA"><strong>VAP/VS</strong></IonCol>
										<IonCol><em>Pitches Bob softballs; Pitches Bob.</em></IonCol>
									</IonRow>
									<IonRow>
										<IonCol className="cbox"><IonCheckbox /></IonCol>
										<IonCol className="cbox leftA"><strong>VPA/VS</strong></IonCol>
										<IonCol><em>Pitches softballs Bob; Pitches Bob.</em></IonCol>
									</IonRow>
								</IonGrid>
							</IonItem>
							<IonItem className={classy("l3", "constOrd", "mainClause")}>
								<ul>
									<li>Dependant clauses, paragraph-initial clauses, clauses that introduce participants, questions, negative clauses, and clearly contrastive clauses may use different formats.</li>
									<li>"Rigid" systems may put other constituents into the <strong>P</strong> slot on a regular basis.</li>
									<li>"Flexible" or "free" systems use something other than grammatical relations to determine order:
										<ul>
											<li>Hebrew puts new, indefinite info pre-verb, definite info post-verb.</li>
											<li>Some will fix PV or AV relations in almost all cases, leaving the other "free".
												<ul><li>i.e. A fixed PV may allow APV and PVA, and a fixed AV may allow PAV and AVP.</li></ul>
											</li>
										</ul>
									</li>
								</ul>
							</IonItem>
							<IonItem className={classy("l3", "constOrd", "mainClause")}>
								<IonTextarea rows={3} placeholder="" enterkeyhint="done" inputmode="text" />
							</IonItem>

						<IonItem className={classy("h h2 l2", "constOrd")}>
							{makeButton("vPhr")}
							<IonLabel>Verb Phrases</IonLabel>
						</IonItem>

						<IonItem className={classy("h h2 l2", "constOrd")}>
							{makeButton("nPhr")}
							<IonLabel>Noun Phrases</IonLabel>
						</IonItem>

						<IonItem className={classy("h h2 l2", "constOrd")}>
							{makeButton("adpPhr")}
							<IonLabel>Adpositional Phrases</IonLabel>
						</IonItem>

						<IonItem className={classy("h h2 l2", "constOrd")}>
							{makeButton("comPhr")}
							<IonLabel>Comparatives</IonLabel>
						</IonItem>

						<IonItem className={classy("h h2 l2", "constOrd")}>
							{makeButton("quPhr")}
							<IonLabel>Question Particles and Words</IonLabel>
						</IonItem>

						<IonItem className={classy("h h2 l2", "constOrd")}>
							{makeButton("summary")}
							<IonLabel>Summary</IonLabel>
						</IonItem>

					<IonItem className="h h1">
						{makeButton("nounPhOp")}
						<IonLabel>Noun and Noun Phrase Operations</IonLabel>
					</IonItem>

					<IonItem className="h h1">
						{makeButton("predNom")}
						<IonLabel>Predicate Nominals and Related Constructions</IonLabel>
					</IonItem>

					<IonItem className="h h1">
						{makeButton("grammRel")}
						<IonLabel>Grammatical Relations</IonLabel>
					</IonItem>

					<IonItem className="h h1">
						{makeButton("voiceVal")}
						<IonLabel>Voice and Valence Adjusting Operations</IonLabel>
					</IonItem>

					<IonItem className="h h1">
						{makeButton("otherVerb")}
						<IonLabel>Other Verb and Verb Phrase Operations</IonLabel>
					</IonItem>
				</IonList>
			</IonContent>
		</IonPage>
	);
};
 
export default Lex;
