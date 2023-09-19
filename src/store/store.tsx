import { combineReducers, configureStore } from '@reduxjs/toolkit';

//import packageJson from '../package.json';
import msSlice from './msSlice';
import conceptsSlice from './conceptsSlice';
import settingsSlice from './settingsSlice';
import lexiconSlice from './lexiconSlice';
import wgSlice from './wgSlice';
import weSlice from './weSlice';
import extraCharactersSlice from './extraCharactersSlice';
import blankAppState from './blankAppState';

//
//
//
// ----- USE THIS to put in temporary changes for testing.
let initialAppState = {...blankAppState};
// ----- END
//
//

const reducerConfig = {
	// SLICES here
	appSettings: settingsSlice,
	we: weSlice,
	wg: wgSlice,
	ms: msSlice,
	concepts: conceptsSlice,
	lexicon: lexiconSlice,
	ec: extraCharactersSlice,
};
const reducer = combineReducers(reducerConfig);
const store = configureStore({
	reducer: reducer,
	preloadedState: initialAppState
});

export default store;
