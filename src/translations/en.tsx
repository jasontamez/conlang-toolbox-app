// Note that this file omits many keys, because the raw value will be used
//   as the "translation". For a full list of keys, please see BASE.tsx

const en = {
	// Concepts
	translation: {
		conceptsInfo: {
			basic1:
				`Presented here are a number of lists of basic concepts, which were
				originaly created for the purposes of historical-comparative
				linguistics.`,
			basic2:
				`They are included in this app because they may serve you as a
				useful source of meanings to start a conlang with. Remember: you can
				combine multiple meanings into a single word!`,
			controlLexicon: 'Use the "lexicon" button to quickly save meanings to $t(the Lexicon).',
			controlJoin: 'Use the "join" button to create compound meanings.',
			controlUnjoin: 'Use the "unjoin" button to delete compound meanings.',
			swadesh1: 
				`Originally assembled by Morris Swadesh, this list of
				concepts was chosen for their universal, culturally
				independent availability in as many languages as possible.
				However, he relied more on his intuition than on a
				rigorous set of criteria. `,
			swadesh2: " is his final list from 1971. The ",
			swadesh3: " is adapted from his original list from 1952. ",
			swadesh4: " is a subset of the 207 assembled by Sergei Yakhontov. And the ",
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
			asjp2:
				` is a collaborative project applying computational approaches
				to comparative linguistics using a database of word lists. It
				uses a 40-word list to evaluate the similarity of words with
				the same meaning from different languages.`,
			landau1: "The ",
			landau2:
				` is a subset of the `,
			landau3:
				` developed by James Landau. It is Part I of the entire
				$t(LCV). This list consists of 200 basic concepts that
				basically all anthropic cultures will have and have words for.
				This list makes many semantic distinctions that are not made
				in English (e.g "leaf (on plant)" vs. "leaf (fallen off)"),
				and some that are not made in any "Standard Average European"
				language (e.g. "river (flowing into the sea)" vs. "river
				(flowing into another river)").`,
		},
		delMeanings_one: "Delete {{count}} meaning?",
		delMeanings_other: "Delete {{count}} meanings?",
		delMeaningsMessage_one: "The selected meaning will be removed. $t(cannotUndo)",
		delMeaningsMessage_other: "The selected meanings will be removed. $t(cannotUndo)",
		// Common
		cannotUndo: "This cannot be undone.",
		saveToLexColumn: "{{what}} saved to $t(Lexicon) under \"{{column}}\"",
		confirmDel_one: "Yes, Delete It",
		confirmDel_other: "Yes, Delete Them",
	},
};

export default en;
