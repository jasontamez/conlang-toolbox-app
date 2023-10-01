import { EqualityObject, SortObject } from "../store/types";

interface Perms {
	sort: {
		permanentCustomSorts: { [key: string]: string },
		permanentCustomSortObjs: SortObject[]
	}
}

const PermanentInfo: Perms = {
	sort: {
		permanentCustomSorts: {
			"wg-preset-sort": "This is used by WordGen presets. It cannot be modified or deleted."
		},
		permanentCustomSortObjs: [
			{
				id: "wg-preset-sort",
				title: "WG Presets Sorter",
				customAlphabet: [
					"a",
					"ā",
					"aĭ",
					"b",
					"c",
					"č",
					"čʰ",
					"d",
					"e",
					"ē",
					"ɛ",
					"eĭ",
					"f",
					"g",
					"h",
					"i",
					"ī",
					"j",
					"k",
					"kʰ",
					"l",
					"ʎ",
					"ɭ",
					"m",
					"n",
					"ñ",
					"ŋ",
					"Ŋ",
					"ɳ",
					"o",
					"ö",
					"ō",
					"ɔ",
					"oĭ",
					"p",
					"pʰ",
					"q",
					"r",
					"s",
					"š",
					"ʂ",
					"t",
					"tʰ",
					"ʈ",
					"u",
					"ü",
					"ū",
					"uĭ",
					"v",
					"w",
					"x",
					"y",
					"z",
					"ž"
				],
				separator: ",",
				customizations: [
					{
						base: "a",
						equals: [ "à" ]
					} as EqualityObject,
					{
						base: "e",
						equals: [ "ê" ]
					} as EqualityObject
				],
				multiples: [
					"aĭ",
					"čʰ",
					"eĭ",
					"kʰ",
					"oĭ",
					"pʰ",
					"tʰ",
					"uĭ"
				]
			}
		]
	}
};

export default PermanentInfo;
