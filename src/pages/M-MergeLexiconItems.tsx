import React, { useState, useEffect, useCallback } from 'react';
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
	IonFooter,
	IonItemDivider,
	IonSelect,
	IonSelectOption
} from '@ionic/react';
import {
	closeCircleOutline,
	saveOutline
} from 'ionicons/icons';
import {
	shallowEqual,
	useSelector,
	useDispatch
} from "react-redux";

import { Lexicon, LexiconColumn, ModalProperties } from '../components/ReduxDucksTypes';
import { mergeLexiconItems } from '../components/ReduxDucksFuncs';

interface MergeProps extends ModalProperties {
	merging: string[]
	mergingObject: { [key: string]: Lexicon }
	clearInfo: Function
}

interface Method {
    [key: string]: Function
}

type Methods = (keyof Method)[];

interface MethodDescriptions {
	[key: string]: string
};

function first (items: string[]) {
	let final = "";
	items.some(s => {
		if(s) {
			return final = s;
		}
		return false;
	});
	return final;
};
function last (items: string[]) {
	let final = "";
	items.forEach(s => {
		if(s) {
			final = s;
		}
	});
	return final;
};

function firstAll (items: string[]) {
	return items[0];
}
function lastAll (items: string[]) {
	return items[items.length - 1];
}

const glue = "; ";
function merge (items: string[]) {
	let final = "";
	items.forEach(s => {
		if(s) {
			if(final) {
				final = final + glue + s;
				return;
			}
			final = s;
		}
	});
	return final;
};
function mergeAll (items: string[]) {
	let final: string = items.shift() || "";
	items.forEach(s => {
		final = final + glue + s;
	});
	return final;
};

function blank (items: string[]) {
	return "";
}

const method: Method = {
	first,
	last,
	merge,
	firstAll,
	lastAll,
	mergeAll,
	blank
};

const methods: Methods = ["first", "last", "merge", "firstAll", "lastAll", "mergeAll", "blank"];

const methodDescriptions: MethodDescriptions = {
	first: "Use first non-blank value",
	last: "Use last non-blank value",
	merge: "Merge all non-blank values together",
	firstAll: "Use first value, even if it's blank",
	lastAll: "Use last value, even if it's blank",
	mergeAll: "Merge all values together, including any that are blank",
	blank: "Save nothing, leave blank"
};

const MergeLexiconItemsModal = (props: MergeProps) => {
	const { isOpen, setIsOpen, merging, mergingObject, clearInfo } = props;
	const [items, setItems] = useState<Lexicon[]>([]);
	const [itemsByColumn, setItemsByColumn] = useState<string[][]>([]);
	const [mergeMethods, setMergeMethods] = useState<(keyof Method)[]>([]);
	const [mergedResult, setMergedResult] = useState<Lexicon | null>(null);
	const dispatch = useDispatch();
	const {
		columns
	} = useSelector((state: any) => state.lexicon, shallowEqual);

	const makeMergedItem = useCallback((itsByCols: string[][], mMeths: (keyof Method)[]) => {
		const result: Lexicon = {
			id: "temp",
			columns: itsByCols.map((col: string[], i: number) => {
				return method[mMeths[i]](col);
			})
		};
		setMergedResult(result);
	}, []);

	useEffect(() => {
		// init itemsByColumn, mergeMethods
		const methodology: (keyof Method)[] = [];
		const cols: string[][] = columns.map((c: LexiconColumn) => {
			methodology.push("first");
			return [];
		});
		// init itemsByColumn, items
		const newItems = merging.map(id => {
			const item = mergingObject[id];
			// itemsByColumn
			item.columns.forEach((col: string, i: number) => {
				cols[i].push(col);
			});
			return item;
		});
		setMergeMethods(methodology);
		setItemsByColumn(cols);
		setItems(newItems);
		// init mergedResult
		merging.length > 0 && makeMergedItem(cols, methodology);
	}, [merging, mergingObject, columns, makeMergedItem]);

	const setMethod = useCallback((value: string, i: number) => {
		const newMethods = [...mergeMethods];
		newMethods[i] = value;
		setMergeMethods(newMethods);
		if(mergeMethods[i] !== value) {
			makeMergedItem(itemsByColumn, newMethods);
		}
	}, [mergeMethods, makeMergedItem, itemsByColumn]);

	const saveMerge = () => {
		// clear merged items from Lexicon
		clearInfo();
		// dispatch info to store
		mergedResult && dispatch(mergeLexiconItems(items, mergedResult));
		// close this modal
		setIsOpen(false);
	};

	const cancelMerge = () => {
		// clear merged items from Lexicon
		clearInfo();
		// close this modal
		setIsOpen(false);
	};

	return (
		<IonModal isOpen={isOpen} onDidDismiss={() => setIsOpen(false)} backdropDismiss={false}>
			<IonHeader>
				<IonToolbar color="primary">
					<IonTitle>Merge Items</IonTitle>
					<IonButtons slot="end">
						<IonButton onClick={() => setIsOpen(false)}>
							<IonIcon icon={closeCircleOutline} />
						</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent id="mergeLexiconItems">
				<IonList lines="full">
					<IonItem>
						<IonLabel className="ion-text-wrap">The Lexicon will be sorted alphabetically in the order you choose. It sorts by the first column you choose. If two items are identical in that column, it will sort them by the next column in the sort list, and so on.</IonLabel>
					</IonItem>
					<IonItemDivider>How to Merge</IonItemDivider>
					{
						columns.map((col: LexiconColumn, i: number) => {
							const { id, label } = col;
							return (
								<IonItem key={`${id}:selector`} className="ion-text-wrap">
									<IonSelect className="ion-text-wrap" value={mergeMethods[i]} label={label + ":"} onIonChange={(e) => setMethod(e.detail.value, i)}>
										{methods.map((m: (keyof Method)) => {
											return (
												<IonSelectOption className="ion-text-wrap ion-text-align-right" key={`${id}:selector:${m}`} value={m}>{methodDescriptions[m]}</IonSelectOption>
											);
										})}
									</IonSelect>
								</IonItem>
							);
						})
					}
					<IonItemDivider>Current merged result:</IonItemDivider>
					{
						columns.map((col: LexiconColumn, i: number) => {
							const { id, label } = col;
							return (
								<IonItem key={`${id}:selector`}>
									<IonLabel slot="start" className="colLabel">{label}:</IonLabel>
									<IonLabel className="ion-text-wrap value">{mergedResult && mergedResult.columns[i]}</IonLabel>
								</IonItem>
							);
						})
					}
				</IonList>
			</IonContent>
			<IonFooter id="footerElement">
				<IonToolbar color="darker">
					<IonButton color="warning" slot="end" onClick={() => cancelMerge()}>
						<IonIcon icon={closeCircleOutline} slot="start" />
						<IonLabel>Cancel Merging</IonLabel>
					</IonButton>
					<IonButton color="tertiary" slot="end" onClick={() => saveMerge()}>
						<IonIcon icon={saveOutline} slot="start" />
						<IonLabel>Save and Merge</IonLabel>
					</IonButton>
				</IonToolbar>
			</IonFooter>
		</IonModal>
	);
};

export default MergeLexiconItemsModal;
