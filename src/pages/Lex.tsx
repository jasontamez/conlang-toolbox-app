import React, { useState, useCallback, useEffect, useMemo, memo, MouseEvent, MouseEventHandler } from 'react';
import {
	IonPage,
	IonContent,
	IonButton,
	IonIcon,
	IonList,
	IonItem,
	IonLabel,
	IonInput,
	IonTextarea,
	IonGrid,
	IonRow,
	IonCol,
	IonLoading,
	useIonViewDidEnter,
	useIonViewDidLeave,
	IonItemSliding,
	IonItemOptions,
	IonItemOption,
	IonFab,
	IonFabButton,
	useIonAlert,
	useIonToast,
	IonFabList,
	IonCard,
	IonCardContent,
	UseIonToastResult
} from '@ionic/react';
import {
	add,
	trash,
	saveOutline,
	globeOutline,
	settings,
	chevronUpCircle,
	chevronDownCircle,
	construct,
	closeCircle,
	addCircle,
	helpCircleOutline,
	reorderTwo
} from 'ionicons/icons';
import { useSelector, useDispatch } from "react-redux";
import { useWindowHeight } from '@react-hook/window-size/throttled';
import { v4 as uuidv4 } from 'uuid';
import { FixedSizeList, areEqual } from 'react-window';
import memoizeOne from 'memoize-one';

import {
	addLexiconItem,
	deleteLexiconItem,
	deleteMultipleLexiconItems,
	updateLexiconSortDir,
	updateLexiconText
} from '../store/lexiconSlice';
import { Lexicon, LexiconColumn, LexiconState, PageData, SortObject, StateObject } from '../store/types';

import AddLexiconItemModal from './modals/AddWord';
import EditLexiconItemModal from './modals/EditWord';
import EditLexiconOrderModal from './modals/EditWordOrder';
import LexiconStorageModal from './modals/LexiconStorage';
import LoadLexiconModal from './modals/LoadLexicon';
import DeleteLexiconModal from './modals/DeleteLexicon';
import ExtraCharactersModal from './modals/ExtraCharacters';
import ExportLexiconModal from './modals/ExportLexicon';
import EditLexiconSortModal from './modals/EditSort';
import MergeLexiconItemsModal from './modals/MergeLexiconItems';
import Header from '../components/Header';
import PermanentInfo from '../components/PermanentInfo';
import { $i } from '../components/DollarSignExports';
import yesNoAlert from '../components/yesNoAlert';
import toaster from '../components/toaster';
import makeSorter from '../components/stringSorter';
import { LexiconIcon } from '../components/icons';
import ModalWrap from '../components/ModalWrap';
import './Lexicon.css';

interface LexItem {
	index: number
	style: {
		[key: string]: any
	}
	data: {
		delFromLex: Function
		beginEdit: Function
		maybeExpand: MouseEventHandler<HTMLDivElement>
		maybeSetForMerge: Function
		columns: LexiconColumn[]
		lexicon: Lexicon[]
		merging: string[]
	}
}
interface LexItemDeleting {
	index: number
	style: {
		[key: string]: any
	}
	data: {
		columns: LexiconColumn[]
		lexicon: Lexicon[]
		toggleDeleting: Function,
		deletingObj: { [ key: string ]: boolean }
	}
}

function maybeExpand (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>, toast: UseIonToastResult) {
	// Expand an overflowing field into a toast
	const span = e.target as HTMLSpanElement;
	if(span.matches('.lexItem') && span.clientWidth < span.scrollWidth) {
		const message = (span && (span.textContent as string)) || "<error>";
		toaster({
			message,
			duration: 10000,
			position: "top",
			color: "primary",
			toast
		});
	}
};

