//import React from 'react';

import { cleanStateWG } from './wgSlice';
import { cleanStateWE } from './weSlice';
import { cleanStateMS } from './msSlice';
import { cleanStateDJ } from './declenjugatorSlice';
import { cleanStateConcepts } from './conceptsSlice';
import { cleanStateLexicon } from './lexiconSlice';
import { cleanStateSettings } from './settingsSlice';
import { cleanStateSortSettings } from './sortingSlice';
import { cleanStateEC } from './extraCharactersSlice';
import { setLastClean } from './internalsSlice';

const interval = (
	1000 // 1000 miliseconds per second
	* 60 // 60 seconds per minute
	* 60 // 60 minutes per hour
	* 24 // 24 hours per day
);
const cutoff = 1;

const maybeCleanState = (dispatch: Function, lastClean: number) => {
	const now = Date.now();
	// Clean Storages
	if(lastClean < cutoff) {
		// Cleaning Storage should be less frequent.
		// TO-DO: clean storage
		// TO-DO: NOTE: TEXT_predPoss was **changed** from something else
		// So were others...
		/*
			"postP": true,
			"AVP": true,
			"prefixMost": true,
			"suffixLess": true
		 */
	}
	// Clean State
	if(now + interval > lastClean) {
		// We've cleaned today.
		return;
	}
	dispatch(cleanStateWG());
	dispatch(cleanStateWE());
	dispatch(cleanStateMS());
	dispatch(cleanStateDJ());
	dispatch(cleanStateConcepts());
	dispatch(cleanStateLexicon());
	dispatch(cleanStateSettings());
	dispatch(cleanStateSortSettings());
	dispatch(cleanStateEC());
	// Mark that we've cleaned.
	dispatch(setLastClean(now));
};

export default maybeCleanState;
