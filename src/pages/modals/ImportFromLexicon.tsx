import React, { useState } from 'react';
import { useSelector } from 'react-redux';
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
	IonItemDivider,
	IonItemSliding,
	IonItemOptions,
	IonItemOption
} from '@ionic/react';
import {
	enterOutline,
	globeOutline,
	closeCircleOutline,
	add,
	save,
	close,
	trash
} from 'ionicons/icons';

import { ExtraCharactersModalOpener, StateObject } from '../../store/types';

import toaster from '../../components/toaster';
import yesNoAlert from '../../components/yesNoAlert';
import { $i } from '../../components/DollarSignExports';

interface ImporterProps extends ExtraCharactersModalOpener {
	currentInput: string
	importFunc: Function
}

interface ColumnTest {
	col: number
	test: string
}

// Testing words to see if they are eligible for importing
const testColumns = (lex: string[], tests: ColumnTest[], matchAll: boolean) => {
	const method = matchAll ? "every" : "some";
	return tests[method](testObject => {
		const { col, test } = testObject;
		const word = lex[col] || "";
		return word.indexOf(test) >= 0;
	});
};
const testColumnMatches = (lex: string[], tests: ColumnTest[], matchAll: boolean) => {
	const method = matchAll ? "every" : "some";
	return tests[method](testObject => {
		const { col, test } = testObject;
		const regex = new RegExp(test);
		const word = lex[col] || "";
		return word.match(regex);
	});
};
const testWords = (word: string, tests: string[], matchAll: boolean) => {
	const method = matchAll ? "every" : "some";
	return tests[method](testString => {
		return word.indexOf(testString) >= 0;
	});
};
const testMatches = (word: string, tests: string[], matchAll: boolean) => {
	const method = matchAll ? "every" : "some";
	return tests[method](testString => {
		const regex = new RegExp(testString);
		return word.match(regex);
	});
};

// Printing out matching tests
const displayTest = (text: string, deleter: Function, finalFlag: boolean) => {
	return (
		<IonItemSliding className="importFromLexiconSlider" key={`displayingTest:${text}`}>
			<IonItemOptions>
				<IonItemOption color="danger" onClick={() => deleter()}>
					<IonIcon slot="icon-only" icon={trash} />
				</IonItemOption>
			</IonItemOptions>
			<IonItem>
				<IonLabel className="wrappableInnards ion-text-end">{text}</IonLabel>
				<IonIcon size="small" slot="end" src="svg/slide-indicator.svg" />
			</IonItem>
		</IonItemSliding>
	);
};

