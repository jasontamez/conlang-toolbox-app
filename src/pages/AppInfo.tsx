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
import Markdown from 'react-markdown';
import { useWindowWidth } from '@react-hook/window-size/throttled';

import { InternalState, PageData, StateObject, ThemeNames } from '../store/types';
import { clearLogs } from '../store/internalsSlice';
import useTranslator from '../store/translationHooks';

import yesNoAlert from '../components/yesNoAlert';
import toaster from '../components/toaster';
import Header from '../components/Header';
import copyText from '../components/copyText';

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
					handler: () => copyText(info, toast)
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
					handler: () => copyText(info, toast)
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
			<Header title={tc("exportThing", { thing: tc("App Info") })} />
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
											<IonLabel className="ion-text-center ion-text-wrap overrideMarkdown">
												<Markdown>{t("credit1")}</Markdown>
											</IonLabel>
										</IonItem>
										<IonItem>
											<IonLabel className="ion-text-center ion-text-wrap overrideMarkdown">
												<Markdown>{t("credit2")}</Markdown>
											</IonLabel>
										</IonItem>
										<IonItem>
											<IonLabel className="ion-text-center ion-text-wrap overrideMarkdown">
												<Markdown>{t("credit3")}</Markdown>
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
									<div className="ion-text-center overrideCenter">
										<Markdown>{t("bugReportMsg")}</Markdown>
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
								<IonCardContent className="ion-padding-start changelog">
									<h2 className="ion-text-center" onClick={maybeDebug}><strong>v.0.11.3</strong></h2>
									<Markdown>{t("changelog.v0113", { joinArrays: "\n"})}</Markdown>
									<div id="changelogButtonContainer" className="ion-text-center">
										<IonButton
											onClick={() => {setShowOlder(!showOlder)}}
											fill="outline"
											color={showOlder ? "secondary" : "tertiary"}
										>
											<IonLabel>{t(showOlder ? "Hide Older Changes" : "Show Older Changes")}</IonLabel>
										</IonButton>
									</div>
									<div className={showOlder ? "" : "hide"}>
										<h2 className="ion-text-center"><strong>v.0.10.1</strong></h2>
										<Markdown>{t("changelog.v0101", { joinArrays: "\n"})}</Markdown>
										<h2 className="ion-text-center"><strong>v.0.9.5</strong></h2>
										<Markdown>{t("changelog.v095", { joinArrays: "\n"})}</Markdown>
										<h2 className="ion-text-center"><strong>v.0.9.4</strong></h2>
										<Markdown>{t("changelog.v094", { joinArrays: "\n"})}</Markdown>
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
