import React from 'react';
import {
	IonItem,
	IonIcon,
	IonLabel,
	IonList,
	IonContent,
	IonHeader,
	IonToolbar,
	IonButtons,
	IonButton,
	IonTitle,
	IonModal,
	IonChip,
	IonFooter,
	IonToggle,
	IonInput
} from '@ionic/react';
import {
	addCircleOutline,
	closeCircleOutline,
	closeSharp,
	removeCircleOutline
} from 'ionicons/icons';
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { ExtraCharacters, ExtraCharactersData } from '../components/ReduxDucksTypes';
import {
	closeModal,
	updateExtraCharsDisplay,
	updateExtraCharsFavorites,
	toggleExtraCharsBoolean,
	updateExtraCharsToBeSaved
} from '../components/ReduxDucksFuncs';
import { $i } from '../components/DollarSignExports';
import charData from '../components/ExtraCharactersData';
import capitalize from 'capitalize';

// chardata is {} with props latin, greek, etc.
//   each prop is {} with title = "", content: [ ["NAME", character]... ]

// charSettings has
//   display: (keyof ExtraCharactersData)[] - what is being shown
//   saved: string[] - characters currently saved to favorites bar
//   copyImmediately: boolean - true to copy when clicked, false to use the bar below
//   copyLater: string - characters currently stored to be copied later
//   adding: boolean - currently clicking
//   deleting: boolean - currently deleting
//   showNames: boolean - true to show a list of the name : character, false to have columns of characters


