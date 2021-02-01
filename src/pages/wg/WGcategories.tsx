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
	IonTitle,
	IonFab,
	IonFabButton
} from '@ionic/react';
import {
	addOutline
} from 'ionicons/icons';
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { openModal, startEditCategory, deleteCategory, CategoryMap } from '../../components/ReduxDucks';
import AddCategoryModal from './M-AddCategory';
import EditCategoryModal from './M-EditCategory';
import { $q } from '../../components/DollarSignExports';
import fireSwal from '../../components/Swal';

const WGCat = () => {
	const dispatch = useDispatch();
	const categoryObject = useSelector((state: any) => state.categories, shallowEqual);
	var categories: CategoryMap[] = categoryObject.map;
	const editCategory = (label: any) => {
		$q(".categories").closeSlidingItems();
		dispatch(startEditCategory(label));
		dispatch(openModal('EditCategory'));
	};
	const maybeDeleteCategory = (label: any) => {
		fireSwal({
			title: "Delete " + label + "?",
			text: "Are you sure? This cannot be undone.",
			customClass: {popup: 'deleteConfirm'},
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: "Yes, delete it."
		}).then((result: any) => {
			if(result.isConfirmed) {
				dispatch(deleteCategory(label));
				fireSwal({
					title: "Category deleted",
					customClass: {popup: 'dangerToast'},
					position: 'bottom',
					toast: true,
					timer: 2500,
					timerProgressBar: true,
					showConfirmButton: false
				});
			}
		});
	};
	return (
		<IonPage>
			<AddCategoryModal />
			<EditCategoryModal />
			<IonHeader>
				<IonToolbar>
					<IonButtons slot="start">
						<IonMenuButton />
					</IonButtons>
					<IonTitle>Categories</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen>
				<IonList className="categories units" lines="none">
					{categories.map((item: CategoryMap) => {
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
											<span className="label">{label}</span>
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
