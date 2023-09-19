import { createSlice } from '@reduxjs/toolkit'
import blankAppState from './blankAppState';
import { ExtraCharactersDisplayName, ExtraCharactersList, ExtraCharactersState } from './types';

const initialState = blankAppState.ec;

const toggleCopyImmediatelyFunc = (state: ExtraCharactersState) => {
	state.copyImmediately = !state.copyImmediately;
	return state;
};
const toggleShowNamesFunc = (state: ExtraCharactersState) => {
	state.showNames = !state.showNames;
	return state;
};
const setToCopyFunc = (state: ExtraCharactersState, action: { payload: string }) => {
	state.toCopy = action.payload;
	return state;
};
const setFavesFunc = (state: ExtraCharactersState, action: { payload: ExtraCharactersList }) => {
	state.faves = action.payload;
	return state;
};
const setNowShowingFunc = (state: ExtraCharactersState, action: { payload: ExtraCharactersDisplayName }) => {
	state.nowShowing = action.payload;
	return state;
};
const loadStateFunc = (state: ExtraCharactersState, action: { payload: ExtraCharactersState }) => {
	return {
		...state,
		...action.payload
	};
};

const extraCharactersSlice = createSlice({
	name: 'extraCharacters',
	initialState,
	reducers: {
		toggleCopyImmediately: toggleCopyImmediatelyFunc,
		toggleShowNames: toggleShowNamesFunc,
		setToCopy: setToCopyFunc,
		setFaves: setFavesFunc,
		setNowShowing: setNowShowingFunc,
		loadStateEC: loadStateFunc
	}
});

export const {
	toggleCopyImmediately,
	toggleShowNames,
	setToCopy,
	setFaves,
	setNowShowing,
	loadStateEC
} = extraCharactersSlice.actions;

export default extraCharactersSlice.reducer;
