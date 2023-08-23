import { WL } from "./ReduxDucksTypes";

export const WordListSources: [string, keyof WL][] = [
	["Swadesh 100", "s100"],
	["Swadesh 207", "s207"],
	["Swadesh-Yakhontov", "sy"],
	["Swadesh-Woodward", "ssl"],
	["Dolgopolsky", "d"],
	["Leipzig-Jakarta", "lj"],
	["ASJP", "asjp"],
	["Landau 200", "l200"]
];

export const WordList: WL[] = [
	{
		word: "1st-person plural pronoun (we)",
		s100: true,
		s207: true,
		asjp: true
	},
	{
		word: "1st-person singular pronoun (I)",
		sy: true,
		s100: true,
		s207: true,
		lj: true,
		d: true,
		asjp: true
	},
	{
		word: "2nd-person plural pronoun (you)",
		s207: true
	},
	{
		word: "2nd-person singular pronoun (you)",
		sy: true,
		s207: true,
		lj: true,
		d: true,
		asjp: true
	},
	{
		word: "3rd-person plural pronoun (they)",
		s207: true
	},
	{
		word: "3rd-person singular pronoun (he/she/it/him/her)",
		s207: true,
		lj: true
	},
	{
		word: "afraid",
		l200: true
	},
	{
		word: "air",
		l200: true
	},
	{
		word: "all (of a number)",
		s100: true,
		s207: true,
		ssl: true
	},
	{
		word: "and",
		s207: true
	},
	{
		word: "angry",
		l200: true
	},
	{
		word: "animal",
		s207: true,
		ssl: true
	},
	{
		word: "ant",
		lj: true
	},
	{
		word: "arm",
		lj: true,
		l200: true
	},
	{
		word: "ash(es)",
		s100: true,
		s207: true,
		lj: true
	},
	{
		word: "ask (a question)",
		l200: true
	},
	{
		word: "at",
		s207: true
	},
	{
		word: "baby",
		l200: true
	},
	{
		word: "back (of object/building)",
		s207: true,
		lj: true,
		l200: true
	},
	{
		word: "bad",
		s207: true,
		ssl: true,
		l200: true
	},
	{
		word: "bark (of a tree)",
		s100: true,
		s207: true
	},
	{
		word: "because",
		s207: true,
		ssl: true
	},
	{
		word: "belly (lower part of body, abdomen)",
		s100: true,
		s207: true
	},
	{
		word: "big",
		s100: true,
		s207: true,
		lj: true,
		l200: true
	},
	{
		word: "bird",
		s100: true,
		s207: true,
		ssl: true,
		lj: true
	},
	{
		word: "bite (verb)",
		s100: true,
		s207: true,
		lj: true,
		l200: true
	},
	{
		word: "bitter",
		lj: true
	},
	{
		word: "black (color)",
		s100: true,
		s207: true,
		ssl: true,
		lj: true,
		l200: true
	},
	{
		word: "blood",
		sy: true,
		s100: true,
		s207: true,
		ssl: true,
		lj: true,
		asjp: true,
		l200: true
	},
	{
		word: "blow (breathe out)",
		s207: true,
		lj: true,
		l200: true
	},
	{
		word: "body",
		l200: true
	},
	{
		word: "bone",
		sy: true,
		s100: true,
		s207: true,
		lj: true,
		asjp: true
	},
	{
		word: "bottom (of object/mountain)",
		l200: true
	},
	{
		word: "boy (male child)",
		l200: true
	},
	{
		word: "boy (young man)",
		l200: true
	},
	{
		word: "break/shatter (verb)",
		l200: true
	},
	{
		word: "breast (woman's)",
		s100: true,
		s207: true,
		lj: true,
		asjp: true
	},
	{
		word: "breathe (verb)",
		s207: true,
		l200: true
	},
	{
		word: "brother",
		ssl: true
	},
	{
		word: "build (construct)",
		l200: true
	},
	{
		word: "burn (something)",
		s100: true,
		s207: true,
		lj: true,
		l200: true
	},
	{
		word: "carry (verb)",
		lj: true
	},
	{
		word: "cat",
		ssl: true
	},
	{
		word: "child (reciprocal of parent)",
		lj: true,
		l200: true
	},
	{
		word: "child (young human)",
		s207: true,
		ssl: true,
		l200: true
	},
	{
		word: "claw",
		s100: true
	},
	{
		word: "climb (a mountain, hill)",
		l200: true
	},
	{
		word: "climb (a tree)",
		l200: true
	},
	{
		word: "close (one's eyes)",
		l200: true
	},
	{
		word: "clothes",
		l200: true
	},
	{
		word: "cloud (not fog)",
		s100: true,
		s207: true,
		l200: true
	},
	{
		word: "cold",
		s100: true,
		s207: true,
		l200: true
	},
	{
		word: "come (verb)",
		s100: true,
		s207: true,
		lj: true,
		asjp: true,
		l200: true
	},
	{
		word: "cook (verb)",
		l200: true
	},
	{
		word: "correct",
		s207: true,
		ssl: true
	},
	{
		word: "count (verb)",
		s207: true,
		ssl: true
	},
	{
		word: "crush/grind (verb)",
		lj: true
	},
	{
		word: "cry/weep (verb)",
		lj: true,
		l200: true
	},
	{
		word: "cut (verb)",
		s207: true,
		l200: true
	},
	{
		word: "dance (verb)",
		ssl: true,
		l200: true
	},
	{
		word: "daughter (of a father)",
		l200: true
	},
	{
		word: "daughter (of a mother)",
		l200: true
	},
	{
		word: "day/daytime",
		s207: true,
		ssl: true,
		l200: true
	},
	{
		word: "dead",
		d: true
	},
	{
		word: "deep (vertically)",
		l200: true
	},
	{
		word: "die (verb)",
		sy: true,
		s100: true,
		s207: true,
		ssl: true,
		asjp: true,
		l200: true
	},
	{
		word: "dig (verb)",
		s207: true,
		l200: true
	},
	{
		word: "dirty",
		s207: true,
		ssl: true
	},
	{
		word: "do/make (verb)",
		lj: true
	},
	{
		word: "dog",
		sy: true,
		s100: true,
		s207: true,
		ssl: true,
		lj: true,
		asjp: true
	},
	{
		word: "drink (verb)",
		s100: true,
		s207: true,
		lj: true,
		asjp: true,
		l200: true
	},
	{
		word: "dry (substance)",
		s100: true,
		s207: true,
		ssl: true,
		l200: true
	},
	{
		word: "dull (as a knife)",
		s207: true,
		ssl: true
	},
	{
		word: "dust",
		s207: true,
		ssl: true,
		l200: true
	},
	{
		word: "ear",
		sy: true,
		s100: true,
		s207: true,
		lj: true,
		asjp: true,
		l200: true
	},
	{
		word: "earth (ground, dirt)",
		s100: true,
		s207: true,
		ssl: true,
		l200: true
	},
	{
		word: "eat (verb)",
		s100: true,
		s207: true,
		lj: true,
		l200: true
	},
	{
		word: "egg",
		sy: true,
		s100: true,
		s207: true,
		ssl: true,
		lj: true,
		l200: true
	},
	{
		word: "evening",
		l200: true
	},
	{
		word: "eye (noun)",
		sy: true,
		s100: true,
		s207: true,
		lj: true,
		d: true,
		asjp: true,
		l200: true
	},
	{
		word: "face",
		l200: true
	},
	{
		word: "fall (verb)",
		s207: true,
		lj: true,
		l200: true
	},
	{
		word: "far",
		s207: true,
		lj: true
	},
	{
		word: "fast",
		l200: true
	},
	{
		word: "father",
		s207: true,
		ssl: true,
		l200: true
	},
	{
		word: "fear (verb)",
		s207: true
	},
	{
		word: "feather (large, not down)",
		s100: true,
		s207: true,
		ssl: true
	},
	{
		word: "feel (through touch)",
		l200: true
	},
	{
		word: "few",
		s207: true
	},
	{
		word: "fight (verb)",
		s207: true,
		l200: true
	},
	{
		word: "finger",
		l200: true
	},
	{
		word: "fingernail",
		s207: true,
		d: true,
		l200: true
	},
	{
		word: "fire (noun)",
		sy: true,
		s100: true,
		s207: true,
		ssl: true,
		lj: true,
		asjp: true,
		l200: true
	},
	{
		word: "fish (animal)",
		sy: true,
		s100: true,
		s207: true,
		ssl: true,
		lj: true,
		asjp: true
	},
	{
		word: "five",
		s207: true
	},
	{
		word: "flesh (meat)",
		s100: true,
		s207: true,
		ssl: true,
		lj: true
	},
	{
		word: "float (verb)",
		s207: true
	},
	{
		word: "flow (verb)",
		s207: true,
		l200: true
	},
	{
		word: "flower",
		s207: true,
		ssl: true,
		l200: true
	},
	{
		word: "fly (verb)",
		s100: true,
		s207: true,
		lj: true,
		l200: true
	},
	{
		word: "fog",
		s207: true
	},
	{
		word: "food",
		l200: true
	},
	{
		word: "foot (part of body; not leg)",
		s100: true,
		s207: true,
		l200: true
	},
	{
		word: "forest",
		s207: true
	},
	{
		word: "four",
		s207: true
	},
	{
		word: "freeze (something)",
		s207: true,
		l200: true
	},
	{
		word: "friend",
		l200: true
	},
	{
		word: "front (of object/building)",
		l200: true
	},
	{
		word: "fruit",
		s207: true,
		l200: true
	},
	{
		word: "full",
		sy: true,
		s100: true,
		s207: true,
		ssl: true,
		asjp: true
	},
	{
		word: "girl (female child)",
		l200: true
	},
	{
		word: "girl (young woman)",
		l200: true
	},
	{
		word: "give (verb)",
		sy: true,
		s100: true,
		s207: true,
		lj: true,
		l200: true
	},
	{
		word: "go (on foot)",
		lj: true,
		l200: true
	},
	{
		word: "good",
		s100: true,
		s207: true,
		ssl: true,
		lj: true,
		l200: true
	},
	{
		word: "grass",
		s207: true,
		ssl: true
	},
	{
		word: "grease/fat",
		s100: true,
		s207: true,
		ssl: true
	},
	{
		word: "green (color)",
		s100: true,
		s207: true,
		ssl: true
	},
	{
		word: "grow (intransitive verb)",
		l200: true
	},
	{
		word: "guts",
		s207: true
	},
	{
		word: "hair (mass on head of humans)",
		s100: true,
		s207: true,
		lj: true,
		l200: true
	},
	{
		word: "hand",
		sy: true,
		s100: true,
		s207: true,
		asjp: true,
		l200: true
	},
	{
		word: "happy",
		l200: true
	},
	{
		word: "hard",
		lj: true,
		l200: true
	},
	{
		word: "head (anatomic)",
		s100: true,
		s207: true,
		l200: true
	},
	{
		word: "hear (verb)",
		s100: true,
		s207: true,
		lj: true,
		asjp: true,
		l200: true
	},
	{
		word: "heart",
		s100: true,
		s207: true,
		d: true,
		l200: true
	},
	{
		word: "heavy",
		s207: true,
		ssl: true,
		lj: true,
		l200: true
	},
	{
		word: "here",
		s207: true
	},
	{
		word: "hide (verb)",
		lj: true
	},
	{
		word: "high (in altitude)",
		l200: true
	},
	{
		word: "hit/beat (verb)",
		s207: true,
		lj: true
	},
	{
		word: "hold (verb)",
		s207: true
	},
	{
		word: "horn (animal part)",
		sy: true,
		s100: true,
		s207: true,
		lj: true,
		asjp: true
	},
	{
		word: "hot",
		s100: true,
		l200: true
	},
	{
		word: "house (noun)",
		lj: true,
		l200: true
	},
	{
		word: "how",
		s207: true,
		ssl: true
	},
	{
		word: "hunt (verb)",
		s207: true,
		ssl: true
	},
	{
		word: "hurt/injure (verb)",
		l200: true
	},
	{
		word: "husband",
		s207: true,
		ssl: true
	},
	{
		word: "ice",
		s207: true,
		ssl: true,
		l200: true
	},
	{
		word: "if",
		s207: true,
		ssl: true
	},
	{
		word: "in",
		s207: true,
		lj: true
	},
	{
		word: "kick (verb)",
		l200: true
	},
	{
		word: "kill (verb)",
		s100: true,
		s207: true,
		ssl: true
	},
	{
		word: "kill/murder",
		l200: true
	},
	{
		word: "knee",
		s100: true,
		s207: true,
		lj: true,
		asjp: true,
		l200: true
	},
	{
		word: "know (a person)",
		l200: true
	},
	{
		word: "know (information)",
		sy: true,
		s100: true,
		s207: true,
		lj: true,
		l200: true
	},
	{
		word: "lake",
		s207: true,
		l200: true
	},
	{
		word: "laugh (verb)",
		s207: true,
		ssl: true,
		lj: true,
		l200: true
	},
	{
		word: "leaf (fallen off)",
		l200: true
	},
	{
		word: "leaf (on plant)",
		s100: true,
		s207: true,
		ssl: true,
		lj: true,
		asjp: true,
		l200: true
	},
	{
		word: "left (not right)",
		s207: true,
		l200: true
	},
	{
		word: "leg",
		s207: true,
		lj: true
	},
	{
		word: "lie (on back)",
		l200: true
	},
	{
		word: "lie (on side, recline, as in a bed)",
		s100: true,
		s207: true,
		ssl: true
	},
	{
		word: "life (experience of living)",
		l200: true
	},
	{
		word: "light (natural)",
		l200: true
	},
	{
		word: "live (verb)",
		s207: true,
		ssl: true,
		l200: true
	},
	{
		word: "liver",
		s100: true,
		s207: true,
		lj: true,
		asjp: true
	},
	{
		word: "long (not wide)",
		s100: true,
		s207: true,
		ssl: true,
		lj: true,
		l200: true
	},
	{
		word: "louse/nit",
		sy: true,
		s100: true,
		s207: true,
		ssl: true,
		lj: true,
		d: true,
		asjp: true
	},
	{
		word: "love (as a friend)",
		l200: true
	},
	{
		word: "love (romantically)",
		l200: true
	},
	{
		word: "low (in altitude)",
		l200: true
	},
	{
		word: "man (adult male)",
		s100: true,
		s207: true,
		ssl: true,
		l200: true
	},
	{
		word: "many",
		s100: true,
		s207: true
	},
	{
		word: "meat",
		l200: true
	},
	{
		word: "meet (for the first time)",
		l200: true
	},
	{
		word: "mind (center of thoughts and emotions)",
		l200: true
	},
	{
		word: "moon",
		sy: true,
		s100: true,
		s207: true,
		ssl: true,
		l200: true
	},
	{
		word: "morning (early morning)",
		l200: true
	},
	{
		word: "morning (late morning)",
		l200: true
	},
	{
		word: "mother",
		s207: true,
		ssl: true,
		l200: true
	},
	{
		word: "mountain (not hill)",
		s100: true,
		s207: true,
		ssl: true,
		asjp: true,
		l200: true
	},
	{
		word: "mouth",
		s100: true,
		s207: true,
		lj: true,
		l200: true
	},
	{
		word: "music",
		l200: true
	},
	{
		word: "name (noun)",
		sy: true,
		s100: true,
		s207: true,
		ssl: true,
		lj: true,
		d: true,
		asjp: true
	},
	{
		word: "narrow",
		s207: true,
		ssl: true
	},
	{
		word: "navel",
		lj: true
	},
	{
		word: "near",
		s207: true
	},
	{
		word: "neck (not nape)",
		s100: true,
		s207: true,
		lj: true,
		l200: true
	},
	{
		word: "new",
		sy: true,
		s100: true,
		s207: true,
		ssl: true,
		lj: true,
		asjp: true,
		l200: true
	},
	{
		word: "night/nighttime",
		s100: true,
		s207: true,
		ssl: true,
		lj: true,
		asjp: true,
		l200: true
	},
	{
		word: "no/not",
		s100: true,
		s207: true,
		ssl: true,
		lj: true,
		d: true
	},
	{
		word: "nose",
		sy: true,
		s100: true,
		s207: true,
		lj: true,
		asjp: true,
		l200: true
	},
	{
		word: "old (not new)",
		s207: true,
		ssl: true,
		lj: true,
		l200: true
	},
	{
		word: "older brother (of a brother)",
		l200: true
	},
	{
		word: "older brother (of a sister)",
		l200: true
	},
	{
		word: "older sister (of a brother)",
		l200: true
	},
	{
		word: "older sister (of a sister)",
		l200: true
	},
	{
		word: "one",
		sy: true,
		s100: true,
		s207: true,
		lj: true,
		asjp: true
	},
	{
		word: "open (one's eyes)",
		l200: true
	},
	{
		word: "other",
		s207: true,
		ssl: true
	},
	{
		word: "path/road/trail (not street)",
		s100: true,
		s207: true,
		asjp: true
	},
	{
		word: "person (individual human)",
		s100: true,
		s207: true,
		ssl: true,
		asjp: true,
		l200: true
	},
	{
		word: "pig",
		ssl: true
	},
	{
		word: "plant",
		l200: true
	},
	{
		word: "play (a game)",
		s207: true,
		ssl: true,
		l200: true
	},
	{
		word: "pull (verb)",
		s207: true,
		l200: true
	},
	{
		word: "push (verb)",
		s207: true,
		l200: true
	},
	{
		word: "rain (noun)",
		s100: true,
		s207: true,
		ssl: true,
		lj: true,
		l200: true
	},
	{
		word: "red (color)",
		s100: true,
		s207: true,
		ssl: true,
		lj: true
	},
	{
		word: "right (not left)",
		s207: true,
		l200: true
	},
	{
		word: "river",
		s207: true,
		ssl: true
	},
	{
		word: "river (flowing into another river)",
		l200: true
	},
	{
		word: "river (flowing into the sea)",
		l200: true
	},
	{
		word: "root (botanics)",
		s100: true,
		s207: true,
		lj: true
	},
	{
		word: "rope",
		s207: true,
		ssl: true,
		lj: true
	},
	{
		word: "rotten",
		s207: true
	},
	{
		word: "rough (of surface)",
		l200: true
	},
	{
		word: "round (spherical)",
		s100: true,
		s207: true,
		l200: true
	},
	{
		word: "rub (verb)",
		s207: true
	},
	{
		word: "run (verb)",
		lj: true,
		l200: true
	},
	{
		word: "sad",
		l200: true
	},
	{
		word: "salt",
		sy: true,
		s207: true,
		ssl: true,
		lj: true
	},
	{
		word: "salt (in sea)",
		l200: true
	},
	{
		word: "sand",
		s100: true,
		s207: true,
		lj: true,
		l200: true
	},
	{
		word: "say (verb)",
		s100: true,
		s207: true,
		lj: true,
		l200: true
	},
	{
		word: "scratch (verb)",
		s207: true
	},
	{
		word: "sea/ocean",
		s207: true,
		ssl: true,
		l200: true
	},
	{
		word: "see (verb)",
		s100: true,
		s207: true,
		lj: true,
		asjp: true,
		l200: true
	},
	{
		word: "seed (in fruit)",
		s100: true,
		s207: true,
		l200: true
	},
	{
		word: "seed (to be planted)",
		l200: true
	},
	{
		word: "sew (verb)",
		s207: true
	},
	{
		word: "shade/shadow",
		lj: true
	},
	{
		word: "sharp (as a knife)",
		s207: true,
		ssl: true
	},
	{
		word: "short (height)",
		s207: true,
		ssl: true
	},
	{
		word: "short (length)",
		l200: true
	},
	{
		word: "sing (verb)",
		s207: true,
		ssl: true,
		l200: true
	},
	{
		word: "sister",
		ssl: true
	},
	{
		word: "sit (verb)",
		s100: true,
		s207: true,
		ssl: true,
		l200: true
	},
	{
		word: "skin/hide",
		s100: true,
		s207: true,
		lj: true,
		asjp: true,
		l200: true
	},
	{
		word: "sky",
		s207: true,
		l200: true
	},
	{
		word: "sleep (verb)",
		s100: true,
		s207: true,
		l200: true
	},
	{
		word: "slow",
		l200: true
	},
	{
		word: "small",
		s100: true,
		s207: true,
		lj: true,
		l200: true
	},
	{
		word: "smell (verb)",
		s207: true
	},
	{
		word: "smoke (noun, of fire)",
		s100: true,
		s207: true,
		lj: true
	},
	{
		word: "smooth (adjective)",
		s207: true,
		ssl: true,
		l200: true
	},
	{
		word: "snake",
		s207: true,
		ssl: true
	},
	{
		word: "snow",
		s207: true,
		ssl: true
	},
	{
		word: "soft",
		l200: true
	},
	{
		word: "soil",
		lj: true,
		l200: true
	},
	{
		word: "some",
		s207: true
	},
	{
		word: "son (of a father)",
		l200: true
	},
	{
		word: "son (of a mother)",
		l200: true
	},
	{
		word: "speak/talk (verb)",
		l200: true
	},
	{
		word: "spit (verb)",
		s207: true
	},
	{
		word: "split (verb)",
		s207: true
	},
	{
		word: "squeeze (verb)",
		s207: true
	},
	{
		word: "stab (verb)",
		s207: true
	},
	{
		word: "stand (verb)",
		s100: true,
		s207: true,
		ssl: true,
		lj: true,
		l200: true
	},
	{
		word: "star",
		s100: true,
		s207: true,
		ssl: true,
		lj: true,
		asjp: true,
		l200: true
	},
	{
		word: "stick",
		s207: true,
		l200: true
	},
	{
		word: "stone/rock",
		sy: true,
		s100: true,
		s207: true,
		ssl: true,
		lj: true,
		asjp: true,
		l200: true
	},
	{
		word: "straight",
		s207: true,
		l200: true
	},
	{
		word: "suck (verb)",
		s207: true,
		lj: true
	},
	{
		word: "sun",
		sy: true,
		s100: true,
		s207: true,
		ssl: true,
		asjp: true,
		l200: true
	},
	{
		word: "sweet",
		lj: true
	},
	{
		word: "swell (verb)",
		s207: true
	},
	{
		word: "swim (verb)",
		s100: true,
		s207: true,
		l200: true
	},
	{
		word: "tail",
		sy: true,
		s100: true,
		s207: true,
		ssl: true,
		lj: true
	},
	{
		word: "take (pick up and carry)",
		lj: true,
		l200: true
	},
	{
		word: "tear/teardrop",
		d: true,
		l200: true
	},
	{
		word: "thank",
		l200: true
	},
	{
		word: "that",
		s100: true,
		s207: true
	},
	{
		word: "there",
		s207: true
	},
	{
		word: "thick",
		s207: true,
		lj: true,
		l200: true
	},
	{
		word: "thigh",
		lj: true
	},
	{
		word: "thin",
		s207: true,
		ssl: true,
		l200: true
	},
	{
		word: "think (verb)",
		s207: true,
		l200: true
	},
	{
		word: "this",
		sy: true,
		s100: true,
		s207: true,
		lj: true
	},
	{
		word: "three",
		s207: true
	},
	{
		word: "throw (verb)",
		s207: true,
		l200: true
	},
	{
		word: "tie (verb)",
		s207: true,
		lj: true
	},
	{
		word: "tongue (part of body)",
		sy: true,
		s100: true,
		s207: true,
		lj: true,
		d: true,
		asjp: true,
		l200: true
	},
	{
		word: "tooth",
		sy: true,
		s100: true,
		s207: true,
		lj: true,
		d: true,
		asjp: true,
		l200: true
	},
	{
		word: "top (of object/mountain)",
		l200: true
	},
	{
		word: "touch (verb)",
		l200: true
	},
	{
		word: "tree (not log)",
		s100: true,
		s207: true,
		ssl: true,
		asjp: true,
		l200: true
	},
	{
		word: "turn (intransitive verb)",
		s207: true,
		l200: true
	},
	{
		word: "two/pair",
		sy: true,
		s100: true,
		s207: true,
		d: true,
		asjp: true
	},
	{
		word: "vomit (verb)",
		s207: true,
		ssl: true
	},
	{
		word: "walk (verb)",
		s100: true,
		s207: true,
		l200: true
	},
	{
		word: "warm",
		s207: true,
		ssl: true,
		l200: true
	},
	{
		word: "wash (body parts)",
		s207: true,
		l200: true
	},
	{
		word: "water (as drink or for cooking, cold)",
		l200: true
	},
	{
		word: "water (as drink or for cooking, hot)",
		l200: true
	},
	{
		word: "water (cold, moving)",
		l200: true
	},
	{
		word: "water (cold, not moving)",
		l200: true
	},
	{
		word: "water (hot, moving)",
		l200: true
	},
	{
		word: "water (hot, not moving)",
		l200: true
	},
	{
		word: "water (noun)",
		sy: true,
		s100: true,
		s207: true,
		ssl: true,
		lj: true,
		d: true,
		asjp: true
	},
	{
		word: "wet",
		s207: true,
		ssl: true,
		l200: true
	},
	{
		word: "what?",
		sy: true,
		s100: true,
		s207: true,
		ssl: true,
		lj: true,
		d: true
	},
	{
		word: "when?",
		s207: true,
		ssl: true
	},
	{
		word: "where?",
		s207: true,
		ssl: true
	},
	{
		word: "white (color)",
		s100: true,
		s207: true,
		ssl: true,
		l200: true
	},
	{
		word: "who?",
		sy: true,
		s100: true,
		s207: true,
		ssl: true,
		lj: true,
		d: true
	},
	{
		word: "wide",
		s207: true,
		ssl: true,
		lj: true,
		l200: true
	},
	{
		word: "wife",
		s207: true,
		ssl: true
	},
	{
		word: "wind (noun)",
		sy: true,
		s207: true,
		ssl: true,
		lj: true,
		l200: true
	},
	{
		word: "wing (anatomic)",
		s207: true,
		lj: true,
		l200: true
	},
	{
		word: "wipe (verb)",
		s207: true
	},
	{
		word: "with",
		s207: true,
		ssl: true
	},
	{
		word: "woman",
		s100: true,
		s207: true,
		ssl: true,
		l200: true
	},
	{
		word: "wood",
		ssl: true,
		lj: true,
		l200: true
	},
	{
		word: "work",
		ssl: true
	},
	{
		word: "world",
		l200: true
	},
	{
		word: "worm",
		s207: true,
		ssl: true
	},
	{
		word: "year",
		sy: true,
		s207: true,
		ssl: true
	},
	{
		word: "yellow (color)",
		s100: true,
		s207: true,
		ssl: true
	},
	{
		word: "yesterday",
		lj: true
	},
	{
		word: "younger brother (of a brother)",
		l200: true
	},
	{
		word: "younger brother (of a sister)",
		l200: true
	},
	{
		word: "younger sister (of a brother)",
		l200: true
	},
	{
		word: "younger sister (of a sister)",
		l200: true
	}
];
