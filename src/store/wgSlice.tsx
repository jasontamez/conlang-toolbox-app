import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import blankAppState from './blankAppState';
import {
	Fifty_OneThousand,
	Five_OneHundred,
	SyllableDropoffs,
	SyllableTypes,
	Two_Fifteen,
	WGBasic,
	WGCharGroupObject,
	WGOutputTypes,
	WGState,
	WGTransformObject,
	Zero_Fifty,
	Zero_OneHundred
} from './types';
import { StateStorage } from '../components/PersistentInfo';
import debounce from '../components/Debounce';

const initialState: WGState = blankAppState.wg;

// Storage
const saveCurrentState = (state: WGState) => {
	debounce(StateStorage.setItem, ["lastStateWG", state], 1000, "savingStateWG");
};

// GROUPS
const addCharacterGroupFunc = (state: WGState, action: PayloadAction<WGCharGroupObject>) => {
	// {label, description, run, ?dropoff}
	state.characterGroups.push(action.payload);
	saveCurrentState(state);
	return state;
};
const deleteCharacterGroupFunc = (state: WGState, action: PayloadAction<WGCharGroupObject>) => {
	const { label } = action.payload;
	state.characterGroups = state.characterGroups.filter(group => group.label !== label);
	saveCurrentState(state);
	return state;
};
const editCharacterGroupFunc = (state: WGState, action: PayloadAction<{ old: WGCharGroupObject, edited: WGCharGroupObject }>) => {
	const {old, edited} = action.payload;
	const { label } = old;
	state.characterGroups = state.characterGroups.map(group => group.label === label ? edited : group);
	saveCurrentState(state);
	return state;
};
const copyCharacterGroupsFromElsewhereFunc = (state: WGState, action: PayloadAction<WGCharGroupObject[]>) => {
	const newCharacterGroups = action.payload;
	const { characterGroups } = state;
	let incoming: { [key: string]: WGCharGroupObject } = {};
	newCharacterGroups.forEach(cg => {
		incoming[cg.label!] = cg;
	});
	const final: WGCharGroupObject[] = [];
	characterGroups.forEach(cg => {
		const {label} = cg;
		// Check for replacement
		if(incoming[label!]) {
			// Use replacement
			final.push(incoming[label!]);
			delete incoming[label!];
		} else {
			// Use original
			final.push(cg);
		}
	});
	newCharacterGroups.forEach(cg => {
		const {label} = cg;
		// Only save if we haven't used this to replace an old one
		if(incoming[label!]) {
			final.push(cg);
		}
	});
	state.characterGroups = final;
	saveCurrentState(state);
	return state;
};

// SYLLABLES

const setMultipleSyllableTypesFunc = (state: WGState, action: PayloadAction<boolean>) => {
	state.multipleSyllableTypes = action.payload;
	saveCurrentState(state);
	return state;
};
const setSyllablesFunc = (state: WGState, action: PayloadAction<{ syllables: SyllableTypes, value: string }>) => {
	const { syllables, value } = action.payload;
	state[syllables] = value.replace(/(?:\s*\r?\n\s*)+/g, "\n").trim();
	saveCurrentState(state);
	return state;
};
const setSyllableOverrideFunc = (state: WGState, action: PayloadAction<{ syllables: SyllableTypes, value: Zero_Fifty | null }>) => {
	const { syllables, value } = action.payload;
	state.syllableDropoffOverrides[syllables] = value;
	saveCurrentState(state);
	return state;
};

// TRANSFORMS
const addTransformFunc = (state: WGState, action: PayloadAction<WGTransformObject>) => {
	// { id, search, replace, ?description }
	state.transforms.push(action.payload);
	saveCurrentState(state);
	return state;
};
const deleteTransformFunc = (state: WGState, action: PayloadAction<string>) => {
	const id = action.payload;
	state.transforms = state.transforms.filter(t => t.id !== id);
	saveCurrentState(state);
	return state;
};
const editTransformFunc = (state: WGState, action: PayloadAction<WGTransformObject>) => {
	const item = action.payload;
	const { id } = item;
	state.transforms = state.transforms.map(t => t.id === id ? item : t);
	saveCurrentState(state);
	return state;
};
const rearrangeTransformsFunc = (state: WGState, action: PayloadAction<WGTransformObject[]>) => {
	state.transforms = action.payload;
	saveCurrentState(state);
	return state;
};

