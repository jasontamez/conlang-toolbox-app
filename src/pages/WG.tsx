import React from 'react';
import { Route } from 'react-router-dom';
import {
	IonIcon,
	IonLabel,
	IonTabBar,
	IonTabButton,
	IonTabs,
	IonRouterOutlet
} from '@ionic/react';

import { PageData } from '../store/types';

import { appPagesObject } from '../components/appPagesInfo';
import WGCharGroups from "./wg/WGcharactergroups";
import WGTransforms from "./wg/WGtransforms";
import WGSyllables from "./wg/WGsyllables";
import WGOutput from "./wg/WGoutput";
import WGSettings from "./wg/WGsettings";


const WG = (props: PageData) => {
	return (
		<IonTabs>
			<IonRouterOutlet>
				{/*
					Using the render method prop cuts down the number of renders your components will have due to route changes.
					Use the component prop when your component depends on the RouterComponentProps passed in automatically.
				*/}
				<Route path="/wg/charGroups" render={() => <WGCharGroups {...props} /> } exact={true} />
				<Route path="/wg/syllables" render={() => <WGSyllables {...props} />} exact={true} />
				<Route path="/wg/transforms" render={() => <WGTransforms {...props} />} exact={true} />
				<Route path="/wg/output" render={() => <WGOutput {...props} />} exact={true} />
				<Route path="/wg/settings" render={() => <WGSettings {...props} />} exact={true} />
			</IonRouterOutlet>
			<IonTabBar slot="bottom">
				{appPagesObject.wg!.map(obj => {
					const { title, url, tab, icon, Icon } = obj;
					return (
						<IonTabButton tab={tab!} href={url} key={"wgTab-" + tab}>
							{icon ? <IonIcon icon={icon} /> : Icon ? <Icon /> : <></>}
							<IonLabel>{title}</IonLabel>
						</IonTabButton>
					);
				})}
			</IonTabBar>
		</IonTabs>
	);
};

export default WG;
