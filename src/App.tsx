import React, { useEffect, useState, memo, useMemo } from 'react';
import {
	Route
} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import compareVersions from 'compare-versions';
import {
	IonApp,
	IonRouterOutlet,
	IonSplitPane,
	useIonAlert,
	useIonRouter
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { App as Capacitor, BackButtonListenerEvent } from '@capacitor/app';
import { LanguageCode } from 'iso-639-1';

import { setDefaultSortLanguage } from './store/sortingSlice';

import Menu from './components/Menu';

import About from "./pages/About";
import ConceptsPage from "./pages/Concepts";
import WG from "./pages/WG";
import WE from "./pages/WE";
import MS from "./pages/MS";
import Lexicon from "./pages/Lex";
import Settings from "./pages/AppSettings";
import SortSettings from './pages/SortSettings';
import Info from './pages/AppInfo';

import doUpdate095 from './updaters/UpdateTo095';
import doUpdate0100 from './updaters/UpdateTo0100';

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

import { StateStorage } from './components/PersistentInfo';
import modalPropertiesFunc from './components/ModalProperties';
import yesNoAlert from './components/yesNoAlert';
import getLanguage from './components/getLanguage';

const MainOutlet = memo(() => {
	const [modals, setModals] = useState<Function[]>([]);
	const [doAlert] = useIonAlert();
	const dispatch = useDispatch();
	const modalPropsMaker = useMemo(() => modalPropertiesFunc(modals, setModals, dispatch), [modals, setModals, dispatch]);
	const defaultProps = {
		modalPropsMaker
	};
	useEffect(() => {
		getLanguage().then(result => {
			if(result) {
				dispatch(setDefaultSortLanguage(result.slice(0, 2) as LanguageCode));
			}
		});
	}, [dispatch]);
	const navigator = useIonRouter();
	useEffect((): (() => void) => {
		// NOTE: Back Button will automatically go back in history for us.
		return Capacitor.addListener('backButton', (ev: BackButtonListenerEvent) => {
			if(modals.length) {
				// Close an open modal
//				dispatch(addToLog("Attempting to close modal."));
				// Get last modal
				const [last, ...rest] = modals;
				// Save remaining modals
				setModals(rest);
				// Close last modal
				last(false);
/*			} else if (pages.length > 0) {
				dispatch(addToLog("Navigating backward?"));
				// go back
				history.go(-1);
				console.log("!back");
			} else {*/
			} else if (!navigator.canGoBack()) {
				// Are we trying to exit the app?
				yesNoAlert({
					header: "Exit App?",
					message: "Do you want to exit the app?",
					cssClass: "warning",
					submit: "Yes, exit!",
					handler: Capacitor.exitApp,
					doAlert
				});
			}
		}).remove;
	}, [modals, navigator, dispatch, doAlert]);
	return (
		<IonRouterOutlet>
			<Route path="/wg" render={() => <WG {...defaultProps} />} />
			<Route path="/we" render={() => <WE {...defaultProps} />} />
			<Route path="/lex" render={() => <Lexicon {...defaultProps} />} />
			<Route path="/ms" render={() => <MS {...defaultProps} />} />
			<Route path="/appinfo" render={() => <Info {...defaultProps} />} />
			<Route path="/settings" render={() => <Settings {...defaultProps} />} />
			<Route path="/sortSettings" render={() => <SortSettings {...defaultProps} />} />
			<Route path="/wordlists" render={() => <ConceptsPage {...defaultProps} />} />
			<Route exact={true} path="/" render={() => <About {...defaultProps} />} />
		</IonRouterOutlet>
	);
});

const App = memo(() => {
	const dispatch = useDispatch();
	// useEffect should keep this from firing except once per session
	useEffect(() => {
		// 0.9.5 and older
		StateStorage.getItem("lastState").then((storedState: any) => {
			if(storedState !== null) {
				if(storedState && (typeof storedState) === "object") {
					if (compareVersions.compare(storedState.currentVersion, "0.9.5", "<")) {
						storedState = doUpdate095(storedState);
					}
					doUpdate0100(storedState, dispatch);
					// We're not doing global state again.
					StateStorage.removeItem("lastState");
				}
			}
		});
	}, [dispatch]);
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
