import React from 'react';
import {
	IonPage,
	IonContent,
	IonHeader,
	IonToolbar,
	IonTitle,
	IonButtons,
	IonButton,
	IonMenuButton,
	IonPopover,
	IonIcon,
	IonList,
	IonItem,
	IonLabel,
	IonInput,
	IonTextarea,
	IonSelect,
	IonSelectOption,
	IonGrid,
	IonRow,
	IonCol,
	IonLoading,
	IonItemDivider
} from '@ionic/react';
import {
	ellipsisVertical,
	add,
	construct,
	trash,
	trashOutline,
	swapHorizontalOutline,
	saveOutline
} from 'ionicons/icons';
import { useSelector, useDispatch } from "react-redux";
import {
	openPopover,
	closePopover,
	openModal,
	updateLexiconText,
	updateLexiconNumber,
	startEditLexiconItem,
	deleteLexiconItem,
	updateLexiconOrder,
	updateLexiconSort,
	updateLexicon,
	setLoadingPage,
	setTemporaryInfo,
	updateLexiconBool,
	toggleLexiconHorizontalScroll,
	clearDeferredLexiconItems
} from '../components/ReduxDucksFuncs';
import { Lexicon, LexiconObject, ModalStateObject } from '../components/ReduxDucksTypes';
import { Plugins } from '@capacitor/core';
import { $i } from '../components/DollarSignExports';
import EditLexiconItemModal from './M-EditWord';
import EditLexiconOrderModal from './M-EditWordOrder';
import fireSwal from '../components/Swal';
import LoadLexiconModal from './M-LoadLexicon';
import DeleteLexiconModal from './M-DeleteLexicon';
import { v4 as uuidv4 } from 'uuid';
import escape from '../components/EscapeForHTML';
import VirtualList from 'react-tiny-virtual-list';
import { useWindowHeight } from '@react-hook/window-size/throttled';
import ltr from '../components/LTR';

