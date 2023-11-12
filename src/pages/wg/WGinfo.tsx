import React from 'react';
import {
	IonButton,
	IonCard,
	IonCardContent,
	IonContent,
	IonHeader,
	IonIcon,
	IonItem,
	IonLabel,
	IonPage
} from '@ionic/react';
import {
	optionsOutline,
	documentTextOutline,
	gridOutline,
	bookOutline,
	settingsOutline,
	reorderTwo,
	helpCircle
} from 'ionicons/icons';

import { PageData } from '../../store/types';

import ltr from '../../components/LTR';
import IPA from '../../components/IPA';
import Header from '../../components/Header';
import {
	SyllablesIcon,
	TransformationsIcon,
	WordGenIcon
} from '../../components/icons';

interface CardProps {
	hideOverview?: boolean
	setIsOpenInfo?: Function
}
const OverviewButton = (props: CardProps) => {
	const { hideOverview, setIsOpenInfo } = props;
	if(hideOverview) {
		return <></>;
	}
	return (
		<IonButton
			color="secondary"
			slot="end"
			routerLink="/wg/overview"
			routerDirection="forward"
			onClick={() => setIsOpenInfo && setIsOpenInfo(false)}
		>
			<IonIcon icon={helpCircle} />
		</IonButton>
	);
};

