import { compare } from "compare-versions";
import { ImportExportObject } from "./types";

const notObject = (input: any) => {
	return !input || typeof(input) === "object" || Array.isArray(input);
};
const notString = (input: any) => typeof (input) !== "string";
const notNumber = (input: any) => typeof (input) !== "number" || isNaN(input) || Math.round(input) !== input;
const notBoolean = (input: any) => typeof (input) !== "boolean";
const notArray = (input: any) => !Array.isArray(input);
const notArrayOf = (input: any, func: Function) => notArray(input) || input.some((item: any) => func(item));

const invalidCharGroupObject = (object: any, flag = false) => {
	if(notObject(object)) {
		return true;
	}
	let requiredProperties = 0;
	const test = Object.entries(object).some(([key, value]) => {
		switch(key) {
			case "title":
			case "label":
			case "run":
				requiredProperties++;
				return notString(value);
			case "dropoffOverride":
				return flag || notNumber(value) || (value as number) < 0 || (value as number) > 50;
		}
		return true;
	});
	return test || requiredProperties !== 3;
};
const invalidDropoffObject = (object: any) => {
	if(notObject(object)) {
		return true;
	}
	const pairs = Object.entries(object);
	return (pairs.length !== 4 || pairs.some(([key, value]) => {
		if(value !== null && notNumber(value) && ((value as number) < 0 || (value as number) > 50)) {
			return true;
		}
		switch(key) {
			case "singleWord":
			case "wordInitial":
			case "wordMiddle":
			case "wordFinal":
				return false;
		}
		return true;
	}))
};
const invalidTransformObject = (object: any, flag = false) => {
	if(notObject(object)) {
		return true;
	}
	let requiredProperties = 0;
	const test = Object.entries(object).some(([key, value]) => {
		switch(key) {
			case "id":
			case "seek":
			case "replace":
			case "description":
				requiredProperties++;
				return notString(value);
			case "direction":
				requiredProperties++;
				return (
					notString(value)
					|| (
						value !== "both"
						&& value !== "in"
						&& value !== "out"
						&& value !== "double"
					)
				);
		}
		return true;
	});
	return test || requiredProperties !== (flag ? 5 : 4);
};

const invalidWGState = (object: any, preset: boolean = false) => {
	let error = "";
	if(notObject(object)) {
		error = "301: Invalid WordGen State object";
	} else {
		const pairs = Object.entries(object);
		const base = preset ? 20 : 27;
		if(pairs.length < base) {
			error = "302: WordGen State object seems to be missing"
				+ ` ${base - pairs.length} propert${pairs.length === (base - 1) ? "y" : "ies"}`;
		} else if (pairs.length > base) {
			error = "303: WordGen State object seems to have"
				+ ` ${pairs.length - base} extra propert${pairs.length === (base + 1) ? "y" : "ies"}`;
		} else {
			while(!error && pairs.length > 0) {
				const [key, value] = pairs.shift()!
				let flag = false;
				switch (key) {
					case "monosyllablesRate":
						flag = (notNumber(value) || (value as number) < 0 || (value as number) > 100);
						break;
					case "maxSyllablesPerWord":
						flag = (notNumber(value) || (value as number) < 2 || (value as number) > 15);
						break;
					case "sentencesPerText":
						flag = (preset || notNumber(value) || (value as number) < 5 || (value as number) > 100);
						break;
					case "wordsPerWordlist":
						flag = (preset || notNumber(value) || (value as number) < 50 || (value as number) > 1000);
						break;
					case "characterGroupDropoff":
					case "syllableBoxDropoff":
						flag = (notNumber(value) || (value as number) < 0 || (value as number) > 50);
						break;
					case "declarativeSentencePre":
					case "declarativeSentencePost":
					case "interrogativeSentencePre":
					case "interrogativeSentencePost":
					case "exclamatorySentencePre":
					case "exclamatorySentencePost":
					case "singleWord":
					case "wordInitial":
					case "wordMiddle":
					case "wordFinal":
						if(notString(value)) {
							flag = true;
						}
						break;
					case "customSort":
						if(notString(value) && value !== null) {
							flag = true;
						}
						break;
					case "output":
						if(
							preset
							|| notString(value)
							|| (
								value !== "text"
								&& value !== "wordlist"
								&& value !== "syllables"
							)
						) {
							flag = true;
						}
						break;
					case "capitalizeSentences":
					case "multipleSyllableTypes":
						flag = notBoolean(value);
						break;
					case "showSyllableBreaks":
					case "capitalizeWords":
					case "sortWordlist":
					case "wordlistMultiColumn":
						flag = preset || notBoolean(value);
						break;
					case "characterGroups":
						flag = notArrayOf(value, invalidCharGroupObject);
						break;
					case "syllableDropoffOverrides":
						flag = invalidDropoffObject(value);
						break;
					case "transforms":
						flag = notArrayOf(value, invalidTransformObject);
						break;
					default:
						flag = true;
				}
				if(flag) {
					error = `304: WordGen State has invalid property "${key}"`;
				}
			}
		}
	}
	return error || false;
};

