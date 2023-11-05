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
	caretForwardSharp,
	ellipseSharp,
//	cogSharp,
//	volumeHighSharp
} from 'ionicons/icons';

import { appMenuInfo } from './appPagesInfo';

import './Menu.css';

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
				{appMenuInfo.map((menuSection) => {
					const pages = menuSection.pages.map((appPage) => {
						const { parentOf, parent, id, url, menuIcon, MenuIcon, title } = appPage;
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
									{menuIcon ?
										<IonIcon slot="start" icon={menuIcon} />
									:
										MenuIcon ? <MenuIcon slot="start" /> : <></>}
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
									{menuIcon ?
										<IonIcon slot="start" icon={menuIcon} />
									:
										MenuIcon ? <MenuIcon slot="start" /> : <></>}
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
