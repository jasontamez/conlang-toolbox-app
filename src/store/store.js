import { combineReducers, configureStore } from '@reduxjs/toolkit';

//import packageJson from '../package.json';
import msSlice from './msSlice';
import conceptsSlice from './conceptsSlice';
//import appStateSlice from './appStateSlice';
import lexiconSlice from './lexiconSlice';
//import wgSlice from './wgSlice';
//import weSlice from './weSlice';
//import extraCharactersSlice from './extraCharactersSlice';
//import historySlice from './historySlice';
import blankAppState from './blankAppState';

//
//
//
// ----- USE THIS to put in temporary changes for testing.
let initialAppState = {...blankAppState};
/*
initialAppState.wg = {
	...initialAppState.wg,
	characterGroups: [
		{
			label: "C",
			description: "Consonants",
			run: "tnsrdlSmTqwfgWypbCcvhPBkjxqz"
		},
		{
			label: "V",
			description: "Vowels",
			run: "eaoeaoiuOIiEAUuy"
		},
		{
			label: "P",
			description: "Plosives",
			run: "tpkc"
		},
		{
			label: "L",
			description: "Liquids",
			run: "rl"
		},
		{
			label: "N",
			description: "Nasals",
			run: "nmN"
		},
		{
			label: "F",
			description: "Post-nasal or -liquid Final Consonants",
			run: "TS"
		}
	],
	singleWord: "CV\nCVC\nVC\nV\nPLVC\nPLV",
	wordInitial: "CVC\nCV\nVC\nPLV\nsPLV\nV",
	wordMiddle: "CV\nCV\nCV\nVC\nV",
	wordFinal: "CV\nCVC\nCVLF\nCVNF\nCVgh\nVC\nV\nVgh",
	multipleSyllableTypes: true,
	maxSyllablesPerWord: 5,
	// TRANSFORMS
	transforms: [
		{
			id: "15",
			search: "([^g])h",
			replace: "$1k",
			description: "change non-initial h to k if not preceeded by a g"
		},
		{
			id: "0",
			search: "s*T+s*",
			replace: "th",
			description: ""
		},
		{
			id: "1",
			search: "s*S+s*",
			replace: "sh",
			description: ""
		},
		{
			id: "2",
			search: "C+",
			replace: "ch",
			description: ""
		},
		{
			id: "5",
			search: "[nm]*N+[nm]*",
			replace: "ng",
			description: ""
		},
		{
			id: "6",
			search: "w*W+(%V)",
			replace: "wh$1",
			description: "W-vowel becomes wh-vowel"
		},
		{
			id: "6.1",
			search: "[wW]+",
			replace: "w",
			description: "remaining Ws become w"
		},
		{
			id: "7",
			search: "(%V)ch",
			replace: "$1tch",
			description: "vowel-ch becomes vowel-tch"
		},
		{
			id: "8",
			search: "P+",
			replace: "ph",
			description: ""
		},
		{
			id: "9",
			search: "(%V)B(\\b|!%V)",
			replace: "$1ble$2",
			description: "vowel-ble-nonvowel"
		},
		{
			id: "9.1",
			search: "(%V)B",
			replace: "$1bl",
			description: "vowel-bl"
		},
		{
			id: "9.2",
			search: "B",
			replace: "",
			description: "eliminate remaining Bs"
		},
		{
			id: "10",
			search: "%V*O+%V*",
			replace: "oo",
			description: ""
		},
		{
			id: "11",
			search: "%V*U+%V*",
			replace: "ou",
			description: ""
		},
		{
			id: "12",
			search: "%V*I+%V*",
			replace: "oi",
			description: ""
		},
		{
			id: "13",
			search: "%V*A+%V*",
			replace: "au",
			description: ""
		},
		{
			id: "13.1",
			search: "%V*E+%V*",
			replace: "ei",
			description: ""
		},
		{
			id: "13.2",
			search: "([^c])ei",
			replace: "$1ie",
			description: "i before e except after c"
		},
		{
			id: "14",
			search: "([^aeiou])(o|au)\\b",
			replace: "$1ow",
			description: "change word-final o or au to ow"
		},
		{
			id: "14.1",
			search: "([^aeiou])(ou|ei)\\b",
			replace: "$1$2gh",
			description: "change word-final ou to ough, ei to eigh"
		},
		{
			id: "16",
			search: "y+",
			replace: "y",
			description: "eliminate duplicate ys"
		},
		{
			id: "17",
			search: "(\\b|[^aeiou])tl",
			replace: "$1t",
			description: "reduce tl cluster to t after non-vowel"
		},
		{
			id: "17.1",
			search: "tl(\\b|%C)",
			replace: "t$1",
			description: "reduce tl cluster to t before consonant or word-end"
		},
		{
			id: "18",
			search: "(.)\\1{2,}",
			replace: "$1$1",
			description: "reduce triple-letter clusters to two"
		},
		{
			id: "18.1",
			search: "[aeiou]*([aeiou])[aeiou]*\\1[aeiou]*",
			replace: "$1$1",
			description: "reduce multiple vowels in a row, where any two vowels match, to the matching vowels"
		},
		{
			id: "3",
			search: "q+",
			replace: "qu",
			description: "q is always followed by u"
		},
		{
			id: "4",
			search: "qu\\b",
			replace: "que",
			description: "qu at word-end becomes que"
		},
		{
			id: "4.1",
			search: "qu([aeiou])[aeiou]+",
			replace: "qu$1",
			description: "eliminate triple+ vowels after q"
		},
		{
			id: "19",
			search: "c\\b",
			replace: "ck",
			description: "word-final c becomes ck"
		},
		{
			id: "20",
			search: "([aiu])\\1",
			replace: "$1",
			description: "change double a/i/u to single"
		},
		{
			id: "21",
			search: "m[kt]\\b",
			replace: "mp",
			description: "word-final mk or mt becomes mp"
		},
		{
			id: "21.1",
			search: "n[kp]\\b",
			replace: "nt",
			description: "word-final nk or np becomes nt"
		},
		{
			id: "21.2",
			search: "ng[kt]",
			replace: "nk",
			description: "ngk and ngt become nk"
		}
	]
};
initialAppState.we = {
	...initialAppState.we,
	input: "what\ndo\nyou\nknow\npot\nnot\nkeep\nduk\nguttter\nknowhow\nneuter",
	characterGroups: [
		{
			label: "C",
			description: "Consonants",
			run: "tnsrdlmqwfgypbcvhkjxqzNW"
		},
		{
			label: "V",
			description: "Vowels",
			run: "eaoiuOiU"
		}
	],
	transforms: [
		{
			id: "1",
			search: "kn",
			replace: "N",
			direction: "both"
		},
		{
			id: "3",
			search: "ow",
			replace: "O",
			direction: "both"
		},
		{
			id: "4",
			search: "ou",
			replace: "U",
			direction: "both"
		}
	],
	soundChanges: [
		{
			id: "s1",
			beginning: "([ptk])",
			ending: "$1$1",
			context: "[aeiou]+_#",
			//exception: "",
			//description: ""
		},
		{
			id: "s2",
			beginning: "w*h",
			ending: "w",
			context: "_",
			exception: "_#",
			description: "h to w but not at end of word"
		},
		{
			id: "s3",
			beginning: "t{1}(?!t)",
			ending: "tt",
			context: "._.",
			exception: "t_",
			description: "double ts not at ends of words"
		},
		{
			id: "s4",
			beginning: "w*h",
			ending: "w",
			context: "_",
			exception: "_#",
			description: "h to w but not at end of word"
		},
		{
			id: "s5",
			beginning: "t{1}(?!t)",
			ending: "tt",
			context: "._.",
			exception: "t_",
			description: "double ts not at ends of words"
		},
		{
			id: "s6",
			beginning: "w*h",
			ending: "w",
			context: "_",
			exception: "_#",
			description: "h to w but not at end of word"
		},
		{
			id: "s7",
			beginning: "t{1}(?!t)",
			ending: "tt",
			context: "._.",
			exception: "t_",
			description: "double ts not at ends of words"
		},
		{
			id: "s8",
			beginning: "w*h",
			ending: "w",
			context: "_",
			exception: "_#",
			description: "h to w but not at end of word"
		},
		{
			id: "s9",
			beginning: "t{1}(?!t)",
			ending: "tt",
			context: "._.",
			exception: "t_",
			description: "double ts not at ends of words"
		},
		{
			id: "s10",
			beginning: "w*h",
			ending: "w",
			context: "_",
			exception: "_#",
			description: "h to w but not at end of word"
		},
		{
			id: "s11",
			beginning: "t{1}(?!t)",
			ending: "tt",
			context: "._.",
			exception: "t_",
			description: "double ts not at ends of words"
		},
		{
			id: "s12",
			beginning: "w*h",
			ending: "w",
			context: "_",
			exception: "_#",
			description: "h to w but not at end of word"
		},
		{
			id: "s13",
			beginning: "t{1}(?!t)",
			ending: "tt",
			context: "._.",
			exception: "t_",
			description: "double ts not at ends of words"
		},
		{
			id: "s14",
			beginning: "w*h",
			ending: "w",
			context: "_",
			exception: "_#",
			description: "h to w but not at end of word"
		},
		{
			id: "s15",
			beginning: "t{1}(?!t)",
			ending: "tt",
			context: "._.",
			exception: "t_",
			description: "double ts not at ends of words"
		},
		{
			id: "s16",
			beginning: "w*h",
			ending: "w",
			context: "_",
			exception: "_#",
			description: "h to w but not at end of word"
		},
		{
			id: "s17",
			beginning: "t{1}(?!t)",
			ending: "tt",
			context: "._.",
			exception: "t_",
			description: "double ts not at ends of words"
		},
		{
			id: "s18",
			beginning: "w*h",
			ending: "w",
			context: "_",
			exception: "_#",
			description: "h to w but not at end of word"
		},
		{
			id: "s19",
			beginning: "t{1}(?!t)",
			ending: "tt",
			context: "._.",
			exception: "t_",
			description: "double ts not at ends of words"
		},
		{
			id: "s20",
			beginning: "w*h",
			ending: "w",
			context: "_",
			exception: "_#",
			description: "h to w but not at end of word"
		},
		{
			id: "s21",
			beginning: "t{1}(?!t)",
			ending: "tt",
			context: "._.",
			exception: "t_",
			description: "double ts not at ends of words"
		},
		{
			id: "s22",
			beginning: "w*h",
			ending: "w",
			context: "_",
			exception: "_#",
			description: "h to w but not at end of word"
		},
		{
			id: "s23",
			beginning: "oot{1}(?!t)",
			ending: "oott",
			context: "._.",
			exception: "t_",
			description: "LAST ONE"
		}
	]
};
initialAppState.lexicon = {
	...initialAppState.lexicon,
	description: "Hi, this is a description.",
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
	lexicon: [
		{
			id: "0",
			columns: [
				"fleeb",
				"n",
				"a thing you know and love"
			]
		},
		{
			id: "1",
			columns: [
				"boof",
				"v",
				"vocalize in a dog way"
			]
		},
		{
			id: "2",
			columns: [
				"akorn",
				"adj",
				"damp and musty"
			]
		},
		{
			id: "10",
			columns: [
				"marr",
				"n",
				"a movie featuring a black dog and a brown cat"
			]
		},
		{
			id: "11",
			columns: [
				"treff",
				"v",
				"mispronounce words on purpose"
			]
		},
		{
			id: "12",
			columns: [
				"plo",
				"adj",
				"scary but heartwarming"
			]
		},
		{
			id: "20",
			columns: [
				"quog",
				"n",
				"a tower of cans"
			]
		},
		{
			id: "21",
			columns: [
				"ickthioraptorimino",
				"v",
				"imitating a potato"
			]
		},
		{
			id: "22",
			columns: [
				"rhyk",
				"adj",
				"juvenile and intelligent"
			]
		},
		{
			id: "30",
			columns: [
				"ulululu",
				"n",
				"a doorbell that doesn't work"
			]
		},
		{
			id: "31",
			columns: [
				"dru",
				"v",
				"mixing with broth"
			]
		},
		{
			id: "32",
			columns: [
				"fargu",
				"adj",
				"toothy"
			]
		},
		{
			id: "40",
			columns: [
				"tirg",
				"n",
				"a staircase to nowhere"
			]
		},
		{
			id: "41",
			columns: [
				"mimm",
				"v",
				"charming a snake or other reptile"
			]
		},
		{
			id: "42",
			columns: [
				"bilo",
				"adj",
				"dead for at least twenty years"
			]
		},
	]
};
*/
// ----- END
//
//

const getStoreInfo = () => {
	const reducerConfig = {
		// SLICES here
//		appState: appStateSlice,
//		we: weSlice,
//		wg: wgSlice,
		ms: msSlice,
		concepts: conceptsSlice,
		lexicon: lexiconSlice,
//		extraCharacters: extraCharactersSlice,
//		history: historySlice
	};
	const reducer = combineReducers(reducerConfig);
	const store = configureStore({
		reducer: reducer,
		preloadedState: initialAppState
	});
	return store;
};

export default getStoreInfo;
