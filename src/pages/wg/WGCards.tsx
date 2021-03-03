import React from 'react';
import {
	IonCard,
	IonCardContent,
	IonIcon,
	IonItem,
	IonLabel
} from '@ionic/react';
import {
	gridOutline,
	optionsOutline,
	swapHorizontalOutline,
	documentTextOutline,
	fileTrayStackedOutline,
	bookOutline,
	settingsOutline,
	reorderTwo
} from 'ionicons/icons';
import ltr from '../../components/LTR';
import I from '../../components/IPA';

export const CatCard = () => {
	return (
		<IonCard>
			<IonItem>
				<IonIcon icon={fileTrayStackedOutline} slot="start" color="primary" />
				<IonLabel>Categories Tab</IonLabel>
			</IonItem>
			<IonCardContent>
				<p>
					This is where you define categories of sounds. The two simplest categories
					are <em>consonants</em> and <em>vowels</em>, but you may want to create multiple
					categories depending on how you want your language's syllables formed. For
					example, the consonants <I>pbk</I> in English may be followed by the
					consonants <I>lr</I> at the beginning of syllables. So you might choose them as
					categories, while also putting <I>pbklr</I> in a third category for general
					consonants.
				</p><p>
					Click the (+) button to add a new category. When you make a category, you must give it
					a <em>description</em> and a one-character <em>label</em>. The label can be any single
					character except for these: <strong>{"^$\\()[]{}.*+?|"}</strong>. The description is
					for your own benefit, while the label will be used to refer to this category in
					the <strong>Syllables</strong> tab. So you may end up with categories that look
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
					The letters/characters in your category are called a <em>run</em>. The run should be
					put in a specific order. The first letter is more likely to be used than the second,
					the second more likely than the third, and so on. This mimics natural languages, which
					tend to use certain sounds more than others. You can adjust this <em>dropoff rate</em>, or
					eliminate it entirely, on the <strong>Settings</strong> tab.
				</p>
			</IonCardContent>
		</IonCard>
	);
}
export const SylCard = () => {
	return (
		<IonCard>
			<IonItem>
				<IonIcon icon={gridOutline} slot="start" color="primary" />
				<IonLabel>Syllables Tab</IonLabel>
			</IonItem>
			<IonCardContent>
				<p>
					This is where you determine how your syllables are formed. You use the <em>labels</em> to
					describe the elements that make up a syllable. For example, using the labels above, you
					could decide to make a list of syllables such as the following:
				</p>
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
					The above can generate syllables such as <em>pla</em>, <em>ku</em>, or <em>brep</em>, which
					could then be combined into words such as <em>plabrep</em> or <em>kupla</em>. You can
					also put characters in a syllable that don't correspond to a category: <strong>sILV</strong> could
					generate syllables such as <em>sbra</em> or <em>spli</em>.
				</p><p>
					If you desire a greater amount of control over your words, you can turn on
					the <strong>Use multiple syllable types</strong> toggle. This will show you four
					separate boxes, each with a different role in a word: <strong>single-word syllables</strong> are
					used exclusively for one-syllable words, <strong>word-initial syllables</strong> are
					only used at the start of a word, <strong>word-final syllables</strong> are only used
					at the end of a word, and <strong>mid-word syllables</strong> fill out the middle
					of words when needed.
				</p><p>
					The order of syllables in each box makes a difference. The first syllable listed is
					more likely to be used than the second, the second more likely than the third, and
					so on. You can adjust this <em>dropoff rate</em>, or eliminate it entirely, on
					the <strong>Settings</strong> tab. You'll also find options there to determine how
					often one-syllable words are generated, and put an upper limit on the number of
					syllables any one word can have.
				</p>
			</IonCardContent>
		</IonCard>
	);
}
export const RewCard = () => {
	const arrow = (ltr() ? "⟶" : "⟵");
	return (
		<IonCard>
			<IonItem>
				<IonIcon icon={swapHorizontalOutline} slot="start" color="primary" />
				<IonLabel>Rewrites Rules Tab</IonLabel>
			</IonItem>
			<IonCardContent>
				<p>
					There may be cases when you need to fine-tune the words that get generated
					on the <strong>Output</strong> tab. A common reason would be to turn a
					specific character into two or three. You may create a category such
					as <strong>C=pbkClrS</strong>, using capital letters in place of sounds
					like <em>"ch"</em> or <em>"sh"</em>. This could generate syllables
					like <em>Cu</em> or <em>pliS</em>.
				</p><p>
					When you make a new <em>rewrite rule</em>, you provide
					a <em>search expression</em>, a <em>replacement expression</em>, and, optionally,
					a <em>rule description</em> for your own benefit. Both expressions can
					use <strong>regular expressions</strong>, which are beyond the scope of this
					tutorial. You can also use the special expression %C to indicate any character
					in category C's run, or !%C to indicate any character <em>not</em> in that run.
				</p><p>
					So, you could make a search expression <strong>C</strong> with a replacement
					expression <strong>ch</strong>, which will result in <em>Cu</em> above
					becoming <em>chu</em>. This will result in a rule that looks like the following:
				</p>
				<div className="emphasizedSection serifChars">
					<span className="importantUnit">C</span><span className="unimportantUnit">{arrow}</span><span className="importantUnit">ch</span>
				</div>
				<p>
					Click the (+) button to add a new rewrite rule. The first rule in the list will be
					run first, the second rule second, and so on down the list. This may cause
					unintended effects, so you can reorganize your rules to avoid any such effects by
					using the <IonIcon icon={reorderTwo} color="tertiary" size="small" /> drag handles.
				</p>
				<hr />
				<p>
					Here are some sample rules for some linguistic phenomina:
				</p>
				<ul>
					<li>Consonant harmony:
						<div className="emphasizedSection serifChars">
							RtL: <span className="importantUnit">s(?=.*ʃ)</span><span className="unimportantUnit">{arrow}</span><span className="importantUnit">ʃ</span>
							<br />
							LtR: <span className="importantUnit">(ʃ.+)s</span><span className="unimportantUnit">{arrow}</span><span className="importantUnit">$1ʃ</span>
						</div>
					</li>
					<li>Liquid dissimilation:
						<div className="emphasizedSection serifChars">
							<span className="importantUnit">r(.+)r</span><span className="unimportantUnit">{arrow}</span><span className="importantUnit">r$1l</span>
							<br />
							<span className="importantUnit">l(.+)l</span><span className="unimportantUnit">{arrow}</span><span className="importantUnit">l$1r</span>
						</div>
					</li>
					<li>Synchronic epenthesis:
						<div className="emphasizedSection serifChars">
							<span className="importantUnit">r([aeiou]r)$</span><span className="unimportantUnit">{arrow}</span><span className="importantUnit">rd$1</span>
						</div>
					</li>
					<li>Anticipatory assimilation:
						<div className="emphasizedSection serifChars">
							<span className="importantUnit">[kp]t+</span><span className="unimportantUnit">{arrow}</span><span className="importantUnit">tt</span>
						</div>
					</li>
				</ul>
			</IonCardContent>
		</IonCard>
	);
}
export const OutCard = () => {
	return (
		<IonCard>
			<IonItem>
				<IonIcon icon={documentTextOutline} slot="start" color="primary" />
				<IonLabel>Output Tab</IonLabel>
			</IonItem>
			<IonCardContent>
				<p>
					This is where the magic happens. Click the <strong>Generate</strong> button and your
					output will appear below. Press the button again and a new set of output
					will replace it.
				</p><p>
					Click on the gear icon <IonIcon icon={settingsOutline} size="small" /> to open a
					list of options. The first is a drop-down menu where you can select what to output.
					The choices are <strong>Pseudo-text</strong>, <strong>Wordlist</strong> and <strong>All
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
					possible syllable your categories, syllables and rewrite rules allow.
					The <em>capitalize</em>, <em>sort</em> and <em>multi-column</em> options above will
					also work on this syllable list.
				</p><p>
					At the top of the settings, you can choose to <strong>show syllable breaks</strong>, which
					will in·sert a dot be·tween eve·ry syl·la·ble in each word. While this option can be useful,
					please note that it will break any <em>rewrite rules</em> that try to work across syllable
					boundaries.
				</p><p>
					Once you've generated words, you can save them to the <strong>Lexicon</strong>. Click
					the <IonIcon icon={bookOutline} size="small" /> <strong>Save</strong> button and you're
					presented with two options. <em>Save everything</em> will save every single generated word
					to the Lexicon. <em>Choose what to save</em> will highlight every word, and you can tap on
					a word to save it; when you're done choosing, hit the <strong>Done Saving</strong> button
					that appears. You will need to go to the <strong>Lexicon</strong> to add these saved words
					to your lexicon.
				</p>
			</IonCardContent>
		</IonCard>
	);
}
export const OptCard = () => {
	return (
		<IonCard>
			<IonItem>
				<IonIcon icon={optionsOutline} slot="start" color="primary" />
				<IonLabel>Settings Tab</IonLabel>
			</IonItem>
			<IonCardContent>
				<p>
					This final pane fine-tunes the output. These can make a huge difference in
					how your conlang appears.
				</p><p>
					The <strong>Load Presets</strong> button brings up a menu where you can choose from
					several pre-loaded options. The initial settings when you open the app are
					the <em>Simple</em> preset. The others are offered to give you ideas of what's
					possible with the app. They will load <em>categories</em>, <em>syllables</em>, <em>rewrite
					rules</em> and possibly change the remaining settings on this page, too.
				</p><p>
					The <strong>Clear All Fields</strong> button clears
					all <em>categories</em>, <em>syllables</em> and <em>rewrite rules</em>, but does not
					affect any other settings.
				</p><p>
					The <strong>Rate of monosyllable words</strong> determines how often a one-syllable
					word is created. It's a percentage from 0 (never) to 100 (always).
				</p><p>
					<strong>Maximum number of syllables per word</strong> sets an upper limit on how long
					your words can grow.
				</p><p>
					<strong>Category run dropoff</strong> and <strong>syllable run dropoff</strong> run
					from 0 to 50. At zero (flat), category and syllable choices are all equiprobable.
					Otherwise, the number becomes a percentage. A random number is generated, and if it's
					lower than the percentage, the first choice is picked. If not, a new number is
					generated for the second choice, and so on down the line until a choice is made. (If
					all choices are exhausted without one being chosen, the cycle begins from the first
					choice again.)
				</p><p>
					The remaining options only apply to <em>pseudo-texts</em>. The first
					option, <strong>capitalize sentences</strong>, determines if each sentence starts
					with a capital letter. The remaining options determine what your sentences
					look like. By default, three-fourths of all sentences will
					be <em>declarative</em>, one-sixth will be <em>interrogative</em> (questions),
					and one-twelfth will be <em>exclamatory</em>. You can put special punctuation
					before and after these sentences if you wish.
				</p>
			</IonCardContent>
		</IonCard>
	);
}
