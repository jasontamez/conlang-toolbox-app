import { loadStateConcepts } from "../store/conceptsSlice";
import { loadStateEC } from "../store/extraCharactersSlice";
import { loadStateLex } from "../store/lexiconSlice";
import { loadStateMS } from "../store/msSlice";
import { loadStateSettings } from "../store/settingsSlice";
import {
	AppSettings,
	ExtraCharactersState,
	Fifty_OneThousand,
	Five_OneHundred,
	LexiconState,
	MSBool,
	MSNum,
	MSState,
	MSText,
	ThemeNames,
	WEState,
	WGOutputTypes,
	WGState
} from "../store/types";
import { loadStateWE } from "../store/weSlice";
import { loadStateWG } from "../store/wgSlice";
import * as oldTypes from "./oldReduxTypes";
import { currentVersion } from "../store/blankAppState";

// Updating to 0.9.6
function doUpdate (incomingState: oldTypes.StateObject, dispatch: Function) {
	// TO-DO: update stored custom info
	dispatch(loadStateWG(updateWG(incomingState)));
	dispatch(loadStateWE(updateWE(incomingState)));
	dispatch(loadStateMS(updateMS(incomingState)));
	dispatch(loadStateLex(updateLex(incomingState)));
	dispatch(loadStateConcepts({
		currentVersion,
		...incomingState.conceptsState
	}));
	dispatch(loadStateEC(updateEC(incomingState)));
	dispatch(loadStateSettings(updateSettings(incomingState)));
}

function updateWG (incomingState: oldTypes.StateObject) {
	const {
		wordgenCharGroups,
		wordgenSyllables,
		wordgenTransforms,
		wordgenSettings
	} = incomingState;
	const {
		singleWord,
		wordInitial,
		wordMiddle,
		wordFinal
	} = wordgenSyllables.objects;
	const { charGroupRunDropoff, output, ...rest } = {
		output: "text",
		showSyllableBreaks: false,
		sentencesPerText: 10 as Five_OneHundred,
		capitalizeWords: false,
		sortWordlist: true,
		wordlistMultiColumn: true,
		wordsPerWordlist: 500 as Fifty_OneThousand,
		...wordgenSettings
	};
	const wg: WGState = {
		currentVersion,
		characterGroups: wordgenCharGroups.map.map(map => map[1]),
		multipleSyllableTypes: wordgenSyllables.toggle,
		singleWord: singleWord.components.join("\n"),
		wordInitial: wordInitial.components.join("\n"),
		wordMiddle: wordMiddle.components.join("\n"),
		wordFinal: wordFinal.components.join("\n"),
		syllableDropoffOverrides: {
			singleWord: singleWord.dropoffOverride === undefined ? null : singleWord.dropoffOverride,
			wordInitial: wordInitial.dropoffOverride === undefined ? null : wordInitial.dropoffOverride,
			wordMiddle: wordMiddle.dropoffOverride === undefined ? null : wordMiddle.dropoffOverride,
			wordFinal: wordFinal.dropoffOverride === undefined ? null : wordFinal.dropoffOverride,
		},
		transforms: wordgenTransforms.list.map(obj => ({
			id: obj.key,
			seek: obj.seek,
			replace: obj.replace,
			description: obj.description
		})),
		characterGroupDropoff: charGroupRunDropoff,
		output: output as WGOutputTypes,
		...rest,
		storedCustomIDs: [],
		storedCustomInfo: {}
	};
	return wg;
};

function updateWE (incomingState: oldTypes.StateObject) {
	const {
		wordevolveCharGroups,
		wordevolveTransforms,
		wordevolveSoundChanges,
		wordevolveInput,
		wordevolveSettings
	} = incomingState;
	const we: WEState = {
		currentVersion,
		input: wordevolveInput.join("\n"),
		characterGroups: wordevolveCharGroups.map.map(obj => {
			const { title, label, run } = obj[1];
			return {
				id: obj[0],
				title,
				label,
				run
			}
		}),
		transforms: wordevolveTransforms.list.map(obj => {
			const {key, ...rest} = obj;
			return {
				id: key,
				...rest
			};
		}),
		soundChanges: wordevolveSoundChanges.list.map(obj => {
			const {key, ...rest} = obj;
			return {
				id: key,
				...rest
			};
		}),
		outputStyle: wordevolveSettings.output,
		inputLower: false,
		inputAlpha: false,
		storedCustomIDs: [],
		storedCustomInfo: {}
	};
	return we;
}

function updateMS (incomingState: oldTypes.StateObject) {
	const { morphoSyntaxInfo } = incomingState;
	const { key, lastSave, title, description, bool, text, num } = morphoSyntaxInfo;
	const BOOL: { [key in MSBool]?: boolean } = {};
	const TEXT: { [key in MSText]?: string } = {};
	const NUM: { [key in MSNum]?: number } = {};
	Object.keys(bool).forEach(key => {
		const newProp: MSBool = "BOOL_" + key as MSBool;
		BOOL[newProp] = true;
	});
	Object.keys(text).forEach((key) => {
		const newProp: MSText = "TEXT_" + key as MSText;
		TEXT[newProp] = text[key as keyof oldTypes.MorphoSyntaxTextObject];
	});
	Object.keys(num).forEach(key => {
		const newProp: MSNum = "NUM_" + key as MSNum;
		NUM[newProp] = num[key as keyof oldTypes.MorphoSyntaxNumberObject];
	});
	const ms: MSState = {
		currentVersion,
		id: key,
		lastSave,
		title,
		description,
		...BOOL,
		...NUM,
		...TEXT,
		storedCustomIDs: [],
		storedCustomInfo: {}
	};
	return ms;
}

function updateLex (incomingState: oldTypes.StateObject) {
	const lex: LexiconState = {
		currentVersion,
		...incomingState.lexicon,
		storedCustomInfo: {},
		storedCustomIDs: []
	};
	return lex;
}

// Updating Concepts is unneeded

function updateEC (incomingState: oldTypes.StateObject) {
	const {
		display,
		saved,
		showNames,
		copyImmediately,
		copyLater
	} = incomingState.extraCharactersState;
	const ec: ExtraCharactersState = {
		currentVersion,
		nowShowing: display,
		toCopy: copyLater,
		showNames,
		copyImmediately,
		faves: saved
	};
	return ec;
}

function updateSettings (incomingState: oldTypes.StateObject) {
	const {
		theme,
		disableConfirms,
		sensitivity,
		sortLanguage
	} = incomingState.appSettings;
	const settings: AppSettings = {
		currentVersion,
		theme: theme as ThemeNames,
		disableConfirms,
		sensitivity,
		sortLanguage
	};
	return settings;
}

export default doUpdate
