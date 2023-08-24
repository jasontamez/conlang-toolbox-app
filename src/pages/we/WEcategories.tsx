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
	useIonViewDidEnter
} from '@ionic/react';
import {
	helpCircleOutline,
	addOutline,
	construct,
	trash,
	globeOutline
} from 'ionicons/icons';
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { openModal, startEditCategoryWE, deleteCategoryWE, changeView } from '../../components/ReduxDucksFuncs';
import { CatCard } from "./WECards";
import ModalWrap from "../../components/ModalWrap";
import { PageData, WECategoryMap } from '../../components/ReduxDucksTypes';
import AddCategoryWEModal from './M-AddCategoryWE';
import EditCategoryWEModal from './M-EditCategoryWE';
import { $q } from '../../components/DollarSignExports';
import fireSwal from '../../components/Swal';
import ExtraCharactersModal from '../M-ExtraCharacters';

const WECat = (props: PageData) => {
	const dispatch = useDispatch();
	const [isOpenECM, setIsOpenECM] = useState<boolean>(false);
	const viewInfo = ['we', 'categories'];
	useIonViewDidEnter(() => {
		dispatch(changeView(viewInfo));
	});
	const [categoryObject, settings] = useSelector((state: any) => [state.wordevolveCategories, state.appSettings], shallowEqual);
	var categories: WECategoryMap[] = categoryObject.map;
	const editCategory = (label: any) => {
		$q(".categories").closeSlidingItems();
		dispatch(startEditCategoryWE(label));
		dispatch(openModal('EditCategoryWE'));
	};
	const maybeDeleteCategory = (label: any) => {
		$q(".categories").closeSlidingItems();
		const thenFunc = (result: any) => {
			if(result.isConfirmed) {
				dispatch(deleteCategoryWE(label));
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
			<AddCategoryWEModal />
			<EditCategoryWEModal />
			<ExtraCharactersModal isOpen={isOpenECM} setIsOpen={setIsOpenECM} {...props} />
			<ModalWrap pageInfo={viewInfo} content={CatCard} />
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
						<IonButton onClick={() => dispatch(openModal("InfoModal"))}>
							<IonIcon icon={helpCircleOutline} />
						</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen className="hasFabButton">
				<IonList className="categories units" lines="none">
					{categories.map((item: WECategoryMap) => {
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
					<IonFabButton color="secondary" title="Add new group" onClick={() => dispatch(openModal('AddCategoryWE'))}>
						<IonIcon icon={addOutline} />
					</IonFabButton>
				</IonFab>
			</IonContent>
		</IonPage>
	);
};

export default WECat;
