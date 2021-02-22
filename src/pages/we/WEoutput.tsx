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
	addDeferredLexiconItems
} from '../../components/ReduxDucksFuncs';
import {
	caretForwardCircleOutline,
	settingsOutline,
	bookOutline,
	saveOutline
} from 'ionicons/icons';
import { $i, $a } from '../../components/DollarSignExports';
import calculateCategoryReferenceRegex from '../../components/CategoryRegex';
import escapeRegexp from 'escape-string-regexp';
import { v4 as uuidv4 } from 'uuid';
import { WECategoryObject, WESoundChangeObject, WETransformObject } from '../../components/ReduxDucksTypes';
import OutputOptionsModal from './M-OutputOptions';
import '../App.css';

const WEOut = () => {
	//interface fromOrTo {
	//	rules: (string | string[])[]
	//	cats: string[]
	//}
	type fromOrTo = (string | string[])[];
	interface soundChangeModified {
		seek: fromOrTo | RegExp
		replace: string | fromOrTo
		context: (RegExp | null)[]
		anticontext: (RegExp | null)[]
		flagged: boolean
	}
	const outputPane = $i("outputPaneWE");
	const dispatch = useDispatch();
	useIonViewDidEnter(() => {
		dispatch(changeView('we', 'output'));
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

	// Go through a from/to string and check for categories and other regex stuff. Returns an object.
	const interpretFromAndTo = (input: string) => {
		var rules: (string | string[])[] = [],
			assembly: (string | string[])[] = [],
			fromTo = "",
			//cats: string[] = [],
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
		let double = uuidv4().replace(/%/g,"!");
		let negate = uuidv4().replace(/%/g,"!");
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
	const generateOutput = (output: HTMLElement) => {
		let outputType = settingsWE.output;
		// Clear any previous output.
		while(output.firstChild !== null) {
			output.removeChild(output.firstChild);
		}
		// Sanity check
		if(soundChanges.length < 1) {
			output.append($e("div", "You have no sound changes defined."));
			return;
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
			let seek: fromOrTo | RegExp;
			let replace: string | fromOrTo;
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
		let arrow: string = getArrow(output, settingsWE.arrow, outputType === "outputFirst");
		let arrowDiv: HTMLElement = $e("div", "");
		if(arrow) {
			arrowDiv = $e("div", arrow, ["arrow"])!;
		}
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
				const SPACE = String.fromCharCode(160);
				modifiedWords.forEach(unit => {
					let div = $e("div", unit.shift() + SPACE + arrow + SPACE);
					div.append($t(unit.shift(), "span"));
					output.append(div);
					let arrowMinor = arrow || getArrow(output, "double", settingsWE.out === "outputFirst");
					unit.shift()!.forEach((bit: string[]) => {
						const [rule, to] = bit;
						output.append($e("div", rule + " " + arrowMinor + " " + to, ["ruleExplanation"]));
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
				if (tr.direction === "both" || tr.direction === "in") {
					word = word.replace(transformsMap.get(tr.key)![0], tr.replace);
				}
			});
			// Loop over every sound change in order.
			soundChanges.forEach((change: WESoundChangeObject) => {
				const modified = soundChangeMap.get(change.key)!;
				const contx = modified.context;
				const antix = modified.anticontext;
				const rule = change.seek + "➜" + change.replace + "/" + change.context + (change.anticontext ? "/" + change.anticontext : "");
				let previous = word;
				if(modified.flagged) {
					// We have category matches to deal with.
					let seeking = modified.seek as fromOrTo;
					let replace = modified.replace as fromOrTo;
					let seekText1 = "";
					let seekText2 = "";
					let seekCats: string[][] = [];
					let seekRule: string[] = [];
					//seeking.rules.forEach(ss => {
					seeking.forEach(ss => {
						if(typeof ss === "string") {
							seekText1 += ss;
							seekText2 += ss;
							seekRule.push(ss);
						} else {
							seekText1 += "[" + ss.join("") + "]";
							seekText2 += "([" + ss.join("") + "])";
							seekCats.push(ss as string[]);
						}
					});
					// seekText1/2 are the bases of RegExps
					// seekCats is an array of category runs
					// seekRule is an array of the original rule
					let s1 = new RegExp(seekText1, "g");
					s1.lastIndex = 0;
					let m1 = s1.exec(word);
					let s2 = new RegExp(seekText2, "g");
					let m2 = s2.exec(word);
					let lastIndex = s1.lastIndex;
					while(m1 !== null && m2 !== null) {
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
						let pre = lastIndex > 1 ? word.slice(0, lastIndex - 1) : "";
						let post = word.slice(lastIndex - 1 + m1[0].length);
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
							let c = m1.length - 1;
							//let repCopy = replace.rules.map(r => (typeof r === "string") ? r : [...r]);
							let repCopy = replace.map(r => (typeof r === "string") ? r : [...r]);
							let seekCopy = seekCats.map(r => (typeof r === "string") ? r : [...r]);
							let replText = "";
							while(seekCopy.length > 0) {
								let cat1 = seekCopy.pop();
								let rep1 = repCopy.pop();
								while(typeof rep1 === "string") {
									replText = rep1 + replText;
									rep1 = repCopy.pop();
								}
								// replace the nth member of category1 with the nth member of category2
								let pos = cat1!.indexOf(m1[c]);
								replText = rep1![pos % rep1!.length] + replText;
							}
							// Finish assembling the replacement text
							while(repCopy.length > 0) {
								replText = repCopy.pop() + replText;
							}
							// Look for parenthetical matches and apply them
							if(m1.length > 1) {
								let c = m1.length;
								while(c > 0) {
									replText = replText.replace("$" + String(c), m1[c]);
									c--;
								}
							}
							// Replace found text with replacement text
							word = pre + replText + post;
							s1.lastIndex = s2.lastIndex = (pre.length + replText.length);
						}
						if(m1[0] === "" && (lastIndex === 0 || lastIndex === prevLength)) {
							// If the match didn't actually match anything, and it's at a position where it's likely
							//   to match the same nothing next time, just up and end the loop.
							m1 = m2 = null;
						} else {
							// Otherwise, check for more matches!
							m1 = s1.exec(word);
							lastIndex = s1.lastIndex;
							m2 = s2.exec(word);
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
						let pre = lastIndex > 1 ? word.slice(0, lastIndex - 1) : "";
						let post = word.slice(lastIndex - 1 + m[0].length);
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
				if (tr.direction === "both" || tr.direction === "out") {
					word = word.replace(transformsMap.get(tr.key)![1], tr.seek);
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
	const getArrow = (element: HTMLElement, arrow: string, reverse = false) => {
		const style = window.getComputedStyle(element);
		const direction = style.direction === "ltr" ? reverse : !reverse;
		const which = direction ? 1 : 0;
		switch(arrow) {
			case "simple":
				return["→","←"][which];
			case "tailed":
				return["↣","↢"][which];
			case "stroked":
				return["⇸","⇷"][which];
			case "doubleStroke":
				return["⇻","⇺"][which];
			case "paired":
				return["⇉","⇇"][which];
			case "triplet":
				return["⇶","⬱"][which];
			case "double":
				return["⇒","⇐"][which];
			case "triple":
				return["⇛","⇚"][which];
			case "dashed":
				return["⇢","⇠"][which];
			case "open":
				return["⇾","⇽"][which];
			case "thick":
				return["⇨","⇦"][which];
		}
		return "";
	};



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
			const CL = el.classList;
			if(!CL.contains("saved")) {
				CL.add("saved");
				el.textContent && dispatch(addDeferredLexiconItems([el.textContent!]));
			}
		}
	};
	return (
		<IonPage>
			<OutputOptionsModal />
			<IonHeader>
				<IonToolbar>
					 <IonButtons slot="start">
						 <IonMenuButton />
					 </IonButtons>
					<IonTitle>Output</IonTitle>
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
					<IonItem className="collapse ion-text-wrap">
						<IonButton expand="block" strong={false} className="ion-margin-start ion-padding-horizontal" color="tertiary" onClick={() => dispatch(openModal("WEOutputOptions"))}><IonIcon slot="icon-only" icon={settingsOutline} /></IonButton>
						<IonButton style={ { fontSize: "larger" } } expand="block" strong={true} color="primary" onClick={() => generateOutput(outputPane)}>
							Generate <IonIcon icon={caretForwardCircleOutline} style={ { marginLeft: "0.25em" } } />
						</IonButton>
						<IonButton className={"ion-margin-end ion-padding-horizontal" + (modalState.PickAndSaveWE ? "" : " hide")} id="doneSavingButton" slot="end" expand="block" strong={true} color="success" onClick={() => donePickingAndSaving()}>
							<IonIcon icon={saveOutline} style={ { marginRight: "0.5em" } } /> Done Saving
						</IonButton>
						<IonButton slot="end" style={ { fontSize: "larger" } } expand="block" strong={true} className="ion-margin-end ion-padding-horizontal" color="primary" onClick={(e: any) => { e.persist(); dispatch(openPopover('WESaveToLexicon', e)); }}>
							<IonIcon icon={bookOutline} style={ { marginRight: "0.5em" } } /> Save
						</IonButton>
					</IonItem>
					<div id="outputPaneWE" className={"largePane" + (modalState.PickAndSaveWE ? " pickAndSave" : "")}></div>
				</IonList>
			</IonContent>
		</IonPage>
	);
};

export default WEOut;