export const CharGroupCard = (props: CardProps) => {
	return (
		<IonCard>
			<IonItem lines="full">
				<IonIcon icon={gridOutline} slot="start" color="primary" />
				<IonLabel>Character Groups Tab</IonLabel>
				<OverviewButton {...props} />
			</IonItem>
			<IonCardContent>
				<p>
					This is where you define groups of sounds. The two simplest groupings
					are <em>consonants</em> and <em>vowels</em>, but you may want to create multiple
					character groups depending on how you want your language's syllables formed. For
					example, the consonants <IPA>pbk</IPA> in English may be followed by the
					consonants <IPA>lr</IPA> at the beginning of syllables. So you might choose them as
					groups, while also putting <IPA>pbklr</IPA> in a third group for general consonants.
				</p><p>
					Click the (+) button to add a new character group. When you make a group, you must
					give it a <em>description</em> and a one-character <em>label</em>. The label can be
					any single character except for these: <strong>{"^$\\()[]{}.*+?|"}</strong>. The
					description is for your own benefit, while the label will be used to refer to this
					group in the <strong>Syllables</strong> tab. So you may end up with groups that look
					like the following:
				</p>
				<div className="emphasizedSection">
					<strong>I=pbk</strong>
					<br />
					<strong>L=lr</strong>
					<br />
					<strong>C=pbklr</strong>
					<br />
					<strong>V=eioau</strong>
				</div>
				<p>
					The letters/characters in your group are called a <em>run</em>. The run should be
					put in a specific order. The first letter is more likely to be used than the second,
					the second more likely than the third, and so on. This mimics natural languages, which
					tend to use certain sounds more than others. You can adjust this <em>dropoff
					rate</em>, or eliminate it entirely, on the <strong>Settings</strong> tab.
				</p>
				{props.hideOverview ?
					<p>
						<strong>Character Group run dropoff</strong> is explained in
						the <strong>Settings</strong> section below.
					</p>
				:
					<p>
						<strong>Character Group run dropoff</strong> ranges from 0 to 50. At zero (flat),
						group choices are all equiprobable. Otherwise, the higher the number, the more
						likely it is that the first characters in the group are used. See the help section
						on the <strong>Settings</strong> page for more information.
					</p>
				}
			</IonCardContent>
		</IonCard>
	);
}
export const SylCard = (props: CardProps) => {
	const { hideOverview } = props;
	return (
		<IonCard>
			<IonItem lines="full">
				<SyllablesIcon slot="start" color="primary" />
				<IonLabel>Syllables Tab</IonLabel>
				<OverviewButton {...props} />
			</IonItem>
			<IonCardContent>
				<p>
					This is where you determine how your syllables are formed. You use the <em>labels</em> to
					describe the elements that make up a syllable.
						{ hideOverview ? "" :
						" For example, using the groups in the previous section, you could decide"
						+ " to make a list of syllables such as the following:"}
				</p>
				{hideOverview ? (
					<>
						<p>For example, if you have these <strong>character groups</strong>...</p>
						<div className="emphasizedSection">
							<strong>I=pbk</strong>
							<br />
							<strong>L=lr</strong>
							<br />
							<strong>C=pbklr</strong>
							<br />
							<strong>V=eioau</strong>
						</div>
						<p>...you could decide to make a list of syllables such as the following:</p>
					</>
				) : <></>}
				<div className="emphasizedSection">
					<strong>
						ILV
						<br />
						CV
						<br />
						ILVC
					</strong>
				</div>
				<p>
					The above can generate syllables such as <em>pla</em>, <em>ku</em>,
					or <em>brep</em>, which could then be combined into words such
					as <em>plabrep</em> or <em>kupla</em>. You can also put characters in a
					syllable that don't correspond to a group: <strong>sILV</strong> could
					generate syllables such as <em>sbra</em> or <em>spli</em>.
				</p><p>
					If you desire a greater amount of control over your words, you can turn on
					the <strong>Use multiple syllable types</strong> toggle. This will show you four
					separate boxes, each with a different role in a word: <strong>single-word
					syllables</strong> are used exclusively for one-syllable words, <strong>word-initial
					syllables</strong> are only used at the start of a word, <strong>word-final
					syllables</strong> are only used at the end of a word, and <strong>mid-word
					syllables</strong> fill out the middle of words when needed.
				</p><p>
					The order of syllables in each box makes a difference. The first syllable listed is
					more likely to be used than the second, the second more likely than the third, and
					so on. You can adjust this <em>dropoff rate</em>, or eliminate it entirely, on
					the <strong>Settings</strong> tab. You'll also find options there to determine how
					often one-syllable words are generated, and put an upper limit on the number of
					syllables any one word can have.
				</p>
				{props.hideOverview ?
					<p>
						<strong>Syllable box dropoff</strong> is explained in
						the <strong>Settings</strong> section below.
					</p>
				:
					<p>
						<strong>Syllable box dropoff</strong> ranges from 0 to 50. At zero (flat),
						syllable choices are all equiprobable. Otherwise, the higher the number, the
						more likely it is that the first lines in the box are used. See the
						help section on the <strong>Settings</strong> page for more information.
					</p>
				}
			</IonCardContent>
		</IonCard>
	);
}
export const TransCard = (props: CardProps) => {
	const arrow = (ltr() ? "⟶" : "⟵");
	return (
		<IonCard>
			<IonItem lines="full">
				<TransformationsIcon slot="start" color="primary" />
				<IonLabel>Transformations Tab</IonLabel>
				<OverviewButton {...props} />
			</IonItem>
			<IonCardContent>
				<p>
					There may be cases when you need to fine-tune the words that get generated
					on the <strong>Output</strong> tab. A common reason would be to turn a
					specific character into two or three letters. You may create a group such
					as <strong>C=pbkClrS</strong>, using capital letters in place of sounds
					like <em>"ch"</em> or <em>"sh"</em>. This could generate syllables
					like <em>Cu</em> or <em>pliS</em>.
				</p><p>
					When you make a new <em>transformation</em>, you provide
					a <em>search expression</em>, a <em>replacement expression</em>, and, optionally,
					a <em>transformation description</em> for your own benefit.
				</p><p>
					Both expressions can use <strong>regular expressions</strong> (an explanation
					can be found at the end of this section). You can also use the special
					expression %X to indicate any character in group X's run, or !%X to indicate
					any character <em>not</em> in that run. (e.g, If <em>X=abc</em>, then %X will
					be treated as if it was the regular expression <em>[abc]</em>.)
				</p><p>
					So, you could make a search expression <strong>C</strong> with a replacement
					expression <strong>ch</strong>, which will result in <em>Cu</em> above
					becoming <em>chu</em>. This will result in a transformation that looks like
					the following:
				</p>
				<div className="emphasizedSection serifChars">
					<span
						className="importantUnit"
					>C</span><span
						className="unimportantUnit"
					>{arrow}</span><span
						className="importantUnit"
					>ch</span>
				</div>
				<p>
					Click the (+) button to add a new transformation. The first transformation in the
					list will be run first, the second trandformation second, and so on down the list.
					This may cause unintended effects, so you can reorganize your transformations to
					avoid any such effects by using
					the <IonIcon icon={reorderTwo} color="tertiary" size="small" /> drag handles.
				</p>
				<hr />
				<p>
					Here are some sample transformations for some linguistic phenomina:
				</p>
				<ul>
					<li>Consonant harmony:
						<div className="emphasizedSection serifChars">
							RtL: <span className="importantUnit"
							>s(?=.*ʃ)</span><span className="unimportantUnit"
							>{arrow}</span><span className="importantUnit"
							>ʃ</span>
							<br />
							LtR: <span className="importantUnit"
							>(ʃ.+)s</span><span className="unimportantUnit"
							>{arrow}</span><span className="importantUnit"
							>$1ʃ</span>
						</div>
					</li>
					<li>Liquid dissimilation:
						<div className="emphasizedSection serifChars">
							<span className="importantUnit"
							>r(.+)r</span><span className="unimportantUnit"
							>{arrow}</span><span className="importantUnit"
							>r$1l</span>
							<br />
							<span className="importantUnit"
							>l(.+)l</span><span className="unimportantUnit"
							>{arrow}</span><span className="importantUnit"
							>l$1r</span>
						</div>
					</li>
					<li>Synchronic epenthesis:
						<div className="emphasizedSection serifChars">
							<span className="importantUnit"
							>r([aeiou]r)$</span><span className="unimportantUnit"
							>{arrow}</span><span className="importantUnit"
							>rd$1</span>
						</div>
					</li>
					<li>Anticipatory assimilation:
						<div className="emphasizedSection serifChars">
							<span className="importantUnit"
							>[kp]t+</span><span className="unimportantUnit"
							>{arrow}</span><span className="importantUnit"
							>tt</span>
						</div>
					</li>
				</ul>
				<hr />
				<h2>Regular Expressions</h2>
				<p>
					In short, a <em>regular expression</em> is a sequence of characters that specifies
					a match pattern in text. <em>Regexes</em> are found in many programming languages
					and text editors. <strong>Conlang Toolbox</strong> uses JavaScript-style regexes
					without the surrounding slash characters.
				</p><p>
					Fully explaining regular expressions is a topic that's too complicated for this
					app to cover, but they are very useful. Here are some resources where you can
					learn more about them:
				</p>
				<ul>
					<li><a href="https://en.wikipedia.org/wiki/Regular_expression"
					>Wikipedia: Regular Expression</a></li>
					<li><a href={
						"https://developer.mozilla.org/en-US/docs/Web/JavaScript/"
						+ "Guide/Regular_expressions#writing_a_regular_expression_pattern"}
					>MDN: Writing a regular expression</a></li>
					<li><a href="https://www.regular-expressions.info"
					>Regular-Expressions.info</a>, a tutorial site.</li>
					<li><a href="https://www.geeksforgeeks.org/write-regular-expressions/"
					>Geeks for Geeks: Write Reguar Expressions</a></li>
				</ul>
			</IonCardContent>
		</IonCard>
	);
}
export const OutCard = (props: CardProps) => {
	return (
		<IonCard>
			<IonItem lines="full">
				<IonIcon icon={documentTextOutline} slot="start" color="primary" />
				<IonLabel>Output Tab</IonLabel>
				<OverviewButton {...props} />
			</IonItem>
			<IonCardContent>
				<p>
					This is where the magic happens. Click the <strong>Generate</strong> button and your
					output will appear. Press the button again and a new set of output will replace it.
				</p><p className="center pad-top-rem">
					<IonIcon icon={settingsOutline} color="tertiary" size="large" />
				</p><p>
					Click on the gear icon to open a list of options. The first is a drop-down menu where
					you can select what to output. The choices
					are <strong>Pseudo-text</strong>, <strong>Wordlist</strong> and <strong>All
					possible syllables</strong>.
				</p><p>
					The <strong>pseudo-text</strong> will create words and put them into sentences, making a
					block of text you might find in a book. You can determine how many sentences are made by
					adjusting the <strong>numer of sentences</strong> slider.
				</p><p>
					The <strong>wordlist</strong> outputs a list of words devoid of context. You can choose
					a number of options to modify this list. <strong>Capitalize words</strong> will capitalize
					every word. <strong>Sort output</strong> will alphabetize the list, and <strong>multi-column
					layout</strong> will arrange the list in multiple columns instead of one long column. At
					the bottom, there is a <strong>wordlist size</strong> slider that controls how many words
					are generated.
				</p><p>
					<strong>All possible syllables</strong>, as you might guess, outputs a list of every
					possible syllable your character groups, syllables and transformations allow.
					The <em>capitalize</em>, <em>sort</em> and <em>multi-column</em> options above will
					also work on this syllable list.
				</p><p>
					At the top of the settings, you can choose to <strong>show syllable breaks</strong>, which
					will in·sert a dot be·tween eve·ry syl·la·ble in each word. While this option can be useful,
					please note that it will break any <em>transformations</em> that try to work across syllable
					boundaries.
				</p><p className="center pad-top-rem">
					<IonIcon icon={bookOutline} color="tertiary" size="large" />
				</p><p>
					Once you've generated words, you can save them to the <strong>Lexicon</strong>. Click
					the book button and you're presented with two options. <em>Save everything</em> will
					store every single generated word for the Lexicon. <em>Choose what to save</em> will
					highlight every word, and you can tap on a word to store it; when you're done choosing,
					hit the save button that appears and you will be able to choose how they are imported
					into the <strong>Lexicon</strong>.
				</p>
			</IonCardContent>
		</IonCard>
	);
}
export const OptCard = (props: CardProps) => {
	return (
		<IonCard>
			<IonItem lines="full">
				<IonIcon icon={optionsOutline} slot="start" color="primary" />
				<IonLabel>Settings Tab</IonLabel>
				<OverviewButton {...props} />
			</IonItem>
			<IonCardContent>
				<p>
					This final tab fine-tunes the output. These can make a huge difference in
					how your conlang appears.
				</p>
				<h2>The Buttons</h2>
				<p>
					<strong>Load Presets</strong> brings up a menu where you can choose from several
					pre-loaded options. The initial settings when you first start the app are
					the <em>Simple</em> preset. The others are offered to give you ideas of what's
					possible with the app. They will load <em>character
					groups</em>, <em>syllables</em>, <em>transformations</em> and possibly change the
					remaining settings on this page, too.
				</p><p>
					<strong>Clear All Fields</strong> clears all <em>character
					groups</em>, <em>syllables</em> and <em>transformations</em>, but does not
					affect any other settings.
				</p><p>
					<strong>Save/Load Custom Info</strong> opens a dialog where you can save your own
					<em>character groups</em>, <em>syllables</em>, <em>transformations</em> and the
					settings on this page. This allows you to switch between your own personal
					language settings.
				</p>
				<h2>The Settings</h2>
				<p>
					<strong>Rate of monosyllable words</strong> determines how often a one-syllable
					word is created. It's a percentage from 0 (never) to 100 (always).
				</p><p>
					<strong>Maximum number of syllables per word</strong> sets an upper limit on how long
					your words can grow.
				</p><p>
					<strong>Character Group run dropoff</strong> and <strong>syllable box dropoff</strong> range
					from 0 to 50. At zero (flat), group and syllable choices are all equiprobable.
					Otherwise, the number becomes a percentage. The higher the number, the more likely it
					is that the first syllables or group characters are used. (This mimics natural
					languages, which tend to prefer certain sounds and patterns.) This is how it works:
				</p><ol>
					<li>A random number is generated from 1 to 100.</li>
					<li>If the number is lower than the dropoff percentage, the first choice is picked.</li>
					<li>If not, the generator moves the first choice to the end of the line, then returns
						to step 1, generating a new number.</li>
					<li>This cycle continues until a number is generated that is equal to or greater
						than the dropoff percentage.</li>
				</ol><p>
					The remaining options only apply to <em>pseudo-texts</em>.
				</p><p>
					<strong>Capitalize sentences</strong> determines if each sentence starts with a capital
					letter.
				</p><p>
					The other options determine what your sentences look like. Three-fourths of
					all sentences will be <em>declarative</em> (simple statements), one-sixth will
					be <em>interrogative</em> (questions), and the remaining one-twelfth will
					be <em>exclamatory</em> (excited utterances). You can put special punctuation
					before and after these sentences if you wish.
				</p>
			</IonCardContent>
		</IonCard>
	);
}

