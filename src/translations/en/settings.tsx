const settings = {

	// SETTINGS

	"Export All Data": "Export All Data",
	"Disable Confirmation Prompts": "Disable Confirmation Prompts",
	"Eliminates yes/no prompts when deleting or overwriting data.":
		"Eliminates yes/no prompts when deleting or overwriting data.",
	"Change Theme": "Change Theme",
	"Sort Settings": "Sort Settings",
	"Export App Info": "Export App Info",
	"Import App Info": "Import App Info",
	"Choose a Theme": "Choose a Theme",
	// Theme names
	"Default": "Default",
	Light: "Light",
	Dark: "Dark",
	"Solarized Light": "Solarized $t(Light)", // Solarized is the name of a popular color palette
	"Solarized Dark": "Solarized $t(Dark)", // Solarized is the name of a popular color palette

	exportAllMsg1: "Save this info to a note or file.",
	exportAllMsg2: "You will be able to use it later to restore your data.",
	"Exported Data": "Exported Data",

	"What to Export": "What to Export",
	"You haven't imported anything yet.": "You haven't imported anything yet.",
	"Yes Close This": "Yes, Close This",
	"Error validating Import": "Error validating Import",
	successImport: "Imported new info for {{listing}}",
	alsoOverwrote: "; also completely overwrote storage for {{listing}}",
	successOverwrote: "Completely overwrote storage for {{listing}}",

	Import: "Import",
	"Import Info": "Import Info",
	importDescription:
		`Paste your data below. This only accepts data exported through
		"$t(Export App Info)".`,
	"Data to Import": "Data to Import",
	Reset: "Reset",
	Analyze: "Analyze",
	"What to Import": "What to Import",
	currentSettings: "Current {{tool}} Settings",
	storedSettings: "Stored {{tool}} Settings",
	storedDocuments: "Stored {{tool}} Documents",
	appSettings: "{{tool}} Settings",
	"Other App Settings": "Other App Settings",
	
	"You did not choose anything to import.": "You did not choose anything to import.",
	"WARNING!": "WARNING!",
	willOverwriteCurrent: "This will overwrite all current data in {{listing}}.",
	alsoOverwriteStorage: "It will ALSO delete and replace stored data for {{listing}}.",
	willOverwriteStorage: "This will delete and replace stored data for {{listing}}.",
	areYouVerySure: "Are you SURE you want to do this?",
	"Yes I Want to Do This": "Yes, I Want to Do This",

	// SORT SETTINGS

	"(none)": "(none)",
	"Manage Sort Methods": "Manage Sort Methods",
	"Basic Sort": "Basic Sort",
	"Use Language-Based Sort": "Use Language-Based Sort",
	langSortExplanation:
		`Use a language's rules for sorting instead of using Unicode points.
		(If this option is disabled, your device does not support
		language-based sorting.)`,
	"Sort Language[colon]": "Sort Language:",
	"Base letters only":
		"[ȁ = Ȁ, a = ȁ]: Base letters only",
	Diacritics:
		"[ȁ = Ȁ, a ≠ ȁ]: Diacritics",
	"Upper/lowercase":
		"[ȁ ≠ Ȁ, a = ȁ]: Upper/lowercase",
	"Diacritics and upper/lowercase":
		"[ȁ ≠ Ȁ, a ≠ ȁ]: Diacritics and upper/lowercase",
	"Note[colon] This can be overriden by a language's sorting rules.":
		"Note: This can be overriden by a language's sorting rules.",
	"Using Custom Sort[colon]": "Using Custom Sort:",
	"All Custom Sort Methods": "All Custom Sort Methods",
	"custom alphabet": "custom alphabet",
	"Custom Alphabet": "Custom Alphabet",
	// "relation" is the relationship between two characters (e.g. 'A', 'B', and 'C' are before 'D')
	relation_one: "{{count}} relation",
	relation_other: "{{count}} relations",
	// "equality" is declaring two or more characters equal (e.g. 'A' is equal to 'a')
	equality_one: "{{count}} equality",
	equality_other: "{{count}} equalities",

	// error messages
	"You must provide a title before saving.": "You must provide a title before saving.",
	"Blank alphabet provided.": "Blank alphabet provided.",
	"You did not enter any information.": "You did not enter any information.",
	"You must provide a base character.": "You must provide a \"base\" character.",
	"You must provide some equal characters.": "You must provide some \"equal\" characters.",
	"Custom Sort": "Custom Sort",
	"Title for this sort": "Title for this sort",
	"Unicode sort (language-independent)": "Unicode sort (language-independent)",
	"Sort Sensitivity[colon]": "Sort Sensitivity:",
	"Default sensitivity": "Default sensitivity",
	"Use alternate alphabet": "Use alternate alphabet",
	alternateAlphabetExplanation:
			`Items will be sorted according to the order you provide.
			Characters not in your alphabet will be sorted according to the
			rules above.`,
	"Write your alphabet here.": "Write your alphabet here.",
	"Alphabet separator[colon]": "Alphabet separator:",
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
	Relations: "Relations",
	"Similar characters that should be sorted separately.":
		"Similar characters that should be sorted separately.",
	Equalities: "Equalities",
	"Characters that should be sorted together as if they were strictly equal.":
		"Characters that should be sorted together as if they were strictly equal.",
	"Base Character[colon]": "Base Character:",
	"Base character": "Base character",
	"The base character": "The base character",
	"Equal to the Base[colon]": "Equal to the Base:",
	"Characters equal to the base": "Characters equal to the base",
	"Characters to be equal to the Base.": "Characters to be equal to the Base.",
	"Characters Separator[colon]": "Characters Separator:",
	"You must provide some pre or post characters.":
		"You must provide some \"pre\" or \"post\" characters.",
	"Sorted Before the Base[colon]": "Sorted Before the Base:",
	"Characters sorted before the base": "Characters sorted before the base",
	"End with the one just before the Base.": "End with the one just before the Base.",
	"Sorted After the Base[colon]": "Sorted After the Base:",
	"Characters sorted after the base": "Characters sorted after the base",
	"Start with the one just after the Base.": "Start with the one just after the Base.",
	"Pre/Post Separator[colon]": "Pre/Post Separator:",
	"Equalities Separator[colon]": "Equalities Separator:",

};

export default settings;
