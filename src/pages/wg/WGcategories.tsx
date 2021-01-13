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
import '../WordGen.css';
import I from '../../components/IPA';
import { CategoryObject, openModal, startEditCategory } from '../../components/ReduxDucks';
import AddCategoryModal from './M-AddCategory';
import EditCategoryModal from './M-EditCategory';

const WGCat = () => {
	const dispatch = useDispatch();
	const categoryObject = useSelector((state: any) => state.categories, shallowEqual);
	const categories = categoryObject.list;
	const editCategory = (label: any) => {
		dispatch(startEditCategory(label));
		dispatch(openModal('EditCategory'));
	};
	const maybeDeleteCategory = (label: string) => {};
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
				<p>
					This is where you define categories of sounds. The two simplest categories are <em>consonants</em> and
					<em>vowels</em>, but you may want to create multiple categories depending on how you want your language's
					syllables formed. For example, the consonants <I>pbk</I> in English may be followed by the
					consonants <I>lr</I> at the beginning of syllables. So you might choose them as categories, while keeping
					all of them in a third category for general consonants.
				</p>
				<IonList className="categories" lines="none">
					{categories.map((cat: CategoryObject) => (
						<IonItemSliding key={cat.label} className="wrapOverflow">
							<IonItemOptions side="end">
								<IonItemOption color="secondary" onClick={() => editCategory(cat.label)}>Edit</IonItemOption>
								<IonItemOption color="danger" onClick={() => maybeDeleteCategory(cat.label)}>Delete</IonItemOption>
							</IonItemOptions>
							<IonItem>
								<IonLabel>
									<div className="categoryRun">
										<span className="label">{cat.label}</span>
										<span className="run">{cat.run}</span>
									</div>
									<div className="categoryLongName">{cat.title}</div>
								</IonLabel>
							</IonItem>
						</IonItemSliding>
					))}
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
