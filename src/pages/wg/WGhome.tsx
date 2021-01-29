import React from 'react';
import {
	IonContent,
	IonPage,
	IonHeader,
	IonToolbar,
	IonMenuButton,
	IonButtons,
	IonTitle,
	IonCard,
	IonCardContent,
	IonIcon,
	IonItem,
	IonLabel
} from '@ionic/react';
import {
	gridOutline,
	//optionsOutline,
	swapHorizontalOutline,
	//documentTextOutline,
	fileTrayStackedOutline
} from 'ionicons/icons';
import I from '../../components/IPA';
import '../WordGen.css';

const WGHome = () => {
	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					 <IonButtons slot="start">
						 <IonMenuButton />
					 </IonButtons>
					<IonTitle>WordGen</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen>
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
							When you make a category, you must give it a <em>description</em> and a
							one-character <em>label</em>. The description is for your own benefit, while
							the label will be used to refer to this category in the <strong>Syllables</strong> tab.
							So you may end up with categories that look like the following:
						</p>
						<div className="emphasizedList">
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
						<div className="emphasizedList">
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
							a <em>rule description</em> for your own benefit. Both expressions can use
							<strong>regular expressions</strong>, which are beyond the scope of this
							tutorial. You can also use the special expression %C to indicate any character
							in category C's run, or !%C to indicate any character <em>not</em> in that run.
						</p><p>
							So, you could make a search expression <strong>C</strong> with a replacement
							expression <strong>ch</strong>, which will result in <em>Cu</em> above
							becoming <em>chu</em>. This will result in a rule that looks like the following:
						</p>
						<div className="emphasizedList">
							<span className="boxed">C</span><span className="separateBoxes">➜</span><span className="boxed">ch</span>
						</div>
						<p>
							When you make more than one rule, arrows will appear that will allow you to move
							rules up or down. The first rule in the list will be run first, the second rule
							second, and so on down the list. This may cause unintended effects, so the arrows
							are provided so you can reorganize your rules to avoid any such effects.
						</p>
					</IonCardContent>
				</IonCard>
			</IonContent>
		</IonPage>
	);
};

export default WGHome;
