import React, { useEffect, useState, memo, useMemo } from 'react';
import { Route, useHistory } from 'react-router-dom';
import {
	IonApp,
	IonRouterOutlet,
	IonSplitPane
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { App as Capacitor, BackButtonListenerEvent } from '@capacitor/app';

import Menu from './components/Menu';

import About from "./pages/About";
import WordLists from "./pages/WordLists";
import WG from "./pages/WG";
import WE from "./pages/WE";
import MS from "./pages/MS";
import Lexicon from "./pages/Lex";
import Settings from "./pages/AppSettings";
import Credits from './pages/Credits';
import Info from './pages/AppInfo';
import fireSwal from './components/Swal';

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
import { addToLog, overwriteState } from './components/ReduxDucksFuncs';
import { VERSION } from './components/ReduxDucksConst';
import compareVersions from 'compare-versions';
import store from './components/ReduxStore';
import { StateStorage } from './components/PersistentInfo';
import { useDispatch } from 'react-redux';
import modalPropertiesFunc from './components/ModalProperties';

interface HistoryObject {
	pathname: string,
	search: string,
	hash: string,
	key?: string
};
type Method = "POP" | "PUSH" | "REPLACE";

const MainOutlet = memo(() => {
	const history = useHistory();
	const [modals, setModals] = useState<Function[]>([]);
	const [pages, setPages] = useState<string[]>([]);
	const dispatch = useDispatch();
	const modalPropsMaker = useMemo(() => modalPropertiesFunc(modals, setModals, dispatch), [modals, setModals, dispatch]);
	const defaultProps = {
		modalPropsMaker
	};
		return history.listen((info: HistoryObject, method: Method) => {
			console.log(`@ ${method} ${JSON.stringify(info)}`);
			switch (method) {
				case "POP":
					// We hit the back button
					setPages(pages.slice(1));
					break;
				case "PUSH":
					// Navigation
					const newPages = [info.pathname, ...pages];
					setPages(newPages.slice(0, 50));
					break;
				case "REPLACE":
					// ignore?
			}
		});
	}, [history, pages]);
	useEffect((): (() => void) => {
		return Capacitor.addListener('backButton', (ev: BackButtonListenerEvent) => {
			if(modals.length) {
				dispatch(addToLog("Attempting to close modal."));
				// Get last modal
				const [last, ...rest] = modals;
				// Save remaining modals
				setModals(rest);
				// Close last modal
				last(false);
				console.log("!closed modal");
			} else if (pages.length > 0) {
				dispatch(addToLog("Navigating backward."));
				// go back
				history.go(-1);
				console.log("!back");
			} else {
				// exit app?
				dispatch(addToLog("Possibly exiting?"));
				console.log("!!exit");
				fireSwal({
					title: "Exit App?",
					text: "Do you want to exit the app?",
					icon: 'warning',
					showCancelButton: true,
					confirmButtonText: "Yes, exit."
				}).then((result: any) => {
					if(result.isConfirmed) {
						// Exit app!
						Capacitor.exitApp();
					} else {
						dispatch(addToLog("Did not exit."));
					}
				});
			}
		}).remove;
	}, [history, modals, pages.length, dispatch]);
	const defaultProps = {
		modals,
		setModals
	};
	return (
		<IonRouterOutlet>
			<Route path="/wg" render={() => <WG {...defaultProps} />} />
			<Route path="/we"  render={() => <WE {...defaultProps} />} />
			<Route path="/lex" render={() => <Lexicon {...defaultProps} />} />
			<Route path="/ms" render={() => <MS {...defaultProps} />} />
			<Route path="/appinfo" render={() => <Info {...defaultProps} />} />
			<Route path="/settings" render={() => <Settings {...defaultProps} />} />
			<Route path="/wordlists" render={() => <WordLists {...defaultProps} />} />
			<Route path="/credits" render={() => <Credits {...defaultProps} />} />
			<Route exact={true} path="/" render={() => <About {...defaultProps} />} />
		</IonRouterOutlet>
	);
});

const App = memo(() => {
	const maybeSetState = () => {
		return (dispatch: any) => {
			return StateStorage.getItem("lastState").then((storedState: any) => {
				if(storedState !== null) {
					if(storedState && (typeof storedState) === "object") {
						if (compareVersions.compare(storedState.currentVersion, "0.9.4", "<")) {
							// Do stuff to possibly bring storedState up to date
							storedState.logs = [];
						}
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
		<IonApp>
			<IonReactRouter>
				<IonSplitPane contentId="main" when="xl">
					<Menu />
					{/*
						Using the render method prop cuts down the number of renders your components
						will have due to route changes. Use the component prop when your component
						depends on the RouterComponentProps passed in automatically.
					*/}
					<IonRouterOutlet id="main">
						<Route path="/" render={() => <MainOutlet />} />
					</IonRouterOutlet>
				</IonSplitPane>
			</IonReactRouter>
		</IonApp>
	);
});

export default App;
