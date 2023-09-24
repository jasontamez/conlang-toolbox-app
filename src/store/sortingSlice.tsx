import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LanguageCode } from 'iso-639-1';

import { SortSensitivity, SortSettings } from './types';
import blankAppState from './blankAppState';

const initialState = blankAppState.sortSettings;

const setSortLanguageFunc = (state: SortSettings, action: PayloadAction<LanguageCode | null>) => {
	state.sortLanguage = action.payload;
	return state;
};

const setSortLanguageCustomFunc = (state: SortSettings, action: PayloadAction<LanguageCode | null>) => {
	const value = action.payload;
	if(value) {
		state.sortLanguageCustom = value;
	} else {
		delete state.sortLanguageCustom;
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
		setSortLanguage: setSortLanguageFunc,
		setSortLanguageCustom: setSortLanguageCustomFunc,
		setSortSensitivity: setSortSensitivityFunc
	}
});

export const {
	setSortLanguage,
	setSortLanguageCustom,
	setSortSensitivity
} = appStateSlice.actions;

export default appStateSlice.reducer;
