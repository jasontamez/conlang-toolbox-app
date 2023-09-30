import React, { useMemo, useState, useCallback, useEffect } from 'react';
import {
	useIonViewDidEnter,
	IonContent,
	IonPage,
	IonHeader,
	IonToolbar,
	IonMenuButton,
	IonButtons,
	IonTitle,
	IonButton,
	IonIcon,
	IonLoading,
	useIonAlert,
	useIonToast,
	useIonRouter,
	AlertInput
} from '@ionic/react';
import { useSelector, useDispatch } from "react-redux";
import {
	helpCircleOutline,
	caretForwardCircleOutline,
	settingsOutline,
	saveOutline,
	copyOutline,
	duplicateOutline
} from 'ionicons/icons';
import escapeRegexp from 'escape-string-regexp';
import { v4 as uuidv4 } from 'uuid';
import { Clipboard } from '@capacitor/clipboard';

import { LexiconColumn, PageData, SortObject, StateObject, ViewState, WECharGroupObject, WESoundChangeObject, WETransformObject } from '../../store/types';
import { saveView } from '../../store/viewSlice';
import { addItemstoLexiconColumn } from '../../store/lexiconSlice';

import { $i, $a } from '../../components/DollarSignExports';
import calculateCharGroupReferenceRegex from '../../components/CharGroupRegex';
import toaster from '../../components/toaster';
import { LexiconOutlineIcon } from '../../components/icons';
import ModalWrap from "../../components/ModalWrap";
import ltr from '../../components/LTR';
import { CustomStorageWE } from '../../components/PersistentInfo';
import ManageCustomInfoWE from './modals/CustomInfoWE';
import ExtraCharactersModal from '../modals/ExtraCharacters';
import OutputOptionsModal from './modals/OutputOptions';
import MaybeLoadPreset from "./modals/MaybeLoadWEPreset";
import { OutCard } from "./WECards";
import makeSorter from '../../components/stringSorter';

type arrayOfStringsAndStringArrays = (string | string[])[];

interface soundChangeModified {
	seek: arrayOfStringsAndStringArrays | RegExp
	replace: string | arrayOfStringsAndStringArrays
	context: (RegExp | null)[]
	anticontext: (RegExp | null)[]
	flagged: boolean
}

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

