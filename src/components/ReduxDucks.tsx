// constants (actions)
const p = "conlangs-toolbox/reducer/";
const ADD_ARTICLE = p+"ADD_ARTICLE";
const ADD_TITLE = p+"ADD_TITLE";

export const initialState = {
	articles: Array.of(),
	title: ''
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
				id: state.articles.length
			})
		});
	}
	if(action.type === ADD_TITLE) {
		// make new object, copy props from state, overwrite articles prop with new array with old and new payload
		return Object.assign({}, state, {
			title: action.payload
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

