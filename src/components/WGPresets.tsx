import { WGPresetObject, WGSettingsObject } from './ReduxDucksTypes';

const basicSettings: WGSettingsObject = {
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
};

const WGPresets: WGPresetObject = new Map([
	["Simple", {
		wordgenCategories: {
			map: [
				["C", {
					title: "Consonants",
					run: "ptkbdg"
				}],
				["V", {
					title: "Vowels",
					run: "ieaou"
				}],
				["L", {
					title: "Liquids",
					run: "rl"
				}]
			],
			editing: null
		},
		wordgenSyllables: {
			toggle: false,
			objects: {
				singleWord: { components: ["CV","V","CLV"] },
				wordInitial: { components: [] },
				wordMiddle: { components: [] },
				wordFinal: { components: [] }
			}
		},
		wordgenRewriteRules: {
			list: [
				{
					key: "0",
					seek: "ki",
					replace: "ci",
					description: ""

				},
				{
					key: "1",
					seek: "(.)\\1+",
					replace: "$1$1",
					description: ""
				}
			],
			editing: null
		},
		wordgenSettings: {...basicSettings}
	}],
	["Medium", {
		wordgenCategories: {
			map: [
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
			],
			editing: null
		},
		wordgenSyllables: {
			toggle: false,
			objects: {
				singleWord: { components: ["CV","V","CVN"] },
				wordInitial: { components: [] },
				wordMiddle: { components: [] },
				wordFinal: { components: [] }
			}
		},
		wordgenRewriteRules: {
			list: [
				{
					key: "0",
					seek: "aa",
					replace: "ā",
					description: ""
				},
				{
					key: "1",
					seek: "ii",
					replace: "ī",
					description: ""
				},
				{
					key: "2",
					seek: "uu",
					replace: "ū",
					description: ""
				},
				{
					key: "3",
					seek: "ee",
					replace: "ē",
					description: ""
				},
				{
					key: "4",
					seek: "oo",
					replace: "ō",
					description: ""
				},
				{
					key: "5",
					seek: "nb",
					replace: "mb",
					description: ""
				},
				{
					key: "6",
					seek: "np",
					replace: "mp",
					description: ""
				}
			],
			editing: null
		},
		wordgenSettings: {...basicSettings}
	}],
	["Pseudo-Latin", {
		wordgenCategories: {
			map: [
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
			],
			editing: null
		},
		wordgenSyllables: {
			toggle: false,
			objects: {
				singleWord: { components: ["CV","CUF","V","UF","PLV","PLUF"] },
				wordInitial: { components: [] },
				wordMiddle: { components: [] },
				wordFinal: { components: [] }
			}
		},
		wordgenRewriteRules: {
			list: [
				{
					key: "0",
					seek: "ka",
					replace: "ca",
					description: ""
				},
				{
					key: "1",
					seek: "nko",
					replace: "co",
					description: ""
				},
				{
					key: "2",
					seek: "nku",
					replace: "cu",
					description: ""
				},
				{
					key: "3",
					seek: "nkr",
					replace: "cr",
					description: ""
				}
			],
			editing: null
		},
		wordgenSettings: {...basicSettings}
	}],
	["Pseudo-Chinese", {
		wordgenCategories: {
			map: [
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
			],
			editing: null
		},
		wordgenSyllables: {
			toggle: false,
			objects: {
				singleWord: { components: ["CV","AʰV","CVD","CVF","VF","V","AʰVF"] },
				wordInitial: { components: [] },
				wordMiddle: { components: [] },
				wordFinal: { components: [] }
			}
		},
		wordgenRewriteRules: {
			list: [
				{
					key: "0",
					seek: "uu",
					replace: "wo",
					description: ""
				},
				{
					key: "1",
					seek: "oo",
					replace: "ou",
					description: ""
				},
				{
					key: "2",
					seek: "ii",
					replace: "iu",
					description: ""
				},
				{
					key: "3",
					seek: "aa",
					replace: "ia",
					description: ""
				},
				{
					key: "4",
					seek: "ee",
					replace: "ie",
					description: ""
				}
			],
			editing: null
		},
		wordgenSettings: {...basicSettings}
	}],
	["Pseudo-Greek", {
		wordgenCategories: {
			map: [
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
			],
			editing: null
		},
		wordgenSyllables: {
			toggle: false,
			objects: {
				singleWord: { components: ["CV","V","CVC","CLV"] },
				wordInitial: { components: [] },
				wordMiddle: { components: [] },
				wordFinal: { components: [] }
			}
		},
		wordgenRewriteRules: {
			list: [
				{
					key: "0",
					seek: "â",
					replace: "ai",
					description: ""
				},
				{
					key: "1",
					seek: "ô",
					replace: "au",
					description: ""
				}
			],
			editing: null
		},
		wordgenSettings: {...basicSettings}
	}],
	["Pseudo-English", {
		wordgenCategories: {
			map: [
				["C", {
					title: "Consonants",
					run: "tnsrdlSmTqwfgWypbCcvhPBkjxqz"
				}],
				["V", {
					title: "Vowels",
					run: "eaoeaoiuOIiEAUuy"
				}],
				["P", {
					title: "Plosives",
					run: "tpkc"
				}],
				["L", {
					title: "Liquids",
					run: "rl"
				}],
				["N", {
					title: "Nasals",
					run: "nmN"
				}],
				["F", {
					title: "Post-nasal or -liquid Final Consonants",
					run: "TS"
				}]
			],
			editing: null
		},
		wordgenSyllables: {
			toggle: true,
			objects: {
				singleWord: { components: ["CV","CVC","VC","V","PLVC","PLV"] },
				wordInitial: { components: ["CVC","CV","VC","PLV","sPLV","V"] },
				wordMiddle: { components: ["CV","CV","CV","VC","V"] },
				wordFinal: { components: ["CV","CVC","CVLF","CVNF","CVgh","VC","V","Vgh"] }
			}
		},
		wordgenRewriteRules: {
			list: [
				{
					key: "15",
					seek: "([^g])h",
					replace: "$1k",
					description: "change non-initial h to k if not preceeded by a g"
				},
				{
					key: "0",
					seek: "s*T+s*",
					replace: "th",
					description: ""
				},
				{
					key: "1",
					seek: "s*S+s*",
					replace: "sh",
					description: ""
				},
				{
					key: "2",
					seek: "C+",
					replace: "ch",
					description: ""
				},
				{
					key: "5",
					seek: "[nm]*N+[nm]*",
					replace: "ng",
					description: ""
				},
				{
					key: "6",
					seek: "w*W+(%V)",
					replace: "wh$1",
					description: "W-vowel becomes wh-vowel"
				},
				{
					key: "6.1",
					seek: "[wW]+",
					replace: "w",
					description: "remaining Ws become w"
				},
				{
					key: "7",
					seek: "(%V)ch",
					replace: "$1tch",
					description: "vowel-ch becomes vowel-tch"
				},
				{
					key: "8",
					seek: "P+",
					replace: "ph",
					description: ""
				},
				{
					key: "9",
					seek: "(%V)B(\\b|!%V)",
					replace: "$1ble$2",
					description: "vowel-ble-nonvowel"
				},
				{
					key: "9.1",
					seek: "(%V)B",
					replace: "$1bl",
					description: "vowel-bl"
				},
				{
					key: "9.2",
					seek: "B",
					replace: "",
					description: "eliminate remaining Bs"
				},
				{
					key: "10",
					seek: "%V*O+%V*",
					replace: "oo",
					description: ""
				},
				{
					key: "11",
					seek: "%V*U+%V*",
					replace: "ou",
					description: ""
				},
				{
					key: "12",
					seek: "%V*I+%V*",
					replace: "oi",
					description: ""
				},
				{
					key: "13",
					seek: "%V*A+%V*",
					replace: "au",
					description: ""
				},
				{
					key: "13.1",
					seek: "%V*E+%V*",
					replace: "ei",
					description: ""
				},
				{
					key: "13.2",
					seek: "([^c])ei",
					replace: "$1ie",
					description: "i before e except after c"
				},
				{
					key: "14",
					seek: "([^aeiou])(o|au)\\b",
					replace: "$1ow",
					description: "change word-final o or au to ow"
				},
				{
					key: "14.1",
					seek: "([^aeiou])(ou|ei)\\b",
					replace: "$1$2gh",
					description: "change word-final ou to ough, ei to eigh"
				},
				{
					key: "16",
					seek: "y+",
					replace: "y",
					description: "eliminate duplicate ys"
				},
				{
					key: "17",
					seek: "(\\b|[^aeiou])tl",
					replace: "$1t",
					description: "reduce tl cluster to t after non-vowel"
				},
				{
					key: "17.1",
					seek: "tl(\\b|%C)",
					replace: "t$1",
					description: "reduce tl cluster to t before consonant or word-end"
				},
				{
					key: "18",
					seek: "(.)\\1{2,}",
					replace: "$1$1",
					description: "reduce triple-letter clusters to two"
				},
				{
					key: "18.1",
					seek: "[aeiou]*([aeiou])[aeiou]*\\1[aeiou]*",
					replace: "$1$1",
					description: "reduce multiple vowels in a row, where any two vowels match, to the matching vowels"
				},
				{
					key: "3",
					seek: "q+",
					replace: "qu",
					description: "q is always followed by u"
				},
				{
					key: "4",
					seek: "qu\\b",
					replace: "que",
					description: "qu at word-end becomes que"
				},
				{
					key: "4.1",
					seek: "qu([aeiou])[aeiou]+",
					replace: "qu$1",
					description: "eliminate triple+ vowels after q"
				},
				{
					key: "19",
					seek: "c\\b",
					replace: "ck",
					description: "word-final c becomes ck"
				},
				{
					key: "20",
					seek: "([aiu])\\1",
					replace: "$1",
					description: "change double a/i/u to single"
				},
				{
					key: "21",
					seek: "m[kt]\\b",
					replace: "mp",
					description: "word-final mk or mt becomes mp"
				},
				{
					key: "21.1",
					seek: "n[kp]\\b",
					replace: "nt",
					description: "word-final nk or np becomes nt"
				},
				{
					key: "21.2",
					seek: "ng[kt]",
					replace: "nk",
					description: "ngk and ngt become nk"
				}
			],
			editing: null
		},
		wordgenSettings: {
			...basicSettings,
			maxSyllablesPerWord: 5
		}
	}],
	["Complex", {
		wordgenCategories: {
			map: [
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
				}],
				["J", {
					title: "Word-final conjugation",
					run: "1234567890!@#-&=_;:~",
					dropoffOverride: 0
				}]
			],
			editing: null
		},
		wordgenSyllables: {
			toggle: true,
			objects: {
				singleWord: { components: ["SV","SVEJ","SV","SV"] },
				wordInitial: { components: ["SV","V","SVC"] },
				wordMiddle: { components: ["SV","I","CV","SVC"] },
				wordFinal: { components: ["I","VEJ","V","VEJ","SVEJ","V","CV","VEJ","CVEJ"] }
			}
		},
		wordgenRewriteRules: {
			list: [
				{
					key: "0",
					seek: "([aeiou])\\1{2,}",
					replace: "$1$1",
					description: "change triple-vowels to double vowels"
				},
				{
					key: "1",
					seek: "([AEOU])\\1+",
					replace: "$1",
					description: "change double-dipthongs to single"
				},
				{
					key: "2",
					seek: "(%V{2})%V+",
					replace: "$1",
					description: "eliminate third vowel in a row"
				},
				{
					key: "3",
					seek: "h+",
					replace: "h",
					description: "reduce multiple h to single"
				},
				{
					key: "4",
					seek: "h(?=%V(%E|%C{0,2}%V)\\b)",
					replace: "H",
					description: "save h before stressed syllable"
				},
				{
					key: "5",
					seek: "(%V)h(?=%V\\b)",
					replace: "$1H",
					description: "save h before stressed syllable"
				},
				{
					key: "6",
					seek: "\\bh",
					replace: "H",
					description: "save word-initial h"
				},
				{
					key: "7",
					seek: "h\\b",
					replace: "H",
					description: "save word-final h"
				},
				{
					key: "8",
					seek: "h",
					replace: "",
					description: "eliminate all other h"
				},
				{
					key: "9",
					seek: "H",
					replace: "h",
					description: "restore saved h"
				},
				{
					key: "9.1",
					seek: "kh",
					replace: "k",
					description: "reduce kh to k"
				},
				{
					key: "10",
					seek: "A",
					replace: "aĭ",
					description: "dipthong"
				},
				{
					key: "11",
					seek: "O",
					replace: "oĭ",
					description: "dipthong"
				},
				{
					key: "12",
					seek: "U",
					replace: "uĭ",
					description: "dipthong"
				},
				{
					key: "13",
					seek: "E",
					replace: "eĭ",
					description: "dipthong"
				},
				{
					key: "14",
					seek: "ĭi",
					replace: "i",
					description: "eliminate dipthong before i"
				},
				{
					key: "15",
					seek: "ĭT",
					replace: "ĭt",
					description: "de-retroflex t after a dipthong"
				},
				{
					key: "16",
					seek: "ĭS",
					replace: "ĭs",
					description: "de-retroflex s after a dipthong"
				},
				{
					key: "17",
					seek: "ĭL",
					replace: "ĭl",
					description: "de-retroflex l after a dipthong"
				},
				{
					key: "18",
					seek: "ĭN",
					replace: "ĭn",
					description: "de-retroflex n after a dipthong"
				},
				{
					key: "19",
					seek: "(.\\B[aeou])i",
					replace: "$1ĭ",
					description: "change certain non-word-initial vowel-i pairs to dipthongs"
				},
				{
					key: "20",
					seek: "(%C)\\1",
					replace: "$1",
					description: "reduce double consonants to one"
				},
				{
					key: "21",
					seek: "[tkpT]r",
					replace: "r",
					description: "remove plosive before an r"
				},
				{
					key: "22",
					seek: "n[pTk]",
					replace: "nt",
					description: "change n-plosive to nt"
				},
				{
					key: "23",
					seek: "m[tTk]",
					replace: "mp",
					description: "change m-plosive to mp"
				},
				{
					key: "24",
					seek: "N[ptk]",
					replace: "NT",
					description: "retroflex plosive after retroflex n"
				},
				{
					key: "25",
					seek: "k[nmN]",
					replace: "k",
					description: "remove nasal after k"
				},
				{
					key: "26",
					seek: "p[nN]",
					replace: "pm",
					description: "change p-nasal to pm"
				},
				{
					key: "27",
					seek: "t[mN]",
					replace: "tn",
					description: "change t-nasal to tn"
				},
				{
					key: "28",
					seek: "T[nm]",
					replace: "TN",
					description: "make post-retroflex t nasal retroflex n"
				},
				{
					key: "29",
					seek: "p[sSh]",
					replace: "pf",
					description: "change p-fricative to pf"
				},
				{
					key: "30",
					seek: "t[fSh]",
					replace: "ts",
					description: "change t-fricative to ts"
				},
				{
					key: "31",
					seek: "T[fsh]",
					replace: "TS",
					description: "change post-retroflex t fricative to retroflex s"
				},
				{
					key: "32",
					seek: "k[fsS]",
					replace: "kh",
					description: "change k-fricative to kh"
				},
				{
					key: "33",
					seek: "f[sSh]",
					replace: "fp",
					description: "change f-fricative to fp"
				},
				{
					key: "34",
					seek: "s[fSh]",
					replace: "st",
					description: "change s-fricative to st"
				},
				{
					key: "35",
					seek: "S[fsh]",
					replace: "ST",
					description: "change post-retroflex s fricative to retroflex t"
				},
				{
					key: "36",
					seek: "h[fsS]",
					replace: "hk",
					description: "change h-fricative to hk"
				},
				{
					key: "37",
					seek: "ft",
					replace: "fp",
					description: "change ft to fp"
				},
				{
					key: "38",
					seek: "sT",
					replace: "st",
					description: "de-retroflex t after s"
				},
				{
					key: "39",
					seek: "St",
					replace: "ST",
					description: "make t after retroflex s into retroflex t"
				},
				{
					key: "40",
					seek: "([TSLN])[tsln]",
					replace: "$1",
					description: "eliminate non-retroflex consonant after retroflex consonants"
				},
				{
					key: "41",
					seek: "([tsln])[TSLN]",
					replace: "$1",
					description: "eliminate retroflex consonant after non-retroflex consonant"
				},
				{
					key: "42",
					seek: "NT",
					replace: "nT",
					description: "de-retroflex n before retroflex t"
				},
				{
					key: "43",
					seek: "TN",
					replace: "tN",
					description: "de-retroflex t before retroflex n"
				},
				{
					key: "44",
					seek: "ST",
					replace: "sT",
					description: "de-retroflex s before retroflex t"
				},
				{
					key: "45",
					seek: "TS",
					replace: "tS",
					description: "de-retroflex t before retroflex s"
				},
				{
					key: "50.1",
					seek: "1",
					replace: "e",
					description: "conjugation: 1s"
				},
				{
					key: "50.2.1",
					seek: "([mfpkh])2|([hk])3",
					replace: "$1$2a",
					description: "conjugation: 2s/3s.AN"
				},
				{
					key: "50.2.2",
					seek: "([nts])2|([mfp])3",
					replace: "$1$2i",
					description: "conjugation: 2s/3s.AN"
				},
				{
					key: "50.2.3",
					seek: "([NTS])2",
					replace: "$1u",
					description: "conjugation: 2s"
				},
				{
					key: "50.3",
					seek: "([nstNTS])3",
					replace: "$1o",
					description: "conjugation: 3s.AN"
				},
				{
					key: "50.4.1",
					seek: "([mfp])4",
					replace: "$1a$1e",
					description: "conjugation: 2s.FORM"
				},
				{
					key: "50.4.2",
					seek: "([nst])4",
					replace: "$1i$1eĭ",
					description: "conjugation: 2s.FORM"
				},
				{
					key: "50.4.3",
					seek: "([NTS])4",
					replace: "$1u$1eĭ",
					description: "conjugation: 2s.FORM"
				},
				{
					key: "50.4.4",
					seek: "([hk])4",
					replace: "$1ate",
					description: "conjugation: 2s.FORM"
				},
				{
					key: "50.5.1",
					seek: "([mfp])5",
					replace: "$1o$1o",
					description: "conjugation: 3s.INAN"
				},
				{
					key: "50.5.2",
					seek: "([nstNST])5",
					replace: "$1aa",
					description: "conjugation: 3s.INAN"
				},
				{
					key: "50.5.3",
					seek: "([hk])5",
					replace: "$1iki",
					description: "conjugation: 3s.INAN"
				},
				{
					key: "50.6.1",
					seek: "([mfp])6",
					replace: "$1eo",
					description: "conjugation: 1.DU.IN"
				},
				{
					key: "50.6.2",
					seek: "([nst])6",
					replace: "$1io",
					description: "conjugation: 1.DU.IN"
				},
				{
					key: "50.6.3",
					seek: "([NTS])6",
					replace: "$1ua",
					description: "conjugation: 1.DU.IN"
				},
				{
					key: "50.6.4",
					seek: "([hk])6",
					replace: "$1ee",
					description: "conjugation: 1.DU.IN"
				},
				{
					key: "50.7.1",
					seek: "([mfp])7",
					replace: "$1uo",
					description: "conjugation: 1.DU.EX"
				},
				{
					key: "50.7.2",
					seek: "([nstNST])7",
					replace: "$1u",
					description: "conjugation: 1.DU.EX"
				},
				{
					key: "50.7.3",
					seek: "([kh])7",
					replace: "$1eo",
					description: "conjugation: 1.DU.EX"
				},
				{
					key: "50.8.1",
					seek: "([mfp])8|([NST])0",
					replace: "$1$2eĭ",
					description: "conjugation: 1.PAU.IN/1p.IN"
				},
				{
					key: "50.8.2",
					seek: "([nst])8",
					replace: "$1u$1u",
					description: "conjugation: 1.PAU.IN"
				},
				{
					key: "50.8.3",
					seek: "([NTS])8",
					replace: "$1a$1a",
					description: "conjugation: 1.PAU.IN"
				},
				{
					key: "50.8.4",
					seek: "([hk])8|([nst])9|([mfp])0",
					replace: "$1$2$3aĭ",
					description: "conjugation: 1.PAU.IN/1.PAU.EX/1p.IN"
				},
				{
					key: "50.9.1",
					seek: "([mfp])9",
					replace: "$1ae",
					description: "conjugation: 1.PAU.EX"
				},
				{
					key: "50.9.2",
					seek: "([NTS])9|([nst])0",
					replace: "$1$2oĭ",
					description: "conjugation: 1.PAU.EX/1p.IN"
				},
				{
					key: "50.9.3",
					seek: "([hk])[9!]",
					replace: "$1oe",
					description: "conjugation: 1.PAU.EX/1p.EX"
				},
				{
					key: "50.10",
					seek: "([hk])0",
					replace: "$1uu",
					description: "conjugation: 1p.IN"
				},
				{
					key: "50.11.1",
					seek: "([fmp])!",
					replace: "$1ou",
					description: "conjugation: 1p.EX"
				},
				{
					key: "50.11.2",
					seek: "([nst])!",
					replace: "$1uaĭ",
					description: "conjugation: 1p.EX"
				},
				{
					key: "50.11.1",
					seek: "([NST])!",
					replace: "$1uoĭ",
					description: "conjugation: 1p.EX"
				},
				{
					key: "50.12.1",
					seek: "([fmphk])@",
					replace: "$1ara",
					description: "conjugation: 2.PAU"
				},
				{
					key: "50.12.2",
					seek: "([nst])@",
					replace: "$1aro",
					description: "conjugation: 2.PAU"
				},
				{
					key: "50.12.3",
					seek: "([NST])@",
					replace: "$1uro",
					description: "conjugation: 2.PAU"
				},
				{
					key: "50.13.1",
					seek: "([fmpnsthk])#",
					replace: "$1areĭ",
					description: "conjugation: 2.PAU.FORM"
				},
				{
					key: "50.13.2",
					seek: "([NST])#",
					replace: "$1ureĭ",
					description: "conjugation: 2.PAU.FORM"
				},
				{
					key: "50.14.1",
					seek: "([fmphk])-",
					replace: "$1ala",
					description: "conjugation: 2p"
				},
				{
					key: "50.14.2",
					seek: "([nst])-",
					replace: "$1alo",
					description: "conjugation: 2p"
				},
				{
					key: "50.14.3",
					seek: "([NST])-",
					replace: "$1uLo",
					description: "conjugation: 2p"
				},
				{
					key: "50.15.1",
					seek: "([fmpnsthk])&",
					replace: "$1aleĭ",
					description: "conjugation: 2p.FORM"
				},
				{
					key: "50.15.2",
					seek: "([NST])&",
					replace: "$1uleĭ",
					description: "conjugation: 2p.FORM"
				},
				{
					key: "50.16.1",
					seek: "([fmp])=",
					replace: "$1iro",
					description: "conjugation: 3.PAU.AN"
				},
				{
					key: "50.16.2",
					seek: "([nstNST])=",
					replace: "$1ore",
					description: "conjugation: 3.PAU.AN"
				},
				{
					key: "50.16.3",
					seek: "([hk])=",
					replace: "$1aro",
					description: "conjugation: 3.PAU.AN"
				},
				{
					key: "50.17.1",
					seek: "([mfp])_",
					replace: "$1ilo",
					description: "conjugation: 3p.AN"
				},
				{
					key: "50.17.2",
					seek: "([nst])_",
					replace: "$1ole",
					description: "conjugation: 3p.AN"
				},
				{
					key: "50.17.3",
					seek: "([NTS])_",
					replace: "$1oLe",
					description: "conjugation: 3p.AN"
				},
				{
					key: "50.17.4",
					seek: "([hk])_",
					replace: "$1alo",
					description: "conjugation: 3p.AN"
				},
				{
					key: "50.18.1",
					seek: "([mfp]);",
					replace: "$1oro",
					description: "conjugation: 3.PAU.INAN"
				},
				{
					key: "50.18.2",
					seek: "([nstNST]);",
					replace: "$1ara",
					description: "conjugation: 3.PAU.INAN"
				},
				{
					key: "50.18.3",
					seek: "([kh]);",
					replace: "$1iri",
					description: "conjugation: 3.PAU.INAN"
				},
				{
					key: "50.19.1",
					seek: "([mfp]):",
					replace: "$1olo",
					description: "conjugation: 3p.INAN"
				},
				{
					key: "50.19.2",
					seek: "([nst]):",
					replace: "$1ala",
					description: "conjugation: 3p.INAN"
				},
				{
					key: "50.19.3",
					seek: "([NTS]):",
					replace: "$1aLa",
					description: "conjugation: 3p.INAN"
				},
				{
					key: "50.19.4",
					seek: "([hk]):",
					replace: "$1ili",
					description: "conjugation: 3p.INAN"
				},
				{
					key: "50.20.1",
					seek: "([mfphk])~",
					replace: "$1aĭa",
					description: "conjugation: GER"
				},
				{
					key: "50.20.2",
					seek: "([nstNST])~",
					replace: "$1oĭa",
					description: "conjugation: GER"
				},
				{
					key: "46",
					seek: "T",
					replace: "ʈ",
					description: "mark retroflex t"
				},
				{
					key: "47",
					seek: "L",
					replace: "ɭ",
					description: "mark retroflex l"
				},
				{
					key: "48",
					seek: "S",
					replace: "ʂ",
					description: "mark retroflex s"
				},
				{
					key: "49",
					seek: "N",
					replace: "ɳ",
					description: "mark retroflex n"
				}
			],
			editing: null
		},
		wordgenSettings: {
			...basicSettings,
			monosyllablesRate: 12,
			maxSyllablesPerWord: 8,
			capitalizeSentences: false,
			declarativeSentencePre: ".",
			interrogativeSentencePre: "<",
			interrogativeSentencePost: ">",
			exclamatorySentencePre: "[",
			exclamatorySentencePost: "]"
		}
	}]
]);

export default WGPresets;
