import React, { useState, useCallback, useEffect } from 'react';
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
	useIonViewDidLeave
} from '@ionic/react';
import {
	add,
	construct,
	trash,
	trashOutline,
	saveOutline,
	globeOutline,
	settings,
	chevronUpCircle,
	chevronDownCircle
} from 'ionicons/icons';
import { useSelector, useDispatch } from "react-redux";
import { useWindowHeight } from '@react-hook/window-size/throttled';
import { v4 as uuidv4 } from 'uuid';
import VirtualList from 'react-tiny-virtual-list';

import {
	updateLexiconText,
	startEditLexiconItem,
	deleteLexiconItem,
	updateLexiconOrder,
	updateLexiconBool,
	clearDeferredLexiconItems
} from '../components/ReduxDucksFuncs';
import { Lexicon, LexiconObject, PageData } from '../components/ReduxDucksTypes';
import { $i } from '../components/DollarSignExports';
import fireSwal from '../components/Swal';
import escape from '../components/EscapeForHTML';
import debounce from '../components/Debounce';

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
}

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
	}, [hasLoaded, height, lexHeadersHidden, topBar, lexInfoHeader, lexHeader, lexColumnInputs, lexColumnNames]);
	const clearSavedWords = () => {
		const thenFunc = () => {
			dispatch(clearDeferredLexiconItems());
			fireSwal({
				title: "Words deleted.",
				toast: true,
				timer: 2500,
				timerProgressBar: true,
				showConfirmButton: false
			});
		};
		if(disableConfirms) {
			thenFunc();
		} else {
			fireSwal({
				text: "Are you sure you want to delete the saved words? This cannot be undone.",
				customClass: {popup: 'deleteConfirm'},
				icon: 'warning',
				showCancelButton: true,
				confirmButtonText: "Yes, delete them."
			}).then((result: any) => result.isConfirmed && thenFunc());
		}
	};
	const loadSavedWords = () => {
		let options: any = {};
		for(let x = 0; x < columns; x++) {
			options[x.toString()] = columnTitles[x];
		}
		const thenFunc = (value: number) => {
			setIsLoading(true);
			let [col, dir] = sort;
			const toAdd = [...waitingToAdd];
			let everythingToSort = [...lexicon];
			let pre: string[] = [];
			let post: string[] = [];
			for(let c = 0; c < value; c++) {
				pre.push("");
			}
			for(let c = value + 1; c < columns; c++) {
				post.push("");
			}
			toAdd.forEach(w => {
				everythingToSort.push({key: uuidv4(), columns: [...pre, w, ...post]});
			});
			internalSort(col, dir, everythingToSort);
			dispatch(clearDeferredLexiconItems());
			setIsLoading(false);
		};
		if(columns === 1) {
			return thenFunc(0);
		} else {
			return fireSwal({
				title: 'Import Lexicon',
				input: 'select',
				inputOptions: options,
				inputPlaceholder: 'Which column do you want to save to?',
				showCancelButton: true
			}).then((result: any) => {
				if(result.isConfirmed && result.value) {
					thenFunc(parseInt(result.value));
				}
			});
		}
	};
	const setNewInfo = (id: string, prop: "description" | "title") => {
		const el = $i(id);
		const value = el.value.trim();
		debounce(dispatch, [updateLexiconText(prop, value)], (prop === "description" ? 2000 : 1000), "updateLexText");
	};
	const internalSort = (col: number, dir: number, newLex: Lexicon[] = [...lexicon]) => {
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
		dispatch(updateLexiconOrder(newLex));
		dispatch(updateLexiconBool("sorted", true));
	};
	const addToLex = () => {
		const newInfo: string[] = [];
		let foundFlag = false;
		let i: number = 0;
		while(i < columns) {
			let el = $i("inputLex" + i.toString());
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
			let el = $i("inputLex" + i.toString());
			if(el !== null) {
				el.value = "";
			}
			i++;
		}
		const newWord: Lexicon = {
			key: uuidv4(),
			columns: newInfo
		}
		let [col, dir] = sort;
		internalSort(col, dir, [...lexicon, newWord]);
	};
	const delFromLex = useCallback((key: string) => {
		let title: string = "";
		let index: number = -1;
		if(lexicon.every((lx: Lexicon, i: number) => {
			if(lx.key === key) {
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
			if(lx.key === key) {
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
	const maybeExpand = useCallback((e: any) => {
		// Expand an overflowing field into a toast
		const span = e.target;
		if(!lexiconWrap && span.matches('.lexItem') && span.clientWidth < span.scrollWidth) {
			const titleText = (span && (span.textContent as string)) || "<error>";
			fireSwal({
				titleText,
				toast: true,
				position: "top",
				customClass: { popup: "infoToast" },
				timer: 6000,
				timerProgressBar: true,
			});
		}
	}, [lexiconWrap]);
	const renderLexiconItem = useCallback(({index, style}: LexItem) => {
		const lex: Lexicon = lexicon[index];
		const cols = lex.columns;
		const key = lex.key;
		const id = "LEX" + key;
		let newStyle: { [key: string]: any } = {
			...style,
			order: index
		};
		return (
			<IonItem
				key={id}
				className={
					"lexRow lexiconDisplay serifChars "
					+ (index % 2 ? "even" : "odd")
				}
				id={id}
				style={ newStyle }
			>
				{columnOrder.map((i: number) => (
					<div
						onClick={maybeExpand}
						key={key + i.toString()}
						className={
							(lexiconWrap ? "ion-text-wrap " : "")
							+ "lexItem selectable "
							+ columnSizes[i]
						}
					>{cols[i]}</div>
				))}
				<div className="xs">
					<IonButton style={ { margin: 0 } } color="warning" onClick={() => editInLex(key)}>
						<IonIcon icon={construct} style={ { margin: 0 } } />
					</IonButton>
				</div>
				<div className="xs ion-hide-sm-down">
					<IonButton style={ { margin: 0 } } color="danger" onClick={() => delFromLex(key)}>
						<IonIcon icon={trash} style={ { margin: 0 } } />
					</IonButton>
				</div>
			</IonItem>
		);
	}, [delFromLex, editInLex, maybeExpand, columnOrder, columnSizes, lexiconWrap, lexicon]);
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
							<IonCol className={waitingToAdd.length > 0 ? "" : "hide"} size="auto">
								<IonButton color="warning" strong={true} onClick={() => loadSavedWords()} style={ { padding: "0.25em" } }>
									<IonIcon size="small" icon={saveOutline} style={ { margin: "0 0.25em 0 0" } } /> Add Saved
								</IonButton>
							</IonCol>
							<IonCol className={waitingToAdd.length > 0 ? "" : "hide"} size="auto">
								<IonButton color="danger" strong={true} onClick={() => clearSavedWords()} style={ { padding: "0.25em 0" } }>
									<IonIcon size="small" icon={trashOutline} />
								</IonButton>
							</IonCol>
							<IonCol size="auto">
								<h2>Sort: {columnTitles[sort[0]] + [" ↓", " ↑"][sort[1]]}</h2>
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
									{columnOrder.map((i: number) => (
										<div
											className={
												(lexiconWrap ? "ion-text-wrap " : "")
												+ columnSizes[i]
											}
											style={ { overflowY: "hidden" }}
											key={`${i}:${columnTitles[i]}`}
										>{columnTitles[i]}</div>
									))}
									<div className="xs" style={ { overflowY: "hidden" }}></div>
									<div className="xs ion-hide-sm-down" style={ { overflowY: "hidden" }}></div>
								</IonItem>
								<IonItem id="lexColumnInputs" className="lexRow serifChars lexInputs" style={ { order: -1, overflowY: "scroll" } }>
									{columnOrder.map((i: number) => {
										const key = `inputLex${i}`;
										return (
											<IonInput id={key} key={key} aria-label={`${columnTitles[i]} input`} className={columnSizes[i]} type="text" style={ { overflowY: "hidden" }} />
										);
									})}
									<div className="xs" style={ { overflowY: "hidden" }}>
										<IonButton color="success" onClick={() => addToLex()}>
											<IonIcon icon={add} style={ { margin: 0 } } />
										</IonButton>
									</div>
									<div className="xs ion-hide-sm-down" style={ { overflowY: "hidden" }}></div>
								</IonItem>
								<VirtualList
									className="virtualLex"
									width="100%"
									height={lexiconHeight}
									itemCount={lexicon.length}
									itemSize={48}
									renderItem={renderLexiconItem}
								/>
							</IonCol>
						</IonRow>
					</IonGrid>
				</IonList>
			</IonContent>
		</IonPage>
	);
};
 
export default Lex;
