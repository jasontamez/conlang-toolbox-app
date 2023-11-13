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
	listOutline,
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
	SoundChangesIcon
} from './icons';

type Parents = 'ms' | 'dj' | 'wg' | 'we';

export interface AppPage {
	url: string
	title: string
	MenuIcon?: Function
	menuIcon?: string
	Icon?: Function
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
		header: "Conlang Toolbox",
		note: "tools for language invention",
		pages: [
			{
				title: 'MorphoSyntax',
				url: '/ms',
				MenuIcon: (props: IonIconProps) => <MorphoSyntaxIcon {...props} />,
				id: 'menuitemSyntax',
				parentOf: 'ms'
			},
			{
				title: 'Overview',
				url: '/ms/overview',
				id: 'menuitemMSOverview',
				icon: helpOutline,
				parent: 'ms',
				tab: 'Section-Overview',
				hidden: true
			},
			{
				title: 'Settings',
				url: '/ms/msSettings',
				id: 'menuitemMSSettings',
				icon: settingsSharp,
				parent: 'ms',
				tab: 'Section-Settings'
			},
			{
				title: '1. Morphological Typology',
				noIcon: '1',
				tab: 'Section-01',
				url: '/ms/ms01',
				id: 'menuitemMS1',
				parent: 'ms'
			},
			{
				title: '2. Grammatical Categories',
				noIcon: '2',
				tab: 'Section-02',
				url: '/ms/ms02',
				id: 'menuitemMS2',
				parent: 'ms'
			},
			{
				title: '3. Constituent Order Typology',
				noIcon: '3',
				tab: 'Section-03',
				url: '/ms/ms03',
				id: 'menuitemMS3',
				parent: 'ms'
			},
			{
				title: '4. Noun Operations',
				noIcon: '4',
				tab: 'Section-04',
				url: '/ms/ms04',
				id: 'menuitemMS4',
				parent: 'ms'
			},
			{
				title: '5. Predicate Nominals etc.',
				noIcon: '5',
				tab: 'Section-05',
				url: '/ms/ms05',
				id: 'menuitemMS5',
				parent: 'ms'
			},
			{
				title: '6. Grammatical Relations',
				noIcon: '6',
				tab: 'Section-06',
				url: '/ms/ms06',
				id: 'menuitemMS6',
				parent: 'ms'
			},
			{
				title: '7. Voice/Valence Operations',
				noIcon: '7',
				tab: 'Section-07',
				url: '/ms/ms07',
				id: 'menuitemMS7',
				parent: 'ms'
			},
			{
				title: '8. Other Verb Operations',
				noIcon: '8',
				tab: 'Section-08',
				url: '/ms/ms08',
				id: 'menuitemMS8',
				parent: 'ms'
			},
			{
				title: '9. Pragmatic Marking',
				noIcon: '9',
				tab: 'Section-09',
				url: '/ms/ms09',
				id: 'menuitemMS9',
				parent: 'ms'
			},
			{
				title: '10. Clause Combinations',
				noIcon: '10',
				tab: 'Section-10',
				url: '/ms/ms10',
				id: 'menuitemMS10',
				parent: 'ms'
			},
			{
				title: 'WordGen',
				url: '/wg',
				MenuIcon: (props: IonIconProps) => <WordGenIcon {...props} />,
				id: 'menuitemWG',
				parentOf: 'wg'
			},
			{
				title: 'Overview',
				url: '/wg/overview',
				tab: 'overview',
				id: 'menuitemWGoverview',
				icon: helpOutline,
				parent: 'wg',
				hidden: true
			},
			{
				title: 'Character Groups',
				url: '/wg/charGroups',
				tab: 'charGroups',
				tabTitle: 'Char Groups',
				id: 'menuitemWGcharGroup',
				icon: gridOutline,
				parent: 'wg'
			},
			{
				title: 'Syllables',
				url: '/wg/syllables',
				tab: 'syllables',
				id: 'menuitemWGsyl',
				Icon: (props: IonIconProps) => <SyllablesIcon {...props} />,
				parent: 'wg'
			},
			{
				title: 'Transformations',
				url: '/wg/transforms',
				tab: 'transforms',
				tabTitle: 'Transforms',
				id: 'menuitemWGrew',
				Icon: (props: IonIconProps) => <TransformationsIcon {...props} />,
				parent: 'wg'
			},
			{
				title: 'Output',
				url: '/wg/output',
				tab: 'output',
				id: 'menuitemWGout',
				icon: documentTextOutline,
				parent: 'wg'
			},
			{
				title: 'Settings',
				url: '/wg/settings',
				tab: 'settings',
				id: 'menuitemWGset',
				icon: optionsOutline,
				parent: 'wg'
			},
			{
				title: 'WordEvolve',
				url: '/we',
				MenuIcon: (props: IonIconProps) => <WordEvolveIcon {...props} />,
				id: 'menuitemWE',
				parentOf: 'we'
			},
			{
				title: 'Overview',
				url: '/we/overview',
				tab: 'overview',
				id: 'menuitemWEoverview',
				icon: helpOutline,
				parent: 'we',
				hidden: true
			},
			{
				title: 'Input',
				url: '/we/input',
				tab: 'input',
				id: 'menuitemWEinp',
				icon: enterOutline,
				parent: 'we'
			},
			{
				title: 'Character Groups',
				url: '/we/charGroups',
				tab: 'charGroups',
				tabTitle: 'Char Groups',
				id: 'menuitemWEcharGroup',
				icon: gridOutline,
				parent: 'we'
			},
			{
				title: 'Transformations',
				url: '/we/transformations',
				tab: 'transformations',
				tabTitle: 'Transforms',
				id: 'menuitemWEtns',
				Icon: (props: IonIconProps) => <TransformationsIcon {...props} />,
				parent: 'we'
			},
			{
				title: 'Sound Changes',
				url: '/we/soundchanges',
				tab: 'soundchanges',
				tabTitle: 'Changes',
				id: 'menuitemWEscs',
				Icon: (props: IonIconProps) => <SoundChangesIcon {...props} />,
				parent: 'we'
			},
			{
				title: 'Output',
				url: '/we/output',
				tab: 'output',
				id: 'menuitemWEout',
				icon: exitOutline,
				parent: 'we'
			},
			{
				title: 'Declenjugator',
				url: '/dj',
				MenuIcon: (props: IonIconProps) => <DeclenjugatorIcon {...props} />,
				id: 'menuitemDJ',
				parentOf: 'dj'
			},
			{
				title: 'Overview',
				url: '/dj/overview',
				tab: 'overview',
				id: 'menuitemDJoverview',
				hidden: true,
				parent: 'dj'
			},
			{
				title: 'Input',
				url: '/dj/input',
				tab: 'input',
				id: 'menuitemDJinp',
				icon: logInOutline,
				parent: 'dj'
			},
			{
				title: 'Groups',
				url: '/dj/groups',
				tab: 'groups',
				id: 'menuitemDJgroup',
				icon: listOutline,
				parent: 'dj'
			},
			{
				title: 'Output',
				url: '/dj/output',
				tab: 'output',
				id: 'menuitemDJout',
				icon: logOutOutline,
				parent: 'dj'
			},
			/*{ // https://github.com/apache/cordova-plugin-media
				title: 'PhonoGraph',
				url: '/ph',
				menuIcon: volumeHighSharp,
				id: 'menuitemPG'
			},*/
			{
				title: 'Lexicon',
				url: '/lex',
				MenuIcon: (props: IonIconProps) => <LexiconIcon {...props} />,
				id: 'menuitemLX'
			},
			{
				title: 'Concepts',
				url: '/wordlists',
				MenuIcon: (props: IonIconProps) => <ConceptsIcon {...props} />,
				id: 'menuitemWL'
			}
		],
		id: 'menuMain'
	},
	{
		pages: [
			{
				title: 'Settings',
				url: '/settings',
				menuIcon: settingsSharp,
				id: 'menuitemSettings'
			},
			{
				title: 'About',
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
				title: 'App Info',
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
