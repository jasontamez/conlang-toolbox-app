import React, { useCallback, useMemo, useState } from 'react';
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
	useIonViewDidEnter,
	useIonAlert,
	useIonToast,
	useIonRouter
} from '@ionic/react';
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import {
	caretForwardCircleOutline,
	settingsOutline,
	saveOutline,
	helpCircleOutline,
	copyOutline
} from 'ionicons/icons';
import { Clipboard } from '@capacitor/clipboard';

import {
	WGTransformObject,
	WGCharGroupObject,
	PageData,
	LexiconColumn
} from '../../components/ReduxDucksTypes';
import {
	addItemstoLexiconColumn,
	changeView
} from '../../components/ReduxDucksFuncs';
import { $a, $i } from '../../components/DollarSignExports';
import ModalWrap from "../../components/ModalWrap";
import calculateCharGroupReferenceRegex from '../../components/CharGroupRegex';
import toaster from '../../components/toaster';
import { LexiconOutlineIcon } from '../../components/icons';
import OutputOptionsModal from './M-OutputOptions';
import { OutCard } from "./WGCards";
import makeSorter from '../../components/stringSorter';

async function copyText (copyString: string, doToast: Function, undoToast: Function) {
	if(copyString) {
		await Clipboard.write({string: copyString});
		//navigator.clipboard.writeText(copyText);
		return toaster({
			message: "Copied to clipboard.",
			duration: 1500,
			position: "top",
			doToast,
			undoToast
		});
	}
	toaster({
		message: "Nothing to copy.",
		color: "danger",
		duration: 1500,
		position: "top",
		doToast,
		undoToast
	});
};

