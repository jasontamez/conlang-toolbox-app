const we = {

	Evolve: "Evolve",

	"Sound Change": "Sound Change",
	"Sound Changes": "Sound Changes",
	"Sound Changes Tab": "$t(Sound Changes) Tab",

	// takes a `count` for plurality
	"sChange_one": "sound change",
	"sChange_other": "sound changes",
	"SChange_one": "Sound Change",
	"SChange_other": "Sound Changes",
	"all current sound changes": "all current $t(sChange, { \"count\": {{count}} })",

	"Convert input to lowercase before evolving": "Convert input to lowercase before evolving",
	"Sort input before evolving": "Sort input before evolving",

	"GR": "%Group reference",
	"GR_one": "%Group reference",
	"GR_other": "%Group references",

	Context: "Context",
	Anticontext: "Anticontext",
	noUnderscore: "{{what}} must contain one underscore (_)",
	multiUnderscore: "{{what}} can only have one underscore (_)",
	wordBoundaryError: "{{what}} can only have word-boundaries (#) at the beginning and/or end",

	"sound change description": "Description of the $t(sChange_one)",
	"sound change description_presentation": "$t(SChange_one) $t(common:description_formal):",

	Overview: "Overview: $t(common:WordEvolve)",
	"What is WordEvolve?": "What is WordEvolve?",

	"Words to Evolve": "Words to Evolve",

	"Input Tab": "$t(common:Input) Tab",
	"Enter words here one per line": "Enter words here, one per line",
	runs: "runs",

	"Clear Input": "Clear Input",

	"You have no sound changes defined.": "You have no sound changes defined.",
	"You have no input words to evolve.": "You have no input words to evolve.",

	"sound to change": "sound to change",
	"sound changes into this": "sound changes into this",
	"where the change happens": "where the change happens",
	"where the change cannot happen": "where the change cannot happen",

	"input expression": "input expression",
	"Input Expression": "Input Expression",
	"Input Expression_presentation": "Input Expression:",
	"output expression": "output expression",
	"Output Expression": "Output Expression",
	"Output Expression_presentation": "Output Expression:",
	"Transformation Direction": "Transformation Direction",
	"Transformation Direction_presentation": "Transformation Direction:",
	"transformation direction": "$t(wgwe:trans_one) direction",
	"At input then undo at output": "At input, then undo at output",
	"At input then undo at output_formal": "At Input, Then Undo At Output",
	"At input and at output": "At input and at output",
	"At input and at output_formal": "At Input and At Output",
	"At input only": "At input only",
	"At input only_formal": "At Input Only",
	"At output only": "At output only",
	"At output only_formal": "At Output Only",
	"context expression": "context expression",
	"context expression_formal": "Context Expression",
	"context expression_presentation": "Context Expression:",
	"exception expression": "exception expression",
	"exception expression_formal": "Exception Expression",
	"exception expression_presentation": "Exception Expression:",
	"Output Only": "$t(common:Output) only",
	"Output and Sound-Change Rules": "$t(common:Output) and Sound-Change Rules",
	"Input then Output": "$t(common:Input), then $t(common:Output)",
	"Output then Input": "$t(common:Output), then $t(common:Input)",

	allThings: "all current $t(wgwe:charGroup_other), $t(wgwe:trans_other) and $t(sChange_other)",


	// PRESETS

	"Grassmann's Law": "Grassmann's Law",
	"Ruki Rule": "Ruki Rule",
	"Dahl's Law": "Dahl's Law",
	"Ingvaeonic Nasal Spirant Law": "Ingvaeonic Nasal Spirant Law",
	"Grim's Law": "Grim's Law",
	"Great English Vowel Shift": "Great English Vowel Shift",
	"High German Consonant Shift": "High German Consonant Shift",

	"Unvoiced Consonants": "Unvoiced Consonants",
	"Voiced Consonants": "Voiced Consonants",
	"Vowels": "Vowels",
	"New Vowels": "New Vowels",

	info: {
		input: [
			"This tab has one purpose: determining which words you want to",
			"change.",
			"",
			"The easiest way is to copy-paste a list of words, each on a line",
			"by itself. Or, you can use the",
			"**Import from Lexicon** button to pull in words",
			"stored in the **$t(common:Lexicon)**.",
			"",
			"Use the **$t(common:Clear)** button to empty all words from",
			"$t(common:Input)."
		],

		charGroups: [
			"This is where you define groups of characters representing",
			"sounds. You can reference these $t(wgwe:charGroup_other) in",
			"**$t(wgwe:Transformations_other)** and **$t(Sound Changes)** to",
			"fine-tune the way your language evolves.",
			"",
			"Click the (+) button to add a new $t(wgwe:charGroup_one). When",
			"you make a $t(wgwe:charGroup_one), you must give it a",
			"_description_ and a one-character _label_.",
			"The description is for your own benefit, while the",
			"label will be used to refer to this",
			"$t(wgwe:charGroup_one) in the other tabs. The label can",
			"be any single character except for these: **^$\\()[]{}.*+?|**.",
			"The letters/characters in your $t(wgwe:charGroup_one) are called",
			"a _run_."
		],

		// `anything` in backticks will be replaced with the icon for a drag hande
		transformations: [
			"There may be cases when you need to modify the input words",
			"before you evolve them. A common reason would be to turn a",
			"group of characters (such as \"sh\", \"th\", or \"ng\" in",
			"English) into a single character that can be targeted more",
			"easily.",
			"",
			"When you make a new _$t(wgwe:trans_one)_, you provide an",
			"_$t(input expression)_, a _$t(transformation direction)_,",
			"an _$t(output expression)_, and, optionally, a",
			"_$t(wgwe:transformation description)_ for your own benefit.",
			"",
			"The _$t(transformation direction)_ is either",
			"\"$t(At input then undo at output)\",",
			"\"$t(At input and at output)\", \"$t(At input only)\", or",
			"\"$t(At output only)\", and they determine how the two",
			"expressions are used.",
			"",
			"**$t(At input only):** Before anything else happens, input words",
			"are searched, and any instances of the _$t(input expression)_",
			"are replaced with the _$t(output expression)_.",
			"**$t(common:Regular expressions)** (see the",
			"**$t(Sound Changes Tab)**'s help section)",
			"and $t(GR_other) are allowed in the",
			"_$t(input expression)_ only. (A $t(GR) is something like %G to",
			"indicate any character in $t(wgwe:charGroup_one) C's",
			"run, or !%G to indicate any character _not_ in that",
			"run.)",
			"",
			"**$t(At output only):** After all **$t(sChange_other)** are",
			"processed, any instances of the _$t(input expression)_ are",
			"replaced with the _$t(output expression)_.",
			"$t(common:Regular expressions) and $t(GR_other) are allowed in",
			"the _$t(input expression)_ only.",
			"",
			"**$t(At input then undo at output):** Before anything else",
			"happens, input words are searched, and any instances of the",
			"_$t(input expression)_ are replaced with the",
			"_$t(output expression)_. After all **$t(sChange_other)** are",
			"processed, any instances of the _$t(output expression)_ are",
			"replaced with the _$t(input expression)_.",
			"",
			"$t(common:Regular expressions) are not allowed, but non-negative",
			"$t(GR_other) are allowed if and only if both input and output",
			"have them. In that case, something special happens: when the",
			"$t(wgwe:trans_one) matches a character in a",
			"$t(wgwe:charGroup_one), it will note what position that",
			"character is in the $t(wgwe:charGroup_one)'s run. It will then",
			"look at the other expression's $t(wgwe:charGroup_one) and pick",
			"out the character in the same position.",
			"",
			"For example: If %S is being replaced with %Z, and those",
			"$t(wgwe:charGroup_other) have $t(runs) \"ptk\" and \"bdg\",",
			"\"p\" will be replaced with \"b\", \"t\" will be replaced with",
			"\"d\", and \"k\" will be replaced by \"g\". If the first",
			"$t(wgwe:charGroup_one) has more letters than the second, the",
			"second $t(wgwe:charGroup_one)'s run will be repeated",
			"until it's long enough to find a match.",
			"",
			"NOTE: If you have unequal numbers of $t(GR_other) in the",
			"search and replacement expressions, errors may occur.",
			"",
			"**$t(At input and at output):** As",
			"_$t(At input then undo at output)_, but the",
			"_$t(input expression)_ is replaced with the",
			"_$t(output expression)_ before AND after the",
			"**$t(sChange_other)** are processed.",
			"",
			"Click the (+) button to add a new transformation. The first",
			"transformation in the list will be run first, the second",
			"transformation second, and so on down the list. This may cause",
			"unintended effects as previous transformations mutate the",
			"original word, so you can reorganize your transformations by",
			"using the `DRAG HANDLE` drag handles."
		],

		soundChangesBlocks: {
			//    "important" info is put in a box.
			//    "unimportant" info is put on its own in a way that meshes
			//                   well with important info
			//     use only ONE of the following:
			//        simple
			//        reversed
			//        important + unimportant + complex
			//BlockFormat: {
			//	serif: true, // Makes the content use a serif font (default false)
			//	arrow: "->", // This text here will be replaced with an arrow character
			//                   pointing in the correct direction (default "->")
			//	simple: [array of strings] in the format important, unimportant, important, ...
			//	reversed: [array of strings] in the format unimportant, important, unimportant...
			//	important: "!" string, marks the boundaries of "important" info (default "!")
			//	unimportant: "$" string, marks the boundaries of "unimportant" info (default "$")
			//	complex: [array of strings] in the format "Some !important! and
			//              $unimportant$ stuff with regular stuff."
			//}
			//
			// insert a formatted block into the text with `nameOfBlock`
			// `anything else` will be replaced with the icon for a drag hande
			block1: {
				arrow: "->",
				simple: ["s", "->", "z", "/", "d_", "!", "_h"]
			},
			block2: {
				arrow: "->",
				simple: ["s", "->", "z", "/", "#_"]
			},
		},
		soundChanges: [
			"This is where you determine how your words evolve. The",
			"display follows basic standard phonological rules for describing",
			"$t(sChange_other):",
			"",
			"`block1`",
			"",
			"The above means that \"s\" changes to \"z\" after a \"d\", but",
			"not when it's before an \"h\".",
			"",
			"The first box is the _$t(wgwe:search expression)_, the second is",
			"the _$t(wgwe:replacement expression)_, the third is the",
			"_$t(context expression)_, and the last is the",
			"_$t(exception expression)_.",
			"",
			"The _$t(wgwe:search expression)_ can include plain text or",
			"**$t(common:regular expressions)** (see the end of this section",
			"for more info). It can also contain $t(GR_other). (A $t(GR) is",
			"something like %G to indicate any character in",
			"$t(wgwe:charGroup_one) C's run, or !%G to indicate any",
			"character that is _not_ in that run.)",
			"",
			"The _$t(wgwe:replacement expression)_ should be plain text.",
			"However, it can include non-negative $t(GR_other)",
			"**if and only if** the _$t(wgwe:search expression)_ does, too.",
			"In that case, something special happens: when the evolver",
			"matches a character in a $t(wgwe:charGroup_one), it will note",
			"what position that character is in the $t(wgwe:charGroup_one)'s",
			"run. It will then look at the _replacement_",
			"$t(wgwe:charGroup_one) and pick out the character in the same",
			"position. For example: If %S is being replaced with %Z, and",
			"those $t(wgwe:charGroup_other) have $t(runs) \"ptk\" and",
			"\"bdg\", \"p\" will be replaced with \"b\", \"t\" will be",
			"replaced with \"d\", and \"k\" will be replaced by \"g\".",
			"(If the first $t(wgwe:charGroup_one) has more letters than the",
			"second, the second $t(wgwe:charGroup_one)'s run will",
			"be repeated until it's long enough to find a match.) **NOTE:**",
			"If you have unequal numbers of $t(GR_other) in the",
			"_$t(wgwe:search expression)_ and",
			"_$t(wgwe:replacement expression)_, errors may occur.",
			"",
			"The _$t(context expression)_ describes where in the word the",
			"_$t(wgwe:search expression)_ must be before it can be changed",
			"into",
			"the _$t(wgwe:replacement expression)_. The",
			"_$t(exception expression)_ is similar, but it describes where",
			"in the world a match **can't** be made. (The",
			"_$t(exception expression)_ is optional.)",
			"",
			"There are two characters in a _$t(context expression)_ and",
			"_$t(exception expression)_ that have special functions. The",
			"underscore _ represents where the",
			"_$t(wgwe:replacement expression)_ is being matched. You",
			"**must** include an underscore. The hash symbol # represents the",
			"beginning or end of a word. For example: if you want to turn",
			"\"s\" into \"z\" at the beginning of a word, you could create",
			"the following:",
			"",
			"`block2`",
			"",
			"If you have no special rules for where in a word a replacement",
			"can happen, just make a _$t(context expression)_ that's only a",
			"single underscore.",
			"",
			"Click the (+) button to add a new $t(sChange_one). The first",
			"$t(sChange_one) in the list will be run first, the second",
			"$t(sChange_one) second, and so on down the list. This may cause",
			"unintended effects, so you can reorganize your $t(sChange_one)",
			"to avoid any such effects by using the `DRAG HANDLE` drag",
			"handles."
		],

		outputMain: [
			"This is where the magic happens. Click the **Generate** button",
			"and the evolver will process all your input words and present",
			"your output in the space below.",
		],
		outputSettings: [
			"Click on the gear icon to open a list of options. The first is",
			"a drop-down menu where you can select what to output. The",
			"choices are **$t(Output Only)**,",
			"**$t(Output and Sound-Change Rules)**,",
			"**$t(Input then Output)** and **$t(Output then Input)**.",
			"",
			"Choosing **$t(Output Only)** will display a simple list of",
			"evolved words.",
			"",
			"**$t(Output and Sound-Change Rules)** displays the most complex",
			"output. For every word, it will print the input word, an arrow,",
			"and then the evolved word. Below that, it will print an indented",
			"list of the **$t(Sound Changes)** that evolved the word, in the",
			"format [rule] [arrow] [evolved word]. (If a $t(sChange_one)",
			"didn't affect that word, then it will be omitted from this",
			"list.)",
			"",
			"**$t(Input then Output)**, as you might guess, prints a list in",
			"the format [input word] [arrow] [evolved word].",
			"**$t(Output then Input)** is the same, but the evolved word",
			"comes first.",
			"",
			"The second option under the gear icon determines the style of",
			"arrow that is displayed with the output."
		],
		outputLexicon: [
			"Once you've evolved words, you can save them to the",
			"**$t(common:Lexicon)**. Click the book button and the evolved",
			"words will light up. Tap on words you wish to save. When you've",
			"selected all the words you want, tap the book button again and",
			"you'll be given a pop-up where you can choose which",
			"**$t(common:Lexicon)** column to import them into."
		],

		overview: [
			"This tool is designed to take a list of words and transform them",
			"into (possibly) new forms. The idea is to mimic the way natural",
			"languages change over time.",
			"",
			"This is the most basic use case:",
			"- Decide on how your language will evolve over time.",
			"- Identify which parts will change, such as vowels and",
			"consonants.",
			"- Note the environment in which the $t(sChange_one) takes place.",
			"(For example, a vowel may change only if it's preceded by a",
			"nasal consonant.)",
			"",
			"The **$t(common:Input)** tab holds the words you wish to change.",
			"**$t(wgwe:CharGroup_other)** can hold categories of sounds that",
			"will change in the same way. **$t(wgwe:Transformations_other)**",
			"is a place where you can define complex $t(wgwe:trans_other)",
			"that may be needed to simplify your $t(sChange_other). (For",
			"example, you may want to simplify multi-letter sounds into a",
			"single character.) The **$t(Sound Changes)** tab is where you",
			"define the various changes you want to make, and the",
			"**$t(common:Output)** tab is where you can see the results."
		]

	}

};

export default we;
