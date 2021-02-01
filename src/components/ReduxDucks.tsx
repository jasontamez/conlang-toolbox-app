import Presets from './Presets';

// constants (actions)
const p = "conlangs-toolbox/reducer/";
const ADD_CATEGORY = p+"ADD_CATEGORY";
const START_EDIT_CATEGORY = p+"START_EDIT_CATEGORY";
const CANCEL_EDIT_CATEGORY = p+"CANCEL_EDIT_CATEGORY";
const DO_EDIT_CATEGORY = p+"DO_EDIT_CATEGORY";
const DELETE_CATEGORY = p+"DELETE_CATEGORY";
const TOGGLE_SYLLABLES = p+"TOGGLE_SYLLABLES";
const EDIT_SYLLABLES = p+"EDIT_SYLLABLES";
const ADD_REWRITE_RULE = p+"ADD_REWRITE_RULE";
const START_EDIT_REWRITE_RULE = p+"START_EDIT_REWRITE_RULE";
const CANCEL_EDIT_REWRITE_RULE = p+"CANCEL_EDIT_REWRITE_RULE";
const DO_EDIT_REWRITE_RULE = p+"DO_EDIT_REWRITE_RULE";
const DELETE_REWRITE_RULE = p+"DELETE_REWRITE_RULE";
const REORDER_REWRITE_RULE = p+"REORDER_REWRITE_RULE";
const SET_MONO_RATE = p+"SET_MONO_RATE";
const SET_MAX_SYLLABLES = p+"SET_MAX_SYLLABLES";
const SET_CATEGORY_DROPOFF = p+"SET_CATEGORY_DROPOFF";
const SET_SYLLABLE_DROPOFF = p+"SET_SYLLABLE_DROPOFF";
const SET_OUTPUT = p+"SET_OUTPUT";
const SET_SYLLABLE_BREAKS = p+"SET_SYLLABLE_BREAKS";
const SET_NUMBER_OF_SENTENCES = p+"SET_NUMBER_OF_SENTENCES";
const SET_SENTENCE_CAPITALIZATION = p+"SET_SENTENCE_CAPITALIZATION";
const SET_DECLARATIVE_PRE = p+"SET_DECLARATIVE_PRE";
const SET_DECLARATIVE_POST = p+"SET_DECLARATIVE_POST";
const SET_INTERROGATIVE_PRE = p+"SET_INTERROGATIVE_PRE";
const SET_INTERROGATIVE_POST = p+"SET_INTERROGATIVE_POST";
const SET_EXCLAMATORY_PRE = p+"SET_EXCLAMATORY_PRE";
const SET_EXCLAMATORY_POST = p+"SET_EXCLAMATORY_POST";
const SET_WORD_CAPITALIZATION = p+"SET_WORD_CAPITALIZATION";
const SET_SORT_WORDLIST = p+"SET_SORT_WORDLIST";
const SET_WORDLIST_MULTICOLUMN = p+"SET_WORDLIST_MULTICOLUMN";
const SET_WORDS_PER_WORDLIST = p+"SET_WORDS_PER_WORDLIST";
const TOGGLE_MODAL = p+"TOGGLE_MODAL";
const TOGGLE_POPOVER = p+"TOGGLE_POPOVER";
const LOAD_PRESET = p+"LOAD_PRESET";
const CLEAR_EVERYTHING = p+"CLEAR_EVERYTHING";

