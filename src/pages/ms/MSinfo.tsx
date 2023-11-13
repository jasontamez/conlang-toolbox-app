import React from 'react';
import {
	IonCard,
	IonCardContent,
	IonContent,
	IonHeader,
	IonIcon,
	IonItem,
	IonLabel,
	IonPage
} from '@ionic/react';

import { PageData } from '../../store/types';

import Header from '../../components/Header';
import { MorphoSyntaxIcon } from '../../components/icons';
import { informationCircle, settings } from 'ionicons/icons';

const MSinfo = (props: PageData) => {

	return (
		<IonPage>
			<IonHeader>
				<Header title="Overview: MorphoSyntax" />
			</IonHeader>
			<IonContent className="overview">
				<IonCard>
					<IonItem lines="full">
						<MorphoSyntaxIcon slot="start" color="primary" />
						<IonLabel>What is MorphoSyntax?</IonLabel>
					</IonItem>
					<IonCardContent>
						<p>
							This tool offers a way to describe the "rules" of a language. It's based
							on methods linguists use to describe real-world languages. Because of this,
							it uses "technical" language extensively and may feel imposing to a novice.
						</p><p>
							The most important thing to remember is that <strong>everything in this
							tool is optional!</strong> Don't look at it as a checklist that you must
							fill out. Instead, look at it as a buffet where you can pick and choose
							what interests you and ignore the rest.
						</p><p>
							The settings <IonIcon icon={settings} size="small" color="tertiary" /> page
							has a place for you to title and describe your morphosyntax document. There
							are also buttons where you can save, store, export, and delete your saved
							documents.
						</p><p className="center pad-top-rem">
							<IonIcon icon={informationCircle} size="large" color="tertiary" />
						</p><p>
							As you go through the pages, you will see buttons with the (i) symbol. They
							will provide you with more detailed information about the associated topic.
						</p><p>
							The pages are arranged according to these topics:
						</p><div>
							<ol>
								<li>Morphological Typology<ul>
									<li>The general ways the language forms words</li>
								</ul></li>
								<li>Grammatical Categories<ul>
									<li>Nouns, verbs, etc.</li>
								</ul></li>
								<li>Constituent Order Typology<ul>
									<li>How words are arranged in sentences and phrases</li>
								</ul></li>
								<li>Noun and Noun Phrase Operations<ul>
									<li>Ways that nouns can be modified</li>
								</ul></li>
								<li>Predicate Nominals and Related Constructions<ul>
									<li>
										When noun-like phrases end up in verb-like positions (e.g.
										Fido <em>is a dog</em>)
									</li>
								</ul></li>
								<li>Grammatical Relations<ul>
									<li>How the nouns in a sentence are "coded"</li>
								</ul></li>
								<li>Voice and Valence Adjusting Operations<ul>
									<li>
										Dealing with things like "passive voice" and when a verb
										takes more or fewer arguments than normal
									</li>
								</ul></li>
								<li>Other Verb and Verb Phrase Operations<ul>
									<li>
										How verbs change into other categories (e.g. nouns, adjectives),
										and how they do (or do not) handle time (past, future),
										aspect (perfect, imperfect), mode (attitude of the speaker),
										and other conditions
									</li>
								</ul></li>
								<li>Pragmatically Marked Structures<ul>
									<li>
										How the <em>content</em> of a phrase relates to
										the <em>context</em> of the situation
									</li>
								</ul></li>
								<li>Clause Combinations<ul>
									<li>How bits of sentences combine and relate to each other</li>
								</ul></li>
							</ol>
						</div>
					</IonCardContent>
				</IonCard>
			</IonContent>
		</IonPage>
	);
};

export default MSinfo;
