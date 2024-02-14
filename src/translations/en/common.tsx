const common = {

	"Conlang Toolbox": "Conlang Toolbox", // name of the App
	Controls: "Controls", // the buttons used in the app
	MorphoSyntax: "MorphoSyntax", // name of tool
	WordGen: "WordGen", // name of tool - word + generator
	WG: "WG", // shorthand for WordGen
	WordEvolve: "WordEvolve", // name of tool - word + evolve
	WE: "WG", // shorthand for WordEvolve
	Declenjugator: "Declenjugator", // name of tool - declension + conjugation
	Lexicon: "Lexicon", // name of tool
	Concepts: "Concepts", // name of tool
	"App Info": "App Info",
	Settings: "Settings",
	"App Settings": "App Settings",
	Overview: "Overview",
	Stop: "Stop",
	Cancel: "Cancel",
	Save: "Save",
	Ok: "Ok",
	Done: "Done", // finished, completed, etc.
	Close: "Close", // close the open modal/dialog/whatever
	"Display[colon]": "Display:", // short label indicating the user can select an option to display
	"SavedAt": "Saved: {{time}}", // short phrase describing when something was saved
	Copy: "Copy", // button that will copy something to the clipboard
	"Copied to clipboard": "Copied to clipboard",
	"Add New": "Add New",

	// saveToLexColumn also takes a {{count}} in case a plural version is needed
	saveToLexColumn: "{{what}} saved to $t(Lexicon) under \"{{column}}\"",
	"Select a column": "Select a column",
	"Go to Lexicon": "Go to $t(Lexicon)",

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

	"Choose a format[colon]": "Choose a format:",

	TITLE: "TITLE",
	Title: "Title",
	"Title[colon]": "Title:",
	Description: "Description",
	"Description[colon]": "$t(Description):",

	// PERMANENT INTO
	"WG Presets Sorter": "$t(WG) Presets Sorter", // Title of the permanent sort method in sort settings.

	// The key below is used when someone tries to edit or delete the permanent sort method in sort settings.
	"This is used by WordGen presets. It cannot be modified or deleted.":
		"This is used by $t(WordGen) presets. It cannot be modified or deleted.",
};

export default common;
