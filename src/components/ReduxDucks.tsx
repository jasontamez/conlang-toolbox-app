import Presets from './Presets';
import { Plugins } from '@capacitor/core';
import maybeUpdateTheme from './MaybeUpdateTheme';
import * as consts from './ReduxDucksConst';
import * as types from './ReduxDucksTypes';
import debounce from './Debounce';

const reduceAppSettings = (original: types.AppSettings) => {
	return {...original};
};
const reduceCategory = (original: types.WGCategoryStateObject, newMap: types.CategoryMap[] = original.map) => {
	let map: types.CategoryMap[] = [];
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
const reduceSyllables = (original: types.WGSyllableStateObject) => {
	const oo = original.objects;
	return {
		toggle: original.toggle,
		objects: {
			singleWord: reduceSubSyllables(oo.singleWord),
			wordInitial: reduceSubSyllables(oo.wordInitial),
			wordMiddle: reduceSubSyllables(oo.wordMiddle),
			wordFinal: reduceSubSyllables(oo.wordFinal)
		}
	};
};
const reduceSubSyllables = (original: types.WGSyllableObject) => {
	let o: types.WGSyllableObject = {
		components: [...original.components]
	}
	if(original.rateOverride) {
		o.rateOverride = [...original.rateOverride];
	}
	return o;
};
const reduceRewriteRulesState = (original: types.WGRewriteRuleStateObject, mod: string = "", rule: any = null) => {
	// mod = 'add' -> add new rule (object)
	// mod = 'del' -> delete rule (key)
	// mod = 'edit' -> replace rule (object)
	// mod = '' -> do nothing
	let list;
	switch (mod) {
		case 'add':
			list = original.list.map(rr => reduceRewriteRules(rr));
			list.push(rule);
			break;
		case 'del':
			list = original.list.filter(rr => rr.key !== rule).map(rr => reduceRewriteRules(rr));
			break;
		case 'edit':
			list = original.list.map(rr => rr.key === rule.key ? rule : reduceRewriteRules(rr));
			break;
		default:
			list = original.list.map(rr => reduceRewriteRules(rr));
	}
	return {
		list: list,
		editing: original.editing
	};
};
const reduceRewriteRules = (original: types.WGRewriteRuleObject) => {
	return {...original};
};
const reduceWGSettings = (original: types.WGSettingsObject) => {
	return {...original};
};
const reduceModalState = (original: types.ModalStateObject) => {
	return {...original};
};


const stateObjectProps: [(keyof types.StateObject), Function][] = [
	["appSettings", reduceAppSettings],
	["categories", reduceCategory],
	["syllables", reduceSyllables],
	["rewriteRules", reduceRewriteRules],
	["wordgenSettings", reduceWGSettings],
	["modalState", reduceModalState]
];
export const checkIfState = (possibleState: types.StateObject | any): possibleState is types.StateObject => {
	const check = (possibleState as types.StateObject);
	if(stateObjectProps.every(pair => check[pair[0]])) {
		return true;
	}
	return false;
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
const simple: types.Preset = Presets.get("Simple")!;
export const initialAppState: types.StateObject = {
	appSettings: {
		theme: "Default",
		disableConfirms: false
	},
	categories: simple.categories,
	syllables: simple.syllables,
	rewriteRules: simple.rewriteRules,
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
	modalState: {
		AppTheme: false,
		AddCategory: false,
		EditCategory: false,
		AddRewriteRule: false,
		EditRewriteRule: false,
		PresetPopup: false,
		OutputOptions: false,
		ManageCustomInfo: false
	}
};
export const blankAppState: types.StateObject = {
	appSettings: {
		theme: "Default",
		disableConfirms: false
	},
	categories: {
		map: [],
		editing: null
	},
	syllables: {
		toggle: false,
		objects: {
			singleWord: { components: [] },
			wordInitial: { components: [] },
			wordMiddle: { components: [] },
			wordFinal: { components: [] }
		}
	},
	rewriteRules: {
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
	modalState: {
		AppTheme: false,
		AddCategory: false,
		EditCategory: false,
		AddRewriteRule: false,
		EditRewriteRule: false,
		PresetPopup: false,
		OutputOptions: false,
		ManageCustomInfo: false
	}
};

// Storage
const { Storage } = Plugins;
const saveCurrentState = (state: types.StateObject) => {
	let stringified = JSON.stringify(state);
	Storage.set({key: "currentState", value: stringified});
};
const initialState: types.StateObject = blankAppState;

// reducer
export function reducer(state: types.StateObject = initialState, action: any) {
	const payload = action.payload;
	let CO: types.WGCategoryStateObject;
	let Cmap: types.CategoryMap[] = [];
	let newCategories: types.WGCategoryStateObject;
	let SO: types.WGSyllableStateObject;
	let RO: types.WGRewriteRuleStateObject;
	let final: types.StateObject = state;
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
		// Category
		case consts.ADD_CATEGORY:
			CO = state.categories;
			Cmap = CO.map.map((item: types.CategoryMap) => [item[0], item[1]]);
			let label = payload.label;
			delete payload.label;
			Cmap.push([label, payload]);
			newCategories = reduceCategory(CO, Cmap);
			// make new object, copy props from state, overwrite prop(s) with new object with new payload
			final = {
				...reduceAllBut(["categories"], state),
				categories: newCategories
			};
			break;
		case consts.START_EDIT_CATEGORY:
			CO = state.categories;
			newCategories = reduceCategory(CO);
			newCategories.editing = payload;
			final = {
				...reduceAllBut(["categories"], state),
				categories: newCategories
			};
			break;
		case consts.DO_EDIT_CATEGORY:
			CO = state.categories;
			Cmap = CO.map.map(item => {
				let [label, cat] = item;
				if(label === CO.editing) {
					delete payload.label;
					return [label, payload];
				}
				return[label, cat];
			});
			newCategories = reduceCategory(CO, Cmap);
			final = {
				...reduceAllBut(["categories"], state),
				categories: newCategories
			};
			break;
		case consts.CANCEL_EDIT_CATEGORY:
			CO = state.categories;
			newCategories = reduceCategory(CO);
			newCategories.editing = null;
			final = {
				...reduceAllBut(["categories"], state),
				categories: newCategories
			};
			break;
		case consts.DELETE_CATEGORY:
			CO = state.categories;
			Cmap = CO.map.map((item: types.CategoryMap) => [item[0], item[1]]);
			Cmap = CO.map.filter((item: types.CategoryMap) => item[0] !== payload).map((item: types.CategoryMap) => [item[0], item[1]]);
			newCategories = reduceCategory(CO, Cmap);
			final = {
				...reduceAllBut(["categories"], state),
				categories: newCategories
			};
			break;
		// Syllables
		case consts.TOGGLE_SYLLABLES:
			SO = reduceSyllables(state.syllables);
			SO.toggle = payload;
			final = {
				...reduceAllBut(["syllables"], state),
				syllables: SO
			};
			break;
		case consts.EDIT_SYLLABLES:
			SO = reduceSyllables(state.syllables);
			SO.objects[payload.key as keyof types.WGSyllableStateObject["objects"]].components = payload.syllables;
			final = {
				...reduceAllBut(["syllables"], state),
				syllables: SO
			};
			break;
		// Rewrite Rules
		case consts.ADD_REWRITE_RULE:
			RO = reduceRewriteRulesState(state.rewriteRules, 'add', payload);
			final = {
				...reduceAllBut(["rewriteRules"], state),
				rewriteRules: RO
			};
			break;
		case consts.START_EDIT_REWRITE_RULE:
			RO = reduceRewriteRulesState(state.rewriteRules);
			RO.editing = payload;
			final = {
				...reduceAllBut(["rewriteRules"], state),
				rewriteRules: RO
			};
			break;
		case consts.DO_EDIT_REWRITE_RULE:
			RO = reduceRewriteRulesState(state.rewriteRules, 'edit', payload);
			final = {
				...reduceAllBut(["rewriteRules"], state),
				rewriteRules: RO
			};
			break;
		case consts.CANCEL_EDIT_REWRITE_RULE:
			RO = reduceRewriteRulesState(state.rewriteRules);
			RO.editing = null;
			final = {
				...reduceAllBut(["rewriteRules"], state),
				rewriteRules: RO
			};
			break;
		case consts.DELETE_REWRITE_RULE:
			RO = reduceRewriteRulesState(state.rewriteRules, 'del', payload);
			final = {
				...reduceAllBut(["rewriteRules"], state),
				rewriteRules: RO
			};
			break;
		case consts.REORDER_REWRITE_RULE:
			let SRR = state.rewriteRules;
			let map = new Map(SRR.list.map(rr => [rr.key, rr]));
			RO = {
				list: payload.map((key: string) => map.get(key)),
				editing: SRR.editing
			};
			final = {
				...reduceAllBut(["rewriteRules"], state),
				rewriteRules: RO
			};
			break;
		// Wordgen Settings
		case consts.SET_MONO_RATE:
			final = {
				...reduceAllBut(["wordgenSettings"], state),
				wordgenSettings: {
					...state.wordgenSettings,
					monosyllablesRate: payload
				}
			};
			break;
		case consts.SET_MAX_SYLLABLES:
			final = {
				...reduceAllBut(["wordgenSettings"], state),
				wordgenSettings: {
					...state.wordgenSettings,
					maxSyllablesPerWord: payload
				}
			};
			break;
		case consts.SET_CATEGORY_DROPOFF:
			final = {
				...reduceAllBut(["wordgenSettings"], state),
				wordgenSettings: {
					...state.wordgenSettings,
					categoryRunDropoff: payload
				}
			};
			break;
		case consts.SET_SYLLABLE_DROPOFF:
			final = {
				...reduceAllBut(["wordgenSettings"], state),
				wordgenSettings: {
					...state.wordgenSettings,
					syllableBoxDropoff: payload
				}
			};
			break;
		case consts.SET_OUTPUT:
			final = {
				...reduceAllBut(["wordgenSettings"], state),
				wordgenSettings: {
					...state.wordgenSettings,
					output: payload
				}
			};
			break;
		case consts.SET_SYLLABLE_BREAKS:
			final = {
				...reduceAllBut(["wordgenSettings"], state),
				wordgenSettings: {
					...state.wordgenSettings,
					showSyllableBreaks: payload
				}
			};
			break;
		case consts.SET_NUMBER_OF_SENTENCES:
			final = {
				...reduceAllBut(["wordgenSettings"], state),
				wordgenSettings: {
					...state.wordgenSettings,
					sentencesPerText: payload
				}
			};
			break;
		case consts.SET_SENTENCE_CAPITALIZATION:
			final = {
				...reduceAllBut(["wordgenSettings"], state),
				wordgenSettings: {
					...state.wordgenSettings,
					capitalizeSentences: payload
				}
			};
			break;
		case consts.SET_DECLARATIVE_PRE:
			final = {
				...reduceAllBut(["wordgenSettings"], state),
				wordgenSettings: {
					...state.wordgenSettings,
					declarativeSentencePre: payload
				}
			};
			break;
		case consts.SET_DECLARATIVE_POST:
			final = {
				...reduceAllBut(["wordgenSettings"], state),
				wordgenSettings: {
					...state.wordgenSettings,
					declarativeSentencePost: payload
				}
			};
			break;
		case consts.SET_INTERROGATIVE_PRE:
			final = {
				...reduceAllBut(["wordgenSettings"], state),
				wordgenSettings: {
					...state.wordgenSettings,
					interrogativeSentencePre: payload
				}
			};
			break;
		case consts.SET_INTERROGATIVE_POST:
			final = {
				...reduceAllBut(["wordgenSettings"], state),
				wordgenSettings: {
					...state.wordgenSettings,
					interrogativeSentencePost: payload
				}
			};
			break;
		case consts.SET_EXCLAMATORY_PRE:
			final = {
				...reduceAllBut(["wordgenSettings"], state),
				wordgenSettings: {
					...state.wordgenSettings,
					exclamatorySentencePre: payload
				}
			};
			break;
		case consts.SET_EXCLAMATORY_POST:
			final = {
				...reduceAllBut(["wordgenSettings"], state),
				wordgenSettings: {
					...state.wordgenSettings,
					exclamatorySentencePost: payload
				}
			};
			break;
		case consts.SET_WORD_CAPITALIZATION:
			final = {
				...reduceAllBut(["wordgenSettings"], state),
				wordgenSettings: {
					...state.wordgenSettings,
					capitalizeWords: payload
				}
			};
			break;
		case consts.SET_SORT_WORDLIST:
			final = {
				...reduceAllBut(["wordgenSettings"], state),
				wordgenSettings: {
					...state.wordgenSettings,
					sortWordlist: payload
				}
			};
			break;
		case consts.SET_WORDLIST_MULTICOLUMN:
			final = {
				...reduceAllBut(["wordgenSettings"], state),
				wordgenSettings: {
					...state.wordgenSettings,
					wordlistMultiColumn: payload
				}
			};
			break;
		case consts.SET_WORDS_PER_WORDLIST:
			final = {
				...reduceAllBut(["wordgenSettings"], state),
				wordgenSettings: {
					...state.wordgenSettings,
					wordsPerWordlist: payload
				}
			};
			break;
		case consts.SET_CUSTOM_INFO:
			final = {
				...reduceAllBut(["wordgenSettings"], state),
				wordgenSettings: {
					...state.wordgenSettings,
					customInfo: payload
				}
			};
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
		// Presets
		case consts.LOAD_PRESET:
			let newInfo: any = Presets.get(payload);
			final = {
				...reduceAllBut(["categories", "syllables", "rewriteRules", "wordgenSettings"], state),
				categories: reduceCategory(newInfo.categories),
				syllables: reduceSyllables(newInfo.syllables),
				rewriteRules: reduceRewriteRulesState(newInfo.rewriteRules),
				wordgenSettings: {
					...state.wordgenSettings,
					...newInfo.wordgenSettings
				}
			};
			break;
		case consts.CLEAR_EVERYTHING:
			final = {
				...reduceAllBut(["categories", "syllables", "rewriteRules"], state),
				categories: {
					map: [],
					editing: null
				},
				syllables: {
					toggle: false,
					objects: {
						singleWord: { components: [] },
						wordInitial: { components: [] },
						wordMiddle: { components: [] },
						wordFinal: { components: [] }
					}
				},
				rewriteRules: {
					list: [],
					editing: null
				}
			};
			break;
		case consts.OVERWRITE_STATE:
			final = { ...payload };
			maybeUpdateTheme(state.appSettings.theme, final.appSettings.theme);
			break;
		case consts.LOAD_CUSTOM_INFO:
			final = {
				...reduceAllBut(["categories", "syllables", "rewriteRules", "wordgenSettings"], state),
				categories: payload[0],
				syllables: payload[1],
				rewriteRules: payload[2],
				wordgenSettings: {
					...state.wordgenSettings,
					...payload[3]
				}
			};
			break;
	}
	// Some sort of store-state function goes here
	debounce(saveCurrentState, [final]);
	return final;
};

