const lang = {
	// Concepts
	translation: {
		conceptsInfo: {
			basic1:
				`Presented here are a number of lists of basic concepts,
				which were originaly created for the purposes of
				historical-comparative linguistics.`,
			basic2:
				`They are included in this app because they may serve you as
				a useful source of meanings to start a conlang with.
				Remember: you can combine multiple meanings into a single
				word!`,

			controlLexicon: 
				`Use the "lexicon" button to quickly save meanings
				to the $t(Lexicon).`,

			controlJoin: 'Use the "join" button to create compound meanings.',

			controlUnjoin: 'Use the "unjoin" button to delete compound meanings.',

			swadesh1: 
				`Originally assembled by Morris Swadesh, this list of
				concepts was chosen for their universal, culturally
				independent availability in as many languages as possible.
				However, he relied more on his intuition than on a
				rigorous set of criteria. `,
			// "Swadesh 100"
			swadesh2: " is his final list from 1971. The ",
			// "Swadesh 207"
			swadesh3: " is adapted from his original list from 1952. ",
			// "Swadesh-Yakhontov"
			swadesh4: " is a subset of the 207 assembled by Sergei Yakhontov. And the ",
			// "Swadesh-Woodward Sign List"
			swadesh5: 
				` was assembled by James Woodward to take into account the
				ways sign languages behave.`,

			dolgopolsky:
				`Compiled by Aharon Dolgopolsky in 1964, this lists the 15
				lexical items that are the least likely to be replaced by
				other words as a language evolves. It was based on a study of
				140 languages from across Eurasia, only.`,

			leipzigJakarta:
				`Similar to the Dolgopolsky list, this is a list of words
				judged to be the most resistant to borrowing. Experts on 41
				languages from across the world were given a uniform
				vocabulary list and asked to provide the words for each item
				in the language on which they were an expert, as well as
				information on how strong the evidence that each word was
				borrowed was. The 100 concepts that were found in most
				languages and were most resistant to borrowing formed
				the Leipzig-Jakarta list.`,

			asjp1:
				`The `,
			// "Automated Similarity Judgment Program"
			asjp2:
				` is a collaborative project applying computational approaches
				to comparative linguistics using a database of word lists. It
				uses a 40-word list to evaluate the similarity of words with
				the same meaning from different languages.`,

			landau1: "The ",
			// "Basic 200 List"
			landau2: " is a subset of the ",
			// "Landau Core Vocabulary (LCV)"
			landau3:
				` developed by James Landau. It is Part I of the entire
				$t(LCV)). This list consists of 200 basic concepts that
				basically all anthropic cultures will have and have words for.
				This list makes many semantic distinctions that are not made
				in English (e.g "leaf (on plant)" vs. "leaf (fallen off)"),
				and some that are not made in any "Standard Average European"
				language (e.g. "river (flowing into the sea)" vs. "river
				(flowing into another river)").`,
		},

		"Swadesh Lists": "Swadesh Lists",
		"Swadesh 100": "Swadesh 100",
		"Swadesh 207": "Swadesh 207",
		"Swadesh-Yakhontov": "Swadesh-Yakhontov",
		"Swadesh-Woodward Sign List": "Swadesh-Woodward Sign List",

		"Dolgopolsky List": "Dolgopolsky List",

		"Leipzig-Jakarta List": "Leipzig-Jakarta List",

		"ASJP List": "ASJP List",
		"Automated Similarity Judgment Program": "Automated Similarity Judgment Program",

		"Landau 200": "Landau 200",
		"Basic 200 List": "Basic 200 List",
		"Landau Core Vocabulary (LCV)": "Landau Core Vocabulary $t(LCV)",
		LCV: "LCV",

		"Select a column": "Select a column",

		"Your selected meanings will be added to the Lexicon under that column.":
			"Your selected meanings will be added to the Lexicon under that column.",

		"Tap meanings you want to link, in the order you wish to link them.":
			"Tap meanings you want to link, in the order you wish to link them.",

		// The key below takes a {{count}} in case special plurals are needed. Count will NEVER be 0 or 1.
		"You have some meanings still selected. Do you want to link them?":
			"You have some meanings still selected. Do you want to link them?",

		"Stop Linking?": "Stop Linking?",

		"Yes, Save Them": "Yes, Save Them", // "Them" refers to the meanings being linked together
		"No, Discard Them": "No, Discard Them", // See above
		"Combination saved": "Combination saved", // The combination of meanings

		"Tap meanings you want to save to Lexicon":
			"Tap meanings you want to save to $t(Lexicon)",

		"Selected meanings_one": "Selected meaning", // Fills the {{what}} role in saveToLexColumn
		"Selected meanings_other": "Selected meanings",

		"Tap combinations you want to delete, then tap the Unlink button again.":
			"Tap combinations you want to delete, then tap the Unlink button again.",

		delMeanings_one: 'Delete {{count}} meanings?',
		delMeanings_other: 'Delete {{count}} meanings?',
		delMeaningsMessage_one: "The selected meaning will be removed. $t(cannotUndo)",
		delMeaningsMessage_other: "The selected meanings will be removed. $t(cannotUndo)",

		"My Combinations": "My Combinations",
		"Save All Meanings": "Save All Meanings",
		"Save Selected Meanings": "Save Selected Meanings",
		"Current Combination:": "Current Combination:",


		// Common?
		Controls: "Controls", // the buttons used in the app
		WordGen: "WordGen", // name of tool
		WG: "WG", // shorthand for WordGen
		Lexicon: "Lexicon", // name of tool
		Concepts: "Concepts", // name of tool
		Stop: "Stop",
		Cancel: "Cancel",
		Save: "Save",
		Ok: "Ok",

		// saveToLexColumn also takes a {{count}} in case a plural version is needed
		saveToLexColumn: "{{what}} saved to $t(Lexicon) under \"{{column}}\"",

		cannotUndo: "This cannot be undone.", // This action, usually deleting something, cannot be undone.
		confirmDel_one: "Yes, Delete It",  // "It" might refer to many things
		confirmDel_other: "Yes, Delete Them", // "Them" might refer to many things

		"Go to Lexicon": "Go to Lexicon",

		"You need to add columns to the Lexicon before you can add anything to it.":
			"You need to add columns to the $t(Lexicon) before you can add anything to it.",

		"Display:": "Display:", // short label indicating the user can select an option to display



		// PERMANENT INTO
		"WG Presets Sorter": "$t(WG) Presets Sorter", // Title of the permanent sort method in sort settings.

		// The key below is used when someone tries to edit or delete the permanent sort method in sort settings.
		"This is used by WordGen presets. It cannot be modified or deleted.":
			"This is used by $t(WordGen) presets. It cannot be modified or deleted.",
/*

*/
	}
};

export default lang;



/*

{
  "key": "value",
  "keyDeep": {
    "inner": "value"
  },
  "keyNesting": "reuse $t(keyDeep.inner)",
  "keyInterpolate": "replace this {{value}}",
  "keyInterpolateUnescaped": "replace this {{- value}}",
  "keyInterpolateWithFormatting": "replace this {{value, format}}",
  "keyContext_male": "the male variant",
  "keyContext_female": "the female variant",
  "keyPluralSimple_one": "the singular",
  "keyPluralSimple_other": "the plural",
  "keyPluralMultipleEgArabic_zero": "the plural form 0",
  "keyPluralMultipleEgArabic_one": "the plural form 1",
  "keyPluralMultipleEgArabic_two": "the plural form 2",
  "keyPluralMultipleEgArabic_few": "the plural form 3",
  "keyPluralMultipleEgArabic_many": "the plural form 4",
  "keyPluralMultipleEgArabic_other": "the plural form 5",
  "keyWithArrayValue": ["multipe", "things"],
  "keyWithObjectValue": { "valueA": "return this with valueB", "valueB": "more text" }
}

*/