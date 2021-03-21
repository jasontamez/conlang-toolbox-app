import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import {
	IonApp,
	IonRouterOutlet,
	IonSplitPane
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Menu from './components/Menu';

import About from "./pages/About";
import WG from "./pages/WG";
import WE from "./pages/WE";
import Lexicon from "./pages/Lex";
import Settings from "./pages/AppSettings";
import Credits from './pages/Credits';

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
import './theme/variables.css';
/* My theming */
import './theme/App.css';

import { checkIfState, initialAppState } from './components/ReduxDucks';
import { overwriteState } from './components/ReduxDucksFuncs';
import { VERSION } from './components/ReduxDucksConst';
import compareVersions from 'compare-versions';
import store from './components/ReduxStore';
import { StateStorage } from './components/PersistentInfo';


const App = () => {
	const maybeSetState = () => {
		return (dispatch: any) => {
			return StateStorage.getItem("lastState").then((storedState: any) => {
				if(storedState !== null) {
					if(storedState && (typeof storedState) === "object") {
						if (compareVersions.compare(storedState.currentVersion, VERSION.current, "<")) {
							// Do stuff to possibly bring storedState up to date
							storedState.currentVersion = VERSION.current;
						}
						if(checkIfState(storedState)) {
							return dispatch(overwriteState(storedState));
						}
					}
				}
				return dispatch(overwriteState(initialAppState));
			});
		}
	};
	store.dispatch(maybeSetState());
	return (
		<IonApp id="conlangToolbox">
			<IonReactRouter>
				<IonSplitPane contentId="main" when="xl">
					<Menu />
					{/*
						Using the render method prop cuts down the number of renders your components
						will have due to route changes. Use the component prop when your component
						depends on the RouterComponentProps passed in automatically.
					*/}
					<IonRouterOutlet id="main">
						<Route path="/wg" render={() => <WG />} />
						<Route path="/we"  render={() => <WE />} />
						<Route path="/lex" render={() => <Lexicon />} />
						<Route path="/settings" render={() => <Settings />} />
						<Route path="/about" render={() => <About />} />
						<Route path="/credits" render={() => <Credits />} />
						<Redirect exact={true} from="/" to="/about" />
					</IonRouterOutlet>
				</IonSplitPane>
			</IonReactRouter>
		</IonApp>
	);
};

export default App;