const RenderLexiconItem = memo(({index, style, data}: LexItem) => {
	const {
		delFromLex,
		beginEdit,
		maybeExpand,
		maybeSetForMerge,
		columns,
		lexicon,
		merging
	} = data;
	const lex: Lexicon = lexicon[index];
	const cols = lex.columns;
	const id = lex.id;
	const isMerging = merging.indexOf(id) + 1;
	const maybeMerging = isMerging ? <div className="merging">{String(isMerging)}</div> : <></>;
	return (
		<IonItemSliding
			key={`${id}:slidingItem`}
			id={id}
			style={style}
			className="lexiconDisplay"
		>
			<IonItemOptions side="start" className="serifChars">
				<IonItemOption color="tertiary" aria-label="Join" onClick={() => maybeSetForMerge(lex)}>
					<IonIcon slot="icon-only" src="svg/link.svg" />
				</IonItemOption>
			</IonItemOptions>
			<IonItemOptions side="end" className="serifChars">
				<IonItemOption color="primary" aria-label="Edit" onClick={() => beginEdit(lex)}>
					<IonIcon slot="icon-only" src="svg/edit.svg" />
				</IonItemOption>
				<IonItemOption color="danger" aria-label="Delete" onClick={() => delFromLex(lex)}>
					<IonIcon slot="icon-only" icon={trash} />
				</IonItemOption>
			</IonItemOptions>
			<IonItem className={
				"lexRow serifChars "
				+ (index % 2 ? "even" : "odd")
			}>
				{maybeMerging}
				{cols.map((item: string, i: number) => (
					<div
						onClick={maybeExpand}
						key={`${id}:col${i}`}
						className={
							"lexItem selectable "
							+ columns[i].size
						}
					>{item}</div>
				))}
				<div className="xs">
					<IonIcon size="small" src="svg/slide-indicator.svg" />
				</div>
			</IonItem>
		</IonItemSliding>
	);
}, areEqual);

const RenderLexiconDeleting = memo(({index, style, data}: LexItemDeleting) => {
	const {
		columns,
		lexicon,
		toggleDeleting,
		deletingObj
	} = data;
	const lex: Lexicon = lexicon[index];
	const cols = lex.columns;
	const id = lex.id;
	const deleting = deletingObj[id];
	return (
		<IonItem
			key={`${id}:deletingItem`}
			id={`del:${id}`}
			style={style}
			className={
				"lexRow serifChars lexiconDeletingDisplay "
				+ (index % 2 ? "even" : "odd")
				+ (deleting ? " deleting" : "")
			}
			onClick={() => toggleDeleting(lex)}
		>
			{cols.map((item: string, i: number) => (
				<div
					key={`del:${id}:col${i}`}
					className={
						"lexItem selectable "
						+ columns[i].size
					}
				>{item}</div>
			))}
			<div className="xs"></div>
		</IonItem>
	);
}, areEqual);

// memoize stuff for Lexicon display
const createItemData = memoizeOne((delFromLex, beginEdit, maybeSetForMerge, expander, columns, lexicon, merging) => ({
	delFromLex, beginEdit, maybeSetForMerge, maybeExpand: expander, columns, lexicon, merging
}));
const otherItemData = memoizeOne((columns, lexicon, toggleDeleting, deletingObj) => ({
	columns, lexicon, toggleDeleting, deletingObj
}));

const closeSliders = () => {
	const mainLexList = $i<HTMLIonListElement>("mainLexList");
	mainLexList && mainLexList.closeSlidingItems();
};

