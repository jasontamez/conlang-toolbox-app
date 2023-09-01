import React, { useState } from 'react';
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
import { v4 as uuidv4 } from 'uuid';

import { ExtraCharactersModalOpener, Lexicon, LexiconColumn } from '../components/ReduxDucksTypes';
import {
	updateLexiconColumnarInfo
} from '../components/ReduxDucksFuncs';
import fireSwal from '../components/Swal';

const EditLexiconOrderModal = (props: ExtraCharactersModalOpener) => {
	const { isOpen, setIsOpen, openECM } = props;
	const dispatch = useDispatch();
	const [settings, lexObject] = useSelector((state: any) => [state.appSettings, state.lexicon], shallowEqual);
	const {
		lexicon,
		columns,
		sortDir,
		sortPattern,
		truncateColumns,
		/*fontType,
		storedCustomInfo,
		storedCustomIDs*/
	} = lexObject;
	const [dir, setDir] = useState<boolean>(sortDir);
	const [order, setOrder] = useState<number[]>(sortPattern);
	const [cols, setCols] = useState<LexiconColumn[]>(columns);
	const [noWrap, setNoWrap] = useState<boolean>(truncateColumns);
	const [lex, setLex] = useState<Lexicon[]>(lexicon);

	const setNewInfo = (i: number, val: string) => {
		const newCols = cols.slice();
		newCols[i].label = val.trim();
		setCols(newCols);
	};
	const handleCheckboxes = (i: number, value: "s" | "m" | "l") => {
		const newCols = cols.slice();
		newCols[i].size = value;
		setCols(newCols);
	};
	const doneEditingOrder = () => {
		dispatch(updateLexiconColumnarInfo(lex, cols, order, dir, noWrap));
		setIsOpen(false);
		fireSwal({
			title: "Saved!",
			toast: true,
			timer: 2500,
			timerProgressBar: true,
			showConfirmButton: false
		});
	};
	const addNewColumn = () => {
		setOrder([...order, cols.length]);
		setCols([...cols, { id: uuidv4(), size: "m", label: "New"}]);
		setLex(lex.map(lx => ({ id: lx.id, columns: [...lx.columns, ""]})));
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
			const target = order[i];
			setOrder(order.slice(0, i).concat(order.slice(i+1)).map((num: number) => (num > target ? (num - 1) : num)));
			setCols(cols.slice(0, i).concat(cols.slice(i+1)));
			setLex(lex.map(lx => {
				const { id, columns } = lx;
				return { id, columns: columns.slice(0, i).concat(columns.slice(i+1)) };
			}));
		};
		if(settings.disableConfirms) {
			thenFunc();
		} else {
			fireSwal({
				html: "<h1>" + cols[i].label + "</h1>Are you sure you want to delete this? This cannot be undone.",
				customClass: {popup: 'deleteConfirm'},
				icon: 'warning',
				showCancelButton: true,
				confirmButtonText: "Yes, delete it."
			}).then((result: any) => result.isConfirmed && thenFunc());
		}
	};
	const doReorder = (event: CustomEvent) => {
		const reorganize = (what: any[], from: number, to: number) => {
			const moved = what[from];
			const remains = what.slice(0, from).concat(what.slice(from + 1));
			return remains.slice(0, to).concat(moved, remains.slice(to));
		};
		const ed = event.detail;
		const columnOrder = reorganize(order, ed.from, ed.to);
		setOrder(columnOrder);
		ed.complete();
	};
	const doSort = (col: number) => {
		const newOrder = [col, ...order.filter(o => (o !== col))];
		setOrder(newOrder);
	};
	return (
		<IonModal isOpen={isOpen} onDidDismiss={() => setIsOpen(false)} backdropDismiss={false}>
			<IonHeader>
				<IonToolbar color="primary">
					<IonTitle>Edit Columns</IonTitle>
					<IonButtons slot="end">
						<IonButton onClick={() => openECM(true)}>
							<IonIcon icon={globeOutline} />
						</IonButton>
						<IonButton onClick={() => setIsOpen(false)}>
							<IonIcon icon={closeCircleOutline} />
						</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent id="editLexiconItemOrder">
				<IonList lines="full">
					<IonItemDivider>Lexicon Options</IonItemDivider>
					<IonItem button={true} onClick={() => setNoWrap(!noWrap)}>
						<IonLabel>Show Full Column Titles</IonLabel>
						{noWrap ? <></> : <IonIcon slot="end" icon={checkmarkOutline} />}
					</IonItem>
					<IonItemDivider>Sort Column</IonItemDivider>
					{order.map((placement: number, i: number) => {
						const { id, label } = columns[i];
						return (
							<IonItem key={`${id}:modal:editOrder`} button={true} onClick={() => doSort(i)}>
								<IonLabel slot="start">{label}</IonLabel>
								<IonLabel slot="end">{placement}</IonLabel>
							</IonItem>
						);
					})}
					<IonItemDivider>Sort Direction</IonItemDivider>
					<IonItem button={true} onClick={() => setDir(false)}>
						<IonLabel slot="start">Descending ↓</IonLabel>
						{ dir || <IonIcon slot="end" icon={checkmarkOutline} /> }
					</IonItem>
					<IonItem button={true} onClick={() => setDir(true)}>
						<IonLabel slot="start">Ascending ↑</IonLabel>
						{ dir && <IonIcon slot="end" icon={checkmarkOutline} /> }
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
												<IonInput aria-label="Field Name" placeholder="Field Name" value={label} onIonChange={(e) => setNewInfo(i, e.target.value as string)} />
											</IonCol>
											<IonCol size="auto">
												<IonButton color="danger" onClick={() => deleteField(i)}><IonIcon icon={trashOutline} /></IonButton>
											</IonCol>
										</IonRow>
										<IonRow className="ion-align-items-center">
											<IonCol>
												<IonCheckbox labelPlacement="start" justify="start" aria-label="Small size" checked={size === "s"} onClick={() => handleCheckboxes(i, "s")}>Small</IonCheckbox>
											</IonCol>
											<IonCol>
												<IonCheckbox labelPlacement="start" justify="start" aria-label="Medium size" checked={size === "m"} onClick={() => handleCheckboxes(i, "m")}>Med</IonCheckbox>
											</IonCol>
											<IonCol>
												<IonCheckbox labelPlacement="start" justify="start" aria-label="Large size" checked={size === "l"} onClick={() => handleCheckboxes(i, "l")}>Large</IonCheckbox>
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
