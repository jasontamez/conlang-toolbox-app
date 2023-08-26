import React, { useState, useCallback } from 'react';
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
	helpCircleOutline,
	enterOutline,
	trashBinOutline,
	globeOutline
} from 'ionicons/icons';
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import {
	changeView,
	updateInputLexicon
} from '../../components/ReduxDucksFuncs';
import { InpCard } from "./WECards";
import ModalWrap from "../../components/ModalWrap";
import { Lexicon, PageData } from '../../components/ReduxDucksTypes';
import { $i } from '../../components/DollarSignExports';
import fireSwal from '../../components/Swal';
import ExtraCharactersModal from '../M-ExtraCharacters';
import debounce from '../../components/Debounce';

const WERew = (props: PageData) => {
	const { modalPropsMaker } = props;
	const dispatch = useDispatch();
	const [isOpenECM, setIsOpenECM] = useState<boolean>(false);
	const [isOpenInfo, setIsOpenInfo] = useState<boolean>(false);
	const viewInfo = ['we', 'input'];
	useIonViewDidEnter(() => {
		dispatch(changeView(viewInfo));
	});
	const [rawInput, disableConfirms, lexicon] = useSelector((state: any) => [state.wordevolveInput, state.appSettings.disableConfirms, state.lexicon], shallowEqual);
	const input = rawInput.join("\n");
	const updateInput = useCallback((value: string) => {
		const newInput: string[] = value.split("\n").map(v => v.trim()).filter(v => v);
		dispatch(updateInputLexicon(newInput));
	}, [dispatch]);
	const inputUpdated = useCallback((e: any) => {
		let value: string;
		if(e.target && e.target.value !== undefined) {
			value = (e.target.value);
		} else {
			value = ($i("lexiconInput").value);
		}
		debounce(updateInput, [value], 500);
	}, [updateInput]);
	const clearInput = () => {
		const thenFunc = () => {
			$i("lexiconInput").value = "";
			updateInput("");
		};
		if(disableConfirms) {
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
			updateInput(newInput);
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
			<ExtraCharactersModal {...modalPropsMaker(isOpenECM, setIsOpenECM)} />
			<ModalWrap {...modalPropsMaker(isOpenInfo, setIsOpenInfo)}><InpCard /></ModalWrap>
			<IonHeader>
				<IonToolbar>
					<IonButtons slot="start">
						<IonMenuButton />
					</IonButtons>
					<IonTitle>Input Lexicon</IonTitle>
					<IonButtons slot="end">
						<IonButton onClick={() => setIsOpenECM(true)}>
							<IonIcon icon={globeOutline} />
						</IonButton>
						<IonButton onClick={() => setIsOpenInfo(true)}>
							<IonIcon icon={helpCircleOutline} />
						</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen className="evenBackground">
				<div className="WEinput">
					<textarea spellCheck={false} aria-label="Words to Evolve" id="lexiconInput" placeholder="Enter words here, one per line" defaultValue={input} onChange={inputUpdated} />
				</div>
				<IonToolbar>
					<IonButtons slot="start">
						<IonButton onClick={clearInput} disabled={!input} color="warning" fill="solid" shape="round"><IonIcon icon={trashBinOutline} slot="start" /> Clear</IonButton>
					</IonButtons>
					<IonButtons slot="end">
						<IonButton onClick={importLexicon} disabled={lexicon.lexicon.length === 0} color="primary" fill="solid" shape="round"><IonIcon icon={enterOutline} slot="start" /> Import from Lexicon</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonContent>
		</IonPage>
	);
};

export default WERew;
