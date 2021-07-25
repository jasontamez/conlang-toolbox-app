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
import React from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import {
	createSharp,
	shuffleSharp,
	bookSharp,
	settingsSharp,
	chatboxEllipsesSharp,
	caretForwardSharp,
	ellipseSharp,
	listSharp,
	buildSharp
} from 'ionicons/icons';
import { setMenuToggle } from './ReduxDucksFuncs';
import './Menu.css';

interface AppPage {
	url: string
	title: string
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
				icon: buildSharp,
				id: 'menuitemSyntax',
				parentOf: 'ms'
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
				title: '4. Noun and Noun Phrase Operations',
				url: '/ms/ms04',
				id: 'menuitemMS4',
				parent: 'ms'
			},
			{
				title: '5. Predicate Nominals and Related Constructions',
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
				title: '7. Voice and Valence Adjusting Operations',
				url: '/ms/ms07',
				id: 'menuitemMS7',
				parent: 'ms'
			},
			{
				title: '8. Other Verb and Verb Phrase Operations',
				url: '/ms/ms08',
				id: 'menuitemMS8',
				parent: 'ms'
			},
			{
				title: '9. Pragmatically Marked Structures',
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
				icon: createSharp,
				id: 'menuitemWG',
				parentOf: 'wg'
			},
			{
				title: 'Character Groups',
				url: '/wg/categories',
				id: 'menuitemWGcat',
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
				url: '/wg/rewriterules',
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
				icon: shuffleSharp,
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
				url: '/we/categories',
				id: 'menuitemWEcat',
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
				title: 'Lexicon',
				url: '/lex',
				icon: bookSharp,
				id: 'menuitemLX'
			},
			{
				title: 'Word Lists',
				url: '/wordlists',
				icon: listSharp,
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
				url: '/about',
				icon: chatboxEllipsesSharp,
				id: 'menuitemAbout'
			}
		],
		id: 'menuOthers'
	},
	{
		pages: [
			{
				title: 'Credits',
				url: '/credits',
				icon: '',
				id: 'menuitemAbout'
			}
		],
		id: 'menuCredits'
	}
];

const Menu = () => {
	const location = useLocation();
	const dispatch = useDispatch();
	const modalState = useSelector((state: any) => state.modalState);

	return (
		<IonMenu contentId="main" type="overlay" id="mainMenu">
			<IonContent>
				{appMenuPages.map((menuSection) => {
					const pages = menuSection.pages.map((appPage) => {
						if(appPage.parentOf) {
							return (
								<IonItem
									key={appPage.id}
									className={
										'mainHeading'
										+ (location.pathname.startsWith(appPage.url) ? ' selected' : '')
										+ (modalState.menuToggle === appPage.parentOf ? ' toggled' : '')
									}
									lines="none"
									detail={false}
									onClick={
										() => dispatch(
											setMenuToggle(
												modalState.menuToggle === appPage.parentOf
													? false
													: appPage.parentOf!
											)
										)
									}
								>
									<IonIcon slot="start" icon={appPage.icon} />
									<IonLabel>{appPage.title}</IonLabel>
									<IonIcon className="caret" slot="end" icon={caretForwardSharp} />
								</IonItem>
							);
						} else if(appPage.parent) {
							return (
								<IonMenuToggle key={appPage.id} autoHide={false}>
									<IonItem className={'subHeading' + (location.pathname.startsWith(appPage.url) ? ' selected' : '') + (modalState.menuToggle === appPage.parent ? '' : ' hidden')} routerLink={appPage.url} routerDirection="forward" lines="none" detail={false}>
										<IonLabel>{appPage.title}</IonLabel>
										<IonIcon slot="end" size="small" icon={ellipseSharp} />
									</IonItem>
								</IonMenuToggle>
							);
						}
						return (
							<IonMenuToggle key={appPage.id} autoHide={false}>
								<IonItem className={'mainHeading' + (location.pathname.startsWith(appPage.url) ? ' selected' : '')} routerLink={appPage.url} routerDirection="forward" lines="none" detail={false}>
									{appPage.icon ? (<IonIcon slot="start" icon={appPage.icon} />) : ""}
									<IonLabel>{appPage.title}</IonLabel>
								</IonItem>
							</IonMenuToggle>
						);
				});
					let head: any = (menuSection.header) ? (<IonListHeader>{menuSection.header}</IonListHeader>) : '',
						note: any = (menuSection.note) ? (<IonNote>{menuSection.note}</IonNote>) : '';
					return (
						<IonList key={menuSection.id} id={menuSection.id}>
							{head}{note}
							{pages}
						</IonList>
					);
				})}
			</IonContent>
		</IonMenu>
	);
};

export default Menu;
