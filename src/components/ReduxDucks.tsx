// constants (actions)
const p = "conlangs-toolbox/reducer/";
const ADD_CATEGORY =p+"ADD_CATEGORY";
const EDIT_CATEGORY =p+"ADD_CATEGORY";
const DELETE_CATEGORY =p+"ADD_CATEGORY";
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
		map: new Map([["C", startingCategories[0]], ["V", startingCategories[1]]])
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
	switch(action.type) {
		case ADD_CATEGORY:
			let CO = state.categories;
			let cMap = new Map(CO.map);
			cMap.set(payload.label, payload);
			// make new object, copy props from state, overwrite prop(s) with new object with new payload
			return Object.assign({}, state, {
				categories: {
					list: CO.list.concat(payload),
					map: cMap
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
export function editCategory(payload: CategoryObject) {
	return {type: EDIT_CATEGORY, payload};
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

