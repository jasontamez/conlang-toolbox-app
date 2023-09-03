import React, { useMemo, useState } from 'react';
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
	IonLoading
} from '@ionic/react';
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import {
	changeView,
	addDeferredLexiconItems,
	removeDeferredLexiconItem
} from '../../components/ReduxDucksFuncs';
import {
	helpCircleOutline,
	caretForwardCircleOutline,
	settingsOutline,
	bookOutline,
	saveOutline,
	copyOutline,
	duplicateOutline
} from 'ionicons/icons';
import { $i, $a } from '../../components/DollarSignExports';
import calculateCharGroupReferenceRegex from '../../components/CharGroupRegex';
import escapeRegexp from 'escape-string-regexp';
import { v4 as uuidv4 } from 'uuid';
import { PageData, WECharGroupObject, WESoundChangeObject, WETransformObject } from '../../components/ReduxDucksTypes';
import { OutCard } from "./WECards";
import ModalWrap from "../../components/ModalWrap";
import OutputOptionsModal from './M-OutputOptions';
import MaybeLoadPreset from "./M-MaybeLoadWEPreset";
import ltr from '../../components/LTR';
import fireSwal from '../../components/Swal';
import { Clipboard } from '@capacitor/clipboard';
import { CustomStorageWE } from '../../components/PersistentInfo';
import ManageCustomInfoWE from './M-CustomInfoWE';
import ExtraCharactersModal from '../M-ExtraCharacters';