const Lex = () => {
	const dispatch = useDispatch();
	const [settings, modalState, lexicon] = useSelector((state: any) => [state.appSettings, state.modalState, state.lexicon]);
	const popstate = modalState.LexiconEllipsis;
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
		if(settings.disableConfirms) {
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
			dispatch(setLoadingPage("lookingForLexicons"));
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
			dispatch(setLoadingPage(false));
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
		dispatch(updateLexiconText(prop, value));
	};
	const theOrder = lexicon.columnOrder;
	const theTitles = lexicon.columnTitles;
	const theSizes = lexicon.columnSizes;
	const theSort = lexicon.sort.map((n: number) => n.toString()).join("");
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
	const doSort = () => {
		const el = $i("lexiconSort");
		const value = el.value;
		let [col, dir] = value.split("").map((n: string) => parseInt(n));
		dispatch(updateLexiconSort([col, dir]));
		internalSort(col, dir);
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
		if(settings.disableConfirms) {
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
	const swapColumns = () => {
		dispatch(openModal('EditLexiconOrder'));
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
		dispatch(openModal('EditLexiconItem'));
	};
	const clearLexicon = () => {
		dispatch(closePopover('LexiconEllipsis'))
		const thenFunc = () => {
			const newLex: LexiconObject = {
				key: "",
				lastSave: 0,
				title: "",
				description: "",
				columns: 1,
				columnOrder: [0],
				columnTitles: ["Word"],
				columnSizes: ["m"],
				sort: [0, 0],
				sorted: true,
				lexicon: [],
				waitingToAdd: [],
				editing: undefined,
				colEdit: undefined
			};
			dispatch(updateLexicon(newLex));
		};
		if(!settings.disableConfirms && (lexicon.title || lexicon.key || lexicon.description || lexicon.lexicon.length > 0)) {
			fireSwal({
				title: "Delete everything?",
				text: "This will erase everything currently displayed (but not anything previously saved). Are you sure you want to do this?",
				customClass: {popup: 'deleteConfirm'},
				icon: 'warning',
				showCancelButton: true,
				confirmButtonText: "Yes, erase it."
			}).then((result: any) => result.isConfirmed && thenFunc());
		} else {
			thenFunc();
		}
	};
	const { Storage } = Plugins;
	const openLexiconModal = (which: keyof ModalStateObject) => {
		Storage.get({ key: "savedLexicons" }).then((result) => {
			const value = result.value;
			if(value === null) {
				// No info retrieved.
			} else {
				const newData = JSON.parse(value);
				dispatch(setTemporaryInfo(newData));
			}
			dispatch(setLoadingPage(false));
			dispatch(openModal(which));
		});
		dispatch(closePopover('LexiconEllipsis'));
		dispatch(setLoadingPage("lookingForLexicons"));
	};
	const saveLexicon: any = (announce: string = "Lexicon saved.", key: string = lexicon.key, overwrite: boolean = true) => {
		// Save original key
		const firstKey = lexicon.key;
		// Save 'now'
		const now = Date.now();
		if(!lexicon.title) {
			dispatch(closePopover('LexiconEllipsis'));
			return lexiconSaveError();
		} else if(!key) {
			key = uuidv4();
			dispatch(updateLexiconText("key", key));
		}
		// Dispatch to state
		dispatch(updateLexiconNumber("lastSave", now));
		dispatch(setLoadingPage("lookingForLexicons"));
		// These dispatches will NOT be ready by the time Storage loads and saves
		//  so we will need to do some creative variable work
		Storage.get({ key: "savedLexicons" }).then((result) => {
			const value = result.value;
			let saved: Map<string, LexiconObject> = new Map();
			let prepared: any[] = [];
			if(value === null) {
				// No info retrieved.
			} else {
				saved = new Map(JSON.parse(value));
			}
			// Make a shallow copy of the current lexicon
			let lex: LexiconObject = {...lexicon};
			// Use possibly-new key
			lex.key = key;
			// Use 'now'
			lex.lastSave = now;
			// Deep copy lex.lexicon
			lex.lexicon = lex.lexicon.map((lx: Lexicon) => {
				let x = {...lx};
				x.columns = [...lx.columns];
				return x;
			});
			// Deep copy column info
			lex.columnOrder = [...lex.columnOrder];
			lex.columnTitles = [...lex.columnTitles];
			lex.columnSizes = [...lex.columnSizes];
			lex.sort = [...lex.sort];
			// If we're overwriting, and it's a new key, delete the old one
			if(overwrite && key !== firstKey) {
				saved.delete(firstKey);
			}
			// Save lexicon copy
			saved.set(key, lex);
			// Convert back to Array
			saved.forEach((lexx: LexiconObject, keyy: string) => prepared.push([keyy, lexx]));
			// Save to disk
			Storage.set({ key: "savedLexicons", value: JSON.stringify(prepared) }).then(() => {
				dispatch(setLoadingPage(false));
				fireSwal({
					title: announce,
					toast: true,
					timer: 2500,
					timerProgressBar: true,
					showConfirmButton: false
				});
			});
		});
		dispatch(closePopover('LexiconEllipsis'));
	};
	const saveLexiconNew = () => {
		if(!lexicon.title) {
			dispatch(closePopover('LexiconEllipsis'));
			return lexiconSaveError();
		}
		let key = uuidv4();
		dispatch(updateLexiconText("key", key));
		saveLexicon("Lexicon saved as new lexicon!", key, false);
	};
	const lexiconSaveError = () => {
		fireSwal({
			title: "Error",
			text: "You must input a title before saving.",
			icon: 'warning'
		});
	};
	const toggleHorizontalScroll = () => {
		dispatch(closePopover('LexiconEllipsis'));
		dispatch(toggleLexiconHorizontalScroll());
	};
	const copyText = () => {
		const info = $i("revealFullElement");
		navigator.clipboard.writeText(info.textContent);
		info.textContent = "Copied to clipboard";
		clearTimeout(Number(info.dataset.timer));
		info.dataset.timer = String(setTimeout(() => info.classList.add("hide"), 1000));
	};
	const maybeExpand = (e: any) => {
		const span = e.target;
		if(span.matches('.lexItem') && span.clientWidth < span.scrollWidth) {
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
					console.log("too wide");
				} else {
					style.push(["left", amount]);
					console.log("wide enough");
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
			<EditLexiconItemModal />
			<EditLexiconOrderModal />
			<LoadLexiconModal />
			<DeleteLexiconModal />
			<IonLoading
	        	cssClass='loadingPage'
    	    	isOpen={modalState.loadingPage === "lookingForLexicons"}
    		    onDidDismiss={() => dispatch(setLoadingPage(false))}
	        	message={'Please wait...'}
				spinner="bubbles"
				duration={300000}
			/>
			<IonHeader>
				<IonToolbar>
					<IonButtons slot="start">
						<IonMenuButton />
					</IonButtons>
					<IonTitle>Lexicon</IonTitle>
					<IonPopover
						event={popstate}
						isOpen={popstate !== undefined}
						onDidDismiss={() => dispatch(closePopover('LexiconEllipsis'))}
					>
						<IonList>
							<IonItem button={true} onClick={() => clearLexicon()}>
								<IonLabel>Clear Lexicon</IonLabel>
							</IonItem>
							<IonItem button={true} onClick={() => openLexiconModal("LoadLexicon")}>
								<IonLabel>Load Lexicon</IonLabel>
							</IonItem>
							<IonItem button={true} onClick={() => saveLexicon()}>
								<IonLabel>Save Lexicon</IonLabel>
							</IonItem>
							<IonItem button={true} onClick={() => saveLexiconNew()}>
								<IonLabel>Save Lexicon As New</IonLabel>
							</IonItem>
							<IonItem button={true} onClick={() => openLexiconModal("DeleteLexicon")}>
								<IonLabel>Delete Saved Lexicon</IonLabel>
							</IonItem>
							<IonItemDivider>
								<IonLabel>Options</IonLabel>
							</IonItemDivider>
							<IonItem button={true} onClick={() => toggleHorizontalScroll()}>
								<IonLabel>{settings.lexiconHorizontalScroll ? "Disable" : "Allow"} Horizontal Scroll</IonLabel>
							</IonItem>
						</IonList>
					</IonPopover>
					<IonButtons slot="end">
						<IonButton onClick={(e: any) => { e.persist(); dispatch(openPopover('LexiconEllipsis', e)); }}>
							<IonIcon icon={ellipsisVertical} />
						</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen className="evenBackground" id="lexiconPage" scrollX={settings.lexiconHorizontalScroll}>
				<IonButton id="revealFullElement" fill="clear" size="small" className="hide" onClick={() => copyText()} />
				<IonList lines="none">
					<IonItem>
						<IonLabel position="stacked" style={ {fontSize: "20px"} }>Lexicon Title:</IonLabel>
						<IonInput value={lexicon.title} id="lexTitle" className="ion-margin-top" placeholder="Usually the language name." onIonBlur={() => setNewInfo("lexTitle", "title")}></IonInput>
					</IonItem>
					<IonItem>
						<IonLabel position="stacked" style={ {fontSize: "20px"} }>Description:</IonLabel>
						<IonTextarea value={lexicon.description} id="lexDesc" className="ion-margin-top" placeholder="A short description of this lexicon." rows={3} onIonBlur={() => setNewInfo("lexDesc", "description")} />
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
								<IonSelect id="lexiconSort" interface="popover" value={theSort} onIonChange={() => doSort()}>
									{theOrder.map((i: number) => {
										const title = theTitles[i];
										const which = i.toString();
										const ascdec = [0, 1];
										return ascdec.map((s: number) => {
											const arrow = [" ↓", " ↑"][s];
											const dir = s.toString();
											return (
												<IonSelectOption value={which + dir} key={which + dir}>{title + arrow}</IonSelectOption>
											);
										});
									})}
								</IonSelect>
							</IonCol>
							<IonCol size="auto">
								<IonButton color="tertiary" style={ { padding: "0.25em 0" } } onClick={() => swapColumns()}>
									<IonIcon size="small" icon={swapHorizontalOutline} />
								</IonButton>
							</IonCol>
						</IonRow>
					</IonGrid>
					<IonGrid id="theLexiconHolder">
						<IonRow>
							<IonCol id="theLexicon">
								<IonItem className="lexRow lexHeader" style={ { order: -2 } }>
									{theOrder.map((i: number) => (
										<span className={theSizes[i]} key={theTitles[i]}>{theTitles[i]}</span>
									))}
									<span className="xs"></span>
									<span className="xs ion-hide-sm-down"></span>
								</IonItem>
								<IonItem className="lexRow serifChars" style={ { order: -1 } }>
									{theOrder.map((i: number) => {
										const key = "inputLex" + i.toString();
										return (
											<IonInput id={key} key={key} className={theSizes[i]} type="text" />
										);
									})}
									<span className="xs">
										<IonButton color="success" onClick={() => addToLex()}>
											<IonIcon icon={add} style={ { margin: 0 } } />
										</IonButton>
									</span>
									<span className="xs ion-hide-sm-down"></span>
								</IonItem>
								<VirtualList
									className="virtualLex"
									width="100%"
									height={twoThirds}
									itemCount={lexicon.lexicon.length}
									itemSize={50}
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
											<IonItem key={id} className={"lexRow lexiconDisplay serifChars " + (index % 2 ? "even" : "odd")} id={id} style={ newStyle }>
												{theOrder.map((i: number) => (
													<span onClick={maybeExpand} key={key + i.toString()} className={"lexItem " + theSizes[i]}>{cols[i]}</span>
												))}
												<span className="xs">
													<IonButton style={ { margin: 0 } } color="warning" onClick={() => editInLex(key)}>
														<IonIcon icon={construct} style={ { margin: 0 } } />
													</IonButton>
												</span>
												<span className="xs ion-hide-sm-down">
													<IonButton style={ { margin: 0 } } color="danger" onClick={() => delFromLex(key)}>
														<IonIcon icon={trash} style={ { margin: 0 } } />
													</IonButton>
												</span>
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