// helper functions and such
export type Zero_OneHundred = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31 | 32 | 33 | 34 | 35 | 36 | 37 | 38 | 39 | 40 | 41 | 42 | 43 | 44 | 45 | 46 | 47 | 48 | 49 | 50 | 51 | 52 | 53 | 54 | 55 | 56 | 57 | 58 | 59 | 60 | 61 | 62 | 63 | 64 | 65 | 66 | 67 | 68 | 69 | 70 | 71 | 72 | 73 | 74 | 75 | 76 | 77 | 78 | 79 | 80 | 81 | 82 | 83 | 84 | 85 | 86 | 87 | 88 | 89 | 90 | 91 | 92 | 93 | 94 | 95 | 96 | 97 | 98 | 99 | 100;
export type Two_Fifteen = 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15;
export type Zero_Fifty = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31 | 32 | 33 | 34 | 35 | 36 | 37 | 38 | 39 | 40 | 41 | 42 | 43 | 44 | 45 | 46 | 47 | 48 | 49 | 50;
export type Five_OneHundred = 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31 | 32 | 33 | 34 | 35 | 36 | 37 | 38 | 39 | 40 | 41 | 42 | 43 | 44 | 45 | 46 | 47 | 48 | 49 | 50 | 51 | 52 | 53 | 54 | 55 | 56 | 57 | 58 | 59 | 60 | 61 | 62 | 63 | 64 | 65 | 66 | 67 | 68 | 69 | 70 | 71 | 72 | 73 | 74 | 75 | 76 | 77 | 78 | 79 | 80 | 81 | 82 | 83 | 84 | 85 | 86 | 87 | 88 | 89 | 90 | 91 | 92 | 93 | 94 | 95 | 96 | 97 | 98 | 99 | 100;
export type Fifty_OneThousand = 50 | 51 | 52 | 53 | 54 | 55 | 56 | 57 | 58 | 59 | 60 | 61 | 62 | 63 | 64 | 65 | 66 | 67 | 68 | 69 | 70 | 71 | 72 | 73 | 74 | 75 | 76 | 77 | 78 | 79 | 80 | 81 | 82 | 83 | 84 | 85 | 86 | 87 | 88 | 89 | 90 | 91 | 92 | 93 | 94 | 95 | 96 | 97 | 98 | 99 | 100 | 101 | 102 | 103 | 104 | 105 | 106 | 107 | 108 | 109 | 110 | 111 | 112 | 113 | 114 | 115 | 116 | 117 | 118 | 119 | 120 | 121 | 122 | 123 | 124 | 125 | 126 | 127 | 128 | 129 | 130 | 131 | 132 | 133 | 134 | 135 | 136 | 137 | 138 | 139 | 140 | 141 | 142 | 143 | 144 | 145 | 146 | 147 | 148 | 149 | 150 | 151 | 152 | 153 | 154 | 155 | 156 | 157 | 158 | 159 | 160 | 161 | 162 | 163 | 164 | 165 | 166 | 167 | 168 | 169 | 170 | 171 | 172 | 173 | 174 | 175 | 176 | 177 | 178 | 179 | 180 | 181 | 182 | 183 | 184 | 185 | 186 | 187 | 188 | 189 | 190 | 191 | 192 | 193 | 194 | 195 | 196 | 197 | 198 | 199 | 200 | 201 | 202 | 203 | 204 | 205 | 206 | 207 | 208 | 209 | 210 | 211 | 212 | 213 | 214 | 215 | 216 | 217 | 218 | 219 | 220 | 221 | 222 | 223 | 224 | 225 | 226 | 227 | 228 | 229 | 230 | 231 | 232 | 233 | 234 | 235 | 236 | 237 | 238 | 239 | 240 | 241 | 242 | 243 | 244 | 245 | 246 | 247 | 248 | 249 | 250 | 251 | 252 | 253 | 254 | 255 | 256 | 257 | 258 | 259 | 260 | 261 | 262 | 263 | 264 | 265 | 266 | 267 | 268 | 269 | 270 | 271 | 272 | 273 | 274 | 275 | 276 | 277 | 278 | 279 | 280 | 281 | 282 | 283 | 284 | 285 | 286 | 287 | 288 | 289 | 290 | 291 | 292 | 293 | 294 | 295 | 296 | 297 | 298 | 299 | 300 | 301 | 302 | 303 | 304 | 305 | 306 | 307 | 308 | 309 | 310 | 311 | 312 | 313 | 314 | 315 | 316 | 317 | 318 | 319 | 320 | 321 | 322 | 323 | 324 | 325 | 326 | 327 | 328 | 329 | 330 | 331 | 332 | 333 | 334 | 335 | 336 | 337 | 338 | 339 | 340 | 341 | 342 | 343 | 344 | 345 | 346 | 347 | 348 | 349 | 350 | 351 | 352 | 353 | 354 | 355 | 356 | 357 | 358 | 359 | 360 | 361 | 362 | 363 | 364 | 365 | 366 | 367 | 368 | 369 | 370 | 371 | 372 | 373 | 374 | 375 | 376 | 377 | 378 | 379 | 380 | 381 | 382 | 383 | 384 | 385 | 386 | 387 | 388 | 389 | 390 | 391 | 392 | 393 | 394 | 395 | 396 | 397 | 398 | 399 | 400 | 401 | 402 | 403 | 404 | 405 | 406 | 407 | 408 | 409 | 410 | 411 | 412 | 413 | 414 | 415 | 416 | 417 | 418 | 419 | 420 | 421 | 422 | 423 | 424 | 425 | 426 | 427 | 428 | 429 | 430 | 431 | 432 | 433 | 434 | 435 | 436 | 437 | 438 | 439 | 440 | 441 | 442 | 443 | 444 | 445 | 446 | 447 | 448 | 449 | 450 | 451 | 452 | 453 | 454 | 455 | 456 | 457 | 458 | 459 | 460 | 461 | 462 | 463 | 464 | 465 | 466 | 467 | 468 | 469 | 470 | 471 | 472 | 473 | 474 | 475 | 476 | 477 | 478 | 479 | 480 | 481 | 482 | 483 | 484 | 485 | 486 | 487 | 488 | 489 | 490 | 491 | 492 | 493 | 494 | 495 | 496 | 497 | 498 | 499 | 500 | 501 | 502 | 503 | 504 | 505 | 506 | 507 | 508 | 509 | 510 | 511 | 512 | 513 | 514 | 515 | 516 | 517 | 518 | 519 | 520 | 521 | 522 | 523 | 524 | 525 | 526 | 527 | 528 | 529 | 530 | 531 | 532 | 533 | 534 | 535 | 536 | 537 | 538 | 539 | 540 | 541 | 542 | 543 | 544 | 545 | 546 | 547 | 548 | 549 | 550 | 551 | 552 | 553 | 554 | 555 | 556 | 557 | 558 | 559 | 560 | 561 | 562 | 563 | 564 | 565 | 566 | 567 | 568 | 569 | 570 | 571 | 572 | 573 | 574 | 575 | 576 | 577 | 578 | 579 | 580 | 581 | 582 | 583 | 584 | 585 | 586 | 587 | 588 | 589 | 590 | 591 | 592 | 593 | 594 | 595 | 596 | 597 | 598 | 599 | 600 | 601 | 602 | 603 | 604 | 605 | 606 | 607 | 608 | 609 | 610 | 611 | 612 | 613 | 614 | 615 | 616 | 617 | 618 | 619 | 620 | 621 | 622 | 623 | 624 | 625 | 626 | 627 | 628 | 629 | 630 | 631 | 632 | 633 | 634 | 635 | 636 | 637 | 638 | 639 | 640 | 641 | 642 | 643 | 644 | 645 | 646 | 647 | 648 | 649 | 650 | 651 | 652 | 653 | 654 | 655 | 656 | 657 | 658 | 659 | 660 | 661 | 662 | 663 | 664 | 665 | 666 | 667 | 668 | 669 | 670 | 671 | 672 | 673 | 674 | 675 | 676 | 677 | 678 | 679 | 680 | 681 | 682 | 683 | 684 | 685 | 686 | 687 | 688 | 689 | 690 | 691 | 692 | 693 | 694 | 695 | 696 | 697 | 698 | 699 | 700 | 701 | 702 | 703 | 704 | 705 | 706 | 707 | 708 | 709 | 710 | 711 | 712 | 713 | 714 | 715 | 716 | 717 | 718 | 719 | 720 | 721 | 722 | 723 | 724 | 725 | 726 | 727 | 728 | 729 | 730 | 731 | 732 | 733 | 734 | 735 | 736 | 737 | 738 | 739 | 740 | 741 | 742 | 743 | 744 | 745 | 746 | 747 | 748 | 749 | 750 | 751 | 752 | 753 | 754 | 755 | 756 | 757 | 758 | 759 | 760 | 761 | 762 | 763 | 764 | 765 | 766 | 767 | 768 | 769 | 770 | 771 | 772 | 773 | 774 | 775 | 776 | 777 | 778 | 779 | 780 | 781 | 782 | 783 | 784 | 785 | 786 | 787 | 788 | 789 | 790 | 791 | 792 | 793 | 794 | 795 | 796 | 797 | 798 | 799 | 800 | 801 | 802 | 803 | 804 | 805 | 806 | 807 | 808 | 809 | 810 | 811 | 812 | 813 | 814 | 815 | 816 | 817 | 818 | 819 | 820 | 821 | 822 | 823 | 824 | 825 | 826 | 827 | 828 | 829 | 830 | 831 | 832 | 833 | 834 | 835 | 836 | 837 | 838 | 839 | 840 | 841 | 842 | 843 | 844 | 845 | 846 | 847 | 848 | 849 | 850 | 851 | 852 | 853 | 854 | 855 | 856 | 857 | 858 | 859 | 860 | 861 | 862 | 863 | 864 | 865 | 866 | 867 | 868 | 869 | 870 | 871 | 872 | 873 | 874 | 875 | 876 | 877 | 878 | 879 | 880 | 881 | 882 | 883 | 884 | 885 | 886 | 887 | 888 | 889 | 890 | 891 | 892 | 893 | 894 | 895 | 896 | 897 | 898 | 899 | 900 | 901 | 902 | 903 | 904 | 905 | 906 | 907 | 908 | 909 | 910 | 911 | 912 | 913 | 914 | 915 | 916 | 917 | 918 | 919 | 920 | 921 | 922 | 923 | 924 | 925 | 926 | 927 | 928 | 929 | 930 | 931 | 932 | 933 | 934 | 935 | 936 | 937 | 938 | 939 | 940 | 941 | 942 | 943 | 944 | 945 | 946 | 947 | 948 | 949 | 950 | 951 | 952 | 953 | 954 | 955 | 956 | 957 | 958 | 959 | 960 | 961 | 962 | 963 | 964 | 965 | 966 | 967 | 968 | 969 | 970 | 971 | 972 | 973 | 974 | 975 | 976 | 977 | 978 | 979 | 980 | 981 | 982 | 983 | 984 | 985 | 986 | 987 | 988 | 989 | 990 | 991 | 992 | 993 | 994 | 995 | 996 | 997 | 998 | 999 | 1000;
export type OutputTypes = "text" | "wordlist" | "syllables";
type Preset = {
	categories: WGCategoryStateObject
	syllables: WGSyllableStateObject
	rewriteRules: WGRewriteRuleStateObject
	wordgenSettings: WGSettingsObject
};
export type PresetObject = Map<string, Preset>;
export type CategoryMap = [string, WGCategoryObject];

