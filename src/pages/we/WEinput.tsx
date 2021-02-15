import React from 'react';
import {
	IonContent,
	IonPage,
	IonHeader,
	IonToolbar,
	IonMenuButton,
	IonButtons,
	IonTitle,
	useIonViewDidEnter,
	IonButton,
	IonIcon
} from '@ionic/react';
import {
	enterOutline,
	trashBinOutline
} from 'ionicons/icons';
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import {
	changeView,
	updateInputLexicon
} from '../../components/ReduxDucksFuncs';
import { Lexicon } from '../../components/ReduxDucksTypes';
import { $i } from '../../components/DollarSignExports';
import fireSwal from '../../components/Swal';
import '../App.css';

const WERew = () => {
	const dispatch = useDispatch();
	useIonViewDidEnter(() => {
		dispatch(changeView('we', 'input'));
	});
	const state = useSelector((state: any) => state, shallowEqual);
	const rawInput = state.wordevolveInput;
	const input = rawInput.join("\n");
	const settings = state.appSettings;
	const updateInput = () => {
		const value: string = $i("lexiconInput").value;
		const newInput: string[] = value.split("\n").map(v => v.trim()).filter(v => v);
		dispatch(updateInputLexicon(newInput));
	};
	const clearInput = () => {
		const thenFunc = () => {
			$i("lexiconInput").value = "";
			updateInput();
		};
		if(settings.disableConfirms) {
			thenFunc();
		} else {
			fireSwal({
				title: 'Clear Lexicon',
				text: 'Are you sure? This will clear the entire input, and cannot be undone.',
				customClass: {popup: 'deleteConfirm'},
				icon: 'warning',
				showCancelButton: true,
				confirmButtonText: "Yes, clear it."
			}).then((result: any) => result.isConfirmed && thenFunc());
		}
	};
	const importLexicon = () => {
		const lexicon = state.lexicon;
		let cols: number = lexicon.columns;
		let options: any = {};
		for(let x = 0; x < cols; x++) {
			options[x.toString()] = lexicon.columnTitles[x];
		}
		const thenFunc = (col: number) => {
			const lex = lexicon.lexicon;
			let newInput = $i("lexiconInput").value;
			if(newInput) {
				newInput += "\n"
			}
			lex.forEach((word: Lexicon) => {
				const imp = word.columns[col];
				imp && (newInput += imp + "\n");
			});
			$i("lexiconInput").value = newInput;
			updateInput();
		};
		if(cols === 1) {
			thenFunc(0);
		} else {
			fireSwal({
				title: 'Import Lexicon',
				input: 'select',
				inputOptions: options,
				inputPlaceholder: 'Which column do you want to input?',
				showCancelButton: true
			}).then((result: any) => {
				if(result.isConfirmed && result.value) {
					thenFunc(parseInt(result.value));
				}
			});
		}
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
					<textarea spellCheck={false} id="lexiconInput" placeholder="Enter words here, one per line" defaultValue={input} onBlur={ () => updateInput() } />
				</div>
				<IonToolbar>
					<IonButtons slot="start">
						<IonButton onClick={() => clearInput()} color="warning" fill="solid" shape="round"><IonIcon icon={trashBinOutline} slot="start" /> Clear</IonButton>
					</IonButtons>
					<IonButtons slot="end">
						<IonButton onClick={() => importLexicon()} color="primary" fill="solid" shape="round"><IonIcon icon={enterOutline} slot="start" /> Import from Lexicon</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonContent>
		</IonPage>
	);
};

export default WERew;
