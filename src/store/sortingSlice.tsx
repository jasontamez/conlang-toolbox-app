import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { SortLanguage, SortObject, SortSensitivity, SortSettings } from './types';
import blankAppState from './blankAppState';

const initialState = blankAppState.sortSettings;

const checkForMultiples = (obj: SortObject) => {
	const {
		customAlphabet = [],
		relations= [],
		equalities= []
	} = obj;
	const multiples = customAlphabet.concat(
		...relations.map(rel => {
			return [
				rel.base,
				...rel.pre,
				...rel.post
			];
		}),
		...equalities.map(eq => {
			return [
				eq.base,
				...eq.equals
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
	const newObj = action.payload;
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
