const we = {

	"Character Group": "$t(wgwe:Character Group)",
	"Character Groups": "$t(wgwe:Character Groups)",
	charGroup: "$t(wgwe:charGroup)",
	charGroup_one: "$t(wgwe:charGroup_one)",
	charGroup_other: "$t(wgwe:charGroup_other)",
	Transformation: "$t(wgwe:Transformation)",
	Transformations: "$t(wgwe:Transformations)",
	trans: "$t(wgwe:trans)",
	trans_one: "$t(wgwe:trans)",
	trans_other: "$t(wgwe:trans_other)",
	"Character Groups Tab": "$t(wgwe:Character Groups Tab)",
	"Transformations Tab": "$t(wgwe:Transformations Tab)",
	"Output Tab": "$t(wgwe:Output Tab)",
	description: "$t(wgwe:description)",
	label: "$t(wgwe:label)",
	label_one: "$t(wgwe:label_one)",
	label_other: "$t(wgwe:label_other)",
	labels: "$t(label_other)",
	run: "$t(wgwe:run)",
	"transformation description": "$t(wgwe:transformation description)",
	Evolve: "Evolve",

	"Sound Change": "Sound Change",
	"Sound Changes": "Sound Changes",
	"Sound Changes Tab": "$t(Sound Changes) Tab",
	sChange: "sound change",

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

	"sound change description": "Description of the $t(sChange)",
	"sound change description_presentation": "$t(SChange) $t(common:description_formal):",

	Overview: "Overview: $t(common:WordEvolve)",
	"What is WordEvolve?": "What is WordEvolve?",
	
	"Words to Evolve": "Words to Evolve",

	"Input Tab": "$t(common:Input) Tab",
	runs: "runs",

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
	"transformation direction": "$t(trans) direction",
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

	allThings: "all current $t(charGroup_other), $t(trans_other) and $t(sChange_other)",


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
			"**$t(common:Import from Lexicon)** button to pull in words",
			"stored in the **$t(common:Lexicon)**.",
			"",
			"Use the **$t(common:Clear)** button to empty all words from",
			"$t(common:Input)."
		],

		charGroups: [
			"This is where you define groups of characters representing",
			"sounds. You can reference these $t(charGroup_other) in",
			"**$t(Transformations)** and **$t(Sound Changes)** to fine-tune",
			"the way your language evolves.",
			"",
			"Click the (+) button to add a new $t(charGroup). When you",
			"make a $t(charGroup), you must give it a _$t(description)_",
			"and a one-character _$t(label)_. The $t(description) is for",
			"your own benefit, while the $t(label) will be used to refer to",
			"this $t(charGroup) in the other tabs. The $t(label) can be any",
			"single character except for these: **^$\\()[]{}.*+?|**. The",
			"letters/characters in your $t(charGroup) are called a",
			"_$t(run)_."
	 	],

		// `anything` in backticks will be replaced with the icon for a drag hande
		transformations: [
			"There may be cases when you need to modify the input words",
			"before you evolve them. A common reason would be to turn a",
			"group of characters (such as \"sh\", \"th\", or \"ng\" in",
			"English) into a single character that can be targeted more",
			"easily.",
			"",
			"When you make a new _$t(trans)_, you provide an",
			"_$t(input expression)_, a _$t(transformation direction)_,",
			"an _$t(output expression)_, and, optionally, a",
			"_$t(transformation description)_ for your own benefit.",
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
			"indicate any character in $t(charGroup) C's $t(run), or !%G to",
			"indicate any character _not_ in that $t(run).)",
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
			"$t(trans) matches a character in a $t(charGroup), it will note",
			"what position that character is in the $t(charGroup)'s $t(run).",
			"It will then look at the other expression's $t(charGroup) and",
			"pick out the character in the same position.",
			"",
			"For example: If %S is being replaced with %Z, and those",
			"$t(charGroup_other) have $t(runs) \"ptk\" and \"bdg\", \"p\"",
			"will be replaced with \"b\", \"t\" will be replaced with \"d\",",
			"and \"k\" will be replaced by \"g\". If the first $t(charGroup)",
			"has more letters than the second, the second $t(charGroup)'s",
			"$t(run) will be repeated until it's long enough to find a",
			"match.",
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
			"Click the (+) button to add a new $t(trans). The first",
			"$t(trans) in the list will be run first, the second $t(trans)",
			"second, and so on down the list. This may cause unintended",
			"effects, so you can reorganize your transforms by using the",
			"`DRAG HANDLE` drag handles."
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
			"something like %G to indicate any character in $t(charGroup) C's",
			"$t(run), or !%G to indicate any character that is _not_ in that",
			"$t(run).)",
			"",
			"The _$t(wgwe:replacement expression)_ should be plain text.",
			"However, it can include non-negative $t(GR_other)",
			"**if and only if** the _$t(wgwe:search expression)_ does, too.",
			"In that case, something special happens: when the evolver",
			"matches a character in a $t(charGroup), it will note what",
			"position that character is in the $t(charGroup)'s $t(run). It",
			"will then look at the _replacement_ $t(charGroup) and pick out",
			"the character in the same position. For example: If %S is being",
			"replaced with %Z, and those $t(charGroup_other) have $t(runs)",
			"\"ptk\" and \"bdg\", \"p\" will be replaced with \"b\", \"t\"",
			"will be replaced with \"d\", and \"k\" will be replaced by",
			"\"g\". (If the first $t(charGroup) has more letters than the",
			"second, the second $t(charGroup)'s $t(run) will be repeated",
			"until it's long enough to find a match.) **NOTE:** If you have",
			"unequal numbers of $t(GR_other) in the",
			"_$t(wgwe:search expression)_ and",
			"_$t(wgwe:replacement expression)_, errors may occur.",
			"",
			"The _$t(context expression)_ describes where in the word the",
			"_$t(wgwe:search expression)_ must be before it can be changed",
			"into",
			"the _$t(wgwe:replacement expression)_. The _$t(exception expression)_ is",
			"similar, but it describes where in the world a match **can't**",
			"be made. (The _$t(exception expression)_ is optional.)",
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
			"Click the (+) button to add a new $t(sChange). The first",
			"$t(sChange) in the list will be run first, the second $t(sChange)",
			"second, and so on down the list. This may cause unintended",
			"effects, so you can reorganize your $t(sChange) to avoid any such",
			"effects by using the `DRAG HANDLE` drag handles."
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
			"format [rule] [arrow] [evolved word]. (If a $t(sChange) didn't",
			"affect that word, then it will be omitted from this list.)",
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
			"**$t(common:Lexicon)**. Click the book button and you're",
			"presented with two options. _$t(wgwe:Save everything)_ will",
			"store every single evolved word for the $t(common:Lexicon).",
			"_$t(wgwe:Choose what to save)_ will highlight every evolved",
			"word, and you can tap on a word to store it; when you're done",
			"choosing hit the save button that appears and you will be able",
			"to choose how they are imported into the **$t(common:Lexicon)**."
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
			"- Note the environment in which the $t(sChange) takes place.",
			"(For example, a vowel may change only if it's preceded by a",
			"nasal consonant.)",
			"",
			"The **$t(common:Input)** tab holds the words you wish to change.",
			"**$t(Character Groups)** can hold categories of sounds that will",
			"change in the same way. **$t(Transformations)** is a place where",
			"you can define complex $t(trans_other) that may be needed to",
			"simplify your $t(sChange_other). (For example, you may want to",
			"simplify multi-letter sounds into a single character.) The",
			"**$t(Sound Changes)** tab is where you define the various",
			"changes you want to make, and the **$t(common:Output)** tab is",
			"where you can see the results."
		]

	}

};

export default we;