const invalidSoundChangeObject = (object: any) => {
	if(notObject(object)) {
		return true;
	}
	let requiredProperties = 0;
	const test = Object.entries(object).some(([key, value]) => {
		switch(key) {
			case "id":
			case "seek":
			case "replace":
			case "description":
			case "context":
			case "anticontext":
				requiredProperties++;
				return notString(value);
		}
		return true;
	});
	return test || requiredProperties !== 6;
};
const invalidWEState = (object: any, preset: boolean = false) => {
	let error = "";
	if(notObject(object)) {
		error = "401: Invalid WordEvolve State object";
	} else {
		const pairs = Object.entries(object);
		if(pairs.length < 8) {
			error = "402: WordEvolve State object seems to be missing"
				+ ` ${8 - pairs.length - 8} propert${pairs.length === 7 ? "y" : "ies"}`;
		} else if (pairs.length > 8) {
			error = "403: WordEvolve State object seems to have"
				+ ` ${pairs.length - 8} extra propert${pairs.length === 9 ? "y" : "ies"}`;
		} else {
			while(!error && pairs.length > 0) {
				const [key, value] = pairs.shift()!
				let flag = false;
				switch (key) {
					case "input":
						flag = preset || notString(value);
						break;
					case "customSort":
						flag = preset || (notString(value) && value !== null);
						break;
					case "outputStyle":
						flag = (
							preset
							|| notString(value)
							|| (
								value !== "outputOnly"
								&& value !== "rulesApplied"
								&& value !== "inputFirst"
								&& value !== "outputFirst"
							)
						);
						break;
					case "inputLower":
					case "inputAlpha":
						flag = preset || notBoolean(value);
						break;
					case "characterGroups":
						flag = notArray(value) || (value as any[]).some(obj => invalidCharGroupObject(obj, true))
						break;
					case "transforms":
						flag = notArray(value) || (value as any[]).some(obj => invalidTransformObject(obj, true));
						break;
					case "soundChanges":
						flag = notArrayOf(value, invalidSoundChangeObject);
						break;
					default:
						flag = true;
				}
				if(flag) {
					error = `404: WordEvolve State has invalid property "${key}"`;
				}
			}
		}
	}
	return error || false;
};

