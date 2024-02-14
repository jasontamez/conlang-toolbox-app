const appinfo = {

	// APP INFO

	"Credits and Acknowledgements": "Credits and Acknowledgements",
	credits: {
		toolbox1: "App icon is based on ",
		toolbox2: "Toolbox by Maxicons", // 'Toolbox' is the name of the icon, 'Maxicons' is the creator of the icon
		toolbox3: " from the Noun Project", // the Noun Project is a proper name
		wgwe1: "$t(common:WordGen) and $t(common:WordEvolve) heavily inspired by ",
			// Gen
		wgwe2: " and ",
			// SCA²
		wgwe3: " by Mark Rosenfelder",
		ms1: "$t(common:MorphoSyntax) is based on an outline presented throughout ",
		ms2: "Describing Morphosyntax: A Guide for Field Linguists", // title of book
		ms3: " by Thomas E. Paine, and it also uses some foreign-language examples presented therein"
	},
	"Bug Reports": "Bug Reports",
	bugReport1: "Please report bugs and errors to ",
	// (email)
	bugReport2: " and incude an error log.",
	"Get Error Log": "Get Error Log",

	// 'state' refers to the info saved by the app that is used to display info,
	//   create info, etc.
	"Entire State": "Entire State",
	"Debug Info": "Debug Info",
	// 'logs' refer to hidden reports/notes that the app sometimes makes when
	//   it encounters an error.
	"Copy Logs": "Copy Logs",
	"Clear Logs": "Clear Logs",
	"Logs normally delete themselves after 90 days. Deleting logs this way cannot be undone.":
		"Logs normally delete themselves after 90 days. Deleting logs this way cannot be undone.",
	"Delete Them Now": "Delete Them Now",
	"Logs have been cleared.": "Logs have been cleared.",

	"Changelog": "Changelog", // a list of changes made to the app
	"Bugs fixed": "Bugs fixed",
	"Hide Older Changes": "Hide Older Changes",
	"Show Older Changes": "Show Older Changes",
	changelog: {
		//v0.11.3
		v0113p1: "Overhauled main page.",
		v0113p2: "Added an \"$t(common:Overview)\" to each tool.",
		v0113p3p1: "Created new tool ",
			// "Declenjugator"
		v0113p3p2: " for crafting declensions and conjugations.",
		v0113p4: "Added ability to copy $t(wgwe:Character Groups) between $t(common:WordGen) and $t(common:WordEvolve).",
		v0113p5: "$t(settings:Export All Data) now has a copy-to-clipboard button, and you can limit what you export.",
		v0113p6: "Added ability to import data through $t(common:Settings).",
		v0113p7: "Text and DOCX exports now have the option of omitting sections you did not fill out.",
		v0113p8: "DOCX exports now italicize the text prompts, to make them visually distinct from your responses.",
		v0113p9: "Older $t(common:WordGen)/$t(common:WordEvolve)/etc saves were sometimes unable to be loaded.",
		v0113p10: "$t(common:MorphoSyntax) export wasn't working.",
		v0113p11: "Some tables were not displaying correctly in $t(common:MorphoSyntax) info modals.",
		v0113p12: "Some $t(common:WordGen) syllables weren't saving correctly.",
		v0113p13: "$t(common:WordGen)/$t(common:WordEvolve) $t(wgwe:Transforms) with %X references were silently crashing if no category \"X\" existed.",
		//v0.10.1
		v0101p1: "Bugfix: some properties were not being saved or were otherwise coded wrong in $t(common:MorphoSyntax). This has been fixed.",
		v0101p2: "Added sorting settings under the main $t(common:Settings) page. Your options are limited to the languages supported by your device, but you can create custom sorting routines to alphabetize your data if you need it. These routines can be used inside $t(common:WordGen), $t(common:WordEvolve) and $t(common:Lexicon).",
		v0101p3: "Most $t(common:WordGen) and $t(common:WordEvolve) pages now have header buttons that can be used to clear everything on the page.",
		v0101p4: "$t(common:WordGen) presets now use their own special sorting routine when generating a list of words or syllables.",
		v0101p5: "Added options in $t(common:WordEvolve) to transform input to lowercase and/or sort input before applying sound changes.",
		v0101p6: "Added a mass-delete mode to $t(common:Lexicon).",
		v0101p7: "Numerous other changes invisible to the user.",
		//v.0.9.5
		v095p1: "You can now swipe left on $t(common:Lexicon) items, $t(wgwe:Character Groups), $t(wgwe:Transforms) and $t(wgwe:Sound Changes) to edit or delete them.",
		v095p2: "Changed the way you export information into the $t(common:Lexicon) from other components. It should be more intuitive now.",
		v095p3: "Changed many icons.",
		//MorphoSyntax section
		v095p4: "On smaller screens where all pages can't fit into the tab bar, you will find left and right buttons to scroll through the tabs.",
		//WordGen section
		v095p5: "When making a word list, it will make sure each word is unique. If it can't generate enough unique words, it will fail with an error message.",
		//Lexicon section
		v095p6: "Added a button to the header that will toggle the $t(common:Title) and $t(common:Description), giving you more room to look at your $(common:Lexicon) items when needed.",
		v095p7: "If you need more space than the inline input boxes provide, tap the button at the lower right side of the screen. You'll get a pop-up with full-size inputs.",
		v095p8: "You can tap on an overflowing field to see a pop-up with the full text.",
		v095p9: "Made sorting options easier to find and use.",
		v095p10: "Added an option to handle blank columns while sorting. The default is that they are always sorted to the end, no matter if you sort alphabetically or in reverse alphabetic order.",
		v095p11: "Added a way to merge $t(common:Lexicon) items together by swiping right on them.",
		//Concepts section
		v095p12: "Renamed the \"Word Lists\" component to \"$t(common:Concepts)\".",
		v095p13: "Added a way to create compound meanings.",
		v095p14: "Many under-the-hood changes.",
		//v0.9.4
		v094p1: "Hardware back button should no longer kick you from the app without notice.",
		v094p2: "Fixed some $t(common:MorphoSyntax) information modals that had unreachable info off the side of the screen.",
		v094p3: "Added \"$t(concepts:Landau 200)\" to $t(common:Concepts).",
	},

};

export default appinfo;
