// constants (actions)
const p = "conlangs-toolbox/reducer/";
const ADD_ARTICLE = p+"ADD_ARTICLE";
const ADD_TITLE = p+"ADD_TITLE";
const ADD_CATEGORY =p+"ADD_CATEGORY";

export interface CategoryStatus {
	fullyDisplayed?: boolean
	editing?: boolean
}

interface Category {
	status: CategoryStatus,
	title: string,
	label: string,
	run: string,
	dropoffOverride?: number,
	rateOverride?: number[]
}
// id: unique id
// status: object with optional properties 'fullyDisplayed' and 'editing'
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
			status: {},
			title: "Consonants",
			label: "C",
			run: "ptknmrf"
		},
		{
			status: {},
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
	if (action.type === ADD_ARTICLE) {
		// make new object, copy props from state, overwrite articles prop with new array with old and new payload
		return Object.assign({}, state, {
			articles: state.articles.concat({
				title: action.payload,
				id: state.articles.length // horrible
			})
		});
	}
	if(action.type === ADD_TITLE) {
		// make new object, copy props from state, overwrite articles prop with new array with old and new payload
		return Object.assign({}, state, {
			title: action.payload
		});
	}
	if(action.type === ADD_CATEGORY) {
		// make new object, copy props from state, overwrite prop with new array with old and new payload
		//
		//
		// NOPE - get info before calling this, don't assign blank info
		//
		//
		return Object.assign({}, state, {
			categories: state.categories.concat(
				action.payload
				//{
				//	status: {},
				//	title: "",
				//	label: "",
				//	run: ""
				//}
			)
		});
	}
	return state;
};

// action creators
export function addArticle(payload: any) {
	return { type: ADD_ARTICLE, payload };
};
export function addTitle(payload: string) {
	return {type: ADD_TITLE, payload};
}

