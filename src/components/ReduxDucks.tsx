import { WGPresets } from './WGPresets';
import { Plugins } from '@capacitor/core';
import maybeUpdateTheme from './MaybeUpdateTheme';
import * as consts from './ReduxDucksConst';
import * as types from './ReduxDucksTypes';
import debounce from './Debounce';

const reduceAppSettings = (original: types.AppSettings) => {
	return {...original};
};
const reduceCategoryWG = (original: types.WGCategoryStateObject, newMap: types.WGCategoryMap[] = original.map) => {
	let map: types.WGCategoryMap[] = [];
	if(newMap === original.map) {
		newMap.forEach(item => {
			let o: types.WGCategoryObject = {...item[1]};
			if(o.rateOverride) {
				o.rateOverride = [...o.rateOverride];
			}
			map.push([item[0], o]);
		});
	} else {
		map = newMap;
	}
	return {
		map: map,
		editing: original.editing
	};
};
const reduceSyllablesWG = (original: types.WGSyllableStateObject) => {
	const oo = original.objects;
	return {
		toggle: original.toggle,
		objects: {
			singleWord: reduceSubSyllablesWG(oo.singleWord),
			wordInitial: reduceSubSyllablesWG(oo.wordInitial),
			wordMiddle: reduceSubSyllablesWG(oo.wordMiddle),
			wordFinal: reduceSubSyllablesWG(oo.wordFinal)
		}
	};
};
const reduceSubSyllablesWG = (original: types.WGSyllableObject) => {
	let o: types.WGSyllableObject = {
		components: [...original.components]
	}
	if(original.rateOverride) {
		o.rateOverride = [...original.rateOverride];
	}
	return o;
};
const reduceRewriteRulesStateWG = (original: types.WGRewriteRuleStateObject, mod: string = "", rule: any = null) => {
	// mod = 'add' -> add new rule (object)
	// mod = 'del' -> delete rule (key)
	// mod = 'edit' -> replace rule (object)
	// mod = '' -> do nothing
	let list;
	switch (mod) {
		case 'add':
			list = original.list.map(rr => reduceRewriteRulesWG(rr));
			list.push(rule);
			break;
		case 'del':
			list = original.list.filter(rr => rr.key !== rule.key).map(rr => reduceRewriteRulesWG(rr));
			break;
		case 'edit':
			list = original.list.map(rr => rr.key === rule.key ? rule : reduceRewriteRulesWG(rr));
			break;
		default:
			list = original.list.map(rr => reduceRewriteRulesWG(rr));
	}
	return {
		list: list,
		editing: original.editing
	};
};
const reduceRewriteRulesWG = (original: types.WGRewriteRuleObject) => {
	return {...original};
};
const reduceSettingsWG = (original: types.WGSettingsObject) => {
	return {...original};
};
const reduceCategoryWE = (original: types.WECategoryStateObject, newMap: types.WECategoryMap[] = original.map) => {
	let map: types.WECategoryMap[] = [];
	if(newMap === original.map) {
		newMap.forEach(item => {
			let o: types.WECategoryObject = {...item[1]};
			map.push([item[0], o]);
		});
	} else {
		map = newMap;
	}
	return {
		map: map,
		editing: original.editing
	};
};
const reduceTransformsStateWE = (original: types.WETransformStateObject, mod: string = "", rule: any = null) => {
	// mod = 'add' -> add new rule (object)
	// mod = 'del' -> delete rule (key)
	// mod = 'edit' -> replace rule (object)
	// mod = '' -> do nothing
	let list;
	switch (mod) {
		case 'add':
			list = original.list.map(rr => reduceTransformsWE(rr));
			list.push(rule);
			break;
		case 'del':
			list = original.list.filter(rr => rr.key !== rule.key).map(rr => reduceTransformsWE(rr));
			break;
		case 'edit':
			list = original.list.map(rr => rr.key === rule.key ? rule : reduceTransformsWE(rr));
			break;
		default:
			list = original.list.map(rr => reduceTransformsWE(rr));
	}
	return {
		list: list,
		editing: original.editing
	};
};
const reduceTransformsWE = (original: types.WETransformObject) => {
	return {...original};
};
const reduceSoundChangeStateWE = (original: types.WESoundchangeStateObject, mod: string = "", rule: any = null) => {
	// mod = 'add' -> add new rule (object)
	// mod = 'del' -> delete rule (key)
	// mod = 'edit' -> replace rule (object)
	// mod = '' -> do nothing
	let list;
	switch (mod) {
		case 'add':
			list = original.list.map(rr => reduceSoundChangesWE(rr));
			list.push(rule);
			break;
		case 'del':
			list = original.list.filter(rr => rr.key !== rule.key).map(rr => reduceSoundChangesWE(rr));
			break;
		case 'edit':
			list = original.list.map(rr => rr.key === rule.key ? rule : reduceSoundChangesWE(rr));
			break;
		default:
			list = original.list.map(rr => reduceSoundChangesWE(rr));
	}
	return {
		list: list,
		editing: original.editing
	};
};
const reduceSoundChangesWE = (original: types.WESoundChangeObject) => {
	return {...original};
};
const reduceSettingsWE = (original: types.WESettingsObject) => {
	return {...original};
};
const reduceLexiconState = (original: types.LexiconObject) => {
	return {
		key: original.key,
		lastSave: original.lastSave,
		title: original.title,
		description: original.description,
		columns: original.columns,
		columnOrder: [...original.columnOrder],
		columnTitles: [...original.columnTitles],
		columnSizes: [...original.columnSizes],
		sort: [...original.sort],
		sorted: original.sorted,
		lexicon: original.lexicon.map(lex => reduceLexicon(lex)),
		waitingToAdd: [...original.waitingToAdd],
		editing: original.editing,
		colEdit: original.colEdit ? reduceColEdit(original.colEdit) : undefined
	};
};
const reduceLexicon = (original: types.Lexicon) => {
	return {
		key: original.key,
		columns: [...original.columns]
	}
};
const reduceColEdit = (original: types.colEdit) => {
	return {
		columns: original.columns,
		columnOrder: [...original.columnOrder],
		columnTitles: [...original.columnTitles],
		columnSizes: [...original.columnSizes],
		sort: [...original.sort]
	};
}
const reduceModalState = (original: types.ModalStateObject) => {
	return {...original};
};
const reduceViewState = (original: types.ViewStateObject) => {
	return {...original};
}
const reduceTempInfo = (original: types.TemporaryInfo | undefined) => {
	if(!original) {
		return original;
	}
	return { data: parseUnknownTypes(original.data) };
}
const parseUnknownTypes: any = (test: any) => {
	const theType = (typeof test);
	switch(theType) {
		case "object":
			if(test === null) {
				return test;
			} else if(Array.isArray(test)) {
				return test.map(item => parseUnknownTypes(item));
			}
			let x: any = {};
			Object.getOwnPropertyNames(test).forEach(prop => {
				x[prop] = parseUnknownTypes(test[prop]);
			});
			return x;
		case "number":
		case "string":
		case "undefined":
			return test;
	}
	return undefined;
};


