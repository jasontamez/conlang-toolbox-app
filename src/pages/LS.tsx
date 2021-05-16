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
	const makeBox = (what: keyof LangSketchBoolObject) => {
		return (
			<IonCheckbox onIonChange={(e) => setBool(what, e.detail.checked)} value={lsBool[what] || false} />
		);
	};
	const setNum = (what: keyof LangSketchNumberObject, value: number) => {
		dispatch(setLSNum(what, value));
	};
	const makeRange = (what: keyof LangSketchNumberObject, start: string, end: string, cls: string = "", max: number = 4) => {
		return (
			<IonRange onBlur={(e) => setNum(what, e.target.value as number)} value={lsNum[what] || 0} className={cls} color="secondary" snaps={true} step={1} ticks={true} min={0} max={max}>
				<IonLabel slot="start">{start}</IonLabel>
				<IonLabel slot="end">{end}</IonLabel>
			</IonRange>
		);
	};
	const setText = (what: keyof LangSketchTextObject, value: string) => {
		dispatch(setLSText(what, value));
	};
	const makeText = (what: keyof LangSketchTextObject, ph: string, rows: number = 3) => {
		return (
			<IonTextarea onBlur={(e) => setText(what, e.target.value || "")} value={lsText[what] || ""} placeholder={ph} rows={rows} enterkeyhint="done" inputmode="text" />
		);
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
									{makeRange("synthesis", "Isolating", "Polysynthetic", "spectrum", 10)}
								</IonItem>
								<IonItem className={classy("l4", "morphTypo", "tradTypo", "synth")}>
									<ul>
										<li>How many <em>morphemes</em> (the most basic unit of meaning) appear in a word?</li>
										<li>Chinese is very <em>isolating</em>, tending towards one morpheme per word.</li>
										<li>Inuit and Quechua are very <em>polysynthetic</em>, with many morphemes per word.</li>
									</ul>
								</IonItem>
								<IonItem className={classy("l4", "morphTypo", "tradTypo", "synth")}>
									{makeText("synthesis", "Write any more specific notes here.")}
								</IonItem>

							<IonItem className={classy("h h3 l3", "morphTypo", "tradTypo")}>
								{makeButton("fusion")}
								<IonLabel>Fusion</IonLabel>
							</IonItem>

								<IonItem className={classy("l4", "morphTypo", "tradTypo", "fusion")}>
									{makeRange("fusion", "Fusional", "Agglutinative", "spectrum", 10)}
								</IonItem>
								<IonItem className={classy("l4", "morphTypo", "tradTypo", "fusion")}>
									<ul>
										<li>How many meanings does a morpheme encode?</li>
										<li>Spanish can be very <em>fusional</em>, with a single suffix capable of encoding tense, aspect, mood and number.</li>
										<li>English can be very <em>agglutinative</em>, with one meaning per morpheme (e.g. anti-dis-establish-ment-ari-an-ism), though fusional forms are possible (e.g. swam, was).</li>
									</ul>
								</IonItem>
								<IonItem className={classy("l4", "morphTypo", "tradTypo", "fusion")}>
									{makeText("fusion", "Write any more specific notes here.")}
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
											<IonCol className="cbox">{makeBox("prefixMost")}</IonCol>
											<IonCol className="cbox">{makeBox("prefixLess")}</IonCol>
											<IonCol>Prefix</IonCol>
										</IonRow>
										<IonRow>
											<IonCol className="cbox">{makeBox("suffixMost")}</IonCol>
											<IonCol className="cbox">{makeBox("suffixLess")}</IonCol>
											<IonCol>Suffix</IonCol>
										</IonRow>
										<IonRow>
											<IonCol className="cbox">{makeBox("circumfixMost")}</IonCol>
											<IonCol className="cbox">{makeBox("circumfixLess")}</IonCol>
											<IonCol>Circumfix</IonCol>
										</IonRow>
										<IonRow>
											<IonCol className="cbox">{makeBox("infixMost")}</IonCol>
											<IonCol className="cbox">{makeBox("infixLess")}</IonCol>
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
									{makeRange("stemMod", "Not Used", "Used Often")}
								</IonItem>
								<IonItem className={classy("l4", "morphTypo", "morphProc", "stemMod")}>
									<ul><li>e.g. swim/swam/swum.</li></ul>
								</IonItem>

							<IonItem className={classy("h h3 l3", "morphTypo", "morphProc")}>
								{makeButton("redup")}
								<IonLabel>Reduplication</IonLabel>
							</IonItem>

								<IonItem className={classy("l4", "morphTypo", "morphProc", "redup")}>
									{makeRange("redupe", "Not Used", "Used Often")}
								</IonItem>
								<IonItem className={classy("l4", "morphTypo", "morphProc", "redup")}>
									<ul><li>Often used for plurality.</li></ul>
								</IonItem>

							<IonItem className={classy("h h3 l3", "morphTypo", "morphProc")}>
								{makeButton("supsegMod")}
								<IonLabel>Suprasegmental Modification</IonLabel>
							</IonItem>

								<IonItem className={classy("l4", "morphTypo", "morphProc", "supsegMod")}>
									{makeRange("supraMod", "Not Used", "Used Often")}
								</IonItem>
								<IonItem className={classy("l4", "morphTypo", "morphProc", "supsegMod")}>
									<ul>
										<li>e.g. "permit" has different stress when a noun and a verb.</li>
										<li>Tone changes also fall under this category.</li>
									</ul>
								</IonItem>

							<IonItem className={classy("l4", "morphTypo", "morphProc")}>
								{makeText("morphProcess", "What sort of morphological processes are used?", 6)}
							</IonItem>

						<IonItem className={classy("h h2 l2", "morphTypo")}>
							{makeButton("headDepMark")}
							<IonLabel>Head/Dependant Marking</IonLabel>
						</IonItem>

							<IonItem className={classy("l3", "morphTypo", "headDepMark")}>
								<IonRange onBlur={(e) => setNum("headDepMarked", e.target.value as number)} value={lsNum.headDepMarked || 0} className="spectrum" color="secondary" snaps={true} step={1} ticks={true} min={0} max={4}>
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
								{makeText("headDepMark", "Write any more specific notes here.")}
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
										{makeText("propNames", "Write any more specific notes here.")}
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
										{makeText("possessable", "Describe how the language handles possession.", 4)}
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
										{makeText("countMass", "Write any more specific notes here.")}
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
									{makeText("pronounAnaphClitic", "Which system(s) are used by the language?", 4)}
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
									{makeText("semanticRole", "Describe which semantic roles are important.", 6)}
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
											<IonCol className="cbox">{makeBox("actions")}</IonCol>
											<IonCol className="label">Actions</IonCol>
											<IonCol>Agent affects Patient.</IonCol>
										</IonRow>
										<IonRow>
											<IonCol className="cbox">{makeBox("actionProcesses")}</IonCol>
											<IonCol className="label">Action-Processes</IonCol>
											<IonCol>Agent only.</IonCol>
										</IonRow>
										<IonRow>
											<IonCol className="cbox">{makeBox("weather")}</IonCol>
											<IonCol className="label">Weather Verbs</IonCol>
											<IonCol>In English, these require a dummy Agent ("<em>It</em> is raining"); this is not the case in many other languages!</IonCol>
										</IonRow>
										<IonRow>
											<IonCol className="cbox">{makeBox("states")}</IonCol>
											<IonCol className="label">States</IonCol>
											<IonCol>be hot, be broken, be frozen, etc; may be predicate-bound.</IonCol>
										</IonRow>
										<IonRow>
											<IonCol className="cbox">{makeBox("involuntaryProcesses")}</IonCol>
											<IonCol className="label">Involuntary Processes</IonCol>
											<IonCol>He grew; It broke; They died; etc</IonCol>
										</IonRow>
										<IonRow>
											<IonCol className="cbox">{makeBox("bodyFunctions")}</IonCol>
											<IonCol className="label">Bodily Functions</IonCol>
											<IonCol>cough, sweat, bleed, cry, etc</IonCol>
										</IonRow>
										<IonRow>
											<IonCol className="cbox">{makeBox("motion")}</IonCol>
											<IonCol className="label">Motion</IonCol>
											<IonCol>go, float, proceed, etc</IonCol>
										</IonRow>
										<IonRow>
											<IonCol className="cbox">{makeBox("position")}</IonCol>
											<IonCol className="label">Position</IonCol>
											<IonCol>sit, stand, hang, etc</IonCol>
										</IonRow>
										<IonRow>
											<IonCol className="cbox">{makeBox("factive")}</IonCol>
											<IonCol className="label">Factive</IonCol>
											<IonCol>Something comes into being: e.g. build, form, ignite, create</IonCol>
										</IonRow>
										<IonRow>
											<IonCol className="cbox">{makeBox("cognition")}</IonCol>
											<IonCol className="label">Cognition</IonCol>
											<IonCol>know, suspect, forget etc</IonCol>
										</IonRow>
										<IonRow>
											<IonCol className="cbox">{makeBox("sensation")}</IonCol>
											<IonCol className="label">Sensation</IonCol>
											<IonCol>hear, see, taste, etc</IonCol>
										</IonRow>
										<IonRow>
											<IonCol className="cbox">{makeBox("emotion")}</IonCol>
											<IonCol className="label">Emotion</IonCol>
											<IonCol>be happy, be afraid, be mellow, etc</IonCol>
										</IonRow>
										<IonRow>
											<IonCol className="cbox">{makeBox("utterance")}</IonCol>
											<IonCol className="label">Utterance</IonCol>
											<IonCol>say, yell, murmur, declare, chat, etc</IonCol>
										</IonRow>
										<IonRow>
											<IonCol className="cbox">{makeBox("manipulation")}</IonCol>
											<IonCol className="label">Manipulation</IonCol>
											<IonCol>force, urge, cause, let, permit, allow, compel, etc</IonCol>
										</IonRow>
									</IonGrid>
								</IonItem>

								<IonItem className={classy("l4", "grammCateg", "verbs", "classes")}>
									{makeText("verbClass", "Describe which verb classes exist as distinct categories in the language and how they are realized.", 8)}
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
									{makeText("verbStructure", "Describe the verb structure here.", 8)}
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
											<IonCol className="cbox">{makeBox("lexVerb")}</IonCol>
											<IonCol>Lexicalized as verbs (austronesian languages)</IonCol>
										</IonRow>
										<IonRow>
											<IonCol className="cbox">{makeBox("lexNoun")}</IonCol>
											<IonCol>Lexicalized as nouns (Finnish)</IonCol>
										</IonRow>
										<IonRow>
											<IonCol className="cbox">{makeBox("lexVN")}</IonCol>
											<IonCol>Lexicalized as nouns or verbs depending on the demands of discourse (Dutch)</IonCol>
										</IonRow>
										<IonRow>
											<IonCol className="cbox">{makeBox("lexVorN")}</IonCol>
											<IonCol>Some are lexicalized as nouns, others are lexicalized as verbs (Yoruba)</IonCol>
										</IonRow>
										<IonRow>
											<IonCol className="cbox">{makeBox("adjectives")}</IonCol>
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
									{makeText("propClass", "Write any more specific notes here.")}
								</IonItem>

							<IonItem className={classy("h h3 l3", "grammCateg", "modif")}>
								{makeButton("nonNumQ")}
								<IonLabel>Non-Numeral Quantifiers</IonLabel>
							</IonItem>

								<IonItem className={classy("l4", "grammCateg", "modif", "nonNumQ")}>
									<ul>
										<li>e.g. few, many, some</li>
									</ul>
								</IonItem>
								<IonItem className={classy("l4", "grammCateg", "modif", "nonNumQ")}>
									{makeText("quantifier", "Which quantifiers exist?")}
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
									{makeText("numeral", "Describe the language's numeral system.", 6)}
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
								{makeText("adverb", "How are adverbs (or adverb-like phrases) handled?", 4)}
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
										<IonCol className="cbox">{makeBox("APV")}</IonCol>
										<IonCol className="cbox leftA"><strong>APV/SV</strong></IonCol>
										<IonCol><em>Bob softballs pitches; Bob pitches.</em></IonCol>
									</IonRow>
									<IonRow>
										<IonCol className="cbox">{makeBox("AVP")}</IonCol>
										<IonCol className="cbox leftA"><strong>AVP/SV</strong></IonCol>
										<IonCol><em>Bob pitches softballs; Bob pitches.</em></IonCol>
									</IonRow>
									<IonRow>
										<IonCol className="cbox">{makeBox("PAV")}</IonCol>
										<IonCol className="cbox leftA"><strong>PAV/SV</strong></IonCol>
										<IonCol><em>Softballs Bob pitches; Bob pitches.</em></IonCol>
									</IonRow>
									<IonRow>
										<IonCol className="cbox">{makeBox("PVA")}</IonCol>
										<IonCol className="cbox leftA"><strong>PVA/VS</strong></IonCol>
										<IonCol><em>Softballs pitches Bob; Pitches Bob.</em></IonCol>
									</IonRow>
									<IonRow>
										<IonCol className="cbox">{makeBox("VAP")}</IonCol>
										<IonCol className="cbox leftA"><strong>VAP/VS</strong></IonCol>
										<IonCol><em>Pitches Bob softballs; Pitches Bob.</em></IonCol>
									</IonRow>
									<IonRow>
										<IonCol className="cbox">{makeBox("VPA")}</IonCol>
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
								{makeText("mainClause", "Write any more specific notes here.")}
							</IonItem>

						<IonItem className={classy("h h2 l2", "constOrd")}>
							{makeButton("vPhr")}
							<IonLabel>Verb Phrases</IonLabel>
						</IonItem>

							<IonItem className={classy("l3", "constOrd", "vPhr")}>
								<ul>
									<li>Where do <em>auxilliary verbs</em> (semantically empty, e.g. to be/to have) appear in relation to the main verb?</li>
									<li>Where do adverbs fit in relation to the verb and auxilliaries?</li>
								</ul>
							</IonItem>
							<IonItem className={classy("l3", "constOrd", "vPhr")}>
								{makeText("verbPhrase", "Answer those questions here.", 4)}
							</IonItem>

						<IonItem className={classy("h h2 l2", "constOrd")}>
							{makeButton("nPhr")}
							<IonLabel>Noun Phrases</IonLabel>
						</IonItem>

							<IonItem className={classy("l3", "constOrd", "nPhr")}>
								<ul>
									<li>What is the order of the determiners***, numerals***, genitives***, modifiers***, relative clauses***, classifiers***, and the head noun?</li>
								</ul>
							</IonItem>
							<IonItem className={classy("l3", "constOrd", "nPhr")}>
								{makeText("nounPhrase", "Answer here.", 4)}
							</IonItem>


						<IonItem className={classy("h h2 l2", "constOrd")}>
							{makeButton("adpPhr")}
							<IonLabel>Adpositional Phrases</IonLabel>
						</IonItem>

							<IonItem className={classy("l3", "constOrd", "adPhr")}>
								<IonGrid className="cols2">
									<IonRow>
										<IonCol className="cbox">{makeBox("preP")}</IonCol>
										<IonCol>Preposition (<em>with</em> an apple)</IonCol>
									</IonRow>
									<IonRow>
										<IonCol className="cbox">{makeBox("postP")}</IonCol>
										<IonCol>Postpostition (an apple <em>with</em>)</IonCol>
									</IonRow>
									<IonRow>
										<IonCol className="cbox">{makeBox("circumP")}</IonCol>
										<IonCol>Circumposition (rare; <em>with</em> an apple <em>with</em>)</IonCol>
									</IonRow>
								</IonGrid>
							</IonItem>
							<IonItem className={classy("l3", "constOrd", "adpPhr")}>
								<ul>
									<li>Many derive from verbs, especially serial verbs***.</li>
									<li>Others derive from nouns, especially body parts (top, back, face, head, etc).</li>
									<li>Adpositional phrases may appear the same as possessed noun phrases (in front of vs. on his face) or regular nouns (top vs. on top of).</li>
								</ul>
							</IonItem>
							<IonItem className={classy("l3", "constOrd", "adpPhr")}>
								{makeText("adPhrase", "Describe adpositions in the language.", 4)}
							</IonItem>


						<IonItem className={classy("h h2 l2", "constOrd")}>
							{makeButton("comPhr")}
							<IonLabel>Comparatives</IonLabel>
						</IonItem>

							<IonItem className={classy("l3", "constOrd", "comPhr")}>
								<ul>
									<li>Does the language even have a form? (e.g. X is big. Y is very big.)</li>
									<li>A comparison phrase requires a known standard, a marker that signals this is a comparison, and the quality of comparison.
										<ul>
											<li>For example, in <em>"X is bigger than Y"</em>, (<em>Y</em>) is the known standard, (<em>is __er than</em>) is a comparison marker, and (<em>big</em>) is the quality.</li>
										</ul>
									</li>
								</ul>
							</IonItem>
							<IonItem className={classy("l3", "constOrd", "comPhr")}>
								{makeText("compare", "Describe comparisons in the language.")}
							</IonItem>


						<IonItem className={classy("h h2 l2", "constOrd")}>
							{makeButton("quPhr")}
							<IonLabel>Question Particles and Words</IonLabel>
						</IonItem>

							<IonItem className={classy("l3", "constOrd", "quPhr")}>
								<ul>
									<li>In many languages, yes/no questions are indicated by a change in intonation. In others, a question particle is used; e.g. <em>do</em> you understand?</li>
									<li>Informal questions may require a specific question word.</li>
								</ul>
							</IonItem>
							<IonItem className={classy("l3", "constOrd", "quPhr")}>
								{makeText("questions", "How are questions handled in the language?")}
							</IonItem>


						<IonItem className={classy("h h2 l2", "constOrd")}>
							{makeButton("summary")}
							<IonLabel>Summary</IonLabel>
						</IonItem>

							<IonItem className={classy("l3", "constOrd", "summary")}>
								<ul>
									<li>When it comes to Agent/Patient/Verb order, is the language very consistent, fairly consistent, or very inconsistent?</li>
								</ul>
							</IonItem>
							<IonItem className={classy("l3", "constOrd", "summary")}>
								{makeText("COType", "Note consistency and any deviations not already covered.")}
							</IonItem>


					<IonItem className="h h1">
						{makeButton("NPO")}
						<IonLabel>Noun and Noun Phrase Operations</IonLabel>
					</IonItem>

						<IonItem className={classy("h h2 l2", "NPO")}>
							{makeButton("compounding")}
							<IonLabel>Compounding</IonLabel>
						</IonItem>

							<IonItem className={classy("l3", "NPO", "compounding")}>
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
							</IonItem>
							<IonItem className={classy("l3", "NPO", "compounding")}>
								{makeText("compounding", "Describe the sorts of compounding that happen in the language.", 4)}
							</IonItem>

						<IonItem className={classy("h h2 l2", "NPO")}>
							{makeButton("denom")}
							<IonLabel>Denominalization</IonLabel>
						</IonItem>

							<IonItem className={classy("l3", "NPO", "denom")}>
								<ul>
									<li>Some languages have many ways of changing a noun into a non-noun.
										<ul>
											<li>English can append <em>-like</em> to make an adjective.</li>
											<li>Eskimo has many verbalizing forms, e.g. to be X, to go towards X, to play with X, to hunt X.</li>
										</ul>
									</li>
								</ul>
							</IonItem>
							<IonItem className={classy("l3", "NPO", "denom")}>
								{makeText("denoms", "Describe the language's denominalization strategies.", 4)}
							</IonItem>

						<IonItem className={classy("h h2 l2", "NPO")}>
							{makeButton("nNumber")}
							<IonLabel>Number</IonLabel>
						</IonItem>

							<IonItem className={classy("l3", "NPO", "nNumber")}>
								<ul>
									<li>Some languages only mark number occassionally or optionally depending on the type of noun.</li>
									<li>Often intertwined with other markers, such as case marking in Romance languages.</li>
									<li>Most languages leave the singular unmarked, but not all!</li>
									<li>Number marking may be as simple as singular/plural (more than one), or incorporate dual (two), trial (three), paucal (small amount), and/or plural (larger amounts).</li>
								</ul>
							</IonItem>
							<IonItem className={classy("l3", "NPO", "nNumber")}>
								{makeText("nNumber", "Describe how nouns interact with number.", 4)}
							</IonItem>

						<IonItem className={classy("h h2 l2", "NPO")}>
							{makeButton("nCase")}
							<IonLabel>Case</IonLabel>
						</IonItem>

							<IonItem className={classy("l3", "NPO", "nCase")}>
								<ul>
									<li>Case markings can describe the role a noun plays in a sentence.</li>
									<li>In English, most case markings only survive in the pronouns, with word order doing the job for regular nouns. The major exception is the genitive case (possessive), which is marked with <em>'s</em>.</li>
								</ul>
							</IonItem>
							<IonItem className={classy("l3", "NPO", "nCase")}>
								{makeText("case", "Describe how nouns interact with case.", 4)}
							</IonItem>

						<IonItem className={classy("h h2 l2", "NPO")}>
							{makeButton("articlesDD")}
							<IonLabel>Articles, Determiners, Demonstratives</IonLabel>
						</IonItem>

							<IonItem className={classy("l3", "NPO", "articlesDD")}>
								<ul>
									<li>Do articles exist? Are they obligatory or optional? When do they occur? Are they separate words or bound morphemes?</li>
									<li>Is there a class of demonstratives distinct from articles?
										<ul>
											<li>How many degrees of distance are represented? English has two: this/that. Spanish has three.</li>
											<li>Are there other distinctions besides distance?</li>
										</ul>
									</li>
									<li>Do other determiners exist? These words distinguish or identify a noun without modifying it.</li>
								</ul>
							</IonItem>
							<IonItem className={classy("l3", "NPO", "articlesDD")}>
								{makeText("articlesEtc", "Describe how articles, determiners, and demonstratives work.", 6)}
							</IonItem>

						<IonItem className={classy("h h2 l2", "NPO")}>
							{makeButton("posss")}
							<IonLabel>Possessors</IonLabel>
						</IonItem>

							<IonItem className={classy("l3", "NPO", "posss")}>
								<ul>
									<li>This does <strong>not</strong> refer to possessive clauses!</li>
									<li>How are possessors expressed in the noun phrase?</li>
									<li>Do nouns agree with their possessors? Vice versa?</li>
								</ul>
							</IonItem>
							<IonItem className={classy("l3", "NPO", "posss")}>
								{makeText("possessors", "Describe how possession works in a noun phrase.", 3)}
							</IonItem>

						<IonItem className={classy("h h2 l2", "NPO")}>
							{makeButton("classGen")}
							<IonLabel>Class (Gender)</IonLabel>
						</IonItem>

							<IonItem className={classy("l3", "NPO", "classGen")}>
								<ul>
									<li>Class system often require classifiers (special operators) to declare class.</li>
									<li>Gender systems use "agreement". At the very least, they will agree in number.</li>
									<li>What classes/genders exist and how do they manifest?</li>
									<li>What dimension of reality is most central to the class system? (animacy? shape? function?) What other dimensions are relevant?</li>
									<li>Do the classifiers occur with numerals? Adjectives? Verbs? What is their function in these contexts?</li>
								</ul>
							</IonItem>
							<IonItem className={classy("l3", "NPO", "classGen")}>
								{makeText("classGender", "Describe the language's class/gender system.", 8)}
							</IonItem>

						<IonItem className={classy("h h2 l2", "NPO")}>
							{makeButton("dimAug")}
							<IonLabel>Diminution/Augmentation</IonLabel>
						</IonItem>

							<IonItem className={classy("l3", "NPO", "dimAug")}>
								<ul>
									<li>Is diminution (making smaller) and/or augmentation (making bigger) used in the language?</li>
									<li>Is it obligatory? Does one member have to occur in every full noun phrase?</li>
									<li>Is it productive? Does it work with all full noun phrases and does it have the same meaning for each?</li>
									<li>Expressed lexically. morphologically, or analytically?</li>
									<li>Where in the NP is this operation likely to be located? Can it occur in more than one place?</li>
								</ul>
							</IonItem>
							<IonItem className={classy("l3", "NPO", "dimAug")}>
								{makeText("dimAug", "Describe the language's relation to diminution and augmentation.", 8)}
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
