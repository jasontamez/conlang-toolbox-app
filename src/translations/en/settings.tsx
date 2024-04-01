const settings = {

	// SETTINGS

	Data: "Data", // used by exportThing
	"Disable Confirmation Prompts": "Disable Confirmation Prompts", // |H| (B)
	"Eliminates yes/no prompts when deleting or overwriting data.":
		"Eliminates yes/no prompts when deleting or overwriting data.",
	"Change Theme": "Change Theme", // |H| (B)
	"Sort Settings": "Sort Settings", // |H| (B)
	"Import App Info": "Import App Info", // |H| (B)
	"Choose a Theme": "Choose a Theme",
	// Theme names
	Default: "Default",
	Light: "Light",
	Dark: "Dark",
	"Solarized Light": "Solarized Light", // Solarized is the name of a popular color palette
	"Solarized Dark": "Solarized Dark", // Solarized is the name of a popular color palette

	exportAllMsg: [ // Markdown format
		"Save this info to a note or file.   ",
		"You will be able to use it later to restore your data."
	],
	"Exported Data": "Exported Data", // {A}

	"What to Export": "What to Export", // |H|
	"You haven't imported anything yet.": "You haven't imported anything yet.", // <D>
	"Yes Close This": "Yes, Close This", // (B)
	successImport: "Imported new info for {{listing}}", // [T:10]
	alsoOverwrote: "; also completely overwrote storage for {{listing}}", // [T:10]
	successOverwrote: "Completely overwrote storage for {{listing}}", // [T:10]

	"Import Info": "Import Info",
	importDescription:
		"Paste your data below. This only accepts data exported through"
		+ " \"$t(common:exportThing, { thing: $t(\"common:App Info\") })\".",
	"Data to Import": "Data to Import", // {A}
	Reset: "Reset", // (B)
	Analyze: "Analyze", // (B)
	"What to Import": "What to Import", // |H|
	currentSettings: "Current {{tool}} Settings", // (B)
	storedSettings: "Stored {{tool}} Settings", // (B)
	storedDocuments: "Stored {{tool}} Documents", // (B)
	appSettings: "{{tool}} Settings", // (B)
	"Other App Settings": "Other App Settings", // (B)

	"You did not choose anything to import.": "You did not choose anything to import.", // [T:5]
	"WARNING!": "WARNING!", // <D:H>
	willOverwriteCurrent: "This will overwrite all current data in {{listing}}.", // <D>
	alsoOverwriteStorage: "It will ALSO delete and replace stored data for {{listing}}.", // <D>
	willOverwriteStorage: "This will delete and replace stored data for {{listing}}.", // <D>
	areYouVerySure: "Are you SURE you want to do this?", // <D>
	"Yes I Want to Do This": "Yes, I Want to Do This", // (B)

	// SORT SETTINGS

	"(none)": "(none)", // (B)
	"Manage Sort Methods": "Manage Sort Methods", // |H|
	"Basic Sort": "Basic Sort", // |H|
	"Use Language-Based Sort": "Use Language-Based Sort", // (B) |H|
	langSortExplanation:
		"Use a language's rules for sorting instead of using Unicode points."
		+ " (If this option is disabled, your device does not support"
		+ " language-based sorting.)",
	"Sort Language": "Sort Language:", // (B) Always presentational context
	Sort: "Sort",
	"This Sort": "This Sort", // <D:H>

	// the below display a representation of the sort option in [brackets], followed by its description (B)
	"Base letters only":
		"[ȁ = Ȁ, a = ȁ]: Base letters only", // the sort only compares the base letter, ignores case and diacritics
	Diacritics:
		"[ȁ = Ȁ, a ≠ ȁ]: Diacritics", // the sort compares the base letter and its diacritics, ignores case
	"Upper/lowercase":
		"[ȁ ≠ Ȁ, a = ȁ]: Upper/lowercase", // the sort compares the base letter and its case, ignores diacritics
	"Diacritics and upper/lowercase":
		"[ȁ ≠ Ȁ, a ≠ ȁ]: Diacritics and upper/lowercase", // the sort compares the base letter, its case, and its diacritics

	"Note[colon] This can be overriden by a language's sorting rules.":
		"Note: This can be overriden by a language's sorting rules.",
	"Using Custom Sort": "Using Custom Sort:", // presentational context
	"All Custom Sort Methods": "All Custom Sort Methods", // |H|
	"custom alphabet": "custom alphabet",
	"Custom Alphabet": "Custom Alphabet", // {A}
	// "relation" is the relationship between two characters (e.g. 'A', 'B', and 'C' are before 'D')
	relation_one: "{{count}} relation",
	relation_other: "{{count}} relations",
	// "equality" is declaring two or more characters equal (e.g. 'A' is equal to 'a')
	equality_one: "{{count}} equality",
	equality_other: "{{count}} equalities",

	// error messages
	"You must provide a title before saving.": "You must provide a title before saving.", // <D>
	"Blank alphabet provided.": "Blank alphabet provided.", // <D>
	"You did not enter any information.": "You did not enter any information.", // <D>
	"You must provide a base character.": "You must provide a \"base\" character.", // <D>
	"You must provide some equal characters.": "You must provide some \"equal\" characters.", // <D>
	"You must provide some pre or post characters.": // <D>
		"You must provide some \"pre\" or \"post\" characters.",
	"New Custom Sort": "New Custom Sort", // (B)
	"Custom Sort": "Custom Sort",
	"Title for this sort": "Title for this sort",
	"Unicode sort (language-independent)": "Unicode sort (language-independent)", // (B)
	"Sort Sensitivity": "Sort Sensitivity:", // always presentational context
	"Default sensitivity": "Default sensitivity", // (B)
	"Use alternate alphabet": "Use alternate alphabet", // (B)
	alternateAlphabetExplanation:
		"Items will be sorted according to the order you provide."
		+ " Characters not in your alphabet will be sorted according to the"
		+ " rules above.",
	"Write your alphabet here.": "Write your alphabet here.",
	"Alphabet separator": "Alphabet separator:", // presentational context

	// the below display a representation of the option in [brackets], followed by its description (B)
	"No separator":
		"[abcde]: No separator",
	Space:
		"[a b c d e]: Space",
	Comma:
		"[a,b,c,d,e]: Comma",
	Period:
		"[a.b.c.d.e]: Period",
	Semicolon:
		"[a;b;c;d;e]: Semicolon",

	Relation: "Relation",
	Relations: "Relations", // |H|
	"Similar characters that should be sorted separately.":
		"Similar characters that should be sorted separately.",
	Equality: "Equality",
	Equalities: "Equalities", // |H|
	"Characters that should be sorted together as if they were strictly equal.":
		"Characters that should be sorted together as if they were strictly equal.",
	
	// The below are presentational context
	"Base Character": "Base Character:",
	"Equal to the Base": "Equal to the Base:",
	"Characters Separator": "Characters Separator:",
	"Pre/Post Separator": "Pre/Post Separator:",
	"Sorted After the Base": "Sorted After the Base:",
	"Sorted Before the Base": "Sorted Before the Base:",
	"Equalities Separator": "Equalities Separator:",

	"Base character": "Base character", // {A}
	"The base character": "The base character",
	"Characters equal to the base": "Characters equal to the base", // {A}
	"Characters to be equal to the Base.": "Characters to be equal to the Base.",
	"Characters sorted before the base": "Characters sorted before the base", // {A}
	"End with the one just before the Base.": "End with the one just before the Base.",
	"Characters sorted after the base": "Characters sorted after the base", // {A}
	"Start with the one just after the Base.": "Start with the one just after the Base.",

};

export default settings;
