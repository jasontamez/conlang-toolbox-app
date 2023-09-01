import React, { useState, useCallback, useEffect, memo } from 'react';
import {
	IonPage,
	IonContent,
	IonHeader,
	IonToolbar,
	IonTitle,
	IonButtons,
	IonButton,
	IonMenuButton,
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
	IonItemOption
} from '@ionic/react';
import {
	add,
//	construct,
	trash,
	saveOutline,
	globeOutline,
	settings,
	chevronUpCircle,
	chevronDownCircle
} from 'ionicons/icons';
import { useSelector, useDispatch } from "react-redux";
import { useWindowHeight } from '@react-hook/window-size/throttled';
import { v4 as uuidv4 } from 'uuid';
import { FixedSizeList, areEqual } from 'react-window';
import memoizeOne from 'memoize-one';

import {
	updateLexiconText,
	startEditLexiconItem,
	deleteLexiconItem,
	addLexiconItem
} from '../components/ReduxDucksFuncs';
import { Lexicon, LexiconColumn, LexiconObject, PageData } from '../components/ReduxDucksTypes';
import { $i } from '../components/DollarSignExports';
import fireSwal from '../components/Swal';
import escape from '../components/EscapeForHTML';
import debounce from '../components/Debounce';
import './Lexicon.css';

import EditLexiconItemModal from './M-EditWord';
import EditLexiconOrderModal from './M-EditWordOrder';
import LexiconStorageModal from './M-LexiconStorage';
import LoadLexiconModal from './M-LoadLexicon';
import DeleteLexiconModal from './M-DeleteLexicon';
import ExtraCharactersModal from './M-ExtraCharacters';
import ExportLexiconModal from './M-ExportLexicon';

interface LexItem {
	index: number
	style: {
		[key: string]: any
	}
	data: {
		delFromLex: Function
		editInLex: Function
		maybeExpand: Function
		columns: LexiconColumn[]
		lexicon: Lexicon[]
	}
}

function maybeExpand (e: any) {
	// Expand an overflowing field into a toast
	const span = e.target;
	if(span.matches('.lexItem') && span.clientWidth < span.scrollWidth) {
		const titleText = (span && (span.textContent as string)) || "<error>";
		fireSwal({
			titleText,
			toast: true,
			position: "top",
			timer: 6000,
			timerProgressBar: true,
		});
	}
};

