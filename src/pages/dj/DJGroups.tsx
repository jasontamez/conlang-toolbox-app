import React, { memo, useCallback, useState } from 'react';
import {
	IonContent,
	IonPage,
	IonFab,
	IonFabButton,
	IonButton,
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
	ItemReorderCustomEvent,
	ItemReorderEventDetail,
	IonItemDivider
} from '@ionic/react';
import {
	addOutline,
	trash,
	globeOutline,
	trashBinOutline,
	caretDown,
	reorderThree
} from 'ionicons/icons';
import { useSelector, useDispatch } from "react-redux";

import { DJCustomInfo, DJGroup, Declenjugation, PageData, StateObject } from '../../store/types';
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
import Header from '../../components/Header';

interface GroupInfo {
	groups: DJGroup[]
	type: keyof DJCustomInfo
}

function makeDJGroupDescription (group: DJGroup) {
	const { startsWith, endsWith, regex, separator } = group;
	if(regex) {
		const [match, replace] = regex;
		const arrow = (ltr() ? "⟶" : "⟵");
		return `/${match}/ ${arrow} ${replace}`;
	}
	const total = startsWith.map(line => line + "-").concat(endsWith.map(line => "-" + line));
	return total.join(separator);
}

const DJGroups = (props: PageData) => {
	const { modalPropsMaker } = props;
	const dispatch = useDispatch();

	const [toggles, setToggles] = useState<{[key: string]: boolean}>({});

	// main modals
	const [isOpenAddGroup, setIsOpenAddGroup] = useState<boolean>(false);
	const [isOpenEditGroup, setIsOpenEditGroup] = useState<boolean>(false);
	const [isOpenECM, setIsOpenECM] = useState<boolean>(false);
	const [editingGroup, setEditingGroup] = useState<[keyof DJCustomInfo, DJGroup] | null>(null);
	// submodal: add declenjugation
	const [addDeclenjugationOpen, setAddDeclenjugationOpen] = useState<boolean>(false);
	const [savedDeclenjugation, setSavedDeclenjugation] = useState<Declenjugation | null>(null);
	// submodal: edit declenjugation
	const [editDeclenjugationOpen, setEditDeclenjugationOpen] = useState<boolean>(false);
	const [incomingDeclenjugation, setIncomingDeclenjugation] = useState<Declenjugation | null>(null);
	const [outgoingDeclenjugation, setOutgoingDeclenjugation] = useState<Declenjugation | null | string>(null);
	// submodal: add and edit declenjugation
	const [caseMakerOpen, setCaseMakerOpen] = useState<boolean>(false);
	const [savedTitle, setSavedTitle] = useState<string>("");
	// all modals
	const [declenjugationTypeString, setDeclenjugationTypeString] = useState<string>("");

	const [doAlert] = useIonAlert();
	const [doToast, undoToast] = useIonToast();
	const { declensions, conjugations, other } = useSelector((state: StateObject) => state.dj);
	const { disableConfirms } = useSelector((state: StateObject) => state.appSettings);

	const addDeclenjugationModalInfo = modalPropsMaker(addDeclenjugationOpen, setAddDeclenjugationOpen);
	const editDeclenjugationModalInfo = modalPropsMaker(editDeclenjugationOpen, setEditDeclenjugationOpen);
	const caseMakerModalInfo = modalPropsMaker(caseMakerOpen, setCaseMakerOpen);

	const editGroup = (type: keyof DJCustomInfo, group: DJGroup) => {
		$q(".djGroups").closeSlidingItems();
		setEditingGroup([type, group]);
		setIsOpenEditGroup(true);
	};
	const maybeDeleteGroup = (type: keyof DJCustomInfo, group: DJGroup) => {
		$q(".djGroups").closeSlidingItems();
		const handler = () => {
			dispatch(deleteGroup([type, group.id]));
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

	const doReorder = useCallback((ed: ItemReorderEventDetail, type: keyof DJCustomInfo) => {
		// move things around
		const { from, to } = ed;
		let groups: DJGroup[] = [];
		switch(type) {
			case "declensions":
				groups = declensions;
				break;
			case "conjugations":
				groups = conjugations;
				break;
			case "other":
				groups = other;
		}
		const moved = groups[from];
		const remains = groups.slice(0, from).concat(groups.slice(from + 1));
		groups = remains.slice(0, to).concat(moved, remains.slice(to));
		// save result
		dispatch(reorderGroups({type, groups}));
		ed.complete();
	}, [conjugations, declensions, other, dispatch]);

	const Grouping = memo((props: GroupInfo) => {
		const { groups, type } = props;
		return (
			<IonReorderGroup
				disabled={false}
				onIonItemReorder={
					(event: ItemReorderCustomEvent) => doReorder(event.detail, type)
				}
			>
				{groups.map((group: DJGroup, i: number) => {
					const { title, id: mainID, appliesTo, declenjugations } = group;
					const classID = "x" + mainID;
					return (
						<React.Fragment key={mainID}>
							<IonItemSliding className="djGroupMain" disabled={false}>
								<IonItemOptions>
									<IonItemOption
										color="primary"
										onClick={() => editGroup(type, group)}
									>
										<IonIcon slot="icon-only" src="svg/edit.svg" />
									</IonItemOption>
									<IonItemOption
										color="danger"
										onClick={() => maybeDeleteGroup(type, group)}
									>
										<IonIcon slot="icon-only" icon={trash} />
									</IonItemOption>
								</IonItemOptions>
								<IonItem className="innerList">
									<IonList className="hasToggles" lines="none">
										<IonItem className="wrappableInnards">
											<IonReorder slot="start">
												<IonIcon icon={reorderThree} />
											</IonReorder>
											<IonButton
												fill="clear"
												onClick={() => doToggle(classID)}
												className={`djGroup-caret${toggles[classID] ? " toggled": ""}`}
											>
												<IonIcon
													slot="icon-only"
													icon={caretDown}
												/>
											</IonButton>
											<IonLabel className="wrappableInnards">
												<div><strong>{title}</strong></div>
												<div className="description">
													<em>
														{makeDJGroupDescription(group)}{appliesTo && `; applies to ${appliesTo}`}
													</em>
												</div>
											</IonLabel>
											<IonIcon size="small" slot="end" src="svg/slide-indicator.svg" />
										</IonItem>
										{declenjugations.map((dj, i) => {
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
													className={`toggleable${toggles[classID] ? " toggled": ""}`}
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
									</IonList>
								</IonItem>
							</IonItemSliding>
						</React.Fragment>
					);
				})}
			</IonReorderGroup>
		);
	});

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
				setDeclenjugationType={setDeclenjugationTypeString}

				editDeclenjugationModalInfo={editDeclenjugationModalInfo}
				setIncomingDeclenjugation={setIncomingDeclenjugation}
				outgoingDeclenjugation={outgoingDeclenjugation}
				setOutgoingDeclenjugation={setOutgoingDeclenjugation}
			/>
			<EditGroup
				{...modalPropsMaker(isOpenEditGroup, setIsOpenEditGroup)}
				openECM={setIsOpenECM}

				editingGroupInfo={editingGroup}

				caseMakerModalInfo={caseMakerModalInfo}
				savedTitle={savedTitle}

				addDeclenjugationModalInfo={addDeclenjugationModalInfo}
				savedDeclenjugation={savedDeclenjugation}
				setSavedDeclenjugation={setSavedDeclenjugation}
				setDeclenjugationType={setDeclenjugationTypeString}

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
				typeString={declenjugationTypeString}
			/>
			<EditDeclenjugation
				{...editDeclenjugationModalInfo}
				openECM={setIsOpenECM}
				incomingDeclenjugation={incomingDeclenjugation}
				setOutgoingDeclenjugation={setOutgoingDeclenjugation}
				caseMakerModalInfo={caseMakerModalInfo}
				savedTitle={savedTitle}
				setSavedTitle={setSavedTitle}
				typeString={declenjugationTypeString}
			/>
			<CaseMaker
				{...caseMakerModalInfo}
				openECM={setIsOpenECM}
				setSavedTitle={setSavedTitle}
			/>

			<ExtraCharactersModal {...modalPropsMaker(isOpenECM, setIsOpenECM)} />
			<Header
				title="Groups"
				endButtons={[
					((declensions.length + conjugations.length + other.length) > 0 ?
							<IonButton key="djGroupsClearEverything" onClick={() => maybeClearEverything()}>
								<IonIcon icon={trashBinOutline} />
							</IonButton>
						:
							<></>
					),
					<IonButton key="djGroupsExtraChars" onClick={() => setIsOpenECM(true)}>
						<IonIcon icon={globeOutline} />
					</IonButton>,
					/*<IonButton key="djGroupsHelpButton" onClick={() => setIsOpenInfo(true)}>
						<IonIcon icon={helpCircleOutline} />
					</IonButton>*/
				]}
			/>
			<IonContent className="hasFabButton">
				<IonList className="djGroups units dragArea" lines="full">
					{declensions.length === 0 ?
						<></>
					:
						<>
							<IonItemDivider sticky color="secondary">Declensions</IonItemDivider>
							<Grouping groups={declensions} type="declensions" />
						</>
					}
					{conjugations.length === 0 ?
						<></>
					:
						<>
							<IonItemDivider sticky color="secondary">Conjugations</IonItemDivider>
							<Grouping groups={conjugations} type="conjugations" />
						</>
					}
					{other.length === 0 ?
						<></>
					:
						<>
							<IonItemDivider sticky color="secondary">Other</IonItemDivider>
							<Grouping groups={other} type="other" />
						</>
					}
				</IonList>
				<IonFab vertical="bottom" horizontal="end" slot="fixed">
					<IonFabButton
						color="primary"
						title="Add new group"
						onClick={() => setIsOpenAddGroup(true)}
					>
						<IonIcon icon={addOutline} />
					</IonFabButton>
				</IonFab>
			</IonContent>
		</IonPage>
	);
};

export default DJGroups;