const invalidMSState = (object: any) => {
	let error = "";
	if(notObject(object)) {
		error = "501: Invalid MorphoSyntax State object";
	} else {
		let requiredProperties = 0;
		const pairs = Object.entries(object);
		while(!error && pairs.length > 0) {
			const [key, value] = pairs.shift()!
			let flag = false;
			switch (key) {
				case "id":
				case "lastSave":
				case "title":
				case "description":
				case "lastView":
					requiredProperties++;
				// eslint-disable-next-line no-fallthrough
				case "TEXT_tradTypol":
				case "TEXT_morphProcess":
				case "TEXT_headDepMark":
				case "TEXT_propNames":
				case "TEXT_possessable":
				case "TEXT_countMass":
				case "TEXT_pronounAnaphClitic":
				case "TEXT_semanticRole":
				case "TEXT_verbClass":
				case "TEXT_verbStructure":
				case "TEXT_propClass":
				case "TEXT_quantifier":
				case "TEXT_numeral":
				case "TEXT_adverb":
				case "TEXT_mainClause":
				case "TEXT_verbPhrase":
				case "TEXT_nounPhrase":
				case "TEXT_adPhrase":
				case "TEXT_compare":
				case "TEXT_questions":
				case "TEXT_COType":
				case "TEXT_compounding":
				case "TEXT_denoms":
				case "TEXT_nNumberOpt":
				case "TEXT_nNumberObl":
				case "TEXT_nCase":
				case "TEXT_articles":
				case "TEXT_demonstratives":
				case "TEXT_possessors":
				case "TEXT_classGender":
				case "TEXT_dimAug":
				case "TEXT_predNom":
				case "TEXT_predLoc":
				case "TEXT_predEx":
				case "TEXT_predPoss":
				case "TEXT_ergative":
				case "TEXT_causation":
				case "TEXT_applicatives":
				case "TEXT_dativeShifts":
				case "TEXT_datOfInt":
				case "TEXT_possessRaising":
				case "TEXT_refls":
				case "TEXT_recips":
				case "TEXT_passives":
				case "TEXT_inverses":
				case "TEXT_middleCon":
				case "TEXT_antiP":
				case "TEXT_objDemOmInc":
				case "TEXT_verbNoms":
				case "TEXT_verbComp":
				case "TEXT_tense":
				case "TEXT_aspect":
				case "TEXT_mode":
				case "TEXT_locDirect":
				case "TEXT_evidence":
				case "TEXT_miscVerbFunc":
				case "TEXT_pragFocusEtc":
				case "TEXT_negation":
				case "TEXT_declaratives":
				case "TEXT_YNQs":
				case "TEXT_QWQs":
				case "TEXT_imperatives":
				case "TEXT_serialVerbs":
				case "TEXT_complClauses":
				case "TEXT_advClauses":
				case "TEXT_clauseChainEtc":
				case "TEXT_relClauses":
				case "TEXT_coords":
					flag = notString(value);
					break;
				case "BOOL_prefixMost":
				case "BOOL_prefixLess":
				case "BOOL_suffixMost":
				case "BOOL_suffixLess":
				case "BOOL_circumfixMost":
				case "BOOL_circumfixLess":
				case "BOOL_infixMost":
				case "BOOL_infixLess":
				case "BOOL_actions":
				case "BOOL_actionProcesses":
				case "BOOL_weather":
				case "BOOL_states":
				case "BOOL_involuntaryProcesses":
				case "BOOL_bodyFunctions":
				case "BOOL_motion":
				case "BOOL_position":
				case "BOOL_factive":
				case "BOOL_cognition":
				case "BOOL_sensation":
				case "BOOL_emotion":
				case "BOOL_utterance":
				case "BOOL_manipulation":
				case "BOOL_otherVerbClass":
				case "BOOL_lexVerb":
				case "BOOL_lexNoun":
				case "BOOL_lexVN":
				case "BOOL_lexVorN":
				case "BOOL_adjectives":
				case "BOOL_baseFive":
				case "BOOL_baseTen":
				case "BOOL_baseTwenty":
				case "BOOL_baseOther":
				case "BOOL_numGL":
				case "BOOL_numLG":
				case "BOOL_numNone":
				case "BOOL_multiNumSets":
				case "BOOL_inflectNum":
				case "BOOL_APV":
				case "BOOL_AVP":
				case "BOOL_PAV":
				case "BOOL_PVA":
				case "BOOL_VAP":
				case "BOOL_VPA":
				case "BOOL_preP":
				case "BOOL_postP":
				case "BOOL_circumP":
				case "BOOL_numSing":
				case "BOOL_numDual":
				case "BOOL_numTrial":
				case "BOOL_numPaucal":
				case "BOOL_numPlural":
				case "BOOL_classGen":
				case "BOOL_classAnim":
				case "BOOL_classShape":
				case "BOOL_classFunction":
				case "BOOL_classOther":
				case "BOOL_dimAugYes":
				case "BOOL_dimAugObligatory":
				case "BOOL_dimAugProductive":
				case "BOOL_nomAcc":
				case "BOOL_ergAbs":
				case "BOOL_markInv":
				case "BOOL_markDirInv":
				case "BOOL_verbAgreeInv":
				case "BOOL_wordOrderChange":
				case "BOOL_tenseMorph":
				case "BOOL_aspectMorph":
				case "BOOL_modeMorph":
				case "BOOL_otherMorph":
				case "BOOL_chainFirst":
				case "BOOL_chainLast":
				case "BOOL_chainN":
				case "BOOL_chainV":
				case "BOOL_chainCj":
				case "BOOL_chainT":
				case "BOOL_chainA":
				case "BOOL_chainPer":
				case "BOOL_chainNum":
				case "BOOL_chainOther":
				case "BOOL_relPre":
				case "BOOL_relPost":
				case "BOOL_relInternal":
				case "BOOL_relHeadless":
				case "BOOL_coordMid":
				case "BOOL_coordTwo":
				case "BOOL_coordLast":
					flag = notBoolean(value);
					break;
				case "NUM_synthesis":
				case "NUM_fusion":
					flag = notNumber(value) || (value as number) < 0 || (value as number) > 10;
					break;
				case "NUM_stemMod":
				case "NUM_suppletion":
				case "NUM_redupe":
				case "NUM_supraMod":
				case "NUM_headDepMarked":
				default:
					flag = notNumber(value) || (value as number) < 0 || (value as number) > 4;
					flag = true;
			}
			if(flag) {
				error = `504: MorphoSyntax State has invalid property "${key}"`;
			}
		}
		if(!error && requiredProperties < 5) {
			error = "502: MorphoSyntax State object is missing"
				+ ` ${5 - requiredProperties} propert${requiredProperties === 4 ? "y" : "ies"}`;
		}
	}
	return error || false;
};

