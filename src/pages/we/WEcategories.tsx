import React from 'react';
import {
	IonContent,
	IonPage,
	IonHeader,
	IonToolbar,
	IonMenuButton,
	IonButtons,
	IonTitle,
	IonList,
	IonItemSliding,
	IonItemOption,
	IonItemOptions,
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
	addOutline
} from 'ionicons/icons';
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { openModal, startEditCategoryWE, deleteCategoryWE, changeView } from '../../components/ReduxDucksFuncs';
import { CatCard } from "./WECards";
import ModalWrap from "../../components/ModalWrap";
import { WECategoryMap } from '../../components/ReduxDucksTypes';
import AddCategoryWEModal from './M-AddCategoryWE';
import EditCategoryWEModal from './M-EditCategoryWE';
import { $q } from '../../components/DollarSignExports';
import fireSwal from '../../components/Swal';
import '../App.css';

const WECat = () => {
	const dispatch = useDispatch();
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
			<AddCategoryWEModal />
			<EditCategoryWEModal />
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
					{categories.map((item: WECategoryMap) => {
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
					<IonFabButton color="secondary" title="Add new category" onClick={() => dispatch(openModal('AddCategoryWE'))}>
						<IonIcon icon={addOutline} />
					</IonFabButton>
				</IonFab>
			</IonContent>
		</IonPage>
	);
};

export default WECat;
