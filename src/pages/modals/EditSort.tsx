import React, { useEffect, useState } from 'react';
import {
	IonItem,
	IonIcon,
	IonLabel,
	IonList,
	IonContent,
	IonHeader,
	IonToolbar,
	IonButtons,
	IonButton,
	IonTitle,
	IonModal,
	IonFooter,
	IonReorderGroup,
	IonReorder,
	IonItemDivider
} from '@ionic/react';
import {
	closeCircleOutline,
	saveOutline,
	reorderTwo,
	checkmarkCircle
} from 'ionicons/icons';
import { useSelector, useDispatch } from "react-redux";

import { ModalProperties, StateObject } from '../../store/types';
import { updateLexiconSort } from '../../store/lexiconSlice';

function reorganize (what: any[], from: number, to: number) {
	const moved = what[from];
	const remains = what.slice(0, from).concat(what.slice(from + 1));
	return remains.slice(0, to).concat(moved, remains.slice(to));
};

interface EditSortModal extends ModalProperties {
	sorter: Function
}

const EditLexiconSortModal = (props: EditSortModal) => {
	const { isOpen, setIsOpen, sorter } = props;
	const dispatch = useDispatch();
	const {
		columns,
		sortPattern,
	} = useSelector((state: StateObject) => state.lexicon);
	const [sorting, setSorting] = useState<number[]>(sortPattern);
	useEffect(() => {
		setSorting(sortPattern);
	}, [sortPattern]);

	const doneSorting = () => {
		dispatch(updateLexiconSort([sorting, sorter]));
		setIsOpen(false);
	};
	const doReorder = (event: CustomEvent) => {
		const ed = event.detail;
		const sortOrder = reorganize(sorting, ed.from, ed.to);
		setSorting(sortOrder);
		ed.complete();
	};
	return (
		<IonModal isOpen={isOpen} onDidDismiss={() => setIsOpen(false)} backdropDismiss={false}>
			<IonHeader>
				<IonToolbar color="primary">
					<IonTitle>Sort Lexicon</IonTitle>
					<IonButtons slot="end">
						<IonButton onClick={() => setIsOpen(false)}>
							<IonIcon icon={closeCircleOutline} />
						</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent id="editLexiconItemOrder">
				<IonList lines="full">
					<IonItem>
						<IonLabel className="ion-text-wrap">The Lexicon will be sorted alphabetically in the order you choose. It sorts by the first column you choose. If two items are identical in that column, it will sort them by the next column in the sort list, and so on.</IonLabel>
					</IonItem>
					<IonItemDivider>Lexicon Sort</IonItemDivider>
					<IonReorderGroup disabled={false} onIonItemReorder={doReorder}>
						{sorting.map((cNum: number, i: number) => {
							if(!columns[cNum]) {
								// in case things aren't updating
								return <React.Fragment key={`missingColumn:${i}`}></React.Fragment>;
							}
							const {id, label} = columns[cNum];
							return (
								<IonReorder key={`${id}:modal:sortOrder`}>
									<IonItem lines="full">
										<IonIcon icon={reorderTwo} slot="start" />
										<IonLabel style={i ? {} : {fontWeight: "bold"}}>{label}</IonLabel>
										{i ? <></> : <IonIcon icon={checkmarkCircle} slot="end" />}
									</IonItem>
								</IonReorder>
							);
						})}
					</IonReorderGroup>
				</IonList>
			</IonContent>
			<IonFooter id="footerElement">
				<IonToolbar color="darker">
					<IonButton color="tertiary" slot="end" onClick={() => doneSorting()}>
						<IonIcon icon={saveOutline} slot="start" />
						<IonLabel>Save Changes</IonLabel>
					</IonButton>
				</IonToolbar>
			</IonFooter>
		</IonModal>
	);
};

export default EditLexiconSortModal;