const invalidDeclenjugation = (object: any) => {
	if(notObject(object)) {
		return true;
	}
	let requiredProperties = 0;
	const test = Object.entries(object).some(([key, value]) => {
		switch(key) {
			case "id":
			case "title":
				requiredProperties++;
			// eslint-disable-next-line no-fallthrough
			case "prefix":
			case "suffix":
				return notString(value);
			case "useWholeWord":
				requiredProperties++;
				return notBoolean(value);
			case "regex":
				return notArrayOf(value, notString) || (value as any[]).length !== 2;
		}
		return true;
	});
	return test || requiredProperties !== 3;
};
const invalidDJGroup = (object: any) => {
	if(notObject(object)) {
		return true;
	}
	let requiredProperties = 0;
	const test = Object.entries(object).some(([key, value]) => {
		switch(key) {
			case "title":
			case "appliesTo":
			case "id":
				requiredProperties++;
				return notString(value);
			case "separator":
				requiredProperties++;
				return notString(value) || !(
					value === ","
					|| value === ";"
					|| value === " "
					|| value === "/"
				);
			case "startsWith":
			case "endsWith":
				requiredProperties++;
				return notArrayOf(value, notString);
			case "declenjugations":
				requiredProperties++;
				return notArrayOf(value, invalidDeclenjugation);
			case "regex":
				return notArrayOf(value, notString) || (value as any[]).length !== 2;
		}
		return true;
	});
	return test || requiredProperties !== 7;
};
const invalidDJState = (object: any, preset: boolean = false) => {
	let error = "";
	if(notObject(object)) {
		error = "601: Invalid Declenjugator State object";
	} else {
		const pairs = Object.entries(object);
		const target = preset ? 3 : 4;
		if(pairs.length < target) {
			error = "602: Declenjugator State object seems to be missing"
				+ ` ${target - pairs.length} propert${(pairs.length) === (target - 1) ? "y" : "ies"}`;
		} else if (pairs.length > 4) {
			error = "603: Declenjugator State object seems to have"
				+ ` ${pairs.length - target} extra propert${pairs.length === (target + 1) ? "y" : "ies"}`;
		} else {
			while(!error && pairs.length > 0) {
				const [key, value] = pairs.shift()!
				let flag = false;
				switch (key) {
					case "input":
						flag = preset || notString(value);
						break;
					case "declensions":
					case "conjugations":
					case "other":
						flag = notArrayOf(value, invalidDJGroup);
						break;
					default:
						flag = true;
				}
				if(flag) {
					error = `604: Declenjugator State has invalid property "${key}"`;
				}
			}
		}
	}
	return error || false;
};