const WGOut = (props: PageData) => {
	const { modalPropsMaker } = props;
	const dispatch = useDispatch();
	const [isOpenInfo, setIsOpenInfo] = useState<boolean>(false);
	const [isOpenOptions, setIsOpenOptions] = useState<boolean>(false);
	const [isPickingSaving, setIsPickingSaving] = useState<boolean>(false);
	const [isGenerating, setIsGenerating] = useState<boolean>(false);

	const [copyString, setCopyString] = useState<string>("");
	const [errorString, setErrorString] = useState<string>("");
	const [displayString, setDisplayString] = useState<string>("");
	const [displayHTML, setDisplayHTML] = useState<string[][]>([]);
	const [displayList, setDisplayList] = useState<string[]>([]);
	const [colsNum, setColsNum] = useState<string>("auto");

	const [savedWords, setSavedWords] = useState<string[]>([]);
	const [savedWordsObject, setSavedWordsObject] = useState<{ [key: string]: boolean }>({});
	const viewInfo = ['wg', 'output'];
	useIonViewDidEnter(() => {
		dispatch(changeView(viewInfo));
	});

	const [doAlert] = useIonAlert();
	const [doToast, undoToast] = useIonToast();
	const navigator = useIonRouter();

	// Pseudo-text needs no special formatting, wrap entirely in a <div>
	// Wordlists require columnWidth equal to the largest word's width (using determineWidth) and each word in a <div>
	const [
		charGroupsObject,
		syllablesObject,
		settingsWG,
		transforms,
		lexColumns,
		appSettings
	] = useSelector((state: any) => [
		state.wordgenCharGroups,
		state.wordgenSyllables,
		state.wordgenSettings,
		state.wordgenTransforms.list,
		state.lexicon.columns,
		state.appSettings
	], shallowEqual);
	const {sortLanguage, sensitivity} = appSettings;
	const syllToggle = syllablesObject.toggle;
	const allSyllables = syllablesObject.objects;
	const {
		monosyllablesRate,
		maxSyllablesPerWord,
		charGroupRunDropoff,
		syllableBoxDropoff,
		output,
		showSyllableBreaks,
		sentencesPerText,
		capitalizeSentences,
		declarativeSentencePre,
		declarativeSentencePost,
		interrogativeSentencePre,
		interrogativeSentencePost,
		exclamatorySentencePre,
		exclamatorySentencePost,
		capitalizeWords,
		sortWordlist,
		wordlistMultiColumn,
		wordsPerWordlist
	} = settingsWG;

	// // //
	// Memoized stuff
	// // //

	const stringSorter = useCallback(
		(a: string, b: string) => makeSorter(sortLanguage, sensitivity)(a, b),
	[sortLanguage, sensitivity]);

	const maybeSaveThisWord = useCallback((text: string, id: string = "") => {
		if(isPickingSaving) {
			if(text) {
				const newObj = {...savedWordsObject};
				if(savedWordsObject[text]) {
					setSavedWords(savedWords.filter(word => word !== text));
					delete newObj[text];
					id && $i(id).classList.remove("saved");
				} else {
					setSavedWords([...savedWords, text]);
					newObj[text] = true;
					id && $i(id).classList.add("saved");
				}
				setSavedWordsObject(newObj);
			}
		}
	}, [savedWords, savedWordsObject, isPickingSaving]);
	const charGroupMap = useMemo(() => {
		const obj: {[key: string]: WGCharGroupObject} = {};
		charGroupsObject.map.forEach((o: [string, WGCharGroupObject]) => {
			obj[o[0]] = o[1];
		});
		return obj;
	}, [charGroupsObject.map]);
	const regExpMap = useMemo(() => {
		// Check transforms for %CharGroup references and update them if needed
		const newObj: { [key:string]: RegExp } = {};
		transforms.forEach((transform: WGTransformObject) => {
			const { seek, key } = transform;
			let regex: RegExp;
			if(transform.seek.indexOf("%") !== -1) {
				// Found a possibility.
				regex = calculateCharGroupReferenceRegex(seek, charGroupMap) as RegExp;
			} else {
				regex = new RegExp(seek, "g");
			}
			newObj[key] = regex;
		});
		return newObj;
	}, [transforms, charGroupMap]);


	const textWidthTester = document.createElement("canvas").getContext("2d");
	textWidthTester!.font = "var(--ion-default-font)";
	const determineWidth = (input: string) => {
		return textWidthTester!.measureText(input).width;
	};
	const getWidestWord = (words: string[]) => {
		const max = Math.max(...words.map(w => determineWidth(w))) * 2;
		return Math.ceil(max).toString() + "px";
	};

	const generateOutput = async () => {
		const errors: string[] = [];
		// Clear any previous output.
		setDisplayList([]);
		setDisplayString("");
		setCopyString("");
		setDisplayHTML([]);
		setColsNum("auto");
		setErrorString("");
		// Sanity check
		if(charGroupsObject.map.length === 0) {
			errors.push("You have no character groups defined.");
		}
		if (!syllToggle && allSyllables.singleWord.components.length === 0) {
			errors.push("You have no syllables defined.");
		}
		if (syllToggle && 
			(
				(monosyllablesRate > 0 && allSyllables.singleWord.components.length === 0)
				|| allSyllables.wordInitial.components.length === 0
				|| allSyllables.wordMiddle.components.length === 0
				|| allSyllables.wordFinal.components.length === 0
			)
		) {
			errors.push("You are missing one or more types of syllables.");
		}
		if(errors.length > 0) {
			setErrorString(errors.join(" "));
			return;
		}
		// Determine what we're making.
		if(output === "text") {
			// pseudotext
			return generatePseudoText();
		}
		// Every syllable, or a wordlist
		setIsGenerating(true);
		const resolveFunc = (output === "syllables") ? getEverySyllable : makeWordlist;
		const result = await resolveFunc();
		setColsNum(getWidestWord(result));
		setCopyString(result.join("\n"));
		setDisplayList(result);
		// columnar stuff takes a bit to process, so delay a bit?
		setIsGenerating(false);
	};


	// // //
	// Generate a psuedo-text
	// // //
	const generatePseudoText = async () => {
		const textInfo: string[][] = [];
		const text: string[] = [];
		for(let sentenceNumber = 0; sentenceNumber < sentencesPerText; sentenceNumber++) {
			const words: (string[])[] = [];
			const sentence: string[] = [];
			let maxWords = 3;
			for(maxWords = 3; true; maxWords = Math.max((maxWords + 1) % 15, 3)) {
				// The 'true' in there means this loop never ends on its own.
				if ((Math.random() * 100) < (maxWords < 5 ? 35 : (maxWords < 9 ? 50 : 25))) {
					break;
				}
			}
			for(let wordNumber = 0; wordNumber < maxWords; wordNumber++) {
				const word = makeOneWord(!wordNumber && capitalizeSentences);
				words.push([word]);
				sentence.push(word);
			}
			let full = sentence.join(" ");
			const length = words.length - 1;
			const type = Math.random() * 12;
			if(type < 9) {
				// Declarative three-fourths the time
				full = declarativeSentencePre + full + declarativeSentencePost;
				declarativeSentencePre && words[0].unshift(declarativeSentencePre);
				declarativeSentencePost && words[length].push(declarativeSentencePost);
			} else if (type < 11) {
				// Interrogative one-sixth the time
				full = interrogativeSentencePre + full + interrogativeSentencePost;
				interrogativeSentencePre && words[0].unshift(interrogativeSentencePre);
				interrogativeSentencePost && words[length].push(interrogativeSentencePost);
			} else {
				// Exclamatory one-twelfth the time
				full = exclamatorySentencePre + full + exclamatorySentencePost;
				exclamatorySentencePre && words[0].unshift(exclamatorySentencePre);
				exclamatorySentencePost && words[length].push(exclamatorySentencePost);
			}
			text.push(full);
			textInfo.push(...words.map((word: string[], i: number) => {
				return [sentence[i], word.join('')];
			}));
		}
		const textString = text.join(" ");
		setDisplayString(textString);
		setCopyString(textString);
		setDisplayHTML(textInfo);
	};

	// // //
	// Generate Syllables
	// // //
	const makeMonosyllable = () => {
		return makeSyllable(allSyllables.singleWord.components, allSyllables.singleWord.dropoffOveride || syllableBoxDropoff);
	};
	const makeFirstSyllable = () => {
		const o = allSyllables[syllToggle ? "wordInitial" : "singleWord"];
		return makeSyllable(o.components, o.dropoffOveride || syllableBoxDropoff);
	};
	const makeMidSyllable = () => {
		const o = allSyllables[syllToggle ? "wordMiddle" : "singleWord"];
		return makeSyllable(o.components, o.dropoffOveride || syllableBoxDropoff);
	};
	const makeLastSyllable = () => {
		const o = allSyllables[syllToggle ? "wordFinal" : "singleWord"];
		return makeSyllable(o.components, o.dropoffOveride || syllableBoxDropoff);
	};
	const makeSyllable = (syllList: string[], rate: number) => {
		let chosen;
		const max = syllList.length;
		if(rate === 0) {
			return translateSyllable(syllList[Math.floor(Math.random() * max)]);
		}
		const increasedRate = rate + 5;
		for(let toPick = 0; true; toPick = (toPick + 1) % max) {
			// The 'true' in there means this loop never ends on its own.
			if ((Math.random() * 100) < increasedRate) {
				chosen = syllList[toPick];
				break;
			}
		}
		return translateSyllable(chosen);
	};
	const translateSyllable = (syll: string) => {
		const chars: string[] = syll.split("");
		let result: string = "";
		const rate = charGroupRunDropoff;
		while(chars.length > 0) {
			const current = chars.shift();
			const charGroup = charGroupMap[current!];
			if(charGroup === undefined) {
				result += current;
			} else {
				const {
					dropoffOverride,
					run
				} = charGroup;
				const thisRate = (dropoffOverride === undefined ? rate : dropoffOverride) + 5;
				const max = run.length;
				if(thisRate === 0) {
					result += run[Math.floor(Math.random() * max)];
				} else {
					for(let toPick = 0; true; toPick = (toPick + 1) % max) {
						// The 'true' in there means this loop never ends on its own.
						if ((Math.random() * 100) < thisRate) {
							result += run[toPick];
							break;
						}
					}
				}
			}
		}
		return result;
	};

	// // //
	// Generate One Word
	// // //
	const makeOneWord = (capitalize: boolean) => {
		let numberOfSyllables = 1;
		const word: string[] = [];
		let result: string;
		// Determine number of syllables
		if((Math.random() * 100) >= monosyllablesRate) {
			// More than 1. Add syllables, favoring a lower number of syllables.
			const max = maxSyllablesPerWord - 2;
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
		if(showSyllableBreaks) {
			result = word.join("\u00b7");
		} else {
			result = word.join("");
		}
		// Apply transformss
		result = doTransform(result);
		// Capitalize if needed
		if(capitalize) {
			result = result.charAt(0).toUpperCase() + result.slice(1);
		}
		return result;
	};


	// // //
	// Apply Transforms
	// // //
	const doTransform = (word: string) => {
		transforms.forEach((transform: WGTransformObject) => {
			word = word.replace(regExpMap[transform.key]!, transform.replace);
		});
		return word;
	};

	// // //
	// Generate Every Possible Syllable
	// // //
	const getEverySyllable = async () => {
		const result: string[] = [];
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
			result.push(...newOutput);
		}
		// Capitalize if needed
		if(capitalizeWords) {
			const length = result.length;
			for(let x = 0; x < length; x++) {
				const word = result.shift()!;
				result.push(word.charAt(0).toUpperCase() + word.slice(1));
			}
		}
		// Sort if needed
		if(sortWordlist) {
			result.sort(stringSorter);
		}
		// Remove duplicates
		let previous: string | undefined = undefined;
		return result.filter((word: string) => {
			if(word === previous) {
				return false;
			}
			previous = word;
			return true;
		});
	};
	const recurseSyllables = async (previous: string, toGo: string) => {
		const current = toGo.charAt(0);
		const next = toGo.slice(1);
		const charGroup = charGroupMap[current];
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
	const makeWordlist = async () => {
		const tester: {[key: string]: boolean} = {};
		const words: string[] = [];
		let counter = wordsPerWordlist * 100;
		for (
			let n = 0;
			n < wordsPerWordlist && counter > 0;
			n = words.length
		) {
			const potential = makeOneWord(capitalizeWords);
			if(tester[potential]) {
				counter--;
			} else {
				words.push(potential);
				tester[potential] = true;
			}
		}
		if(counter <= 0) {
			setErrorString(`Unable to create ${wordsPerWordlist} unique words (maxed out at ${words.length})`);
			return [];
		}
		// Sort if needed
		if(sortWordlist) {
			words.sort(stringSorter);
		}
		return words;
	};

	// // //
	// Save to Lexicon
	// // //
	const pickAndSave = () => {
		if (isPickingSaving) {
			// Stop saving
			return donePickingAndSaving();
		} else if(lexColumns.length === 0) {
			return toaster({
				message: "You need to add columns to the Lexicon before you can add anything to it.",
				color: "danger",
				duration: 4000,
				position: "top",
				doToast,
				undoToast
			});
		}
		setIsPickingSaving(true);
		return toaster({
			message: "Tap words you want to save to Lexicon.",
			duration: 2500,
			position: "top",
			doToast,
			undoToast
		});
	};
	const donePickingAndSaving = () => {
		setIsPickingSaving(false);
		if(savedWords.length > 0) {
			// Attempt to save
			saveToLexicon(savedWords);
		} else {
			// Just stop picking
			setIsPickingSaving(false);
		}
	};
	const saveToLexicon = (words: string[]) => {
		doAlert({
			header: "Select a column",
			message: "Your selected words will be added to the Lexicon under that column.",
			inputs: lexColumns.map((col: LexiconColumn, i: number) => {
				return {
					type: 'radio',
					label: col.label,
					value: col,
					checked: !i
				};
			}),
			buttons: [
				{
					text: "Cancel",
					role: 'cancel'
				},
				{
					text: "Save",
					handler: (col: LexiconColumn | undefined) => {
						if(!col) {
							// Treat as cancel
							return;
						}
						console.log(col);
						// Send off to the lexicon
						dispatch(addItemstoLexiconColumn(words, col.id));
						// Clear info
						setSavedWords([]);
						setSavedWordsObject({});
						setIsPickingSaving(false);
						$a(".word.saved").forEach((obj: HTMLElement) => obj.classList.remove("saved"));
						// Toast
						toaster({
							message: `Selected words saved to Lexicon under "${col.label}"`,
							duration: 3500,
							position: "top",
							buttons: [
								{
									text: "Go to Lexicon",
									handler: () => navigator.push("/lex")
								}
							],
							color: "success",
							doToast,
							undoToast
						});
					}
				}
			]
		});
	};

	// // //
	// Display
	// // //

	const parsedWords = useMemo(() => {
		return displayHTML.map((words: string[], i: number) => {
			const id = `createdWord${i}`;
			return <React.Fragment key={i}>
				<span className="word" id={id} onClick={() => maybeSaveThisWord(words[0], id)}>{words[1]}</span>{' '}
			</React.Fragment>;
		});
	}, [displayHTML, maybeSaveThisWord]);
	const parsedWordList = useMemo(() => {
		return displayList.map((word: string, i: number) => {
			const id = `createdWord${i}`;
			return <div className="word" key={i} id={id} onClick={() => maybeSaveThisWord(word, id)}>{word}</div>;
		});
	}, [displayList, maybeSaveThisWord]);
	const makeOutput = useCallback(() => {
		if(displayString) {
			if(isPickingSaving) {
				return parsedWords;
			}
			return [displayString];
		} else if (errorString) {
			return <h2 color="danger" className="ion-text-center">{errorString}</h2>;
		} else if (displayList.length > 0) {
			return parsedWordList;
		}
		return <></>;
	}, [displayList, displayString, errorString, parsedWords, parsedWordList, isPickingSaving]);

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
					<div className="leftHandSide">
						<IonButton
							strong={true}
							size="small"
							color="success"
							style={ { width: "max-content", fontSize: "1.35rem", padding: "0.5rem 0", minHeight: "3.25rem" } }
							onClick={() => {new Promise(() => generateOutput())}}
						>{
							isGenerating ? (
								<span style={ {fontStyle: "italic"} }>Loading...</span>
							) : "Generate"
						}<IonIcon icon={caretForwardCircleOutline} style={ { marginLeft: "0.25em" } } /></IonButton>
						<div id="outputPane" style={{columnWidth: wordlistMultiColumn ? colsNum : "auto"}} className={"largePane selectable" + (isPickingSaving ? " pickAndSave" : "")}>
							{makeOutput()}
						</div>
					</div>
					<div className="rightHandSide">
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
							onClick={() => copyText(copyString, doToast, undoToast)}
						><IonIcon slot="icon-only" icon={copyOutline} /></IonButton>
						<IonButton
							expand="block"
							strong={true}
							className={isPickingSaving ? "hide" : ""}
							color="secondary"
							onClick={() => pickAndSave()}
						><LexiconOutlineIcon slot="icon-only" /></IonButton>
						<IonButton
							className={isPickingSaving ? "" : "hide"}
							id="doneSavingButton"
							expand="block"
							strong={true}
							color="success"
							onClick={() => donePickingAndSaving()}
						><IonIcon slot="icon-only" icon={saveOutline} /></IonButton>
					</div>
				</div>
			</IonContent>
		</IonPage>
	);
};

export default WGOut;
