import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
	createMigrate,
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
import autoMergeLevel1 from 'redux-persist/lib/stateReconciler/autoMergeLevel1';

import debounce from '../components/Debounce';
import maybeUpdateTheme from '../components/MaybeUpdateTheme';
//import packageJson from '../package.json';
import msSlice from './msSlice';
import conceptsSlice from './conceptsSlice';
import settingsSlice from './settingsSlice';
import lexiconSlice from './lexiconSlice';
import wgSlice from './wgSlice';
import weSlice from './weSlice';
import extraCharactersSlice from './extraCharactersSlice';
import sortingSlice from './sortingSlice';
import declenjugatorSlice from './declenjugatorSlice';
import blankAppState from './blankAppState';
import logsSlice from './logsSlice';

//
//
//
// ----- USE THIS to put in temporary changes for testing.
const initialAppState = {...blankAppState};
// ----- END
//
//

// BELOW is where version adjustments can happen
const migrations = {
	1: (state: any) => {
		// change state here and return it
		const newState = {
			...state,
			dj: {
				input: [],
				usingLexiconForInput: null,
				identifiers: [],
				declenjugationGroups: []
			},
			logs: []
		};
		newState.ms.lastView = "msSettings";
		delete newState.wg.storedCustomInfo;
		delete newState.wg.storedCustomIDs;
		delete newState.we.storedCustomInfo;
		delete newState.we.storedCustomIDs;
		delete newState.ms.storedCustomInfo;
		delete newState.ms.storedCustomIDs;
		delete newState.lexicon.storedCustomInfo;
		delete newState.lexicon.storedCustomIDs;
		delete newState.viewState;
		return newState;
	}
}

const reducerConfig = {
	// SLICES here
	appSettings: settingsSlice,
	we: weSlice,
	wg: wgSlice,
	ms: msSlice,
	dj: declenjugatorSlice,
	concepts: conceptsSlice,
	lexicon: lexiconSlice,
	ec: extraCharactersSlice,
	sortSettings: sortingSlice,
	logs: logsSlice
};
const stateReconciler = (incomingState: any, originalState: any, reducedState: any, config: any) => {
	if(incomingState && originalState && (incomingState.appSettings.theme !== originalState.appSettings.theme)) {
		debounce(maybeUpdateTheme, [originalState.appSettings.theme, incomingState.appSettings.theme], 100, "rehydrateTheme");
	}
	return autoMergeLevel1(incomingState, originalState, reducedState, config);
};
const persistConfig = {
	key: 'root',
	version: 1,
	storage,
	stateReconciler,
	migrate: createMigrate(migrations, { debug: false })
};
const reducer = combineReducers(reducerConfig);
const persistedReducer = persistReducer(persistConfig, reducer);
const store = configureStore({
	reducer: persistedReducer,
	preloadedState: initialAppState,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [
					FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER,
					'lexicon/addLexiconItem',
					'lexicon/addItemsToLexiconColumn',
					'lexicon/doEditLexiconItem',
					'lexicon/updateLexiconSort',
					'lexicon/updateLexiconSortDir',
					'lexicon/mergeLexiconItems',
					'lexicon/updateLexiconColumarInfo'
				],
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