export interface WGCategoryObject {
	title: string
	label?: string
	run: string
	dropoffOverride?: Zero_OneHundred
	rateOverride?: Zero_OneHundred[]
}
// id: unique id
// title: short description
// label: 1 letter
// run: letters in this category
// dropoffOverride: optional percentage that a given letter will be chosen
// rateOverride: optional list of percentages for each letter

interface WGCategoryStateObject {
	map: CategoryMap[]
	editing: null | string
}

interface WGSyllableObject {
	components: string[]
	rateOverride?: Zero_OneHundred[]
}

export interface WGSyllableStateObject {
	toggle: boolean
	objects: {
		singleWord: WGSyllableObject
		wordInitial: WGSyllableObject
		wordMiddle: WGSyllableObject
		wordFinal: WGSyllableObject
	}
}

export interface WGRewriteRuleObject {
	key: string
	seek: string
	replace: string
	description: string
	regex: RegExp
}

interface WGRewriteRuleStateObject {
	list: WGRewriteRuleObject[]
	editing: null | string
}

interface WGSettingsObject {
	monosyllablesRate: Zero_OneHundred
	maxSyllablesPerWord: Two_Fifteen
	categoryRunDropoff: Zero_Fifty
	syllableBoxDropoff: Zero_Fifty
	output?: OutputTypes
	showSyllableBreaks?: boolean
	sentencesPerText?: Five_OneHundred
	capitalizeSentences: boolean
	declarativeSentencePre: string
	declarativeSentencePost: string
	interrogativeSentencePre: string
	interrogativeSentencePost: string
	exclamatorySentencePre: string
	exclamatorySentencePost: string
	capitalizeWords?: boolean
	sortWordlist?: boolean
	wordlistMultiColumn?: boolean
	wordsPerWordlist?: Fifty_OneThousand
}

