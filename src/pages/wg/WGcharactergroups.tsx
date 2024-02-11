import React, { useState } from 'react';
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

import { $q } from '../../components/DollarSignExports';
import ModalWrap from "../../components/ModalWrap";
import yesNoAlert from '../../components/yesNoAlert';
import toaster from '../../components/toaster';
import { CopyFromOtherIcon } from '../../components/icons';
import AddCharGroupModal from './modals/AddCharGroup';
import EditCharGroupModal from './modals/EditCharGroup';
import ExtraCharactersModal from '../modals/ExtraCharacters';
import { CharGroupCard } from "./WGinfo";

const WGCharGroup = (props: PageData) => {
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
	const editCharGroup = (charGroup: WGCharGroupObject) => {
		const groups = $q<HTMLIonListElement>((".charGroups"));
		groups && groups.closeSlidingItems();
		setIsOpenEditCharGroup(true);
		setEditing(charGroup);
	};
	const maybeDeleteCharGroup = (charGroup: WGCharGroupObject) => {
		const groups = $q<HTMLIonListElement>((".charGroups"));
		groups && groups.closeSlidingItems();
		const handler = () => {
			dispatch(deleteCharGroupWG(charGroup));
			toaster({
				message: "Character Group deleted.",
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
				header: `${charGroup.label}=${charGroup.run}`,
				message: "Are you sure you want to delete this Character Group? This cannot be undone.",
				cssClass: "danger",
				submit: "Yes, Delete It",
				handler,
				doAlert
			});
		}
	};
	const maybeClearEverything = () => {
		const handler = () => {
			dispatch(deleteCharGroupWG(null));
			toaster({
				message: "Character Groups deleted.",
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
				header: "Clear All Character Groups?",
				message: "This will delete all current character groups, and cannot be undone.",
				cssClass: "warning",
				submit: "Yes, Delete Them",
				handler,
				doAlert
			});
		}
	};
	const maybeCopyFromWE = () => {
		const handler = () => {
			dispatch(copyCharacterGroupsFromElsewhere(weCharatcterGroups));
			toaster({
				message: `${weCharatcterGroups.length} Character Groups imported.`,
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
				header: "Import from WordEvolve?",
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
					<IonTitle>Character Groups</IonTitle>
					<IonButtons slot="end">
						{characterGroups.length > 0 ?
							<IonButton onClick={() => maybeClearEverything()}>
								<IonIcon icon={trashBinOutline} />
							</IonButton>
						:
							<></>
						}
						{weCharatcterGroups.length > 0 ?
							<IonButton onClick={() => maybeCopyFromWE()}>
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
					<IonItem className="nonUnit">
						<IonLabel className="wrappableInnards belongsToBelow">
							<div><strong>Dropoff Rate</strong></div>
							<div className="minor ion-text-wrap">Characters at the beginning of a group tend to be picked more often than characters at the end of the group. This slider controls this tendency. A rate of zero is flat, making all characters equiprobable.</div>
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
					{characterGroups.map((charGroup: WGCharGroupObject) => {
						const { run, title, dropoffOverride, label } = charGroup;
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
										onClick={() => maybeDeleteCharGroup(charGroup)}
									>
										<IonIcon slot="icon-only" icon={trash} />
									</IonItemOption>
								</IonItemOptions>
								<IonItem>
									<IonLabel className="wrappableInnards">
										<div className="charGroupRun serifChars">
											<span className="label importantElement">{label}</span>
											<span className="run">{run}</span>
										</div>
										<div className="charGroupLongName">{title}</div>
									</IonLabel>
									{dropoffOverride === undefined ? <></> : (
										<div slot="end" className="dropoff">{dropoffOverride}%</div>
									)}
									<IonIcon size="small" slot="end" src="svg/slide-indicator.svg" />
								</IonItem>
							</IonItemSliding>
						);
					})}
				</IonList>
				<IonFab vertical="bottom" horizontal="end" slot="fixed">
					<IonFabButton
						color="secondary"
						title="Add new character group"
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
