const appinfo = {

	// APP INFO

	"Credits and Acknowledgements": "Credits and Acknowledgements", // |H|
	credit1: [ // Markdown format
		"App icon is based on",
		"[Toolbox by Maxicons](https://thenounproject.com/term/toolbox/2586725/)",
		"from the Noun Project"
	],
	credit2: [ // Markdown format
		"$t(common:WordGen) and $t(common:WordEvolve) are heavily inspired by",
		"[Gen](http://www.zompist.com/gen.html) and",
		"[SCA²](http://www.zompist.com/sca2.html) by Mark Rosenfelder",
	],
	credit3: [ // Markdown format
		"$t(common:MorphoSyntax) is based on an outline presented throughout",
		"_Describing Morphosyntax: A Guide for Field Linguists_ by Thomas",
		"E. Paine, and it also uses some foreign-language examples",
		"presented therein"
	],

	"Bug Reports": "Bug Reports", // |H|
	bugReportMsg: [ // Markdown format
		"Please report bugs and errors to",
		"[jasontankapps@gmail.com](mailto:jasontankapps@gmail.com) and",
		"incude an error log."
	],
	"Get Error Log": "Get Error Log", // (B)

	// 'state' refers to the info saved by the app that is used to display info,
	//   create info, etc.
	"Entire State": "Entire State", // <D:H>
	"Debug Info": "Debug Info", // <D:H>

	// 'logs' refer to hidden reports/notes that the app sometimes makes when
	//   it encounters an error.
	"Copy Logs": "Copy Logs", // (B)
	"Clear Logs": "Clear Logs", // (B)
	"Logs normally delete themselves after 90 days. Deleting logs this way cannot be undone.": // <D>
		"Logs normally delete themselves after 90 days. Deleting logs this way cannot be undone.",
	"Delete Them Now": "Delete Them Now", // (B)
	"Logs have been cleared.": "Logs have been cleared.", // [T:3.5]

	Changelog: "Changelog", // |H| a list of changes made to the app
	"Hide Older Changes": "Hide Older Changes", // (B)
	"Show Older Changes": "Show Older Changes", // (B)
	changelog: {
		// Markdown format
		//v0.11.3
		v0113: [
			"- Overhauled main page.",
			"- Added an \"$t(common:Overview)\" to each tool.",
			"- Created new tool $t(common:Declenjugator) for crafting",
			"declensions and conjugations.",
			"- Added ability to copy $t(wgwe:CharGroup_other) between",
			"$t(common:WordGen) and $t(common:WordEvolve).",
			"- $t(settings:Export All Data) now has a copy-to-clipboard",
			"button, and you can limit what you export.",
			"- Added ability to import data through $t(common:Settings).",
			"- _$t(common:MorphoSyntax)_",
			"   - Text and DOCX exports now have the option of omitting",
			"sections you did not fill out.",
			"   - DOCX exports now italicize the text prompts, to make them",
			"visually distinct from your responses.",
			"- _Bugs fixed_",
			"   - Older $t(common:WordGen)/$t(common:WordEvolve)/etc saves",
			"were sometimes unable to be loaded.",
			"   - $t(common:MorphoSyntax) export wasn't working.",
			"   - Some tables were not displaying correctly in",
			"$t(common:MorphoSyntax) info modals.",
			"   - Some $t(common:WordGen) syllables weren't saving correctly.",
			"   - $t(common:WordGen)/$t(common:WordEvolve)",
			"$t(wgwe:Transformations_other) with %X references were silently",
			"crashing if no category \"X\" existed.",
		],
		//v0.10.1
		v0101: [
			"- Bugfix: some properties were not being saved or were otherwise",
			"coded wrong in $t(common:MorphoSyntax). This has been fixed.",
			"- Added sorting settings under the main $t(common:Settings)",
			"page. Your options are limited to the languages supported by",
			"your device, but you can create custom sorting routines to",
			"alphabetize your data if you need it. These routines can be used",
			"inside $t(common:WordGen), $t(common:WordEvolve) and",
			"$t(common:Lexicon).",
			"- Most $t(common:WordGen) and $t(common:WordEvolve) pages now",
			"have header buttons that can be used to clear everything on the",
			"page.",
			"- $t(common:WordGen) presets now use their own special sorting",
			"routine when generating a list of words or syllables.",
			"- Added options in $t(common:WordEvolve) to transform input to",
			"lowercase and/or sort input before applying sound changes.",
			"- Added a mass-delete mode to $t(common:Lexicon).",
			"- Numerous other changes invisible to the user."
		],
		//v.0.9.5
		v095: [
			"- You can now swipe left on $t(common:Lexicon) items,",
			"$t(wgwe:CharGroup_other), $t(wgwe:Transformations_other) and",
			"$t(we:Sound Changes) to edit or delete them.",
			"- Changed the way you export information into the",
			"$t(common:Lexicon) from other components. It should be more",
			"intuitive now.",
			"- Changed many icons.",
			"- _$t(common:MorphoSyntax)_",
			"   - On smaller screens where all pages can't fit into the tab",
			"bar, you will find left and right buttons to scroll through",
			"the tabs.",
			"- _$t(common:WordGen)_",
			"   - When making a word list, it will make sure each word is",
			"unique. If it can't generate enough unique words, it will fail",
			"with an error message.",
			"- _$t(common:Lexicon)_",
			"   - Added a button to the header that will toggle the",
			"Title and Description, giving you more room to look at your",
			"$t(common:Lexicon) items when needed.",
			"   - If you need more space than the inline input boxes provide,",
			"tap the button at the lower right side of the screen. You'll",
			"get a pop-up with full-size inputs.",
			"   - You can tap on an overflowing field to see a pop-up with",
			"the full text.",
			"   - Made sorting options easier to find and use.",
			"   - Added an option to handle blank columns while sorting. The",
			"default is that they are always sorted to the end, no matter if",
			"you sort alphabetically or in reverse alphabetic order.",
			"   - Added a way to merge $t(common:Lexicon) items together by",
			"swiping right on them.",
			"- _$t(common:Concepts)_",
			"   - Renamed the \"Word Lists\" component to",
			"\"$t(common:Concepts)\".",
			"   - Added a way to create compound meanings.",
			"- Many under-the-hood changes."
		],
		//v0.9.4
		v094: [
			"- Hardware back button should no longer kick you from the app",
			"without notice.",
			"- Fixed some $t(common:MorphoSyntax) information modals that",
			"had unreachable info off the side of the screen.",
			"- Added \"$t(concepts:Landau 200)\" to $t(common:Concepts)."
		]
	}
};

export default appinfo;
