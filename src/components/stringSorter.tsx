import { SearchSensitivity } from "./ReduxDucksTypes";

const stringSorter = (a: string, b: string, sortLanguage: string, sensitivity: SearchSensitivity) => {
	// If we need to do more stuff, insert the code here.
	return basicSort(a, b, sortLanguage, sensitivity);
};

const basicSort = (a: string, b: string, sortLanguage: string, sensitivity: SearchSensitivity) => {
	// Basic search function. Falls back to "old" JS method if needed.
	if(a.localeCompare) {
		return a.localeCompare(b, sortLanguage, {numeric: true, usage: 'sort', sensitivity: sensitivity || "variant" });
	}
	// note: this will ignore case equality
	return a === b ? 0 : (a < b ? -1 : 1);
};

const makeSorter = (sortLanguage: string, sensitivity: SearchSensitivity) => {
//	console.log(sortLanguage, sensitivity);
	return (a: string, b: string) => stringSorter(a, b, sortLanguage, sensitivity);
};

export default makeSorter;
