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
	gridOutline,
	enterOutline,
	exitOutline
} from 'ionicons/icons';
import WECharGroups from "./we/WEcharactergroups";
import WETransforms from "./we/WEtransforms";
import WESounds from "./we/WEsounds";
import WEInput from "./we/WEinput";
import WEOutput from "./we/WEoutput";
import { PageData } from '../components/ReduxDucksTypes';
import { SoundChangesIcon, TransformationsIcon } from '../components/icons';


const WE = (props: PageData) => {
	return (
		<IonTabs>
			<IonRouterOutlet>
				{/*
					Using the render method prop cuts down the number of renders your components will have due to route changes.
					Use the component prop when your component depends on the RouterComponentProps passed in automatically.
				*/}
				<Route path="/we/input" render={() => <WEInput {...props} />} exact={true} />
				<Route path="/we/charGroups" render={() => <WECharGroups {...props} />} exact={true} />
				<Route path="/we/transformations" render={() => <WETransforms {...props} />} exact={true} />
				<Route path="/we/soundchanges" render={() => <WESounds {...props} />} exact={true} />
				<Route path="/we/output" render={() => <WEOutput {...props} />} exact={true} />
			</IonRouterOutlet>
			<IonTabBar slot="bottom">
				<IonTabButton tab="input" href="/we/input">
					<IonIcon icon={enterOutline} />
					<IonLabel>Input</IonLabel>
				</IonTabButton>
				<IonTabButton tab="charGroups" href="/we/charGroups">
					<IonIcon icon={gridOutline} />
					<IonLabel>Characters</IonLabel>
				</IonTabButton>
				<IonTabButton tab="transformations" href="/we/transformations">
					<TransformationsIcon />
					<IonLabel>Transforms</IonLabel>
				</IonTabButton>
				<IonTabButton tab="soundchanges" href="/we/soundchanges">
					<SoundChangesIcon />
					<IonLabel>Sound Changes</IonLabel>
				</IonTabButton>
				<IonTabButton tab="output" href="/we/output">
					<IonIcon icon={exitOutline} />
					<IonLabel>Output</IonLabel>
				</IonTabButton>
			</IonTabBar>
		</IonTabs>
	);
};

export default WE;
