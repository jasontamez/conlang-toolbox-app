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
	IonItemOption
} from '@ionic/react';
import {
	helpCircleOutline,
	addOutline,
	trash,
	globeOutline
} from 'ionicons/icons';
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { startEditCharGroupWE, deleteCharGroupWE, changeView } from '../../components/ReduxDucksFuncs';
import { CharGroupCard } from "./WECards";
import ModalWrap from "../../components/ModalWrap";
import { PageData, WECharGroupMap } from '../../components/ReduxDucksTypes';
import AddCharGroupWEModal from './M-AddCharGroupWE';
import EditCharGroupWEModal from './M-EditCharGroupWE';
import { $q } from '../../components/DollarSignExports';
import fireSwal from '../../components/Swal';
import ExtraCharactersModal from '../M-ExtraCharacters';

const WECharGroup = (props: PageData) => {
	const { modalPropsMaker } = props;
	const dispatch = useDispatch();
	const [isOpenECM, setIsOpenECM] = useState<boolean>(false);
	const [isOpenInfo, setIsOpenInfo] = useState<boolean>(false);
	const [isOpenAddCharGroupWE, setIsOpenAddCharGroupWE] = useState<boolean>(false);
	const [isOpenEditCharGroupWE, setIsOpenEditCharGroupWE] = useState<boolean>(false);
	const viewInfo = ['we', 'charGroups'];
	useIonViewDidEnter(() => {
		dispatch(changeView(viewInfo));
	});
	const [charGroupObject, settings] = useSelector((state: any) => [state.wordevolveCharGroups, state.appSettings], shallowEqual);
	var charGroups: WECharGroupMap[] = charGroupObject.map;
	const editCharGroup = (label: any) => {
		$q(".charGroups").closeSlidingItems();
		dispatch(startEditCharGroupWE(label));
		setIsOpenEditCharGroupWE(true);
	};
	const maybeDeleteCharGroup = (label: any) => {
		$q(".charGroups").closeSlidingItems();
		const thenFunc = (result: any) => {
			if(result.isConfirmed) {
				dispatch(deleteCharGroupWE(label));
				fireSwal({
					title: "Character Group deleted",
					customClass: {popup: 'dangerToast'},
					toast: true,
					timer: 2500,
					timerProgressBar: true,
					showConfirmButton: false
				});
			}
		};
		if(settings.disableConfirms) {
			thenFunc({isConfirmed: true});
		} else {
			fireSwal({
				title: "Delete " + label + "?",
				text: "Are you sure? This cannot be undone.",
				customClass: {popup: 'deleteConfirm'},
				icon: 'warning',
				showCancelButton: true,
				confirmButtonText: "Yes, delete it."
			}).then(thenFunc);
		}
	};
	return (
		<IonPage>
			<AddCharGroupWEModal {...props.modalPropsMaker(isOpenAddCharGroupWE, setIsOpenAddCharGroupWE)} openECM={setIsOpenECM} />
			<EditCharGroupWEModal {...props.modalPropsMaker(isOpenEditCharGroupWE, setIsOpenEditCharGroupWE)} openECM={setIsOpenECM} />
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
					{charGroups.map((item: WECharGroupMap) => {
						let [label, charGroup] = item;
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
									<IonIcon size="small" slot="end" src="svg/drag-indicator.svg" />
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
