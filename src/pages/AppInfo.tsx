import React, { useState } from 'react';
import {
	IonPage,
	IonGrid,
	IonRow,
	IonCol,
	IonLabel,
	IonCard,
	IonCardHeader,
	IonCardContent,
	IonContent,
	IonList,
	IonItem,
	IonCardTitle,
	useIonAlert,
	useIonToast,
	IonButton
} from '@ionic/react';
import { useDispatch, useSelector } from "react-redux";
import { Clipboard } from '@capacitor/clipboard';
import { useWindowWidth } from '@react-hook/window-size/throttled';

import { InternalState, PageData, StateObject, ThemeNames } from '../store/types';
import { clearLogs } from '../store/internalsSlice';
import useTranslator from '../store/translationHooks';

import yesNoAlert from '../components/yesNoAlert';
import toaster from '../components/toaster';
import Header from '../components/Header';

function getBannerDimensions (windowWidth: number) {
	// original banner size: 545x153
	// original reduced banner size: 144x40 (which is about 26.422%x26.144%, for some reason)
	const w = 545;
	const h = 153;
	let width = w;
	let ratio = 1;
	// Max should be half the width or a quarter of the banner size, whichever is greater
	const max = Math.max(w / 4, windowWidth / 2);
	while(width > max) {
		ratio -= 0.05;
		width = w * ratio;
	}
	return {width: `${Math.round(width)}px`, height: `${Math.round(h * ratio)}px`};
}

