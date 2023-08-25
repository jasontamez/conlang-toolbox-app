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
	useIonViewDidEnter
} from '@ionic/react';
import {
	addOutline,
	helpCircleOutline,
	construct,
	trash,
	globeOutline
} from 'ionicons/icons';
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import {
	openModal,
	startEditCategoryWG,
	deleteCategoryWG,
	changeView,
	setCategoryDropoffWG
} from '../../components/ReduxDucksFuncs';
import { PageData, WGCategoryMap, Zero_Fifty } from '../../components/ReduxDucksTypes';
import AddCategoryModal from './M-AddCategory';
import EditCategoryModal from './M-EditCategory';
import { $i, $q } from '../../components/DollarSignExports';
import fireSwal from '../../components/Swal';
import { CatCard } from "./WGCards";
import ModalWrap from "../../components/ModalWrap";
import ExtraCharactersModal from '../M-ExtraCharacters';

const WGCat = (props: PageData) => {
	const { modalPropsMaker } = props;
	const dispatch = useDispatch();
	const [isOpenECM, setIsOpenECM] = useState<boolean>(false);
	const [isOpenInfo, setIsOpenInfo] = useState<boolean>(false);
	const viewInfo = ['wg', 'categories'];
	useIonViewDidEnter(() => {
		dispatch(changeView(viewInfo));
	});
	const [categoryObject, settings, settingsWG] = useSelector((state: any) => [state.wordgenCategories, state.appSettings, state.wordgenSettings], shallowEqual);
	var categories: WGCategoryMap[] = categoryObject.map;
	const editCategory = (label: any) => {
		$q(".categories").closeSlidingItems();
		dispatch(startEditCategoryWG(label));
		dispatch(openModal('EditCategory'));
	};
	const maybeDeleteCategory = (label: any) => {
		$q(".categories").closeSlidingItems();
		const thenFunc = (result: any) => {
			if(result.isConfirmed) {
				dispatch(deleteCategoryWG(label));
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
			<AddCategoryModal />
			<EditCategoryModal />
			<ExtraCharactersModal {...modalPropsMaker(isOpenECM, setIsOpenECM)} />
			<ModalWrap {...modalPropsMaker(isOpenInfo, setIsOpenInfo)} content={CatCard} />
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
				<IonList className="categories units" lines="none">
					<IonItem className="nonUnit">
						<IonLabel className="wrappableInnards belongsToBelow">
							<div><strong>Dropoff Rate</strong></div>
							<div className="minor">Characters at the beginning of a group tend to be picked more often than characters at the end of the group.  This slider controls this tendency. A rate of zero is flat, making all characters equiprobable.</div>
						</IonLabel>
					</IonItem>
					<IonItem>
						<IonRange min={0} max={50} value={settingsWG.categoryRunDropoff} pin={true} id="categoryDropoffC" onIonBlur={() => dispatch(setCategoryDropoffWG($i("categoryDropoffC").value as Zero_Fifty))}>
							<IonIcon size="small" slot="start" src="svg/flatAngle.svg" />
							<IonIcon size="small" slot="end" src="svg/steepAngle.svg" />
						</IonRange>
					</IonItem>
					{categories.map((item: WGCategoryMap) => {
						let [label, cat] = item;
						return (
							<IonItem key={label}>
								<IonLabel className="wrappableInnards">
									<div className="categoryRun serifChars">
										<span className="label importantElement">{label}</span>
										<span className="run">{cat.run}</span>
									</div>
									<div className="categoryLongName">{cat.title}</div>
								</IonLabel>
								<IonButton className="ion-margin-horizontal" color="warning" onClick={() => editCategory(label)}>
									<IonIcon icon={construct} style={ { margin: 0 } } />
								</IonButton>
								<IonButton className="ion-margin-end ion-hide-sm-down" color="danger" onClick={() => maybeDeleteCategory(label)}>
									<IonIcon icon={trash} style={ { margin: 0 } } />
								</IonButton>
							</IonItem>
						);
					})}
				</IonList>
				<IonFab vertical="bottom" horizontal="end" slot="fixed">
					<IonFabButton color="secondary" title="Add new character group" onClick={() => dispatch(openModal('AddCategory'))}>
						<IonIcon icon={addOutline} />
					</IonFabButton>
				</IonFab>
			</IonContent>
		</IonPage>
	);
};

export default WGCat;
