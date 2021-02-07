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
//
// WORDGEN
//
// Category
export function addCategoryWG(payload: types.WGCategoryObject) {
	return {type: consts.ADD_CATEGORY_WG, payload};
}
export function startEditCategoryWG(payload: types.WGCategoryObject) {
	return {type: consts.START_EDIT_CATEGORY_WG, payload};
}
export function cancelEditCategoryWG(payload: types.WGCategoryObject) {
	return {type: consts.CANCEL_EDIT_CATEGORY_WG, payload};
}
export function doEditCategoryWG(payload: types.WGCategoryObject) {
	return {type: consts.DO_EDIT_CATEGORY_WG, payload};
}
export function deleteCategoryWG(payload: types.WGCategoryObject) {
	return {type: consts.DELETE_CATEGORY_WG, payload};
}
// Syllables
export function toggleSyllables(payload: boolean) {
	return {type: consts.TOGGLE_SYLLABLES, payload }
}
export function editSyllables(payload1: keyof types.WGSyllableStateObject["objects"], payload2: string[]) {
	return {type: consts.EDIT_SYLLABLES, payload: {key: payload1, syllables: payload2}};
}
// Rewrite Rules
export function addRewriteRuleWG(payload: types.WGRewriteRuleObject) {
	return {type: consts.ADD_REWRITE_RULE_WG, payload};
}
export function startEditRewriteRuleWG(payload: types.WGRewriteRuleObject) {
	return {type: consts.START_EDIT_REWRITE_RULE_WG, payload};
}
export function cancelEditRewriteRuleWG(payload: types.WGRewriteRuleObject) {
	return {type: consts.CANCEL_EDIT_REWRITE_RULE_WG, payload};
}
export function doEditRewriteRuleWG(payload: types.WGRewriteRuleObject) {
	return {type: consts.DO_EDIT_REWRITE_RULE_WG, payload};
}
export function deleteRewriteRuleWG(payload: types.WGRewriteRuleObject) {
	return {type: consts.DELETE_REWRITE_RULE_WG, payload};
}
export function reorderRewriteRulesWG(payload: types.WGRewriteRuleObject["key"][]) {
	return {type: consts.REORDER_REWRITE_RULE_WG, payload};
}
// Wordgen Settings
export function setMonoRateWG(payload: types.Zero_OneHundred) {
	return {type: consts.SET_MONO_RATE_WG, payload};
}
export function setMaxSyllablesWG(payload: types.Two_Fifteen) {
	return {type: consts.SET_MAX_SYLLABLES_WG, payload};
}
export function setCategoryDropoffWG(payload: types.Zero_Fifty) {
	return {type: consts.SET_CATEGORY_DROPOFF_WG, payload};
}
export function setSyllableDropoffWG(payload: types.Zero_Fifty) {
	return {type: consts.SET_SYLLABLE_DROPOFF_WG, payload};
}
export function setOutputTypeWG(payload: types.OutputTypes) {
	return {type: consts.SET_OUTPUT_WG, payload};
}
export function setSyllableBreaksWG(payload: boolean) {
	return {type: consts.SET_SYLLABLE_BREAKS_WG, payload};
}
export function setSentencesPerTextWG(payload: types.Five_OneHundred) {
	return {type: consts.SET_NUMBER_OF_SENTENCES_WG, payload};
}
export function setCapitalizeSentencesWG(payload: boolean) {
	return {type: consts.SET_SENTENCE_CAPITALIZATION_WG, payload};
}
export function setDeclarativePreWG(payload: string) {
	return {type: consts.SET_DECLARATIVE_PRE_WG, payload};
}
export function setDeclarativePostWG(payload: string) {
	return {type: consts.SET_DECLARATIVE_POST_WG, payload};
}
export function setInterrogativePreWG(payload: string) {
	return {type: consts.SET_INTERROGATIVE_PRE_WG, payload};
}
export function setInterrogativePostWG(payload: string) {
	return {type: consts.SET_INTERROGATIVE_POST_WG, payload};
}
export function setExclamatoryPreWG(payload: string) {
	return {type: consts.SET_EXCLAMATORY_PRE_WG, payload};
}
export function setExclamatoryPostWG(payload: string) {
	return {type: consts.SET_EXCLAMATORY_POST_WG, payload};
}
export function setCapitalizeWordsWG(payload: boolean) {
	return {type: consts.SET_WORD_CAPITALIZATION_WG, payload};
}
export function setSortWordlistWG(payload: boolean) {
	return {type: consts.SET_SORT_WORDLIST_WG, payload};
}
export function setWordlistMulticolumnWG(payload: boolean) {
	return {type: consts.SET_WORDLIST_MULTICOLUMN_WG, payload};
}
export function setWordsPerWordlistWG(payload: types.Fifty_OneThousand) {
	return {type: consts.SET_WORDS_PER_WORDLIST_WG, payload};
}
export function setCustomInfoWG(payload: string[]) {
	return {type: consts.SET_CUSTOM_INFO_WG, payload};
}
// Presets
export function loadPresetWG(payload: string) {
	return {type: consts.LOAD_PRESET_WG, payload};
}
export function clearEverything() {
	return {type: consts.CLEAR_EVERYTHING_WG, payload: null};
}
export function loadCustomInfoWG(payload: types.WGCustomInfo) {
	return {type: consts.LOAD_CUSTOM_INFO_WG, payload};
}
//
// WORDEVOLVE
//
// Category
export function addCategoryWE(payload: types.WECategoryObject) {
	return {type: consts.ADD_CATEGORY_WE, payload};
}
export function startEditCategoryWE(payload: types.WECategoryObject) {
	return {type: consts.START_EDIT_CATEGORY_WE, payload};
}
export function cancelEditCategoryWE(payload: types.WECategoryObject) {
	return {type: consts.CANCEL_EDIT_CATEGORY_WE, payload};
}
export function doEditCategoryWE(payload: types.WECategoryObject) {
	return {type: consts.DO_EDIT_CATEGORY_WE, payload};
}
export function deleteCategoryWE(payload: types.WECategoryObject) {
	return {type: consts.DELETE_CATEGORY_WE, payload};
}
// Transforms
export function addTransformWE(payload: types.WETransformObject) {
	return {type: consts.ADD_TRANSFORM_WE, payload};
}
export function startEditTransformWE(payload: types.WETransformObject) {
	return {type: consts.START_EDIT_TRANSFORM_WE, payload};
}
export function cancelEditTransformWE(payload: types.WETransformObject) {
	return {type: consts.CANCEL_EDIT_TRANSFORM_WE, payload};
}
export function doEditTransformWE(payload: types.WETransformObject) {
	return {type: consts.DO_EDIT_TRANSFORM_WE, payload};
}
export function deleteTransformWE(payload: types.WETransformObject) {
	return {type: consts.DELETE_TRANSFORM_WE, payload};
}
export function reorderTransformsWE(payload: types.WETransformObject["key"][]) {
	return {type: consts.REORDER_TRANSFORM_WE, payload};
}
// Sound Changes
export function addSoundChangeWE(payload: types.WESoundChangeObject) {
	return {type: consts.ADD_SOUND_CHANGE_WE, payload};
}
export function startEditSoundChangeWE(payload: types.WESoundChangeObject) {
	return {type: consts.START_EDIT_SOUND_CHANGE_WE, payload};
}
export function cancelEditSoundChangeWE(payload: types.WESoundChangeObject) {
	return {type: consts.CANCEL_EDIT_SOUND_CHANGE_WE, payload};
}
export function doEditSoundChangeWE(payload: types.WESoundChangeObject) {
	return {type: consts.DO_EDIT_SOUND_CHANGE_WE, payload};
}
export function deleteSoundChangeWE(payload: types.WESoundChangeObject) {
	return {type: consts.DELETE_SOUND_CHANGE_WE, payload};
}
export function reorderSoundChangesWE(payload: types.WESoundChangeObject["key"][]) {
	return {type: consts.REORDER_SOUND_CHANGE_WE, payload};
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
// Overwrite State
export function overwriteState(payload: types.StateObject) {
	return {type: consts.OVERWRITE_STATE, payload};
}
