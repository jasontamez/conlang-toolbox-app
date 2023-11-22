//import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import { cleanStateWG } from './wgSlice';
import { cleanStateWE } from './weSlice';
import { cleanStateMS } from './msSlice';
import { cleanStateDJ } from './declenjugatorSlice';
import { cleanStateConcepts } from './conceptsSlice';
import { cleanStateLexicon } from './lexiconSlice';
import { cleanStateSettings } from './settingsSlice';
import { cleanStateSortSettings } from './sortingSlice';
import { cleanStateEC } from './extraCharactersSlice';
import { setLastClean } from './internalsSlice';
import {
	CustomStorageWE,
	CustomStorageWG,
	DeclenjugatorStorage,
	LexiconStorage,
	MorphoSyntaxStorage
} from '../components/PersistentInfo';
import { VALIDATE_Lex, VALIDATE_dj, VALIDATE_ms, VALIDATE_wePreset, VALIDATE_wg } from './validators';
import blankAppState, { cleanerObject } from './blankAppState';
import { MSBool, MSNum, MSText, WECharGroupObject, WEPresetObject, WESoundChangeObject, WETransformDirection, WETransformObject } from './types';
import log from '../components/Logging';


const ensureString = (input: any, alternate: any) => typeof (input) !== "string" ? alternate : input;
const ensureNumber = (input: any, alternate: any) => (
	typeof (input) !== "number"
	|| isNaN(input)
	|| Math.round(input) !== input
	? alternate : input
);
const ensureBoolean = (input: any, alternate: any) => typeof (input) !== "boolean" ? alternate : input;

const isString = (input: any) => typeof input === "string";
const isObject = (input: any) => input && (typeof input === "object");


const interval = (
	1000 // 1000 miliseconds per second
	* 60 // 60 seconds per minute
	* 60 // 60 minutes per hour
	* 24 // 24 hours per day
);
const biggerInterval = interval * 7;

const maybeCleanState = (dispatch: Function, lastClean: number) => {
	const now = Date.now();
	// Clean Storages
	if(now - biggerInterval > lastClean) {
		// Cleaning Storage should be less frequent.
		cleanStorages(dispatch);
	}
	// Clean State
	if(now - interval > lastClean) {
		// We've cleaned today.
		return;
	}
	dispatch(cleanStateWG());
	dispatch(cleanStateWE());
	dispatch(cleanStateMS());
	dispatch(cleanStateDJ());
	dispatch(cleanStateConcepts());
	dispatch(cleanStateLexicon());
	dispatch(cleanStateSettings());
	dispatch(cleanStateSortSettings());
	dispatch(cleanStateEC());
	// Mark that we've cleaned.
	dispatch(setLastClean(now));
};

export default maybeCleanState;

type StorageInfo = [string, any][];

const cleanStorages = (dispatch: Function) => {
	const lexS: StorageInfo = [];
	const msS: StorageInfo = [];
	const wgS: StorageInfo = [];
	const weS: StorageInfo = [];
	const djS: StorageInfo = [];
	const doLog = (...args: any[]) => log(dispatch, args);
	LexiconStorage.iterate((value: any, key: string) => {
		lexS.push([key, value]);
		return; // Blank return keeps the loop going
	}).then(() => MorphoSyntaxStorage.iterate((value: any, key: string) => {
		msS.push([key, value]);
		return; // Blank return keeps the loop going
	})).then(() => CustomStorageWE.iterate((value: any, title: string) => {
		weS.push([title, value]);
		return; // Blank return keeps the loop going
	})).then(() => CustomStorageWG.iterate((value: any, title: string) => {
		wgS.push([title, value]);
		return; // Blank return keeps the loop going
	})).then(() => DeclenjugatorStorage.iterate((value: any, title: string) => {
		djS.push([title, value]);
		return; // Blank return keeps the loop going
	})).then(() => {
		// The meat of the operations
		cleanLexiconStorage(lexS, doLog);
		cleanWordGenStorage(wgS, doLog);
		cleanMorphoSyntaxStorage(msS, doLog);
		cleanWordEvolveStorage(weS, doLog);
		cleanDeclenjugatorStorage(djS, doLog);
	}).catch((reason: any) => {
		doLog("Error trying to clean storages", reason);
	});
};

const cleanLexiconStorage = (input: StorageInfo, doLog: Function) => {
	input.forEach(pair => {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const [key, obj] = pair;
		try {
			VALIDATE_Lex(obj);
		} catch(e) {
			// Invalid Lex
		}
	});
};

const cleanWordGenStorage = (input: StorageInfo, doLog: Function) => {
	input.forEach(pair => {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const [key, obj] = pair;
		try {
			VALIDATE_wg(obj);
		} catch(e) {
			// Invalid WG
		}
	});
};