interface ModalStateObject {
	AddCategory: boolean
	EditCategory: boolean
	AddRewriteRule: boolean
	EditRewriteRule: boolean
	PresetPopup: boolean
}

interface PopoverStateObject {
	event: any
	flag: boolean
}

interface StateObject {
	categories: WGCategoryStateObject
	syllables: WGSyllableStateObject
	rewriteRules: WGRewriteRuleStateObject
	wordgenSettings: WGSettingsObject
	modalState: ModalStateObject
	popoverState: PopoverStateObject
}

const simple: Preset = Presets.get("Simple")!;
const initialState: StateObject = {
	categories: simple.categories,
	syllables: simple.syllables,
	rewriteRules: simple.rewriteRules,
	wordgenSettings: {
		...simple.wordgenSettings,
		output: "text",
		showSyllableBreaks: false,
		sentencesPerText: 30,
		capitalizeWords: false,
		sortWordlist: true,
		wordlistMultiColumn: true,
		wordsPerWordlist: 250
	},
	modalState: {
		AddCategory: false,
		EditCategory: false,
		AddRewriteRule: false,
		EditRewriteRule: false,
		PresetPopup: false
	},
	popoverState: {
		flag: false,
		event: undefined
	}
};

interface ReduxAction {
	type: string,
	payload?: any
}

const reduceCategory = (original: WGCategoryStateObject, newMap: CategoryMap[]= original.map) => {
	let map: CategoryMap[] = [];
	if(newMap === original.map) {
		newMap.forEach(item => {
			let o: WGCategoryObject = {...item[1]};
			if(o.rateOverride) {
				o.rateOverride = [...o.rateOverride];
			}
			map.push([item[0], o]);
		});
	} else {
		map = newMap;
	}
	return {
		map: map,
		editing: original.editing
	};
};
const reduceSyllables = (original: WGSyllableStateObject) => {
	const oo = original.objects;
	return {
		toggle: original.toggle,
		objects: {
			singleWord: reduceSubSyllables(oo.singleWord),
			wordInitial: reduceSubSyllables(oo.wordInitial),
			wordMiddle: reduceSubSyllables(oo.wordMiddle),
			wordFinal: reduceSubSyllables(oo.wordFinal)
		}
	};
};
const reduceSubSyllables = (original: WGSyllableObject) => {
	let o: WGSyllableObject = {
		components: [...original.components]
	}
	if(original.rateOverride) {
		o.rateOverride = [...original.rateOverride];
	}
	return o;
};
const reduceRewriteRulesState = (original: WGRewriteRuleStateObject, mod: string = "", rule: any = null) => {
	// mod = 'add' -> add new rule (object)
	// mod = 'del' -> delete rule (key)
	// mod = 'edit' -> replace rule (object)
	// mod = '' -> do nothing
	let list;
	switch (mod) {
		case 'add':
			list = original.list.map(rr => reduceRewriteRules(rr));
			list.push(rule);
			break;
		case 'del':
			list = original.list.filter(rr => rr.key !== rule).map(rr => reduceRewriteRules(rr));
			break;
		case 'edit':
			list = original.list.map(rr => rr.key === rule.key ? rule : reduceRewriteRules(rr));
			break;
		default:
			list = original.list.map(rr => reduceRewriteRules(rr));
	}
	return {
		list: list,
		editing: original.editing
	};
};
const reduceRewriteRules = (original: WGRewriteRuleObject) => {
	return {
		...original
	};
};
const reduceModalState = (original: ModalStateObject) => {
	return {...original};
};
const reducePopoverState = (original: PopoverStateObject) => {
	return {...original};
};


