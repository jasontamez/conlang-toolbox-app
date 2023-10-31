import {
	IonContent,
	IonIcon,
	IonItem,
	IonLabel,
	IonList,
	IonListHeader,
	IonMenu,
	IonMenuToggle,
	IonNote,
} from '@ionic/react';
import React, { useCallback, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
	settingsSharp,
	chatboxEllipsesSharp,
	caretForwardSharp,
	ellipseSharp,
//	cogSharp,
//	volumeHighSharp
} from 'ionicons/icons';
import {
	ConceptsIcon,
	IonIconProps,
	LexiconIcon,
	MorphoSyntaxIcon,
	WordEvolveIcon,
	WordGenIcon,
	DeclenjugatorIcon
} from './icons';

import './Menu.css';

interface AppPage {
	url: string
	title: string
	Icon?: Function
	icon?: string
	id: string
	parent?: string
	parentOf? : string
}
interface MenuSection {
	header?: string
	note?: string
	pages: AppPage[]
	id: string
}

const appMenuPages: MenuSection[] = [
	{
		header: "Conlang Toolbox",
		note: "tools for language invention",
		pages: [
			{
				title: 'MorphoSyntax',
				url: '/ms',
				Icon: (props: IonIconProps) => <MorphoSyntaxIcon {...props} />,
				id: 'menuitemSyntax',
				parentOf: 'ms'
			},
			{
				title: 'Settings',
				url: '/ms/msSettings',
				id: 'menuitemMSSettings',
				parent: 'ms'
			},
			{
				title: '1. Morphological Typology',
				url: '/ms/ms01',
				id: 'menuitemMS1',
				parent: 'ms'
			},
			{
				title: '2. Grammatical Categories',
				url: '/ms/ms02',
				id: 'menuitemMS2',
				parent: 'ms'
			},
			{
				title: '3. Constituent Order Typology',
				url: '/ms/ms03',
				id: 'menuitemMS3',
				parent: 'ms'
			},
			{
				title: '4. Noun Operations',
				url: '/ms/ms04',
				id: 'menuitemMS4',
				parent: 'ms'
			},
			{
				title: '5. Predicate Nominals etc.',
				url: '/ms/ms05',
				id: 'menuitemMS5',
				parent: 'ms'
			},
			{
				title: '6. Grammatical Relations',
				url: '/ms/ms06',
				id: 'menuitemMS6',
				parent: 'ms'
			},
			{
				title: '7. Voice/Valence Operations',
				url: '/ms/ms07',
				id: 'menuitemMS7',
				parent: 'ms'
			},
			{
				title: '8. Other Verb Operations',
				url: '/ms/ms08',
				id: 'menuitemMS8',
				parent: 'ms'
			},
			{
				title: '9. Pragmatic Marking',
				url: '/ms/ms09',
				id: 'menuitemMS9',
				parent: 'ms'
			},
			{
				title: '10. Clause Combinations',
				url: '/ms/ms10',
				id: 'menuitemMS10',
				parent: 'ms'
			},
			{
				title: 'WordGen',
				url: '/wg',
				Icon: (props: IonIconProps) => <WordGenIcon {...props} />,
				id: 'menuitemWG',
				parentOf: 'wg'
			},
			{
				title: 'Character Groups',
				url: '/wg/charGroups',
				id: 'menuitemWGcharGroup',
				parent: 'wg'
			},
			{
				title: 'Syllables',
				url: '/wg/syllables',
				id: 'menuitemWGsyl',
				parent: 'wg'
			},
			{
				title: 'Transformations',
				url: '/wg/transforms',
				id: 'menuitemWGrew',
				parent: 'wg'
			},
			{
				title: 'Output',
				url: '/wg/output',
				id: 'menuitemWGout',
				parent: 'wg'
			},
			{
				title: 'Settings',
				url: '/wg/settings',
				id: 'menuitemWGset',
				parent: 'wg'
			},
			{
				title: 'WordEvolve',
				url: '/we',
				Icon: (props: IonIconProps) => <WordEvolveIcon {...props} />,
				id: 'menuitemWE',
				parentOf: 'we'
			},
			{
				title: 'Input',
				url: '/we/input',
				id: 'menuitemWEinp',
				parent: 'we'
			},
			{
				title: 'Character Groups',
				url: '/we/charGroups',
				id: 'menuitemWEcharGroup',
				parent: 'we'
			},
			{
				title: 'Transformations',
				url: '/we/transformations',
				id: 'menuitemWEtns',
				parent: 'we'
			},
			{
				title: 'Sound Changes',
				url: '/we/soundchanges',
				id: 'menuitemWEscs',
				parent: 'we'
			},
			{
				title: 'Output',
				url: '/we/output',
				id: 'menuitemWEout',
				parent: 'we'
			},
			{
				title: 'Declenjugator',
				url: '/dj',
				Icon: (props: IonIconProps) => <DeclenjugatorIcon {...props} />,
				id: 'menuitemDJ',
				parentOf: 'dj'
			},
			{
				title: 'Input',
				url: '/dj/input',
				id: 'menuitemDJinp',
				parent: 'dj'
			},
			{
				title: 'Character Groups',
				url: '/dj/groups',
				id: 'menuitemDJgroup',
				parent: 'dj'
			},
			{
				title: 'Output',
				url: '/dj/output',
				id: 'menuitemDJout',
				parent: 'dj'
			},
/*			{ // https://github.com/apache/cordova-plugin-media
				title: 'PhonoGraph',
				url: '/ph',
				icon: volumeHighSharp,
				id: 'menuitemPG'
			},
*/			{
				title: 'Lexicon',
				url: '/lex',
				Icon: (props: IonIconProps) => <LexiconIcon {...props} />,
				id: 'menuitemLX'
			},
			{
				title: 'Concepts',
				url: '/wordlists',
				Icon: (props: IonIconProps) => <ConceptsIcon {...props} />,
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
				icon: settingsSharp,
				id: 'menuitemSettings'
			},
			{
				title: 'About',
				url: '/',
				icon: chatboxEllipsesSharp,
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
//				icon: '',
				id: 'menuitemAppInfo'
			}
		],
		id: 'menuCredits'
	}
];


