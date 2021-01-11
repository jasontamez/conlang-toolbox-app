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
	IonModal
} from '@ionic/react';
import {
	addOutline
} from 'ionicons/icons';
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import '../WordGen.css';
import I from '../../components/IPA';
///////////import { addCategory, openModal, closeModal } from '../../components/ReduxDucks';
import { openModal, closeModal } from '../../components/ReduxDucks';

const WGCat = () => {
	let modalState = useSelector((state: any) => state.modalState, shallowEqual);
	const dispatch = useDispatch();
	const categories = useSelector((state: any) => state.categories, shallowEqual);
	return (
		<IonPage>
			<IonModal isOpen={modalState} onDidDismiss={() => dispatch(closeModal())}>
				<IonHeader>
					<IonToolbar color="primary">
						<IonTitle>My Modal</IonTitle>
						<IonButtons slot="end">
							<IonButton onClick={() => dispatch(closeModal())}>
								<IonIcon icon={addOutline} slot="icon-only" />
							</IonButton>
						</IonButtons>
					</IonToolbar>
				</IonHeader>
				<IonContent>
					<p>Yummy</p>
				</IonContent>
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
					{categories.map((cat: any) => (
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
					<IonFabButton title="Add new category" onClick={() => dispatch(openModal())}>
						<IonIcon icon={addOutline} />
					</IonFabButton>
				</IonFab>
			</IonContent>
		</IonPage>
	);
};

export default WGCat;
