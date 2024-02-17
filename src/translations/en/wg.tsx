const wgwe = {

	"Character Group": "$t(wgwe:Character Group)",
	"Character Groups": "$t(wgwe:Character Groups)",
	charGroup_one: "character group",
	charGroup_other: "character groups",
	Transform: "$t(wgwe:Transform)",
	Transforms: "$t(wgwe:Transforms)",
	Transformation: "$t(wgwe:Transformation)",
	Transformations: "$t(wgwe:Transformations)",
	"Sound Change": "$t(wgwe:Sound Change)",
	"Sound Changes": "$t(wgwe:Sound Changes)",
	Syllable: "$t(wgwe:Syllable)",
	Syllables: "$t(wgwe:Syllables)",
	syll_one: "syllable",
	syll_other: "syllables",

	"Character Groups Tab": "$t(Character Groups) Tab",
	"Syllables Tab": "$t(Syllables) Tab",
	"Transformations Tab": "$t(Transformations) Tab",

	consonants: "consonants",
	vowels: "vowels",
	description: "description",
	label_one: "label",
	label_other: "labels",
	run: "run",
	dropoff: "dropoff",
	"dropoff rate": "$t(dropoff) rate",
	"Character Group run dropoff": "$t(Character Group) $t(run) $t(dropoff)",
	"Syllable box dropoff": "$(syll) box $(dropoff)",
	"Use multiple syllable types" : "Use multiple $(syll) types",
	invalidCharacters: "^$\\()[]{}.*+?|",
	swSyll: "single-word $t(syll_other)",
	wiSyll: "word-initial $t(syll_other)",
	wfSyll: "word-final $t(syll_other)",
	mwSyll: "mid-word $t(syll_other)",

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
			$t(label) will be used to refer to this $(charGroup) in the `,
		// Syllables
		charGroup2p5:
			` tab. So you may end up with $t(charGroup_other) that look like
			the following:`,

		charGroup3p1: "I=$t(info.pbk)",
		charGroup3p2: "L=$t(info.lr)",
		charGroup3p3: "C=$t(info.pbklr)",
		charGroup3p4: "V=eioau",

		charGroup4p1: "The letters/characters in your $(charGroup) are called a ",
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
			`. You can also put characters in a $(syll) that don't correspond
			to a $(charGroup): `,
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
			number of $(syll_other) any one word can have.`,

		syll5v1p1: "",
		// Syllable box dropoff
		syll5v1p2: " is explained in the ",
		// Settings
		syll5v1p3: " section below.",

		syll5v2p1: "",
		// Syllable box dropoff
		syll5v2p2:
			` ranges from 0 to 50. At zero (flat), $(syll) choices are all
			equiprobable. Otherwise, the higher the number, the more likely
			it is that the first lines in the box are used. See the help
			section on the `,
		// Settings
		syll5v2p3: " page for more information."
	}

};

export default wgwe;