const invalidSettings = (object: any, flag: boolean) => {
	let error = "";
	if(notObject(object)) {
		error = "201: Invalid Settings object";
	} else {
		const max = (flag ? 2 : 3);
		const pairs = Object.entries(object);
		if(pairs.length < max) {
			error = "202: Settings object seems to be missing"
				+ ` ${max - pairs.length} propert${(max - pairs.length) === 1 ? "y" : "ies"}`;
		} else if (pairs.length > max) {
			error = "203: Settings object seems to have"
				+ ` ${pairs.length - max} extra propert${(pairs.length - max) === 1 ? "y" : "ies"}`;
		} else {
			while(!error && pairs.length > 0) {
				const [key, value] = pairs.shift()!
				let flag = false;
				switch (key) {
					case "input":
						flag = notString(value) || !(
							value === "Default"
							|| value === "Dark"
							|| value === "Light"
							|| value === "Solarized Dark"
							|| value === "Solarized Light"
						);
						break;
					case "disableConfirms":
						flag = notBoolean(value);
						break;
					case "currentSort":
						flag = value !== null && notString(value);
						break;
					default:
						flag = true;
				}
				if(flag) {
					error = `204: Settings has invalid property "${key}"`;
				}
			}
		}
	}
	return error || false;
};

const invalidLexColumn = (object: any) => {
	const pairs = Object.entries(object);
	if(pairs.length !== 3) {
		return true;
	}
	return pairs.some(([key, value]) => {
		switch(key) {
			case "id":
			case "label":
				return notString(value);
			case "size":
				return value !== "s" && value !== "m" && value !== "l";
		}
		return true;
	});
};
const checkLexObjectInvalidity = (object: any, cols: number | null) => {
	let columns = cols;
	if(notObject(object)) {
		return true;
	}
	const pairs = Object.entries(object);
	if(pairs.length !== 2) {
		return true;
	} else if (pairs.some(([key, value]) => {
		if(key === "id") {
			return notString(value);
		} else if (key !== "columns" || notArray(value)) {
			return true;
		}
		if(columns === null) {
			columns = (value as any[]).length;
		} else if ((value as any[]).length !== columns) {
			return true;
		}
		return (value as any[]).some(str => notString(str));
	})) {
		return true;
	}
	if(cols !== columns) {
		return columns;
	}
	return false;
};
const invalidLexiconState = (object: any, v: string) => {
	let error = "";
	const tenFlag = compare(v, "0.10.0", "<");
	if(notObject(object)) {
		error = "701: Invalid Lexicon State object";
	} else {
		let requiredProperties = 0;
		let foundColumns: number | null = null;
		const pairs = Object.entries(object);
		while(!error && pairs.length > 0) {
			const [key, value] = pairs.shift()!
			let flag = false;
			switch (key) {
				case "id":
				case "title":
				case "description":
					requiredProperties++;
				// eslint-disable-next-line no-fallthrough
				case "fontType":
					flag = notString(value);
					break;
				case "blankSorts":
					if(compare(v, "0.9.5", "<")) {
						flag = true;
					} else {
						requiredProperties++;
						flag = (
							value !== "alphaFirst"
							&& value !== "alphaLast"
							&& value !== "first"
							&& value !== "last"
						);
					}
					break;
				case "lexicon":
					requiredProperties++;
					const result = checkLexObjectInvalidity(value, foundColumns);
					if(result === true) {
						flag = true;
					} else if (result !== false) {
						foundColumns = result;
					}
					break;
				case "truncateColumns":
				case "sortDir":
					requiredProperties++;
					flag = notBoolean(value);
					break;
				case "lastSave":
					requiredProperties++;
					flag = notNumber(value);
					break;
				case "sortPattern":
					requiredProperties++;
					if(notArrayOf(value, notNumber)) {
						flag = true;
					} else if (foundColumns === null) {
						foundColumns = (value as number[]).length;
					} else if (foundColumns !== (value as number[]).length) {
						error = `Expected ${foundColumns} columns but encountered ${(value as number[]).length} in "${key}"`;
						continue;
					}
					break;
				case "columns":
					requiredProperties++;
					if(notArrayOf(value, invalidLexColumn)) {
						flag = true;
					} else if (foundColumns === null) {
						foundColumns = (value as any[]).length;
					} else if (foundColumns !== (value as any[]).length) {
						error = `Expected ${foundColumns} columns but encountered ${(value as any[]).length} in "${key}"`;
						continue;
					}
					break;
				case "customSort":
					requiredProperties++;
					flag = tenFlag || (value !== undefined && notString(value));
					break;
				default:
					flag = true;
			}
			if(flag) {
				error = `704: Lexicon State has invalid property "${key}"`;
			}
		}
		tenFlag && requiredProperties--;
		if(!error && requiredProperties < 10) {
			error = "702: Lexicon State object is missing"
				+ ` ${10 - requiredProperties} propert${(requiredProperties - 10) === 1 ? "y" : "ies"}`;
		}
	}
	return error || false;
};

