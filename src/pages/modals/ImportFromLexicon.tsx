import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	IonContent,
	IonHeader,
	IonToolbar,
	IonButtons,
	IonTitle,
	IonButton,
	IonIcon,
	useIonAlert,
	useIonToast,
	AlertInput,
	IonModal,
	IonList,
	IonItem,
	IonLabel,
	IonFooter,
	IonCheckbox,
	IonToggle,
	IonInput,
	IonSelect,
	IonSelectOption,
	IonItemDivider
} from '@ionic/react';
import {
	enterOutline,
	globeOutline,
	closeCircleOutline,
	add,
	save,
	close
} from 'ionicons/icons';

import { ExtraCharactersModalOpener, Lexicon, LexiconColumn, StateObject } from '../../store/types';

import toaster from '../../components/toaster';
import yesNoAlert from '../../components/yesNoAlert';
import { $i } from '../../components/DollarSignExports';

interface ImporterProps extends ExtraCharactersModalOpener {
	currentInput: string
	dispatchFunc: Function
}

interface ColumnTest {
	col: number
	test: string
}

const LexiconImporterModal = (props: ImporterProps) => {
	const {
		isOpen,
		setIsOpen,
		openECM,
		currentInput,
		dispatchFunc
	} = props;
	const { columns, lexicon } = useSelector((state: StateObject) => state.lexicon);
	const maxCols = columns.length - 1;
	const [doAlert] = useIonAlert();
	const [doToast, undoToast] = useIonToast();
	const dispatch = useDispatch();
	const [importing, setImporting] = useState<boolean[]>([]);
	const [addingWordTest, setAddingWordTest] = useState<boolean>(false);
	const [addingWordMatch, setAddingWordMatch] = useState<boolean>(false);
	const [addingColumnTest, setAddingColumnTest] = useState<boolean>(false);
	const [addingColumn, setAddingColumn] = useState<number>(0);
	const [addingColumnMatch, setAddingColumnMatch] = useState<boolean>(false);
	const [wordTests, setWordTests] = useState<string[]>([]);
	const [columnTests, setColumnTests] = useState<ColumnTest[]>([]);
	const [wordMatches, setWordMatches] = useState<string[]>([]);
	const [columnMatches, setColumnMatches] = useState<ColumnTest[]>([]);
	const [matchAll, setMatchAll] = useState<boolean>(false);

	useEffect(() => {
		const bools: boolean[] = [];
		columns.forEach(col => bools.push(false));
		setImporting(bools);
	}, [columns]);

	const maybeDoClose = () => {
		// Check for unsaved info?
		if(
			importing.some(imp => imp)
			|| (
				wordTests.length
				+ columnTests.length
				+ wordMatches.length
				+ columnMatches.length
			) > 0
		) {
			return yesNoAlert({
				message: "Exit Without Importing?",
				submit: "Are you sure?",
				cssClass: "warning",
				handler: doClose,
				doAlert
			});
		}
		doClose();
	};

	const doClose = () => {
		setIsOpen(false);
		setWordTests([]);
		setColumnTests([]);
		setWordMatches([]);
		setColumnMatches([]);
	};

	const addWordTest = () => {
		const el = $i("word");
		if(!el || !el.value) {
			return toaster({
				message: "Nothing to save.",
				color: "danger",
				duration: 1500,
				position: "bottom",
				doToast,
				undoToast
			});
		}
		setWordTests([...wordTests, el.value]);
		setAddingWordTest(false);
		el.value = "";
		return toaster({
			message: "Saved",
			color: "success",
			duration: 2000,
			position: "bottom",
			doToast,
			undoToast
		});
	};
	const addWordMatch = () => {
		const el = $i("wordMatch");
		if(!el || !el.value) {
			return toaster({
				message: "Nothing to save.",
				color: "danger",
				duration: 1500,
				position: "bottom",
				doToast,
				undoToast
			});
		}
		setWordMatches([...wordTests, el.value]);
		setAddingWordMatch(false);
		el.value = "";
		return toaster({
			message: "Saved",
			color: "success",
			duration: 2000,
			position: "bottom",
			doToast,
			undoToast
		});
	};
	const addColumnTest = () => {
		const el = $i("colTest");
		if(!el || !el.value) {
			return toaster({
				message: "Nothing to save.",
				color: "danger",
				duration: 1500,
				position: "bottom",
				doToast,
				undoToast
			});
		}
		setColumnTests([...columnTests, {
			col: addingColumn,
			test: el.value
		}]);
		setAddingColumnTest(false);
		setAddingColumn(0);
		el.value = "";
		return toaster({
			message: "Saved",
			color: "success",
			duration: 2000,
			position: "bottom",
			doToast,
			undoToast
		});
	};
	const addColumnMatch = () => {
		const el = $i("colMatch");
		if(!el || !el.value) {
			return toaster({
				message: "Nothing to save.",
				color: "danger",
				duration: 1500,
				position: "bottom",
				doToast,
				undoToast
			});
		}
		setColumnMatches([...columnMatches, {
			col: addingColumn,
			test: el.value
		}]);
		setAddingColumnMatch(false);
		setAddingColumn(0);
		el.value = "";
		return toaster({
			message: "Saved",
			color: "success",
			duration: 2000,
			position: "bottom",
			doToast,
			undoToast
		});
	};

	const importLexicon = () => {
		// NEEDS MASSIVE CHANGE
		const inputOptions: { [key: string]: string } = {};
		columns.forEach((col: LexiconColumn) => {
			inputOptions[col.id] = col.label;
		});
		const thenFunc = (cols: number[]) => {
			let newInput = currentInput;
			if(newInput) {
				newInput += "\n"
			}
			lexicon.forEach((word: Lexicon) => {
				cols.forEach(col => {
					const imp = word.columns[col];
					imp && (newInput += imp + "\n");	
				})
			});
			dispatch(dispatchFunc(newInput));
		};
		if(columns.length === 1) {
			thenFunc([0]);
		} else {
			doAlert({
				header: "Import from Lexicon",
				message: "Which column do you want to input?",
				inputs: columns.map((col: LexiconColumn, i: number) => {
					const input: AlertInput = {
						type: 'radio',
						label: col.label,
						value: i + 1,
						checked: !i
					};
					return input;
				}),
				buttons: [
					{
						text: "Cancel",
						role: 'cancel'
					},
					{
						text: "Import",
						handler: (col: number | undefined) => {
							if(!col) {
								// Treat as cancel
								return;
							}
							thenFunc([col - 1]);
							// Toast
							toaster({
								message: `Imported words from "${columns[col - 1].label}"`,
								duration: 3500,
								position: "top",
								color: "success",
								doToast,
								undoToast
							});
						}
					}
				]
			});
		}
	};
	return (
		<IonModal isOpen={isOpen} onDidDismiss={() => doClose()}>
			<IonHeader>
				<IonToolbar color="primary">
					<IonTitle>Import From Lexicon</IonTitle>
					<IonButtons slot="end">
						<IonButton onClick={() => openECM(true)}>
							<IonIcon icon={globeOutline} />
						</IonButton>
						<IonButton onClick={() => maybeDoClose()}>
							<IonIcon icon={closeCircleOutline} />
						</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<IonList id="lexiconImporter" lines="full" className="hasSpecialLabels lexiconImporter hasToggles">
					<IonItem>
						<IonLabel>Import from which column(s)?</IonLabel>
					</IonItem>
					{maxCols < 0 ?
						<IonItem>
							<h1>Lexicon Has No Columns</h1>
						</IonItem>
					:
						<>
							{columns.map((col, i) => {
								return (
									<IonItem
										key={`lexColImporter:${col.id}`}
										lines={i === maxCols ? "full" : "none"}
										className="columnListing"
									>
										<IonCheckbox checked={importing[i]}>{col.label}</IonCheckbox>
									</IonItem>
								);
							})}
							<IonItemDivider>Conditions (optional)</IonItemDivider>
							<IonItem className={"wrappableInnards doubleable" + (addingWordTest ? " toggled" : "")}>
								<IonLabel className="ion-text-wrap">Word must contain [x]</IonLabel>
								<IonButton
									color={addingWordTest ? "warning" : "primary"}
									slot="end"
									disabled={addingWordMatch || addingColumnTest || addingColumnMatch}
									onClick={() => setAddingWordTest(!addingWordTest)}
								><IonIcon icon={addingWordTest ? close : add} slot="icon-only" /></IonButton>
							</IonItem>
							<IonItem className={"toggleable wrappableInnards biggerToggle" + (addingWordTest ? "" : " toggled")}>
								<IonInput id="word" placeholder="Type part of word here." />
								<IonButton
									color="success"
									slot="end"
									onClick={() => addWordTest()}
								><IonIcon icon={save} slot="icon-only" /></IonButton>
							</IonItem>

							<IonItem className={"wrappableInnards doubleable" + (addingWordMatch ? " toggled" : "")}>
								<IonLabel className="ion-text-wrap">Word must match expression [x]</IonLabel>
								<IonButton
									color={addingWordMatch ? "warning" : "primary"}
									slot="end"
									disabled={addingWordTest || addingColumnTest || addingColumnMatch}
									onClick={() => setAddingWordMatch(!addingWordMatch)}
								><IonIcon icon={addingWordMatch ? close : add} slot="icon-only" /></IonButton>
							</IonItem>
							<IonItem className={"toggleable wrappableInnards" + (addingWordMatch ? "" : " toggled")}>
								<IonInput id="wordMatch" placeholder="Type regular expression here." />
								<IonButton
									color="success"
									slot="end"
									onClick={() => addWordMatch()}
								><IonIcon icon={save} slot="icon-only" /></IonButton>
							</IonItem>

							<IonItem className={"wrappableInnards doubleable" + (addingColumnTest ? " toggled" : "")}>
								<IonLabel className="ion-text-wrap">Column [x] must contain [y]</IonLabel>
								<IonButton
									color={addingColumnTest ? "warning" : "primary"}
									slot="end"
									disabled={addingWordTest || addingWordMatch || addingColumnMatch}
									onClick={() => setAddingColumnTest(!addingColumnTest)}
								><IonIcon icon={addingColumnTest ? close : add} slot="icon-only" /></IonButton>
							</IonItem>
							<IonItem
								className={"toggleable wrappableInnards" + (addingColumnTest ? "" : " toggled")}
								lines="none"
							>
								<IonSelect
									color="primary"
									className="ion-text-wrap settings"
									justify="start"
									label="Test column:"
									value={addingColumn}
									onIonChange={(e) => setAddingColumn(e.detail.value)}
								>
									{columns.map((col, i) => {
										return (
											<IonSelectOption
												key={`lexColImportAdder1:${col.id}`}
												className="ion-text-wrap ion-text-align-end"
												value={i}
											>{col.label}</IonSelectOption>
										);
									})}
								</IonSelect>
							</IonItem>
							<IonItem className={"toggleable wrappableInnards" + (addingColumnTest ? "" : " toggled")}>
								<IonInput id="colTest" placeholder="Type part of word here." />
								<IonButton
									color="success"
									slot="end"
									onClick={() => addColumnTest()}
								><IonIcon icon={save} slot="icon-only" /></IonButton>
							</IonItem>

							<IonItem className={"wrappableInnards doubleable" + (addingColumnMatch ? " toggled" : "")}>
								<IonLabel className="ion-text-wrap">Column [x] must match expression [y]</IonLabel>
								<IonButton
									color={addingColumnMatch ? "warning" : "primary"}
									slot="end"
									disabled={addingWordTest || addingWordMatch || addingColumnTest}
									onClick={() => setAddingColumnMatch(!addingColumnMatch)}
								><IonIcon icon={addingColumnMatch ? close : add} slot="icon-only" /></IonButton>
							</IonItem>
							<IonItem
								className={"toggleable wrappableInnards" + (addingColumnMatch ? "" : " toggled")}
								lines="none"
							>
								<IonSelect
									color="primary"
									className="ion-text-wrap settings"
									justify="start"
									label="Test column:"
									value={addingColumn}
									onIonChange={(e) => setAddingColumn(e.detail.value)}
								>
									{columns.map((col, i) => {
										return (
											<IonSelectOption
												key={`lexColImportAdder2:${col.id}`}
												className="ion-text-wrap ion-text-align-end"
												value={i}
											>{col.label}</IonSelectOption>
										);
									})}
								</IonSelect>
							</IonItem>
							<IonItem className={"toggleable wrappableInnards" + (addingColumnMatch ? "" : " toggled")}>
								<IonInput id="colMatch" placeholder="Type regular expression here." />
								<IonButton
									color="success"
									slot="end"
									onClick={() => addColumnMatch()}
								><IonIcon icon={save} slot="icon-only" /></IonButton>
							</IonItem>

							{ wordTests.length > 0 ?
								<IonItem>{wordTests.map(test => test)}</IonItem>
							: <></> }
							{ wordMatches.length > 0 ?
								<IonItem>{wordMatches.map(test => test)}</IonItem>
							: <></> }
							{ columnTests.length > 0 ?
								<IonItem>{columnTests.map(coltest => <></>)}</IonItem>
							: <></> }
							{ columnMatches.length > 0 ?
								<IonItem>{columnMatches.map(coltest => <></>)}</IonItem>
							: <></> }
							<IonItem
								className={
									"wrappableInnards toggleable biggerToggle"
									+ ((
										wordTests.length
										+ columnTests.length
										+ wordMatches.length
										+ columnMatches.length
									> 1) ? "" : " toggled")
								}
							>
								<IonToggle
									labelPlacement="start"
									enableOnOffLabels
									checked={matchAll}
									onIonChange={e => setMatchAll(!matchAll)}
								>
									<h2>Match all conditions</h2>
									<p>If off, this will import words that match any condition.</p>
								</IonToggle>
							</IonItem>
						</>
					}
				</IonList>
			</IonContent>
			<IonFooter>
				<IonToolbar>
					<IonButton color="warning" slot="start" onClick={() => maybeDoClose()}>
						<IonIcon icon={closeCircleOutline} slot="start" />
						<IonLabel>Cancel</IonLabel>
					</IonButton>
					<IonButton color="success" slot="end" onClick={() => importLexicon()}>
						<IonIcon icon={enterOutline} slot="start" />
						<IonLabel>Import</IonLabel>
					</IonButton>
				</IonToolbar>
			</IonFooter>
		</IonModal>
	);
};

export default LexiconImporterModal;
