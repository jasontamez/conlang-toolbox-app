import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { SortLanguage, SortObject, SortSensitivity, SortSettings } from './types';
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

const addNewCustomSortFunc = (state: SortSettings, action: PayloadAction<SortObject>) => {
	state.customSorts.push(action.payload);
	return state;
};

const editCustomSortFunc = (state: SortSettings, action: PayloadAction<[string, SortObject]>) => {
	const [ id, newObj ] = action.payload;
	state.customSorts = state.customSorts.map((obj => {
		if(obj.id === id) {
			return newObj;
		}
		return obj;
	}));
	return state;
};

const deleteCustomSortFunc = (state: SortSettings, action: PayloadAction<string>) => {
	const { payload } = action;
	state.customSorts = state.customSorts.filter(obj => (obj.id !== payload));
	return state;
};

const appStateSlice = createSlice({
	name: 'appState',
	initialState,
	reducers: {
		setDefaultSortLanguage: setDefaultSortLanguageFunc,
		setSortLanguageCustom: setSortLanguageCustomFunc,
		setSortSensitivity: setSortSensitivityFunc,
		addNewCustomSort: addNewCustomSortFunc,
		editCustomSort: editCustomSortFunc,
		deleteCustomSort: deleteCustomSortFunc
	}
});

export const {
	setDefaultSortLanguage,
	setSortLanguageCustom,
	setSortSensitivity,
	addNewCustomSort,
	editCustomSort,
	deleteCustomSort
} = appStateSlice.actions;

export default appStateSlice.reducer;
