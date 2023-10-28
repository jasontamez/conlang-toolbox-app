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
import {
	listOutline,
	logInOutline,
	logOutOutline
} from 'ionicons/icons';

import { PageData } from '../store/types';

import DJGroups from './dj/DJGroups';
import DJOutput from './dj/DJOutput';


const DJ = (props: PageData) => {
	return (
		<IonTabs>
			<IonRouterOutlet>
				{/*
					Using the render method prop cuts down the number of renders your components will have due to route changes.
					Use the component prop when your component depends on the RouterComponentProps passed in automatically.
				<Route path="/dj/input" render={() => <WGSyllables {...props} /> } exact={true} />
				<Route path="/dj/groups" render={() => <WGCharGroups {...props} />} exact={true} />
				<Route path="/dj/output" render={() => <WGOutput {...props} />} exact={true} />
				*/}
				<Route path="/dj/groups" render={() => <DJGroups {...props} />} exact={true} />
				<Route path="/dj/output" render={() => <DJOutput {...props} />} exact={true} />
			</IonRouterOutlet>
			<IonTabBar slot="bottom">
				<IonTabButton tab="input" href="/dj/input">
					<IonIcon icon={logInOutline} />
					<IonLabel>Input</IonLabel>
				</IonTabButton>
				<IonTabButton tab="groups" href="/dj/groups">
					<IonIcon icon={listOutline} />
					<IonLabel>Groups</IonLabel>
				</IonTabButton>
				<IonTabButton tab="output" href="/dj/output">
					<IonIcon icon={logOutOutline} />
					<IonLabel>Output</IonLabel>
				</IonTabButton>
			</IonTabBar>
		</IonTabs>
	);
};

export default DJ;