// reducer
export function reducer(state = initialState, action: ReduxAction) {
	const payload = action.payload;
	let CO: WGCategoryStateObject;
	let Cmap: CategoryMap[] = [];
	let newCategories: WGCategoryStateObject;
	let SO: WGSyllableStateObject;
	let RO: WGRewriteRuleStateObject;
	switch(action.type) {
		// Category
		case ADD_CATEGORY:
			CO = state.categories;
			Cmap = CO.map.map((item: CategoryMap) => [item[0], item[1]]);
			let label = payload.label;
			delete payload.label;
			Cmap.push([label, payload]);
			newCategories = reduceCategory(CO, Cmap);
			// make new object, copy props from state, overwrite prop(s) with new object with new payload
			return {
				...state,
				categories: newCategories,
				syllables: reduceSyllables(state.syllables),
				rewriteRules: reduceRewriteRulesState(state.rewriteRules),
				wordgenSettings: { ...state.wordgenSettings },
				modalState: reduceModalState(state.modalState),
				popoverState: reducePopoverState(state.popoverState)
			};
		case START_EDIT_CATEGORY:
			CO = state.categories;
			newCategories = reduceCategory(CO);
			newCategories.editing = payload;
			return {
				...state,
				categories: newCategories,
				syllables: reduceSyllables(state.syllables),
				rewriteRules: reduceRewriteRulesState(state.rewriteRules),
				wordgenSettings: { ...state.wordgenSettings },
				modalState: reduceModalState(state.modalState),
				popoverState: reducePopoverState(state.popoverState)
			};
		case DO_EDIT_CATEGORY:
			CO = state.categories;
			Cmap = CO.map.map(item => {
				let [label, cat] = item;
				if(label === CO.editing) {
					delete payload.label;
					return [label, payload];
				}
				return[label, cat];
			});
			newCategories = reduceCategory(CO, Cmap);
			return {
				...state,
				categories: newCategories,
				syllables: reduceSyllables(state.syllables),
				rewriteRules: reduceRewriteRulesState(state.rewriteRules),
				wordgenSettings: { ...state.wordgenSettings },
				modalState: reduceModalState(state.modalState),
				popoverState: reducePopoverState(state.popoverState)
			};
		case CANCEL_EDIT_CATEGORY:
			CO = state.categories;
			newCategories = reduceCategory(CO);
			newCategories.editing = null;
			return {
				...state,
				categories: newCategories,
				syllables: reduceSyllables(state.syllables),
				rewriteRules: reduceRewriteRulesState(state.rewriteRules),
				wordgenSettings: { ...state.wordgenSettings },
				modalState: reduceModalState(state.modalState),
				popoverState: reducePopoverState(state.popoverState)
			};
		case DELETE_CATEGORY:
			CO = state.categories;
			Cmap = CO.map.map((item: CategoryMap) => [item[0], item[1]]);
			Cmap = CO.map.filter((item: CategoryMap) => item[0] !== payload).map((item: CategoryMap) => [item[0], item[1]]);
			newCategories = reduceCategory(CO, Cmap);
			return {
				...state,
				categories: newCategories,
				syllables: reduceSyllables(state.syllables),
				rewriteRules: reduceRewriteRulesState(state.rewriteRules),
				wordgenSettings: { ...state.wordgenSettings },
				modalState: reduceModalState(state.modalState),
				popoverState: reducePopoverState(state.popoverState)
			};
		// Syllables
		case TOGGLE_SYLLABLES:
			SO = reduceSyllables(state.syllables);
			SO.toggle = !SO.toggle;
			return {
				...state,
				syllables: SO,
				categories: reduceCategory(state.categories),
				rewriteRules: reduceRewriteRulesState(state.rewriteRules),
				wordgenSettings: { ...state.wordgenSettings },
				modalState: reduceModalState(state.modalState),
				popoverState: reducePopoverState(state.popoverState)
			};
		case EDIT_SYLLABLES:
			SO = reduceSyllables(state.syllables);
			SO.objects[payload.key as keyof WGSyllableStateObject["objects"]].components = payload.syllables;
			return {
				...state,
				syllables: SO,
				categories: reduceCategory(state.categories),
				rewriteRules: reduceRewriteRulesState(state.rewriteRules),
				wordgenSettings: { ...state.wordgenSettings },
				modalState: reduceModalState(state.modalState),
				popoverState: reducePopoverState(state.popoverState)
			};
		// Rewrite Rules
		case ADD_REWRITE_RULE:
			RO = reduceRewriteRulesState(state.rewriteRules, 'add', payload);
			return {
				...state,
				categories: reduceCategory(state.categories),
				syllables: reduceSyllables(state.syllables),
				rewriteRules: RO,
				wordgenSettings: { ...state.wordgenSettings },
				modalState: reduceModalState(state.modalState),
				popoverState: reducePopoverState(state.popoverState)
			};
		case START_EDIT_REWRITE_RULE:
			RO = reduceRewriteRulesState(state.rewriteRules);
			RO.editing = payload;
			return {
				...state,
				categories: reduceCategory(state.categories),
				syllables: reduceSyllables(state.syllables),
				rewriteRules: RO,
				wordgenSettings: { ...state.wordgenSettings },
				modalState: reduceModalState(state.modalState),
				popoverState: reducePopoverState(state.popoverState)
			};
		case DO_EDIT_REWRITE_RULE:
			RO = reduceRewriteRulesState(state.rewriteRules, 'edit', payload);
			return {
				...state,
				categories: reduceCategory(state.categories),
				syllables: reduceSyllables(state.syllables),
				rewriteRules: RO,
				wordgenSettings: { ...state.wordgenSettings },
				modalState: reduceModalState(state.modalState),
				popoverState: reducePopoverState(state.popoverState)
			};
		case CANCEL_EDIT_REWRITE_RULE:
			RO = reduceRewriteRulesState(state.rewriteRules);
			RO.editing = null;
			return {
				...state,
				categories: reduceCategory(state.categories),
				syllables: reduceSyllables(state.syllables),
				rewriteRules: RO,
				wordgenSettings: { ...state.wordgenSettings },
				modalState: reduceModalState(state.modalState),
				popoverState: reducePopoverState(state.popoverState)
			};
		case DELETE_REWRITE_RULE:
			RO = reduceRewriteRulesState(state.rewriteRules, 'del', payload);
			return {
				...state,
				categories: reduceCategory(state.categories),
				syllables: reduceSyllables(state.syllables),
				rewriteRules: RO,
				wordgenSettings: { ...state.wordgenSettings },
				modalState: reduceModalState(state.modalState),
				popoverState: reducePopoverState(state.popoverState)
			};
		case REORDER_REWRITE_RULE:
			let SRR = state.rewriteRules;
			let map = new Map(SRR.list.map(rr => [rr.key, rr]));
			RO = {
				list: payload.map((key: string) => map.get(key)),
				editing: SRR.editing
			};
			return {
				...state,
				categories: reduceCategory(state.categories),
				syllables: reduceSyllables(state.syllables),
				rewriteRules: RO,
				wordgenSettings: { ...state.wordgenSettings },
				modalState: reduceModalState(state.modalState),
				popoverState: reducePopoverState(state.popoverState)
			};
		// Wordgen Settings
		case SET_MONO_RATE:
			return {
				...state,
				categories: reduceCategory(state.categories),
				syllables: reduceSyllables(state.syllables),
				rewriteRules: reduceRewriteRulesState(state.rewriteRules),
				wordgenSettings: {
					...state.wordgenSettings,
					monosyllablesRate: payload
				},
				modalState: reduceModalState(state.modalState),
				popoverState: reducePopoverState(state.popoverState)
			};
		case SET_MAX_SYLLABLES:
			return {
				...state,
				categories: reduceCategory(state.categories),
				syllables: reduceSyllables(state.syllables),
				rewriteRules: reduceRewriteRulesState(state.rewriteRules),
				wordgenSettings: {
					...state.wordgenSettings,
					maxSyllablesPerWord: payload
				},
				modalState: reduceModalState(state.modalState),
				popoverState: reducePopoverState(state.popoverState)
			};
		case SET_CATEGORY_DROPOFF:
			return {
				...state,
				categories: reduceCategory(state.categories),
				syllables: reduceSyllables(state.syllables),
				rewriteRules: reduceRewriteRulesState(state.rewriteRules),
				wordgenSettings: {
					...state.wordgenSettings,
					categoryRunDropoff: payload
				},
				modalState: reduceModalState(state.modalState),
				popoverState: reducePopoverState(state.popoverState)
			};
		case SET_SYLLABLE_DROPOFF:
			return {
				...state,
				categories: reduceCategory(state.categories),
				syllables: reduceSyllables(state.syllables),
				rewriteRules: reduceRewriteRulesState(state.rewriteRules),
				wordgenSettings: {
					...state.wordgenSettings,
					syllableBoxDropoff: payload
				},
				modalState: reduceModalState(state.modalState),
				popoverState: reducePopoverState(state.popoverState)
			};
		case SET_OUTPUT:
			return {
				...state,
				categories: reduceCategory(state.categories),
				syllables: reduceSyllables(state.syllables),
				rewriteRules: reduceRewriteRulesState(state.rewriteRules),
				wordgenSettings: {
					...state.wordgenSettings,
					output: payload
				},
				modalState: reduceModalState(state.modalState),
				popoverState: reducePopoverState(state.popoverState)
			};
		case SET_SYLLABLE_BREAKS:
			return {
				...state,
				categories: reduceCategory(state.categories),
				syllables: reduceSyllables(state.syllables),
				rewriteRules: reduceRewriteRulesState(state.rewriteRules),
				wordgenSettings: {
					...state.wordgenSettings,
					showSyllableBreaks: payload
				},
				modalState: reduceModalState(state.modalState),
				popoverState: reducePopoverState(state.popoverState)
			};
		case SET_NUMBER_OF_SENTENCES:
			return {
				...state,
				categories: reduceCategory(state.categories),
				syllables: reduceSyllables(state.syllables),
				rewriteRules: reduceRewriteRulesState(state.rewriteRules),
				wordgenSettings: {
					...state.wordgenSettings,
					sentencesPerText: payload
				},
				modalState: reduceModalState(state.modalState),
				popoverState: reducePopoverState(state.popoverState)
			};
		case SET_SENTENCE_CAPITALIZATION:
			return {
				...state,
				categories: reduceCategory(state.categories),
				syllables: reduceSyllables(state.syllables),
				rewriteRules: reduceRewriteRulesState(state.rewriteRules),
				wordgenSettings: {
					...state.wordgenSettings,
					capitalizeSentences: payload
				},
				modalState: reduceModalState(state.modalState),
				popoverState: reducePopoverState(state.popoverState)
			};
		case SET_DECLARATIVE_PRE:
			return {
				...state,
				categories: reduceCategory(state.categories),
				syllables: reduceSyllables(state.syllables),
				rewriteRules: reduceRewriteRulesState(state.rewriteRules),
				wordgenSettings: {
					...state.wordgenSettings,
					declarativeSentencePre: payload
				},
				modalState: reduceModalState(state.modalState),
				popoverState: reducePopoverState(state.popoverState)
			};
		case SET_DECLARATIVE_POST:
			return {
				...state,
				categories: reduceCategory(state.categories),
				syllables: reduceSyllables(state.syllables),
				rewriteRules: reduceRewriteRulesState(state.rewriteRules),
				wordgenSettings: {
					...state.wordgenSettings,
					declarativeSentencePost: payload
				},
				modalState: reduceModalState(state.modalState),
				popoverState: reducePopoverState(state.popoverState)
			};
		case SET_INTERROGATIVE_PRE:
			return {
				...state,
				categories: reduceCategory(state.categories),
				syllables: reduceSyllables(state.syllables),
				rewriteRules: reduceRewriteRulesState(state.rewriteRules),
				wordgenSettings: {
					...state.wordgenSettings,
					interrogativeSentencePre: payload
				},
				modalState: reduceModalState(state.modalState),
				popoverState: reducePopoverState(state.popoverState)
			};
		case SET_INTERROGATIVE_POST:
			return {
				...state,
				categories: reduceCategory(state.categories),
				syllables: reduceSyllables(state.syllables),
				rewriteRules: reduceRewriteRulesState(state.rewriteRules),
				wordgenSettings: {
					...state.wordgenSettings,
					interrogativeSentencePost: payload
				},
				modalState: reduceModalState(state.modalState),
				popoverState: reducePopoverState(state.popoverState)
			};
		case SET_EXCLAMATORY_PRE:
			return {
				...state,
				categories: reduceCategory(state.categories),
				syllables: reduceSyllables(state.syllables),
				rewriteRules: reduceRewriteRulesState(state.rewriteRules),
				wordgenSettings: {
					...state.wordgenSettings,
					exclamatorySentencePre: payload
				},
				modalState: reduceModalState(state.modalState),
				popoverState: reducePopoverState(state.popoverState)
			};
		case SET_EXCLAMATORY_POST:
			return {
				...state,
				categories: reduceCategory(state.categories),
				syllables: reduceSyllables(state.syllables),
				rewriteRules: reduceRewriteRulesState(state.rewriteRules),
				wordgenSettings: {
					...state.wordgenSettings,
					exclamatorySentencePost: payload
				},
				modalState: reduceModalState(state.modalState),
				popoverState: reducePopoverState(state.popoverState)
			};
		case SET_WORD_CAPITALIZATION:
			return {
				...state,
				categories: reduceCategory(state.categories),
				syllables: reduceSyllables(state.syllables),
				rewriteRules: reduceRewriteRulesState(state.rewriteRules),
				wordgenSettings: {
					...state.wordgenSettings,
					capitalizeWords: payload
				},
				modalState: reduceModalState(state.modalState),
				popoverState: reducePopoverState(state.popoverState)
			};
		case SET_SORT_WORDLIST:
			return {
				...state,
				categories: reduceCategory(state.categories),
				syllables: reduceSyllables(state.syllables),
				rewriteRules: reduceRewriteRulesState(state.rewriteRules),
				wordgenSettings: {
					...state.wordgenSettings,
					sortWordlist: payload
				},
				modalState: reduceModalState(state.modalState),
				popoverState: reducePopoverState(state.popoverState)
			};
		case SET_WORDLIST_MULTICOLUMN:
			return {
				...state,
				categories: reduceCategory(state.categories),
				syllables: reduceSyllables(state.syllables),
				rewriteRules: reduceRewriteRulesState(state.rewriteRules),
				wordgenSettings: {
					...state.wordgenSettings,
					wordlistMultiColumn: payload
				},
				modalState: reduceModalState(state.modalState),
				popoverState: reducePopoverState(state.popoverState)
			};
		case SET_WORDS_PER_WORDLIST:
			return {
				...state,
				categories: reduceCategory(state.categories),
				syllables: reduceSyllables(state.syllables),
				rewriteRules: reduceRewriteRulesState(state.rewriteRules),
				wordgenSettings: {
					...state.wordgenSettings,
					wordsPerWordlist: payload
				},
				modalState: reduceModalState(state.modalState),
				popoverState: reducePopoverState(state.popoverState)
			};
		// Modals
		case TOGGLE_MODAL:
			let newModal: ModalStateObject = reduceModalState(state.modalState);
			newModal[payload.modal as keyof ModalStateObject] = payload.flag;
			return {
				...state,
				categories: reduceCategory(state.categories),
				syllables: reduceSyllables(state.syllables),
				rewriteRules: reduceRewriteRulesState(state.rewriteRules),
				wordgenSettings: { ...state.wordgenSettings },
				modalState: newModal,
				popoverState: reducePopoverState(state.popoverState)
			};
		case TOGGLE_POPOVER:
			let newPopover: PopoverStateObject = reducePopoverState(state.popoverState);
			newPopover.flag = payload.flag;
			newPopover.event = payload.event;
			return {
				...state,
				categories: reduceCategory(state.categories),
				syllables: reduceSyllables(state.syllables),
				rewriteRules: reduceRewriteRulesState(state.rewriteRules),
				wordgenSettings: { ...state.wordgenSettings },
				modalState: reduceModalState(state.modalState),
				popoverState: newPopover
			};
		// Presets
		case LOAD_PRESET:
			let newInfo: any = Presets.get(payload);
			return {
				...state,
				categories: reduceCategory(newInfo.categories),
				syllables: reduceSyllables(newInfo.syllables),
				rewriteRules: reduceRewriteRulesState(newInfo.rewriteRules),
				wordgenSettings: {
					...state.wordgenSettings,
					...newInfo.wordgenSettings
				},
				modalState: reduceModalState(state.modalState),
				popoverState: reducePopoverState(state.popoverState)
			};
		case CLEAR_EVERYTHING:
			return {
				...state,
				categories: {
					map: [],
					editing: null
				},
				syllables: {
					toggle: false,
					objects: {
						singleWord: { components: [] },
						wordInitial: { components: [] },
						wordMiddle: { components: [] },
						wordFinal: { components: [] }
					}
				},
				rewriteRules: {
					list: [],
					editing: null
				},
				wordgenSettings: { ...state.wordgenSettings },
				modalState: reduceModalState(state.modalState),
				popoverState: reducePopoverState(state.popoverState)
			};
	}
	return state;
};


