import characters from "./characters";

/*
PLURALITY:
	Some terms will end in _one or _other. They always have a `count` property that can be used if needed.
		dog_one = 1 dog
		dog_other = 0 dogs, 2+ dogs, etc
	Other languages may have their own plurality _endings. Check your i18n specifications.

CONTEXTS:
	Some terms may be used in a specific context.

	dog = Normal use, e.g. "dog"
	dog_filename = Must consist of only characters safe to use in a filename.
		(this is generally anything except \/:*?"<>|), e.g. "dog"
	dog_formal = This is being used as a proper name or otherwise has
		importance. In English, this simply means Capitalizing Most Words,
		e.g. "Dog"
	dog_presentation = This is a user-facing term that is
		"pointing" at...
			* important information
			* a text box
			* a selectable option
			* a toggleable option
			* etc.
		In English, I add a colon on the end of the formal term, e.g. "Dog:"

LEGEND:
	🟥 Headers (important text in the app, possibly placed in the toolbar)
	🔴 button or option text
	🟡 dialog box messages (yes/no prompts, alerts, etc)
	🟨 dialog box headers
	[T:x] toast messages (popups that disappear on their own in `x` seconds)
	🔵 ARIA labels (accessibility messages, not visible to the average user)

	Keys without any of these notes are only shown on-screen in plain text.

	Button text should be kept short. Dialog box text should be clear and concise.
	Text headers should be relatively short and are usually capitalized. Dialog
	box headers should be kept reasonably short. Users should be able to read toast
	messages before `x` seconds have expired.
*/

