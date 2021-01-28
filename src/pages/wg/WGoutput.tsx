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
	IonButton
} from '@ionic/react';
import { $i } from '../../components/DollarSignExports';
import { shallowEqual, useSelector } from "react-redux";
import { WGRewriteRuleObject } from '../../components/ReduxDucks';
import '../WordGen.css';

const WGOut = () => {
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
	const settings = stateObject.wordgenSettings;
	
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
		let type = settings.output;
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
			// all possible syllables, eliminating dupes
			let noDupes = new Set(getEverySyllable(settings.capitalizeWords));
			text = [];
			noDupes.forEach(t => text.push(t));
			// reset columns if needed
			output.style.columnWidth = settings.wordlistMultiColumn ? getWidestWord(text) : "auto";
		} else {
			// wordlist
			text = makeWordlist();
			// reset columns if needed
			output.style.columnWidth = settings.wordlistMultiColumn ? getWidestWord(text) : "auto";
		}
		// Add to screen.
		text.forEach(bit => output.append($d(bit)));
	};
	
	
	// // //
	// Generate a psuedo-text
	// // //
	const generatePseudoText = () => {
		let text = [];
		let numberOfSentences = settings.sentencesPerText;
		let capitalize = settings.capitalizeSentences;
		let d1 = settings.declarativeSentencePre;
		let d2 = settings.declarativeSentencePost;
		let i1 = settings.interrogativeSentencePre;
		let i2 = settings.interrogativeSentencePost;
		let e1 = settings.exclamatorySentencePre;
		let e2 = settings.exclamatorySentencePost;
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
		return makeSyllable(allSyllables.singleWord.components, settings.syllableBoxDropoff);
	};
	const makeFirstSyllable = () => {
		return makeSyllable(allSyllables[syllToggle ? "wordInitial" : "singleWord"].components, settings.syllableBoxDropoff);
	};
	const makeMidSyllable = () => {
		return makeSyllable(allSyllables[syllToggle ? "wordMiddle" : "singleWord"].components, settings.syllableBoxDropoff);
	};
	const makeLastSyllable = () => {
		return makeSyllable(allSyllables[syllToggle ? "wordFinal" : "singleWord"].components, settings.syllableBoxDropoff);
	};
	const makeSyllable = (syllList: string[], rate: number) => {
		let max = syllList.length - 1;
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
		let rate = settings.categoryRunDropoff;
		while(chars.length > 0) {
			let current = chars.shift();
			let category = catMap.get(current);
			if(category === undefined) {
				output += current;
			} else {
				let toPick = 0;
				let choices = category.run;
				let max = choices.length - 1;
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
		if(Math.floor(Math.random() * 100) > settings.monosyllablesRate) {
			// More than 1. Add syllables, favoring a lower number of syllables.
			let max = settings.maxSyllablesPerWord - 2;
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
		if(settings.showSyllableBreaks) {
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
			return output.map(word => (word.charAt(0).toUpperCase() + word.slice(1)));
		}
		// Sort if needed
		if(settings.sortWordlist) {
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
	
	const makeWordlist = () => {
		let capitalize = settings.capitalizeWords;
		let n = 0;
		let words = [];
		for (n = 0;n < settings.wordsPerWordlist; n++) {
			words.push(makeOneWord(capitalize));
		}
		// Sort if needed
		if(settings.sortWordlist) {
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
				<IonList id="outerOutputPane">
					<IonButton className="collapse ion-margin-horizontal" expand="block" color="primary" strong={true} onClick={() => generateOutput(outputPane)}>Generate</IonButton>
					<div id="outputPane"></div>
				</IonList>
			</IonContent>
		</IonPage>
	);
};

export default WGOut;
