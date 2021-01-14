import React from 'react';
import {
	IonContent,
	IonPage,
	IonHeader,
	IonToolbar,
	IonMenuButton,
	IonButtons,
	IonButton,
	IonTitle,
	IonList,
	IonItemSliding,
	IonItemOptions,
	IonItemOption,
	IonItem,
	IonLabel,
	IonTextarea,
	IonIcon,
	IonToggle,
	IonListHeader
} from '@ionic/react';
import {
	helpOutline
} from 'ionicons/icons';
import '../WordGen.css';
import { $q, $togID } from '../../components/DollarSignExports';
import fireSwal from '../../components/Swal';
import I from '../../components/IPA';
import { CategoryObject, openModal, startEditCategory, deleteCategory, toggleSyllables } from '../../components/ReduxDucks';
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import AddSyllableModal from './M-AddSyllable';
import EditSyllableModal from './M-EditSyllable';

const WGSyl = () => {
	const dispatch = useDispatch();
	const syllableObject = useSelector((state: any) => state.syllables, shallowEqual);
	const categoryObject = useSelector((state: any) => state.categories, shallowEqual);
	const categories = categoryObject.list;
	const editCategory = (label: any) => {
		$q(".syllables").closeSlidingItems();
		dispatch(startEditCategory(label));
		dispatch(openModal('EditSyllable'));
	};
	const maybeDeleteCategory = (label: any) => {
		fireSwal({
			title: "Delete " + label + "?",
			text: "Are you sure? This cannot be undone.",
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
	const toggleClass = (base: string = "") => {
		let extra = " toggleable";
		if(syllableObject.toggle) {
			extra += " toggled";
		}
		return (base + extra).trim();
	};
	return (
		<IonPage>
			<AddSyllableModal />
			<EditSyllableModal />
			<IonHeader>
				<IonToolbar>
					 <IonButtons slot="start">
						 <IonMenuButton />
					 </IonButtons>
					<IonTitle>Syllables</IonTitle>
					<IonButtons slot="end">
						<IonButton className="helpy" onClick={() => $togID('expanded', 'syllablesCTE')} size="small" shape="round" color="primary" fill="outline">
							<IonIcon icon={helpOutline} size="small" />
						</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen>
				<div className="clickToExpand" id="syllablesCTE">
					<p>
						This is where you define categories of sounds. The two simplest categories
						are <em>consonants</em> and <em>vowels</em>, but you may want to create multiple
						categories depending on how you want your language's syllables formed. For example,
						the consonants <I>pbk</I> in English may be followed by the consonants <I>lr</I> at
						the beginning of syllables. So you might choose them as categories, while also
						putting <I>pbklr</I> in a third category for general consonants.
					</p><p>
						These <strong>Categories</strong> of sounds will be used in
						the <strong>Syllables</strong> tab to generate your words.
					</p>
				</div>
				<IonList lines="none">
					<IonItem class="ion-text-end">
						<IonLabel>Use multiple syllable types</IonLabel>
						<IonToggle checked={syllableObject.toggle} onIonChange={() => dispatch(toggleSyllables())} />
					</IonItem>
				</IonList>
				<IonList className="syllables units" lines="none">
					<header className={toggleClass("reverseToggle")}>Boops</header>
					<header className={toggleClass()}>Doubled</header>
					<IonItem>
						<IonTextarea />
					</IonItem>
					{categories.map((cat: CategoryObject) => (
						<IonItemSliding key={cat.label}>
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
			</IonContent>
		</IonPage>
	);
};

export default WGSyl;
