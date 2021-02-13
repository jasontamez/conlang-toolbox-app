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
	swapHorizontalOutline
} from 'ionicons/icons';
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import {
	openPopover,
	closePopover,
	openModal,
	updateLexiconText,
	updateLexiconNumber,
	startEditLexiconItem,
	deleteLexiconItem,
	addLexiconItem,
	updateLexiconOrder,
	updateLexiconSort,
	updateLexicon,
	setLoadingPage,
	setTemporaryInfo,
	updateLexiconBool,
	toggleLexiconHorizontalScroll
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

const Lex = () => {
	const dispatch = useDispatch();
	const state = useSelector((state: any) => state, shallowEqual);
	const settings = state.appSettings;
	const modalState = state.modalState;
	const popstate = modalState.LexiconEllipsis;
	const lexicon = state.lexicon;
	const setNewInfo = (id: string, prop: "description" | "title") => {
		const el = $i(id);
		const value = el.value.trim();
		dispatch(updateLexiconText(prop, value));
	};
	const theOrder = lexicon.columnOrder;
	const theTitles = lexicon.columnTitles;
	const theSizes = lexicon.columnSizes;
	const theSort = lexicon.sort.map((n: number) => n.toString()).join("");
	const internalSort = (col: number, dir: number) => {
		let newLex: Lexicon[] = [...lexicon.lexicon];
		newLex.sort((a, b) => {
			let x = a.columns[col];
			let y: string;
			if(dir) {
				y = x;
				x = b.columns[col];
			} else {
				y = b.columns[col];
			}
			return x.localeCompare(y, 'en', {numeric: true, usage: 'sort'});
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
	const checkIfSorted = () => {
		if(!lexicon.sorted) {
			let [col, dir] = lexicon.sort;
			internalSort(col, dir);
		}
		return false;
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
		dispatch(addLexiconItem(newWord));
		let [col, dir] = lexicon.sort;
		internalSort(col, dir);
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
								<h1>Words</h1>
							</IonCol>
							<IonCol size="auto">
								<IonSelect id="lexiconSort" interface="popover" value={theSort} onIonChange={() => doSort()}>
									{theOrder.map((i: number) => {
										const title = theTitles[i];
										const which = i.toString();
										const ascdec = [0, 1];
										return ascdec.map((s: number) => {
											const arrow = [" 🠗", " 🠕"][s];
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
					<div id="theLexicon">
						<IonItem className="lexRow lexHeader" style={ { order: -2 } }>
							{theOrder.map((i: number) => (
								<span className={theSizes[i]} key={theTitles[i]}>{theTitles[i]}</span>
							))}
							<span className="lexiconEdit xs"></span>
							<span className="lexiconDel xs ion-hide-sm-down"></span>
						</IonItem>
						<IonItem className="lexRow serifChars" style={ { order: -1 } }>
							{theOrder.map((i: number) => {
								const key = "inputLex" + i.toString();
								return (
									<IonInput id={key} key={key} className={theSizes[i]} type="text" />
								);
							})}
							<IonButton className="lexiconAdd xs" color="success" onClick={() => addToLex()}>
								<IonIcon icon={add} style={ { margin: 0 } } />
							</IonButton>
							<span className="lexiconDel xs ion-hide-sm-down"></span>
						</IonItem>
						{checkIfSorted() ? "" : ""}
						<VirtualList
							className="virtualLex"
							width="calc(100% - 2.25rem)"
							height={Math.ceil(useWindowHeight() / 3 * 2)}
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
									<IonItem key={id} className={"lexRow lexiconDisplay serifChars" + (index % 2 ? " even" : "")} id={id} style={ newStyle }>
										{theOrder.map((i: number) => (
											<span key={key + i.toString()} className={theSizes[i]}>{cols[i]}</span>
										))}
										<span className="lexiconEdit xs">
											<IonButton style={ { margin: 0 } } color="warning" onClick={() => editInLex(key)}>
												<IonIcon icon={construct} style={ { margin: 0 } } />
											</IonButton>
										</span>
										<span className="lexiconDel xs ion-hide-sm-down">
											<IonButton style={ { margin: 0 } } color="danger" onClick={() => delFromLex(key)}>
												<IonIcon icon={trash} style={ { margin: 0 } } />
											</IonButton>
										</span>
									</IonItem>
								);
							}}
  						/>
					</div>
				</IonList>
			</IonContent>
		</IonPage>
	);
};
 
export default Lex;
