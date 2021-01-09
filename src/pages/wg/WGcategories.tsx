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
import { shallowEqual, useSelector } from "react-redux";
import '../WordGen.css';
import { CategoryStatus } from '../../components/ReduxDucks';
import I from '../../components/IPA';

const WGCat = () => {
	const categories = useSelector((state: any) => state.categories, shallowEqual);
	const checkDisplayStatus =
		(status: CategoryStatus = {}) => 
			Object.getOwnPropertyNames(status)
				.filter((prop: string) => status[prop as keyof CategoryStatus])
					.join(" ");
	return (
		<IonPage>
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
								<IonLabel className={checkDisplayStatus(cat.status)}>
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
					<IonFabButton title="Add new category">
						<IonIcon icon={addOutline} />
					</IonFabButton>
				</IonFab>
			</IonContent>
		</IonPage>
	);
};

export default WGCat;
