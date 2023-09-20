import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import blankAppState from './blankAppState';
import { ExtraCharactersDisplayName, ExtraCharactersList, ExtraCharactersState } from './types';
import debounce from '../components/Debounce';
import { StateStorage } from '../components/PersistentInfo';

const initialState = blankAppState.ec;

// Storage
const saveCurrentState = (state: ExtraCharactersState) => {
	debounce(StateStorage.setItem, ["lastStateEC", state], 1000, "savingStateEC");
};

const toggleCopyImmediatelyFunc = (state: ExtraCharactersState) => {
	state.copyImmediately = !state.copyImmediately;
	saveCurrentState(state);
	return state;
};
const toggleShowNamesFunc = (state: ExtraCharactersState) => {
	state.showNames = !state.showNames;
	saveCurrentState(state);
	return state;
};
const setToCopyFunc = (state: ExtraCharactersState, action: PayloadAction<string>) => {
	state.toCopy = action.payload;
	saveCurrentState(state);
	return state;
};
const setFavesFunc = (state: ExtraCharactersState, action: PayloadAction<ExtraCharactersList>) => {
	state.faves = action.payload;
	saveCurrentState(state);
	return state;
};
const setNowShowingFunc = (state: ExtraCharactersState, action: PayloadAction<ExtraCharactersDisplayName>) => {
	state.nowShowing = action.payload;
	saveCurrentState(state);
	return state;
};
const loadStateFunc = (state: ExtraCharactersState, action: PayloadAction<ExtraCharactersState>) => {
	const final = {
		...state,
		...action.payload
	};
	saveCurrentState(state);
	return final;
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

// Testing if state
export const _EC: { simple: (keyof ExtraCharactersState)[], possiblyFalsy: (keyof ExtraCharactersState)[]} = {
	simple: [
		"faves",
		"nowShowing"
	],
	possiblyFalsy: [
		"toCopy",
		"copyImmediately",
		"showNames"
	]
};
export const checkIfEC = (possible: ExtraCharactersState | any): possible is ExtraCharactersState => {
	const check = possible as ExtraCharactersState;
	const { simple, possiblyFalsy } = _EC;
	return simple.every(prop => check[prop]) && possiblyFalsy.every(prop => (check[prop] !== undefined));
};
