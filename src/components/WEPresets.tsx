import { WEPresetObject } from './ReduxDucksTypes';

const WEPresets: Map<string, WEPresetObject> = new Map([
	["Grassmann's Law", {
		charGroups: [],
		soundchanges: [
			{
				key: "1",
				seek: "([ptk])ʰ",
				replace: "$1",
				context: "_[aeiou]+[ptk]ʰ",
				anticontext: "",
				description: ""
			},
		],
		transforms: []
	}],
	["Ruki Rule", {
		charGroups: [],
		soundchanges: [
			{
				key: "1",
				seek: "s+",
				replace: "š",
				context: "(?:gʰ|i̯|u̯|[rkgwyiu])_",
				anticontext: "",
				description: ""
			},
		],
		transforms: []
	}],
	["Dahl's Law", {
		charGroups: [
			["U", {
				title: "Unvoiced Consonants",
				run: "ptk"
			}],
			["C", {
				title: "Voiced Consonants",
				run: "bdg"
			}],
			["V", {
				title: "Vowels",
				run: "aeiou"
			}]
		],
		soundchanges: [
			{
				key: "1",
				seek: "%U",
				replace: "%C",
				context: "_%V+%U",
				anticontext: "%C%V+_",
				description: ""
			},
		],
		transforms: []
	}],
	["Ingvaeonic Nasal Spirant Law", {
		charGroups: [
			["V", {
				title: "Vowels",
				run: "aeiou"
			}],
			["N", {
				title: "New Vowels",
				run: "oeiou"
			}]
		],
		soundchanges: [
			{
				key: "1",
				seek: "%Vn",
				replace: "%N",
				context: "_(th|s)",
				anticontext: "",
				description: ""
			},
			{
				key: "1.1",
				seek: "%Vmf",
				replace: "%Nf",
				context: "_",
				anticontext: "",
				description: ""
			}
		],
		transforms: []
	}],
	["Grim's Law", {
		charGroups: [],
		soundchanges: [
			{
				key: "1",
				seek: "b",
				replace: "f",
				context: "_",
				anticontext: "",
				description: ""
			},
			{
				key: "2",
				seek: "d",
				replace: "th",
				context: "_",
				anticontext: "",
				description: ""
			},
			{
				key: "3",
				seek: "g",
				replace: "h",
				context: "_",
				anticontext: "",
				description: ""
			},
			{
				key: "4",
				seek: "gw",
				replace: "wh",
				context: "_",
				anticontext: "",
				description: ""
			}
		],
		transforms: []
	}],
	["Great English Vowel Shift", {
		charGroups: [
			["V", {
				title: "Vowels",
				run: "aeɛiouɔ"
			}],
			["N", {
				title: "New Vowels",
				run: "EiiAuUO"
			}]
		],
		soundchanges: [
			{
				key: "1",
				seek: "%V",
				replace: "%N",
				context: "_",
				anticontext: "",
				description: ""
			}
		],
		transforms: [
			{
				key: "1",
				seek: "E",
				replace: "eɪ",
				direction: "out",
				description: ""
			},
			{
				key: "2",
				seek: "A",
				replace: "aɪ",
				direction: "out",
				description: ""
			},
			{
				key: "3",
				seek: "U",
				replace: "aʊ",
				direction: "out",
				description: ""
			},
			{
				key: "4",
				seek: "O",
				replace: "oʊ",
				direction: "out",
				description: ""
			}
		]
	}],
	["High German Consonant Shift", {
		charGroups: [
			["V", {
				title: "Vowels",
				run: "aeiouäöü"
			}]
		],
		soundchanges: [
			{
				key: "1",
				seek: "p",
				replace: "f",
				context: "_#",
				anticontext: "",
				description: ""
			},
			{
				key: "1.1",
				seek: "p",
				replace: "ff",
				context: "%V_%V",
				anticontext: "",
				description: ""
			},
			{
				key: "1.2",
				seek: "pp",
				replace: "pf",
				context: "_",
				anticontext: "",
				description: ""
			},
			{
				key: "1.3",
				seek: "p",
				replace: "pf",
				context: "[lrnm]_",
				anticontext: "",
				description: ""
			},
			{
				key: "1.4",
				seek: "p",
				replace: "pf",
				context: "#_",
				anticontext: "_f",
				description: ""
			},
			{
				key: "2",
				seek: "t",
				replace: "z",
				context: "_#",
				anticontext: "",
				description: ""
			},
			{
				key: "2.1",
				seek: "t",
				replace: "zz",
				context: "%V_%V",
				anticontext: "",
				description: ""
			},
			{
				key: "2.2",
				seek: "tt",
				replace: "ts",
				context: "_",
				anticontext: "",
				description: ""
			},
			{
				key: "2.3",
				seek: "t",
				replace: "ts",
				context: "[lrnm]_",
				anticontext: "",
				description: ""
			},
			{
				key: "2.4",
				seek: "t",
				replace: "ts",
				context: "#_",
				anticontext: "_s",
				description: ""
			},
			{
				key: "3",
				seek: "k",
				replace: "x",
				context: "_#",
				anticontext: "",
				description: ""
			},
			{
				key: "3.1",
				seek: "k",
				replace: "xx",
				context: "%V_%V",
				anticontext: "",
				description: ""
			},
			{
				key: "3.2",
				seek: "kk",
				replace: "kx",
				context: "_",
				anticontext: "",
				description: ""
			},
			{
				key: "3.3",
				seek: "k",
				replace: "kx",
				context: "[lrnm]_",
				anticontext: "",
				description: ""
			},
			{
				key: "3.4",
				seek: "k",
				replace: "kx",
				context: "#_",
				anticontext: "_x",
				description: ""
			},
			{
				key: "4",
				seek: "d",
				replace: "t",
				context: "_",
				anticontext: "",
				description: ""
			},
			{
				key: "5",
				seek: "th",
				replace: "t",
				context: "_#",
				anticontext: "",
				description: ""
			},
			{
				key: "5.1",
				seek: "th",
				replace: "d",
				context: "_",
				anticontext: "",
				description: ""
			},
			{
				key: "6",
				seek: "sk",
				replace: "sh",
				context: "_",
				anticontext: "",
				description: ""
			},
			{
				key: "6.1",
				seek: "s",
				replace: "sh",
				context: "#_",
				anticontext: "_%V",
				description: ""
			}
		],
		transforms: []
	}]
]);

export default WEPresets;
