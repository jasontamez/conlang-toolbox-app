import characters from "./characters";

const common = {

	"Conlang Toolbox": "Conlang Toolbox", // name of the App
	"Conlang Toolbox_filename": "ConlangToolbox", // safe for use as a filename
	"tools for language invention": "tools for language invention",
	Controls: "Controls", // the buttons used in the app

	MorphoSyntax: "MorphoSyntax", // name of tool

	// name of tool - word + generator
	WordGen: "WordGen",
	WordGen_filename: "WordGen", // safe for use as a filename
	WG: "WG", // shorthand for WordGen

	// name of tool - word + evolve
	WordEvolve: "WordEvolve",
	WordEvolve_filename: "WordEvolve", // safe for use as a filename
	WE: "WG", // shorthand for WordEvolve

	// name of tool - declension + conjugation
	Declenjugator: "Declenjugator",
	Declenjugator_filename: "Declenjugator", // safe for use as a filename

	// name of tool
	Lexicon: "Lexicon",
	Lexicon_filename: "Lexicon",  // safe for use as a filename

	// name of tool
	Concepts: "Concepts",

	"Extra Characters": "Extra Characters",

	"App Info": "App Info",
	Settings: "Settings",
	"App Settings": "App Settings",
	Main: "Main",
	Overview: "Overview",
	Input: "Input",
	Output: "Output",
	Stop: "Stop",
	Cancel: "Cancel",
	Clear: "Clear",
	Save: "Save",
	Ok: "Ok",
	Done: "Done", // finished, completed, etc.
	Close: "Close", // close the open modal/dialog/whatever
	Help: "Help",
	"Display": "Display",
	"Display_presentation": "Display:", // short label indicating the user can select an option to display
	"SavedAt": "Saved: {{time}}", // short phrase describing when something was saved
	Saved: "Saved", // message indicating something was saved to the device or to app state
	Copy: "Copy", // button that will copy something to the clipboard
	"Copy to Clipboard": "Copy to Clipboard",
	"Copied to clipboard": "Copied to clipboard",
	"Characters to be copied": "Characters to be copied", // aria-label
	"Add New": "Add New",
	"Add and Close": "Add and Close",
	"Nothing to copy": "Nothing to copy",
	Export: "Export",
	Generate: "Generate",
	Info: "Info", // short for "Information"

	fileFormat: "{{title}} - {{date}}.{{extension}}",
	"[Untitled]": "[Untitled]",
	exportTitle: "Export: {{title}}",
	"Unable to export": "UNABLE TO EXPORT: {{error}}",
	"File exported": "{{filename}} exported.",
	"Unable to write file": "UNABLE TO WRITE FILE: {{error}}",
	generalError: "Error saving file {{filename}} ({{error}})",
	fileSaved: "File saved as {{filename}}",

	joinTwo: "{{one}} and {{two}}",
	andGlue: ", ", // put between items in a list
	andFinal: ", and ", // put between the penultimate and the last item in a list

	"Exit App?": "Exit App?",
	"Do you want to exit the app?": "Do you want to exit the app?",
	"Yes Exit!": "Yes, Exit!",

	// saveToLexColumn also takes a {{count}} in case a plural version is needed
	saveToLexColumn: "{{what}} saved to $t(Lexicon) under \"{{column}}\"",
	"Select a column": "Select a column",
	"Go to Lexicon": "Go to $t(Lexicon)",
	"Tap words you want to save to Lexicon.": "Tap words you want to save to $t(Lexicon).",
	"Your selected words will be added to the Lexicon under that column.":
		"Your selected words will be added to the $t(Lexicon) under that column.",
	word_one: "{{count}} word",
	word_other: "{{count}} words",

	"Word Document (docx)": "Word Document (docx)",
	"Text File": "Text File",
	"Text File (plain)": "$t(Text File) (plain)",
	"Text File (markdown)": "$t(Text File) (markdown)",
	"Spreadsheet (csv)": "Spreadsheet (csv)",
	"Choose a Format": "Choose a Format",
	"Choose a format": "Choose a format",
	"Choose a format_presentation": "Choose a format:",
	"JSON File": "JSON File",
	"XML File": "XML File",

	"Save as New": "Save as New",

	// Things will take `count` properties for plurality
	clearOverrideThings: "This will clear and overwrite {{things}}.",
	"clearThings?": "Clear {{things}}?",
	deleteThings: "This will delete {{things}}.",
	deleteThingsCannotUndo: "This will delete {{things}}, and cannot be undone.",
	thingsDeleted: "{{things}} deleted.",

	// General Things are unknown, may be 0, 1, or any number
	clearOverrideGeneralThings: "This will clear and overwrite {{things}}.",
	clearGeneralThings: "Clear {{things}}",
	deleteGeneralThings: "Delete {{things}}",
	editGeneralThings: "Edit {{things}}",
	saveGeneralThings: "Save {{things}}",

	// Singular Things
	thingAdded: "{{thing}} added.",
	thingSaved: "{{thing}} saved.",
	thingDeleted: "{{thing}} deleted.",
	thingEdited: "{{thing}} edited.",
	deleteThing: "Delete {{thing}}",
	editThing: "Edit {{thing}}",
	addThing: "Add {{thing}}",
	saveThing: "Save {{thing}}",
	loadThing: "Load {{thing}}",
	missingThing: "Missing {{thing}}",
	exportThing: "Export {{thing}}",
	exportThing_presentation: "Export {{thing}}:",

	// Titled things
	deleteTitle: "Delete \"{{title}}\"?",
	loadTitle: "Load \"{{title}}\"?",

	titleSaved: "\"{{title}}\" saved.",
	titleAlreadyExists: "\"{{title}}\" already exists",
	titleLoaded: "\"{{title}}\" loaded.",
	prefixTitleLoaded: "{{prefix}} \"{{title}}\" loaded.",
	titleNotFound: "\"{{title}}\" not found.",
	titleDeleted: "\"{{title}}\" deleted.",
	titleOverwritten: "\"{{title}}\" overwritten.",

	"the previous save": "the previous save",
	"Yes Overwrite It": "Yes, Overwrite It",
	"Load Error": "Load Error",
	"Manage Custom Info": "Manage Custom Info",
	"Current Info": "Current Info",
	"Name of save": "Name of save",
	"Name your custom info": "Name your custom info",
	"Load Saved Info": "Load Saved Info",
	Load: "Load",
	"No saved info": "No saved info",

	"Unknown error occurred.": "Unknown error occurred.",
	"Sort method": "Sort method",
	"Sort method_presentation": "Sort method:",

	cannotUndo: "This cannot be undone.", // This action, usually deleting something, cannot be undone.
	areYouSure: "Are you sure?", // Do you want to do this action?
	"Are you sure you want to delete this? This cannot be undone.":
		"Are you sure you want to delete this? $t(cannotUndo)",
	"Clear Everything?": "Clear Everything?",
	"Delete Everything?": "Delete Everything?",
	confirmDelIt: "Yes, Delete It",  // "It" might refer to many things
	confirmDel_one: "$t(confirmDelIt)",  // "It" might refer to many things
	confirmDel_other: "Yes, Delete Them", // "Them" might refer to many things
	confirmLoad: "Yes, Load It", // "It" may refer to many things
	"Yes Exit": "Yes, Exit",
	"Nothing to save.": "Nothing to save.",
	This: "This",
	Delete: "Delete",
	Edit: "Edit",
	"Deleted.": "Deleted",
	"Unsaved Info": "Unsaved Info",
	"Are you sure you want to discard this?":
		"Are you sure you want to discard this?",
	"Are you sure you want to discard your edits?":
		"Are you sure you want to discard your edits?",
	"Yes Discard": "Yes, Discard",
	"Clear Input": "Clear Input",
	"Are you sure? This will clear the entire input and cannot be undone.":
		"$t(areYouSure) This will clear the entire input, and cannot be undone.",
	"Yes Clear It": "Yes, Clear It",

	"Default sort": "Default sort", // Refers to the default sort method, whatever it may be

	"You need to add columns to the Lexicon before you can add anything to it.":
		"You need to add columns to the $t(Lexicon) before you can add anything to it.",

	error: "Error",
	emphasizedError: "<$t(error)>",

	regexpError: "Error trying to parse \"{{regex}}\"",

	"You did not type any information into any text field.":
		"You did not type any information into any text field.",

	Loading: "Loading",
	"Working...": "Working...",
	"Please wait...": "Please wait...",

	TITLE: "TITLE",
	title: "title",
	Title: "Title",
	"Title_presentation": "Title:",
	Description: "Description",
	description: "description",
	description_formal: "Description",
	description_presentation: "Description:",

	overviewOf: "Overview: {{what}}",

	ImportFrom: "Import from {{source}}",
	"Load Preset": "Load Preset",

	// Import from Lexicon
	Import: "Import",
	"Import from Lexicon": "Import from $t(common:Lexicon)",
	"Import from which column(s)?": "Import from which column(s)?",
	"Lexicon Has No Columns": "Lexicon Has No Columns",
	"optional": "(optional)",
	"Add Conditions (optional)": "Add Conditions $t(optional)",
	"Word must contain [x]": "Word must contain [x]",
	"Type part of word here.": "Type part of word here.",
	"Word must match expression [x]": "Word must match expression [x]",
	"Type regular expression here.": "Type regular expression here.",
	"Column [x] must contain [y]": "Column [x] must contain [y]",
	"Test column": "Test column",
	"Test column_presentation": "Test column:",
	"Column [x] must match expression [y]": "Column [x] must match expression [y]",
	"Words that contain": "Words that contain",
	"Words that contain_presentation": "Words that contain:",
	"Words that match:": "Words that match:",
	"Words where the column:": "Words where the column:",
	columnContains: "[{{column}}] contains \"{{test}}\"",
	columnMatches: "[{{column}}] matches /{{test}}/",
	"Match all conditions": "Match all conditions",
	"If off, this will import words that match any condition.": "If off, this will import words that match any condition.",
	"Exit Without Importing?": "Exit Without Importing?",
	"Please select at least one column to import from.": "Please select at least one column to import from.",
	"Did not find anything to import.": "Did not find anything to import.",
	importSuccess_one: "Imported {{count}} word from $t(Lexicon).",
	importSuccess_other: "Imported {{count}} words from $t(Lexicon).",

	// REGULAR EXPRESSIONS
	"Regular Expression": "Regular Expression", // title of section
	"Regular Expressions": "Regular Expressions", // title of section
	"Regular expressions": "Regular expressions", // start of sentence
	"regular expressions": "regular expressions", // plural, generic
	"Regexes": "Regexes", // plural, generic, starts a sentence, shorter version of Regular Expressions
	"regular expression": "regular expression", // single instance

	regexpInfo: [
		"To put it as simply as possible, a $t(regular expression) is a",
		"sequence of characters that specifies a match pattern in text.",
		"$t(Conlang Toolbox) uses JavaScript-style regexes without the",
		"surrounding slash characters.",
		"",
		"Fully explaining regular expressions is a topic that's too",
		"complicated for this app to cover, but they are very useful. Here",
		"are some resources where you can learn more about them:",
		"",
		"- [Wikipedia: Regular Expression](https://en.wikipedia.org/wiki/Regular_expression)",
		"- [MDN: Writing a regular expression](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions#writing_a_regular_expression_pattern)",
		"- [Regular-Expressions.info](https://www.regular-expressions.info) (a tutorial site)",
		"- [Geeks for Geeks: Write Reguar Expressions](https://www.geeksforgeeks.org/write-regular-expressions/)"
	],

	// EXTRA CHARACTERS
	"No longer copying directly to clipboard.": "No longer copying directly to clipboard.",
	"Now copying immediately to clipboard.": "Now copying immediately to clipboard.",
	copiedCharToClipboard: "Copied {{char}} to clipboard",
	Favorites: "Favorites",
	"Start Favoriting characters" : "Start favoriting characters",
	"Stop Favoriting characters" : "Stop favoriting characters",
	"Now saving characters to Favorites": "Now saving characters to $t(Favorites)",
	"No longer saving to Favorites": "No longer saving to $t(Favorites)",
	"Tap characters to add them here": "Tap characters to add them here",
	"Show full character names": "Show full character names",
	"Hide full character names": "Hide full character names",
	extraHelp: {
		help1p1:
			`This is a place to find and copy characters that may not be
			easily accessible to you on your device's keyboard. The other
			buttons can be toggled for additional effects:`,
		help1p2:
			`When active, copies any character you tap directly to the
			clipboard. When inactive, copies tapped characters to the
			copy-bar below, where you can copy them at your leisure.`,
		help1p3:
			`When active, tapping on a character adds or removes it from your
			Favorites list. Characters will not be copied to the clipboard or
			the copy-bar.`,
		help1p4:
			`When active, shows the standard Unicode name of every character.
			When inactive, the characters are presented by themselves.`,
		help2: "Tap a character set below to see the characters in that set.",
		help3: "Characters will display below. Tap them to copy them to the copy-bar above.",
	},
	characterInfo: characters,

	// PERMANENT INTO
	"WG Presets Sorter": "$t(WG) Presets Sorter", // Title of the permanent sort method in sort settings.

	// The key below is used when someone tries to edit or delete the permanent sort method in sort settings.
	"This is used by WordGen presets. It cannot be modified or deleted.":
		"This is used by $t(WordGen) presets. It cannot be modified or deleted.",
};

export default common;
