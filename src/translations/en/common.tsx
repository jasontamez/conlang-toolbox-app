const common = {

	Controls: "Controls", // the buttons used in the app
	WordGen: "WordGen", // name of tool
	WG: "WG", // shorthand for WordGen
	Lexicon: "Lexicon", // name of tool
	Concepts: "Concepts", // name of tool
	Stop: "Stop",
	Cancel: "Cancel",
	Save: "Save",
	Ok: "Ok",
	"Display[colon]": "Display:", // short label indicating the user can select an option to display

	// saveToLexColumn also takes a {{count}} in case a plural version is needed
	saveToLexColumn: "{{what}} saved to $t(Lexicon) under \"{{column}}\"",
	"Select a column": "Select a column",
	"Go to Lexicon": "Go to $t(Lexicon)",

	cannotUndo: "This cannot be undone.", // This action, usually deleting something, cannot be undone.
	confirmDel_one: "Yes, Delete It",  // "It" might refer to many things
	confirmDel_other: "Yes, Delete Them", // "Them" might refer to many things


	"You need to add columns to the Lexicon before you can add anything to it.":
		"You need to add columns to the $t(Lexicon) before you can add anything to it.",



	// PERMANENT INTO
	"WG Presets Sorter": "$t(WG) Presets Sorter", // Title of the permanent sort method in sort settings.

	// The key below is used when someone tries to edit or delete the permanent sort method in sort settings.
	"This is used by WordGen presets. It cannot be modified or deleted.":
		"This is used by $t(WordGen) presets. It cannot be modified or deleted.",
};

export default common;
