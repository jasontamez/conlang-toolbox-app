import React from 'react';
import { Redirect, Route } from 'react-router-dom';
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
	optionsOutline,
	syncOutline,
	informationCircleOutline,
	chevronDownCircleOutline,
	chevronUpCircleOutline,
	megaphoneOutline
} from 'ionicons/icons';
import WECategories from "./we/WEcategories";
import WETransforms from "./we/WEtransforms";
import WESounds from "./we/WEsounds";
import WEInput from "./we/WEinput";
import WEOutput from "./we/WEoutput";
import WESettings from "./we/WEsettings";
import WEHome from "./we/WEhome";

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import '../theme/variables.css';

const WE = () => { return (
	<IonTabs>
		<IonRouterOutlet>
			<Redirect exact={true} path="/we" to="/we/home" />
			<Redirect exact={true} path="/we/" to="/we/home" />
			{/*
				Using the render method prop cuts down the number of renders your components will have due to route changes.
				Use the component prop when your component depends on the RouterComponentProps passed in automatically.
			*/}
			<Route path="/we/categories" render={() => <WECategories />} exact={true} />
			<Route path="/we/transformations" render={() => <WETransforms />} exact={true} />
			<Route path="/we/soundchanges" render={() => <WESounds />} exact={true} />
			<Route path="/we/input" render={() => <WEInput />} exact={true} />
			<Route path="/we/output" render={() => <WEOutput />} exact={true} />
			<Route path="/we/settings" render={() => <WESettings />} exact={true} />
			<Route path="/we/home" render={() => <WEHome />} exact={true}  />
		</IonRouterOutlet>
		<IonTabBar slot="bottom">
			<IonTabButton tab="home" href="/we/home">
				<IonIcon icon={informationCircleOutline} />
				<IonLabel>Info</IonLabel>
			</IonTabButton>
			<IonTabButton tab="categories" href="/we/categories">
				<IonIcon icon={libraryOutline} />
				<IonLabel>Categories</IonLabel>
			</IonTabButton>
			<IonTabButton tab="transformations" href="/we/transformations">
				<IonIcon icon={syncOutline} />
				<IonLabel>Transformations</IonLabel>
			</IonTabButton>
			<IonTabButton tab="soundchanges" href="/we/soundchanges">
				<IonIcon icon={megaphoneOutline} />
				<IonLabel>Sound Changes</IonLabel>
			</IonTabButton>
			<IonTabButton tab="input" href="/we/input">
				<IonIcon icon={chevronDownCircleOutline} />
				<IonLabel>Input</IonLabel>
			</IonTabButton>
			<IonTabButton tab="output" href="/we/output">
				<IonIcon icon={chevronUpCircleOutline} />
				<IonLabel>Output</IonLabel>
			</IonTabButton>
			<IonTabButton tab="settings" href="/we/settings">
				<IonIcon icon={optionsOutline} />
				<IonLabel>Settings</IonLabel>
			</IonTabButton>
		</IonTabBar>
	</IonTabs>
)};
 
export default WE;
