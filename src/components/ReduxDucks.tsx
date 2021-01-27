// constants (actions)
const p = "conlangs-toolbox/reducer/";
const ADD_CATEGORY = p+"ADD_CATEGORY";
const START_EDIT_CATEGORY = p+"START_EDIT_CATEGORY";
const CANCEL_EDIT_CATEGORY = p+"CANCEL_EDIT_CATEGORY";
const DO_EDIT_CATEGORY = p+"DO_EDIT_CATEGORY";
const DELETE_CATEGORY = p+"DELETE_CATEGORY";
const TOGGLE_MODAL = p+"TOGGLE_MODAL";
const TOGGLE_SYLLABLES = p+"TOGGLE_SYLLABLES";
const EDIT_SYLLABLES = p+"EDIT_SYLLABLES";
const ADD_REWRITE_RULE = p+"ADD_REWRITE_RULE";
const START_EDIT_REWRITE_RULE = p+"START_EDIT_REWRITE_RULE";
const CANCEL_EDIT_REWRITE_RULE = p+"CANCEL_EDIT_REWRITE_RULE";
const DO_EDIT_REWRITE_RULE = p+"DO_EDIT_REWRITE_RULE";
const DELETE_REWRITE_RULE = p+"DELETE_REWRITE_RULE";
const REORDER_REWRITE_RULE = p+"REORDER_REWRITE_RULE";
const SET_MONO_RATE = p+"SET_MONO_RATE";
const SET_MAX_SYLLABLES = p+"SET_MAX_SYLLABLES";
const SET_CATEGORY_DROPOFF = p+"SET_CATEGORY_DROPOFF";
const SET_SYLLABLE_DROPOFF = p+"SET_SYLLABLE_DROPOFF";
const SET_OUTPUT = p+"SET_OUTPUT";
const SET_SYLLABLE_BREAKS = p+"SET_SYLLABLE_BREAKS";
const SET_NUMBER_OF_SENTENCES = p+"SET_NUMBER_OF_SENTENCES";
const SET_DECLARATIVE_PRE = p+"SET_DECLARATIVE_PRE";
const SET_DECLARATIVE_POST = p+"SET_DECLARATIVE_POST";
const SET_INTERROGATIVE_PRE = p+"SET_INTERROGATIVE_PRE";
const SET_INTERROGATIVE_POST = p+"SET_INTERROGATIVE_POST";
const SET_EXCLAMATORY_PRE = p+"SET_EXCLAMATORY_PRE";
const SET_EXCLAMATORY_POST = p+"SET_EXCLAMATORY_POST";
const SET_WORD_CAPITALIZATION = p+"SET_WORD_CAPITALIZATION";
const SET_WORDLIST_MULTICOLUMN = p+"SET_WORDLIST_MULTICOLUMN";

// helper functions and such
export type Zero_OneHundred = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31 | 32 | 33 | 34 | 35 | 36 | 37 | 38 | 39 | 40 | 41 | 42 | 43 | 44 | 45 | 46 | 47 | 48 | 49 | 50 | 51 | 52 | 53 | 54 | 55 | 56 | 57 | 58 | 59 | 60 | 61 | 62 | 63 | 64 | 65 | 66 | 67 | 68 | 69 | 70 | 71 | 72 | 73 | 74 | 75 | 76 | 77 | 78 | 79 | 80 | 81 | 82 | 83 | 84 | 85 | 86 | 87 | 88 | 89 | 90 | 91 | 92 | 93 | 94 | 95 | 96 | 97 | 98 | 99 | 100;
export type Two_Fifteen = 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15;
export type Zero_Fifty = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31 | 32 | 33 | 34 | 35 | 36 | 37 | 38 | 39 | 40 | 41 | 42 | 43 | 44 | 45 | 46 | 47 | 48 | 49 | 50;
export type Five_OneHundred = 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31 | 32 | 33 | 34 | 35 | 36 | 37 | 38 | 39 | 40 | 41 | 42 | 43 | 44 | 45 | 46 | 47 | 48 | 49 | 50 | 51 | 52 | 53 | 54 | 55 | 56 | 57 | 58 | 59 | 60 | 61 | 62 | 63 | 64 | 65 | 66 | 67 | 68 | 69 | 70 | 71 | 72 | 73 | 74 | 75 | 76 | 77 | 78 | 79 | 80 | 81 | 82 | 83 | 84 | 85 | 86 | 87 | 88 | 89 | 90 | 91 | 92 | 93 | 94 | 95 | 96 | 97 | 98 | 99 | 100;
export type OutputTypes = "text" | "wordlist" | "syllables";

