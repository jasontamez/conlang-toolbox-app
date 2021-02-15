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
	addLexiconItem,
	updateLexiconBool
} from '../../components/ReduxDucksFuncs';
import {
	caretForwardCircleOutline,
	settingsOutline,
	bookOutline,
	saveOutline
} from 'ionicons/icons';
// eslint-disable-next-line
import { $i, $q, $a } from '../../components/DollarSignExports';
import calculateCategoryReferenceRegex from '../../components/CategoryRegex';
// eslint-disable-next-line
import escapeRegexp from 'escape-string-regexp';
import { v4 as uuidv4 } from 'uuid';
import { WECategoryObject, WESoundChangeObject, WETransformObject } from '../../components/ReduxDucksTypes';
// eslint-disable-next-line
import debounce from '../../components/Debounce';
import OutputOptionsModal from './M-OutputOptions';
import '../App.css';

const WEOut = () => {
	interface fromOrTo {
		rules: (string | string[])[]
		cats: string[]
	}
	interface soundChangeModified {
		seek: fromOrTo | RegExp
		replace: string | fromOrTo
		context: (RegExp | null)[]
		anticontext: (RegExp | null)[]
		flagged: boolean
	}
	const outputPane = $i("outputPane");
	const dispatch = useDispatch();
	useIonViewDidEnter(() => {
		dispatch(changeView('we', 'input'));
	});
	const state = useSelector((state: any) => state, shallowEqual);
// eslint-disable-next-line
	const rawInput = state.wordevolveInput;
// eslint-disable-next-line
	const settings = state.appSettings;
	const settingsWE = state.wordevolveSettings;
	const modalState = state.modalState;
	const transformObject = state.wordevolveTransforms;
	const transforms: WETransformObject[] = transformObject.list;
	const transformsMap: Map<string, RegExp[]> = new Map();
	const soundChangesObject = state.wordevolveSoundChanges;
	const soundChanges: WESoundChangeObject[] = soundChangesObject.list;
	const soundChangeMap: Map<string, soundChangeModified> = new Map();
	const catMap: Map<string, WECategoryObject> = new Map(state.wordevolveCategories.map);

	const $e = (tag: string, text: string | false = false) => {
		let e: HTMLElement = document.createElement(tag);
		if (text !== false) {
			e.textContent = text;
		}
		return e;
	}
	// Go through a from/to string and check for categories and other regex stuff. Returns an object.
	const interpretFromAndTo = (str: string) => {
		var backslash = false,
			curly = false,
			square = false,
			rules: (string | string[])[] = [],
			cats: string[] = [];
		str.split("").forEach(function(q) {
			// If we previously had a backslash, add it to this element.
			if (backslash) {
				backslash = false;
				rules.push("\\" + q);
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
				rules.push(q);
			// If we discover a square brace, pause lookups until we find its end.
			} else if (q === "[") {
				square = true;
				rules.push(q);
			// If we previously had a curly brace, keep looking for its matching end.
			} else if (curly) {
				if (q === "}") {
					// Found it.
					curly = false;
				}
				rules.push(q);
			// If we discover a curly brace, pause lookups until we find its end.
			} else if (q === "{") {
				curly = true;
				rules.push(q);
			// See if we've discovered a category.
			} else if (catMap.has(q)) {
				rules.push(catMap.get(q)!.run.split(""));
				cats.push(q);
			// Otherwise, treat as plain text (and possibly regex).
			} else {
				rules.push(q);
			}
		});
		// Check for and insert missing end braces.
		if (square) {
			rules.push("]");
		}
		if (curly) {
			rules.push("}");
		}
		// rules => array of elements
		// x.cat  => array of indices of category elements
		return {
			rules: rules,
			cats: cats
		};
	};
// eslint-disable-next-line
	const reverse = (text: string) => {
		const isCombiningDiacritic = (code: number) => {
			// Make function on the prototype, available to all Strings.
			return (
				(0x0300 <= code && code <= 0x036f) || // Comb. Diacritical Marks
				(0x1ab0 <= code && code <= 0x1aff) || // Comb. Diacritical Marks Extended
				(0x1dc0 <= code && code <= 0x1dff) || // Comb. Diacritical Marks Supplement
				(0x20d0 <= code && code <= 0x20ff) || // Comb. Diacritical Marks for Symbols
				(0xfe20 <= code && code <= 0xfe2f)    // Comb. Half Marks
			);	
		};
		let output = "";
		// Loop through string from back to front.
		for (let i = text.length - 1; i >= 0; --i) {
			let width = 1,
				modI = i,
				thisI,
				thisIMinusOne;
			// If character is a combiner, move pointer (modI) one space to the left and increase the width.
			while (modI > 0 && isCombiningDiacritic(text.charCodeAt(modI))) {
				--modI;
				width++;
			}
			// Save current base character.
			thisI = text[modI];
			// Save possible emoji character.
			thisIMinusOne = text[modI - 1];
			// Check to see if we're a two-char emoji, and modify pointer and width if so.
			if (
				modI > 0 &&
				"\uDC00" <= thisI &&
				thisI <= "\uDFFF" &&
				"\uD800" <= thisIMinusOne &&
				thisIMinusOne <= "\uDBFF"
			) {
				--modI;
				width++;
			}
			// Add the character at the pointer, plus any additional characters we picked up.
			output += text.substr(modI, width);
		}
		return output;
	};
	const generateOutput = (output: HTMLElement) => {
// eslint-disable-next-line
		let text: HTMLElement[] = [];
// eslint-disable-next-line
		let type = settingsWE.output;
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
			} else {
				seek = calculateCategoryReferenceRegex(temp, catMap);
			}
			// REPLACE
			temp = change.replace;
			if(categoryFlag) {
				replace = interpretFromAndTo(temp);
			} else {
				replace = temp;
			}
			// CONTEXT
			temp = change.context.split("_");
			if(temp.length !== 2) {
				// Error. Treat as "_"
				temp = ["", ""];
			}
			if(temp[0] && temp[0][0] === "#") {
				temp[0] = calculateCategoryReferenceRegex("^" + temp[0].slice(1) + "$", catMap);
			} else if (temp[0]) {
				temp[0] = calculateCategoryReferenceRegex(temp[0] + "$", catMap);
			} else {
				temp[0] = null;
			}
			if(temp[1] && temp[1].slice(-1) === "#") {
				temp[1] = calculateCategoryReferenceRegex("^" + temp[1].slice(0, -1) + "$", catMap);
			} else if (temp[0]) {
				temp[1] = calculateCategoryReferenceRegex("^" + temp[1], catMap);
			} else {
				temp[1] = null;
			}
			context = temp;
			// ANTICONTEXT
			temp = change.anticontext.split("_");
			if(temp.length !== 2) {
				// Error. Treat as "_"
				temp = ["", ""];
			}
			if(temp[0] && temp[0][0] === "#") {
				temp[0] = calculateCategoryReferenceRegex("^" + temp[0].slice(1), catMap);
			} else if (temp[0]) {
				temp[0] = calculateCategoryReferenceRegex(temp[0], catMap);
			} else {
				temp[0] = null;
			}
			if(temp[1] && temp[1].slice(-1) === "#") {
				temp[1] = calculateCategoryReferenceRegex(temp[1].slice(0, -1) + "$", catMap);
			} else if (temp[0]) {
				temp[1] = calculateCategoryReferenceRegex(temp[1], catMap);
			} else {
				temp[1] = null;
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
		// Determine what we're making.
		/*
		if(type === "text") {
			// pseudotext
			text = generatePseudoText();
			output.style.columnWidth = "auto";
		} else if (type === "syllables") {
			// all possible syllables
			let t = getEverySyllable(settingsWE.capitalizeWords);
			// reset columns if needed
			output.style.columnWidth = settingsWE.wordlistMultiColumn ? getWidestWord(t) : "auto";
			t.forEach(bit => text.push($t(bit, "div")));
		} else {
			// wordlist
			let t = makeWordlist(settingsWE.capitalizeWords);
			// reset columns if needed
			output.style.columnWidth = settingsWE.wordlistMultiColumn ? getWidestWord(t) : "auto";
			t.forEach(bit => text.push($t(bit, "div")));
		}
		// Add to screen.
		text.forEach(bit => output.append(bit));
		*/
	};

	// Take an array of strings and apply each sound change rule to each string one at a time,
	//  then return an object where obj.words is an array of strings, and obj.info is an array
	//  of HTML elements containing information about the process.
// eslint-disable-next-line
	const changeTheWords: any = (input: string[], printrules: boolean) => {
		let changes: string[][] = input.map(i => []);
		let counter = 0;
		let output: string[] = [];
		let div,
// eslint-disable-next-line
			span;
		// Loop over every inputted word in order.
		input.forEach((original: string) => {
			let word = original;
// eslint-disable-next-line
			let changedWeMade: string[] = [];
			// Loop over the rewrite rules.
			transforms.forEach((tr: WETransformObject) => {
				// Check to see if we apply this rule.
				if (tr.direction === "both" || tr.direction === "in") {
					word = word.replace(transformsMap.get(tr.key)![0], tr.replace);
				}
			});
//export interface WESoundChangeObject {
//	key: string
//	seek: string
//	replace: string
//	context: string
//	anticontext: string
//	description: string
//}
			// Loop over every sound change in order.
			soundChanges.forEach((change: WESoundChangeObject) => {
				const modified = soundChangeMap.get(change.key)!;
// eslint-disable-next-line
				const replacing = modified.replace;
				const contx = modified.context;
				const antix = modified.anticontext;
// eslint-disable-next-line
				const rule = change.seek + "/" + change.replace + "/" + change.context + "/" + change.anticontext;
// eslint-disable-next-line
				let original = changes[counter];
				// Store what we started with here.
// eslint-disable-next-line
				let previous = word;
// eslint-disable-next-line
				let prevLength = word.length;
				if(modified.flagged) {
					// We have category matches to deal with.
					// We have category matches to deal with.
					// We have category matches to deal with.
					// We have category matches to deal with.
					// We have category matches to deal with.
					// We have category matches to deal with.
					// We have category matches to deal with.
				} else {
					// No special category match handling
					let seeking = modified.seek as RegExp;
// eslint-disable-next-line
					let replace = modified.replace as string;
					// Reset lastIndex to prevent certain errors.
					seeking.lastIndex = 0;
					let li = seeking.lastIndex;
					let m = seeking.exec(word);
					while(m !== null) {
						let okToReplace = true;
						// Hold on to the pre-match length of word.
						prevLength = word.length;
						// m is an array: [full match, ...other matches]
						// seeking.lastIndex is the point right after the match
						// Therefore: word.slice(0, seeking.lastIndex) will be everything up to and including the match
						// Make sure our match doesn't match the anticontext
						// PLI = previous value of 'li' (or 0)
						// (a) = pre match
						// (b) = post match
						// m = entire match (a)x(b)
						// LI = current value of rule.lastIndex
						// . = other character(s) that may or may not exist
						// String is this: ...PLI...(a)x(b)LI...
						// temp needs to be matched with everything up to x.
						// temp itself needs to have x appended to it.
						// Make 'pre' into the matchable string: 0 to LI - (b).
						let pre = word.slice(0, li - m[0].length);
						let post = word.slice(li);
						// We do NOT want to match the anticontext
						if(!antix.every(a => !a)) {
							if(
								(antix[0] && pre.match(antix[0]))
								|| (antix[1] && post.match(antix[1]))
							) {
								// We matched the anticontext, so forget about this.
								okToReplace = false;
							}
						}
						// We DO want to match the context
						if(okToReplace && !contx.every(c => !c)) {
							if(
								!(contx[0] && pre.match(contx[0]))
								&& !(contx[1] && post.match(contx[1]))
							) {
								// We did not the context, so forget about this.
								okToReplace = false;
							}
						}
						if(okToReplace) {
							// We can replace
							//
							//
							//
							//
						}
						if (m[0] === "" && (li === 0 || li === prevLength)) {
							// If the match didn't actually match anything, and it's at a position where it's likely
							//   to match the same nothing next time, just up and end the loop.
							m = null;
						} else {
							// Otherwise, check for more matches!
							m = seeking.exec(word);
							li = seeking.lastIndex;
						}
					}
				}
				/*
				// Attempt to apply the rules.
				change["from" + counterString].forEach(function(rule) {
					var m, li, rep, allPrevious, allAfter, prevLength, etc;
					// Reset lastIndex to prevent certain errors.
					rule.lastIndex = 0;
					// Get the matches, the new lastIndex, and the replacement expression(s).
					m = rule.exec(w);
					li = rule.lastIndex;
					rep = replacements.shift();
					// Look for matches. There may be multiple in a string.
					while (m !== null) {
						//////
						// Did we have parentheticals in the inputted change?
						if (m.length > 3) {
							// Yup. Have to handle them.
							// Save the exterior of the match.
							allPrevious = w.slice(0, li - m.shift().length) + m.shift();
							allAfter = m.pop() + w.slice(li);
							// Replace the matched interior with the correct replacement.
							w =
								allPrevious +
								w.slice(allPrevious.length - 1, li - 0).replace("", rep) +
								allAfter;
							// Change the replacement using the asked-for $replacements.
							// We count downwards so we don't accidentally replace $10 with $1's match.
							etc = m.length;
							while (etc > 0) {
								// Replace $x with the xth element of the matches.
								rep = rep.replace(RegExp("\\$" + etc.toString(), "g"), m.pop());
								// Increment counter.
								etc--;
							}
						} else {
							// No extra parentheticals.
							// Save the exterior of the match.
							allPrevious = w.slice(0, li - m[0].length) + m[1];
							allAfter = m[2] + w.slice(li);
						}
						// Replace the matched interior with the correct replacement.
						w = allPrevious + rep + allAfter;
						//////
					}
				});
				// Did we change anything? Do we need to report it?
				if (printrules && previous !== w) {
					// Create message reporting the change.
					// [rule] [arrow] [original word] [arrow] [changed to]
					output.info.push($e("span", change["rule" + counterString]));
					span = $e("span", String.fromCharCode(0x21d2));
					span.classList.add("arrow");
					output.info.push(span, $e("span", previous));
					span = $e("span", String.fromCharCode(0x2192));
					span.classList.add("arrow");
					output.info.push(span);
					span = $e("span", w);
					span.appendChild($e("br"));
					output.info.push(span);
				}
				// Increment counter.
				counter++;*/
			});
			// Loop over the transforms again.
			transforms.forEach((tr: WETransformObject) => {
				// Check to see if we apply this rule.
				if (tr.direction === "both" || tr.direction === "out") {
					word = word.replace(transformsMap.get(tr.key)![1], tr.seek);
				}
			});
			// Add the mangled word to the output list.
			//output.words.push(word);
			counter++;
		});
		// If we have saved the effects of rules, they need to be wrapped in a block.
		if (printrules) {
			div = $e("div");
			div.classList.add("soundChangeEffects");
			//div.append(...output.info);
			//output.info = [div];
		}

		// Return the output.
		return output;
}



	// // //
	// Save to Lexicon
	// // //

// eslint-disable-next-line
	const pickAndSave = () => {
		dispatch(closePopover("WGSaveToLexicon"));
		dispatch(openModal("PickAndSaveWE"));
	};
// eslint-disable-next-line
	const donePickingAndSaving = () => {
		dispatch(closeModal("PickAndSaveWE"));
	};
	let wordsToSave: string[] = [];
// eslint-disable-next-line
	const saveToLex = () => {
		let cols = state.lexicon.columns;
		let others: string[] = [];
		for(let x = 2; x <= cols; x++) {
			others.push("");
		}
		while(wordsToSave.length > 0) {
			let word: string = wordsToSave.shift()!;
			dispatch(addLexiconItem({ key: uuidv4(), columns: [word, ...others]}));
		}
		dispatch(updateLexiconBool("sorted", false));
	};
// eslint-disable-next-line
	const saveEverything = () => {
		dispatch(closePopover("WGSaveToLexicon"));
		$a(".word", /*outputPane*/).forEach((word: HTMLElement) => {
			word.textContent && wordsToSave.push(word.textContent);
		});
		saveToLex();
	};
// eslint-disable-next-line
	const maybeSaveThisWord = (el: HTMLElement) => { /*
		if(outputPane.classList.contains("pickAndSave")) {
			const CL = el.classList;
			if(!CL.contains("saved")) {
				CL.add("saved");
				el.textContent && wordsToSave.push(el.textContent!);
				debounce(saveToLex, []);
			}
		}*/
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
						event={modalState.SaveToLexicon}
						isOpen={modalState.SaveToLexicon !== undefined}
						onDidDismiss={() => dispatch(closePopover("WEOutputOptions"))}
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
						<IonButton className={"ion-margin-end ion-padding-horizontal" + (modalState.PickAndSaveWE ? "" : " hide")} id="doneSavingButton" slot="end" expand="block" strong={true} color="success" onClick={() => {}}>
							<IonIcon icon={saveOutline} style={ { marginRight: "0.5em" } } /> Done Saving
						</IonButton>
						<IonButton slot="end" style={ { fontSize: "larger" } } expand="block" strong={true} className="ion-margin-end ion-padding-horizontal" color="primary" onClick={(e: any) => { e.persist(); dispatch(openPopover('WEOutputOptions', e)); }}>
							<IonIcon icon={bookOutline} style={ { marginRight: "0.5em" } } /> Save
						</IonButton>
					</IonItem>
					<div id="outputPane" className={"largePane" + (modalState.PickAndSaveWE ? " pickAndSave" : "")}></div>
				</IonList>
			</IonContent>
		</IonPage>
	);
};

export default WEOut;
