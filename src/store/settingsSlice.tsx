import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppSettings, ThemeNames } from './types';
import blankAppState from './blankAppState';
import debounce from '../components/Debounce';
import { StateStorage } from '../components/PersistentInfo';

const initialState = blankAppState.appSettings;

// Storage
const saveCurrentState = (state: AppSettings) => {
	debounce(StateStorage.setItem, ["lastStateSettings", state], 1000, "savingStateSettings");
};

const setThemeFunc = (state: AppSettings, action: PayloadAction<ThemeNames>) => {
	state.theme = action.payload;
	saveCurrentState(state);
	return state;
};

const setDisableConfirmsFunc = (state: AppSettings, action: PayloadAction<boolean>) => {
	state.disableConfirms = action.payload;
	saveCurrentState(state);
	return state;
};

const setSortLanguageFunc = (state: AppSettings, action: PayloadAction<string>) => {
	state.sortLanguage = action.payload;
	saveCurrentState(state);
	return state;
};

const loadStateSettingsFunc = (state: AppSettings, action: PayloadAction<AppSettings>) => {
	const final = {
		...state,
		...action.payload
	};
	saveCurrentState(final);
	return final;
};


const appStateSlice = createSlice({
	name: 'appState',
	initialState,
	reducers: {
		setTheme: setThemeFunc,
		setDisableConfirms: setDisableConfirmsFunc,
		setSortLanguage: setSortLanguageFunc,
		loadStateSettings: loadStateSettingsFunc
	}
});

export const {
	setTheme,
	setDisableConfirms,
	setSortLanguage,
	loadStateSettings
} = appStateSlice.actions;

export default appStateSlice.reducer;


// Testing if state
export const _Settings: { simple: (keyof AppSettings)[], possiblyFalsy: (keyof AppSettings)[]} = {
	simple: [
		"theme",
		"sortLanguage"
	],
	possiblyFalsy: [
		"disableConfirms",
		"sensitivity"
	]
};
export const checkIfSettings = (possible: AppSettings | any): possible is AppSettings => {
	const check = possible as AppSettings;
	const { simple, possiblyFalsy } = _Settings;
	return simple.every(prop => check[prop]) && possiblyFalsy.every(prop => (check[prop] !== undefined));
};
