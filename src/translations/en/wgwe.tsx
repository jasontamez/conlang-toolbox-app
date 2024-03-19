const wgwe = {

	// WordGen and WordEvolve common terms

	"Character Group": "Character Group",
	"Character Groups": "Character Groups",
	charGroup: "character group",
	charGroup_one: "character group",
	charGroup_other: "character groups",
	CharGroup: "Character Group",
	CharGroup_one: "Character Group",
	CharGroup_other: "Character Groups",
	"clearCharGroups?_one": "Clear $t(CharGroup)?",
	"clearCharGroups?_other": "Clear $t(CharGroup_other)?",
	delAllCharGroups_one:
		"This will delete the current $t(charGroup, { \"count\": {{count}} }), and cannot be undone.",
	delAllCharGroups_other:
		"This will delete all {{count}} current $t(charGroup, { \"count\": {{count}} }), and cannot be undone.",
	delAllTransforms_one:
		"This will delete the current $t(wgwe:trans, { \"count\": {{count}} }), and cannot be undone.",
	delAllTransforms_other:
		"This will delete all {{count}} current $t(wgwe:trans, { \"count\": {{count}} }), and cannot be undone.",
	importCharGroups: "{{count}} $t(CharGroup, { \"count\": {{count}} }) imported.",
	importOverwriteWarning:
		"If any current {{thing}} has the same {{label}} as an incoming {{thing}}, "
		+ "the current {{thing}} will be overwritten. Do you want to continue?",

	Transformation: "Transformation",
	Transformations: "Transformations",
	Transformations_one: "Transformation",
	Transformations_other: "Transformations",
	trans: "transformation",
	trans_one: "transformation",
	trans_other: "transformations",
	"Description of the transformation": "$t(common:description_formal) of the $t(wgwe:trans)",
	"Description of the transformation_presentation": "$t(wgwe:Transformation) $t(common:description_formal):",

	"No search expression present": "No search expression present",
	"search expression": "search expression",
	"search expression_formal": "Search Expression",
	"search expression_presentation": "Search Expression:",
	"replacement expression": "replacement expression",
	"replacement expression_formal": "Replacement Expression",
	"replacement expression_presentation": "Replacement Expression:",

	"Character Groups Tab": "$t(Character Groups) Tab",

	"Transformations Tab": "$t(Transformations) Tab",
	"Output Tab": "$t(common:Output) Tab",
	"Output Options": "Output Options",

	description: "description",
	label: "label",
	label_one: "label",
	label_other: "labels",
	labels: "$t(wgwe:label_other)",
	run: "run",

	"transformation description": "$t(wgwe:trans) $t(common:description)",

	"Save everything": "Save everything",
	"Choose what to save": "Choose what to save",

	"Unable to suggest a unique label from the given descrption.":
		"Unable to suggest a unique label from the given descrption.",
	"No title present": "No title present",
	"No label present": "No label present",
	duplicateLabel: "There is already a label \"{{label}}\"",
	invalidLabel: "You cannot use \"{{label}}\" as a label",
	"No run present": "No run present",

	"Title or description": "Title or description",
	"Title or description_presentation": "Title/Description:",
	"Short Label": "Short Label",
	"Short Label_presentation": "Short Label:",
	"1 character only": "1 character only",
	Suggest: "Suggest", // suggest a 1-character label for this character group
	"Letters Characters": "Letters, Characters",
	"Letters Characters_presentation": "Letters/Characters:",
	"Enter characters in group here": "Enter characters in $t(CharGroup) here",
	"what to change": "what to change",
	"what it changes into": "what it changes into",

};

export default wgwe;
