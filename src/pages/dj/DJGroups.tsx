import React, { memo, useCallback, useMemo, useState } from 'react';
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
	IonItemDivider,
	IonLoading
} from '@ionic/react';
import {
	addOutline,
	trash,
	trashBinOutline,
	caretDown,
	reorderThree,
	helpCircleOutline,
	saveOutline
} from 'ionicons/icons';
import { useSelector, useDispatch } from "react-redux";

import { DJCustomInfo, DJGroup, Declenjugation, PageData, StateObject } from '../../store/types';
import { deleteGroup, reorderGroups } from '../../store/declenjugatorSlice';

import { $q } from '../../components/DollarSignExports';
import ltr from '../../components/LTR';
import yesNoAlert from '../../components/yesNoAlert';
import toaster from '../../components/toaster';
import log from '../../components/Logging';
import { DeclenjugatorStorage } from '../../components/PersistentInfo';

import ManageCustomInfo from './modals/CustomInfoDJ';
import ExtraCharactersModal from '../modals/ExtraCharacters';
import AddGroup from './modals/AddGroup';
import AddDeclenjugation from './modals/AddDeclenjugation';
import EditGroup from './modals/EditGroup';
import EditDeclenjugation from './modals/EditDeclenjugation';
import CaseMaker from './modals/CaseMaker';
import Header from '../../components/Header';
import ModalWrap from '../../components/ModalWrap';
import { GroupCard } from './DJinfo';

interface GroupingInfo {
	label: string
	groups: DJGroup[]
	type: keyof DJCustomInfo
}

interface GroupInfo {
	group: DJGroup
	type: keyof DJCustomInfo
}

interface DeclenjugationInfo {
	dj: Declenjugation
	toggled: boolean
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

	// main modals
	const [isOpenAddGroup, setIsOpenAddGroup] = useState<boolean>(false);
	const [isOpenEditGroup, setIsOpenEditGroup] = useState<boolean>(false);
	const [editingGroup, setEditingGroup] = useState<[keyof DJCustomInfo, DJGroup] | null>(null);
	const [isOpenInfo, setIsOpenInfo] = useState<boolean>(false);
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
	// other modals
	const [isOpenECM, setIsOpenECM] = useState<boolean>(false);
	const [isOpenManageCustom, setIsOpenManageCustom] = useState<boolean>(false);
	const [infoModalTitles, setInfoModalTitles] = useState<string[] | null>(null);
	const [loadingOpen, setLoadingOpen] = useState<boolean>(false);
	// all modals
	const [declenjugationTypeString, setDeclenjugationTypeString] = useState<string>("");

