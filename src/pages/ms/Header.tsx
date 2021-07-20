import React from 'react';
import {
	IonHeader,
	IonToolbar,
	IonTitle,
	IonButtons,
	IonButton,
	IonMenuButton,
	IonIcon,
	IonList,
	IonItem,
	IonLabel,
	IonRange,
	IonContent,
	IonSelect,
	IonSelectOption,
	IonCheckbox,
	IonTextarea,
	IonModal,
	IonFooter
} from '@ionic/react';
import { useHistory } from "react-router-dom";
import { globeOutline } from 'ionicons/icons';
import ExtraCharactersModal from '../M-ExtraCharacters';
import { checkmarkCircleOutline, informationCircleSharp } from 'ionicons/icons';
import { useSelector, useDispatch } from "react-redux";
import {
	openModal,
	setSyntaxBool,
	setSyntaxNum,
	setSyntaxText,
	setSyntaxState
} from '../../components/ReduxDucksFuncs';
import { SyntaxSketchBoolObject, SyntaxSketchNumberObject, SyntaxSketchTextObject } from '../../components/ReduxDucksTypes';

export const SyntaxHeader = (props: any) => {
	const dispatch = useDispatch();
	const history = useHistory();
	const title = props.title || "01";
	const changePage = (e: any) => {
		const where = (e.detail.value || title);
		where !== title && history.push('/ms/section' + where);
	};
	return (
		<IonHeader>
			<ExtraCharactersModal />
			<IonToolbar>
				<IonButtons slot="start">
					<IonMenuButton />
				</IonButtons>
				<IonTitle>
					<IonSelect
						className="syntaxSelect"
						interfaceOptions={{
							header: 'Choose a Heading',
							translucent: false,
							cssClass: 'alertSelect'
						}}
						interface="alert"
						multiple={false}
						placeholder="Select One"
						onIonChange={e => changePage(e)}
						value={title}
	        		>
						<IonSelectOption value="01">1. Morphological Typology</IonSelectOption>
						<IonSelectOption value="02">2. Grammatical Categories</IonSelectOption>
						<IonSelectOption value="03">3. Constituent Order Typology</IonSelectOption>
						<IonSelectOption value="04">4. Noun and Noun Phrase Operations</IonSelectOption>
						<IonSelectOption value="05">5. Predicate Nominals and Related Constructions</IonSelectOption>
						<IonSelectOption value="06">6. Grammatical Relations</IonSelectOption>
						<IonSelectOption value="07">7. Voice and Valence Adjusting Operations</IonSelectOption>
						<IonSelectOption value="08">8. Other Verb and Verb Phrase Operations</IonSelectOption>
						<IonSelectOption value="09">9. Pragmatically Marked Structures</IonSelectOption>
						<IonSelectOption value="10">10. xxxxx</IonSelectOption>
					</IonSelect>
				</IonTitle>
				<IonButtons slot="end">
					<IonButton onClick={() => dispatch(openModal("ExtraCharacters"))}>
						<IonIcon icon={globeOutline} />
					</IonButton>
				</IonButtons>
			</IonToolbar>
		</IonHeader>
	);
};
export const RadioBox = (props: any) => {
	const dispatch = useDispatch();
	const synBool = useSelector((state: any) => state.syntaxSketchInfo.bool)
	const what = props.prop as keyof SyntaxSketchBoolObject
	const setBool = (what: keyof SyntaxSketchBoolObject, value: boolean) => {
		dispatch(setSyntaxBool(what, value));
	};
	return (
		<IonCheckbox onIonChange={(e) => setBool(what, e.detail.checked)} value={synBool[what] || false} />
	);
};
export const RangeItem = (props: any) => {
	const dispatch = useDispatch();
	const synNum = useSelector((state: any) => state.syntaxSketchInfo.num)
	const what = props.text as keyof SyntaxSketchNumberObject;
	const start = (props.start || "") as string;
	const end = (props.end || "") as string;
	const cls = (props.innerClass || "") as string;
	const max = props.max === undefined ? 4 : (props.max as number);
	const classes = props.className ? props.className + " content" : "content";
	const setNum = (what: keyof SyntaxSketchNumberObject, value: number) => {
		dispatch(setSyntaxNum(what, value));
	};
	return (
		<IonItem className={classes}>
			<IonRange onBlur={(e) => setNum(what, e.target.value as number)} value={synNum[what] || 0} className={cls} color="secondary" snaps={true} step={1} ticks={true} min={0} max={max}>
				<IonLabel slot="start">{start}</IonLabel>
				<IonLabel slot="end">{end}</IonLabel>
			</IonRange>
		</IonItem>
	);
};
export const TextItem = (props: any) => {
	const dispatch = useDispatch();
	const synText = useSelector((state: any) => state.syntaxSketchInfo.text)
	const ph = (props.placeholder || "") as string;
	const what = props.text as keyof SyntaxSketchTextObject;
	const rows = props.rows === undefined ? 3 : (props.rows as number);
	const classes = props.className ? props.className + " sketchTextItem content" : "sketchTextItem content";
	const setText = (what: keyof SyntaxSketchTextObject, value: string) => {
		dispatch(setSyntaxText(what, value));
	};
	return (
		<IonItem className={classes}>
			<IonLabel position="stacked">{props.children}</IonLabel>
			<IonTextarea onBlur={(e) => setText(what, e.target.value || "")} value={synText[what] || ""} placeholder={ph} rows={rows} enterkeyhint="done" inputmode="text" />
		</IonItem>
	);
};
export const HeaderItem = (props: any) => {
	return (
		<IonItem className={props.className || ""}>
			<IonLabel>{props.children}</IonLabel>
		</IonItem>
	);
};
export const InfoModal = (props: any) => {
	const dispatch = useDispatch();
	const synState = useSelector((state: any) => state.syntaxSketchState);
	const id = "modal" + (props.title as string).replace(/[^a-zA-Z0-9]/g, "");
	const label = props.label || "Extra Info";
	return (
		<IonItem className={props.className || ""}>
			<IonModal isOpen={synState[id]} onDidDismiss={() => dispatch(setSyntaxState(id, false))}>
				<IonHeader>
					<IonToolbar color="primary">
						<IonTitle>{props.title}</IonTitle>
					</IonToolbar>
				</IonHeader>
				<IonContent className="sketchModal">
					<IonList lines="none">
						<IonItem>
							{props.children}
						</IonItem>
					</IonList>
				</IonContent>
				<IonFooter>
					<IonToolbar className="ion-text-wrap">
						<IonButtons slot="end">
							<IonButton onClick={() => dispatch(setSyntaxState(id, false))} slot="end" fill="solid" color="success">
								<IonIcon icon={checkmarkCircleOutline} slot="start" />
								<IonLabel>Done</IonLabel>
							</IonButton>
						</IonButtons>
					</IonToolbar>
				</IonFooter>
			</IonModal>
			<IonButton color="warning" onClick={() => dispatch(setSyntaxState(id, true))}>
				<IonIcon icon={informationCircleSharp} slot="start" style={{ marginInlineStart: "0.25rem", marginInlineEnd: "0.5rem"}} />
				<IonLabel>{label}</IonLabel>
			</IonButton>
		</IonItem>
	);
};

export default SyntaxHeader;