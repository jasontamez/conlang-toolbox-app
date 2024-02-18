const wgwe = {

	"Character Group": "$t(wgwe:Character Group)",
	"Character Groups": "$t(wgwe:Character Groups)",
	charGroup_one: "character group",
	charGroup_other: "character groups",
	Transform: "$t(wgwe:Transform)",
	Transforms: "$t(wgwe:Transforms)",
	Transformation: "$t(wgwe:Transformation)",
	Transformations: "$t(wgwe:Transformations)",
	trans: "transformation",
	trans_one: "transformation",
	trans_other: "transformations",
	"Sound Change": "$t(wgwe:Sound Change)",
	"Sound Changes": "$t(wgwe:Sound Changes)",
	Syllable: "$t(wgwe:Syllable)",
	Syllables: "$t(wgwe:Syllables)",
	syll: "syllable",
	syll_one: "syllable",
	syll_other: "syllables",

	"Character Groups Tab": "$t(Character Groups) Tab",
	"Syllables Tab": "$t(Syllables) Tab",
	"Transformations Tab": "$t(Transformations) Tab",
	"Output Tab": "$t(common:Output) Tab",
	"Settings Tab": "$t(common:Settings) Tab",
	"Overview[colon] WordGen": "Overview: $t(common:WordGen)",
	"What is WordGen?": "What is $t(common:WordGen)?",

	consonants: "consonants",
	vowels: "vowels",
	description: "description",
	label: "label",
	label_one: "label",
	label_other: "labels",
	run: "run",
	dropoff: "dropoff",
	"dropoff rate": "$t(dropoff) rate",
	"Character Group run dropoff": "$t(Character Group) $t(run) $t(dropoff)",
	"Syllable box dropoff": "$t(syll) box $t(dropoff)",
	"Use multiple syllable types" : "Use multiple $t(syll) types",
	invalidCharacters: "^$\\()[]{}.*+?|",
	swSyll: "single-word $t(syll_other)",
	wiSyll: "word-initial $t(syll_other)",
	wfSyll: "word-final $t(syll_other)",
	mwSyll: "mid-word $t(syll_other)",
	"search expression": "search expression",
	"replacement expression": "replacement expression",
	"transformation description": "$t(trans) $t(description)",
	Generate: "Generate",
	"Pseudo-text": "Pseudo-text",
	"Pseudo-texts": "Pseudo-texts",
	Wordlist: "Wordlist",
	"All possible syllables":"All possible $t(syll_other)",
	"Number of sentences":"Number of sentences",
	"Capitalize words": "Capitalize words",
	"Sort output": "Sort output",
	"Multi-column layout": "Multi-column layout",
	"Wordlist size": "$t(Wordlist) size",
	"Show syllable breaks": "Show syllable breaks",
	"Save everything": "Save everything",
	"Choose what to save": "Choose what to save",
	"Load Presets": "Load Presets",
	Simple: "Simple",
	"Clear All Fields": "Clear All Fields",
	"Save/Load Custom Info": "Save/Load Custom Info",
	"Rate of monosyllable words": "Rate of monosyllable words",
	"Maximum number of syllables per word": "Maximum number of syllables per word",
	"Capitalize sentences": "Capitalize sentences",
	declarative: "declarative",
	interrogative: "interrogative",
	exclamatory: "exclamatory",

	info: {
		charGroup1p1:
			`This is where you define groups of sounds. The two simplest
			groupings are `,
		// consonants
		charGroup1p2: " and ",
		// vowels
		charGroup1p3:
			`, but you may want to create multiple $t(charGroup_other)
			depending on how you want your language's $t(syll_other) formed.
			For example, the $t(consonants) `,
		pbk: 'pbk',
		charGroup1p4: " in English may be followed by the $t(consonants) ",
		lr: 'lr',
		charGroup1p5:
			` at the beginning of $t(syll_other). So you might choose them as
			$t(charGroup_other), while also putting `,
		pbklr: 'pbklr',
		charGroup1p6: " in a third $t(charGroup) for general $t(consonants).",

		charGroup2p1:
			`Click the (+) button to add a new $t(charGroup). When you make
			one, you must give it a `,
		// description
		charGroup2p2: " and a one-character ",
		// label
		charGroup2p3: " The $t(label) can be any single character except for these: ",
		// invalidCharacters
		charGroup2p4:
			`. The $t(description) is for your own benefit, while the
			$t(label) will be used to refer to this $t(charGroup) in the `,
		// Syllables
		charGroup2p5:
			` tab. So you may end up with $t(charGroup_other) that look like
			the following:`,

		charGroup3p1: "I=$t(info.pbk)",
		charGroup3p2: "L=$t(info.lr)",
		charGroup3p3: "C=$t(info.pbklr)",
		charGroup3p4: "V=eioau",

		charGroup4p1: "The letters/characters in your $t(charGroup) are called a ",
		// run
		charGroup4p2:
			` The $t(run) should be put in a specific order. The first letter
			is more likely to be used than the second, the second more likely
			than the third, and so on. This mimics natural languages, which
			tend to use certain sounds more than others. You can adjust this `,
		// dropoff rate
		charGroup4p3: ", or eliminate it entirely, on the ",
		// Settings
		charGroup4p4: " tab.",

		charGroup5v1p1: "",
		// Character Group run dropoff
		charGroup5v1p2: " is explained in the ",
		// Settings
		charGroup5v1p3: " section below.",

		charGroup5v2p1: "",
		// Character Group run dropoff
		charGroup5v2p2:
			` ranges from 0 to 50. At zero (flat), $t(charGroup) choices are
			all equiprobable. Otherwise, the higher the number, the more
			likely it is that the first characters in the $t(charGroup) are
			used. See the help section on the `,
		// Settings
		charGroup5v2p3: " page for more information.",

		syll1p1:
			`This is where you determine how your $t(syll_other) are formed.
			You use the `,
		// labels
		syll1p2: " to describe the elements that make up a $t(syll).",
		syll1maybe3:
			` For example, using the $t(charGroup_other) in the previous
			section, you could decide to make a list of $t(syll_other) such
			as the following:`,

		syllMaybe1: "For example, if you have these ",
		// character groups
		syllMaybe2: "...",
		// charGroup3p1 through charGroup3p4 will be repeated here
		syllMaybe3:
			`...you could decide to make a list of $t(syll_other) such as
			the following:`,

		ILV: "ILV",
		CV: "CV",
		ILVC: "ILVC",

		syll2p1: "The above can generate $t(syll_other) such as ",
		pla: "pla",
		syll2p2: ", ",
		ku: "ku",
		syll2p3: ", or ",
		brep: "brep",
		syll2p4: ", which could then be combined into words such as ",
		plabrep: "plabrep",
		syll2p5: " or ",
		kupla: "kupla",
		syll2p6:
			`. You can also put characters in a $t(syll) that don't correspond
			to a $t(charGroup): `,
		sILV: "sILV",
		syll2p7: " could generate syllables such as ",
		sbra: "sbra",
		syll2p8: " or ",
		spli: "spli",
		syll2p9: ".",

		syll3p1:
			`If you desire a greater amount of control over your words, you
			can turn on the `,
		// Use multile syllable types
		syll3p2:
			` toggle. This will show you four separate boxes, each with a
			different role in a word: `,
		// single-word syllables
		syll3p3: " are used exclusively for one-syllable words, ",
		// word-initial syllables
		syll3p4: " are only used at the start of a word, ",
		// word-final syllables
		syll3p5: " are only used at the end of a word, and ",
		// mid-word syllables
		syll3p6: " fill out the middle of words when needed.",

		syll4p1:
			`The order of $t(syll_other) in each box makes a difference. The
			first $t(syll) listed is more likely to be used than the second,
			the second more likely than the third, and so on. You can adjust
			this `,
		// dropoff rate
		syll4p2: ", or eliminate it entirely, on the ",
		// Settings
		syll4p3:
			` tab. You'll also find options there to determine how often
			one-syllable words are generated, and put an upper limit on the
			number of $t(syll_other) any one word can have.`,

		syll5v1p1: "",
		// Syllable box dropoff
		syll5v1p2: " is explained in the ",
		// Settings
		syll5v1p3: " section below.",

		syll5v2p1: "",
		// Syllable box dropoff
		syll5v2p2:
			` ranges from 0 to 50. At zero (flat), $t(syll) choices are all
			equiprobable. Otherwise, the higher the number, the more likely
			it is that the first lines in the box are used. See the help
			section on the `,
		// Settings
		syll5v2p3: " page for more information.",

		transBlocks: {
			block1: {
				emphasized: true,
				serif: true,
				arrow: "->",
				simple: ["C", "->", "ch"] // important, unimportant, ...
				// reversed: unimportant, important...
				// important: "!"
				// unimportant: "."
				// complex: [ "Some !important! and .unimportant. stuff together with regular stuff." ]
			},
			block2: {
				emphasized: true,
				serif: true,
				important: "!",
				unimportant: "$",
				complex: [
					"RtL: !s(?=.*ʃ)!$->$!ʃ!  ",
					"LtR: !(ʃ.+)s!$->$!$1ʃ!"
				]
			},
			block3: {
				emphasized: true,
				serif: true,
				important: "!",
				unimportant: "$",
				complex: [
					"!r(.+)r!$->$!r$1l!  ",
					"!l(.+)l!$->$!l$1!"
				]
			},
			block4: {
				emphasized: true,
				serif: true,
				simple: ["r([aeiou]r)", "->", "rd$1"]
			},
			block5: {
				emphasized: true,
				serif: true,
				simple: ["[kp]t+", "->", "tt"]
			}
		},
		trans: [
			"There may be cases when you need to fine-tune the words that",
			"get generated on the **$t(common:Output)** tab. A common",
			"reason would be to turn a specific character into two or",
			"three letters. You may create a group such as **C=pbkClrS**,",
			"using capital letters in place of sounds like _\"ch\"_ or",
			"_\"sh\"_. This could generate syllables like _Cu_ or _pliS_.",
			"",
			"When you make a new _$t(trans)_, you provide a",
			"_$t(search expression)_, a _$t(replacement expression)_, and,",
			"optionally, a _$(trans) $t(common:description)_ for your own",
			"benefit.",
			"",
			"Both expressions can use **$t(common:regular expressions)**",
			"(an explanation can be found at the end of this section).",
			"You can also use the special expression %X to indicate any",
			"character in group X's run, or !%X to indicate any character",
			"_not_ in that run. (e.g, If _X=abc_, then %X will be treated",
			"as if it was the $t(common:regular expression) _[abc]_.)",
			"",
			"So, you could make a $t(search expression) **C** with a",
			"$t(replacement expression) **ch**, which will result in _Cu_",
			"above becoming _chu_. This will result in a $t(trans) that",
			"looks like the following:",
			"",
			"`block1`",
			"",
			"Click the (+) button to add a new $t(trans). The first",
			"$t(trans) in the list will be run first, the second",
			"$t(trans) second, and so on down the list. This may cause",
			"unintended effects, so you can reorganize your",
			"$t(trans_other) to avoid any such effects by using",
			"the `DRAG HANDLE` drag handles.",
			"***",
			"Here are some sample transformations for some linguistic",
			"phenomina:",
			"- Consonant harmony: `block2`",
			"- Liquid dissimilation: `block3`",
			"- Synchronic epenthesis: `block4`",
			"- Anticipatory assimilation: `block5`",
		],

		outputMain: [
			"This is where the magic happens. Click the **$t(Generate)**",
			"button and your output will appear. Press the button again",
			"and a new set of output will replace it."
		],
		outputSettings: [
			"Click on the gear icon to open a list of options. The first",
			"is a drop-down menu where you can select what to output. The",
			"choices are **$t(Pseudo-text)**, **$t(Wordlist)** and",
			"**$t(All possible syllables)**.",
			"",
			"The **$t(Pseudo-text)** will create words and put them into",
			"sentences, making a block of text you might find in a book.",
			"You can determine how many sentences are made by adjusting",
			"the **$t(Number of sentences)** slider.",
			"",
			"The **$t(Wordlist)** outputs a list of words devoid of context.",
			"You can choose a number of options to modify this list.",
			"**$t(Capitalize words)** will capitalize every word.",
			"**$t(Sort output)** will alphabetize the list, and",
			"**$t(Multi-column layout)** will arrange the list in multiple",
			"columns instead of one long column. At the bottom, there is a",
			"**$t(Wordlist size)** slider that controls how many words",
			"are generated.",
			"",
			"**$t(All possible syllables)**, as you might guess, outputs a",
			"list of every possible $t(syll) your $t(charGroup_other),",
			"$t(syll_other) and $t(trans_other) allow.",
			"The _$t(Capitalize words)_, _$t(Sort output)_ and",
			"_$t(Multi-column layout)_ options above will also work on this",
			"$t(syll) list.",
			"",
			"At the top of the settings, you can choose to",
			"**$t(Show syllable breaks)**, which will in·sert a dot be·tween",
			"eve·ry syl·la·ble in each word. While this option can be useful,",
			"please note that it will break any _$t(trans_other)_ that",
			"try to work across syllable boundaries."
		],
		outputLexicon: [
			"Once you've generated words, you can save them to the",
			"**$t(common:Lexicon)**. Click the book button and you're",
			"presented with two options. _$t(Save everything)_ will store",
			"every single generated word for the Lexicon.",
			"_$t(Choose what to save)_ will highlight every word, and you",
			"can tap on a word to store it; when you're done choosing, hit",
			"the save button that appears and you will be able to choose",
			"how they are imported into the **$t(common:Lexicon)**."
		],
		
		settings: [
			"This final tab fine-tunes the output. These can make a huge",
			"difference in how your conlang appears.",
			"",
			"## The Buttons",
			"",
			"**$t(Load Presets)** brings up a menu where you can choose from",
			"several pre-loaded options. The initial settings when you first",
			"start the app are the _$t(Simple)_ preset. The others are offered",
			"to give you ideas of what's possible with the app. They will",
			"load _$t(charGroup_other)_, _$t(syll_other)_, _$t(trans_other)_",
			"and possibly change the remaining settings on this page, too.",
			"",
			"**$t(Clear All Fields)** clears all _$t(charGroup_other)_,",
			"_$t(syll_other)_ and _$t(trans_other)_, but does not affect any",
			"other settings.",
			"",
			"**$t(Save/Load Custom Info)** opens a dialog where you can save",
			"your own _$t(charGroup_other)_, _$t(syll_other)_,",
			"_$t(trans_other)_ and the settings on this page. This allows you",
			"to switch between your own personal language settings.",
			"",
			"## The Settings",
			"",
			"**$t(Rate of monosyllable words)** determines how often a",
			"one-syllable word is created. It's a percentage from 0 (never)",
			"to 100 (always).",
			"",
			"**$t(Maximum number of syllables per word)** sets an upper limit",
			"on how long your words can grow.",
			"",
			"**$t(Character Group run dropoff)** and",
			"**$t(Syllable box dropoff)** range from 0 to 50. At zero (flat),",
			"group and syllable choices are all equiprobable. Otherwise, the",
			"number becomes a percentage. The higher the number, the more",
			"likely it is that the first syllables or group characters are",
			"used. (This mimics natural languages, which tend to prefer",
			"certain sounds and patterns.) This is how it works:",
			"",
			"1. A random number is generated from 1 to 100.",
			"2. If the number is lower than the dropoff percentage, the first choice is picked.",
			"3. If not, the generator moves the first choice to the end of the line, then returns to step 1, generating a new number.",
			"4. This cycle continues until a number is generated that is equal to or greater than the dropoff percentage.",
			"",
			"The remaining options only apply to _$t(Pseudo-texts)_.",
			"",
			"**$t(Capitalize sentences)** determines if each sentence starts",
			"with a capital letter.",
			"",
			"The other options determine what your sentences look like.",
			"Three-fourths of all sentences will be _$t(declarative)_",
			"(simple statements), one-sixth will be _$t(interrogative)_",
			"(questions), and the remaining one-twelfth will be",
			"_$t(exclamatory)_ (excited utterances). You can put special",
			"punctuation before and after these sentences if you wish."
		],

		overview: [
			"This tool is for attempting to generate new words based on",
			"rules you set up.",
			"",
			"WordGen makes two assumptions. First, that he basic unit of a",
			"\"word\" is a $t(syll), and second, that a \"$t(syll)\" can be",
			"described as a combination of sounds that are spoken together.",
			"",
			"This is the most basic use case:",
			"",
			"1. Choose what sounds your language will have, and the characters (letters) that will represent these sounds.",
			"2. Separate these characters into groups, such as vowels and consonants.",
			"3. Decide the structure(s) of the $t(syll_other) these sounds form.",
			"",
			"For example, a (very rough) approximation of Japanese might be:",
			"",
			"1. Uses the sounds k, g, s, z, t, d, n, h, b, p, m, y, r, w, a, i, u, e, and o.",
			"2. Sounds can be grouped like this:",
			"   1. k, g, s, z, t, d, n, h, b, p, m, r",
			"   2. a, i, u, e, o",
			"   3. y",
			"   4. a, u, o",
			"   5. w",
			"   6. a, o",
			"   7. n",
			"3. Syllables can be made from (i)+(ii), (iii)+(iv), (v)+(vi), (ii) by itself, and (vii) by itself.",
			"",
			"With that information, you can proceed into the rest of this",
			"tool:",
			"",
			"The **$t(Character Groups)** tab is for holding groups of",
			"sounds, and the **$t(Syllables)** tab describes how they fit",
			"together. For more complex words, the **$t(Transformations)**",
			"tab provides a way to tweak the generated output with",
			"$t(search expressions) and $t(replace expressions). The",
			"**$t(Output)** tab is where the new words can be found, and the",
			"**$t(common:Settings)** tab has other options you can tweak if",
			"needed.",
			"",
			"Be sure to check out the _$t(Presets)_ over on the Settings tab.",
			"The \"Pseudo-Japanese\" preset shows one way to put the above",
			"info to use.",
		]

	}

};

export default wgwe;
