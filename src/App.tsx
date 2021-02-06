import React from 'react';
import { Route } from 'react-router-dom';
import {
	IonApp,
	IonRouterOutlet,
	IonSplitPane
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Menu from './components/Menu';

import HomePage from "./pages/HomePage";
import WG from "./pages/WG";
import WE from "./pages/WE";
import Settings from "./pages/AppSettings";

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

/* Google webfontloader */
//import { render } from 'react-dom';
import WebfontLoader from '@dr-kobros/react-webfont-loader';

/* Theme variables */
import './theme/variables.css';

import { checkIfState, initialAppState } from './components/ReduxDucks';
import { overwriteState } from './components/ReduxDucksFuncs';
import { VERSION } from './components/ReduxDucksConst';
import compareVersions from 'compare-versions';
import store from './components/ReduxStore';
import { Plugins } from '@capacitor/core';


/* WebfontLoader config */
const WFLconfig = {
	google: {
		families: ['Noto Sans:400,400i,700,700i:latin,cyrillic,cyrillic-ext,greek,greek-ext,latin-ext', 'sans-serif'],
	}
};

const App = () => {
	const { Storage } = Plugins;
	const maybeSetState = () => {
		return (dispatch: any) => {
			return Storage.get({ key: "currentState" }).then((result) => {
				const value = result.value;
				if(value !== null) {
					const state = JSON.parse(value);
					if(state && typeof state === "object") {
						state.currentVersion = VERSION.current;
						if (compareVersions.compare(state.currentVersion, VERSION.current, "<")) {
							// Do stuff to possibly bring state up to date
						}
						if(checkIfState(state)) {
							console.log("State found");
							return dispatch(overwriteState(state));
						}
					}
				}
				console.log("No state found");
				return dispatch(overwriteState(initialAppState));
			});
		}
	};
	store.dispatch(maybeSetState());
	return (
		<WebfontLoader config={WFLconfig}>
			<IonApp id="conlangToolbox">
				<IonReactRouter>
					<IonSplitPane contentId="main" when="xl">
						<Menu />
						<IonRouterOutlet id="main">
							<Route path="/wg" render={() => <WG />} />
							<Route path="/we"  render={() => <WE />} />
							<Route path="/ls" component={WG} />
							<Route path="/settings" render={() => <Settings />} />
							<Route path="/about" component={WG} />
							<Route path="/" component={HomePage} exact={true} />
						</IonRouterOutlet>
					</IonSplitPane>
				</IonReactRouter>
			</IonApp>
		</WebfontLoader>
	)
};

export default App;
