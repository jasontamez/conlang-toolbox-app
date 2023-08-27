import React, { useState } from 'react';
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
	IonLoading
} from '@ionic/react';
import {
	add,
	construct,
	trash,
	trashOutline,
	saveOutline,
	globeOutline,
	settings
} from 'ionicons/icons';
import { useSelector, useDispatch } from "react-redux";
import {
	updateLexiconText,
	startEditLexiconItem,
	deleteLexiconItem,
	updateLexiconOrder,
	updateLexiconBool,
	clearDeferredLexiconItems
} from '../components/ReduxDucksFuncs';
import { Lexicon, PageData } from '../components/ReduxDucksTypes';
import { $i } from '../components/DollarSignExports';
import EditLexiconItemModal from './M-EditWord';
import EditLexiconOrderModal from './M-EditWordOrder';
import LexiconStorageModal from './M-LexiconStorage';
import fireSwal from '../components/Swal';
import LoadLexiconModal from './M-LoadLexicon';
import DeleteLexiconModal from './M-DeleteLexicon';
import { v4 as uuidv4 } from 'uuid';
import escape from '../components/EscapeForHTML';
import VirtualList from 'react-tiny-virtual-list';
import { useWindowHeight } from '@react-hook/window-size/throttled';
import ltr from '../components/LTR';
import ExtraCharactersModal from './M-ExtraCharacters';
import ExportLexiconModal from './M-ExportLexicon';
import debounce from '../components/Debounce';
import { Clipboard } from '@capacitor/clipboard';

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
	const [appSettings, lexicon] = useSelector((state: any) => [state.appSettings, state.lexicon]);
	const twoThirds = Math.ceil(useWindowHeight() / 3 * 2);
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
		if(appSettings.disableConfirms) {
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
		let cols: number = lexicon.columns;
		let options: any = {};
		for(let x = 0; x < cols; x++) {
			options[x.toString()] = lexicon.columnTitles[x];
		}
		const thenFunc = (value: number) => {
			setIsLoading(true);
			let [col, dir] = lexicon.sort;
			const toAdd = [...lexicon.waitingToAdd];
			let everythingToSort = [...lexicon.lexicon];
			let pre: string[] = [];
			let post: string[] = [];
			for(let c = 0; c < value; c++) {
				pre.push("");
			}
			for(let c = value + 1; c < cols; c++) {
				post.push("");
			}
			toAdd.forEach(w => {
				everythingToSort.push({key: uuidv4(), columns: [...pre, w, ...post]});
			});
			internalSort(col, dir, everythingToSort);
			dispatch(clearDeferredLexiconItems());
			setIsLoading(false);
		};
		if(cols === 1) {
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
	const theOrder = lexicon.columnOrder;
	const theTitles = lexicon.columnTitles;
	const theSizes = lexicon.columnSizes;
	//const theSort = lexicon.sort.map((n: number) => n.toString()).join("");
	const theSort = lexicon.sort;
	const internalSort = (col: number, dir: number, newLex: Lexicon[] = [...lexicon.lexicon]) => {
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
		const columns = lexicon.columns;
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
		let [col, dir] = lexicon.sort;
		internalSort(col, dir, [...lexicon.lexicon, newWord]);
	};
	const delFromLex = (key: string) => {
		let title: string = "";
		let index: number = -1;
		if(lexicon.lexicon.every((lx: Lexicon, i: number) => {
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
		if(appSettings.disableConfirms) {
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
	};
	const editInLex = (key: string) => {
		//need modal
		let index: number = -1;
		if(lexicon.lexicon.every((lx: Lexicon, i: number) => {
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
	};
	const copyText = async () => {
		const info = $i("revealFullElement");
		await Clipboard.write({string: info.textContent});
		//navigator.clipboard.writeText(info.textContent);
		fireSwal({
			title: "Copied to clipboard.",
			toast: true,
			timer: 1500,
			position: 'top',
			timerProgressBar: true,
			showConfirmButton: false
		});	
		clearTimeout(Number(info.dataset.timer));
		info.classList.add("hide");
	};
	const maybeExpand = (e: any) => {
		const span = e.target;
		if(!lexicon.lexiconWrap && span.matches('.lexItem') && span.clientWidth < span.scrollWidth) {
			let info = $i("revealFullElement") as HTMLInputElement;
			if(info.dataset.timer) {
				clearTimeout(Number(info.dataset.timer));
			}
			info.textContent = span.textContent;
			const body = $i("lexiconPage");
			const win = body.getBoundingClientRect();
			const maxend = win.right;
			const maxdown = win.bottom;
			const rect = span.getBoundingClientRect();
			const width = span.scrollWidth + 16;
			const height = span.scrollHeight;
			let style: [string, any][] = [
				["width", String(width) + "px"],
			];
			// Determine the location of the span's four corners.
			// Prefer to expand to the end and down, then end and up,
			//   then start and down, and finally start and up
			// Set horizontal position
			if(ltr(span)) {
				// LTR
				let amount = String(Math.floor(rect.left - win.left)) + "px";
				if(rect.left + width > maxend) {
					style.push(["right", amount]);
				} else {
					style.push(["left", amount]);
				}
			} else {
				// RTL
				let amount = String(Math.floor(rect.right - win.right)) + "px";
				if(rect.right + width > maxend) {
					style.push(["left", amount]);
				} else {
					style.push(["right", amount]);
				}
			}
			// Set vertical position
			if(rect.top + height > maxdown) {
				style.push(["bottom", String(Math.floor(rect.bottom)) + "px"]);
			} else {
				style.push(["top", String(Math.floor(rect.top)) + "px"]);
			}
			// Set style
			info.setAttribute("style", style.map((pair: [string, any]) => {
				let [prop, value] = pair;
				return prop + ": " + String(value);
			}).join("; "));
			// Add to page
			info.classList.remove("hide");
			// Disappear after 6 seconds
			info.dataset.timer = String(setTimeout(() => info.classList.add("hide"), 6000));
		}
	};
	return (
		<IonPage>
			<EditLexiconItemModal {...props.modalPropsMaker(isOpenEditLexItem, setIsOpenEditLexItem)} openECM={setIsOpenECM} />
			<EditLexiconOrderModal {...props.modalPropsMaker(isOpenLexOrder, setIsOpenLexOrder)} openECM={setIsOpenECM} />
			<LoadLexiconModal {...props.modalPropsMaker(isOpenLoadLex, setIsOpenLoadLex)} />
			<ExportLexiconModal {...props.modalPropsMaker(isOpenExportLex, setIsOpenExportLex)} setLoading={setIsLoading} />
			<DeleteLexiconModal {...props.modalPropsMaker(isOpenDelLex, setIsOpenDelLex)} setLoadingScreen={setIsWorking} />
			<ExtraCharactersModal {...props.modalPropsMaker(isOpenECM, setIsOpenECM)} />
			<LexiconStorageModal
				{...props.modalPropsMaker(isOpenLexStorage, setIsOpenLexStorage)}
				openLoad={setIsOpenLoadLex}
				openDelete={setIsOpenDelLex}
				openExport={setIsOpenExportLex}
				setLoading={setIsLoading}
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
			<IonHeader>
				<IonToolbar>
					<IonButtons slot="start">
						<IonMenuButton />
					</IonButtons>
					<IonTitle>Lexicon</IonTitle>
					<IonButtons slot="end">
						<IonButton onClick={() => setIsOpenECM(true)}>
							<IonIcon icon={globeOutline} />
						</IonButton>
						<IonButton onClick={() => setIsOpenLexStorage(true)}>
							<IonIcon icon={saveOutline} />
						</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen className="evenBackground hasSpecialLabels" id="lexiconPage">
				<IonButton id="revealFullElement" fill="clear" size="small" className="hide" onClick={() => copyText()} />
				<IonList lines="none">
					<IonItem className="labelled"><IonLabel>Lexicon Title:</IonLabel></IonItem>
					<IonItem>
						<IonInput aria-label="Lexicon title" value={lexicon.title} id="lexTitle" className="ion-margin-top" placeholder="Usually the language name." onIonChange={() => setNewInfo("lexTitle", "title")}></IonInput>
					</IonItem>
					<IonItem className="labelled"><IonLabel>Description:</IonLabel></IonItem>
					<IonItem>
						<IonTextarea aria-label="Description" value={lexicon.description} id="lexDesc" className="ion-margin-top" placeholder="A short description of this lexicon." rows={3} onIonChange={() => setNewInfo("lexDesc", "description")} />
					</IonItem>
					<IonGrid id="theLexiconHeader">
						<IonRow>
							<IonCol>
								<h1>{lexicon.lexicon.length === 1 ? "1 Word" : lexicon.lexicon.length.toString() + " Words"}</h1>
							</IonCol>
							<IonCol className={lexicon.waitingToAdd.length > 0 ? "" : "hide"} size="auto">
								<IonButton color="warning" strong={true} onClick={() => loadSavedWords()} style={ { padding: "0.25em" } }>
									<IonIcon size="small" icon={saveOutline} style={ { margin: "0 0.25em 0 0" } } /> Add Saved
								</IonButton>
							</IonCol>
							<IonCol className={lexicon.waitingToAdd.length > 0 ? "" : "hide"} size="auto">
								<IonButton color="danger" strong={true} onClick={() => clearSavedWords()} style={ { padding: "0.25em 0" } }>
									<IonIcon size="small" icon={trashOutline} />
								</IonButton>
							</IonCol>
							<IonCol size="auto">
								<h2>Sort: {theTitles[theSort[0]] + [" ↓", " ↑"][theSort[1]]}</h2>
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
								<IonItem className="lexRow lexHeader" style={ { order: -2, overflowY: "scroll" } }>
									{theOrder.map((i: number) => (
										<div
											className={
												(lexicon.lexiconWrap ? "ion-text-wrap " : "")
												+ theSizes[i]
											}
											style={ { overflowY: "hidden" }}
											key={`${i}:${theTitles[i]}`}
										>{theTitles[i]}</div>
									))}
									<div className="xs" style={ { overflowY: "hidden" }}></div>
									<div className="xs ion-hide-sm-down" style={ { overflowY: "hidden" }}></div>
								</IonItem>
								<IonItem className="lexRow serifChars lexInputs" style={ { order: -1, overflowY: "scroll" } }>
									{theOrder.map((i: number) => {
										const key = `inputLex${i}`;
										return (
											<IonInput id={key} key={key} aria-label={`${theTitles[i]} input`} className={theSizes[i]} type="text" style={ { overflowY: "hidden" }} />
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
									height={twoThirds}
									itemCount={lexicon.lexicon.length}
									itemSize={48}
									renderItem={({index, style}) => {
										const lex: Lexicon = lexicon.lexicon[index];
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
												{theOrder.map((i: number) => (
													<div
														onClick={maybeExpand}
														key={key + i.toString()}
														className={
															(lexicon.lexiconWrap ? "ion-text-wrap " : "")
															+ "lexItem selectable "
															+ theSizes[i]
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
									}}
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
