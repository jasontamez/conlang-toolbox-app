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
	IonSelect,
	IonSelectOption
} from '@ionic/react';
import {
	closeCircleOutline,
	saveOutline,
	swapHorizontalOutline,
	reorderTwo,
	trashOutline,
	addCircleOutline
} from 'ionicons/icons';
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import './App.css';
import { colEdit, Lexicon } from '../components/ReduxDucksTypes';
import { closeModal, updateLexiconColumns, updateLexiconOrder } from '../components/ReduxDucksFuncs';
import fireSwal from '../components/Swal';
import escape from '../components/EscapeForHTML';
import { $i } from '../components/DollarSignExports';

const EditLexiconOrderModal = () => {
	const dispatch = useDispatch();
	const [settings, modalState, lexicon] = useSelector((state: any) => [state.appSettings, state.modalState, state.lexicon], shallowEqual);
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
	}
	let reordering = editing.reordering;
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
	const beginAdding = () => {
		let eCL = $i("editLexiconItemOrder").classList;
		eCL.add("addActive");
		eCL.remove("addInactive");
		eCL = $i("footerElement").classList;
		eCL.add("addActive");
		eCL.remove("addInactive");
		$i("thislexnew").value = "";
		$i("thissizenew").value = "m";
	};
	const cancelAdding = () => {
		let eCL = $i("editLexiconItemOrder").classList;
		eCL.remove("addActive");
		eCL.add("addInactive");
		eCL = $i("footerElement").classList;
		eCL.remove("addActive");
		eCL.add("addInactive");
	};
	const finishAdding = () => {
		cancelAdding();
		let title = $i("thislexnew").value;
		let size = $i("thissizenew").value;
		editing.columnTitles.push(title);
		editing.columnSizes.push(size);
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
			title: "Added!",
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
	const beginReorder = () => {
		editing.reordering = true;
		dispatch(updateLexiconColumns(editing));
	};
	const doReorder = (event: CustomEvent) => {
		const reorganize = (what: any[], from: number, to: number) => {
			let moved = what[from];
			let remains = what.slice(0, from).concat(what.slice(from + 1));
			return remains.slice(0, to).concat(moved, remains.slice(to));
		};
		const ed = event.detail;
		editing.columnOrder = reorganize(editing.columnOrder, ed.from, ed.to);
		ed.complete();
	};
	const endReorder = () => {
		editing.reordering = false;
		dispatch(updateLexiconColumns(editing));
	};
	return (
		<IonModal isOpen={modalState.EditLexiconOrder} onDidDismiss={() => dispatch(closeModal('EditLexiconOrder'))}>
			<IonHeader>
				<IonToolbar color="primary">
					<IonTitle>Edit Columns</IonTitle>
					<IonButtons slot="end">
						<IonButton onClick={() => cancelEditing()}>
							<IonIcon icon={closeCircleOutline} />
						</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent id="editLexiconItemOrder" className="addInactive">
				<IonList>
					<IonItem className="hideUnlessAdding">
						<IonGrid>
							<IonRow className="ion-align-items-center">
								<IonCol size="auto">
									<IonLabel>Field Name: </IonLabel>
								</IonCol>
								<IonCol>
									<IonInput id="thislexnew" type="text" />
								</IonCol>
							</IonRow>
							<IonRow className="ion-align-items-center">
								<IonCol>
									<IonLabel>Field Size: </IonLabel>
								</IonCol>
								<IonCol>
									<IonSelect interface="popover" id="thissizenew" value="m">
										<IonSelectOption value="s">Small</IonSelectOption>
										<IonSelectOption value="m">Medium</IonSelectOption>
										<IonSelectOption value="l">Large</IonSelectOption>
									</IonSelect>
								</IonCol>
							</IonRow>
						</IonGrid>
					</IonItem>
					<IonReorderGroup disabled={!reordering} className={"hideWhileAdding " + (reordering ? "dragActive" : "dragInactive")} onIonItemReorder={doReorder}>
						{editing.columnOrder.map((i: number) => {
							const iStr = i.toString();
							const sizes = editing.columnSizes;
							return (
								<IonReorder key={iStr}>
									<IonItem>
										<IonIcon icon={reorderTwo} slot="start" className="showWhileDragging" />
										<IonLabel className="showWhileDragging">{editing.columnTitles[i]}</IonLabel>
										<IonGrid className="hideWhileDragging">
											<IonRow className="ion-align-items-center">
												<IonCol size="auto">
													<IonLabel>Field Name: </IonLabel>
												</IonCol>
												<IonCol>
													<IonInput id={"thislex" + iStr} value={editing.columnTitles[i]} onIonBlur={() => setNewInfo(i, "thislex" + iStr)} />
												</IonCol>
												<IonCol size="auto">
													<IonButton color="danger" onClick={() => deleteField(i)}><IonIcon icon={trashOutline} /></IonButton>
												</IonCol>
											</IonRow>
											<IonRow className="ion-align-items-center">
												<IonCol>
													<IonLabel>Field Size: </IonLabel>
												</IonCol>
												<IonCol>
													<IonCheckbox checked={sizes[i] === "s"} onClick={() => handleCheckboxes(i, "s")} />
													<IonLabel>Small</IonLabel>
												</IonCol>
												<IonCol>
													<IonCheckbox checked={sizes[i] === "m"} onClick={() => handleCheckboxes(i, "m")} />
													<IonLabel>Med</IonLabel>
												</IonCol>
												<IonCol>
													<IonCheckbox checked={sizes[i] === "l"} onClick={() => handleCheckboxes(i, "l")} />
													<IonLabel>Large</IonLabel>
												</IonCol>
											</IonRow>
										</IonGrid>
									</IonItem>
								</IonReorder>
							);
						})}
					</IonReorderGroup>
				</IonList>
			</IonContent>
			<IonFooter id="footerElement" className={"addInactive " + (reordering ? "dragActive" : "dragInactive")}>
				<IonToolbar>
					<IonButton className="hideWhileDragging hideWhileAdding " color="success" slot="start" onClick={() => beginAdding()}>
						<IonIcon icon={addCircleOutline} slot="start" />
						<IonLabel>Add</IonLabel>
					</IonButton>
					<IonButton className="hideUnlessAdding" color="danger" slot="start" onClick={() => cancelAdding()}>
						<IonIcon icon={closeCircleOutline} slot="start" />
						<IonLabel>Cancel</IonLabel>
					</IonButton>
					<IonButton className="hideWhileAdding" color={reordering ? "success" : "secondary"} slot="start" onClick={() => { reordering ? endReorder() : beginReorder(); }}>
						<IonIcon icon={swapHorizontalOutline} slot="start" />
						<IonLabel>
							<span className="hideWhileDragging">Reorder </span>
							<span className="showWhileDragging">Done Reordering!</span>
						</IonLabel>
					</IonButton>
					<IonButton className="hideWhileDragging hideWhileAdding" color="tertiary" slot="end" onClick={() => maybeSaveNewInfo()}>
						<IonIcon icon={saveOutline} slot="start" />
						<IonLabel>Done</IonLabel>
					</IonButton>
					<IonButton className="hideUnlessAdding" color="success" slot="end" onClick={() => finishAdding()}>
						<IonIcon icon={addCircleOutline} slot="start" />
						<IonLabel>Add</IonLabel>
					</IonButton>
				</IonToolbar>
			</IonFooter>
		</IonModal>
	);
};

export default EditLexiconOrderModal;