export interface WGCategoryObject {
	title: string
	label: string
	run: string
	dropoffOverride?: Zero_OneHundred
	rateOverride?: Zero_OneHundred[]
}
// id: unique id
// title: short description
// label: 1 letter
// run: letters in this category
// dropoffOverride: optional percentage that a given letter will be chosen
// rateOverride: optional list of percentages for each letter

interface WGCategoryStateObject {
	list: WGCategoryObject[]
	map: any
	editing: null | string
}

interface WGSyllableObject {
	components: string[]
	rateOverride?: Zero_OneHundred[]
}

export interface WGSyllableStateObject {
	toggle: boolean
	objects: {
		singleWord: WGSyllableObject
		wordInitial: WGSyllableObject
		wordMiddle: WGSyllableObject
		wordFinal: WGSyllableObject
	}
}

export interface WGRewriteRuleObject {
	key: string
	seek: string
	replace: string
	description: string
}

interface WGRewriteRuleStateObject {
	list: WGRewriteRuleObject[]
	editing: null | string
}

interface WGSettingsObject {
	monosyllablesRate: Zero_OneHundred
	maxSyllablesPerWord: Two_Fifteen
	categoryRunDropoff: Zero_Fifty
	syllableBoxDropoff: Zero_Fifty
	output?: OutputTypes
	showSyllableBreaks?: boolean
	sentencesPerText?: Five_OneHundred
	declarativeSentencePre: string
	declarativeSentencePost: string
	interrogativeSentencePre: string
	interrogativeSentencePost: string
	exclamatorySentencePre: string
	exclamatorySentencePost: string
	capitalizeWords?: boolean
	wordlistMultiColumn?: boolean
}

interface ModalStateObject {
	AddCategory: boolean
	EditCategory: boolean
	AddRewriteRule: boolean
	EditRewriteRule: boolean
}

interface StateObject {
	categories: WGCategoryStateObject
	syllables: WGSyllableStateObject
	rewriteRules: WGRewriteRuleStateObject
	wordgenSettings: WGSettingsObject
	modalState: ModalStateObject
}

let startingRules = [
	{
		key: "1",
		seek: "S",
		replace: "sh",
		description: ""
	},
	{
		key: "2",
		seek: "T",
		replace: "th",
		description: "dental fricatives"
	},
	{
		key: "3",
		seek: "C",
		replace: "ch",
		description: ""
	},
];

let startingCategories = [
	{
		title: "Consonants",
		label: "C",
		run: "ptknmrf"
	},
	{
		title: "Vowels",
		label: "V",
		run: "eaiou"
	}
];

let startingSyllables = [
	"CV",
	"CVC",
	"VC",
	"V"
];

