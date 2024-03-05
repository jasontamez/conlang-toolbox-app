import React, { FC, useCallback } from 'react';
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
	useIonAlert,
	useIonToast
} from '@ionic/react';
import {
	closeCircleOutline,
	closeCircleSharp
} from 'ionicons/icons';
import { useSelector, useDispatch } from "react-redux";

import WGPresets from '../../../store/wgPresets';
import { Base_WG, ModalProperties, StateObject, WGPresetArray } from '../../../store/types';
import { loadStateWG } from '../../../store/wgSlice';
import useTranslator from '../../../store/translationHooks';

import yesNoAlert from '../../../components/yesNoAlert';
import toaster from '../../../components/toaster';

const getSpecialValue: (x: string) => [string, ...[string, string][]] | [string] = (input) => {
	let m = input.match(/^(.+)((?:\[[^=]+=[^\]]+\])+)$/);
	if(m) {
		const key = m[1];
		let remains = m[2];
		const options: [string, string][] = [];
		while((m = remains.match(/^\[([^=]+)=([^\]]+)\](.*)/))) {
			options.push([m[1], m[2]]);
			remains = m[3];
		}
		return [key, ...options];
	}
	return [input];
};

interface PresetItemProps {
	title: string
	onClick: () => void
}
const PresetItem: FC<PresetItemProps> = (props) => {
	const { title, onClick } = props;
	return (
		<IonItem button={true} onClick={onClick}>
			<IonLabel>{title}</IonLabel>
		</IonItem>

	);
};

const MaybeLoadPresetModal = (props: ModalProperties) => {
	const { isOpen, setIsOpen } = props;
	const dispatch = useDispatch();
	const [ t ] = useTranslator('wg');
	const [ tc ] = useTranslator('common');
	const [doAlert] = useIonAlert();
	const toast = useIonToast();
	const {disableConfirms} = useSelector((state: StateObject) => state.appSettings);
	const maybeLoadPreset = useCallback((presetTitle: string, object: Base_WG) => {
		const preset = t(presetTitle);
		const handler = () => {
			const copy = {...object};
			copy.characterGroups = object.characterGroups.map(group => {
				const { title, ...etc } = group;
				const [value, ...pairs] = getSpecialValue(title);
				const options: {[key: string]: string} = {};
				pairs.forEach(([prop, value]) => {
					options[prop] = value;
				});
				return {
					...etc,
					title: t(value, options)
				};
			});
			copy.transforms = object.transforms.map(group => {
				const { description, ...etc } = group;
				const [value, ...pairs] = getSpecialValue(description);
				const options: {[key: string]: string} = {};
				pairs.forEach(([prop, value]) => {
					options[prop] = value;
				});
				return {
					...etc,
					description: t(value, options)
				};
			});
			dispatch(loadStateWG(copy));
			toaster({
				message: tc("titleLoaded", { title: preset }),
				duration: 2500,
				color: "success",
				position: "top",
				toast
			});
			setIsOpen(false);
		};
		if(disableConfirms) {
			handler();
		} else {
			yesNoAlert({
				header: tc("loadTitle", { title: preset }),
				message: tc("clearOverrideGeneralThings", { things: t("allThings") }),
				cssClass: "warning",
				submit: tc("confirmLoad"),
				handler,
				doAlert
			});
		}
	}, [disableConfirms, dispatch, doAlert, setIsOpen, t, tc, toast]);
	const mapper = useCallback((pair: WGPresetArray[number]) => {
		const [ title, object ] = pair;
		const tTitle = t(title);
		const onClick = () => maybeLoadPreset(title, object);
		return <PresetItem title={tTitle} key={title} onClick={onClick} />;
	}, [maybeLoadPreset, t]);
	return (
		<IonModal isOpen={isOpen} onDidDismiss={() => setIsOpen(false)}>
			<IonHeader>
				<IonToolbar color="primary">
					<IonTitle>{tc("Load Preset")}</IonTitle>
					<IonButtons slot="end">
						<IonButton onClick={() => setIsOpen(false)} aria-label={tc("Close")}>
							<IonIcon icon={closeCircleOutline} />
						</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<IonList lines="none" className="buttonFilled">
					{isOpen ? WGPresets.map(mapper) : <></>}
				</IonList>
			</IonContent>
			<IonFooter>
				<IonToolbar>
					<IonButton color="danger" slot="end" onClick={() => setIsOpen(false)}>
						<IonIcon icon={closeCircleSharp} slot="start" />
						<IonLabel>{tc("Cancel")}</IonLabel>
					</IonButton>
				</IonToolbar>
			</IonFooter>
		</IonModal>
	);
};

export default MaybeLoadPresetModal;
