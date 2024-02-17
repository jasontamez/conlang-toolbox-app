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
		charGroups2p4:
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
		charGroup5p3: " section below.",

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

		trans1p1:
			`There may be cases when you need to fine-tune the words that get
			generated on the `,
		// "Output",
		trans1p2:
			` tab. A common reason would be to turn a specific character into
			two or three letters. You may create a group such as `,
		trans1p3: "C=pbkClrS",
		trans1p4: ", using capital letters in place of sounds like ",
		trans1p5: "\"ch\"",
		trans1p6: " or ",
		trans1p7: "\"sh\"",
		trans1p8: ". This could generate $t(syll_other) like ",
		trans1p9: "Cu",
		trans1p10: " or ",
		trans1p11: "pliS",
		trans1p12: ".",

		trans2p1: "When you make a new ",
		// "transformation",
		trans2p2: ", you provide a ",
		// "search expression",
		trans2p3: ", a ",
		// "replacement expression",
		trans2p4: ", and, optionally, a ",
		// "transformation description",
		trans2p5: " for your own benefit.",

		trans3p1: "Both expressions can use ",
		// "regular expressions",
		trans3p2:
			` (an explanation can be found at the end of this section). You
			can also use the special expression %X to indicate any character
			in group X's run, or !%X to indicate any character `,
		trans3p3: "not",
		trans3p4: " in that run. (e.g, If ",
		trans3p5: "X=abc",
		trans3p6: ", then %X will be treated as if it was the $t(common:regular expression) ",
		trans3p7: "[abc]",
		trans3p8: ".)",

		trans4p1: "So, you could make a $t(search expression) ",
		trans4p2: "C",
		trans4p3: " with a $t(replacement expression) ",
		trans4p4: "ch",
		trans4p5: ", which will result in ",
		trans4p6: "Cu",
		trans4p7: " above becoming ",
		trans4p8: "chu",
		trans4p9:
			`. This will result in a $t(trans) that looks like the
			following:`,
		//C->ch
		trans5p1:
			`Click the (+) button to add a new $t(trans). The first
			$t(trans) in the list will be run first, the second
			$t(trans) second, and so on down the list. This may cause
			unintended effects, so you can reorganize your $t(trans_other)
			to avoid any such effects by using the `,
		// drag handles
		trans5p2: " drag handles.",

		trans6p1:
			`Here are some sample $t(trans_other) for some linguistic
			phenomina:`,
		trans6p2: "",
		trans6p3: "Consonant harmony:",
		trans6p4: "RtL: ",
		trans6p5: "s(?=.*ʃ)",
		// "{arrow}",
		trans6p6: "ʃ",
		trans6p7: "LtR: ",
		trans6p8: "(ʃ.+)s",
		// "{arrow}",
		trans6p9: "$1ʃ",
		trans6p10: "Liquid dissimilation:",
		trans6p11: "r(.+)r",
		// "{arrow}",
		trans6p12: "r$1l",
		trans6p13: "l(.+)l",
		// "{arrow}",
		trans6p14: "l$1r",
		trans6p15: "Synchronic epenthesis:",
		trans6p16: "r([aeiou]r)$",
		// "{arrow}",
		trans6p17: "rd$1",
		trans6p18: "Anticipatory assimilation:",
		trans6p19: "[kp]t+",
		// "{arrow}",
		trans6p20: "tt",

		output1p1: "This is where the magic happens. Click the ",
		// "Generate",
		output1p2:
			` button and your output will appear. Press the button again
			and a new set of output will replace it.`,

		output2p1:
			`Click on the gear icon to open a list of options. The first
			is a drop-down menu where you can select what to output. The
			choices are `,
		// "Pseudo-text",
		output2p2: ", ",
		// "Wordlist",
		output2p3: " and ",
		// "All possible syllables",
		output2p4: ".",

		output3p1: "The ",
		// "pseudo-text",
		output3p2:
			` will create words and put them into sentences, making a block
			of text you might find in a book. You can determine how many
			sentences are made by adjusting the `,
		// "numer of sentences",
		output3p3: " slider.",

		output4p1: "The ",
		// "wordlist",
		output4p2:
			` outputs a list of words devoid of context. You can choose a
			number of options to modify this list. `,
		// "Capitalize words",
		output4p3: " will capitalize every word. ",
		// "Sort output",
		output4p4: " will alphabetize the list, and ",
		// "multi-column layout",
		output4p5:
			` will arrange the list in multiple columns instead of one long
			column. At the bottom, there is a `,
		// "wordlist size",
		output4p6: " slider that controls how many words are generated.",

		output5p1: "",
		// "All possible syllables",
		output5p2:
			`, as you might guess, outputs a list of every possible $t(syll)
			your $t(charGroup_other), $t(syll_other) and $t(trans_other) allow. The `,
		// "capitalize",
		output5p3: ", ",
		// "sort",
		output5p4: " and ",
		// "multi-column",
		output5p5: " options above will also work on this $t(syll) list.",

		output6p1: "At the top of the settings, you can choose to ",
		// "show syllable breaks",
		output6p2:
			`, which will in·sert a dot be·tween eve·ry syl·la·ble in each
			word. While this option can be useful, please note that it will
			break any `,
		// "transformations",
		output6p3: " that try to work across $t(syll) boundaries.",

		output7p1: "Once you've generated words, you can save them to the ",
		// "Lexicon",
		output7p2:
			`. Click the book button and you're presented with two options. `,
		// "Save everything",
		output7p3: " will store every single generated word for the Lexicon. ",
		// "Choose what to save",
		output7p4:
			` will highlight every word, and you can tap on a word to store
			it; when you're done choosing, hit the save button that appears
			and you will be able to choose how they are imported into the `,
		// "Lexicon",
		output7p5: ".",

		options1:
			`This final tab fine-tunes the output. These can make a huge
			difference in how your conlang appears.`,

		options2: "The Buttons",

		options3p1: "",
		// "Load Presets",
		options3p2:
			` brings up a menu where you can choose from several pre-loaded
			options. The initial settings when you first start the app
			are the `,
		// "Simple",
		options3p3:
			` preset. The others are offered to give you ideas of what's
			possible with the app. They will load `,
		// "character groups",
		options3p4: ", ",
		// "syllables",
		options3p5: ", ",
		// "transformations",
		options3p6:
			` and possibly change the remaining settings on this page, too.`,

		options4p1: "",
		// "Clear All Fields",
		options4p2: " clears all ",
		// "character groups",
		options4p3: ", ",
		// "syllables",
		options4p4: " and ",
		// "transformations",
		options4p5: ", but does not affect any other settings.",

		options5p1: "",
		// "Save/Load Custom Info",
		options5p2: " opens a dialog where you can save your own ",
		// "character groups",
		options5p3: ", ",
		// "syllables",
		options5p4: ", ",
		// "transformations",
		options5p5:
			` and the settings on this page. This allows you to switch between
			your own personal language settings.`,

		options6: "The Settings",

		options7p1: "",
		// "Rate of monosyllable words",
		options7p2:
			` determines how often a one-syllable word is created. It's a
			percentage from 0 (never) to 100 (always).`,

		options8p1: "",
		// "Maximum number of syllables per word",
		options8p2: " sets an upper limit on how long your words can grow.",

		options9p1: "",
		// "Character Group run dropoff",
		options9p2: " and ",
		// "syllable box dropoff",
		options9p3:
			` range from 0 to 50. At zero (flat), $t(charGroup) and $t(syll) choices
			are all equiprobable. Otherwise, the number becomes a percentage.
			The higher the number, the more likely it is that the first
			$t(syll_other) or $t(charGroup) characters are used. (This mimics natural
			languages, which tend to prefer certain sounds and patterns.) This
			is how it works:`,

		options10p1: "A random number is generated from 1 to 100.",
		options10p2:
			`If the number is lower than the dropoff percentage, the first
			choice is picked.`,
		options10p3:
			`If not, the generator moves the first choice to the end of the
			line, then returns to step 1, generating a new number.`,
		options10p4:
			`This cycle continues until a number is generated that is equal
			to or greater than the dropoff percentage.`,

		options11p1: "The remaining options only apply to ",
		// "pseudo-texts",
		options11p2: ".",

		options12p1: "",
		// "Capitalize sentences",
		options12p2: " determines if each sentence starts with a capital letter.",

		options13p1:
			`The other options determine what your sentences look like.
			Three-fourths of all sentences will be `,
		// "declarative",
		options13p2: " (simple statements), one-sixth will be ",
		// "interrogative",
		options13p3: " (questions), and the remaining one-twelfth will be ",
		// "exclamatory",
		options13p4:
			` (excited utterances). You can put special punctuation before
			and after these sentences if you wish.`,

		info1:
			`This tool is for attempting to generate new words based on
			rules you set up.`,

		info2:
			`$t(common:WordGen) makes a few assumptions: 1) the basic unit
			of a "word" is a $t(syll), and 2) a "$t(syll)" can be described
			as a combination of sounds that are spoken together.`,

		info3p1: "This is the most basic use case:",

		info3p2:
			`Choose what sounds your language will have, and the characters
			(letters) that will represent these sounds.`,
		info3p3:
			`Separate these characters into groups, such as vowels and
			consonants.`,
		info3p4: "Decide the structure(s) of the $t(syll_other) these sounds form.",

		info4p1:
			`For example, a (very rough) approximation of Japanese
			might be:`,

		info4p2:
			`Uses the sounds k, g, s, z, t, d, n, h, b, p, m, y, r, w,
			a, i, u, e, and o.`,
		info4p3: "Sounds can be grouped like this:",
		info4p4: "k, g, s, z, t, d, n, h, b, p, m, r",
		info4p5: "a, i, u, e, o",
		info4p6: "y",
		info4p7: "a, u, o",
		info4p8: "w",
		info4p9: "a, o",
		info4p10: "n",
		info4p11:
			`$t(Syllables) can be made from (i)+(ii), (iii)+(iv), (v)+(vi),
			(ii) by itself, and (vii) by itself.`,

		info5p1:
			`With that information, you can proceed into the rest of
			this tool:`,

		info5p2: "The ",
		// "Character Groups",
		info5p3: " tab is for holding groups of sounds, and the ",
		// "Syllables",
		info5p4:
			` tab describes how they fit together. For more complex
			words, the `,
		// "Transformations",
		info5p5:
			` tab provides a way to tweak the generated output with
			search/replace expressions. The `,
		// "Output",
		info5p6: " tab is where the new words can be found, and the ",
		// "Settings",
		info5p7: " tab has other options you can tweak if needed.",

		info6p1: "Be sure to check out the ",
		// "Presets",
		info6p2:
			` over on the $t(common:Settings) tab. The "Pseudo-Japanese" preset
			shows one way to put the above info to use.`,
	}

};

export default wgwe;
