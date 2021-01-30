import { PresetObject } from './ReduxDucks';

const Presets: PresetObject = new Map([
	["Simple", {
		categories: {
			map: new Map([
				["C", {
					title: "Consonants",
					run: "tpknlrsmʎbdgñfh"
				}],
				["V", {
					title: "Vowels",
					run: "aieuoāīūēō"
				}],
				["N", {
					title: "Nasals",
					run: "nŋ"
				}]
			]),
			editing: null
		},
		syllables: {
			toggle: false,
			objects: {
				singleWord: { components: ["CV","V","CVN"] },
				wordInitial: { components: [] },
				wordMiddle: { components: [] },
				wordFinal: { components: [] }
			}
		},
		rewriteRules: {
			list: [
				{
					key: "0",
					seek: "aa",
					replace: "ā",
					description: "",
					regex: /aa/g
				},
				{
					key: "1",
					seek: "ii",
					replace: "ī",
					description: "",
					regex: /ii/g
				},
				{
					key: "2",
					seek: "uu",
					replace: "ū",
					description: "",
					regex: /uu/g
				},
				{
					key: "3",
					seek: "ee",
					replace: "ē",
					description: "",
					regex: /ee/g
				},
				{
					key: "4",
					seek: "oo",
					replace: "ō",
					description: "",
					regex: /oo/g
				},
				{
					key: "5",
					seek: "nb",
					replace: "mb",
					description: "",
					regex: /nb/g
				},
				{
					key: "6",
					seek: "np",
					replace: "mp",
					description: "",
					regex: /np/g
				}
			],
			editing: null
		},
		wordgenSettings: {
			monosyllablesRate: 20,
			maxSyllablesPerWord: 6,
			categoryRunDropoff: 30,
			syllableBoxDropoff: 25,
			capitalizeSentences: true,
			declarativeSentencePre: "",
			declarativeSentencePost: ".",
			interrogativeSentencePre: "",
			interrogativeSentencePost: "?",
			exclamatorySentencePre: "",
			exclamatorySentencePost: "!"
		}
	}],
	["Latinate", {
		categories: {
			map: new Map([
				["C", {
					title: "Consonants",
					run: "tkpnslrmfbdghvyh"
				}],
				["V", {
					title: "Vowels 1",
					run: "aiueo"
				}],
				["U", {
					title: "Vowels 2",
					run: "aiuàê"
				}],
				["P", {
					title: "Pre-liquid consonants",
					run: "ptkbdg"
				}],
				["L", {
					title: "Liquids",
					run: "rl"
				}],
				["F", {
					title: "Syllable-final consonants",
					run: "nsrmltc"
				}]
			]),
			editing: null
		},
		syllables: {
			toggle: false,
			objects: {
				singleWord: { components: ["CV","CUF","V","UF","PLV","PLUF"] },
				wordInitial: { components: [] },
				wordMiddle: { components: [] },
				wordFinal: { components: [] }
			}
		},
		rewriteRules: {
			list: [
				{
					key: "0",
					seek: "ka",
					replace: "ca",
					description: "",
					regex: /ka/g
				},
				{
					key: "1",
					seek: "nko",
					replace: "co",
					description: "",
					regex: /nko/g
				},
				{
					key: "2",
					seek: "nku",
					replace: "cu",
					description: "",
					regex: /nku/g
				},
				{
					key: "3",
					seek: "nkr",
					replace: "cr",
					description: "",
					regex: /nkr/g
				}
			],
			editing: null
		},
		wordgenSettings: {
			monosyllablesRate: 20,
			maxSyllablesPerWord: 6,
			categoryRunDropoff: 30,
			syllableBoxDropoff: 25,
			capitalizeSentences: true,
			declarativeSentencePre: "",
			declarativeSentencePost: ".",
			interrogativeSentencePre: "",
			interrogativeSentencePost: "?",
			exclamatorySentencePre: "",
			exclamatorySentencePost: "!"
		}
	}],
	["Chinese", {
		categories: {
			map: new Map([
				["C", {
					title: "Consonants",
					run: "ptknlsmšywčhfŋ"
				}],
				["V", {
					title: "Vowels",
					run: "auieo"
				}],
				["F", {
					title: "Syllable-Final Consonants",
					run: "nnŋmktp"
				}],
				["D", {
					title: "Dipthongs",
					run: "io"
				}],
				["A", {
					title: "Aspirated Consonants",
					run: "ptkč"
				}]
			]),
			editing: null
		},
		syllables: {
			toggle: false,
			objects: {
				singleWord: { components: ["CV","AʰV","CVD","CVF","VF","V","AʰVF"] },
				wordInitial: { components: [] },
				wordMiddle: { components: [] },
				wordFinal: { components: [] }
			}
		},
		rewriteRules: {
			list: [
				{
					key: "0",
					seek: "uu",
					replace: "wo",
					description: "",
					regex: /uu/g
				},
				{
					key: "1",
					seek: "oo",
					replace: "ou",
					description: "",
					regex: /oo/g
				},
				{
					key: "2",
					seek: "ii",
					replace: "iu",
					description: "",
					regex: /ii/g
				},
				{
					key: "3",
					seek: "aa",
					replace: "ia",
					description: "",
					regex: /aa/g
				},
				{
					key: "4",
					seek: "ee",
					replace: "ie",
					description: "",
					regex: /ee/g
				}
			],
			editing: null
		},
		wordgenSettings: {
			monosyllablesRate: 20,
			maxSyllablesPerWord: 6,
			categoryRunDropoff: 30,
			syllableBoxDropoff: 25,
			capitalizeSentences: true,
			declarativeSentencePre: "",
			declarativeSentencePost: ".",
			interrogativeSentencePre: "",
			interrogativeSentencePost: "?",
			exclamatorySentencePre: "",
			exclamatorySentencePost: "!"
		}
	}],
	["Large Inventory", {
		categories: {
			map: new Map([
				["C", {
					title: "Consonants",
					run: "ptknslrmbdgfvwyhšzñxčžŊ"
				}],
				["V", {
					title: "Vowels",
					run: "aiuoeɛɔâôüö"
				}],
				["L", {
					title: "Liquids",
					run: "rly"
				}]
			]),
			editing: null
		},
		syllables: {
			toggle: false,
			objects: {
				singleWord: { components: ["CV","V","CVC","CLV"] },
				wordInitial: { components: [] },
				wordMiddle: { components: [] },
				wordFinal: { components: [] }
			}
		},
		rewriteRules: {
			list: [
				{
					key: "0",
					seek: "â",
					replace: "ai",
					description: "",
					regex: /â/g
				},
				{
					key: "1",
					seek: "ô",
					replace: "au",
					description: "",
					regex: /ô/g
				}
			],
			editing: null
		},
		wordgenSettings: {
			monosyllablesRate: 20,
			maxSyllablesPerWord: 6,
			categoryRunDropoff: 30,
			syllableBoxDropoff: 25,
			capitalizeSentences: true,
			declarativeSentencePre: "",
			declarativeSentencePost: ".",
			interrogativeSentencePre: "",
			interrogativeSentencePost: "?",
			exclamatorySentencePre: "",
			exclamatorySentencePost: "!"
		}
	}],
	["Complex", {
		categories: {
			map: new Map([
				["C", {
					title: "Consonants",
					run: "kstSplrLnstmTNfh"
				}],
				["S", {
					title: "Initial consonants",
					run: "tspkThfS"
				}],
				["V", {
					title: "Vowels",
					run: "aoiueAOUE"
				}],
				["I", {
					title: "Mid-word vowels",
					run: "aoueAOUE"
				}],
				["E", {
					title: "Word-ending consonants",
					run: "sfSnmNktpTh"
				}]
			]),
			editing: null
		},
		syllables: {
			toggle: true,
			objects: {
				singleWord: { components: ["SV","SVE","SV","SV"] },
				wordInitial: { components: ["SV","V","SVC"] },
				wordMiddle: { components: ["SV","I","CV","SVC"] },
				wordFinal: { components: ["I","VE","V","VE","SVE","V","CV","VE","CVE"] }
			}
		},
		rewriteRules: {
			list: [
				{
					key: "0",
					seek: "([aeiou])\\1{2,}",
					replace: "$1$1",
					description: "change triple-vowels to double vowels",
					regex: /([aeiou])\1{2,}/g
				},
				{
					key: "1",
					seek: "([AEOU])\\1+",
					replace: "$1",
					description: "change double-dipthongs to single",
					regex: /([AEOU])\1+/g
				},
				{
					key: "2",
					seek: "(%V{2})%V+",
					replace: "$1",
					description: "eliminate third vowel in a row",
					regex: /(%V{2})%V+/g
				},
				{
					key: "3",
					seek: "h+",
					replace: "h",
					description: "reduce multiple h to single",
					regex: /h+/g
				},
				{
					key: "4",
					seek: "h(?=%V(%E|%C{0,2}%V)\\b)",
					replace: "H",
					description: "save h before accented syllable",
					regex: /h(?=%V(%E|%C{0,2}%V)\b)/g
				},
				{
					key: "5",
					seek: "(%V)h(?=%V\\b)",
					replace: "$1H",
					description: "save h before accented syllable",
					regex: /(%V)h(?=%V\b)/g
				},
				{
					key: "6",
					seek: "\\bh",
					replace: "H",
					description: "save word-initial h",
					regex: /\bh/g
				},
				{
					key: "7",
					seek: "h\\b",
					replace: "H",
					description: "save word-final h",
					regex: /h\b/g
				},
				{
					key: "8",
					seek: "h",
					replace: "",
					description: "eliminate all other h",
					regex: /h/g
				},
				{
					key: "9",
					seek: "H",
					replace: "h",
					description: "restore saved h",
					regex: /H/g
				},
				{
					key: "10",
					seek: "A",
					replace: "aĭ",
					description: "dipthong",
					regex: /A/g
				},
				{
					key: "11",
					seek: "O",
					replace: "oĭ",
					description: "dipthong",
					regex: /O/g
				},
				{
					key: "12",
					seek: "U",
					replace: "uĭ",
					description: "dipthong",
					regex: /U/g
				},
				{
					key: "13",
					seek: "E",
					replace: "eĭ",
					description: "dipthong",
					regex: /E/g
				},
				{
					key: "14",
					seek: "ĭi",
					replace: "i",
					description: "eliminate dipthong before i",
					regex: /ĭi/g
				},
				{
					key: "15",
					seek: "ĭT",
					replace: "ĭt",
					description: "de-retroflex t after a dipthong",
					regex: /ĭT/g
				},
				{
					key: "16",
					seek: "ĭS",
					replace: "ĭs",
					description: "de-retroflex s after a dipthong",
					regex: /ĭS/g
				},
				{
					key: "17",
					seek: "ĭL",
					replace: "ĭl",
					description: "de-retroflex l after a dipthong",
					regex: /ĭL/g
				},
				{
					key: "18",
					seek: "ĭN",
					replace: "ĭn",
					description: "de-retroflex n after a dipthong",
					regex: /ĭN/g
				},
				{
					key: "19",
					seek: "(.\\B[aeou])i",
					replace: "$1ĭ",
					description: "change certain non-word-initial vowel-i pairs to dipthongs",
					regex: /(.\B[aeou])i/g
				},
				{
					key: "20",
					seek: "(%C)\\1",
					replace: "$1",
					description: "reduce double consonants to one",
					regex: /(%C)\1/g
				},
				{
					key: "21",
					seek: "[tkpT]r",
					replace: "r",
					description: "remove plosive before an r",
					regex: /[tkpT]r/g
				},
				{
					key: "22",
					seek: "n[pTk]",
					replace: "nt",
					description: "change n-plosive to nt",
					regex: /n[pTk]/g
				},
				{
					key: "23",
					seek: "m[tTk]",
					replace: "mp",
					description: "change m-plosive to mp",
					regex: /m[tTk]/g
				},
				{
					key: "24",
					seek: "N[ptk]",
					replace: "NT",
					description: "retroflex plosive after retroflex n",
					regex: /N[ptk]/g
				},
				{
					key: "25",
					seek: "k[nmN]",
					replace: "k",
					description: "remove nasal after k",
					regex: /k[nmN]/g
				},
				{
					key: "26",
					seek: "p[nN]",
					replace: "pm",
					description: "change p-nasal to pm",
					regex: /p[nN]/g
				},
				{
					key: "27",
					seek: "t[mN]",
					replace: "tn",
					description: "change t-nasal to tn",
					regex: /t[mN]/g
				},
				{
					key: "28",
					seek: "T[nm]",
					replace: "TN",
					description: "make post-retroflex t nasal retroflex n",
					regex: /T[nm]/g
				},
				{
					key: "29",
					seek: "p[sSh]",
					replace: "pf",
					description: "change p-fricative to pf",
					regex: /p[sSh]/g
				},
				{
					key: "30",
					seek: "t[fSh]",
					replace: "ts",
					description: "change t-fricative to ts",
					regex: /t[fSh]/g
				},
				{
					key: "31",
					seek: "T[fsh]",
					replace: "TS",
					description: "change post-retroflex t fricative to retroflex s",
					regex: /T[fsh]/g
				},
				{
					key: "32",
					seek: "k[fsS]",
					replace: "kh",
					description: "change k-fricative to kh",
					regex: /k[fsS]/g
				},
				{
					key: "33",
					seek: "f[sSh]",
					replace: "fp",
					description: "change f-fricative to fp",
					regex: /f[sSh]/g
				},
				{
					key: "34",
					seek: "s[fSh]",
					replace: "st",
					description: "change s-fricative to st",
					regex: /s[fSh]/g
				},
				{
					key: "35",
					seek: "S[fsh]",
					replace: "ST",
					description: "change post-retroflex s fricative to retroflex t",
					regex: /S[fsh]/g
				},
				{
					key: "36",
					seek: "h[fsS]",
					replace: "hk",
					description: "change h-fricative to hk",
					regex: /h[fsS]/g
				},
				{
					key: "37",
					seek: "ft",
					replace: "fp",
					description: "change ft to fp",
					regex: /ft/g
				},
				{
					key: "38",
					seek: "sT",
					replace: "st",
					description: "de-retroflex t after s",
					regex: /sT/g
				},
				{
					key: "39",
					seek: "St",
					replace: "ST",
					description: "make t after retroflex s into retroflex t",
					regex: /St/g
				},
				{
					key: "40",
					seek: "([TSLN])[tsln]",
					replace: "$1",
					description: "eliminate non-retroflex consonant after retroflex consonants",
					regex: /([TSLN])[tsln]/g
				},
				{
					key: "41",
					seek: "([tsln])[TSLN]",
					replace: "$1",
					description: "eliminate retroflex consonant after non-retroflex consonant",
					regex: /([tsln])[TSLN]/g
				},
				{
					key: "42",
					seek: "NT",
					replace: "nT",
					description: "de-retroflex n before retroflex t",
					regex: /NT/g
				},
				{
					key: "43",
					seek: "TN",
					replace: "tN",
					description: "de-retroflex t before retroflex n",
					regex: /TN/g
				},
				{
					key: "44",
					seek: "ST",
					replace: "sT",
					description: "de-retroflex s before retroflex t",
					regex: /ST/g
				},
				{
					key: "45",
					seek: "TS",
					replace: "tS",
					description: "de-retroflex t before retroflex s",
					regex: /TS/g
				},
				{
					key: "46",
					seek: "T",
					replace: "t́",
					description: "mark retroflex t with accent",
					regex: /T/g
				},
				{
					key: "47",
					seek: "L",
					replace: "ĺ",
					description: "mark retroflex l with accent",
					regex: /L/g
				},
				{
					key: "48",
					seek: "S",
					replace: "ś",
					description: "mark retroflex s with accent",
					regex: /S/g
				},
				{
					key: "49",
					seek: "N",
					replace: "ń",
					description: "mark retroflex n with accent",
					regex: /N/g
				}
			],
			editing: null
		},
		wordgenSettings: {
			monosyllablesRate: 12,
			maxSyllablesPerWord: 8,
			categoryRunDropoff: 30,
			syllableBoxDropoff: 25,
			capitalizeSentences: true,
			declarativeSentencePre: "",
			declarativeSentencePost: ".",
			interrogativeSentencePre: "¿",
			interrogativeSentencePost: "?",
			exclamatorySentencePre: "¡",
			exclamatorySentencePost: "!"
		}
	}]
]);

export default Presets;
