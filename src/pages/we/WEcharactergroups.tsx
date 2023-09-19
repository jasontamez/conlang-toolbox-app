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
	useIonViewDidEnter,
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
	globeOutline
} from 'ionicons/icons';
import { useSelector, useDispatch } from "react-redux";

import { PageData, WECharGroupObject } from '../../store/types';

import { deleteCharGroupWE, changeView } from '../../components/ReduxDucksFuncs';
import ModalWrap from "../../components/ModalWrap";
import { $q } from '../../components/DollarSignExports';
import yesNoAlert from '../../components/yesNoAlert';
import toaster from '../../components/toaster';
import AddCharGroupWEModal from './M-AddCharGroupWE';
import EditCharGroupWEModal from './M-EditCharGroupWE';
import ExtraCharactersModal from '../M-ExtraCharacters';
import { CharGroupCard } from "./WECards";

const WECharGroup = (props: PageData) => {
	const { modalPropsMaker } = props;
	const dispatch = useDispatch();
	const [isOpenECM, setIsOpenECM] = useState<boolean>(false);
	const [isOpenInfo, setIsOpenInfo] = useState<boolean>(false);
	const [isOpenAddCharGroupWE, setIsOpenAddCharGroupWE] = useState<boolean>(false);
	const [isOpenEditCharGroupWE, setIsOpenEditCharGroupWE] = useState<boolean>(false);
	const [editing, setEditing] = useState<WECharGroupObject | null>(null);
	const viewInfo = ['we', 'charGroups'];
	useIonViewDidEnter(() => {
		dispatch(changeView(viewInfo));
	});
	const [doAlert] = useIonAlert();
	const [doToast, undoToast] = useIonToast();
	const { characterGroups } = useSelector((state: any) => state.we);
	const { disableConfirms } = useSelector((state: any) => state.appSettings);
	const editCharGroup = (group: any) => {
		$q(".charGroups").closeSlidingItems();
		setEditing(group);
		setIsOpenEditCharGroupWE(true);
	};
	const maybeDeleteCharGroup = (label: string, charGroup: WECharGroupObject) => {
		$q(".charGroups").closeSlidingItems();
		const { run } = charGroup;
		const handler = () => {
			dispatch(deleteCharGroupWE({...charGroup, label}));
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
					{characterGroups.map((charGroup: WECharGroupObject) => {
						const { label = "", title, run } = charGroup;
						return (
							<IonItemSliding key={label}>
								<IonItemOptions>
									<IonItemOption color="primary" onClick={() => editCharGroup(charGroup)}>
										<IonIcon slot="icon-only" src="svg/edit.svg" />
									</IonItemOption>
									<IonItemOption color="danger" onClick={() => maybeDeleteCharGroup(label, charGroup)}>
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
									<IonIcon size="small" slot="end" src="svg/slide-indicator.svg" />
								</IonItem>
							</IonItemSliding>
						);
					})}
				</IonList>
				<IonFab vertical="bottom" horizontal="end" slot="fixed">
					<IonFabButton color="secondary" title="Add new group" onClick={() => setIsOpenAddCharGroupWE(true)}>
						<IonIcon icon={addOutline} />
					</IonFabButton>
				</IonFab>
			</IonContent>
		</IonPage>
	);
};

export default WECharGroup;
