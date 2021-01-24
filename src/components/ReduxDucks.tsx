// constants (actions)
const p = "conlangs-toolbox/reducer/";
const ADD_CATEGORY =p+"ADD_CATEGORY";
const START_EDIT_CATEGORY =p+"START_EDIT_CATEGORY";
const CANCEL_EDIT_CATEGORY =p+"CANCEL_EDIT_CATEGORY";
const DO_EDIT_CATEGORY =p+"DO_EDIT_CATEGORY";
const DELETE_CATEGORY =p+"DELETE_CATEGORY";
const TOGGLE_MODAL = p+"TOGGLE_MODAL";
const TOGGLE_SYLLABLES = p+"TOGGLE_SYLLABLES";

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

interface SyllableStateObject {
	toggle: boolean
	singleWord: SyllableObject
	wordInitial: SyllableObject
	wordMiddle: SyllableObject
	wordFinal: SyllableObject
}

interface ModalStateObject {
	AddCategory: boolean
	EditCategory: boolean
	AddSyllable: boolean
	EditSyllable: boolean
}

interface StateObject {
	categories: CategoryStateObject
	modalState: ModalStateObject
	syllables: SyllableStateObject
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
		singleWord: { components: [] },
		wordInitial: { components: [] },
		wordMiddle: { components: [] },
		wordFinal: { components: [] }
	},
	modalState: {
		AddCategory: false,
		EditCategory: false,
		AddSyllable: false,
		EditSyllable: false
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
	return {
		toggle: original.toggle,
		singleWord: reduceSubSyllables(original.singleWord),
		wordInitial: reduceSubSyllables(original.wordInitial),
		wordMiddle: reduceSubSyllables(original.wordMiddle),
		wordFinal: reduceSubSyllables(original.wordFinal)
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
const reduceModalState = (original: ModalStateObject) => {
	return {...original};
};


// reducer
export function reducer(state = initialState, action: ReduxAction) {
	const payload = action.payload;
	let CO: CategoryStateObject;
	let newCategories: CategoryStateObject;
	let SO: SyllableStateObject;
	switch(action.type) {
		case ADD_CATEGORY:
			CO = state.categories;
			newCategories = reduceCategory(CO, CO.list.concat(payload));
			newCategories.map.set(payload.label, payload);
			// make new object, copy props from state, overwrite prop(s) with new object with new payload
			return {
				...state,
				categories: newCategories,
				syllables: reduceSyllables(state.syllables),
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
				modalState: reduceModalState(state.modalState)
			};
		case DO_EDIT_CATEGORY:
			CO = state.categories;
			newCategories = reduceCategory(CO, CO.list.map(o => o.label === CO.editing ? payload : o));
			return {
				...state,
				categories: newCategories,
				syllables: reduceSyllables(state.syllables),
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
				modalState: reduceModalState(state.modalState)
			};
		case DELETE_CATEGORY:
			CO = state.categories;
			newCategories = reduceCategory(CO, CO.list.filter(o => o.label !== payload));
			return {
				...state,
				categories: newCategories,
				syllables: reduceSyllables(state.syllables),
				modalState: reduceModalState(state.modalState)
			};
		case TOGGLE_MODAL:
			let newModal: ModalStateObject = reduceModalState(state.modalState);
			newModal[payload.modal as keyof ModalStateObject] = payload.flag;
			return {
				...state,
				categories: reduceCategory(state.categories),
				syllables: reduceSyllables(state.syllables),
				modalState: newModal
			};
		case TOGGLE_SYLLABLES:
			SO = reduceSyllables(state.syllables);
			SO.toggle = !SO.toggle;
			return {
				...state,
				syllables: SO,
				categories: reduceCategory(state.categories),
				modalState: reduceModalState(state.modalState)
			};
	}
	return state;
};


// action creators
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
export function openModal(payload: keyof ModalStateObject) {
	return {type: TOGGLE_MODAL, payload: {modal: payload, flag: true}};
}
export function closeModal(payload: keyof ModalStateObject) {
	return {type: TOGGLE_MODAL, payload: {modal: payload, flag: false}};
}
export function toggleSyllables() {
	return {type: TOGGLE_SYLLABLES, payload: null}
}
