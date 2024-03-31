const dj = {

	Groups: "Groups", // |H|
	Group: "Group",
	"Number of Groups_one": "{{count}} Group",
	"Number of Groups_other": "{{count}} Groups",
	Type: "Type", // |H|
	Type_presentation: "Type:",
	Declensions: "Declensions", // |H| (B) group of declensions on-screen
	Declension: "Declension", // a single Declension
	declension: "declension",
	Conjugations: "Conjugations", // |H| (B) group of conjugations on-screen
	Conjugation: "Conjugation", // a single Conjugation
	conjugation: "conjugation",
	Other: "Other", // |H| (B) group of 'other' type on-screen
	Other1: "Other", // a single instance of an 'Other' type
	other: "other",
	Forms: "Forms", // a pluralized version of 'other', mainly used in exports
	"Error in exporting: bad internal format":
		"Error in exporting: bad format (internal)",
	Equality: "Equality",
	Relation: "Relation",

	"Words to send through Declenjugator": // {A}
		"Words to send through $t(common:Declenjugator)",
	"Enter words here, one per line": "Enter words here, one per line",
	"this entire Group": "this entire Group",
	"this entire Group_formal": "This Entire Group",
	"all current groups": "all current Groups",
	"Clear All Groups?": "Clear All Groups?", // <D:H>
	"You must provide a title or description before saving.": // <D>
		"You must provide a title or description before saving.",
	"If using regular expressions you must provide both match and replacement expressions.": // <D>
		"If using regular expressions, you must provide both match and replacement expressions.",
	"You must provide at least one condition (start or end) before saving.": // <D>
		"You must provide at least one condition (start or end) before saving.",
	"You did not enter a match expression.": // <D>
		"You did not enter a match expression.",
	"Add Group": "Add Group", // |H|
	"Edit Group": "Edit Group", // |H|
	"Title Input": "Title or Description of this grouping:",
	"Type(s) of word this group affects": "Type(s) of word this group affects", // {A}
	"Type(s) of word this group affects_presentation": "Type(s) of word this group affects:",
	exampleAppliesTo: "nouns? verbs? adjectives?",
	"Use regular expressions to identify the stem.": "Use regular expressions to identify the stem.",
	"Simple Root Finder": "Simple Root Finder", // |H|
	Modification: "Modification", // |H|
	"Matching Expression": "Matching Expression", // |H|
	"Matching Expression_presentation": "Matching Expression:",
	"Replacement Expression": "Replacement Expression", // |H|
	"Replacement Expression_presentation": "Replacement Expression:",
	"Title Method_Declensions": "Title or Description of this declension:", // |H|
	"Title Method_Conjugations": "Title or Description of this conjugation:", // |H|
	"Title Method_Other": "Title or Description of this method:", // |H|
	advancedExplanation_Declensions: "Use regular expressions to craft a declension.",
	advancedExplanation_Conjugations: "Use regular expressions to craft a conjugation.",
	advancedExplanation_Other: "Use regular expressions to craft a method.",

	// appliesTo will be a user-generated string
	groupAppliesTo: "; applies to $t(appliesTo)",

	"What is Declenjugator?": "What is $t(common:Declenjugator)?", // |H|

	"You didn't select a format.": "You didn't select a format.", // <D>
	"Please choose at least one group to display.": // <D> [T:2.5]
		"Please choose at least one Group to display.",
	"Unmatched Words": "Unmatched Words", // |H|
	declenjugatorTitle: "Declension/Conjugation Title", // |H|
	declenjugatorDocumentTitle: "Declensions/Conjugations", // |H|
	declenjugatorDocumentDescription:
		"A declension/conjugation document exported from $t(common:Conlang Toolbox).",
	caseMakerInstructions:
		"Tap on terms to add them. Tap them again to remove them. Tap save button when you're finished.",
	Hide: "Hide", // (B)
	"Show More": "Show More", // (B)

	// Always presentational context:
	"Display as": "Display as:",

	"Chart, Top Headers": "Chart, Top Headers", // (B)
	"Chart, Side Headers": "Chart, Side Headers", // (B)
	Text: "Text", // (B)

	"Use Input": "Use $t(common:Input)", // |H|
	"Display the declensions/conjugations of words in the input.":
		"Display the declensions/conjugations of words in the input.",
	"Show Group Info": "Show Group Info", // |H|
	"Include general group information.": "Include general Group information.",
	"Show Examples": "Show Examples", // |H|
	"Include generic example.": "Include generic example.",
	"Sort Input": "Sort $t(common:Input)", // |H|
	"One Match": "One Match", // |H|
	"Input words can only match one method":
		"$t(common:Input) words can only match one method",
	"Show Unmatched Words": "Show Unmatched Words", // |H|
	"Display any words that were not matched by any group.":
		"Display any words that were not matched by any Group.",

	"Input Tab": "$t(common:Input) Tab", // |H|
	"Groups Tab": "Groups Tab", // |H|
	"Output Tab": "Output Tab", // |H|

	"Regular Expression": "Regular Expression", // |H|

	"This will clear and overwrite the previous save.": // <D>
		"This will clear and overwrite the previous save.",
	"Load Saved Info": "Load Saved Info", // |H|

	Export: "Export", // (B)
	Example: "Example", // |H|
	Examples: "Examples", // |H|
	Prefix: "Prefix", // |H|
	Suffix: "Suffix", // |H|
	stem: "stem", // |H|
	word: "word", // |H|
	"[word]": "[word]",
	"[stem]": "[stem]",
	"No words matched this group.": "No words matched this Group.",
	"Remove from End of Word to Find Root": "Remove from End of Word to Find Root", // {A}
	"Remove from End of Word to Find Root_presentation": "Remove from End of Word to Find Root:", // |H|
	"Remove from Start of Word to Find Root": "Remove from Start of Word to Find Root", // {A}
	"Remove from Start of Word to Find Root_presentation": "Remove from Start of Word to Find Root:", // |H|
	"Use advanced method": "Use advanced method", // |H|
	"Use entire word": "Use entire word", // |H|
	"This applies your modifications to the base word instead of the stem.":
		"This applies your modifications to the base word instead of the stem.",
	// Always presentation context:
	"Separate Multiple Conditions With": "Separate Multiple Conditions With:",
	"Choose Separator": "Choose Separator", // {A}
	Space: "[ ] Space", // (B)
	Comma: "[,] Comma", // (B)
	Semicolon: "[;] Semicolon", // (B)
	Slash: "[/] Slash", // (B)
	wordMarker: "[W]", // small notation that this declension/etc uses the "entire word" option instead of the stem/root

	// Short description describing how a declension or conjugation is found
	// Examples:
	//   matches -ar, -or
	//   matches en-oof
	//   matches /[a-z]d[aeiou]$/
	matchesParameters: "matches {{params}}",

	"1st-person": "1st-person",
	"2nd-person": "2nd-person",
	"3rd-person": "3rd-person",
	singular: "singular",
	plural: "plural",
	present: "present",

	// By default, cases will be added with a space in between them.
	// To override this, supply an array [ "case", "separator" ] instead of a string
	// .extended cases will be hidden; the user can toggle to see them
	cases: [
		{
			header: "Modifiers",
			content: [
				[ "non-", "" ],
				[ "high-", "" ],
				[ "low-", "" ],
				"formal",
				"diminutive",
				"augmentative",
				"emphatic"
			]
		},
		{
			header: "Number",
			content: [
				"singular",
				"plural",
				"dual",
				"trial",
				"paucal",
				"definite",
				"indefinite"
			]
		},
		{
			header: "Noun Case",
			content: [
				"male",
				"female",
				"neuter",
				"animate",
				"inanimate"
			]
		},
		{
			header: "Grammatical Case",
			content: [
				"nominative",
				"accusative",
				"genitive",
				"dative",
				"ablative",
				"instrumental",
				"locative"
			],
			extended: [
				"vocative",
				"ergative",
				"absolutive",
				"partitive",
				"abessive",
				"adessive",
				"allative",
				"benefactive",
				"causal",
				"comitative",
				"delative",
				"distributive",
				"elative",
				"essive",
				"illative",
				"inessive",
				"instructive",
				"interrogative",
				"semblative",
				"sociative",
				"sublative",
				"superessive",
				"temporal",
				"terminative",
				"translative",
				"proximal",
				"relative",
				"adverbial",
				"oblique",
				"prepositional"
			]
		},
		{
			header: "Person",
			content: [
				"1st-person",
				"2nd-person",
				"3rd-person",
				"1s",
				"1pl",
				"2s",
				"2pl",
				"3s",
				"3pl"
			]
		},
		{
			header: "Tense",
			content: [
				"past",
				"present",
				"future"
			]
		},
		{
			header: "Aspect",
			content: [
				"perfective",
				"imperfective",
				"perfect",
				"continuative",
				"progressive"
			],
			extended: [
				"pluperfect",
				"habitual",
				"punctual",
				"iterative",
				"completive",
				"inceptive",
				"atelic",
				"telic",
				"static"
			]
		},
		{
			header: "Mode",
			content: [
				"realis",
				"irrealis",
				"conditional",
				"subjunctive",
				"interrogative"
			],
			extended: [
				"optative",
				"deontic",
				"hypothetical",
				"imaginary",
				"potential",
				"evidentiality",
				"validationality",
				"mirativity"
			]
		},
		{
			header: "Valence",
			content: [
				"causative",
				"applicative",
				"reflexive",
				"reciprocal",
				"passive",
				"inverse",
				"anticausative",
				"antipassive"
			]
		}

	],

	info: {
		input: [ // Markdown format
			"This tab has one purpose: determining which words you want to",
			"decline or conjugate. Using this tab is entirely optional.",
			"",
			"The easiest way is to copy-paste a list of words, each on a",
			"line by itself. Or, you can use the **Import From Lexicon**",
			"button to pull in words stored in the **$t(common:Lexicon)**.",
			"",
			"Use the **$t(common:Input)** button to empty all words from",
			"$t(common:Input).",
		],
		groups: [ // Markdown format
			"This is where you define groups of declensions and conjugations.",
			"Most languages treat certain groupings of words differently when",
			"they are declined or conjugated. For instance, English only",
			"declines its pronouns for case and person while Spanish has",
			"different conjugations for verbs depending on if they end in",
			"-ar, -er, or -ir.",
			"",
			"Click the (+) button to add a new Group. When you make a Group,",
			"you must give it a title or description. You can choose to label",
			"this as a _declension_, a _conjugation_ or under _other_ if you",
			"don't want to use those labels Optionally, you can note what",
			"types of words this Group will apply to.",
			"",
			"Next, you will provide instructions on how to find the",
			"\"$t(stem)\" of the word. For example, if you were creating a",
			"conjugation for words ending in -ar, you would put \"ar\" in",
			"the box labelled \"$t(Remove from End of Word to Find Root)\".",
			"",
			"Note: You can provide multiple conditions. For instance, putting",
			"\"ar\" in both boxes will match words that begin with ar- _and_",
			"end with -ar. You can also hit the \"$t(Use advanced method)\"",
			"toggle switch to use **regular expressions** to find a $t(stem).",
			"(See the end of this section for more info on regular",
			"expressions.)",
			"",
			"---",
			"",
			"At the end of the form, you will see an \"$t(common:Add New)\"",
			"button. Use this to create the Group's individual declensions",
			"or conjugations. For simplicity, we will use the term \"method\"",
			"to mean either.",
			"",
			"First, you give the method a title. There is a small (+) button",
			"next to the input that will open a pop-up with numerous common",
			"declension and conjugation types, if you wish to use it.",
			"",
			"Below that is a toggle \"$t(Use entire word)\". If checked, the",
			"method will operate on the entire word instead of just the",
			"$t(stem).",
			"",
			"At the bottom, there are two input boxes around the word",
			"\"$t(stem)\". (This becomes \"$t(word)\" if you check the toggle",
			"above.) If this method would add a prefix, put the prefix in the",
			"box before \"$t(stem)\". If it would use a suffix, put it in the",
			"box after \"$t(stem)\". You can use both boxes for a circumfix",
			"but for infixes and other more complicated changes, you will",
			"need to use the \"advanced method\" and regular expressions.",
			"",
			"---",
			"",
			// `DRAG HANDLE` (or any other text inside backticks) will be
			//    replaced with the drag handle icon
			"Once your Groups are made, they will show up on the screen.",
			"Swipe left on them to find $t(common:Edit) and $t(common:Delete)",
			"buttons. You can also use the `DRAG HANDLE` drag handles to",
			"rearrange their order. (Note: you can't rearrange across types",
			"dragging a \"conjugation\" into the \"other\" or \"declension\"",
			"areas, for example. If you want to change its type, swipe left",
			"and choose the $t(common:Edit) button.)",
			"",
			"Here's an example of possible methods you could make for a",
			"Spanish-type conjugation:",
		],
		groupsExample: [
			{
				title: "Group",
				content: [ // Markdown format (list)
					"- **$t(common:Title)**: Conjugations (A)",
					"- **Type**: _conjugation_",
					"- **Remove from Start of Word**: (blank)",
					"- **Remove from End of Word**: ar",
				],
			},
			{
				title: "Conjugations",
				content: [ // Markdown format (list)
					"- **1st-person singular present**: $t(stem)[o]",
					"- **2nd-person singular present**: $t(stem)[as]",
					"- **3rd-person singular present**: $t(stem)[a]",
					"- **1st-person plural present**: $t(stem)[amos]",
					"- **3rd-person plural present**: $t(stem)[an]",
				],
			}
		],
		output: [ // Markdown format
			"This is where you can find the results of your work. At the top",
			"of the page, you can choose how you want the information to",
			"display, and choose if you want to display declensions",
			"conjugations, and/or other. If you want to decline/conjugate",
			"words you put in the **$t(common:Input)** tab be sure to switch",
			"the toggle on. It will open up a new set of options you can use",
			"to fine-tune the results.",
			"",
			"Click on $t(common:Generate) to display your info, or click on",
			"$t(Export) to export your info to a file. **Note**: when",
			"displaying a chart in the app, it may clip off the edge of the",
			"screen. If this happens, you can drag the chart left and right",
			"to scroll the hidden areas into view.",
		],
		overview: [ // Markdown format
			"This tool is for creating **declensions** and **conjugations**.",
			"",
			"A declension is, at its most basic, modifying a word to show its",
			"role in a sentence. $t(Declensions) may apply to nouns",
			"pronouns, adjectives, adverbs, and articles to indicate number",
			"(singular, dual, plural, etc), case (nominative",
			"accusative, genitive, dative, etc), gender (male, female",
			"inanimate, etc), and other grammatical categories. ",
			"",
			"A conjugation is much like a declension, but it modifies verbs.",
			"Like declensions, they can indicate number gender, and case, but",
			"they also often include person (I, you they, etc), tense (past,",
			"present, future, etc), aspect (perfect, imperfect, etc),",
			"mood/mode, politeness, and numerous other verb qualities.",
		],
	}

};

export default dj;