const cleanWordEvolveStorage = (input: StorageInfo, doLog: Function) => {
	const parseGroups = (input: any): WECharGroupObject[] | false => {
		if(isObject(input)) {
			if(input.map && Array.isArray(input.map)) {
				const groups: WECharGroupObject[] = [];
				const ok = input.map.every((pair: any) => {
					if(Array.isArray(pair) && pair.length === 2) {
						const [label, obj] = pair;
						if(isString(label) && isObject(obj)) {
							const {title, run} = obj;
							if(isString(title) && isString(run)) {
								groups.push({
									title,
									label,
									run
								});
								return true;
							}
						}
					}
					return false;
				});
				return ok ? groups : false;
			}
		}
		return false;
	};
	const parseTransforms = (input: any): WETransformObject[] | false => {
		if(isObject(input)) {
			if(input.list && Array.isArray(input.list)) {
				const groups: WETransformObject[] = [];
				const ok = input.list.every((obj: any) => {
					const {key, seek, replace, direction, description} = obj;
					if(
						isString(key)
						&& isString(seek)
						&& isString(replace)
						&& isString(direction)
						&& isString(description)
						&& (
							["both", "double", "in", "out"].includes(direction)
						)
					) {
						groups.push({
							id: key,
							seek,
							replace,
							direction: direction as WETransformDirection,
							description
						});
						return true;
					}
					return false;
				});
				return ok ? groups : false;
			}
		}
		return false;
	};
	const parseChanges = (input: any): WESoundChangeObject[] | false => {
		if(isObject(input)) {
			if(input.list && Array.isArray(input.list)) {
				const groups: WESoundChangeObject[] = [];
				const ok = input.list.every((obj: any) => {
					const {key, seek, replace, context, anticontext, description} = obj;
					if(
						isString(key)
						&& isString(seek)
						&& isString(replace)
						&& isString(context)
						&& isString(anticontext)
						&& isString(description)
					) {
						groups.push({
							id: key,
							seek,
							replace,
							context,
							anticontext,
							description
						});
						return true;
					}
					return false;
				});
				return ok ? groups : false;
			}
		}
		return false;
	};
	input.forEach(pair => {
		const [key, obj] = pair;
		try {
			VALIDATE_wePreset(obj);
		} catch(e) {
			// Invalid WE
			if(Array.isArray(obj) && obj.length === 3) {
				const [groups, transformers, soundchanges] = obj;
				const characterGroups = parseGroups(groups);
				const transforms = parseTransforms(transformers);
				const soundChanges = parseChanges(soundchanges);
				if(characterGroups && transforms && soundChanges) {
					const final: WEPresetObject = {
						characterGroups,
						transforms,
						soundChanges
					};
					return CustomStorageWE.setItem(key, final);
				}
			}
			// If we get to this point, there's been an error
			doLog(
				"Error trying to convert WordEvolve storage to new format",
				e,
				key,
				obj
			);
		}
	});
};

const cleanMorphoSyntaxStorage = (input: StorageInfo, doLog: Function) => {
	input.forEach(pair => {
		const [key, obj] = pair;
		try {
			VALIDATE_ms(obj);
		} catch(e) {
			const newObj = blankAppState.ms;
			Object.entries(obj).forEach(([key, value]) => {
				switch(key) {
					case "id":
					case "key":
						newObj.id = ensureString(value, uuidv4());
						break;
					case "lastSave":
						newObj.lastSave = ensureNumber(value, 0);
						break;
					case "title":
					case "description":
					case "lastView":
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
						newObj[key] = ensureString(value, newObj[key]);
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
						newObj[key] = ensureBoolean(value, newObj[key]);
						break;
					case "NUM_synthesis":
					case "NUM_fusion":
					case "NUM_stemMod":
					case "NUM_suppletion":
					case "NUM_redupe":
					case "NUM_supraMod":
					case "NUM_headDepMarked":
						newObj[key] = ensureNumber(value, newObj[key]);
						break;
					case "boolStrings":
						if(Array.isArray(value)) {
							const props = cleanerObject.ms;
							const prop = ("BOOL_" + value) as MSBool;
							if(props.includes(prop)) {
								newObj[prop] = true;
							}
							// TO-DO
						}
						break;
					case "num":
						if(value && isObject(value)) {
							const props = cleanerObject.ms;
							Object.entries(value).forEach(([innerKey, innerValue]) => {
								const prop = ("NUM_" + innerKey) as MSNum;
								if(props.includes(prop)) {
									newObj[prop] = ensureNumber(innerValue, newObj[prop]);
								}
								// TO-DO
							});
						}
						break;
					case "text":
						if(value && isObject(value)) {
							const props = cleanerObject.ms;
							Object.entries(value).forEach(([innerKey, innerValue]) => {
								const prop = ("TEXT_" + innerKey) as MSText;
								if(props.includes(prop)) {
									newObj[prop] = ensureString(innerValue, newObj[prop]);
								} else if(innerKey === "case") {
									newObj.TEXT_nCase = ensureString(innerValue, newObj.TEXT_nCase);
								}
							});
						}
						break;
					case "":
				}
			});
			MorphoSyntaxStorage.setItem(key, newObj);
		}
	});
};

const cleanDeclenjugatorStorage = (input: StorageInfo, doLog: Function) => {
	input.forEach(pair => {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const [key, obj] = pair;
		try {
			VALIDATE_dj(obj);
		} catch(e) {
			// Invalid DJ - should not exist yet
		}
	});
};
