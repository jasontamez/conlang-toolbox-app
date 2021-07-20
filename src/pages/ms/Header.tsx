import React from 'react';
import {
	IonHeader,
	IonToolbar,
	IonTitle,
	IonButtons,
	IonButton,
	IonMenuButton,
	IonIcon,
	IonSelect,
	IonSelectOption
} from '@ionic/react';
import { useHistory } from "react-router-dom";
import { globeOutline } from 'ionicons/icons';
import { useDispatch } from "react-redux";
import { openModal } from '../../components/ReduxDucksFuncs';
import ExtraCharactersModal from '../M-ExtraCharacters';

const SyntaxHeader = (props: any) => {
	const dispatch = useDispatch();
	const history = useHistory();
	const title = props.title || "1";
	const changePage = (e: any) => {
		const where = (e.detail.value || title);
		where !== title && history.push('/ms/' + where);
	};
	return (
		<IonHeader>
			<ExtraCharactersModal />
			<IonToolbar>
				<IonButtons slot="start">
					<IonMenuButton />
				</IonButtons>
				<IonTitle><IonSelect
					className="syntaxSelect"
					interfaceOptions={{
						header: 'Choose a Heading',
						translucent: false,
						cssClass: 'alertSelect'
					}}
					interface="alert"
					multiple={false}
					placeholder="Select One"
					onIonChange={e => changePage(e)}
					value={title}
        		>
					<IonSelectOption value="1">1. Morphological Typology</IonSelectOption>
					<IonSelectOption value="2">2. Grammatical Categories</IonSelectOption>
					<IonSelectOption value="3">3. Constituent Order Typology</IonSelectOption>
					<IonSelectOption value="4">4. Noun and Noun Phrase Operations</IonSelectOption>
					<IonSelectOption value="5">5. Predicate Nominals and Related Constructions</IonSelectOption>
					<IonSelectOption value="6">6. Grammatical Relations</IonSelectOption>
					<IonSelectOption value="7">7. Voice and Valence Adjusting Operations</IonSelectOption>
					<IonSelectOption value="8">8. Other Verb and Verb Phrase Operations</IonSelectOption>
					<IonSelectOption value="9">9. Pragmatically Marked Structures</IonSelectOption>
					<IonSelectOption value="10">10. xxxxx</IonSelectOption>
				</IonSelect></IonTitle>
				<IonButtons slot="end">
					<IonButton onClick={() => dispatch(openModal("ExtraCharacters"))}>
						<IonIcon icon={globeOutline} />
					</IonButton>
				</IonButtons>
			</IonToolbar>
		</IonHeader>
	);
};

export default SyntaxHeader;