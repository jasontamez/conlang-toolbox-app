import React from 'react';
import {
	IonContent,
	IonPage,
	IonHeader,
	IonToolbar,
	IonMenuButton,
	IonButtons,
	IonTitle,
	useIonViewDidEnter
} from '@ionic/react';
/*import {
	caretForwardCircleOutline,
	settingsOutline
} from 'ionicons/icons';*/
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import {
	changeView,
	updateInputLexicon
} from '../../components/ReduxDucksFuncs';
import { $i } from '../../components/DollarSignExports';
import '../App.css';

const WERew = () => {
	const dispatch = useDispatch();
	useIonViewDidEnter(() => {
		dispatch(changeView('we', 'input'));
	});
	const rawInput = useSelector((state: any) => state.wordevolveInput, shallowEqual);
	const input = rawInput.join("\n");
	const updateInput = () => {
		const value: string = $i("lexiconInput").value;
		const newInput: string[] = value.split("\n").map(v => v.trim());
		dispatch(updateInputLexicon(newInput));
	};
	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonButtons slot="start">
						<IonMenuButton />
					</IonButtons>
					<IonTitle>Input Lexicon</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen className="evenBackground">
				<div className="WEinput">
					<textarea id="lexiconInput" placeholder="Enter words here, one per line" defaultValue={input} onBlur={ () => updateInput() } />
				</div>
			</IonContent>
		</IonPage>
	);
};

export default WERew;
