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
	dog_presentational = This is a user-facing term that is
		"pointing" at...
			* important information
			* a text box
			* a selectable option
			* a toggleable option
			* etc.
		In English, I add a colon on the end of the formal term, e.g. "Dog:"

LEGEND:
	|H| Headers (important text in the app, possibly placed in the toolbar)
	(B) button or option text
	<D> dialog box messages (yes/no prompts, alerts, etc)
	<D:H> dialog box headers
	[T:x] toast messages (popups that disappear on their own in `x` seconds)
	{A} ARIA labels (accessibility messages, not visible to the average user)

	Keys without any of these notes are only shown on-screen in plain text.

	Button text should be kept short. Dialog box text should be clear and concise.
	Text headers should be relatively short and are usually capitalized. Dialog
	box headers should be kept reasonably short. Users should be able to read toast
	messages before `x` seconds have expired.
*/

const common = {

	// |H| title, subtitle of the App
	"Conlang Toolbox": "Conlang Toolbox",
	"Conlang Toolbox_filename": "ConlangToolbox",
	"tools for language invention": "tools for language invention",

	// |H| name of tool
	MorphoSyntax: "MorphoSyntax",

	// |H| name of tool - word + generator
	WordGen: "WordGen",
	WordGen_filename: "WordGen",

	// |H| name of tool - word + evolve
	WordEvolve: "WordEvolve",
	WordEvolve_filename: "WordEvolve",

	// |H| name of tool - declension + conjugation
	Declenjugator: "Declenjugator",
	Declenjugator_filename: "Declenjugator",

	// |H| name of tool
	Lexicon: "Lexicon",
	Lexicon_filename: "Lexicon",

	// |H| name of tool
	Concepts: "Concepts",

	// |H| name of tool
	"Extra Characters": "Extra Characters",

	// |H| page names
	"App Info": "App Info",
	Settings: "Settings",
	"App Settings": "App Settings",
	Main: "Main",

	// |H| title of some pages
	Overview: "Overview", 
	Input: "Input",
	Output: "Output",
	Info: "Info", // short for "Information"

	// (B) title of some buttons
	Cancel: "Cancel",                // abandon the current action
	Clear: "Clear",                  // remove all current information
	Save: "Save",                    // save current information
	Ok: "Ok",                        // general acknowledgement
	Done: "Done",                    // use has finished and does not need to continue
	Close: "Close",                  // close the open modal/dialog/whatever
	Help: "Help",                    // show "help" documentation
	"Add and Close": "Add and Close",// add a new item and close this modal
	"Add New": "Add New",            // add a new item; may imply that the current modal will remain open
	Copy: "Copy",                    // copy something to the clipboard
	Generate: "Generate",            // the tool will create something new
	"Save as New": "Save as New",    // save current info as a new document
	"Copy to Clipboard":
		"Copy to Clipboard",         // the button will copy something to the clipboard

	// This term should be treated as the `presentational` context
	Display: "Display:", // short label indicating the user can select an option to display

	"SavedAt": "Saved: {{time}}", // short phrase describing when something was saved

	// Toast and Alert messages
	"Copied to clipboard": "Copied to clipboard",// [T:1.5] result message
	"Nothing to copy": "Nothing to copy",        // [T:1.5] error message

	"[Untitled]": "[Untitled]", // used as a document title if no title is provided
	fileFormat: "{{title}} - {{date}}.{{extension}}", // safe for use as a filename
	"Unable to export": "UNABLE TO EXPORT: {{error}}", // [T:10]
	"File exported": "{{filename}} exported.", // [T:5]
	"Unable to write file": "UNABLE TO WRITE FILE: {{error}}", // [T:10]
	generalError: "Error saving file {{filename}} ({{error}})", // [T:5]
	fileSaved: "File saved as {{filename}}", // [T:5]

	// lists of things
	andGlue: ", ", // this is put between items in a list
	andFinal: ", and ", // put between the penultimate and the last item in a list
	joinTwo: "{{one}} and {{two}}", // used when there are only two items in a list

	// Exit the App messages
	"Exit App?": "Exit App?", // <D:H>
	"Do you want to exit the app?": "Do you want to exit the app?", // <D>
	"Yes Exit!": "Yes, Exit!", // (B)

	// Saving words to the Lexicon from other tools
	saveToLexColumn_one: "{{count}} word saved to $t(Lexicon) under \"{{column}}\"", // [T:3.5]
	saveToLexColumn_other: "{{count}} words saved to $t(Lexicon) under \"{{column}}\"", // [T:3.5]
	"Select a column": "Select a column",
	"Go to Lexicon": "Go to $t(Lexicon)", // [T:3.5]+(B)
	"Tap words you want to save to Lexicon.": "Tap words you want to save to $t(Lexicon).", // [T:2.5]
	"Your selected words will be added to the Lexicon under that column.": // <D>
		"Your selected words will be added to the $t(Lexicon) under that column.",

	// Exporting files
	"Choose a format": "Choose a Format", // <D:H> and |H|
	"Choose a format_presentation": "Choose a format:",

	// Types of file exports
	"Word Document (docx)": "Word Document (docx)",
	"Text File": "Text File",
	"Text File (plain)": "$t(Text File) (plain)",
	"Text File (markdown)": "$t(Text File) (markdown)",
	"Spreadsheet (csv)": "Spreadsheet (csv)",
	"JSON File": "JSON File",
	"XML File": "XML File",

	"Characters to be copied": "Characters to be copied", // {A}

	// Things will take `count` properties for plurality, but the exact number will usually be expressed
	//   in the `things` property itself
	deleteThingsCannotUndo_one: "This will delete {{things}}, and cannot be undone.", // <D>
	deleteThingsCannotUndo_other: "This will delete {{things}}, and cannot be undone.",
	thingsDeleted_one: "{{things}} deleted.", // [T:2.5]
	thingsDeleted_other: "{{things}} deleted.",

	// General Things are unknown: may be 0, 1, or any number
	clearOverwriteGeneralThings: "This will clear and overwrite {{things}}.", // <D>
	saveGeneralThings: "Save {{things}}", // |H| (B)

	// Singular Things
	thingAdded: "{{thing}} added.", // [T:2]
	thingSaved: "{{thing}} saved.", // [T:2]
	thingDeleted: "{{thing}} deleted.", // [T:2.5]
	thingEdited: "{{thing}} edited.", // [T:2] <D:H>
	deleteThing: "Delete {{thing}}", // (B) <D:H>
	editThing: "Edit {{thing}}", // (H)
	addThing: "Add {{thing}}", // |H| (B)
	saveThing: "Save {{thing}}", // (B)
	loadThing: "Load {{thing}}", // |H|
	missingThing: "Missing {{thing}}", // <D:H>
	exportThing: "Export {{thing}}", // |H|
	exportThing_presentation: "Export {{thing}}:",

	// Titled things
	deleteTitleQ: "Delete \"{{title}}\"?", // <D:H>
	loadTitleQ: "Load \"{{title}}\"?", // <D:H>
	titleSaved: "\"{{title}}\" saved.", // [T:2.5]
	titleAlreadyExists: "\"{{title}}\" already exists.", // <D:H>
	titleLoaded: "\"{{title}}\" loaded.", // [T:2.5]
	titleNotFound: "\"{{title}}\" not found.", // <D>
	titleDeleted: "\"{{title}}\" deleted.", // [T:2.5]
	titleOverwritten: "\"{{title}}\" overwritten.", // [T:2.5]

	// "It" refers to saved info from WG, WE, or Declenjugation
	"Yes Overwrite It": "Yes, Overwrite It", // (B)

	"the previous save": "the previous save",
	"Load Error": "Load Error", // <D:H>
	"Manage Custom Info": "Manage Custom Info", // |H|
	"Current Info": "Current Info",
	"Name of save": "Name of save",
	"Name your custom info": "Name your custom info",
	Load: "Load", // (B)
	"No saved info": "No saved info",

	"Sort method": "Sort method",
	"Sort method_presentation": "Sort method:",

	cannotUndo: "This cannot be undone.", // <D> This action, usually deleting something, cannot be undone.
	areYouSure: "Are you sure?", // <D> Do you want to do this action?
	deleteThisCannotUndo: "Are you sure you want to delete this? $t(cannotUndo)", // <D>
	"Clear Everything?": "Clear Everything?", // <D:H>
	"Delete Everything?": "Delete Everything?", // <D:H>

	// in confirmDel, the thing/things being deleted might be...
	//    custom meanings in Concepts
	//    Lexicon items
	//    Character Groups in WG and WE
	//    Transformations in WG and WE
	//    Syllables in WG
	confirmDel_one: "Yes, Delete It", // (B)
	confirmDel_other: "Yes, Delete Them", // (B)

	// in confirmDelIt, "It" might refer to...
	//    Character Groups in WG and WE
	//    Sound Changes in WE
	//    Transformations in WG and WE
	//    saved Custom Info in WG, WE, Declenjugator, Lexicon, and MorphoSyntax
	//    all info in MorphoSyntax or Lexicon
	//    Lexicon columns and items
	//    Custom Sorts, or one of their relations or equalities
	//    Declenjugator groups, or the separate declensions/etc within one
	confirmDelIt: "Yes, Delete It", // (B)

	// "It" may refer to saved Custom Info in WG, WE, Declenjugator, Lexicon, or MorphoSyntax
	confirmLoad: "Yes, Load It", // (B)

	// "This" gets slotted into 'deleteThing' and may refer to...
	//    Custom Sorts, or one of their relations or equalities
	//    Declenjugator groups, or the separate declensions/etc within one
	This: "This",

	"Yes Exit": "Yes, Exit", // (B)
	"Nothing to save.": "Nothing to save.", // [T:2.5]
	Delete: "Delete", // (B)
	Edit: "Edit", // (B)
	Deleted: "Deleted", // [T:2]
	"Unsaved Info": "Unsaved Info", // <D:H>

	"Are you sure you want to discard this?": // <D> when deciding not to add a new thing
		"Are you sure you want to discard this?",
	"Are you sure you want to discard your edits?": // <D> when deciding not to edit an existing thing
		"Are you sure you want to discard your edits?",
	"Yes Discard": "Yes, Discard", // (B)
	"Are you sure? This will clear the entire input and cannot be undone.": // <D>
		"$t(areYouSure) This will clear the entire input, and cannot be undone.",
	// "It" refers to the Input in Declenjugator and WE
	"Yes Clear It": "Yes, Clear It", // (B)

	"Default sort": "Default sort", // (B) Refers to the default sort method, whatever it may be

	"You need to add columns to the Lexicon before you can add anything to it.": // <D>
		"You need to add columns to the $t(Lexicon) before you can add anything to it.",

	error: "Error",
	emphasizedError: "<$t(error)>", // |H|

	regexpError: "Error trying to parse \"{{regex}}\"", // <D:H>

	Loading: "Loading", // |H|
	"Please wait...": "Please wait...", // |H|

	title: "title",
	Title: "Title", // {A} |H|
	"Title_presentation": "Title:",
	Description: "Description", // |H| {A}
	Description_presentation: "Description:",

	overviewOf: "Overview: {{what}}", // |H|

	ImportFrom: "Import from {{source}}", // (B) |H| <D:H> source is always Lexicon, WordGen or WordEvolve
	"Load Preset": "Load Preset", // (B)

	// Import from Lexicon (to WG or WE)
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
	"Column [x] must match expression [y]": "Column [x] must match expression [y]",
	Condition: "Condition",

	// These terms should be treated as the `presentational` context
	"Test column": "Test column:", // the column being tested for a match
	"Words that contain": "Words that contain:",
	"Words that match": "Words that match:",
	"Words where the column": "Words where the column:",

	columnContains: "[{{column}}] contains \"{{test}}\"",
	columnMatches: "[{{column}}] matches /{{test}}/",
	"Match all conditions": "Match all conditions",
	"If off, this will import words that match any condition.": "If off, this will import words that match any condition.",
	"Exit Without Importing?": "Exit Without Importing?",
	"Please select at least one column to import from.": "Please select at least one column to import from.",
	"Did not find anything to import.": "Did not find anything to import.",
	importSuccess_one: "Imported {{count}} word from $t(Lexicon).",
	importSuccess_other: "Imported {{count}} words from $t(Lexicon).",
	yesImport: "Yes, Import",

	// REGULAR EXPRESSIONS
	"Regular Expression": "Regular Expression", // title of section
	"Regular Expressions": "Regular Expressions", // title of section
	"Regular expressions": "Regular expressions", // start of sentence
	"regular expressions": "regular expressions", // plural, generic
	"Regexes": "Regexes", // plural, generic, starts a sentence, shorter version of Regular Expressions
	"regular expression": "regular expression", // single instance

	regexpInfo: [ // Markdown format
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
	copiedCharToClipboard: "Copied {{char}} to clipboard", // only one character was copied
	Favorites: "Favorites",
	"Start favoriting characters" : "Start favoriting characters",
	"Stop favoriting characters" : "Stop favoriting characters",
	"Now saving characters to Favorites": "Now saving characters to $t(Favorites)",
	"No longer saving to Favorites": "No longer saving to $t(Favorites)",
	"Tap characters to add them here": "Tap characters to add them here",
	"Show full character names": "Show full character names",
	"Hide full character names": "Hide full character names",

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

	// PERMANENT INTO
	"WG Presets Sorter": "WG Presets Sorter", // Title of the permanent sort method in sort settings.

	// The key below is used when someone tries to edit or delete the permanent sort method in sort settings.
	"This is used by WordGen presets. It cannot be modified or deleted.":
		"This is used by $t(WordGen) presets. It cannot be modified or deleted.",
};

export default common;
