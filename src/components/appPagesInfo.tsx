import React from 'react';
import {
	settingsSharp,
	chatboxEllipsesSharp,
	gridOutline,
	documentTextOutline,
	optionsOutline,
	enterOutline,
	exitOutline,
	logOutOutline,
	logInOutline,
	helpOutline
} from 'ionicons/icons';

import {
	ConceptsIcon,
	IonIconProps,
	LexiconIcon,
	MorphoSyntaxIcon,
	WordEvolveIcon,
	WordGenIcon,
	DeclenjugatorIcon,
	SyllablesIcon,
	TransformationsIcon,
	SoundChangesIcon,
	DJGroupsIcon
} from './icons';
import i18n from '../i18n';

type Parents = 'ms' | 'dj' | 'wg' | 'we';

export interface AppPage {
	url: string
	title: string
	MenuIcon?: React.FC<IonIconProps>
	menuIcon?: string
	Icon?: React.FC<IonIconProps>
	icon?: string
	noIcon?: string
	id: string
	parent?: Parents
	parentOf?: string
	tab?: string
	tabTitle?: string
	hidden?: boolean
}
export interface MenuSection {
	header?: string
	note?: string
	pages: AppPage[]
	id: string
}

export interface AppPageObject {
	wg?: AppPage[]
}

