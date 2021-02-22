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
import WEHome from "./we/WEhome";
import { shallowEqual, useSelector } from "react-redux";
import './App.css';


const WE = () => {
	const WEpage = useSelector((state: any) => state.viewState.we, shallowEqual) || "home";
	return (
		<IonTabs>
			<IonRouterOutlet>
				<Redirect exact={true} path="/we" to={"/we/" + WEpage} />
				<Redirect exact={true} path="/we/" to={"/we/" + WEpage} />
				{/*
					Using the render method prop cuts down the number of renders your components will have due to route changes.
					Use the component prop when your component depends on the RouterComponentProps passed in automatically.
				*/}
				<Route path="/we/input" render={() => <WEInput />} exact={true} />
				<Route path="/we/categories" render={() => <WECategories />} exact={true} />
				<Route path="/we/transformations" render={() => <WETransforms />} exact={true} />
				<Route path="/we/soundchanges" render={() => <WESounds />} exact={true} />
				<Route path="/we/output" render={() => <WEOutput />} exact={true} />
				<Route path="/we/home" render={() => <WEHome />} exact={true}  />
			</IonRouterOutlet>
			<IonTabBar slot="bottom">
				<IonTabButton tab="home" href="/we/home">
					<IonIcon icon={informationCircleOutline} />
					<IonLabel>Info</IonLabel>
				</IonTabButton>
				<IonTabButton tab="input" href="/we/input">
					<IonIcon icon={chevronDownCircleOutline} />
					<IonLabel>Input</IonLabel>
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
				<IonTabButton tab="output" href="/we/output">
					<IonIcon icon={chevronUpCircleOutline} />
					<IonLabel>Output</IonLabel>
				</IonTabButton>
			</IonTabBar>
		</IonTabs>
	);
};

export default WE;
