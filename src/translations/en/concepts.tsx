const concepts = {
	// Concepts
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
			to the $t(common:Lexicon).`,

		controlJoin: "Use the \"join\" button to create compound meanings.",

		controlUnjoin: "Use the \"unjoin\" button to delete compound meanings.",

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
	"Swadesh-Woodward": "Swadesh-Woodward",
	"Swadesh-Woodward Sign List": "$t(Swadesh-Woodward) Sign List",

	Dolgopolsky: "Dolgopolsky",
	"Dolgopolsky List": "$t(Dolgopolsky) List",

	"Leipzig-Jakarta": "Leipzig-Jakarta",
	"Leipzig-Jakarta List": "$t(Leipzig-Jakarta) List",

	ASJP: "ASJP",
	"ASJP List": "$t(ASJP) List",
	"Automated Similarity Judgment Program": "Automated Similarity Judgment Program",

	"Landau 200": "Landau 200",
	"Basic 200 List": "Basic 200 List",
	"Landau Core Vocabulary (LCV)": "Landau Core Vocabulary $t(LCV)",
	LCV: "LCV",

	"Your selected meanings will be added to the Lexicon under that column.":
		"Your selected meanings will be added to the $t(common:Lexicon) under that column.",

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
		"Tap meanings you want to save to $t(common:Lexicon)",

	"Selected meanings_one": "Selected meaning", // Fills the {{what}} role in saveToLexColumn
	"Selected meanings_other": "Selected meanings",

	"Tap combinations you want to delete, then tap the Unlink button again.":
		"Tap combinations you want to delete, then tap the Unlink button again.",

	delMeanings_one: "Delete {{count}} meaning?",
	delMeanings_other: "Delete {{count}} meanings?",
	delMeaningsMessage_one: "The selected meaning will be removed. $t(common:cannotUndo)",
	delMeaningsMessage_other: "The selected meanings will be removed. $t(common:cannotUndo)",

	"My Combinations": "My Combinations",
	"Save All Meanings": "Save All Meanings",
	"Save Selected Meanings": "Save Selected Meanings",
	"Current Combination[colon]": "Current Combination:",

	//
	//
	// Here comes the core concepts section...

	"1st-person plural pronoun (we)": "1st-person plural pronoun (we)",
	"1st-person singular pronoun (I)": "1st-person singular pronoun (I)",
	"2nd-person plural pronoun (you)": "2nd-person plural pronoun (you)",
	"2nd-person singular pronoun (you)": "2nd-person singular pronoun (you)",
	"3rd-person plural pronoun (they)": "3rd-person plural pronoun (they)",
	"3rd-person singular pronoun (he/she/it/him/her)": "3rd-person singular pronoun (he/she/it/him/her)",
	afraid: "afraid",
	air: "air",
	"all (of a number)": "all (of a number)",
	and: "and",
	angry: "angry",
	animal: "animal",
	ant: "ant",
	arm: "arm",
	"ash(es)": "ash(es)",
	"ask (a question)": "ask (a question)",
	at: "at",
	baby: "baby",
	"back (of object/building)": "back (of object/building)",
	bad: "bad",
	"bark (of a tree)": "bark (of a tree)",
	because: "because",
	"belly (lower part of body, abdomen)": "belly (lower part of body, abdomen)",
	big: "big",
	bird: "bird",
	"bite (verb)": "bite (verb)",
	bitter: "bitter",
	"black (color)": "black (color)",
	blood: "blood",
	"blow (breathe out)": "blow (breathe out)",
	body: "body",
	bone: "bone",
	"bottom (of object/mountain)": "bottom (of object/mountain)",
	"boy (male child)": "boy (male child)",
	"boy (young man)": "boy (young man)",
	"break/shatter (verb)": "break/shatter (verb)",
	"breast (woman's)": "breast (woman's)",
	"breathe (verb)": "breathe (verb)",
	brother: "brother",
	"build (construct)": "build (construct)",
	"burn (something)": "burn (something)",
	"carry (verb)": "carry (verb)",
	cat: "cat",
	"child (reciprocal of parent)": "child (reciprocal of parent)",
	"child (young human)": "child (young human)",
	claw: "claw",
	"climb (a mountain, hill)": "climb (a mountain, hill)",
	"climb (a tree)": "climb (a tree)",
	"close (one's eyes)": "close (one's eyes)",
	clothes: "clothes",
	"cloud (not fog)": "cloud (not fog)",
	cold: "cold",
	"come (verb)": "come (verb)",
	"cook (verb)": "cook (verb)",
	correct: "correct",
	"count (verb)": "count (verb)",
	"crush/grind (verb)": "crush/grind (verb)",
	"cry/weep (verb)": "cry/weep (verb)",
	"cut (verb)": "cut (verb)",
	"dance (verb)": "dance (verb)",
	"daughter (of a father)": "daughter (of a father)",
	"daughter (of a mother)": "daughter (of a mother)",
	"day/daytime": "day/daytime",
	dead: "dead",
	"deep (vertically)": "deep (vertically)",
	"die (verb)": "die (verb)",
	"dig (verb)": "dig (verb)",
	dirty: "dirty",
	"do/make (verb)": "do/make (verb)",
	dog: "dog",
	"drink (verb)": "drink (verb)",
	"dry (substance)": "dry (substance)",
	"dull (as a knife)": "dull (as a knife)",
	dust: "dust",
	ear: "ear",
	"earth (ground, dirt)": "earth (ground, dirt)",
	"eat (verb)": "eat (verb)",
	egg: "egg",
	evening: "evening",
	"eye (noun)": "eye (noun)",
	face: "face",
	"fall (verb)": "fall (verb)",
	far: "far",
	fast: "fast",
	father: "father",
	"fear (verb)": "fear (verb)",
	"feather (large, not down)": "feather (large, not down)",
	"feel (through touch)": "feel (through touch)",
	few: "few",
	"fight (verb)": "fight (verb)",
	finger: "finger",
	fingernail: "fingernail",
	"fire (noun)": "fire (noun)",
	"fish (animal)": "fish (animal)",
	five: "five",
	"flesh (meat)": "flesh (meat)",
	"float (verb)": "float (verb)",
	"flow (verb)": "flow (verb)",
	flower: "flower",
	"fly (verb)": "fly (verb)",
	fog: "fog",
	food: "food",
	"foot (part of body; not leg)": "foot (part of body; not leg)",
	forest: "forest",
	four: "four",
	"freeze (something)": "freeze (something)",
	friend: "friend",
	"front (of object/building)": "front (of object/building)",
	fruit: "fruit",
	full: "full",
	"girl (female child)": "girl (female child)",
	"girl (young woman)": "girl (young woman)",
	"give (verb)": "give (verb)",
	"go (on foot)": "go (on foot)",
	good: "good",
	grass: "grass",
	"grease/fat": "grease/fat",
	"green (color)": "green (color)",
	"grow (intransitive verb)": "grow (intransitive verb)",
	guts: "guts",
	"hair (mass on head of humans)": "hair (mass on head of humans)",
	hand: "hand",
	happy: "happy",
	hard: "hard",
	"head (anatomic)": "head (anatomic)",
	"hear (verb)": "hear (verb)",
	heart: "heart",
	heavy: "heavy",
	here: "here",
	"hide (verb)": "hide (verb)",
	"high (in altitude)": "high (in altitude)",
	"hit/beat (verb)": "hit/beat (verb)",
	"hold (verb)": "hold (verb)",
	"horn (animal part)": "horn (animal part)",
	hot: "hot",
	"house (noun)": "house (noun)",
	how: "how",
	"hunt (verb)": "hunt (verb)",
	"hurt/injure (verb)": "hurt/injure (verb)",
	husband: "husband",
	ice: "ice",
	if: "if",
	in: "in",
	"kick (verb)": "kick (verb)",
	"kill (verb)": "kill (verb)",
	"kill/murder": "kill/murder",
	knee: "knee",
	"know (a person)": "know (a person)",
	"know (information)": "know (information)",
	lake: "lake",
	"laugh (verb)": "laugh (verb)",
	"leaf (fallen off)": "leaf (fallen off)",
	"leaf (on plant)": "leaf (on plant)",
	"left (not right)": "left (not right)",
	leg: "leg",
	"lie (on back)": "lie (on back)",
	"lie (on side, recline, as in a bed)": "lie (on side, recline, as in a bed)",
	"life (experience of living)": "life (experience of living)",
	"light (natural)": "light (natural)",
	"live (verb)": "live (verb)",
	liver: "liver",
	"long (not wide)": "long (not wide)",
	"louse/nit": "louse/nit",
	"love (as a friend)": "love (as a friend)",
	"love (romantically)": "love (romantically)",
	"low (in altitude)": "low (in altitude)",
	"man (adult male)": "man (adult male)",
	many: "many",
	meat: "meat",
	"meet (for the first time)": "meet (for the first time)",
	"mind (center of thoughts and emotions)": "mind (center of thoughts and emotions)",
	moon: "moon",
	"morning (early morning)": "morning (early morning)",
	"morning (late morning)": "morning (late morning)",
	mother: "mother",
	"mountain (not hill)": "mountain (not hill)",
	mouth: "mouth",
	music: "music",
	"name (noun)": "name (noun)",
	narrow: "narrow",
	navel: "navel",
	near: "near",
	"neck (not nape)": "neck (not nape)",
	new: "new",
	"night/nighttime": "night/nighttime",
	"no/not": "no/not",
	nose: "nose",
	"old (not new)": "old (not new)",
	"older brother (of a brother)": "older brother (of a brother)",
	"older brother (of a sister)": "older brother (of a sister)",
	"older sister (of a brother)": "older sister (of a brother)",
	"older sister (of a sister)": "older sister (of a sister)",
	one: "one",
	"open (one's eyes)": "open (one's eyes)",
	other: "other",
	"path/road/trail (not street)": "path/road/trail (not street)",
	"person (individual human)": "person (individual human)",
	pig: "pig",
	plant: "plant",
	"play (a game)": "play (a game)",
	"pull (verb)": "pull (verb)",
	"push (verb)": "push (verb)",
	"rain (noun)": "rain (noun)",
	"red (color)": "red (color)",
	"right (not left)": "right (not left)",
	river: "river",
	"river (flowing into another river)": "river (flowing into another river)",
	"river (flowing into the sea)": "river (flowing into the sea)",
	"root (botanics)": "root (botanics)",
	rope: "rope",
	rotten: "rotten",
	"rough (of surface)": "rough (of surface)",
	"round (spherical)": "round (spherical)",
	"rub (verb)": "rub (verb)",
	"run (verb)": "run (verb)",
	sad: "sad",
	salt: "salt",
	"salt (in sea)": "salt (in sea)",
	sand: "sand",
	"say (verb)": "say (verb)",
	"scratch (verb)": "scratch (verb)",
	"sea/ocean": "sea/ocean",
	"see (verb)": "see (verb)",
	"seed (in fruit)": "seed (in fruit)",
	"seed (to be planted)": "seed (to be planted)",
	"sew (verb)": "sew (verb)",
	"shade/shadow": "shade/shadow",
	"sharp (as a knife)": "sharp (as a knife)",
	"short (height)": "short (height)",
	"short (length)": "short (length)",
	"sing (verb)": "sing (verb)",
	sister: "sister",
	"sit (verb)": "sit (verb)",
	"skin/hide": "skin/hide",
	sky: "sky",
	"sleep (verb)": "sleep (verb)",
	slow: "slow",
	small: "small",
	"smell (verb)": "smell (verb)",
	"smoke (noun, of fire)": "smoke (noun, of fire)",
	"smooth (adjective)": "smooth (adjective)",
	snake: "snake",
	snow: "snow",
	soft: "soft",
	soil: "soil",
	some: "some",
	"son (of a father)": "son (of a father)",
	"son (of a mother)": "son (of a mother)",
	"speak/talk (verb)": "speak/talk (verb)",
	"spit (verb)": "spit (verb)",
	"split (verb)": "split (verb)",
	"squeeze (verb)": "squeeze (verb)",
	"stab (verb)": "stab (verb)",
	"stand (verb)": "stand (verb)",
	star: "star",
	stick: "stick",
	"stone/rock": "stone/rock",
	straight: "straight",
	"suck (verb)": "suck (verb)",
	sun: "sun",
	sweet: "sweet",
	"swell (verb)": "swell (verb)",
	"swim (verb)": "swim (verb)",
	tail: "tail",
	"take (pick up and carry)": "take (pick up and carry)",
	"tear/teardrop": "tear/teardrop",
	thank: "thank",
	that: "that",
	there: "there",
	thick: "thick",
	thigh: "thigh",
	thin: "thin",
	"think (verb)": "think (verb)",
	this: "this",
	three: "three",
	"throw (verb)": "throw (verb)",
	"tie (verb)": "tie (verb)",
	"tongue (part of body)": "tongue (part of body)",
	tooth: "tooth",
	"top (of object/mountain)": "top (of object/mountain)",
	"touch (verb)": "touch (verb)",
	"tree (not log)": "tree (not log)",
	"turn (intransitive verb)": "turn (intransitive verb)",
	"two/pair": "two/pair",
	"vomit (verb)": "vomit (verb)",
	"walk (verb)": "walk (verb)",
	warm: "warm",
	"wash (body parts)": "wash (body parts)",
	"water (as drink or for cooking, cold)": "water (as drink or for cooking, cold)",
	"water (as drink or for cooking, hot)": "water (as drink or for cooking, hot)",
	"water (cold, moving)": "water (cold, moving)",
	"water (cold, not moving)": "water (cold, not moving)",
	"water (hot, moving)": "water (hot, moving)",
	"water (hot, not moving)": "water (hot, not moving)",
	"water (noun)": "water (noun)",
	wet: "wet",
	"what?": "what?",
	"when?": "when?",
	"where?": "where?",
	"white (color)": "white (color)",
	"who?": "who?",
	wide: "wide",
	wife: "wife",
	"wind (noun)": "wind (noun)",
	"wing (anatomic)": "wing (anatomic)",
	"wipe (verb)": "wipe (verb)",
	with: "with",
	woman: "woman",
	wood: "wood",
	work: "work",
	world: "world",
	worm: "worm",
	year: "year",
	"yellow (color)": "yellow (color)",
	yesterday: "yesterday",
	"younger brother (of a brother)": "younger brother (of a brother)",
	"younger brother (of a sister)": "younger brother (of a sister)",
	"younger sister (of a brother)": "younger sister (of a brother)",
	"younger sister (of a sister)": "younger sister (of a sister)",

};

export default concepts;
