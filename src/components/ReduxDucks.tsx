// constants (actions)
const p = "conlangs-toolbox/reducer/";
const ADD_CATEGORY =p+"ADD_CATEGORY";
const START_EDIT_CATEGORY =p+"START_EDIT_CATEGORY";
const DO_EDIT_CATEGORY =p+"DO_EDIT_CATEGORY";
const DELETE_CATEGORY =p+"DELETE_CATEGORY";
const TOGGLE_MODAL = p+"TOGGLE_MODAL";

export interface CategoryObject {
	title: string,
	label: string,
	run: string,
	dropoffOverride?: number,
	rateOverride?: number[]
}
// id: unique id
// title: short description
// label: 1-3 letters
// run: letters in this category
// dropoffOverride: optional percentage that a given letter will be chosen
// rateOverride: optional list of percentages for each letter


interface CategoryStateObject {
	list: CategoryObject[]
	map: any
	editing: null | string
}

interface StateObject {
	categories: CategoryStateObject
	modalState: boolean
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
	modalState: false
};

interface ReduxAction {
	type: string,
	payload?: any
}


// reducer
export function reducer(state = initialState, action: ReduxAction) {
	const payload = action.payload;
	let CO, cMap;
	switch(action.type) {
		case ADD_CATEGORY:
			CO = state.categories;
			cMap = new Map(CO.map);
			cMap.set(payload.label, payload);
			// make new object, copy props from state, overwrite prop(s) with new object with new payload
			return Object.assign({}, state, {
				categories: {
					list: CO.list.concat(payload).map(o => Object.assign({}, o)),
					map: cMap,
					editing: CO.editing
				}
			});
		case START_EDIT_CATEGORY:
			CO = state.categories;
			cMap = new Map(CO.map);
			return Object.assign({}, state, {
				categories: {
					list: CO.list.map(o => Object.assign({}, o)),
					map: cMap,
					editing: payload
				}
			});
		case DO_EDIT_CATEGORY:
			CO = state.categories;
			cMap = new Map(CO.map);
			let editing = CO.editing;
			cMap.delete(editing);
			cMap.set(payload.label, payload);
			return Object.assign({}, state, {
				categories: {
					list: CO.list.map(o => o.label === editing ? payload : Object.assign({}, o)),
					map: cMap,
					editing: null
				}
			});
		case DELETE_CATEGORY:
			CO = state.categories;
			cMap = new Map(CO.map);
			cMap.delete(payload);
			return Object.assign({}, state, {
				categories: {
					list: CO.list.slice().filter(o => o.label !== payload),
					map: cMap,
					editing: null
				}
			});
		case TOGGLE_MODAL:
			return Object.assign({}, state, { modalState: payload });
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
export function doEditCategory(payload: CategoryObject) {
	return {type: DO_EDIT_CATEGORY, payload};
}
export function deleteCategory(payload: CategoryObject) {
	return {type: DELETE_CATEGORY, payload};
}
export function openModal() {
	return {type: TOGGLE_MODAL, payload: true};
}
export function closeModal() {
	return {type: TOGGLE_MODAL, payload: false};
}

