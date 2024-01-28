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
	IonInput,
	useIonToast
} from '@ionic/react';
import {
	checkmarkCircleOutline,
	helpCircleOutline,
	copyOutline,
	readerOutline,
	heartOutline
} from 'ionicons/icons';
import { useSelector, useDispatch } from "react-redux";
import capitalize from 'capitalize';
import { Clipboard } from '@capacitor/clipboard';

import { ExtraCharactersDisplayName, ModalProperties, StateObject } from '../../store/types';
import { setFaves, setNowShowing, setToCopy, toggleCopyImmediately, toggleShowNames } from '../../store/extraCharactersSlice';

import charData from '../../components/ExtraCharactersData';
import debounce from '../../components/Debounce';
import toaster from '../../components/toaster';

interface CurrentFavorites {
	[key: string]: boolean
}
const {
	objects,
	contents,
	charactersInfo
} = charData;

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
		nowShowing,
		faves,
		copyImmediately,
		toCopy,
		showNames
	} = useSelector((state: StateObject) => state.ec);
	const data: string[] = nowShowing === "Favorites" ? faves : objects[nowShowing] || [];
	const [currentFaves, setCurrentFaves] = useState<CurrentFavorites>({});
	const [isFavoriting, setIsFavoriting] = useState<boolean>(false);
	const [showHelp, setShowHelp] = useState<boolean>(false);
	const toast = useIonToast();

	useEffect(() => {
		const newFaves: CurrentFavorites = {};
		faves.forEach((selected: string) => (newFaves[selected] = true));
		setCurrentFaves(newFaves);
	}, [faves]);

	const cancel = useCallback(() => {
		setIsOpen(false);
	}, [setIsOpen]);
	const toggleChars = useCallback((what: ExtraCharactersDisplayName) => {
		if(nowShowing !== what) {
			dispatch(setNowShowing(what));
		}
	}, [dispatch, nowShowing]);
	const toggleFave = useCallback((char) => {
		if(!currentFaves[char]) {
			// New fave
			dispatch(setFaves([...faves, char]));
			return;
		}
		// Deleting fave
		dispatch(setFaves(faves.filter((fave: string) => fave !== char)));
	}, [currentFaves, faves, dispatch]);
	const copyNow = useCallback((char) => {
		Clipboard.write({string: char}).then(() => toaster({
			message: `Copied ${char} to clipboard`,
			position: "middle",
			duration: 1500,
			toast
		}));
	}, [toast]);
	const saveToBeCopied = useCallback((char) => {
		dispatch(setToCopy(toCopy + char));
	}, [dispatch, toCopy]);
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
	const toggleCopy = useCallback(() => {
		toaster({
			message: copyImmediately ? "No longer copying directly to clipboard." : "Now copying immediately to clipboard.",
			duration: 2500,
			position: "middle",
			toast
		});
		dispatch(toggleCopyImmediately());
	}, [dispatch, copyImmediately, toast]);
	const modifySavedToBeCopied = useCallback((toCopy: string) => {
		debounce(dispatch, [setToCopy(toCopy)], 250, "copyExtraChars");
	}, [dispatch]);
	const toggleFavoriting = useCallback((newValue) => {
		setIsFavoriting(newValue);
		toaster({
			message: newValue ? "Now saving characters to Favorites." : "No longer saving to Favorites",
			duration: 2500,
			position: "middle",
			toast
		});
	}, [toast]);
	return (
		<IonModal isOpen={isOpen} onDidDismiss={cancel}>
			<IonHeader>
				<IonToolbar color="primary">
					<IonTitle>Extra Characters</IonTitle>
					<IonButtons slot="end">
						<IonButton
							onClick={() => setShowHelp(!showHelp)}
							color={showHelp ? "secondary" : undefined}
							fill={showHelp ? "solid" : "clear"}
						>
							<IonIcon icon={helpCircleOutline} />
						</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<IonList
					id="ExtraCharactersModalList"
					lines="none"
					className={showHelp ? "showingHelp" : undefined}
				>
					<IonItem className="extraHelp">
						<div>
							<div>
								This is a place to find and copy characters that may not be
								easily accessible to you on your device's keyboard. The other
								buttons can be toggled for additional effects:
							</div>
							<div className="central"><IonIcon icon={copyOutline} /></div>
							<div>
								When active, copies any character you tap directly to the
								clipboard. When inactive, copies tapped characters to the
								copy-bar below, where you can copy them at your leisure.
							</div>
							<div className="central"><IonIcon icon={heartOutline} /></div>
							<div>
								When active, tapping on a character adds or removes it from your
								Favorites list. Characters will not be copied to the clipboard or
								the copy-bar.
							</div>
							<div className="central"><IonIcon icon={readerOutline} /></div>
							<div>
								When active, shows the standard Unicode name of every character.
								When inactive, the characters are presented by themselves.
							</div>
						</div>
					</IonItem>
					<IonItem className={"inputItem" + (copyImmediately ? "" : " sticky")}>
						<IonButton
							size="default"
							slot="start"
							disabled={isFavoriting}
							onClick={() => toggleCopy()}
							color={copyImmediately ? "secondary" : undefined}
							fill={copyImmediately ? "solid" : "clear"}
						>
							<IonIcon icon={copyOutline} />
						</IonButton>
						<IonButton
							size="default"
							slot="start"
							disabled={copyImmediately}
							onClick={() => toggleFavoriting(!isFavoriting)}
							color={isFavoriting ? "secondary" : undefined}
							fill={isFavoriting ? "solid" : "clear"}
						>
							<IonIcon icon={heartOutline} />
						</IonButton>
						<IonInput
							aria-label="Characters to be copied"
							id="toBeCopied"
							value={toCopy}
							onIonChange={(e) => modifySavedToBeCopied(e.detail.value as string)}
							placeholder="Tap characters to add them here"
						/>
						<IonButton
							size="default"
							slot="end"
							onClick={() => dispatch(toggleShowNames())}
							color={showNames ? "secondary" : undefined}
							fill={showNames ? "solid" : "clear"}
						>
							<IonIcon icon={readerOutline} />
						</IonButton>
					</IonItem>
					<IonItem className="extraHelp">
						<div>Tap a character set below to see the characters in that set.</div>
					</IonItem>
					<IonItem>
						<div className="ion-flex-row-wrap ion-align-items-center ion-justify-content-center displayChips">
							<span>Display:</span>
							<IonChip
								outline={nowShowing !== "Favorites"}
								onClick={() => toggleChars("Favorites")}
								className={"ion-margin-start" + (nowShowing === "Favorites" ? " active" : "")}
							>
								<IonLabel>Favorites</IonLabel>
							</IonChip>
							{contents.map((title) => {
								const current = nowShowing === title;
								return (
									<IonChip
										key={title}
										outline={!current}
										onClick={() => toggleChars(title)}
										className={current ? "active" : ""}
									>
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
						<IonItem key={`${nowShowing}-Group`}>
							{showNames ? (
								<div className="twoColumnsEC centralized">
									<h2>{nowShowing}</h2>
									{data.map((character: string) =>
										<div key={"mNamed" + nowShowing + character}>
											<div
												className={currentFaves[character] ? "char favorite" : "char"}
												onClick={() => characterClicked(character)}
											>{character}</div>
											<div
												className="label"
											>{capitalize.words(charactersInfo[character])}</div>
										</div>
									)}
								</div>
							) : (
								<div className="multiColumnEC centralized">
									<h2>{nowShowing}</h2>
									<div>
										{data.map((character: string) =>
											<div
												key={"mUnnamed" + nowShowing + character}
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
