import { v4 as uuidv4 } from 'uuid';
import WGPresets from './WGPresets';
import WEPresets from './WEPresets';
import { StateStorage } from './PersistentInfo';
import maybeUpdateTheme from './MaybeUpdateTheme';
import * as consts from './ReduxDucksConst';
import * as types from './ReduxDucksTypes';
import debounce from './Debounce';

const reduceAppSettings = (original: types.AppSettings) => {
	return {...original};
};
const reduceCharGroupWG = (original: types.WGCharGroupStateObject, newMap: types.WGCharGroupMap[] = original.map) => {
	let map: types.WGCharGroupMap[] = [];
	if(newMap === original.map) {
		newMap.forEach(item => {
			const o: types.WGCharGroupObject = {...item[1]};
			map.push([item[0], o]);
		});
	} else {
		map = newMap;
	}
	return {
		map,
		editing: original.editing
	};
};
const reduceSyllablesWG = (original: types.WGSyllableStateObject) => {
	const oo = original.objects;
	return {
		...original,
		objects: {
			singleWord: reduceSubSyllablesWG(oo.singleWord),
			wordInitial: reduceSubSyllablesWG(oo.wordInitial),
			wordMiddle: reduceSubSyllablesWG(oo.wordMiddle),
			wordFinal: reduceSubSyllablesWG(oo.wordFinal)
		}
	};
};
const reduceSubSyllablesWG = (original: types.WGSyllableObject) => {
	const o: types.WGSyllableObject = {
		components: [...original.components]
	}
	if (original.dropoffOverride !== undefined) {
		o.dropoffOverride = original.dropoffOverride;
	}
	return o;
};
const reduceTransformsStateWG = (original: types.WGTransformStateObject, mod: string = "", transform: any = null) => {
	// mod = 'add' -> add new transform (object)
	// mod = 'del' -> delete transform (key)
	// mod = 'edit' -> replace transform (object)
	// mod = '' -> do nothing
	let list;
	switch (mod) {
		case 'add':
			list = original.list.map(tForm => reduceTransformsWG(tForm));
			list.push(transform);
			break;
		case 'del':
			list = original.list.filter(tForm => tForm.key !== transform.key).map(tForm => reduceTransformsWG(tForm));
			break;
		case 'edit':
			list = original.list.map(tForm => tForm.key === transform.key ? transform : reduceTransformsWG(tForm));
			break;
		default:
			list = original.list.map(tForm => reduceTransformsWG(tForm));
	}
	return {
		list,
		editing: original.editing
	};
};
const reduceTransformsWG = (original: types.WGTransformObject) => {
	return {...original};
};
const reduceSettingsWG = (original: types.WGSettingsObject) => {
	return {...original};
};
const reduceCharGroupWE = (original: types.WECharGroupStateObject, newMap: types.WECharGroupMap[] = original.map) => {
	let map: types.WECharGroupMap[] = [];
	if(newMap === original.map) {
		newMap.forEach(item => {
			const o: types.WECharGroupObject = {...item[1]};
			map.push([item[0], o]);
		});
	} else {
		map = newMap;
	}
	return {
		map,
		editing: original.editing
	};
};
const reduceTransformsStateWE = (original: types.WETransformStateObject, mod: string = "", transform: any = null) => {
	// mod = 'add' -> add new transform (object)
	// mod = 'del' -> delete transform (key)
	// mod = 'edit' -> replace transform (object)
	// mod = '' -> do nothing
	let list;
	switch (mod) {
		case 'add':
			list = original.list.map(tForm => reduceTransformsWE(tForm));
			list.push(transform);
			break;
		case 'del':
			list = original.list.filter(tForm => tForm.key !== transform.key).map(tForm => reduceTransformsWE(tForm));
			break;
		case 'edit':
			list = original.list.map(tForm => tForm.key === transform.key ? transform : reduceTransformsWE(tForm));
			break;
		default:
			list = original.list.map(tForm => reduceTransformsWE(tForm));
	}
	return {
		list,
		editing: original.editing
	};
};
const reduceTransformsWE = (original: types.WETransformObject) => {
	return {...original};
};
const reduceSoundChangeStateWE = (original: types.WESoundchangeStateObject, mod: string = "", transform: any = null) => {
	// mod = 'add' -> add new transform (object)
	// mod = 'del' -> delete transform (key)
	// mod = 'edit' -> replace transform (object)
	// mod = '' -> do nothing
	let list;
	switch (mod) {
		case 'add':
			list = original.list.map(tForm => reduceSoundChangesWE(tForm));
			list.push(transform);
			break;
		case 'del':
			list = original.list.filter(tForm => tForm.key !== transform.key).map(tForm => reduceSoundChangesWE(tForm));
			break;
		case 'edit':
			list = original.list.map(tForm => tForm.key === transform.key ? transform : reduceSoundChangesWE(tForm));
			break;
		default:
			list = original.list.map(tForm => reduceSoundChangesWE(tForm));
	}
	return {
		list,
		editing: original.editing
	};
};
const reduceSoundChangesWE = (original: types.WESoundChangeObject) => {
	return {...original};
};
const reduceSettingsWE = (original: types.WESettingsObject) => {
	return {...original};
};
const sortLexicon = (lexicon: types.Lexicon[], sortPattern: number[], sortDir: boolean) => {
	const maxCol = sortPattern.length;
	let newLexicon = [...lexicon];
	newLexicon.sort((a, b) => {
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
				comp = x.localeCompare(y, 'en', {numeric: true, usage: 'sort'});
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
			return 0 - comp;
		}
		return comp;
	});
	return newLexicon;
};
const reduceLexiconState = (original: types.LexiconObject) => {
	const {
		lexicon,
		sortPattern,
		sortDir,
		columns
	} = original;
	return {
		...original,
		columns: [...columns.map(col => ({...col}))],
		sortPattern: [...sortPattern],
		lexicon: sortLexicon(lexicon.map(lex => reduceLexicon(lex)), sortPattern, sortDir)
	};
};
const reduceMorphoSyntaxModalState = (original: types.MorphoSyntaxModalStateObject) => {
	return {...original};
};
const reduceMorphoSyntaxInfo = (original: types.MorphoSyntaxObject) => {
	return {
		...original,
		bool: {...original.bool},
		num: {...original.num},
		text: {...original.text}
	};
};
const reduceLexicon = (original: types.Lexicon) => {
	return {
		id: original.id,
		columns: [...original.columns]
	};
};
const reduceViewState = (original: types.ViewStateObject) => {
	return {...original};
};
const reduceExtraCharactersState = (original: types.ExtraCharactersState) => {
	return {
		...original,
		saved: [...original.saved]
	};
}
const reduceWordListsState = (original: types.WordListsState) => {
	return {
		...original,
		display: [...original.display],
		combinations: original.combinations.map((o: types.WLCombo) => {
			const { id, parts } = o;
			return { id, parts: parts.map(part => ({...part}))};
		})
	};
}
//const reduceLog = (original: string[]) => {
//	return [...original];
//}


