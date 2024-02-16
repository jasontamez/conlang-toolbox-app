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
	"Display[colon]": "Display:", // short label indicating the user can select an option to display
	"SavedAt": "Saved: {{time}}", // short phrase describing when something was saved
	Saved: "Saved", // message indicating something was saved to the device or to app state
	Copy: "Copy", // button that will copy something to the clipboard
	"Copy to Clipboard": "Copy to Clipboard",
	"Copied to clipboard": "Copied to clipboard",
	"Add New": "Add New",
	"Nothing to copy": "Nothing to copy",
	Export: "Export",
	"Export Info": "Export Info",
	Generate: "Generate",
	Info: "Info", // short for "Information"

	fileFormat: "{{title}} - {{date}}.{{extension}}",
	"[Untitled]": "[Untitled]",
	"exportTitle": "Export: {{title}}",
	"Unable to export": "UNABLE TO EXPORT: {{error}}",
	"File exported": "{{filename}} exported.",
	"Unable to write file": "UNABLE TO WRITE FILE: {{error}}",
	generalError: "Error saving file {{filename}} ({{error}})",
	fileSaved: "File saved as {{filename}}",

	"Exit App?": "Exit App?",
	"Do you want to exit the app?": "Do you want to exit the app?",
	"Yes, Exit!": "Yes, Exit!",

	// saveToLexColumn also takes a {{count}} in case a plural version is needed
	saveToLexColumn: "{{what}} saved to $t(Lexicon) under \"{{column}}\"",
	"Select a column": "Select a column",
	"Go to Lexicon": "Go to $t(Lexicon)",

	"Word Document (docx)": "Word Document (docx)",
	"Text File": "Text File",
	"Text File (plain)": "$t(Text File) (plain)",
	"Text File (markdown)": "$t(Text File) (markdown)",
	"Spreadsheet (csv)": "Spreadsheet (csv)",
	"Choose a Format": "Choose a Format",
	"Choose a format[colon]": "Choose a format:",
	"JSON File": "JSON File",
	"XML File": "XML File",

	cannotUndo: "This cannot be undone.", // This action, usually deleting something, cannot be undone.
	areYouSure: "Are you sure?", // Do you want to do this action?
	"Are you sure you want to delete this? This cannot be undone.":
		"Are you sure you want to delete this? $t(cannotUndo)",
	delItem: "Delete \"{{what}}\"?",
	"Delete Everything?": "Delete Everything?",
	confirmDelIt: "Yes, Delete It",  // "It" might refer to many things
	confirmDel_one: "$t(confirmDelIt)",  // "It" might refer to many things
	confirmDel_other: "Yes, Delete Them", // "Them" might refer to many things
	confirmLoad: "Yes, Load It", // "It" may refer to many things
	"Yes, Exit": "Yes, Exit",
	"Nothing to save.": "Nothing to save.",
	"Delete This": "Delete This",
	Delete: "Delete",
	Edit: "Edit",
	"Unsaved Info": "Unsaved Info",
	"Are you sure you want to discard this?": "Are you sure you want to discard this?",
	"Yes, Discard": "Yes, Discard",
	"Clear Input": "Clear Input",
	"Are you sure? This will clear the entire input, and cannot be undone.":
		"$t(areYouSure) This will clear the entire input, and cannot be undone.",
	"Yes, Clear It": "Yes, Clear It",

	"Default sort": "Default sort", // Refers to the default sort method, whatever it may be

	"You need to add columns to the Lexicon before you can add anything to it.":
		"You need to add columns to the $t(Lexicon) before you can add anything to it.",

	error: "Error",
	emphasizedError: "<$t(error)>",

	"You did not type any information into any text field.":
		"You did not type any information into any text field.",

	Loading: "Loading",
	"Working...": "Working...",
	"Please wait...": "Please wait...",

	TITLE: "TITLE",
	Title: "Title",
	"Title[colon]": "Title:",
	Description: "Description",
	"Description[colon]": "$t(Description):",

	// Import from Lexicon
	Import: "Import",
	"Import from Lexicon": "Import from $(Lexicon)",
	"Import from which column(s)?": "Import from which column(s)?",
	"Lexicon Has No Columns": "Lexicon Has No Columns",
	"Add Conditions (optional)": "Add Conditions (optional)",
	"Word must contain [x]": "Word must contain [x]",
	"Type part of word here.": "Type part of word here.",
	"Word must match expression [x]": "Word must match expression [x]",
	"Type regular expression here.": "Type regular expression here.",
	"Column [x] must contain [y]": "Column [x] must contain [y]",
	"Test column[colon]": "Test column:",
	"Column [x] must match expression [y]": "Column [x] must match expression [y]",
	"Words that contain[colon]": "Words that contain:",
	"Words that match:": "Words that match:",
	"Words where the column:": "Words where the column:",
	columnContains: "[{{column}}] contains \"{{test}}\"",
	columnMatches: "[{{column}}] matches /{{test}}/",
	"Match all conditions": "Match all conditions",
	"If off, this will import words that match any condition.": "If off, this will import words that match any condition.",
	"Exit Without Importing?": "Exit Without Importing?",
	"Please select at least one column to import from.": "Please select at least one column to import from.",
	"Did not find anything to import.": "Did not find anything to import.",
	importSuccess_one: "Imported {{count}} word from $(Lexicon).",
	importSuccess_other: "Imported {{count}} words from $(Lexicon).",

	// REGULAR EXPRESSIONS
	"Regular Expressions": "Regular Expressions", // title of section
	"regular expressions": "regular expressions", // plural, generic
	"Regexes": "Regexes", // plural, generic, starts a sentence, shorter version of Regular Expressions
	"regular expression": "regular expression", // single instance

	regex1p1: "To put it as simply as possible, a ",
		// regular expressions
	regex1p2: " is a sequence of characters that specifies a match pattern in text. ",
		// Regexes
	regex1p3: " are found in many programming languages and text editors. ",
		// Conlang Toolbox
	regex1p4: " uses JavaScript-style regexes without the surrounding slash characters.",

	regex2:
		`Fully explaining regular expressions is a topic that's too complicated for this
		app to cover, but they are very useful. Here are some resources where you can
		learn more about them:`,

	// The following are link/name pairs. You may update them to point to a
	//  resource in the translated language. If no such resource exists, you
	//  can either note that the link is in English, or you can leave the URL
	//  blank, which will cause it not to appear in the app.
	regex3url: "https://en.wikipedia.org/wiki/Regular_expression",
	regex3text: "Wikipedia: Regular Expression",
	regex4url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions#writing_a_regular_expression_pattern",
	regex4text: "MDN: Writing a regular expression",
	regex5url: "https://www.regular-expressions.info",
	regex5text: "Regular-Expressions.info (a tutorial site)",
	regex6url: "https://www.geeksforgeeks.org/write-regular-expressions/",
	regex6text: "Geeks for Geeks: Write Reguar Expressions",

	// PERMANENT INTO
	"WG Presets Sorter": "$t(WG) Presets Sorter", // Title of the permanent sort method in sort settings.

	// The key below is used when someone tries to edit or delete the permanent sort method in sort settings.
	"This is used by WordGen presets. It cannot be modified or deleted.":
		"This is used by $t(WordGen) presets. It cannot be modified or deleted.",
};

export default common;
