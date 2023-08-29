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
	libraryOutline,
	syncOutline,
	enterOutline,
	exitOutline,
	megaphoneOutline
} from 'ionicons/icons';
import WECategories from "./we/WEcharactergroups";
import WETransforms from "./we/WEtransforms";
import WESounds from "./we/WEsounds";
import WEInput from "./we/WEinput";
import WEOutput from "./we/WEoutput";
import { PageData } from '../components/ReduxDucksTypes';


const WE = (props: PageData) => {
	return (
		<IonTabs>
			<IonRouterOutlet>
				{/*
					Using the render method prop cuts down the number of renders your components will have due to route changes.
					Use the component prop when your component depends on the RouterComponentProps passed in automatically.
				*/}
				<Route path="/we/input" render={() => <WEInput {...props} />} exact={true} />
				<Route path="/we/categories" render={() => <WECategories {...props} />} exact={true} />
				<Route path="/we/transformations" render={() => <WETransforms {...props} />} exact={true} />
				<Route path="/we/soundchanges" render={() => <WESounds {...props} />} exact={true} />
				<Route path="/we/output" render={() => <WEOutput {...props} />} exact={true} />
			</IonRouterOutlet>
			<IonTabBar slot="bottom">
				<IonTabButton tab="input" href="/we/input">
					<IonIcon icon={enterOutline} />
					<IonLabel>Input</IonLabel>
				</IonTabButton>
				<IonTabButton tab="categories" href="/we/categories">
					<IonIcon icon={libraryOutline} />
					<IonLabel>Characters</IonLabel>
				</IonTabButton>
				<IonTabButton tab="transformations" href="/we/transformations">
					<IonIcon icon={syncOutline} />
					<IonLabel>Transforms</IonLabel>
				</IonTabButton>
				<IonTabButton tab="soundchanges" href="/we/soundchanges">
					<IonIcon icon={megaphoneOutline} />
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
