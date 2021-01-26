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
	IonItem,
	IonRange,
	IonLabel,
	IonItemDivider,
	IonIcon,
	IonRadioGroup,
	IonRadio,
	IonToggle,
	IonInput
} from '@ionic/react';
import '../WordGen.css';

const WGSet = () => {
	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					 <IonButtons slot="start">
						 <IonMenuButton />
					 </IonButtons>
					<IonTitle>Settings</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen>
				<IonList>
					<IonItemDivider>Word Generation Controls</IonItemDivider>
					<IonItem>
						<IonLabel position="stacked">Rate of monosyllable words</IonLabel>
						<IonRange min={0} max={100} value={20} pin={true}>
							<IonLabel slot="start">Never</IonLabel>
							<IonLabel slot="end">Always</IonLabel>
						</IonRange>
					</IonItem>
					<IonItem>
						<IonLabel position="stacked">Maximum number of syllables per word</IonLabel>
						<IonRange min={2} max={15} value={6} pin={true} snaps={true} ticks={true} step={1}>
							<IonLabel slot="start">2</IonLabel>
							<IonLabel slot="end">15</IonLabel>
						</IonRange>
					</IonItem>
					<IonItem>
						<IonLabel position="stacked" className="ion-padding-bottom">Category run dropoff</IonLabel>
						<IonRange min={0} max={50} value={30} pin={true}>
							<IonIcon size="small" slot="start" src="svg/flatAngle.svg" />
							<IonIcon size="small" slot="end" src="svg/steepAngle.svg" />
						</IonRange>
					</IonItem>
					<IonItem>
						<IonLabel position="stacked" className="ion-padding-bottom">Syllable box dropoff</IonLabel>
						<IonRange min={0} max={50} value={25} pin={true}>
							<IonIcon size="small" slot="start" src="svg/flatAngle.svg" />
							<IonIcon size="small" slot="end" src="svg/steepAngle.svg" />
						</IonRange>
					</IonItem>
					<IonItemDivider>Output Controls</IonItemDivider>
					<IonRadioGroup value="text">
						<IonItem>
							<IonLabel>Psuedo-text</IonLabel>
							<IonRadio value="text" />
						</IonItem>
						<IonItem>
							<IonLabel>Wordlist</IonLabel>
							<IonRadio value="wordlist" />
						</IonItem>
						<IonItem>
							<IonLabel>All possible syllables</IonLabel>
							<IonRadio value="syllables" />
						</IonItem>
					</IonRadioGroup>
					<IonItem>
						<IonLabel>Show syllable breaks</IonLabel>
						<IonToggle />
					</IonItem>
					<IonItemDivider>Pseudo-text Controls</IonItemDivider>
					<IonItem>
						<IonLabel position="stacked">Number of sentences</IonLabel>
						<IonRange min={5} max={100} value={30} pin={true}>
							<IonLabel slot="start">5</IonLabel>
							<IonLabel slot="end">100</IonLabel>
						</IonRange>
					</IonItem>
					<IonItem>
						<IonLabel position="stacked" className="ion-padding-bottom">Declarative sentence beginning</IonLabel>
						<IonInput inputmode="text" maxlength={5} minlength={0} size={3} value="" />
					</IonItem>
					<IonItem>
						<IonLabel position="stacked" className="ion-padding-bottom">Declarative sentence ending</IonLabel>
						<IonInput inputmode="text" maxlength={5} minlength={0} size={3} value="." />
					</IonItem>
					<IonItem>
						<IonLabel position="stacked" className="ion-padding-bottom">Interrogative sentence beginning</IonLabel>
						<IonInput inputmode="text" maxlength={5} minlength={0} size={3} value="" />
					</IonItem>
					<IonItem>
						<IonLabel position="stacked" className="ion-padding-bottom">Interrogative sentence ending</IonLabel>
						<IonInput inputmode="text" maxlength={5} minlength={0} size={3} value="?" />
					</IonItem>
					<IonItem>
						<IonLabel position="stacked" className="ion-padding-bottom">Exclamatory sentence beginning</IonLabel>
						<IonInput inputmode="text" maxlength={5} minlength={0} size={3} value="" />
					</IonItem>
					<IonItem>
						<IonLabel position="stacked" className="ion-padding-bottom">Exclamatory sentence ending</IonLabel>
						<IonInput inputmode="text" maxlength={5} minlength={0} size={3} value="!" />
					</IonItem>
					<IonItemDivider>Wordlist and Syllable-List Controls</IonItemDivider>
					<IonItem>
						<IonLabel>Capitalize words</IonLabel>
						<IonToggle />
					</IonItem>
					<IonItem>
						<IonLabel>Multi-Column layout</IonLabel>
						<IonToggle checked={true} />
					</IonItem>
				</IonList>
			</IonContent>
		</IonPage>
	);
};

export default WGSet;
