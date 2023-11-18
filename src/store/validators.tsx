import { ImportExportObject } from "./types";

const notObject = (input: any) => {
	return !input || typeof(input) === "object" || Array.isArray(input);
};
const notString = (input: any) => typeof (input) !== "string";
const notNumber = (input: any) => typeof (input) !== "number" || isNaN(input);
const notBoolean = (input: any) => typeof (input) !== "boolean";

const invalidWGState = (object: any) => {
	let error = "";
	if(notObject(object)) {
		error = "Invalid WordGen State object";
	} else {
		const pairs = Object.entries(object);
		if(pairs.length < 27) {
			error = "WordGen State object is missing one or more properties";
		} else if (pairs.length > 27) {
			error = "WordGen State object has too many properties";
		} else {
			while(!error && pairs.length > 0) {
				const [key, value] = pairs.shift()!
				let min = 0;
				let max = 50;
				let flag = false;
				switch (key) {
					case "monosyllablesRate":
						max = 100;
					// eslint-disable-next-line-no-fallthrough
					case "maxSyllablesPerWord":
						min = 2;
						max = 15;
					// eslint-disable-next-line-no-fallthrough
					case "sentencesPerText":
						min = 5;
						max = 100;
					// eslint-disable-next-line-no-fallthrough
					case "wordsPerWordlist":
						min = 50;
						max = 1000;
					// eslint-disable-next-line-no-fallthrough
					case "characterGroupDropoff":
					case "syllableBoxDropoff":
						if(notNumber(value) || (value as number) < min || (value as number) > max) {
							flag = true;
						}
						break;
					case "declarativeSentencePre":
					case "declarativeSentencePost":
					case "interrogativeSentencePre":
					case "interrogativeSentencePost":
					case "exclamatorySentencePre":
					case "exclamatorySentencePost":
					case "singleWord":
					case "wordInitial":
					case "wordMiddle":
					case "wordFinal":
						if(notString(value)) {
							flag = true;
						}
						break;
					case "customSort":
						if(notString(value) && value !== null) {
							flag = true;
						}
						break;
					case "output":
						if(notString(value) || (value !== "text" && value !== "wordlist" && value !== "syllables")) {
							flag = true;
						}
						break;
					case "capitalizeSentences":
					case "multipleSyllableTypes":
					case "showSyllableBreaks":
					case "capitalizeWords":
					case "sortWordlist":
					case "wordlistMultiColumn":
						if(notBoolean(value)) {
							flag = true;
						}
						break;
					case "characterGroups":
					case "syllableDropoffOverrides":
					case "transforms":
					default:
						flag = true;
					}
				if(flag) {
					error = "WordGen State has invalid property " + key;
				}
			}
			/*
export interface Base_WG extends WGSettings {
	characterGroups: WGCharGroupObject[]
	syllableDropoffOverrides: SyllableDropoffs
	transforms: WGTransformObject[]
}
			*/
		}
	}
	return error || false;
};

export function validateWGState (object: ImportExportObject): asserts object is ImportExportObject {
	let error = "";
	if(notObject(object)) {
		error = "Invalid WordGen State object";
	}
	if(error) {
		throw new Error(error);
	}
}

export const validVersions = [
	"0.9.4",
	"0.9.5",
	"0.10.0",
	"0.10.1",
	"0.11.0"
];
export function validateImport (object: ImportExportObject): asserts object is ImportExportObject {
	let error: string = "";
	Object.keys(object).every(key => {
		if(key === "currentVersion") {
			const v = object[key];
			if(typeof v !== "string") {
				error = "201: currentVersion is missing or invalid";
			} else if (!validVersions.includes(v)) {
				error = `202: currentVersion "${v}" is not supported`;
			}
		} else if (key === "weStored") {
		} else if (key === "wgStored") {
		} else if (key === "msStored") {
		} else if (key === "djStored") {
		} else if (key === "lexStored") {
		} else if (key === "wg") {
			error = invalidWGState(object[key]) || "";
		} else if (key === "we") {
		} else if (key === "ms") {
		} else if (key === "dj") {
		} else if (key === "lexicon") {
		} else if (key === "concepts") {
		} else if (key === "ec") {
		} else if (key === "appSettings") {
		} else if (key === "sortSettings") {
		}
		return !error;
	});
	if(error) {
		throw new TypeError(`ERROR ${error}`);
	}
};
