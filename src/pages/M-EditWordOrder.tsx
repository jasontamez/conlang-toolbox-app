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
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { v4 as uuidv4 } from 'uuid';

import { ExtraCharactersModalOpener, Lexicon, LexiconBlankSorts, LexiconColumn } from '../components/ReduxDucksTypes';
import {
	updateLexiconColumnarInfo
} from '../components/ReduxDucksFuncs';
import yesNoAlert from '../components/yesNoAlert';
import toaster from '../components/toaster';
import { $i } from '../components/DollarSignExports';

const EditLexiconOrderModal = (props: ExtraCharactersModalOpener) => {
	const { isOpen, setIsOpen, openECM } = props;
	const dispatch = useDispatch();
	const [settings, lexObject] = useSelector((state: any) => [state.appSettings, state.lexicon], shallowEqual);
	const {
		lexicon,
		columns,
		sortPattern,
		truncateColumns,
		blankSort,
		/*fontType,
		storedCustomInfo,
		storedCustomIDs*/
	} = lexObject;
	const [order, setOrder] = useState<number[]>(sortPattern);
	const [cols, setCols] = useState<LexiconColumn[]>(columns);
	const [colPosition, setColPosition] = useState<number[]>(columns.map((col: any, i: number) => i));
	const [nextColPos, setNextColPos] = useState<number>(columns.length);
	const [noWrap, setNoWrap] = useState<boolean>(truncateColumns);
	const [sortWhenBlank, setSortWhenBlank] = useState<LexiconBlankSorts>(blankSort);
	const [originalString, setOriginalString] = useState<string>("");
	const [doAlert] = useIonAlert();
	const [doToast, undoToast] = useIonToast();

	useEffect(() => {
		const test =
			sortPattern.join(",")
			+ blankSort
			+ columns.map((col: LexiconColumn, i: number) => col.label + col.size + String(i)).join(',')
			+ String(truncateColumns);
		setOriginalString(test);
	}, [columns, truncateColumns, sortPattern, blankSort]);
	useEffect(() => {
		setOrder(sortPattern);
	}, [sortPattern]);
	useEffect(() => {
		setSortWhenBlank(blankSort);
	}, [blankSort]);
	useEffect(() => {
		setNoWrap(truncateColumns);
	}, [truncateColumns]);
	useEffect(() => {
		setCols(columns);
		setColPosition(columns.map((col: any, i: number) => i));
		setNextColPos(columns.length);
	}, [columns]);

	const handleCheckboxes = (i: number, value: "s" | "m" | "l") => {
		const newCols = cols.slice();
		newCols[i].size = value;
		setCols(newCols);
	};
	const doneEditingOrder = () => {
		const testCols = cols.map((col: LexiconColumn) => {
			const c = {...col};
			c.label = $i(`input_colOrder_${c.id}`).value;
			return c;
		});
		const testString =
			order.join(",")
			+ sortWhenBlank
			+ testCols.map((col: LexiconColumn, i: number) => col.label + col.size + String(colPosition[i])).join(',')
			+ String(noWrap);
		if(testString === originalString) {
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
		const lex: Lexicon[] = lexicon.map((lex: Lexicon) => {
			const { id, columns } = lex;
			const length = columns.length - 1;
			const newColumns = colPosition.map((col: number) => {
				if(col > length) {
					return "";
				}
				return columns[col];
			})
			return { id, columns: newColumns };
		});
		const newColumnOrder = colPosition.map((pos: number) => testCols[pos]);
		dispatch(updateLexiconColumnarInfo(lex, newColumnOrder, order, noWrap, sortWhenBlank));
		toaster({
			message: "Saved!",
			duration: 2500,
			color: "success",
			doToast,
			undoToast
		});
		closeModal();
	};
	const addNewColumn = () => {
		setOrder([...order, cols.length]);
		setCols([...cols, { id: uuidv4(), size: "m", label: "New"}]);
		setColPosition([...colPosition, nextColPos]);
		setNextColPos(nextColPos + 1);
		toaster({
			message: "Added new column.",
			duration: 2500,
			color: "success",
			doToast,
			undoToast
		});
	};
	const deleteField = (i: number) => {
		const handler = () => {
			const target = order[i];
			setOrder(order.slice(0, i).concat(order.slice(i+1)).map((num: number) => (num > target ? (num - 1) : num)));
			setCols(cols.slice(0, i).concat(cols.slice(i+1)));
			setColPosition(colPosition.slice(0, i).concat(colPosition.slice(i+1)));
		};
		if(settings.disableConfirms) {
			handler();
		} else {
			yesNoAlert({
				header: cols[i].label,
				cssClass: "danger",
				message: "Are you sure you want to delete this column? This cannot be undone.",
				submit: "Yes, delete it",
				handler,
				doAlert
			});
		}
	};
	const doReorder = (event: CustomEvent) => {
		const reorganize = (what: any[], from: number, to: number) => {
			const moved = what[from];
			const remains = what.slice(0, from).concat(what.slice(from + 1));
			return remains.slice(0, to).concat(moved, remains.slice(to));
		};
		const ed = event.detail;
		const { from, to } = ed;
		const columnOrder = reorganize(order, from, to);
		setOrder(columnOrder);
		const positionOrder = reorganize(colPosition, from, to);
		setColPosition(positionOrder);
		ed.complete();
	};
	const closeModal = () => {
		setOrder(sortPattern);
		setCols(columns);
		setColPosition(columns.map((col: any, i: number) => i));
		setNextColPos(columns.length);
		setNoWrap(truncateColumns);
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
							checked={!noWrap}
							onIonChange={() => setNoWrap(!noWrap)}
						>Show Full Column Titles</IonToggle>
					</IonItem>
					<IonItem className="ion-text-wrap">
						<IonSelect className="ion-text-wrap" label="Sort blank columns:" value={sortWhenBlank} onIonChange={(e) => setSortWhenBlank(e.detail.value)}>
							<IonSelectOption className="ion-text-wrap ion-text-align-right" value="first">To Top, Always</IonSelectOption>
							<IonSelectOption className="ion-text-wrap ion-text-align-right" value="last">To End, Always</IonSelectOption>
							<IonSelectOption className="ion-text-wrap ion-text-align-right" value="alphaFirst">As Alphabetically First</IonSelectOption>
							<IonSelectOption className="ion-text-wrap ion-text-align-right" value="alphaLast">As Alphabetically Last</IonSelectOption>
						</IonSelect>
					</IonItem>
					<IonItemDivider>Rearrange Lexicon Columns</IonItemDivider>
					<IonReorderGroup disabled={false} onIonItemReorder={doReorder}>
						{cols.map((column: LexiconColumn, i: number) => {
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
