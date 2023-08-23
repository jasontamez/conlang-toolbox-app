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
	IonInput,
	IonFooter,
	IonRow,
	IonCol,
	IonGrid,
	IonReorderGroup,
	IonReorder,
	IonCheckbox,
	IonItemDivider
} from '@ionic/react';
import {
	closeCircleOutline,
	saveOutline,
	reorderTwo,
	trashOutline,
	addCircleOutline,
	globeOutline,
	checkmarkOutline
} from 'ionicons/icons';
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { colEdit, Lexicon } from '../components/ReduxDucksTypes';
import {
	openModal,
	closeModal,
	updateLexiconColumns,
	updateLexiconOrder,
	toggleLexiconWrap,
	updateLexiconSort,
	updateLexiconBool
} from '../components/ReduxDucksFuncs';
import fireSwal from '../components/Swal';
import escape from '../components/EscapeForHTML';
import { $i } from '../components/DollarSignExports';

const EditLexiconOrderModal = () => {
	const dispatch = useDispatch();
	const [settings, modalState, lexicon] = useSelector((state: any) => [state.appSettings, state.modalState, state.lexicon], shallowEqual);
	const theOrder = lexicon.columnOrder;
	const theTitles = lexicon.columnTitles;
	const [sortedColumn, sortDirection] = lexicon.sort;
	let editing: colEdit = lexicon.colEdit;
	if(!editing) {
		editing = {
			reordering: false,
			columns: lexicon.columns,
			columnOrder: [...lexicon.columnOrder],
			columnTitles: [...lexicon.columnTitles],
			columnSizes: [...lexicon.columnSizes],
			sort: [...lexicon.sort]
		};
	} else {
		editing = {
			...editing,
			columnOrder: [...editing.columnOrder],
			columnTitles: [...editing.columnTitles],
			columnSizes: [...editing.columnSizes],
			sort: [...editing.sort]
		};
	}
//	let cols = editing.columns;
//	let sort = editing.sort;
	const setNewInfo = (i: number, id: string) => {
		const value = $i(id).value.trim();
		editing.columnTitles[i] = value;
		dispatch(updateLexiconColumns(editing));
	};
	let cancelEditing = () => {
		dispatch(closeModal('EditLexiconOrder'));
	};
	const handleCheckboxes = (i: number, value: "s" | "m" | "l") => {
		editing.columnSizes[i] = value;
		dispatch(updateLexiconColumns(editing));
	};
	const maybeSaveNewInfo = () => {
		let err: string[] = [];
		// Test info for validness, then save if needed and reset the editingRule
		if(err.length > 0) {
			// Errors found.
			fireSwal({
				title: "Error",
				icon: "error",
				text: err.join("; ")
			});
			return;
		}
		// Everything ok!
		dispatch(closeModal('EditLexiconOrder'));
		//dispatch(doEditRewriteRuleWG(editingRule));
		fireSwal({
			title: "Saved!",
			toast: true,
			timer: 2500,
			timerProgressBar: true,
			showConfirmButton: false
		});
	};
	const addNewColumn = () => {
		editing.columnTitles.push("New");
		editing.columnSizes.push("m");
		editing.columnOrder.push(editing.columns++);
		dispatch(updateLexiconColumns(editing));
		let newLex: Lexicon[] = [];
		lexicon.lexicon.forEach((lex: Lexicon) => {
			let lx = {
				key: lex.key,
				columns: [...lex.columns, ""]
			};
			newLex.push(lx);
		});
		dispatch(updateLexiconOrder(newLex));
		fireSwal({
			title: "Added New Column",
			toast: true,
			timer: 2500,
			timerProgressBar: true,
			showConfirmButton: false
		});
	};
	const deleteField = (i: number) => {
		const thenFunc = () => {
			editing.columns--;
			editing.columnTitles = editing.columnTitles.slice(0, i).concat(editing.columnTitles.slice(i+1));
			editing.columnSizes = editing.columnSizes.slice(0, i).concat(editing.columnSizes.slice(i+1));
			editing.columnOrder = editing.columnOrder.filter((o: number) => (o !== i)).map((o: number) => (o > i ? o - 1 : o));
			let sorty = editing.sort[0];
			if(sorty === i) {
				editing.sort[0] = 0;
			} else if (sorty > i) {
				editing.sort[0] = sorty - 1;
			}
			dispatch(updateLexiconColumns(editing));
			let newLex: Lexicon[] = [];
			lexicon.lexicon.forEach((lex: Lexicon) => {
				let col = lex.columns.slice(0, i).concat(lex.columns.slice(i + 1));
				newLex.push({
					key: lex.key,
					columns: col
				});
			});
			dispatch(updateLexiconOrder(newLex));
			};
		if(settings.disableConfirms) {
			thenFunc();
		} else {
			fireSwal({
				html: "<h1>" + escape(editing.columnTitles[i]) + "</h1>Are you sure you want to delete this? This cannot be undone.",
				customClass: {popup: 'deleteConfirm'},
				icon: 'warning',
				showCancelButton: true,
				confirmButtonText: "Yes, delete it."
			}).then((result: any) => result.isConfirmed && thenFunc());
		}
	};
	const doReorder = (event: CustomEvent) => {
		const reorganize = (what: any[], from: number, to: number) => {
			let moved = what[from];
			let remains = what.slice(0, from).concat(what.slice(from + 1));
			return remains.slice(0, to).concat(moved, remains.slice(to));
		};
		const ed = event.detail;
		editing.columnOrder = reorganize(editing.columnOrder, ed.from, ed.to);
		dispatch(updateLexiconColumns(editing));
		ed.complete();
	};
	const toggleWrap = () => {
		dispatch(toggleLexiconWrap());
	};
	const doSort = (col: number, dir: number) => {
		const newLex: Lexicon[] = lexicon.lexicon.slice();
		newLex.sort((a, b) => {
			let x = a.columns[col];
			let y: string;
			let comp: number;
			if(dir) {
				y = x;
				x = b.columns[col];
			} else {
				y = b.columns[col];
			}
			try {
				comp = x.localeCompare(y, 'en', {numeric: true, usage: 'sort'});
			} catch(error) {
				comp = 0;
				console.log(error);
			}
			return comp;
		});
		dispatch(updateLexiconSort([col, dir]));
		dispatch(updateLexiconOrder(newLex));
		dispatch(updateLexiconBool("sorted", true));
	};
	return (
		<IonModal isOpen={modalState.EditLexiconOrder} onDidDismiss={() => dispatch(closeModal('EditLexiconOrder'))}>
			<IonHeader>
				<IonToolbar color="primary">
					<IonTitle>Edit Columns</IonTitle>
					<IonButtons slot="end">
						<IonButton onClick={() => dispatch(openModal("ExtraCharacters"))}>
							<IonIcon icon={globeOutline} />
						</IonButton>
						<IonButton onClick={() => cancelEditing()}>
							<IonIcon icon={closeCircleOutline} />
						</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent id="editLexiconItemOrder">
				<IonList lines="full">
					<IonItemDivider>Lexicon Options</IonItemDivider>
					<IonItem button={true} onClick={() => toggleWrap()}>
						<IonLabel>{lexicon.lexiconWrap ? "Disable" : "Turn On"} Text Wrapping</IonLabel>
					</IonItem>
					<IonItemDivider>Sort Column</IonItemDivider>
					{theOrder.map((i: number) => {
						const title = theTitles[i];
						const which = i.toString();
						return (
							<IonItem key={which} button={true} onClick={() => doSort(i, sortDirection)}>
								<IonLabel slot="start">{title}</IonLabel>
								{i === sortedColumn ?
									<IonIcon slot="end" icon={checkmarkOutline} />
								:
									<></>
								}
							</IonItem>
						);
					})}
					<IonItemDivider>Sort Direction</IonItemDivider>
					<IonItem button={true} onClick={() => doSort(sortedColumn, 0)}>
						<IonLabel slot="start">Descending ↓</IonLabel>
						{0 === sortDirection ?
							<IonIcon slot="end" icon={checkmarkOutline} />
						:
							<></>
						}
					</IonItem>
					<IonItem button={true} onClick={() => doSort(sortedColumn, 1)}>
						<IonLabel slot="start">Ascending ↑</IonLabel>
						{1 === sortDirection ?
							<IonIcon slot="end" icon={checkmarkOutline} />
						:
							<></>
						}
					</IonItem>
					<IonItemDivider>Rearrange Lexicon Columns</IonItemDivider>
					<IonReorderGroup disabled={false} onIonItemReorder={doReorder}>
						{editing.columnOrder.map((i: number) => {
							const iStr = i.toString();
							const sizes = editing.columnSizes;
							return (
								<IonItem lines="full" key={iStr}>
									<IonReorder className="ion-padding-end"><IonIcon icon={reorderTwo} /></IonReorder>
									<IonGrid>
										<IonRow className="ion-align-items-center">
											<IonCol>
												<IonInput placeholder="Field Name" id={"thislex" + iStr} value={editing.columnTitles[i]} onIonBlur={() => setNewInfo(i, "thislex" + iStr)} />
											</IonCol>
											<IonCol size="auto">
												<IonButton color="danger" onClick={() => deleteField(i)}><IonIcon icon={trashOutline} /></IonButton>
											</IonCol>
										</IonRow>
										<IonRow className="ion-align-items-center">
											<IonCol>
												<IonCheckbox labelPlacement="start" justify="start" aria-label="Small size" checked={sizes[i] === "s"} onClick={() => handleCheckboxes(i, "s")}>Small</IonCheckbox>
											</IonCol>
											<IonCol>
												<IonCheckbox labelPlacement="start" justify="start" aria-label="Medium size" checked={sizes[i] === "m"} onClick={() => handleCheckboxes(i, "m")}>Med</IonCheckbox>
											</IonCol>
											<IonCol>
												<IonCheckbox labelPlacement="start" justify="start" aria-label="Large size" checked={sizes[i] === "l"} onClick={() => handleCheckboxes(i, "l")}>Large</IonCheckbox>
											</IonCol>
										</IonRow>
									</IonGrid>
								</IonItem>
							);
						})}
					</IonReorderGroup>
				</IonList>
			</IonContent>
			<IonFooter id="footerElement">
				<IonToolbar color="darker">
					<IonButton color="success" slot="end" onClick={() => addNewColumn()}>
						<IonIcon icon={addCircleOutline} slot="start" />
						<IonLabel>Add Column</IonLabel>
					</IonButton>
					<IonButton color="tertiary" slot="end" onClick={() => maybeSaveNewInfo()}>
						<IonIcon icon={saveOutline} slot="start" />
						<IonLabel>Done</IonLabel>
					</IonButton>
				</IonToolbar>
			</IonFooter>
		</IonModal>
	);
};

export default EditLexiconOrderModal;
