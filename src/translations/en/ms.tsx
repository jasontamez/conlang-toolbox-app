const ms = {

	"Show Unused Sections": "Show Unused Sections",
	showUnusedDesc1:
		 "Include sections that you did not fill out, leaving space for you"
		+ " to write in later.",
	showUnusedDesc2: "NOTE: this option has no effect on JSON and XML exports.",

	"You have no information to clear.": "You have no information to clear.",
	morphoSyntaxInfo: "everything currently in $t(common:MorphoSyntax) (but not anything previously saved)",
	"Please add information to your MorphoSyntax document in at least one section before exporting it.":
		"Please add information to your MorphoSyntax document in at least one section before exporting it.",
	msDocument: "$t(common:MorphoSyntax) document",
	newMsDocument: "New $t(common:MorphoSyntax) document",
	"MorphoSyntax Settings": "$t(common:MorphoSyntax) $t(common:Settings)",
	msTitle: "$t(common:MorphoSyntax) $t(common:Title)",
	msTitle_presentation: "$t(common:MorphoSyntax) $t(common:Title):",
	"Usually the language name.": "Usually the language name.",
	"A short description of this document.": "A short description of this document.",
	"MorphoSyntax Info": "$t(common:MorphoSyntax) Info",
	"Saved MorphoSyntax Info": "Saved $t(MorphoSyntax Info)",
	"MISSING TITLE": "MISSING TITLE",
	"Read About It": "Read About It",

// PAGE ONE

	"1-Morphological Typology": "1. Morphological Typology",
	"1-1-Traditional Typology": "1.1. Traditional Typology",
	"Synthesis and Fusion": "Synthesis and Fusion",
	"The Basic Building Blocks of Words": "The Basic Building Blocks of Words",

	info11: [
		"- Languages can be broadly classified on two continuums based on their **morphemes**.",
		"   - A morpheme is the most basic unit of meaning in a language. For example, the word \"cats\" has two morphemes: \"cat\" (a feline animal) and \"s\" (more than one of them are being talked about).",
		"- [newSection]**Synthesis** is a measure of how many morphemes appear in a word.",
		"   - Chinese is very _isolating_, tending towards one morpheme per word.",
		"   - Inuit and Quechua are very _polysynthetic_, with many morphemes per word.",
		"- [newSection]**Fusion** is a measure of how many meanings a single morpheme can encode.",
		"   - Completely isolating languages, by definiton, always lack fusion.",
		"   - Spanish can be very _fusional_, with a single suffix capable of encoding tense (8.3.1), aspect (8.3.2), mood (8.3.3) and number (4.3).",
		"   - Though fusional forms are possible (e.g. swam, was), English is mostly _agglutinative_, with one meaning per morpheme.",
		"      - e.g. \"antidisestablishmentarianism\" `[translation table] anti dis es&shy;tab&shy;lish ment ary an ism / against undo es&shy;tab&shy;lish in&shy;stance__of__verb of__or__like__the__noun per&shy;son be&shy;lief__sys&shy;tem`(The \"establishment\" in question is actually contextually fusional, as it refers to the Church of England receiving government patronage, so the full meaning of the word is \"the belief system of opposing the people who want to remove the government patronage of the Church of England.\")"
	],
	rangeFromTo: "Range from {{start}} to {{end}}",
	Synthesis: "Synthesis",
	Isolating: "Isolating",
	Polysynthetic: "Polysynthetic",
	Fusion: "Fusion",
	Agglutinative: "Agglutinative",
	Fusional: "Fusional",
	"Give examples of the dominant pattern and any secondary patterns.": "Give examples of the dominant pattern and any secondary patterns.",
	"1-2-Morphological Processes": "1.2. Morphological Processes",
	"Affixes and Other Modifications": "Affixes and Other Modifications",
	"Read About Them": "Read About Them",

	info12: [
		"- **Affixes**:",
		"   - Completely fusional languages will usually lack affixes.",
		"   - Most natural languages use suffixes. Some also have prefixes and/or infixes or circumfixes. Few only use prefixes, and none have only infixes or circumfixes.",
		"   - NOTE: this section is not needed if the language is not agglutinative at all.",
		"- [newSection]**Stem Modification**:",
		"   - e.g. swim/swam/swum.",
		"- [newSection]**Suppletion**:",
		"   - An entirely new stem is substituted for the root, e.g. \"be\" being replaced by is/am/are/was/were.",
		"- [newSection]**Reduplication**:",
		"   - Part or all of a word is duplicated.",
		"      - Often used for plurality.",
		"- [newSection]**Suprasegmental Modification**:",
		"   - Words can change stress when in different roles.",
		"      - e.g. \"permit\" has different stress when used as a noun or as a verb.",
		"   - Tone changes also fall under this category."
	],

	Affixes: "Affixes",
	checkboxAffixes: {
		inlineHeaders: [ "Used Most", "Used Less", "Affix" ],
		rowLabels: [ "Prefix", "Suffix", "Circumfix", "Infix" ]
	},
	"Stem Modification": "Stem Modification",
	"Not Used": "Not Used",
	"Used Often": "Used Often",
	Suppletion: "Suppletion",
	Reduplication: "Reduplication",
	"Suprasegmental Modification": "Suprasegmental Modification",
	"What sort of morphological processes are used? Which are primary and which are used less?":
		"What sort of morphological processes are used? Which are primary and which are used less?",
	"1-3-Head/Dependent Marking": "1.3. Head/Dependent Marking",
	"Head Marked": "Head Marked",
	"Dependent Marked": "Dependent Marked",
	"Head/Dependent Marking": "Head/Dependent Marking",

	info13: [
		"- The **Head** of a phrase is the element that determines the syntactic function of the whole phrase.",
		"   - Example sentence: _\"The smallest dog ate a porkchop with Mark's approval.\"_",
		"      - \"dog\" is Head of \"the smallest dog\" (noun phrase)",
		"      - \"porkchop\" is Head of \"a porkchop\" (noun phrase)",
		"      - \"with\" is Head of \"with Mark's approval\" (prepositional phrase)",
		"      - \"approval\" is Head of \"Mark's approval\" (noun phrase)",
		"- English is predominantly dependent-marked (\"the queen's crown\").",
		"- Most languages are head-marked (\"the queen crown's\").",
		"- Some are mixed, but use only one pattern for certain types of phrases (e.g. head-marked for noun phrases, but dependent-marked for verb and adpositional phrases)."
	],

	"Describe when the head/dependent marking system changes, if needed.":
		"Describe when the head/dependent marking system changes, if needed.",

// PAGE TWO

	"2-Grammatical Categories": "2. Grammatical Categories",
	"2-1-Nouns (the most time-stable concepts)": "2.1. Nouns (the most time-stable concepts)",
	"2-1-1-Types of Nouns": "2.1.1. Types of Nouns",
	"2-1-1-1-Proper Names": "2.1.1.1. Proper Names",
	"Proper Names": "Proper Names",


	info2111: [
		"- In English, they do not easily take articles, quantifiers and other modifiers.",
		"- Other languages may have special case markers (4.4) for them."
	],

	"Are there any special rules involving proper names?":
		"Are there any special rules involving proper names?",
	"2-1-1-2-Possessability": "2.1.1.2. Possessability",
	Possessability: "Possessability",
	"Systems of Possession": "Systems of Possession",

	info2112: [
		"- Languages may have one of the following systems to differentiate nouns.",
		"   - [newSection]**Possessable vs Unpossessable**:",
		"      - Some nouns cannot be possessed (e.g. land, stars).",
		"   - [newSection]**Inherent vs Optional**:",
		"      - Some nouns _must_ be possessed (e.g. body parts, kinship terms).",
		"   - [newSection]**Alienable vs Inalienable**:",
		"      - Alienable possession can be ended (my car becomes your car).",
		"      - Inalienable possession cannot be ended (my brother is always my brother)."
	],


	"Describe how the language handles possession.":
		"Describe how the language handles possession.",
	"2-1-1-3-Count vs Mass": "2.1.1.3. Count vs Mass",
	"Count Nouns and Mass Nouns": "Count Nouns and Mass Nouns",
	"A Piece of Information": "A Piece of Information",


	info2113: [
		"- Typically, most nouns are countable, while fewer are considered as a mass.",
		"- e.g. \"sand\" requires \"a grain of sand\" to be countable, and \"confetti\" requires \"a piece of confetti\"."
	],

	"Write any specific notes about count/mass noun distinctions here.":
		"Write any specific notes about count/mass noun distinctions here.",
	"2-1-2-Pronouns and Anaphoric Clitics": "2.1.2. Pronouns and Anaphoric Clitics",
	"Pronouns and Anaphoric Clitics": "Pronouns and Anaphoric Clitics",
	"What Are They?": "What Are They?",

	info212: [
		"- **Pronouns**:",
		"   - Free forms that are used to refer to or replace a word used earlier in a sentence, to avoid repetition.",
		"   - Also known as _anaphoric references_.",
		"- [newSection]**Anaphoric Clitics**:",
		"   - A _clitic_ is a bound morpheme that functions on the phrase or clause level, but is bound phonologically to another word.",
		"   - An Anaphoric Clitic functions as a full noun phrase.",
		"      - Spanish: `[translation table] lav-o el auto / wash-1s the car // \"I wash the car\" :: **-o** functions as the noun phrase \"I\"`",
		"- [newSection]Both types often differ according to person (3rd/2nd/1st including inclusive/exclusive), number (singular/plural), noun class (gender/animacy), grammatical role (subject/object/ergative/etc), semantic role (Agent/Patient), definiteness and/or specificness (a/the), and honorifics.",
		"- English has frequent pronouns that agree with the verb, and may be stressed for emphasis or contrast: \"**He** died\" (not her, as expected).",
		"- Spanish has anaphoric forms attached to the verb, but will use pronouns for emphasis or contrast."
	],

	"Which system(s) are used by the language?": "Which system(s) are used by the language?",
	"2-2-Verbs (the least time-stable concepts)": "2.2. Verbs (the least time-stable concepts)",
	"2-2-1-Semantic Roles": "2.2.1. Semantic Roles",
	"Semantic Roles": "Semantic Roles",
	"A Quick Primer": "A Quick Primer",

	info221: [
		"- Verbs can be divided into groups depending on which roles they require.",
		"   - [newSection]**Agent**: active, physical, has volition",
		"   - **Patient**: undergoes a change, no volition (direct object in English)",
		"   - **Recipient**: moving object (indirect object in English), or often a destination",
		"   - **Force**: directly instigates, not necessarily conscious or voluntary",
		"   - **Instrument**: indirectly instigates (usually by an Agent)",
		"   - **Experiencer**: does not participate, merely observes",
		"- [newSection]In English, all verbs require an Agent, and many also require a Patient, but no other roles are encoded into the verb.",
		"- [newSection]NOTE: Roles can change according to the perspective of the speaker:",
		"   - I hit Steve with the hammer.",
		"   - The hammer hit Steve.",
		"   - Steve was hit."
	],


	"Describe which semantic roles are important.": "Describe which semantic roles are important.",
	"2-2-2-Verb Classes": "2.2.2. Verb Classes",
	checkboxVerbClasses: {
		inlineHeaders: ["Special?", "Type", "Description"],
		labels: [
			"Actions",
			"Action-Processes",
			"Weather Verbs",
			"States",
			"Involuntary Processes",
			"Bodily Functions",
			"Motion",
			"Position",
			"Factive",
			"Cognition",
			"Sensation",
			"Emotion",
			"Utterance",
			"Manipulation",
			"Other Verb Class(es)"
		],
		rowLabels: [
			"Agent affects Patient.",
			"Agent only.",
			"In English, these require a dummy Agent (\"_It_ is raining\"); this is not the case in many other languages!",
			"be hot, be broken, be frozen, etc; may be predicate-bound",
			"He grew; It broke; They died; etc.",
			"cough, sweat, bleed, cry, etc.",
			"go, float, proceed, etc.",
			"sit, stand, hang, etc.",
			"Something comes into being: e.g. build, form, ignite, create; rarely treated differently than Actions",
			"know, suspect, forget etc.",
			"hear, see, taste, etc.",
			"be happy, be afraid, be mellow, etc.",
			"say, yell, murmur, declare, chat, etc.",
			"force, urge, cause, let, permit, allow, compel, etc.",
			"(you might have a distinction different from those already listed)"
		]
	},
	checkboxVerbClassesExport: {
		title: "Verb Types that are handled in a special way:",
		labels: [
			"Agent affects Patient.",
			"Agent only.",
			"In English, these require a dummy Agent (\"_It_ is raining\"); this is not the case in many other languages!",
			"be hot, be broken, be frozen, etc; may be predicate-bound",
			"He grew; It broke; They died; etc.",
			"cough, sweat, bleed, cry, etc.",
			"go, float, proceed, etc.",
			"sit, stand, hang, etc.",
			"Something comes into being: e.g. build, form, ignite, create; rarely treated differently than Actions",
			"know, suspect, forget etc.",
			"hear, see, taste, etc.",
			"be happy, be afraid, be mellow, etc.",
			"say, yell, murmur, declare, chat, etc.",
			"force, urge, cause, let, permit, allow, compel, etc.",
			"(you might have a distinction different from those already listed)"
		]
	},
	"If you've marked a verb class as \"Special\", describe how the language treats it differently than the \"regular\" verbs.":
		"If you've marked a verb class as \"Special\", describe how the language treats it differently than the \"regular\" verbs.",
	"2-2-3-Verb Structure": "2.2.3. Verb Structure",
	"Verb Structure": "Verb Structure",
	"Structure and Operations Info": "Structure and Operations Info",

	info223: [
		"- In polysynthetic languages, verbs tend to be the most complex.",
		"   - English is very simple:",
		"      - root verb   ",
		"      \\+ (optional tense marker OR agreement marker)",
		"   - Panare is much more complex:",
		"      - person/neutral marker   ",
		"      \\+ (optional valence marker)   ",
		"      \\+ (optional detransification marker)   ",
		"      \\+ (optional incorporation marker)   ",
		"      \\+ root verb   ",
		"      \\+ (optional derivation marker)   ",
		"      \\+ tense/aspect/mode marker",
		"- [newSection]Polysynthetic languages may have any/all of these operations",
		"   - Verb agreement (6)",
		"   - Semantic role markers (applicatives) (7.1.2)",
		"   - Valence increasing/decreasing (7.1, 7.2)",
		"   - Tense/Apect/Mode (8.3)",
		"   - Evidentials (8.5)",
		"   - Location and direction (8.4)",
		"   - Speech act markers (9.3)",
		"   - Verb and verb-phrase negation (9.2)",
		"   - Subordination/Nominalization (8.1, 10)",
		"   - Switch-Reference (10.4)",
		"- In more isolating languages, those operations are more likely to be expressed through particles or adverbs.",
		"- [newSection]Things to consider:",
		"   - Where does the stem lie in relation to any affixes/particles/etc?",
		"   - Are directional and/or locational notions expressed in the verb/phrase at all?",
		"   - Are particular operations obligatory? Productive (for all/most roots)?"
	],

	"Describe the verb structure here.": "Describe the verb structure here.",
	"2-3-Modifiers": "2.3. Modifiers",
	"2-3-1-Property Concepts (Descriptive Adjectives)": "2.3.1. Property Concepts (Descriptive Adjectives)",
	checkboxVerbPropConcepts: {
		header: "Different Ways Property Concepts Are Handled in Human Language",
		rowLabels: [
			"Lexicalized as verbs (Acehnese)",
			"Lexicalized as nouns (Finnish)",
			"Lexicalized as nouns or verbs depending on the demands of discourse (Dutch)",
			"Some are lexicalized as nouns, others are lexicalized as verbs (Yoruba)",
			"Distinct class of \"adjectives\" (English)"
		]
	},
	checkboxVerbPropConceptsExport: {
		title: "Property Concepts:",
		labels: [
			"Lexicalized as verbs",
			"Lexicalized as nouns",
			"Lexicalized as nouns or verbs depending on the demands of discourse",
			"Some are lexicalized as nouns, others are lexicalized as verbs",
			"Distinct class of \"adjectives\""
		]
	},
	"Property Concepts": "Property Concepts",
	"More Info": "More Info",


	info231: [
		"- If Property Concepts (adjectives) exist as a separate category, they will express:",
		"   - age",
		"   - dimension (big, short, long, tall, wide)",
		"   - value (good, bad)",
		"   - color",
		"- Other properties may be expressed:",
		"   - physical properties (hard, smooth, heavy)",
		"   - shape",
		"   - speed",
		"   - human propensity (happy, jealous, smart, wary)",
		"- [newSection]In Acehnese, property concepts can take the same sort of morphology as verbs, thus they are lexicalized as verbs.",
		"- [newSection]In Finnish, property concepts are required to take the same sort of morphology as the noun they modify, thus they are lexicalized as nouns.",
		"- [newSection]In Dutch, property concepts are treated as verbs when used as a predicator (\"That car is _pink_!\") and as nouns when used as a modifier (\"I love _pink_ cars!\").",
		"- [newSection]In Yoruba, some property concepts are always treated as nouns, while others are always treated as verbs.",
		"- [newSection]In English, they are labeled as a separate class because they don't follow the same patterns as nouns or verbs:",
		"	1. They cannot take past tense like a verb, nor do they \"agree\" with their head noun in the same way.",
		"	2. They do not take plural markers like a noun, nor can they take articles, modifiers or quantifiers.",
		"      - Rarely, an adjective can be treated as a noun (e.g. \"_The wealthy_ are obnoxious\", \"Which car do you prefer, _the gray_ or _the red_?\"), but these are actually _zero derivations_ (8.1)."
	],


	"How does the language handle Property Concepts (descriptive adjectives)? If they're not all treated the same way (as in Dutch or Yoruba), explain the differences.":
		"How does the language handle Property Concepts (descriptive adjectives)? If they're not all treated the same way (as in Dutch or Yoruba), explain the differences.",
	"2-3-2-Non-Numeral Quantifiers (e.g. few, many, some)": "2.3.2. Non-Numeral Quantifiers (e.g. few, many, some)",
	"Which quantifiers exist?": "Which quantifiers exist?",
	"2-3-3-Numerals": "2.3.3. Numerals",
	Numerals: "Numerals",
	"Things to Consider": "Things to Consider",

	info233: [
		"- **Extent**:",
		"   - Some languages have restricted numerals: e.g. 1, 2, 3, many.",
		"   - Only very advanced societies will have a need for numbers beyond a thousand.",
		"   - Many societies will end up borrowing larger number words from nearby languages that invent them first.",
		"- [newSection]**Base**:",
		"   - Usually base 5 or 10. Sometimes 20. (English is base 10.)",
		"   - Words for \"five\" usually come from the word for \"hand\". Words for \"twenty\" can come from the word for an entire human being.",
		"   - More advanced cultures with merchants or bureaucracies tend to create systems based around 12 as well, due to its greater number of factors, but this system almost never replaces the original base system.",
		"   - Numerals can be described from greatest to least (\"twenty-two\"), from least to greatest (\"two-twenty\"), or not give base multiples a special name (\"two-two\").",
		"- [newSection]**Agreement**:",
		"   - Languages may inflect their numerals to agree with their head.",
		"   - Some languages use entirely different sets of numerals for different situations.",
		"      - English has separate numerals for counting (one, two, three, etc.) and ordering things (first, second, third, etc.)",
		"      - Irish has a set of numbers that represent the numbers themselves, a second set for counting or ordering things (one goat, two goats, three goats, etc.), and third set of numerals used only for counting people."
	],

	checkboxNumberBase: {
		header: "Number Base",
		rowLabels: [
			"Base Five",
			"Base Ten",
			"Base Twenty",
			"Other"
		],
	},
	checkboxNumberBaseExport: {
		title: "Number Base:",
		rowLabels: [
			"Base Five",
			"Base Ten",
			"Base Twenty",
			"Not Base Five, Ten or Twenty"
		],
	},
	checkboxNumberFormat: {
		header: "Number Format",
		rowLabels: [
			"Greatest-to-Least (twenty-two)",
			"Least-to-Greatest (two-twenty)",
			"Single Digits Only (two-two)"
		]
	},
	checkboxNumberFormatExport: {
		title: "Number Format:",
		rowLabels: [
			"Greatest-to-Least",
			"Least-to-Greatest",
			"Single Digits Only"
		]
	},
	checkboxNumberOtherProps: {
		header: "Other Properties",
		rowLabels: [
			"Multiple Sets of Numerals",
			"Numerals Agree With Head"
		]
	},
	checkboxNumberOtherPropsExport: {
		title: "Other Number Properties:"
	},
	"Describe the language's numeral system.": "Describe the language's numeral system.",
	"2-4-Adverbs": "2.4. Adverbs",
	"Adverbs": "Adverbs",
	"A \"Catch-All\" Category": "A \"Catch-All\" Category",


	info24: [
		"- These may or may not exist as a separate category of words.",
		"- Languages may use adjectives in special phrases to fulfill this role.",
		"- Adverbs can describe the following:",
		"   - **Manner**: e.g. quickly, slowly, patiently.",
		"   - **Time**: e.g. yesterday, today, early, next year.",
		"   - **Direction/Location**: e.g. up/downriver, north(ward), left(ward), hither.",
		"   - **Evidential/Epistemic**: e.g. possibly, definitely, from conjecture, from direct observation, from second-hand information."
	],
	"How are adverbs (or adverb-like phrases) handled?": "How are adverbs (or adverb-like phrases) handled?",

	// PAGE THREE
	"3-Constituent Order Typology": "3. Constituent Order Typology",
	"3-1-In Main Clauses": "3.1. In Main Clauses",
	checkboxMainClauses: {
		inlineHeaders: ["Primary?", "Order", "Example"],
		labels: ["APV/SV", "AVP/SV", "VAP/VS", "VPA/VS", "PAV/SV", "PVA/VS"],
		rowLabels: [
			"\"Steve softballs pitches; Steve pitches.\"",
			"\"Steve pitches softballs; Steve pitches.\"",
			"\"Pitches Steve softballs; Pitches Steve.\"",
			"\"Pitches softballs Steve; Pitches Steve.\"",
			"\"Softballs Steve pitches; Steve pitches.\"",
			"\"Softballs pitches Steve; Pitches Steve.\""
		]
	},
	checkboxMainClausesExport: {
		title: "Constituent Order Typology:"
	},
	"Basic Typology": "Basic Typology",
	"What is This?": "What is This?",

	info31: [
		"- Human languages tend towards one of six different basic forms.",
		"   - **S** is the Subject of an intransitive clause.",
		"      - _Steve_ pitches.",
		"   - **V** is the verb in a clause.",
		"      - Steve _pitches_.",
		"   - **A** is the Agent of a transitive clause.",
		"      - _Steve_ pitches softballs.",
		"   - **P** is the Patient of a transitive clause.",
		"      - Steve pitches _softballs_.",
		"- [newSection]Languages may use one typology most of the time, but switch to another for certain clauses:",
		"   - Dependent clauses",
		"   - Paragraph-initial clauses",
		"   - Clauses that introduce participants",
		"   - Questions",
		"   - Negative clauses",
		"   - Clearly contrastive clauses",
		"- [newSection]\"Rigid\" systems may put other constituents into the **P** slot on a regular basis.",
		"   - The softball was _filthy_: predicate adjective.",
		"   - Steve was _an awful pitcher_: predicate nominative.",
		"   - Steve went _to the dugouts_: oblique.",
		"- [newSection]\"Flexible\" or \"free\" systems use something other than grammatical relations to determine order:",
		"   - Biblical Hebrew puts new, indefinite info pre-verb, definite info post-verb.",
		"   - Some will fix PV or AV relations in almost all cases, leaving the other \"free\".",
		"      - Fixed PV → may allow APV and PVA.",
		"      - Fixed AV → may allow PAV and AVP.",
		"      - Fixed VP → may allow AVP and VPA.",
		"      - Fixed VA → may allow VAP and PVA."
	],

	"Write any more specific notes here.": "Write any more specific notes here.",
	"3-2-Verb Phrases": "3.2. Verb Phrases",
	"Where do auxiliary verbs (semantically empty, e.g. to be/to have) appear in relation to the main verb? Where do adverbs fit in relation to the verb and auxiliaries?":
		"Where do auxiliary verbs (semantically empty, e.g. to be/to have) appear in relation to the main verb? Where do adverbs fit in relation to the verb and auxiliaries?",
	"3-3-Noun Phrases": "3.3. Noun Phrases",
	"What is the order of the determiners (4.5), numerals (2.3.3), genitives (possessors), modifiers (2.3.1), relative clauses (10.5), classifiers (4.7), and the head noun?":
		"What is the order of the determiners (4.5), numerals (2.3.3), genitives (possessors), modifiers (2.3.1), relative clauses (10.5), classifiers (4.7), and the head noun?",
	"3-4-Adpositional Phrases": "3.4. Adpositional Phrases",
	checkboxAdpositionalPhrases: {
		rowLabels: [
			"Preposition (_with_ an apple)",
			"Postpostition (an apple _with_)",
			"Circumposition (rare; _with_ an apple _with_)"
		]
	},
	checkboxAdpositionPhrasesExport: {
		title: "Adpositions Used:",
		labels: [
			"Preposition",
			"Postposition",
			"Circumposition"
		]
	},
	Adpositions: "Adpositions",

	info34: [
		"- Many **Adpositions** derive from verbs, especially serial verbs (see 10.1).",
		"- Others derive from nouns, especially body parts (top, back, face, head, etc).",
		"- Adpositional phrases may appear the same as possessed noun phrases (in front of vs. on his face) or regular nouns (top vs. on top of)."
	],

	"Which adposition dominates? Do many adpositions come from nouns or verbs?": "Which adposition dominates? Do many adpositions come from nouns or verbs?",
	"3-5-Comparatives": "3.5. Comparatives",
	Comparatives: "Comparatives",
	"Comparing Things": "Comparing Things",

	info35: [
		"- Does the language even have a form? Some languages get by with strategies like \"X is big, Y is very big.\"",
		"- A comparison phrase requires a known standard, a marker that signals this is a comparison, and the quality of comparison.",
		"   - For example, in _\"X is bigger than Y\"_, (_Y_) is the known standard, (_is __er than_) is a comparison marker, and (_big_) is the quality.",
		"- PV languages generally use a Standard-Quality-Marker order.",
		"- VP languages tend towards Quality-Marker-Standard."
	],

	"Does the language have one or more comparative constructions? If so, what is the order of the standard, the marker, and the quality being compared?":
		"Does the language have one or more comparative constructions? If so, what is the order of the standard, the marker, and the quality being compared?",
	"3-6-Question Particles and Words": "3.6. Question Particles and Words",
	Questions: "Questions",

	info36: [
		"- In many languages, yes/no questions are indicated by a change in intonation. In others, a question particle is used; e.g. _do_ you understand?",
		"- Informal questions may require a specific question word.",
		"- [newSection]This subject is handled in depth in 9.3.1."
	],

	"How are questions handled in the language? In informational questions, where does the question word occur?":
		"How are questions handled in the language? In informational questions, where does the question word occur?",
	"3-7-Summary": "3.7. Summary",
	"When it comes to Agent/Patient/Verb order, is the language very consistent, fairly consistent, or very inconsistent? Note consistency and any deviations not already covered.":
		"When it comes to Agent/Patient/Verb order, is the language very consistent, fairly consistent, or very inconsistent? Note consistency and any deviations not already covered.",

	// PAGE FOUR

	"4-Noun Operations": "4. Noun Operations",
	"4-1-Compounding": "4.1. Compounding",
	Compounding: "Compounding",
	"Noun-Piles": "Noun-Piles",

	info41: [
		"- When two nouns are combined into one, several changes may occur.",
		"   - Stress pattern change, e.g. \"_black_bird\" vs \"black _bird_\".",
		"   - Unusual word order, e.g. \"housekeeper\" vs \"keeper of the house\".",
		"   - Morphology specific to compounds, e.g. \"can-opener\" does not imply the existence of a verb \"to can-open\".",
		"   - A resulting meaning that is either more specific than its components (e.g. \"windshield\" vs. \"wind\" or \"shield\") or altogether different (e.g. \"heaven-breath\" means \"weather\" in Mandarin)."
	],

	"Describe the sorts of compounding that happen in the language (if any).":
		"Describe the sorts of compounding that happen in the language (if any).",
	"4-2-Denominalization": "4.2. Denominalization",
	Denominalization: "Denominalization",
	"Verbing a Noun": "Verbing a Noun",

	info42: [
		"- Some languages have many ways of changing a noun into a non-noun.",
		"   - English can append _-like_ to make an adjective.",
		"   - Eskimo has many verbalizing forms, e.g. to be X, to go towards X, to play with X, to hunt X."
	],

	"Are there any processes to make a verb from a noun? An adjective? An adverb?":
	"Are there any processes to make a verb from a noun? An adjective? An adverb?",
	"4-3-Number Marking": "4.3. Number Marking",
	"Number Marking": "Number Marking",
	"Plurality, etc.": "Plurality, etc.",

	info43: [
		"- Some languages only mark number occassionally or optionally depending on the type of noun.",
		"- This is often intertwined with other markers, such as case marking in Romance languages.",
		"- Most languages leave the singular unmarked, but not all!",
		"- Number marking may have many distinctions:",
		"   - singular (one)",
		"   - dual (two)",
		"   - trial (three)",
		"   - paucal (small amount)",
		"   - plural (any amount larger than the others used)"
	],


	checkboxNumberMarking: {
		header: "Which Distinctions Are Marked in the Noun Phrase?",
		rowLabels: ["Singular", "Dual", "Trial", "Paucal", "Plural"]
	},
	checkboxNumberMarkingExport: {
		title: "Number Marking:"
	},
	"Is the distinction between singular and non-singular obligatory, optional or absent? If number-marking is optional, when does it tend to occur? When does it not tend to occur?":
		"Is the distinction between singular and non-singular obligatory, optional or absent? If number-marking is optional, when does it tend to occur? When does it not tend to occur?",
	"4-4-Case Marking": "4.4. Case Marking",
	"Case Marking": "Case Marking",
	"How it works": "How it works",


	info44: [
		"- Case markings can describe the role a noun plays in a sentence.",
		"- In English, most case markings only survive in the pronouns, with word order doing the job for regular nouns. The major exception is the genitive case (possessive), which is marked with _'s_.",
		"- Some cases, and the semantic role (2.2.1) they usually indicate, include:",
		"   - nominative/ergative (Agent, see section 6)",
		"   - accusative/absolutive (Patient, see section 6)",
		"   - dative (Recipient)",
		"   - genitive (Possessor)",
		"- In Latin, if a Patient occurs in some other case, either the sentence is ungrammatical or another sense of the verb results.",
		"- In some languages, verbs and/or adpositions _govern_ their arguments, requiring a specific case marker on their nouns. This allows similar-sounding verbs to be discerned by these case markers. For example, in Yagua, the verb _dííy_ can mean either \"kill\" or \"see\" depending on which case the Patient is in:",
		"   - He killed the alligator: `[translation table] sa-dííy nurutú-0 / he-kill alligator-ACC`",
		"   - He saw the alligator: `[translation table] sa-dííy nurutí-íva / he-see alligator-DAT`"
	],

	"Do nouns exhibit morphological case? If so, what cases exist?": "Do nouns exhibit morphological case? If so, what cases exist?",
	"4-5-Articles and Demonstratives": "4.5. Articles and Demonstratives",
	Articles: "Articles",

	info45: [
		"- English is relatively rare in having **Articles**: a, an, the. More often, languages have a broader class of demonstratives.",
		"- [newSection]**Demonstratives** are words that distinguish or identify a noun without modifying it, such as this, that, these and those.",
		"- They tend to encode distance (\"this\" is closer to you than \"that\"; Spanish has a third level of distance, too)."
	],


	"If articles exist, are they obligatory or optional? When do they occur? Are they separate words or bound morphemes?":
		"If articles exist, are they obligatory or optional? When do they occur? Are they separate words or bound morphemes?",
	"How many levels of distance do demonstratives encode? Are there other distinctions besides distance?":
		"How many levels of distance do demonstratives encode? Are there other distinctions besides distance?",
	"4-6-Possessors": "4.6. Possessors",
	Possessors: "Possessors",
	"Possessor Expressions": "Possessor Expressions",

	info46: [
		"- Refer back to 2.1.1.2 to note your system of possession. This does **not** refer to possessive clauses! (5.4)",
		"- [newSection]How are possessors expressed in the noun phrase?",
		"- Do nouns agree with their possessors? Vice versa?"
	],

	"Describe how possession works in a noun phrase.": "Describe how possession works in a noun phrase.",
	"4-7-Class (Gender)": "4.7. Class (Gender)",
	"Class and Gender": "Class and Gender",
	"What They Are": "What They Are",

	info47: [
		"- Class system often require classifiers (special operators) to declare class.",
		"- Pure gender systems use \"agreement\" instead of classifiers. At the very least, numerical expressions will \"agree\" with their head noun.",
		"- Classes generally care about one dimension of reality, such as biological gender, animacy, shape, or function. (Other dimensions may be relevant, too.) There are almost always exceptions to the rule, however (e.g. Yagua treats rocks and pineapples as animates).",
		"- Classifiers may occur with verbs, numerals and adjectives, though they may serve a different function in those cases."
	],

	checkboxNounClasses: {
		header: "Which Class Distinctions Exist?",
		rowLabels: ["Gender", "Animacy", "Shape", "Function", "Other"]
	},
	checkboxNounClassesExport: {
		title: "Class Distinctions:"
	},
	"Describe the language's class/gender system, if it has one. What classes/genders exist and how do they manifest? What dimension(s) of reality is central to the class system? How do they interact with numerals, verbs and adjectives?":
		"Describe the language's class/gender system, if it has one. What classes/genders exist and how do they manifest? What dimension(s) of reality is central to the class system? How do they interact with numerals, verbs and adjectives?",
	"4-8-Diminution/Augmentation": "4.8. Diminution/Augmentation",
	"Diminution and Augmentation": "Diminution and Augmentation",
	"Bigger and Smaller": "Bigger and Smaller",


	info48: [
		"- If diminution (making smaller) and/or augmentation (making bigger) is used in the language, answer the following questions:",
		"   - Is it obligatory? Does one member have to occur in every full noun phrase?",
		"   - Is it productive? Does it work with all full noun phrases and does it have the same meaning for each?",
		"   - Is it expressed lexically, morphologically, or analytically?",
		"   - Where in the NP is this operation likely to be located? Can it occur in more than one place?"
	],


	checkboxDimAugSystem: {
		rowLabels: ["Dim/Aug System Exists", "...and is Obligatory", "...and is Productive"]
	},
	checkboxDimAugSystemExport: {
		title: "Diminution/Augmentation System:",
		labels: ["Exists", "Is Obligatory", "Is Productive"]
	},
	"Describe the language's relation to diminution and augmentation.":
		"Describe the language's relation to diminution and augmentation.",

	// PAGE FIVE

	"5-Predicate Nominals etc.": "5. Predicate Nominals etc.",
	"Predicate Nominals": "Predicate Nominals",
	"General Information to Consider": "General Information to Consider",

	info5: [
		"- These forms generally encode the following information:",
		"   - **Equation**: X is Y",
		"   - **Proper Inclusion**: X is a Y",
		"   - **Location**: X is located Y",
		"   - **Attribution**: X is made Y",
		"   - **Existence**: X exists in Y",
		"   - **Possession**: X has Y",
		"- The forms at the top of the list are much more likely to lack a semantically rich verb, while those at the bottom are less likely to."
	],

	"5-1-Predicate Nominals and Adjectives": "5.1. Predicate Nominals and Adjectives",
	"Predicate Nominals and Adjectives": "Predicate Nominals and Adjectives",
	"What It Is and What It Seems Like": "What It Is and What It Seems Like",

	info51: [
		"- May encode _proper inclusion_ (X is a Y) and _equation_ (X is Y)",
		"- Predicate adjectives are usually handled the same as predicate nominals, though they will sometimes use a different copula than the nouns.",
		"- If they use a verb, it will not be a very _semantically rich_ verb (e.g. to be, to do)",
		"- Will generally use one of the following strategies:",
		"   - _Juxtaposition_",
		"      - Two nouns (or a noun and adjective) are placed next to each other.",
		"      - Ex: Steve doctor. Mouse small. (Steve is a doctor. A mouse is small.)",
		"   - _Joined by copula_",
		"      - A _copula_ is a morpheme that \"couples\" two elements. Often encodes Tense/Aspect (8.3), and can be restricted to certain situations (e.g. only in non-present tenses).",
		"      - The copula can take different forms:",
		"         - _Verb_",
		"            - These tend to be very irregular verbs.",
		"            - They tend to belong to the same verb class as stative verbs.",
		"            - They tend to function as auxiliaries in other constructions.",
		"            - Ex: Steve is a doctor.",
		"         - _Pronoun_",
		"            - The pronoun corresponds to the subject.",
		"            - Ex: Steve, he a doctor.",
		"         - _Invariant particle_",
		"            - This particle may derive from a verb or pronoun.",
		"            - The particle will not encode tense/aspect/gender/anything.",
		"            - Ex: Steve blorp doctor.",
		"         - _Derivational operation_",
		"            - Predicate noun becomes a verb.",
		"            - Ex: Steve doctor-being."
	],

	"Describe the language's strategy for predicate nominals and adjectives.":
		"Describe the language's strategy for predicate nominals and adjectives.",
	"5-2-Predicate Locatives": "5.2. Predicate Locatives",
	"Predicate Locatives": "Predicate Locatives",
	"Where It Is": "Where It Is",

	info52: [
		"- Many languages use a word that gets translated as \"be at\".",
		"- The locative word is often the same as a locative adposition.",
		"- Word order usually distinguishes possessive clauses from locational clauses.",
		"   - Ex: Steve has a cat (possessive); the cat is behind Steve (locational).",
		"- [newSection]English bases locatives on possessive clauses, but with an inanimate possessor.",
		"- Russian bases possessive clauses on locatives, but with an animate possessor."
	],
	"How does the language handle predicate locatives?": "How does the language handle predicate locatives?",
	"5-3-Existentials": "5.3. Existentials",
	Existentials: "Existentials",
	"These Exist": "These Exist",

	info53: [
		"- These constructions usually serve a presentative function, introducing new participants.",
		"- Usually, the nominal is indefinite: Consider \"There are lions in Africa\" (valid) vs. \"There are the lions in Africa\" (invalid).",
		"- There is usually little to no case marking, verb agreement, etc.",
		"- They often share features of predicate nominals (copula), but some languages prohibit such forms.",
		"- They often have special negation stategies (e.g. a verb meaning 'to lack': \"Under the bed lacks a cat\").",
		"- They often play a role in:",
		"   - \"Impersonal\" or \"circumstantial\" constructions.",
		"      - e.g. There will be dancing in the streets!",
		"   - Situations that lack the need for any specific actor, or to downplay the significance of an actor.",
		"      - e.g. Someone is crying."
	],

	"How are existential clauses formed? Does this vary according to tense, aspect or mood? Is there a special negation strategy? Is this form used to impart other information (such as possessives) as well?":
		"How are existential clauses formed? Does this vary according to tense, aspect or mood? Is there a special negation strategy? Is this form used to impart other information (such as possessives) as well?",
	"5-4-Possessive Clauses": "5.4. Possessive Clauses",
	"Possessive Clauses": "Possessive Clauses",

	info54: [
		"- These follow two main strategies:",
		"   - Verb strategy: \"I have a book.\"",
		"   - Copula strategy: \"The book is at me.\""
	],

	"Does the language use a verb or copula strategy?": "Does the language use a verb or copula strategy?",

	// PAGE SIX

	"6-Grammatical Relations": "6. Grammatical Relations",
	Alignments: "Alignments",
	"Show the Alignments": "Show the Alignments",

	info6: [
		"- **Nominative/Accusative Alignment**:",
		"   - (S)ubjects and (A)gents are treated the same, in the nominative case.",
		"      - _I_ fell.",
		"      - _I_ pushed him.",
		"   - (P)atients are given the accusative case.",
		"      - I pushed _him_.",
		"   - S and A are both viewed as agents, having volition",
		"   - A tends to stick with the (V)erb, leaving the P floating:",
		"      - AVP; PAV; VAP; PVA",
		"- [newSection]**Ergative/Absolutive Alignment**:",
		"   - (S)ubjects and (P)atients are treated the same, in the ergative case.",
		"      - _I_ fell.",
		"      - Me pushed _he_.",
		"   - (A)gents are given the absolutive case.",
		"      - _Me_ pushed he.",
		"   - S and P are both viewed as typically being new information, or undergoing change.",
		"   - P tends to stick with the (V)erb, leaving the A floating:",
		"      - AVP; VPA; APV; PVA",
		"   - [newSection]**Split Ergativity**:",
		"      - In natural languages, ergativity tends to coexist with the nominative/accusative system in a hierarchy, with the latter system used for the higher level. Typical hierarchies:",
		"         - 1st person &gt; 2nd person &gt; human 3rd-persons &gt; 3rd-person animates &gt; 3rd-person inanimates",
		"         - agreement &gt; pronouns/case marking",
		"         - definite &gt; indefinite",
		"         - non-past tense &gt; past tense",
		"         - imperfect aspect &gt; perfect aspect",
		"      - Below are some examples of real-world hierarchies. N/A is nominative/accusative, E/A is egrgative/absolutive.",
		"         - Dyirbal uses N/A for 1st and 2nd person pronouns, E/A for everything else _(this is a very common split point)_",
		"         - Cashinahua uses N/A for 1st and 2nd person, separate markings for Agent and Patient in 3rd person, and E/A for everything else",
		"         - Managalasi uses N/A for person marking on verbs and E/A for pronouns",
		"         - Hindi-Urdu uses N/A markings in the imperfective aspect, but E/A for the arguments of transitive, perfective verbs",
		"         - Sinaugoro uses N/A for agreement marking, but E/A for case marking"
	],

	checkboxAlignmentSystem: {
		header: "Primary Alignment System",
		rowLabels: ["Nominative / Accusative", "Ergative / Absolutive"]
	},
	checkboxAlignmentSystemExport: {
		title: "Primary Alignment System:"
	},
	"Are there any exceptions to the primary alignment? Do they exist in a hierarchy?":
		"Are there any exceptions to the primary alignment? Do they exist in a hierarchy?",

	// PAGE SEVEN

	"7-Voice/Valence Operations": "7. Voice/Valence Operations",
	Valence: "Valence",
	"What is Valence?": "What is Valence?",

	info7: [
		"- **Valence** refers to the amount of arguments in a clause.",
		"   - \"I fell\" has a valence of 1.",
		"   - \"I pushed Steve\" has a valence of 2.",
		"   - \"I gave Steve a coconut\" has a valence of 3.",
		"   - \"I gave a coconut to Steve\" has a valence of 2.",
		"      - \"To Steve\" is in an oblique case, forming a verb modifier instead of being an argument of the verb."
	],

	"7-1-Valence-Increasing Operations": "7.1. Valence-Increasing Operations",
	"7-1-1-Causatives": "7.1.1. Causatives",
	Causatives: "Causatives",
	"Forcing You to Read This": "Forcing You to Read This",

	info711: [
		"- **Lexical**:",
		"   - Most languages have at least some form of this. There are three major methods employed:",
		"      - No change in the verb:",
		"         - \"The vase broke\" becomes \"Steve broke the vase\".",
		"      - Some idiosyncratic change in the verb:",
		"         - \"The tree fell\" becomes \"Steve felled the tree\".",
		"      - Different verb:",
		"         - \"The tree died\" becomes \"Steve killed the tree\".",
		"- **Morphological**:",
		"   - The verb change applies to all verbs (not just one, like _fell_ vs _felled_).",
		"   - Often expresses causation and permission.",
		"   - May be restricted to only intransitive verbs.",
		"   - In transitive verbs, the causee often goes into a different case.",
		"- **Analytical**:",
		"   - A separate causative verb is used. This usually isn't valence-increasing!",
		"      - \"Steve caused the tree to die\".",
		"      - \"Steve forced the stick into the ground.\"",
		"- [newSection]**Coding Principles**:",
		"   - **Structural Distance**",
		"      - If the language has more than one formal type of causative, the \"smaller\" one will be used for more direct causation, while the \"larger\" one will be used for less direct causation. Longer linguistic distance correlates to greater conceptual distance.",
		"         - \"George killed Joe\" is more direct than \"George caused Joe to die\".",
		"         - Amharic has an _a-_ prefix for direct causation, _as-_ for indirect.",
		"      - Analytic causatives often \"require\" an animate causee.",
		"         - Japanese has a morphological causative when the causee has some control over the event, but requires a lexical causative for inanimate causees.",
		"            - Consider \"Joe made George come down\" vs \"Joe brought the golf clubs down\".",
		"   - **Finite vs. Non-Finite Verbs**",
		"      - The more distant the cause from the effect in space or time, the more finite the verb will be.",
		"         - Ex: _\"Jorge **hizo comer** pan a Josef\"_ indicates Jorge forced Josef to eat bread directly, while _\"Jorge **hizo** que Josef **comiera** pan\"_ indicates he forced Josef indirectly, maybe by removing all other food.",
		"   - **Case**",
		"      - If the causee retains a high degree of control, it will appear in a case associated with Agents, but with little control, will appear in a Patient case.",
		"         - Ex: \"Steve asked that _he_ leave\" gives Steve less control over the situation than \"Steve asked _him_ to leave\"."
	],

	"Describe which method(s) the language uses to create causatives.":
		"Describe which method(s) the language uses to create causatives.",
	"7-1-2-Applicatives": "7.1.2. Applicatives",
	Applicatives: "Applicatives",
	"Adding a Third Participant": "Adding a Third Participant",

	info712: [
		"- The verb is marked for the role of a direct object, bringing a peripheral participant (the applied object) on stage in a more central role.",
		"   - This may turn a transitive verb ditransitive, or it may replace the direct object entirely (which technically isn't valence-increasing!)",
		"      - \"I arrived at Shionti's\" in Nomatsiguenga. `[translation table] n-areeka Sionti-ke / I-arrive Shionti-LOC__(valence:__1) / n-areeka-re Sionti / I-arrive-him Shionti__(valence:__2)`"
	],

	"Describe which method(s) the language uses for applicatives, if any.":
		"Describe which method(s) the language uses for applicatives, if any.",
	"7-1-3-Dative Shift": "7.1.3. Dative Shift",
	"Dative Shift": "Dative Shift",
	"Looking Shifty": "Looking Shifty",

	info713: [
		"- This only applies to verbs that take an Agent, a Patient and a Recipient or Experiencer. This latter argument is usually put in the _dative_ case.",
		"- Applicatives mark the verb, while a Dative Shift does not.",
		"- Applicatives usually promote Instrumentals, while Dative Shifts usually promote Recipients and Benefactives.",
		"- Example:",
		"   - \"Steve gave the ball to Linda.\" Valence: 2",
		"   - \"Steve gave Linda the ball.\" Valence: 3, recipient promoted."
	],

	"Is there a dative shift construction in the language? What is it? What semantic roles can be shifted? Is it obligatory?":
		"Is there a dative shift construction in the language? What is it? What semantic roles can be shifted? Is it obligatory?",
	"7-1-4-Dative of Interest": "7.1.4. Dative of Interest",
	"Dative of Interest": "Dative of Interest",
	"Pique Your Interest": "Pique Your Interest",

	info714: [
		"- This is adding a participant that is associated in some way.",
		"   - \"Dinner is burned [for me]\" in Spanish `[translation table] Se me quemó la cena. / REFL 1s burn.3s.PST DEF.f.s din&shy;ner`",
		"   - \"She cut the hair [on him]\" in Spanish. `[translation table] Le cortó el pelo. / 3.DAT cut.3s.PST DEF.M.s hair`"
	],

	"Is there a dative-of-interest operation?": "Is there a dative-of-interest operation?",
	"7-1-5-Possessor Raising (a.k.a. External Possession)":
		"7-1-5-Possessor Raising (a.k.a. External Possession)",
	"Possessor Raising": "Possessor Raising",

	info715: [
		"- In many languages, this exists separate from a dative of interest.",
		"   - \"I fixed the railroad track\" in Choctaw. `[translation table] Tali i-hina-ya ayska-li-tok / rock AGR(III)-road-NS fix-1s-PST__(nor&shy;mal__con&shy;struc&shy;tion) / Tali-ya hina im-ayska-li-tok / rock-NS road AGR(III)-fix-1s-PST__(pos&shy;ses&shy;sor__raised)`"
	],

	"Does possessor raising occur?": "Does possessor raising occur?",
	"7-2-Valence-Decreasing Operations": "7.2. Valence-Decreasing Operations",
	"7-2-1-Reflexives": "7.2.1. Reflexives",
	Reflexives: "Reflexives",
	"You Are Me?": "You Are Me?",

	info721: [
		"- The Agent and Patient are the same, so one is omitted.",
		"- [newSection]Lexical reflexives:",
		"   - The verb itself implies reflexivity.",
		"      - e.g.: Steve washed and shaved every morning.",
		"- Morpholigical reflexives:",
		"   - A word (or words) is modified to indicate the reflexive.",
		"      - e.g.: Spanish: Jorge se lavo. (George washed himself, \"se lavo\" being a morphing of the root verb \"lavarse\".)",
		"- Analytic reflexives:",
		"   - Inserting a lexical word, making a semantic valence-lowering (but not a lexical one).",
		"      - e.g.: Steve washed himself.",
		"   - These are often based on body parts.",
		"      - e.g.: Another face in the crowd; Move your butt!"
	],

	"How are reflexives handled?": "How are reflexives handled?",
	"7-2-2-Reciprocals": "7.2.2. Reciprocals",
	Reciprocals: "Reciprocals",
	"Working Together": "Working Together",

	info722: [
		"- The Agent and Patient are performing the same action, or performing an action together. These are often expressed the same way as reflexives.",
		"- [newSection]Lexical reciprocals:",
		"   - The verb itself implies reciprocity.",
		"      - e.g.: Steve and Jane shook hands [with each other].",
		"- Morpholigical and lexical reciprocals follow the same patterns as those for reflexives."
	],

	"How are reciprocals handled?": "How are reciprocals handled?",
	"7-2-3-Passives": "7.2.3. Passives",
	Passives: "Passives",
	"Moving Focus From the Agent": "Moving Focus From the Agent",

	info723: [
		"- A semantically transitive verb with omitted Agent, the Patient treated as Subject, and the verb behaves as if it is intransitive. (The Agent is made less topical than the Patient.)",
		"- [newSection]Personal passive: Agent is implied, or expressed obliquely.",
		"   - Lexical passives are rare.",
		"   - Morphological passives are more common, often the same morphology as perfect aspect. May be derived from copulas or nominalizations.",
		"   - English has analytic passives, with a copula and a \"past participle\" (Patient nominalization).",
		"      - e.g.: The tree has been killed.",
		"- [newSection]Impersonal passive: no Agent directly indicated; can be used for intransitive verbs as well as transitive.",
		"   - No known languages uses a specific morphology for this!",
		"- [newSection]Other kinds of passives may exist.",
		"   - English has the basic \"Steve was eaten by a bear\" but can also express it with other verbs, as in \"Steve got eaten by a bear.\"",
		"   - Yup'ik has an adversative passive (to the detriment of the subject), abilitative passive (X can be Y [by Z]), and a negative abilitiative (X cannot be Y [by Z]).",
		"- [newSection]Passive construction may be obligatory in a particular environment, e.g. when the Patient outranks the Agent."
	],

	"How are passives handled?": "How are passives handled?",
	"7-2-4-Inverses": "7.2.4. Inverses",
	Inverses: "Inverses",
	"Playing The Reverse Card": "Playing The Reverse Card",

	info724: [
		"- This is a valence \"rearranging\" device, e.g. \"Steve taught him\" becomes \"Him, Steve taught.\"",
		"- Often follows a hierarchy where a \"higher\" Agent requires direct and a \"lower\" Agent requires the inverse."
	],

	checkboxInverses: {
		rowLabels: [
			"Marked inverse only",
			"Both direct and inverse explicitly marked",
			"Special verb agreement markers for inverse",
			"Functional inverse: word order changes, e.g. VAP becomes VPA"
		]
	},
	checkboxInversesExport: {
		title: "Inverse Constructions:"
	},
	"Describe any peculiarities of inverse constructions.": "Describe any peculiarities of inverse constructions.",
	"7-2-5-Middle Constructions": "7.2.5. Middle Constructions",
	"Middle Constructions": "Middle Constructions",
	"What Are These?": "What Are These?",

	info725: [
		"- Also known as anticausatives or detransitivation: a semantically transitive situation expressed as a process undergone by a Patient (rather than carried out by an Agent).",
		"- Many languages express this the same way as they express passives.",
		"- This often express the notion that the subject is both controller and affected.",
		"   - e.g. \"Steve broke the car\" becomes \"The car broke\" (and it was no fault of Steve's)."
	],

	"How are middle constructions handled?": "How are middle constructions handled?",
	"7-2-6-Antipassives": "7.2.6. Antipassives",
	Antipassives: "Antipassives",

	info726: [
		"- Similar to passives, but the Patient is downgraded instead of the Agent.",
		"- Generally, this only happens in ergative languages or in languages without verbal agreement, but many exceptions exist.",
		"- Often, the Patient is omitted or oblique, the verb is marked intrasitive, and the Agent is placed in absolutive case."
	],

	"Describe antipassive strategies in the language, if they exist.":
		"Describe antipassive strategies in the language, if they exist.",
	"7-2-7-Object Demotion/Omission/Incorporation":
		"7-2-7-Object Demotion/Omission/Incorporation",
	"Object Demotion and Related Functions": "Object Demotion and Related Functions",

	info727: [
		"- **Demotion**: \"Steve shot Bob\" becomes \"Steve shot at Bob\".",
		"- [newSection]**Omission**: \"Steve shot Bob\" becomes \"Steve shot\".",
		"- [newSection]**Incorporation**: \"Steve shot Bob\" becomes \"Steve Bob-shot\".",
		"   - The incorporated object is usually the Patient, rarely the Agent.",
		"   - May have other semantic functions.",
		"      - In Panare, incorporating a body part noun into a cutting verb means the part was cut completely off (\"Darth Vader hand-cut\"), whereas leaving it unincorporated means it was merely injured (\"Darth Vader cut hand\")."
	],

	"Is object demotion/omission allowed? How about incorporation?": "Is object demotion/omission allowed? How about incorporation?",

	// PAGE EIGHT
	"8-Other Verb Operations": "8. Other Verb Operations",
	"8-1-Nominalization": "8.1. Nominalization",
	Nominalization: "Nominalization",
	"Making Nouns": "Making Nouns",

	info81: [
		"- Every language has strategies of adjusting the grammatical category of a root. Turning a word into a noun is _nominalization_.",
		"- [newSection]English has multiple methods, with differing levels of productivity.",
		"- Typically, a language will use differing methods to create nominalizations according to the result.",
		"- [newSection]Some methods:",
		"   - **Zero Operator**: walk → a walk, look → a look",
		"   - **Affix**: walk → walking, employ → employment, grow → growth, construct → construction",
		"   - **Merge with Adposition**: hang + up → hangup, make + over → makeover, talk + to → talking to",
		"   - **Analytical**: Mandarin uses a particle _de_ to indicate some nominalizations",
		"      - _hézuò_ (cooperate) + _de_ → cooperation",
		"- [newSection]Types of nominalization:",
		"   - **Action**:",
		"      - Usually refers to the action in the abstract.",
		"         - walk → walking",
		"         - think → thinking",
		"   - **Agent**:",
		"      - Typically refers to an Agent who is characteristic of the root verb (teach → a teacher), but some languages instead refer to someone engaged in the activity at the moment (teach → one who is presently teaching).",
		"   - **Patient**:",
		"      - In English, this mostly happens with the modifiers \"good\" and \"bad\".",
		"         - buy → a good buy",
		"         - fall → a bad fall",
		"      - This can also form the \"past participle\" in a language.",
		"         - employ → employee : this form comes from the French past participle!",
		"   - **Instrument**:",
		"      - Refers to the object used in the action.",
		"      - In English, this usually follows the same format as an Agent nominalization.",
		"      - In Spanish, compounding a verb with a plural object makes an instrument.",
		"         - e.g. _abre_ (open) + _latas_ (cans) → _el abrelatas_ (can-opener)",
		"   - **Location**:",
		"      - Many languages use this to refer generally to a place where the action tends to occur, e.g. work → workshop, burn → fireplace.",
		"   - **Product**:",
		"      - This refers to something that exists because of an action.",
		"      - English tends to do this with zero operators (scratch → a scratch) or by changing the stress pattern (permit → a permit, reject → a reject, convert → a convert).",
		"   - **Manner**:",
		"      - This is uncommon among languages, but English has a couple, generally confined to sports terminology.",
		"         - curve → a curve (That pitcher's curve is unhittable.)",
		"         - serve → a serve (Serena's serve is imposing.)"
	],



	"Describe the nominalizations that exist in the language, and explain how productive they are.":
		"Describe the nominalizations that exist in the language, and explain how productive they are.",
	"8-2-Compounding": "8.2. Compounding",
	"Word-Making": "Word-Making",


	info82: [
		"- **Noun Incorporation**: noun becomes attached to a verb (see 7.2.7).",
		"   - The most common form is Patient incorporation (sell pigs → to pig-sell).",
		"- [newSection]**Verb Incorporation**: two verbs merge, one modifying the other.",
		"   - Often, verbs of motion enter into these pairings (shout-rise → he shouts rising).",
		"   - Verbs that freely compound like this typically lose their verbal character and become derivational affixes."
	],

	"Describe any compounding strategies that exist in the language.":
		"Describe any compounding strategies that exist in the language.",
	"8-3-Tense/Aspect/Mode": "8.3. Tense/Aspect/Mode",
	"Tense, Aspect and Mode": "Tense, Aspect and Mode",

	info83: [
		"- **TAM** (Tense, Aspect, Mode) are sometimes hard to tease apart, and may only be considered separate because of how they are in western language.",
		"- Some languages pay more attention to tense (English), aspect (Austronesian languages), or mode (Eskimo).",
		"   - Furthermore, some verb stems may not allow certain operations while favoring others.",
		"- Many languages don't morphologically indicate one or more of these divisions. (When not indicated morphologically, the language will use lexical or analytical methods.)",
		"   - Aspect: only 74% of languages use morphology",
		"   - Mode: only 68% of languages do",
		"   - Tense: barely 50% of languages do!",
		"- [newSection]TAM morphemes often interact significantly with case or number marking (nom/acc in one aspect, erg/abs in another; merging aspect with number)."
	],

	checkboxTAM: {
		header: "Morphology Exists For:",
		rowLabels: ["Tense", "Aspect", "Mode", "Other (see below)"],
		labels: ["Tense", "Aspect", "Mode", "Other"]
	},
	checkboxTAMExport: {
		title: "Morphology Exists For:"
	},
	"8-3-1-Tense": "8.3.1. Tense",
	Tense: "Tense",
	"Info on Tense": "Info on Tense",

	info831: [
		"- **Tense** sets an action in time in relation to \"now\".",
		"- Languages can divide time up into different sets of tenses:",
		"   - Past/Present/Future",
		"   - Past/Nonpast",
		"   - Nonfuture/Future",
		"   - Not-Now/Now/Not-Now (two tenses!)",
		"   - Distant Past/A Year Ago/A Month Ago/A Week Ago/Today or Yesterday/Now/Soon/Future",
		"      - When human languages have divided past or future into multiple segments, there are never more future segments than past segments!",
		"- [newSection]Future tense markers often derive from \"want\", \"come\", or \"go\".",
		"   - These verbs may still function separately!",
		"      - He come (present)",
		"      - He come go (will go)",
		"      - He come come (will come)"
	],

	"Is there a Tense system? How does it operate? How does it divide time?":
		"Is there a Tense system? How does it operate? How does it divide time?",
	"8-3-2-Aspect": "8.3.2. Aspect",
	Aspect: "Aspect",
	"Info on Aspect": "Info on Aspect",

	info832: [
		"- **Aspect** describes the internal structure of an event or state. Here are some typical aspects:",
		"   - **Perfective**: The situation is viewed as a single event.",
		"      - \"She wrote a letter.\"",
		"      - \"He walked around the block.\"",
		"   - **Imperfective**: The situation is viewed from \"inside\" as an ongoing process.",
		"      - \"She writes a letter.\"",
		"      - \"He walks around the block.\"",
		"   - **Perfect**: A currently relevant state brought about by the verb.",
		"      - \"She has written a letter.\"",
		"      - \"He has walked around the block.\"",
		"   - **Pluperfect**: A combination of Perfect aspect and Past tense; the currently relevant state was brought about in the past.",
		"      - \"She had written a letter.\"",
		"      - \"He had walked around the block.\"",
		"   - **Completive**: Refers to the end of a situation.",
		"      - \"She finished writing a letter.\"",
		"      - \"He finished walking around the block.\"",
		"   - **Inceptive**: Refers to the beginning of a situation.",
		"      - \"She started writing a letter.\"",
		"      - \"He began walking around the block.\"",
		"   - **Continuative/Progressive**: This implies an ongoing, dynamic situation.",
		"      - \"She is writing a letter.\"",
		"      - \"He is walking around the block.\"",
		"   - **Habitual**: This implies an event or state happens regularly.",
		"      - \"She often writes a letter.\"",
		"      - \"He usually walks around the block.\"",
		"   - **Punctual**: The state or event is too short to have an internal structure.",
		"      - \"She coughed.\"",
		"   - **Iterative**: A Punctual state or event takes place several times in succession.",
		"      - \"He is coughing.\"",
		"   - **Atelic**: An event that has no clearly defined end-point.",
		"      - \"He is coughing and coughing and coughing.\"",
		"   - **Telic**: Has a clearly defined end-point.",
		"      - \"She is near the end of her walk.\"",
		"   - **Static**: A changeless state.",
		"      - \"He is just plain boring.\"",
		"- [newSection]Languages may handle certain aspects in different ways.",
		"   - English uses context for most aspects.",
		"   - Spanish uses morphology for Perfective and Imperfective aspects, and uses a morphological/analytical combination for Perfect.",
		"   - Mandarin has a Perfective particle.",
		"   - Finnish uses an accusative case for Perfective and a \"partitive\" case for Progressive.",
		"      - In human languages, case markers like this can be mistaken for TAM markers!",
		"- [newSection]Progressive aspect constructions often derive from locational structures.",
		"   - English has gone from \"He is at walking\" to \"He is a-walking\" (still used in some places) to \"He is walking\".",
		"- [newSection]There is often a link between aspect marking and location/direction marking. English has some examples:",
		"   - I _came_ to see it as an abberation (inceptive)",
		"   - I cut _away_ at the handcuffs (imperfective)",
		"   - I drank your milkshake _up_ (perfective)"
	],

	"Describe the way the language handles Aspect.": "Describe the way the language handles Aspect.",
	"8-3-3-Mode": "8.3.3. Mode",
	Mode: "Mode",
	"Info on Mode": "Info on Mode",

	info833: [
		"- **Mode** describes a speaker's attitude toward a situation, including how likely or truthful it is, or how relevant the situation is to them.",
		"- Mode, Mood and Modality are often used interchangeably, though some linguists make distinctions between them.",
		"   - **Realis**: the speaker insists the situation is real, or holds true.",
		"   - **Irrealis**: the speaker makes no claim as to the situation's reality or truthfulness.",
		"      - Conditional statements (if X...) are inherently Irrealis.",
		"      - Interrogative statements (questions) and imperative statements (commands) tend to be treated as Irrealis.",
		"      - Other statements that tend to be treated as Irrealis:",
		"         - Subjunctive (possibility, what if)",
		"         - Optative (wishes)",
		"         - Hypothetical/Imaginary",
		"         - Probability",
		"         - Deontic (obligations: should, must, have to)",
		"         - Potential (might, ability to; sometimes considered very weak Deontic)",
		"   - [newSection]Evidentiality and Validationality are sometimes part of the Mode system. They can also stand alone (8.5).",
		"- [newSection]Negative assertions (see 9.2) can be Realis or Irrealis depending on how strongly the assertion is, but some languages still treat all negative statements as Irrealis.",
		"- [newSection]Mode interacts strongly with Tense and Aspect.",
		"   - Habitual aspect is inherently less Realis than Perfective aspect.",
		"   - Statements that are more Realis are more likely to be definite and referential.",
		"      - Steve ate the candy. (Perfective)",
		"      - Steve always eats candy. (Habitual)",
		"      - Steve always eats the candy. (Technically grammatical, but sounds \"wrong\")"
	],


	"Describe how the language deals with Mode.": "Describe how the language deals with Mode.",
	"8-4-Location/Direction": "8.4. Location/Direction",
	"Location and Direction": "Location and Direction",
	"Where?": "Where?",

	info84: [
		"- While Tense grounds statements in time, some languages grammaticize location and/or direction markers to ground statements in space. It may be even more central to discourse than tense in some languages.",
		"- [newSection]Directional formatives are often related to basic verbs of motion (go, come, arrive, depart, return, go up, go down).",
		"- [newSection]Some languages (Lahu, Tibeto-Burman languages) have one motion verb and use directional formatives to indicate progression towards (hither) or away from (thither) a point of reference.",
		"- [newSection]Locational marking is often culturally or geographically relevant to the culture that speaks it.",
		"   - Quechua, spoken in the Andes mountains, has suffixes that indicate uphill, downhill, and \"at the same altitude\".",
		"   - Yagua, spoken in Peruvian lowland rivers, has suffixes that indicate an action was performed upriver, downriver, or moving horizontally across land or water.",
		"      - There are also suffixes that express if an action happened on arrival at a new scene, or on arrival at the current scene.",
		"- [newSection]Papuan languages have extensive markers that can be used in combination, i.e. \"She moved it down and away from her.\"",
		"- Otomí has auxiliaries than indicate an action is towards (centric) or away from (exocentric) a designated center (usually where the speaker is)."
	],

	"Does the language have affixes or other functions that represent spatial grounding?":
		"Does the language have affixes or other functions that represent spatial grounding?",
	"8-5-Evidentiality, Validationality and Mirativity":
		"8-5-Evidentiality, Validationality and Mirativity",
	Evidentiality: "Evidentiality",
	"Truth and Certainty": "Truth and Certainty",

	info85: [
		"- **Evidentiality** expresses how much evidence the speaker has to make this assertion. For instance, first-hand knowledge is more evidential than third-hand suspect information.",
		"- **Validationality** is sometimes separate from Evidentiality. It is how languages express relative certainty of truth. We are more likely to be certain of:",
		"   - Past events vs future events",
		"   - The completion of Perfective events vs still-in-progress events",
		"   - Realis assertions vs Irrealis assertions",
		"- **Mirativity** expresses how well this information fits into the speaker's worldview.",
		"   - \"The cat was found on the roof\" has high mirativity.",
		"   - \"The elephant was found on the roof\" would be surprising, and therefore has very low mirativity.",
		"- [newSection]These markers often operate on the clause level rather than the verb-phrase level. They tend to be tightly tied to TAM.",
		"- [newSection]The most common type of evidential marker is the Hearsay particle.",
		"- [newSection]Tuyuca has a complex, five-level system:",
		"   - Witnessed by the speaker",
		"   - Not witnessed by the speaker",
		"   - General knowledge",
		"   - Inferred from evidence",
		"   - Hearsay"
	],

	"Are there any grammaticized indicators of Evidentiality, Validationality, or Mirativity?":
		"Are there any grammaticized indicators of Evidentiality, Validationality, or Mirativity?",
	"8-6-Miscellaneous": "8.6. Miscellaneous",
	Miscelaneous: "Miscelaneous",
	Leftovers: "Leftovers",

	info86: [
		"- There are miscellaneous verb-phrase operations that might or might not exist.",
		"   - Lexical time reference (as opposed to tense)",
		"      - English: \"Yesterday\", \"today\"",
		"      - Koyukon: \"ee-\" means \"once only\"",
		"      - Yagua: \"-jásiy\" means \"earlier today\"",
		"   - Distributive, i.e. \"back and forth\" or \"all over the place\"",
		"   - Environmental modification of motion verbs, i.e. \"at night\", \"over water\"",
		"   - Speaker attitude, i.e. \"disgusted\" or \"complaining\""
	],
	"Does the language have any other notable verb phrase operations?":
		"Does the language have any other notable verb phrase operations?",

	// PAGE NINE

	"9-Pragmatic Marking": "9. Pragmatic Marking",
	Pragmatics: "Pragmatics",
	"What are Pragmatics?": "What are Pragmatics?",

	info9: [
		"- Pragmatics is the interpretation of utterances, and Pragmatic Statuses relate the _content_ of an utterance to its _context_. They cover the following concepts:",
		"   - **Identifiability**: can an argument be identified by the listener?",
		"      - English uses proper names and \"the\" to indicate identifiability.",
		"   - **Objective Referentiality**: is an argument a bounded, individual entity?",
		"      - English can be ambiguous: Does \"I'm looking for a housekeeper\" mean anyone who is housekeeper, or a specific housekeeper the speaker is not naming?",
		"      - Spanish has a particle _a_ for human arguments that indicates a specific individual is being talked about.",
		"         - \"Buscando una empleada\" - I'm looking for a (any) housekeeper",
		"         - \"Buscando a una empleada\" - I'm looking for a (specific) housekeeper",
		"   - **Discourse Referentiality**: is an argument relevant to the discourse or just adjacent?",
		"      - Panago: putting a new argument before a verb \"foreshadows\" that the argument will be important later. Putting it after the verb means it's just transitory.",
		"      - English often uses _this_ to indicate importance. If you hear someone say, \"Take a look at _this_ guy,\" you can be sure they're going to continue talking about the guy!",
		"   - **Focus** covers multiple concepts:",
		"      - **Marked Focus**:",
		"         - \"Mom _did_ give me permission!\" - English uses \"do\" to focus on the truth of a statement, often in opposition to the listener's beliefs.",
		"      - **Assertive Focus**:",
		"         - \"Mary was wearing _this hideous bridesmaid's dress_.\" - the speaker believes the listener has no knowledge of the information.",
		"      - **Counter-Presuppositional Focus**:",
		"         - \"The nerd and the cheerleader came to the party, but _the nerd_ won everyone's hearts.\" - the speaker believes the listener believes the opposite.",
		"      - **Exhaustive Focus**:",
		"         - \"I _only_ spoke to Ned.\" - the speaker excludes all other possible options.",
		"      - **Contrastive Focus**:",
		"         - \"_Mary_ chose the dresses.\" - the listener may believe one participant had a specific role, but the speaker is saying someone else held that role.",
		"   - **Topic**:",
		"      - \"_Beans_, how I hate them.\" - a new argument is declared as a topic of further discourse."
	],
	"9-1-Focus, Contrast and Topicalization": "9.1. Focus, Contrast and Topicalization",
	"Focus, Contrast, etc.": "Focus, Contrast, etc.",
	"Focus is What This is About": "Focus is What This is About",

	info91: [
		"- **Intonation and Vocalization**, such as tempo changes (\"Do. Not. Do. That.\"), volume changes (screaming, whispering), and pitch changes (\"Do _not_ do that\"), are nearly universal.",
		"- [newSection]**Constituent Order**:",
		"   - Practically all language use **Preposing**, moving an argument by itself to a position before a clause that it's relative to. The opposite is **Postposing**.",
		"      - \"_Potatoes_, I like them.\"",
		"   - **Fronting** is similar, but rearranges arguments so that Pragmatic Status is given to the moved argument.",
		"      - \"_Potatoes_ I like.\"",
		"   - **Apposition** is adding a free noun phrase to a clause.",
		"      - \"_Termites_. Why does the universe hate me?\"",
		"   - **Clefting** is a type of predicate nominal where a noun phrase is joined to a relative clause that references that original noun phrase. (See below.)",
		"      - \"_You_ are _the one that I want_.\"",
		"- [newSection]**Formatives** move along a continuum between morphological case markers (4.4) and pragmatic status markers:",
		"   - The continuum:",
		"      - **Pragmatic Status Markers**: English articles, Aghem focus particles (see below), etc.",
		"      - **Overlay systems**: Japanese and Korean \"topic marking\"",
		"      - **Case Markers**: Latin, Eskimo, Russian, Quechua, etc.",
		"   - Remember that these can partially correlate with grammatical roles: e.g. English _subjects_ are often also _identifiable_.",
		"      - [newSection]Aghem uses verb morphology and focus particles to express various pragmatic nuances.",
		"         - \"énáʔ _mɔ̀_ fúo kí-bɛ́ â fín-ghɔ́\" - Inah gave fufu to his friends.",
		"         - \"énáʔ _má՚á_ fúo kí-bɛ́ â fín-ghɔ́\" - Inah _DID_ give fufu to his friends. (truth focus)",
		"         - [newSection]\"fú kí mɔ̀ ñiŋ _nò_ á kí-՚bé\" - The rat _ran_ (did not walk, scurry, etc) in the compound.",
		"         - \"fú kí mɔ̀ ñiŋ á kí-՚bé _nò_\" - The rat ran in _the compound_ (not in the house, church, etc.).",
		"      - [newSection]Akam has a focus particle _na_ and a contrastive particle _de_.",
		"         - \"Kwame _na_ ɔbɛyɛ adwuma no.\" - It's Kwame (not anyone else) who will do the work.",
		"         - \"Kwame _de_ ɔbɛkɔ, na Kofi _de_ ɔbɛtena ha.\" - Kwame will go, but Kofi will stay here.",
		"      - [newSection]**Overlay** systems are a combination of case-marking systems and pragmatic status-marking systems: one or more basic case markers are replaced (overlaid) by the status marker when a nominal is singled out for pragmatic treatment.",
		"         - The Japanese topic marker _wa_ can overlay the subject marker _ga_ or the object marker _o_.",
		"            - \"taroo _ga_ hon _o_ katta.\" - Taro bought a book.",
		"            - \"taroo _wa_ hon o katta.\" - As for Taro, he bought a book.",
		"            - \"hon _wa_ taroo ga katta.\" - As for the book, Taro bought it."
	],
	"Are there special devices for indicating Pragmatic Statuses in basic clauses? Describe cleft constructions, if there are any.":
		"Are there special devices for indicating Pragmatic Statuses in basic clauses? Describe cleft constructions, if there are any.",
	"9-2-Negation": "9.2. Negation",
	Negation: "Negation",
	"Don't not read this.": "Don't not read this.",

	info92: [
		"- Common negation strategies:",
		"   - **Clausal negation** - negates an entire proposition",
		"      - \"I didn't do it.\"",
		"   - **Constituent negation** - negates a particular constituent of a proposition",
		"      - \"I have no motive.\"",
		"- [newSection]**Clausal Negation**",
		"   - [newSection]**Lexical Negation**",
		"      - Some verbs just function as the opposite of other verbs, such as \"have\" vs \"lack\".",
		"   - [newSection]**Morphological Negation**",
		"      - Clausal negations are usually associated with the verb.",
		"      - Often tied to other verbal inflections, such as expressing aspect or tense.",
		"   - [newSection]**Analytical Negation**",
		"      - This includes negative particles and negative finite verbs.",
		"      - [newSection]**Multiple Expressions of Negation**",
		"         - It's common for negative constructions to have multiple operators, e.g:",
		"            - two particles",
		"            - a particle and an affix",
		"            - a particle, an affix, and a word order change",
		"      - [newSection]**Different Kinds of Negation**",
		"         - In many languages, the negative affix or particle varies according to tense, aspect, mode, or other factors.",
		"            - It's fairly common for negative imperatives to differ from negative assertions (e.g. Mandarin, Hebrew, Tennet).",
		"            - Tagalog and many Austronesian languages use different particles for plain negatives and negation of existence.",
		"               - \"Mayroon ka ang pera?\" \"Wala.\" - Do you have any money? None.",
		"               - \"Pupunta ka ba sa sayawan?\" \"Hindi.\" - Are you going to the dance? No.",
		"            - Mandarin has _méi_ for existential negatives, _bié_ for negative imperatives, and _bu_ for everything else.",
		"            - Iraqi Arabic has one particle (mɑː) for verbal predicates and another (muː) for verbless predicates (predicate nominals, locationals, existentials, etc.).",
		"         - [newSection]Another method is a finite negative verb and a complement clause (10, 10.2)",
		"            - The negative verb will take finite inflectional morphology and occur in the normal position for a verb. The affirmative verb will be treated like a complement verb.",
		"            - This occurs primarily in verb-initial and verb-final languages.",
		"               - Tungan, a verb-initial language:",
		"                  - \"Na'e-_alu_ 'a Siale\" - Charlie went.",
		"                  - \"Na'e-_'ikai_ ke _'alu_ 'a Siele\" - Charlie didn't go.",
		"   - [newSection]**Secondary Methods of Negation**",
		"      - Alternate word order:",
		"         - Many VP languages change their order for negative clauses. For example, Kru uses AVP for affirmative clauses and APV in negative clauses.",
		"      - Change in tone:",
		"         - Igbo carries a low tone in affirmative clauses and a high tone in negative clauses.",
		"      - Neutralization of tense-aspect distinctions:",
		"         - Komi has a present-future distinction in affirmative, but no such distinction in the negative.",
		"         - Bembe allows two future tense markers in affirmative, but only one of them in the negative.",
		"      - Special inflections:",
		"         - A few languages have special person/number ot TAM markers on verbs in negative clauses. (Negative verbs tend to hold onto older patterns that have been lost in affirmative clauses!)",
		"      - Alternative case-marking patterns:",
		"         - Special case-marking patterns may occur in negative clauses. For example, with certain Russian verbs, the object will be in accusative for affirmative clauses and in genitive case in negative clauses.",
		"- [newSection]**Constituent Negation**",
		"   - [newSection]**Derivational Negation**:",
		"      - Some languages allow a derivation of a stem to transform it into its opposite.",
		"      - English has the not-fully-productive _non-_ and _un-_ prefixes that only work on adjectives and nominals.",
		"      - Panare has a verbal suffix _-(i)ka_ that forms something akin to the opposite of the root verb.",
		"   - [newSection]**Negative Quantifiers**:",
		"      - Many languages have inherently negative quantifiers (\"none\", \"nothing\") or can be negated independent of clause (\"not many\").",
		"      - Most languages allow or require such quantifiers to be accompanied by clausal negation.",
		"         - Standard English is rare in disallowing such use of \"double negatives\".",
		"   - [newSection]**Negative Scope**:",
		"      - Sometimes the two types of negation interact to cause variations in the scope of what can be negated.",
		"      | Statement | Scope |",
		"      | - | - |",
		"      | \"Not many rats survive to adulthood.\" | Quantifier only |",
		"      | \"Many rats do not survive to adulthood.\" | Entire clause |",
		"      | \"I deliberately didn't eat the cheese.\" | Entire clause |",
		"      | \"I didn't deliberately eat the cheese.\" | Adverb only |",
		"      | \"He won't force you to volunteer.\" | Entire clause |",
		"      | \"He will force you not to volunteer.\" | Complement clause |"
	],

	"Describe the standard way of creating a negative clause, plus any secondary strategies that may exist. Is there constituent or derivational negation?":
		"Describe the standard way of creating a negative clause, plus any secondary strategies that may exist. Is there constituent or derivational negation?",
	"9-3-Non-Declarative Speech": "9.3. Non-Declarative Speech",
	"Declarative Statements": "Declarative Statements",
	"Minor Note on Declaratives": "Minor Note on Declaratives",

	info93: [
		"- A declarative statement is an assertion. Most speech is declarative.",
		"- Other types of statements are usually handled as \"modes\" in a language, such as interrogative (questions) and imperatives (commands).",
		"- [newSection]Most often, a language will leave declarative statements unmarked and only mark the others. But some (e.g. Tibetan) will mark declaratives, too."
	],

	"If declaratives are marked, describe how.": "If declaratives are marked, describe how.",
	"9-3-1-Interrogatives": "9.3.1. Interrogatives",
	"9-3-1-1-Yes/No Questions": "9.3.1.1. Yes/No Questions",
	"Yes/No Questions": "Yes/No Questions",
	"Yes? No?": "Yes? No?",

	info9311: [
		"- **Yes/No Questions**, hereafter referred to as _YNQs_, are interrogative clauses where the expected answer is either \"yes\" or \"no\". They can employ any or all of the strategies below.",
		"- [newSection]_Intonation_:",
		"   - There tends to be distinct intonation patterns in YNQs.",
		"   - The pattern is usually rising, as in English, but can be falling, as in Russian.",
		"   - [newSection]Some languages _only_ employ intonation!",
		"- [newSection]_Word Order_:",
		"   - Many languages, especially VP languages, use distinctive constituent orders for YNQs.",
		"   - Usually, this is an inversion of the Agent and Verb, as in many European and Austronesian languages.",
		"      - \"bapak datangkah nanti\" - Father will come later (Malay)",
		"      - \"datangkah bapak nanti\" - Will father come later?",
		"   - English has a strange system where it reverses the Agent and the auxiliary verb. If no auxiliary is present, the verb \"do\" is inserted.",
		"      - \"He will arrive on time\" → \"Will he arrive on time?\"",
		"      - \"They can eat cake\" → \"Can they eat cake?\"",
		"      - \"You want to join me\" (no auxiliary) → \"Do you want to join me?\"",
		"   - American English uses simple Agent/Verb inversion in predicate nominals, existential and locational clauses. British English extends this to possessive constructions.",
		"      - \"He is a cat\" → \"Is he a cat?\"",
		"      - \"Cats are under the bed\" → \"Are cats under the bed?\"",
		"      - \"You were in the garden\" → \"Were you in the garden?\"",
		"      - \"You have a match\" → \"Have you a match?\" (British)",
		"- [newSection]_Interrogative Particle_:",
		"   - Question Particles (QPs) are very common, especially among PV languages, but they do appear in VP languages, too.",
		"   - The QP can be cliticized to the first constituent in the clause, either before or after it.",
		"      - Latin: `[translation table] erat-ne te-cum / he:was-QP you-with // Was he with you?`",
		"      - Mandarin: `[translation table] tā xihuan chī pǐngguǒ ma / she like eat apple QP // Does she like to eat apples?`",
		"      - Tagalog: `[translation table] mabait ba si Pilar? / kind QP is Pilar // Is Pilar kind?`",
		"   - Often, the QP can be omitted, letting context and intonation do the job instead.",
		"   - [newSection]Some varieties of English have developed a QP as an alternative to word order inversion",
		"      - \"You want to go for a ride, _eh_?\"",
		"- [newSection]_Tag Question_:",
		"   - This involves a simple declarative statement, followed by a Tag that requests confirmation or disconfirmation of the statement.",
		"   - These are universally a secondary way of forming YNQs, though they are often the historical source of the currently-used QPs.",
		"   - [newSection]English has Tags for certain times the speaker is assuming they'll get a Yes response:",
		"      - \"Nice day, _isn't it_?\"",
		"      - \"You're going to the club with us tonight, _right_?\"",
		"- [newSection]**Functions**:",
		"   - YNQs are used for additional purposes other than simply asking questions in most languages.",
		"   - [newSection]_To request action_: \"Could you close the door?\"",
		"   - _Rhetorical effect_: \"Are you always so messy?\"",
		"   - _Confirmation_: \"Aren't you going?\"",
		"   - _Intensification_: \"Did he ever yell!\""
	],

	"How are yes/no questions formed? Do they serve other discourse functions other than the obvious?":
		"How are yes/no questions formed? Do they serve other discourse functions other than the obvious?",
	"9-3-1-2-Questions-Word Questions": "9.3.1.2. Questions-Word Questions",
	"Question-Word Questions": "Question-Word Questions",
	"Who? What? Why?": "Who? What? Why?",

	info9312: [
		"- Also known as **Content Questions** or **Information Questions**, Question-Word Questions (QWs) are best exemplified by the English words who, whom, what, where, when, why, which, and how.",
		"- All languages have a set of special QWQs. Often, they're similar or identical to a set of pronouns used elsewhere in the language. (e.g. English's who, where, when.)",
		"- QWs accomplish two things:",
		"	1. Mark the clause as a question.",
		"	2. Indicate what information is being requested.",
		"- [newSection]In VP languages (like English) it is typical for the QW to appear at the start of the clause, possibly leaving a gap in the normal position.",
		"   - \"Mark gave the cakes to Jimmy.\" → \"Who gave the cakes to Jimmy?\" → \"Who did Mark give the cakes to?\"",
		"- Many PV languages leave the QW in the \"normal\" position, such as Japanese and Tibetan.",
		"- Most PV languages can either leave the QW in position, or it can move to the front.",
		"- Some VP languages allow or require leaving the QW in position, such as Mandarin and many eastern African languages.",
		"- [newSection]QWs can usually take case markers and/or adpositions.",
		"- When the QW from an oblique clause is fronted, the adposition may or may not come with it.",
		"   - _What_ did you travel _with_?",
		"   - _With what_ did you travel?"
	],

	"How are information questions formed?": "How are information questions formed?",
	"9-3-2-Imperatives": "9.3.2. Imperatives",
	Imperatives: "Imperatives",
	"Command Sentences": "Command Sentences",

	info932: [
		"- Imperatives are direct commands to an addressee.",
		"- It is often not necessary to indicate the Agent (addressee), since the actor is obvious.",
		"- Fewer TAM constructs are typically allowed, since it is pragmatically impossible to perform certain actions (past tense, present progressive, etc).",
		"- Sometimes imperatives take special verb forms or affixes, as in Greenlandic Iñupiat, and/or special negation strategies.",
		"- [newSection]Imperatives are often associated with Irrealis modes (8.3.3)",
		"- [newSection]Sometimes imperatives affect case marking.",
		"   - Finnish puts the Patients of imperatives in nominative case instead of accusative case.",
		"- [newSection]Different types of imperatives may exist.",
		"   - In Panare, the suffix _-kë_ is for plain imperatives, while _-ta'_ is used for imperatives involving motion.",
		"- [newSection]First-person imperatives are rare. (e.g. \"Let's eat.\" vs \"Come eat with me.\")"
	],

	"How are imperatives formed? Are there \"polite\" imperatives that contrast with more direct imperatives?":
		"How are imperatives formed? Are there \"polite\" imperatives that contrast with more direct imperatives?",

	// PAGE TEN

	"10-Clause Combinations": "10. Clause Combinations",
	Terms: "Terms",
	"Quick Primer on Clauses": "Quick Primer on Clauses",

	info10: [
		"- An **Independent Clause** is one that is fully inflected and can stand on its own.",
		"- A **Dependent Clause** depends on some other clause for at least a part of its inflectional information.",
		"- [newSection]\"The gull beat its wings, achieving liftoff easily.\"",
		"   - _The gull beat its wings_ is Independent.",
		"   - _Achieving liftoff easily_ is Dependent.",
		"- [newSection]\"Breathing heavily, the runner crossed the finish line.\"",
		"   - _The runner crossed the finish line_ is Independent.",
		"   - _Breathing heavily_ is Dependent."
	],

	"10-1-Serial Verbs": "10.1. Serial Verbs",
	"Serial Verbs": "Serial Verbs",
	"Go Tap on This": "Go Tap on This",

	info101: [
		"- **Serial Verbs** are two or more verb roots that aren't compounded (8.2) or members of different clauses.",
		"- These occur in all sorts of languages, but may be more common in isolating languages (1.1).",
		"- English marginally employs serial verbs, e.g. \"Run go get me a coffee\" having three in a row.",
		"- [newSection]Typically, verbs in a series will each express a facet of one complex event.",
		"   - For example, the English word \"bring\" has a facet \"get something\" and another that's \"move towards place\". In a language like Yoruba, this is expressed with serial verbs:",
		"      - \"mo mú ìwé wá ilé\" / I take book come house - \"I brought a book home\"",
		"- [newSection]In general, serial verbs tend to follow these patterns:",
		"   - TAM information is carried by the first verb.",
		"      - However, some languages mandate that at least some inflectional information gets carried by the second verb.",
		"   - If a constituent of the second verb is clefted, it moves to the front of the entire construction.",
		"      - Youruba: \"ilé ni mo mú ìwé wá\" / house is I take book come - \"It was to the house that I brought a book\"",
		"   - They can get ambiguous out of context.",
		"      - Thai: \"John khàp rót chon kwaay taay\" / John drive car collide buffalo die",
		"      - The above means \"John drove the car into the buffalo and [any one of those three] died.\" Only context can make it clear that John, the buffalo or the car died.",
		"- [newSection]Verbs of motion are often used in serial constructions to express TAM information.",
		"   - \"Go\" is used in this way so much that it often becomes a marker for future tense, as in English and Spanish.",
		"      - \"I'm going to finish this sandwich.\"",
		"   - Tibetan uses motion verbs in serial to provide directional information for the other verb.",
		"- [newSection]Verbs in serial will sometimes turn into other role markers.",
		"   - Yoruba: \"give\" can mark a Recipient role.",
		"   - Efik: \"give\" has become a benefactive preposition.",
		"   - Sùpyìré: \"use\" has become a postpositional marker for an Instrumental role."
	],

	"Does the language have serial verbs? What verbs are more likely to appear in serial constructions? Are any on the way to becoming auxiliaries or adpositions?":
		"Does the language have serial verbs? What verbs are more likely to appear in serial constructions? Are any on the way to becoming auxiliaries or adpositions?",
	"10-2-Complement Clauses": "10.2. Complement Clauses",
	"Complement Clauses": "Complement Clauses",
	"Enter The Matrix": "Enter The Matrix",

	info102: [
		"- A **Complement Clause** (or Embedded Clause) functions as an argument to another clause.",
		"- A **Matrix Clause** (or Main Clause) has a Complement Clause as an argument.",
		"- [newSection]Complements can be in the Agent or Patient role. They are marked with [brackets] below:",
		"   - _Agent_: [That he survived] was unexpected.",
		"      - English typically postposes an Agent Complement Clause and uses a dummy \"It\": _[It] was unexpected [that he survived]._",
		"   - _Patient_: He wants [to have a drink].",
		"- A Matrix Clause can be a Complement Clause to another Matrix Clause:",
		"   - Mulder wants [to believe [that aliens are real]].",
		"- [newSection]Complement Clauses run in a continuum from **finite clauses** to **non-finite clauses**.",
		"   - _Finite_: [That he would be handsome] could not have been anticipated.",
		"      - The complement can stand alone as a complete sentence (minus the marker \"That\").",
		"      - It can have completely different TAM markers than the maxtrix clause.",
		"      - The matrix verb will likely be an utterance verb or a verb of cognition.",
		"   - _Non-finite_: It's very easy [to make a sandwich].",
		"      - The subject of the clause will almost always be the subject of the matrix clause.",
		"      - TAM markers are absent or highly constrained.",
		"      - The verb in the clause will likely be non-finite.",
		"- [newSection]**Indirect Questions** are a subset of Complement Clauses.",
		"   - Example: [Whether Mr. Wayne lied] is not relavant here.",
		"   - They may share formal properties with interrogative clauses and relative clauses."
	],
	"What kinds of complement clauses does the language have? Are certain complement types more common for certain classes of verbs? Does the language allow Agent complements, or just Patient complements?":
		"What kinds of complement clauses does the language have? Are certain complement types more common for certain classes of verbs? Does the language allow Agent complements, or just Patient complements?",
	"10-3-Adverbial Clauses": "10.3. Adverbial Clauses",
	"Adverbial Clauses": "Adverbial Clauses",
	"Tap This When You're Ready": "Tap This When You're Ready",

	info103: [
		"- Also called _Adjuncts_, **Adverbial Clauses** behave as adverbs.",
		"- They can convey certain kinds of information:",
		"   - _Time_:",
		"      - \"We will go [when he gets here].\"",
		"   - _Location_:",
		"      - \"I will meet you [where the old oak tree used to stand].\"",
		"   - _Manner_:",
		"      - \"He talks [like a 3-year-old].\"",
		"      - \"He walks [as a mummy would shamble].\"",
		"   - _Purpose_:",
		"      - \"He stands on tiptoes [in order to see better].\"",
		"   - _Reason_:",
		"      - \"He arrived early [because he wanted a good seat].\"",
		"   - _Circumstantial_ adverbial clauses are rare:",
		"      - \"He got into the army [by lying about his age].\"",
		"   - _Simultaneous_:",
		"      - \"He woke up [crying].\"",
		"      - \"She woke up [in a cold sweat]\".",
		"   - _Conditional_:",
		"      - \"[If it's raining outside], then my car is getting wet.\"",
		"   - _Negative Conditional_:",
		"      - \"[Unless it rains], we will be having a picnic.\"",
		"   - _Concessive Clause_:",
		"      - \"[Even though the band sucks], she agreed to go to the concert.\"",
		"   - _Substitutive_:",
		"      - \"[Instead of barbecuing chicken], we went out to eat.\"",
		"   - _Additive_:",
		"      - \"You must have your hand stamped [in addition to having your ticket].\"",
		"   - _Absolutive_:",
		"      - \"[Seeing a bully], Billy hid behind a curtain.\""
	],

	"How are adverbial clauses formed? What kinds are there? Can they occur in more than one place in a clause?":
		"How are adverbial clauses formed? What kinds are there? Can they occur in more than one place in a clause?",
	"10-4-Clause Chaining, Medial Clauses, and Switch References":
		"10-4-Clause Chaining, Medial Clauses, and Switch References",
	"Clause Chaining, Medial Clauses, and Switch References":
		"Clause Chaining, Medial Clauses, and Switch References",
	"Chain Chain Chain...": "Chain Chain Chain...",

	info104: [
		"- **Clause Chains** are clauses presented in series. They can form a large part of discourse in many languages, such as the ones of New Guinea, Australia, and the Americas.",
		"   - Typially, the last clause in the chain will have inflections for Tense and Aspect.",
		"   - Panare and a minority of languages switch this up, giving the inflections to the first clause.",
		"   - **Medial clauses** occur before the **Final clause**.",
		"      - They tend to have a reduce range of Tense/Aspect possibilities.",
		"      - Their subject is referenced in terms of subject of the final clause.",
		"      - Their placement represents temporal relations such as overlapping or in succession.",
		"- [newSection]**Switch References** are verbal inflections that indicate the subject of a verb is the same as the subject of another verb.",
		"   - Yuman uses _-k_ to indicate the next verb uses the same subject (SS) as this one, and _-m_ to indicate the next verb will have a different subject (DS).",
		"      - \"I sang and danced\" `[translation table] Nyaa '-ashvar-k '-iima-k / I 1-sing-SS 1-dance-ASPECT`",
		"      - \"Bonnie sang and I danced\" `[translation table] Bonnie-sh 0-ashvar-m '-iima-k / Bon&shy;nie-SUBJ 3-sing-DS 1-dance-ASPECT`",
		"   - [newSection]Ergative languages often have complex Switch Reference systems that indicate the temporal relations of the clauses, whether or not the verbs' subjects agree, and strongly indicate a reason why the clauses are linked.",
		"      - Panare: Suffix / Temporal / Agreement / Linkage   ",
		"         - -séjpe / succession / Actor = Actor / purpose",
		"         - -séñape / succession / Absolutive = Patient / result",
		"         - -ñére / succession / Actors are different / movement or purpose",
		"         - -npan / overlap / Actor = Actor / none",
		"         - -tááñe / overlap / Actor = Actor / none",
		"         - -jpómën / anteriority / Actor = Actor / reason"
	],

	checkboxInflectedClauses: {
		header: "Which Clause is Inflected?",
		rowLabels: ["First", "Last"]
	},
	checkboxInflectedClausesExport: {
		title: "Inflected Clause:"
	},
	checkboxMarkedElement: {
		header: "Which Element is Marked?",
		rowLabels: ["Noun", "Verb", "Conjunction"]
	},
	checkboxMarkedElementExport: {
		title: "Element Marked:"
	},
	checkboxMarkerInfo: {
		header: "What Other Information Does the Marker Encode?",
		rowLabels: ["Tense", "Aspect", "Person", "Number", "Other"]
	},
	checkboxMarkerInfoExport: {
		title: "Marker Encodes:"
	},
	"Is the coreference always the Subject, or can the Agent, Patient, or other nominals be referred to? Do the markers convey other information, like person, number, tense, aspect, and/or semantics? Can a clause be inflected for the person/number of another clause?":
		"Is the coreference always the Subject, or can the Agent, Patient, or other nominals be referred to? Do the markers convey other information, like person, number, tense, aspect, and/or semantics? Can a clause be inflected for the person/number of another clause?",
	"10-5-Relative Clauses": "10.5. Relative Clauses",
	"Relative Clauses": "Relative Clauses",
	"Clauses as Adjectives": "Clauses as Adjectives",

	info105: [
		"- A **Relative Clause** is a clause that functions as a nominal modifier. They can be identified by four points.",
		"   - Example: \"The fumes that made Chris faint.\"",
		"		1. _Head_: The noun phrase modified by the clause (fumes)",
		"		2. _Restricting Clause_: The relative clause itself (made Chris faint)",
		"		3. _Relativized Noun Phrase_: The part of the Restricting Clause that refers to the Head (English uses a Gap Strategy, explained below)",
		"		4. _Relativizer_: Morpheme or particle that sets off the relative clause (that)",
		"- [newSection]Relative Clauses (RCs) are usually positioned in the same place as other nominal modifiers, but there is a strong tendency towards placing them postnomial, even if other modifiers fall before the noun phrase.",
		"   - _Prenomial_: before the Head",
		"   - _Postnomial_: after the Head (most common, especially in VP languages)",
		"   - _Internally headed_: the Head is placed within the relative clause",
		"      - This is common in PV languages, such as Bambara: `[translation table] ne ye so ye / 1s PST horse see // \"I saw a horse\"` `[translation table] ce ye [ne ye so min ye] san / man PST 1s PST horse REL see buy // \"The man bought the horse that I saw\"`",
		"   - _Headless_: the clause itself refers to the Head",
		"      - This is common in languages that use nouns to modify other nouns, such as Ndjuká:",
		"         - Non-specific subject: `[translation table] [Di o doo fosi] o wini / REL FUT arrive first FUT win // \"Whoever arrives first will win\"`",
		"         - Specific subject: `[translation table] A mainsí ya a [di e tan a ini se] / the eel here COP REL CONT stay LOC in&shy;side sea // \"The eel is what (the one that) lives in the sea\"`",
		"      - But it can happen in other languages, such as English:",
		"         - Headless RC: [That which John said] annoyed her. (Something specific he said annoyed her)",
		"         - Complementary Clause: [That John said anything] annoyed her. (The action itself annoyed her)",
		"      - In many languages, headless construction is allowed when the head noun is nonspecific.",
		"         - [Whenever I'm afraid] I call her. (Refers to a time that is not specified otherwise)",
		"- [newSection]The Relativized Noun Phrase (RNP) can be expressed in different ways.",
		"   - **Gap Strategy**: the RNP is represented by a \"gap\" in the phrase, a missing space (0) where logically some argument would normally go.",
		"      - English uses this:",
		"         - Example: The man [that I loved 0] died.",
		"         - Full noun phrase: [I loved the man]",
		"      - This is a useful strategy when the semantic role of the Head is different in the RC:",
		"         - The alligator [that 0 saw me] ate Alice.",
		"         - The alligator [that I saw 0] ate Alice.",
		"      - However, this can become ambiguous if the constituent order changes often, or when the A and P are next to each other in normal discourse:",
		"         - Ithsmus Zapotee is a VAP language. `[translation table] junaa ni [najii 0__Juan] / junaa ni [najii Juan__0] / woman REL loves John // This could be either \"A woman that loves John\" (top) or \"A woman that Jon loves\".`",
		"   - **Pronoun Retention**: a pronoun is retained to indicate grammatical role.",
		"      - Typically, the pronoun is similar to other pronouns, either question words or pronouns used for non-specific, indefinite things.",
		"         - Example: That's the guy who [I can never remember _his_ name]",
		"   - [newSection]The Relativizer may be marked to show the NPR's role.",
		"      - Chickasaw: `[translation table] ihoo yamma-ay ofi' pĩs-tokat illi-tok / woman that-SUB dog see-PST:DEP:SS die-PST // \"The woman that saw the dog died\"` `[translation table] ihoo-at ofi' yamma pĩs-tokã illi-tok / woman-SUB dog that see-PST:DEP:DS die-PST // \"The woman that the dog saw died\"`",
		"- [newSection]Relativization Hierarchy:",
		"   - Subject",
		"   - Direct Object",
		"   - Indirect Object",
		"   - Oblique",
		"   - Possessor",
		"- No language (that uses the above grammatical roles) allows relativization of an element, using a single strategy, without also allowing relativizing of the elements above it in the hierarchy. Other elements may have other relativization strategies. For example, English uses the Gap Strategy down through the Obliques, but it doesn't apply to the Possessors:",
		"   - _Subject_: I hate the guy that [0 dumped her].",
		"   - _Direct Object_: I hate the guy that [she dated 0].",
		"   - _Indirect Object_: I hate the guy that [she gave her heart to 0].",
		"   - _Oblique_: I hate the guy that [she lived with 0].",
		"   - _Oblique_: I hate the guy that [she is older than 0].",
		"   - _Possessor_: ~~I hate the guy that [0 head is bald].~~",
		"      - This is not valid English. Another strategy has to be used: \"I hate the guy [whose head is bald].\""
	],

	checkboxRelative: {
		header: "Types of Relative Clauses",
		rowLabels: ["Prenomial", "Postnomial", "Internally Headed", "Headless"]
	},
	checkboxRelativeExport: {
		title: "Type of Relative Clauses:"
	},
	"Note what strategies are used in Relativizing Clauses, and where they fit on the hierarchy (if it applies).":
		"Note what strategies are used in Relativizing Clauses, and where they fit on the hierarchy (if it applies).",
	"10-6-Coordinating Clauses": "10.6. Coordinating Clauses",
	"Coordinating Clauses": "Coordinating Clauses",
	"This And That": "This And That",

	info106: [
		"- **Coordinating Clauses** are linked together, equal in grammatical status. They may be difficult to distinguish from juxtaposition.",
		"- They often use methods identical to those used to join noun phrases:",
		"   - John _and_ Mary",
		"   - John cried _and_ Mary laughed.",
		"- It's also common for special strategies to exist that do not work for noun phrases:",
		"   - John cried _but_ Mary laughed.",
		"- [newSection]CCs often express **Coordination** (x and y, neither x nor y), **Disjunction** (either x or y), and **Exclusion** (x and not y).",
		"- [newSection]The **Zero Strategy** looks just like juxtaposition. Vietnamese:",
		"   - _Noun Phrases_: `[translation table] Nháng tiráp [tilêt, callóh, acóq] / we pre&shy;pare bas&shy;ket spear knife // We prepared the basket, the spear and the knife.`",
		"   - _Prepositional Phrases_: `[translation table] Do chô [tôq cyâq, tôq apây] / she re&shy;turn to hus&shy;band to grand&shy;moth&shy;er // She returned to her husband and to her grandmother.`",
		"   - _Verb Phrases_: `[translation table] Do [chô tôq cayâq, chô tôq apây] / she re&shy;turn to hus&shy;band re&shy;turn to grand&shy;moth&shy;er // She returned to her husband and returned to her grandmother.`",
		"- [newSection]**Coordinating Conjunctions** (CCs) are a common strategy.",
		"   - The conjunction is often the same as \"with\". English uses \"and\" and \"but\", among others.",
		"   - In VP languages:",
		"      - The CC is usually between the two clauses:",
		"         - The dog growled _and_ the cat hissed.",
		"      - But sometimes, the CC comes after the first element of the second clause.",
		"         - Yoruba: `[translation table] mo mú ìwé; mo sì w's ilé / I take book I and come house // I took a book and I came home.`",
		"- In PV languages, the CC either comes between the two clauses (Farsi) or after the last element (Walapai)."
	],


	checkboxCoord: {
		header: "Coordinating Conjunction Positions",
		rowLabels: [
			"Between the clauses",
			"After the first element of the second clause",
			"After the last element"
		]
	},
	checkboxCoordExport: {
		title: "Coordinating Conjunction Positions:"
	},
	"Describe how Conjunction, Disjunction and Exclusion are expressed in the language.":
		"Describe how Conjunction, Disjunction and Exclusion are expressed in the language.",


};

export default ms;
