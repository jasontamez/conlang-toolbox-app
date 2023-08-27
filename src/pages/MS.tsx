import React, { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
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
import { chevronBackCircle, chevronForwardCircle, settingsSharp } from 'ionicons/icons';
import { PageData } from '../components/ReduxDucksTypes';

const range = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
function decrease (n: number) {
	return Math.max(n - 2, 2);
}
function increase (n: number) {
	return Math.min(n + 2, 8);
}

const MS = (props: PageData) => {
	const msPage: string = useSelector((state: any) => state.viewState.ms, shallowEqual) || "msSettings";
	const page = Number(msPage.slice(-2)) || 0;
	// 'center' should not fall more that two places from an edge
	const [center, setCenter] = useState<number>(Math.min(Math.max(page, 2), 8));
	const [min, setMin] = useState<number>(0);
	const [max, setMax] = useState<number>(10);
	useEffect(() => {
		setMin(center - 2);
		setMax(center + 2);
	}, [center]);
	const makeTab = (n: number) => {
		let goto: string = "Settings";
		if(n > 0) {
			goto = String(n);
			while(goto.length < 2) {
				goto = "0" + goto;
			}
		}
		return (
			<IonTabButton className={n < min || n > max ? "possiblyTooFar" : ""} key={n} tab={"Section-" + goto} layout="icon-hide" href={"/ms/ms" + goto}>
				<IonLabel>{n > 0 ? (<strong>{n}</strong>) : (<IonIcon style={ {verticalAlign: "middle"} } icon={settingsSharp} />)}</IonLabel>
			</IonTabButton>
		);
	};
	return (
		<IonTabs>
			<IonRouterOutlet>
				{/*
					Using the render method prop cuts down the number of renders your components will have due to route changes.
					Use the component prop when your component depends on the RouterComponentProps passed in automatically.
				*/}
				<Route path="/ms/msSettings" render={() => <MSSettings {...props} />} exact={true} />
				<Route path="/ms/ms01" render={() => <MS01 {...props} />} exact={true} />
				<Route path="/ms/ms02" render={() => <MS02 {...props} />} exact={true} />
				<Route path="/ms/ms03" render={() => <MS03 {...props} />} exact={true} />
				<Route path="/ms/ms04" render={() => <MS04 {...props} />} exact={true} />
				<Route path="/ms/ms05" render={() => <MS05 {...props} />} exact={true} />
				<Route path="/ms/ms06" render={() => <MS06 {...props} />} exact={true} />
				<Route path="/ms/ms07" render={() => <MS07 {...props} />} exact={true} />
				<Route path="/ms/ms08" render={() => <MS08 {...props} />} exact={true} />
				<Route path="/ms/ms09" render={() => <MS09 {...props} />} exact={true} />
				<Route path="/ms/ms10" render={() => <MS10 {...props} />} exact={true} />
			</IonRouterOutlet>
			<IonTabBar className="iconsOnly" slot="bottom">
				<IonTabButton
					className="moreIndicators"
					tab="more to left"
					layout="label-hide"
					onClick={() => setCenter(decrease(center))}
					disabled={center <= 2}
				>
					<IonIcon icon={chevronBackCircle} style={ {verticalAlign: "middle"} } />
				</IonTabButton>
				{range.map((n: number) => {
					return makeTab(n);
				})}
				<IonTabButton
					className="moreIndicators"
					tab="more to right"
					layout="label-hide"
					onClick={() => setCenter(increase(center))}
					disabled={center >= 8}
				>
					<IonIcon icon={chevronForwardCircle} style={ {verticalAlign: "middle"} } />
				</IonTabButton>
			</IonTabBar>
		</IonTabs>
	);
};

export default MS;
