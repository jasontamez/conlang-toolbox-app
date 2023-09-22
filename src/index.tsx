import React from 'react';
import { Provider } from "react-redux";
import { SplashScreen } from '@capacitor/splash-screen';
import { setupIonicReact } from '@ionic/react';
import { createRoot } from 'react-dom/client';
import App from './App';
import * as serviceWorker from './serviceWorker';
import storeInfo from "./store/store";
import { PersistGate } from 'redux-persist/integration/react';

const {store, persistor} = storeInfo;

setupIonicReact({});

// Hide the splash (you should do this on app launch)
SplashScreen.hide();

const root = createRoot(document.getElementById('root'));
root.render(
	<Provider store={store}>
		<PersistGate loading={null} persistor={persistor}>
			<App />
		</PersistGate>
	</Provider>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