const stateObjectProps: [(keyof types.StateObject), Function][] = [
	["currentVersion", (v: string) => v],
	["appSettings", reduceAppSettings],
	["wordgenCharGroups", reduceCharGroupWG],
	["wordgenSyllables", reduceSyllablesWG],
	["wordgenTransforms", reduceTransformsStateWG],
	["wordgenSettings", reduceSettingsWG],
	["wordevolveCharGroups", reduceCharGroupWE],
	["wordevolveTransforms", reduceTransformsStateWE],
	["wordevolveSoundChanges", reduceSoundChangeStateWE],
	["wordevolveInput", (i: string[]) => [...i]],
	["wordevolveSettings", reduceSettingsWE],
	["morphoSyntaxModalState", reduceMorphoSyntaxModalState],
	["morphoSyntaxInfo", reduceMorphoSyntaxInfo],
	["lexicon", reduceLexiconState],
	["viewState", reduceViewState],
	["extraCharactersState", reduceExtraCharactersState],
	["wordListsState", reduceWordListsState],
//	["logs", reduceLog]
];
export const checkIfState = (possibleState: types.StateObject | any): possibleState is types.StateObject => {
	const check = (possibleState as types.StateObject);
	return stateObjectProps.every(pair => {
		const prop: keyof types.StateObject = pair[0];
		return check[prop];
	});
};
const reduceAllBut = (props: (keyof types.StateObject)[], state: types.StateObject) => {
	const check: any = {};
	const output: any = {};
	props.forEach(prop => { check[prop] = true; });
	stateObjectProps.forEach(pair => {
		const [prop, func] = pair;
		if(!check[prop]) {
			output[prop] = func(state[prop]);
		}
	});
	return output;
};
const simple: types.WGPreset = WGPresets.get("Simple")!;
export const blankAppState: types.StateObject = {
	currentVersion: consts.VERSION.current,
	appSettings: {
		theme: "Default",
		disableConfirms: false
	},
	wordgenCharGroups: {
		map: [],
		editing: null
	},
	wordgenSyllables: {
		toggle: false,
		objects: {
			singleWord: { components: [] },
			wordInitial: { components: [] },
			wordMiddle: { components: [] },
			wordFinal: { components: [] }
		}
	},
	wordgenTransforms: {
		list: [],
		editing: null
	},
	wordgenSettings: {
		...simple.wordgenSettings,
		output: "text",
		showSyllableBreaks: false,
		sentencesPerText: 30,
		capitalizeWords: false,
		sortWordlist: true,
		wordlistMultiColumn: true,
		wordsPerWordlist: 250
	},
	wordevolveCharGroups: {
		map: [],
		editing: null
	},
	wordevolveTransforms: {
		list: [],
		editing: null
	},
	wordevolveSoundChanges: {
		list: [],
		editing: null
	},
	wordevolveInput: [],
	wordevolveSettings: {
		output: "outputOnly"
	},
	morphoSyntaxModalState: {},
	morphoSyntaxInfo: {
		key: "",
		lastSave: 0,
		title: "",
		description: "",
		bool: {},
		num: {},
		text: {}
	},
	lexicon: {
		id: "",
		lastSave: 0,
		title: "",
		description: "",
		truncateColumns: true,
		sortDir: false,
		sortPattern: [0, 1, 2],
		columns: [
			{
				id: "00",
				label: "Word",
				size: "m"
			},
			{
				id: "11",
				label: "Part of Speech",
				size: "s"
			},
			{
				id: "22",
				label: "Definition",
				size: "l"
			}
		],
		lexicon: []
	},
	viewState: {
		wg: 'charGroups',
		we: 'charGroups',
		wl: 'home',
		ms: 'syntax',
		ph: 'home',
		lastSection: ''
	},
	extraCharactersState: {
		display: "Favorites",
		saved: [],
		copyImmediately: false,
		copyLater: "",
		adding: false,
		deleting: false,
		showNames: false,
		showHelp: false
	},
	wordListsState: {
		display: [],
		textCenter: true,
		showingCombos: false,
		combinations: []
	}
//	logs: []
};
export const initialAppState: types.StateObject = {
	...blankAppState,
	wordgenCharGroups: simple.wordgenCharGroups,
	wordgenSyllables: simple.wordgenSyllables,
	wordgenTransforms: simple.wordgenTransforms
};