// action creators
//
// Category
export function addCategory(payload: WGCategoryObject) {
	return {type: ADD_CATEGORY, payload};
}
export function startEditCategory(payload: WGCategoryObject) {
	return {type: START_EDIT_CATEGORY, payload};
}
export function cancelEditCategory(payload: WGCategoryObject) {
	return {type: CANCEL_EDIT_CATEGORY, payload};
}
export function doEditCategory(payload: WGCategoryObject) {
	return {type: DO_EDIT_CATEGORY, payload};
}
export function deleteCategory(payload: WGCategoryObject) {
	return {type: DELETE_CATEGORY, payload};
}
// Syllables
export function toggleSyllables() {
	return {type: TOGGLE_SYLLABLES, payload: null}
}
export function editSyllables(payload1: keyof WGSyllableStateObject["objects"], payload2: string[]) {
	return {type: EDIT_SYLLABLES, payload: {key: payload1, syllables: payload2}};
}
// Rewrite Rules
export function addRewriteRule(payload: WGRewriteRuleObject) {
	return {type: ADD_REWRITE_RULE, payload};
}
export function startEditRewriteRule(payload: WGRewriteRuleObject) {
	return {type: START_EDIT_REWRITE_RULE, payload};
}
export function cancelEditRewriteRule(payload: WGRewriteRuleObject) {
	return {type: CANCEL_EDIT_REWRITE_RULE, payload};
}
export function doEditRewriteRule(payload: WGRewriteRuleObject) {
	return {type: DO_EDIT_REWRITE_RULE, payload};
}
export function deleteRewriteRule(payload: WGRewriteRuleObject) {
	return {type: DELETE_REWRITE_RULE, payload};
}
export function reorderRewriteRules(payload: WGRewriteRuleObject["key"][]) {
	return {type: REORDER_REWRITE_RULE, payload};
}
// Wordgen Settings
export function setMonoRate(payload: Zero_OneHundred) {
	return {type: SET_MONO_RATE, payload};
}
export function setMaxSyllables(payload: Two_Fifteen) {
	return {type: SET_MAX_SYLLABLES, payload};
}
export function setCategoryDropoff(payload: Zero_Fifty) {
	return {type: SET_CATEGORY_DROPOFF, payload};
}
export function setSyllableDropoff(payload: Zero_Fifty) {
	return {type: SET_SYLLABLE_DROPOFF, payload};
}
export function setOutputType(payload: OutputTypes) {
	return {type: SET_OUTPUT, payload};
}
export function setSyllableBreaks(payload: boolean) {
	return {type: SET_SYLLABLE_BREAKS, payload};
}
export function setSentencesPerText(payload: Five_OneHundred) {
	return {type: SET_NUMBER_OF_SENTENCES, payload};
}
export function setCapitalizeSentences(payload: boolean) {
	return {type: SET_SENTENCE_CAPITALIZATION, payload};
}
export function setDeclarativePre(payload: string) {
	return {type: SET_DECLARATIVE_PRE, payload};
}
export function setDeclarativePost(payload: string) {
	return {type: SET_DECLARATIVE_POST, payload};
}
export function setInterrogativePre(payload: string) {
	return {type: SET_INTERROGATIVE_PRE, payload};
}
export function setInterrogativePost(payload: string) {
	return {type: SET_INTERROGATIVE_POST, payload};
}
export function setExclamatoryPre(payload: string) {
	return {type: SET_EXCLAMATORY_PRE, payload};
}
export function setExclamatoryPost(payload: string) {
	return {type: SET_EXCLAMATORY_POST, payload};
}
export function setCapitalizeWords(payload: boolean) {
	return {type: SET_WORD_CAPITALIZATION, payload};
}
export function setSortWordlist(payload: boolean) {
	return {type: SET_SORT_WORDLIST, payload};
}
export function setWordlistMulticolumn(payload: boolean) {
	return {type: SET_WORDLIST_MULTICOLUMN, payload};
}
export function setWordsPerWordlist(payload: Fifty_OneThousand) {
	return {type: SET_WORDS_PER_WORDLIST, payload};
}
// Modals
export function openModal(payload: keyof ModalStateObject) {
	return {type: TOGGLE_MODAL, payload: {modal: payload, flag: true}};
}
export function closeModal(payload: keyof ModalStateObject) {
	return {type: TOGGLE_MODAL, payload: {modal: payload, flag: false}};
}
export function openPopover(payload: any) {
	return {type: TOGGLE_POPOVER, payload: {flag: true, event: payload}};
}
export function closePopover() {
	return {type: TOGGLE_POPOVER, payload: {flag: false, event: undefined}};
}
// Presets
export function loadPreset(payload: string) {
	return {type: LOAD_PRESET, payload};
}
export function clearEverything() {
	return {type: CLEAR_EVERYTHING, payload: null};
}