const Menu = () => {
	const [menuInfo, setMenuInfo] = useState<string | false>(false);
	const location = useLocation();
	const {pathname = "/"} = location;
	const testPath = useCallback((test: string) => {
		if(test.endsWith("/")) {
			return test === pathname;
		}
		return pathname.startsWith(test);
	}, [pathname]);

	return (
		<IonMenu contentId="main" type="overlay" id="mainMenu">
			<IonContent>
				{appMenuPages.map((menuSection) => {
					const pages = menuSection.pages.map((appPage) => {
						const { parentOf, parent, id, url, icon, Icon, title } = appPage;
						const MenuIcon = () => icon ?
							<IonIcon slot="start" icon={icon} />
						:
							Icon ?
								<Icon slot="start" />
							:
								<></>
						;
						if(parentOf) {
							return (
								<IonItem
									key={id}
									className={
										'mainHeading'
										+ (testPath(url) ? ' selected' : '')
										+ (menuInfo === parentOf ? ' toggled' : '')
									}
									lines="none"
									detail={false}
									onClick={
										() => setMenuInfo(
											menuInfo === parentOf
												? false
												: parentOf!
										)
									}
								>
									<MenuIcon />
									<IonLabel>{title}</IonLabel>
									<IonIcon
										className="caret"
										slot="end"
										icon={caretForwardSharp}
									/>
								</IonItem>
							);
						} else if(parent) {
							return (
								<IonMenuToggle key={id} autoHide={false}>
									<IonItem
										className={
											'subHeading'
											+ (testPath(url) ? ' selected' : '')
											+ (menuInfo === parent ? '' : ' hidden')
										}
										routerLink={url}
										routerDirection="forward"
										lines="none"
										detail={false}
									>
										<IonLabel>{title}</IonLabel>
										<IonIcon
											slot="end"
											size="small"
											icon={ellipseSharp}
										/>
									</IonItem>
								</IonMenuToggle>
							);
						}
						return (
							<IonMenuToggle key={id} autoHide={false}>
								<IonItem
									className={'mainHeading' + (testPath(url) ? ' selected' : '')}
									routerLink={url}
									routerDirection="forward"
									lines="none"
									detail={false}
								>
									<MenuIcon />
									<IonLabel>{title}</IonLabel>
								</IonItem>
							</IonMenuToggle>
						);
					});
					const { header, note } = menuSection;
					return (
						<IonList key={menuSection.id} id={menuSection.id}>
							{
								(header) ?
									(<IonListHeader>{header}</IonListHeader>)
								:
									<></>
							}{(note) ? (<IonNote>{note}</IonNote>) : <></>}
							{pages}
						</IonList>
					);
				})}
			</IonContent>
		</IonMenu>
	);
};

export default Menu;
