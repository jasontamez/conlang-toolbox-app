import { SortSensitivity } from "../store/types";

const stringSorter = (a: string, b: string, sortLanguage: string, sensitivity: SortSensitivity) => {
	// If we need to do more stuff, insert the code here.
	return basicSort(a, b, sortLanguage, sensitivity);
};

const basicSort = (a: string, b: string, sortLanguage: string, sensitivity: SortSensitivity) => {
	// Basic search function. Falls back to "old" JS method if needed.
	if(a.localeCompare) {
		return a.localeCompare(b, sortLanguage, {numeric: true, usage: 'sort', sensitivity: sensitivity || "variant" });
	}
	// note: this will ignore case equality
	return a === b ? 0 : (a < b ? -1 : 1);
};

const makeSorter = (sortLanguage: string, sensitivity: SortSensitivity) => {
//	console.log(sortLanguage, sensitivity);
	return (a: string, b: string) => stringSorter(a, b, sortLanguage, sensitivity);
};

export default makeSorter;

/*
1) Alter input string to a "sortable" string using only English letters
2) Sort using these strings

// final unicode seems to be U+10FFFD can that be used?

const FINAL_CHAR = String.fromCodePoint(0x10FFFF);
const original = "ǡ";
const alteration = new RegExp(original, "g");
const replacement = "a" + FINAL_CHAR;
const restoration = new RegExp(replacement, "g");
const unsorted = input.map(x => x.replace(alteration, replacement));
unsorted.sort();
const output = unsorted.map(x => x.replace(restoration, original));

const quickSortAlgo = (input: any[]) => {
	if (input.length <= 1) {
		return input;
	}
	const origArray = input.slice();
	const left: any[] = [];
	const right: any[] = [];
	const newArray: any[] = [];
	const pivot = origArray.pop();
	const length = origArray.length;
	for (var i = 0; i < length; i++) {
		if (origArray[i] <= pivot) {
			left.push(origArray[i]);
		} else {
			right.push(origArray[i]);
		}
	}
	const lefty: any[] = quickSortAlgo(left);
	const righty: any[] = quickSortAlgo(right);
	return newArray.concat(lefty, pivot, righty);
}
*/
