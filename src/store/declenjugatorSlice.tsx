import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { DJGroup, DJState } from './types';
import blankAppState from './blankAppState';

const initialState = blankAppState.dj;

const setInputFunc = (state: DJState, action: PayloadAction<string>) => {
	state.input = action.payload;
	return state;
};

const addGroupFunc = (state: DJState, action: PayloadAction<DJGroup>) => {
	state.declenjugationGroups.push(action.payload);
	return state;
};

const editGroupFunc = (state: DJState, action: PayloadAction<DJGroup>) => {
	const newObj = action.payload;
	const { id } = newObj;
	state.declenjugationGroups = state.declenjugationGroups.map((obj => {
		if(obj.id === id) {
			return newObj;
		}
		return obj;
	}));
	return state;
};

const deleteGroupFunc = (state: DJState, action: PayloadAction<string | null>) => {
	const { payload } = action;
	state.declenjugationGroups = payload ? state.declenjugationGroups.filter(obj => (obj.id !== payload)) : [];
	return state;
};

const reorderGroupsFunc = (state: DJState, action: PayloadAction<DJGroup[]>) => {
	state.declenjugationGroups = action.payload;
	return state;
};

const declenjugatorSlice = createSlice({
	name: 'dj',
	initialState,
	reducers: {
		setInput: setInputFunc,
		addGroup: addGroupFunc,
		editGroup: editGroupFunc,
		deleteGroup: deleteGroupFunc,
		reorderGroups: reorderGroupsFunc
	}
});

export const {
	setInput,
	addGroup,
	editGroup,
	deleteGroup,
	reorderGroups
} = declenjugatorSlice.actions;

export default declenjugatorSlice.reducer;
