import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import blankAppState from './blankAppState';
import { ViewState } from './types';
import debounce from '../components/Debounce';
import { StateStorage } from '../components/PersistentInfo';

const initialState: ViewState = blankAppState.lastView as ViewState;

// Storage
const saveCurrentState = (state: ViewState) => {
	debounce(StateStorage.setItem, ["lastStateView", state], 3000, "savingStateView");
};

// Set last view
const saveViewFunc = (state: ViewState, action: PayloadAction<{key: keyof ViewState, page: string}>) => {
	const { key, page } = action.payload;
	state[key] = page;
	saveCurrentState(state);
	return state;
};

// LOAD STATE
const loadViewFunc = (state: ViewState, action: PayloadAction<ViewState>) => {
	const {
		wg,
		we,
		ms,
	} = action.payload || initialState;
	const newState = {
		wg,
		we,
		ms
	};
	saveCurrentState(newState);
	return newState;
};

const viewSlice = createSlice({
	name: 'we',
	initialState,
	reducers: {
		saveView: saveViewFunc,
		loadViewState: loadViewFunc
	}
});

export const {
	saveView,
	loadViewState
} = viewSlice.actions;

export default viewSlice.reducer;

// Testing if state
export const _Views: (keyof ViewState)[] = [
	"we",
	"wg",
	"ms"
];
export const checkIfView = (possible: ViewState | any): possible is ViewState => {
	const check = possible as ViewState;
	return _Views.every(prop => check[prop]);
};

