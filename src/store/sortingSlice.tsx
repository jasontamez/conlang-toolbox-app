import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { SortLanguage, SortObject, SortSensitivity, SortSettings } from './types';
import blankAppState from './blankAppState';

const initialState = blankAppState.sortSettings;

const checkForMultiples = (obj: SortObject) => {
	const {
		customAlphabet = [],
		customizations = []
	} = obj;
	const multiples = customAlphabet.concat(
		...customizations.map(o => {
			if("equals" in o) {
				return [
					o.base,
					...o.equals
				];
			}
			return [
				o.base,
				...o.pre,
				...o.post
			];
		})
	).filter(char => char.length > 1);
	return multiples;
};

const setDefaultSortLanguageFunc = (state: SortSettings, action: PayloadAction<SortLanguage>) => {
	state.defaultSortLanguage = action.payload;
	return state;
};

const setSortLanguageCustomFunc = (state: SortSettings, action: PayloadAction<SortLanguage | null>) => {
	const value = action.payload;
	if(value) {
		state.sortLanguage = value;
	} else {
		delete state.sortLanguage;
	}
	return state;
};

const setSortSensitivityFunc = (state: SortSettings, action: PayloadAction<SortSensitivity>) => {
	state.sensitivity = action.payload;
	return state;
};

const addNewCustomSortFunc = (state: SortSettings, action: PayloadAction<SortObject>) => {
	const newObj = {...action.payload};
	newObj.multiples = checkForMultiples(newObj);
	state.customSorts.push(newObj);
	return state;
};

const editCustomSortFunc = (state: SortSettings, action: PayloadAction<[string, SortObject]>) => {
	const [ id, newObj ] = action.payload;
	newObj.multiples = checkForMultiples(newObj);
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

const setDefaultCustomSortFunc = (state: SortSettings, action: PayloadAction<string | null>) => {
	const { payload } = action;
	if(payload) {
		state.defaultCustomSort = payload;
	} else {
		delete state.defaultCustomSort;
	}
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
		deleteCustomSort: deleteCustomSortFunc,
		setDefaultCustomSort: setDefaultCustomSortFunc
	}
});

export const {
	setDefaultSortLanguage,
	setSortLanguageCustom,
	setSortSensitivity,
	addNewCustomSort,
	editCustomSort,
	deleteCustomSort,
	setDefaultCustomSort
} = appStateSlice.actions;

export default appStateSlice.reducer;
