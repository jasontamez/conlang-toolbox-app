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
	WGTransformObject,
	WGCharGroupObject,
	PageData
} from '../../components/ReduxDucksTypes';
import {
	changeView,
	addDeferredLexiconItems,
	removeDeferredLexiconItem
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
import calculateCharGroupReferenceRegex from '../../components/CharGroupRegex';
import fireSwal from '../../components/Swal';
import { Clipboard } from '@capacitor/clipboard';

const WGOut = (props: PageData) => {
	const { modalPropsMaker } = props;
	const dispatch = useDispatch();
	const [isOpenInfo, setIsOpenInfo] = React.useState<boolean>(false);
	const [isOpenOptions, setIsOpenOptions] = React.useState<boolean>(false);
	const [isPickingSaving, setIsPickingSaving] = React.useState<boolean>(false);
	const [isGenerating, setIsGenerating] = React.useState<boolean>(false);
	const viewInfo = ['wg', 'output'];
	useIonViewDidEnter(() => {
		dispatch(changeView(viewInfo));
	});
	// Pseudo-text needs no special formatting, wrap entirely in a <div>
	// Wordlists require columnWidth equal to the largest word's width (using determineWidth) and each word in a <div>
	const outputPane = $i("outputPane");
	const $d = (text: string = "") => {
		const div = document.createElement("div");
		text && (div.textContent = text);
		return div;
	};
	const $t = (text: string, tag: string = "span") => {
		const t = document.createElement(tag);
		t.classList.add("word");
		t.textContent = text;
		t.addEventListener("click", () => maybeSaveThisWord(t));
		return t;
	};
	const [
		charGroupsObject,
		syllablesObject,
		settingsWG,
		transforms
	] = useSelector((state: any) => [
		state.wordgenCharGroups,
		state.wordgenSyllables,
		state.wordgenSettings,
		state.wordgenTransforms.list
	], shallowEqual);
	const charGroupMap: Map<string, WGCharGroupObject> = new Map(charGroupsObject.map);
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
			const copied: string[] = [];
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

	const textWidthTester = document.createElement("canvas").getContext("2d");
	textWidthTester!.font = "var(--ion-default-font)";
	const determineWidth = (input: string) => {
		return textWidthTester!.measureText(input).width;
	};
	const getWidestWord = (words: string[]) => {
		const max = Math.max(...words.map(w => determineWidth(w))) * 3;
		return Math.ceil(max).toString() + "px";
	};

	const generateOutput = async (output: HTMLElement = outputPane) => {
		const type = settingsWG.output;
		let endEarly = false;
		// Clear any previous output.
		while(output.firstChild !== null) {
			output.removeChild(output.firstChild);
		}
		// Sanity check
		if(charGroupMap.size === 0) {
			output.append($d("You have no character groups defined."));
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
		// Check transforms for %CharGroup references and update them if needed
		transforms.forEach((transform: WGTransformObject) => {
			let regex: RegExp;
			if(transform.seek.indexOf("%") !== -1) {
				// Found a possibility.
				regex = calculateCharGroupReferenceRegex(transform.seek, charGroupMap) as RegExp;
			} else {
				regex = new RegExp(transform.seek, "g");
			}
			regExpMap.set(transform.key, regex);
		});
		// Determine what we're making.
		if(type === "text") {
			// pseudotext
			output.style.columnWidth = "auto";
			return generatePseudoText(output);
		}
		// Every syllable, or a wordlist
		setIsGenerating(true);
		const resolveFunc = (type === "syllables") ? getEverySyllable : makeWordlist;
		const result = await resolveFunc(settingsWG.capitalizeWords);
		output.style.columnWidth = settingsWG.wordlistMultiColumn ? getWidestWord(result) : "auto";
		result.forEach((bit: string) => output.append($t(bit, "div")));
		// columnar stuff takes a bit to process, so delay a bit?
		setIsGenerating(false);
	};


	// // //
	// Generate a psuedo-text
	// // //
	const generatePseudoText = async (where: HTMLElement) => {
		const text: (string | HTMLElement)[][] = [];
		const final: HTMLElement = $d();
		const {
			sentencesPerText,
			capitalizeSentences,
			declarativeSentencePre,
			declarativeSentencePost,
			interrogativeSentencePre,
			interrogativeSentencePost,
			exclamatorySentencePre,
			exclamatorySentencePost
		} = settingsWG;
		let sentenceNumber = 0;
		while(sentenceNumber < sentencesPerText) {
			sentenceNumber++;
			const sentence: (string | HTMLElement)[] = [];
			const staging: (string | HTMLElement)[] = [];
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
				sentence.push($t(makeOneWord(wordNumber < 2 && capitalizeSentences)));
			}
			let full = text.join(" ");
			staging.push(sentence.shift()!);
			while (sentence.length > 1) {
				staging.push(" ", sentence.shift()!);
			}
			const type = Math.random() * 12;
			if(type < 9) {
				// Declarative three-fourths the time
				full = declarativeSentencePre + full + declarativeSentencePost;
				declarativeSentencePre && staging.unshift(declarativeSentencePre);
				declarativeSentencePost && staging.push(declarativeSentencePost);
			} else if (type < 11) {
				// Interrogative one-sixth the time
				full = interrogativeSentencePre + full + interrogativeSentencePost;
				interrogativeSentencePre && staging.unshift(interrogativeSentencePre);
				interrogativeSentencePost && staging.push(interrogativeSentencePost);
			} else {
				// Exclamatory one-twelfth the time
				full = exclamatorySentencePre + full + exclamatorySentencePost;
				exclamatorySentencePre && staging.unshift(exclamatorySentencePre);
				exclamatorySentencePost && staging.push(exclamatorySentencePost);
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
		const max = syllList.length;
		if(rate === 0) {
			return translateSyllable(syllList[Math.floor(Math.random() * max)]);
		}
		rate = rate + 5;
		for(let toPick = 0; true; toPick = (toPick + 1) % max) {
			// The 'true' in there means this loop never ends on its own.
			if ((Math.random() * 100) < rate) {
				chosen = syllList[toPick];
				break;
			}
		}
		return translateSyllable(chosen);
	};
	const translateSyllable = (syll: string) => {
		const chars: string[] = syll.split("");
		let output: string = "";
		const rate = settingsWG.charGroupRunDropoff;
		while(chars.length > 0) {
			const current = chars.shift();
			const charGroup = charGroupMap.get(current!);
			if(charGroup === undefined) {
				output += current;
			} else {
				const thisRate = (charGroup.dropoffOverride === undefined ? rate : charGroup.dropoffOverride) + 5;
				const choices = charGroup.run;
				const max = choices.length;
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
		const word: string[] = [];
		let output: string;
		// Determine number of syllables
		if((Math.random() * 100) >= settingsWG.monosyllablesRate) {
			// More than 1. Add syllables, favoring a lower number of syllables.
			const max = settingsWG.maxSyllablesPerWord - 2;
			numberOfSyllables = 2;
			for(let toAdd = 0; true; toAdd = (toAdd + 1) % max) {
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
		// Apply transformss
		output = doTransform(output);
		// Capitalize if needed
		if(capitalize) {
			output = output.charAt(0).toUpperCase() + output.slice(1);
		}
		return output;
	};


	// // //
	// Apply Transforms
	// // //
	const doTransform = (word: string) => {
		transforms.forEach((transform: WGTransformObject) => {
			word = word.replace(regExpMap.get(transform.key)!, transform.replace);
		});
		return word;
	};

	// // //
	// Generate Every Possible Syllable
	// // //
	const getEverySyllable = async (capitalize: boolean = false) => {
		const output: string[] = [];
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
			const [current, toGo] = syllables.shift();
			const res = recurseSyllables(current, toGo);
			const newOutput: string[] = [];
			res.then((res: any) => {
				const { next } = res;
				if(next === "") {
					// This one is done - run through transforms
					newOutput.push(...res.results.map((word: string) => doTransform(word)));
				} else {
					// Add to syllables
					syllables.push(...res.results.map((word: string) => [word, next]));
				}
			});
			await res;
			output.push(...newOutput);
		}
		// Capitalize if needed
		if(capitalize) {
			const length = output.length;
			for(let x = 0; x < length; x++) {
				const word = output.shift()!;
				output.push(word.charAt(0).toUpperCase() + word.slice(1));
			}
		}
		// Remove duplicates
		const final = Array.from(new Set(output));
		// Sort if needed
		if(settingsWG.sortWordlist) {
			final.sort(new Intl.Collator("en", { sensitivity: "variant" }).compare);
		}
		return final;
	};
	const recurseSyllables = async (previous: string, toGo: string) => {
		const current = toGo.charAt(0);
		const next = toGo.slice(1);
		const charGroup = charGroupMap.get(current);
		if(charGroup === undefined) {
			// CharGroup not found - save as written
			return {
				results: [previous + current],
				next
			};
		}
		return {
			results: charGroup.run.split("").map(char => previous + char),
			next
		}
	};

	// // //
	// Wordlist
	// // //
	const makeWordlist = async (capitalize: boolean) => {
		const words = [];
		for (let n = 0; n < settingsWG.wordsPerWordlist; n++) {
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
		setIsPickingSaving(true);
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
		setIsPickingSaving(false);
	};
	const maybeSaveThisWord = (el: HTMLElement) => {
		if(outputPane.classList.contains("pickAndSave")) {
			const text = el.textContent;
			if(text) {
				const CL = el.classList;
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
			<OutputOptionsModal {...props.modalPropsMaker(isOpenOptions, setIsOpenOptions)} />
			<ModalWrap {...modalPropsMaker(isOpenInfo, setIsOpenInfo)}><OutCard /></ModalWrap>
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
						isGenerating ? (
							<span style={ {fontStyle: "italic"} }>Loading...</span>
						) : "Generate"
					}<IonIcon icon={caretForwardCircleOutline} style={ { marginLeft: "0.25em" } } /></IonButton>
					<div className="BR">
						<IonButton
							expand="block"
							strong={false}
							color="secondary"
							onClick={() => setIsOpenOptions(true)}
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
							className={isPickingSaving ? "hide" : ""}
							color="secondary"
							onClick={() => pickAndSave()}
						><IonIcon slot="icon-only" icon={bookOutline} /></IonButton>
						<IonButton
							className={isPickingSaving ? "" : "hide"}
							id="doneSavingButton"
							expand="block"
							strong={true}
							color="success"
							onClick={() => donePickingAndSaving()}
						><IonIcon slot="icon-only" icon={saveOutline} /></IonButton>
					</div>
					<div id="outputPane" className={"largePane selectable" + (isPickingSaving ? " pickAndSave" : "")}></div>
				</div>
			</IonContent>
		</IonPage>
	);
};

export default WGOut;
