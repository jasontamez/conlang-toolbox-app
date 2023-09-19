import { createSlice } from '@reduxjs/toolkit'
import blankAppState from './blankAppState';
import { Action, WECharGroupObject, WEOutputTypes, WEPresetObject, WEState } from './types';

const initialState: WEState = blankAppState.we as WEState;

// INPUT
const setInputFunc = (state: WEState, action: Action) => {
	const { payload } = action;
	state.input = payload.trim().replace(/(\s*\r?\n\s*)+/g, "\n");
	return state;
};

// GROUPS
const addCharacterGroupFunc = (state: WEState, action: Action) => {
	// {label, description, run}
	state.characterGroups.push(action.payload);
	return state;
};
const deleteCharacterGroupFunc = (state: WEState, action: Action) => {
	const { label } = action.payload;
	state.characterGroups = state.characterGroups.filter(group => group.label !== label);
	return state;
};
const editCharacterGroupFunc = (state: WEState, action: { payload: { label: string, edited: WECharGroupObject } }) => {
	const {label, edited} = action.payload;
	state.characterGroups = state.characterGroups.map(group => group.label === label ? edited : group);
	return state;
};
const copyCharacterGroupsFromElsewhereFunc = (state: WEState, action: Action) => {
	const newCharacterGroups: WECharGroupObject[] = action.payload;
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
	return state;
};

// TRANSFORMS
const addTransformFunc = (state: WEState, action: Action) => {
	// { id, search, replace, direction, ?description }
	state.transforms.push(action.payload);
	return state;
};
const deleteTransformFunc = (state: WEState, action: Action) => {
	const id = action.payload;
	state.transforms = state.transforms.filter(t => t.id !== id);
	return state;
};
const editTransformFunc = (state: WEState, action: Action) => {
	const item = action.payload;
	const { id } = item;
	state.transforms = state.transforms.map(t => t.id === id ? item : t);
	return state;
};
const rearrangeTransformsFunc = (state: WEState, action: Action) => {
	state.transforms = action.payload;
	return state;
};

// SOUND CHANGES
const addSoundChangeFunc = (state: WEState, action: Action) => {
	// { id, beginning, ending, context, exception }
	state.soundChanges.push(action.payload);
	return state;
};
const deleteSoundChangeFunc = (state: WEState, action: Action) => {
	const id = action.payload;
	state.soundChanges = state.soundChanges.filter(t => t.id !== id);
	return state;
};
const editSoundChangeFunc = (state: WEState, action: Action) => {
	const item = action.payload;
	const { id } = item;
	state.soundChanges = state.soundChanges.map(t => t.id === id ? item : t);
	return state;
};
const rearrangeSoundChangesFunc = (state: WEState, action: Action) => {
	state.soundChanges = action.payload;
	return state;
};

// SETTINGS
const setOutputFunc = (state: WEState, action: { payload: WEOutputTypes }) => {
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
	return state;
};
const setFlagFunc = (state: WEState, action: Action) => {
	const [prop, value]: ["inputLower" | "inputAlpha", boolean] = action.payload;
	state[prop] = value;
	return state;
};

// STORED CUSTOM INFO
const setStoredCustomInfoFunc = (state: WEState, action: Action) => {
	const { payload } = action;
	state.storedCustomInfo = payload;
	state.storedCustomIDs = Object.keys(payload);
	return state;
};

// LOAD INFO and CLEAR ALL
const loadStateFunc = (state: WEState, action: { payload: WEPresetObject }) => {
	// If payload is null (or falsy), then initialState is used
	const {
		characterGroups,
		transforms,
		soundChanges
	} = action.payload || initialState;
	return {
		...state,
		characterGroups: [...characterGroups],
		transforms: [...transforms],
		soundChanges: [...soundChanges]
	};
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