// SETTINGS
const setMonosyllablesRateFunc = (state: WGState, action: PayloadAction<Zero_OneHundred>) => {
	state.monosyllablesRate = action.payload;
	saveCurrentState(state);
	return state;
};
const setMaxSyllablesPerWordFunc = (state: WGState, action: PayloadAction<Two_Fifteen>) => {
	state.maxSyllablesPerWord = action.payload;
	saveCurrentState(state);
	return state;
};
const setCharacterGroupDropoffFunc = (state: WGState, action: PayloadAction<Zero_Fifty>) => {
	state.characterGroupDropoff = action.payload;
	saveCurrentState(state);
	return state;
};
const setSyllableBoxDropoffFunc = (state: WGState, action: PayloadAction<Zero_Fifty>) => {
	state.syllableBoxDropoff = action.payload;
	saveCurrentState(state);
	return state;
};
const setCapitalizeSentencesFunc = (state: WGState, action: PayloadAction<boolean>) => {
	state.capitalizeSentences = action.payload;
	saveCurrentState(state);
	return state;
};
const setDeclarativeSentencePreFunc = (state: WGState, action: PayloadAction<string>) => {
	state.declarativeSentencePre = action.payload;
	saveCurrentState(state);
	return state;
};
const setDeclarativeSentencePostFunc = (state: WGState, action: PayloadAction<string>) => {
	state.declarativeSentencePost = action.payload;
	saveCurrentState(state);
	return state;
};
const setInterrogativeSentencePreFunc = (state: WGState, action: PayloadAction<string>) => {
	state.interrogativeSentencePre = action.payload;
	saveCurrentState(state);
	return state;
};
const setInterrogativeSentencePostFunc = (state: WGState, action: PayloadAction<string>) => {
	state.interrogativeSentencePost = action.payload;
	saveCurrentState(state);
	return state;
};
const setExclamatorySentencePreFunc = (state: WGState, action: PayloadAction<string>) => {
	state.exclamatorySentencePre = action.payload;
	saveCurrentState(state);
	return state;
};
const setExclamatorySentencePostFunc = (state: WGState, action: PayloadAction<string>) => {
	state.exclamatorySentencePost = action.payload;
	saveCurrentState(state);
	return state;
};
const setOutputFunc = (state: WGState, action: PayloadAction<WGOutputTypes>) => {
	state.output = action.payload;
	saveCurrentState(state);
	return state;
};
const setShowSyllableBreaksFunc = (state: WGState, action: PayloadAction<boolean>) => {
	state.showSyllableBreaks = action.payload;
	saveCurrentState(state);
	return state;
};
const setSentencesPerTextFunc = (state: WGState, action: PayloadAction<Five_OneHundred>) => {
	state.sentencesPerText = action.payload;
	saveCurrentState(state);
	return state;
};
const setCapitalizeWordsFunc = (state: WGState, action: PayloadAction<boolean>) => {
	state.capitalizeWords = action.payload;
	saveCurrentState(state);
	return state;
};
const setSortWordlistFunc = (state: WGState, action: PayloadAction<boolean>) => {
	state.sortWordlist = action.payload;
	saveCurrentState(state);
	return state;
};
const setWordlistMultiColumnFunc = (state: WGState, action: PayloadAction<boolean>) => {
	state.wordlistMultiColumn = action.payload;
	saveCurrentState(state);
	return state;
};
const setWordsPerWordlistFunc = (state: WGState, action: PayloadAction<Fifty_OneThousand>) => {
	state.wordsPerWordlist = action.payload;
	saveCurrentState(state);
	return state;
};

// STORED CUSTOM INFO
const setStoredCustomInfoFunc = (state: WGState, action: PayloadAction<any>) => {
	const { payload } = action;
	state.storedCustomInfo = payload;
	state.storedCustomIDs = Object.keys(payload);
	saveCurrentState(state);
	return state;
};

