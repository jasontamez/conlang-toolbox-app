const lexicon = {
	// Lexicon
	beginDeleteMode:
		`Tap on items to mark them for deletion. Finish deleting by tapping
		the top floating button. Cancel by tapping the bottom floating button.`,
	delItems_one: "Delete {{count}} Item?",
	delItems_other: "Delete {{count}} Items?",
	delItemsMessage_one: "The selected meaning will be removed. $t(common:cannotUndo)",
	delItemsMessage_other: "The selected meanings will be removed. $t(common:cannotUndo)",
	delItemsSuccess_one: "Deleted {{count}} item.",
	delItemsSuccess_other: "Deleted {{count}} items.",

	"Merge selected items": "Merge selected items",

	"Lexicon Title": "$t(common:Lexicon) $t(common:Title)",
	"Lexicon Title_presentation": "$t(common:Lexicon) $t(common:Title):",
	lexTitleHelperText: "Usually the language name.",
	lexDescriptionHelperText: "A short description of this lexicon.",

	lexItems_one: "{{count}} Item",
	lexItems_other: "{{count}} Items",
	lexitems_one: "{{count}} item",
	lexitems_other: "{{count}} items",

	"Lexicon Storage": "$t(common:Lexicon) Storage",
	"Clear Lexicon": "Clear $t(common:Lexicon)",
	"Saved Lexicon": "Saved $t(common:Lexicon)",
	"Lexicon Sorting": "$t(common:Lexicon) Sorting",
	sortLexDescription:
		`The Lexicon will be sorted alphabetically in the order you choose.
		It sorts by the first column you choose. If two items are identical
		in that column, it will sort them by the next column in the
		sort list, and so on.`,

	"Sort": "Sort",
	"Sort_presentation": "Sort:",

	"multiple lexicon items": "multiple lexicon items",
	"Delete selected lexicon items": "Delete selected lexicon items",
	"Cancel deleting": "Cancel deleting",
	"Lexicon cleared": "Lexicon cleared",
	"Nothing to clear": "Nothing to clear",
	deleteEverythingMessage:
		`This will erase everything currently displayed (but not anything
		previously saved). Are you sure you want to do this?`,

	loadLexiconConfirm:
		`Are you sure you want to load this? It will overwrite your current
		lexicon and cannot be reversed.`,
	"No Saved Lexicons": "No Saved Lexicons",

	"Lexicon saved as new lexicon!": "Lexicon saved as new lexicon!",
	"You must input a title before saving.": "You must input a title before saving.",
	"Please give your lexicon a title before exporting it.":
		"Please give your lexicon a title before exporting it.",
	"Please add words to your lexicon before exporting it.":
		"Please add words to your lexicon before exporting it.",

	Item: "Item",
	Column: "Column",
	Columns: "Columns",
	"Lexicon Item": "$t(common:Lexicon) $t(Item)",
	"Exit Without Saving?": "Exit Without Saving?",
	"You have unsaved changes. Are you sure you want to exit?":
		"You have unsaved changes. Are you sure you want to exit?",

	"New": "New", // Default label for a new column
	"Are you sure you want to delete this column? This cannot be undone.":
		"Are you sure you want to delete this column? $t(common:cannotUndo)",
	"Lexicon Options": "$t(common:Lexicon) Options",
	"Show Full Column Titles": "Show Full Column Titles",

	"Sort blank columns": "Sort blank columns",
	"Sort blank columns_presentation": "Sort blank columns:",
	"Rearrange Lexicon Columns": "Rearrange Lexicon Columns",
	// The below describe how blank columns will be sorted in the Lexicon
	"To Beginning, Always": "To Beginning, Always",
	"To End, Always": "To End, Always",
	"As Alphabetically First": "As Alphabetically First",
	"As Alphabetically Last": "As Alphabetically Last",
	// Column Info
	"Field Name": "Field Name",
	// The following labels should be kept short
	"Small": "Small",
	"Med": "Med",
	"Large": "Large",
	// The following fields can be left longer
	"Small size": "Small size",
	"Medium size": "Medium size",
	"Large size": "Large size",

	Changes: "Changes",

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
		`The Lexicon will be sorted alphabetically in the order you choose. It
		sorts by the first column you choose. If two items are identical in
		that column, it will sort them by the next column in the sort list,
		and so on.`,
	"How to Merge": "How to Merge",
	"Current merged result": "Current merged result",
	"Current merged result_presentation": "Current merged result:",
	"Cancel Merging": "Cancel Merging",
	"Save and Merge": "Save and Merge",
	"Merge Items": "Merge Items",

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
		basic:
			`This tool is for storing the raw info of your language, whether
			that be words or something else. The default setup includes
			dictionary-style columns such as "word", "part of speech" and
			"definition", but you can add, remove, or rename columns as you
			see fit.`,
		description:
			`At the top of the page is a place where you can title your
			collection and give it a short description. You can toggle this
			entire section by using the (^) button at the top of the page.`,
		saveButton:
			`The save button at the top can be used to store, delete, and
			export entire lexicons.`,
		counterAndSort:
			`At the top of the $t(common:Lexicon) you'll find a counter
			displaying how many words you have stored. Next to it is are two
			sort buttons, where you can choose which columns will be used to
			sort your collection.`,
		editColumns1:
			`The gear icon opens the "Edit Columns" settings. You can choose
			whether or not to show the columns' full names, the method you
			wish to use to sort the $t(common:Lexicon), and how blank columns
			will be handled. Below that you'll find a list of all current
			columns. You can edit them, delete them, add more, or use the `,
		// <drag handle icon>
		editColumns2: " drag handles to rearrange their order.",
		secondRow:
			`The second row contains the titles of the columns. Beneath them
			are input boxes for quickly adding info to the $t(common:Lexicon).
			Use the small (+) button to save what you've typed.`,
		mainLexicon:
			`Under those boxes you'll find the meat of $t(common:Lexicon):
			all the items you've stored. They will appear as striped rows.
			You can swipe left on each one to find Edit and Delete buttons.`,
		toolButton:
			`At the bottom of the page, you'll find a large tool button. You
			can tap on it to pull up a small menu. Tap on the (+) button to
			pop up a large form for adding to the $t(common:Lexicon). Tap on
			the trash can to enter mass-delete mode, where you can select
			multiple entries and delete them all at once.`,
		mergeButton1: "You can swipe right on a lexicon item to find the ",
		mergeButtonTitle: "Merge",
		mergeButton2:
			` button. You can use this to mark multiple entries. Once you've
			selected at least two, a large paperclip button will appear at
			the bottom of the page. Tapping on it will prompt you to merge
			the selected items into one entry.`,
		exportExample1: "Several tools in ",
		// "Conlang Toolbox"
		exportExample2:
			` can export info into the $t(common:Lexicon). The merge function
			can be used to merge all this different info. Here's an example:`,
		exampleList1:
			`You begin by naming columns in the $t(common:Lexicon) "original",
			"changed", and "definition".`,
		exampleList2p1: "Then, you use ",
		// "WordGen"
		exampleList2p2:
			` to create a bunch of new words, which you export to
			$t(common:Lexicon) under the "original" column.`,
		exampleList3p1: "Next, you change those words with ",
		// "WordEvolve"
		exampleList3p2: " and export the changed words to \"changed\".",
		exampleList4p1: "Then, you visit ",
		// "Concepts"
		exampleList4p2: " and export meanings to \"definition\".",
		exampleList5:
			`Finally, you swipe and link each "original", "changed" and
			"definition" column with each other and merge them into
			single entries.`
	}
};

export default lexicon;