const WGinfo = (props: PageData) => {

	return (
		<IonPage>
			<IonHeader>
				<Header title="Overview: WordGen" />
			</IonHeader>
			<IonContent className="overview">
				<IonCard>
					<IonItem lines="full">
						<WordGenIcon slot="start" color="primary" />
						<IonLabel>What is WordGen?</IonLabel>
					</IonItem>
					<IonCardContent>
						<p>
							This tool is for attempting to generate new words based on rules you set up.
						</p><p>
							The basic unit of a "word" is a syllable. A "syllable" generally has a vowel, and
							may have one or more consonants in it.
						</p><p>
							This is the most basic use case:
						</p><div>
							<ol>
								<li>Decide what sounds your language will have.</li>
								<li>Separate these sounds into groups, such as vowels and consonants.</li>
								<li>Decide how these sounds combine to form syllables.</li>
							</ol>
						</div><p>
							The <strong>Character Groups</strong> tab is for holding groups of sounds, and
							the <strong>Syllables</strong> tab describes how they fit together. For more
							complex words, the <strong>Transformations</strong> tab provides a way to tweak
							the generated output with search/replace expressions. The <strong>Output</strong> tab
							is where the new words can be found, and the <strong>Settings</strong> tab has
							other options you can tweak if needed.
						</p>
					</IonCardContent>
				</IonCard>
				<CharGroupCard hideOverview />
				<SylCard hideOverview />
				<TransCard hideOverview />
				<OutCard hideOverview />
				<OptCard hideOverview />
			</IonContent>
		</IonPage>
	);
};

export default WGinfo;

// TO-DO: Introduce other sentence types? Adjust ratios?
// [pre] sentence label [post] weight: [number]
//   []  declarative     [.]   weight: [9]
//   []  interrogative   [?]   weight: [2]
//   []  exclamatory     [!]   weight: [1]