const stateObjectProps: [(keyof types.StateObject), Function][] = [
	["currentVersion", (v: string) => v],
	["appSettings", reduceAppSettings],
	["wordgenCategories", reduceCategoryWG],
	["wordgenSyllables", reduceSyllablesWG],
	["wordgenRewriteRules", reduceRewriteRulesStateWG],
	["wordgenSettings", reduceSettingsWG],
	["wordevolveCategories", reduceCategoryWE],
	["wordevolveTransforms", reduceTransformsStateWE],
	["wordevolveSoundChanges", reduceSoundChangeStateWE],
	["wordevolveInput", (a: string[]) => a.map(a => a)],
	["wordevolveSettings", reduceSettingsWE],
	["lexicon", reduceLexiconState],
	["modalState", reduceModalState],
	["viewState", reduceViewState],
	["temporaryInfo", reduceTempInfo]
];
export const checkIfState = (possibleState: types.StateObject | any): possibleState is types.StateObject => {
	const check = (possibleState as types.StateObject);
	return stateObjectProps.every(pair => {
		let prop: keyof types.StateObject = pair[0];
		return prop === "temporaryInfo" || check[prop];
	});
};
const reduceAllBut = (props: (keyof types.StateObject)[], state: types.StateObject) => {
	let check: any = {};
	let output: any = {};
	props.forEach(prop => { check[prop] = true; });
	stateObjectProps.forEach(pair => {
		let [prop, func] = pair;
		if(!check[prop]) {
			output[prop] = func(state[prop]);
		}
	});
	return output;
};
const simple: types.WGPreset = WGPresets.get("Simple")!;
export const initialAppState: types.StateObject = {
	currentVersion: "0.1",
	appSettings: {
		theme: "Default",
		disableConfirms: false,
		lexiconHorizontalScroll: false
	},
	wordgenCategories: simple.wordgenCategories,
	wordgenSyllables: simple.wordgenSyllables,
	wordgenRewriteRules: simple.wordgenRewriteRules,
	wordgenSettings: {
		...simple.wordgenSettings,
		output: "text",
		showSyllableBreaks: false,
		sentencesPerText: 30,
		capitalizeWords: false,
		sortWordlist: true,
		wordlistMultiColumn: true,
		wordsPerWordlist: 250,
		customInfo: []
	},
	wordevolveCategories: {
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
		output: "multi",
		showChanges: false,
		showRules: false
	},
	lexicon: {
		key: "",
		lastSave: 0,
		title: "",
		description: "",
		columns: 3,
		columnOrder: [0,1,2],
		columnTitles: ["Word", "Part of Speech", "Definition"],
		columnSizes: ["m", "s", "l"],
		sort: [0, 0],
		sorted: true,
		lexicon: [],
		waitingToAdd: [],
		editing: undefined,
		colEdit: undefined
	},
	modalState: {
		loadingPage: false,
		AppTheme: false,
		AddCategory: false,
		EditCategory: false,
		AddRewriteRule: false,
		EditRewriteRule: false,
		PresetPopup: false,
		WGOutputOptions: false,
		ManageCustomInfo: false,
		AddCategoryWE: false,
		EditCategoryWE: false,
		AddTransform: false,
		EditTransform: false,
		AddSoundChange: false,
		EditSoundChange: false,
		LexiconEllipsis: undefined,
		EditLexiconItem: false,
		EditLexiconOrder: false,
		LoadLexicon: false,
		DeleteLexicon: false,
		WGSaveToLexicon: undefined,
		PickAndSaveWG: false,
		WEOutputOptions: false,
		PickAndSaveWE: false,
		WESaveToLexicon: undefined,
		InfoModal: false
	},
	viewState: {
		wg: 'home',
		we: 'home',
		ls: 'home'
	},
	temporaryInfo: undefined
};
export const blankAppState: types.StateObject = {
	currentVersion: "0.1",
	appSettings: {
		theme: "Default",
		disableConfirms: false,
		lexiconHorizontalScroll: false
	},
	wordgenCategories: {
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
	wordgenRewriteRules: {
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
		wordsPerWordlist: 250,
		customInfo: []
	},
	wordevolveCategories: {
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
			output: "multi",
			showChanges: false,
			showRules: false
		},
	lexicon: {
		key: "",
		lastSave: 0,
		title: "",
		description: "",
		columns: 3,
		columnOrder: [0,1,2],
		columnTitles: ["Word", "Part of Speech", "Definition"],
		columnSizes: ["m", "s", "l"],
		sort: [0, 0],
		sorted : true,
		lexicon: [],
		waitingToAdd: [],
		editing: undefined,
		colEdit: undefined
	},
	modalState: {
		loadingPage: false,
		AppTheme: false,
		AddCategory: false,
		EditCategory: false,
		AddRewriteRule: false,
		EditRewriteRule: false,
		PresetPopup: false,
		WGOutputOptions: false,
		ManageCustomInfo: false,
		AddCategoryWE: false,
		EditCategoryWE: false,
		AddTransform: false,
		EditTransform: false,
		AddSoundChange: false,
		EditSoundChange: false,
		LexiconEllipsis: undefined,
		EditLexiconItem: false,
		EditLexiconOrder: false,
		LoadLexicon: false,
		DeleteLexicon: false,
		WGSaveToLexicon: undefined,
		PickAndSaveWG: false,
		WEOutputOptions: false,
		PickAndSaveWE: false,
		WESaveToLexicon: undefined,
		InfoModal: false
	},
	viewState: {
		wg: 'home',
		we: 'home',
		ls: 'home'
	},
	temporaryInfo: undefined
};

// Storage
const { Storage } = Plugins;
const saveCurrentState = (state: types.StateObject) => {
	// Eliminate not-stringifyable properties
	const ms = state.modalState;
	const lex = ms.LexiconEllipsis;
	const sav = ms.WGSaveToLexicon;
	const sav2 = ms.WESaveToLexicon;
	const temp = state.temporaryInfo;
	ms.LexiconEllipsis
		= ms.WGSaveToLexicon
		= ms.WESaveToLexicon
		= state.temporaryInfo
		= undefined;
	// Stringify
	const stringified = JSON.stringify(state);
	// Restore non-stringifyable properties
	ms.LexiconEllipsis = lex;
	ms.WGSaveToLexicon = sav;
	ms.WESaveToLexicon = sav2;
	state.temporaryInfo = temp;
	// Save stringified state
	Storage.set({key: "currentState", value: stringified});
};
const initialState: types.StateObject = blankAppState;

// reducer
export function reducer(state: types.StateObject = initialState, action: any) {
	const payload = action.payload;
	let CO: types.WGCategoryStateObject;
	let Cmap: types.WGCategoryMap[] = [];
	let newCategories: types.WGCategoryStateObject;
	let SO: types.WGSyllableStateObject;
	let RO: types.WGRewriteRuleStateObject;
	let final: types.StateObject = state;
	let label: string;
	let LO: types.LexiconObject;
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
		case consts.TOGGLE_LEXICON_HORIZONTAL_SCROLL:
			final = {
				...reduceAllBut(["appSettings"], state),
				appSettings: {
					...state.appSettings,
					lexiconHorizontalScroll: !state.appSettings.lexiconHorizontalScroll
				}
			};
			break;
		//
		// WORDGEN
		//
		// Category
		case consts.ADD_CATEGORY_WG:
			CO = state.wordgenCategories;
			Cmap = CO.map.map((item: types.WGCategoryMap) => [item[0], item[1]]);
			label = payload.label;
			delete payload.label;
			Cmap.push([label, payload]);
			newCategories = reduceCategoryWG(CO, Cmap);
			// make new object, copy props from state, overwrite prop(s) with new object with new payload
			final = {
				...reduceAllBut(["wordgenCategories"], state),
				wordgenCategories: newCategories
			};
			break;
		case consts.START_EDIT_CATEGORY_WG:
			CO = state.wordgenCategories;
			newCategories = reduceCategoryWG(CO);
			newCategories.editing = payload;
			final = {
				...reduceAllBut(["wordgenCategories"], state),
				wordgenCategories: newCategories
			};
			break;
		case consts.DO_EDIT_CATEGORY_WG:
			CO = state.wordgenCategories;
			Cmap = CO.map.map(item => {
				let [label, cat] = item;
				if(label === CO.editing) {
					delete payload.label;
					return [label, payload];
				}
				return[label, cat];
			});
			newCategories = reduceCategoryWG(CO, Cmap);
			final = {
				...reduceAllBut(["wordgenCategories"], state),
				wordgenCategories: newCategories
			};
			break;
		case consts.CANCEL_EDIT_CATEGORY_WG:
			CO = state.wordgenCategories;
			newCategories = reduceCategoryWG(CO);
			newCategories.editing = null;
			final = {
				...reduceAllBut(["wordgenCategories"], state),
				wordgenCategories: newCategories
			};
			break;
		case consts.DELETE_CATEGORY_WG:
			CO = state.wordgenCategories;
			Cmap = CO.map.map((item: types.WGCategoryMap) => [item[0], item[1]]);
			Cmap = CO.map.filter((item: types.WGCategoryMap) => item[0] !== payload).map((item: types.WGCategoryMap) => [item[0], item[1]]);
			newCategories = reduceCategoryWG(CO, Cmap);
			final = {
				...reduceAllBut(["wordgenCategories"], state),
				wordgenCategories: newCategories
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
			SO.objects[payload.key as keyof types.WGSyllableStateObject["objects"]].components = payload.wordgenSyllables;
			final = {
				...reduceAllBut(["wordgenSyllables"], state),
				wordgenSyllables: SO
			};
			break;
		// Rewrite Rules
		case consts.ADD_REWRITE_RULE_WG:
			RO = reduceRewriteRulesStateWG(state.wordgenRewriteRules, 'add', payload);
			final = {
				...reduceAllBut(["wordgenRewriteRules"], state),
				wordgenRewriteRules: RO
			};
			break;
		case consts.START_EDIT_REWRITE_RULE_WG:
			RO = reduceRewriteRulesStateWG(state.wordgenRewriteRules);
			RO.editing = payload;
			final = {
				...reduceAllBut(["wordgenRewriteRules"], state),
				wordgenRewriteRules: RO
			};
			break;
		case consts.DO_EDIT_REWRITE_RULE_WG:
			RO = reduceRewriteRulesStateWG(state.wordgenRewriteRules, 'edit', payload);
			final = {
				...reduceAllBut(["wordgenRewriteRules"], state),
				wordgenRewriteRules: RO
			};
			break;
		case consts.CANCEL_EDIT_REWRITE_RULE_WG:
			RO = reduceRewriteRulesStateWG(state.wordgenRewriteRules);
			RO.editing = null;
			final = {
				...reduceAllBut(["wordgenRewriteRules"], state),
				wordgenRewriteRules: RO
			};
			break;
		case consts.DELETE_REWRITE_RULE_WG:
			RO = reduceRewriteRulesStateWG(state.wordgenRewriteRules, 'del', payload);
			final = {
				...reduceAllBut(["wordgenRewriteRules"], state),
				wordgenRewriteRules: RO
			};
			break;
		case consts.REORDER_REWRITE_RULE_WG:
			let SRR = state.wordgenRewriteRules;
			let map = new Map(SRR.list.map(rr => [rr.key, rr]));
			RO = {
				list: payload.map((key: string) => map.get(key)),
				editing: SRR.editing
			};
			final = {
				...reduceAllBut(["wordgenRewriteRules"], state),
				wordgenRewriteRules: RO
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
		case consts.SET_CATEGORY_DROPOFF_WG:
			final = {
				...reduceAllBut(["wordgenSettings"], state),
				wordgenSettings: {
					...state.wordgenSettings,
					categoryRunDropoff: payload
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
		case consts.SET_CUSTOM_INFO_WG:
			final = {
				...reduceAllBut(["wordgenSettings"], state),
				wordgenSettings: {
					...state.wordgenSettings,
					customInfo: payload
				}
			};
			break;
		case consts.LOAD_CUSTOM_INFO_WG:
			final = {
				...reduceAllBut(["wordgenCategories", "wordgenSyllables", "wordgenRewriteRules", "wordgenSettings"], state),
				wordgenCategories: payload[0],
				wordgenSyllables: payload[1],
				wordgenRewriteRules: payload[2],
				wordgenSettings: {
					...state.wordgenSettings,
					...payload[3]
				}
			};
			break;
		// Presets
		case consts.LOAD_PRESET_WG:
			let newInfo: any = WGPresets.get(payload);
			final = {
				...reduceAllBut(["wordgenCategories", "wordgenSyllables", "wordgenRewriteRules", "wordgenSettings"], state),
				wordgenCategories: reduceCategoryWG(newInfo.wordgenCategories),
				wordgenSyllables: reduceSyllablesWG(newInfo.wordgenSyllables),
				wordgenRewriteRules: reduceRewriteRulesStateWG(newInfo.wordgenRewriteRules),
				wordgenSettings: {
					...state.wordgenSettings,
					...newInfo.wordgenSettings
				}
			};
			break;
		case consts.CLEAR_EVERYTHING_WG:
			final = {
				...reduceAllBut(["wordgenCategories", "wordgenSyllables", "wordgenRewriteRules"], state),
				wordgenCategories: {
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
				wordgenRewriteRules: {
					list: [],
					editing: null
				}
			};
			break;
		//
		// WORDEVOLVE
		//
		// Category
		case consts.ADD_CATEGORY_WE:
			CO = state.wordevolveCategories;
			Cmap = CO.map.map((item: types.WECategoryMap) => [item[0], item[1]]);
			label = payload.label;
			delete payload.label;
			Cmap.push([label, payload]);
			newCategories = reduceCategoryWG(CO, Cmap);
			// make new object, copy props from state, overwrite prop(s) with new object with new payload
			final = {
				...reduceAllBut(["wordevolveCategories"], state),
				wordevolveCategories: newCategories
			};
			break;
		case consts.START_EDIT_CATEGORY_WE:
			CO = state.wordevolveCategories;
			newCategories = reduceCategoryWG(CO);
			newCategories.editing = payload;
			final = {
				...reduceAllBut(["wordevolveCategories"], state),
				wordevolveCategories: newCategories
			};
			break;
		case consts.DO_EDIT_CATEGORY_WE:
			CO = state.wordevolveCategories;
			Cmap = CO.map.map(item => {
				let [label, cat] = item;
				if(label === CO.editing) {
					delete payload.label;
					return [label, payload];
				}
				return[label, cat];
			});
			newCategories = reduceCategoryWG(CO, Cmap);
			final = {
				...reduceAllBut(["wordevolveCategories"], state),
				wordevolveCategories: newCategories
			};
			break;
		case consts.CANCEL_EDIT_CATEGORY_WE:
			CO = state.wordevolveCategories;
			newCategories = reduceCategoryWG(CO);
			newCategories.editing = null;
			final = {
				...reduceAllBut(["wordevolveCategories"], state),
				wordevolveCategories: newCategories
			};
			break;
		case consts.DELETE_CATEGORY_WE:
			CO = state.wordevolveCategories;
			Cmap = CO.map.map((item: types.WECategoryMap) => [item[0], item[1]]);
			Cmap = CO.map.filter((item: types.WECategoryMap) => item[0] !== payload).map((item: types.WECategoryMap) => [item[0], item[1]]);
			newCategories = reduceCategoryWG(CO, Cmap);
			final = {
				...reduceAllBut(["wordevolveCategories"], state),
				wordevolveCategories: newCategories
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
			let ST = state.wordevolveTransforms;
			let m = new Map(ST.list.map(rr => [rr.key, rr]));
			ST = {
				list: payload.map((key: string) => m.get(key)),
				editing: ST.editing
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
			let SC = state.wordevolveSoundChanges;
			let scm = new Map(SC.list.map(rr => [rr.key, rr]));
			SC = {
				list: payload.map((key: string) => scm.get(key)),
				editing: SC.editing
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
		case consts.TOGGLE_SHOW_CHANGES_WE:
			final = {
				...reduceAllBut(["wordevolveSettings"], state),
				wordevolveSettings: {
					...state.wordevolveSettings,
					showChanges: payload
				}
			};
			break;
		case consts.TOGGLE_SHOW_RULES_WE:
			final = {
				...reduceAllBut(["wordevolveSettings"], state),
				wordevolveSettings: {
					...state.wordevolveSettings,
					showRules: payload
				}
			};
			break;


		// Lexicon
		case consts.UPDATE_LEXICON:
			// Probably delete this?
			final = {
				...reduceAllBut(["lexicon"], state),
				lexicon: payload
			};
			break;
		case consts.UPDATE_LEXICON_EDITING:
			LO = reduceLexiconState(state.lexicon);
			LO.editing = payload;
			final = {
				...reduceAllBut(["lexicon"], state),
				lexicon: LO
			};
			break;
		case consts.DO_EDIT_LEXICON_ITEM:
			LO = reduceLexiconState(state.lexicon);
			LO.lexicon[LO.editing!] = payload;
			final = {
				...reduceAllBut(["lexicon"], state),
				lexicon: LO
			};
			break;
		case consts.DELETE_LEXICON_ITEM:
			LO = reduceLexiconState(state.lexicon);
			LO.lexicon = LO.lexicon.slice(0, payload).concat(LO.lexicon.slice(payload + 1));
			final = {
				...reduceAllBut(["lexicon"], state),
				lexicon: LO
			};
			break;
		case consts.UPDATE_LEXICON_PROP:
			let pProp: "title" | "description" | "key" = payload.prop;
			let value: string = payload.value;
			LO = reduceLexiconState(state.lexicon);
			LO[pProp] = value;
			final = {
				...reduceAllBut(["lexicon"], state),
				lexicon: LO
			};
			break;
		case consts.UPDATE_LEXICON_NUM:
			let nProp: "lastSave" = payload.prop;
			let val: number = payload.value;
			LO = reduceLexiconState(state.lexicon);
			LO[nProp] = val;
			final = {
				...reduceAllBut(["lexicon"], state),
				lexicon: LO
			};
			break;
		case consts.UPDATE_LEXICON_BOOL:
			let bProp: "sorted" = payload.prop;
			let tf: boolean = payload.value;
			LO = reduceLexiconState(state.lexicon);
			LO[bProp] = tf;
			final = {
				...reduceAllBut(["lexicon"], state),
				lexicon: LO
			};
			break;
		case consts.UPDATE_LEXICON_COLUMNS:
			if(payload === undefined) {
				LO = {
					...reduceLexiconState(state.lexicon),
					colEdit: payload
				};
			} else {
				let minusReorder = {...payload};
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
			break;
		case consts.ADD_LEXICON_ITEM:
			LO = reduceLexiconState(state.lexicon);
			LO.lexicon.push(payload);
			final = {
				...reduceAllBut(["lexicon"], state),
				lexicon: LO
			};
			break;
		case consts.ADD_DEFERRED_LEXICON_ITEM:
			LO = reduceLexiconState(state.lexicon);
			LO.waitingToAdd = [...LO.waitingToAdd, ...payload];
			final = {
				...reduceAllBut(["lexicon"], state),
				lexicon: LO
			};
			break;
		case consts.UPDATE_LEXICON_ITEM_ORDER:
			LO = reduceLexiconState(state.lexicon);
			LO.lexicon = payload;
			final = {
				...reduceAllBut(["lexicon"], state),
				lexicon: LO
			};
			break;
		case consts.UPDATE_LEXICON_SORT:
			LO = reduceLexiconState(state.lexicon);
			LO.sort = payload;
			final = {
				...reduceAllBut(["lexicon"], state),
				lexicon: LO
			};
			break;
		case consts.CLEAR_DEFERRED_LEXICON_ITEMS:
			LO = reduceLexiconState(state.lexicon);
			LO.waitingToAdd = [];
			final = {
				...reduceAllBut(["lexicon"], state),
				lexicon: LO
			};
			break;


		// Overwrite State
		case consts.OVERWRITE_STATE:
			final = { ...payload };
			maybeUpdateTheme(state.appSettings.theme, final.appSettings.theme);
			break;


		// Modals
		case consts.TOGGLE_MODAL:
			let newModal: types.ModalStateObject = reduceModalState(state.modalState);
			newModal[payload.modal as keyof types.ModalStateObject] = payload.flag;
			final = {
				...reduceAllBut(["modalState"], state),
				modalState: newModal
			};
			break;
		case consts.TOGGLE_POPOVER:
			let newPopover: types.ModalStateObject = reduceModalState(state.modalState);
			newPopover[payload.modal as keyof types.ModalStateObject] = payload.flag;
			final = {
				...reduceAllBut(["modalState"], state),
				modalState: newPopover
			};
			break;
		case consts.SET_LOADING_PAGE:
			let newModalLoad: types.ModalStateObject = reduceModalState(state.modalState);
			newModalLoad.loadingPage = payload;
			final = {
				...reduceAllBut(["modalState"], state),
				modalState: newModalLoad
			};
			break;

		// Views
		case consts.CHANGE_VIEW:
			let newView: types.ViewStateObject = reduceViewState(state.viewState);
			newView[payload.app as keyof types.ViewStateObject] = payload.page;
			final = {
				...reduceAllBut(["viewState"], state),
				viewState: newView
			};
			break;


		// Temp Info
		case consts.SET_TEMPORARY_INFO:
			final = {
				...reduceAllBut(["temporaryInfo"], state),
				temporaryInfo: payload
			};
			break;
	}
	// Some sort of store-state function goes here
	debounce(saveCurrentState, [final]);
	return final;
};

