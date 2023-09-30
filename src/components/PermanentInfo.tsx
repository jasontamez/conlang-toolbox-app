import { SortObject } from "../store/types";

interface Perms {
	sort: {
		permanentCustomSorts: {
			[key: string]: string
		},
		permanentCustomSortObjs: {
			[key: string]: SortObject
		}
	}
}

const PermanentInfo: Perms = {
	sort: {
		permanentCustomSorts: {
			"complex-preset-sort": "This is used by the \"Complex\" preset in WordGen. It cannot be modified or deleted."
		},
		permanentCustomSortObjs: {
			"complex-preset-sort": {
				id: "complex-preset-sort",
				title: "WG \"Complex\" Preset Sorter",
				customAlphabet: [
					"a",
					"aĭ",
					"e",
					"eĭ",
					"f",
					"h",
					"i",
					"k",
					"l",
					"ɭ",
					"m",
					"n",
					"ɳ",
					"o",
					"oĭ",
					"p",
					"r",
					"s",
					"ʂ",
					"t",
					"ʈ",
					"u",
					"uĭ"
				],
				separator: ",",
				multiples: [
					"aĭ",
					"eĭ",
					"oĭ",
					"uĭ"
				]
			}
		}
	}
};

export default PermanentInfo;
