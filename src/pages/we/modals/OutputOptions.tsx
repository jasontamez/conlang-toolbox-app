import React from 'react';
import {
	IonContent,
	IonHeader,
	IonToolbar,
	IonButtons,
	IonTitle,
	IonList,
	IonButton,
	IonItem,
	IonLabel,
	IonModal,
	IonIcon,
	IonFooter,
	IonRadioGroup,
	IonRadio,
	IonToggle,
	IonSelectOption,
	IonSelect
} from '@ionic/react';
import { useSelector, useDispatch } from "react-redux";
import {
	closeCircleOutline
} from 'ionicons/icons';

import useTranslator from '../../../store/translationHooks';
import { WEOutputTypes, ModalProperties, StateObject } from '../../../store/types';
import { setCustomSort, setFlag, setOutputWE } from '../../../store/weSlice';
import PermanentInfo from '../../../components/PermanentInfo';

const OutputOptionsModal = (props: ModalProperties) => {
	const [ t ] = useTranslator('we');
	const [ tc ] = useTranslator('common');
	const [ tw ] = useTranslator('wgwe');
	const { isOpen, setIsOpen } = props;
	const dispatch = useDispatch();
	const {
		outputStyle,
		inputLower,
		inputAlpha,
		customSort
	} = useSelector((state: StateObject) => state.we);
	const { customSorts } = useSelector((state: StateObject) => state.sortSettings);
	return (
		<IonModal isOpen={isOpen} onDidDismiss={() => setIsOpen(false)}>
			<IonHeader>
				<IonToolbar color="primary">
					<IonTitle>{tw("Output Options")}</IonTitle>
					<IonButtons slot="end">
						<IonButton onClick={() => setIsOpen(false)} aria-label={tc("Close")}>
							<IonIcon icon={closeCircleOutline} />
						</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<IonList lines="none">
					<IonItem lines="full">
						<IonToggle
							enableOnOffLabels
							labelPlacement="start"
							checked={inputLower}
							onIonChange={e => dispatch(setFlag(["inputLower", e.detail.checked]))}
						>{t("Convert input to lowercase before evolving")}</IonToggle>
					</IonItem>
					<IonItem lines={inputAlpha ? "none" : undefined}>
						<IonToggle
							enableOnOffLabels
							labelPlacement="start"
							checked={inputAlpha}
							onIonChange={e => dispatch(setFlag(["inputAlpha", e.detail.checked]))}
						>{t("Sort input before evolving")}</IonToggle>
					</IonItem>
					<IonItem className={inputAlpha ? "" : "hide"} lines="full">
						<IonSelect
							color="primary"
							className="ion-text-wrap settings"
							label={tc("Sort method", { context: "presentation" })}
							value={customSort || null}
							onIonChange={(e) => dispatch(setCustomSort(e.detail.value))}
						>
							<IonSelectOption
								className="ion-text-wrap ion-text-align-end"
								value={null}
							>{tc("Default sort")}</IonSelectOption>
							{customSorts.concat(PermanentInfo.sort.permanentCustomSortObjs).map(sorter => (
								<IonSelectOption
									className="ion-text-wrap ion-text-align-end"
									key={`inputSortChooser:${sorter.id}:${sorter.title}`}
									value={sorter.id}
								>{sorter.title}</IonSelectOption>
							))}
						</IonSelect>
					</IonItem>
					<IonRadioGroup
						value={outputStyle}
						onIonChange={e => dispatch(setOutputWE(e.detail.value as WEOutputTypes))}
					>
						<IonItem className="ion-text-wrap">
							<IonRadio
								value="outputOnly"
								labelPlacement="end"
								justify="start"
							>{t("Output Only")}</IonRadio>
						</IonItem>
						<IonItem className="ion-text-wrap">
							<IonRadio
								value="rulesApplied"
								labelPlacement="end"
								justify="start"
							>{t("Output and Sound-Change Rules")}</IonRadio>
						</IonItem>
						<IonItem className="ion-text-wrap">
							<IonRadio
								value="inputFirst"
								labelPlacement="end"
								justify="start"
							>{t("Input then Output")}</IonRadio>
						</IonItem>
						<IonItem className="ion-text-wrap" lines="full">
							<IonRadio
								value="outputFirst"
								labelPlacement="end"
								justify="start"
							>{t("Output then Input")}</IonRadio>
						</IonItem>
					</IonRadioGroup>
				</IonList>
			</IonContent>
			<IonFooter>
				<IonToolbar>
					<IonButton
						color="success"
						slot="end"
						onClick={() => setIsOpen(false)}
					>
						<IonLabel>{tc("Done")}</IonLabel>
					</IonButton>
				</IonToolbar>
			</IonFooter>
		</IonModal>
	);
};

export default OutputOptionsModal;
