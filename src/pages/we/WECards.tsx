import React from 'react';
import {
	IonCard,
	IonCardContent,
	IonIcon,
	IonItem,
	IonLabel
} from '@ionic/react';
import {
	syncOutline,
	enterOutline,
	megaphoneOutline,
	exitOutline,
	libraryOutline,
	bookOutline,
	chevronDownCircleOutline,
	chevronUpCircleOutline,
	settingsOutline
} from 'ionicons/icons';
import { $q } from '../../components/DollarSignExports';

export const InpCard = () => {
	return (
		<IonCard>
			<IonItem>
				<IonIcon icon={enterOutline} slot="start" color="primary" />
				<IonLabel>Input Tab</IonLabel>
			</IonItem>
			<IonCardContent>
				<p>
					This pane has one purpose: determining which words you want to change.
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
export const CatCard = () => {
	return (
		<IonCard>
			<IonItem>
				<IonIcon icon={libraryOutline} slot="start" color="primary" />
				<IonLabel>Categories Tab</IonLabel>
			</IonItem>
			<IonCardContent>
				<p>
					This is where you define categories of sounds. You can reference these categories
					in <strong>Transformations</strong> and <strong>Sound Changes</strong> to fine-tune
					the way your language evolves.
				</p><p>
					When you make a category, you must give it a <em>description</em> and a
					one-character <em>label</em>. The description is for your own benefit, while
					the label will be used to refer to this category in the other tabs.
					The letters/characters in your category are called a <em>run</em>.
				</p><p>
					Click the (+) button to add a new category. <strong>Swipe left</strong> on a category
					to find the options to <em>Edit</em> or <em>Delete</em> that category.
				</p>
			</IonCardContent>
		</IonCard>
	);
};
export const TraCard = () => {
	return (
		<IonCard>
			<IonItem>
				<IonIcon icon={syncOutline} slot="start" color="primary" />
				<IonLabel>Transforms Tab</IonLabel>
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
					The <em>transform direction</em> is either "both ways", "at input only", or "at
					output only", and they determine how the two expressions are used.
				</p>
				<ul>
					<li>
						<strong>Input only:</strong> Before anything else happens, input words are
						searched, and any instances of the <em>input expression</em> are replaced with
						the <em>output expression</em>. Regular expressions and %Category references
						are allowed in the <em>input expression</em> only. (A category reference is
						something like %C to indicate any character in category C's run, or !%C to
						indicate any character <em>not</em> in that run.)
					</li><li>
						<strong>Output only:</strong> After all <strong>sound changes</strong> are
						processed, any instances of the <em>output expression</em> are replaced with
						the <em>input expression</em>. Regular expressions and %Category references
						are allowed in the <em>output expression</em> only.
					</li><li>
						<strong>Both ways:</strong> Before anything else happens, input words are
						searched, and any instances of the <em>input expression</em> are replaced with
						the <em>output expression</em>. After all <strong>sound changes</strong> are
						processed, any instances of the <em>output expression</em> are replaced with
						the <em>input expression</em>. Regular expressions are not allowed, but
						%Category references might be (see below).
					</li>
				</ul>
				<p>
					Click the (+) button to add a new transform. When you make more than one, arrows
					will appear that will allow you to move
					transforms <IonIcon icon={chevronUpCircleOutline} size="small" /> up
					or <IonIcon icon={chevronDownCircleOutline} size="small" /> down. The first
					transform in the list will be run first, the second transform second, and so on
					down the list. This may cause unintended effects, so the arrows are provided so
					you can reorganize your transforms to avoid any such effects.
				</p><p>
					<strong>Swipe left</strong> on a transform to find the options
					to <em>Edit</em> or <em>Delete</em> that transform.
				</p>
			</IonCardContent>
		</IonCard>
	);
};
export const SChCard = () => {
	const style = window.getComputedStyle($q("body"));
	const ltr = style.direction === "ltr";
	const arrow = (ltr ? "⟶" : "⟵");
	return (
		<IonCard>
			<IonItem>
				<IonIcon icon={megaphoneOutline} slot="start" color="primary" />
				<IonLabel>Sound Changes Tab</IonLabel>
			</IonItem>
			<IonCardContent>
				<p>
					This is where you determine how your words evolve. The display follows basic standard
					phonological rules for describing sound changes:
				</p>
				<div className="emphasizedList">
					<span className="importantUnit">s</span><span className="unimportantUnit">{arrow}</span><span className="importantUnit">z</span><span className="unimportantUnit">/</span><span className="importantUnit">d_</span><span className="unimportantUnit">!</span><span className="importantUnit">_h</span>
				</div>
				<p>
					The above means that "s" changes to "z" after a "d", but not when it's before an "h".
				</p><p>
					The first box is the <em>beginning expression</em>, the second is the <em>ending
					expression</em>, the third is the <em>context expression</em>, and the last is
					the <em>anticontext expression</em> (also called an <em>exception</em>).
				</p><p>
					The <em>beginning expression</em> can include plain text or regular expressions. It
					can also contain %Category references. (A category reference is something like %C to
					indicate any character in category C's run, or !%C to indicate any character that
					is <em>not</em> in that run.)
				</p><p>
					The <em>ending expression</em> should be plain text. However, it can include
					non-negative %Category references <strong>if and only if</strong> the <em>beginning
					expression</em> does, too. In that case, something special happens: when the
					evolver matches a character in a category, it will note what position that
					character is in the category's run. It will then look at the <em>ending</em> category
					and picks out the character in the same position. For example: If %S is being
					replaced with %Z, and those categories have runs "ptk" and "bdg", "p" will be
					replaced with "b", "t" will be replaced with "d", and "k" will be replaced by
					"g". (If the first category has more letters than the second, the second category's
					run will be repeated until it's long enough to find a match.)
					<strong>NOTE:</strong> If you have unequal numbers of %Categories in
					the <em>beginning</em> and <em>ending</em> expressions, errors may occur.
				</p><p>
					The <em>context expression</em> describes where in the word the <em>beginning
					expression</em> must be before it can be changed into the <em>ending
					expression</em>. The <em>anticontext expression</em> is similar, but it
					describes where in the world a match <strong>can't</strong> be made.
					(The <em>anticontext</em> is optional.)
				</p><p>
					There are two characters in <em>contexts</em> and <em>anticontexts</em> that
					have special functions. The underscore _ represents where the <em>ending
					expression</em> is being matched. You <strong>must</strong> include an
					underscore. The hash symbol # represents the beginning or end of a word. For
					example: if you want to turn "s" into "z" at the beginning of a word, you
					could create the following:
				</p>
				<div className="emphasizedList">
					<span className="importantUnit">s</span><span className="unimportantUnit">{arrow}</span><span className="importantUnit">z</span><span className="unimportantUnit">/</span><span className="importantUnit">#_</span>
				</div>
				<p>
					If you have no special rules for where in a word a replacement can happen,
					just make a <em>context expression</em> that's only a single underscore.
				</p><p>
					Click the (+) button to add a new sound-change. When you make more than one, arrows
					will appear that will allow you to move these
					changes <IonIcon icon={chevronUpCircleOutline} size="small" /> up
					or <IonIcon icon={chevronDownCircleOutline} size="small" /> down. The first
					sound-change in the list will be run first, the second sound-change second, and so
					on down the list. This may cause unintended effects, so the arrows are provided
					so you can reorganize your sound-changes to avoid any such effects.
				</p><p>
					<strong>Swipe left</strong> on a sound-change to find the options
					to <em>Edit</em> or <em>Delete</em> it.
				</p>

			</IonCardContent>
		</IonCard>
	);
};
export const OutCard = () => {
	return (
		<IonCard>
			<IonItem>
				<IonIcon icon={exitOutline} slot="start" color="primary" />
				<IonLabel>Output Tab</IonLabel>
			</IonItem>
			<IonCardContent>
				<p>
					This is where the magic happens. Click the <strong>Generate</strong> button and the
					evolver will process all your input words and present your output in the space below.
				</p><p>
					Click on the gear icon <IonIcon icon={settingsOutline} size="small" /> to open a
					list of options. The first is a drop-down menu where you can select what to output.
					The choices are <strong>Output only</strong>, <strong>Output and Sound-Change
					Rules</strong>, <strong>Input, then Output</strong> and <strong>Output, then
					Input</strong>.
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
				</p><p>
					Once you've evolved words, you can save them to the <strong>Lexicon</strong>. Click
					the <IonIcon icon={bookOutline} size="small" /> <strong>Save</strong> button and
					you're presented with two options. <em>Save everything</em> will save every single
					evolved word to the Lexicon. <em>Choose what to save</em> will highlight every evolved
					word, and you can tap on a word to save it; when you're done choosing, hit
					the <strong>Done Saving</strong> button that appears. You will need to go to
					the <strong>Lexicon</strong> to add these saved words to your lexicon.
				</p>
			</IonCardContent>
		</IonCard>
	);
};
