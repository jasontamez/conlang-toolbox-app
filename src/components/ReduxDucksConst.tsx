import packageJson from '../../package.json';

// constants (actions)
export let VERSION = {
	current: packageJson.version
};

const p = "conlangs-toolbox/reducer/";
export const CHANGE_THEME = p+"CHANGE_THEME";
export const TOGGLE_DISABLE_CONFIRM = p+"TOGGLE_DISABLE_CONFIRM";
export const TOGGLE_LEXICON_HORIZONTAL_SCROLL = p+"TOGGLE_LEXICON_HORIZONTAL_SCROLL";

export const ADD_CATEGORY_WG = p+"ADD_CATEGORY_WG";
export const START_EDIT_CATEGORY_WG = p+"START_EDIT_CATEGORY_WG";
export const CANCEL_EDIT_CATEGORY_WG = p+"CANCEL_EDIT_CATEGORY_WG";
export const DO_EDIT_CATEGORY_WG = p+"DO_EDIT_CATEGORY_WG";
export const DELETE_CATEGORY_WG = p+"DELETE_CATEGORY_WG";

export const TOGGLE_SYLLABLES = p+"TOGGLE_SYLLABLES";
export const EDIT_SYLLABLES = p+"EDIT_SYLLABLES";

export const ADD_REWRITE_RULE_WG = p+"ADD_REWRITE_RULE_WG";
export const START_EDIT_REWRITE_RULE_WG = p+"START_EDIT_REWRITE_RULE_WG";
export const CANCEL_EDIT_REWRITE_RULE_WG = p+"CANCEL_EDIT_REWRITE_RULE_WG";
export const DO_EDIT_REWRITE_RULE_WG = p+"DO_EDIT_REWRITE_RULE_WG";
export const DELETE_REWRITE_RULE_WG = p+"DELETE_REWRITE_RULE_WG";
export const REORDER_REWRITE_RULE_WG = p+"REORDER_REWRITE_RULE_WG";

export const SET_MONO_RATE_WG = p+"SET_MONO_RATE_WG";
export const SET_MAX_SYLLABLES_WG = p+"SET_MAX_SYLLABLES_WG";
export const SET_CATEGORY_DROPOFF_WG = p+"SET_CATEGORY_DROPOFF_WG";
export const SET_SYLLABLE_DROPOFF_WG = p+"SET_SYLLABLE_DROPOFF_WG";
export const SET_OUTPUT_WG = p+"SET_OUTPUT_WG";
export const SET_SYLLABLE_BREAKS_WG = p+"SET_SYLLABLE_BREAKS_WG";
export const SET_NUMBER_OF_SENTENCES_WG = p+"SET_NUMBER_OF_SENTENCES_WG";
export const SET_SENTENCE_CAPITALIZATION_WG = p+"SET_SENTENCE_CAPITALIZATION_WG";
export const SET_DECLARATIVE_PRE_WG = p+"SET_DECLARATIVE_PRE_WG";
export const SET_DECLARATIVE_POST_WG = p+"SET_DECLARATIVE_POST_WG";
export const SET_INTERROGATIVE_PRE_WG = p+"SET_INTERROGATIVE_PRE_WG";
export const SET_INTERROGATIVE_POST_WG = p+"SET_INTERROGATIVE_POST_WG";
export const SET_EXCLAMATORY_PRE_WG = p+"SET_EXCLAMATORY_PRE_WG";
export const SET_EXCLAMATORY_POST_WG = p+"SET_EXCLAMATORY_POST_WG";
export const SET_WORD_CAPITALIZATION_WG = p+"SET_WORD_CAPITALIZATION_WG";
export const SET_SORT_WORDLIST_WG = p+"SET_SORT_WORDLIST_WG";
export const SET_WORDLIST_MULTICOLUMN_WG = p+"SET_WORDLIST_MULTICOLUMN_WG";
export const SET_WORDS_PER_WORDLIST_WG = p+"SET_WORDS_PER_WORDLIST_WG";

