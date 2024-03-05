import React, { useState, FC, useCallback } from 'react';
import {
	IonItem,
	IonIcon,
	IonLabel,
	IonList,
	IonContent,
	IonPage,
	IonHeader,
	IonToolbar,
	IonMenuButton,
	IonButtons,
	IonButton,
	IonTitle,
	IonFab,
	IonFabButton,
	IonRange,
	IonItemSliding,
	IonItemOptions,
	IonItemOption,
	useIonAlert,
	useIonToast
} from '@ionic/react';
import {
	addOutline,
	helpCircleOutline,
	trash,
	trashBinOutline
} from 'ionicons/icons';
import { useSelector, useDispatch } from "react-redux";

import {
	setCharacterGroupDropoff,
	deleteCharGroupWG,
	copyCharacterGroupsFromElsewhere
} from '../../store/wgSlice';
import {
	WGCharGroupObject,
	Zero_Fifty,
	PageData,
	StateObject
} from '../../store/types';
import useTranslator from '../../store/translationHooks';

import { $q } from '../../components/DollarSignExports';
import ModalWrap from "../../components/ModalWrap";
import yesNoAlert from '../../components/yesNoAlert';
import toaster from '../../components/toaster';
import { CopyFromOtherIcon } from '../../components/icons';
import AddCharGroupModal from './modals/AddCharGroup';
import EditCharGroupModal from './modals/EditCharGroup';
import ExtraCharactersModal from '../modals/ExtraCharacters';
import { CharGroupCard } from "./WGinfo";

interface CharGroupProps {
	charGroup: WGCharGroupObject
	editCharGroup: (x: WGCharGroupObject) => void
	maybeDeleteCharGroup: (x: string, y: WGCharGroupObject) => void
}

const CharGroup: FC<CharGroupProps> = (props) => {
	const { charGroup, editCharGroup, maybeDeleteCharGroup } = props;
	const { label = "", title, run } = charGroup;
	const [ tc ] = useTranslator('common');
	return (
		<IonItemSliding>
			<IonItemOptions>
				<IonItemOption
					color="primary"
					onClick={() => editCharGroup(charGroup)}
				>
					<IonIcon slot="icon-only" src="svg/edit.svg" />
				</IonItemOption>
				<IonItemOption
					color="danger"
					onClick={() => maybeDeleteCharGroup(label, charGroup)}
					aria-label={tc("Delete")}
				>
					<IonIcon slot="icon-only" icon={trash} />
				</IonItemOption>
			</IonItemOptions>
			<IonItem>
				<IonLabel className="wrappableInnards">
					<div className="charGroupRun serifChars">
						<span
							className="label importantElement"
						>{label}</span>
						<span
							className="run"
						>{run}</span>
					</div>
					<div
						className="charGroupLongName"
					>{title}</div>
				</IonLabel>
				<IonIcon
					size="small"
					slot="end"
					src="svg/slide-indicator.svg"
				/>
			</IonItem>
		</IonItemSliding>
	);
};

