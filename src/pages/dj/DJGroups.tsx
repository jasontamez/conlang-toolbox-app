import React, { useCallback, useState } from 'react';
import {
	IonContent,
	IonPage,
	IonHeader,
	IonToolbar,
	IonMenuButton,
	IonButtons,
	IonFab,
	IonFabButton,
	IonButton,
	IonTitle,
	IonIcon,
	IonList,
	IonItem,
	IonLabel,
	IonItemSliding,
	IonItemOptions,
	IonItemOption,
	useIonAlert,
	useIonToast,
	IonReorderGroup,
	IonReorder,
	ItemReorderCustomEvent
} from '@ionic/react';
import {
	addOutline,
	trash,
	globeOutline,
	trashBinOutline,
	caretDown,
	reorderThree,
	swapVerticalOutline,
	checkmarkDoneOutline
} from 'ionicons/icons';
import { useSelector, useDispatch } from "react-redux";

import { DJGroup, Declenjugation, PageData, StateObject } from '../../store/types';
import { deleteGroup, reorderGroups } from '../../store/declenjugatorSlice';

import { $q } from '../../components/DollarSignExports';
import ltr from '../../components/LTR';
import yesNoAlert from '../../components/yesNoAlert';
import toaster from '../../components/toaster';

import ExtraCharactersModal from '../modals/ExtraCharacters';
import AddGroup from './modals/AddGroup';
import AddDeclenjugation from './modals/AddDeclenjugation';
import EditGroup from './modals/EditGroup';
import EditDeclenjugation from './modals/EditDeclenjugation';
import CaseMaker from './modals/CaseMaker';

function makeDeclenjugationDesc (group: DJGroup) {
	const { startsWith, endsWith, regex, separator } = group;
	if(regex) {
		const [match, replace] = regex;
		return `/${match}/ => ${replace}`;
	}
	const total = startsWith.map(line => line + "-").concat(endsWith.map(line => "-" + line));
	return total.join(separator);
}

