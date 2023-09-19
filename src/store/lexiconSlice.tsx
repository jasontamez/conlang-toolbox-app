import { createSlice } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid';
import blankAppState from './blankAppState';
import { Action, Lexicon, LexiconBlankSorts, LexiconColumn, LexiconState } from './types';
import makeSorter from '../components/stringSorter';

const initialState = blankAppState.lexicon;

const sortBlank = (dir: boolean, method: LexiconBlankSorts) => {
	// returns [xIsBlank, yIsBlank]
	const sort = (dir ? "descending-" : "ascending-") + method;
	switch (sort) {
		case "descending-last":
		case "ascending-first":
		case "descending-alphaFirst":
		case "ascending-alphaFirst":
			return [-1, 1];
		case "ascending-last":
		case "descending-first":
		case "descending-alphaLast":
		case "ascending-alphaLast":
			return [1, -1];
	}
	return [0, 0];
};
const sortLexicon = (
	lexicon: Lexicon[],
	sortPattern: number[],
	sortDir: boolean,
	blankSort: LexiconBlankSorts
) => {
	const maxCol = sortPattern.length;
	const [xIsBlank, yIsBlank] = sortBlank(sortDir, blankSort);
	let newLexicon = [...lexicon];
//	console.log(sortLanguage, sensitivity);
	// TO-DO: fix sorting somehow
	const stringSorter = makeSorter("en", "variant");
	function sortFunction (a: Lexicon, b: Lexicon) {
		const columnsA = a.columns;
		const columnsB = b.columns;
		let comp = 0;
		let col = 0;
		// Check each column until we find a non-equal comparison
		//   (or we run out of columns)
		do {
			const sortingCol = sortPattern[col];
			const x = columnsA[sortingCol];
			const y = columnsB[sortingCol];
			try {
				if(!x && !y) {
					// Blanks are equal
					comp = 0;
				} else if (!x) {
					// first is blank
					comp = xIsBlank;
				} else if (!y) {
					// last is blank
					comp = yIsBlank;
				} else {
					comp = stringSorter(x, y);
				}
			} catch(error) {
				comp = 0;
				console.log(error);
			}
		} while (!comp && ++col < maxCol);
		if(col === maxCol) {
			// Completely equal? Sort by IDs to keep things consistent.
			const x = a.id;
			const y = b.id;
			// X SHOULD NEVER EQUAL Y
			comp = x > y ? 1 : -1;
		}
		if(sortDir && comp) {
			// Reverse order
			return comp * -1;
		}
		return comp;
	};
	newLexicon.sort(sortFunction);
	return newLexicon;
};


const loadStateFunc = (state: LexiconState, action: Action) => {
	return {
		...state,
		...action.payload,
		truncateColumns: state.truncateColumns
	};
};
const updateLexiconTextFunc = (state: LexiconState, action: { payload: ["title" | "description" | "id", string] }) => {
	const [ prop, value ] = action.payload;
	state[prop] = value;
	return state;
};
const updateLexiconNumberFunc = (state: LexiconState, action: { payload: ["lastSave", number] }) => {
	const [ prop, value ] = action.payload;
	state[prop] = value;
	return state;
};
const addLexiconItemFunc = (state: LexiconState, action: Action) => {
	state.lexicon = sortLexicon([action.payload, ...state.lexicon], state.sortPattern, state.sortDir, state.blankSort);
	return state;
};
const addItemstoLexiconColumnFunc = (state: LexiconState, action: { payload: [ string[], string ] }) => {
	const totalNumberOfColumns = state.columns.length;
	const [items, columnId] = action.payload;
	let columnNumber = 0;
	state.columns.every((c, i) => {
		if(c.id === columnId) {
			columnNumber = i;
			return false;
		}
		return true;
	});
	items.forEach((item: string) => {
		const obj: Lexicon = {
			id: uuidv4(),
			columns: []
		};
		for(let x = 0; x < totalNumberOfColumns; x++) {
			obj.columns.push(x === columnNumber ? item : "");
		}
		state.lexicon.push(obj);
	});
	//addMultipleItemsAsColumn({words: [array], column: "id"})
	state.lexicon = sortLexicon(state.lexicon, state.sortPattern, state.sortDir, state.blankSort);
	return state;
};
const editLexiconItemFunc = (state: LexiconState, action: Action) => {
	//editLexiconItem({item})
	const editedItem = action.payload;
	const editedID = editedItem.id;
	const editedLexicon = state.lexicon.map(item => item.id === editedID ? editedItem : item);
	state.lexicon = sortLexicon(editedLexicon, state.sortPattern, state.sortDir, state.blankSort);
	return state;
};
const deleteLexiconItemFunc = (state: LexiconState, action: Action) => {
	//deleteLexiconItem("id")
	const id = action.payload;
	state.lexicon = state.lexicon.filter(item => item.id !== id);
	return state;
};
const updateLexiconSortFunc = (state: LexiconState, action: { payload: number[] }) => {
	const { payload } = action;
	state.sortPattern = payload;
	state.lexicon = sortLexicon([...state.lexicon], payload, state.sortDir, state.blankSort);
	return state;
};
const updateLexiconSortDirFunc = (state: LexiconState, action: { payload: boolean }) => {
	const { payload } = action;
	state.sortDir = payload;
	state.lexicon = sortLexicon([...state.lexicon], state.sortPattern, payload, state.blankSort);
	return state;
};
const toggleLexiconWrapFunc = (state: LexiconState, action: Action) => {
	//setTruncate(boolean)
	state.truncateColumns = !state.truncateColumns;
	return state;
};
const setFontTypeFunc = (state: LexiconState, action: Action) => {
	//setFontType("Noto Serif" | "Noto Sans" | "Source Code Pro")
	//  SEE: consts.fontsMap
	state.fontType = action.payload;
	return state;
};
const setStoredCustomInfoFunc = (state: LexiconState, action: Action) => {
	//setStoredCustomInfo({
	//  id: [title, lastSave, lexicon-length, columns],
	//  ...
	//})
	const { payload } = action;
	state.storedCustomInfo = payload;
	state.storedCustomIDs = Object.keys(payload);
	return state;
};
const mergeLexiconItemsFunc = ( state: LexiconState, action: { payload: [Lexicon[], Lexicon] }) => {
	const [lexiconItemsBeingMerged, merged] = action.payload;
	merged.id = uuidv4();
	const newLexicon = [merged, ...state.lexicon.filter((lex) => lexiconItemsBeingMerged.every((lx) => lx.id !== lex.id))];
	state.lexicon = sortLexicon(newLexicon, state.sortPattern, state.sortDir, state.blankSort);
	return state;
};
const updateLexiconColumarInfoFunc = (state: LexiconState, action: { payload: [Lexicon[], LexiconColumn[], number[], boolean, LexiconBlankSorts] }) => {
	const [lex, columns, sortPattern, truncateColumns, blankSort] = action.payload;
	return {
		...state,
		columns,
		sortPattern,
		truncateColumns,
		blankSort,
		lexicon: sortLexicon(lex, sortPattern, state.sortDir, blankSort)
	};
};
//const setTitleFunc = (state: LexiconState, action: Action) => {};