const AppInfo = (props: PageData) => {
	const width = useWindowWidth();
	const [ t ] = useTranslator('appinfo');
	const [ tc ] = useTranslator('common');
	const [originalTheme, internals, state]: [ThemeNames, InternalState, StateObject] = useSelector(
		(state: StateObject) => [state.appSettings.theme, state.internals, state]
	);
	const dispatch = useDispatch();
	const [debug, setDebug] = useState<number>(1);
	const [showOlder, setShowOlder] = useState<boolean>(false);
	const [doAlert, undoAlert] = useIonAlert();
	const toast = useIonToast();
	const theme = originalTheme.replace(/ /g, "") + "Theme";

	const maybeDebug = () => {
		if(debug < 7) {
			setDebug(debug + 1);
			return;
		}
		setDebug(1);
		const info = JSON.stringify(state);
		doAlert({
			header: t("Entire State"),
			message: info,
			cssClass: "warning",
			buttons: [
				{
					text: tc("Copy"),
					cssClass: "submit",
					handler: () => Clipboard.write({string: info}).then(() => toaster({
						message: tc("Copied to clipboard"),
						position: "middle",
						duration: 1500,
						toast
					}))
				},
				{
					text: tc("Ok"),
					role: "cancel",
					cssClass: "cancel"
				}
			]
		});
	};

	const showLogs = () => {
		const info = JSON.stringify(internals);
		doAlert({
			header: t("Debug Info"),
			message: info,
			cssClass: "warning",
			buttons: [
				{
					text: t("Copy Logs"),
					cssClass: "submit",
					handler: () => Clipboard.write({string: info}).then(() => toaster({
						message: tc("Copied to clipboard"),
						position: "middle",
						duration: 1500,
						toast
					}))
				},
				{
					text: t("Clear Logs"),
					cssClass: "danger",
					handler: () => {
						undoAlert().then(() => yesNoAlert({
							header: tc("areYouSure"),
							message: t("Logs normally delete themselves after 90 days. Deleting logs this way cannot be undone."),
							submit: t("Delete Them Now"),
							cssClass: "danger",
							handler: () => {
								dispatch(clearLogs());
								toaster({
									message: t("Logs have been cleared."),
									duration: 3500,
									color: "danger",
									toast
								});
							},
							doAlert
						}))
					}
				},
				{
					text: tc("Close"),
					role: "cancel",
					cssClass: "cancel"
				}
			]
		});
	};

	return (
		<IonPage className={theme}>
			<Header title={tc("App Info")} />
			<IonContent className="containedCards">
				<IonGrid>
					<IonRow>
						<IonCol>
							<IonCard>
								<IonCardHeader className="ion-text-center">
									<IonCardTitle className="ion-align-self-start">{t("Credits and Acknowledgements")}</IonCardTitle>
								</IonCardHeader>
								<IonCardContent>
									<IonList className="ion-text-center" lines="full">
										<IonItem>
											<IonLabel className="ion-text-center ion-text-wrap">
												{t("credits.toolbox1")}<a href="https://thenounproject.com/term/toolbox/2586725/">{t("credits.toolbox2")}</a>{t("credits.toolbox3")}
											</IonLabel>
										</IonItem>
										<IonItem>
											<IonLabel className="ion-text-center ion-text-wrap">
												{t("credits.wgwe1")}<a href="http://www.zompist.com/gen.html">Gen</a>{t("credits.wgwe2")}<a href="https://www.zompist.com/sca2.html">SCA²</a>{t("credits.wgwe3")}
											</IonLabel>
										</IonItem>
										<IonItem>
											<IonLabel className="ion-text-center ion-text-wrap">
												{t("credits.ms1")}<i>{t("credits.ms2")}</i>{t("credits.ms3")}
											</IonLabel>
										</IonItem>
									</IonList>
								</IonCardContent>
							</IonCard>
						</IonCol>
					</IonRow>
					<IonRow>
						<IonCol>
							<IonCard>
								<IonCardHeader className="ion-text-center">
									<IonCardTitle>{t("Bug Reports")}</IonCardTitle>
								</IonCardHeader>
								<IonCardContent id="bugReport">
									<div className="ion-text-center">
										{t("bugReport1")}<a href="mailto:jasontankapps@gmail.com">jasontankapps@gmail.com</a>{t("bugReport2")}
									</div>
									<div className="ion-text-center">
										<IonButton size="small" onClick={showLogs} color="warning" fill="outline">{t("Get Error Log")}</IonButton>
									</div>
								</IonCardContent>
							</IonCard>
						</IonCol>
					</IonRow>
					<IonRow>
						<IonCol>
							<IonCard id="changelog">
								<IonCardHeader className="ion-text-center">
									<IonCardTitle>{t("Changelog")}</IonCardTitle>
								</IonCardHeader>
								<IonCardContent className="ion-padding-start">
									<h2 className="ion-text-center" onClick={maybeDebug}><strong>v.0.11.3</strong></h2>
									<ul className="changelog">
										<li>{t("changelog.v0113p1")}</li>
										<li>{t("changelog.v0113p2")}</li>
										<li>{t("changelog.v0113p3p1")}<strong>{tc("Declenjugator")}</strong>{t("changelog.v0113p3p1")}</li>
										<li>{t("changelog.v0113p4")}</li>
										<li>{t("changelog.v0113p5")}</li>
										<li>{t("changelog.v0113p6")}</li>
										<li><em>{tc("MorphoSyntax")}</em>
											<ul>
												<li>{t("changelog.v0113p7")}</li>
												<li>{t("changelog.v0113p8")}</li>
											</ul>
										</li>
										<li><em>{t("Bugs fixed")}</em>
											<ul>
												<li>{t("changelog.v0113p9")}</li>
												<li>{t("changelog.v0113p10")}</li>
												<li>{t("changelog.v0113p11")}</li>
												<li>{t("changelog.v0113p12")}</li>
												<li>{t("changelog.v0113p13")}</li>
											</ul>
										</li>
									</ul>
									<div id="changelogButtonContainer" className="ion-text-center">
										<IonButton
											onClick={() => {setShowOlder(!showOlder)}}
											fill="outline"
											color={showOlder ? "secondary" : "tertiary"}
										>
											<IonLabel>{showOlder ? t("Hide Older Changes") : t("Show Older Changes")}</IonLabel>
										</IonButton>
									</div>
									<div className={showOlder ? "" : "hide"}>
										<h2 className="ion-text-center"><strong>v.0.10.1</strong></h2>
										<ul className="changelog">
											<li>{t("changelog.v0101p1")}</li>
											<li>{t("changelog.v0101p2")}</li>
											<li>{t("changelog.v0101p3")}</li>
											<li>{t("changelog.v0101p4")}</li>
											<li>{t("changelog.v0101p5")}</li>
											<li>{t("changelog.v0101p6")}</li>
											<li>{t("changelog.v0101p7")}</li>
										</ul>
										<h2 className="ion-text-center"><strong>v.0.9.5</strong></h2>
										<ul className="changelog">
											<li>{t("changelog.v095p1")}</li>
											<li>{t("changelog.v095p2")}</li>
											<li>{t("changelog.v095p3")}</li>
											<li><em>{tc("MorphoSyntax")}</em>
												<ul><li>{t("changelog.v095p4")}</li></ul>
											</li>
											<li><em>{tc("WordGen")}</em>
												<ul><li>{t("changelog.v095p5")}</li></ul>
											</li>
											<li><em>{tc("Lexicon")}</em>
												<ul>
													<li>{t("changelog.v095p6")}</li>
													<li>{t("changelog.v095p7")}</li>
													<li>{t("changelog.v095p8")}</li>
													<li>{t("changelog.v095p9")}</li>
													<li>{t("changelog.v095p10")}</li>
													<li>{t("changelog.v095p11")}</li>
												</ul>
											</li>
											<li><em>{tc("Concepts")}</em>
												<ul>
													<li>{t("changelog.v095p12")}</li>
													<li>{t("changelog.v095p13")}</li>
												</ul>
											</li>
											<li>{t("changelog.v095p14")}</li>
										</ul>
										<h2 className="ion-text-center"><strong>v.0.9.4</strong></h2>
										<ul className="changelog">
											<li>{t("changelog.v094p1")}</li>
											<li>{t("changelog.v094p2")}</li>
											<li>{t("changelog.v094p3")}</li>
										</ul>
									</div>
								</IonCardContent>
							</IonCard>
						</IonCol>
					</IonRow>
					<IonRow>
						<IonCol>
							<div id="coffee" className="ion-text-center">
								<a href="https://www.buymeacoffee.com/jasontank">
									<img
										src="default-blue.webp"
										alt="Buy Me A Coffee"
										style={ getBannerDimensions(width) }
									/>
								</a>
							</div>
						</IonCol>
					</IonRow>
				</IonGrid>
			</IonContent>
		</IonPage>
	);
};

export default AppInfo;