const initialState: StateObject = {
	categories: {
		list: startingCategories,
		map: new Map([["C", startingCategories[0]], ["V", startingCategories[1]]]),
		editing: null
	},
	syllables: {
		toggle: false,
		objects: {
			singleWord: { components: startingSyllables },
			wordInitial: { components: [] },
			wordMiddle: { components: [] },
			wordFinal: { components: [] }
		}
	},
	rewriteRules: {
		list: startingRules,
		editing: null
	},
	wordgenSettings: {
		monosyllablesRate: 20,
		maxSyllablesPerWord: 6,
		categoryRunDropoff: 30,
		syllableBoxDropoff: 25,
		output: "text",
		showSyllableBreaks: false,
		sentencesPerText: 30,
		declarativeSentencePre: "",
		declarativeSentencePost: ".",
		interrogativeSentencePre: "",
		interrogativeSentencePost: "?",
		exclamatorySentencePre: "",
		exclamatorySentencePost: "!",
		capitalizeWords: false,
		wordlistMultiColumn: true	
	},
	modalState: {
		AddCategory: false,
		EditCategory: false,
		AddRewriteRule: false,
		EditRewriteRule: false
	}
};

interface ReduxAction {
	type: string,
	payload?: any
}

const reduceCategory = (original: WGCategoryStateObject, cats: WGCategoryObject[] = original.list) => {
	let list: WGCategoryObject[] = [];
	let map: any[] = cats.map((c) => {
		let o: WGCategoryObject = {...c};
		if(o.rateOverride) {
			o.rateOverride = [...o.rateOverride];
		}
		list.push(o);
		return [o.label, o];
	});
	return {
		...original,
		list: list,
		map: new Map(map),
		editing: original.editing
	};
};
const reduceSyllables = (original: WGSyllableStateObject) => {
	const oo = original.objects;
	return {
		toggle: original.toggle,
		objects: {
			singleWord: reduceSubSyllables(oo.singleWord),
			wordInitial: reduceSubSyllables(oo.wordInitial),
			wordMiddle: reduceSubSyllables(oo.wordMiddle),
			wordFinal: reduceSubSyllables(oo.wordFinal)
		}
	};
};
const reduceSubSyllables = (original: WGSyllableObject) => {
	let o: WGSyllableObject = {
		components: [...original.components]
	}
	if(original.rateOverride) {
		o.rateOverride = [...original.rateOverride];
	}
	return o;
};
const reduceRewriteRulesState = (original: WGRewriteRuleStateObject, mod: string = "", rule: any = null) => {
	// mod = 'add' -> add new rule (object)
	// mod = 'del' -> delete rule (key)
	// mod = 'edit' -> replace rule (object)
	// mod = '' -> do nothing
	let list;
	switch (mod) {
		case 'add':
			list = original.list.map(rr => reduceRewriteRules(rr));
			list.push(rule);
			break;
		case 'del':
			list = original.list.filter(rr => rr.key !== rule).map(rr => reduceRewriteRules(rr));
			break;
		case 'edit':
			list = original.list.map(rr => rr.key === rule.key ? rule : reduceRewriteRules(rr));
			break;
		default:
			list = original.list.map(rr => reduceRewriteRules(rr));
	}
	return {
		list: list,
		editing: original.editing
	};
};
const reduceRewriteRules = (original: WGRewriteRuleObject) => {
	return {
		...original
	};
};
const reduceModalState = (original: ModalStateObject) => {
	return {...original};
};


