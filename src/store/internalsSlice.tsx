import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { InternalState, SortLanguage } from './types';
import blankAppState from './blankAppState';

const initialState: InternalState = blankAppState.internals;

const logFunc = (state: InternalState, action: PayloadAction<any[]>) => {
	const logs: string[] = state.logs.concat(
		action.payload.map(
			line => typeof line === "string" ? line : JSON.stringify(line)
		),
		"---"
	);
	while(logs.length > 75) {
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


const internalsSlice = createSlice({
	name: 'internals',
	initialState,
	reducers: {
		doLog: logFunc,
		setDefaultSortLanguage: setDefaultSortLanguageFunc,
		setLastClean: setLastCleanFunc
	}
});

export const {
	doLog,
	setDefaultSortLanguage,
	setLastClean
} = internalsSlice.actions;

export default internalsSlice.reducer;
