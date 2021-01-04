// constants (actions)
const p = "conlangs-toolbox/reducer/";
const ADD_ARTICLE = p+"ADD_ARTICLE";

const initialState = {
	articles: []
};

interface ReduxAction {
	type: string,
	payload: any
}

// reducer
export default function reducer(state = initialState, action: ReduxAction) {
	if (action.type === ADD_ARTICLE) {
		// make new object, copy props from state, overwrite articles prop with new array with old and new payload
		return Object.assign({}, state, {
			articles: state.articles.concat(action.payload)
		});
	}
	return state;
};

// action creators
export function addArticle(payload: any) {
	return { type: ADD_ARTICLE, payload };
};

