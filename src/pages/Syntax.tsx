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
	setSyntaxBool,
	setSyntaxNum,
	setSyntaxText,
	toggleSyntaxState
} from '../components/ReduxDucksFuncs';
import { SyntaxSketchBoolObject, SyntaxSketchNumberObject, SyntaxSketchTextObject } from '../components/ReduxDucksTypes';
//import { CustomStorageSyntax } from '../components/PersistentInfo';
import ExtraCharactersModal from './M-ExtraCharacters';
import { $i, $a } from '../components/DollarSignExports';

const Syntax = () => {
	const dispatch = useDispatch();
	const [lsState, lsInfo] = useSelector((state: any) => [state.syntaxSketchState, state.syntaxSketchInfo]);
	const [lsBool, lsNum, lsText] = [lsInfo.bool, lsInfo.num, lsInfo.text];
	const toggle = (what: string) => {
		dispatch(toggleSyntaxState(what));
	};
	const classy = (...folders: string[]) => {
		let primary = folders.shift();
		//return primary;
		return folders.every((prop: string) => lsState[prop]) ? primary : "toggled";
	};
	const setBool = (what: keyof SyntaxSketchBoolObject, value: boolean) => {
		dispatch(setSyntaxBool(what, value));
	};
	const makeBox = (what: keyof SyntaxSketchBoolObject) => {
		return (
			<IonCheckbox onIonChange={(e) => setBool(what, e.detail.checked)} value={lsBool[what] || false} />
		);
	};
	const setNum = (what: keyof SyntaxSketchNumberObject, value: number) => {
		dispatch(setSyntaxNum(what, value));
	};
	const makeRange = (what: keyof SyntaxSketchNumberObject, start: string, end: string, cls: string = "", max: number = 4) => {
		return (
			<IonRange onBlur={(e) => setNum(what, e.target.value as number)} value={lsNum[what] || 0} className={cls} color="secondary" snaps={true} step={1} ticks={true} min={0} max={max}>
				<IonLabel slot="start">{start}</IonLabel>
				<IonLabel slot="end">{end}</IonLabel>
			</IonRange>
		);
	};
	const setText = (what: keyof SyntaxSketchTextObject, value: string) => {
		dispatch(setSyntaxText(what, value));
	};
	const makeText = (what: keyof SyntaxSketchTextObject, ph: string, rows: number = 3) => {
		return (
			<IonTextarea onBlur={(e) => setText(what, e.target.value || "")} value={lsText[what] || ""} placeholder={ph} rows={rows} enterkeyhint="done" inputmode="text" />
		);
	};
	const toggleButton = (tag: string, cName: string, otherProps: object = {}, tip: string = "Show tips and ideas.", hide: string = "Hide tips and ideas.") => {
		return React.createElement(
			tag,
			{
				id: cName + "Toggle",
				className: "toggleButton",
				"data-other": hide,
				onClick: () => toggleTip(cName),
				...otherProps
			},
			tip
		);
	};
	const toggleTip = (cName: string) => {
		const toggle = $i(cName + "Toggle");
		if(toggle === null) {
			console.log("Bad ID/ClassName: " + cName);
			return;
		}
		const current = toggle.textContent;
		const swap = toggle.dataset.other;
		toggle.textContent = swap;
		toggle.dataset.other = current;
		toggle.classList.toggle("toggled");
		$a("." + cName).forEach((tag: HTMLElement) => {
			tag.classList.toggle("hide");
		});
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
					<IonTitle>SyntaxSketch</IonTitle>
					<IonButtons slot="end">
						<IonButton onClick={() => dispatch(openModal("ExtraCharacters"))}>
							<IonIcon icon={globeOutline} />
						</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen className="evenBackground disappearingHeaderKludgeFix" id="syntaxSketchPage">
				<IonList lines="none">

					<IonItem className="h h1">
						{makeButton("morphTypo")}
						<IonLabel>1. Morphological Typology</IonLabel>
					</IonItem>

						<IonItem className={classy("h h2 l2", "morphTypo")}>
							{makeButton("tradTypo")}
							<IonLabel>1.1. Traditional Typology</IonLabel>
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
										<li>NOTE: This section is not needed if the language is completely isolating.</li>
									</ul>
								</IonItem>

							<IonItem className={classy("l3", "morphTypo", "tradTypo")}>
								{makeText("tradTypol", "Give examples of the dominant pattern and any secondary patterns.")}
							</IonItem>

						<IonItem className={classy("h h2 l2", "morphTypo")}>
							{makeButton("morphProc")}
							<IonLabel>1.2. Morphological Processes</IonLabel>
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
									<ul>
										<li>If the language is at all agglutinative, which form predominates?</li>
										<li>Most natural languages use suffixes. Some also have prefixes and/or infixes or circumfixes. Few only have prefixes, and none have only infixes or circumfixes.</li>
									</ul>
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
								{makeButton("suppletion")}
								<IonLabel>Suppletion</IonLabel>
							</IonItem>

								<IonItem className={classy("l4", "morphTypo", "morphProc", "suppletion")}>
									{makeRange("suppletion", "Not Used", "Used Often")}
								</IonItem>
								<IonItem className={classy("l4", "morphTypo", "morphProc", "suppletion")}>
									<ul><li>An entirely new stem is substituted for the root, e.g. "be" being replaced by is/am/are/was/were.</li></ul>
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
								{makeText("morphProcess", "What sort of morphological processes are used? Illustrate the major and secondary pratterns.", 6)}
							</IonItem>

						<IonItem className={classy("h h2 l2", "morphTypo")}>
							{makeButton("headDepMark")}
							<IonLabel>1.3. Head/Dependant Marking</IonLabel>
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
						<IonLabel>2. Grammatical Categories</IonLabel>
					</IonItem>

						<IonItem className={classy("h h2 l2", "grammCateg")}>
							{makeButton("nouns")}
							<IonLabel>2.1. Nouns (the most time-stable concepts)</IonLabel>
						</IonItem>

							<IonItem className={classy("h h3 l3", "grammCateg", "nouns")}>
								{makeButton("nounTypes")}
								<IonLabel>2.1.1. Types of Nouns</IonLabel>
							</IonItem>

								<IonItem className={classy("h l4", "grammCateg", "nouns", "nounTypes")}>
									{makeButton("properNames")}
									<IonLabel>2.1.1.1. Proper Names</IonLabel>
								</IonItem>

									<IonItem className={classy("l5", "grammCateg", "nouns", "nounTypes", "properNames")}>
										<ul>
											<li>In English, they do not easily take articles, quantifiers and other modifiers.</li>
											<li>Other languages may have special case markers (4.4) for them.</li>
										</ul>
									</IonItem>
									<IonItem className={classy("l5", "grammCateg", "nouns", "nounTypes", "properNames")}>
										{makeText("propNames", "Write any more specific notes here.")}
									</IonItem>

								<IonItem className={classy("h l4", "grammCateg", "nouns", "nounTypes")}>
									{makeButton("possess")}
									<IonLabel>2.1.1.2. Possessability</IonLabel>
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
									<IonLabel>2.1.1.3. Count vs Mass</IonLabel>
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
								<IonLabel>2.1.2. Pronouns and Anaphoric Clitics</IonLabel>
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
							<IonLabel>2.2. Verbs (the least time-stable concepts)</IonLabel>
						</IonItem>

							<IonItem className={classy("h h3 l3", "grammCateg", "verbs")}>
								{makeButton("semanRole")}
								<IonLabel>2.2.1. Semantic Roles</IonLabel>
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
												<li>I hit Steve with the hammer.</li>
												<li>The hammer hit Steve.</li>
												<li>Steve was hit.</li>
											</ul>
										</li>
									</ul>
								</IonItem>
								<IonItem className={classy("l4", "grammCateg", "verbs", "semanRole")}>
									{makeText("semanticRole", "Describe which semantic roles are important.", 6)}
								</IonItem>

							<IonItem className={classy("h h3 l3", "grammCateg", "verbs")}>
								{makeButton("classes")}
								<IonLabel>2.2.2. Verb Classes</IonLabel>
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
											<IonCol>Something comes into being: e.g. build, form, ignite, create; rarely treated differently than Actions</IonCol>
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
								<IonLabel>2.2.3. Verb Structure</IonLabel>
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
							<IonLabel>2.3. Modifiers</IonLabel>
						</IonItem>

							<IonItem className={classy("h h3 l3", "grammCateg", "modif")}>
								{makeButton("pcda")}
								<IonLabel>2.3.1. Property Concepts (Descriptive Adjectives)</IonLabel>
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
								<IonLabel>2.3.2. Non-Numeral Quantifiers</IonLabel>
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
								<IonLabel>2.3.3. Numerals</IonLabel>
							</IonItem>

								<IonItem className={classy("h l4 leading", "grammCateg", "modif", "numer")}>
									<IonLabel>Extent</IonLabel>
								</IonItem>

									<IonItem className={classy("l5 following", "grammCateg", "modif", "numer")}>
										<ul>
											<li>Some languages have restricted numerals: e.g. 1, 2, 3, many.</li>
											<li>Only very advanced societies will have a need for numbers beyond a thousand.</li>
										</ul>
									</IonItem>

								<IonItem className={classy("h l4 leading", "grammCateg", "modif", "numer")}>
									<IonLabel>Base</IonLabel>
								</IonItem>

									<IonItem className={classy("l5 following", "grammCateg", "modif", "numer")}>
										<ul>
											<li>Usually base 5 or 10. Sometimes 20.</li>
											<li>Numerals can be described from greatest to least ("twenty-two"), from least to greatest ("two-twenty"), or not give base multiples a special name ("two-two").</li>
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
							<IonLabel>2.4. Adverbs (a "catch-all" category)</IonLabel>
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
						<IonLabel>3. Constituent Order Typology</IonLabel>
					</IonItem>

						<IonItem className={classy("h h2 l2", "constOrd")}>
							{makeButton("mainClause")}
							<IonLabel>3.1. In Main Clauses</IonLabel>
						</IonItem>

							<IonItem className={classy("l3", "constOrd", "mainClause")}>
								<ul>
									<li>Human languages tend towards one of six different basic forms.
										<ul>
											<li><strong>S</strong> is the Subject of an intransitive clause.
												<ul><li><em>Steve</em> pitches.</li></ul>
											</li>
											<li><strong>V</strong> is the verb in a clause.
												<ul><li>Steve <em>pitches</em>.</li></ul>
											</li>
											<li><strong>A</strong> is the Agent of a transitive clause.
												<ul><li><em>Steve</em> pitches softballs.</li></ul>
											</li>
											<li><strong>P</strong> is the Patient of a transitive clause.
												<ul><li>Steve pitches <em>softballs</em>.</li></ul>
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
										<IonCol><em>Steve softballs pitches; Steve pitches.</em></IonCol>
									</IonRow>
									<IonRow>
										<IonCol className="cbox">{makeBox("AVP")}</IonCol>
										<IonCol className="cbox leftA"><strong>AVP/SV</strong></IonCol>
										<IonCol><em>Steve pitches softballs; Steve pitches.</em></IonCol>
									</IonRow>
									<IonRow>
										<IonCol className="cbox">{makeBox("VAP")}</IonCol>
										<IonCol className="cbox leftA"><strong>VAP/VS</strong></IonCol>
										<IonCol><em>Pitches Steve softballs; Pitches Steve.</em></IonCol>
									</IonRow>
									<IonRow>
										<IonCol className="cbox">{makeBox("VPA")}</IonCol>
										<IonCol className="cbox leftA"><strong>VPA/VS</strong></IonCol>
										<IonCol><em>Pitches softballs Steve; Pitches Steve.</em></IonCol>
									</IonRow>
									<IonRow>
										<IonCol className="cbox">{makeBox("PAV")}</IonCol>
										<IonCol className="cbox leftA"><strong>PAV/SV</strong></IonCol>
										<IonCol><em>Softballs Steve pitches; Steve pitches.</em></IonCol>
									</IonRow>
									<IonRow>
										<IonCol className="cbox">{makeBox("PVA")}</IonCol>
										<IonCol className="cbox leftA"><strong>PVA/VS</strong></IonCol>
										<IonCol><em>Softballs pitches Steve; Pitches Steve.</em></IonCol>
									</IonRow>
								</IonGrid>
							</IonItem>
							<IonItem className={classy("l3", "constOrd", "mainClause")}>
								<ul>
									<li>Dependant clauses, paragraph-initial clauses, clauses that introduce participants, questions, negative clauses, and clearly contrastive clauses may use different formats.</li>
									<li>"Rigid" systems may put other constituents into the <strong>P</strong> slot on a regular basis.
										<ul>
											<li>The softball was <em>filthy</em>: predicate adjective.</li>
											<li>Steve was <em>an awful pitcher</em>: predicate nominative.</li>
											<li>Steve went <em>to the dugouts</em>: oblique.</li>
										</ul>
									</li>
									<li>"Flexible" or "free" systems use something other than grammatical relations to determine order:
										<ul>
											<li>Biblical Hebrew puts new, indefinite info pre-verb, definite info post-verb.</li>
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
							<IonLabel>3.2. Verb Phrases</IonLabel>
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
							<IonLabel>3.3. Noun Phrases</IonLabel>
						</IonItem>

							<IonItem className={classy("l3", "constOrd", "nPhr")}>
								<ul>
									<li>What is the order of the determiners (4.5), numerals (2.3.3), genitives (possessors), modifiers (2.3.1), relative clauses***, classifiers***, and the head noun?</li>
								</ul>
							</IonItem>
							<IonItem className={classy("l3", "constOrd", "nPhr")}>
								{makeText("nounPhrase", "Answer here.", 4)}
							</IonItem>


						<IonItem className={classy("h h2 l2", "constOrd")}>
							{makeButton("adpPhr")}
							<IonLabel>3.4. Adpositional Phrases</IonLabel>
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
								{makeText("adPhrase", "Is the language dominantly prepositional or postpositional? Do many adpositions come from nouns or verbs?", 4)}
							</IonItem>


						<IonItem className={classy("h h2 l2", "constOrd")}>
							{makeButton("comPhr")}
							<IonLabel>3.5 Comparatives</IonLabel>
						</IonItem>

							<IonItem className={classy("l3", "constOrd", "comPhr")}>
								<ul>
									<li>Does the language even have a form? (e.g. X is big. Y is very big.)</li>
									<li>A comparison phrase requires a known standard, a marker that signals this is a comparison, and the quality of comparison.
										<ul>
											<li>For example, in <em>"X is bigger than Y"</em>, (<em>Y</em>) is the known standard, (<em>is __er than</em>) is a comparison marker, and (<em>big</em>) is the quality.</li>
										</ul>
									</li>
									<li>PV languages generally use a Standard-Quality-Marker order.</li>
									<li>VP languages tend towards Quality-Marker-Standard.</li>
								</ul>
							</IonItem>
							<IonItem className={classy("l3", "constOrd", "comPhr")}>
								{makeText("compare", "Does the language have one or more comparitive constructions? What is the order of the standard, the marker, and the quality being compared?")}
							</IonItem>


						<IonItem className={classy("h h2 l2", "constOrd")}>
							{makeButton("quPhr")}
							<IonLabel>3.6 Question Particles and Words</IonLabel>
						</IonItem>

							<IonItem className={classy("l3", "constOrd", "quPhr")}>
								<ul>
									<li>In many languages, yes/no questions are indicated by a change in intonation. In others, a question particle is used; e.g. <em>do</em> you understand?</li>
									<li>Informal questions may require a specific question word.</li>
								</ul>
							</IonItem>
							<IonItem className={classy("l3", "constOrd", "quPhr")}>
								{makeText("questions", "How are questions handled in the language? In informational questions, where does the question word occur?")}
							</IonItem>


						<IonItem className={classy("h h2 l2", "constOrd")}>
							{makeButton("summary")}
							<IonLabel>3.7 Summary</IonLabel>
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
						<IonLabel>4. Noun and Noun Phrase Operations</IonLabel>
					</IonItem>

						<IonItem className={classy("h h2 l2", "NPO")}>
							{makeButton("compounding")}
							<IonLabel>4.1. Compounding</IonLabel>
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
							<IonLabel>4.2. Denominalization</IonLabel>
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
								{makeText("denoms", "Are there any processes to make a verb from a noun? An adjecive? An adverb?", 4)}
							</IonItem>

						<IonItem className={classy("h h2 l2", "NPO")}>
							{makeButton("nNumber")}
							<IonLabel>4.3. Number</IonLabel>
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
								{makeText("nNumber", "Is number expressed in the noun phrase? Is the distinction between singular and non-singular obligatory, optional or absent? What non-singular distinctions are there?", 3)}
							</IonItem>
							<IonItem className={classy("l3", "NPO", "nNumber")}>
								{makeText("nNumberOpt", "If number-marking is optional, when does it tend to occur? When does it not tend to occur?", 4)}
							</IonItem>
							<IonItem className={classy("l3", "NPO", "nNumber")}>
								{makeText("nNumberObl", "If number-marking is obligatory, is number marking overtly expressed for all noun phrases, or only some subclasses (e.g. animates)?", 4)}
							</IonItem>

						<IonItem className={classy("h h2 l2", "NPO")}>
							{makeButton("nCase")}
							<IonLabel>4.4. Case</IonLabel>
						</IonItem>

							<IonItem className={classy("l3", "NPO", "nCase")}>
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
								</ul>
							</IonItem>
							<IonItem className={classy("l3", "NPO", "nCase")}>
								{makeText("case", "Do nouns exhibit morphological case? If so, what cases exist?", 4)}
							</IonItem>

						<IonItem className={classy("h h2 l2", "NPO")}>
							{makeButton("articlesDD")}
							<IonLabel>4.5. Articles and Demonstratives</IonLabel>
						</IonItem>

							<IonItem className={classy("l3", "NPO", "articlesDD")}>
								<ul>
									<li>English is relatively rare in having articles: a, an, the. More often, languages have a broader class of demonstratives.</li>
								</ul>
							</IonItem>
							<IonItem className={classy("l3", "NPO", "articlesDD")}>
								{makeText("articles", "If articles exist, are they obligatory or optional? When do they occur? Are they separate words or bound morphemes?", 6)}
							</IonItem>
							<IonItem className={classy("l3", "NPO", "articlesDD")}>
								<ul>
									<li>Demonstratives are words that distinguish or identify a noun without modifying it, such as this, that, these and those.</li>
									<li>They tend to encode distance ("this" is closer to you than "that"; Spanish has a third level of distance, too).</li>
								</ul>
							</IonItem>
							<IonItem className={classy("l3", "NPO", "articlesDD")}>
								{makeText("demonstratives", "How many levels of distance do determiners encode? Are there other distinctions besides distance?", 6)}
							</IonItem>

						<IonItem className={classy("h h2 l2", "NPO")}>
							{makeButton("posss")}
							<IonLabel>4.6. Possessors</IonLabel>
						</IonItem>

							<IonItem className={classy("l3", "NPO", "posss")}>
								<ul>
									<li>Refer back to 2.1.1.2 to note your system of possession.</li>
									<li>This does <strong>not</strong> refer to possessive clauses! (5.4)</li>
									<li>How are possessors expressed in the noun phrase?</li>
									<li>Do nouns agree with their possessors? Vice versa?</li>
								</ul>
							</IonItem>
							<IonItem className={classy("l3", "NPO", "posss")}>
								{makeText("possessors", "Describe how possession works in a noun phrase.", 3)}
							</IonItem>

						<IonItem className={classy("h h2 l2", "NPO")}>
							{makeButton("classGen")}
							<IonLabel>4.7. Class (Gender)</IonLabel>
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
								{makeText("classGender", "Describe the language's class/gender system, if it has one.", 8)}
							</IonItem>

						<IonItem className={classy("h h2 l2", "NPO")}>
							{makeButton("dimAug")}
							<IonLabel>4.8. Diminution/Augmentation</IonLabel>
						</IonItem>

							<IonItem className={classy("l3", "NPO", "dimAug")}>
								<ul>
									<li>Is diminution (making smaller) and/or augmentation (making bigger) used in the language?</li>
									<li>Is it obligatory? Does one member have to occur in every full noun phrase?</li>
									<li>Is it productive? Does it work with all full noun phrases and does it have the same meaning for each?</li>
									<li>Expressed lexically, morphologically, or analytically?</li>
									<li>Where in the NP is this operation likely to be located? Can it occur in more than one place?</li>
								</ul>
							</IonItem>
							<IonItem className={classy("l3", "NPO", "dimAug")}>
								{makeText("dimAug", "Describe the language's relation to diminution and augmentation.", 8)}
							</IonItem>

					<IonItem className="h h1">
						{makeButton("predNom")}
						<IonLabel>5. Predicate Nominals and Related Constructions</IonLabel>
					</IonItem>

						<IonItem className={classy("l2", "predNom")}>
							<ul>
								<li>These forms generally encode the following information:
									<ul>
										<li>Equation (X is Y)</li>
										<li>Proper inclusion (X is a Y)</li>
										<li>Location (X is located Y)</li>
										<li>Attribution (X is made Y)</li>
										<li>Existence (X exists in Y)</li>
										<li>Possession (X has Y)</li>
									</ul>
								</li>
								<li>The forms at the top of the list are much more likely to lack a semantically rich verb, while those at the bottom are less likely to.</li>
							</ul>
						</IonItem>

						<IonItem className={classy("h h2 l2", "predNom")}>
							{makeButton("pNom")}
							<IonLabel>5.1. Predicate Nominals and Adjecives</IonLabel>
						</IonItem>

							<IonItem className={classy("l3", "predNom", "pNom")}>
								<ul>
									<li>May encode <em>proper inclusion</em> (X is a Y) and <em>equation</em> (X is Y)</li>
									<li>Predicate adjectives are usually handled the same as predicate nominals, though they will sometimes use a different copula than the nouns.</li>
									<li>If they use a verb, it will not be a very <em>semantically rich</em> verb (e.g. to be, to do)</li>
									<li>Will generally use one of the following strategies:
										<ul>
											<li><em>Juxtaposition</em>
												<ul>
													<li>Two nouns (or a noun and adjective) are placed next to each other.</li>
													<li>Ex: Steve doctor. Mouse small. (Steve is a doctor. A mouse is small.)</li>
												</ul>
											</li>
											<li><em>Joined by copula</em>
												<ul>
													<li>A copula is a morpheme that "couples" two elements. Often encodes tense/aspect, and can be restricted to certain situations (e.g. only in non-present tenses).</li>
													<li>The copula can take different forms:
														<ul>
															<li><em>Verb</em>
																<ul>
																	<li>These tend to be very irregular verbs.</li>
																	<li>They tend to belong to the same verb class as stative verbs.</li>
																	<li>They tend to function as auxilliaries in other constructions.</li>
																	<li>Ex: Steve is a doctor.</li>
																</ul>
															</li>
															<li><em>Pronoun</em>
																<ul>
																	<li>The pronoun corresponds to the subject.</li>
																	<li>Ex: Steve, he a doctor.</li>
																</ul>
															</li>
															<li><em>Invariant particle</em>
																<ul>
																	<li>This particle may derive from a verb or pronoun.</li>
																	<li>The particle will not encode tense/aspect/gender/anything.</li>
																	<li>Ex: Steve blorp doctor.</li>
																</ul>
															</li>
															<li><em>Derivational operation</em>
																<ul>
																	<li>Predicate noun becomes a verb.</li>
																	<li>Ex: Steve doctor-being.</li>
																</ul>
															</li>
														</ul>
													</li>
												</ul>
											</li>
										</ul>
									</li>
								</ul>
							</IonItem>
							<IonItem className={classy("l3", "predNom", "pNom")}>
								{makeText("predNom", "Describe the language's strategy for predicate nominals and adjectives.", 6)}
							</IonItem>

						<IonItem className={classy("h h2 l2", "predNom")}>
							{makeButton("pLoc")}
							<IonLabel>5.2. Predicate Locatives</IonLabel>
						</IonItem>

							<IonItem className={classy("l3", "predNom", "pLoc")}>
								<ul>
									<li>Many languages use a word that gets translated as "be at".</li>
									<li>Locative word is often the same as a locative adposition.</li>
									<li>Word order usually distinguishes possessive clauses from locational clauses.
										<ul>
											<li>Ex: Steve has a cat; the cat is behind Steve.</li>
										</ul>
									</li>
									<li>English bases locatives on possessive clauses, but with an inanimate possessor.</li>
									<li>Russian bases possessive clauses on locatives, but with an animate possessor.</li>
								</ul>
							</IonItem>
							<IonItem className={classy("l3", "predNom", "pLoc")}>
								{makeText("predLoc", "How does the language handle predicate locatives?", 6)}
							</IonItem>

						<IonItem className={classy("h h2 l2", "predNom")}>
							{makeButton("pEx")}
							<IonLabel>5.3. Existentials</IonLabel>
						</IonItem>

							<IonItem className={classy("l3", "predNom", "pEx")}>
								<ul>
									<li>These constructions usually serve a presentative function, introducing new participants.</li>
									<li>Usually, the nominal is indefinite: "There are lions in Africa" vs. "There are the lions in Africa".</li>
									<li>Usually little to no case marking, verb agreement, etc.</li>
									<li>Often share features of predicate nominals (copula), but some languages prohibit such forms.</li>
									<li>Often has special negation stategies (e.g. a verb meaning 'to lack': "Under the bed lacks a cat").</li>
									<li>Often play a role in "impersonal" or "circumstantial" constructions ("There will be dancing in the streets!"), for situations that lack the need for any specific actor ("Someone is crying"), or to downplay the significance of an actor ("Mistakes have been made").</li>
								</ul>
							</IonItem>
							<IonItem className={classy("l3", "predNom", "pEx")}>
								{makeText("predEx", "How are existential clauses formed? Does this vary according to tense, aspect or mood? Is there a special negation strategy? Is this form used to impart other information (such as possessives) as well?", 6)}
							</IonItem>

						<IonItem className={classy("h h2 l2", "predNom")}>
							{makeButton("pPoss")}
							<IonLabel>5.4. Possessive Clauses</IonLabel>
						</IonItem>

							<IonItem className={classy("l3", "predNom", "pPoss")}>
								<ul>
									<li>Verb strategy: "I have a book."</li>
									<li>Copula strategy: "The book is at me."</li>
								</ul>
							</IonItem>
							<IonItem className={classy("l3", "predNom", "pPoss")}>
								{makeText("predEx", "Which format does the language use?", 3)}
							</IonItem>

					<IonItem className="h h1">
						{makeButton("grammRel")}
						<IonLabel>6. Grammatical Relations</IonLabel>
					</IonItem>

						<IonItem className={classy("h h2 l2", "grammRel")}>
							<IonLabel>Nominative/Accusative Alignment</IonLabel>
						</IonItem>

							<IonItem className={classy("l3", "grammRel")}>
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
							</IonItem>

						<IonItem className={classy("h h2 l2", "grammRel")}>
							<IonLabel>Ergative/Absolutive Alignment</IonLabel>
						</IonItem>

							<IonItem className={classy("l3", "grammRel")}>
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
									{toggleButton("li", "splitErgativity")}
									<li className="splitErgativity hide">In natural languages, this tends to coexist in a hierarchy with the nominative/accusative system. 
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
							</IonItem>

						<IonItem className={classy("l2", "grammRel")}>
							{makeText("ergative", "Does the language use a nominative/accusative alignment, or an ergative/absolutive alignment? Are there any exceptions?", 8)}
						</IonItem>

					<IonItem className="h h1">
						{makeButton("voiceVal")}
						<IonLabel>7. Voice and Valence Adjusting Operations</IonLabel>
					</IonItem>

						<IonItem className={classy("l2", "voiceVal")}>
							<ul>
								<li><strong>Valence</strong> refers to the amount of arguments in a clause.
									<ul>
										<li>"I fell" has a valence of 1.</li>
										<li>"I pushed Steve" has a valence of 2.</li>
										<li>"I gave Steve a coconut" has a valence of 3.</li>
										<li>"I gave a coconut to Steve" has a valence of 2.
											<ul>
												<li>"To Steve" is in an oblique case, forming a verb modifier instead of being an argument of the verb.</li>
											</ul>
										</li>
									</ul>
								</li>
							</ul>
						</IonItem>
						<IonItem className={classy("h h2 l2", "voiceVal")}>
							{makeButton("valAdd")}
							<IonLabel>7.1. Valence-Increasing Operations</IonLabel>
						</IonItem>

							<IonItem className={classy("h l3", "voiceVal", "valAdd")}>
								{makeButton("causatives")}
								<IonLabel>7.1.1. Causatives</IonLabel>
							</IonItem>

								<IonItem className={classy("l4", "voiceVal", "valAdd", "causatives")}>
									<ul>
										<li><strong>Lexical</strong>
											<ul>
												<li>Most languages have at least some form of this. There are three major methods employed:
													<ul>
														<li>No change in the verb:
															<ul>
																<li>"The vase broke" becomes "Steve broke the vase".</li>
															</ul>
														</li>
														<li>Some idiosyncratic change the verb:
															<ul>
																<li>"The tree fell" becomes "Steve felled the tree".</li>
															</ul>
														</li>
														<li>Different verb:
															<ul>
																<li>"The tree died" becomes "Steve killed the tree".</li>
															</ul>
														</li>
													</ul>
												</li>
											</ul>
										</li>
										<li><strong>Morphological</strong>
											<ul>
												<li>The verb change applies to all verbs (not just one, like <em>fell</em> vs <em>felled</em>).</li>
												<li>Often expresses causation and permission.</li>
												<li>May be restricted to only intransitive verbs.</li>
												<li>In transitive verbs, the causee often goes into a different case.</li>
											</ul>
										</li>
										<li><strong>Analytical</strong>
											<ul>
												<li>A separate causative verb is used. This usually isn't valence-increasing!
													<ul>
														<li>"Steve caused the tree to die".</li>
														<li>"Steve forced the stick into the ground."</li>
													</ul>
												</li>
											</ul>
										</li>
										{toggleButton("li", "causativeCoding")}
										<li className="causativeCoding hide tip"><strong>Coding Principles</strong>
											<ul>
												<li><strong>Structural Distance</strong>
													<ul>
														<li>If the language has more than one formal type of causative, the "smaller" one will be used for more direct causation, while the "larger" one will be used for less direct causation. Longer linguistic distance correlates to greater conceptual distance.
															<ul>
																<li>"George killed Joe" is more direct than "George caused Joe to die".</li>
																<li>Amharic has an <em>a-</em> prefix for direct causation, <em>as-</em> for indirect.</li>
															</ul>
														</li>
														<li>Analytic causatives often "require" an animate causee.
															<ul>
																<li>Japanese has a morphological causative when the causee has some control over the event, but requires a lexical causative for inanimate causees.
																	<ul>
																		<li>Consider "Joe made George come down" vs "Joe brought the golf clubs down".</li>
																	</ul>
																</li>
															</ul>
														</li>
													</ul>
												</li>
												<li><strong>Finite vs. Non-Finite Verbs</strong>
													<ul>
														<li>The more distant the cause from the effect in space or time, the more finite the verb will be.
															<ul>
																<li>Ex: <em>"Jorge <strong>hizo comer</strong> pan a Josef"</em> indicates Jorge forced Josef to eat bread directly, while <em>"Jorge <strong>hizo</strong> que Josef <strong>comiera</strong> pan"</em> indicates he forced Josef indirectly, maybe by removing all other food.</li>
															</ul>
														</li>
													</ul>
												</li>
												<li><strong>Case</strong>
													<ul>
														<li>If the causee retains a high degree of control, it will appear in a case associated with agents, but with little control, will appear in a patient case.
															<ul>
																<li>Ex: "Steve asked that <em>he</em> leave" gives Steve more control than "Steve asked <em>him</em> to leave".</li>
															</ul>
														</li>
													</ul>
												</li>
											</ul>
										</li>
									</ul>
								</IonItem>
								<IonItem className={classy("l4", "voiceVal", "valAdd", "causatives")}>
									{makeText("causation", "Describe which method(s) the language uses to create causatives.", 4)}
								</IonItem>

							<IonItem className={classy("h l3", "voiceVal", "valAdd")}>
								{makeButton("applic")}
								<IonLabel>7.1.2. Applicatives</IonLabel>
							</IonItem>

								<IonItem className={classy("l4", "voiceVal", "valAdd", "applic")}>
									<ul>
										<li>The verb is marked for the role of a direct object, bringing a peripheral participant (the applied object) on stage in a more central role.
											<ul>
												<li>This may turn a transitive verb ditransitive, or it may replace the direct object entirely (which technically isn't valence-increasing!)<br />
													{toggleButton("span", "applicEx", {}, "Show example.", "Hide example.")}
													<span className="applicEx hide"><br />"I arrived at Shionti's" in Nomatsiguenga.</span>
													<table className="applicEx hide">
														<tr>
															<td>n-areeka</td>
															<td>Sionti-ke</td>
														</tr>
														<tr>
															<td>I-arrive</td>
															<td>Shionti-LOC (valence: 1)</td>
														</tr>
														<tr>
															<td>n-areeka-ri</td>
															<td>Sionti</td>
														</tr>
														<tr>
															<td>I-arrive-him</td>
															<td>Shionti (valence: 2)</td>
														</tr>
													</table>
												</li>
											</ul>
										</li>
									</ul>
								</IonItem>
								<IonItem className={classy("l4", "voiceVal", "valAdd", "applic")}>
									{makeText("applicatives", "Describe which method(s) the language uses for applicatives, if any.", 4)}
								</IonItem>

							<IonItem className={classy("h l3", "voiceVal", "valAdd")}>
								{makeButton("datShift")}
								<IonLabel>7.1.3. Dative Shift</IonLabel>
							</IonItem>

								<IonItem className={classy("l4", "voiceVal", "valAdd", "datShift")}>
									<ul>
										<li>This only applies to verbs that take an Agent, a Patient and a Recipient or Experiencer. This latter argument is usually put in the <em>dative</em> case.</li>
										<li>Applicatives mark the verb, while a Dative Shift does not.</li>
										<li>Applicatives usually promote Instrumentals, while Dative Shifts usually promote Recipients and Benefactives.</li>
										<li>Example:
											<ul>
												<li>"Steve gave the ball to Linda." Valence: 2</li>
												<li>"Steve gave Linda the ball." Valence: 3, recipient promoted.</li>
											</ul>
										</li>
									</ul>
								</IonItem>
								<IonItem className={classy("l4", "voiceVal", "valAdd", "datShift")}>
									{makeText("dativeShifts", "Is there a dative shift construction in the language? What is it? What semantic roles can be shifted? Is it obligatory?", 4)}
								</IonItem>

							<IonItem className={classy("h l3", "voiceVal", "valAdd")}>
								{makeButton("datOI")}
								<IonLabel>7.1.4. Dative of Interest</IonLabel>
							</IonItem>

								<IonItem className={classy("l4", "voiceVal", "valAdd", "datOI")}>
									<ul>
										<li>This is adding a participant that is associated in some way.<br />
											{toggleButton("span", "datOfI", {}, "Show examples.", "Hide examples.")}
											<span className="datOfI hide"><br />"Dinner is burned [for me]" in Spanish.</span>
											<table className="datOfI hide">
												<tr>
													<td>Se</td>
													<td>me</td>
													<td>quemó</td>
													<td>la</td>
													<td>cena.</td>
												</tr>
												<tr>
													<td>REFL</td>
													<td>1s</td>
													<td>burn.3s.PST</td>
													<td>DEF.F.s</td>
													<td>dinner</td>
												</tr>
											</table>
											<span className="datOfI hide"><br />"She cut the hair [on him]" in Spanish.</span>
											<table className="datOfI hide">
												<tr>
													<td>Le</td>
													<td>cortó</td>
													<td>el</td>
													<td>pelo</td>
												</tr>
												<tr>
													<td>3DAT</td>
													<td>cut.3s.PST</td>
													<td>DEF.M.s</td>
													<td>hair</td>
												</tr>
											</table>
										</li>
									</ul>
								</IonItem>
								<IonItem className={classy("l4", "voiceVal", "valAdd", "datOI")}>
									{makeText("datOfInt", "Is there a dative-of-interest operation?", 4)}
								</IonItem>

							<IonItem className={classy("h l3", "voiceVal", "valAdd")}>
								{makeButton("possRaise")}
								<IonLabel>7.1.5. Possessor Raising (a.k.a. External Possession)</IonLabel>
							</IonItem>

								<IonItem className={classy("l4", "voiceVal", "valAdd", "possRaise")}>
									<ul>
										<li>In many languages, this is treated the same as a dative of interest.<br />
											{toggleButton("span", "posR", {}, "Show examples.", "Hide examples.")}
											<span className="posR hide"><br />"I fixed the railroad track" in Choctaw.</span>
											<table className="posR hide">
												<tr>
													<td>Tali</td>
													<td>i-hina-ya</td>
													<td>ayska-li-tok</td>
												</tr>
												<tr>
													<td>rock</td>
													<td>AGR(III)-road-NS</td>
													<td>fix-1s-PST (normal construction)</td>
												</tr>
												<tr>
													<td>Tali-ya</td>
													<td>hina</td>
													<td>im-ayska-li-tok</td>
												</tr>
												<tr>
													<td>rock-NS</td>
													<td>road</td>
													<td>AGR(III)-fix-1s-PST (possessor raised)</td>
												</tr>
											</table>
										</li>
									</ul>
								</IonItem>
								<IonItem className={classy("l4", "voiceVal", "valAdd", "possRaise")}>
									{makeText("possessRaising", "Does possessor raising occur?", 4)}
								</IonItem>

						<IonItem className={classy("h h2 l2", "voiceVal")}>
							{makeButton("valRem")}
							<IonLabel>7.2. Valence-Decreasing Operations</IonLabel>
						</IonItem>

							<IonItem className={classy("h h3 l3", "voiceVal", "valRem")}>
								{makeButton("refls")}
								<IonLabel>7.2.1. Reflexives</IonLabel>
							</IonItem>

								<IonItem className={classy("l4", "voiceVal", "valRem", "refls")}>
									<ul>
										<li>The Agent and Patient are the same.</li>
										<li>Lexical reflexives:
											<ul>
												<li>The verb itself implies reflexivity.
													<ul>
														<li>e.g.: Steve washed, shaved, and got dressed.</li>
													</ul>
												</li>
											</ul>
										</li>
										<li>Morpholigical reflexives:
											<ul>
												<li>A word (or words) is modified to indicate the reflexive.
													<ul>
														<li>e.g.: Spanish: Jorge se lavo. (George washed himself, "se lavo" being a morphing of the root verb "lavarse".)</li>
													</ul>
												</li>
											</ul>
										</li>
										<li>Analytic reflexives:
											<ul>
												<li>Inserting a lexical word, making a semantic valence-lowering (but not a lexical one).
													<ul>
														<li>e.g.: Steve washed himself.</li>
													</ul>
												</li>
												<li>These are often based on body parts.
													<ul>
														<li>e.g.: Another face in the crowd; Move your butt!</li>
													</ul>
												</li>
											</ul>
										</li>
									</ul>
								</IonItem>
								<IonItem className={classy("l4", "voiceVal", "valRem", "refls")}>
									{makeText("refls", "How are reflexives handled?", 4)}
								</IonItem>

							<IonItem className={classy("h h3 l3", "voiceVal", "valRem")}>
								{makeButton("recips")}
								<IonLabel>7.2.2. Reciprocals</IonLabel>
							</IonItem>

								<IonItem className={classy("l4", "voiceVal", "valRem", "recips")}>
									<ul>
										<li>These are often expressed the same way as reflexives.</li>
										<li>Lexical reciprocals:
											<ul>
												<li>The verb itself implies reciprocity.
													<ul>
														<li>e.g.: Steve and Jane shook hands [with each other].</li>
													</ul>
												</li>
											</ul>
										</li>
										<li>Morpholigical and lexical reciprocals follow the same patterns as those for reflexives.</li>
									</ul>
								</IonItem>
								<IonItem className={classy("l4", "voiceVal", "valRem", "recips")}>
									{makeText("recips", "How are reciprocals handled?", 3)}
								</IonItem>

							<IonItem className={classy("h h3 l3", "voiceVal", "valRem")}>
								{makeButton("passives")}
								<IonLabel>7.2.3. Passives</IonLabel>
							</IonItem>

								<IonItem className={classy("l4", "voiceVal", "valRem", "passives")}>
									<ul>
										<li>A semantically transitive verb with omitted agent, patient treated as subject, and the verb behaves as if it is intransitive. (Agent is less topical than the patient.)</li>
										<li>Personal passive: agent is implied, or expressed obliquely.
											<ul>
												<li>Lexical passives are rare.</li>
												<li>Morphological passives are more common, often the same morphology as perfect aspect. May be derived from copulas or nominalizations.</li>
												<li>English has analytic passives, with a copula and a "past participle" (patient nominalization).
													<ul>
														<li>e.g.: The tree has been killed.</li>
													</ul>
												</li>
											</ul>
										</li>
										<li>Impersonal passive: no agent directly indicated; can be used for intransitive verbs as well as transitive.
											<ul>
												<li>No known languages uses a specific morphology for this!</li>
											</ul>
										</li>
										<li>Other kinds of passives may exist.
											<ul>
												<li>English has the basic "Steve was eaten by a bear" but can also express it with other verbs, as in "Steve got eaten by a bear."</li>
												<li>Yup'ik has an adversative passive (to the detriment of the subject), abilitative passive (X can be Y [by Z]), and a negative abilitiative (X cannot be Y [by Z]).</li>
											</ul>
										</li>
										<li>Passives construction may be obligatory in a particular environment, e.g. when the Patient outranks the Agent.</li>
									</ul>
								</IonItem>
								<IonItem className={classy("l4", "voiceVal", "valRem", "passives")}>
									{makeText("passives", "How are passives handled?", 4)}
								</IonItem>

							<IonItem className={classy("h h3 l3", "voiceVal", "valRem")}>
								{makeButton("inverses")}
								<IonLabel>7.2.4. Inverses</IonLabel>
							</IonItem>

								<IonItem className={classy("l4", "voiceVal", "valRem", "inverses")}>
									<ul>
										<li>A valence "rearranging" device, e.g. "Steve taught him" becomes "Him, Steve taught."</li>
										<li>Often follows a hierarchy where a "higher" agent requires direct and a "lower" agent requires the inverse.</li>
									</ul>
								</IonItem>
								<IonItem className={classy("l4", "voiceVal", "valRem", "inverses")}>
									<IonGrid className="cols2">
										<IonRow>
											<IonCol className="cbox">{makeBox("markInv")}</IonCol>
											<IonCol>Marked inverse only.</IonCol>
										</IonRow>
										<IonRow>
											<IonCol className="cbox">{makeBox("markDirInv")}</IonCol>
											<IonCol>Both direct and inverse explicitly marked.</IonCol>
										</IonRow>
										<IonRow>
											<IonCol className="cbox">{makeBox("verbAgreeInv")}</IonCol>
											<IonCol>Special verb agreement markers for inverse.</IonCol>
										</IonRow>
										<IonRow>
											<IonCol className="cbox">{makeBox("verbAgreeInv")}</IonCol>
											<IonCol>Functional inverse: word order changes, e.g. VAP becomes VPA.</IonCol>
										</IonRow>
									</IonGrid>
								</IonItem>
								<IonItem className={classy("l4", "voiceVal", "valRem", "inverses")}>
									{makeText("inverses", "Describe any pecularities of inverse constructions.", 4)}
								</IonItem>

							<IonItem className={classy("h h3 l3", "voiceVal", "valRem")}>
								{makeButton("middleCon")}
								<IonLabel>7.2.5. Middle Constructions</IonLabel>
							</IonItem>

								<IonItem className={classy("l4", "voiceVal", "valRem", "middleCon")}>
									<ul>
										<li>Also known as anticausatives or detransitivation: a semantically transitive situation expressed as a process undergone by a Patient (rather than carried out by an Agent).</li>
										<li>Many languages express this the same way as they express passives.</li>
										<li>Often express the notion that the subject is both controller and affected.</li>
										<li>e.g. "Steve broke the car" becomes "The car broke" (and it was no fault of Steve's).</li>
									</ul>
								</IonItem>
								<IonItem className={classy("l4", "voiceVal", "valRem", "middleCon")}>
									{makeText("middleCon", "How are middle constructions handled?", 3)}
								</IonItem>

							<IonItem className={classy("h h3 l3", "voiceVal", "valRem")}>
								{makeButton("antiP")}
								<IonLabel>7.2.6. Antipassives</IonLabel>
							</IonItem>

								<IonItem className={classy("l4", "voiceVal", "valRem", "antiP")}>
									<ul>
										<li>Similar to passives, but the Patient is downgraded instead of the Agent.</li>
										<li>Generally, this only happens in ergative languages or in languages without verbal agreement, but many exceptions exist.</li>
										<li>Often, the Patient is omitted or oblique, the verb is marked intrasitive, and the Agent is placed in absolutive case.</li>
									</ul>
								</IonItem>
								<IonItem className={classy("l4", "voiceVal", "valRem", "antiP")}>
									{makeText("antiP", "Describe antipassive strategies in the language, if they exist.", 3)}
								</IonItem>

							<IonItem className={classy("h h3 l3", "voiceVal", "valRem")}>
								{makeButton("objDemOmInc")}
								<IonLabel>7.2.7. Object Demotion/Omission/Incorporation</IonLabel>
							</IonItem>

								<IonItem className={classy("l4", "voiceVal", "valRem", "objDemOmInc")}>
									<ul>
										<li>Demotion: "Steve shot Bob" becomes "Steve shot at Bob".</li>
										<li>Omission: "Steve shot Bob" becomes "Steve shot".</li>
										<li>Incorporation: "Steve shot Bob" becomes "Steve Bob-shot".
											<ul>
												<li>The incorporated object is usually the Patient, rarely the Agent.</li>
												<li>May have other semantic functions.
													<ul>
														<li>In Panare, incorporating a body part noun into a cutting verb means the part was cut completely off, whereas leaving it unincorporated means it was merely injured ("Darth Vader hand-cut" vs "Darth Vader cut hand").</li>
													</ul>
												</li>
											</ul>
										</li>
									</ul>
								</IonItem>
								<IonItem className={classy("l4", "voiceVal", "valRem", "objDemOmInc")}>
									{makeText("objDemOmInc", "Is object demotion/omission allowed? How about incorporation?", 5)}
								</IonItem>

					<IonItem className="h h1">
						{makeButton("otherVerb")}
						<IonLabel>8. Other Verb and Verb Phrase Operations</IonLabel>
					</IonItem>

						<IonItem className={classy("h h2 l2", "otherVerb")}>
							{makeButton("nominal")}
							<IonLabel>8.1. Nominalization</IonLabel>
						</IonItem>

							<IonItem className={classy("l3", "otherVerb", "nominal")}>
								<ul>
									<li>Every language has strategies of adjusting the grammatical category of a root. Turning a verb into a noun is <em>nominalization</em>.</li>
									<li>English has multiple methods, with differing levels of productivity.</li>
									<li>Typically, a language will use differing methods to create nominalizations according to the result.</li>
									<li>Some methods:
										<ul>
											<li>Zero Operator: walk → a walk, look → a look</li>
											<li>Affix: walk → walking, employ → employment, grow → growth, construct → construction</li>
											<li>Merge with Adposition: hang + up → hangup, make + over → makeover, talk + to → talking to</li>
											<li>Analytical: Mandarin uses a particle <em>de</em> to indicate some nominalizations
												<ul>
													<li><em>hézuò</em> (cooperate) + <em>de</em> → cooperation</li>
												</ul>
											</li>
										</ul>
									</li>
								</ul>
							</IonItem>

							<IonItem className={classy("h h3 l3", "otherVerb", "nominal")}>
								{makeButton("nomAction")}
								<IonLabel>8.1.1. Action Nominalization</IonLabel>
							</IonItem>

								<IonItem className={classy("l4", "otherVerb", "nominal", "nomAction")}>
									<ul>
										<li>Usually refers to the action in the abstract.</li>
									</ul>
								</IonItem>
								<IonItem className={classy("l4", "otherVerb", "nominal", "nomAction")}>
									{makeText("nomAct", "What process(es) turn a verb into an action noun?", 4)}
								</IonItem>

							<IonItem className={classy("h h3 l3", "otherVerb", "nominal")}>
								{makeButton("nomAgent")}
								<IonLabel>8.1.2. Agent Nominalization</IonLabel>
							</IonItem>

								<IonItem className={classy("l4", "otherVerb", "nominal", "nomAgent")}>
									<ul>
										<li>Typically refers to an agent who is characteristic of the root verb (teach → a teacher), but some languages instead refer to someone engaged in the activity at the moment (teach → one who is currently teaching).</li>
									</ul>
								</IonItem>
								<IonItem className={classy("l4", "otherVerb", "nominal", "nomAgent")}>
									{makeText("nomAgent", "What process(es) turn a verb into an agent?", 4)}
								</IonItem>

							<IonItem className={classy("h h3 l3", "otherVerb", "nominal")}>
								{makeButton("nomPatient")}
								<IonLabel>8.1.3. Patient Nominalization</IonLabel>
							</IonItem>

								<IonItem className={classy("l4", "otherVerb", "nominal", "nomPatient")}>
									<ul>
										<li>In English, this mostly happens with the modifiers "good" and "bad".
											<ul>
												<li>buy → a good buy</li>
												<li>time → a bad time</li>
											</ul>
										</li>
										<li>This can also form the "past participle" in a language.
											<ul>
												<li>employ → employee : this form comes from the French past participle!</li>
											</ul>
										</li>
									</ul>
								</IonItem>
								<IonItem className={classy("l4", "otherVerb", "nominal", "nomPatient")}>
									{makeText("nomPat", "What process(es) turn a verb into a patient?", 4)}
								</IonItem>

							<IonItem className={classy("h h3 l3", "otherVerb", "nominal")}>
								{makeButton("nomInstrument")}
								<IonLabel>8.1.4. Instrument Nominalization</IonLabel>
							</IonItem>

								<IonItem className={classy("l4", "otherVerb", "nominal", "nomInstrument")}>
									<ul>
										<li>Refers to the object used in the action.</li>
										<li>In English, this usually follows the same format as an agent nominalization.</li>
										<li>In Spanish, compounding a verb with a plural object makes an instrument.
											<ul>
												<li>e.g. <em>abre</em> (open) + <em>latas</em> (cans) → <em>el abrelatas</em> (can-opener)</li>
											</ul>
										</li>
									</ul>
								</IonItem>
								<IonItem className={classy("l4", "otherVerb", "nominal", "nomInstrument")}>
									{makeText("nomIns", "What process(es) turn a verb into an instrument noun?", 4)}
								</IonItem>

							<IonItem className={classy("h h3 l3", "otherVerb", "nominal")}>
								{makeButton("nomLocation")}
								<IonLabel>8.1.5. Location Nominalization</IonLabel>
							</IonItem>

								<IonItem className={classy("l4", "otherVerb", "nominal", "nomLocation")}>
									<ul>
										<li>Many languages use this to refer generally to a place where the action tends to occur, e.g. work → workshop, burn → fireplace.</li>
									</ul>
								</IonItem>
								<IonItem className={classy("l4", "otherVerb", "nominal", "nomLocation")}>
									{makeText("nomLoc", "What process(es) turn a verb into a location noun?", 4)}
								</IonItem>

							<IonItem className={classy("h h3 l3", "otherVerb", "nominal")}>
								{makeButton("nomProduct")}
								<IonLabel>8.1.6. Product Nominalization</IonLabel>
							</IonItem>

								<IonItem className={classy("l4", "otherVerb", "nominal", "nomProduct")}>
									<ul>
										<li>This refers to something that exists because of an action.</li>
										<li>English tends to do this with zero operators (scratch → a scratch) or by changing the stress pattern (permit → a permit, reject → a reject, convert → a convert).</li>
									</ul>
								</IonItem>
								<IonItem className={classy("l4", "otherVerb", "nominal", "nomProduct")}>
									{makeText("nomProd", "What process(es) turn a verb into a product noun?", 4)}
								</IonItem>

							<IonItem className={classy("h h3 l3", "otherVerb", "nominal")}>
								{makeButton("nomManner")}
								<IonLabel>8.1.7. Manner Nominalization</IonLabel>
							</IonItem>

								<IonItem className={classy("l4", "otherVerb", "nominal", "nomManner")}>
									<ul>
										<li>This is uncommon among languages, but English has a couple, generally confined to sports terminology.
											<ul>
												<li>curve → a curve (That pitcher's curve is unhittable.)</li>
												<li>serve → a serve (Serena's serve is imposing.)</li>
											</ul>
										</li>
									</ul>
								</IonItem>
								<IonItem className={classy("l4", "otherVerb", "nominal", "nomManner")}>
									{makeText("nomManner", "What process(es) turn a verb into a manner noun, if any?", 4)}
								</IonItem>

						<IonItem className={classy("h h2 l2", "otherVerb")}>
							{makeButton("compounding")}
							<IonLabel>8.2. Compounding</IonLabel>
						</IonItem>

						<IonItem className={classy("h h2 l2", "otherVerb")}>
							{makeButton("TAM")}
							<IonLabel>8.3. Tense/Aspect/Mood</IonLabel>
						</IonItem>

						<IonItem className={classy("h h2 l2", "otherVerb")}>
							{makeButton("locDirec")}
							<IonLabel>8.4. Location/Direction</IonLabel>
						</IonItem>

						<IonItem className={classy("h h2 l2", "otherVerb")}>
							{makeButton("partRef")}
							<IonLabel>8.5. Participant Reference</IonLabel>
						</IonItem>

						<IonItem className={classy("h h2 l2", "otherVerb")}>
							{makeButton("eviValiMira")}
							<IonLabel>8.6. Evidentiality, Validationality and Mirativity</IonLabel>
						</IonItem>

						<IonItem className={classy("h h2 l2", "otherVerb")}>
							{makeButton("otherVMisc")}
							<IonLabel>8.7. Miscellaneous</IonLabel>
						</IonItem>

{/*
9 -  Other verb and verb-phrase operations
9.1 -  Nominalization
9.1.1 -  Action nominalization
walk → a walk, walking
employ → employment
grow → growth
9.1.2 -  Participant nominalizations
9.1.2.1 -  Agent nominalizations
employ → employer
hunt → hunter
in some languages, this would be one who is currently hunting!
9.1.2.2 -  Patient nominalizations
buy → a [good|bad] buy
employ → employee (came from French past participle!)
9.1.2.3 -  Instrument nominalizations
grind → grinder
point → pointer
9.1.2.4 -  Location nominalizations
workshop, fireplace, bedroom
9.1.2.5 -  Product nominalizations
scratch → a scratch
permit; reject; convert → permit; reject; convert (stress change only!)
9.1.2.6 -  Manner nominalizations
curve → that pitcher's curve (when he throws a curveball)
rare in languages
9.2 -  Compounding (including incorporation)
Noun incorporation: noun becomes attached to verb (see 8.2.7)
most common: object incorporation
sell pigs → pig-sell
Verb-verb incorporation
often, verbs of motion enter into these compounds
shout-rise → he shouts rising
Verbs that freely compound like this typically lose their verbal character and become derivational affixes.
9.3 -  Tense/Aspect/Mode
- TAM are sometimes hard to tease apart, and may only be considered separate because of how they are in western languages
- Some languages pay more attention to tense (English), aspect (Austronesian languages), or mode (Eskimo)
- Furthermore, some verb stems may not allow certain operations while favoring others
- Certain TAM morphemes may cluster together with greater-than-chance frequency, forming hypermorphemes
- Often interacts with case or number marking (nom/acc in one aspect, erg/abs in another; merging aspect with number)
- Is there a tense system? How does it operate? Future/non-future? Past/non-past? Past/present/future? Other?
9.3.1 -  Tense
- Action in reference to "now"
* past/present/future
* past/nonpast, nonfuture/future
* not-now/now/not-now
* distant past/a year ago/a month ago/a week ago/today or yesterday/now/soon/future
- Future tense markers often derive from free verbs meaning come, go, or want
9.3.2 -  Aspect
[ inception
< unbounded >
| temporal boundary
] completion
x a punctual event (has no internal temporal structure)
- Case markers/articles can be mistaken for TAM markers because they often affect the aspect: I did
	things (habitual) vs I did a thing (perfective)
9.3.2.1 -  Perfective [–]
He wrote a letter. (Eng: may be habitual, iterative, etc)
9.3.2.2 -  Imperfective <----->
He writes letters.
9.3.2.3 -  Perfect --|x
He has come from there.
9.3.2.4 -  Pluperfect ----| (focus) ---- (now)
I had entered the palace.
9.3.2.5 -  Completive >----]
She finished the job.
9.3.2.6 -  Inceptive [----->
She started the job.
9.3.2.7 -  Continuing/progressive >----->
He is writing letters. (specific event, ongoing process rather than stative)
9.3.2.8 -  Punctual x
He sneezed.
9.3.2.9 -  Iterative >-x-x-x-x-x-x-x-x->
She is coughing.
9.3.2.10 -  Habitual <------>
He often writes.
– There is often a historical connection between aspect marking and locational/directional markings
I came to see you [inceptive]
He cut away at the turkey [imperfective]
Tom wolfed it down [perfective]
I drink your milkshake up [perfective]
He is a-walking (at walking) [progressive]

perfective vs imperfective
perfective vs habitual / continuous
perfective vs habitual / non-progressive / progressive
[perfect]
past tense tend to have more aspects
combine tense and aspect
: imperfecto = past + habitual + progressive

PUNCTUAL or DURATIVE
Telic / Atelic +  Dynamic
Static (durative only)

Durative = lasting in time
Dynamic = ongoing process requiring continual input
Atelic = no clear end point
Telic = clearly defined end point
Punctual = instantaneous event
Static = changeless state


*/}

				</IonList>
			</IonContent>
		</IonPage>
	);
};
 
export default Syntax;
