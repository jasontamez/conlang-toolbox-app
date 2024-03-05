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

import useTranslator from '../../store/translationHooks';
import { ModalProperties, SorterFunc, StateObject } from '../../store/types';
import { updateLexiconSort } from '../../store/lexiconSlice';
import reorganize from '../../components/reorganizer';

interface EditSortModal extends ModalProperties {
	sorter: SorterFunc
}

const EditLexiconSortModal = (props: EditSortModal) => {
	const { isOpen, setIsOpen, sorter } = props;
	const dispatch = useDispatch();
	const [ t ] = useTranslator('lexicon');
	const [ tc ] = useTranslator('common');
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
		const sortOrder = reorganize<number>(sorting, ed.from, ed.to);
		setSorting(sortOrder);
		ed.complete();
	};
	return (
		<IonModal isOpen={isOpen} onDidDismiss={() => setIsOpen(false)} backdropDismiss={false}>
			<IonHeader>
				<IonToolbar color="primary">
					<IonTitle>{t("Lexicon Sorting")}</IonTitle>
					<IonButtons slot="end">
						<IonButton onClick={() => setIsOpen(false)} aria-label={tc("Close")}>
							<IonIcon icon={closeCircleOutline} />
						</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent id="editLexiconItemOrder">
				<IonList lines="full">
					<IonItem>
						<IonLabel className="ion-text-wrap">{t("sortLexDescription")}</IonLabel>
					</IonItem>
					<IonItemDivider>{t("Lexicon Sorting")}</IonItemDivider>
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
										<IonLabel className={i ? "" : "bold"}>{label}</IonLabel>
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
						<IonLabel>{tc("saveGeneralThings", { things: t("Changes") })}</IonLabel>
					</IonButton>
				</IonToolbar>
			</IonFooter>
		</IonModal>
	);
};

export default EditLexiconSortModal;
