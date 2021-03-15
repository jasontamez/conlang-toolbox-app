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
	fileTrayStackedOutline
} from 'ionicons/icons';
import { shallowEqual, useSelector } from "react-redux";
import WGCategories from "./wg/WGcategories";
import WGRewrites from "./wg/WGrewrites";
import WGSyllables from "./wg/WGsyllables";
import WGOutput from "./wg/WGoutput";
import WGSettings from "./wg/WGsettings";


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
				<Route path="/wg/categories" render={() => <WGCategories /> } exact={true} />
				<Route path="/wg/syllables" render={() => <WGSyllables />} exact={true} />
				<Route path="/wg/rewriterules" render={() => <WGRewrites />} exact={true} />
				<Route path="/wg/output" render={() => <WGOutput />} exact={true} />
				<Route path="/wg/settings" render={() => <WGSettings />} exact={true} />
			</IonRouterOutlet>
			<IonTabBar slot="bottom">
				<IonTabButton tab="categories" href="/wg/categories">
					<IonIcon icon={fileTrayStackedOutline} />
					<IonLabel>Character Groups</IonLabel>
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
