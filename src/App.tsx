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

/* WebfontLoader config */
const WFLconfig = {
	google: {
		families: ['Noto Sans:400,400i,700,700i:latin,cyrillic,cyrillic-ext,greek,greek-ext,latin-ext', 'sans-serif'],
	}
};

const App = () => (
	<WebfontLoader config={WFLconfig}>
		<IonApp id="conlangToolbox">
			<IonReactRouter>
				<IonSplitPane contentId="main" when="xl">
					<Menu />
					<IonRouterOutlet id="main">
						<Route path="/wg" render={() => <WG />} />
						<Route path="/we"  render={() => <WE />} />
						<Route path="/ls" component={WG} />
						<Route path="/" component={HomePage} exact={true} />
					</IonRouterOutlet>
				</IonSplitPane>
			</IonReactRouter>
		</IonApp>
	</WebfontLoader>
);

export default App;
