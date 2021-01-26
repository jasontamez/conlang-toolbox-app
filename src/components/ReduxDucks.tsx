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

// helper functions and such
export interface CategoryObject {
	title: string
	label: string
	run: string
	dropoffOverride?: number
	rateOverride?: number[]
}
// id: unique id
// title: short description
// label: 1 letter
// run: letters in this category
// dropoffOverride: optional percentage that a given letter will be chosen
// rateOverride: optional list of percentages for each letter

interface CategoryStateObject {
	list: CategoryObject[]
	map: any
	editing: null | string
}

interface SyllableObject {
	components: string[]
	rateOverride?: number[]
}

export interface SyllableStateObject {
	toggle: boolean
	objects: {
		singleWord: SyllableObject
		wordInitial: SyllableObject
		wordMiddle: SyllableObject
		wordFinal: SyllableObject
	}
}

export interface RewriteRuleObject {
	key: string
	seek: string
	replace: string
	description: string
}

interface RewriteRuleStateObject {
	list: RewriteRuleObject[]
	editing: null | string
}

interface GlobalSettingsObject {
	monosyllablesRate: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31 | 32 | 33 | 34 | 35 | 36 | 37 | 38 | 39 | 40 | 41 | 42 | 43 | 44 | 45 | 46 | 47 | 48 | 49 | 50 | 51 | 52 | 53 | 54 | 55 | 56 | 57 | 58 | 59 | 60 | 61 | 62 | 63 | 64 | 65 | 66 | 67 | 68 | 69 | 70 | 71 | 72 | 73 | 74 | 75 | 76 | 77 | 78 | 79 | 80 | 81 | 82 | 83 | 84 | 85 | 86 | 87 | 88 | 89 | 90 | 91 | 92 | 93 | 94 | 95 | 96 | 97 | 98 | 99 | 100
	maxSyllablesPerWord: 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15
	categoryRunDropoff: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31 | 32 | 33 | 34 | 35 | 36 | 37 | 38 | 39 | 40 | 41 | 42 | 43 | 44 | 45 | 46 | 47 | 48 | 49 | 50
	syllableBoxDropoff: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31 | 32 | 33 | 34 | 35 | 36 | 37 | 38 | 39 | 40 | 41 | 42 | 43 | 44 | 45 | 46 | 47 | 48 | 49 | 50
	output: "text" | "wordlist" | "syllables"
	showSyllableBreaks: boolean
	sentencesPerText: 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31 | 32 | 33 | 34 | 35 | 36 | 37 | 38 | 39 | 40 | 41 | 42 | 43 | 44 | 45 | 46 | 47 | 48 | 49 | 50 | 51 | 52 | 53 | 54 | 55 | 56 | 57 | 58 | 59 | 60 | 61 | 62 | 63 | 64 | 65 | 66 | 67 | 68 | 69 | 70 | 71 | 72 | 73 | 74 | 75 | 76 | 77 | 78 | 79 | 80 | 81 | 82 | 83 | 84 | 85 | 86 | 87 | 88 | 89 | 90 | 91 | 92 | 93 | 94 | 95 | 96 | 97 | 98 | 99 | 100
	declarativeSentencePre: string
	declarativeSentencePost: string
	interrogativeSentencePre: string
	interrogativeSentencePost: string
	exclamatorySentencePre: string
	exclamatorySentencePost: string
	capitalizeWords: boolean
	wordlistMultiColumn: boolean
}

interface ModalStateObject {
	AddCategory: boolean
	EditCategory: boolean
	AddRewriteRule: boolean
	EditRewriteRule: boolean
}