const invalidWordListsState = (object: any) => {
	let error = "";
	if(notObject(object)) {
		error = "801: Invalid Concepts State object";
	} else {
		const pairs = Object.entries(object);
		if(pairs.length < 2) {
			error = "802: Concepts State object seems to be missing"
				+ ` ${2 - pairs.length} propert${pairs.length === 1 ? "y" : "ies"}`;
		} else if (pairs.length > 2) {
			error = "803: Concepts State object seems to have"
				+ ` ${pairs.length - 2} extra propert${(pairs.length === 3) ? "y" : "ies"}`;
		} else if (pairs.some(([key, value]) => {
			switch(key) {
				case "centerTheDisplayedWords":
					return notArray(value)
						|| ((value as any[]).length === 1 && (value as any[])[0] !== "center")
						|| (value as any[]).length > 0;
				case "listsDisplayed":
					if(notObject(value)) {
						return true;
					}
					return value && Object.keys(value).some(key => {
						return ![
							"asjp",
							"lj",
							"sy",
							"d",
							"s100",
							"s207",
							"ssl"
						].includes(key)
					});
			}
			return true;
		})) {
			error = `804: Concepts State has at least one invalid property`;
		}
	}
	return error || false;
};

const invalidConceptsState = (object: any) => {
	let error = "";
	if(notObject(object)) {
		error = "801: Invalid Concepts State object";
	} else {
		let requiredProperties = 0;
		const pairs = Object.entries(object);
		while(!error && pairs.length > 0) {
			const [key, value] = pairs.shift()!
			let flag = false;
			switch (key) {
				case "id":
				case "word":
					requiredProperties++;
					flag = notString(value);
					break;
				case "asjp":
				case "lj":
				case "d":
				case "sy":
				case "s100":
				case "s201":
				case "ssl":
				case "l200":
					flag = notBoolean(value);
					break;
				default:
					flag = true;
			}
			if(flag) {
				error = `804: Concepts State has invalid property "${key}"`;
			}
		}
		if(!error && requiredProperties < 2) {
			error = "802: Concepts State object is missing"
				+ ` ${2 - requiredProperties} propert${requiredProperties === 1 ? "y" : "ies"}`;
		}
	}
	return error || false;
};

const invalidECState = (object: any) => {
	let error = "";
	if(notObject(object)) {
		error = "210: Invalid Extra Characters State object";
	} else {
		const pairs = Object.entries(object);
		if(pairs.length < 5) {
			error = "212: Extra Characters State object seems to be missing"
				+ ` ${5 - pairs.length} propert${pairs.length === 4 ? "y" : "ies"}`;
		} else if(pairs.length > 5) {
			error = "213: Extra Characters State object seems to have"
				+ ` ${pairs.length - 5} extra propert${pairs.length === 6 ? "y" : "ies"}`;
		}
		while(!error && pairs.length > 0) {
			const [key, value] = pairs.shift()!
			let flag = false;
			switch (key) {
				case "toCopy":
					flag = notString(value);
					break;
				case "copyImmediately":
				case "showNames":
					flag = notBoolean(value);
					break;
				case "faves":
					break;
				case "nowShowing":
					break;
				default:
					flag = true;
			}
			if(flag) {
				error = `214: Extra Characters State has invalid property "${key}"`;
			}
		}
	}
	return error || false;
};

