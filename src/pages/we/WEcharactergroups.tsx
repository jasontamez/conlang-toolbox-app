import React, { useState } from 'react';
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
	trashBinOutline,
	copyOutline
} from 'ionicons/icons';
import { useSelector, useDispatch } from "react-redux";

import { PageData, StateObject, WECharGroupObject } from '../../store/types';
import { copyCharacterGroupsFromElsewhere, deleteCharacterGroupWE } from '../../store/weSlice';

import ModalWrap from "../../components/ModalWrap";
import { $q } from '../../components/DollarSignExports';
import yesNoAlert from '../../components/yesNoAlert';
import toaster from '../../components/toaster';
import AddCharGroupWEModal from './modals/AddCharGroupWE';
import EditCharGroupWEModal from './modals/EditCharGroupWE';
import ExtraCharactersModal from '../modals/ExtraCharacters';
import { CharGroupCard } from "./WEinfo";

const WECharGroup = (props: PageData) => {
	const { modalPropsMaker } = props;
	const dispatch = useDispatch();
	const [isOpenECM, setIsOpenECM] = useState<boolean>(false);
	const [isOpenInfo, setIsOpenInfo] = useState<boolean>(false);
	const [isOpenAddCharGroupWE, setIsOpenAddCharGroupWE] = useState<boolean>(false);
	const [isOpenEditCharGroupWE, setIsOpenEditCharGroupWE] = useState<boolean>(false);
	const [editing, setEditing] = useState<WECharGroupObject | null>(null);
	const [doAlert] = useIonAlert();
	const [doToast, undoToast] = useIonToast();
	const { characterGroups } = useSelector((state: StateObject) => state.we);
	const { characterGroups: wgCharatcterGroups } = useSelector((state: StateObject) => state.wg);
	const { disableConfirms } = useSelector((state: StateObject) => state.appSettings);
	const editCharGroup = (group: WECharGroupObject) => {
		$q(".charGroups").closeSlidingItems();
		setEditing(group);
		setIsOpenEditCharGroupWE(true);
	};
	const maybeDeleteCharGroup = (label: string, charGroup: WECharGroupObject) => {
		$q(".charGroups").closeSlidingItems();
		const { run } = charGroup;
		const handler = () => {
			dispatch(deleteCharacterGroupWE({...charGroup, label}));
			toaster({
				message: "Character Group deleted.",
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
				header: `${label}=${run}`,
				message: "Are you sure? This cannot be undone.",
				cssClass: "danger",
				submit: "Yes, delete it",
				handler,
				doAlert
			});
		}
	};
	const maybeClearEverything = () => {
		const handler = () => {
			dispatch(deleteCharacterGroupWE(null));
			toaster({
				message: "Character Groups have been deleted.",
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
				header: "Clear Character Groups?",
				message: "This will delete all current character groups, and cannot be undone.",
				cssClass: "warning",
				submit: "Yes, Delete Them",
				handler,
				doAlert
			});
		}
	};
	const maybeCopyFromWG = () => {
		const handler = () => {
			dispatch(copyCharacterGroupsFromElsewhere(wgCharatcterGroups));
			toaster({
				message: `${wgCharatcterGroups.length} Character Groups imported.`,
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
				header: "Import from WordGen?",
				message: "If any current Group has the same label as an incoming Group, "
					+ "the current Group will be overwritten. Do you want to continue?",
				cssClass: "warning",
				submit: "Yes, Import",
				handler,
				doAlert
			});
		}
	};
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
					<IonTitle>Character Groups</IonTitle>
					<IonButtons slot="end">
						{characterGroups.length > 0 ?
							<IonButton onClick={() => maybeClearEverything()}>
								<IonIcon icon={trashBinOutline} />
							</IonButton>
						:
							<></>
						}
						{wgCharatcterGroups.length > 0 ?
							<IonButton onClick={() => maybeCopyFromWG()}>
								<IonIcon icon={copyOutline} />
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
					{characterGroups.map((charGroup: WECharGroupObject) => {
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
					})}
				</IonList>
				<IonFab vertical="bottom" horizontal="end" slot="fixed">
					<IonFabButton
						color="secondary"
						title="Add new group"
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
