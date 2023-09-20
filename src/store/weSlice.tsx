import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import blankAppState from './blankAppState';
import { WECharGroupObject, WEOutputTypes, WEPresetObject, WESoundChangeObject, WEState, WETransformObject } from './types';
import debounce from '../components/Debounce';
import { StateStorage } from '../components/PersistentInfo';

const initialState: WEState = blankAppState.we as WEState;

// Storage
const saveCurrentState = (state: WEState) => {
	debounce(StateStorage.setItem, ["lastStateWE", state], 1000, "savingStateWE");
};

// INPUT
const setInputFunc = (state: WEState, action: PayloadAction<string>) => {
	const { payload } = action;
	state.input = payload.trim().replace(/(\s*\r?\n\s*)+/g, "\n");
	saveCurrentState(state);
	return state;
};

// GROUPS
const addCharacterGroupFunc = (state: WEState, action: PayloadAction<WECharGroupObject>) => {
	// {label, description, run}
	state.characterGroups.push(action.payload);
	saveCurrentState(state);
	return state;
};
const deleteCharacterGroupFunc = (state: WEState, action: PayloadAction<WECharGroupObject>) => {
	const { label } = action.payload;
	state.characterGroups = state.characterGroups.filter(group => group.label !== label);
	saveCurrentState(state);
	return state;
};
const editCharacterGroupFunc = (state: WEState, action: PayloadAction<{ label: string, edited: WECharGroupObject }>) => {
	const {label, edited} = action.payload;
	state.characterGroups = state.characterGroups.map(group => group.label === label ? edited : group);
	saveCurrentState(state);
	return state;
};
const copyCharacterGroupsFromElsewhereFunc = (state: WEState, action: PayloadAction<WECharGroupObject[]>) => {
	const newCharacterGroups = action.payload;
	const { characterGroups } = state;
	let incoming: { [key: string]: WECharGroupObject } = {};
	newCharacterGroups.forEach(cg => {
		incoming[cg.label!] = cg;
	});
	const final: WECharGroupObject[] = [];
	characterGroups.forEach(cg => {
		const {label} = cg;
		// Check for replacement
		if(incoming[label!]) {
			// Use replacement
			final.push(incoming[label!]);
			delete incoming[label!];
		} else {
			// Use original
			final.push(cg);
		}
	});
	newCharacterGroups.forEach(cg => {
		const {label} = cg;
		// Only save if we haven't used this to replace an old one
		if(incoming[label!]) {
			final.push(cg);
		}
	});
	state.characterGroups = final;
	saveCurrentState(state);
	return state;
};

// TRANSFORMS
const addTransformFunc = (state: WEState, action: PayloadAction<WETransformObject>) => {
	// { id, search, replace, direction, ?description }
	state.transforms.push(action.payload);
	saveCurrentState(state);
	return state;
};
const deleteTransformFunc = (state: WEState, action: PayloadAction<string>) => {
	const id = action.payload;
	state.transforms = state.transforms.filter(t => t.id !== id);
	saveCurrentState(state);
	return state;
};
const editTransformFunc = (state: WEState, action: PayloadAction<WETransformObject>) => {
	const item = action.payload;
	const { id } = item;
	state.transforms = state.transforms.map(t => t.id === id ? item : t);
	saveCurrentState(state);
	return state;
};
const rearrangeTransformsFunc = (state: WEState, action: PayloadAction<WETransformObject[]>) => {
	state.transforms = action.payload;
	saveCurrentState(state);
	return state;
};

// SOUND CHANGES
const addSoundChangeFunc = (state: WEState, action: PayloadAction<WESoundChangeObject>) => {
	// { id, beginning, ending, context, exception }
	state.soundChanges.push(action.payload);
	saveCurrentState(state);
	return state;
};
const deleteSoundChangeFunc = (state: WEState, action: PayloadAction<string>) => {
	const id = action.payload;
	state.soundChanges = state.soundChanges.filter(t => t.id !== id);
	saveCurrentState(state);
	return state;
};
const editSoundChangeFunc = (state: WEState, action: PayloadAction<WESoundChangeObject>) => {
	const item = action.payload;
	const { id } = item;
	state.soundChanges = state.soundChanges.map(t => t.id === id ? item : t);
	saveCurrentState(state);
	return state;
};
const rearrangeSoundChangesFunc = (state: WEState, action: PayloadAction<WESoundChangeObject[]>) => {
	state.soundChanges = action.payload;
	saveCurrentState(state);
	return state;
};

