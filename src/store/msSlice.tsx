import { createSlice } from '@reduxjs/toolkit'
import blankAppState from './blankAppState';
import { Action, MSBool, MSNum, MSText, MSState } from './types';

const initialState: MSState = blankAppState.ms;

const setMorphoSyntaxTextFunc = (state: MSState, action: Action) => {
	const [prop, value]: ["id" | "description" | "title", string] = action.payload;
	state[prop] = value;
	return state;
};
const setMorphoSyntaxNumFunc = (state: MSState, action: Action) => {
	const [prop, value]: ["lastSave", number] = action.payload;
	state[prop] = value;
	return state;
};
const setSyntaxBoolFunc = (state: MSState, action: Action) => {
	const [prop, value]: [MSBool, boolean] = action.payload;
	state[prop] = value;
	return state;
};
const setSyntaxNumFunc = (state: MSState, action: Action) => {
	const [prop, value]: [string, number] = action.payload;
	const newProp = ("NUM_" + prop) as MSNum;
	state[newProp] = value;
	return state;
};
const setSyntaxTextFunc = (state: MSState, action: Action) => {
	const [prop, value]: [string, string] = action.payload;
	const newProp = ("TEXT_" + prop) as MSText;
	state[newProp] = value;
	return state;
};

const setMorphoSyntaxFunc = (state: MSState, action: Action) => {
	// If payload is null (or falsy), then initialState is used
	return {
		...state,
		...action.payload
	};
};
// STORED CUSTOM INFO
const setStoredCustomInfoFunc = (state: MSState, action: Action) => {
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
		setMorphoSyntax: setMorphoSyntaxFunc,
	setStoredCustomInfo: setStoredCustomInfoFunc
	}
});

export const {
	setMorphoSyntaxText,
	setMorphoSyntaxNum,
	setSyntaxBool,
	setSyntaxNum,
	setSyntaxText,
	setMorphoSyntax,
	setStoredCustomInfo
} = morphoSyntaxSlice.actions;

export default morphoSyntaxSlice.reducer;
