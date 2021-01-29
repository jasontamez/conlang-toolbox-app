import React from 'react';
import {
	IonContent,
	IonPage,
	IonHeader,
	IonToolbar,
	IonMenuButton,
	IonButtons,
	IonTitle,
	IonList,
	IonButton,
	IonItemDivider,
	IonItem,
	IonLabel,
	IonToggle,
	IonRange,
	IonSelect,
	IonSelectOption,
	IonPopover,
	IonIcon
} from '@ionic/react';
import { $i } from '../../components/DollarSignExports';
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import {
	WGRewriteRuleObject,
	OutputTypes,
	Fifty_OneThousand,
	setOutputType,
	setSyllableBreaks,
	setCapitalizeWords,
	setSortWordlist,
	setWordlistMulticolumn,
	setWordsPerWordlist,
	openPopover,
	closePopover
} from '../../components/ReduxDucks';
import { caretForwardCircleOutline, settingsOutline } from 'ionicons/icons';
import '../WordGen.css';

const WGOut = () => {
	const dispatch = useDispatch();
	// Pseudo-text needs no special formatting, wrap entirely in a <div>
	// Wordlists require columnWidth equal to the largest word's width (using determineWidth) and each word in a <div>
	const outputPane = $i("outputPane");
	const $d = (text: string) => {
		let div = document.createElement("div");
		div.textContent = text;
		return div;
	};
	
	const stateObject = useSelector((state: any) => state, shallowEqual);
	const categoriesObject = stateObject.categories;
	const catMap = categoriesObject.map;
	const syllablesObject = stateObject.syllables;
	const syllToggle = syllablesObject.toggle;
	const allSyllables = syllablesObject.objects;
	const rewriteRules = stateObject.rewriteRules.list;
	const settingsWG = stateObject.wordgenSettings;
	const popoverState = stateObject.popoverState;
	
	let textWidthTester = document.createElement("canvas").getContext("2d");
	textWidthTester!.font = "var(--ion-default-font)";
	const determineWidth = (input: string) => {
		return textWidthTester!.measureText(input).width;
	};
	const getWidestWord = (words: string[]) => {
		let max = Math.max(...words.map(w => determineWidth(w))) * 2;
		return Math.ceil(max).toString() + "px";
	};
	
	const generateOutput = (output: HTMLElement) => {
		let text: string[] = [];
		let type = settingsWG.output;
		// Clear any previous output.
		while(output.firstChild !== null) {
			output.removeChild(output.firstChild);
		}
		// Determine what we're making.
		if(type === "text") {
			// pseudotext
			text = generatePseudoText();
			output.style.columnWidth = "auto";
		} else if (type === "syllables") {
			// all possible syllables
			text = getEverySyllable(settingsWG.capitalizeWords);
			// reset columns if needed
			output.style.columnWidth = settingsWG.wordlistMultiColumn ? getWidestWord(text) : "auto";
		} else {
			// wordlist
			text = makeWordlist(settingsWG.capitalizeWords);
			// reset columns if needed
			output.style.columnWidth = settingsWG.wordlistMultiColumn ? getWidestWord(text) : "auto";
		}
		// Add to screen.
		text.forEach(bit => output.append($d(bit)));
	};
	
	
	// // //
	// Generate a psuedo-text
	// // //
	const generatePseudoText = () => {
		let text = [];
		let numberOfSentences = settingsWG.sentencesPerText;
		let capitalize = settingsWG.capitalizeSentences;
		let d1 = settingsWG.declarativeSentencePre;
		let d2 = settingsWG.declarativeSentencePost;
		let i1 = settingsWG.interrogativeSentencePre;
		let i2 = settingsWG.interrogativeSentencePost;
		let e1 = settingsWG.exclamatorySentencePre;
		let e2 = settingsWG.exclamatorySentencePost;
		let sentenceNumber = 0;
		while(sentenceNumber < numberOfSentences) {
			let sentence = [];
			sentenceNumber++;
			let wordNumber = 0;
			let maxWords = 3;
			for(maxWords = 3; true; maxWords = Math.max((maxWords + 1) % 15, 3)) {
				// The 'true' in there means this loop never ends on its own.
				if ((Math.random() * 100) < (maxWords < 5 ? 35 : (maxWords < 9 ? 50 : 25))) {
					break;
				}
			}
			while(wordNumber < maxWords) {
				wordNumber++;
				sentence.push(makeOneWord(wordNumber < 2 && capitalize));
			}
			let full = sentence.join(" ");
			let type = Math.random() * 10;
			if(type < 5) {
				// Declarative half the time
				full = d1 + full + d2;
			} else if (type < 8) {
				// Interrogative three-tenths the time
				full = i1 + full + i2;
			} else {
				// Exclamatory one-fifth the time
				full = e1 + full + e2;
			}
			text.push(full);
		}
		return [text.join(" ")];
	};
	
	// // //
	// Generate Syllables
	// // //
	const makeMonosyllable = () => {
		return makeSyllable(allSyllables.singleWord.components, settingsWG.syllableBoxDropoff);
	};
	const makeFirstSyllable = () => {
		return makeSyllable(allSyllables[syllToggle ? "wordInitial" : "singleWord"].components, settingsWG.syllableBoxDropoff);
	};
	const makeMidSyllable = () => {
		return makeSyllable(allSyllables[syllToggle ? "wordMiddle" : "singleWord"].components, settingsWG.syllableBoxDropoff);
	};
	const makeLastSyllable = () => {
		return makeSyllable(allSyllables[syllToggle ? "wordFinal" : "singleWord"].components, settingsWG.syllableBoxDropoff);
	};
	const makeSyllable = (syllList: string[], rate: number) => {
		let max = syllList.length;
		let toPick = 0;
		let chosen;
		for(toPick = 0; true; toPick = (toPick + 1) % max) {
			// The 'true' in there means this loop never ends on its own.
			if ((Math.random() * 100) < rate) {
				chosen = syllList[toPick];
				break;
			}
		}
		return translateSyllable(chosen);
	};
	const translateSyllable = (syll: string) => {
		let chars = syll.split("");
		let output: string = "";
		let rate = settingsWG.categoryRunDropoff;
		while(chars.length > 0) {
			let current = chars.shift();
			let category = catMap.get(current);
			if(category === undefined) {
				output += current;
			} else {
				let toPick = 0;
				let choices = category.run;
				let max = choices.length;
				for(toPick = 0; true; toPick = (toPick + 1) % max) {
					// The 'true' in there means this loop never ends on its own.
					if ((Math.random() * 100) < rate) {
						output += choices[toPick];
						break;
					}
				}
			}
		}
		return output;
	};
	
	// // //
	// Generate One Word
	// // //
	const makeOneWord = (capitalize: boolean) => {
		let numberOfSyllables = 1;
		let word: string[] = [];
		let output: string;
		// Determine number of syllables
		if(Math.floor(Math.random() * 100) > settingsWG.monosyllablesRate) {
			// More than 1. Add syllables, favoring a lower number of syllables.
			let max = settingsWG.maxSyllablesPerWord - 2;
			let toAdd = 0;
			numberOfSyllables++;
			for(toAdd = 0; true; toAdd = (toAdd + 1) % max) {
				// The 'true' in there means this loop never ends on its own.
				if ((Math.random() * 100) < 50) {
					numberOfSyllables += toAdd;
					break;
				}
			}
		}
		// Check if we're monosyllabic.
		if(numberOfSyllables === 1) {
			// Mono
			word.push( makeMonosyllable() );
		} else {
			// Polysyllabic
			word.push( makeFirstSyllable() );
			let current = 1;
			while(current < numberOfSyllables) {
				current++;
				if(current === numberOfSyllables) {
					word.push( makeLastSyllable() );
				} else {
					word.push( makeMidSyllable() );
				}
			}
		}
		// Check for syllable break insertion
		if(settingsWG.showSyllableBreaks) {
			output = word.join("\u00b7");
		} else {
			output = word.join("");
		}
		// Apply rewrite rules
		output = doRewrite(output);
		// Capitalize if needed
		if(capitalize) {
			output = output.charAt(0).toUpperCase() + output.slice(1);
		}
		return output;
	};
	
	
	// // //
	// Apply Rewrite Rules
	// // //
	const doRewrite = (word: string) => {
		rewriteRules.forEach((rule: WGRewriteRuleObject) => {
			word = word.replace(rule.regex, rule.replace);
		});
		return word;
	};
	
	// // //
	// Generate Every Possible Syllable
	// // //
	const getEverySyllable = (capitalize: boolean = false) => {
		let output: string[] = [];
		let syllables = allSyllables.singleWord.components
		if(syllToggle) {
			syllables = syllables.concat(
				allSyllables.wordInitial.components,
				allSyllables.wordMiddle.components,
				allSyllables.wordFinal.components
			);
		}
		syllables.forEach((syll: string) => recurseSyllables(output, "", syll));
		// Run through rewrite rules
		output = output.map(word => doRewrite(word));
		// Capitalize if needed
		if(capitalize) {
			output = output.map(word => (word.charAt(0).toUpperCase() + word.slice(1)));
		}
		// Remove duplicates
		let noDupes = new Set(output);
		output = [];
		noDupes.forEach(t => output.push(t));
		// Sort if needed
		if(settingsWG.sortWordlist) {
			output.sort(new Intl.Collator("en", { sensitivity: "variant" }).compare);
		}
		return output;
	};
	const recurseSyllables = (allFound: string[], previous: string, toGo: string) => {
		let current = toGo.charAt(0);
		let next = toGo.slice(1);
		let category = catMap.get(current);
		if(category === undefined) {
			// Category not found - save as written
			previous += current;
			if(next === "") {
				// Continue the recursion
				recurseSyllables(allFound, previous, next);
			} else {
				// This is done. Save.
				allFound.push(previous);
			}
		} else if (next !== "") {
			// Category exists. More to come.
			category.run.split("").forEach((char: string) => recurseSyllables(allFound, previous + char, next));
		} else {
			// Category exists. Final category.
			category.run.split("").forEach((char: string) => allFound.push(previous + char));
		}
	};
	
	// // //
	// Wordlist
	// // //
	
	const makeWordlist = (capitalize: boolean) => {
		let n = 0;
		let words = [];
		for (n = 0;n < settingsWG.wordsPerWordlist; n++) {
			words.push(makeOneWord(capitalize));
		}
		// Sort if needed
		if(settingsWG.sortWordlist) {
			words.sort(new Intl.Collator("en", { sensitivity: "variant" }).compare);
		}
		return words;
	};
	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					 <IonButtons slot="start">
						 <IonMenuButton />
					 </IonButtons>
					<IonTitle>Output</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen>
				<IonList id="outerOutputPane" lines="none">
					<IonPopover event={popoverState.event} isOpen={popoverState.flag} onDidDismiss={() => dispatch(closePopover())}>
						<IonItemDivider>What to Generate:</IonItemDivider>
						<IonSelect interface="popover" value={settingsWG.output} onIonChange={e => dispatch(setOutputType(e.detail.value! as OutputTypes))}>
							<IonSelectOption value="text">Pseudo-text</IonSelectOption>
							<IonSelectOption value="wordlist">Wordlist</IonSelectOption>
							<IonSelectOption value="syllables">All possible syllables</IonSelectOption>
						</IonSelect>
						<IonItem>
							<IonLabel>Show syllable breaks</IonLabel>
							<IonToggle checked={settingsWG.showSyllableBreaks} onIonChange={e => dispatch(setSyllableBreaks(e.detail.checked))} />
						</IonItem>
						<IonItemDivider>Wordlist and Syllable-List Controls</IonItemDivider>
						<IonItem>
							<IonLabel>Capitalize words</IonLabel>
							<IonToggle checked={settingsWG.capitalizeWords} onIonChange={e => dispatch(setCapitalizeWords(e.detail.checked))} />
						</IonItem>
						<IonItem>
							<IonLabel>Sort output</IonLabel>
							<IonToggle checked={settingsWG.sortWordlist} onIonChange={e => dispatch(setSortWordlist(e.detail.checked))} />
						</IonItem>
						<IonItem>
							<IonLabel>Multi-Column layout</IonLabel>
							<IonToggle checked={settingsWG.wordlistMultiColumn} onIonChange={e => dispatch(setWordlistMulticolumn(e.detail.checked))} />
						</IonItem>
						<IonItem>
							<IonLabel position="stacked">Wordlist size</IonLabel>
							<IonRange min={50} max={1000} value={settingsWG.wordsPerWordlist} pin={true} onIonChange={e => dispatch(setWordsPerWordlist(e.detail.value! as Fifty_OneThousand))}>
								<IonLabel slot="start">50</IonLabel>
								<IonLabel slot="end">1000</IonLabel>
							</IonRange>
						</IonItem>
					</IonPopover>
					<IonItem className="collapse">
						<IonButton expand="block" strong={false} className="ion-margin-start ion-padding-horizontal" color="tertiary" onClick={(e:any) => { e.persist(); dispatch(openPopover(e)); }}><IonIcon slot="icon-only" icon={settingsOutline} /></IonButton>
						<IonButton style={ { fontSize: "larger" } } expand="block" strong={true} color="primary" onClick={() => generateOutput(outputPane)}>
							Generate <IonIcon icon={caretForwardCircleOutline} style={ { marginLeft: "0.25em" } } />
						</IonButton>
					</IonItem>
					<div id="outputPane"></div>
				</IonList>
			</IonContent>
		</IonPage>
	);
};

export default WGOut;
