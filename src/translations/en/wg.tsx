const wg = {

	"Character Group": "$t(wgwe:Character Group)",
	"Character Groups": "$t(wgwe:Character Groups)",
	charGroup: "$(wgwe:charGroup)",
	charGroup_one: "$(wgwe:charGroup_one)",
	charGroup_other: "$(wgwe:charGroup_other)",
	Transform: "$t(wgwe:Transform)",
	Transforms: "$t(wgwe:Transforms)",
	Transformation: "$t(wgwe:Transformation)",
	Transformations: "$t(wgwe:Transformations)",
	trans: "$(wgwe:trans)",
	trans_one: "$(wgwe:trans)",
	trans_other: "$(wgwe:trans_other)",
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

	Syllable: "Syllable",
	Syllables: "Syllables",
	Syllable_one: "Syllable",
	Syllable_other: "Syllables",
	syll: "syllable",
	syll_one: "syllable",
	syll_other: "syllables",
	"single-word syllables": "single-word syllables",
	"single-word syllables_formal": "Single-Syllable Words",
	"word-initial syllables": "word-initial syllables",
	"word-initial syllables_formal": "Word-Initial Syllables",
	"mid-word syllables": "mid-word syllables",
	"mid-word syllables_formal": "Mid-Word Syllables",
	"word-final syllables": "word-final syllables",
	"word-final syllables_formal": "Word-Final Syllables",
	Preset: "Preset",
	Presets: "Presets",

	"Syllables Tab": "$t(Syllables) Tab",
	"Settings Tab": "$t(common:Settings) Tab",
	"What is WordGen?": "What is $t(common:WordGen)?",

	delAllSyllables_one:
		"This will delete the current $t(syll, { \"count\": {{count}} }), and cannot be undone.",
	delAllSyllables_other:
		"This will delete all {{count}} current $t(syll, { \"count\": {{count}} }), and cannot be undone.",

	syllableDropoffExplanation:
		"Syllables at the top of a box tend to be picked more often than"
		+ " syllables at the bottom of the box. This slider controls this"
		+ " tendency. A rate of zero is flat, making all syllables"
		+ " equiprobable.",

	"Use character group labels to construct syllables":
		"Use character group labels to construct syllables",
	"Use separate dropoff rate": "Use separate dropoff rate",
	"These syllables are used to begin words": "These syllables are used to begin words",
	"These syllables are used between the first and last syllable of a word":
		"These syllables are used between the first and last syllable of a word",
	"These syllables are used to end words": "These syllables are used to end words",
	"From 0 to 50": "From 0 to 50",
	"From 0% to 100%": "From 0% to 100%",
	"From 2 to 15": "From 2 to 15",

	"You have no character groups defined.": "You have no character groups defined.",
	"You have no syllables defined.": "You have no syllables defined.",
	"You are missing one or more types of syllables.": "You are missing one or more types of syllables.",
	unableToCreateXWords: "Unable to create {{amount}} unique words (maxed out at {{max}})",

	consonants: "consonants",
	vowels: "vowels",
	dropoff: "dropoff",
	"dropoff rate": "$t(dropoff) rate",
	"dropoff rate_formal": "Dropoff Rate",
	"characterDropoffExplanation":
		"Characters at the beginning of a group tend to be picked more often"
		+ " than characters at the end of the group. This slider controls this"
		+ " tendency. A rate of zero is flat, making all characters"
		+ " equiprobable.",
	"Character Group run dropoff": "$t(Character Group) $t(run) $t(dropoff)",
	"Syllable box dropoff": "$t(syll) box $t(dropoff)",
	"Use multiple syllable types" : "Use multiple $t(syll) types",
	swSyll: "single-word $t(syll_other)",
	wiSyll: "word-initial $t(syll_other)",
	wfSyll: "word-final $t(syll_other)",
	mwSyll: "mid-word $t(syll_other)",
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
	Simple: "Simple",
	"Clear All Fields": "Clear All Fields",
	"Save/Load Custom Info": "Save/Load Custom Info",
	"Rate of monosyllable words": "Rate of monosyllable words",
	"Maximum number of syllables per word": "Maximum number of syllables per word",
	"Capitalize sentences": "Capitalize sentences",
	declarative: "declarative",
	declarative_formal: "Declarative",
	interrogative: "interrogative",
	interrogative_formal: "Interrogative",
	exclamatory: "exclamatory",
	exclamatory_formal: "Exclamatory",
	sentenceBeginning: "$t({{type}}, { \"context\": \"formal\" }) sentence beginning",
	sentenceEnding: "$t({{type}}, { \"context\": \"formal\" }) sentence ending",

	"Presets and Stored Info": "Presets and Stored Info",
	"Word Generation Controls": "Word Generation Controls",
	Never: "Never",
	Always: "Always",
	"Pseudo-text Controls": "Pseudo-text Controls",
	"Wordlist and Syllable-List Controls": "Wordlist and Syllable-List Controls",
	"What to Generate": "What to Generate",
	Default: "Default",

	allThings: "all current $t(charGroup_other), $t(syll_other), $t(trans_other), and settings",

	info: {
		charGroupExample: [ // strong, emphasized
			"I=pbk",
			"L=lr",
			"C=pbklr",
			"V=eioau"
		],
		charGroups:[
			// `example` will insert the charGroupExample as a block
			// `anything else` will treat "anything else" as highlighted IPA text
			"This is where you define groups of sounds. The two simplest",
			"groupings are _consonants_ and _vowels_, but you may want to",
			"create multiple $t(charGroup_other) depending on how you want",
			"your language's $t(syll_other) formed. For example, the",
			"consonants `pbk` in English may be followed by the consonants",
			"`lr` at the beginning of $t(syll_other). So you might choose them",
			"as $t(charGroup_other), while also putting `pbklr` in a third",
			"$t(charGroup) for general consonants.",
			"",
			"Click the (+) button to add a new $t(charGroup). When you make",
			"a $t(charGroup), you must give it a _$t(labels)_ and a",
			"one-character _$t(labels)_. The $t(labels) can be any single",
			"character except for these: **^$\\()[]{}.*+?|**. The $t(labels)",
			"is for your own benefit, while the $t(labels) will be used to",
			"refer to this $t(charGroup) in the **Syllables** tab. So you may",
			"end up with $t(charGroup_other) that look like the following:",
			"",
			"`example`",
			"",
			"The letters/characters in your $t(charGroup) are called a",
			"_$t(run)_. The $t(run) should be put in a specific order. The",
			"first letter is more likely to be used than the second, the",
			"second more likely than the third, and so on. This mimics natural",
			"languages, which tend to use certain sounds more than others.",
			"You can adjust this _$t(dropoff rate)_, or eliminate it entirely,",
			"on the **$t(common:Settings)** tab.",
		],
		charGroupsHiddenOverview: [
			"**$t(Character Group run dropoff)** is explained in the",
			"**$t(common:Settings)** section below.",
		],
		charGroupsOverview: [
			"**$t(Character Group run dropoff)** ranges from 0 to 50. At zero",
			"(flat), $t(charGroup) choices are all equiprobable. Otherwise,",
			"the higher the number, the more likely it is that the first",
			"characters in the $t(charGroup) are used. See the help section on",
			"the **$t(common:Settings)** page for more information.",
		],


		syllablesStartHideOverview: [
			// This section is used if we're only showing the Syllables card
			// `charGroup example` will insert the charGroupExample as a block
			// `anything else` will be ignored
			"This is where you determine how your $t(syll_other) are formed.",
			"You use the _$t(labels)_ to describe the elements that make up a",
			"$t(syll).",
			"",
			"For example, using the $t(charGroup_other) in the previous",
			"section, you could decide to make a list of $t(syll_other) that",
			"looks like this:",
			"",
			"`charGroup example`",
			"",
			"...you could decide to make a list of $t(syll_other) such as the",
			"following:",
		],
		syllablesStartOverview: [
			// This section is used if we're showing all cards at once
			"This is where you determine how your $t(syll_other) are formed.",
			"You use the _$t(labels)_ to describe the elements that make up a",
			"$t(syll). For example, using the $t(charGroup_other) in the",
			"previous section, you could decide to make a list of",
			"$t(syll_other) such as the following:",
		],
		// syllablesExample is shown as a block in between syllablesStart* and syllables
		syllablesExample: [ //strong, emphasized
			"ILV",
			"CV",
			"ILVC"
		],
		syllables: [
			"The above can generate $t(syll_other) such as _pla_, _ku_, or",
			"_brep_, which could then be combined into words such as",
			"_plabrep_ or _kupla_. You can also put characters in a $t(syll)",
			"that don't correspond to a $t(charGroup): **sILV** could",
			"generate $t(syll_other) such as _sbra_ or _spli_.",
			"",
			"If you desire a greater amount of control over your words, you",
			"can turn on the **$t(Use multiple syllable types)** toggle. This",
			"will show you four separate boxes, each with a different role in",
			"a word: **$t(single-word syllables)** are used exclusively for",
			"one-syllable words, **$t(word-initial syllables)** are only used",
			"at the start of a word, **$t(word-final syllables)** are only",
			"used at the end of a word, and **$t(mid-word syllables)** fill",
			"out the middle of words when needed.",
			"",
			"The order of $t(syll_other) in each box makes a difference. The",
			"first $t(syll) listed is more likely to be used than the second,",
			"the second more likely than the third, and so on. You can adjust",
			"this _$t(dropoff rate)_, or eliminate it entirely, on the",
			"**$t(common:Settings)** tab. You'll also find options there to",
			"determine how often one-syllable words are generated, and put an",
			"upper limit on the number of $t(syll_other) any one word can have.",
		],
		syllablesEndOverview: [
			// This section is used if we're showing all cards at once
			"The **$t(Syllable box dropoff)** is explained in the",
			"**$t(common:Settings)** section below.",
		],
		syllablesEndHideOverview: [
			// This section is used if we're only showing the Syllables card
			"The **$t(Syllable box dropoff)** ranges from 0 to 50. At zero",
			"(flat), $t(syll) choices are all equiprobable. Otherwise, the",
			"higher the number, the more likely it is that the first lines in",
			"the box are used. See the help section on the",
			"**$t(common:Settings)** page for more information.",
		],


		transBlocks: {
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
			block1: {
				serif: true,
				arrow: "->",
				simple: ["C", "->", "ch"]
			},
			block2: {
				serif: true,
				important: "!",
				unimportant: "$",
				complex: [
					"RtL: !s(?=.*ʃ)!$->$!ʃ!  ",
					"LtR: !(ʃ.+)s!$->$!$1ʃ!"
				]
			},
			block3: {
				serif: true,
				important: "!",
				unimportant: "$",
				complex: [
					"!r(.+)r!$->$!r$1l!  ",
					"!l(.+)l!$->$!l$1!"
				]
			},
			block4: {
				serif: true,
				simple: ["r([aeiou]r)", "->", "rd$1"]
			},
			block5: {
				serif: true,
				simple: ["[kp]t+", "->", "tt"]
			}
		},
		trans: [
			// Use `DRAG HANDLE` to insert the drag handle icon into the text.
			"There may be cases when you need to fine-tune the words that",
			"get generated on the **$t(Output Tab)**. A common",
			"reason would be to turn a specific character into two or",
			"three letters. You may create a group such as **C=pbkClrS**,",
			"using capital letters in place of sounds like _\"ch\"_ or",
			"_\"sh\"_. This could generate syllables like _Cu_ or _pliS_.",
			"",
			"When you make a new _$t(trans)_, you provide a",
			"_$t(wgwe:search expression)_, a",
			"_$t(wgwe:replacement expression)_, and, optionally, a _$t(trans)",
			"$t(common:description)_ for your own benefit.",
			"",
			"Both expressions can use **$t(common:regular expressions)**",
			"(an explanation can be found at the end of this section).",
			"You can also use the special expression %X to indicate any",
			"character in group X's run, or !%X to indicate any character",
			"_not_ in that run. (e.g, If _X=abc_, then %X will be treated",
			"as if it was the $t(common:regular expression) _[abc]_.)",
			"",
			"So, you could make a $t(wgwe:search expression) **C** with a",
			"$t(wgwe:replacement expression) **ch**, which will result in",
			"_Cu_ above becoming _chu_. This will result in a $t(trans) that",
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
			"presented with two options. _$t(wgwe:Save everything)_ will",
			"store every single generated word for the Lexicon.",
			"_$t(wgwe:Choose what to save)_ will highlight every word, and",
			"you can tap on a word to store it; when you're done choosing,",
			"hit the save button that appears and you will be able to choose",
			"how they are imported into the **$t(common:Lexicon)**."
		],
		
		settings: [
			"This final tab fine-tunes the output. These can make a huge",
			"difference in how your conlang appears.",
			"",
			"## The Buttons",
			"",
			"**$t(common:Load Preset)** brings up a menu where you can choose from",
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
			"2. If the number is lower than the dropoff percentage, the first",
			"choice is picked.",
			"3. If not, the generator moves the first choice to the end of the",
			"line, then returns to step 1, generating a new number.",
			"4. This cycle continues until a number is generated that is equal",
			"to or greater than the dropoff percentage.",
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
			"1. Choose what sounds your language will have, and the characters",
			"(letters) that will represent these sounds.",
			"2. Separate these characters into groups, such as vowels and",
			"consonants.",
			"3. Decide the structure(s) of the $t(syll_other) these sounds",
			"form.",
			"",
			"For example, a (very rough) approximation of Japanese might be:",
			"",
			"1. Uses the sounds k, g, s, z, t, d, n, h, b, p, m, y, r, w, a,",
			"i, u, e, and o.",
			"2. Sounds can be grouped like this:",
			"   1. k, g, s, z, t, d, n, h, b, p, m, r",
			"   2. a, i, u, e, o",
			"   3. y",
			"   4. a, u, o",
			"   5. w",
			"   6. a, o",
			"   7. n",
			// second-level ordered lists like the one above will use lowercase roman numerals
			"3. Syllables can be made from (i)+(ii), (iii)+(iv), (v)+(vi),",
			"(ii) by itself, and (vii) by itself.",
			"",
			"With that information, you can proceed into the rest of this",
			"tool:",
			"",
			"The **$t(Character Groups)** tab is for holding groups of",
			"sounds, and the **$t(Syllables)** tab describes how they fit",
			"together. For more complex words, the **$t(Transformations)**",
			"tab provides a way to tweak the generated output with",
			"search expressions and replacement expressions. The",
			"**$t(Output Tab)** is where the new words can be found, and the",
			"**$t(common:Settings)** tab has other options you can tweak if",
			"needed.",
			"",
			"Be sure to check out the _$t(Presets)_ over on the Settings tab.",
			"The \"Pseudo-Japanese\" preset shows one way to put the above",
			"info to use.",
		]

	}

};

export default wg;