// reducer
export function reducer(state = initialState, action: ReduxAction) {
	const payload = action.payload;
	let CO: WGCategoryStateObject;
	let newCategories: WGCategoryStateObject;
	let SO: WGSyllableStateObject;
	let RO: WGRewriteRuleStateObject;
	switch(action.type) {
		// Category
		case ADD_CATEGORY:
			CO = state.categories;
			newCategories = reduceCategory(CO, CO.list.concat(payload));
			newCategories.map.set(payload.label, payload);
			// make new object, copy props from state, overwrite prop(s) with new object with new payload
			return {
				...state,
				categories: newCategories,
				syllables: reduceSyllables(state.syllables),
				rewriteRules: reduceRewriteRulesState(state.rewriteRules),
				wordgenSettings: { ...state.wordgenSettings },
				modalState: reduceModalState(state.modalState)
			};
		case START_EDIT_CATEGORY:
			CO = state.categories;
			newCategories = reduceCategory(CO);
			newCategories.editing = payload;
			return {
				...state,
				categories: newCategories,
				syllables: reduceSyllables(state.syllables),
				rewriteRules: reduceRewriteRulesState(state.rewriteRules),
				wordgenSettings: { ...state.wordgenSettings },
				modalState: reduceModalState(state.modalState)
			};
		case DO_EDIT_CATEGORY:
			CO = state.categories;
			newCategories = reduceCategory(CO, CO.list.map(o => o.label === CO.editing ? payload : o));
			return {
				...state,
				categories: newCategories,
				syllables: reduceSyllables(state.syllables),
				rewriteRules: reduceRewriteRulesState(state.rewriteRules),
				wordgenSettings: { ...state.wordgenSettings },
				modalState: reduceModalState(state.modalState)
			};
		case CANCEL_EDIT_CATEGORY:
			CO = state.categories;
			newCategories = reduceCategory(CO);
			newCategories.editing = null;
			return {
				...state,
				categories: newCategories,
				syllables: reduceSyllables(state.syllables),
				rewriteRules: reduceRewriteRulesState(state.rewriteRules),
				wordgenSettings: { ...state.wordgenSettings },
				modalState: reduceModalState(state.modalState)
			};
		case DELETE_CATEGORY:
			CO = state.categories;
			newCategories = reduceCategory(CO, CO.list.filter(o => o.label !== payload));
			return {
				...state,
				categories: newCategories,
				syllables: reduceSyllables(state.syllables),
				rewriteRules: reduceRewriteRulesState(state.rewriteRules),
				wordgenSettings: { ...state.wordgenSettings },
				modalState: reduceModalState(state.modalState)
			};
		// Syllables
		case TOGGLE_SYLLABLES:
			SO = reduceSyllables(state.syllables);
			SO.toggle = !SO.toggle;
			return {
				...state,
				syllables: SO,
				categories: reduceCategory(state.categories),
				rewriteRules: reduceRewriteRulesState(state.rewriteRules),
				wordgenSettings: { ...state.wordgenSettings },
				modalState: reduceModalState(state.modalState)
			};
		case EDIT_SYLLABLES:
			SO = reduceSyllables(state.syllables);
			SO.objects[payload.key as keyof WGSyllableStateObject["objects"]].components = payload.syllables;
			return {
				...state,
				syllables: SO,
				categories: reduceCategory(state.categories),
				rewriteRules: reduceRewriteRulesState(state.rewriteRules),
				wordgenSettings: { ...state.wordgenSettings },
				modalState: reduceModalState(state.modalState)
			};
		// Rewrite Rules
		case ADD_REWRITE_RULE:
			RO = reduceRewriteRulesState(state.rewriteRules, 'add', payload);
			return {
				...state,
				categories: reduceCategory(state.categories),
				syllables: reduceSyllables(state.syllables),
				rewriteRules: RO,
				wordgenSettings: { ...state.wordgenSettings },
				modalState: reduceModalState(state.modalState)
			};
		case START_EDIT_REWRITE_RULE:
			RO = reduceRewriteRulesState(state.rewriteRules);
			RO.editing = payload;
			return {
				...state,
				categories: reduceCategory(state.categories),
				syllables: reduceSyllables(state.syllables),
				rewriteRules: RO,
				wordgenSettings: { ...state.wordgenSettings },
				modalState: reduceModalState(state.modalState)
			};
		case DO_EDIT_REWRITE_RULE:
			RO = reduceRewriteRulesState(state.rewriteRules, 'edit', payload);
			return {
				...state,
				categories: reduceCategory(state.categories),
				syllables: reduceSyllables(state.syllables),
				rewriteRules: RO,
				wordgenSettings: { ...state.wordgenSettings },
				modalState: reduceModalState(state.modalState)
			};
		case CANCEL_EDIT_REWRITE_RULE:
			RO = reduceRewriteRulesState(state.rewriteRules);
			RO.editing = null;
			return {
				...state,
				categories: reduceCategory(state.categories),
				syllables: reduceSyllables(state.syllables),
				rewriteRules: RO,
				wordgenSettings: { ...state.wordgenSettings },
				modalState: reduceModalState(state.modalState)
			};
		case DELETE_REWRITE_RULE:
			RO = reduceRewriteRulesState(state.rewriteRules, 'del', payload);
			return {
				...state,
				categories: reduceCategory(state.categories),
				syllables: reduceSyllables(state.syllables),
				rewriteRules: RO,
				wordgenSettings: { ...state.wordgenSettings },
				modalState: reduceModalState(state.modalState)
			};
		case REORDER_REWRITE_RULE:
			let SRR = state.rewriteRules;
			let map = new Map(SRR.list.map(rr => [rr.key, rr]));
			RO = {
				list: payload.map((key: string) => map.get(key)),
				editing: SRR.editing
			};
			return {
				...state,
				categories: reduceCategory(state.categories),
				syllables: reduceSyllables(state.syllables),
				rewriteRules: RO,
				wordgenSettings: { ...state.wordgenSettings },
				modalState: reduceModalState(state.modalState)
			};
		// Wordgen Settings
		case SET_MONO_RATE:
			return {
				...state,
				categories: reduceCategory(state.categories),
				syllables: reduceSyllables(state.syllables),
				rewriteRules: reduceRewriteRulesState(state.rewriteRules),
				wordgenSettings: {
					...state.wordgenSettings,
					monosyllablesRate: payload
				},
				modalState: reduceModalState(state.modalState)
			};
		case SET_MAX_SYLLABLES:
			return {
				...state,
				categories: reduceCategory(state.categories),
				syllables: reduceSyllables(state.syllables),
				rewriteRules: reduceRewriteRulesState(state.rewriteRules),
				wordgenSettings: {
					...state.wordgenSettings,
					maxSyllablesPerWord: payload
				},
				modalState: reduceModalState(state.modalState)
			};
		case SET_CATEGORY_DROPOFF:
			return {
				...state,
				categories: reduceCategory(state.categories),
				syllables: reduceSyllables(state.syllables),
				rewriteRules: reduceRewriteRulesState(state.rewriteRules),
				wordgenSettings: {
					...state.wordgenSettings,
					categoryRunDropoff: payload
				},
				modalState: reduceModalState(state.modalState)
			};
		case SET_SYLLABLE_DROPOFF:
			return {
				...state,
				categories: reduceCategory(state.categories),
				syllables: reduceSyllables(state.syllables),
				rewriteRules: reduceRewriteRulesState(state.rewriteRules),
				wordgenSettings: {
					...state.wordgenSettings,
					syllableBoxDropoff: payload
				},
				modalState: reduceModalState(state.modalState)
			};
		case SET_OUTPUT:
			return {
				...state,
				categories: reduceCategory(state.categories),
				syllables: reduceSyllables(state.syllables),
				rewriteRules: reduceRewriteRulesState(state.rewriteRules),
				wordgenSettings: {
					...state.wordgenSettings,
					output: payload
				},
				modalState: reduceModalState(state.modalState)
			};
		case SET_SYLLABLE_BREAKS:
			return {
				...state,
				categories: reduceCategory(state.categories),
				syllables: reduceSyllables(state.syllables),
				rewriteRules: reduceRewriteRulesState(state.rewriteRules),
				wordgenSettings: {
					...state.wordgenSettings,
					showSyllableBreaks: payload
				},
				modalState: reduceModalState(state.modalState)
			};
		case SET_NUMBER_OF_SENTENCES:
			return {
				...state,
				categories: reduceCategory(state.categories),
				syllables: reduceSyllables(state.syllables),
				rewriteRules: reduceRewriteRulesState(state.rewriteRules),
				wordgenSettings: {
					...state.wordgenSettings,
					sentencesPerText: payload
				},
				modalState: reduceModalState(state.modalState)
			};
		case SET_DECLARATIVE_PRE:
			return {
				...state,
				categories: reduceCategory(state.categories),
				syllables: reduceSyllables(state.syllables),
				rewriteRules: reduceRewriteRulesState(state.rewriteRules),
				wordgenSettings: {
					...state.wordgenSettings,
					declarativeSentencePre: payload
				},
				modalState: reduceModalState(state.modalState)
			};
		case SET_DECLARATIVE_POST:
			return {
				...state,
				categories: reduceCategory(state.categories),
				syllables: reduceSyllables(state.syllables),
				rewriteRules: reduceRewriteRulesState(state.rewriteRules),
				wordgenSettings: {
					...state.wordgenSettings,
					declarativeSentencePost: payload
				},
				modalState: reduceModalState(state.modalState)
			};
		case SET_INTERROGATIVE_PRE:
			return {
				...state,
				categories: reduceCategory(state.categories),
				syllables: reduceSyllables(state.syllables),
				rewriteRules: reduceRewriteRulesState(state.rewriteRules),
				wordgenSettings: {
					...state.wordgenSettings,
					interrogativeSentencePre: payload
				},
				modalState: reduceModalState(state.modalState)
			};
		case SET_INTERROGATIVE_POST:
			return {
				...state,
				categories: reduceCategory(state.categories),
				syllables: reduceSyllables(state.syllables),
				rewriteRules: reduceRewriteRulesState(state.rewriteRules),
				wordgenSettings: {
					...state.wordgenSettings,
					interrogativeSentencePost: payload
				},
				modalState: reduceModalState(state.modalState)
			};
		case SET_EXCLAMATORY_PRE:
			return {
				...state,
				categories: reduceCategory(state.categories),
				syllables: reduceSyllables(state.syllables),
				rewriteRules: reduceRewriteRulesState(state.rewriteRules),
				wordgenSettings: {
					...state.wordgenSettings,
					exclamatorySentencePre: payload
				},
				modalState: reduceModalState(state.modalState)
			};
		case SET_EXCLAMATORY_POST:
			return {
				...state,
				categories: reduceCategory(state.categories),
				syllables: reduceSyllables(state.syllables),
				rewriteRules: reduceRewriteRulesState(state.rewriteRules),
				wordgenSettings: {
					...state.wordgenSettings,
					exclamatorySentencePost: payload
				},
				modalState: reduceModalState(state.modalState)
			};
		case SET_WORD_CAPITALIZATION:
			return {
				...state,
				categories: reduceCategory(state.categories),
				syllables: reduceSyllables(state.syllables),
				rewriteRules: reduceRewriteRulesState(state.rewriteRules),
				wordgenSettings: {
					...state.wordgenSettings,
					capitalizeWords: payload
				},
				modalState: reduceModalState(state.modalState)
			};
		case SET_WORDLIST_MULTICOLUMN:
			return {
				...state,
				categories: reduceCategory(state.categories),
				syllables: reduceSyllables(state.syllables),
				rewriteRules: reduceRewriteRulesState(state.rewriteRules),
				wordgenSettings: {
					...state.wordgenSettings,
					wordlistMultiColumn: payload
				},
				modalState: reduceModalState(state.modalState)
			};
		// Modals
		case TOGGLE_MODAL:
			let newModal: ModalStateObject = reduceModalState(state.modalState);
			newModal[payload.modal as keyof ModalStateObject] = payload.flag;
			return {
				...state,
				categories: reduceCategory(state.categories),
				syllables: reduceSyllables(state.syllables),
				rewriteRules: reduceRewriteRulesState(state.rewriteRules),
				wordgenSettings: { ...state.wordgenSettings },
				modalState: newModal
			};
	}
	return state;
};


