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
	IonPopover,
	IonList,
	IonItem,
	IonLabel,
	IonButton,
	IonIcon
} from '@ionic/react';
import {
	ellipsisVertical
} from 'ionicons/icons';
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import {
	changeView,
	updateInputLexicon,
	openPopover,
	closePopover
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
	const popstate = state.modalState.WEInputEllipsis;
	const settings = state.appSettings;
	const updateInput = () => {
		const value: string = $i("lexiconInput").value;
		const newInput: string[] = value.split("\n").map(v => v.trim());
		dispatch(updateInputLexicon(newInput));
	};
	const clearInput = () => {
		dispatch(closePopover('WEInputEllipsis'));
		const thenFunc = () => {
			dispatch(updateInputLexicon([]));
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
		dispatch(closePopover('WEInputEllipsis'));
		const thenFunc = (col: number) => {
			const lex = lexicon.lexicon;
			let newInput = rawInput;
			lex.forEach((word: Lexicon) => {
				newInput.push(word.columns[col]);
			});
			dispatch(updateInputLexicon(newInput));
		};
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
	};
	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonButtons slot="start">
						<IonMenuButton />
					</IonButtons>
					<IonTitle>Input Lexicon</IonTitle>
					<IonPopover
						event={popstate}
						isOpen={popstate !== undefined}
						onDidDismiss={() => dispatch(closePopover('WEInputEllipsis'))}
					>
						<IonList>
							<IonItem button={true} onClick={() => clearInput()}>
								<IonLabel>Clear Input</IonLabel>
							</IonItem>
							<IonItem button={true} onClick={() => importLexicon()}>
								<IonLabel>Import from Lexicon</IonLabel>
							</IonItem>
						</IonList>
					</IonPopover>
					<IonButtons slot="end">
						<IonButton onClick={(e: any) => { e.persist(); dispatch(openPopover('WEInputEllipsis', e)); }}>
							<IonIcon icon={ellipsisVertical} />
						</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen className="evenBackground">
				<div className="WEinput">
					<textarea spellCheck={false} id="lexiconInput" placeholder="Enter words here, one per line" defaultValue={input} onBlur={ () => updateInput() } />
				</div>
			</IonContent>
		</IonPage>
	);
};

export default WERew;