const Lex = (props: PageData) => {
	const dispatch = useDispatch();
	const [isOpenECM, setIsOpenECM] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isWorking, setIsWorking] = useState<boolean>(false);
	const [isOpenEditLexItem, setIsOpenEditLexItem] = useState<boolean>(false);
	const [isOpenLexOrder, setIsOpenLexOrder] = useState<boolean>(false);
	const [isOpenLoadLex, setIsOpenLoadLex] = useState<boolean>(false);
	const [isOpenExportLex, setIsOpenExportLex] = useState<boolean>(false);
	const [isOpenLexStorage, setIsOpenLexStorage] = useState<boolean>(false);
	const [isOpenDelLex, setIsOpenDelLex] = useState<boolean>(false);
	const [storedLexInfo, setStoredLexInfo] = useState<[string, LexiconObject][]>([]);
	const height = useWindowHeight();
	const [lexHeadersHidden, setLexHeadersHidden] = useState<boolean>(false);
	const [lexiconHeight, setLexiconHeight] = useState<number>(Math.ceil(height / 3 * 2));
	const [hasLoaded, setHasLoaded] = useState<boolean>(false);
	useIonViewDidEnter(() => setHasLoaded(true));
	useIonViewDidLeave(() => setHasLoaded(false));
	const [disableConfirms, lexObject] = useSelector((state: any) => [state.appSettings.disableConfirms, state.lexicon]);
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
		/*fontType,
		storedCustomInfo,
		storedCustomIDs*/
	} = lexObject;
	/*
	const {
		title,
		description,
		columns,
		columnOrder,
		columnTitles,
		columnSizes,
		sort,
		waitingToAdd,
		lexiconWrap,
		lexicon
	} = lexObject;
	*/
	const topBar = $i("lexiconTopBar");
	const lexInfoHeader = $i("lexiconTitleAndDescription");
	const lexHeader = $i("theLexiconHeader");
	const lexColumnNames = $i("lexColumnNames");
	const lexColumnInputs = $i("lexColumnInputs");
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
	}, [hasLoaded, height, lexHeadersHidden, truncateColumns, columns, topBar, lexInfoHeader, lexHeader, lexColumnInputs, lexColumnNames]);
	const setNewInfo = (id: string, prop: "description" | "title") => {
		const el = $i(id);
		const value = el.value.trim();
		debounce(dispatch, [updateLexiconText(prop, value)], (prop === "description" ? 2000 : 1000), "updateLexText");
	};
	const addToLex = () => {
		const newInfo: string[] = [];
		let foundFlag = false;
		let i: number = 0;
		while(i < columns) {
			const el = $i("inputLex" + i.toString());
			if(el !== null) {
				let info = el.value.trim();
				if(info) {
					foundFlag = true;
				}
				newInfo.push(info);
			}
			i++;
		}
		if(!foundFlag) {
			fireSwal({
				title: "Error",
				icon: "error",
				text: "You did not type any information into any text field."
			});
			return;
		}
		i = 0;
		while(i < columns) {
			const el = $i("inputLex" + i.toString());
			if(el !== null) {
				el.value = "";
			}
			i++;
		}
		dispatch(addLexiconItem({
			id: uuidv4(),
			columns: newInfo
		}));
	};
	const delFromLex = useCallback((key: string) => {
		let title: string = "";
		let index: number = -1;
		if(lexicon.every((lx: Lexicon, i: number) => {
			if(lx.id === key) {
				index = i;
				title = lx.columns.join(" / ");
				return false;
			}
			return true;
		})) {
			console.log("Bad key: " + key);
			return;
		}
		const thenFunc = () => dispatch(deleteLexiconItem(index));
		if(disableConfirms) {
			thenFunc();
		} else {
			fireSwal({
				html: escape(title) + "<br /><br />Are you sure you want to delete this? This cannot be undone.",
				customClass: {popup: 'deleteConfirm'},
				icon: 'warning',
				showCancelButton: true,
				confirmButtonText: "Yes, delete it."
			}).then((result: any) => result.isConfirmed && thenFunc());
		}
	}, [dispatch, lexicon, disableConfirms]);
	const editInLex = useCallback((key: string) => {
		//need modal
		let index: number = -1;
		if(lexicon.every((lx: Lexicon, i: number) => {
			if(lx.id === key) {
				index = i;
				return false;
			}
			return true;
		})) {
			console.log("Bad key: " + key);
			return;
		}
		dispatch(startEditLexiconItem(index));
		setIsOpenEditLexItem(true);
	}, [dispatch, lexicon]);
	const createItemData = memoizeOne((delFromLex, editInLex, maybeExpand, columns, lexicon) => ({
		delFromLex, editInLex, maybeExpand, columns, lexicon
	}));
	const fixedSizeListData = createItemData(delFromLex, editInLex, maybeExpand, columns, lexicon);
	const RenderLexiconItem = memo(({index, style, data}: LexItem) => {
		const {
			delFromLex,
			editInLex,
			maybeExpand,
			columns,
			lexicon
		} = data;
		const lex: Lexicon = lexicon[index];
		const cols = lex.columns;
		const id = lex.id;
		return (
			<IonItemSliding
				key={id}
				id={id}
				style={style}
			>
				<IonItemOptions side="end" className="lexiconDisplay serifChars">
					<IonItemOption color="primary" onClick={() => editInLex(id)}>
						<IonIcon slot="icon-only" src="svg/edit.svg" />
					</IonItemOption>
					<IonItemOption color="danger" onClick={() => delFromLex(id)}>
						<IonIcon slot="icon-only" icon={trash} />
					</IonItemOption>
				</IonItemOptions>
				<IonItem className={
					"lexRow lexiconDisplay serifChars "
					+ (index % 2 ? "even" : "odd")
				}>
					{cols.map((item: string, i: number) => (
						<div
							onClick={() => maybeExpand()}
							key={`${id}:col${i}`}
							className={
								"lexItem selectable "
								+ columns[i].size
							}
						>{item}</div>
					))}
					<div className="xs">
						<IonIcon size="small" src="svg/drag-indicator.svg" />
					</div>
				</IonItem>
			</IonItemSliding>
		);
	}, areEqual);
	return (
		<IonPage>
			<EditLexiconItemModal {...props.modalPropsMaker(isOpenEditLexItem, setIsOpenEditLexItem)} openECM={setIsOpenECM} />
			<EditLexiconOrderModal {...props.modalPropsMaker(isOpenLexOrder, setIsOpenLexOrder)} openECM={setIsOpenECM} />
			<LoadLexiconModal
				{...props.modalPropsMaker(isOpenLoadLex, setIsOpenLoadLex)}
				lexInfo={storedLexInfo}
				setLexInfo={setStoredLexInfo}
			/>
			<ExportLexiconModal {...props.modalPropsMaker(isOpenExportLex, setIsOpenExportLex)} setLoading={setIsLoading} />
			<DeleteLexiconModal
				{...props.modalPropsMaker(isOpenDelLex, setIsOpenDelLex)}
				setLoadingScreen={setIsWorking}
				lexInfo={storedLexInfo}
				setLexInfo={setStoredLexInfo}
			/>
			<ExtraCharactersModal {...props.modalPropsMaker(isOpenECM, setIsOpenECM)} />
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
			<IonHeader id="lexiconTopBar">
				<IonToolbar>
					<IonButtons slot="start">
						<IonMenuButton />
					</IonButtons>
					<IonTitle>Lexicon</IonTitle>
					<IonButtons slot="end">
						<IonButton color={lexHeadersHidden ? "secondary" : undefined} onClick={() => setLexHeadersHidden(!lexHeadersHidden)}>
							<IonIcon icon={lexHeadersHidden ? chevronDownCircle : chevronUpCircle} slot="icon-only" />
						</IonButton>
						<IonButton onClick={() => setIsOpenECM(true)} slot="icon-only">
							<IonIcon icon={globeOutline} />
						</IonButton>
						<IonButton onClick={() => setIsOpenLexStorage(true)} slot="icon-only">
							<IonIcon icon={saveOutline} />
						</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen className="evenBackground hasSpecialLabels" id="lexiconPage">
				<IonList lines="none" id="lexiconTitleAndDescription" className={lexHeadersHidden ? "hide" : undefined}>
					<IonItem className="labelled"><IonLabel>Lexicon Title:</IonLabel></IonItem>
					<IonItem>
						<IonInput aria-label="Lexicon title" value={title} id="lexTitle" className="ion-margin-top" placeholder="Usually the language name." onIonChange={() => setNewInfo("lexTitle", "title")}></IonInput>
					</IonItem>
					<IonItem className="labelled"><IonLabel>Description:</IonLabel></IonItem>
					<IonItem>
						<IonTextarea aria-label="Description" value={description} id="lexDesc" className="ion-margin-top" placeholder="A short description of this lexicon." rows={3} onIonChange={() => setNewInfo("lexDesc", "description")} />
					</IonItem>
				</IonList>
				<IonList lines="none">
					<IonGrid id="theLexiconHeader">
						<IonRow>
							<IonCol>
								<h1>{lexicon.length === 1 ? "1 Word" : lexicon.length.toString() + " Words"}</h1>
							</IonCol>
							<IonCol size="auto">
								<h2>Sort: {columns[sortPattern[0].label]} {sortDir ? "↑" : "↓"}</h2>
							</IonCol>
							<IonCol size="auto">
								<IonButton color="tertiary" style={ { padding: "0.25em 0" } } onClick={() => setIsOpenLexOrder(true)}>
									<IonIcon size="small" icon={settings} />
								</IonButton>
							</IonCol>
						</IonRow>
					</IonGrid>
					<IonGrid id="theLexiconHolder">
						<IonRow>
							<IonCol id="theLexicon">
								<IonItem id="lexColumnNames" className="lexRow lexHeader" style={ { order: -2, overflowY: "scroll" } }>
									{columns.map((column: LexiconColumn) => (
										<div
											className={
												(truncateColumns ? "ion-text-wrap " : "")
												+ column.size
											}
											style={ { overflowY: "hidden" }}
											key={column.id}
										>{column.label}</div>
									))}
									<div className="xs" style={ { overflowY: "hidden" }}></div>
								</IonItem>
								<IonItem id="lexColumnInputs" className="lexRow serifChars lexInputs" style={ { order: -1, overflowY: "scroll" } }>
									{columns.map((column: LexiconColumn) => {
										const { id, label, size } = column;
										const key = `inputLex${id}`;
										return (
											<IonInput id={key} key={key} aria-label={`${label} input`} className={size} type="text" style={ { overflowY: "hidden" }} />
										);
									})}
									<div className="xs" style={ { overflowY: "hidden" }}>
										<IonButton color="success" onClick={() => addToLex()}>
											<IonIcon icon={add} style={ { margin: 0 } } />
										</IonButton>
									</div>
								</IonItem>
								<FixedSizeList
									className="virtualLex"
									height={lexiconHeight}
									itemCount={lexicon.length}
									itemData={fixedSizeListData}
									itemSize={48}
									width="100%"
								>{RenderLexiconItem}</FixedSizeList>
							</IonCol>
						</IonRow>
					</IonGrid>
				</IonList>
			</IonContent>
		</IonPage>
	);
};
 
export default Lex;
