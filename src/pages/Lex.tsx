import React from 'react';
import {
	IonPage,
	IonContent,
	IonHeader,
	IonToolbar,
	IonTitle,
	IonButtons,
	IonButton,
	IonMenuButton,
	IonPopover,
	IonIcon,
	IonList,
	IonItem,
	IonLabel,
	IonInput,
	IonTextarea,
	IonSelect,
	IonSelectOption,
	IonGrid,
	IonRow,
	IonCol
} from '@ionic/react';
import {
	ellipsisVertical
} from 'ionicons/icons';
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import {
	openPopover,
	closePopover,
	updateLexicon
} from '../components/ReduxDucksFuncs';
import { LexiconObject, Lexicon } from '../components/ReduxDucksTypes';
import { $i } from '../components/DollarSignExports';
import ChooseThemeModal from './M-Theme';


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
import '../theme/variables.css';

const Lex = () => {
	const dispatch = useDispatch();
	const state = useSelector((state: any) => state, shallowEqual);
	const popstate = state.modalState.LexiconEllipsis;
	const lexicon = state.lexicon;
	const setNewInfo = (id: string, prop: keyof LexiconObject, index1: number = 0, index2: number = 0) => {
		const el = $i(id);
		const value = el.value;
		if(prop === "lexicon") {
			lexicon.lexicon[index1][index2] = value;
		} else if (prop === "sort") {
			lexicon.sort = [index1, index2];
		} else {
			lexicon[prop] = value;
		}
		dispatch(updateLexicon(lexicon));
	};
	const theOrder = lexicon.columnOrder;
	const theTitles = lexicon.columnTitles;
	const theSizes = lexicon.columnSizes;
	const doSort = () => {
		const el = $i("lexiconSort");
		const value = el.value;
		let [col, dir] = value.split("");
		console.log([col, dir]);
	};
	return (
		<IonPage>
			<ChooseThemeModal />
			<IonHeader>
				<IonToolbar>
					<IonButtons slot="start">
						<IonMenuButton />
					</IonButtons>
					<IonTitle>Lexicon</IonTitle>
					<IonPopover
						cssClass='my-custom-class'
						event={popstate}
						isOpen={popstate !== undefined}
						onDidDismiss={() => dispatch(closePopover('LexiconEllipsis'))}
					>
						<IonList>
							<IonItem>
								<IonLabel>New Lexicon</IonLabel>
							</IonItem>
							<IonItem>
								<IonLabel>Load Lexicon</IonLabel>
							</IonItem>
							<IonItem>
								<IonLabel>Save Lexicon</IonLabel>
							</IonItem>
							<IonItem>
								<IonLabel>Save Lexicon As...</IonLabel>
							</IonItem>
						</IonList>
					</IonPopover>
					<IonButtons slot="end">
						<IonButton onClick={(e: any) => { e.persist(); dispatch(openPopover('LexiconEllipsis', e)); }}>
							<IonIcon icon={ellipsisVertical} />
						</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen className="evenBackground" id="lexiconPage">
				<IonList lines="none">
					<IonItem>
						<IonLabel position="stacked" style={ {fontSize: "20px"} }>Lexicon Title:</IonLabel>
						<IonInput id="lexTitle" className="ion-margin-top" placeholder="Usually the language name." onIonBlur={() => setNewInfo("lexTitle", "lexicon")}></IonInput>
					</IonItem>
					<IonItem>
						<IonLabel position="stacked" style={ {fontSize: "20px"} }>Description:</IonLabel>
						<IonTextarea id="lexDesc" className="ion-margin-top" placeholder="A short description of this lexicon." rows={3} onIonBlur={() => setNewInfo("lexDesc", "description")} />
					</IonItem>
					<IonGrid id="theLexiconHeader">
						<IonRow>
							<IonCol>
								<h1>Words</h1>
							</IonCol>
							<IonCol size="auto">
								<IonSelect id="lexiconSort" interface="popover" value="00" onIonChange={doSort}>
									{theOrder.map((i: number) => {
										const title = theTitles[i];
										const which = i.toString();
										const ascdec = [0, 1];
										return ascdec.map((s: number) => {
											const arrow = [" 🠗", " 🠕"][s];
											const dir = s.toString();
											return (
												<IonSelectOption value={which + dir}>{title + arrow}</IonSelectOption>
											);
										});
									})}
								</IonSelect>
							</IonCol>
						</IonRow>
						{
							/* HOW DO WE MOVE COLUMNS?? */
							/* HOW DO WE MOVE COLUMNS?? */
							/* HOW DO WE MOVE COLUMNS?? */
						}
					</IonGrid>
					<IonItem id="theLexicon">
						<div className="lexRow lexHeader" style={ { order: -2 } }>
							{
								/* Need padding to match the [ADD] button */
							}
							{theOrder.map((i: number) => (
								<span className={theSizes[i]}>{theTitles[i]}</span>
							))}
							{
								/* Need padding to match the edit/delete buttons */
							}
						</div>
						<div className="lexRow" style={ { order: -1 } }>
							{
								/* Need some sort of [ADD] button here - addCircleSharp? */
							}
							{theOrder.map((i: number) => (
								<input className={theSizes[i]} type="text" />
							))}
							{
								/* Need padding to match the edit/delete buttons */
							}
						</div>
						{lexicon.lexicon.map((lex: Lexicon, ind: number) => {
							const cols = lex.columns;
							const key = "LEX" + lex.key;
							return (
								<div className="lexRow" id={key} style={ { order: ind } }>
									{theOrder.map((i: number) => (
										<span className={theSizes[i]}>{cols[i]}</span>
									))}
								</div>
							);
						})}
						{
							/* Need edit/delete buttons at end of line */
						}
					</IonItem>
				</IonList>
			</IonContent>
		</IonPage>
	);
};
 
export default Lex;
