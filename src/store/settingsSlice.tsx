import { createSlice } from '@reduxjs/toolkit';

import { AppSettings, ThemeNames } from './types';
import blankAppState from './blankAppState';

const initialState = blankAppState.appSettings;

const setThemeFunc = (state: AppSettings, action: { payload: ThemeNames }) => {
	state.theme = action.payload;
	return state;
};

const setDisableConfirmsFunc = (state: AppSettings, action: { payload: boolean }) => {
	state.disableConfirms = action.payload;
	return state;
};

const setSortLanguageFunc = (state: AppSettings, action: { payload: string }) => {
	state.sortLanguage = action.payload;
	return state;
};

const appStateSlice = createSlice({
	name: 'appState',
	initialState,
	reducers: {
		setTheme: setThemeFunc,
		setDisableConfirms: setDisableConfirmsFunc,
		setSortLanguage: setSortLanguageFunc
	}
});

export const {
	setTheme,
	setDisableConfirms,
	setSortLanguage
} = appStateSlice.actions;

export default appStateSlice.reducer;
