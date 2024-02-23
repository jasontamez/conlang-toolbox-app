import React, { useState, FC, useCallback } from 'react';
import {
	IonContent,
	IonPage,
	IonHeader,
	IonToolbar,
	IonMenuButton,
	IonButtons,
	IonTitle,
	IonList,
	IonItem,
	IonLabel,
	IonFab,
	IonFabButton,
	IonIcon,
	IonButton,
	IonItemSliding,
	IonItemOptions,
	IonItemOption,
	useIonAlert,
	useIonToast
} from '@ionic/react';
import {
	helpCircleOutline,
	addOutline,
	trash,
	trashBinOutline
} from 'ionicons/icons';
import { useSelector, useDispatch } from "react-redux";

import { PageData, StateObject, WECharGroupObject } from '../../store/types';
import { copyCharacterGroupsFromElsewhere, deleteCharacterGroupWE } from '../../store/weSlice';
import useTranslator from '../../store/translationHooks';

import ModalWrap from "../../components/ModalWrap";
import { $q } from '../../components/DollarSignExports';
import yesNoAlert from '../../components/yesNoAlert';
import toaster from '../../components/toaster';
import { CopyFromOtherIcon } from '../../components/icons';
import AddCharGroupWEModal from './modals/AddCharGroupWE';
import EditCharGroupWEModal from './modals/EditCharGroupWE';
import ExtraCharactersModal from '../modals/ExtraCharacters';
import { CharGroupCard } from "./WEinfo";

interface CharGroupProps {
	charGroup: WECharGroupObject
	editCharGroup: (x: WECharGroupObject) => void
	maybeDeleteCharGroup: (x: string, y: WECharGroupObject) => void
}

const CharGroup: FC<CharGroupProps> = (props) => {
	const { charGroup, editCharGroup, maybeDeleteCharGroup } = props;
	const { label = "", title, run } = charGroup;
	return (
		<IonItemSliding key={label}>
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

const WECharGroup: FC<PageData> = (props) => {
	const [ tw ] = useTranslator('wgwe');
	const [ tc ] = useTranslator('common');
	const { modalPropsMaker } = props;
	const dispatch = useDispatch();
	const [isOpenECM, setIsOpenECM] = useState<boolean>(false);
	const [isOpenInfo, setIsOpenInfo] = useState<boolean>(false);
	const [isOpenAddCharGroupWE, setIsOpenAddCharGroupWE] = useState<boolean>(false);
	const [isOpenEditCharGroupWE, setIsOpenEditCharGroupWE] = useState<boolean>(false);
	const [editing, setEditing] = useState<WECharGroupObject | null>(null);
	const [doAlert] = useIonAlert();
	const toast = useIonToast();
	const { characterGroups } = useSelector((state: StateObject) => state.we);
	const { characterGroups: wgCharatcterGroups } = useSelector((state: StateObject) => state.wg);
	const { disableConfirms } = useSelector((state: StateObject) => state.appSettings);
	const editCharGroup = useCallback((group: WECharGroupObject) => {
		const groups = $q<HTMLIonListElement>(".charGroups");
		groups && groups.closeSlidingItems();
		setEditing(group);
		setIsOpenEditCharGroupWE(true);
	}, []);
	const maybeDeleteCharGroup = useCallback((label: string, charGroup: WECharGroupObject) => {
		const groups = $q<HTMLIonListElement>(".charGroups");
		groups && groups.closeSlidingItems();
		const { run } = charGroup;
		const handler = () => {
			dispatch(deleteCharacterGroupWE({...charGroup, label}));
			toaster({
				message: tw("Character Group deleted."),
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
				header: `${label}=${run}`,
				message: tc("Are you sure you want to delete this? This cannot be undone."),
				cssClass: "danger",
				submit: tc("confirmDelIt"),
				handler,
				doAlert
			});
		}
	}, [disableConfirms, dispatch, doAlert, tc, toast, tw]);
	const maybeClearEverything = useCallback(() => {
		const count = characterGroups.length;
		const handler = () => {
			dispatch(deleteCharacterGroupWE(null));
			toaster({
				message: tc("charGroupsDel", { count }),
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
				header: tw("clearCharGroups?", { count }),
				message: tw("delAllCharGroups", { count }),
				cssClass: "warning",
				submit: tc("confirmDel", { count }),
				handler,
				doAlert
			});
		}
	}, [characterGroups.length, tw, tc, dispatch, toast, doAlert, disableConfirms]);
	const maybeCopyFromWG = useCallback(() => {
		const handler = () => {
			dispatch(copyCharacterGroupsFromElsewhere(wgCharatcterGroups));
			toaster({
				message: tw("importCharGroups", { count: wgCharatcterGroups.length }),
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
				header: tc("ImportFrom", { source: tc("WordGen") }),
				message: tc("importOverwriteWarning", { thing: tw("CharGroup"), label: tw("label") }),
				cssClass: "warning",
				submit: tc("yesImport"),
				handler,
				doAlert
			});
		}
	}, [dispatch, tw, tc, doAlert, toast, disableConfirms, wgCharatcterGroups]);
	const map = useCallback(
		(charGroup: WECharGroupObject) =>
			<CharGroup
				charGroup={charGroup}
				editCharGroup={editCharGroup}
				maybeDeleteCharGroup={maybeDeleteCharGroup}
			/>,
		[editCharGroup, maybeDeleteCharGroup]
	);
	return (
		<IonPage>
			<AddCharGroupWEModal
				{...props.modalPropsMaker(isOpenAddCharGroupWE, setIsOpenAddCharGroupWE)}
				openECM={setIsOpenECM}
			/>
			<EditCharGroupWEModal
				{...props.modalPropsMaker(isOpenEditCharGroupWE, setIsOpenEditCharGroupWE)}
				editing={editing}
				setEditing={setEditing}
				openECM={setIsOpenECM}
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
							<IonButton onClick={maybeClearEverything}>
								<IonIcon icon={trashBinOutline} />
							</IonButton>
						:
							<></>
						}
						{wgCharatcterGroups.length > 0 ?
							<IonButton onClick={maybeCopyFromWG}>
								<CopyFromOtherIcon />
							</IonButton>
						:
							<></>
						}
						<IonButton onClick={() => setIsOpenInfo(true)}>
							<IonIcon icon={helpCircleOutline} />
						</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen className="hasFabButton">
				<IonList className="charGroups units" lines="none">
					{characterGroups.map(map)}
				</IonList>
				<IonFab vertical="bottom" horizontal="end" slot="fixed">
					<IonFabButton
						color="secondary"
						title={tc("Add New")}
						onClick={() => setIsOpenAddCharGroupWE(true)}
					>
						<IonIcon icon={addOutline} />
					</IonFabButton>
				</IonFab>
			</IonContent>
		</IonPage>
	);
};

export default WECharGroup;