// action creators
//
// Category
export function addCategory(payload: WGCategoryObject) {
	return {type: ADD_CATEGORY, payload};
}
export function startEditCategory(payload: WGCategoryObject) {
	return {type: START_EDIT_CATEGORY, payload};
}
export function cancelEditCategory(payload: WGCategoryObject) {
	return {type: CANCEL_EDIT_CATEGORY, payload};
}
export function doEditCategory(payload: WGCategoryObject) {
	return {type: DO_EDIT_CATEGORY, payload};
}
export function deleteCategory(payload: WGCategoryObject) {
	return {type: DELETE_CATEGORY, payload};
}
// Syllables
export function toggleSyllables() {
	return {type: TOGGLE_SYLLABLES, payload: null}
}
export function editSyllables(payload1: keyof WGSyllableStateObject["objects"], payload2: string[]) {
	return {type: EDIT_SYLLABLES, payload: {key: payload1, syllables: payload2}};
}
// Rewrite Rules
export function addRewriteRule(payload: WGRewriteRuleObject) {
	return {type: ADD_REWRITE_RULE, payload};
}
export function startEditRewriteRule(payload: WGRewriteRuleObject) {
	return {type: START_EDIT_REWRITE_RULE, payload};
}
export function cancelEditRewriteRule(payload: WGRewriteRuleObject) {
	return {type: CANCEL_EDIT_REWRITE_RULE, payload};
}
export function doEditRewriteRule(payload: WGRewriteRuleObject) {
	return {type: DO_EDIT_REWRITE_RULE, payload};
}
export function deleteRewriteRule(payload: WGRewriteRuleObject) {
	return {type: DELETE_REWRITE_RULE, payload};
}
export function reorderRewriteRules(payload: WGRewriteRuleObject["key"][]) {
	return {type: REORDER_REWRITE_RULE, payload};
}
// Wordgen Settings
export function setMonoRate(payload: Zero_OneHundred) {
	return {type: SET_MONO_RATE, payload};
}
export function setMaxSyllables(payload: Two_Fifteen) {
	return {type: SET_MAX_SYLLABLES, payload};
}
export function setCategoryDropoff(payload: Zero_Fifty) {
	return {type: SET_CATEGORY_DROPOFF, payload};
}
export function setSyllableDropoff(payload: Zero_Fifty) {
	return {type: SET_SYLLABLE_DROPOFF, payload};
}
export function setOutputType(payload: OutputTypes) {
	return {type: SET_OUTPUT, payload};
}
export function setSyllableBreaks(payload: boolean) {
	return {type: SET_SYLLABLE_BREAKS, payload};
}
export function setSentencesPerText(payload: Five_OneHundred) {
	return {type: SET_NUMBER_OF_SENTENCES, payload};
}
export function setDeclarativePre(payload: string) {
	return {type: SET_DECLARATIVE_PRE, payload};
}
export function setDeclarativePost(payload: string) {
	return {type: SET_DECLARATIVE_POST, payload};
}
export function setInterrogativePre(payload: string) {
	return {type: SET_INTERROGATIVE_PRE, payload};
}
export function setInterrogativePost(payload: string) {
	return {type: SET_INTERROGATIVE_POST, payload};
}
export function setExclamatoryPre(payload: string) {
	return {type: SET_EXCLAMATORY_PRE, payload};
}
export function setExclamatoryPost(payload: string) {
	return {type: SET_EXCLAMATORY_POST, payload};
}
export function setCapitalizeWords(payload: boolean) {
	return {type: SET_WORD_CAPITALIZATION, payload};
}
export function setWordlistMulticolium(payload: boolean) {
	return {type: SET_WORDLIST_MULTICOLUMN, payload};
}
// Modals
export function openModal(payload: keyof ModalStateObject) {
	return {type: TOGGLE_MODAL, payload: {modal: payload, flag: true}};
}
export function closeModal(payload: keyof ModalStateObject) {
	return {type: TOGGLE_MODAL, payload: {modal: payload, flag: false}};
}