const WGCharGroup = (props: PageData) => {
	const [ t ] = useTranslator('wg');
	const [ tw ] = useTranslator('wgwe');
	const [ tc ] = useTranslator('common');
	const { modalPropsMaker } = props;
	const dispatch = useDispatch();
	const [doAlert] = useIonAlert();
	const toast = useIonToast();
	const [isOpenECM, setIsOpenECM] = useState<boolean>(false);
	const [isOpenInfo, setIsOpenInfo] = useState<boolean>(false);
	const [isOpenAddCharGroup, setIsOpenAddCharGroup] = useState<boolean>(false);
	const [isOpenEditCharGroup, setIsOpenEditCharGroup] = useState<boolean>(false);
	const [editing, setEditing] = useState<WGCharGroupObject | null>(null);
	const { characterGroups, characterGroupDropoff } = useSelector((state: StateObject) => state.wg);
	const { characterGroups: weCharatcterGroups } = useSelector((state: StateObject) => state.we);
	const { disableConfirms } = useSelector((state: StateObject) => state.appSettings);
	const editCharGroup = useCallback((charGroup: WGCharGroupObject) => {
		const groups = $q<HTMLIonListElement>((".charGroups"));
		groups && groups.closeSlidingItems();
		setIsOpenEditCharGroup(true);
		setEditing(charGroup);
	}, []);
	const maybeDeleteCharGroup = useCallback((label: string, charGroup: WGCharGroupObject) => {
		const groups = $q<HTMLIonListElement>((".charGroups"));
		groups && groups.closeSlidingItems();
		const handler = () => {
			dispatch(deleteCharGroupWG(charGroup));
			toaster({
				message: tc("thingDeleted", { thing: tw("Character Group") }),
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
				header: `${label}=${charGroup.run}`,
				message: tc("Are you sure you want to delete this? This cannot be undone."),
				cssClass: "danger",
				submit: tc("confirmDelIt"),
				handler,
				doAlert
			});
		}
	}, [dispatch, tc, tw, toast, disableConfirms, doAlert]);
	const maybeClearEverything = useCallback(() => {
		const count = characterGroups.length;
		const handler = () => {
			dispatch(deleteCharGroupWG(null));
			toaster({
				message: tc("thingsDeleted", { count, things: tw("CharGroup", { count }) }),
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
				header: tc("clearThings?", { count, things: tw("CharGroup", { count }) }),
				message: tw("delAllCharGroups", { count }),
				cssClass: "warning",
				submit: tc("confirmDel", { count }),
				handler,
				doAlert
			});
		}
	}, [characterGroups.length, dispatch, tc, tw, toast, disableConfirms, doAlert]);
	const maybeCopyFromWE = useCallback(() => {
		const handler = () => {
			dispatch(copyCharacterGroupsFromElsewhere(weCharatcterGroups));
			toaster({
				message: tw("importCharGroups", { count: weCharatcterGroups.length }),
				duration: 2500,
				color: "success",
				position: "top",
				toast
			});
		};
		if(disableConfirms) {
			handler();
		} else {
			yesNoAlert({
				header: tc("ImportFrom", { source: tc("WordEvolve") }),
				message: tc("importOverwriteWarning", { thing: tw("CharGroup"), label: tw("label") }),
				cssClass: "warning",
				submit: tc("yesImport"),
				handler,
				doAlert
			});
		}
	}, [dispatch, tw, tc, doAlert, toast, disableConfirms, weCharatcterGroups]);
	const map = useCallback(
		(charGroup: WGCharGroupObject) =>
			<CharGroup
				key={`WG-CharGroup-${charGroup.label}`}
				charGroup={charGroup}
				editCharGroup={editCharGroup}
				maybeDeleteCharGroup={maybeDeleteCharGroup}
			/>,
		[editCharGroup, maybeDeleteCharGroup]
	);
	return (
		<IonPage>
			<AddCharGroupModal {...props.modalPropsMaker(isOpenAddCharGroup, setIsOpenAddCharGroup)}
				openECM={setIsOpenECM}
			/>
			<EditCharGroupModal
				{...props.modalPropsMaker(isOpenEditCharGroup, setIsOpenEditCharGroup)}
				openECM={setIsOpenECM}
				editing={editing}
				setEditing={setEditing}
			/>
			<ExtraCharactersModal {...modalPropsMaker(isOpenECM, setIsOpenECM)} />
			<ModalWrap {...modalPropsMaker(isOpenInfo, setIsOpenInfo)}>
				<CharGroupCard setIsOpenInfo={setIsOpenInfo} />
			</ModalWrap>
			<IonHeader>
				<IonToolbar>
					<IonButtons slot="start">
						<IonMenuButton />
					</IonButtons>
					<IonTitle>{tw("Character Groups")}</IonTitle>
					<IonButtons slot="end">
						{characterGroups.length > 0 ?
							<IonButton onClick={() => maybeClearEverything()} aria-label={tc("Delete")}>
								<IonIcon icon={trashBinOutline} />
							</IonButton>
						:
							<></>
						}
						{weCharatcterGroups.length > 0 ?
							<IonButton onClick={() => maybeCopyFromWE()} aria-label={tc("Copy")}>
								<CopyFromOtherIcon />
							</IonButton>
						:
							<></>
						}
						<IonButton onClick={() => setIsOpenInfo(true)} aria-label={tc("Help")}>
							<IonIcon icon={helpCircleOutline} />
						</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen className="hasFabButton">
				<IonList className="charGroups units" lines="none">
					<IonItem className="nonUnit">
						<IonLabel className="wrappableInnards belongsToBelow">
							<div><strong>{t("dropoff rate", { context: "formal" })}</strong></div>
							<div className="minor ion-text-wrap">{t("characterDropoffExplanation")}</div>
						</IonLabel>
					</IonItem>
					<IonItem>
						<IonRange
							min={0}
							max={50}
							value={characterGroupDropoff}
							pin={true}
							onIonChange={(e) => dispatch(setCharacterGroupDropoff(e.target.value as Zero_Fifty))}
						>
							<IonIcon size="small" slot="start" src="svg/flatAngle.svg" />
							<IonIcon size="small" slot="end" src="svg/steepAngle.svg" />
						</IonRange>
					</IonItem>
					{characterGroups.map(map)}
				</IonList>
				<IonFab vertical="bottom" horizontal="end" slot="fixed">
					<IonFabButton
						color="secondary"
						title={tc("Add New")}
						onClick={() => setIsOpenAddCharGroup(true)}
					>
						<IonIcon icon={addOutline} />
					</IonFabButton>
				</IonFab>
			</IonContent>
		</IonPage>
	);
};

export default WGCharGroup;
