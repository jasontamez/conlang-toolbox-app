import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import blankAppState from './blankAppState';
import { MSBool, MSNum, MSText, MSState, MSBasic } from './types';
import debounce from '../components/Debounce';
import { StateStorage } from '../components/PersistentInfo';

const initialState: MSState = blankAppState.ms;

// Storage
const saveCurrentState = (state: MSState) => {
	debounce(StateStorage.setItem, ["lastStateMS", state], 1000, "savingStateMS");
};

const setMorphoSyntaxTextFunc = (state: MSState, action: PayloadAction<["id" | "description" | "title", string]>) => {
	const [prop, value] = action.payload;
	state[prop] = value;
	saveCurrentState(state);
	return state;
};
const setMorphoSyntaxNumFunc = (state: MSState, action: PayloadAction<["lastSave", number]>) => {
	const [prop, value] = action.payload;
	state[prop] = value;
	saveCurrentState(state);
	return state;
};
const setSyntaxBoolFunc = (state: MSState, action: PayloadAction<[MSBool, boolean]>) => {
	const [prop, value] = action.payload;
	state[prop] = value;
	saveCurrentState(state);
	return state;
};
const setSyntaxNumFunc = (state: MSState, action: PayloadAction<[string, number]>) => {
	const [prop, value] = action.payload;
	const newProp = ("NUM_" + prop) as MSNum;
	state[newProp] = value;
	saveCurrentState(state);
	return state;
};
const setSyntaxTextFunc = (state: MSState, action: PayloadAction<[string, string]>) => {
	const [prop, value] = action.payload;
	const newProp = ("TEXT_" + prop) as MSText;
	state[newProp] = value;
	saveCurrentState(state);
	return state;
};

const setMorphoSyntaxFunc = (state: MSState, action: PayloadAction<MSBasic | MSState>) => {
	const {
		currentVersion,
		storedCustomIDs,
		storedCustomInfo
	} = state;
	const final = {
		currentVersion,
		storedCustomIDs,
		storedCustomInfo,
		...action.payload
	};
	saveCurrentState(final);
	return final;
};
// STORED CUSTOM INFO
const setStoredCustomInfoFunc = (state: MSState, action: PayloadAction<any>) => {
	const { payload } = action;
	state.storedCustomInfo = payload;
	state.storedCustomIDs = Object.keys(payload);
	saveCurrentState(state);
	return state;
};

const morphoSyntaxSlice = createSlice({
	name: 'ms',
	initialState,
	reducers: {
		setMorphoSyntaxText: setMorphoSyntaxTextFunc,
		setMorphoSyntaxNum: setMorphoSyntaxNumFunc,
		setSyntaxBool: setSyntaxBoolFunc,
		setSyntaxNum: setSyntaxNumFunc,
		setSyntaxText: setSyntaxTextFunc,
		loadStateMS: setMorphoSyntaxFunc,
	// TO-DO: stored custom info?
	setStoredCustomInfo: setStoredCustomInfoFunc
	}
});

export const {
	setMorphoSyntaxText,
	setMorphoSyntaxNum,
	setSyntaxBool,
	setSyntaxNum,
	setSyntaxText,
	loadStateMS,
	setStoredCustomInfo
} = morphoSyntaxSlice.actions;

export default morphoSyntaxSlice.reducer;

// Testing if state
export const _MS: { simple: (keyof MSState)[], possiblyFalsy: (keyof MSState)[]} = {
	simple: [
		"storedCustomInfo",
		"storedCustomIDs"
	],
	possiblyFalsy: [
		"id",
		"lastSave",
		"title",
		"description"
	]
};
export const checkIfMS = (possible: MSState | any): possible is MSState => {
	const check = possible as MSState;
	const { simple, possiblyFalsy } = _MS;
	return simple.every(prop => check[prop]) && possiblyFalsy.every(prop => (check[prop] !== undefined));
};
