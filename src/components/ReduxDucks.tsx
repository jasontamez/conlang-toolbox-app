// constants (actions)
const p = "conlangs-toolbox/reducer/";
const ADD_CATEGORY =p+"ADD_CATEGORY";
const START_EDIT_CATEGORY =p+"START_EDIT_CATEGORY";
const CANCEL_EDIT_CATEGORY =p+"CANCEL_EDIT_CATEGORY";
const DO_EDIT_CATEGORY =p+"DO_EDIT_CATEGORY";
const DELETE_CATEGORY =p+"DELETE_CATEGORY";
const TOGGLE_MODAL = p+"TOGGLE_MODAL";
const TOGGLE_SYLLABLES = p+"TOGGLE_SYLLABLES";
const EDIT_SYLLABLES = p+"EDIT_SYLLABLES";
const ADD_REWRITE_RULE =p+"ADD_REWRITE_RULE";
const START_EDIT_REWRITE_RULE =p+"START_EDIT_REWRITE_RULE";
const CANCEL_EDIT_REWRITE_RULE =p+"CANCEL_EDIT_REWRITE_RULE";
const DO_EDIT_REWRITE_RULE =p+"DO_EDIT_REWRITE_RULE";
const DELETE_REWRITE_RULE =p+"DELETE_REWRITE_RULE";

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
	modalState: ModalStateObject
}

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
		list: [],
		editing: null
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
				modalState: reduceModalState(state.modalState)
			};
		case DO_EDIT_REWRITE_RULE:
			RO = reduceRewriteRulesState(state.rewriteRules, 'edit', payload);
			return {
				...state,
				categories: reduceCategory(state.categories),
				syllables: reduceSyllables(state.syllables),
				rewriteRules: RO,
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
				modalState: reduceModalState(state.modalState)
			};
		case DELETE_REWRITE_RULE:
			RO = reduceRewriteRulesState(state.rewriteRules, 'del', payload);
			return {
				...state,
				categories: reduceCategory(state.categories),
				syllables: reduceSyllables(state.syllables),
				rewriteRules: RO,
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
// Modals
export function openModal(payload: keyof ModalStateObject) {
	return {type: TOGGLE_MODAL, payload: {modal: payload, flag: true}};
}
export function closeModal(payload: keyof ModalStateObject) {
	return {type: TOGGLE_MODAL, payload: {modal: payload, flag: false}};
}
