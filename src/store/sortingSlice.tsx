import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { SortLanguage, SortSensitivity, SortSettings } from './types';
import blankAppState from './blankAppState';

const initialState = blankAppState.sortSettings;

const setDefaultSortLanguageFunc = (state: SortSettings, action: PayloadAction<SortLanguage>) => {
	state.defaultSortLanguage = action.payload;
	return state;
};

const setSortLanguageCustomFunc = (state: SortSettings, action: PayloadAction<SortLanguage>) => {
	const value = action.payload;
	if(value) {
		state.sortLanguage = value;
	} else {
		delete state.sortLanguage;
	}
	return state;
};

const setSortSensitivityFunc = (state: SortSettings, action: PayloadAction<SortSensitivity | null>) => {
	const value = action.payload;
	if(value) {
		state.sensitivity = value;
	} else {
		delete state.sensitivity;
	}
	return state;
};

const appStateSlice = createSlice({
	name: 'appState',
	initialState,
	reducers: {
		setDefaultSortLanguage: setDefaultSortLanguageFunc,
		setSortLanguageCustom: setSortLanguageCustomFunc,
		setSortSensitivity: setSortSensitivityFunc
	}
});

export const {
	setDefaultSortLanguage,
	setSortLanguageCustom,
	setSortSensitivity
} = appStateSlice.actions;

export default appStateSlice.reducer;
