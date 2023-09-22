import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import blankAppState from './blankAppState';
import { MSBool, MSNum, MSText, MSState, MSBasic } from './types';

const initialState: MSState = blankAppState.ms;

const setMorphoSyntaxTextFunc = (state: MSState, action: PayloadAction<["id" | "description" | "title", string]>) => {
	const [prop, value] = action.payload;
	state[prop] = value;
	return state;
};
const setMorphoSyntaxNumFunc = (state: MSState, action: PayloadAction<["lastSave", number]>) => {
	const [prop, value] = action.payload;
	state[prop] = value;
	return state;
};
const setSyntaxBoolFunc = (state: MSState, action: PayloadAction<[MSBool, boolean]>) => {
	const [prop, value] = action.payload;
	state[prop] = value;
	return state;
};
const setSyntaxNumFunc = (state: MSState, action: PayloadAction<[string, number]>) => {
	const [prop, value] = action.payload;
	const newProp = ("NUM_" + prop) as MSNum;
	state[newProp] = value;
	return state;
};
const setSyntaxTextFunc = (state: MSState, action: PayloadAction<[string, string]>) => {
	const [prop, value] = action.payload;
	const newProp = ("TEXT_" + prop) as MSText;
	state[newProp] = value;
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
	return final;
};
// STORED CUSTOM INFO
const setStoredCustomInfoFunc = (state: MSState, action: PayloadAction<any>) => {
	const { payload } = action;
	state.storedCustomInfo = payload;
	state.storedCustomIDs = Object.keys(payload);
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

