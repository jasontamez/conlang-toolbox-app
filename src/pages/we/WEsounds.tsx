import React, { useState } from 'react';
import {
	IonContent,
	IonPage,
	IonHeader,
	IonToolbar,
	IonMenuButton,
	IonButtons,
	IonFab,
	IonFabButton,
	IonTitle,
	IonIcon,
	IonList,
	IonItem,
	IonLabel,
	IonButton,
	useIonViewDidEnter,
	IonReorderGroup,
	IonReorder,
	IonItemSliding,
	IonItemOptions,
	IonItemOption,
	useIonAlert,
	useIonToast
} from '@ionic/react';
import {
	addOutline,
	helpCircleOutline,
	reorderTwo,
	trash,
	globeOutline
} from 'ionicons/icons';
import { useSelector, useDispatch } from "react-redux";

import { PageData, StateObject, ViewState, WESoundChangeObject } from '../../store/types';
import { deleteSoundChangeWE, rearrangeSoundChangesWE } from '../../store/weSlice';
import { saveView } from '../../store/viewSlice';

import ModalWrap from "../../components/ModalWrap";
import { $q } from '../../components/DollarSignExports';
import ltr from '../../components/LTR';
import yesNoAlert from '../../components/yesNoAlert';
import toaster from '../../components/toaster';
import ExtraCharactersModal from '../M-ExtraCharacters';
import AddSoundChangeModal from './M-AddSoundChange';
import EditSoundChangeModal from './M-EditSoundChange';
import { SChCard } from "./WECards";

const WERew = (props: PageData) => {
	const { modalPropsMaker } = props;
	const dispatch = useDispatch();
	const [isOpenECM, setIsOpenECM] = useState<boolean>(false);
	const [isOpenInfo, setIsOpenInfo] = useState<boolean>(false);
	const [isOpenAddSoundChange, setIsOpenAddSoundChange] = useState<boolean>(false);
	const [isOpenEditSoundChange, setIsOpenEditSoundChange] = useState<boolean>(false);
	const [editing, setEditing] = useState<null | WESoundChangeObject>(null);
	const viewInfo = { key: "we" as keyof ViewState, page: "soundchanges" };
	useIonViewDidEnter(() => {
		dispatch(saveView(viewInfo));
	});
	const [doAlert] = useIonAlert();
	const [doToast, undoToast] = useIonToast();
	const {disableConfirms} = useSelector((state: StateObject) => state.appSettings);
	const { soundChanges } = useSelector((state: StateObject) => state.we);
	const editSoundChange = (change: WESoundChangeObject) => {
		$q(".soundChanges").closeSlidingItems();
		setEditing(change)
		setIsOpenEditSoundChange(true);
	};
	const arrow = (ltr() ? "⟶" : "⟵");
	const maybeDeleteSoundChange = (change: WESoundChangeObject) => {
		$q(".soundChanges").closeSlidingItems();
		const handler = () => {
			dispatch(deleteSoundChangeWE(change.id));
			toaster({
				message: "Sound Change deleted.",
				duration: 2500,
				color: "danger",
				position: "top",
				doToast,
				undoToast
			});
		};
		if(disableConfirms) {
			handler();
		} else {
			let rule = change.seek + arrow + change.replace + "/" + change.context;
			if(change.anticontext) {
				rule += "/" + change.anticontext;
			}
			yesNoAlert({
				header: rule,
				message: "Are you sure you want to delete this sound change? This cannot be undone.",
				cssClass: "danger",
				submit: "Yes, delete it",
				handler,
				doAlert
			});
		}
	};
	const doReorder = (event: CustomEvent) => {
		const reorganize = (what: any[], from: number, to: number) => {
			const moved = what[from];
			const remains = what.slice(0, from).concat(what.slice(from + 1));
			return remains.slice(0, to).concat(moved, remains.slice(to));
		};
		const ed = event.detail;
		const reorganized = reorganize(soundChanges, ed.from, ed.to);
		dispatch(rearrangeSoundChangesWE(reorganized));
		ed.complete();
	};
	return (
		<IonPage>
			<AddSoundChangeModal {...props.modalPropsMaker(isOpenAddSoundChange, setIsOpenAddSoundChange)} openECM={setIsOpenECM} />
			<EditSoundChangeModal
				{...props.modalPropsMaker(isOpenEditSoundChange, setIsOpenEditSoundChange)}
				openECM={setIsOpenECM}
				editing={editing}
				setEditing={setEditing}
			/>
			<ExtraCharactersModal {...modalPropsMaker(isOpenECM, setIsOpenECM)} />
			<ModalWrap {...modalPropsMaker(isOpenInfo, setIsOpenInfo)}><SChCard /></ModalWrap>
			<IonHeader>
				<IonToolbar>
					<IonButtons slot="start">
						<IonMenuButton />
					</IonButtons>
					<IonTitle>Sound Changes</IonTitle>
					<IonButtons slot="end">
						<IonButton onClick={() => setIsOpenECM(true)}>
							<IonIcon icon={globeOutline} />
						</IonButton>
						<IonButton onClick={() => setIsOpenInfo(true)}>
							<IonIcon icon={helpCircleOutline} />
						</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen className="hasFabButton">
				<IonList className="soundChanges units dragArea" lines="none">
					<IonReorderGroup disabled={false} className="hideWhileAdding" onIonItemReorder={doReorder}>
						{soundChanges.map((change: WESoundChangeObject) => {
							const { id, seek, replace, context, anticontext, description } = change;
							return (
								<IonItemSliding key={id}>
									<IonItemOptions>
										<IonItemOption color="primary" onClick={() => editSoundChange(change)}>
											<IonIcon slot="icon-only" src="svg/edit.svg" />
										</IonItemOption>
										<IonItemOption color="danger" onClick={() => maybeDeleteSoundChange(change)}>
											<IonIcon slot="icon-only" icon={trash} />
										</IonItemOption>
									</IonItemOptions>
									<IonItem>
										<IonReorder className="dragHandle ion-margin-end"><IonIcon icon={reorderTwo} className="dragHandle" /></IonReorder>
										<IonLabel className="wrappableInnards">
											<div className="importantElement serifChars">
												<span className="seek importantUnit">{seek}</span>
												<span className="arrow unimportantUnit">{arrow}</span>
												<span className="replace importantUnit">{replace || String.fromCharCode(160)}</span>
												<span className="arrow unimportantUnit">/</span>
												<span className="replace importantUnit">{context}</span>
												{anticontext ? (
													<span>
														<span className="unimportantUnit">!</span>
														<span className="replace importantUnit">{anticontext}</span>
													</span>
												) : <></>}
											</div>
											<div className="description">{description}</div>
										</IonLabel>
										<IonIcon size="small" slot="end" src="svg/slide-indicator.svg" />
									</IonItem>
								</IonItemSliding>
							);
						})}
					</IonReorderGroup>
				</IonList>
				<IonFab vertical="bottom" horizontal="end" slot="fixed">
					<IonFabButton color="secondary" title="Add new sound change" onClick={() => setIsOpenAddSoundChange(true)}>
						<IonIcon icon={addOutline} />
					</IonFabButton>
				</IonFab>
			</IonContent>
		</IonPage>
	);
};

export default WERew;
