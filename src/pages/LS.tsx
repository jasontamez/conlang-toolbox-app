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
	IonRange
} from '@ionic/react';
import { globeOutline } from 'ionicons/icons';
import { /*useSelector,*/ useDispatch } from "react-redux";
import {
	openModal
} from '../components/ReduxDucksFuncs';
//import { Lexicon } from '../components/ReduxDucksTypes';
//import { CustomStorageLS } from '../components/PersistentInfo';
import ExtraCharactersModal from './M-ExtraCharacters';

const Lex = () => {
	const dispatch = useDispatch();
//	const [appSettings, lexicon] = useSelector((state: any) => [state.appSettings, state.lexicon]);
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
			<IonContent fullscreen className="evenBackground" id="langSketchPage">
				<IonList lines="none">
					<IonItem>
						<IonLabel className="h1">Morphologocal Typology</IonLabel>
					</IonItem>
					<IonItem className="l2 h2">
						<IonLabel>Traditional Typology</IonLabel>
					</IonItem>
					<IonItem className="l3">
						<IonLabel>Synthesis</IonLabel>
						<IonRange />
					</IonItem>
					<IonItem className="l3">
						<IonLabel>Fusion</IonLabel>
					</IonItem>
					<IonItem>
						<ol>
							<li className="h h1"><strong>1</strong> <em>Morphological Typology</em></li>
							<li><ol>
								<li className="h h2"><strong>1.1</strong> <em>Traditional Typology</em></li>
								<li><ol>
									<li className="h"><strong>1.1.1</strong> <em>Synthesis</em></li>
									<li><ul>
										<li>How many <em>morphemes</em> (the most basic unit of meaning) appear in a word?</li>
										<li>Chinese is very <em>isolating</em>, tending towards one morpheme per word.</li>
										<li>Inuit and Quechua are very <em>polysynthetic</em>, with many morphemes per word.</li>
									</ul></li>
									<li className="h"><strong>1.1.2</strong> <em>Fusion</em></li>
									<li><ul>
										<li>How many meanings does a morpheme encode?</li>
										<li>Spanish can be very <em>fusional</em>, with a single suffix capable of encoding tense, aspect, mood and number.</li>
										<li>English can be very <em>agglutinative</em>, with one meaning per morpheme (e.g. anti-dis-establish-ment-ari-an-ism), though fusional forms are possible (e.g. swam, was).</li>
									</ul></li>
								</ol></li>
								<li className="h h2"><strong>1.2</strong> <em>Morphological Processes</em></li>
								<li><ol>
									<li className="h"><strong>1.2.1</strong> <em>Affixes</em></li>
									<li><ul>
										<li>Which form predominates?</li>
										<li>Prefixes, suffixes, circumfixes, infixes.</li>
									</ul></li>
									<li className="h"><strong>1.2.2</strong> <em>Stem Modification</em></li>
									<li><ul>
										<li>e.g. swim/swam/swum.</li>
									</ul></li>
									<li className="h"><strong>1.2.3</strong> <em>Reduplication</em></li>
									<li><ul>
										<li>Often used for plurality.</li>
									</ul></li>
									<li className="h"><strong>1.2.4</strong> <em>Suprasegmental Modification</em></li>
									<li><ul>
										<li>e.g. "permit" has different stress when a noun and a verb.</li>
										<li>Tone changes also fall under this category.</li>
									</ul></li>
								</ol></li>
								<li className="h h2"><strong>1.3</strong> <em>Head/Dependant Marking</em></li>
								<li><ul>
									<li>English is predominantly dependant-marked ("the queen's crown")</li>
									<li>Most languages are head-marked (*"the queen crown's")</li>
									<li>Some are mixed, but stay in one pattern for a certain class of phrases (noun, verb, adposition)</li>
								</ul></li>
							</ol></li>
							<li className="h h1"><strong>2</strong> <em>Grammatical Categories</em></li>
						</ol>
					</IonItem>
				</IonList>
			</IonContent>
		</IonPage>
	);
};
 
export default Lex;
