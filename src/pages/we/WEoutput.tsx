import React from 'react';
import {
	useIonViewDidEnter,
	IonContent,
	IonPage,
	IonHeader,
	IonToolbar,
	IonMenuButton,
	IonButtons,
	IonTitle,
	IonList,
	IonButton,
	IonIcon,
	IonItem,
	IonLabel,
	IonPopover
} from '@ionic/react';
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import {
	changeView,
	openPopover,
	closePopover,
	openModal,
	closeModal,
	addDeferredLexiconItems,
	removeDeferredLexiconItem,
	setLoadingPage,
	setTemporaryInfo
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
import calculateCategoryReferenceRegex from '../../components/CategoryRegex';
import escapeRegexp from 'escape-string-regexp';
import { v4 as uuidv4 } from 'uuid';
import { WECategoryObject, WESoundChangeObject, WETransformObject } from '../../components/ReduxDucksTypes';
import { OutCard } from "./WECards";
import ModalWrap from "../../components/ModalWrap";
import OutputOptionsModal from './M-OutputOptions';
import MaybeLoadPreset from "./M-MaybeLoadWEPreset";
import ltr from '../../components/LTR';
import fireSwal from '../../components/Swal';
import { Plugins } from '@capacitor/core';
import { CustomStorageWE } from '../../components/PersistentInfo';
import ManageCustomInfoWE from './M-CustomInfoWE';

const WEOut = () => {
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
		//settings,
		settingsWE,
		modalState,
		transformObject,
		soundChangesObject,
		categoriesWE,
		//lexicon
	] = useSelector((state: any) => [
		state.wordevolveInput,
		//state.appSettings,
		state.wordevolveSettings,
		state.modalState,
		state.wordevolveTransforms,
		state.wordevolveSoundChanges,
		state.wordevolveCategories,
		//state.lexicon
	], shallowEqual);
	const transforms: WETransformObject[] = transformObject.list;
	const transformsMap: Map<string, RegExp[]> = new Map();
	const soundChanges: WESoundChangeObject[] = soundChangesObject.list;
	const soundChangeMap: Map<string, soundChangeModified> = new Map();
	const catMap: Map<string, WECategoryObject> = new Map(categoriesWE.map);

	const $e = (tag: string, text: string | false = false, classy: string[] | false = false) => {
		let e: HTMLElement = document.createElement(tag);
		if (text !== false) {
			e.textContent = text;
		}
		if(classy !== false) {
			e.classList.add(...classy);
		}
		return e;
	}
	const $t = (text: string, tag: string = "div", classy: string[] = []) => {
		let t =  document.createElement(tag);
		t.classList.add("word", ...classy);
		t.textContent = text;
		t.addEventListener("click", () => maybeSaveThisWord(t));
		return t;
	};

	const copyText = async () => {
		let copied: string[] = [];
		if(settingsWE.output === "outputOnly") {
			// Join with linebreaks
			$a(".word", outputPane).forEach((word: HTMLElement) => word.textContent && copied.push(word.textContent));
		} else if (settingsWE.output === "rulesApplied") {
			// either word arrow word or soundchange arrow word
			let input = $a("div", outputPane);
			while(input.length > 0) {
				let info = input.shift();
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
			let input = $a("div", outputPane);
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
			const { Clipboard } = Plugins;
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

	// Go through a from/to string and check for categories and other regex stuff. Returns an array.
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
			// Otherwise, treat as plain text (and possibly category or regex).
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
		// Now look for categories
		let double = uuidv4().replace(/[%!]/g,"x");
		let negate = uuidv4().replace(/[%!]/g,"x");
		// Hide %%
		fromTo.replace(/%%/g, double);
		// Category negations
		assembly = fromTo.split("!%");
		fromTo = assembly.shift() as string;
		assembly.forEach(unit => {
			let q = unit[0];
			let cat = catMap.get(q);
			if(cat !== undefined) {
				// Category found - negation, so do not make into Array
				fromTo += "[^" + cat.run + "]" + unit.slice(1);
			} else {
				// Hide !%
				fromTo += negate + unit;
			}
		});
		// Categories
		assembly = fromTo.split("%");
		rules.push(assembly.shift()!);
		assembly.forEach(unit => {
			let q = unit[0];
			let cat = catMap.get(q);
			if(cat !== undefined) {
				// Category found
				rules.push(cat.run.split(""), unit.slice(1));
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
				let d = new RegExp(escapeRegexp(double), "g");
				let n = new RegExp(escapeRegexp(negate), "g");
				rules.push(...(unit.replace(d, "%%").replace(n, "!%")).split(""));
			} else {
				// Add as Array
				rules.push(unit);
			}
		});
		return rules;
	};
	const evolveOutput = (output: HTMLElement) => {
		let outputType = settingsWE.output;
		// Clear any previous output.
		while(output.firstChild !== null) {
			output.removeChild(output.firstChild);
		}
		// Sanity check
		let err: HTMLElement[] = [];
		if(soundChanges.length < 1) {
			err.push($e("div", "You have no sound changes defined."));
		} else if (rawInput.length < 1) {
			err.push($e("div", "You have no input words to evolve."));
		}
		if(err.length > 0) {
			return output.append(...err);
		}
		// Check transforms for %Category references and update them if needed
		transforms.forEach((transformation: WETransformObject) => {
			let regex: RegExp;
			let all: RegExp[] = [];
			const props: (keyof WETransformObject)[] = ["seek", "replace"];
			props.forEach((prop: keyof WETransformObject) => {
				if(transformation[prop].indexOf("%") !== -1) {
					// Found a possibility.
					regex = calculateCategoryReferenceRegex(transformation[prop], catMap) as RegExp;
				} else {
					regex = new RegExp(transformation[prop], "g");
				}
				all.push(regex);	
			});
			transformsMap.set(transformation.key, all);
		});
		// Check sound changes for %Category references and update them if needed
		soundChanges.forEach((change: WESoundChangeObject) => {
			let seek: arrayOfStringsAndStringArrays | RegExp;
			let replace: string | arrayOfStringsAndStringArrays;
			let context: (RegExp | null)[];
			let anticontext: (RegExp | null)[];
			let categoryFlag = (change.seek.indexOf("%") !== -1) && (change.replace.indexOf("%") !== -1)
			// SEEK
			let temp: any = change.seek;
			if(categoryFlag) {
				seek = interpretFromAndTo(temp);
				if(seek.every(unit => typeof unit === "string")) {
					// No Arrays? No need for flag
					categoryFlag = false;
					seek = new RegExp(seek.join(""), "g");
				}
			} else {
				seek = calculateCategoryReferenceRegex(temp, catMap) as RegExp;
			}
			// REPLACE
			temp = change.replace;
			if(categoryFlag) {
				replace = interpretFromAndTo(temp);
				if(replace.every(unit => typeof unit === "string")) {
					// No Arrays? No need for flag
					categoryFlag = false;
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
						temp[0] = calculateCategoryReferenceRegex("^" + temp[0].slice(1) + "$", catMap);
					} else {
						temp[0] = calculateCategoryReferenceRegex(temp[0] + "$", catMap);
					}
				} else {
					temp[0] = null;
				}
				if(temp[1]) {
					let t = "^" + temp[1];
					if(t[t.length - 1] === "#") {
						temp[1] = calculateCategoryReferenceRegex(t.slice(0, -1) + "$", catMap);
					} else {
						temp[1] = calculateCategoryReferenceRegex(t, catMap);
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
						temp[0] = calculateCategoryReferenceRegex("^" + temp[0].slice(1) + "$", catMap);
					} else {
						temp[0] = calculateCategoryReferenceRegex(temp[0] + "$", catMap);
					}
				} else {
					temp[0] = null;
				}
				if(temp[1]) {
					let t = "^" + temp[1];
					if(t[t.length - 1] === "#") {
						temp[1] = calculateCategoryReferenceRegex(t.slice(0, -1) + "$", catMap);
					} else {
						temp[1] = calculateCategoryReferenceRegex(t, catMap);
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
				flagged: categoryFlag
			});
		});
		let modifiedWords = changeTheWords(rawInput);
		// Add to screen.
		const arrowLR = "⟶";
		const arrowRL = "⟵";
		const reverse = (outputType === "outputFirst");
		const arrow = (ltr(output) ? (reverse ? arrowRL : arrowLR) : (reverse ? arrowLR : arrowRL));
		let arrowDiv: HTMLElement = $e("div", arrow, ["arrow"])!;
		let style = output.style;
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
					output.append(outputType ==="inputFirst" ? $e("div", one, ["leadingWord"]) : $t(one, "div", ["leadingWord"]));
					arrow && output.append(arrowDiv.cloneNode(true));
					output.append(outputType ==="inputFirst" ? $t(two) : $e("div", two));
				});
				break;
			case "rulesApplied":
				// [original, word, [[rule, new word]...]]  	grid-template-columns: 1fr 2em 1fr;
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
		let output: any[] = [];
		// Loop over every inputted word in order.
		input.forEach((original: string) => {
			let word = original;
			// Loop over the rewrite rules.
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
					// We have category matches to deal with.
					let seeking = modified.seek as arrayOfStringsAndStringArrays;
					let replace = modified.replace as arrayOfStringsAndStringArrays;
					let seekTextBasic = "";
					let seekTextCategory = "";
					let seekCats: string[][] = [];
					let ids: [string, string][] = [];
					seeking.forEach(ss => {
						if(typeof ss === "string") {
							seekTextBasic = seekTextBasic + ss;
							seekTextCategory = seekTextCategory + ss;
						} else {
							let id = "N" + uuidv4().replace(/[^a-zA-Z0-9]/g, "");
							let ssj = ss.join("");
							seekTextBasic = seekTextBasic + "[" + ssj + "]";
							seekTextCategory = seekTextCategory + "(?<" + id + ">[" + ssj + "])";
							seekCats.push(ss as string[]);
							ids.push([id, ssj]);
						}
					});
					// seekTextBasic/Category are the bases of RegExps
					// seekCats is an array of category runs
					let basicSeek = new RegExp(seekTextBasic, "g");
					let categorySeek = new RegExp(seekTextCategory, "g");
					basicSeek.lastIndex = 0;
					categorySeek.lastIndex = 0;
					let basicMatch = basicSeek.exec(word);
					let categoryMatch = categorySeek.exec(word);
					let lastIndex = basicSeek.lastIndex;
					while(basicMatch !== null && categoryMatch !== null) {
						let okToReplace: boolean | null = true;
						// Hold on to the pre-match length of word.
						let prevLength = word.length;
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
						let pre = word.slice(0, basicMatch.index);
						let post = word.slice(basicMatch.index + basicMatch[0].length);
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
							let g = categoryMatch.groups || {};
							replace.forEach(rr => {
								if(typeof rr === "string") {
									replaceText = replaceText + rr;
								} else {
									let [id, run] = ids[i];
									i++;
									let ind = run.indexOf(g[id]);
									if(ind < 0) {
										ind = 0;
									}
									replaceText = replaceText + rr[ind % rr.length];
								}
							});
							let newseek = new RegExp(escapeRegexp(pre) + seekTextBasic);
							let newreplace = pre.replace(/\$/g, "\\$") + replaceText;
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
							categoryMatch = categorySeek.exec(word);
						}
					}
				} else {
					// No special category match handling
					let seeking = modified.seek as RegExp;
					let replace = modified.replace as string;
					// Reset lastIndex to prevent certain errors.
					seeking.lastIndex = 0;
					let m = seeking.exec(word);
					let lastIndex = seeking.lastIndex;
					while(m !== null) {
						let okToReplace: boolean | null = true;
						// Hold on to the pre-match length of word.
						let prevLength = word.length;
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
						let pre = word.slice(0, m.index);
						let post = word.slice(m.index + m[0].length);
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
				// Check to see if we apply this rule.
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
		dispatch(closePopover("WESaveToLexicon"));
		dispatch(openModal("PickAndSaveWE"));
	};
	const donePickingAndSaving = () => {
		dispatch(closeModal("PickAndSaveWE"));
	};
	let wordsToSave: string[] = [];
	const saveEverything = () => {
		dispatch(closePopover("WESaveToLexicon"));
		$a(".word", outputPane).forEach((word: HTMLElement) => {
			word.textContent && wordsToSave.push(word.textContent);
		});
		dispatch(addDeferredLexiconItems(wordsToSave));
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


	// // //
	// Save Custom Info
	// // //

	const openCustomInfoModal = () => {
		let titles: string[] = [];
		CustomStorageWE.iterate((value, title) => {
			titles.push(title);
			return; // Blank return keeps the loop going
		}).then(() => {
			dispatch(setTemporaryInfo({ type: "custominfoWE", data: titles }));
			dispatch(setLoadingPage(false));
			dispatch(openModal("ManageCustomInfoWE"));
		}).catch((err) => {
			console.log(err);
		});
		dispatch(setLoadingPage("loadingCustomInfo"));
	};
	return (
		<IonPage>
			<OutputOptionsModal />
			<MaybeLoadPreset />
			<ManageCustomInfoWE />
			<ModalWrap pageInfo={viewInfo} content={OutCard} />
			<IonHeader>
				<IonToolbar>
					 <IonButtons slot="start">
						 <IonMenuButton />
					 </IonButtons>
					<IonTitle>Output</IonTitle>
					<IonButtons slot="end">
						<IonButton onClick={() => dispatch(openModal("InfoModal"))}>
							<IonIcon icon={helpCircleOutline} />
						</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen>
				<IonPopover
			        {/*cssClass='my-custom-class'*/ ...""}
					event={modalState.WESaveToLexicon}
					isOpen={modalState.WESaveToLexicon !== undefined}
					onDidDismiss={() => dispatch(closePopover("WESaveToLexicon"))}
				>
					<IonList lines="none">
						<IonItem button={true} onClick={() => saveEverything()}>
							<IonLabel className="ion-text-wrap">Save everything</IonLabel>
						</IonItem>
						<IonItem button={true} onClick={() => pickAndSave()}>
							<IonLabel className="ion-text-wrap">Choose what to save</IonLabel>
						</IonItem>
					</IonList>
				</IonPopover>
				<IonList className="fullScreen" lines="none">
					<IonItem className="collapse">
						<div>
							<IonButton
								className="ion-margin-horizontal"
								onClick={() => dispatch(openModal("WEPresetPopup"))}
								color="primary"
								strong={true}
							><IonIcon icon={duplicateOutline} slot="start" /> Load Preset</IonButton>
							<IonButton
								onClick={() => openCustomInfoModal()}
								color="tertiary"
								strong={true}
							>Save/Load Custom Info</IonButton>
						</div>
					</IonItem>
					<IonItem className="collapse">
						<div>
							<div>
								<IonButton
									style={ { fontSize: "1.35rem", padding: "0.5rem 0", minHeight: "3.25rem" } }
									className="ion-margin-horizontal"
									strong={true}
									expand="block"
									color="success"
									onClick={() => evolveOutput(outputPane)}
								>Evolve <IonIcon icon={caretForwardCircleOutline} style={ { marginLeft: "0.25em" } } /></IonButton>
								<IonButton
									expand="block"
									strong={false}
									className="ion-margin-end"
									color="tertiary"
									onClick={() => dispatch(openModal("WEOutputOptions"))}
								><IonIcon slot="icon-only" icon={settingsOutline} /></IonButton>
							</div>
							<div>
								<IonButton
									expand="block"
									strong={false}
									className="ion-margin-end"
									color="secondary"
									onClick={() => copyText()}
								><IonIcon icon={copyOutline} style={ { marginRight: "0.5em" } } /> Copy All</IonButton>
								<IonButton
									className={modalState.PickAndSaveWE ? "" : "hide"}
									id="doneSavingButton"
									expand="block"
									strong={false}
									color="success"
									onClick={() => donePickingAndSaving()}
								><IonIcon icon={saveOutline} style={ { marginRight: "0.5em" } } /> Done Saving</IonButton>
								<IonButton
									className={modalState.PickAndSaveWE ? "hide" : ""}
									expand="block"
									strong={false}
									color="primary"
									onClick={(e: any) => { e.persist(); dispatch(openPopover('WESaveToLexicon', e)); }}
								><IonIcon icon={bookOutline} style={ { marginRight: "0.5em" } } /> Save</IonButton>
							</div>
						</div>
					</IonItem>
					<div id="outputPaneWE" className={"largePane selectable" + (modalState.PickAndSaveWE ? " pickAndSave" : "")}></div>
				</IonList>
			</IonContent>
		</IonPage>
	);
};

export default WEOut;
