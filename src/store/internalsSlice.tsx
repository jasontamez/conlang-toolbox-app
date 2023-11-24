import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { InternalState, SortLanguage } from './types';
import blankAppState from './blankAppState';

const initialState: InternalState = blankAppState.internals;

const logFunc = (state: InternalState, action: PayloadAction<string[]>) => {
	const logs = state.logs.concat(action.payload);
	while(logs.length > 250) {
		logs.shift();
	}
	return {
		...state,
		logs
	};
};

const setDefaultSortLanguageFunc = (state: InternalState, action: PayloadAction<SortLanguage>) => {
	state.defaultSortLanguage = action.payload;
	return state;
};

const setLastCleanFunc = (state: InternalState, action: PayloadAction<number>) => {
	state.lastClean = action.payload;
	return state;
};

const setLastViewMSFunc = (state: InternalState, action: PayloadAction<string>) => {
	state.lastViewMS = action.payload;
	return state;
};


const internalsSlice = createSlice({
	name: 'internals',
	initialState,
	reducers: {
		saveToLog: logFunc,
		setDefaultSortLanguage: setDefaultSortLanguageFunc,
		setLastClean: setLastCleanFunc,
		setLastViewMS: setLastViewMSFunc
	}
});

export const {
	saveToLog,
	setDefaultSortLanguage,
	setLastClean,
	setLastViewMS
} = internalsSlice.actions;

export default internalsSlice.reducer;
