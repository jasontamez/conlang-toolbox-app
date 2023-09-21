import { combineReducers, configureStore } from '@reduxjs/toolkit';

//import packageJson from '../package.json';
import msSlice from './msSlice';
import conceptsSlice from './conceptsSlice';
import settingsSlice from './settingsSlice';
import lexiconSlice from './lexiconSlice';
import wgSlice from './wgSlice';
import weSlice from './weSlice';
import extraCharactersSlice from './extraCharactersSlice';
import viewSlice from './viewSlice';
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
	view: viewSlice
};
const reducer = combineReducers(reducerConfig);
const store = configureStore({
	reducer: reducer,
	preloadedState: initialAppState
});

/* THE BELOW IS RECOMMENDED, but I don't know if I need it. Keeping it just in case I want it later.
// Infer the `RootState` and `AppDispatch` types from the store itself

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
*/

export default store;