// LOAD INFO and CLEAR ALL
const loadStateFunc = (state: WGState, action: PayloadAction<WGBasic | null>) => {
	// If payload is null (or falsy), then initialState is used
	const {
		characterGroups,
		multipleSyllableTypes,
		singleWord,
		wordInitial,
		wordMiddle,
		wordFinal,
		syllableDropoffOverrides,
		transforms,
		monosyllablesRate,
		maxSyllablesPerWord,
		characterGroupDropoff,
		syllableBoxDropoff,
		capitalizeSentences,
		declarativeSentencePre,
		declarativeSentencePost,
		interrogativeSentencePre,
		interrogativeSentencePost,
		exclamatorySentencePre,
		exclamatorySentencePost
	} = action.payload || initialState;
	return {
		...state,
		characterGroups: [...characterGroups],
		multipleSyllableTypes,
		singleWord,
		wordInitial,
		wordMiddle,
		wordFinal,
		transforms: [...transforms],
		syllableDropoffOverrides: {...syllableDropoffOverrides},
		monosyllablesRate,
		maxSyllablesPerWord,
		characterGroupDropoff,
		syllableBoxDropoff,
		capitalizeSentences,
		declarativeSentencePre,
		declarativeSentencePost,
		interrogativeSentencePre,
		interrogativeSentencePost,
		exclamatorySentencePre,
		exclamatorySentencePost
	};
};


const wgSlice = createSlice({
	name: 'wg',
	initialState,
	reducers: {
		addCharGroupWG: addCharacterGroupFunc,
		deleteCharGroupWG: deleteCharacterGroupFunc,
		editCharacterGroupWG: editCharacterGroupFunc,
	// TO-DO: Import from WE
	copyCharacterGroupsFromElsewhere: copyCharacterGroupsFromElsewhereFunc,
		setMultipleSyllableTypes: setMultipleSyllableTypesFunc,
		setSyllables: setSyllablesFunc,
		setSyllableOverride: setSyllableOverrideFunc,
		addTransformWG: addTransformFunc,
		deleteTransformWG: deleteTransformFunc,
		editTransformWG: editTransformFunc,
		rearrangeTransformsWG: rearrangeTransformsFunc,
		setMonosyllablesRate: setMonosyllablesRateFunc,
		setMaxSyllablesPerWord: setMaxSyllablesPerWordFunc,
		setCharacterGroupDropoff: setCharacterGroupDropoffFunc,
		setSyllableBoxDropoff: setSyllableBoxDropoffFunc,
		setCapitalizeSentences: setCapitalizeSentencesFunc,
		setDeclarativeSentencePre: setDeclarativeSentencePreFunc,
		setDeclarativeSentencePost: setDeclarativeSentencePostFunc,
		setInterrogativeSentencePre: setInterrogativeSentencePreFunc,
		setInterrogativeSentencePost: setInterrogativeSentencePostFunc,
		setExclamatorySentencePre: setExclamatorySentencePreFunc,
		setExclamatorySentencePost: setExclamatorySentencePostFunc,
		setOutputTypeWG: setOutputFunc,
		setSyllableBreaksWG: setShowSyllableBreaksFunc,
		setSentencesPerTextWG: setSentencesPerTextFunc,
		setCapitalizeWordsWG: setCapitalizeWordsFunc,
		setSortWordlistWG: setSortWordlistFunc,
		setWordlistMulticolumnWG: setWordlistMultiColumnFunc,
		setWordsPerWordlistWG: setWordsPerWordlistFunc,
		loadStateWG: loadStateFunc,
	// TO-DO: Determine if we're keeping this
	setStoredCustomInfo: setStoredCustomInfoFunc
	}
});

export const {
	addCharGroupWG,
	deleteCharGroupWG,
	editCharacterGroupWG,
	copyCharacterGroupsFromElsewhere,
	setMultipleSyllableTypes,
	setSyllables,
	setSyllableOverride,
	addTransformWG,
	deleteTransformWG,
	editTransformWG,
	rearrangeTransformsWG,
	setMonosyllablesRate,
	setMaxSyllablesPerWord,
	setCharacterGroupDropoff,
	setSyllableBoxDropoff,
	setCapitalizeSentences,
	setDeclarativeSentencePre,
	setDeclarativeSentencePost,
	setInterrogativeSentencePre,
	setInterrogativeSentencePost,
	setExclamatorySentencePre,
	setExclamatorySentencePost,
	setOutputTypeWG,
	setSyllableBreaksWG,
	setSentencesPerTextWG,
	setCapitalizeWordsWG,
	setSortWordlistWG,
	setWordlistMulticolumnWG,
	setWordsPerWordlistWG,
	loadStateWG,
	setStoredCustomInfo
} = wgSlice.actions;

