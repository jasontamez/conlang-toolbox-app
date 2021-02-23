import React from 'react';
import {
	IonItem,
	IonIcon,
	IonLabel,
	IonList,
	IonItemOptions,
	IonItemOption,
	IonItemSliding,
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
	useIonViewDidEnter
} from '@ionic/react';
import {
	addOutline,
	helpCircleOutline
} from 'ionicons/icons';
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { openModal, startEditCategoryWG, deleteCategoryWG, changeView } from '../../components/ReduxDucksFuncs';
import { WGCategoryMap } from '../../components/ReduxDucksTypes';
import AddCategoryModal from './M-AddCategory';
import EditCategoryModal from './M-EditCategory';
import { $q } from '../../components/DollarSignExports';
import fireSwal from '../../components/Swal';
import { CatCard } from "./WGCards";
import ModalWrap from "../../components/ModalWrap";

const WGCat = () => {
	const dispatch = useDispatch();
	const viewInfo = ['wg', 'categories'];
	useIonViewDidEnter(() => {
		dispatch(changeView(viewInfo));
	});
	const [categoryObject, settings] = useSelector((state: any) => [state.wordgenCategories, state.appSettings], shallowEqual);
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
					title: "Category deleted",
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
			<ModalWrap pageInfo={viewInfo} content={CatCard} />
			<IonHeader>
				<IonToolbar>
					<IonButtons slot="start">
						<IonMenuButton />
					</IonButtons>
					<IonTitle>Categories</IonTitle>
					<IonButtons slot="end">
						<IonButton onClick={() => dispatch(openModal("InfoModal"))}>
							<IonIcon icon={helpCircleOutline} />
						</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen>
				<IonList className="categories units" lines="none">
					{categories.map((item: WGCategoryMap) => {
						let [label, cat] = item;
						return (
							<IonItemSliding key={label}>
								<IonItemOptions side="end">
									<IonItemOption color="secondary" onClick={() => editCategory(label)}>Edit</IonItemOption>
									<IonItemOption color="danger" onClick={() => maybeDeleteCategory(label)}>Delete</IonItemOption>
								</IonItemOptions>
								<IonItem>
									<IonLabel>
										<div className="categoryRun serifChars">
											<span className="label importantElement">{label}</span>
											<span className="run">{cat.run}</span>
										</div>
										<div className="categoryLongName">{cat.title}</div>
									</IonLabel>
								</IonItem>
							</IonItemSliding>
						);
					})}
				</IonList>
				<IonFab vertical="bottom" horizontal="end" slot="fixed">
					<IonFabButton color="secondary" title="Add new category" onClick={() => dispatch(openModal('AddCategory'))}>
						<IonIcon icon={addOutline} />
					</IonFabButton>
				</IonFab>
			</IonContent>
		</IonPage>
	);
};

export default WGCat;