const lexiconSlice = createSlice({
	name: 'lexicon',
	initialState,
	reducers: {
		updateLexiconText: updateLexiconTextFunc,
		updateLexiconNumber: updateLexiconNumberFunc,
		updateLexicon: loadStateFunc,
		addLexiconItem: addLexiconItemFunc,
		addItemstoLexiconColumn: addItemstoLexiconColumnFunc,
		doEditLexiconItem: editLexiconItemFunc,
		deleteLexiconItem: deleteLexiconItemFunc,
		updateLexiconSort: updateLexiconSortFunc,
		updateLexiconSortDir: updateLexiconSortDirFunc,
		toggleLexiconWrap: toggleLexiconWrapFunc,
	// TO-DO: custom info, font settings?
	setFontType: setFontTypeFunc,
	setStoredCustomInfo: setStoredCustomInfoFunc,
		mergeLexiconItems: mergeLexiconItemsFunc,
		updateLexiconColumarInfo: updateLexiconColumarInfoFunc
	}
});

export const {
	updateLexiconText,
	updateLexiconNumber,
	updateLexicon,
	addLexiconItem,
	addItemstoLexiconColumn,
	doEditLexiconItem,
	deleteLexiconItem,
	updateLexiconSort,
	updateLexiconSortDir,
	toggleLexiconWrap,
setFontType,
setStoredCustomInfo,
	mergeLexiconItems,
	updateLexiconColumarInfo
} = lexiconSlice.actions;

export default lexiconSlice.reducer;

// Constants are not changeable.
export const consts = {
	absoluteMaxColumns: 30,
	fontsMap: [
		["Serif", "Noto Serif"],
		["Sans-Serif", "Noto Sans"],
		["Monospace", "Source Code Pro"]
	]
};

// An equality-check function
export const equalityCheck = (stateA: LexiconState, stateB: LexiconState) => {
	if (stateA === stateB) {
		return true;
	}
	// stateA
	const titleA = stateA.title;
	const descriptionA = stateA.description;
	const lexiconA = stateA.lexicon;
	const truncateColumnsA = stateA.truncateColumns;
	const columnsA = stateA.columns;
	const sortDirA = stateA.sortDir;
	const sortPatternA = stateA.sortPattern;
	const blankSortA = stateA.blankSort;
	const fontTypeA = stateA.fontType;
	const storedCustomInfoA = stateA.storedCustomInfo;
	const storedCustomIDsA = stateA.storedCustomIDs;
	// stateB
	const titleB = stateB.title;
	const descriptionB = stateB.description;
	const lexiconB = stateB.lexicon;
	const truncateColumnsB = stateB.truncateColumns;
	const columnsB = stateB.columns;
	const sortDirB = stateB.sortDir;
	const sortPatternB = stateB.sortPattern;
	const blankSortB = stateB.blankSort;
	const fontTypeB = stateB.fontType;
	const storedCustomInfoB = stateB.storedCustomInfo;
	const storedCustomIDsB = stateB.storedCustomIDs;
	if (
		titleA !== titleB
		|| descriptionA !== descriptionB
		|| truncateColumnsA !== truncateColumnsB
		|| sortDirA !== sortDirB
		|| blankSortA !== blankSortB
		|| fontTypeA !== fontTypeB
		|| storedCustomInfoA !== storedCustomInfoB
		|| String(sortPatternA) !== String(sortPatternB)
		|| String(storedCustomIDsA) !== String(storedCustomIDsB)
	) {
		return false;
	}
	if(columnsA !== columnsB) {
		// Cols bad?
		const col = columnsA.every((col, i) => {
			const otherCol = columnsB[i];
			return col === otherCol ||
				(
					col.label === otherCol.label
					&& col.size === otherCol.size
				);
		});
		if(!col) {
			// if still bad, we're unequal
			return false;
		}
	}
	// Cols good. Lex bad?
	return (lexiconA === lexiconB) || lexiconA.every((lex, i) => {
		const otherLex = lexiconB[i];
		return lex === otherLex ||
			(
				lex.id === otherLex.id
				&& String(lex.columns) === String(otherLex.columns)
			);
	});
};