const common = {

	// 🟥 title, subtitle of the App
	appTitle: "Conlang Toolbox",
	appTitle_filename: "ConlangToolbox",
	appSubtitle: "tools for language invention",

	// 🟥 name of tool
	MorphoSyntax: "MorphoSyntax",

	// 🟥 name of tool - word + generator
	WordGen: "WordGen",
	WordGen_filename: "WordGen",

	// 🟥 name of tool - word + evolve
	WordEvolve: "WordEvolve",
	WordEvolve_filename: "WordEvolve",

	// 🟥 name of tool - declension + conjugation
	Declenjugator: "Declenjugator",
	Declenjugator_filename: "Declenjugator",

	// 🟥 name of tool
	Lexicon: "Lexicon",
	Lexicon_filename: "Lexicon",

	// 🟥 name of tool
	Concepts: "Concepts",

	// 🟥 name of tool
	ExtraChars: "ExtraChars",

	// 🟥 page names
	AppInfo: "App Info",
	AppSettings: "App Settings",
	Main: "Main",

	// 🟥 title of some pages
	Overview: "Overview", 
	Settings: "Settings",
	Input: "Input",
	Output: "Output",
	Info: "Info", // short for "Information"

	// 🔴 title of some buttons
	Cancel: "Cancel",                // abandon the current action
	Clear: "Clear",                  // remove all current information
	Save: "Save",                    // save current information
	Ok: "Ok",                        // general acknowledgement
	Done: "Done",                    // use has finished and does not need to continue
	Close: "Close",                  // close the open modal/dialog/whatever
	Help: "Help",                    // show "help" documentation
	AddAndClose: "Add and Close",    // add a new item and close this modal
	AddNew: "Add New",            // add a new item; may imply that the current modal will remain open
	Copy: "Copy",                    // copy something to the clipboard
	Generate: "Generate",            // the tool will create something new
	SaveAsNew: "Save as New",    // save current info as a new document
	CopyToClipboard:
		"Copy to Clipboard",         // the button will copy something to the clipboard

	// This term should be treated as the `presentational` context
	Display: "Display:", // short label indicating the user can select an option to display

	SavedAt: "Saved: {{time}}", // short phrase describing when something was saved

	// Toast and Alert messages
	"Copied to clipboard": "Copied to clipboard",// 🟦1.5🟦 result message
	"Nothing to copy": "Nothing to copy",        // 🟦1.5🟦 error message

	Untitled: "[Untitled]", // used as a document title if no title is provided
	fileFormat: "{{title}} - {{date}}.{{extension}}", // safe for use as a filename
	"Unable to export": "UNABLE TO EXPORT: {{error}}", // 🟦10🟦
	"File exported": "{{filename}} exported.", // 🟦5🟦
	"Unable to write file": "UNABLE TO WRITE FILE: {{error}}", // 🟦10🟦
	generalError: "Error saving file {{filename}} ({{error}})", // 🟦5🟦
	fileSaved: "File saved as {{filename}}", // 🟦5🟦

	// lists of things
	andGlue: ", ", // this is put between items in a list
	andFinal: ", and ", // put between the penultimate and the last item in a list
	joinTwo: "{{one}} and {{two}}", // used when there are only two items in a list

	// Exit the App messages
	"Exit App?": "Exit App?", // 🟨
	"Do you want to exit the app?": "Do you want to exit the app?", // 🟡
	"Yes Exit!": "Yes, Exit!", // 🔴

	// Saving words to the Lexicon from other tools
	saveToLexColumn_one: "{{count}} word saved to $t(Lexicon) under \"{{column}}\"", // 🟦3.5🟦
	saveToLexColumn_other: "{{count}} words saved to $t(Lexicon) under \"{{column}}\"", // 🟦3.5🟦
	"Select a column": "Select a column",
	"Go to Lexicon": "Go to $t(Lexicon)", // 🟦3.5🟦+🔴
	"Tap words you want to save to Lexicon.": "Tap words you want to save to $t(Lexicon).", // 🟦2.5🟦
	"Your selected words will be added to the Lexicon under that column.": // 🟡
		"Your selected words will be added to the $t(Lexicon) under that column.",

	// Exporting files
	"Choose a format": "Choose a Format", // 🟨 and 🟥
	"Choose a format_presentation": "Choose a format:",

	// Types of file exports
	"Word Document (docx)": "Word Document (docx)",
	"Text File": "Text File",
	"Text File (plain)": "$t(Text File) (plain)",
	"Text File (markdown)": "$t(Text File) (markdown)",
	"Spreadsheet (csv)": "Spreadsheet (csv)",
	"JSON File": "JSON File",
	"XML File": "XML File",

	"Characters to be copied": "Characters to be copied", // 🔵

	// Things will take `count` properties for plurality, but the exact number will usually be expressed
	//   in the `things` property itself
	thingsDeleted_one: "{{things}} deleted.", // 🟦2.5🟦
	thingsDeleted_other: "{{things}} deleted.",

	// General Things are unknown: may be 0, 1, or any number
	clearOverwriteGeneralThings: "This will clear and overwrite {{things}}.", // 🟡
	saveGeneralThings: "Save {{things}}", // 🟥 🔴

	// Singular Things
	thingAdded: "{{thing}} added.", // 🟦2🟦
	thingSaved: "{{thing}} saved.", // 🟦2🟦
	thingDeleted: "{{thing}} deleted.", // 🟦2.5🟦
	thingEdited: "{{thing}} edited.", // 🟦2🟦 🟨
	deleteThing: "Delete {{thing}}", // 🔴 🟨
	editThing: "Edit {{thing}}", // (H)
	addThing: "Add {{thing}}", // 🟥 🔴
	saveThing: "Save {{thing}}", // 🔴
	loadThing: "Load {{thing}}", // 🟥
	missingThing: "Missing {{thing}}", // 🟨
	exportThing: "Export {{thing}}", // 🟥
	exportThing_presentation: "Export {{thing}}:",

	// Titled things
	deleteTitleQ: "Delete \"{{title}}\"?", // 🟨
	loadTitleQ: "Load \"{{title}}\"?", // 🟨
	titleSaved: "\"{{title}}\" saved.", // 🟦2.5🟦
	titleAlreadyExists: "\"{{title}}\" already exists.", // 🟨
	titleLoaded: "\"{{title}}\" loaded.", // 🟦2.5🟦
	titleNotFound: "\"{{title}}\" not found.", // 🟡
	titleDeleted: "\"{{title}}\" deleted.", // 🟦2.5🟦
	titleOverwritten: "\"{{title}}\" overwritten.", // 🟦2.5🟦

	// "It" refers to saved info from WG, WE, or Declenjugation
	"Yes Overwrite It": "Yes, Overwrite It", // 🔴

	"the previous save": "the previous save",
	"Load Error": "Load Error", // 🟨
	"Manage Custom Info": "Manage Custom Info", // 🟥
	"Current Info": "Current Info",
	"Name of save": "Name of save",
	"Name your custom info": "Name your custom info",
	Load: "Load", // 🔴
	"No saved info": "No saved info",

	"Sort method": "Sort method",
	"Sort method_presentation": "Sort method:",

	cannotUndo: "This cannot be undone.", // 🟡 This action, usually deleting something, cannot be undone.
	areYouSure: "Are you sure?", // 🟡 Do you want to do this action?
	deleteThisCannotUndo: "Are you sure you want to delete this? $t(cannotUndo)", // 🟡
	"Clear Everything?": "Clear Everything?", // 🟨
	"Delete Everything?": "Delete Everything?", // 🟨

	// in confirmDel, the thing/things being deleted might be...
	//    custom meanings in Concepts
	//    Lexicon items
	//    Character Groups in WG and WE
	//    Transformations in WG and WE
	//    Syllables in WG
	confirmDel_one: "Yes, Delete It", // 🔴
	confirmDel_other: "Yes, Delete Them", // 🔴

	// in confirmDelIt, "It" might refer to...
	//    Character Groups in WG and WE
	//    Sound Changes in WE
	//    Transformations in WG and WE
	//    saved Custom Info in WG, WE, Declenjugator, Lexicon, and MorphoSyntax
	//    all info in MorphoSyntax or Lexicon
	//    Lexicon columns and items
	//    Custom Sorts, or one of their relations or equalities
	//    Declenjugator groups, or the separate declensions/etc within one
	confirmDelIt: "Yes, Delete It", // 🔴

	// "It" may refer to saved Custom Info in WG, WE, Declenjugator, Lexicon, or MorphoSyntax
	confirmLoad: "Yes, Load It", // 🔴

	// "This" gets slotted into 'deleteThing' and may refer to...
	//    Custom Sorts, or one of their relations or equalities
	//    Declenjugator groups, or the separate declensions/etc within one
	This: "This",

	"Yes Exit": "Yes, Exit", // 🔴
	"Nothing to save.": "Nothing to save.", // 🟦2.5🟦
	Delete: "Delete", // 🔴
	Edit: "Edit", // 🔴
	Deleted: "Deleted", // 🟦2🟦
	"Unsaved Info": "Unsaved Info", // 🟨

	"Are you sure you want to discard this?": // 🟡 when deciding not to add a new thing
		"Are you sure you want to discard this?",
	"Are you sure you want to discard your edits?": // 🟡 when deciding not to edit an existing thing
		"Are you sure you want to discard your edits?",
	"Yes Discard": "Yes, Discard", // 🔴
	"Are you sure? This will clear the entire input and cannot be undone.": // 🟡
		"$t(areYouSure) This will clear the entire input, and cannot be undone.",
	// "It" refers to the Input in Declenjugator and WE
	"Yes Clear It": "Yes, Clear It", // 🔴

	"Default sort": "Default sort", // 🔴 Refers to the default sort method, whatever it may be

	"You need to add columns to the Lexicon before you can add anything to it.": // 🟡
		"You need to add columns to the $t(Lexicon) before you can add anything to it.",

	error: "Error",
	emphasizedError: "<$t(error)>", // 🟥

	regexpError: "Error trying to parse \"{{regex}}\"", // 🟨

	Loading: "Loading", // 🟥
	"Please wait...": "Please wait...", // 🟥

	title: "title",
	Title: "Title", // 🔵 🟥
	"Title_presentation": "Title:",
	Description: "Description", // 🟥 🔵
	Description_presentation: "Description:",

	overviewOf: "Overview: {{what}}", // 🟥

	ImportFrom: "Import from {{source}}", // 🔴 🟥 🟨 source is always Lexicon, WordGen or WordEvolve
	"Load Preset": "Load Preset", // 🔴

	// Import from Lexicon (to WG or WE)
	Import: "Import", // 🔴
	"Import from which columns": "Import from which column(s)?", // 🟨
	"Lexicon Has No Columns": "Lexicon Has No Columns", // 🟥
	optional: "(optional)",
	"Add Conditions optional": "Add Conditions $t(optional)",
	"Word must contain [x]": "Word must contain [x]",
	"Type part of word here.": "Type part of word here.",
	"Word must match expression [x]": "Word must match expression [x]",
	"Type regular expression here.": "Type regular expression here.",
	"Column [x] must contain [y]": "Column [x] must contain [y]",
	"Column [x] must match expression [y]": "Column [x] must match expression [y]",
	Condition: "Condition",

	// These terms should be treated as the `presentational` context
	"Test column": "Test column:", // 🟥 the column being tested for a match
	"Words that contain": "Words that contain:", // 🟥
	"Words that match": "Words that match:", // 🟥
	"Words where the column": "Words where the column:", // 🟥

	columnContains: "[{{column}}] contains \"{{test}}\"",
	columnMatches: "[{{column}}] matches /{{test}}/",
	"Match all conditions": "Match all conditions", // 🟥
	"If off, this will import words that match any condition.": "If off, this will import words that match any condition.",
	"Exit Without Importing?": "Exit Without Importing?", // 🟨
	"Please select at least one column to import from.": "Please select at least one column to import from.", // 🟦2.5🟦
	"Did not find anything to import.": "Did not find anything to import.", // 🟦4.5🟦
	importSuccess_one: "Imported {{count}} word from $t(Lexicon).", // 🟦3.5🟦
	importSuccess_other: "Imported {{count}} words from $t(Lexicon).",
	yesImport: "Yes, Import", // 🔴

	regexpInfo: [ // Markdown format
		"To put it as simply as possible, a regular expression is a",
		"sequence of characters that specifies a match pattern in text.",
		"$t(appTitle) uses JavaScript-style regexes without the",
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
	"No longer copying directly to clipboard.": "No longer copying directly to clipboard.", // 🟦2.5🟦
	"Now copying immediately to clipboard.": "Now copying immediately to clipboard.", // 🟦2.5🟦
	copiedCharToClipboard: "Copied {{char}} to clipboard", // 🟦1.5🟦 only one character was copied
	Favorites: "Favorites", // 🔴
	"Start favoriting characters" : "Start favoriting characters", // 🔵
	"Stop favoriting characters" : "Stop favoriting characters", // 🔵
	"Now saving characters to Favorites": "Now saving characters to $t(Favorites)", // [T:2,5]
	"No longer saving to Favorites": "No longer saving to $t(Favorites)", // 🟦2.5🟦
	"Tap characters to add them here": "Tap characters to add them here",
	"Show full character names": "Show full character names", // 🔵
	"Hide full character names": "Hide full character names", // 🔵

	extraHelp: { // Markdown format
		help1p1:[
			"This is a place to find and copy characters that may not be",
			"easily accessible to you on your device's keyboard. The other",
			"buttons can be toggled for additional effects:"
		],
		help1p2:[
			"When active, copies any character you tap directly to the",
			"clipboard. When inactive, copies tapped characters to the",
			"copy-bar below, where you can copy them at your leisure."
		],
		help1p3:[
			"When active, tapping on a character adds or removes it from your",
			"Favorites list. Characters will not be copied to the clipboard",
			"or the copy-bar."
		],
		help1p4:[
			"When active, shows the standard Unicode name of every character.",
			"When inactive, the characters are presented by themselves."
		],
		help2: [
			"Tap a character set below to see the characters in that set."
		],
		help3: [
			"Characters will display below. Tap them to copy them to the",
			"copy-bar above."
		],
	},
	characterInfo: characters,

	// PERMANENT INFO - Title of the permanent sort method in sort settings.
	"WG Presets Sorter": "WG Presets Sorter", // 🔴 "WG" stands for "WordGen"

	// The key below is used when someone tries to edit or delete the permanent sort method in sort settings.
	"This is used by WordGen presets. It cannot be modified or deleted.": // 🟡
		"This is used by $t(WordGen) presets. It cannot be modified or deleted.",
};

export default common;
