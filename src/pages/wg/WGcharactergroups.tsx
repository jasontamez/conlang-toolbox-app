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
	useIonViewDidEnter,
	useIonAlert,
	useIonToast
} from '@ionic/react';
import {
	addOutline,
	helpCircleOutline,
	trash,
	globeOutline
} from 'ionicons/icons';
import { shallowEqual, useSelector, useDispatch } from "react-redux";

import {
	startEditCharGroupWG,
	deleteCharGroupWG,
	changeView,
	setCharGroupDropoffWG
} from '../../components/ReduxDucksFuncs';
import { PageData, WGCharGroupMap, Zero_Fifty } from '../../components/ReduxDucksTypes';
import { $q } from '../../components/DollarSignExports';
import ModalWrap from "../../components/ModalWrap";
import AddCharGroupModal from './M-AddCharGroup';
import EditCharGroupModal from './M-EditCharGroup';
import ExtraCharactersModal from '../M-ExtraCharacters';
import { CharGroupCard } from "./WGCards";
import yesNoAlert from '../../components/yesNoAlert';
import toaster from '../../components/toaster';

const WGCharGroup = (props: PageData) => {
	const { modalPropsMaker } = props;
	const dispatch = useDispatch();
	const [doAlert] = useIonAlert();
	const [doToast, undoToast] = useIonToast();
	const [isOpenECM, setIsOpenECM] = useState<boolean>(false);
	const [isOpenInfo, setIsOpenInfo] = useState<boolean>(false);
	const [isOpenAddCharGroup, setIsOpenAddCharGroup] = useState<boolean>(false);
	const [isOpenEditCharGroup, setIsOpenEditCharGroup] = useState<boolean>(false);
	const viewInfo = ['wg', 'charGroups'];
	useIonViewDidEnter(() => {
		dispatch(changeView(viewInfo));
	});
	const [charGroupObject, settings, settingsWG] = useSelector((state: any) => [state.wordgenCharGroups, state.appSettings, state.wordgenSettings], shallowEqual);
	var charGroups: WGCharGroupMap[] = charGroupObject.map;
	const editCharGroup = (label: any) => {
		$q(".charGroups").closeSlidingItems();
		dispatch(startEditCharGroupWG(label));
		setIsOpenEditCharGroup(true);
	};
	const maybeDeleteCharGroup = (label: any) => {
		$q(".charGroups").closeSlidingItems();
		const handler = () => {
			dispatch(deleteCharGroupWG(label));
			toaster({
				message: "Character Group deleted.",
				duration: 2500,
				color: "danger",
				doToast,
				undoToast
			});
		};
		if(settings.disableConfirms) {
			handler();
		} else {
			yesNoAlert({
				header: `Delete "${label}"?`,
				message: "Are you sure? This cannot be undone.",
				cssClass: "danger",
				submit: "Yes, delete it",
				handler,
				doAlert
			});
		}
	};
	return (
		<IonPage>
			<AddCharGroupModal {...props.modalPropsMaker(isOpenAddCharGroup, setIsOpenAddCharGroup)} openECM={setIsOpenECM} />
			<EditCharGroupModal {...props.modalPropsMaker(isOpenEditCharGroup, setIsOpenEditCharGroup)} openECM={setIsOpenECM} />
			<ExtraCharactersModal {...modalPropsMaker(isOpenECM, setIsOpenECM)} />
			<ModalWrap {...modalPropsMaker(isOpenInfo, setIsOpenInfo)}><CharGroupCard /></ModalWrap>
			<IonHeader>
				<IonToolbar>
					<IonButtons slot="start">
						<IonMenuButton />
					</IonButtons>
					<IonTitle>Character Groups</IonTitle>
					<IonButtons slot="end">
						<IonButton onClick={() => setIsOpenECM(true)}>
							<IonIcon icon={globeOutline} />
						</IonButton>
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
							<div className="minor">Characters at the beginning of a group tend to be picked more often than characters at the end of the group. This slider controls this tendency. A rate of zero is flat, making all characters equiprobable.</div>
						</IonLabel>
					</IonItem>
					<IonItem>
						<IonRange min={0} max={50} value={settingsWG.charGroupRunDropoff} pin={true} onIonChange={(e) => dispatch(setCharGroupDropoffWG(e.target.value as Zero_Fifty))}>
							<IonIcon size="small" slot="start" src="svg/flatAngle.svg" />
							<IonIcon size="small" slot="end" src="svg/steepAngle.svg" />
						</IonRange>
					</IonItem>
					{charGroups.map((item: WGCharGroupMap) => {
						const [label, charGroup] = item;
						return (
							<IonItemSliding key={label}>
								<IonItemOptions>
									<IonItemOption color="primary" onClick={() => editCharGroup(label)}>
										<IonIcon slot="icon-only" src="svg/edit.svg" />
									</IonItemOption>
									<IonItemOption color="danger" onClick={() => maybeDeleteCharGroup(label)}>
										<IonIcon slot="icon-only" icon={trash} />
									</IonItemOption>
								</IonItemOptions>
								<IonItem>
									<IonLabel className="wrappableInnards">
										<div className="charGroupRun serifChars">
											<span className="label importantElement">{label}</span>
											<span className="run">{charGroup.run}</span>
										</div>
										<div className="charGroupLongName">{charGroup.title}</div>
									</IonLabel>
									<IonIcon size="small" slot="end" src="svg/slide-indicator.svg" />
								</IonItem>
							</IonItemSliding>
						);
					})}
				</IonList>
				<IonFab vertical="bottom" horizontal="end" slot="fixed">
					<IonFabButton color="secondary" title="Add new character group" onClick={() => setIsOpenAddCharGroup(true)}>
						<IonIcon icon={addOutline} />
					</IonFabButton>
				</IonFab>
			</IonContent>
		</IonPage>
	);
};

export default WGCharGroup;
