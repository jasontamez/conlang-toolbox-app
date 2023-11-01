import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import blankAppState from './blankAppState';
import { MSBool, MSNum, MSText, MSState } from './types';

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
const setSyntaxNumFunc = (state: MSState, action: PayloadAction<[MSNum, number]>) => {
	const [prop, value] = action.payload;
	state[prop] = value;
	return state;
};
const setSyntaxTextFunc = (state: MSState, action: PayloadAction<[MSText, string]>) => {
	const [prop, value] = action.payload;
	state[prop] = value;
	return state;
};

const setMorphoSyntaxFunc = (state: MSState, action: PayloadAction<MSState>) => {
	const final = {
		...state,
		...action.payload
	};
	return final;
};

const saveViewFunc = (state: MSState, action: PayloadAction<string>) => {
	const final = {
		...state,
		lastView: action.payload
	};
	return final;
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
		saveView: saveViewFunc
	}
});

export const {
	setMorphoSyntaxText,
	setMorphoSyntaxNum,
	setSyntaxBool,
	setSyntaxNum,
	setSyntaxText,
	loadStateMS,
	saveView
} = morphoSyntaxSlice.actions;

export default morphoSyntaxSlice.reducer;

