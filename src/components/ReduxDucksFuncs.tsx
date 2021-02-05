import * as consts from './ReduxDucksConst';
import * as types from './ReduxDucksTypes';

// action creators
//
// AppSettings
export function changeTheme(payload: string) {
	return {type: consts.CHANGE_THEME, payload};
}
export function toggleDisableConfirm(payload: boolean) {
	return {type: consts.TOGGLE_DISABLE_CONFIRM, payload};
}
// Category
export function addCategory(payload: types.WGCategoryObject) {
	return {type: consts.ADD_CATEGORY, payload};
}
export function startEditCategory(payload: types.WGCategoryObject) {
	return {type: consts.START_EDIT_CATEGORY, payload};
}
export function cancelEditCategory(payload: types.WGCategoryObject) {
	return {type: consts.CANCEL_EDIT_CATEGORY, payload};
}
export function doEditCategory(payload: types.WGCategoryObject) {
	return {type: consts.DO_EDIT_CATEGORY, payload};
}
export function deleteCategory(payload: types.WGCategoryObject) {
	return {type: consts.DELETE_CATEGORY, payload};
}
// Syllables
export function toggleSyllables(payload: boolean) {
	return {type: consts.TOGGLE_SYLLABLES, payload }
}
export function editSyllables(payload1: keyof types.WGSyllableStateObject["objects"], payload2: string[]) {
	return {type: consts.EDIT_SYLLABLES, payload: {key: payload1, syllables: payload2}};
}
// Rewrite Rules
export function addRewriteRule(payload: types.WGRewriteRuleObject) {
	return {type: consts.ADD_REWRITE_RULE, payload};
}
export function startEditRewriteRule(payload: types.WGRewriteRuleObject) {
	return {type: consts.START_EDIT_REWRITE_RULE, payload};
}
export function cancelEditRewriteRule(payload: types.WGRewriteRuleObject) {
	return {type: consts.CANCEL_EDIT_REWRITE_RULE, payload};
}
export function doEditRewriteRule(payload: types.WGRewriteRuleObject) {
	return {type: consts.DO_EDIT_REWRITE_RULE, payload};
}
export function deleteRewriteRule(payload: types.WGRewriteRuleObject) {
	return {type: consts.DELETE_REWRITE_RULE, payload};
}
export function reorderRewriteRules(payload: types.WGRewriteRuleObject["key"][]) {
	return {type: consts.REORDER_REWRITE_RULE, payload};
}
// Wordgen Settings
export function setMonoRate(payload: types.Zero_OneHundred) {
	return {type: consts.SET_MONO_RATE, payload};
}
export function setMaxSyllables(payload: types.Two_Fifteen) {
	return {type: consts.SET_MAX_SYLLABLES, payload};
}
export function setCategoryDropoff(payload: types.Zero_Fifty) {
	return {type: consts.SET_CATEGORY_DROPOFF, payload};
}
export function setSyllableDropoff(payload: types.Zero_Fifty) {
	return {type: consts.SET_SYLLABLE_DROPOFF, payload};
}
export function setOutputType(payload: types.OutputTypes) {
	return {type: consts.SET_OUTPUT, payload};
}
export function setSyllableBreaks(payload: boolean) {
	return {type: consts.SET_SYLLABLE_BREAKS, payload};
}
export function setSentencesPerText(payload: types.Five_OneHundred) {
	return {type: consts.SET_NUMBER_OF_SENTENCES, payload};
}
export function setCapitalizeSentences(payload: boolean) {
	return {type: consts.SET_SENTENCE_CAPITALIZATION, payload};
}
export function setDeclarativePre(payload: string) {
	return {type: consts.SET_DECLARATIVE_PRE, payload};
}
export function setDeclarativePost(payload: string) {
	return {type: consts.SET_DECLARATIVE_POST, payload};
}
export function setInterrogativePre(payload: string) {
	return {type: consts.SET_INTERROGATIVE_PRE, payload};
}
export function setInterrogativePost(payload: string) {
	return {type: consts.SET_INTERROGATIVE_POST, payload};
}
export function setExclamatoryPre(payload: string) {
	return {type: consts.SET_EXCLAMATORY_PRE, payload};
}
export function setExclamatoryPost(payload: string) {
	return {type: consts.SET_EXCLAMATORY_POST, payload};
}
export function setCapitalizeWords(payload: boolean) {
	return {type: consts.SET_WORD_CAPITALIZATION, payload};
}
export function setSortWordlist(payload: boolean) {
	return {type: consts.SET_SORT_WORDLIST, payload};
}
export function setWordlistMulticolumn(payload: boolean) {
	return {type: consts.SET_WORDLIST_MULTICOLUMN, payload};
}
export function setWordsPerWordlist(payload: types.Fifty_OneThousand) {
	return {type: consts.SET_WORDS_PER_WORDLIST, payload};
}
export function setCustomInfo(payload: string[]) {
	return {type: consts.SET_CUSTOM_INFO, payload};
}
// Modals
export function openModal(payload: keyof types.ModalStateObject) {
	return {type: consts.TOGGLE_MODAL, payload: {modal: payload, flag: true}};
}
export function closeModal(payload: keyof types.ModalStateObject) {
	return {type: consts.TOGGLE_MODAL, payload: {modal: payload, flag: false}};
}
// Views
export function changeView(payload1: keyof types.ViewStateObject, payload2: string) {
	return {type: consts.CHANGE_VIEW, payload: { app: payload1, page: payload2 }};
}
// Presets
export function loadPreset(payload: string) {
	return {type: consts.LOAD_PRESET, payload};
}
export function clearEverything() {
	return {type: consts.CLEAR_EVERYTHING_WG, payload: null};
}
export function overwriteState(payload: types.StateObject) {
	return {type: consts.OVERWRITE_STATE, payload};
}
export function loadCustomInfo(payload: types.CustomInfo) {
	return {type: consts.LOAD_CUSTOM_INFO, payload};
}
