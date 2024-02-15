import { WGPresetObject, WGSettings } from './types';

const basicSettings: WGSettings = {
	monosyllablesRate: 20,
	maxSyllablesPerWord: 6,
	characterGroupDropoff: 25,
	syllableBoxDropoff: 20,
	capitalizeSentences: true,
	declarativeSentencePre: "",
	declarativeSentencePost: ".",
	interrogativeSentencePre: "",
	interrogativeSentencePost: "?",
	exclamatorySentencePre: "",
	exclamatorySentencePost: "!",
	customSort: "wg-preset-sort",
};

const simpleSyllables = {
	multipleSyllableTypes: false,
	wordInitial: "",
	wordMiddle: "",
	wordFinal: "",
	syllableDropoffOverrides: {
		singleWord: null,
		wordInitial: null,
		wordMiddle: null,
		wordFinal: null
	}
};

const WGPresets: WGPresetObject = [
	["Simple", {
		characterGroups: [
			{
				label: "C",
				title: "Consonants",
				run: "ptkbdg"
			},
			{
				label: "V",
				title: "Vowels",
				run: "ieaou"
			},
			{
				label: "L",
				title: "Liquids",
				run: "rl"
			}
		],
		singleWord: "CV\nV\nCLV",
		...simpleSyllables,
		transforms: [
			{
				id: "0",
				seek: "ki",
				replace: "ci",
				description: ""

			},
			{
				id: "1",
				seek: "(.)\\1+",
				replace: "$1$1",
				description: ""
			}
		],
		...basicSettings
	}],
	["Medium", {
		characterGroups: [
			{
				label: "C",
				title: "Consonants",
				run: "tpknlrsmʎbdgñfh"
			},
			{
				label: "V",
				title: "Vowels",
				run: "aieuoāīūēō"
			},
			{
				label: "N",
				title: "Nasals",
				run: "nŋ"
			}
		],
		singleWord: "CV\nV\nCVN",
		...simpleSyllables,
		transforms: [
			{
				id: "0",
				seek: "aa",
				replace: "ā",
				description: ""
			},
			{
				id: "1",
				seek: "ii",
				replace: "ī",
				description: ""
			},
			{
				id: "2",
				seek: "uu",
				replace: "ū",
				description: ""
			},
			{
				id: "3",
				seek: "ee",
				replace: "ē",
				description: ""
			},
			{
				id: "4",
				seek: "oo",
				replace: "ō",
				description: ""
			},
			{
				id: "5",
				seek: "nb",
				replace: "mb",
				description: ""
			},
			{
				id: "6",
				seek: "np",
				replace: "mp",
				description: ""
			}
		],
		...basicSettings
	}],
	["Complex", {
		characterGroups: [
			{
				label: "C",
				title: "Consonants",
				run: "kstSplrLnstmTNfh"
			},
			{
				label: "S",
				title: "Initial consonants",
				run: "tspkThfS"
			},
			{
				label: "V",
				title: "Vowels",
				run: "aoiueAOUE"
			},
			{
				label: "I",
				title: "Mid-word vowels",
				run: "aoueAOUE"
			},
			{
				label: "E",
				title: "Word-ending consonants",
				run: "sfSnmNktpTh"
			},
			{
				label: "J",
				title: "Word-final conjugation",
				run: "1234567890!@#-&=_;:~",
				dropoffOverride: 0
			}
		],
		multipleSyllableTypes: true,
		singleWord: "SV\nSVEJ\nSV\nSV",
		wordInitial: "SV\nV\nSVC",
		wordMiddle: "SV\nI\nCV\nSVC",
		wordFinal: "I\nVEJ\nV\nVEJ\nSVEJ\nV\nCV\nVEJ\nCVEJ",
		syllableDropoffOverrides: simpleSyllables.syllableDropoffOverrides,
		transforms: [
			{
				id: "50.1",
				seek: "1",
				replace: "e",
				description: "conjugation: 1s"
			},
			{
				id: "50.2.1",
				seek: "([mfpkh])2|([hk])3",
				replace: "$1$2a",
				description: "conjugation: 2s/3s.AN"
			},
			{
				id: "50.2.2",
				seek: "([nts])2|([mfp])3",
				replace: "$1$2i",
				description: "conjugation: 2s/3s.AN"
			},
			{
				id: "50.2.3",
				seek: "([NTS])2",
				replace: "$1u",
				description: "conjugation: 2s"
			},
			{
				id: "50.3",
				seek: "([nstNTS])3",
				replace: "$1o",
				description: "conjugation: 3s.AN"
			},
			{
				id: "50.4.1",
				seek: "([mfp])4",
				replace: "$1a$1e",
				description: "conjugation: 2s.FORM"
			},
			{
				id: "50.4.2",
				seek: "([nst])4",
				replace: "$1i$1eĭ",
				description: "conjugation: 2s.FORM"
			},
			{
				id: "50.4.3",
				seek: "([NTS])4",
				replace: "$1u$1eĭ",
				description: "conjugation: 2s.FORM"
			},
			{
				id: "50.4.4",
				seek: "([hk])4",
				replace: "$1ate",
				description: "conjugation: 2s.FORM"
			},
			{
				id: "50.5.1",
				seek: "([mfp])5",
				replace: "$1o$1o",
				description: "conjugation: 3s.INAN"
			},
			{
				id: "50.5.2",
				seek: "([nstNST])5",
				replace: "$1aa",
				description: "conjugation: 3s.INAN"
			},
			{
				id: "50.5.3",
				seek: "([hk])5",
				replace: "$1iki",
				description: "conjugation: 3s.INAN"
			},
			{
				id: "50.6.1",
				seek: "([mfp])6",
				replace: "$1eo",
				description: "conjugation: 1.DU.IN"
			},
			{
				id: "50.6.2",
				seek: "([nst])6",
				replace: "$1io",
				description: "conjugation: 1.DU.IN"
			},
			{
				id: "50.6.3",
				seek: "([NTS])6",
				replace: "$1ua",
				description: "conjugation: 1.DU.IN"
			},
			{
				id: "50.6.4",
				seek: "([hk])6",
				replace: "$1ee",
				description: "conjugation: 1.DU.IN"
			},
			{
				id: "50.7.1",
				seek: "([mfp])7",
				replace: "$1uo",
				description: "conjugation: 1.DU.EX"
			},
			{
				id: "50.7.2",
				seek: "([nstNST])7",
				replace: "$1u",
				description: "conjugation: 1.DU.EX"
			},
			{
				id: "50.7.3",
				seek: "([kh])7",
				replace: "$1eo",
				description: "conjugation: 1.DU.EX"
			},
			{
				id: "50.8.1",
				seek: "([mfp])8|([NST])0",
				replace: "$1$2eĭ",
				description: "conjugation: 1.PAU.IN/1p.IN"
			},
			{
				id: "50.8.2",
				seek: "([nst])8",
				replace: "$1u$1u",
				description: "conjugation: 1.PAU.IN"
			},
			{
				id: "50.8.3",
				seek: "([NTS])8",
				replace: "$1a$1a",
				description: "conjugation: 1.PAU.IN"
			},
			{
				id: "50.8.4",
				seek: "([hk])8|([nst])9|([mfp])0",
				replace: "$1$2$3aĭ",
				description: "conjugation: 1.PAU.IN/1.PAU.EX/1p.IN"
			},
			{
				id: "50.9.1",
				seek: "([mfp])9",
				replace: "$1ae",
				description: "conjugation: 1.PAU.EX"
			},
			{
				id: "50.9.2",
				seek: "([NTS])9|([nst])0",
				replace: "$1$2oĭ",
				description: "conjugation: 1.PAU.EX/1p.IN"
			},
			{
				id: "50.9.3",
				seek: "([hk])[9!]",
				replace: "$1oe",
				description: "conjugation: 1.PAU.EX/1p.EX"
			},
			{
				id: "50.10",
				seek: "([hk])0",
				replace: "$1uu",
				description: "conjugation: 1p.IN"
			},
			{
				id: "50.11.1",
				seek: "([fmp])!",
				replace: "$1ou",
				description: "conjugation: 1p.EX"
			},
			{
				id: "50.11.2",
				seek: "([nst])!",
				replace: "$1uaĭ",
				description: "conjugation: 1p.EX"
			},
			{
				id: "50.11.3",
				seek: "([NST])!",
				replace: "$1uoĭ",
				description: "conjugation: 1p.EX"
			},
			{
				id: "50.12.1",
				seek: "([fmphk])@",
				replace: "$1ara",
				description: "conjugation: 2.PAU"
			},
			{
				id: "50.12.2",
				seek: "([nst])@",
				replace: "$1aro",
				description: "conjugation: 2.PAU"
			},
			{
				id: "50.12.3",
				seek: "([NST])@",
				replace: "$1uro",
				description: "conjugation: 2.PAU"
			},
			{
				id: "50.13.1",
				seek: "([fmpnsthk])#",
				replace: "$1areĭ",
				description: "conjugation: 2.PAU.FORM"
			},
			{
				id: "50.13.2",
				seek: "([NST])#",
				replace: "$1ureĭ",
				description: "conjugation: 2.PAU.FORM"
			},
			{
				id: "50.14.1",
				seek: "([fmphk])-",
				replace: "$1ala",
				description: "conjugation: 2p"
			},
			{
				id: "50.14.2",
				seek: "([nst])-",
				replace: "$1alo",
				description: "conjugation: 2p"
			},
			{
				id: "50.14.3",
				seek: "([NST])-",
				replace: "$1uLo",
				description: "conjugation: 2p"
			},
			{
				id: "50.15.1",
				seek: "([fmpnsthk])&",
				replace: "$1aleĭ",
				description: "conjugation: 2p.FORM"
			},
			{
				id: "50.15.2",
				seek: "([NST])&",
				replace: "$1uleĭ",
				description: "conjugation: 2p.FORM"
			},
			{
				id: "50.16.1",
				seek: "([fmp])=",
				replace: "$1iro",
				description: "conjugation: 3.PAU.AN"
			},
			{
				id: "50.16.2",
				seek: "([nstNST])=",
				replace: "$1ore",
				description: "conjugation: 3.PAU.AN"
			},
			{
				id: "50.16.3",
				seek: "([hk])=",
				replace: "$1aro",
				description: "conjugation: 3.PAU.AN"
			},
			{
				id: "50.17.1",
				seek: "([mfp])_",
				replace: "$1ilo",
				description: "conjugation: 3p.AN"
			},
			{
				id: "50.17.2",
				seek: "([nst])_",
				replace: "$1ole",
				description: "conjugation: 3p.AN"
			},
			{
				id: "50.17.3",
				seek: "([NTS])_",
				replace: "$1oLe",
				description: "conjugation: 3p.AN"
			},
			{
				id: "50.17.4",
				seek: "([hk])_",
				replace: "$1alo",
				description: "conjugation: 3p.AN"
			},
			{
				id: "50.18.1",
				seek: "([mfp]);",
				replace: "$1oro",
				description: "conjugation: 3.PAU.INAN"
			},
			{
				id: "50.18.2",
				seek: "([nstNST]);",
				replace: "$1ara",
				description: "conjugation: 3.PAU.INAN"
			},
			{
				id: "50.18.3",
				seek: "([kh]);",
				replace: "$1iri",
				description: "conjugation: 3.PAU.INAN"
			},
			{
				id: "50.19.1",
				seek: "([mfp]):",
				replace: "$1olo",
				description: "conjugation: 3p.INAN"
			},
			{
				id: "50.19.2",
				seek: "([nst]):",
				replace: "$1ala",
				description: "conjugation: 3p.INAN"
			},
			{
				id: "50.19.3",
				seek: "([NTS]):",
				replace: "$1aLa",
				description: "conjugation: 3p.INAN"
			},
			{
				id: "50.19.4",
				seek: "([hk]):",
				replace: "$1ili",
				description: "conjugation: 3p.INAN"
			},
			{
				id: "50.20.1",
				seek: "([mfphk])~",
				replace: "$1aĭa",
				description: "conjugation: GER"
			},
			{
				id: "50.20.2",
				seek: "([nstNST])~",
				replace: "$1oĭa",
				description: "conjugation: GER"
			},
			{
				id: "0",
				seek: "([aeiou])\\1{2,}",
				replace: "$1$1",
				description: "change triple-vowels to double vowels"
			},
			{
				id: "1",
				seek: "([AEOU])\\1+",
				replace: "$1",
				description: "change double-dipthongs to single"
			},
			{
				id: "2",
				seek: "(%V{2})%V+",
				replace: "$1",
				description: "eliminate third vowel in a row"
			},
			{
				id: "3",
				seek: "h+",
				replace: "h",
				description: "reduce multiple h to single"
			},
			{
				id: "4",
				seek: "h(?=%V(%E|%C{0,2}%V)\\b)",
				replace: "H",
				description: "save h before stressed syllable"
			},
			{
				id: "5",
				seek: "(%V)h(?=%V\\b)",
				replace: "$1H",
				description: "save h before stressed syllable"
			},
			{
				id: "6",
				seek: "\\bh",
				replace: "H",
				description: "save word-initial h"
			},
			{
				id: "7",
				seek: "h\\b",
				replace: "H",
				description: "save word-final h"
			},
			{
				id: "8",
				seek: "h",
				replace: "",
				description: "eliminate all other h"
			},
			{
				id: "9",
				seek: "H",
				replace: "h",
				description: "restore saved h"
			},
			{
				id: "9.1",
				seek: "kh",
				replace: "k",
				description: "reduce kh to k"
			},
			{
				id: "10",
				seek: "A",
				replace: "aĭ",
				description: "dipthong"
			},
			{
				id: "11",
				seek: "O",
				replace: "oĭ",
				description: "dipthong"
			},
			{
				id: "12",
				seek: "U",
				replace: "uĭ",
				description: "dipthong"
			},
			{
				id: "13",
				seek: "E",
				replace: "eĭ",
				description: "dipthong"
			},
			{
				id: "14",
				seek: "ĭi",
				replace: "i",
				description: "eliminate dipthong before i"
			},
			{
				id: "15",
				seek: "ĭT",
				replace: "ĭt",
				description: "de-retroflex t after a dipthong"
			},
			{
				id: "16",
				seek: "ĭS",
				replace: "ĭs",
				description: "de-retroflex s after a dipthong"
			},
			{
				id: "17",
				seek: "ĭL",
				replace: "ĭl",
				description: "de-retroflex l after a dipthong"
			},
			{
				id: "18",
				seek: "ĭN",
				replace: "ĭn",
				description: "de-retroflex n after a dipthong"
			},
			{
				id: "19",
				seek: "(.\\B[aeou])i",
				replace: "$1ĭ",
				description: "change certain non-word-initial vowel-i pairs to dipthongs"
			},
			{
				id: "20",
				seek: "(%C)\\1",
				replace: "$1",
				description: "reduce double consonants to one"
			},
			{
				id: "21",
				seek: "[tkpT]r",
				replace: "r",
				description: "remove plosive before an r"
			},
			{
				id: "22",
				seek: "n[pTk]",
				replace: "nt",
				description: "change n-plosive to nt"
			},
			{
				id: "23",
				seek: "m[tTk]",
				replace: "mp",
				description: "change m-plosive to mp"
			},
			{
				id: "24",
				seek: "N[ptk]",
				replace: "NT",
				description: "retroflex plosive after retroflex n"
			},
			{
				id: "25",
				seek: "k[nmN]",
				replace: "k",
				description: "remove nasal after k"
			},
			{
				id: "26",
				seek: "p[nN]",
				replace: "pm",
				description: "change p-nasal to pm"
			},
			{
				id: "27",
				seek: "t[mN]",
				replace: "tn",
				description: "change t-nasal to tn"
			},
			{
				id: "28",
				seek: "T[nm]",
				replace: "TN",
				description: "make post-retroflex t nasal retroflex n"
			},
			{
				id: "29",
				seek: "p[sSh]",
				replace: "pf",
				description: "change p-fricative to pf"
			},
			{
				id: "30",
				seek: "t[fSh]",
				replace: "ts",
				description: "change t-fricative to ts"
			},
			{
				id: "31",
				seek: "T[fsh]",
				replace: "TS",
				description: "change post-retroflex t fricative to retroflex s"
			},
			{
				id: "32",
				seek: "k[fsS]",
				replace: "kh",
				description: "change k-fricative to kh"
			},
			{
				id: "33",
				seek: "f[sSh]",
				replace: "fp",
				description: "change f-fricative to fp"
			},
			{
				id: "34",
				seek: "s[fSh]",
				replace: "st",
				description: "change s-fricative to st"
			},
			{
				id: "35",
				seek: "S[fsh]",
				replace: "ST",
				description: "change post-retroflex s fricative to retroflex t"
			},
			{
				id: "36",
				seek: "h[fsS]",
				replace: "hk",
				description: "change h-fricative to hk"
			},
			{
				id: "37",
				seek: "ft",
				replace: "fp",
				description: "change ft to fp"
			},
			{
				id: "38",
				seek: "sT",
				replace: "st",
				description: "de-retroflex t after s"
			},
			{
				id: "39",
				seek: "St",
				replace: "ST",
				description: "make t after retroflex s into retroflex t"
			},
			{
				id: "40",
				seek: "([TSLN])[tsln]",
				replace: "$1",
				description: "eliminate non-retroflex consonant after retroflex consonants"
			},
			{
				id: "41",
				seek: "([tsln])[TSLN]",
				replace: "$1",
				description: "eliminate retroflex consonant after non-retroflex consonant"
			},
			{
				id: "42",
				seek: "NT",
				replace: "nT",
				description: "de-retroflex n before retroflex t"
			},
			{
				id: "43",
				seek: "TN",
				replace: "tN",
				description: "de-retroflex t before retroflex n"
			},
			{
				id: "44",
				seek: "ST",
				replace: "sT",
				description: "de-retroflex s before retroflex t"
			},
			{
				id: "45",
				seek: "TS",
				replace: "tS",
				description: "de-retroflex t before retroflex s"
			},
			{
				id: "46",
				seek: "T",
				replace: "ʈ",
				description: "mark retroflex t"
			},
			{
				id: "47",
				seek: "L",
				replace: "ɭ",
				description: "mark retroflex l"
			},
			{
				id: "48",
				seek: "S",
				replace: "ʂ",
				description: "mark retroflex s"
			},
			{
				id: "49",
				seek: "N",
				replace: "ɳ",
				description: "mark retroflex n"
			}
		],
		...basicSettings,
		monosyllablesRate: 12,
		maxSyllablesPerWord: 8,
		capitalizeSentences: false,
		declarativeSentencePre: ".",
		interrogativeSentencePre: "<",
		interrogativeSentencePost: ">",
		exclamatorySentencePre: "[",
		exclamatorySentencePost: "]"
	}],
	["Pseudo-Latin", {
		characterGroups: [
			{
				label: "C",
				title: "Consonants",
				run: "tkpnslrmfbdghvyh"
			},
			{
				label: "V",
				title: "Vowels 1",
				run: "aiueo"
			},
			{
				label: "U",
				title: "Vowels 2",
				run: "aiuàê"
			},
			{
				label: "P",
				title: "Pre-liquid consonants",
				run: "ptkbdg"
			},
			{
				label: "L",
				title: "Liquids",
				run: "rl"
			},
			{
				label: "F",
				title: "Syllable-final consonants",
				run: "nsrmltc"
			}
		],
		singleWord: "CV\nCUF\nV\nUF\nPLV\nPLUF",
		...simpleSyllables,
		transforms: [
			{
				id: "0",
				seek: "ka",
				replace: "ca",
				description: ""
			},
			{
				id: "1",
				seek: "nko",
				replace: "co",
				description: ""
			},
			{
				id: "2",
				seek: "nku",
				replace: "cu",
				description: ""
			},
			{
				id: "3",
				seek: "nkr",
				replace: "cr",
				description: ""
			}
		],
		...basicSettings
	}],
	["Pseudo-Chinese", {
		characterGroups: [
			{
				label: "C",
				title: "Consonants",
				run: "ptknlsmšywčhfŋ"
			},
			{
				label: "V",
				title: "Vowels",
				run: "auieo"
			},
			{
				label: "F",
				title: "Syllable-Final Consonants",
				run: "nnŋmktp"
			},
			{
				label: "D",
				title: "Dipthongs",
				run: "io"
			},
			{
				label: "A",
				title: "Aspirated Consonants",
				run: "ptkč"
			}
		],
		singleWord: "CV\nAʰV\nCVD\nCVF\nVF\nV\nAʰVF",
		...simpleSyllables,
		transforms: [
			{
				id: "0",
				seek: "uu",
				replace: "wo",
				description: ""
			},
			{
				id: "1",
				seek: "oo",
				replace: "ou",
				description: ""
			},
			{
				id: "2",
				seek: "ii",
				replace: "iu",
				description: ""
			},
			{
				id: "3",
				seek: "aa",
				replace: "ia",
				description: ""
			},
			{
				id: "4",
				seek: "ee",
				replace: "ie",
				description: ""
			}
		],
		...basicSettings
	}],
	["Pseudo-Greek", {
		characterGroups: [
			{
				label: "C",
				title: "Consonants",
				run: "ptknslrmbdgfvwyhšzñxčžŊ"
			},
			{
				label: "V",
				title: "Vowels",
				run: "aiuoeɛɔâôüö"
			},
			{
				label: "L",
				title: "Liquids",
				run: "rly"
			}
		],
		singleWord: "CV\nV\nCVC\nCLV",
		...simpleSyllables,
		transforms: [
			{
				id: "0",
				seek: "â",
				replace: "ai",
				description: ""
			},
			{
				id: "1",
				seek: "ô",
				replace: "au",
				description: ""
			}
		],
		...basicSettings
	}],
	["Pseudo-English", {
		characterGroups: [
			{
				label: "C",
				title: "Consonants",
				run: "tnsrdlSmTqwfgWypbCcvhPBkjxqz"
			},
			{
				label: "V",
				title: "Vowels",
				run: "eaoeaoiuOIiEAUuy"
			},
			{
				label: "P",
				title: "Plosives",
				run: "tpkc"
			},
			{
				label: "L",
				title: "Liquids",
				run: "rl"
			},
			{
				label: "N",
				title: "Nasals",
				run: "nmN"
			},
			{
				label: "F",
				title: "Post-nasal or -liquid Final Consonants",
				run: "TS"
			}
		],
		multipleSyllableTypes: true,
		singleWord: "CV\nCVC\nVC\nV\nPLVC\nPLV",
		wordInitial: "CVC\nCV\nVC\nPLV\nsPLV\nV",
		wordMiddle: "CV\nCV\nCV\nVC\nV",
		wordFinal: "CV\nCVC\nCVLF\nCVNF\nCVgh\nVC\nV\nVgh",
		syllableDropoffOverrides: simpleSyllables.syllableDropoffOverrides,
		transforms: [
			{
				id: "15",
				seek: "([^g])h",
				replace: "$1k",
				description: "change non-initial h to k if not preceeded by a g"
			},
			{
				id: "0",
				seek: "s*T+s*",
				replace: "th",
				description: ""
			},
			{
				id: "1",
				seek: "s*S+s*",
				replace: "sh",
				description: ""
			},
			{
				id: "2",
				seek: "C+",
				replace: "ch",
				description: ""
			},
			{
				id: "5",
				seek: "[nm]*N+[nm]*",
				replace: "ng",
				description: ""
			},
			{
				id: "6",
				seek: "w*W+(%V)",
				replace: "wh$1",
				description: "W-vowel becomes wh-vowel"
			},
			{
				id: "6.1",
				seek: "[wW]+",
				replace: "w",
				description: "remaining Ws become w"
			},
			{
				id: "7",
				seek: "(%V)ch",
				replace: "$1tch",
				description: "vowel-ch becomes vowel-tch"
			},
			{
				id: "8",
				seek: "P+",
				replace: "ph",
				description: ""
			},
			{
				id: "9",
				seek: "(%V)B(\\b|!%V)",
				replace: "$1ble$2",
				description: "vowel-ble-nonvowel"
			},
			{
				id: "9.1",
				seek: "(%V)B",
				replace: "$1bl",
				description: "vowel-bl"
			},
			{
				id: "9.2",
				seek: "B",
				replace: "",
				description: "eliminate remaining Bs"
			},
			{
				id: "10",
				seek: "%V*O+%V*",
				replace: "oo",
				description: ""
			},
			{
				id: "11",
				seek: "%V*U+%V*",
				replace: "ou",
				description: ""
			},
			{
				id: "12",
				seek: "%V*I+%V*",
				replace: "oi",
				description: ""
			},
			{
				id: "13",
				seek: "%V*A+%V*",
				replace: "au",
				description: ""
			},
			{
				id: "13.1",
				seek: "%V*E+%V*",
				replace: "ei",
				description: ""
			},
			{
				id: "13.2",
				seek: "([^c])ei",
				replace: "$1ie",
				description: "i before e except after c"
			},
			{
				id: "14",
				seek: "([^aeiou])(o|au)\\b",
				replace: "$1ow",
				description: "change word-final o or au to ow"
			},
			{
				id: "14.1",
				seek: "([^aeiou])(ou|ei)\\b",
				replace: "$1$2gh",
				description: "change word-final ou to ough, ei to eigh"
			},
			{
				id: "16",
				seek: "y+",
				replace: "y",
				description: "eliminate duplicate ys"
			},
			{
				id: "17",
				seek: "(\\b|[^aeiou])tl",
				replace: "$1t",
				description: "reduce tl cluster to t after non-vowel"
			},
			{
				id: "17.1",
				seek: "tl(\\b|%C)",
				replace: "t$1",
				description: "reduce tl cluster to t before consonant or word-end"
			},
			{
				id: "18",
				seek: "(.)\\1{2,}",
				replace: "$1$1",
				description: "reduce triple-letter clusters to two"
			},
			{
				id: "18.1",
				seek: "[aeiou]*([aeiou])[aeiou]*\\1[aeiou]*",
				replace: "$1$1",
				description: "reduce multiple vowels in a row, where any two vowels match, to the matching vowels"
			},
			{
				id: "3",
				seek: "q+",
				replace: "qu",
				description: "q is always followed by u"
			},
			{
				id: "4",
				seek: "qu\\b",
				replace: "que",
				description: "qu at word-end becomes que"
			},
			{
				id: "4.1",
				seek: "qu([aeiou])[aeiou]+",
				replace: "qu$1",
				description: "eliminate triple+ vowels after q"
			},
			{
				id: "19",
				seek: "c\\b",
				replace: "ck",
				description: "word-final c becomes ck"
			},
			{
				id: "20",
				seek: "([aiu])\\1",
				replace: "$1",
				description: "change double a/i/u to single"
			},
			{
				id: "21",
				seek: "m[kt]\\b",
				replace: "mp",
				description: "word-final mk or mt becomes mp"
			},
			{
				id: "21.1",
				seek: "n[kp]\\b",
				replace: "nt",
				description: "word-final nk or np becomes nt"
			},
			{
				id: "21.2",
				seek: "ng[kt]",
				replace: "nk",
				description: "ngk and ngt become nk"
			}
		],
		...basicSettings,
		maxSyllablesPerWord: 5
	}],
	["Pseudo-Japanese", {
		characterGroups: [
			{
				label: "C",
				title: "Consonants",
				run: "kgsztdnhbpmyr"
			},
			{
				label: "V",
				title: "Vowels",
				run: "aiueo"
			}
		],
		singleWord: "CV\nV\nCV\nV\nCVn\nVn",
		...simpleSyllables,
		transforms: [
			{
				id: "1",
				seek: "y([ie])",
				replace: "r$1",
				description: "replace forbidden syllable"
			},
			{
				id: "2",
				seek: "w([ieu])",
				replace: "b$1",
				description: "replace forbidden syllable"
			},
			{
				id: "3",
				seek: "(.)\\1+",
				replace: "$1",
				description: "remove duplicate characters"
			},
			{
				id: "4",
				seek: "(%V%V)%V+",
				replace: "$1",
				description: "reduce 3+ vowels in a row down to just 2"
			}
		],
		...basicSettings,
		monosyllablesRate: 5,
		maxSyllablesPerWord: 8,
		characterGroupDropoff: 10,
		syllableBoxDropoff: 40
	}]
];

export default WGPresets;
