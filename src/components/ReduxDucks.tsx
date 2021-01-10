// constants (actions)
const p = "conlangs-toolbox/reducer/";
const ADD_ARTICLE = p+"ADD_ARTICLE";
const ADD_TITLE = p+"ADD_TITLE";
const ADD_CATEGORY =p+"ADD_CATEGORY";

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


export const initialState = {
	articles: Array.of(),
	title: '',
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
	] as Category[]
};

interface ReduxAction {
	type: string,
	payload: any
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
	}
	return state;
};

// action creators
export function addCategorty(payload: Category) {
	return {type: ADD_CATEGORY, payload};
}

