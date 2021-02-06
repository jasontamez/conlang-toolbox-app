import WGPresets from './WGPresets';
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
			list = original.list.filter(rr => rr.key !== rule).map(rr => reduceRewriteRulesWG(rr));
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
const reduceWGSettingsWG = (original: types.WGSettingsObject) => {
	return {...original};
};
const reduceModalState = (original: types.ModalStateObject) => {
	return {...original};
};
const reduceViewState = (original: types.ViewStateObject) => {
	return {...original};
}


const stateObjectProps: [(keyof types.StateObject), Function][] = [
	["currentVersion", (v: string) => v],
	["appSettings", reduceAppSettings],
	["wordgenCategories", reduceCategoryWG],
	["wordgenSyllables", reduceSyllablesWG],
	["wordgenRewriteRules", reduceRewriteRulesWG],
	["wordgenSettings", reduceWGSettingsWG],
	["modalState", reduceModalState],
	["viewState", reduceViewState]
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
const simple: types.Preset = WGPresets.get("Simple")!;
export const initialAppState: types.StateObject = {
	currentVersion: "0.1",
	appSettings: {
		theme: "Default",
		disableConfirms: false
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
	modalState: {
		AppTheme: false,
		AddCategory: false,
		EditCategory: false,
		AddRewriteRule: false,
		EditRewriteRule: false,
		PresetPopup: false,
		OutputOptions: false,
		ManageCustomInfo: false
	},
	viewState: {
		wg: 'home',
		we: 'home',
		ls: 'home'
	}
};
export const blankAppState: types.StateObject = {
	currentVersion: "0.1",
	appSettings: {
		theme: "Default",
		disableConfirms: false
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
	modalState: {
		AppTheme: false,
		AddCategory: false,
		EditCategory: false,
		AddRewriteRule: false,
		EditRewriteRule: false,
		PresetPopup: false,
		OutputOptions: false,
		ManageCustomInfo: false
	},
	viewState: {
		wg: 'home',
		we: 'home',
		ls: 'home'
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
	let Cmap: types.WGCategoryMap[] = [];
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
		//
		// WORDGEN
		//
		// Category
		case consts.ADD_CATEGORY_WG:
			CO = state.wordgenCategories;
			Cmap = CO.map.map((item: types.WGCategoryMap) => [item[0], item[1]]);
			let label = payload.label;
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
		// Views
		case consts.CHANGE_VIEW:
			let newView: types.ViewStateObject = reduceViewState(state.viewState);
			newView[payload.app as keyof types.ViewStateObject] = payload.page;
			final = {
				...reduceAllBut(["viewState"], state),
				viewState: newView
			};
			break;
	}
	// Some sort of store-state function goes here
	debounce(saveCurrentState, [final]);
	return final;
};