const ExtraCharactersModal = () => {
	interface ExtraCharDataFlags {
		latin?: boolean,
		ipa?: boolean,
		greek?: boolean,
		coptic?: boolean,
		cyrillic?: boolean,
		armenian?: boolean
	}
	const dispatch = useDispatch();
	const [modalState, charSettings] = useSelector((state: any) => [state.modalState, state.extraCharactersState], shallowEqual);
	let currentlySelected: ExtraCharDataFlags = {};
	charSettings.display.forEach((selected: keyof ExtraCharactersData) => currentlySelected[selected] = true);
	let currentFaves: any = {};
	charSettings.saved.forEach((selected: string) => currentFaves[selected] = true);
	const cancel = () => {
		dispatch(closeModal('ExtraCharacters'));
	};
	const toggleChars = (what: keyof ExtraCharactersData) => {
		let output: (keyof ExtraCharactersData)[] = [];
		if(currentlySelected[what]) {
			output = charSettings.display.filter((key: keyof ExtraCharactersData) => key !== what);
		} else {
			output = [what, ...charSettings.display];
		}
		dispatch(updateExtraCharsDisplay(output));
	};
	const characterClicked = (char: string) => {
		if(charSettings.adding) {
			// Adding
			if(!currentFaves[char]) {
				dispatch(updateExtraCharsFavorites([char, ...charSettings.saved]));
			}
		} else if (charSettings.deleting) {
			// Deleting
			if(currentFaves[char]) {
				dispatch(updateExtraCharsFavorites(charSettings.saved.filter((fave: string) => fave !== char)));
			}
		} else if (charSettings.copyImmediately) {
			// Copy now
		} else {
			// Save to be copied
			let copiable = charSettings.copyLater + char;
			dispatch(updateExtraCharsToBeSaved(copiable));
		}
	};
	const toggleOption = (what: "adding" | "deleting" | "showNames" | "copyImmediately") => {
		dispatch(toggleExtraCharsBoolean(what));
	};
	const modifySavedToBeCopied = () => {
		const input = $i("toBeCopied");
		dispatch(updateExtraCharsToBeSaved(input.value));
	};
	return (
		<IonModal isOpen={modalState.ExtraCharacters} onDidDismiss={() => dispatch(closeModal('ExtraCharacters'))}>
			<IonHeader>
				<IonToolbar color="primary">
					<IonTitle>Extra Characters</IonTitle>
					<IonButtons slot="end">
						<IonButton onClick={() => cancel()}>
							<IonIcon icon={closeCircleOutline} />
						</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<IonList id="ExtraCharactersModalList" lines="none">
					<IonItem className={charSettings.copyImmediately ? "hide" : ""}>
						<IonInput id="toBeCopied" value={charSettings.copyLater} onBlur={() => modifySavedToBeCopied()} placeholder="Touch characters to add them here" />
					</IonItem>
					<IonItem>
						<div>
							<span>Display:</span>
							<IonChip outline={!currentlySelected.latin} onClick={() => toggleChars("latin")} className={"ion-margin-start" + (currentlySelected.latin ? " active" : "")}>
								<IonLabel>{charData.latin.title}</IonLabel>
							</IonChip>
							<IonChip outline={!currentlySelected.ipa} onClick={() => toggleChars("ipa")} className={currentlySelected.ipa ? "active" : ""}>
								<IonLabel>{charData.ipa.title}</IonLabel>
							</IonChip>
							<IonChip outline={!currentlySelected.greek} onClick={() => toggleChars("greek")} className={currentlySelected.greek ? "active" : ""}>
								<IonLabel>{charData.greek.title}</IonLabel>
							</IonChip>
							<IonChip outline={!currentlySelected.coptic} onClick={() => toggleChars("coptic")} className={currentlySelected.coptic ? "active" : ""}>
								<IonLabel>{charData.coptic.title}</IonLabel>
							</IonChip>
							<IonChip outline={!currentlySelected.cyrillic} onClick={() => toggleChars("cyrillic")} className={currentlySelected.cyrillic ? "active" : ""}>
								<IonLabel>{charData.cyrillic.title}</IonLabel>
							</IonChip>
							<IonChip outline={!currentlySelected.armenian} onClick={() => toggleChars("armenian")} className={currentlySelected.armenian ? "active" : ""}>
								<IonLabel>{charData.armenian.title}</IonLabel>
							</IonChip>
						</div>
					</IonItem>
					<IonItem id="FavoritesBar">
						<div className="multiColumnEC"><div>
							<div>Favorites:</div>
							{charSettings.saved.map((char: string) => 
								<div key={char} className="char" onClick={() => characterClicked(char)}>{char}</div>
							)}
							{charSettings.deleting ? "" : 
								(charSettings.adding ?
									(
										<IonButton className="ion-margin-start" onClick={() => toggleOption("adding")} color="warning">
											<IonIcon icon={closeSharp} slot="start" />
											<IonLabel>Done Adding</IonLabel>
										</IonButton>
									) : (
										<IonButton className="ion-margin-start" onClick={() => toggleOption("adding")} color="success">
											<IonIcon icon={addCircleOutline} slot="icon-only" />
										</IonButton>
									)
								)
							}
							{charSettings.adding ? "" : 
								(charSettings.deleting ?
									(
										<IonButton className="ion-margin-start" onClick={() => toggleOption("deleting")} color="warning">
											<IonIcon icon={closeSharp} slot="start" />
											<IonLabel>Done Deleting</IonLabel>
										</IonButton>
									) : (
										<IonButton className="ion-margin-start" onClick={() => toggleOption("deleting")} color="danger">
											<IonIcon icon={removeCircleOutline} slot="icon-only" />
										</IonButton>
									)
								)
							}
						</div></div>
					</IonItem>
					{charSettings.display.map((prop: keyof ExtraCharactersData) => {
						const data: ExtraCharacters = charData[prop];
						return (
							<IonItem key={data.title}>
								{charSettings.showNames ? (
									<div className="twoColumnsEC centralized">
										<h2>{data.title}</h2>
										{data.content.map((pair: [string, string]) => 
											<div key={pair[0]}>
												<div className="label">{capitalize.words(pair[0])}</div>
												<div className="char" onClick={() => characterClicked(pair[1])}>{pair[1]}</div>
											</div>
										)}
									</div>
								) : (
									<div className="multiColumnEC centralized">
										<h2>{data.title}</h2>
										<div>
											{data.content.map((pair: [string, string]) => 
												<div key={pair[0]} className="char" onClick={() => characterClicked(pair[1])}>{pair[1]}</div>
											)}
										</div>
									</div>
								)}
							</IonItem>
						);
					})}
				</IonList>
			</IonContent>
			<IonFooter>
				<IonToolbar className="ion-text-wrap">
					<IonItem slot="start" className="blendIn">
						<IonLabel>Copy Immediately</IonLabel>
						<IonToggle checked={charSettings.copyImmediately} onIonChange={() => toggleOption("copyImmediately")} />
					</IonItem>
					<IonButtons slot="end">
						<IonButton onClick={() => cancel()} slot="end" color="success">
							<IonIcon icon={closeCircleOutline} slot="start" />
							<IonLabel>Done</IonLabel>
						</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonFooter>
		</IonModal>
	);
};

export default ExtraCharactersModal;