const LexiconImporterModal = (props: ImporterProps) => {
	const {
		isOpen,
		setIsOpen,
		openECM,
		currentInput,
		importFunc
	} = props;
	const { columns, lexicon } = useSelector((state: StateObject) => state.lexicon);
	const maxCols = columns.length - 1;
	const [doAlert] = useIonAlert();
	const toast = useIonToast();
	const [importing, setImporting] = useState<boolean[]>([]);
	const [addingWordTest, setAddingWordTest] = useState<boolean>(false);
	const [addingWordMatch, setAddingWordMatch] = useState<boolean>(false);
	const [addingColumn, setAddingColumn] = useState<number>(0);
	const [addingColumnTest, setAddingColumnTest] = useState<boolean>(false);
	const [addingColumnMatch, setAddingColumnMatch] = useState<boolean>(false);
	const [wordTests, setWordTests] = useState<string[]>([]);
	const [columnTests, setColumnTests] = useState<ColumnTest[]>([]);
	const [wordMatches, setWordMatches] = useState<string[]>([]);
	const [columnMatches, setColumnMatches] = useState<ColumnTest[]>([]);
	const [matchAll, setMatchAll] = useState<boolean>(false);

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
				submit: "Yes, Exit",
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
		setAddingWordTest(false);
		setAddingWordMatch(false);
		setAddingColumnTest(false);
		setAddingColumnMatch(false);
		setMatchAll(false);
	};

	const onLoad = () => {
		const bools: boolean[] = [];
		columns.forEach(col => bools.push(false));
		setImporting(bools);
	};

	// Import words from Lexicon
	const importLexicon = () => {
		const cols: number[] = [];
		importing.forEach((imp, i) => {
			if(imp) {
				cols.push(i);
			}
		});
		if(cols.length === 0) {
			return toaster({
				message: "Please select at least one column to import from.",
				color: "danger",
				duration: 2500,
				position: "middle",
				toast
			});
		}
		// We have column(s) to import from.
		const possibles: string[] = [];
		// Go through the lexicon and test each item.
		lexicon.forEach(lex => {
			let flag: boolean | null = null;
			if(columnTests.length > 0) {
				flag = testColumns(lex.columns, columnTests, matchAll);
				if(matchAll && !flag) {
					// Matching has failed (column tests)
					return;
				}
			}
			if(columnMatches.length > 0) {
				flag = testColumnMatches(lex.columns, columnMatches, matchAll);
				if(matchAll && !flag) {
					// Matching has failed (column matches)
					return;
				}
			}
			// At this point, we only need to look at the word itself
			const words = cols.map(col => lex.columns[col]).filter(word => {
				if(!word) {
					// Ignore blanks
					return false;
				} else if(!matchAll && flag) {
					// This word has already qualified
					return true;
				}
				// At this point, flag is either false or null, or it's true with matchAll true
				let innerFlag: boolean | null = flag;
				if(wordTests.length > 0) {
					innerFlag = testWords(word, wordTests, matchAll);
					if(matchAll && !innerFlag) {
						// Matching has failed (word tests)
						return false;
					}
				}
				if(wordMatches.length > 0) {
					// Last set of matches determines it all
					return testMatches(word, wordMatches, matchAll);
				}
				// At this point, innerFlag is either false or null, or it's true with matchAll true
				// If null, there were no tests to match, so it goes through
				return (innerFlag === null) ? true : innerFlag;
			});
			possibles.push(...words);
		});
		if(possibles.length === 0) {
			return toaster({
				message: "Did not find anything to import.",
				color: "danger",
				duration: 4500,
				position: "middle",
				toast
			});
		}
		const final = possibles.join("\n");
		// Save information
		const base = currentInput ? currentInput + "\n" : "";
		importFunc(base + final);
		toaster({
			message: `Imported ${possibles.length} word${possibles.length === 1 ? "" : "s"} from Lexicon.`,
			color: "success",
			duration: 3500,
			position: "middle",
			toast
		});
		doClose();
	};
	const toggleImport = (col: number) => {
		const newImporting = [...importing];
		newImporting[col] = !importing[col];
		setImporting(newImporting);
	};

	// Add various tests
	const addWordTest = () => {
		const el = $i<HTMLInputElement>("word");
		if(!el || !el.value) {
			return toaster({
				message: "Nothing to save.",
				color: "danger",
				duration: 1500,
				position: "bottom",
				toast
			});
		}
		const input = el.value;
		setWordTests([...wordTests.filter(x => x !== input), input]);
		setAddingWordTest(false);
		el.value = "";
		return toaster({
			message: "Saved",
			color: "success",
			duration: 2000,
			position: "bottom",
			toast
		});
	};
	const addWordMatch = () => {
		const el = $i<HTMLInputElement>("wordMatch");
		if(!el || !el.value) {
			return toaster({
				message: "Nothing to save.",
				color: "danger",
				duration: 1500,
				position: "bottom",
				toast
			});
		}
		const input = el.value;
		setWordMatches([...wordMatches.filter(x => x !== input), input]);
		setAddingWordMatch(false);
		el.value = "";
		return toaster({
			message: "Saved",
			color: "success",
			duration: 2000,
			position: "bottom",
			toast
		});
	};
	const addColumnTest = () => {
		const el = $i<HTMLInputElement>("colTest");
		if(!el || !el.value) {
			return toaster({
				message: "Nothing to save.",
				color: "danger",
				duration: 1500,
				position: "bottom",
				toast
			});
		}
		const input = el.value;
		setColumnTests([
			...columnTests.filter(x => x.col !== addingColumn && x.test !== input),
			{
				col: addingColumn,
				test: input
			}
		]);
		setAddingColumnTest(false);
		setAddingColumn(0);
		el.value = "";
		return toaster({
			message: "Saved",
			color: "success",
			duration: 2000,
			position: "bottom",
			toast
		});
	};
	const addColumnMatch = () => {
		const el = $i<HTMLInputElement>("colMatch");
		if(!el || !el.value) {
			return toaster({
				message: "Nothing to save.",
				color: "danger",
				duration: 1500,
				position: "bottom",
				toast
			});
		}
		const input = el.value;
		setColumnMatches([
			...columnMatches.filter(x => x.col !== addingColumn && x.test !== input),
			{
				col: addingColumn,
				test: input
			}
		]);
		setAddingColumnMatch(false);
		setAddingColumn(0);
		el.value = "";
		return toaster({
			message: "Saved",
			color: "success",
			duration: 2000,
			position: "bottom",
			toast
		});
	};

	// Remove various tests
	const deleteWordTest = (test: string) => {
		setWordTests(wordTests.filter(x => x !== test));
	};
	const deleteWordMatch = (test: string) => {
		setWordMatches(wordMatches.filter(x => x !== test));
	};
	const deleteColumnTest = (col: number, test: string) => {
		setColumnTests(columnTests.filter(x => x.col !== col && x.test !== test));
	};
	const deleteColumnMatch = (col: number, test: string) => {
		setColumnMatches(columnMatches.filter(x => x.col !== col && x.test !== test));
	};

	return (
		<IonModal isOpen={isOpen} onDidDismiss={() => doClose()} onIonModalDidPresent={onLoad}>
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
				<IonList id="lexiconImporter" lines="full" className="lexiconImporter hasToggles">
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
										onClick={() => toggleImport(i)}
									>
										<IonCheckbox checked={importing[i]}>{col.label}</IonCheckbox>
									</IonItem>
								);
							})}
							<IonItemDivider>Add Conditions (optional)</IonItemDivider>
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
								<>
									<IonItemDivider>Words that contain:</IonItemDivider>
									{wordTests.map((test, i) => {
										return displayTest(
											test,
											() => deleteWordTest(test),
											(i + 1) === wordTests.length
										)
									})}
								</>
							: <></> }
							{ wordMatches.length > 0 ?
								<>
									<IonItemDivider>Words that match:</IonItemDivider>
									{wordMatches.map((test, i) => {
										return displayTest(
											`/${test}/`,
											() => deleteWordMatch(test),
											(i + 1) === wordMatches.length
										)
									})}
								</>
							: <></> }
							{ columnTests.length > 0 ?
								<>
									<IonItemDivider>Words where the column:</IonItemDivider>
									{columnTests.map((obj, i) => {
										const {col, test} = obj;
										return displayTest(
											`[${columns[col].label}] contains "${test}"`,
											() => deleteColumnTest(col, test),
											(i + 1) === columnTests.length
										)
									})}
								</>
							: <></> }
							{ columnMatches.length > 0 ?
								<>
									<IonItemDivider>Words that match:</IonItemDivider>
									{columnMatches.map((obj, i) => {
										const {col, test} = obj;
										return displayTest(
											`[${columns[col].label}] matches /${test}/`,
											() => deleteColumnMatch(col, test),
											(i + 1) === columnMatches.length
										)
									})}
								</>
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
