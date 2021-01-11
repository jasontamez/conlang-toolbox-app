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
	IonModal,
	IonInput,
	IonFooter
} from '@ionic/react';
import {
	closeCircleOutline,
	addOutline
} from 'ionicons/icons';
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import '../WordGen.css';
import I from '../../components/IPA';
///////////import { addCategory, openModal, closeModal } from '../../components/ReduxDucks';
import { CategoryObject, openModal, closeModal } from '../../components/ReduxDucks';

const WGCat = () => {
	let modalState = useSelector((state: any) => state.modalState, shallowEqual);
	let newCat: CategoryObject = {
		title: "",
		label: "",
		run: ""
	};
	const dispatch = useDispatch();
	const categories = useSelector((state: any) => state.categories, shallowEqual);
	function setNewInfo<
		KEY extends keyof CategoryObject,
		VAL extends CategoryObject[KEY]
	>(prop: KEY, value: VAL) {
		// Set the property
		newCat[prop] = value;
	}
	const testInfo = () => {
		// Test info for validness, then save if needed and reset the newCat
	};
	return (
		<IonPage>
			<IonModal isOpen={modalState} onDidDismiss={() => dispatch(closeModal())}>
				<IonHeader>
					<IonToolbar color="primary">
						<IonTitle>Add Category</IonTitle>
						<IonButtons slot="end">
							<IonButton onClick={() => dispatch(closeModal())}>
								<IonIcon icon={closeCircleOutline} />
							</IonButton>
						</IonButtons>
					</IonToolbar>
				</IonHeader>
				<IonContent>
					<IonList lines="none">
						<IonItem>
							<IonLabel position="stacked" style={ {"font-size": "20px"} }>Category Description:</IonLabel>
							<IonInput className="ion-margin-top" placeholder="Type description here" onIonChange={e => setNewInfo("title", e.detail.value!)} autocomplete="on" debounce={500} minlength={1}></IonInput>
						</IonItem>
						<IonItem>
							<IonLabel className="ion-margin-end">Short Label:</IonLabel>
							<IonInput placeholder="1-3 characters" onIonChange={e => setNewInfo("label", e.detail.value!)} minlength={1} maxlength={3}></IonInput>
						</IonItem>
						<IonItem>
							<IonLabel position="stacked" style={ {"font-size": "20px"} }>Letters/Characters:</IonLabel>
							<IonInput className="categoryRun ion-margin-top" placeholder="Enter letters/characters in category here" onIonChange={e => setNewInfo("run", e.detail.value!)} minlength={1}></IonInput>
						</IonItem>
					</IonList>
				</IonContent>
				<IonFooter>
					<IonToolbar>
						<IonButton color="secondary" slot="end" onClick={() => {}}>
							<IonIcon icon={addOutline} slot="start" />
							<IonLabel>Add Category</IonLabel>
						</IonButton>
					</IonToolbar>
				</IonFooter>
			</IonModal>
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
							<IonItemOptions side="start">
								<IonItemOption color="secondary">Edit</IonItemOption>
								<IonItemOption color="danger">Delete</IonItemOption>
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
					<IonFabButton color="secondary" title="Add new category" onClick={() => dispatch(openModal())}>
						<IonIcon icon={addOutline} />
					</IonFabButton>
				</IonFab>
			</IonContent>
		</IonPage>
	);
};

export default WGCat;
