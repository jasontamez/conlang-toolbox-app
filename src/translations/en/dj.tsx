const dj = {

	Groups: "Groups",
	Group: "Group",
	Group_one: "Group",
	Group_other: "Groups",
	Type: "Type",
	"Type[colon]": "$t(Type):",
	Declensions: "Declensions", // group of declensions on-screen
	Declension: "Declension", // single declension on-screen
	Declensions_one: "Declension", // single declension on-screen
	Declensions_other: "Declensions", // multiple declensions on-screen
	Conjugations: "Conjugations", // group of conjugations on-screen
	Conjugation: "Conjugation", // single conjugation on-screen
	Conjugations_one: "Conjugation", // single conjugation on-screen
	Conjugations_other: "Conjugations", // multiple conjugations on-screen
	Other: "Other", // group of 'other' type on-screen
	Other_one: "Other", // single 'other' type on-screen
	Other_other: "Other", // multiple 'other' types on-screen
	Forms: "Forms", // a pluralized version of 'other', mainly used in exports
	"Error in exporting: bad format (internal)":
		"Error in exporting: bad format (internal)",
	declension: "declension",
	declensions: "declensions",
	conjugation: "conjugation",
	conjugations: "conjugation",
	other: "other",
	method: "declension/conjugation/etc.",
	method_one: "$t(method)",
	method_other: "declensions/conjugations/etc.",
	Equality: "Equality",
	Relation: "Relation",

	"Words to send through Declenjugator":
		"Words to send through $t(common:Declenjugator)",
	"Enter words here, one per line": "Enter words here, one per line",
	"this entire Group": "this entire $t(Group)",
	"all current groups": "all current $t(Groups)",
	"Clear All Groups?": "Clear All $t(Groups)?",
	"This will delete all current groups, and it cannot be undone.":
		"This will delete all current $t(Groups), and it cannot be undone.",
	"Yes Delete Them": "Yes, Delete Them",
	"You must provide a title or description before saving.":
		"You must provide a title or description before saving.",
	"If using regular expressions you must provide both match and replacement expressions.":
		"If using $t(common:regular expressions), you must provide both match and replacement expressions.",
	"You must provide at least one condition (start or end) before saving.":
		"You must provide at least one condition (start or end) before saving.",
	"You did not enter a match expression.":
		"You did not enter a match expression.",
	"Add Group": "Add $t({{type}}) Group",
	"Edit Group": "Edit $t({{type}}) Group",
	"Title Input": "Title or Description of this $t({{type}}) grouping:",
	"Type(s) of word this group affects[colon]": "Type(s) of word this group affects:",
	exampleAppliesTo: "nouns? verbs? adjectives?",
	"Use regular expressions to identify the stem.": "Use regular expressions to identify the stem.",
	"Simple Root Finder": "Simple Root Finder",
	Modification: "Modification",
	"Matching Expression[colon]": "Matching Expression:",
	"Replacement Expression[colon]": "Replacement Expression:",
	"Title Method": "Title or Description of this $t({{method}}):",

	groupAppliesTo: "; applies to $t(appliesTo)",

	"What is Declenjugator?": "What is $t(common:Declenjugator)?",

	"You didn't select a format.": "You didn't select a format.",
	"Please choose at least one group to display.":
		"Please choose at least one $t(Group) to display.",
	"Unmatched Words": "Unmatched Words",
	declenjugatorTitle: "$t(Declensions_one)/$t(Conjugations_one) Title",
	declenjugatorDocumentTitle: "$t(Declensions)/$t(Conjugations)",
	declenjugatorDocumentDescription:
		"A $t(declension)/$t(conjugation) document exported from $t(common:Conlang Toolbox).",
	caseMakerInstructions:
		"Tap on terms to add them. Tap them again to remove them. Tap save button when you're finished.",
	Hide: "Hide",
	"Show More": "Show More",

	"Display as[colon]": "Display as:",
	"Chart, Top Headers": "Chart, Top Headers",
	"Chart, Side Headers": "Chart, Side Headers",
	Text: "Text",

	"Use Input": "Use $t(common:Input)",
	"Display the declensions/conjugations of words in the input.":
		"Display the $t(declensions)/$t(conjugations) of words in the input.",
	"Show Group Info": "Show $t(Group) Info",
	"Include general group information.": "Include general $t(Group) information.",
	"Show Examples": "Show Examples",
	"Include generic example.": "Include generic example.",
	"Sort Input": "Sort $t(common:Input)",
	"One Match": "One Match",
	"Input words can only match one <method>":
		"$t(common:Input) words can only match one $t(method)",
	"Show Unmatched Words": "Show Unmatched Words",
	"Display any words that were not matched by any group.":
		"Display any words that were not matched by any $t(Group).",

	"Input Tab": "$t(common:Input) Tab",
	"Groups Tab": "$t(Groups) Tab",
	"Output Tab": "Output Tab",
	"Overview[colon] Declenjugator": "$t(common:Overview): $t(common:Declenjugator)",

	Example: "Example",
	Examples: "Examples",
	Prefix: "Prefix",
	Suffix: "Suffix",
	stem: "stem",
	word: "word",
	"[word]": "[word]",
	"[stem]": "[stem]",
	"No words matched this group.": "No words matched this $t(Group).",
	"Remove from End of Word": "Remove from End of Word",
	"Remove from End of Word to Find Root": "Remove from End of Word to Find Root",
	"Remove from End of Word to Find Root[colon]": "Remove from End of Word to Find Root:",
	"Remove from Start of Word": "Remove from Start of Word",
	"Remove from Start of Word to Find Root": "Remove from Start of Word to Find Root",
	"Remove from Start of Word to Find Root[colon]": "Remove from Start of Word to Find Root:",
	"advanced method": "advanced method",
	"Use advanced method": "Use advanced method",
	advancedExplanation: "Use regular expressions to craft a $t({{method}}).",
	"Use entire word": "Use entire word",
	"This applies your modifications to the base word instead of the stem.":
		"This applies your modifications to the base word instead of the stem.",
	"Add New": "Add New",
	"Separate Multiple Conditions With[colon]": "Separate Multiple Conditions With:",
	"Choose Separator": "Choose Separator",
	Space: "[ ] Space",
	Comma: "[,] Comma",
	Semicolon: "[;] Semicolon",
	Slash: "[/] Slash",
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
	"(blank)": "(blank)",

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
		input: [
			"This tab has one purpose: determining which words you want to",
			"decline or conjugate. Using this tab is entirely optional.",
			"",
			"The easiest way is to copy-paste a list of words, each on a",
			"line by itself. Or, you can use the",
			"**$t(common:Import From Lexicon)** button to pull in words",
			"stored in the **$t(common:Lexicon)**.",
			"",
			"Use the **$t(common:Input)** button to empty all words from",
			"$t(common:Input).",
		],
		groups: [
			"This is where you define groups of $t(declensions) and",
			"$t(conjugations). Most languages treat certain groupings of",
			"words differently when they are declined or conjugated. For",
			"instance, English only declines its pronouns for case and person",
			"while Spanish has different $t(conjugations) for verbs depending",
			"on if they end in -ar, -er, or -ir.",
			"",
			"Click the (+) button to add a new $t(Group). When you make a",
			"$t(Group), you must give it a title or description. You can",
			"choose to label this as a _$t(declension)_, a _$t(conjugation)_",
			"or under _$t(other)_ if you don't want to use those labels.",
			"Optionally, you can note what types of words this $t(Group) will",
			"apply to.",
			"",
			"Next, you will provide instructions on how to find the",
			"\"$t(stem)\" of the word. For example, if you were creating a",
			"$t(conjugation) for words ending in -ar, you would put \"ar\" in",
			"the box labelled \"$t(Remove from End of Word to Find Root)\".",
			"",
			"Note: You can provide multiple conditions. For instance, putting",
			"\"ar\" in both boxes will match words that begin with ar- _and_",
			"end with -ar. You can also hit the \"$t(Use advanced method)\"",
			"toggle switch to use **$t(common:regular expressions)** to find",
			"a $t(stem). (See the end of this section for more info on",
			"$t(common:regular expressions).)",
			"",
			"---",
			"",
			"At the bottom of the form, you will see an \"$t(Add New)\"",
			"button. Use this to create the $t(Group)'s individual",
			"$t(declensions) or $t(conjugations). For simplicity, we will use",
			"the term \"method\" to mean either.",
			"",
			"First, you give the method a title. There is a small (+) button",
			"next to the input that will open a pop-up with numerous common",
			"$t(declension) and $t(conjugation) types, if you wish to use it.",
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
			"but for infixes and $t(other) more complicated changes, you will",
			"need to use the \"$t(advanced method)\" and",
			"$t(common:regular expressions).",
			"",
			"---",
			"",
			// `DRAG HANDLE` (or any other text inside backticks) will be
			//    replaced with the drag handle icon
			"Once your $t(Groups) are made, they will show up on the screen.",
			"Swipe left on them to find $t(common:Edit) and $t(common:Delete)",
			"buttons. You can also use the `DRAG HANDLE` drag handles to",
			"rearrange their order. (Note: you can't rearrange across types",
			"dragging a \"$t(conjugation)\" into the \"$t(other)\" or",
			"\"$t(declension)\" areas, for example. If you want to change its",
			"type, swipe left and choose the $t(common:Edit) button.)",
			"",
			"Here's an example of possible methods you could make for a",
			"Spanish-type $t(conjugation):",
		],
		groupsExample: [
			{
				title: "Group",
				content: [
					"- **$t(common:Title)**: Conjugations (A)",
					"- **$t(Type)**: _$t(conjugation)_",
					"- **$t(Remove from Start of Word)**: (blank)",
					"- **$t(Remove from End of Word)**: ar",
				],
			},
			{
				title: "Conjugations",
				content: [
					"- **$t(1st-person) $t(singular) $t(present)**: $t(stem)[o]",
					"- **$t(2nd-person) $t(singular) $t(present)**: $t(stem)[as]",
					"- **$t(3rd-person) $t(singular) $t(present)**: $t(stem)[a]",
					"- **$t(1st-person) $t(plural) $t(present)**: $t(stem)[amos]",
					"- **$t(3rd-person) $t(plural) $t(present)**: $t(stem)[an]",
				],
			}
		],
		output: [
			"This is where you can find the results of your work. At the top",
			"of the page, you can choose how you want the information to",
			"display, and choose if you want to display $t(declensions)",
			"$t(conjugations), and/or $t(other). If you want to",
			"decline/conjugate words you put in the **$t(common:Input)** tab",
			"be sure to switch the toggle on. It will open up a new set of",
			"options you can use to fine-tune the results.",
			"",
			"Click on $t(common:Generate) to display your info, or click on",
			"$t(common:Export) to export your info to a file. **Note**: when",
			"displaying a chart in the app, it may clip off the edge of the",
			"screen. If this happens, you can drag the chart left and right to",
			"scroll the hidden areas into view.",
		],
		overview: [
			"This tool is for creating **$t(declensions)** and",
			"**$t(conjugations)**.",
			"",
			"A $t(declension) is, at its most basic, modifying a word to",
			"show its role in a sentence. $t(Declensions) may apply to nouns",
			"pronouns, adjectives, adverbs, and articles to indicate number",
			"($t(singular), dual, $t(plural), etc), case (nominative",
			"accusative, genitive, dative, etc), gender (male, female",
			"inanimate, etc), and other grammatical categories. ",
			"",
			"A $t(conjugation) is much like a $t(declension), but it",
			"modifies verbs. Like $t(declensions), they can indicate number",
			"gender, and case, but they also often include person (I, you",
			"they, etc), tense (past, $t(present), future, etc), aspect",
			"(perfect, imperfect, etc), mood/mode, politeness, and numerous",
			"other verb qualities.",
		],
	}

};

export default dj;