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
	IonInput
} from '@ionic/react';
import {
	addCircleOutline,
	checkmarkCircleOutline,
	closeSharp,
	removeCircleOutline,
	helpCircleOutline,
	copyOutline,
	readerOutline
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
import charData from '../components/ExtraCharactersData';
import fireSwal from '../components/Swal';
import debounce from '../components/Debounce';
import capitalize from 'capitalize';
import { Clipboard } from '@capacitor/clipboard';

const ExtraCharactersModal = () => {
	//interface ExtraCharDataFlags {
	//	[key: string]: boolean
	//}
	const dispatch = useDispatch();
	const [modalState, charSettings] = useSelector((state: any) => [state.modalState, state.extraCharactersState], shallowEqual);
	const data: ExtraCharacters | null = charSettings.display && charData[charSettings.display];
	let currentFaves: any = {};
	charSettings.saved.forEach((selected: string) => currentFaves[selected] = true);
	const cancel = () => {
		dispatch(closeModal('ExtraCharacters'));
		charSettings.showHelp && dispatch(toggleExtraCharsBoolean("showHelp"));
	};
	const toggleChars = (what: keyof ExtraCharactersData) => {
		if(charSettings.display === what) {
			return dispatch(updateExtraCharsDisplay(null));
		}
		dispatch(updateExtraCharsDisplay(what));
	};
	const characterClicked = async (char: string) => {
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
			await Clipboard.write({string: char});
			//navigator.clipboard.writeText(char);
			fireSwal({
				title: "copied " + char + " to clipboard",
				position: 'top',
				toast: true,
				timer: 1000,
				timerProgressBar: true,
				showConfirmButton: false
			});
		} else {
			// Save to be copied
			let copiable = charSettings.copyLater + char;
			dispatch(updateExtraCharsToBeSaved(copiable));
		}
	};
	const toggleOption = (what: "adding" | "deleting" | "showNames" | "copyImmediately" | "showHelp") => {
		dispatch(toggleExtraCharsBoolean(what));
	};
	const modifySavedToBeCopied = (toCopy: string) => {
		debounce(dispatch, [updateExtraCharsToBeSaved(toCopy)], 250);
	};
	const showingHelp = charSettings.showHelp ? {className: "showingHelp"} : {};
	return (
		<IonModal isOpen={modalState.ExtraCharacters} onDidDismiss={() => cancel()}>
			<IonHeader>
				<IonToolbar color="primary">
					<IonTitle>Extra Characters</IonTitle>
					<IonButtons slot="end">
						<IonButton onClick={() => toggleOption("copyImmediately")} color={charSettings.copyImmediately ? "secondary" : undefined} fill={charSettings.copyImmediately ? "solid" : "clear"}>
							<IonIcon icon={copyOutline} />
						</IonButton>
						<IonButton onClick={() => toggleOption("showNames")} color={charSettings.showNames ? "secondary" : undefined} fill={charSettings.showNames ? "solid" : "clear"}>
							<IonIcon icon={readerOutline} />
						</IonButton>
						<IonButton onClick={() => toggleOption("showHelp")} color={charSettings.showHelp ? "secondary" : undefined} fill={charSettings.showHelp ? "solid" : "clear"}>
							<IonIcon icon={helpCircleOutline} />
						</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<IonList id="ExtraCharactersModalList" lines="none" {...showingHelp}>
					<IonItem className="extraHelp">
						<div>
							<div>This is a place to find and copy characters that may not be easily accessible to you on your device's keyboard. The other buttons above can be toggled for additional effects:</div>
							<div className="central"><IonIcon icon={copyOutline} /></div>
							<div>When active, copies any character you tap directly to the clipboard. When inactive, copies tapped characters to the copy-bar below, where you can copy them at your leisure.</div>
							<div className="central"><IonIcon icon={readerOutline} /></div>
							<div>When active, shows the standard Unicode name of every character. When inactive, the characters are presented by themselves.</div>
						</div>
					</IonItem>
					<IonItem className={(charSettings.copyImmediately ? "" : "sticky")}>
						<IonInput id="toBeCopied" value={charSettings.copyLater} onIonChange={(e) => modifySavedToBeCopied(e.detail.value as string)} placeholder="Tap characters to add them here" />
					</IonItem>
					<IonItem className="extraHelp">
						<div>Tap a character set below to see the characters in that set.</div>
					</IonItem>
					<IonItem>
						<div>
							<span>Display:</span>
							{Object.getOwnPropertyNames(charData).map((key: string, ind: number) => {
								const current = charSettings.display === key;
								return (
									<IonChip key={key} outline={!current} onClick={() => toggleChars(key)} className={(ind === 0 ? ("ion-margin-start" + (current ? " " : "")) : "") + (current ? "active" : "")}>
										<IonLabel>{charData[key].title}</IonLabel>
									</IonChip>	
								);
							})}
						</div>
					</IonItem>
					<IonItem className="extraHelp">
						<div>Below is a place to save your "favorite" characters, ones that you may be using a lot and don't want to go hunting for all the time. Tap the [+] and tap a character to add it to your favorites. Tap the [-] to remove characters from your favorites.</div>
					</IonItem>
					<IonItem className={charSettings.adding ? "sticky" : ""}>
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
					<IonItem className="extraHelp">
						<div>Characters will display below. Tap them to copy them to the copy-bar above.</div>
					</IonItem>
					{data ? (
						<IonItem key={data.title}>
							{charSettings.showNames ? (
								<div className="twoColumnsEC centralized">
									<h2>{data.title}</h2>
									{data.content.map((pair: [string, string]) => 
										<div key={"m" + data.title + pair[0]}>
											<div className="char" onClick={() => characterClicked(pair[1])}>{pair[1]}</div>
											<div className="label">{capitalize.words(pair[0])}</div>
										</div>
									)}
								</div>
							) : (
								<div className="multiColumnEC centralized">
									<h2>{data.title}</h2>
									<div>
										{data.content.map((pair: [string, string]) => 
											<div key={"m" + data.title + pair[0]} className="char" onClick={() => characterClicked(pair[1])}>{pair[1]}</div>
										)}
									</div>
								</div>
							)}
						</IonItem>
					) : ""}
				</IonList>
			</IonContent>
			<IonFooter>
				<IonToolbar className="ion-text-wrap">
					<IonButtons slot="end">
						<IonButton onClick={() => cancel()} slot="end" fill="solid" color="success">
							<IonIcon icon={checkmarkCircleOutline} slot="start" />
							<IonLabel>Done</IonLabel>
						</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonFooter>
		</IonModal>
	);
};

export default ExtraCharactersModal;
