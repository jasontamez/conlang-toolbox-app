import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import {
	IonLabel,
	IonTabBar,
	IonTabButton,
	IonTabs,
	IonRouterOutlet,
	IonIcon
} from '@ionic/react';
import MSSettings from "./ms/msSettings";
import MS01 from "./ms/ms01";
import MS02 from "./ms/ms02";
import MS03 from "./ms/ms03";
import MS04 from "./ms/ms04";
import MS05 from "./ms/ms05";
import MS06 from "./ms/ms06";
import MS07 from "./ms/ms07";
import MS08 from "./ms/ms08";
import MS09 from "./ms/ms09";
import MS10 from "./ms/ms10";
import { shallowEqual, useSelector } from "react-redux";
import './ms/MS.css';
import { settingsSharp } from 'ionicons/icons';


const MS = () => {
	const msPage: string = useSelector((state: any) => state.viewState.ms, shallowEqual) || "msSettings";
	const page = Number(msPage.slice(-2));
	const makeTab = (n: number, min: number, max: number) => {
		let goto: string = "Settings";
		if(n > 0) {
			goto = String(n);
			while(goto.length < 2) {
				goto = "0" + goto;
			}
		}
		return (
			<IonTabButton className={n < min || n > max ? "possiblyTooFar" : ""} key={n} tab={"Section " + goto} layout="icon-hide" href={"/ms/ms" + goto}>
				<IonLabel>{n > 0 ? (<strong>{n}</strong>) : (<IonIcon style={ {verticalAlign: "middle"} } icon={settingsSharp} />)}</IonLabel>
			</IonTabButton>
		);
	};
	const makeTabs = (page: number) => {
		let min = Math.max(page - 2, 0);
		let max = min + 4;
		while(max > 10) {
			max--;
			min--;
		}
		let range = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
//		console.log(page);
//		console.log(range);
		return (
			<IonTabBar className="iconsOnly" slot="bottom">
				<IonTabButton className="moreIndicators" tab="more to left" layout="icon-hide" disabled={true}>
					<IonLabel><strong>&lt;&lt;&lt;</strong></IonLabel>
				</IonTabButton>
				{range.map((n: number) => {
					return makeTab(n, min, max);
				})}
				<IonTabButton className="moreIndicators" tab="more to right" layout="icon-hide" disabled={true}>
					<IonLabel><strong>&gt;&gt;&gt;</strong></IonLabel>
				</IonTabButton>
			</IonTabBar>
		);
	};
	return (
		<IonTabs>
			<IonRouterOutlet>
				<Redirect exact={true} path="/ms" to={"/ms/" + msPage} />
				<Redirect exact={true} path="/ms/" to={"/ms/" + msPage} />
				{/*
					Using the render method prop cuts down the number of renders your components will have due to route changes.
					Use the component prop when your component depends on the RouterComponentProps passed in automatically.
				*/}
				<Route path="/ms/msSettings" render={() => <MSSettings />} exact={true} />
				<Route path="/ms/ms01" render={() => <MS01 />} exact={true} />
				<Route path="/ms/ms02" render={() => <MS02 />} exact={true} />
				<Route path="/ms/ms03" render={() => <MS03 />} exact={true} />
				<Route path="/ms/ms04" render={() => <MS04 />} exact={true} />
				<Route path="/ms/ms05" render={() => <MS05 />} exact={true} />
				<Route path="/ms/ms06" render={() => <MS06 />} exact={true} />
				<Route path="/ms/ms07" render={() => <MS07 />} exact={true} />
				<Route path="/ms/ms08" render={() => <MS08 />} exact={true} />
				<Route path="/ms/ms09" render={() => <MS09 />} exact={true} />
				<Route path="/ms/ms10" render={() => <MS10 />} exact={true} />
			</IonRouterOutlet>
			{makeTabs(page)}
		</IonTabs>
	);
};

export default MS;
