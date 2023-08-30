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
// CharGroup
export function addCharGroupWG(payload: types.WGCharGroupObject) {
	return {type: consts.ADD_CHARACTER_GROUP_WG, payload};
}
export function startEditCharGroupWG(payload: types.WGCharGroupObject) {
	return {type: consts.START_EDIT_CHARACTER_GROUP_WG, payload};
}
export function cancelEditCharGroupWG(payload: types.WGCharGroupObject) {
	return {type: consts.CANCEL_EDIT_CHARACTER_GROUP_WG, payload};
}
export function doEditCharGroupWG(payload: types.WGCharGroupObject) {
	return {type: consts.DO_EDIT_CHARACTER_GROUP_WG, payload};
}
export function deleteCharGroupWG(payload: types.WGCharGroupObject) {
	return {type: consts.DELETE_CHARACTER_GROUP_WG, payload};
}
// Syllables
export function toggleSyllables(payload: boolean) {
	return {type: consts.TOGGLE_SYLLABLES, payload};
}
export function editSyllables(payload1: keyof types.AllWGSyllableObjects, payload2: string[]) {
	return {type: consts.EDIT_SYLLABLES, payload: {key: payload1, syllables: payload2}};
}
export function setEditableSyllables(payload: keyof types.AllWGSyllableObjects | undefined = undefined) {
	return {type: consts.SET_EDIT_SYLLABLES, payload};
}
export function modSyllableDropoff(payload1: keyof types.AllWGSyllableObjects, payload2: types.Zero_Fifty | undefined) {
	return {type: consts.MOD_SYLLABLE_DROPOFF, payload: {key: payload1, value: payload2}};
}
// Transforms
export function addTransformWG(payload: types.WGTransformObject) {
	return {type: consts.ADD_REWRITE_RULE_WG, payload};
}
export function startEditTransformWG(payload: types.WGTransformObject) {
	return {type: consts.START_EDIT_REWRITE_RULE_WG, payload};
}
export function cancelEditTransformWG(payload: types.WGTransformObject) {
	return {type: consts.CANCEL_EDIT_REWRITE_RULE_WG, payload};
}
export function doEditTransformWG(payload: types.WGTransformObject) {
	return {type: consts.DO_EDIT_REWRITE_RULE_WG, payload};
}
export function deleteTransformWG(payload: types.WGTransformObject) {
	return {type: consts.DELETE_REWRITE_RULE_WG, payload};
}
export function reorderTransformsWG(payload: types.WGTransformObject[]) {
	return {type: consts.REORDER_REWRITE_RULE_WG, payload};
}
// Wordgen Settings
export function setMonoRateWG(payload: types.Zero_OneHundred) {
	return {type: consts.SET_MONO_RATE_WG, payload};
}
export function setMaxSyllablesWG(payload: types.Two_Fifteen) {
	return {type: consts.SET_MAX_SYLLABLES_WG, payload};
}
export function setCharGroupDropoffWG(payload: types.Zero_Fifty) {
	return {type: consts.SET_CHARACTER_GROUP_DROPOFF_WG, payload};
}
export function setSyllableDropoffWG(payload: types.Zero_Fifty) {
	return {type: consts.SET_SYLLABLE_DROPOFF_WG, payload};
}
export function setOutputTypeWG(payload: types.WGOutputTypes) {
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
// CharGroup
export function addCharGroupWE(payload: types.WECharGroupObject) {
	return {type: consts.ADD_CHARACTER_GROUP_WE, payload};
}
export function startEditCharGroupWE(payload: types.WECharGroupObject) {
	return {type: consts.START_EDIT_CHARACTER_GROUP_WE, payload};
}
export function cancelEditCharGroupWE(payload: types.WECharGroupObject) {
	return {type: consts.CANCEL_EDIT_CHARACTER_GROUP_WE, payload};
}
export function doEditCharGroupWE(payload: types.WECharGroupObject) {
	return {type: consts.DO_EDIT_CHARACTER_GROUP_WE, payload};
}
export function deleteCharGroupWE(payload: types.WECharGroupObject) {
	return {type: consts.DELETE_CHARACTER_GROUP_WE, payload};
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
export function reorderTransformsWE(payload: types.WETransformObject[]) {
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
export function reorderSoundChangesWE(payload: types.WESoundChangeObject[]) {
	return {type: consts.REORDER_SOUND_CHANGE_WE, payload};
}
// Input Lexicon
export function updateInputLexicon(payload: types.WEInputObject) {
	return {type: consts.UPDATE_INPUT_LEXICON, payload};
}
export function loadPresetWE(payload: string) {
	return {type: consts.LOAD_PRESET_WE, payload};
}
// Output
export function setOutputTypeWE(payload: types.WEOutputTypes) {
	return {type: consts.SET_OUTPUT_WE, payload};
}
export function loadCustomInfoWE(payload: types.WECustomInfo) {
	return {type: consts.LOAD_CUSTOM_INFO_WE, payload};
}


//
// MORPHOSYNTAX
//
export function setSyntaxState(prop: string, toggle: boolean) {
	return {type: consts.SET_MORPHOSYNTAX_STATE, payload: [prop, toggle]};
}
export function setMorphoSyntax(payload: types.MorphoSyntaxObject) {
	return {type: consts.SET_MORPHOSYNTAX, payload};
}
export function setMorphoSyntaxText(payload1: "key" | "description" | "title", payload2: string) {
	return {type: consts.SET_MORPHOSYNTAX_INFO_TEXT, payload: [payload1, payload2]};
}
export function setMorphoSyntaxNum(payload1: "lastSave", payload2: number) {
	return {type: consts.SET_MORPHOSYNTAX_INFO_NUM, payload: [payload1, payload2]};
}
//SET_MORPHOSYNTAX_INFO_TEXT
export function setSyntaxBool(payload1: keyof types.MorphoSyntaxBoolObject, payload2: boolean) {
	return {type: consts.SET_MORPHOSYNTAX_BOOL, payload: [payload1, payload2]};
}
export function setSyntaxNum(payload1: keyof types.MorphoSyntaxNumberObject, payload2: number) {
	return {type: consts.SET_MORPHOSYNTAX_NUM, payload: [payload1, payload2]};
}
export function setSyntaxText(payload1: keyof types.MorphoSyntaxTextObject, payload2: string) {
	return {type: consts.SET_MORPHOSYNTAX_TEXT, payload: [payload1, payload2]};
}


//
// LEXICON
//
export function updateLexicon(payload: types.LexiconObject) {
	return {type: consts.UPDATE_LEXICON, payload};
}
export function startEditLexiconItem(payload: number) {
	return {type: consts.UPDATE_LEXICON_EDITING, payload};
}
export function cancelEditLexiconItem() {
	return {type: consts.UPDATE_LEXICON_EDITING, payload: undefined};
}
export function doEditLexiconItem(payload: types.Lexicon) {
	return {type: consts.DO_EDIT_LEXICON_ITEM, payload};
}
export function deleteLexiconItem(payload: number) {
	return {type: consts.DELETE_LEXICON_ITEM, payload};
}
export function addLexiconItem(payload: types.Lexicon) {
	return {type: consts.ADD_LEXICON_ITEM, payload};
}
export function addDeferredLexiconItems(payload: string[]) {
	return {type: consts.ADD_DEFERRED_LEXICON_ITEM, payload};
}
export function removeDeferredLexiconItem(payload: string) {
	return {type:consts.REMOVE_DEFERRED_LEXICON_ITEM, payload}
}
export function clearDeferredLexiconItems() {
	return {type: consts.CLEAR_DEFERRED_LEXICON_ITEMS, payload: undefined};
}
export function updateLexiconText(prop: "title" | "description" | "key", value: string) {
	return {type: consts.UPDATE_LEXICON_PROP, payload: {prop, value}};
}
export function updateLexiconNumber(prop: "lastSave", value: number) {
	return {type: consts.UPDATE_LEXICON_NUM, payload: {prop, value}};
}
export function updateLexiconBool(prop: "sorted", value: boolean) {
	return {type: consts.UPDATE_LEXICON_BOOL, payload: {prop, value}};
}
export function updateLexiconColumns(payload: types.colEdit | undefined) {
	return {type: consts.UPDATE_LEXICON_COLUMNS, payload};
}
export function updateLexiconOrder(payload: types.Lexicon[]) {
	return {type: consts.UPDATE_LEXICON_ITEM_ORDER, payload};
}
export function updateLexiconSort(payload: number[]) {
	return {type: consts.UPDATE_LEXICON_SORT, payload};
}
export function toggleLexiconWrap() {
	return {type: consts.TOGGLE_LEXICON_WRAP};
}

//
// VIEWS
//
export function changeView(payload: string[]) {
	return {type: consts.CHANGE_VIEW, payload: { app: payload[0] as keyof types.ViewStateObject, page: payload[1] }};
}

//
// EXTRA CHARACTERS
//
export function updateExtraCharsDisplay(payload: types.ExtraCharactersDisplayName) {
	return {type: consts.UPDATE_EXTRA_CHARS_DISPLAY, payload};
}
export function updateExtraCharsFavorites(payload: string[]) {
	return {type: consts.UPDATE_EXTRA_CHARS_FAVORITE, payload};
}
export function toggleExtraCharsBoolean(payload: "adding" | "deleting" | "showNames" | "copyImmediately" | "showHelp") {
	return {type: consts.TOGGLE_EXTRA_CHARS_BOOLEAN, payload};
}
export function updateExtraCharsToBeSaved(payload: string) {
	return {type: consts.UPDATE_EXTRA_CHARS_TO_BE_SAVED, payload};
}

//
// WORD LISTS
//
export function updateWordListsDisplay(payload: (keyof types.WL)[]) {
	return {type: consts.UPDATE_WORD_LISTS_DISPLAY, payload};
}
export function toggleWordListsBoolean(payload: "textCenter") {
	return {type: consts.TOGGLE_WORD_LISTS_BOOLEAN, payload};
}

//
// LOGS
//
/*export function setLog(payload: string[]) {
	return {type: consts.SET_LOG, payload};
}
export function addToLog(payload: string) {
	return {type: consts.ADD_TO_LOG, payload};
}*/

// Overwrite State
export function overwriteState(payload: types.StateObject) {
	return {type: consts.OVERWRITE_STATE, payload};
}