const invalidSortSubObject = (object: any) => {
	let both = 0;
	let rel = 0;
	let eq = 0;
	const test = Object.entries(object).some(([key, value]) => {
		switch (key) {
			case "id":
			case "base":
				both++;
				return notString(value);
			case "separator":
				both++;
				return value !== ""
					&& value !== ","
					&& value !== ";"
					&& value !== " "
					&& value !== ".";
			case "pre":
			case "post":
				rel += 2;
				eq--;
			// eslint-disable-next-line no-fallthrough
			case "equals":
				eq++;
				return notArrayOf(value, notString);
		}
		return true;
	});
	return test || both !== 3 || !((rel === 2 && eq === 0) || (eq === 1 && rel === 0));
};
const invalidSortObject = (object: any) => {
	if(notObject(object)) {
		return true;
	}
	const pairs = Object.entries(object);
	let requiredProperties = 0;
	const test = pairs.some(([key, value]) => {
		switch(key) {
			case "id":
			case "title":
				requiredProperties++;
			// eslint-disable-next-line no-fallthrough
			case "sortLanguage":
				return notString(value);
			case "sensitivity":
				return value !== "base"
					&& value !== "accent"
					&& value !== "case"
					&& value !== "variant";
			case "customAlphabet":
			case "multiples":
				return notArrayOf(value, notString);
			case "customizations":
				return notObject(value) || invalidSortSubObject(value);
		}
		return true;
	});
	return test || requiredProperties !== 2;
};
const invalidSortingState = (object: any) => {
	let error = "";
	if(notObject(object)) {
		error = "220: Invalid Sort Settings object";
	} else {
		let requiredProperties = 0;
		const pairs = Object.entries(object);
		while(!error && pairs.length > 0) {
			const [key, value] = pairs.shift()!
			let flag = false;
			switch (key) {
				case "defaultCustomSort":
				case "sortLanguage":
					flag = notString(value);
					break;
				case "sensitivity":
					requiredProperties++;
					flag = value !== "base"
						&& value !== "accent"
						&& value !== "case"
						&& value !== "variant";
					break;
				case "customSorts":
					flag = notArrayOf(value, invalidSortObject);
					break;
				default:
					flag = true;
			}
			if(flag) {
				error = `224: Sort Settings has invalid property "${key}"`;
			}
		}
		if(!error && requiredProperties < 2) {
			error = "222: Sort Settings object is missing"
				+ ` ${2 - requiredProperties} propert${requiredProperties === 1 ? "y" : "ies"}`;
		}
	}
	return error || false;
};

const invalidWGStorage = (object: any) => {
	if(notArray(object)) {
		return "901.1: invalid WordGen storage property"
	}
	const pairs = [...object as any[]];
	let error: string | false = false;
	while(!error && pairs.length > 0) {
		const [label, obj] = pairs.shift()!;
		if(notString(label)) {
			error = "911.1: invalid WordGen storage object label"
		} else if (notObject(obj)) {
			error = "912.1: invalid WordGen storage object";
		} else {
			const result = invalidWGState(object, true);
			error = result && result.replace(/^3([0-9][0-9]):(.+?)WordGen State/, "9$1.1$2WordGen storage");
		}
	}
	return error || false;
};

const invalidWEStorage = (object: any) => {
	if(notArray(object)) {
		return "901.2: invalid WordEvolve storage property"
	}
	const pairs = [...object as any[]];
	let error: string | false = false;
	while(!error && pairs.length > 0) {
		const [label, obj] = pairs.shift()!;
		if(notString(label)) {
			error = "911.2: invalid WordEvolve storage object label"
		} else if (notObject(obj)) {
			error = "912.2: invalid WordEvolve storage object";
		} else {
			const result = invalidWEState(object, true);
			error = result && result.replace(/^4([0-9][0-9]):(.+?)WordEvolve State/, "9$1.2$2WordEvolve storage");
		}
	}
	return error || false;
};

const invalidMSStorage = (object: any) => {
	if(notArray(object)) {
		return "901.3: invalid MorphoSyntax storage property"
	}
	const pairs = [...object as any[]];
	let error: string | false = false;
	while(!error && pairs.length > 0) {
		const [label, obj] = pairs.shift()!;
		if(notString(label)) {
			error = "911.3: invalid MorphoSyntax storage object label"
		} else if (notObject(obj)) {
			error = "912.3: invalid MorphoSyntax storage object";
		} else {
			const result = invalidMSState(object);
			error = result && result.replace(/^5([0-9][0-9]):(.+?)MorphoSyntax State/, "9$1.3$2MorphoSyntax storage");
		}
	}
	return error || false;
};

const invalidDJStorage = (object: any) => {
	if(notArray(object)) {
		return "901.5: invalid Declenjugator storage property"
	}
	const pairs = [...object as any[]];
	let error: string | false = false;
	while(!error && pairs.length > 0) {
		const [label, obj] = pairs.shift()!;
		if(notString(label)) {
			error = "911.5: invalid Declenjugator storage object label"
		} else if (notObject(obj)) {
			error = "912.5: invalid Declenjugator storage object";
		} else {
			const result = invalidDJState(object, true);
			error = result && result.replace(/^6([0-9][0-9]):(.+?)Declenjugator State/, "9$1.5$2Declenjugator storage");
		}
	}
	return error || false;
};