const Lex = (props: PageData) => {
	const disableConfirms = useSelector((state: StateObject) => state.appSettings.disableConfirms);
	const {
		//id,
		//lastSave,
		title,
		description,
		lexicon,
		truncateColumns,
		columns,
		sortDir,
		sortPattern,
		customSort,
		/*fontType*/
	} = useSelector((state: StateObject) => state.lexicon);
	const dispatch = useDispatch();
	const [doAlert] = useIonAlert();
	const toast = useIonToast();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isWorking, setIsWorking] = useState<boolean>(false);

	// lexicon sorting
	const {
		sortLanguage,
		sensitivity,
		defaultCustomSort,
		customSorts
	} = useSelector((state: StateObject) => state.sortSettings);
	const defaultSortLanguage = useSelector((state: StateObject) => state.internals.defaultSortLanguage);
	let customSortObj: SortObject | undefined;
	let defaultCustomSortObj: SortObject | undefined;
	customSorts.concat(PermanentInfo.sort.permanentCustomSortObjs).every(obj => {
		if(obj.id === customSort) {
			customSortObj = obj;
		} else if (obj.id === defaultCustomSort) {
			defaultCustomSortObj = obj;
		}
		return !(customSortObj && defaultCustomSortObj);
	})
	const sorter = makeSorter(sortLanguage || defaultSortLanguage, sensitivity, customSortObj || defaultCustomSortObj);

	// editing lex item
	const [isOpenEditLexItem, setIsOpenEditLexItem] = useState<boolean>(false);
	const [editingItem, setEditingItem] = useState<Lexicon | null>(null);

	// merging lex items
	const [merging, setMerging] = useState<string[]>([]);
	const [mergingObject, setMergingObject] = useState<{[key: string]: Lexicon}>({});
	const [isOpenMergeItems, setIsOpenMergeItems] = useState<boolean>(false);

	// other modals
	const [isOpenECM, setIsOpenECM] = useState<boolean>(false);
	const [isOpenInfo, setIsOpenInfo] = useState<boolean>(false);
	const [isOpenAddLexItem, setIsOpenAddLexItem] = useState<boolean>(false);
	const [isOpenLexOrder, setIsOpenLexOrder] = useState<boolean>(false);
	const [isOpenLexSorter, setIsOpenLexSorter] = useState<boolean>(false);
	const [isOpenLoadLex, setIsOpenLoadLex] = useState<boolean>(false);
	const [isOpenExportLex, setIsOpenExportLex] = useState<boolean>(false);
	const [isOpenLexStorage, setIsOpenLexStorage] = useState<boolean>(false);
	const [isOpenDelLex, setIsOpenDelLex] = useState<boolean>(false);
	const [storedLexInfo, setStoredLexInfo] = useState<[string, LexiconState][]>([]);

	// deleting multiple lex items
	const [isDeleting, setIsDeleting] = useState<boolean>(false);
	const [deleting, setDeleting] = useState<Lexicon[]>([]);
	const [deletingObj, setDeletingObj] = useState<{[key: string]: boolean}>({});
	function maybeFinishDeleting (cancel: boolean = false) {
		if(cancel || deleting.length === 0) {
			setDeleting([]);
			return setIsDeleting(false);
		}
		const handler = () => {
			dispatch(deleteMultipleLexiconItems(deleting.map(obj => obj.id)));
			toaster({
				message: `Deleted ${deleting.length} items.`,
				color: "danger",
				position: "middle",
				toast
			});
			setDeleting([]);
			return setIsDeleting(false);
		};
		yesNoAlert({
			header: `Delete ${deleting.length} Items?`,
			message: "This action cannot be undone. Are you sure?",
			submit: "Yes, Delete Them",
			cssClass: "danger",
			handler,
			doAlert
		})
	};
	const beginMassDeleteMode = () => {
		clearMergedInfo();
		setIsDeleting(true);
		toaster({
			message: "Tap on items to mark them for deletion. Finish deleting by tapping the top floating button. Cancel by tapping the bottom floating button.",
			duration: 8000,
			position: "bottom",
			color: "danger",
			toast
		})
	};

	// Height variables
	const height = useWindowHeight();
	const [lexHeadersHidden, setLexHeadersHidden] = useState<boolean>(false);
	const [lexiconHeight, setLexiconHeight] = useState<number>(Math.ceil(height / 3 * 2));
	const [hasLoaded, setHasLoaded] = useState<boolean>(false);
	useIonViewDidEnter(() => setHasLoaded(true));
	useIonViewDidLeave(() => setHasLoaded(false));
	const topBar = $i("lexiconTopBar");
	const lexInfoHeader = $i("lexiconTitleAndDescription");
	const lexHeader = $i("theLexiconHeader");
	const lexColumnNames = $i("lexColumnNames");
	const lexColumnInputs = $i("lexColumnInputs");
	// Calculate height
	useEffect(() => {
		let used = 0;
		[
			topBar,
			lexHeader,
			lexInfoHeader,
			lexColumnInputs,
			lexColumnNames
		].forEach(input => input && (used += input.offsetHeight));
		setLexiconHeight(height - used);
	}, [
		hasLoaded, height, lexHeadersHidden, // state
		truncateColumns, columns, // redux
		topBar, lexInfoHeader, lexHeader, lexColumnInputs, lexColumnNames // HTML elements
	]);

	// Update Lexicon description or title
	const setNewInfo = (id: string, prop: "description" | "title") => {
		const el = $i<HTMLInputElement>(id);
		el && dispatch(updateLexiconText([prop, el.value.trim()]));
	};

	// Add new Lexicon item
	const addToLex = useCallback(() => {
		const newInfo: string[] = [];
		const newBlank: { [key: string]: string } = {};
		const ids: string[] = [];
		let foundFlag = false;
		columns.forEach((col: LexiconColumn) => {
			const id = col.id;
			const i_id = `input_lex_${id}`;
			const el = $i<HTMLIonInputElement>(i_id);
			const info: string = (el && (el.value as string)) || "";
			newInfo.push(info);
			info && (foundFlag = true);
			newBlank[id] = "";
			ids.push(i_id);
		});
		if(!foundFlag) {
			doAlert({
				header: "Error",
				message: "You did not type any information into any text field.",
				cssClass: "warning",
				buttons: [
					{
						text: "Ok",
						role: "cancel",
						cssClass: "cancel"
					}
				]
			});
			return;
		}
		// send to store
		dispatch(addLexiconItem([{
			id: uuidv4(),
			columns: newInfo
		}, sorter]));
		// clear all inputs
		ids.forEach((id: string) => {
			const el = $i<HTMLIonInputElement>(id);
			el && el.getInputElement().then((el) => (el.value = ""));
		});
	}, [columns, dispatch, doAlert, sorter]);

	// Delete Lexicon item
	const delFromLex = useCallback((item: Lexicon) => {
		let title: string = item.columns.join(" / ");
		closeSliders();
		if(disableConfirms) {
			dispatch(deleteLexiconItem(item.id));
		} else {
			yesNoAlert({
				header: title,
				cssClass: "danger",
				message: "Are you sure you want to delete this? This cannot be undone.",
				submit: "Yes, delete it",
				handler: () => dispatch(deleteLexiconItem(item.id)),
				doAlert
			});
		}
	}, [dispatch, disableConfirms, doAlert]);

	// Open Lexicon item for editing
	const beginEdit = useCallback((item: Lexicon) => {
		setEditingItem(item);
		setIsOpenEditLexItem(true);
		closeSliders();
	}, []);

	// Set up item for merging
	const maybeSetForMerge = useCallback((item: Lexicon) => {
		const { id } = item;
		const newObj = {...mergingObject};
		if(newObj[id]) {
			// remove
			delete newObj[id];
			setMerging(merging.filter(m => m !== id));
		} else {
			// add
			newObj[id] = item;
			setMerging([...merging, id]);
		}
		setMergingObject(newObj);
		closeSliders();
	}, [merging, mergingObject]);
	const mergeButton = useMemo(() => merging.length > 1 ? (
		<IonFab vertical="bottom" horizontal="start" slot="fixed">
			<IonFabButton color="tertiary" title="Merge selected items" onClick={() => setIsOpenMergeItems(true)}>
				<IonIcon src="svg/link.svg" />
			</IonFabButton>
		</IonFab>
	) : <></>, [merging.length]);
	const clearMergedInfo = useCallback(() => {
		setMerging([]);
		setMergingObject({});
	}, []);

	// memoize stuff for Lexicon display
	const expander: MouseEventHandler<HTMLDivElement> = useCallback((e) => maybeExpand(e, toast), [toast]);
	const fixedSizeListData = createItemData(delFromLex, beginEdit, maybeSetForMerge, expander, columns, lexicon, merging);
	const toggleDeleting = useCallback((item: Lexicon) => {
		const {id} = item;
		const newObj = {...deletingObj};
		if(deletingObj[id]) {
			delete newObj[id];
			const newList = deleting.filter(obj => obj.id !== id);
			setDeleting(newList);
		} else {
			newObj[id] = true;
			setDeleting([...deleting, item]);
		}
		setDeletingObj(newObj);
	}, [deleting, deletingObj]);
	const otherData = otherItemData(columns, lexicon, toggleDeleting, deletingObj);

	// JSX
	return (
		<IonPage>
			<AddLexiconItemModal
				{...props.modalPropsMaker(isOpenAddLexItem, setIsOpenAddLexItem)}
				openECM={setIsOpenECM}
				columnInfo={columns}
				sorter={sorter}
			/>
			<EditLexiconItemModal
				{...props.modalPropsMaker(isOpenEditLexItem, setIsOpenEditLexItem)}
				openECM={setIsOpenECM}
				itemToEdit={editingItem}
				columnInfo={columns}
				sorter={sorter}
			/>
			<EditLexiconOrderModal
				{...props.modalPropsMaker(isOpenLexOrder, setIsOpenLexOrder)}
				openECM={setIsOpenECM}
				sortLang={sortLanguage || defaultSortLanguage}
				sensitivity={sensitivity}
			/>
			<EditLexiconSortModal
				{...props.modalPropsMaker(isOpenLexSorter, setIsOpenLexSorter)}
				sorter={sorter}
			/>
			<MergeLexiconItemsModal
				{...props.modalPropsMaker(isOpenMergeItems, setIsOpenMergeItems)}
				merging={merging}
				mergingObject={mergingObject}
				clearInfo={clearMergedInfo}
				sorter={sorter}
			/>
			<LoadLexiconModal
				{...props.modalPropsMaker(isOpenLoadLex, setIsOpenLoadLex)}
				lexInfo={storedLexInfo}
				setLexInfo={setStoredLexInfo}
			/>
			<ExportLexiconModal
				{...props.modalPropsMaker(isOpenExportLex, setIsOpenExportLex)}
				setLoading={setIsLoading}
			/>
			<DeleteLexiconModal
				{...props.modalPropsMaker(isOpenDelLex, setIsOpenDelLex)}
				setLoadingScreen={setIsWorking}
				lexInfo={storedLexInfo}
				setLexInfo={setStoredLexInfo}
			/>
			<LexiconStorageModal
				{...props.modalPropsMaker(isOpenLexStorage, setIsOpenLexStorage)}
				openLoad={setIsOpenLoadLex}
				openDelete={setIsOpenDelLex}
				openExport={setIsOpenExportLex}
				setLoading={setIsLoading}
				setLexInfo={setStoredLexInfo}
			/>
			<IonLoading
				cssClass='loadingPage'
				isOpen={isLoading}
				onDidDismiss={() => setIsLoading(false)}
				message={'Please wait...'}
				spinner="bubbles"
				duration={1000}
			/>
			<IonLoading
				cssClass='loadingPage'
				isOpen={isWorking}
				onDidDismiss={() => setIsWorking(false)}
				message={'Working...'}
				spinner="bubbles"
				duration={1000}
			/>
			<ExtraCharactersModal {...props.modalPropsMaker(isOpenECM, setIsOpenECM)} />
			<ModalWrap {...props.modalPropsMaker(isOpenInfo, setIsOpenInfo)}><LexCard /></ModalWrap>
			<Header
				id="lexiconTopBar"
				title="Lexicon"
				endButtons={[
					<IonButton
						color={lexHeadersHidden ? "secondary" : undefined}
						onClick={() => setLexHeadersHidden(!lexHeadersHidden)}
						key="hideLexiconTopButton"
					>
						<IonIcon
							icon={lexHeadersHidden ? chevronDownCircle : chevronUpCircle}
							slot="icon-only"
						/>
					</IonButton>,
					<IonButton
						disabled={isDeleting}
						onClick={() => setIsOpenECM(true)}
						slot="icon-only"
						key="openExtraCharsLexButton"
					>
						<IonIcon icon={globeOutline} />
					</IonButton>,
					<IonButton
						disabled={isDeleting}
						onClick={() => setIsOpenLexStorage(true)}
						slot="icon-only"
						key="openLexStorageButton"
					>
						<IonIcon icon={saveOutline} />
					</IonButton>,
					<IonButton
						disabled={isDeleting}
						onClick={() => setIsOpenInfo(true)}
						slot="icon-only"
						key="openLexHelpButton"
					>
						<IonIcon icon={helpCircleOutline} />
					</IonButton>
				]}
			/>
			<IonContent fullscreen className="evenBackground hasSpecialLabels" id="lexiconPage">
				<IonList
					lines="none"
					id="lexiconTitleAndDescription"
					className={lexHeadersHidden ? "hide" : undefined}
				>
					<IonItem className="labelled"><IonLabel>Lexicon Title:</IonLabel></IonItem>
					<IonItem>
						<IonInput
							aria-label="Lexicon title"
							value={title}
							id="lexTitle"
							className="ion-margin-top"
							placeholder="Usually the language name."
							onIonChange={() => setNewInfo("lexTitle", "title")}
						></IonInput>
					</IonItem>
					<IonItem className="labelled"><IonLabel>Description:</IonLabel></IonItem>
					<IonItem>
						<IonTextarea
							aria-label="Description"
							value={description}
							id="lexDesc"
							className="ion-margin-top"
							placeholder="A short description of this lexicon."
							rows={3}
							onIonChange={() => setNewInfo("lexDesc", "description")}
						/>
					</IonItem>
				</IonList>
				<IonList lines="none" id="mainLexList">
					<div id="theLexiconHeader">
						<div className="flex-basic">
							<h1>{lexicon.length === 1 ? "1 Item" : `${lexicon.length} Items`}</h1>
						</div>
						<div className="flex-shrinker">
							<h2>Sort:</h2>
							<div
								className="fakeButton"
								onClick={() => setIsOpenLexSorter(true)}
								role="button"
								aria-label={columns[sortPattern[0]].label}
							>
								<IonIcon src="svg/unfold.svg"></IonIcon>
								<div>{columns[sortPattern[0]].label}</div>
							</div>
							<IonButton
								color="secondary"
								onClick={() => dispatch(updateLexiconSortDir([!sortDir, sorter]))}
							>
								<IonIcon size="small" src={`svg/sort-${sortDir ? "up" : "down"}.svg`} />
							</IonButton>
						</div>
						<div className="unflexable">
							<IonButton
								disabled={isDeleting}
								color="tertiary"
								onClick={() => setIsOpenLexOrder(true)}
							>
								<IonIcon size="small" icon={settings} />
							</IonButton>
						</div>
					</div>
					<IonGrid id="theLexiconHolder">
						<IonRow>
							<IonCol id="theLexicon">
								<IonItem
									id="lexColumnNames"
									className="lexRow lexHeader"
								>
									{columns.map((column: LexiconColumn) => (
										<div
											className={
												"overflow-y-none "
												+ (truncateColumns ? "" : "ion-text-wrap ")
												+ column.size
											}
											key={column.id}
										>{column.label}</div>
									))}
									<div className="xs overflow-y-none"></div>
								</IonItem>
								<IonItem
									id="lexColumnInputs"
									className="lexRow serifChars lexInputs"
								>
									{columns.map((column: LexiconColumn) => {
										const { id, label, size } = column;
										const key = `input_lex_${id}`;
										return (
											<IonInput
												id={key}
												key={key}
												aria-label={`${label} input`}
												className={`${size} lexAddInput`}
												type="text"
												disabled={isDeleting}
											/>
										);
									})}
									<div className="xs overflow-y-none">
										<IonButton
											disabled={isDeleting}
											color="success"
											onClick={() => addToLex()}
										>
											<IonIcon icon={add} className="marginless" />
										</IonButton>
									</div>
								</IonItem>
								{isDeleting ?
									<FixedSizeList
										className="virtualLex"
										height={lexiconHeight}
										itemCount={lexicon.length}
										itemData={otherData}
										itemSize={48}
										width="100%"
									>{RenderLexiconDeleting}</FixedSizeList>
								:
									<FixedSizeList
										className="virtualLex"
										height={lexiconHeight}
										itemCount={lexicon.length}
										itemSize={48}
										itemData={fixedSizeListData}
										width="100%"
									>{RenderLexiconItem}</FixedSizeList>
								}
							</IonCol>
						</IonRow>
					</IonGrid>
				</IonList>
				<IonFab vertical="bottom" horizontal="end" slot="fixed">
					<IonFabButton color="primary" disabled={isDeleting}>
						<IonIcon icon={construct} />
					</IonFabButton>
					<IonFabList side="top">
						<IonFabButton
							color="danger"
							title="Delete multiple lexicon items"
							onClick={() => beginMassDeleteMode()}
						>
							<IonIcon icon={trash} />
						</IonFabButton>
						<IonFabButton
							color="success"
							title="Add new lexicon item"
							onClick={() => setIsOpenAddLexItem(true)}
						>
							<IonIcon icon={addCircle} />
						</IonFabButton>
					</IonFabList>
				</IonFab>
				{isDeleting ?
					<>
						<IonFab vertical="top" horizontal="start" edge={true} slot="fixed">
							<IonFabButton
								color="danger"
								title="Delete selected lexicon items"
								onClick={() => maybeFinishDeleting()}
							>
								<IonIcon icon={trash} />
							</IonFabButton>
						</IonFab>
						<IonFab vertical="bottom" horizontal="start" slot="fixed">
							<IonFabButton
								color="warning"
								title="Cancel deleting"
								onClick={() => maybeFinishDeleting(true)}
							>
								<IonIcon icon={closeCircle} />
							</IonFabButton>
						</IonFab>
					</>
				:
					<></>
				}
				{mergeButton}
			</IonContent>
		</IonPage>
	);
};