export default wgSlice.reducer;

// An equality-check function
export const equalityCheck = (stateA: WGState, stateB: WGState) => {
	if (stateA === stateB) {
		return true;
	}
	const characterGroupsA = stateA.characterGroups;
	const multipleSyllableTypesA = stateA.multipleSyllableTypes;
	const singleWordA = stateA.singleWord;
	const wordInitialA = stateA.wordInitial;
	const wordMiddleA = stateA.wordMiddle;
	const wordFinalA = stateA.wordFinal;
	const syllableDropoffOverridesA = stateA.syllableDropoffOverrides;
	const transformsA = stateA.transforms;
	const monosyllablesRateA = stateA.monosyllablesRate;
	const maxSyllablesPerWordA = stateA.maxSyllablesPerWord;
	const characterGroupDropoffA = stateA.characterGroupDropoff;
	const syllableBoxDropoffA = stateA.syllableBoxDropoff;
	const capitalizeSentencesA = stateA.capitalizeSentences;
	const declarativeSentencePreA = stateA.declarativeSentencePre;
	const declarativeSentencePostA = stateA.declarativeSentencePost;
	const interrogativeSentencePreA = stateA.interrogativeSentencePre;
	const interrogativeSentencePostA = stateA.interrogativeSentencePost;
	const exclamatorySentencePreA = stateA.exclamatorySentencePre;
	const exclamatorySentencePostA = stateA.exclamatorySentencePost;
	const outputA = stateA.output;
	const showSyllableBreaksA = stateA.showSyllableBreaks;
	const sentencesPerTextA = stateA.sentencesPerText;
	const capitalizeWordsA = stateA.capitalizeWords;
	const sortWordlistA = stateA.sortWordlist;
	const wordlistMultiColumnA = stateA.wordlistMultiColumn;
	const wordsPerWordlistA = stateA.wordsPerWordlist;
	const storedCustomInfoA = stateA.storedCustomInfo;
	// stateB
	const characterGroupsB = stateB.characterGroups;
	const multipleSyllableTypesB = stateB.multipleSyllableTypes;
	const singleWordB = stateB.singleWord;
	const wordInitialB = stateB.wordInitial;
	const wordMiddleB = stateB.wordMiddle;
	const wordFinalB = stateB.wordFinal;
	const syllableDropoffOverridesB = stateB.syllableDropoffOverrides;
	const transformsB = stateB.transforms;
	const monosyllablesRateB = stateB.monosyllablesRate;
	const maxSyllablesPerWordB = stateB.maxSyllablesPerWord;
	const characterGroupDropoffB = stateB.characterGroupDropoff;
	const syllableBoxDropoffB = stateB.syllableBoxDropoff;
	const capitalizeSentencesB = stateB.capitalizeSentences;
	const declarativeSentencePreB = stateB.declarativeSentencePre;
	const declarativeSentencePostB = stateB.declarativeSentencePost;
	const interrogativeSentencePreB = stateB.interrogativeSentencePre;
	const interrogativeSentencePostB = stateB.interrogativeSentencePost;
	const exclamatorySentencePreB = stateB.exclamatorySentencePre;
	const exclamatorySentencePostB = stateB.exclamatorySentencePost;
	const outputB = stateB.output;
	const showSyllableBreaksB = stateB.showSyllableBreaks;
	const sentencesPerTextB = stateB.sentencesPerText;
	const capitalizeWordsB = stateB.capitalizeWords;
	const sortWordlistB = stateB.sortWordlist;
	const wordlistMultiColumnB = stateB.wordlistMultiColumn;
	const wordsPerWordlistB = stateB.wordsPerWordlist;
	const storedCustomInfoB = stateB.storedCustomInfo;
	// Test simple values
	if (
		multipleSyllableTypesA !== multipleSyllableTypesB
		|| singleWordA !== singleWordB
		|| wordInitialA !== wordInitialB
		|| wordMiddleA !== wordMiddleB
		|| wordFinalA !== wordFinalB
		|| monosyllablesRateA !== monosyllablesRateB
		|| maxSyllablesPerWordA !== maxSyllablesPerWordB
		|| characterGroupDropoffA !== characterGroupDropoffB
		|| syllableBoxDropoffA !== syllableBoxDropoffB
		|| capitalizeSentencesA !== capitalizeSentencesB
		|| declarativeSentencePreA !== declarativeSentencePreB
		|| declarativeSentencePostA !== declarativeSentencePostB
		|| interrogativeSentencePreA !== interrogativeSentencePreB
		|| interrogativeSentencePostA !== interrogativeSentencePostB
		|| exclamatorySentencePreA !== exclamatorySentencePreB
		|| exclamatorySentencePostA !== exclamatorySentencePostB
		|| outputA !== outputB
		|| showSyllableBreaksA !== showSyllableBreaksB
		|| sentencesPerTextA !== sentencesPerTextB
		|| capitalizeWordsA !== capitalizeWordsB
		|| sortWordlistA !== sortWordlistB
		|| wordlistMultiColumnA !== wordlistMultiColumnB
		|| wordsPerWordlistA !== wordsPerWordlistB
	) {
		return false;
	}
	// Test character groups
	if(testIfArrayOfObjectsAreUnequal(
		characterGroupsA,
		characterGroupsB,
		["description", "label", "run", "dropoff"]
	)) {
		// At least one group was unequal
		return false;
	}
	// Test transforms
	if(testIfArrayOfObjectsAreUnequal(
		transformsA,
		transformsB,
		["id", "search", "replace", "description"])
	) {
		// At least one transform was unequal
		return false;
	}
	// Test syllableDropoffOverrides
	if(testIfArrayOfObjectsAreUnequal(
		[syllableDropoffOverridesA],
		[syllableDropoffOverridesB],
		["singleWord", "wordInitial", "wordMiddle", "wordFinal"]
	)) {
		// At least one was unequal
		return false;
	}
	// Test custom info
	if(storedCustomInfoA !== storedCustomInfoB) {
		const customA = Object.keys(storedCustomInfoA).sort().map(ci => ci + storedCustomInfoA[ci]).join(' ');
		const customB = Object.keys(storedCustomInfoB).sort().map(ci => ci + storedCustomInfoB[ci]).join(' ');
		if(customA !== customB) {
			// unequal
			return false;
		}
	}
	// Made it through everything?
	return true;
};

