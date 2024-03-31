const lexicon = {
	// Lexicon
	beginDeleteMode:
		"Tap on items to mark them for deletion. Finish deleting by tapping"
		+ " the top floating button. Cancel by tapping the bottom floating"
		+ " button.",
	delItems_one: "Delete {{count}} Item?", // <D:H>
	delItems_other: "Delete {{count}} Items?",
	delItemsSuccess_one: "Deleted {{count}} item.", // [T:2.5]
	delItemsSuccess_other: "Deleted {{count}} items.",

	"You did not type any information into any text field.": // <D>
		"You did not type any information into any text field.",

	"Merge selected items": "Merge selected items", // {A}

	"Lexicon Title": "$t(common:Lexicon) $t(common:Title)",
	"Lexicon Title_presentation": "$t(common:Lexicon) $t(common:Title)", // presentation context will pull Title_presentation by default
	lexTitleHelperText: "Usually the language name.",
	lexDescriptionHelperText: "A short description of this lexicon.",

	lexItems_one: "{{count}} Item", // |H|
	lexItems_other: "{{count}} Items",
	lexitems_one: "{{count}} item",
	lexitems_other: "{{count}} items",

	"Lexicon Storage": "$t(common:Lexicon) Storage", // |H|
	"Clear Lexicon": "Clear $t(common:Lexicon)", // (B)
	"Saved Lexicon": "Saved $t(common:Lexicon)",
	"Lexicon Sorting": "$t(common:Lexicon) Sorting", // |H|
	sortLexDescription:
		"The Lexicon will be sorted alphabetically in the order you choose."
		+ " It sorts by the first column you choose. If two items are"
		+ " identical in that column, it will sort them by the next column in"
		+ " the sort list, and so on.",

	Sort: "Sort",
	Sort_presentation: "Sort:",

	"Delete selected lexicon items": "Delete selected lexicon items", // {A}
	"Delete multiple lexicon items": "Delete multiple lexicon items", // {A}
	"Cancel deleting": "Cancel deleting", // {A}
	"Lexicon cleared": "Lexicon cleared", // [T:4]
	"Nothing to clear": "Nothing to clear", // [T:3]
	deleteEverythingMessage: // <D>
		"This will erase everything currently displayed (but not anything"
		+ " previously saved). Are you sure you want to do this?",

	loadLexiconConfirm: // <D>
		"Are you sure you want to load this? It will overwrite your current"
		+ " lexicon and cannot be reversed.",
	"No Saved Lexicons": "No Saved Lexicons", // |H|

	"Lexicon saved as new lexicon!": "Lexicon saved as new lexicon!", // [T:2.5]
	"You must input a title before saving.": "You must input a title before saving.", // <D>
	"Please give your lexicon a title before exporting it.": // <D>
		"Please give your lexicon a title before exporting it.",
	"Please add words to your lexicon before exporting it.": // <D>
		"Please add words to your lexicon before exporting it.",

	Item: "Item", // (B)
	Column: "Column", // (B)
	"Edit Columns": "Edit Columns", // |H|
	"Lexicon Item": "$t(common:Lexicon) $t(Item)", // |H|
	"Exit Without Saving?": "Exit Without Saving?", // <D:H>
	"You have unsaved changes. Are you sure you want to exit?": // <D>
		"You have unsaved changes. Are you sure you want to exit?",

	"New": "New", // Default label for a new column
	"Are you sure you want to delete this column? This cannot be undone.": // <D>
		"Are you sure you want to delete this column? $t(common:cannotUndo)",
	"Lexicon Options": "$t(common:Lexicon) Options", // |H|
	"Show Full Column Titles": "Show Full Column Titles", // (B)

	// always presentational context:
	"Sort blank columns": "Sort blank columns:",

	"Rearrange Lexicon Columns": "Rearrange Lexicon Columns", // |H|
	// The below describe how blank columns will be sorted in the Lexicon
	"To Beginning, Always": "To Beginning, Always", // (B)
	"To End, Always": "To End, Always", // (B)
	"As Alphabetically First": "As Alphabetically First", // (B)
	"As Alphabetically Last": "As Alphabetically Last", // (B)
	// Column Info
	"Field Name": "Field Name", // {A}
	// The following labels should be kept short
	"Small": "Small", // (small column size)
	"Med": "Med", // (medium column size)
	"Large": "Large",  // (large column size)

	Changes: "Changes",
	"Working...": "Working...",
	TITLE: "TITLE", // Only used in CSV exports

	// Types of exports
	"Text, Tabbed": "Text, Tabbed",
	"Text, Semicolons": "Text, Semicolons",
	"Text, Newlines": "Text, Newlines",
	"CSV File": "CSV File",
	"CSV File, no title/description": "CSV File, no title/description",
	"JSON File": "JSON File",
	"XML File": "XML File",

	// Initial lexicon column labels
	"Word": "Word",
	"Part of Speech": "Part of Speech",
	"Definition": "Definition",

	lexiconMergeInstructions:
		"The Lexicon will be sorted alphabetically in the order you choose."
		+ " It sorts by the first column you choose. If two items are"
		+ " identical in that column, it will sort them by the next column"
		+ " in the sort list, and so on.",
	"How to Merge": "How to Merge",
	"Current merged result": "Current merged result:", // presentational context
	"Cancel Merging": "Cancel Merging", // (B)
	"Save and Merge": "Save and Merge", // (B)
	"Merge Items": "Merge Items", // |H| {A}

	merge: {
		first: "Use first non-blank value",
		last: "Use last non-blank value",
		merge: "Merge all non-blank values together",
		firstAll: "Use first value, even if it's blank",
		lastAll: "Use last value, even if it's blank",
		mergeAll: "Merge all values together, including any that are blank",
		blank: "Save nothing, leave blank"
	},

	info: {
		basic: [ // Markdown format
			"This tool is for storing the raw info of your language,",
			"whether that be words or something else. The default setup",
			"includes dictionary-style columns such as \"word\", \"part of",
			"speech\" and \"definition\", but you can add, remove, or",
			"rename columns as you see fit."
		],
		description: [ // Markdown format
			"The beginning of the page has a place where you can title your",
			"collection and give it a short description. You can toggle this",
			"entire section by using the (^) button at the top of the page."
		],
		saveCounterAndSort: [ // Markdown format
			"The save button at the top can be used to store, delete, and",
			"export entire lexicons.",
			"",
			"Below the title and description, you'll find a counter",
			"displaying how many words you have stored in your",
			"$t(common:Lexicon). Next to it is are two sort buttons, where",
			"you can choose which columns will be used to sort your",
			"collection."
		],
		editColumnsEtc: [ // Markdown format
			// Use `DRAG HANDLE` to insert the drag handle icon into the text.
			"The gear icon opens the **Edit Columns** settings. You can",
			"choose whether or not to show the columns' full names, the",
			"method you wish to use to sort the $t(common:Lexicon), and how",
			"blank columns will be handled. Below that you'll find a list of",
			"all current columns. You can edit them, delete them, add more,",
			"or use the `DRAG HANDLE` drag handles to rearrange their order.",
			"",
			"The second row contains the titles of the columns. Beneath them",
			"are input boxes for quickly adding info to the",
			"$t(common:Lexicon). Use the small (+) button to save what",
			"you've typed.",
			"",
			"Under those boxes you'll find the meat of $t(common:Lexicon):",
			"all the items you've stored. They will appear as striped rows.",
			"You can swipe left on each one to find Edit and Delete buttons."
		],
		mergeButton: [ // Markdown format
			"You can swipe right on a lexicon item to find the",
			"**Merge Items** button. You can use this to mark multiple",
			"entries. Once you've selected at least two, a large paperclip",
			"button will appear at the bottom of the page. Tapping on it will",
			"prompt you to merge the selected items into one entry.",
			"",
			"Several tools in $t(common:Conlang Toolbox) can export info into",
			"the $t(common:Lexicon). The merge function can be used to merge",
			"all this different info. Here's an example:",
			"",
			"1. You begin by naming columns in the $t(common:Lexicon)",
			"\"original\", \"changed\", and \"definition\".",
			"2. Then, you use $t(common:WordGen) to create a bunch of new",
			"words, which you export to $t(common:Lexicon) under the",
			"\"original\" column.",
			"3. Next, you change those words with $t(common:WordEvolve) and",
			"export the changed words to \"changed\".",
			"4. Then, you visit $t(common:Concepts) and export meanings to",
			"\"definition\".",
			"5. Finally, you swipe and link each \"original\", \"changed\"",
			"and \"definition\" column with each other and merge them into",
			"single entries."
		],
		toolButton: [ // Markdown format
			"At the bottom of the page, you'll find a large tool button. You",
			"can tap on it to pull up a small menu. Tap on the (+) button to",
			"pop up a large form for adding to the $t(common:Lexicon). Tap on",
			"the trash can to enter mass-delete mode, where you can select",
			"multiple entries and delete them all at once."
		],
	}
};

export default lexicon;
