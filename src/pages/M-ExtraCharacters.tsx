import React, { useEffect, useCallback, useState } from 'react';
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
	checkmarkCircleOutline,
	helpCircleOutline,
	copyOutline,
	readerOutline,
	heartOutline
} from 'ionicons/icons';
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import capitalize from 'capitalize';
import { Clipboard } from '@capacitor/clipboard';

import { ExtraCharactersGroup } from '../components/ReduxDucksTypes';
import {
	updateExtraCharsDisplay,
	updateExtraCharsFavorites,
	toggleExtraCharsBoolean,
	updateExtraCharsToBeSaved
} from '../components/ReduxDucksFuncs';
import charData from '../components/ExtraCharactersData';
import fireSwal from '../components/Swal';
import debounce from '../components/Debounce';

interface CurrentFavorites {
	[key: string]: boolean
}
const {
	objects,
	contents,
	charactersInfo
} = charData;

interface ModalProperties {
	isOpen: boolean,
	setIsOpen: Function
}

const ExtraCharactersModal = (props: ModalProperties) => {
	//interface ExtraCharDataFlags {
	//	[key: string]: boolean
	//}
	const {
		isOpen,
		setIsOpen
	} = props;
	const dispatch = useDispatch();
	const {
		display,
		saved,
		showHelp,
		copyImmediately,
		copyLater,
		showNames
	} = useSelector((state: any) => state.extraCharactersState, shallowEqual);
	const data: string[] = display === "Favorites" ? saved : objects[display] || [];
	const [currentFaves, setCurrentFaves] = useState<CurrentFavorites>({});
	const [isFavoriting, setIsFavoriting] = useState<boolean>(false);
	useEffect(() => {
		const newFaves: CurrentFavorites = {};
		saved.forEach((selected: string) => (newFaves[selected] = true));
		setCurrentFaves(newFaves);
	}, [saved]);
	
	const cancel = useCallback(() => {
		setIsOpen(false);
		showHelp && dispatch(toggleExtraCharsBoolean("showHelp"));
	}, [dispatch, showHelp, setIsOpen]);
	const toggleChars = useCallback((what: keyof ExtraCharactersGroup | "Favorites") => {
		if(display !== what) {
			dispatch(updateExtraCharsDisplay(what));
		}
	}, [dispatch, display]);
	const toggleFave = useCallback((char) => {
		let newValue: string[] = [];
		if(!currentFaves[char]) {
			newValue = saved.concat([char]);
		} else {
			newValue = saved.filter((fave: string) => fave !== char);
		}
		dispatch(updateExtraCharsFavorites(newValue));
	}, [currentFaves, saved, dispatch]);
	const copyNow = useCallback((char) => {
		Clipboard.write({string: char}).then(() => fireSwal({
			title: "copied " + char + " to clipboard",
			position: 'top',
			toast: true,
			timer: 1000,
			timerProgressBar: true,
			showConfirmButton: false
		}));
	}, []);
	const saveToBeCopied = useCallback((char) => {
		let copiable = copyLater + char;
		dispatch(updateExtraCharsToBeSaved(copiable));
	}, [dispatch, copyLater]);
	const characterClicked = useCallback(async (char: string) => {
		if(isFavoriting) {
			toggleFave(char);
		} else if (copyImmediately) {
			// Copy now
			copyNow(char);
		} else {
			// Save to be copied
			saveToBeCopied(char);
		}
	}, [toggleFave, copyImmediately, isFavoriting, copyNow, saveToBeCopied]);
	const toggleOption = useCallback((what: "adding" | "deleting" | "showNames" | "copyImmediately" | "showHelp") => {
		dispatch(toggleExtraCharsBoolean(what));
	}, [dispatch]);
	const modifySavedToBeCopied = useCallback((toCopy: string) => {
		debounce(dispatch, [updateExtraCharsToBeSaved(toCopy)], 250);
	}, [dispatch]);
	const showingHelp = showHelp ? {className: "showingHelp"} : {};
	return (
		<IonModal isOpen={isOpen} onDidDismiss={cancel}>
			<IonHeader>
				<IonToolbar color="primary">
					<IonTitle>Extra Characters</IonTitle>
					<IonButtons slot="end">
						<IonButton onClick={() => toggleOption("showHelp")} color={showHelp ? "secondary" : undefined} fill={showHelp ? "solid" : "clear"}>
							<IonIcon icon={helpCircleOutline} />
						</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<IonList id="ExtraCharactersModalList" lines="none" {...showingHelp}>
					<IonItem className="extraHelp">
						<div>
							<div>This is a place to find and copy characters that may not be easily accessible to you on your device's keyboard. The other buttons can be toggled for additional effects:</div>
							<div className="central"><IonIcon icon={copyOutline} /></div>
							<div>When active, copies any character you tap directly to the clipboard. When inactive, copies tapped characters to the copy-bar below, where you can copy them at your leisure.</div>
							<div className="central"><IonIcon icon={heartOutline} /></div>
							<div>When active, tapping on a character adds or removes it from your Favorites list. Characters will not be copied to the clipboard or the copy-bar.</div>
							<div className="central"><IonIcon icon={readerOutline} /></div>
							<div>When active, shows the standard Unicode name of every character. When inactive, the characters are presented by themselves.</div>
						</div>
					</IonItem>
					<IonItem className={"inputItem" + (copyImmediately ? "" : " sticky")}>
						<IonButton size="default" slot="start" disabled={isFavoriting} onClick={() => toggleOption("copyImmediately")} color={copyImmediately ? "secondary" : undefined} fill={copyImmediately ? "solid" : "clear"}>
							<IonIcon icon={copyOutline} />
						</IonButton>
						<IonButton size="default" slot="start" disabled={copyImmediately} onClick={() => setIsFavoriting(!isFavoriting)} color={isFavoriting ? "secondary" : undefined} fill={isFavoriting ? "solid" : "clear"}>
							<IonIcon icon={heartOutline} />
						</IonButton>
						<IonInput id="toBeCopied" value={copyLater} onIonChange={(e) => modifySavedToBeCopied(e.detail.value as string)} placeholder="Tap characters to add them here" />
						<IonButton size="default" slot="end" onClick={() => toggleOption("showNames")} color={showNames ? "secondary" : undefined} fill={showNames ? "solid" : "clear"}>
							<IonIcon icon={readerOutline} />
						</IonButton>
					</IonItem>
					<IonItem className="extraHelp">
						<div>Tap a character set below to see the characters in that set.</div>
					</IonItem>
					<IonItem>
						<div className="ion-flex-row-wrap ion-align-items-center ion-justify-content-center displayChips">
							<span>Display:</span>
							<IonChip outline={display !== "Favorites"} onClick={() => toggleChars("Favorites")} className={"ion-margin-start" + (display === "Favorites" ? " active" : "")}>
								<IonLabel>Favorites</IonLabel>
							</IonChip>
							{contents.map((title) => {
								const current = display === title;
								return (
									<IonChip key={title} outline={!current} onClick={() => toggleChars(title)} className={current ? "active" : ""}>
										<IonLabel>{title}</IonLabel>
									</IonChip>	
								);
							})}
						</div>
					</IonItem>
					<IonItem className="extraHelp">
						<div>Characters will display below. Tap them to copy them to the copy-bar above.</div>
					</IonItem>
					{data ? (
						<IonItem key={`${display}-Group`}>
							{showNames ? (
								<div className="twoColumnsEC centralized">
									<h2>{display}</h2>
									{data.map((character: string) => 
										<div key={"mNamed" + display + character}>
											<div
												className={currentFaves[character] ? "char favorite" : "char"}
												onClick={() => characterClicked(character)}
											>{character}</div>
											<div className="label">{capitalize.words(charactersInfo[character])}</div>
										</div>
									)}
								</div>
							) : (
								<div className="multiColumnEC centralized">
									<h2>{display}</h2>
									<div>
										{data.map((character: string) =>
											<div
												key={"mUnnamed" + display + character}
												className={currentFaves[character] ? "char favorite" : "char"}
												onClick={() => characterClicked(character)}
											>{character}</div>
										)}
									</div>
								</div>
							)}
						</IonItem>
					) : ""}
				</IonList>
			</IonContent>
			<IonFooter id="ExtraCharactersModalFooter">
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
