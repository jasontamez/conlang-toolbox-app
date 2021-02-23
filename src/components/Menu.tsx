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
import {
	createSharp,
	shuffleSharp,
	listSharp,
	bookSharp,
	settingsSharp,
	chatboxEllipsesSharp
} from 'ionicons/icons';
import './Menu.css';

interface AppPage {
	url: string;
	title: string;
	icon: string;
	id: string;
}
interface MenuSection {
	header?: string;
	note?: string;
	pages: AppPage[];
	id: string;
}

const appMenuPages: MenuSection[] = [
	{
		header: "Conlang Toolbox",
		note: "tools for conlangers",
		pages: [
			{
				title: 'WordGen',
				url: '/wg',
				icon: createSharp,
				id: 'menuitemWG'
			},
			{
				title: 'WordEvolve',
				url: '/we',
				icon: shuffleSharp,
				id: 'menuitemWE'
			},
			{
				title: 'LangSketch',
				url: '/ls',
				icon: listSharp,
				id: 'menuitemLS'
			},
			{
				title: 'Lexicon',
				url: '/lex',
				icon: bookSharp,
				id: 'menuitemLX'
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
	}
];

const Menu = () => {
	const location = useLocation();

	return (
		<IonMenu contentId="main" type="overlay" id="mainMenu">
			<IonContent>
				{appMenuPages.map((menuSection) => {
					const pages = menuSection.pages.map((appPage) => {
						return (
							<IonMenuToggle key={appPage.id} autoHide={false}>
								<IonItem className={location.pathname.startsWith(appPage.url) ? 'selected' : ''} routerLink={appPage.url} routerDirection="none" lines="none" detail={false}>
								<IonIcon slot="start" icon={appPage.icon} />
								<IonLabel>{appPage.title}</IonLabel>
								</IonItem>
							</IonMenuToggle>
						);
					});
					let head: any = (menuSection.header) ? (<IonListHeader>{menuSection.header}</IonListHeader>) : '',
						note: any = (menuSection.note) ? (<IonNote>{menuSection.note}</IonNote>) : '';
					return (
						<IonList key={menuSection.id}>
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
