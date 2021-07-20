import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import {
	IonLabel,
	IonTabBar,
	IonTabButton,
	IonTabs,
	IonRouterOutlet
} from '@ionic/react';
import MS01 from "./ms/ms01";
import MS02 from "./ms/ms02";
import { shallowEqual, useSelector } from "react-redux";


const MS = () => {
	const msPage: string = useSelector((state: any) => state.viewState.ms, shallowEqual) || "ms01";
	const page = Number(msPage.slice(-2));
	const makeTab = (n: number) => {
		if(n < 1) {
			return (
				<IonTabButton key={n} tab={"Section " + String(n)} layout="icon-hide" disabled={true}>
					<IonLabel>...</IonLabel>
				</IonTabButton>
			);
		}
		let goto: string = String(n);
		while(goto.length < 2) {
			goto = "0" + goto;
		}
		return (
			<IonTabButton key={n} tab={"Section " + String(n)} layout="icon-hide" href={"/ms/ms" + goto}>
				<IonLabel>{n}</IonLabel>
			</IonTabButton>
		);
	};
	const makeTabs = (page: number) => {
		let min = Math.max(page - 3, 1);
		let max = min + 5;
		while(max > 10) {
			max--;
			min--;
		}
		let range = [];
		if(min > 1) {
			range.push(0);
		}
		while(min <= max) {
			range.push(min);
			min++;
		}
		if(max < 10) {
			range.push(-1);
		}
//		console.log(page);
//		console.log(range);
		return (
			<IonTabBar className="iconsOnly" slot="bottom">
				{range.map((n: number) => {
					return makeTab(n);
				})}
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
				<Route path="/ms/ms01" render={() => <MS01 />} exact={true} />
				<Route path="/ms/ms02" render={() => <MS02 />} exact={true} />
				{/*
				<Route path="/ms/ms03" render={() => <MS03 />} exact={true} />
				<Route path="/ms/ms04" render={() => <MS04 />} exact={true} />
				<Route path="/ms/ms05" render={() => <MS05 />} exact={true} />
				<Route path="/ms/ms06" render={() => <MS06 />} exact={true} />
				<Route path="/ms/ms07" render={() => <MS07 />} exact={true} />
				<Route path="/ms/ms08" render={() => <MS08 />} exact={true} />
				<Route path="/ms/ms09" render={() => <MS09 />} exact={true} />
				<Route path="/ms/ms10" render={() => <MS10 />} exact={true} />
				*/}
			</IonRouterOutlet>
			{makeTabs(page)}
		</IonTabs>
	);
};

export default MS;
