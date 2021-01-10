// constants (actions)
const p = "conlangs-toolbox/reducer/";
const ADD_CATEGORY =p+"ADD_CATEGORY";
const TOGGLE_MODAL = p+"TOGGLE_MODAL";

interface Category {
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

interface StateObject {
	categories: Category[],
	modalState: boolean
}

const initialState: StateObject = {
	categories: [
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
	],
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
			// make new object, copy props from state, overwrite prop with new array with old and new payload
			return Object.assign({}, state, {
				categories: state.categories.concat(payload)
			});
		case TOGGLE_MODAL:
			return Object.assign({}, state, { modalState: payload });
	}
	return state;
};

// action creators
export function addCategory(payload: Category) {
	return {type: ADD_CATEGORY, payload};
}
export function openModal() {
	return {type: TOGGLE_MODAL, payload: true};
}
export function closeModal() {
	return {type: TOGGLE_MODAL, payload: false};
}

