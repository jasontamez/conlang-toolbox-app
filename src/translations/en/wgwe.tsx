const wgwe = {

	// WordGen and WordEvolve common terms

	charGroup_one: "character group",
	charGroup_other: "character groups",
	CharGroup_one: "Character Group",
	CharGroup_other: "Character Groups",
	"Delete All": "Delete All", // <D:H>
	delAllCharGroups_one:
		"This will delete the current $t(charGroup_one), and cannot be undone.",
	delAllCharGroups_other:
		"This will delete all {{count}} current $t(charGroup_other), and cannot be undone.",
	delAllTransforms_one:
		"This will delete the current transformation, and cannot be undone.",
	delAllTransforms_other:
		"This will delete all {{count}} current $t(wgwe:trans_other), and cannot be undone.",
	importCharGroups_one: "Imported 1 $t(CharGroup_one).",
	importCharGroups_other: "Imported {{count}} $t(CharGroup_other).",
	importOverwriteCG:
		"If any current character group has the same label as an incoming"
		+ " character group,the current character group will be overwritten."
		+ " Do you want to continue?",

	Transformations_one: "Transformation",
	Transformations_other: "Transformations",
	trans_one: "transformation",
	trans_other: "transformations",
	"Description of the transformation": "Description of the transformation",
	"Description of the transformation_formal": "Description of the transformation",
	"Description of the transformation_presentation": "Transformation Description:",

	"No search expression present": "No search expression present",
	"search expression": "search expression",
	"search expression_formal": "Search Expression",
	"search expression_presentation": "Search Expression:",
	"replacement expression": "replacement expression",
	"replacement expression_formal": "Replacement Expression",
	"replacement expression_presentation": "Replacement Expression:",

	"Character Groups Tab": "Character Groups Tab",

	"Transformations Tab": "Transformations Tab",
	"Output Tab": "Output Tab",
	"Output Options": "Output Options",

	"transformation description": "transformation description",

	"Unable to suggest a unique label from the given descrption.": // [T:4]
		"Unable to suggest a unique label from the given descrption.",
	"No title present": "No title present", // <D>
	"No label present": "No label present", // <D>
	duplicateLabel: "There is already a label \"{{label}}\"", // <D>
	invalidLabel: "You cannot use \"{{label}}\" as a label", // <D>
	"No run present": "No run present", // <D>

	"Title or description": "Title or description", // {A}
	"Title or description_presentation": "Title/Description:", // |H|
	"Short Label": "Short Label", // {A}
	"Short Label_presentation": "Short Label:", // |H|
	"1 character only": "1 character only",
	Suggest: "Suggest", // (B) suggest a 1-character label for this character group
	"Letters Characters": "Letters, Characters", // {A}
	"Letters Characters_presentation": "Letters/Characters:", // |H|
	"Enter characters in group here": "Enter characters in $t(CharGroup_one) here",
	"what to change": "what to change",
	"what it changes into": "what it changes into",

};

export default wgwe;