type Testing = WGCharGroupObject | WGTransformObject | SyllableDropoffs
const testIfArrayOfObjectsAreUnequal = (A: Testing[], B: Testing[], props: string[]) => {
	return A.length !== B.length
		|| A.some((a, i) => {
			const b = B[i];
			return (a !== b) && props.some(p => a[p as keyof Testing] !== b[p as keyof Testing]);
		});
};


// Testing if state
export const _WG: { simple: (keyof WGState)[], possiblyFalsy: (keyof WGState)[]} = {
	simple: [
		"maxSyllablesPerWord",
		"characterGroups",
		"syllableDropoffOverrides",
		"transforms",
		"output",
		"sentencesPerText",
		"wordsPerWordlist",
		"storedCustomInfo",
		"storedCustomIDs"
	],
	possiblyFalsy: [
		"monosyllablesRate",
		"characterGroupDropoff",
		"syllableBoxDropoff",
		"capitalizeSentences",
		"declarativeSentencePre",
		"declarativeSentencePost",
		"interrogativeSentencePre",
		"interrogativeSentencePost",
		"exclamatorySentencePre",
		"exclamatorySentencePost",
		"multipleSyllableTypes",
		"singleWord",
		"wordInitial",
		"wordMiddle",
		"wordFinal",
		"showSyllableBreaks",
		"capitalizeWords",
		"sortWordlist",
		"wordlistMultiColumn"
	]
};
export const checkIfWG = (possible: WGState | any): possible is WGState => {
	const check = possible as WGState;
	const { simple, possiblyFalsy } = _WG;
	return simple.every(prop => check[prop]) && possiblyFalsy.every(prop => (check[prop] !== undefined));
};