const WEOut = (props: PageData) => {
	const { modalPropsMaker } = props;
	const [isOpenInfo, setIsOpenInfo] = useState<boolean>(false);
	const [isOpenECM, setIsOpenECM] = useState<boolean>(false);
	const [isOpenOptions, setIsOpenOptions] = useState<boolean>(false);
	const [isOpenLoadPreset, setIsOpenLoadPreset] = useState<boolean>(false);
	const [isOpenManageCustomWE, setIsOpenManageCustomWE] = useState<boolean>(false);
	const [isPickingSaving, setIsPickingSaving] = useState<boolean>(false);
	const [loadingOpen, setLoadingOpen] = useState<boolean>(false);
	const [storedInfo, setStoredInfo] = useState<string[]>([]);
	type arrayOfStringsAndStringArrays = (string | string[])[];
	interface soundChangeModified {
		seek: arrayOfStringsAndStringArrays | RegExp
		replace: string | arrayOfStringsAndStringArrays
		context: (RegExp | null)[]
		anticontext: (RegExp | null)[]
		flagged: boolean
	}
	const outputPane = $i("outputPaneWE");
	const dispatch = useDispatch();
	const viewInfo = ['we', 'output'];
	useIonViewDidEnter(() => {
		dispatch(changeView(viewInfo));
	});
	const [
		rawInput,
		settingsWE,
		transformObject,
		soundChangesObject,
		charGroupsWE,
		//lexicon
	] = useSelector((state: any) => [
		state.wordevolveInput,
		state.wordevolveSettings,
		state.wordevolveTransforms,
		state.wordevolveSoundChanges,
		state.wordevolveCharGroups,
		//state.lexicon
	], shallowEqual);
	const transforms: WETransformObject[] = transformObject.list;
	const transformsMap: Map<string, RegExp[]> = new Map();
	const soundChanges: WESoundChangeObject[] = soundChangesObject.list;
	const soundChangeMap: Map<string, soundChangeModified> = new Map();
	const charGroupMap = useMemo(() => {
		const obj: {[key: string]: WECharGroupObject} = {};
		charGroupsWE.map.forEach((o: [string, WECharGroupObject]) => {
			charGroupMap[o[0]] = o[1];
		});
		return obj;
	}, [charGroupsWE.map]);

	const $e = (tag: string, text: string | false = false, classy: string[] | false = false) => {
		const e: HTMLElement = document.createElement(tag);
		if (text !== false) {
			e.textContent = text;
		}
		if(classy !== false) {
			e.classList.add(...classy);
		}
		return e;
	}
	const $t = (text: string, tag: string = "div", classy: string[] = []) => {
		const t = document.createElement(tag);
		t.classList.add("word", ...classy);
		t.textContent = text;
		t.addEventListener("click", () => maybeSaveThisWord(t));
		return t;
	};

	const copyText = async () => {
		const copied: string[] = [];
		if(settingsWE.output === "outputOnly") {
			// Join with linebreaks
			$a(".word", outputPane).forEach((word: HTMLElement) => word.textContent && copied.push(word.textContent));
		} else if (settingsWE.output === "rulesApplied") {
			// either word arrow word or soundchange arrow word
			const input = $a("div", outputPane);
			while(input.length > 0) {
				const info = input.shift();
				if(info.classList.contains("ruleExplanation")) {
					copied.push("\t" + info.textContent);
				} else {
					copied.push(info.textContent);
				}
			}
		} else {
			// word arrow word
			let pos = 0;
			let temp: string[] = [];
			const input = $a("div", outputPane);
			while(input.length > 0) {
				pos++;
				temp.push(input.shift().textContent);
				if(pos === 3) {
					pos = 0;
					copied.push(temp.join(" "));
					temp = [];
				}
			}
		}
		if(copied.length > 0 && !copied[0].match(/^You have no/g)) {
			await Clipboard.write({string: copied.join("\n")});
			//navigator.clipboard.writeText(copied.join("\n"));
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

	// Go through a from/to string and check for character groups and other regex stuff. Returns an array.
	const interpretFromAndTo = (input: string) => {
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
	};
	const evolveOutput = (output: HTMLElement) => {
		const outputType = settingsWE.output;
		// Clear any previous output.
		while(output.firstChild !== null) {
			output.removeChild(output.firstChild);
		}
		// Sanity check
		const err: HTMLElement[] = [];
		if(soundChanges.length < 1) {
			err.push($e("div", "You have no sound changes defined."));
		} else if (rawInput.length < 1) {
			err.push($e("div", "You have no input words to evolve."));
		}
		if(err.length > 0) {
			return output.append(...err);
		}
		// Check transforms for %CharGroup references and update them if needed
		transforms.forEach((transformation: WETransformObject) => {
			let regex: RegExp;
			const all: RegExp[] = [];
			const props: (keyof WETransformObject)[] = ["seek", "replace"];
			props.forEach((prop: keyof WETransformObject) => {
				if(transformation[prop].indexOf("%") !== -1) {
					// Found a possibility.
					regex = calculateCharGroupReferenceRegex(transformation[prop], charGroupMap) as RegExp;
				} else {
					regex = new RegExp(transformation[prop], "g");
				}
				all.push(regex);	
			});
			transformsMap.set(transformation.key, all);
		});
		// Check sound changes for %CharGroup references and update them if needed
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
			soundChangeMap.set(change.key, {
				seek,
				replace,
				context,
				anticontext,
				flagged: charGroupFlag
			});
		});
		const modifiedWords = changeTheWords(rawInput);
		// Add to screen.
		const arrowLR = "⟶";
		const arrowRL = "⟵";
		const reverse = (outputType === "outputFirst");
		const arrow = (ltr(output) ? (reverse ? arrowRL : arrowLR) : (reverse ? arrowLR : arrowRL));
		const arrowDiv: HTMLElement = $e("div", arrow, ["arrow"])!;
		const style = output.style;
		style.gridTemplateColumns = "1fr";
		switch(outputType) {
			case "outputOnly":
				// [word...]
				modifiedWords.forEach(w => output.append($t(w)));
				break;
			case "inputFirst":
			case "outputFirst":
				// [[word, original]...]
				// [[original, word]...]
				style.gridTemplateColumns = (arrow ? "1fr 2em 1fr" : "1fr 1fr");
				modifiedWords.forEach(bit => {
					const [one, two] = bit;
					output.append(outputType === "inputFirst" ? $e("div", one, ["leadingWord"]) : $t(one, "div", ["leadingWord"]));
					arrow && output.append(arrowDiv.cloneNode(true));
					output.append(outputType === "inputFirst" ? $t(two) : $e("div", two));
				});
				break;
			case "rulesApplied":
				// [original, word, [[rule, new word]...]]	grid-template-columns: 1fr 2em 1fr;
				modifiedWords.forEach(unit => {
					let div = $e("div", unit.shift() + " " + arrow);
					div.append(" ", $t(unit.shift(), "span"));
					output.append(div);
					unit.shift()!.forEach((bit: string[]) => {
						const [rule, to] = bit;
						output.append($e("div", rule + " " + arrow + " " + to, ["ruleExplanation"]));
					});
				});
				break;
			default:
				output.append("Unknown error occurred.");
		}
	};
	// Take an array of strings and apply each sound change rule to each string one at a time,
	//  then return an array according to the style requested
	const changeTheWords = (input: string[]) => {
		let rulesThatApplied: string[][] = [];
		const output: any[] = [];
		// Loop over every inputted word in order.
		input.forEach((original: string) => {
			let word = original;
			// Loop over the transforms.
			transforms.forEach((tr: WETransformObject) => {
				// Check to see if we apply this rule.
				if (tr.direction === "in") {
					word = word.replace(transformsMap.get(tr.key)![0], tr.replace);
				} else if (tr.direction === "both" || tr.direction === "double") {
					word = word.replace(tr.seek, tr.replace);
				}
			});
			// Loop over every sound change in order.
			soundChanges.forEach((change: WESoundChangeObject) => {
				const modified = soundChangeMap.get(change.key)!;
				const contx = modified.context;
				const antix = modified.anticontext;
				const rule = change.seek + "➜" + change.replace + " / " + change.context + (change.anticontext ? " ! " + change.anticontext : "");
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
							let id = "N" + uuidv4().replace(/[^a-zA-Z0-9]/g, "");
							let ssj = ss.join("");
							seekTextBasic = seekTextBasic + "[" + ssj + "]";
							seekTextCharGroup = seekTextCharGroup + "(?<" + id + ">[" + ssj + "])";
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
				previous !== word && settingsWE.output === "rulesApplied" && rulesThatApplied.push([rule, word]);
			});
			// Loop over the transforms again.
			transforms.forEach((tr: WETransformObject) => {
				// Check to see if we apply this transform.
				if (tr.direction === "both") {
					word = word.replace(tr.replace, tr.seek);
				} else if (tr.direction === "double") {
					word = word.replace(tr.seek, tr.replace);
				} else if (tr.direction === "out") {
					word = word.replace(transformsMap.get(tr.key)![0], tr.replace);
				}
			});
			// Add the mangled word to the output list.
			let goingOut: any;
			switch(settingsWE.output) {
				case "outputOnly":
					goingOut = word;
					break;
				case "rulesApplied":
					goingOut = [original, word, rulesThatApplied];
					rulesThatApplied = [];
					break;
				case "inputFirst":
					goingOut = [original, word];
					break;
				case "outputFirst":
					goingOut = [word, original];
					break;
			}
			output.push(goingOut);
		});
		// Return the output.
		return output;
	}


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
						<IonButton onClick={() => setIsOpenInfo(true)}>
							<IonIcon icon={helpCircleOutline} />
						</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen>
				<div id="WEoutput">
					<IonButton
						className="TL"
						onClick={() => setIsOpenLoadPreset(true)}
						color="tertiary"
						strong={true}
					><IonIcon icon={duplicateOutline} slot="start" /> Load Preset</IonButton>
					<IonButton
						onClick={() => openCustomInfoModal()}
						className="TR"
						color="tertiary"
						strong={true}
					>Save/Load Custom Info</IonButton>
					<IonButton
						style={ { fontSize: "1.35rem", padding: "0.5rem 0", minHeight: "3.25rem" } }
						className="EV"
						strong={true}
						expand="block"
						color="success"
						onClick={() => evolveOutput(outputPane)}
					>Evolve <IonIcon icon={caretForwardCircleOutline} style={ { marginLeft: "0.25em" } } /></IonButton>
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
						><IonIcon slot="icon-only" icon={bookOutline} /></IonButton>
					</div>
					<div id="outputPaneWE" className={"largePane selectable" + (isPickingSaving ? " pickAndSave" : "")}></div>
				</div>
			</IonContent>
		</IonPage>
	);
};

export default WEOut;