const WEOut = (props: PageData) => {
	const { modalPropsMaker } = props;
	const [savedWords, setSavedWords] = useState<string[]>([]);
	const [savedWordsObject, setSavedWordsObject] = useState<{ [key: string]: boolean }>({});
	const [copyString, setCopyString] = useState<string>("");
	const [errorString, setErrorString] = useState<string>("");
	const [displayRulesApplied, setDisplayRulesApplied] = useState<string[][][]>([]);
	const [displayInputOutput, setDisplayInputOutput] = useState<string[][]>([]);
	const [displayOutputInput, setDisplayOutputInput] = useState<string[][]>([]);
	const [displayList, setDisplayList] = useState<string[]>([]);
	const [isOpenInfo, setIsOpenInfo] = useState<boolean>(false);
	const [isOpenECM, setIsOpenECM] = useState<boolean>(false);
	const [isOpenOptions, setIsOpenOptions] = useState<boolean>(false);
	const [isOpenLoadPreset, setIsOpenLoadPreset] = useState<boolean>(false);
	const [isOpenManageCustomWE, setIsOpenManageCustomWE] = useState<boolean>(false);
	const [isPickingSaving, setIsPickingSaving] = useState<boolean>(false);
	const [loadingOpen, setLoadingOpen] = useState<boolean>(false);
	const [storedInfo, setStoredInfo] = useState<string[]>([]);
	const [needToGenerate, setNeedToGenerate] = useState<boolean>(true);
	const dispatch = useDispatch();
	const viewInfo = { key: "we" as keyof ViewState, page: "output" };
	useIonViewDidEnter(() => {
		dispatch(saveView(viewInfo));
	});
	const [doAlert] = useIonAlert();
	const [doToast, undoToast] = useIonToast();
	const navigator = useIonRouter();
	const {
		input,
		characterGroups,
		transforms,
		soundChanges,
		outputStyle,
		inputLower,
		inputAlpha,
		customSort
	} = useSelector((state: StateObject) => state.we);
	const {
		sortLanguage,
		sensitivity,
		defaultCustomSort,
		defaultSortLanguage,
		customSorts
	} = useSelector((state: StateObject) => state.sortSettings);
	const {
		columns,
		customSort: customSortLex
	} = useSelector((state: StateObject) => state.lexicon);
	const [customSortObj, defaultCustomSortObj, customSortLexObj] = useMemo(() => {
		let customSortObj: SortObject | undefined;
		let defaultCustomSortObj: SortObject | undefined;
		let customSortLexObj: SortObject | undefined;
		customSorts.every(obj => {
			if(obj.id === customSortLex) {
				customSortLexObj = obj;
			}
			if(obj.id === customSort) {
				customSortObj = obj;
			}
			if (obj.id === defaultCustomSort) {
				defaultCustomSortObj = obj;
			}
			return !(customSortObj && defaultCustomSortObj && customSortLexObj);
		});
		return [customSortObj, defaultCustomSortObj, customSortLexObj];
	}, [customSort, customSorts, customSortLex, defaultCustomSort]);
	const lexSorter = makeSorter(
		sortLanguage || defaultSortLanguage,
		sensitivity,
		customSortLexObj || defaultCustomSortObj
	);
	const rawInput = useMemo(() => {
		let lines = input.split(/\n/);
		if(inputLower) {
			lines = lines.map(line => line.toLocaleLowerCase(sortLanguage || defaultSortLanguage || undefined));
		}
		if(inputAlpha) {
			lines = lines.sort(
				makeSorter(
					sortLanguage || defaultSortLanguage,
					sensitivity,
					customSortObj || defaultCustomSortObj
				)
			);
		}
		return lines;
	}, [
		input, inputLower, inputAlpha,
		sortLanguage, sensitivity, defaultSortLanguage,
		customSortObj, defaultCustomSortObj
	]);

	const charGroupMap = useMemo(() => {
		const obj: {[key: string]: WECharGroupObject} = {};
		characterGroups.forEach((o: WECharGroupObject) => {
			obj[o.label!] = o;
		});
		return obj;
	}, [characterGroups]);
	const transformsMap = useMemo(() => {
		// Check transforms for %CharGroup references and update them if needed
		const newObj: { [key:string]: RegExp[] } = {};
		transforms.forEach((transform: WETransformObject) => {
			let regex: RegExp;
			const all: RegExp[] = [];
			const props: (keyof WETransformObject)[] = ["seek", "replace"];
			props.forEach((prop: keyof WETransformObject) => {
				if(transform[prop].indexOf("%") !== -1) {
					// Found a possibility.
					regex = calculateCharGroupReferenceRegex(transform[prop], charGroupMap) as RegExp;
				} else {
					regex = new RegExp(transform[prop], "g");
				}
				all.push(regex);
			});
			newObj[transform.id] = all;
		});
		return newObj;
	}, [transforms, charGroupMap]);
	// Go through a from/to string and check for character groups and other regex stuff. Returns an array.
	const interpretFromAndTo = useCallback((input: string) => {
		var rules: (string | string[])[] = [],
			assembly: (string | string[])[] = [],
			fromTo = "",
			backslash = false,
			curly = false,
			square = false;
		input.split("").forEach(function(q) {
			// If we previously had a backslash, add it to this element.
			if (backslash) {
				backslash = false;
				fromTo += "\\" + q;
			// If we discover a backslash, set up for the next loop.
			} else if (q === "\\") {
				backslash = true;
				return;
			// If we previously had a square brace, keep looking for its matching end.
			} else if (square) {
				if (q === "]") {
					// Found it.
					square = false;
				}
				fromTo += q;
			// If we discover a square brace, pause lookups until we find its end.
			} else if (q === "[") {
				square = true;
				fromTo += q;
			// If we previously had a curly brace, keep looking for its matching end.
			} else if (curly) {
				if (q === "}") {
					// Found it.
					curly = false;
				}
				fromTo += q;
			// If we discover a curly brace, pause lookups until we find its end.
			} else if (q === "{") {
				curly = true;
				fromTo += q;
			// Otherwise, treat as plain text (and possibly character groups or regex).
			} else {
				fromTo += q;
			}
		});
		// Check for and insert missing end braces.
		if (square) {
			rules.push("]");
		}
		if (curly) {
			rules.push("}");
		}
		// Now look for character groups
		const double = uuidv4().replace(/[%!]/g,"x");
		const negate = uuidv4().replace(/[%!]/g,"x");
		// Hide %%
		fromTo.replace(/%%/g, double);
		// CharGroup negations
		assembly = fromTo.split("!%");
		fromTo = assembly.shift() as string;
		assembly.forEach(unit => {
			const q = unit[0];
			const charGroup = charGroupMap[q];
			if(charGroup !== undefined) {
				// CharGroup found - negation, so do not make into Array
				fromTo += "[^" + charGroup.run + "]" + unit.slice(1);
			} else {
				// Hide !%
				fromTo += negate + unit;
			}
		});
		// CharGroups
		assembly = fromTo.split("%");
		rules.push(assembly.shift()!);
		assembly.forEach(unit => {
			const q = unit[0];
			const charGroup = charGroupMap[q];
			if(charGroup !== undefined) {
				// CharGroup found
				rules.push(charGroup.run.split(""), unit.slice(1));
			} else {
				rules.push("%" + unit);
			}
		});
		// Split strings, leave Arrays
		assembly = rules;
		rules = [];
		assembly.forEach(unit => {
			if(!unit) {
				// Skip!
			} else if(typeof unit === "string") {
				// Restore any hidden %% or !% strings
				// Add as individual characters
				const d = new RegExp(escapeRegexp(double), "g");
				const n = new RegExp(escapeRegexp(negate), "g");
				rules.push(...(unit.replace(d, "%%").replace(n, "!%")).split(""));
			} else {
				// Add as Array
				rules.push(unit);
			}
		});
		return rules;
	}, [charGroupMap]);
	const soundChangeMap = useMemo(() => {
		const newObj: { [key: string]: soundChangeModified } = {};
		soundChanges.forEach((change: WESoundChangeObject) => {
			let seek: arrayOfStringsAndStringArrays | RegExp;
			let replace: string | arrayOfStringsAndStringArrays;
			let context: (RegExp | null)[];
			let anticontext: (RegExp | null)[];
			let charGroupFlag = (change.seek.indexOf("%") !== -1) && (change.replace.indexOf("%") !== -1)
			// SEEK
			let temp: any = change.seek;
			if(charGroupFlag) {
				seek = interpretFromAndTo(temp);
				if(seek.every(unit => typeof unit === "string")) {
					// No Arrays? No need for flag
					charGroupFlag = false;
					seek = new RegExp(seek.join(""), "g");
				}
			} else {
				seek = calculateCharGroupReferenceRegex(temp, charGroupMap) as RegExp;
			}
			// REPLACE
			temp = change.replace;
			if(charGroupFlag) {
				replace = interpretFromAndTo(temp);
				if(replace.every(unit => typeof unit === "string")) {
					// No Arrays? No need for flag
					charGroupFlag = false;
					replace = replace.join("");
					// Need to run through seek to get a single RegExp
					let temp = (seek as (string | string[])[]).map(unit => typeof unit === "string" ? unit : "[" + unit.join("") + "]");
					seek = new RegExp(temp.join(""), "g");
				}
			} else {
				replace = temp;
			}
			// CONTEXT
			temp = change.context.split("_");
			if(temp.length !== 2) {
				// Error. Treat as "_"
				temp = [null, null];
			} else {
				if(temp[0]) {
					if(temp[0][0] === "#") {
						temp[0] = calculateCharGroupReferenceRegex("^" + temp[0].slice(1) + "$", charGroupMap);
					} else {
						temp[0] = calculateCharGroupReferenceRegex(temp[0] + "$", charGroupMap);
					}
				} else {
					temp[0] = null;
				}
				if(temp[1]) {
					let t = "^" + temp[1];
					if(t[t.length - 1] === "#") {
						temp[1] = calculateCharGroupReferenceRegex(t.slice(0, -1) + "$", charGroupMap);
					} else {
						temp[1] = calculateCharGroupReferenceRegex(t, charGroupMap);
					}
				} else {
					temp[1] = null;
				}
			}
			context = temp;
			// ANTICONTEXT
			temp = change.anticontext.split("_");
			if(temp.length !== 2) {
				// Error. Treat as "_"
				temp = [null, null];
			} else {
				if(temp[0]) {
					if(temp[0][0] === "#") {
						temp[0] = calculateCharGroupReferenceRegex("^" + temp[0].slice(1) + "$", charGroupMap);
					} else {
						temp[0] = calculateCharGroupReferenceRegex(temp[0] + "$", charGroupMap);
					}
				} else {
					temp[0] = null;
				}
				if(temp[1]) {
					let t = "^" + temp[1];
					if(t[t.length - 1] === "#") {
						temp[1] = calculateCharGroupReferenceRegex(t.slice(0, -1) + "$", charGroupMap);
					} else {
						temp[1] = calculateCharGroupReferenceRegex(t, charGroupMap);
					}
				} else {
					temp[1] = null;
				}
			}
			anticontext = temp;
			// SAVE
			newObj[change.id] = {
				seek,
				replace,
				context,
				anticontext,
				flagged: charGroupFlag
			};
		});
		return newObj;
	}, [soundChanges, interpretFromAndTo, charGroupMap]);

	useEffect(() => {
		// If anything changes, mark that we need to generate again. Otherwise, everything remains the same.
		setNeedToGenerate(true);
	}, [outputStyle, input, transforms, soundChanges, characterGroups]);

	const evolveOutput = () => {
		if(!needToGenerate) {
			// We've already generated and nothing has changed, so the output remains the same.
			return;
		}
		const errors: string[] = [];
		// Clear any previous output.
		setDisplayList([]);
		setDisplayRulesApplied([]);
		setDisplayInputOutput([]);
		setDisplayOutputInput([]);
		setCopyString("");
		setErrorString("");
		// Sanity check
		if(soundChanges.length < 1) {
			errors.push("You have no sound changes defined.");
		}
		if (rawInput.length < 1) {
			errors.push("You have no input words to evolve.");
		}
		if(errors.length > 0) {
			setErrorString(errors.join(" "));
			return;
		}
		// Add to screen.
		const arrowLR = "⟶";
		const arrowRL = "⟵";
		const reverse = (outputStyle === "outputFirst");
		const arrow = (ltr($i("outputPaneWE") || document) ? (reverse ? arrowRL : arrowLR) : (reverse ? arrowLR : arrowRL));
		let setter: Function = setDisplayOutputInput;
		switch(outputStyle) {
			case "outputOnly":
				// [word...]
				const evolved = changeTheWords({input: rawInput});
				setDisplayList(evolved as string[]);
				setCopyString(evolved.join("\n"));
				break;
			case "inputFirst":
				// [[word, original]...]
				setter = setDisplayInputOutput;
			// eslint-disable-next-line no-fallthrough
			case "outputFirst":
				// [[original, word]...]
				// leadingWord class for the first word
				const output: string[][] = [];
				changeTheWords({input: rawInput, reverse: reverse ? 1 : -1}).forEach(bit => {
					const [one, two] = bit as [string, string];
					output.push([one, arrow, two]);
				});
				setter(output);
				break;
			case "rulesApplied":
				// [original, word, [[rule, new word]...]]
				const rulesApplied: string[][][] = [];
				changeTheWords({input: rawInput, rulesFlag: true}).forEach(unit => {
					const [one, two, units] = unit as [string, string, [string, string][]];
					const rows: string[][] = [
						[one, arrow, two]
					];
					units.forEach((bit: string[]) => {
						const [rule, to] = bit;
						rows.push([rule, to]);
					});
					rulesApplied.push(rows);
				});
				setDisplayRulesApplied(rulesApplied);
				/*
				[
					[
						[from, arrow, to],
						[rule, to],
						...
					],
					...
				]
				*/
				break;
			default:
				setErrorString("Unknown error occurred.");
		}
		setNeedToGenerate(false);
	};
	// Take an array of strings and apply each sound change rule to each string one at a time,
	//  then return an array according to the style requested
	const changeTheWords = (props: { input: string[], rulesFlag?: boolean, reverse?: number}) => {
		const { input, rulesFlag, reverse = 0 } = props;
		const output: (string | [string, string] | [string, string, [string, string][]])[] = [];
		// Loop over every inputted word in order.
		input.forEach((original: string) => {
			let word = original;
			const rulesThatApplied: [string, string][] = [];
			// Loop over the transforms.
			transforms.forEach((tr: WETransformObject) => {
				const { id, direction, replace, seek } = tr;
				// Check to see if we apply this rule.
				if (direction === "in") {
					word = word.replace(transformsMap[id][0], replace);
				} else if (direction === "both" || direction === "double") {
					word = word.replace(seek, replace);
				}
			});
			// Loop over every sound change in order.
			soundChanges.forEach((change: WESoundChangeObject) => {
				const { id, seek, replace, context, anticontext } = change;
				const modified = soundChangeMap[id];
				const contx = modified.context;
				const antix = modified.anticontext;
				const rule = `${seek}➜${replace} / ${context}${anticontext ? ` ! ${anticontext}` : ""}`;
				let previous = word;
				if(modified.flagged) {
					// We have character group matches to deal with.
					const seeking = modified.seek as arrayOfStringsAndStringArrays;
					const replace = modified.replace as arrayOfStringsAndStringArrays;
					let seekTextBasic = "";
					let seekTextCharGroup = "";
					const ids: [string, string][] = [];
					seeking.forEach(ss => {
						if(typeof ss === "string") {
							seekTextBasic = seekTextBasic + ss;
							seekTextCharGroup = seekTextCharGroup + ss;
						} else {
							const id = "N" + uuidv4().replace(/[^a-zA-Z0-9]/g, "");
							const ssj = ss.join("");
							seekTextBasic = seekTextBasic + `[${ssj}]`;
							seekTextCharGroup = seekTextCharGroup + `(?<${id}>[${ssj}])`;
							ids.push([id, ssj]);
						}
					});
					// seekTextBasic/CharGroup are the bases of RegExps
					const basicSeek = new RegExp(seekTextBasic, "g");
					const charGroupSeek = new RegExp(seekTextCharGroup, "g");
					basicSeek.lastIndex = 0;
					charGroupSeek.lastIndex = 0;
					let basicMatch = basicSeek.exec(word);
					let charGroupMatch = charGroupSeek.exec(word);
					let lastIndex = basicSeek.lastIndex;
					while(basicMatch !== null && charGroupMatch !== null) {
						let okToReplace: boolean | null = true;
						// Hold on to the pre-match length of word.
						const prevLength = word.length;
						// m is an array: [full match, ...other matches]
						// seeking.lastIndex is the point right after the match
						// Therefore: word.slice(0, seeking.lastIndex) will be everything up to and including the match
						// Make sure our match doesn't match the anticontext
						// PLI = previous value of 'lastIndex' (or 0)
						// (a) = pre match
						// (b) = post match
						// m = entire match (a)x(b)
						// LI = current value of rule.lastIndex
						// . = other character(s) that may or may not exist
						// String is this: ...PLI...(a)x(b)LI...
						// temp needs to be matched with everything up to x.
						// temp itself needs to have x appended to it.
						// Make 'pre' into the matchable string: 0 to LI - (b).
						const pre = word.slice(0, basicMatch.index);
						const post = word.slice(basicMatch.index + basicMatch[0].length);
						// We do NOT want to match the anticontext
						if(!antix.every(a => !a)) {
							if(
								(antix[0] ? pre.match(antix[0]) : true)
								&& (antix[1] ? post.match(antix[1]) : true)
							) {
								// We matched the anticontext, so forget about this.
								okToReplace = null;
							}
						}
						// We DO want to match the context
						if(okToReplace && !contx.every(c => !c)) {
							if(
								!(!contx[0] || pre.match(contx[0]))
								|| !(!contx[1] || post.match(contx[1]))
							) {
								// We did not match the context, so forget about this.
								okToReplace = false;
							}
						}
						if(okToReplace) {
							// We can replace
							let replaceText = "";
							let i = 0;
							const g = charGroupMatch.groups || {};
							replace.forEach(transform => {
								if(typeof transform === "string") {
									replaceText = replaceText + transform;
								} else {
									let [id, run] = ids[i];
									i++;
									let ind = run.indexOf(g[id]);
									if(ind < 0) {
										ind = 0;
									}
									replaceText = replaceText + transform[ind % transform.length];
								}
							});
							const newseek = new RegExp(escapeRegexp(pre) + seekTextBasic);
							const newreplace = pre.replace(/\$/g, "\\$") + replaceText;
							word = word.replace(newseek, newreplace);
							basicSeek.lastIndex = word.length - post.length;
						}
						if(basicMatch[0] === "" && (lastIndex === 0 || lastIndex === prevLength)) {
							// If the match didn't actually match anything, and it's at a position where it's likely
							//   to match the same nothing next time, just up and end the loop.
							basicMatch = null;
						} else {
							// Otherwise, check for more matches!
							basicMatch = basicSeek.exec(word);
							lastIndex = basicSeek.lastIndex;
							charGroupMatch = charGroupSeek.exec(word);
						}
					}
				} else {
					// No special character group match handling
					const seeking = modified.seek as RegExp;
					const replace = modified.replace as string;
					// Reset lastIndex to prevent certain errors.
					seeking.lastIndex = 0;
					let m = seeking.exec(word);
					let lastIndex = seeking.lastIndex;
					while(m !== null) {
						let okToReplace: boolean | null = true;
						// Hold on to the pre-match length of word.
						const prevLength = word.length;
						// m is an array: [full match, ...other matches]
						// seeking.lastIndex is the point right after the match
						// Therefore: word.slice(0, seeking.lastIndex) will be everything up to and including the match
						// Make sure our match doesn't match the anticontext
						// PLI = previous value of 'lastIndex' (or 0)
						// (a) = pre match
						// (b) = post match
						// m = entire match (a)x(b)
						// LI = current value of rule.lastIndex
						// . = other character(s) that may or may not exist
						// String is this: ...PLI...(a)x(b)LI...
						// temp needs to be matched with everything up to x.
						// temp itself needs to have x appended to it.
						// Make 'pre' into the matchable string: 0 to LI - (b).
						const pre = word.slice(0, m.index);
						const post = word.slice(m.index + m[0].length);
						// We do NOT want to match the anticontext
						if(!antix.every(a => !a)) {
							if(
								(antix[0] ? pre.match(antix[0]) : true)
								&& (antix[1] ? post.match(antix[1]) : true)
							) {
								// We matched the anticontext, so forget about this.
								okToReplace = null;
							}
						}
						// We DO want to match the context
						if(okToReplace && !contx.every(c => !c)) {
							if(
								!(!contx[0] || pre.match(contx[0]))
								|| !(!contx[1] || post.match(contx[1]))
							) {
								// We did not match the context, so forget about this.
								okToReplace = false;
							}
						}
						if(okToReplace) {
							// We can replace
							if(m.length > 1) {
								// Handle parenthetical matches
								let rep = replace;
								let c = m.length;
								while(c >= 1) {
									rep = rep.replace("$" + c.toString(), m[c]);
									c--;
								}
								word = pre + rep + post;
								seeking.lastIndex = pre.length + rep.length;
							} else {
								word = pre + replace + post;
								seeking.lastIndex = pre.length + replace.length;
							}
						}
						if(m[0] === "" && (lastIndex === 0 || lastIndex === prevLength)) {
							// If the match didn't actually match anything, and it's at a position where it's likely
							//   to match the same nothing next time, just up and end the loop.
							m = null;
						} else {
							// Otherwise, check for more matches!
							m = seeking.exec(word);
							lastIndex = seeking.lastIndex;
						}
					}
				}
				rulesFlag && previous !== word && rulesThatApplied.push([rule, word]);
			});
			// Loop over the transforms again.
			transforms.forEach((tr: WETransformObject) => {
				const { id, replace, seek, direction } = tr;
				// Check to see if we apply this transform.
				if (direction === "both") {
					word = word.replace(replace, seek);
				} else if (direction === "double") {
					word = word.replace(seek, replace);
				} else if (direction === "out") {
					word = word.replace(transformsMap[id][0], replace);
				}
			});
			// Add the mangled word to the output list.
			if(rulesFlag) {
				output.push([original, word, rulesThatApplied]);
			} else if (reverse > 1) {
				output.push([word, original]);
			} else if (reverse) {
				output.push([original, word])
			} else {
				output.push(word);
			}
		});
		// Return the output.
		return output;
	}


	// // //
	// Save to Lexicon
	// // //

	const pickAndSave = () => {
		if (isPickingSaving) {
			// Stop saving
			return donePickingAndSaving();
		} else if(columns.length === 0) {
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
	const saveToLexicon = (words: string[]) => {
		doAlert({
			header: "Select a column",
			message: "Your selected words will be added to the Lexicon under that column.",
			inputs: columns.map((col: LexiconColumn, i: number) => {
				const input: AlertInput = {
					type: 'radio',
					label: col.label,
					value: col,
					checked: !i
				};
				return input;
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
						dispatch(addItemstoLexiconColumn([words, col.id, lexSorter]));
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
							color: "success",
							buttons: [
								{
									text: "Go to Lexicon",
									handler: () => navigator.push("/lex")
								}
							],
							doToast,
							undoToast
						});
					}
				}
			]
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


	// // //
	// Save Custom Info
	// // //

	const openCustomInfoModal = () => {
		setLoadingOpen(true);
		const titles: string[] = [];
		CustomStorageWE.iterate((value, title) => {
			titles.push(title);
			return; // Blank return keeps the loop going
		}).then(() => {
			setStoredInfo(titles);
			setLoadingOpen(false);
			setIsOpenManageCustomWE(true);
		}).catch((err) => {
			console.log(err);
		});
	};

	// // //
	// Display
	// // //

	const parsedWordList = useMemo(() => {
		// No need to set copyList here
		return displayList.map((word: string, i: number) => {
			const id = `evolved:basic:${word}:${i}`;
			return <div className="word selectable" key={id} id={id} onClick={() => maybeSaveThisWord(word, id)}>{word}</div>;
		});
	}, [displayList, maybeSaveThisWord]);
	const parsedInputOutput = useMemo(() => {
		if(displayInputOutput.length === 0) {
			// Don't mess with copyString unless we have something to add to it.
			return [];
		}
		const copiable: string[] = [];
		const output = displayInputOutput.map((words: string[], i: number) => {
			const [original, arrow, result] = words;
			const copystring = `${original} ${arrow} ${result}`;
			const id = `evolved:inout:${copystring}:${i}`;
			copiable.push(copystring);
			return (
				<div className="inputToOutput selectable" key={id}>
					<span>{original}</span>{' '}
					<span>{arrow}</span>{' '}
					<span className="word" id={id} onClick={() => maybeSaveThisWord(result, id)}>{result}</span>
				</div>
			);
		});
		setCopyString(copiable.join("\n"));
		return output;
	}, [displayInputOutput, maybeSaveThisWord]);
	const parsedOutputInput = useMemo(() => {
		if(displayOutputInput.length === 0) {
			// Don't mess with copyString unless we have something to add to it.
			return [];
		}
		const copiable: string[] = [];
		const output = displayOutputInput.map((words: string[], i: number) => {
			const [original, arrow, result] = words;
			const copystring = `${result} ${arrow} ${original}`;
			const id = `evolved:outin:${copystring}:${i}`;
			copiable.push(copystring);
			return (
				<div className="outputToInput selectable" key={id}>
					<span className="word" id={id} onClick={() => maybeSaveThisWord(result, id)}>{result}</span>{' '}
					<span>{arrow}</span>{' '}
					<span>{original}</span>
				</div>
			);
		});
		setCopyString(copiable.join("\n"));
		return output;
	}, [displayOutputInput, maybeSaveThisWord]);
	const parsedRulesApplied = useMemo(() => {
		if(displayRulesApplied.length === 0) {
			// Don't mess with copyString unless we have something to add to it.
			return [];
		}
		const copiable: string[] = [];
		const output = displayRulesApplied.map((group: string[][], i: number) => {
			const [final, ...rules] = group;
			const [original, arrow, result] = final;
			const line = `${original} ${arrow} ${result}`;
			copiable.push(line);
			const id = `evolved:rules:${line}:${i}`;
			return (
				<div className="rulesApplied" key={id}>
					<div className="inputToOutput selectable">
						<span>{original}</span>{' '}
						<span>{arrow}</span>{' '}
						<span className="word" id={id} onClick={() => maybeSaveThisWord(result, id)}>{result}</span>
					</div>
					<div className="rules selectable">
						{rules.map((pair: string[], i: number) => {
							const [rule, result] = pair;
							copiable.push(`\t${rule} ${arrow} ${result}`);
							return (
								<div className="inputToOutput selectable" key={`${id}:output:${rule}:${result}:${i}`}>
									<span>{rule}</span>{' '}
									<span>{arrow}</span>{' '}
									<span>{result}</span>
								</div>
							);
						})}
					</div>
				</div>
			);
		});
		setCopyString(copiable.join("\n"));
		return output;
	}, [displayRulesApplied, maybeSaveThisWord]);
	const makeOutput = useCallback(() => {
		if (errorString) {
			return <h2 color="danger" className="ion-text-center">{errorString}</h2>;
		} else if (parsedWordList.length > 0) {
			return parsedWordList;
		} else if (parsedRulesApplied.length > 0) {
			return parsedRulesApplied;
		} else if (parsedInputOutput.length > 0) {
			return parsedInputOutput;
		} else if (parsedOutputInput.length > 0) {
			return parsedOutputInput;
		}
		return <></>;
	}, [errorString, parsedWordList, parsedRulesApplied, parsedInputOutput, parsedOutputInput]);

	return (
		<IonPage>
			<IonLoading
				cssClass='loadingPage'
				isOpen={loadingOpen}
				onDidDismiss={() => setLoadingOpen(false)}
				message={'Please wait...'}
				spinner="bubbles"
				/*duration={300000}*/
				duration={1000}
			/>
			<OutputOptionsModal {...props.modalPropsMaker(isOpenOptions, setIsOpenOptions)} />
			<MaybeLoadPreset {...props.modalPropsMaker(isOpenLoadPreset, setIsOpenLoadPreset)} />
			<ManageCustomInfoWE
				{...props.modalPropsMaker(isOpenManageCustomWE, setIsOpenManageCustomWE)}
				openECM={setIsOpenECM}
				titles={storedInfo}
				setTitles={setStoredInfo}
			/>
			<ExtraCharactersModal {...modalPropsMaker(isOpenECM, setIsOpenECM)} />
			<ModalWrap {...modalPropsMaker(isOpenInfo, setIsOpenInfo)}><OutCard /></ModalWrap>
			<IonHeader>
				<IonToolbar>
					 <IonButtons slot="start">
						 <IonMenuButton />
					 </IonButtons>
					<IonTitle>Output</IonTitle>
					<IonButtons slot="end">
						<IonButton onClick={() => openCustomInfoModal()}>
							<IonIcon icon={saveOutline} />
						</IonButton>
						<IonButton onClick={() => setIsOpenInfo(true)}>
							<IonIcon icon={helpCircleOutline} />
						</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen>
				<div id="WEoutput">
					<div>
						<IonButton
							onClick={() => setIsOpenLoadPreset(true)}
							color="tertiary"
							strong={true}
						><IonIcon icon={duplicateOutline} slot="start" /> Load Preset</IonButton>
						<div className="evolving">
							<IonButton
								style={ { fontSize: "1.35rem", padding: "0.5rem 0", minHeight: "3.25rem" } }
								strong={true}
								expand="block"
								color="success"
								onClick={() => evolveOutput()}
							>Evolve <IonIcon icon={caretForwardCircleOutline} style={ { marginLeft: "0.25em" } } /></IonButton>
							<div id="outputPaneWE" className={"largePane selectable" + (isPickingSaving ? " pickAndSave" : "")}>
								{makeOutput()}
							</div>
						</div>
					</div>
					<div className="buttons">
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
							className={isPickingSaving ? "" : "hide"}
							id="doneSavingButton"
							expand="block"
							strong={false}
							color="success"
							onClick={() => donePickingAndSaving()}
						><IonIcon slot="icon-only" icon={saveOutline} /></IonButton>
						<IonButton
							className={isPickingSaving ? "hide" : ""}
							expand="block"
							strong={false}
							color="secondary"
							onClick={() => pickAndSave()}
						><LexiconOutlineIcon slot="icon-only" /></IonButton>
					</div>
				</div>
			</IonContent>
		</IonPage>
	);
};

export default WEOut;
