import React, { useState, useEffect } from 'react';
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
	IonItemDivider,
	IonToggle,
	IonSelect,
	IonSelectOption,
	useIonAlert,
	useIonToast
} from '@ionic/react';
import {
	closeCircleOutline,
	saveOutline,
	reorderTwo,
	trashOutline,
	addCircleOutline,
	globeOutline
} from 'ionicons/icons';
import { useSelector, useDispatch } from "react-redux";
import { v4 as uuidv4 } from 'uuid';

import { ExtraCharactersModalOpener, Lexicon, LexiconBlankSorts, LexiconColumn, StateObject } from '../../store/types';
import { updateLexiconColumarInfo } from '../../store/lexiconSlice';

import yesNoAlert from '../../components/yesNoAlert';
import toaster from '../../components/toaster';
import { $i } from '../../components/DollarSignExports';
import PermanentInfo from '../../components/PermanentInfo';

interface ShadowColumn extends LexiconColumn {
	originalPosition: number
}

interface OrderModalProps extends ExtraCharactersModalOpener {
	sorter: Function
}

const EditLexiconOrderModal = (props: OrderModalProps) => {
	const { isOpen, setIsOpen, openECM, sorter } = props;
	const dispatch = useDispatch();
	const disableConfirms = useSelector((state: StateObject) => state.appSettings.disableConfirms);
	const {
		lexicon,
		columns,
		sortPattern,
		truncateColumns,
		blankSort,
		customSort,
		/*fontType,
		storedCustomInfo,
		storedCustomIDs*/
	} = useSelector((state: StateObject) => state.lexicon);
	const { customSorts } = useSelector((state: StateObject) => state.sortSettings);
	const [shadowTruncate, setShadowTruncate] = useState<boolean>(truncateColumns);
	const [shadowBlankSort, setShadowBlankSort] = useState<LexiconBlankSorts>(blankSort);
	const [shadowColumns, setShadowColumns] = useState<ShadowColumn[]>([]);
	const [shadowCustomSort, setShadowCustomSort] = useState<string | null>(customSort || null);
	const [doAlert] = useIonAlert();
	const [doToast, undoToast] = useIonToast();

	useEffect(() => {
		setShadowColumns(columns.slice().map((col: LexiconColumn, i: number) => ({...col, originalPosition: i})));
	}, [columns]);

	const handleCheckboxes = (i: number, value: "s" | "m" | "l") => {
		const newCols = shadowColumns.slice();
		newCols[i].size = value;
		// save any changes to labels that may have been entered
		newCols.forEach((col, i: number) => {
			const el = $i(`input_colOrder_${col.id}`);
			if(el) {
				newCols[i].label = el.value || "";
			}
		});
		// save result
		setShadowColumns(newCols);
	};
	const doneEditingOrder = () => {
		const original = columns.map((col: LexiconColumn, i: number) => {
			const {label, size} = col;
			return `${label}/${size}/${i}`;
		}).join(" : ") + ` : ${truncateColumns} : ${blankSort} : ${customSort}`;
		const testing = shadowColumns.map((col: ShadowColumn) => {
			const {id, size, originalPosition} = col;
			const el = $i(`input_colOrder_${id}`);
			return `${el ? el.value : "ERROR"}/${size}/${originalPosition}`;
		}).join(" : ") + ` : ${shadowTruncate} : ${shadowBlankSort} : ${shadowCustomSort}`;
		if(testing === original) {
			toaster({
				message: "Nothing to save.",
				color: "warning",
				duration: 2500,
				position: "top",
				doToast,
				undoToast
			});
			closeModal();
			return;
		}
		// convert columns and create a guide
		const guide: number[] = [];
		const newColumns: LexiconColumn[] = shadowColumns.map((col: ShadowColumn) => {
			const {id, size, originalPosition} = col;
			guide.push(originalPosition);
			const el = $i(`input_colOrder_${id}`);
			return {
				id,
				label: el ? el.value : "ERROR",
				size
			};
		});
		// convert lexicon
		const lex: Lexicon[] = lexicon.map((item: Lexicon) => {
			const { id, columns } = item;
			// use the guide to rearrange columns
			const newCols: string[] = guide.map((i: number) => {
				if(i < 0) {
					// if the given column doesn't exist, make a blank column
					return "";
				}
				// otherwise, grab the appropriate colum
				return columns[i];
			});
			// return a new Lexicon object
			return {
				id,
				columns: newCols
			};
		});
		// convert sortPattern
		// make an array of IDs
		const sortPatternByIds = sortPattern.map((n: number) => columns[n].id);
		// make an array of all positions
		let missingColumns: number[] = [];
		for(let x = 0; x < shadowColumns.length; x++) {
			missingColumns.push(x);
		}
		// begin the sort pattern with the columns that still exist
		const newSortPattern: number[] = [];
		sortPatternByIds.forEach((id: string) => {
			shadowColumns.every((col: ShadowColumn, i: number) => {
				if(id === col.id) {
					newSortPattern.push(i);
					// remove this pattern from the array of all positions
					missingColumns = missingColumns.filter(n => n !== i);
					return false;
				}
				return true;
			});
		});
		// finish by tacking on the positions that were not found
		newSortPattern.push(...missingColumns);
		// dispatch
		dispatch(updateLexiconColumarInfo([
			lex,
			newColumns,
			newSortPattern,
			shadowTruncate,
			shadowBlankSort,
			shadowCustomSort || undefined,
			sorter
		]));
		toaster({
			message: "Saved!",
			duration: 2500,
			color: "success",
			position: "top",
			doToast,
			undoToast
		});
		closeModal();
	};
	const addNewColumn = () => {
		const final: ShadowColumn[] = [...shadowColumns, { id: uuidv4(), size: "m", label: "New", originalPosition: -1 }];
		// save any changes to labels that may have been entered
		final.forEach((col, i: number) => {
			const el = $i(`input_colOrder_${col.id}`);
			if(el) {
				final[i].label = el.value || "";
			}
		});
		// save result
		setShadowColumns(final);
		toaster({
			message: "Added new column.",
			duration: 2500,
			color: "success",
			position: "top",
			doToast,
			undoToast
		});
	};
	const deleteField = (i: number) => {
		const handler = () => {
			// delete the field
			const newColumns = shadowColumns.slice(0, i).concat(shadowColumns.slice(i+1));
			// save any changes to labels that may have been entered
			newColumns.forEach((col, i: number) => {
				const el = $i(`input_colOrder_${col.id}`);
				if(el) {
					newColumns[i].label = el.value || "";
				}
			});
			// save result
			setShadowColumns(newColumns);
		};
		if(disableConfirms) {
			handler();
		} else {
			yesNoAlert({
				header: shadowColumns[i].label,
				cssClass: "danger",
				message: "Are you sure you want to delete this column? This cannot be undone.",
				submit: "Yes, delete it",
				handler,
				doAlert
			});
		}
	};
	const doReorder = (event: CustomEvent) => {
		const ed = event.detail;
		// move things around
		const { from, to } = ed;
		const moved = shadowColumns[from];
		const remains = shadowColumns.slice(0, from).concat(shadowColumns.slice(from + 1));
		const final = remains.slice(0, to).concat(moved, remains.slice(to));
		// save any changes to labels that may have been entered
		final.forEach((col, i: number) => {
			const el = $i(`input_colOrder_${col.id}`);
			if(el) {
				final[i].label = el.value || "";
			}
		});
		// save result
		setShadowColumns(final);
		ed.complete();
	};
	const closeModal = () => {
		setShadowColumns(columns.slice().map((col: LexiconColumn, i: number) => ({...col, originalPosition: i})));
		setIsOpen(false);
	};
	return (
		<IonModal isOpen={isOpen} onDidDismiss={() => closeModal()} backdropDismiss={false}>
			<IonHeader>
				<IonToolbar color="primary">
					<IonTitle>Edit Columns</IonTitle>
					<IonButtons slot="end">
						<IonButton onClick={() => openECM(true)}>
							<IonIcon icon={globeOutline} />
						</IonButton>
						<IonButton onClick={() => closeModal()}>
							<IonIcon icon={closeCircleOutline} />
						</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent id="editLexiconItemOrder">
				<IonList lines="full">
					<IonItemDivider>Lexicon Options</IonItemDivider>
					<IonItem>
						<IonToggle
							labelPlacement="start"
							enableOnOffLabels
							checked={!shadowTruncate}
							onIonChange={() => setShadowTruncate(!shadowTruncate)}
						>Show Full Column Titles</IonToggle>
					</IonItem>
					<IonItem className="ion-text-wrap">
						<IonSelect className="ion-text-wrap" label="Sort method:" value={customSort || null} onIonChange={(e) => setShadowCustomSort(e.detail.value)}>
							<IonSelectOption className="ion-text-wrap ion-text-align-end" value={null}>Default sort</IonSelectOption>
							{customSorts.concat(PermanentInfo.sort.permanentCustomSortObjs).map(sorter => (
								<IonSelectOption key={`lex:modal:${sorter.id}`} className="ion-text-wrap ion-text-align-end" value={sorter.id}>{sorter.title}</IonSelectOption>
							))}
						</IonSelect>
					</IonItem>
					<IonItem className="ion-text-wrap">
						<IonSelect className="ion-text-wrap" label="Sort blank columns:" value={shadowBlankSort} onIonChange={(e) => setShadowBlankSort(e.detail.value)}>
							<IonSelectOption className="ion-text-wrap ion-text-align-end" value="first">To Beginning, Always</IonSelectOption>
							<IonSelectOption className="ion-text-wrap ion-text-align-end" value="last">To End, Always</IonSelectOption>
							<IonSelectOption className="ion-text-wrap ion-text-align-end" value="alphaFirst">As Alphabetically First</IonSelectOption>
							<IonSelectOption className="ion-text-wrap ion-text-align-end" value="alphaLast">As Alphabetically Last</IonSelectOption>
						</IonSelect>
					</IonItem>
					<IonItemDivider>Rearrange Lexicon Columns</IonItemDivider>
					<IonReorderGroup disabled={false} onIonItemReorder={doReorder}>
						{shadowColumns.map((column: LexiconColumn, i: number) => {
							const { id, size, label } = column;
							return (
								<IonItem lines="full" key={`${id}:modal:editing`}>
									<IonReorder className="ion-padding-end"><IonIcon icon={reorderTwo} /></IonReorder>
									<IonGrid>
										<IonRow className="ion-align-items-center">
											<IonCol>
												<IonInput id={`input_colOrder_${id}`} aria-label="Field Name" placeholder="Field Name" value={label} />
											</IonCol>
											<IonCol size="auto">
												<IonButton color="danger" onClick={() => deleteField(i)}><IonIcon icon={trashOutline} /></IonButton>
											</IonCol>
										</IonRow>
										<IonRow className="ion-align-items-center">
											<IonCol>
												<IonCheckbox labelPlacement="start" id={`${id}:${i}:s`} justify="start" aria-label="Small size" checked={size === "s"} onIonChange={() => handleCheckboxes(i, "s")}>Small</IonCheckbox>
											</IonCol>
											<IonCol>
												<IonCheckbox labelPlacement="start" id={`${id}:${i}:m`} justify="start" aria-label="Medium size" checked={size === "m"} onIonChange={() => handleCheckboxes(i, "m")}>Med</IonCheckbox>
											</IonCol>
											<IonCol>
												<IonCheckbox labelPlacement="start" id={`${id}:${i}:l`} justify="start" aria-label="Large size" checked={size === "l"} onIonChange={() => handleCheckboxes(i, "l")}>Large</IonCheckbox>
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
					<IonButton color="tertiary" slot="end" onClick={() => doneEditingOrder()}>
						<IonIcon icon={saveOutline} slot="start" />
						<IonLabel>Save Changes</IonLabel>
					</IonButton>
				</IonToolbar>
			</IonFooter>
		</IonModal>
	);
};

export default EditLexiconOrderModal;