const DJGroups = (props: PageData) => {
	const { modalPropsMaker } = props;
	const dispatch = useDispatch();

	const [toggles, setToggles] = useState<{[key: string]: boolean}>({});
	const [reordering, setReordering] = useState<boolean>(false);
	const [tempGroups, setTempGroups] = useState<DJGroup[]>([])

	// main modals
	const [isOpenAddGroup, setIsOpenAddGroup] = useState<boolean>(false);
	const [isOpenEditGroup, setIsOpenEditGroup] = useState<boolean>(false);
	const [isOpenECM, setIsOpenECM] = useState<boolean>(false);
	const [editingGroup, setEditingGroup] = useState<DJGroup | null>(null);
	// submodal: add declenjugation
	const [addDeclenjugationOpen, setAddDeclenjugationOpen] = useState<boolean>(false);
	const [savedDeclenjugation, setSavedDeclenjugation] = useState<Declenjugation | null>(null);
	// submodal: edit declenjugation
	const [editDeclenjugationOpen, setEditDeclenjugationOpen] = useState<boolean>(false);
	const [incomingDeclenjugation, setIncomingDeclenjugation] = useState<Declenjugation | null>(null);
	const [outgoingDeclenjugation, setOutgoingDeclenjugation] = useState<Declenjugation | null | string>(null);
	// submodal: add declenjugation
	const [caseMakerOpen, setCaseMakerOpen] = useState<boolean>(false);
	const [savedTitle, setSavedTitle] = useState<string>("");

	const [doAlert] = useIonAlert();
	const [doToast, undoToast] = useIonToast();
	const { declenjugationGroups } = useSelector((state: StateObject) => state.dj);
	const { disableConfirms } = useSelector((state: StateObject) => state.appSettings);

	const addDeclenjugationModalInfo = modalPropsMaker(addDeclenjugationOpen, setAddDeclenjugationOpen);
	const editDeclenjugationModalInfo = modalPropsMaker(editDeclenjugationOpen, setEditDeclenjugationOpen);
	const caseMakerModalInfo = modalPropsMaker(caseMakerOpen, setCaseMakerOpen);

	const editGroup = (group: DJGroup) => {
		$q(".djGroups").closeSlidingItems();
		setEditingGroup(group);
		setIsOpenEditGroup(true);
	};
	const maybeDeleteGroup = (group: DJGroup) => {
		$q(".djGroups").closeSlidingItems();
		const handler = () => {
			dispatch(deleteGroup(group.id));
			toaster({
				message: "Group deleted.",
				position: "middle",
				color: "danger",
				duration: 2000,
				doToast,
				undoToast
			});
		};
		if(!disableConfirms) {
			return yesNoAlert({
				header: "Delete Entire Group",
				message: "Are you sure you want to delete this entire Group? It cannot be undone.",
				cssClass: "danger",
				submit: "Yes, Delete",
				handler,
				doAlert
			});
		}
		handler();
	};
	const maybeClearEverything = () => {
		const handler = () => {
			dispatch(deleteGroup(null));
			toaster({
				message: "Groups deleted.",
				duration: 2500,
				color: "danger",
				position: "top",
				doToast,
				undoToast
			});
		};
		if(disableConfirms) {
			handler();
		} else {
			yesNoAlert({
				header: "Clear All Groups?",
				message: "This will delete all current groups, and it cannot be undone.",
				cssClass: "warning",
				submit: "Yes, Delete Them",
				handler,
				doAlert
			});
		}
	};
	const doToggle = useCallback((id: string) => {
		const newToggles = {...toggles};
		newToggles[id] = !newToggles[id];
		setToggles(newToggles);
	}, [toggles]);

	const doReorder = (event: ItemReorderCustomEvent) => {
		const ed = event.detail;
		// move things around
		const { from, to } = ed;
		const moved = tempGroups[from];
		const remains = tempGroups.slice(0, from).concat(tempGroups.slice(from + 1));
		const final = remains.slice(0, to).concat(moved, remains.slice(to));
		// save result
		setTempGroups(final);
		ed.complete();
	};

	const toggleReorder = () => {
		if(!reordering) {
			$q(".djGroups").closeSlidingItems();
			setTempGroups(declenjugationGroups);
		} else {
			dispatch(reorderGroups(tempGroups));
		}
		setReordering(!reordering);
	};

	return (
		<IonPage>
			<AddGroup
				{...modalPropsMaker(isOpenAddGroup, setIsOpenAddGroup)}
				openECM={setIsOpenECM}

				caseMakerModalInfo={caseMakerModalInfo}
				savedTitle={savedTitle}

				addDeclenjugationModalInfo={addDeclenjugationModalInfo}
				savedDeclenjugation={savedDeclenjugation}
				setSavedDeclenjugation={setSavedDeclenjugation}

				editDeclenjugationModalInfo={editDeclenjugationModalInfo}
				setIncomingDeclenjugation={setIncomingDeclenjugation}
				outgoingDeclenjugation={outgoingDeclenjugation}
				setOutgoingDeclenjugation={setOutgoingDeclenjugation}
			/>
			<EditGroup
				{...modalPropsMaker(isOpenEditGroup, setIsOpenEditGroup)}
				openECM={setIsOpenECM}

				editingGroup={editingGroup}

				caseMakerModalInfo={caseMakerModalInfo}
				savedTitle={savedTitle}

				addDeclenjugationModalInfo={addDeclenjugationModalInfo}
				savedDeclenjugation={savedDeclenjugation}
				setSavedDeclenjugation={setSavedDeclenjugation}

				editDeclenjugationModalInfo={editDeclenjugationModalInfo}
				setIncomingDeclenjugation={setIncomingDeclenjugation}
				outgoingDeclenjugation={outgoingDeclenjugation}
				setOutgoingDeclenjugation={setOutgoingDeclenjugation}
			/>

			<AddDeclenjugation
				{...addDeclenjugationModalInfo}
				openECM={setIsOpenECM}
				setSavedDeclenjugation={setSavedDeclenjugation}
				caseMakerModalInfo={caseMakerModalInfo}
				savedTitle={savedTitle}
				setSavedTitle={setSavedTitle}
			/>
			<EditDeclenjugation
				{...editDeclenjugationModalInfo}
				openECM={setIsOpenECM}
				incomingDeclenjugation={incomingDeclenjugation}
				setOutgoingDeclenjugation={setOutgoingDeclenjugation}
				caseMakerModalInfo={caseMakerModalInfo}
				savedTitle={savedTitle}
				setSavedTitle={setSavedTitle}
			/>
			<CaseMaker
				{...caseMakerModalInfo}
				openECM={setIsOpenECM}
				setSavedTitle={setSavedTitle}
			/>

			<ExtraCharactersModal {...modalPropsMaker(isOpenECM, setIsOpenECM)} />
			<IonHeader>
				<IonToolbar>
					<IonButtons slot="start">
						<IonMenuButton />
					</IonButtons>
					<IonTitle>Groups</IonTitle>
					<IonButtons slot="end">
						{declenjugationGroups.length > 0 ?
							<IonButton onClick={() => maybeClearEverything()}>
								<IonIcon icon={trashBinOutline} />
							</IonButton>
						:
							<></>
						}
						<IonButton onClick={() => setIsOpenECM(true)}>
							<IonIcon icon={globeOutline} />
						</IonButton>
{/*						<IonButton onClick={() => setIsOpenInfo(true)}>
							<IonIcon icon={helpCircleOutline} />
						</IonButton>*/}
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen className="hasFabButton">
				<IonList className="djGroups units dragArea" lines="full">
					<IonReorderGroup
						disabled={false}
						onIonItemReorder={doReorder}
					>
						{declenjugationGroups.map((group: DJGroup, i: number) => {
							const { title, id: mainID, declenjugations } = group;
							const max = declenjugations.length - 1;
							const classID = "x" + mainID;
							return (
								<React.Fragment key={mainID}>
									<IonItemSliding className="djGroupMain" disabled={reordering}>
										<IonItemOptions>
											<IonItemOption
												color="primary"
												onClick={() => editGroup(group)}
											>
												<IonIcon slot="icon-only" src="svg/edit.svg" />
											</IonItemOption>
											<IonItemOption
												color="danger"
												onClick={() => maybeDeleteGroup(group)}
											>
												<IonIcon slot="icon-only" icon={trash} />
											</IonItemOption>
										</IonItemOptions>
										<IonItem lines={toggles[classID] ? "full" : "none"}>
											{
												reordering ?
													<IonReorder slot="start">
														<IonIcon icon={reorderThree} />
													</IonReorder>
												:
												<IonButton fill="clear" onClick={() => doToggle(classID)}>
													<IonIcon
													 	className={`djGroup-caret${toggles[classID] ? " toggled": ""}`}
														slot="icon-only"
														icon={caretDown}
													/>
												</IonButton>
											}
											<IonLabel className="wrappableInnards">
												<div><strong>{title}</strong></div>
												<div className="description"><em>{makeDeclenjugationDesc(group)}</em></div>
											</IonLabel>
											<IonIcon size="small" slot="end" src="svg/slide-indicator.svg" />
										</IonItem>
									</IonItemSliding>
									{reordering ? [] : declenjugations.map((dj, i) => {
										const { title, id, prefix, suffix, regex, useWholeWord } = dj;
										let root = <></>;
										if(regex) {
											const arrow = (ltr() ? "⟶" : "⟵");
											const [match, replace] = regex;
											root = <>/<em>{match}</em>/ {arrow} <em>{replace}</em></>;
										} else {
											let rootling = "-";
											prefix && (rootling = prefix + rootling);
											suffix && (rootling = rootling + suffix);
											root = <em>{rootling}</em>;
										}
										return (
											<IonItem
												className={`djGroupInfo${toggles[classID] ? " toggled": ""}`}
												lines={max === i ? "full" : "none"}
												key={`${mainID}/${id}`}
											>
												<div className="title"><strong>{title}</strong></div>
												<div className="description"><em>{root}</em></div>
												{
													useWholeWord ?
														<div className="ww">[W]</div>
													:
														<></>
												}
											</IonItem>
										);
									})}
								</React.Fragment>
							);
						})}
					</IonReorderGroup>
				</IonList>
				<IonFab vertical="bottom" horizontal="end" slot="fixed">
					<IonFabButton
						color="tertiary"
						title="Add new group"
						onClick={() => setIsOpenAddGroup(true)}
						disabled={reordering}
					>
						<IonIcon icon={addOutline} />
					</IonFabButton>
				</IonFab>
				<IonFab vertical="bottom" horizontal="start" slot="fixed">
					<IonFabButton
						color={reordering ? "success" : "secondary"}
						title="Reorder groups"
						onClick={() => toggleReorder()}
					>
						<IonIcon icon={reordering ? checkmarkDoneOutline : swapVerticalOutline} />
					</IonFabButton>
				</IonFab>
			</IonContent>
		</IonPage>
	);
};

export default DJGroups;

/*
function makeDescription (group: DJGroup) {
	const { usingAND, inverse, equals, startsWith, endsWith, regex, separator } = group;
	if(regex.length > 0) {
		return "(regular expressions)";
	}
	if(usingAND) {
		if(
			(equals.length > 1 || startsWith.length > 1 || endsWith.length > 1)
			|| (equals.length && (startsWith.length + endsWith.length))
			|| (equals.length + startsWith.length + endsWith.length === 0)
		) {
			return "(invalid)";
		}
		if(equals.length) {
			return (inverse ? "not " : "") + equals[0];
		}
		if(startsWidth.length) {
			if(endsWith.length) {
				return `${(inverse ? "not " : "")}${startsWith[0]}-${endsWith[0]}`;
			}
			return `${(inverse ? "not " : "")}${startsWith[0]}-`;
		}
		return `${(inverse ? "not " : "")}-${endsWith[0]}`;
	}
	const total = equals.slice().concat(
		startsWith.map(line => line + "-"),
		endsWith.map(line => "-" + line)
	);
	return `${(inverse ? "not " : "")}${total.join(separator)}`;
}
*/
