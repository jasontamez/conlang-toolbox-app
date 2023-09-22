import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import blankAppState from './blankAppState';
import { ViewState } from './types';

const initialState: ViewState = blankAppState.lastView as ViewState;

// Set last view
const saveViewFunc = (state: ViewState, action: PayloadAction<{key: keyof ViewState, page: string}>) => {
	const { key, page } = action.payload;
	state[key] = page;
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
