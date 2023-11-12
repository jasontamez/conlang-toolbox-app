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
	enterOutline,
	exitOutline,
	gridOutline,
	bookOutline,
	settingsOutline,
	reorderTwo,
	helpCircle
} from 'ionicons/icons';

import { PageData } from '../../store/types';

import ltr from '../../components/LTR';
import Header from '../../components/Header';
import { SoundChangesIcon, TransformationsIcon, WordEvolveIcon } from '../../components/icons';

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
			routerLink="/we/overview"
			routerDirection="forward"
			onClick={() => setIsOpenInfo && setIsOpenInfo(false)}
		>
			<IonIcon icon={helpCircle} />
		</IonButton>
	);
};

export const InpCard = (props: CardProps) => {
	return (
		<IonCard>
			<IonItem lines="full">
				<IonIcon icon={enterOutline} slot="start" color="primary" />
				<IonLabel>Input Tab</IonLabel>
				<OverviewButton {...props} />
			</IonItem>
			<IonCardContent>
				<p>
					This tab has one purpose: determining which words you want to change.
				</p><p>
					The easiest way is to copy-paste a list of words, each on a line by itself. Or, you
					can use the <strong>Import From Lexicon</strong> button to pull in words stored in
					the <strong>Lexicon</strong>.
				</p><p>
					Use the <strong>Clear</strong> button to empty all words from Input.
				</p>
			</IonCardContent>
		</IonCard>
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
					This is where you define groups of characters representing sounds. You can reference these
					groups in <strong>Transformations</strong> and <strong>Sound Changes</strong> to fine-tune
					the way your language evolves.
				</p><p>
					Click the (+) button to add a new group. When you make a group, you must give it
					a <em>description</em> and a one-character <em>label</em>. The description is for your
					own benefit, while the label will be used to refer to this group in the other tabs.
					The label can be any single character except for these: <strong>{"^$\\()[]{}.*+?|"}</strong>.
					The letters/characters in your group are called a <em>run</em>.
				</p>
			</IonCardContent>
		</IonCard>
	);
};
export const TraCard = (props: CardProps) => {
	return (
		<IonCard>
			<IonItem lines="full">
				<TransformationsIcon slot="start" color="primary" />
				<IonLabel>Transformations Tab</IonLabel>
				<OverviewButton {...props} />
			</IonItem>
			<IonCardContent>
				<p>
					There may be cases when you need to modify the input words before you evolve
					them. A common reason would be to turn a group of characters (such as "sh",
					"th", or "ng" in English) into a single character that can be targeted
					more easily.
				</p><p>
					When you make a new <em>transformation</em>, you provide an <em>input expression</em>,
					a <em>transform direction</em>, an <em>output expression</em>, and, optionally,
					a <em>transform description</em> for your own benefit.
				</p><p>
					The <em>transform direction</em> is either "at input, then undo at output", "at
					input and at output", "at input only", or "at output only", and they determine how
					the two expressions are used.
				</p>
				<ul>
					<li>
						<strong>Input only:</strong> Before anything else happens, input words are
						searched, and any instances of the <em>input expression</em> are replaced with
						the <em>output expression</em>. <strong>Regular expressions</strong> (see
						the <strong>Sound Changes</strong> {props.hideOverview ? " section"
						: " tab's help section"}) and %Group references are allowed in the <em>input
						expression</em> only. (A group reference is something like %G to indicate any
						character in characyer group C's run, or !%G to indicate any
						character <em>not</em> in that run.)
					</li><li>
						<strong>Output only:</strong> After all <strong>sound changes</strong> are
						processed, any instances of the <em>input expression</em> are replaced with
						the <em>output expression</em>. Regular expressions and %Group references
						are allowed in the <em>input expression</em> only.
					</li><li>
						<strong>At input, then undo at output:</strong> Before anything else happens,
						input words are searched, and any instances of the <em>input
						expression</em> are replaced with the <em>output expression</em>. After
						all <strong>sound changes</strong> are processed, any instances of
						the <em>output expression</em> are replaced with the <em>input expression</em>.
						<br /><br />
						Regular expressions are not allowed, but non-negative %Group references are
						allowed if and only if both input and output have them. In that case, something
						special happens: when the transformer matches a character in a group, it will
						note what position that character is in the group's run. It will then look at
						the other expression's group and pick out the character in the same position.
						<br /><br />
						For example: If %S is being replaced with %Z, and those groups have runs "ptk"
						and "bdg", "p" will be replaced with "b", "t" will be replaced with "d", and "k"
						will be replaced by "g". If the first group has more letters than the second,
						the second group's run will be repeated until it's long enough to find a match.
						<br /><br />
						NOTE: If you have unequal numbers of %Groups in the beginning and ending
						expressions, errors may occur.
					</li><li>
						<strong>At input and at output:</strong> As <em>at input, then undo at
						output</em>, but the <em>input expression</em> is replaced with the <em>output
						expression</em> before AND after the <strong>sound changes</strong> are processed.
					</li>
				</ul>
				<p>
					Click the (+) button to add a new transform. The first transform in the list will
					be run first, the second transform second, and so on down the list. This may cause
					unintended effects, so you can reorganize your transforms by using
					the <IonIcon icon={reorderTwo} color="tertiary" size="small" /> drag handles.
				</p>
			</IonCardContent>
		</IonCard>
	);
};
export const SChCard = (props: CardProps) => {
	const arrow = (ltr() ? "⟶" : "⟵");
	return (
		<IonCard>
			<IonItem lines="full">
				<SoundChangesIcon slot="start" color="primary" />
				<IonLabel>Sound Changes Tab</IonLabel>
				<OverviewButton {...props} />
			</IonItem>
			<IonCardContent>
				<p>
					This is where you determine how your words evolve. The display follows basic standard
					phonological rules for describing sound changes:
				</p>
				<div className="emphasizedSection">
					<span
						className="importantUnit"
					>s</span><span
						className="unimportantUnit"
					>{arrow}</span><span
						className="importantUnit"
					>z</span><span
						className="unimportantUnit"
					>/</span><span
						className="importantUnit"
					>d_</span><span
						className="unimportantUnit"
					>!</span><span
						className="importantUnit"
					>_h</span>
				</div>
				<p>
					The above means that "s" changes to "z" after a "d", but not when it's before an "h".
				</p><p>
					The first box is the <em>beginning expression</em>, the second is the <em>ending
					expression</em>, the third is the <em>context expression</em>, and the last is
					the <em>exception expression</em>.
				</p><p>
					The <em>beginning expression</em> can include plain text or <strong>regular
					expressions</strong> (see the end of this section for more info). It
					can also contain %Group references. (A group reference is something like %G to
					indicate any character in character group C's run, or !%G to indicate any character
					that is <em>not</em> in that run.)
				</p><p>
					The <em>ending expression</em> should be plain text. However, it can include
					non-negative %Group references <strong>if and only if</strong> the <em>beginning
					expression</em> does, too. In that case, something special happens: when the
					evolver matches a character in a group, it will note what position that
					character is in the group's run. It will then look at the <em>ending</em> group
					and pick out the character in the same position. For example: If %S is being
					replaced with %Z, and those groups have runs "ptk" and "bdg", "p" will be
					replaced with "b", "t" will be replaced with "d", and "k" will be replaced by
					"g". (If the first group has more letters than the second, the second group's
					run will be repeated until it's long enough to find a
					match.) <strong>NOTE:</strong> If you have unequal numbers of %Groups in
					the <em>beginning</em> and <em>ending</em> expressions, errors may occur.
				</p><p>
					The <em>context expression</em> describes where in the word the <em>beginning
					expression</em> must be before it can be changed into the <em>ending
					expression</em>. The <em>exception expression</em> is similar, but it
					describes where in the world a match <strong>can't</strong> be made.
					(The <em>exception</em> is optional.)
				</p><p>
					There are two characters in <em>contexts</em> and <em>exceptions</em> that
					have special functions. The underscore _ represents where the <em>ending
					expression</em> is being matched. You <strong>must</strong> include an
					underscore. The hash symbol # represents the beginning or end of a word. For
					example: if you want to turn "s" into "z" at the beginning of a word, you
					could create the following:
				</p>
				<div className="emphasizedSection">
					<span
						className="importantUnit"
					>s</span><span
						className="unimportantUnit"
					>{arrow}</span><span
						className="importantUnit"
					>z</span><span
						className="unimportantUnit"
					>/</span><span
						className="importantUnit"
					>#_</span>
				</div>
				<p>
					If you have no special rules for where in a word a replacement can happen,
					just make a <em>context expression</em> that's only a single underscore.
				</p><p>
					Click the (+) button to add a new sound-change. The first sound-change in
					the list will be run first, the second sound-change second, and so on down
					the list. This may cause unintended effects, so you can reorganize your
					sound-changes to avoid any such effects by using
					the <IonIcon icon={reorderTwo} color="tertiary" size="small" /> drag handles.
				</p>
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
};
export const OutCard = (props: CardProps) => {
	return (
		<IonCard>
			<IonItem lines="full">
				<IonIcon icon={exitOutline} slot="start" color="primary" />
				<IonLabel>Output Tab</IonLabel>
				<OverviewButton {...props} />
			</IonItem>
			<IonCardContent>
				<p>
					This is where the magic happens. Click the <strong>Generate</strong> button and the
					evolver will process all your input words and present your output in the space below.
				</p><p className="center pad-top-rem">
					<IonIcon icon={settingsOutline} color="tertiary" size="large" />
				</p><p>
					Click on the gear icon to open a list of options. The first is a drop-down menu
					where you can select what to output. The choices are <strong>Output
					only</strong>, <strong>Output and Sound-Change Rules</strong>, <strong>Input, then
					Output</strong> and <strong>Output, then Input</strong>.
				</p><p>
					Choosing <strong>Output only</strong> will display a simple list of evolved words.
				</p><p>
					<strong>Output and Sound-Change Rules</strong> displays the most complex output.
					For every word, it will print the input word, an arrow, and then the evolved word.
					Below that, it will print an indented list of the <strong>Sound Changes</strong> that
					evolved the word, in the format [rule] [arrow] [evolved word]. (If a sound-change
					didn't affect that word, then it will be omitted from this list.)
				</p><p>
					<strong>Input, then Output</strong>, as you might guess, prints a list in the format
					[input word] [arrow] [evolved word]. <strong>Output, then Input</strong> is the same,
					but the evolved word comes first.
				</p><p>
					The second option under the gear icon determines the style of arrow that is displayed
					with the output.
				</p><p className="center pad-top-rem">
					<IonIcon icon={bookOutline} color="tertiary" size="large" />
				</p><p>
					Once you've evolved words, you can save them to the <strong>Lexicon</strong>. Click the
					book button and you're presented with two options. <em>Save everything</em> will store
					every single evolved word for the Lexicon. <em>Choose what to save</em> will highlight
					every evolved word, and you can tap on a word to store it; when you're done choosing,
					hit the save button that appears and you will be able to choose how they are imported
					into the <strong>Lexicon</strong>.
				</p>
			</IonCardContent>
		</IonCard>
	);
};

const WEinfo = (props: PageData) => {

	return (
		<IonPage>
			<IonHeader>
				<Header title="Overview: WordEvolve" />
			</IonHeader>
			<IonContent className="overview">
				<IonCard>
					<IonItem lines="full">
						<WordEvolveIcon slot="start" color="primary" />
						<IonLabel>What is WordEvolve?</IonLabel>
					</IonItem>
					<IonCardContent>
						<p>
							This tool is designed to take a list of words and transform them into
							(possibly) new forms. The idea is to mimic the way natural languages
							change over time.
						</p><p>
							This is the most basic use case:
						</p><div>
							<ol>
								<li>Decide on how your language will evolve over time.</li>
								<li>Identify which parts will change, such as vowels and consonants.</li>
								<li>
									Note the environment in which the sound change takes place.
									(For example, a vowel may change only if it's preceded by a
									nasal consonant.)
								</li>
							</ol>
						</div><p>
							The <strong>Input</strong> tab holds the words you wish to
							change. <strong>Character Groups</strong> can hold categories of sounds
							that will change in the same way. <strong>Transformations</strong> is a
							place where you can define complex transformations that may be needed
							to simplify your sound changes. (For example, you may want to simplify
							multi-letter sounds into a single character.) The <strong>Sound
							Changes</strong> tab is where you define the various changes you want
							to make, and the <strong>Output</strong> tab is where you can see the
							results.
						</p>
					</IonCardContent>
				</IonCard>
				<InpCard hideOverview />
				<CharGroupCard hideOverview />
				<TraCard hideOverview />
				<SChCard hideOverview />
				<OutCard hideOverview />
			</IonContent>
		</IonPage>
	);
};

export default WEinfo;
