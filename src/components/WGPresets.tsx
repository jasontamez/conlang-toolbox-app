import { PresetObject } from './ReduxDucksTypes';

const WGPresets: PresetObject = new Map([
	["Simple", {
		categories: {
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
		syllables: {
			toggle: false,
			objects: {
				singleWord: { components: ["CV","V","CLV"] },
				wordInitial: { components: [] },
				wordMiddle: { components: [] },
				wordFinal: { components: [] }
			}
		},
		rewriteRules: {
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
	["Medium", {
		categories: {
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
	["Pseudo-Latin", {
		categories: {
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
	["Pseudo-Chinese", {
		categories: {
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
	["Pseudo-English", {
		categories: {
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
		syllables: {
			toggle: true,
			objects: {
				singleWord: { components: ["CV","CVC","VC","V","PLVC"] },
				wordInitial: { components: ["CVC","CV","VC","PLV","sPLV","V"] },
				wordMiddle: { components: ["CV","VC","V"] },
				wordFinal: { components: ["CV","VC","CVC","V","VLF","VNF","CVgh","Vgh"] }
			}
		},
		rewriteRules: {
			list: [
				{
					key: "0",
					seek: "T+",
					replace: "th",
					description: ""
				},
				{
					key: "1",
					seek: "S+",
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
					key: "5",
					seek: "N+",
					replace: "ng",
					description: ""
				},
				{
					key: "15",
					seek: "([^g])\\Bh",
					replace: "k",
					description: "change non-initial h to k if not preceeded by a g"
				},
				{
					key: "6",
					seek: "w*W+w*(%V)",
					replace: "wh$1",
					description: "W-vowel becomes wh-vowel"
				},
				{
					key: "6.1",
					seek: "w*W+w*",
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
					seek: "([^aeiou])(ou)\\b",
					replace: "$1ough",
					description: "change word-final ou to ough"
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
					seek: "[aeiou]([aeiou]\\1)",
					replace: "$1",
					description: "reduce triple vowels, where the last two vowels match, to the final vowels"
				},
				{
					key: "18.2",
					seek: "([aeiou]\\1)[aeiou]",
					replace: "$1",
					description: "reduce triple vowels, where the first two vowels match, to the first vowels"
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
			monosyllablesRate: 20,
			maxSyllablesPerWord: 6,
			categoryRunDropoff: 30,
			syllableBoxDropoff: 20,
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
				}]
			],
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
					description: "save h before accented syllable"
				},
				{
					key: "5",
					seek: "(%V)h(?=%V\\b)",
					replace: "$1H",
					description: "save h before accented syllable"
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
					key: "46",
					seek: "T",
					replace: "t́",
					description: "mark retroflex t with accent"
				},
				{
					key: "47",
					seek: "L",
					replace: "ĺ",
					description: "mark retroflex l with accent"
				},
				{
					key: "48",
					seek: "S",
					replace: "ś",
					description: "mark retroflex s with accent"
				},
				{
					key: "49",
					seek: "N",
					replace: "ń",
					description: "mark retroflex n with accent"
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

export default WGPresets;
