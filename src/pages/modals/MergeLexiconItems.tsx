import React, { useState, useEffect, useCallback, useMemo, FC } from 'react';
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
	useSelector,
	useDispatch
} from "react-redux";

import { Lexicon, LexiconColumn, ModalProperties, SorterFunc, StateObject } from '../../store/types';
import { mergeLexiconItems } from '../../store/lexiconSlice';
import useTranslator from '../../store/translationHooks';
import useI18Memo from '../../components/useI18Memo';

interface MergeProps extends ModalProperties {
	merging: string[]
	mergingObject: { [key: string]: Lexicon }
	clearInfo: () => void
	sorter: SorterFunc
}

interface Method {
    [key: string]: (x: string[]) => string
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

const translations = [
	"Cancel Merging", "How to Merge",
	"Merge Items", "Save and Merge",
	"lexiconMergeInstructions"
];

const MergeLexiconItemsModal: FC<MergeProps> = (props) => {
	const [ t ] = useTranslator('lexicon');
	const [ tc ] = useTranslator('common');
	const methodDescriptions: MethodDescriptions = useMemo(() => ({
		first: t("merge.first"),
		last: t("merge.last"),
		merge: t("merge.merge"),
		firstAll: t("merge.firstAll"),
		lastAll: t("merge.lastAll"),
		mergeAll: t("merge.mergeAll"),
		blank: t("merge.blank")
	}), [t]);
	const tClose = useMemo(() => tc("Close"), [tc]);
	const [
		tCancelMerge, tHowTo, tMergeItems, tSaveMerge, tLexMergeIns
	] = useI18Memo(translations, "lexicon");
	const tMergeResult = useMemo(() => t("Current merged result", { context: "presentation" }), [t]);

	const { isOpen, setIsOpen, merging, mergingObject, clearInfo, sorter } = props;
	const [items, setItems] = useState<Lexicon[]>([]);
	const [itemsByColumn, setItemsByColumn] = useState<string[][]>([]);
	const [mergeMethods, setMergeMethods] = useState<(keyof Method)[]>([]);
	const [mergedResult, setMergedResult] = useState<Lexicon | null>(null);
	const { columns } = useSelector((state: StateObject) => state.lexicon);
	const dispatch = useDispatch();

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

	const saveMerge = useCallback(() => {
		// clear merged items from Lexicon
		clearInfo();
		// dispatch info to store
		mergedResult && dispatch(mergeLexiconItems([items, mergedResult, sorter]));
		// close this modal
		setIsOpen(false);
	}, [clearInfo, dispatch, items, mergedResult, setIsOpen, sorter]);

	const cancelMerge = useCallback(() => {
		// clear merged items from Lexicon
		clearInfo();
		// close this modal
		setIsOpen(false);
	}, [clearInfo, setIsOpen]);
	const closer = useCallback(() => setIsOpen(false), [setIsOpen]);

	const howToMerge = useMemo(() => columns.map((col: LexiconColumn, i: number) => {
		const { id, label } = col;
		return (
			<IonItem key={`${id}:selector`} className="ion-text-wrap">
				<IonSelect
					className="ion-text-wrap"
					value={mergeMethods[i]}
					label={label + ":"}
					onIonChange={(e) => setMethod(e.detail.value, i)}
				>
					{methods.map((m: (keyof Method)) => {
						return (
							<IonSelectOption
								className="ion-text-wrap ion-text-align-end"
								key={`${id}:selector:${m}`}
								value={m}
							>{methodDescriptions[m]}</IonSelectOption>
						);
					})}
				</IonSelect>
			</IonItem>
		);
	}), [columns, mergeMethods, methodDescriptions, setMethod]);
	const currentMergeResult = useMemo(() => columns.map((col: LexiconColumn, i: number) => {
		const { id, label } = col;
		return (
			<IonItem key={`${id}:selector`}>
				<IonLabel
					slot="start"
					className="colLabel"
				>{label}:</IonLabel>
				<IonLabel
					className="ion-text-wrap value"
				>{mergedResult && mergedResult.columns[i]}</IonLabel>
			</IonItem>
		);
	}), [columns, mergedResult]);

	return (
		<IonModal isOpen={isOpen} onDidDismiss={closer} backdropDismiss={false}>
			<IonHeader>
				<IonToolbar color="primary">
					<IonTitle>{tMergeItems}</IonTitle>
					<IonButtons slot="end">
						<IonButton onClick={closer} aria-label={tClose}>
							<IonIcon icon={closeCircleOutline} />
						</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent id="mergeLexiconItems">
				<IonList lines="full">
					<IonItem>
						<IonLabel className="ion-text-wrap">
							{tLexMergeIns}
						</IonLabel>
					</IonItem>
					<IonItemDivider>{tHowTo}</IonItemDivider>
					{howToMerge}
					<IonItemDivider>{tMergeResult}</IonItemDivider>
					{currentMergeResult}
				</IonList>
			</IonContent>
			<IonFooter id="footerElement">
				<IonToolbar color="darker">
					<IonButton color="warning" slot="end" onClick={cancelMerge}>
						<IonIcon icon={closeCircleOutline} slot="start" />
						<IonLabel>{tCancelMerge}</IonLabel>
					</IonButton>
					<IonButton color="tertiary" slot="end" onClick={saveMerge}>
						<IonIcon icon={saveOutline} slot="start" />
						<IonLabel>{tSaveMerge}</IonLabel>
					</IonButton>
				</IonToolbar>
			</IonFooter>
		</IonModal>
	);
};

export default MergeLexiconItemsModal;
