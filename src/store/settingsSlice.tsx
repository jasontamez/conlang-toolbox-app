import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppSettings, ThemeNames } from './types';
import blankAppState, { cleanerObject } from './blankAppState';
import maybeUpdateTheme from '../components/MaybeUpdateTheme';

const initialState = blankAppState.appSettings;

const setThemeFunc = (state: AppSettings, action: PayloadAction<ThemeNames>) => {
	if(state.theme !== action.payload) {
		maybeUpdateTheme(state.theme, action.payload);
	}
	state.theme = action.payload;
	return state;
};

const setDisableConfirmsFunc = (state: AppSettings, action: PayloadAction<boolean>) => {
	state.disableConfirms = action.payload;
	return state;
};

const loadStateSettingsFunc = (state: AppSettings, action: PayloadAction<AppSettings>) => {
	const final = {
		...cleanStateFunc(state, null),
		...action.payload
	};
	return final;
};

const cleanStateFunc = (state: AppSettings, action: PayloadAction | null) => {
	const temp: any = {};
	cleanerObject.appSettings.forEach(key => {
		state[key] !== undefined && (temp[key] = state[key]);
	});
	const final: AppSettings = {...temp};
	return final;
};


const appSettingsSlice = createSlice({
	name: 'appSettings',
	initialState,
	reducers: {
		setTheme: setThemeFunc,
		setDisableConfirms: setDisableConfirmsFunc,
		loadStateSettings: loadStateSettingsFunc,
		cleanStateSettings: cleanStateFunc
	}
});

export const {
	setTheme,
	setDisableConfirms,
	loadStateSettings,
	cleanStateSettings
} = appSettingsSlice.actions;

export default appSettingsSlice.reducer;
