import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
	persistStore,
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER
} from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

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
const initialAppState = {...blankAppState};
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
	lastView: viewSlice
};
const persistConfig = {
	key: 'root',
	version: 1,
	storage,
};
const reducer = combineReducers(reducerConfig);
const persistedReducer = persistReducer(persistConfig, reducer);
const store = configureStore({
	reducer: persistedReducer,
	preloadedState: initialAppState,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
	  	})
});
const persistor = persistStore(store);
const storeInfo = { store, persistor };

/* THE BELOW IS RECOMMENDED, but I don't know if I need it. Keeping it just in case I want it later.
// Infer the `RootState` and `AppDispatch` types from the store itself

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
*/

export default storeInfo;