	const [doAlert] = useIonAlert();
	const toast = useIonToast();
	const { declensions, conjugations, other } = useSelector((state: StateObject) => state.dj);
	const { disableConfirms } = useSelector((state: StateObject) => state.appSettings);
	const canTrash = (declensions.length + conjugations.length + other.length) > 0;

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
				toast
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
	const maybeClearEverything = useCallback(() => {
		const handler = () => {
			dispatch(deleteGroup(null));
			toaster({
				message: "Groups deleted.",
				duration: 2500,
				color: "danger",
				position: "top",
				toast
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
	}, [dispatch, toast, doAlert, disableConfirms]);
	const openCustomInfoModal = useCallback(() => {
		setLoadingOpen(true);
		const titles: string[] = [];
		DeclenjugatorStorage.iterate((value, title) => {
			titles.push(title);
			return; // Blank return keeps the loop going
		}).then(() => {
			setInfoModalTitles(titles);
			setLoadingOpen(false);
			setIsOpenManageCustom(true);
		}).catch((err) => {
			log(dispatch, ["Open Custom Info Modal (dj)", err]);
		});
	}, [dispatch]);
	const headerButtons = useMemo(() => {
		const output = [
			<IonButton
				onClick={() => openCustomInfoModal()}
				key="djGroupsCustomInfoModalButton"
			>
				<IonIcon icon={saveOutline} />
			</IonButton>,
			<IonButton key="djGroupsHelpButton" onClick={() => setIsOpenInfo(true)}>
				<IonIcon icon={helpCircleOutline} />
			</IonButton>
		];
		canTrash && output.unshift(
			<IonButton key="djGroupsClearEverything" onClick={() => maybeClearEverything()}>
				<IonIcon icon={trashBinOutline} />
			</IonButton>
		);
		return output;
	}, [canTrash, maybeClearEverything, openCustomInfoModal]);


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

	const DeclenjugationInstance = memo((props: DeclenjugationInfo) => {
		const { dj, toggled } = props;
		const { title, prefix, suffix, regex, useWholeWord } = dj;
		let stem = <></>;
		if(regex) {
			const arrow = (ltr() ? "⟶" : "⟵");
			const [match, replace] = regex;
			stem = <>/<em>{match}</em>/ {arrow} <em>{replace}</em></>;
		} else {
			let rootling = "-";
			prefix && (rootling = prefix + rootling);
			suffix && (rootling = rootling + suffix);
			stem = <em>{rootling}</em>;
		}
		return (
			<IonItem
				className={`toggleable${toggled ? " toggled": ""}`}
			>
				<div className="title"><strong>{title}</strong></div>
				<div className="description"><em>{stem}</em></div>
				{
					useWholeWord ?
						<div className="ww">[W]</div>
					:
						<></>
				}
			</IonItem>
		);
	});

	const GroupInstance = memo((props: GroupInfo) => {
		const [toggled, setToggled] = useState<boolean>(false);
		const { group, type } = props;
		const { title, id: mainID, appliesTo, declenjugations } = group;
		return (
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
								onClick={() => setToggled(!toggled)}
								className={`djGroup-caret${toggled ? " toggled": ""}`}
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
						{declenjugations.map((dj) => (
							<DeclenjugationInstance
								dj={dj}
								key={`${mainID}/${dj.id}`}
								toggled={toggled}
							/>
						))}
					</IonList>
				</IonItem>
			</IonItemSliding>
		);
	});

	const Grouping = memo((props: GroupingInfo) => {
		const { groups, type, label } = props;
		if(groups.length === 0) {
			return <></>;
		}
		return (
			<>
				<IonItemDivider sticky color="secondary">{label}</IonItemDivider>
				<IonReorderGroup
					disabled={false}
					onIonItemReorder={
						(event: ItemReorderCustomEvent) => doReorder(event.detail, type)
					}
				>
					{groups.map((group: DJGroup) => (
						<GroupInstance
							key={`${group.id}`}
							group={group}
							type={type}
						/>
					))}
				</IonReorderGroup>
			</>
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

			<ManageCustomInfo
				{...modalPropsMaker(isOpenManageCustom, setIsOpenManageCustom)}
				openECM={setIsOpenECM}
				titles={infoModalTitles}
				setTitles={setInfoModalTitles}
			/>
			<ExtraCharactersModal {...modalPropsMaker(isOpenECM, setIsOpenECM)} />
			<ModalWrap {...modalPropsMaker(isOpenInfo, setIsOpenInfo)}>
				<GroupCard setIsOpenInfo={setIsOpenInfo} />
			</ModalWrap>
			<IonLoading
				cssClass='loadingPage'
				isOpen={loadingOpen}
				onDidDismiss={() => setLoadingOpen(false)}
				message={'Please wait...'}
				spinner="bubbles"
				/*duration={300000}*/
				duration={1000}
			/>
			<Header
				title="Groups"
				endButtons={headerButtons}
			/>
			<IonContent className="hasFabButton">
				<IonList className="djGroups units dragArea" lines="full">
					<Grouping groups={declensions} label="Declensions" type="declensions" />
					<Grouping groups={conjugations} label="Conjugations" type="conjugations" />
					<Grouping groups={other} label="Other" type="other" />
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