export const appMenuInfo: MenuSection[] = [
	{
		header: i18n.t("Conlang Toolbox"),
		note: i18n.t("tools for language invention"),
		pages: [
			{
				title: i18n.t("MorphoSyntax"),
				url: '/ms',
				MenuIcon: (props: IonIconProps) => <MorphoSyntaxIcon {...props} />,
				id: 'menuitemSyntax',
				parentOf: 'ms'
			},
			{
				title: i18n.t("Overview"),
				url: '/ms/overview',
				id: 'menuitemMSOverview',
				icon: helpOutline,
				parent: 'ms',
				tab: 'Section-Overview',
				hidden: true
			},
			{
				title: i18n.t("Settings"),
				url: '/ms/msSettings',
				id: 'menuitemMSSettings',
				icon: settingsSharp,
				parent: 'ms',
				tab: 'Section-Settings'
			},
			{
				title: i18n.t("1-Morphological Typology", { ns: "ms" }),
				noIcon: '1',
				tab: 'Section-01',
				url: '/ms/ms01',
				id: 'menuitemMS1',
				parent: 'ms'
			},
			{
				title: i18n.t("2-Grammatical Categories", { ns: "ms" }),
				noIcon: '2',
				tab: 'Section-02',
				url: '/ms/ms02',
				id: 'menuitemMS2',
				parent: 'ms'
			},
			{
				title: i18n.t("3-Constituent Order Typology", { ns: "ms" }),
				noIcon: '3',
				tab: 'Section-03',
				url: '/ms/ms03',
				id: 'menuitemMS3',
				parent: 'ms'
			},
			{
				title: i18n.t("4-Noun Operations", { ns: "ms" }),
				noIcon: '4',
				tab: 'Section-04',
				url: '/ms/ms04',
				id: 'menuitemMS4',
				parent: 'ms'
			},
			{
				title: i18n.t("5-Predicate Nominals etc.", { ns: "ms" }),
				noIcon: '5',
				tab: 'Section-05',
				url: '/ms/ms05',
				id: 'menuitemMS5',
				parent: 'ms'
			},
			{
				title: i18n.t("6-Grammatical Relations", { ns: "ms" }),
				noIcon: '6',
				tab: 'Section-06',
				url: '/ms/ms06',
				id: 'menuitemMS6',
				parent: 'ms'
			},
			{
				title: i18n.t("7-Voice/Valence Operations", { ns: "ms" }),
				noIcon: '7',
				tab: 'Section-07',
				url: '/ms/ms07',
				id: 'menuitemMS7',
				parent: 'ms'
			},
			{
				title: i18n.t("8-Other Verb Operations", { ns: "ms" }),
				noIcon: '8',
				tab: 'Section-08',
				url: '/ms/ms08',
				id: 'menuitemMS8',
				parent: 'ms'
			},
			{
				title: i18n.t("9-Pragmatic Marking", { ns: "ms" }),
				noIcon: '9',
				tab: 'Section-09',
				url: '/ms/ms09',
				id: 'menuitemMS9',
				parent: 'ms'
			},
			{
				title: i18n.t("10-Clause Combinations", { ns: "ms" }),
				noIcon: '10',
				tab: 'Section-10',
				url: '/ms/ms10',
				id: 'menuitemMS10',
				parent: 'ms'
			},
			{
				title: i18n.t("WordGen"),
				url: '/wg',
				MenuIcon: (props: IonIconProps) => <WordGenIcon {...props} />,
				id: 'menuitemWG',
				parentOf: 'wg'
			},
			{
				title: i18n.t("Overview"),
				url: '/wg/overview',
				tab: 'overview',
				id: 'menuitemWGoverview',
				icon: helpOutline,
				parent: 'wg',
				hidden: true
			},
			{
				title: i18n.t("Character Groups", { ns: "wgwe" }),
				url: '/wg/charGroups',
				tab: 'charGroups',
				tabTitle: 'Char Groups',
				id: 'menuitemWGcharGroup',
				icon: gridOutline,
				parent: 'wg'
			},
			{
				title: i18n.t("Syllables", { ns: "wgwe" }),
				url: '/wg/syllables',
				tab: 'syllables',
				id: 'menuitemWGsyl',
				Icon: (props: IonIconProps) => <SyllablesIcon {...props} />,
				parent: 'wg'
			},
			{
				title: i18n.t("Transformations", { ns: "wgwe" }),
				url: '/wg/transforms',
				tab: 'transforms',
				tabTitle: 'Transforms',
				id: 'menuitemWGrew',
				Icon: (props: IonIconProps) => <TransformationsIcon {...props} />,
				parent: 'wg'
			},
			{
				title: i18n.t("Output"),
				url: '/wg/output',
				tab: 'output',
				id: 'menuitemWGout',
				icon: documentTextOutline,
				parent: 'wg'
			},
			{
				title: i18n.t("Settings"),
				url: '/wg/settings',
				tab: 'settings',
				id: 'menuitemWGset',
				icon: optionsOutline,
				parent: 'wg'
			},
			{
				title: i18n.t("WordEvolve"),
				url: '/we',
				MenuIcon: (props: IonIconProps) => <WordEvolveIcon {...props} />,
				id: 'menuitemWE',
				parentOf: 'we'
			},
			{
				title: i18n.t("Overview"),
				url: '/we/overview',
				tab: 'overview',
				id: 'menuitemWEoverview',
				icon: helpOutline,
				parent: 'we',
				hidden: true
			},
			{
				title: i18n.t("Input"),
				url: '/we/input',
				tab: 'input',
				id: 'menuitemWEinp',
				icon: enterOutline,
				parent: 'we'
			},
			{
				title: i18n.t("Character Groups", { ns: "wgwe" }),
				url: '/we/charGroups',
				tab: 'charGroups',
				tabTitle: 'Char Groups',
				id: 'menuitemWEcharGroup',
				icon: gridOutline,
				parent: 'we'
			},
			{
				title: i18n.t("Transformations", { ns: "wgwe" }),
				url: '/we/transformations',
				tab: 'transformations',
				tabTitle: 'Transforms',
				id: 'menuitemWEtns',
				Icon: (props: IonIconProps) => <TransformationsIcon {...props} />,
				parent: 'we'
			},
			{
				title: i18n.t("Sound Changes", { ns: "wgwe" }),
				url: '/we/soundchanges',
				tab: 'soundchanges',
				tabTitle: 'Changes',
				id: 'menuitemWEscs',
				Icon: (props: IonIconProps) => <SoundChangesIcon {...props} />,
				parent: 'we'
			},
			{
				title: i18n.t("Output"),
				url: '/we/output',
				tab: 'output',
				id: 'menuitemWEout',
				icon: exitOutline,
				parent: 'we'
			},
			{
				title: i18n.t("Declenjugator"),
				url: '/dj',
				MenuIcon: (props: IonIconProps) => <DeclenjugatorIcon {...props} />,
				id: 'menuitemDJ',
				parentOf: 'dj'
			},
			{
				title: i18n.t("Overview"),
				url: '/dj/overview',
				tab: 'overview',
				id: 'menuitemDJoverview',
				hidden: true,
				parent: 'dj'
			},
			{
				title: i18n.t("Input"),
				url: '/dj/input',
				tab: 'input',
				id: 'menuitemDJinp',
				icon: logInOutline,
				parent: 'dj'
			},
			{
				title: i18n.t("Groups", { ns: "dj" }),
				url: '/dj/groups',
				tab: 'groups',
				id: 'menuitemDJgroup',
				Icon: (props: IonIconProps) => <DJGroupsIcon {...props} />,
				parent: 'dj'
			},
			{
				title: i18n.t("Output"),
				url: '/dj/output',
				tab: 'output',
				id: 'menuitemDJout',
				icon: logOutOutline,
				parent: 'dj'
			},
			/*{ // https://github.com/apache/cordova-plugin-media
				title: i18n.t("PhonoGraph"),
				url: '/ph',
				menuIcon: volumeHighSharp,
				id: 'menuitemPG'
			},*/
			{
				title: i18n.t("Lexicon"),
				url: '/lex',
				MenuIcon: (props: IonIconProps) => <LexiconIcon {...props} />,
				id: 'menuitemLX'
			},
			{
				title: i18n.t("Concepts"),
				url: '/wordlists',
				MenuIcon: (props: IonIconProps) => <ConceptsIcon {...props} />,
				id: 'menuitemConcepts'
			}
		],
		id: 'menuMain'
	},
	{
		pages: [
			{
				title: i18n.t("Settings"),
				url: '/settings',
				menuIcon: settingsSharp,
				id: 'menuitemSettings'
			},
			{
				title: i18n.t("Main"),
				url: '/',
				menuIcon: chatboxEllipsesSharp,
				id: 'menuitemAbout'
			}
		],
		id: 'menuOthers'
	},
	{
		pages: [
			{
				title: i18n.t("App Info"),
				url: '/appinfo',
				id: 'menuitemAppInfo'
			}
		],
		id: 'menuCredits'
	}
];

const tempObject: {[key in Parents]: AppPage[]} = {
	ms: [],
	dj: [],
	wg: [],
	we: []
};

appMenuInfo[0].pages.forEach(page => {
	const { parent } = page;
	if(parent) {
		const pages: AppPage[] = [];
		const newPages = tempObject[parent] || pages;
		newPages.push(page);
		tempObject[parent] = newPages;
	}
});

export const appPagesObject = tempObject;