export default Lex;

export const LexCard = () => {
	return (
		<IonCard>
			<IonItem lines="full">
				<LexiconIcon slot="start" color="primary" />
				<IonLabel>Lexicon</IonLabel>
			</IonItem>
			<IonCardContent>
				<p>
					This tool is for storing the raw info of your language, whether that be words or
					something else. The default setup includes dictionary-style columns such as
					"word", "part of speec" and "definition", but you can add, remove, or rename
					columns as you see fit.
				</p><p className="center pad-top-rem">
					<IonIcon icon={chevronUpCircle} color="tertiary" size="large" />
				</p><p>
					At the top of the page is a place where you can title your collection and give it
					a short description. You can toggle this entire section by using the (^) button at
					the top of the page.
				</p><p className="center pad-top-rem">
					<IonIcon icon={saveOutline} color="tertiary" size="large" />
				</p><p>
					The save button at the top can be used to store, delete, and export entire Lexicons.
				</p><p>
					At the top of the Lexicon you'll find a counter displaying how many words you have
					stored. Next to it is are two sort buttons, where you can choose which columns will
					be used to sort your collection.
				</p><p className="center pad-top-rem">
					<IonIcon icon={settings} color="tertiary" size="large" />
				</p><p>
					The gear icon opens the "Edit Columns" settings. You can choose whether or not to
					show the columns' full names, the method you wish to use to sort the Lexicon, and
					how blank columns will be handled. Below that you'll find a list of all current
					columns. You can edit them, delete them, add more, or use
					the <IonIcon icon={reorderTwo} color="tertiary" /> drag handles to rearrange their
					order.
				</p><p>
					The second row contains the titles of the columns. Beneath them are input boxes
					for quickly adding info to the Lexicon. Use the small (+) button to save what you've
					typed.
				</p><p>
					Under those boxes you'll find the meat of Lexicon: all the items you've stored.
					They will appear as striped rows. You can swipe left on each one to find Edit
					and Delete buttons.
				</p><p className="center pad-top-rem">
					<IonIcon icon={construct} color="tertiary" size="large" />
				</p><p>
					At the bottom of the page, you'll find a large tool button. You can tap on it to
					pull up a small menu. Tap on the (+) button to pop up a large form for adding
					to the Lexicon. Tap on the trash can to enter mass-delete mode, where you can
					select multiple entries and delete them all at once.
				</p>
				<hr />
				<p className="center">
					<IonIcon color="tertiary" size="large" src="svg/link.svg" />
				</p><p>
					You can swipe right on a lexicon item to find the <strong>Merge</strong> button. You
					can use this to mark multiple entries. Once you've selected at least two, a large
					paperclip button will appear at the bottom of the page. Tapping on it will prompt you
					to merge the selected items into one entry.
				</p><p>
					Several tools in <strong>Conlang Toolbox</strong> can export info into the Lexicon.
					The merge function can be used to merge all this different info. Here's an example:
				</p>
				<ol>
					<li>You begin by naming columns in the Lexicon "original", "changed", and
					"definition".</li>
					<li>Then, you use <strong>WordGen</strong> to create a bunch of new words, which you
					export to Lexicon under the "original" column.</li>
					<li>Next, you change those words with <strong>WordEvolve</strong> and export
					the changed words to "changed".</li>
					<li>Then, you visit <strong>Concepts</strong> and export meanings to "definition".</li>
					<li>Finally, you swipe link each "original", "changed" and "definition" column with
					each other and merge them into single entries.</li>
				</ol>
			</IonCardContent>
		</IonCard>
	);
}