// SETTINGS
const setOutputFunc = (state: WEState, action: PayloadAction<WEOutputTypes>) => {
	const outputStyle = action.payload;
	switch(outputStyle) {
		case "outputOnly":
		case "inputFirst":
		case "outputFirst":
		case "rulesApplied":
			state.outputStyle = outputStyle;
			break;
		default:
			console.log(`INVALID OUTPUT STYLE [${outputStyle}]`);
	}
	saveCurrentState(state);
	return state;
};
const setFlagFunc = (state: WEState, action: PayloadAction<["inputLower" | "inputAlpha", boolean]>) => {
	const [prop, value] = action.payload;
	state[prop] = value;
	saveCurrentState(state);
	return state;
};

// STORED CUSTOM INFO
const setStoredCustomInfoFunc = (state: WEState, action: PayloadAction<any>) => {
	const { payload } = action;
	state.storedCustomInfo = payload;
	state.storedCustomIDs = Object.keys(payload);
	saveCurrentState(state);
	return state;
};

// LOAD INFO and CLEAR ALL
const loadStateFunc = (state: WEState, action: PayloadAction<WEPresetObject>) => {
	// If payload is null (or falsy), then initialState is used
	const {
		characterGroups,
		transforms,
		soundChanges
	} = action.payload || initialState;
	const newState = {
		...state,
		characterGroups: [...characterGroups],
		transforms: [...transforms],
		soundChanges: [...soundChanges]
	};
	saveCurrentState(newState);
	return newState;
};

const weSlice = createSlice({
	name: 'we',
	initialState,
	reducers: {
		setInputWE: setInputFunc,
		addCharacterGroupWE: addCharacterGroupFunc,
		deleteCharacterGroupWE: deleteCharacterGroupFunc,
		editCharacterGroupWE: editCharacterGroupFunc,
	// TO-DO: copy from WG
	copyCharacterGroupsFromElsewhere: copyCharacterGroupsFromElsewhereFunc,
		addTransformWE: addTransformFunc,
		deleteTransformWE: deleteTransformFunc,
		editTransformWE: editTransformFunc,
		rearrangeTransformsWE: rearrangeTransformsFunc,
		addSoundChangeWE: addSoundChangeFunc,
		deleteSoundChangeWE: deleteSoundChangeFunc,
		editSoundChangeWE: editSoundChangeFunc,
		rearrangeSoundChangesWE: rearrangeSoundChangesFunc,
		setOutputWE: setOutputFunc,
	setFlag: setFlagFunc,
		loadStateWE: loadStateFunc,
	setStoredCustomInfo: setStoredCustomInfoFunc
	}
});

export const {
	setInputWE,
	addCharacterGroupWE,
	deleteCharacterGroupWE,
	editCharacterGroupWE,
	copyCharacterGroupsFromElsewhere,
	addTransformWE,
	deleteTransformWE,
	editTransformWE,
	rearrangeTransformsWE,
	addSoundChangeWE,
	deleteSoundChangeWE,
	editSoundChangeWE,
	rearrangeSoundChangesWE,
	setOutputWE,
	setFlag,
	loadStateWE,
	setStoredCustomInfo
} = weSlice.actions;

export default weSlice.reducer;

// Testing if state
export const _WE: { simple: (keyof WEState)[], possiblyFalsy: (keyof WEState)[]} = {
	simple: [
		"characterGroups",
		"soundChanges",
		"transforms",
		"storedCustomInfo",
		"storedCustomIDs"
	],
	possiblyFalsy: [
		"outputStyle",
		"input",
		"inputLower",
		"inputAlpha"
	]
};
export const checkIfWE = (possible: WEState | any): possible is WEState => {
	const check = possible as WEState;
	const { simple, possiblyFalsy } = _WE;
	return simple.every(prop => check[prop]) && possiblyFalsy.every(prop => (check[prop] !== undefined));
};