export const ADD_CATEGORY_WE = p+"ADD_CATEGORY_WE";
export const START_EDIT_CATEGORY_WE = p+"START_EDIT_CATEGORY_WE";
export const CANCEL_EDIT_CATEGORY_WE = p+"CANCEL_EDIT_CATEGORY_WE";
export const DO_EDIT_CATEGORY_WE = p+"DO_EDIT_CATEGORY_WE";
export const DELETE_CATEGORY_WE = p+"DELETE_CATEGORY_WE";

export const ADD_TRANSFORM_WE = p+"ADD_TRANSFORM_WE";
export const START_EDIT_TRANSFORM_WE = p+"START_EDIT_TRANSFORM_WE";
export const CANCEL_EDIT_TRANSFORM_WE = p+"CANCEL_EDIT_TRANSFORM_WE";
export const DO_EDIT_TRANSFORM_WE = p+"DO_EDIT_TRANSFORM_WE";
export const DELETE_TRANSFORM_WE = p+"DELETE_TRANSFORM_WE";
export const REORDER_TRANSFORM_WE = p+"REORDER_TRANSFORM_WE";

export const ADD_SOUND_CHANGE_WE = p+"ADD_SOUND_CHANGE_WE";
export const START_EDIT_SOUND_CHANGE_WE = p+"START_EDIT_SOUND_CHANGE_WE";
export const CANCEL_EDIT_SOUND_CHANGE_WE = p+"CANCEL_EDIT_SOUND_CHANGE_WE";
export const DO_EDIT_SOUND_CHANGE_WE = p+"DO_EDIT_SOUND_CHANGE_WE";
export const DELETE_SOUND_CHANGE_WE = p+"DELETE_SOUND_CHANGE_WE";
export const REORDER_SOUND_CHANGE_WE = p+"REORDER_SOUND_CHANGE_WE";

export const UPDATE_INPUT_LEXICON = p+"UPDATE_INPUT_LEXICON";

export const SET_OUTPUT_WE = p+"SET_OUTPUT_WE";
export const SET_ARROW_WE = p+"SET_ARROW_WE";


export const UPDATE_LEXICON = p+"UPDATE_LEXICON";
export const UPDATE_LEXICON_EDITING = p+"UPDATE_LEXICON_EDITING";
export const UPDATE_LEXICON_PROP = p+"UPDATE_LEXICON_PROP";
export const UPDATE_LEXICON_NUM = p+"UPDATE_LEXICON_NUM";
export const UPDATE_LEXICON_BOOL = p+"UPDATE_LEXICON_BOOL";
export const UPDATE_LEXICON_COLUMNS = p+"UPDATE_LEXICON_COLUMNS";
export const UPDATE_LEXICON_SORT = p+"UPDATE_LEXICON_SORT";
export const DO_EDIT_LEXICON_ITEM = p+"DO_EDIT_LEXICON_ITEM";
export const ADD_LEXICON_ITEM = p+"ADD_LEXICON_ITEM";
export const ADD_DEFERRED_LEXICON_ITEM = p+"ADD_DEFERRED_LEXICON_ITEM";
export const REMOVE_DEFERRED_LEXICON_ITEM = p+"REMOVE_DEFERRED_LEXICON_ITEM";
export const CLEAR_DEFERRED_LEXICON_ITEMS = p+"CLEAR_DEFERRED_LEXICON_ITEMS";
export const DELETE_LEXICON_ITEM = p+"DELETE_LEXICON_ITEM";
export const UPDATE_LEXICON_ITEM = p+"UPDATE_LEXICON_ITEM";
export const UPDATE_LEXICON_ITEM_ORDER = p+"UPDATE_LEXICON_ITEM_ORDER";


export const TOGGLE_MODAL = p+"TOGGLE_MODAL";
export const TOGGLE_POPOVER = p+"TOGGLE_POPOVER";
export const SET_LOADING_PAGE = p+"SET_LOADING_PAGE";

export const LOAD_PRESET_WG = p+"LOAD_PRESET";
export const CLEAR_EVERYTHING_WG = p+"CLEAR_EVERYTHING_WG";
export const OVERWRITE_STATE = p+"OVERWRITE_STATE";
export const LOAD_CUSTOM_INFO_WG = p+"LOAD_CUSTOM_INFO_WG";

export const SET_TEMPORARY_INFO = p+"SET_TEMPORARY_INFO";

export const CHANGE_VIEW = p+"CHANGE_VIEW";