const invalidLexStorage = (object: any) => {
	if(notArray(object)) {
		return "901.4: invalid Lexicon storage property"
	}
	const pairs = [...object as any[]];
	let error: string | false = false;
	while(!error && pairs.length > 0) {
		const [label, obj] = pairs.shift()!;
		if(notString(label)) {
			error = "911.4: invalid Lexicon storage object label"
		} else if (notObject(obj)) {
			error = "912.4: invalid Lexicon storage object";
		} else {
			const result = invalidWGState(object, true);
			error = result && result.replace(/^7([0-9][0-9]):(.+?)Lexicon State/, "9$1.4$2Lexicon storage");
		}
	}
	return error || false;
};

const invalidOldStorageObject = (object: any) => {
	if(notObject(object)) {
		return "901.0: invalid Storage property"
	}
	const pairs = Object.entries(object);
	if(pairs.length < 5) {
		return "912.0: Storage object seems to be missing"
			+ ` ${5 - pairs.length} propert${pairs.length === 4 ? "y" : "ies"}`;
	} else if(pairs.length > 5) {
		return "913.0: Storage object seems to have"
			+ ` ${pairs.length - 5} extra propert${pairs.length === 6 ? "y" : "ies"}`;
	}
	let error: string | false = false;
	pairs.some(([key, value]) => {
		switch(key) {
			case "lex":
				error = invalidLexStorage(value);
				break;
			case "wg":
				error = invalidWGStorage(value);
				break;
			case "we":
				error = invalidWEStorage(value);
				break;
			case "mx":
				error = invalidMSStorage(value);
				break;
			default:
				error = `902.0: Storage has invalid property "${key}"`;
		}
		return error;
	});
	return error;
};

export const validVersions = [
	"0.9.1",
	"0.9.2",
	"0.9.3",
	"0.9.4",
	"0.9.5",
	"0.10.0",
	"0.10.1",
	"0.11.0"
];
// Error codes:
// 100 general
// 200 appSettings, sortSettings, extraCharacters
// 300 WG
// 400 WE
// 500 MS
// 600 DJ
// 700 Lexicon
// 800 Concepts
// 900 storages
export function validateImport (
	object: ImportExportObject
): asserts object is ImportExportObject {
	let error: string | false = false;
	const v = object && object.currentVersion;
	if(notString(v)) {
		error = "110: currentVersion is missing or invalid";
	} else if (!validVersions.includes(v)) {
		error = `111: currentVersion "${v}" is not supported`;
	} else {
		Object.entries(object).some(([key, value]) => {
			if (key === "wg") {
				error = invalidWGState(value);
			} else if (key === "we") {
				error = invalidWEState(value);
			} else if (key === "ms") {
				error = invalidMSState(value);
			} else if (key === "dj") {
				if(compare(v, "0.11.0", "<")) {
					error = `109: unexpected property "dj"`;
				} else {
					error = invalidDJState(value);
				}
			} else if (key === "appSettings") {
				error = invalidSettings(value, compare(v, "0.10.0", "<"));
			} else if (key === "lexicon") {
				error = invalidLexiconState(value, v);
			} else if (key === "concepts" && compare(v, "0.9.4", ">")) {
				error = invalidConceptsState(value);
			} else if (key === "wordLists" && compare(v, "0.9.5", "<")) {
				error = invalidWordListsState(value);
			} else if (key === "ec") {
				error = invalidECState(value);
			} else if (key === "sortSettings") {
				error = invalidSortingState(value);
			} else if (key === "storages" && compare(v, "0.11.0", "<")) {
				error = invalidOldStorageObject(value);
			} else if (key === "wgStored" && compare(v, "0.11.0", ">=")) {
				error = invalidWGStorage(value);
			} else if (key === "weStored" && compare(v, "0.11.0", ">=")) {
				error = invalidWEStorage(value);
			} else if (key === "msStored" && compare(v, "0.11.0", ">=")) {
				error = invalidMSStorage(value);
			} else if (key === "djStored" && compare(v, "0.11.0", ">=")) {
				error = invalidDJStorage(value);
			} else if (key === "lexStored" && compare(v, "0.11.0", ">=")) {
				error = invalidLexStorage(value);
			} else {
				error = `105: invalid property "${key}"`;
			}
			return error;
		});
	}
	if(error) {
		throw new TypeError(`ERROR ${error}`);
	}
};
