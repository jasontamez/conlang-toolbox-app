import React from 'react';
import {
	IonPage,
	IonContent,
	IonList,
	useIonViewDidEnter
} from '@ionic/react';
import {
	SyntaxHeader,
	HeaderItem,
	InfoModal,
	TextItem
} from './MorphoSyntaxElements';
import { changeView } from '../../components/ReduxDucksFuncs';
import { useDispatch } from "react-redux";

const Syntax = () => {
	const dispatch = useDispatch();
	const viewInfo = ['ms', 'ms10'];
	useIonViewDidEnter(() => {
		dispatch(changeView(viewInfo));
	});
	return (
		<IonPage>
			<SyntaxHeader title="10. Clause Combinations" />
			<IonContent fullscreen className="evenBackground disappearingHeaderKludgeFix" id="morphoSyntaxPage">
				<IonList lines="none">

					<HeaderItem className="h h1">10. Clause Combinations</HeaderItem>
					
					<HeaderItem className="h h1">10.1. Serial Verbs</HeaderItem>

					<InfoModal title="Serial Verbs" label="Go Tap on This">
						<ul>
							<li></li>
						</ul>
					</InfoModal>
					<TextItem text="QWQs" rows={4}>How are information questions formed?</TextItem>

				</IonList>
			</IonContent>
		</IonPage>
	);
};
 

export default Syntax;