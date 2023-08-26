import React from 'react';
import {
	IonContent,
	IonPage,
	IonHeader,
	IonToolbar,
	IonMenuButton,
	IonButtons,
	IonTitle,
	IonButton,
	IonIcon,
	useIonViewDidEnter
} from '@ionic/react';
import { $i } from '../../components/DollarSignExports';
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import {
	WGRewriteRuleObject,
	WGCategoryObject,
	PageData
} from '../../components/ReduxDucksTypes';
import {
	openModal,
	changeView,
	closeModal,
	addDeferredLexiconItems,
	removeDeferredLexiconItem,
	setLoadingPage
} from '../../components/ReduxDucksFuncs';
import {
	caretForwardCircleOutline,
	settingsOutline,
	bookOutline,
	saveOutline,
	helpCircleOutline,
	copyOutline
} from 'ionicons/icons';
import OutputOptionsModal from './M-OutputOptions';
import { OutCard } from "./WGCards";
import ModalWrap from "../../components/ModalWrap";
import { $a } from '../../components/DollarSignExports';
import calculateCategoryReferenceRegex from '../../components/CategoryRegex';
import fireSwal from '../../components/Swal';
import { Clipboard } from '@capacitor/clipboard';

const WGOut = (props: PageData) => {
	const { modalPropsMaker } = props;
	const dispatch = useDispatch();
	const [isOpenInfo, setIsOpenInfo] = React.useState<boolean>(false);
	const viewInfo = ['wg', 'output'];
	useIonViewDidEnter(() => {
		dispatch(changeView(viewInfo));
	});
	// Pseudo-text needs no special formatting, wrap entirely in a <div>
	// Wordlists require columnWidth equal to the largest word's width (using determineWidth) and each word in a <div>
	const outputPane = $i("outputPane");
	const $d = (text: string = "") => {
		let div = document.createElement("div");
		text && (div.textContent = text);
		return div;
	};
	const $t = (text: string, tag: string = "span") => {
		let t = document.createElement(tag);
		t.classList.add("word");
		t.textContent = text;
		t.addEventListener("click", () => maybeSaveThisWord(t));
		return t;
	};
	const [
		categoriesObject,
		syllablesObject,
		settingsWG,
		modalState,
		rewriteRules
	] = useSelector((state: any) => [
		state.wordgenCategories,
		state.wordgenSyllables,
		state.wordgenSettings,
		state.modalState,
		state.wordgenRewriteRules.list
	], shallowEqual);
	const catMap: Map<string, WGCategoryObject> = new Map(categoriesObject.map);
	const syllToggle = syllablesObject.toggle;
	const allSyllables = syllablesObject.objects;
	const regExpMap: Map<string, RegExp> = new Map();

	const copyText = async () => {
		let copyText = "";
		if(settingsWG.output === "text") {
			// Pseudo-text is easy to copy
			copyText = (outputPane.textContent);
		} else {
			// Others need to be joined by linebreaks
			let copied: string[] = [];
			$a(".word", outputPane).forEach((word: HTMLElement) => word.textContent && copied.push(word.textContent));
			copyText = (copied.join("\n"));
		}
		if(copyText && !copyText.match(/^You (have no|are missing)/g)) {
			await Clipboard.write({string: copyText});
			//navigator.clipboard.writeText(copyText);
			return fireSwal({
				title: "Copied to clipboard.",
				toast: true,
				timer: 1500,
				position: 'top',
				timerProgressBar: true,
				showConfirmButton: false
			});	
		}
		fireSwal({
			title: "Nothing to copy.",
			toast: true,
			customClass: {popup: 'dangerToast'},
			timer: 1500,
			position: 'top',
			timerProgressBar: true,
			showConfirmButton: false
		});
	};

	let textWidthTester = document.createElement("canvas").getContext("2d");
	textWidthTester!.font = "var(--ion-default-font)";
	const determineWidth = (input: string) => {
		return textWidthTester!.measureText(input).width;
	};
	const getWidestWord = (words: string[]) => {
		let max = Math.max(...words.map(w => determineWidth(w))) * 3;
		return Math.ceil(max).toString() + "px";
	};

	const generateOutput = async (output: HTMLElement = outputPane) => {
		let type = settingsWG.output;
		let endEarly = false;
		// Clear any previous output.
		while(output.firstChild !== null) {
			output.removeChild(output.firstChild);
		}
		// Sanity check
		if(catMap.size === 0) {
			output.append($d("You have no categories defined."));
			endEarly = true;
		}
		if (!syllToggle && allSyllables.singleWord.components.length === 0) {
			output.append($d("You have no syllables defined."));
			endEarly = true;
		}
		if (syllToggle && 
			(
				(settingsWG.monosyllablesRate > 0 && allSyllables.singleWord.components.length === 0)
				|| allSyllables.wordInitial.components.length === 0
				|| allSyllables.wordMiddle.components.length === 0
				|| allSyllables.wordFinal.components.length === 0
			)
		) {
			output.append($d("You are missing one or more types of syllables."));
			endEarly = true;
		}
		if(endEarly) {
			return;
		}
		// Check rewrite rules for %Category references and update them if needed
		rewriteRules.forEach((rule: WGRewriteRuleObject) => {
			let regex: RegExp;
			if(rule.seek.indexOf("%") !== -1) {
				// Found a possibility.
				regex = calculateCategoryReferenceRegex(rule.seek, catMap) as RegExp;
			} else {
				regex = new RegExp(rule.seek, "g");
			}
			regExpMap.set(rule.key, regex);
		});
		// Determine what we're making.
		if(type === "text") {
			// pseudotext
			output.style.columnWidth = "auto";
			return generatePseudoText(output);
		}
		// Every syllable, or a wordlist
		dispatch(setLoadingPage("generatingWords"));
		const resolveFunc = (type === "syllables") ? getEverySyllable : makeWordlist;
		let result = await resolveFunc(settingsWG.capitalizeWords);
		output.style.columnWidth = settingsWG.wordlistMultiColumn ? getWidestWord(result) : "auto";
		result.forEach((bit: string) => output.append($t(bit, "div")));
		// columnar stuff takes a bit to process, so delay a bit
		dispatch(setLoadingPage(false));
	};


	// // //
	// Generate a psuedo-text
	// // //
	const generatePseudoText = async (where: HTMLElement) => {
		let text: (string | HTMLElement)[][] = [];
		let final: HTMLElement = $d();
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
			sentenceNumber++;
			let sentence: (string | HTMLElement)[] = [];
			let staging: (string | HTMLElement)[] = [];
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
				sentence.push($t(makeOneWord(wordNumber < 2 && capitalize)));
			}
			let full = text.join(" ");
			staging.push(sentence.shift()!);
			while (sentence.length > 1) {
				staging.push(" ", sentence.shift()!);
			}
			let type = Math.random() * 12;
			if(type < 9) {
				// Declarative three-fourths the time
				full = d1 + full + d2;
				d1 && staging.unshift(d1);
				d2 && staging.push(d2);
			} else if (type < 11) {
				// Interrogative one-sixth the time
				full = i1 + full + i2;
				i1 && staging.unshift(i1);
				i2 && staging.push(i2);
			} else {
				// Exclamatory one-twelfth the time
				full = e1 + full + e2;
				e1 && staging.unshift(e1);
				e2 && staging.push(e2);
			}
			text.push(staging);
		}
		text.length > 0 && final.append(...text.shift()!);
		while(text.length > 0) {
			final.append(" ", ...text.shift()!)
		}
		where.append(final);
	};

	// // //
	// Generate Syllables
	// // //
	const makeMonosyllable = () => {
		return makeSyllable(allSyllables.singleWord.components, allSyllables.singleWord.dropoffOveride || settingsWG.syllableBoxDropoff);
	};
	const makeFirstSyllable = () => {
		const o = allSyllables[syllToggle ? "wordInitial" : "singleWord"];
		return makeSyllable(o.components, o.dropoffOveride || settingsWG.syllableBoxDropoff);
	};
	const makeMidSyllable = () => {
		const o = allSyllables[syllToggle ? "wordMiddle" : "singleWord"];
		return makeSyllable(o.components, o.dropoffOveride || settingsWG.syllableBoxDropoff);
	};
	const makeLastSyllable = () => {
		const o = allSyllables[syllToggle ? "wordFinal" : "singleWord"];
		return makeSyllable(o.components, o.dropoffOveride || settingsWG.syllableBoxDropoff);
	};
	const makeSyllable = (syllList: string[], rate: number) => {
		let chosen;
		let max = syllList.length;
		if(rate === 0) {
			return translateSyllable(syllList[Math.floor(Math.random() * max)]);
		}
		rate = rate + 5;
		let toPick = 0;
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
		let chars: string[] = syll.split("");
		let output: string = "";
		let rate = settingsWG.categoryRunDropoff;
		while(chars.length > 0) {
			let current = chars.shift();
			let category = catMap.get(current!);
			if(category === undefined) {
				output += current;
			} else {
				let thisRate = (category.dropoffOverride === undefined ? rate : category.dropoffOverride) + 5;
				let choices = category.run;
				let max = choices.length;
				if(thisRate === 0) {
					output += choices[Math.floor(Math.random() * max)];
				} else {
					let toPick = 0;
					for(toPick = 0; true; toPick = (toPick + 1) % max) {
						// The 'true' in there means this loop never ends on its own.
						if ((Math.random() * 100) < thisRate) {
							output += choices[toPick];
							break;
						}
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
		if((Math.random() * 100) >= settingsWG.monosyllablesRate) {
			// More than 1. Add syllables, favoring a lower number of syllables.
			let max = settingsWG.maxSyllablesPerWord - 2;
			let toAdd = 0;
			numberOfSyllables = 2;
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
			word = word.replace(regExpMap.get(rule.key)!, rule.replace);
		});
		return word;
	};

	// // //
	// Generate Every Possible Syllable
	// // //
	const getEverySyllable = async (capitalize: boolean = false) => {
		let output: string[] = [];
		let syllables = allSyllables.singleWord.components
		if(syllToggle) {
			syllables = syllables.concat(
				allSyllables.wordInitial.components,
				allSyllables.wordMiddle.components,
				allSyllables.wordFinal.components
			);
		}
		syllables = syllables.map((syll: string) => ["", syll]);
		while(syllables.length > 0) {
			let [current, toGo] = syllables.shift();
			let res = recurseSyllables(current, toGo);
			let newOutput: string[] = [];
			res.then((res: any) => {
				if(res.next === "") {
					// This one is done - run through rewrite rules
					newOutput.push(...res.results.map((word: string) => doRewrite(word)));
				} else {
					// Add to syllables
					let next = res.next;
					syllables.push(...res.results.map((word: string) => [word, next]));
				}
			});
			await res;
			output.push(...newOutput);
		}
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
	const recurseSyllables = async (previous: string, toGo: string) => {
		let current = toGo.charAt(0);
		let next = toGo.slice(1);
		let category = catMap.get(current);
		if(category === undefined) {
			// Category not found - save as written
			return {
				results: [previous + current],
				next: next
			};
		}
		return {
			results: category.run.split("").map(char => previous + char),
			next: next
		}
	};

	// // //
	// Wordlist
	// // //
	const makeWordlist = async (capitalize: boolean) => {
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

	// // //
	// Save to Lexicon
	// // //
	const pickAndSave = () => {
		dispatch(openModal("PickAndSaveWG"));
		return fireSwal({
			title: "Tap words you want to save to Lexicon",
			toast: true,
			timer: 2500,
			position: 'top',
			timerProgressBar: true,
			showConfirmButton: false
		});	
	};
	const donePickingAndSaving = () => {
		dispatch(closeModal("PickAndSaveWG"));
	};
	const maybeSaveThisWord = (el: HTMLElement) => {
		if(outputPane.classList.contains("pickAndSave")) {
			let text = el.textContent;
			if(text) {
				let CL = el.classList;
				if(CL.contains("saved")) {
					CL.remove("saved");
					dispatch(removeDeferredLexiconItem(text))
				} else {
					CL.add("saved");
					dispatch(addDeferredLexiconItems([text]));
				}
			}
		}
	};
	return (
		<IonPage>
			<OutputOptionsModal />
			<ModalWrap {...modalPropsMaker(isOpenInfo, setIsOpenInfo)} content={OutCard} />
			<IonHeader>
				<IonToolbar>
					 <IonButtons slot="start">
						 <IonMenuButton />
					 </IonButtons>
					<IonTitle>Output</IonTitle>
					<IonButtons slot="end">
						<IonButton onClick={() => setIsOpenInfo(true)}>
							<IonIcon icon={helpCircleOutline} />
						</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen>
				<div id="WGoutput">
					<IonButton
						expand="block"
						strong={true}
						className="EV"
						color="success"
						style={ { fontSize: "1.35rem", padding: "0.5rem 0", minHeight: "3.25rem" } }
						onClick={() => {new Promise(() => generateOutput())}}
					>{
						modalState.loadingPage === "generatingWords" ? (
							<span style={ {fontStyle: "italic"} }>Loading...</span>
						) : "Generate"
					}<IonIcon icon={caretForwardCircleOutline} style={ { marginLeft: "0.25em" } } /></IonButton>
					<div className="BR">
						<IonButton
							expand="block"
							strong={false}
							color="secondary"
							onClick={() => dispatch(openModal("WGOutputOptions"))}
						><IonIcon slot="icon-only" icon={settingsOutline} /></IonButton>
						<IonButton
							expand="block"
							strong={false}
							color="secondary"
							onClick={() => copyText()}
						><IonIcon slot="icon-only" icon={copyOutline} /></IonButton>
						<IonButton
							expand="block"
							strong={true}
							className={modalState.PickAndSaveWG ? "hide" : ""}
							color="secondary"
							onClick={() => pickAndSave()}
						><IonIcon slot="icon-only" icon={bookOutline} /></IonButton>
						<IonButton
							className={modalState.PickAndSaveWG ? "" : "hide"}
							id="doneSavingButton"
							expand="block"
							strong={true}
							color="success"
							onClick={() => donePickingAndSaving()}
						><IonIcon slot="icon-only" icon={saveOutline} /></IonButton>
					</div>
					<div id="outputPane" className={"largePane selectable" + (modalState.PickAndSaveWG ? " pickAndSave" : "")}></div>
				</div>
			</IonContent>
		</IonPage>
	);
};

export default WGOut;