interface StateObject {
	categories: CategoryStateObject
	syllables: SyllableStateObject
	rewriteRules: RewriteRuleStateObject
	globalSettings: GlobalSettingsObject
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

const initialState: StateObject = {
	categories: {
		list: startingCategories,
		map: new Map([["C", startingCategories[0]], ["V", startingCategories[1]]]),
		editing: null
	},
	syllables: {
		toggle: false,
		objects: {
			singleWord: { components: [] },
			wordInitial: { components: [] },
			wordMiddle: { components: [] },
			wordFinal: { components: [] }
		}
	},
	rewriteRules: {
		list: startingRules,
		editing: null
	},
	globalSettings: {
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

const reduceCategory = (original: CategoryStateObject, cats: CategoryObject[] = original.list) => {
	let list: CategoryObject[] = [];
	let map: any[] = cats.map((c) => {
		let o: CategoryObject = {...c};
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
const reduceSyllables = (original: SyllableStateObject) => {
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
const reduceSubSyllables = (original: SyllableObject) => {
	let o: SyllableObject = {
		components: [...original.components]
	}
	if(original.rateOverride) {
		o.rateOverride = [...original.rateOverride];
	}
	return o;
};
const reduceRewriteRulesState = (original: RewriteRuleStateObject, mod: string = "", rule: any = null) => {
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
const reduceRewriteRules = (original: RewriteRuleObject) => {
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
	let CO: CategoryStateObject;
	let newCategories: CategoryStateObject;
	let SO: SyllableStateObject;
	let RO: RewriteRuleStateObject;
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
				globalSettings: { ...state.globalSettings },
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
				globalSettings: { ...state.globalSettings },
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
				globalSettings: { ...state.globalSettings },
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
				globalSettings: { ...state.globalSettings },
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
				globalSettings: { ...state.globalSettings },
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
				globalSettings: { ...state.globalSettings },
				modalState: reduceModalState(state.modalState)
			};
		case EDIT_SYLLABLES:
			SO = reduceSyllables(state.syllables);
			SO.objects[payload.key as keyof SyllableStateObject["objects"]].components = payload.syllables;
			return {
				...state,
				syllables: SO,
				categories: reduceCategory(state.categories),
				rewriteRules: reduceRewriteRulesState(state.rewriteRules),
				globalSettings: { ...state.globalSettings },
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
				globalSettings: { ...state.globalSettings },
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
				globalSettings: { ...state.globalSettings },
				modalState: reduceModalState(state.modalState)
			};
		case DO_EDIT_REWRITE_RULE:
			RO = reduceRewriteRulesState(state.rewriteRules, 'edit', payload);
			return {
				...state,
				categories: reduceCategory(state.categories),
				syllables: reduceSyllables(state.syllables),
				rewriteRules: RO,
				globalSettings: { ...state.globalSettings },
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
				globalSettings: { ...state.globalSettings },
				modalState: reduceModalState(state.modalState)
			};
		case DELETE_REWRITE_RULE:
			RO = reduceRewriteRulesState(state.rewriteRules, 'del', payload);
			return {
				...state,
				categories: reduceCategory(state.categories),
				syllables: reduceSyllables(state.syllables),
				rewriteRules: RO,
				globalSettings: { ...state.globalSettings },
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
				globalSettings: { ...state.globalSettings },
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
				globalSettings: { ...state.globalSettings },
				modalState: newModal
			};
	}
	return state;
};


// action creators
//
// Category
export function addCategory(payload: CategoryObject) {
	return {type: ADD_CATEGORY, payload};
}
export function startEditCategory(payload: CategoryObject) {
	return {type: START_EDIT_CATEGORY, payload};
}
export function cancelEditCategory(payload: CategoryObject) {
	return {type: CANCEL_EDIT_CATEGORY, payload};
}
export function doEditCategory(payload: CategoryObject) {
	return {type: DO_EDIT_CATEGORY, payload};
}
export function deleteCategory(payload: CategoryObject) {
	return {type: DELETE_CATEGORY, payload};
}
// Syllables
export function toggleSyllables() {
	return {type: TOGGLE_SYLLABLES, payload: null}
}
export function editSyllables(payload1: keyof SyllableStateObject["objects"], payload2: string[]) {
	return {type: EDIT_SYLLABLES, payload: {key: payload1, syllables: payload2}};
}
// Rewrite Rules
export function addRewriteRule(payload: RewriteRuleObject) {
	return {type: ADD_REWRITE_RULE, payload};
}
export function startEditRewriteRule(payload: RewriteRuleObject) {
	return {type: START_EDIT_REWRITE_RULE, payload};
}
export function cancelEditRewriteRule(payload: RewriteRuleObject) {
	return {type: CANCEL_EDIT_REWRITE_RULE, payload};
}
export function doEditRewriteRule(payload: RewriteRuleObject) {
	return {type: DO_EDIT_REWRITE_RULE, payload};
}
export function deleteRewriteRule(payload: RewriteRuleObject) {
	return {type: DELETE_REWRITE_RULE, payload};
}
export function reorderRewriteRules(payload: RewriteRuleObject["key"][]) {
	return {type: REORDER_REWRITE_RULE, payload};
}
// Modals
export function openModal(payload: keyof ModalStateObject) {
	return {type: TOGGLE_MODAL, payload: {modal: payload, flag: true}};
}
export function closeModal(payload: keyof ModalStateObject) {
	return {type: TOGGLE_MODAL, payload: {modal: payload, flag: false}};
}
