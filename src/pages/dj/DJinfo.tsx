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
	helpCircle,
	logInOutline,
	logOutOutline,
	reorderThree
} from 'ionicons/icons';

import { PageData, SetBooleanState } from '../../store/types';

import Header from '../../components/Header';
import { DJGroupsIcon, DeclenjugatorIcon } from '../../components/icons';
import { RegularExpressions } from '../../components/regularExpressionsInfo';

interface CardProps {
	hideOverview?: boolean
	setIsOpenInfo?: SetBooleanState
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
			routerLink="/dj/overview"
			routerDirection="forward"
			onClick={() => setIsOpenInfo && setIsOpenInfo(false)}
		>
			<IonIcon icon={helpCircle} />
		</IonButton>
	);
};

export const InputCard = (props: CardProps) => {
	return (
		<IonCard>
			<IonItem lines="full">
				<IonIcon icon={logInOutline} slot="start" color="primary" />
				<IonLabel>Input Tab</IonLabel>
				<OverviewButton {...props} />
			</IonItem>
			<IonCardContent>
				<p>
					This tab has one purpose: determining which words you want to decline or conjugate.
					Using this tab is entirely optional.
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

export const GroupCard = (props: CardProps) => {
	return (
		<IonCard>
			<IonItem lines="full">
				<DJGroupsIcon slot="start" color="primary" />
				<IonLabel>Groups Tab</IonLabel>
				<OverviewButton {...props} />
			</IonItem>
			<IonCardContent>
				<p>
					This is where you define groups of declensions and conjugations. Most languages
					treat certain groupings of words differently when they are declined or
					conjugated. For instance, English only declines its pronouns for case and person,
					while Spanish has different conjugations for verbs depending on if they end in
					-ar, -er, or -ir.
				</p>
				<hr />
				<p>
					Click the (+) button to add a new group. When you make a group, you must
					give it a title or description. You can choose to label this as
					a <em>declension</em>, a <em>conjugation</em>, or under <em>other</em> if
					you don't want to use those labels. Optionally, you can note what types of
					words this group will apply to.
				</p><p>
					Next, you will provide instructions on how to find the "stem" of the word.
					For example, if you were creating a conjugation for words ending in -ar, you
					would put "ar" in the box labelled "Remove from End of Word to Find Root".
				</p><p>
					Note: You can provide multiple conditions. For instance, putting "ar" in both
					boxes will match words that begin with ar- <em>and</em> end with -ar. You can
					also hit the "Use advanced method" toggle switch to use <strong>regular
					expressions</strong> to find a stem. (See the end of this section for more info
					on regular expressions.)
				</p>
				<hr />
				<p>
					At the bottom of the form, you will see an "Add New" button. Use this to create the
					group's individual declensions or conjugations. For simplicity, we will use the
					term "method" to mean either.
				</p><p>
					First, you give the method a title. There is a small (+) button next to the input
					that will open a pop-up with numerous common declension and conjugation types, if
					you wish to use it.
				</p><p>
					Below that is a toggle "Use entire word". If checked, the method will operate on
					the entire word instead of just the stem.
				</p><p>
					At the bottom, there are two input boxes around the word "stem". (This becomes
					"word" if you check the toggle above.) If this method would add a prefix, put the
					prefix in the box before "stem". If it would use a suffix, put it in the box after
					"stem". You can use both boxes for a circumfix, but for infixes and other more
					complicated changes, you will need to use the "advanced method" and regular
					expressions.
				</p>
				<hr />
				<p>
					Once your groups are made, they will show up on the screen. Swipe left on them to find Edit
					and Delete buttons. You can also use the <IonIcon icon={reorderThree} color="secondary" /> drag
					handles to rearrange their order. (Note: you can't rearrange across types, dragging a
					"conjugation" into the "other" or "declension" areas, for example. If you want to
					change its type, swipe left and choose the Edit button.)
				</p>
				<p>
					Here's an example of possible methods you could make for a Spanish-type conjugation:
				</p><div className="example">
					<div className="title">Group</div>
					<ul className="simple">
						<li><strong>Title</strong>: Conjugations (A)</li>
						<li><strong>Type</strong>: <em>conjugation</em></li>
						<li><strong>Remove From Start of Word</strong>: (blank)</li>
						<li><strong>Remove From End of Word</strong>: ar</li>
					</ul>
					<div className="title">Conjugations</div>
					<ul className="simple">
						<li><strong>1st-person singuar present</strong>: stem[o]</li>
						<li><strong>2nd-person singuar present</strong>: stem[as]</li>
						<li><strong>3rd-person singuar present</strong>: stem[a]</li>
						<li><strong>1st-person plural present</strong>: stem[amos]</li>
						<li><strong>3rd-person plural present</strong>: stem[an]</li>
					</ul>
				</div>
				<RegularExpressions />
			</IonCardContent>
		</IonCard>
	);
}

export const OutputCard = (props: CardProps) => {
	return (
		<IonCard>
			<IonItem lines="full">
				<IonIcon icon={logOutOutline} slot="start" color="primary" />
				<IonLabel>Output Tab</IonLabel>
				<OverviewButton {...props} />
			</IonItem>
			<IonCardContent>
				<p>
					This is where you can find the results of your work. At the top of the page, you can
					choose how you want the information to display, and choose if you want to display
					declensions, conjugations, and/or other. If you want to decline/conjugate words you
					put in the <strong>Input</strong> tab, be sure to switch the toggle on. It will open
					up a new set of options you can use to fine-tune the results.
				</p><p>
					Click on Generate to display your info, or click on Export to export your info to a
					file. <strong>Note</strong>: when displaying a chart in the app, it may clip off the edge
					of the screen. If this happens, you can drag the chart left and right to scroll the
					hidden areas into view.
				</p>
			</IonCardContent>
		</IonCard>
	);
}

const DJinfo = (props: PageData) => {

	return (
		<IonPage>
			<IonHeader>
				<Header title="Overview: Declenjugator" />
			</IonHeader>
			<IonContent className="overview">
				<IonCard>
					<IonItem lines="full">
						<DeclenjugatorIcon slot="start" color="primary" />
						<IonLabel>What is Declenjugator?</IonLabel>
					</IonItem>
					<IonCardContent>
						<p>
							This tool is for
							creating <strong>declensions</strong> and <strong>conjugations</strong>.
						</p><p>
							A declension is, at its most basic, modifying a word to show its role in
							a sentence. Declensions may apply to nouns, pronouns, adjectives, adverbs,
							and articles to indicate number (singular, dual, plural, etc), case (nominative,
							accusative, genitive, dative, etc), gender (male, female, inanimate, etc), and
							other grammatical categories. 
						</p><p>
							A conjugation is much like a declension, but it modifies verbs. Like declensions,
							they can indicate number, gender, and case, but they also often include person (I,
							you, they, etc), tense (past, present, future, etc), aspect (perfect, imperfect,
							etc), mood/mode, politeness, and numerous other verb qualities. 
						</p>
					</IonCardContent>
				</IonCard>
				<InputCard hideOverview />
				<GroupCard hideOverview />
				<OutputCard hideOverview />
			</IonContent>
		</IonPage>
	);
};

export default DJinfo;
