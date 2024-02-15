const dj = {

	"Groups": "Groups",
	"Words to send through Declenjugator": "Words to send through $(common:Declenjugator)",
	"Enter words here, one per line": "Enter words here, one per line",
	"Group deleted.": "Group deleted.",
	"Delete Entire Group": "Delete Entire Group",
	"Are you sure you want to delete this entire Group? It cannot be undone.":
		"Are you sure you want to delete this entire Group? It cannot be undone.",
	"All groups deleted.": "All groups deleted.",
	"Clear All Groups?": "Clear All Groups?",
	"This will delete all current groups, and it cannot be undone.":
		"This will delete all current groups, and it cannot be undone.",
	"Yes, Delete Them": "Yes, Delete Them",

	groupAppliesTo: "; applies to $t(appliesTo)",
	"Add new group": "Add new group",

	Declensions: "Declensions", // group of declensions on-screen
	Conjugations: "Conjugations", // group of conjugations on-screen
	Other: "Other", // group of 'other' type on-screen
	declension: "declension",
	conjugation: "conjugation",
	other: "other",

	"You didn't select a format.": "You didn't select a format.",
	"Please choose at least one group to display.":
		"Please choose at least one group to display.",
	"Unmatched Words": "Unmatched Words",

	"Display as[colon]": "Display as:",
	"Chart, Top Headers": "Chart, Top Headers",
	"Chart, Side Headers": "Chart, Side Headers",
	Text: "Text",

	"Use Input": "Use Input",
	"Display the declensions/conjugations of words in the input.":
		"Display the declensions/conjugations of words in the input.",
	"Show Group Info": "Show Group Info",
	"Include general group information.": "Include general group information.",
	"Show Examples": "Show Examples",
	"Include generic example.": "Include generic example.",
	"Sort Input": "Sort Input",
	"One Match": "One Match",
	"Input words can only match one declension/conjugation/etc.":
		"Input words can only match one declension/conjugation/etc.",
	"Show Unmatched Words": "Show Unmatched Words",
	"Display any words that were not matched by any group.":
		"Display any words that were not matched by any group.",

	"Input Tab": "Input Tab",
	"Groups Tab": "Groups Tab",
	"Output Tab": "Output Tab",
	"Overview: Declenjugator": "$t(common:Overview): $t(common:Declenjugator)",

	stem: "stem",
	word: "word",
	"Remove from End of Word": "Remove from End of Word",
	"Remove from End of Word to Find Root": "Remove from End of Word to Find Root",
	"Remove from Start of Word": "Remove from Start of Word",
	"Remove from Start of Word to Find Root": "Remove from Start of Word to Find Root",
	"advanced method": "advanced method",
	"Use advanced method": "Use advanced method",
	"Use entire word": "Use entire word",
	"Add New": "Add New",

	"1st-person": "1st-person",
	"2nd-person": "2nd-person",
	"3rd-person": "3rd-person",
	singular: "singular",
	plural: "plural",
	present: "present",
	"(blank)": "(blank)",

	info: {
		input1:
			`This tab has one purpose: determining which words you want to
			decline or conjugate. Using this tab is entirely optional.`,

		input2p1:
			`The easiest way is to copy-paste a list of words, each on a line
			by itself. Or, you can use the `,
			// "Import From Lexicon"
		input2p2: " button to pull in words stored in the ",
			// Lexicon
		input2p3: ".",

		input3p1: "Use the ",
			// Clear
		input3p2: " button to empty all words from Input.",

		groups1:
			`This is where you define groups of declensions and conjugations.
			Most languages treat certain groupings of words differently when
			they are declined or conjugated. For instance, English only
			declines its pronouns for case and person, while Spanish has
			different conjugations for verbs depending on if they end in
			-ar, -er, or -ir.`,

		groups2p1:
			`Click the (+) button to add a new group. When you make a group,
			you must give it a title or description. You can choose to label
			this as a `,
			// declension
		groups2p2: ", a ",
			// conjugation
		groups2p3: ", or under ",
			// other
		groups2p4:
			` if you don't want to use those labels. Optionally, you can note
			what types of words this group will apply to.`,

		groups3:
			`Next, you will provide instructions on how to find the
			"$t(stem)" of the word. For example, if you were creating a
			conjugation for words ending in -ar, you would put "ar" in the
			box labelled "$t(Remove from End of Word to Find Root)".`,

		groups4p1:
			`Note: You can provide multiple conditions. For instance,
			putting "ar" in both boxes will match words that begin with ar-`,
		groups4p2: "and",
		groups4p3:
			` end with -ar. You can also hit the "$t(Use advanced method)"
			toggle switch to use `,
			//regular expressions
		groups4p4:
			`to find a stem. (See the end of this section for more info on
			$t(common:regular expressions).)`,

		groups5:
			`At the bottom of the form, you will see an "$t(Add New)" button.
			Use this to create the group's individual declensions or
			conjugations. For simplicity, we will use the term "method" to
			mean either.`,

		groups6:
			`First, you give the method a title. There is a small (+) button
			next to the input that will open a pop-up with numerous common
			declension and conjugation types, if you wish to use it.`,

		groups7:
			`Below that is a toggle "$t(Use entire word)". If checked, the
			method will operate on the entire word instead of just the stem.`,

		groups8:
			`At the bottom, there are two input boxes around the word
			"$t(stem)". (This becomes "$t(word)" if you check the toggle
			above.) If this method would add a prefix, put the prefix in the
			box before "$t(stem)". If it would use a suffix, put it in the box
			after "$t(stem)". You can use both boxes for a circumfix, but for
			infixes and other more complicated changes, you will need to use
			the "$t(advanced method)" and regular expressions.`,

		groups9p1:
			`Once your groups are made, they will show up on the screen. Swipe
			left on them to find $t(common:Edit) and $t(common:Delete) buttons.
			You can also use the `,
			// [drag handle icon]
		groups9p2:
			` drag handles to rearrange their order. (Note: you can't
			rearrange across types, dragging a "$t(conjugation)" into the
			"$t(other)" or "$t(declension)" areas, for example. If you want
			to change its type, swipe left and choose the $t(common:Edit)
			button.)`,

		groups10:
			`Here's an example of possible methods you could make for a
			Spanish-type conjugation:`,

		colon: ":",

		output1p1:
			`This is where you can find the results of your work. At the top
			of the page, you can choose how you want the information to
			display, and choose if you want to display declensions,
			conjugations, and/or other. If you want to decline/conjugate words
			you put in the `,
			// Input
		output1p2:
			` tab, be sure to switch the toggle on. It will open up a new set
			of options you can use to fine-tune the results.`,

		output2p1:
			`Click on t(common:Generate) to display your info, or click on
			t(common:Export) to export your info to a file. `,
		output2p2: "Note",
		output2p3:
			`: when displaying a chart in the app, it may clip off the edge
			of the screen. If this happens, you can drag the chart left and
			right to scroll the hidden areas into view.`,


		overview0: "What is $t(common:Declenjugator)?",

		overview1p1: "This tool is for creating ",
			// declensions
		overview1p2: " and ",
			// conjugations
		overview1p3: ".",

		overview2:
			`A declension is, at its most basic, modifying a word to show its
			role in a sentence. Declensions may apply to nouns, pronouns,
			adjectives, adverbs, and articles to indicate number (singular,
			dual, plural, etc), case (nominative, accusative, genitive,
			dative, etc), gender (male, female, inanimate, etc), and other
			grammatical categories.`,

		overview3:
			`A conjugation is much like a declension, but it modifies verbs.
			Like declensions, they can indicate number, gender, and case, but
			they also often include person (I, you, they, etc), tense (past,
			present, future, etc), aspect (perfect, imperfect, etc),
			mood/mode, politeness, and numerous other verb qualities.`
	}

};

export default dj;
