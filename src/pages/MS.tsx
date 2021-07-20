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
	enterOutline,
	exitOutline,
	megaphoneOutline
} from 'ionicons/icons';
import WECategories from "./we/WEcategories";
import WETransforms from "./we/WEtransforms";
import WESounds from "./we/WEsounds";
import WEInput from "./we/WEinput";
import WEOutput from "./we/WEoutput";
import Syntax from "./Syntax";
import { shallowEqual, useSelector } from "react-redux";


const WE = () => {
	const MSpage = useSelector((state: any) => state.viewState.ms, shallowEqual) || "syntax";
	return (
		<IonTabs>
			<IonRouterOutlet>
				<Redirect exact={true} path="/ms" to={"/ms/" + MSpage} />
				<Redirect exact={true} path="/ms/" to={"/ms/" + MSpage} />
				{/*
					Using the render method prop cuts down the number of renders your components will have due to route changes.
					Use the component prop when your component depends on the RouterComponentProps passed in automatically.
				*/}
				<Route path="/ms/syntax" render={() => <Syntax title="4" />} exact={true} />
				<Route path="/ms/input" render={() => <WEInput />} exact={true} />
				<Route path="/ms/categories" render={() => <WECategories />} exact={true} />
				<Route path="/ms/transformations" render={() => <WETransforms />} exact={true} />
				<Route path="/ms/soundchanges" render={() => <WESounds />} exact={true} />
				<Route path="/ms/output" render={() => <WEOutput />} exact={true} />
			</IonRouterOutlet>
			<IonTabBar slot="bottom">
				<IonTabButton tab="syntax" href="/ms/syntax">
					<IonIcon icon={enterOutline} />
					<IonLabel>Syntax</IonLabel>
				</IonTabButton>
				<IonTabButton tab="input" href="/ms/input">
					<IonIcon icon={enterOutline} />
					<IonLabel>Input</IonLabel>
				</IonTabButton>
				<IonTabButton tab="categories" href="/ms/categories">
					<IonIcon icon={libraryOutline} />
					<IonLabel>Characters</IonLabel>
				</IonTabButton>
				<IonTabButton tab="transformations" href="/ms/transformations">
					<IonIcon icon={syncOutline} />
					<IonLabel>Transforms</IonLabel>
				</IonTabButton>
				<IonTabButton tab="soundchanges" href="/ms/soundchanges">
					<IonIcon icon={megaphoneOutline} />
					<IonLabel>Sound Changes</IonLabel>
				</IonTabButton>
				<IonTabButton tab="output" href="/ms/output">
					<IonIcon icon={exitOutline} />
					<IonLabel>Output</IonLabel>
				</IonTabButton>
			</IonTabBar>
		</IonTabs>
	);
};

export default WE;