// Storage
const saveCurrentState = (state: types.StateObject) => {
	const newState = reduceAllBut([], state);
	// Eliminate not-stringifyable properties (if any)
	// Save
	StateStorage.setItem("lastState", newState);
	console.log("Save");
	console.log(newState);
};
const initialState: types.StateObject = reduceAllBut([], blankAppState);

// reducer
export function reducer(state: types.StateObject = initialState, action: any) {
	const payload = action.payload;
	let CO: types.WGCharGroupStateObject;
	let Cmap: types.WGCharGroupMap[] = [];
	let newCharGroups: types.WGCharGroupStateObject;
	let SO: types.WGSyllableStateObject;
	let RO: types.WGTransformStateObject;
	let final: types.StateObject;
	let label: string;
	let LO: types.LexiconObject;
	let ECO: types.ExtraCharactersState;
	switch(action.type) {
		// App Settings
		case consts.CHANGE_THEME:
			final = {
				...reduceAllBut(["appSettings"], state),
				appSettings: {
					...state.appSettings,
					theme: payload
				}
			};
			maybeUpdateTheme(state.appSettings.theme, final.appSettings.theme);
			break;
		case consts.TOGGLE_DISABLE_CONFIRM:
			final = {
				...reduceAllBut(["appSettings"], state),
				appSettings: {
					...state.appSettings,
					disableConfirms: payload
				}
			};
			break;
		//
		// WORDGEN
		//
		// CharGroup
		case consts.ADD_CHARACTER_GROUP_WG:
			CO = state.wordgenCharGroups;
			Cmap = CO.map.map((item: types.WGCharGroupMap) => [item[0], item[1]]);
			label = payload.label;
			delete payload.label;
			Cmap.push([label, payload]);
			newCharGroups = reduceCharGroupWG(CO, Cmap);
			// make new object, copy props from state, overwrite prop(s) with new object with new payload
			final = {
				...reduceAllBut(["wordgenCharGroups"], state),
				wordgenCharGroups: newCharGroups
			};
			break;
		case consts.START_EDIT_CHARACTER_GROUP_WG:
			CO = state.wordgenCharGroups;
			newCharGroups = reduceCharGroupWG(CO);
			newCharGroups.editing = payload;
			final = {
				...reduceAllBut(["wordgenCharGroups"], state),
				wordgenCharGroups: newCharGroups
			};
			break;
		case consts.DO_EDIT_CHARACTER_GROUP_WG:
			CO = state.wordgenCharGroups;
			Cmap = CO.map.map(item => {
				const [label, charGroup] = item;
				if(label === CO.editing) {
					delete payload.label;
					return [label, payload];
				}
				return[label, charGroup];
			});
			newCharGroups = reduceCharGroupWG(CO, Cmap);
			final = {
				...reduceAllBut(["wordgenCharGroups"], state),
				wordgenCharGroups: newCharGroups
			};
			break;
		case consts.CANCEL_EDIT_CHARACTER_GROUP_WG:
			CO = state.wordgenCharGroups;
			newCharGroups = reduceCharGroupWG(CO);
			newCharGroups.editing = null;
			final = {
				...reduceAllBut(["wordgenCharGroups"], state),
				wordgenCharGroups: newCharGroups
			};
			break;
		case consts.DELETE_CHARACTER_GROUP_WG:
			CO = state.wordgenCharGroups;
			Cmap = CO.map.map((item: types.WGCharGroupMap) => [item[0], item[1]]);
			Cmap = CO.map.filter((item: types.WGCharGroupMap) => item[0] !== payload.label).map((item: types.WGCharGroupMap) => [item[0], item[1]]);
			newCharGroups = reduceCharGroupWG(CO, Cmap);
			final = {
				...reduceAllBut(["wordgenCharGroups"], state),
				wordgenCharGroups: newCharGroups
			};
			break;
		// Syllables
		case consts.TOGGLE_SYLLABLES:
			SO = reduceSyllablesWG(state.wordgenSyllables);
			SO.toggle = payload;
			final = {
				...reduceAllBut(["wordgenSyllables"], state),
				wordgenSyllables: SO
			};
			break;
		case consts.EDIT_SYLLABLES:
			SO = reduceSyllablesWG(state.wordgenSyllables);
			SO.objects[payload.key as keyof types.AllWGSyllableObjects].components = payload.syllables;
			final = {
				...reduceAllBut(["wordgenSyllables"], state),
				wordgenSyllables: SO
			};
			break;
		case consts.SET_EDIT_SYLLABLES:
			final = reduceAllBut([], state);
			if(payload === undefined) {
				delete final.wordgenSyllables.editing;
			} else {
				final.wordgenSyllables.editing = payload;
			}
			break;
		case consts.MOD_SYLLABLE_DROPOFF:
			final = reduceAllBut([], state);
			if(payload.value === undefined) {
				delete final.wordgenSyllables.objects[payload.key as keyof types.AllWGSyllableObjects].dropoffOverride;
			} else {
				final.wordgenSyllables.objects[payload.key as keyof types.AllWGSyllableObjects].dropoffOverride = payload.value;
			}
			break;
		// Transforms
		case consts.ADD_REWRITE_RULE_WG:
			RO = reduceTransformsStateWG(state.wordgenTransforms, 'add', payload);
			final = {
				...reduceAllBut(["wordgenTransforms"], state),
				wordgenTransforms: RO
			};
			break;
		case consts.START_EDIT_REWRITE_RULE_WG:
			RO = reduceTransformsStateWG(state.wordgenTransforms);
			RO.editing = payload;
			final = {
				...reduceAllBut(["wordgenTransforms"], state),
				wordgenTransforms: RO
			};
			break;
		case consts.DO_EDIT_REWRITE_RULE_WG:
			RO = reduceTransformsStateWG(state.wordgenTransforms, 'edit', payload);
			final = {
				...reduceAllBut(["wordgenTransforms"], state),
				wordgenTransforms: RO
			};
			break;
		case consts.CANCEL_EDIT_REWRITE_RULE_WG:
			RO = reduceTransformsStateWG(state.wordgenTransforms);
			RO.editing = null;
			final = {
				...reduceAllBut(["wordgenTransforms"], state),
				wordgenTransforms: RO
			};
			break;
		case consts.DELETE_REWRITE_RULE_WG:
			RO = reduceTransformsStateWG(state.wordgenTransforms, 'del', payload);
			final = {
				...reduceAllBut(["wordgenTransforms"], state),
				wordgenTransforms: RO
			};
			break;
		case consts.REORDER_REWRITE_RULE_WG:
			RO = {
				list: payload.map((tForm: types.WGTransformObject) => reduceTransformsWG(tForm)),
				editing: state.wordgenTransforms.editing
			};
			final = {
				...reduceAllBut(["wordgenTransforms"], state),
				wordgenTransforms: RO
			};
			break;
		// Wordgen Settings
		case consts.SET_MONO_RATE_WG:
			final = {
				...reduceAllBut(["wordgenSettings"], state),
				wordgenSettings: {
					...state.wordgenSettings,
					monosyllablesRate: payload
				}
			};
			break;
		case consts.SET_MAX_SYLLABLES_WG:
			final = {
				...reduceAllBut(["wordgenSettings"], state),
				wordgenSettings: {
					...state.wordgenSettings,
					maxSyllablesPerWord: payload
				}
			};
			break;
		case consts.SET_CHARACTER_GROUP_DROPOFF_WG:
			final = {
				...reduceAllBut(["wordgenSettings"], state),
				wordgenSettings: {
					...state.wordgenSettings,
					charGroupRunDropoff: payload
				}
			};
			break;
		case consts.SET_SYLLABLE_DROPOFF_WG:
			final = {
				...reduceAllBut(["wordgenSettings"], state),
				wordgenSettings: {
					...state.wordgenSettings,
					syllableBoxDropoff: payload
				}
			};
			break;
		case consts.SET_OUTPUT_WG:
			final = {
				...reduceAllBut(["wordgenSettings"], state),
				wordgenSettings: {
					...state.wordgenSettings,
					output: payload
				}
			};
			break;
		case consts.SET_SYLLABLE_BREAKS_WG:
			final = {
				...reduceAllBut(["wordgenSettings"], state),
				wordgenSettings: {
					...state.wordgenSettings,
					showSyllableBreaks: payload
				}
			};
			break;
		case consts.SET_NUMBER_OF_SENTENCES_WG:
			final = {
				...reduceAllBut(["wordgenSettings"], state),
				wordgenSettings: {
					...state.wordgenSettings,
					sentencesPerText: payload
				}
			};
			break;
		case consts.SET_SENTENCE_CAPITALIZATION_WG:
			final = {
				...reduceAllBut(["wordgenSettings"], state),
				wordgenSettings: {
					...state.wordgenSettings,
					capitalizeSentences: payload
				}
			};
			break;
		case consts.SET_DECLARATIVE_PRE_WG:
			final = {
				...reduceAllBut(["wordgenSettings"], state),
				wordgenSettings: {
					...state.wordgenSettings,
					declarativeSentencePre: payload
				}
			};
			break;
		case consts.SET_DECLARATIVE_POST_WG:
			final = {
				...reduceAllBut(["wordgenSettings"], state),
				wordgenSettings: {
					...state.wordgenSettings,
					declarativeSentencePost: payload
				}
			};
			break;
		case consts.SET_INTERROGATIVE_PRE_WG:
			final = {
				...reduceAllBut(["wordgenSettings"], state),
				wordgenSettings: {
					...state.wordgenSettings,
					interrogativeSentencePre: payload
				}
			};
			break;
		case consts.SET_INTERROGATIVE_POST_WG:
			final = {
				...reduceAllBut(["wordgenSettings"], state),
				wordgenSettings: {
					...state.wordgenSettings,
					interrogativeSentencePost: payload
				}
			};
			break;
		case consts.SET_EXCLAMATORY_PRE_WG:
			final = {
				...reduceAllBut(["wordgenSettings"], state),
				wordgenSettings: {
					...state.wordgenSettings,
					exclamatorySentencePre: payload
				}
			};
			break;
		case consts.SET_EXCLAMATORY_POST_WG:
			final = {
				...reduceAllBut(["wordgenSettings"], state),
				wordgenSettings: {
					...state.wordgenSettings,
					exclamatorySentencePost: payload
				}
			};
			break;
		case consts.SET_WORD_CAPITALIZATION_WG:
			final = {
				...reduceAllBut(["wordgenSettings"], state),
				wordgenSettings: {
					...state.wordgenSettings,
					capitalizeWords: payload
				}
			};
			break;
		case consts.SET_SORT_WORDLIST_WG:
			final = {
				...reduceAllBut(["wordgenSettings"], state),
				wordgenSettings: {
					...state.wordgenSettings,
					sortWordlist: payload
				}
			};
			break;
		case consts.SET_WORDLIST_MULTICOLUMN_WG:
			final = {
				...reduceAllBut(["wordgenSettings"], state),
				wordgenSettings: {
					...state.wordgenSettings,
					wordlistMultiColumn: payload
				}
			};
			break;
		case consts.SET_WORDS_PER_WORDLIST_WG:
			final = {
				...reduceAllBut(["wordgenSettings"], state),
				wordgenSettings: {
					...state.wordgenSettings,
					wordsPerWordlist: payload
				}
			};
			break;
		case consts.LOAD_CUSTOM_INFO_WG:
			final = {
				...reduceAllBut(["wordgenCharGroups", "wordgenSyllables", "wordgenTransforms", "wordgenSettings"], state),
				wordgenCharGroups: payload[0],
				wordgenSyllables: payload[1],
				wordgenTransforms: payload[2],
				wordgenSettings: {
					...state.wordgenSettings,
					...payload[3]
				}
			};
			break;
		// WG Presets
		case consts.LOAD_PRESET_WG:
			const newInfo: any = WGPresets.get(payload);
			final = {
				...reduceAllBut(["wordgenCharGroups", "wordgenSyllables", "wordgenTransforms", "wordgenSettings"], state),
				wordgenCharGroups: reduceCharGroupWG(newInfo.wordgenCharGroups),
				wordgenSyllables: reduceSyllablesWG(newInfo.wordgenSyllables),
				wordgenTransforms: reduceTransformsStateWG(newInfo.wordgenTransforms),
				wordgenSettings: {
					...state.wordgenSettings,
					...newInfo.wordgenSettings
				}
			};
			break;
		case consts.CLEAR_EVERYTHING_WG:
			final = {
				...reduceAllBut(["wordgenCharGroups", "wordgenSyllables", "wordgenTransforms"], state),
				wordgenCharGroups: {
					map: [],
					editing: null
				},
				wordgenSyllables: {
					toggle: false,
					objects: {
						singleWord: { components: [] },
						wordInitial: { components: [] },
						wordMiddle: { components: [] },
						wordFinal: { components: [] }
					}
				},
				wordgenTransforms: {
					list: [],
					editing: null
				}
			};
			break;
		//
		// WORDEVOLVE
		//
		// CharGroup
		case consts.ADD_CHARACTER_GROUP_WE:
			CO = state.wordevolveCharGroups;
			Cmap = CO.map.map((item: types.WECharGroupMap) => [item[0], item[1]]);
			label = payload.label;
			delete payload.label;
			Cmap.push([label, payload]);
			newCharGroups = reduceCharGroupWG(CO, Cmap);
			// make new object, copy props from state, overwrite prop(s) with new object with new payload
			final = {
				...reduceAllBut(["wordevolveCharGroups"], state),
				wordevolveCharGroups: newCharGroups
			};
			break;
		case consts.START_EDIT_CHARACTER_GROUP_WE:
			CO = state.wordevolveCharGroups;
			newCharGroups = reduceCharGroupWG(CO);
			newCharGroups.editing = payload;
			final = {
				...reduceAllBut(["wordevolveCharGroups"], state),
				wordevolveCharGroups: newCharGroups
			};
			break;
		case consts.DO_EDIT_CHARACTER_GROUP_WE:
			CO = state.wordevolveCharGroups;
			Cmap = CO.map.map(item => {
				const [label, charGroup] = item;
				if(label === CO.editing) {
					delete payload.label;
					return [label, payload];
				}
				return[label, charGroup];
			});
			newCharGroups = reduceCharGroupWG(CO, Cmap);
			final = {
				...reduceAllBut(["wordevolveCharGroups"], state),
				wordevolveCharGroups: newCharGroups
			};
			break;
		case consts.CANCEL_EDIT_CHARACTER_GROUP_WE:
			CO = state.wordevolveCharGroups;
			newCharGroups = reduceCharGroupWG(CO);
			newCharGroups.editing = null;
			final = {
				...reduceAllBut(["wordevolveCharGroups"], state),
				wordevolveCharGroups: newCharGroups
			};
			break;
		case consts.DELETE_CHARACTER_GROUP_WE:
			CO = state.wordevolveCharGroups;
			Cmap = CO.map.map((item: types.WECharGroupMap) => [item[0], item[1]]);
			Cmap = CO.map.filter((item: types.WECharGroupMap) => item[0] !== payload.label).map((item: types.WECharGroupMap) => [item[0], item[1]]);
			newCharGroups = reduceCharGroupWG(CO, Cmap);
			final = {
				...reduceAllBut(["wordevolveCharGroups"], state),
				wordevolveCharGroups: newCharGroups
			};
			break;
		// Transforms
		case consts.ADD_TRANSFORM_WE:
			RO = reduceTransformsStateWE(state.wordevolveTransforms, 'add', payload);
			final = {
				...reduceAllBut(["wordevolveTransforms"], state),
				wordevolveTransforms: RO
			};
			break;
		case consts.START_EDIT_TRANSFORM_WE:
			RO = reduceTransformsStateWE(state.wordevolveTransforms);
			RO.editing = payload;
			final = {
				...reduceAllBut(["wordevolveTransforms"], state),
				wordevolveTransforms: RO
			};
			break;
		case consts.DO_EDIT_TRANSFORM_WE:
			RO = reduceTransformsStateWE(state.wordevolveTransforms, 'edit', payload);
			final = {
				...reduceAllBut(["wordevolveTransforms"], state),
				wordevolveTransforms: RO
			};
			break;
		case consts.CANCEL_EDIT_TRANSFORM_WE:
			RO = reduceTransformsStateWE(state.wordevolveTransforms);
			RO.editing = null;
			final = {
				...reduceAllBut(["wordevolveTransforms"], state),
				wordevolveTransforms: RO
			};
			break;
		case consts.DELETE_TRANSFORM_WE:
			RO = reduceTransformsStateWE(state.wordevolveTransforms, 'del', payload);
			final = {
				...reduceAllBut(["wordevolveTransforms"], state),
				wordevolveTransforms: RO
			};
			break;
		case consts.REORDER_TRANSFORM_WE:
			const ST = {
				list: payload.map((tr: types.WETransformObject) => reduceTransformsWE(tr)),
				editing: state.wordevolveTransforms.editing
			};
			final = {
				...reduceAllBut(["wordevolveTransforms"], state),
				wordevolveTransforms: ST
			};
			break;
		// Sound Changes
		case consts.ADD_SOUND_CHANGE_WE:
			RO = reduceSoundChangeStateWE(state.wordevolveSoundChanges, 'add', payload);
			final = {
				...reduceAllBut(["wordevolveSoundChanges"], state),
				wordevolveSoundChanges: RO
			};
			break;
		case consts.START_EDIT_SOUND_CHANGE_WE:
			RO = reduceSoundChangeStateWE(state.wordevolveSoundChanges);
			RO.editing = payload;
			final = {
				...reduceAllBut(["wordevolveSoundChanges"], state),
				wordevolveSoundChanges: RO
			};
			break;
		case consts.DO_EDIT_SOUND_CHANGE_WE:
			RO = reduceSoundChangeStateWE(state.wordevolveSoundChanges, 'edit', payload);
			final = {
				...reduceAllBut(["wordevolveSoundChanges"], state),
				wordevolveSoundChanges: RO
			};
			break;
		case consts.CANCEL_EDIT_SOUND_CHANGE_WE:
			RO = reduceSoundChangeStateWE(state.wordevolveSoundChanges);
			RO.editing = null;
			final = {
				...reduceAllBut(["wordevolveSoundChanges"], state),
				wordevolveSoundChanges: RO
			};
			break;
		case consts.DELETE_SOUND_CHANGE_WE:
			RO = reduceSoundChangeStateWE(state.wordevolveSoundChanges, 'del', payload);
			final = {
				...reduceAllBut(["wordevolveSoundChanges"], state),
				wordevolveSoundChanges: RO
			};
			break;
		case consts.REORDER_SOUND_CHANGE_WE:
			const SC = {
				list: payload.map((sc: types.WESoundChangeObject) => reduceSoundChangesWE(sc)),
				editing: state.wordevolveSoundChanges.editing
			};
			final = {
				...reduceAllBut(["wordevolveSoundChanges"], state),
				wordevolveSoundChanges: SC
			};
			break;
		// Input Lexicon
		case consts.UPDATE_INPUT_LEXICON:
			final = {
				...reduceAllBut(["wordevolveInput"], state),
				wordevolveInput: payload
			};
			break;
		// Output
		case consts.SET_OUTPUT_WE:
			final = {
				...reduceAllBut(["wordevolveSettings"], state),
				wordevolveSettings: {
					...state.wordevolveSettings,
					output: payload
				}
			};
			break;
		case consts.LOAD_CUSTOM_INFO_WE:
			final = {
				...reduceAllBut(["wordevolveCharGroups", "wordevolveTransforms", "wordevolveSoundChanges"], state),
				wordevolveCharGroups: payload[0],
				wordevolveTransforms: payload[1],
				wordevolveSoundChanges: payload[2],
			};
			break;
		// WEPreset
		case consts.LOAD_PRESET_WE:
			const newPreset: types.WEPresetObject = WEPresets.get(payload)!;
			final = reduceAllBut(["wordevolveCharGroups", "wordevolveSoundChanges", "wordevolveTransforms"], state);
			final.wordevolveCharGroups = reduceCharGroupWE(state.wordevolveCharGroups, newPreset.charGroups);
			final.wordevolveSoundChanges = {
				list: newPreset.soundchanges.map(o => ({...o})),
				editing: state.wordevolveSoundChanges.editing
			};
			final.wordevolveTransforms = {
				list: newPreset.transforms.map(o => ({...o})),
				editing: state.wordevolveTransforms.editing
			};
			break;


		// MorphoSyntax
		case consts.SET_MORPHOSYNTAX_STATE:
			final = reduceAllBut([], state);
			const [pp, bb] = payload;
			if(bb) {
				final.morphoSyntaxModalState[pp] = true;
			} else {
				delete final.morphoSyntaxModalState[pp];
			}
			break;
		case consts.SET_MORPHOSYNTAX:
			final = reduceAllBut(["morphoSyntaxInfo"], state);
			final.morphoSyntaxInfo = reduceMorphoSyntaxInfo(payload as types.MorphoSyntaxObject);
			break;
		case consts.SET_MORPHOSYNTAX_INFO_TEXT:
			final = reduceAllBut([], state);
			final.morphoSyntaxInfo[payload[0] as "key" | "title" | "description"] = payload[1];
			break;
		case consts.SET_MORPHOSYNTAX_INFO_NUM:
			final = reduceAllBut([], state);
			final.morphoSyntaxInfo[payload[0] as "lastSave"] = payload[1];
			break;
		case consts.SET_MORPHOSYNTAX_BOOL:
			final = reduceAllBut([], state);
			const boo = payload[0] as keyof types.MorphoSyntaxBoolObject;
			const bx = !!payload[1];
			if(bx) {
				final.morphoSyntaxInfo.bool[boo] = bx;
			} else {
				delete final.morphoSyntaxInfo.bool[boo];
			}
			break;
		case consts.SET_MORPHOSYNTAX_NUM:
			final = reduceAllBut([], state);
			const numm = payload[0] as keyof types.MorphoSyntaxNumberObject;
			const nx = payload[1];
			if(nx) {
				final.morphoSyntaxInfo.num[numm] = nx;
			} else {
				delete final.morphoSyntaxInfo.num[numm];
			}
			break;
		case consts.SET_MORPHOSYNTAX_TEXT:
			final = reduceAllBut([], state);
			const txt = payload[0] as keyof types.MorphoSyntaxTextObject;
			const tx = payload[1];
			if(tx) {
				final.morphoSyntaxInfo.text[txt] = tx;
			} else {
				delete final.morphoSyntaxInfo.text[txt];
			}
			break;


		// Lexicon
		case consts.UPDATE_LEXICON:
			final = {
				...reduceAllBut(["lexicon"], state),
				lexicon: {
					...payload,
					truncateColumns: state.lexicon.truncateColumns
				}
			};
			break;
		case consts.UPDATE_LEXICON_COLUMNAR_INFO:
			const [lex, cols, order, dir, truncate] = payload;
			const lexicon = reduceLexiconState({
				...state.lexicon,
				lexicon: lex,
				columns: cols,
				sortPattern: order,
				sortDir: dir,
				truncateColumns: truncate
			});
			final = {
				...reduceAllBut(["lexicon"], state),
				lexicon
			};
			break;
		case consts.ADD_LEXICON_ITEM:
			LO = {...state.lexicon};
			LO.lexicon.push(payload);
			LO = reduceLexiconState(LO);
			final = {
				...reduceAllBut(["lexicon"], state),
				lexicon: LO
			};
			break;
		case consts.DELETE_LEXICON_ITEM:
			LO = {...state.lexicon};
			LO.lexicon = LO.lexicon.filter(lex => lex.id !== payload);
			LO = reduceLexiconState(LO);
			final = {
				...reduceAllBut(["lexicon"], state),
				lexicon: LO
			};
			break;
		case consts.TOGGLE_LEXICON_WRAP:
			LO = reduceLexiconState(state.lexicon);
			LO.truncateColumns = !LO.truncateColumns;
			final = {
				...reduceAllBut(["lexicon"], state),
				lexicon: LO
			};
			break;
		case consts.UPDATE_LEXICON_BOOL:
			const bProp: "truncateColumns" | "sortDir" = payload.prop;
			const tf: boolean = payload.value;
			LO = reduceLexiconState(state.lexicon);
			LO[bProp] = tf;
			final = {
				...reduceAllBut(["lexicon"], state),
				lexicon: LO
			};
			break;
		case consts.DO_EDIT_LEXICON_ITEM:
			LO = {...state.lexicon};
			LO.lexicon = LO.lexicon.map(lex => lex.id === payload.id ? payload : lex);
			LO = reduceLexiconState(LO);
			final = {
				...reduceAllBut(["lexicon"], state),
				lexicon: LO
			};
			break;
		case consts.ADD_ITEMS_TO_LEXICON_COLUMN:
			LO = {...state.lexicon};
			LO.lexicon = LO.lexicon.slice();
			const colsNum = LO.columns.length;
			const [items, columnNumber]: [ string[], number ] = payload;
			items.forEach((item: string) => {
				const obj: types.Lexicon = {
					id: uuidv4(),
					columns: []
				};
				for(let x = 0; x < colsNum; x++) {
					obj.columns.push(x === columnNumber ? item : "");
				}
				LO.lexicon.push(obj);
			});
			LO = reduceLexiconState(LO);
			final = {
				...reduceAllBut(["lexicon"], state),
				lexicon: LO
			};
			break;

// functions below need to be doublechecked
		/*case consts.UPDATE_LEXICON_EDITING:
			LO = reduceLexiconState(state.lexicon);
			LO.editing = payload;
			final = {
				...reduceAllBut(["lexicon"], state),
				lexicon: LO
			};
			break;*/
		case consts.UPDATE_LEXICON_PROP:
			const pProp: "title" | "description" | "id" = payload.prop;
			const value: string = payload.value;
			LO = reduceLexiconState(state.lexicon);
			LO[pProp] = value;
			final = {
				...reduceAllBut(["lexicon"], state),
				lexicon: LO
			};
			break;
		case consts.UPDATE_LEXICON_NUM:
			const nProp: "lastSave" = payload.prop;
			const val: number = payload.value;
			LO = reduceLexiconState(state.lexicon);
			LO[nProp] = val;
			final = {
				...reduceAllBut(["lexicon"], state),
				lexicon: LO
			};
			break;
		/*case consts.UPDATE_LEXICON_COLUMNS:
			if(payload === undefined) {
				LO = {
					...reduceLexiconState(state.lexicon),
					colEdit: payload
				};
			} else {
				const minusReorder = {...payload};
				delete minusReorder.reordering;
				LO = {
					...reduceLexiconState(state.lexicon),
					...minusReorder,
					colEdit: payload
				};
			}
			final = {
				...reduceAllBut(["lexicon"], state),
				lexicon: LO
			};
			break;*/
		case consts.UPDATE_LEXICON_ITEM_ORDER:
			LO = reduceLexiconState(state.lexicon);
			LO.lexicon = payload;
			final = {
				...reduceAllBut(["lexicon"], state),
				lexicon: LO
			};
			break;
		/*case consts.UPDATE_LEXICON_SORT:
			LO = reduceLexiconState(state.lexicon);
			LO.sort = payload;
			final = {
				...reduceAllBut(["lexicon"], state),
				lexicon: LO
			};
			break;*/


		// Overwrite State
		case consts.OVERWRITE_STATE:
			final = { ...payload };
			maybeUpdateTheme(state.appSettings.theme, final.appSettings.theme);
			break;


		// Word Lists
		case consts.UPDATE_WORD_LISTS_DISPLAY:
			const newWordListsState: types.WordListsState = reduceWordListsState(state.wordListsState);
			newWordListsState.display = payload;
			final = {
				...reduceAllBut(["wordListsState"], state),
				wordListsState: newWordListsState
			};
			break;
		case consts.TOGGLE_WORD_LISTS_BOOLEAN:
			final = reduceAllBut([], state);
			final.wordListsState[(payload as keyof types.WordListsState) as "textCenter"] = !final.wordListsState[payload as keyof types.WordListsState];
			break;


		// Views
		case consts.CHANGE_VIEW:
			const newView: types.ViewStateObject = reduceViewState(state.viewState);
			newView[payload.app as keyof types.ViewStateObject] = payload.page;
			newView.lastSection = payload.app;
			final = {
				...reduceAllBut(["viewState"], state),
				viewState: newView
			};
			break;


		// Extra Characters
		case consts.UPDATE_EXTRA_CHARS_DISPLAY:
			ECO = reduceExtraCharactersState(state.extraCharactersState);
			ECO.display = payload;
			final = {
				...reduceAllBut(["extraCharactersState"], state),
				extraCharactersState: ECO
			};
			break;
		case consts.UPDATE_EXTRA_CHARS_FAVORITE:
			ECO = reduceExtraCharactersState(state.extraCharactersState);
			ECO.saved = payload;
			final = {
				...reduceAllBut(["extraCharactersState"], state),
				extraCharactersState: ECO
			};
			break;
		case consts.TOGGLE_EXTRA_CHARS_BOOLEAN:
			const pl = (payload as keyof types.ExtraCharactersState) as "adding" | "deleting" | "showNames" | "copyImmediately" | "showHelp";
			ECO = reduceExtraCharactersState(state.extraCharactersState);
			ECO[pl] = !state.extraCharactersState[pl];
			final = {
				...reduceAllBut(["extraCharactersState"], state),
				extraCharactersState: ECO
			};
			break;
		case consts.UPDATE_EXTRA_CHARS_TO_BE_SAVED:
			ECO = reduceExtraCharactersState(state.extraCharactersState);
			ECO.copyLater = payload;
			final = {
				...reduceAllBut(["extraCharactersState"], state),
				extraCharactersState: ECO
			};
			break;



		// Log
//		case consts.SET_LOG:
//			final = {
//				...reduceAllBut(["logs"], state),
//				logs: payload
//			};
//			break;
//		case consts.ADD_TO_LOG:
//			final = {
//				...reduceAllBut(["logs"], state),
//				logs: [...state.logs, payload]
//			};
//			console.log(`LOG: ${payload}`);
//			break;


		// Default
		default:
			console.log("DEFAULT: " + action.type);
			return state;
	}
	// Some sort of store-state function goes here
	debounce(saveCurrentState, [final], 1000, "stateSave");
	console.log(action.type);
	console.log(final);
	return final;
};
