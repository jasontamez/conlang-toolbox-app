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
	gridOutline,
	optionsOutline,
	swapHorizontalOutline,
	documentTextOutline,
	informationCircleOutline,
	fileTrayStackedOutline
} from 'ionicons/icons';
import { shallowEqual, useSelector } from "react-redux";
import WGCategories from "./wg/WGcategories";
import WGRewrites from "./wg/WGrewrites";
import WGSyllables from "./wg/WGsyllables";
import WGOutput from "./wg/WGoutput";
import WGSettings from "./wg/WGsettings";
import WGHome from "./wg/WGhome";
import './App.css';

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

const WG = () => {
	const WGpage = useSelector((state: any) => state.viewState.wg, shallowEqual);
	return (
		<IonTabs>
			<IonRouterOutlet>
				<Redirect exact={true} path="/wg" to={"/wg/" + WGpage} />
				<Redirect exact={true} path="/wg/" to={"/wg/" + WGpage} />
				{/*
					Using the render method prop cuts down the number of renders your components will have due to route changes.
					Use the component prop when your component depends on the RouterComponentProps passed in automatically.
				*/}
				<Route path="/wg/home" render={() => <WGHome />} exact={true} />
				<Route path="/wg/categories" render={() => <WGCategories /> } exact={true} />
				<Route path="/wg/syllables" render={() => <WGSyllables />} exact={true} />
				<Route path="/wg/rewriterules" render={() => <WGRewrites />} exact={true} />
				<Route path="/wg/output" render={() => <WGOutput />} exact={true} />
				<Route path="/wg/settings" render={() => <WGSettings />} exact={true} />
			</IonRouterOutlet>
			<IonTabBar slot="bottom">
				<IonTabButton tab="home" href="/wg/home">
					<IonIcon icon={informationCircleOutline} />
					<IonLabel>Info</IonLabel>
				</IonTabButton>
				<IonTabButton tab="categories" href="/wg/categories">
					<IonIcon icon={fileTrayStackedOutline} />
					<IonLabel>Categories</IonLabel>
				</IonTabButton>
				<IonTabButton tab="syllables" href="/wg/syllables">
					<IonIcon icon={gridOutline} />
					<IonLabel>Syllables</IonLabel>
				</IonTabButton>
				<IonTabButton tab="rewriterules" href="/wg/rewriterules">
					<IonIcon icon={swapHorizontalOutline} />
					<IonLabel>Rewrites</IonLabel>
				</IonTabButton>
				<IonTabButton tab="output" href="/wg/output">
					<IonIcon icon={documentTextOutline} />
					<IonLabel>Output</IonLabel>
				</IonTabButton>
				<IonTabButton tab="settings" href="/wg/settings">
					<IonIcon icon={optionsOutline} />
					<IonLabel>Settings</IonLabel>
				</IonTabButton>
			</IonTabBar>
		</IonTabs>
	);
};
 
export default WG;
