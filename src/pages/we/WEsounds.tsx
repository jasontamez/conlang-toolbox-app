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
	globeOutline,
	trashBinOutline
} from 'ionicons/icons';
import { useSelector, useDispatch } from "react-redux";

import { PageData, StateObject, WESoundChangeObject } from '../../store/types';
import { deleteSoundChangeWE, rearrangeSoundChangesWE } from '../../store/weSlice';
import reorganize from '../../components/reorganizer';

import ModalWrap from "../../components/ModalWrap";
import { $q } from '../../components/DollarSignExports';
import ltr from '../../components/LTR';
import yesNoAlert from '../../components/yesNoAlert';
import toaster from '../../components/toaster';
import ExtraCharactersModal from '../modals/ExtraCharacters';
import AddSoundChangeModal from './modals/AddSoundChange';
import EditSoundChangeModal from './modals/EditSoundChange';
import { SChCard } from "./WEinfo";

const WERew = (props: PageData) => {
	const { modalPropsMaker } = props;
	const dispatch = useDispatch();
	const [isOpenECM, setIsOpenECM] = useState<boolean>(false);
	const [isOpenInfo, setIsOpenInfo] = useState<boolean>(false);
	const [isOpenAddSoundChange, setIsOpenAddSoundChange] = useState<boolean>(false);
	const [isOpenEditSoundChange, setIsOpenEditSoundChange] = useState<boolean>(false);
	const [editing, setEditing] = useState<null | WESoundChangeObject>(null);
	const [doAlert] = useIonAlert();
	const toast = useIonToast();
	const {disableConfirms} = useSelector((state: StateObject) => state.appSettings);
	const { soundChanges } = useSelector((state: StateObject) => state.we);
	const editSoundChange = (change: WESoundChangeObject) => {
		const groups = $q<HTMLIonListElement>(".soundChanges");
		groups && groups.closeSlidingItems();
		setEditing(change)
		setIsOpenEditSoundChange(true);
	};
	const arrow = (ltr() ? "⟶" : "⟵");
	const maybeDeleteSoundChange = (change: WESoundChangeObject) => {
		const groups = $q<HTMLIonListElement>(".soundChanges");
		groups && groups.closeSlidingItems();
		const handler = () => {
			dispatch(deleteSoundChangeWE(change.id));
			toaster({
				message: "Sound Change deleted.",
				duration: 2500,
				color: "danger",
				position: "top",
				toast
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
		const ed = event.detail;
		const reorganized = reorganize<WESoundChangeObject>(soundChanges, ed.from, ed.to);
		dispatch(rearrangeSoundChangesWE(reorganized));
		ed.complete();
	};
	const maybeClearEverything = () => {
		const handler = () => {
			dispatch(deleteSoundChangeWE(null));
			toaster({
				message: "Sound Changes have been deleted.",
				duration: 2500,
				color: "danger",
				position: "top",
				toast
			});
		};
		if(disableConfirms) {
			handler();
		} else {
			yesNoAlert({
				header: "Clear Everything?",
				message: "This will delete all current sound changes, and cannot be undone.",
				cssClass: "warning",
				submit: "Yes, Delete Them",
				handler,
				doAlert
			});
		}
	};
	return (
		<IonPage>
			<AddSoundChangeModal
				{...props.modalPropsMaker(isOpenAddSoundChange, setIsOpenAddSoundChange)}
				openECM={setIsOpenECM}
			/>
			<EditSoundChangeModal
				{...props.modalPropsMaker(isOpenEditSoundChange, setIsOpenEditSoundChange)}
				openECM={setIsOpenECM}
				editing={editing}
				setEditing={setEditing}
			/>
			<ExtraCharactersModal {...modalPropsMaker(isOpenECM, setIsOpenECM)} />
			<ModalWrap {...modalPropsMaker(isOpenInfo, setIsOpenInfo)}>
				<SChCard setIsOpenInfo={setIsOpenInfo} />
			</ModalWrap>
			<IonHeader>
				<IonToolbar>
					<IonButtons slot="start">
						<IonMenuButton />
					</IonButtons>
					<IonTitle>Sound Changes</IonTitle>
					<IonButtons slot="end">
						{soundChanges.length > 0 ?
							<IonButton onClick={() => maybeClearEverything()}>
								<IonIcon icon={trashBinOutline} />
							</IonButton>
						:
							<></>
						}
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
					<IonReorderGroup
						disabled={false}
						className="hideWhileAdding"
						onIonItemReorder={doReorder}
					>
						{soundChanges.map((change: WESoundChangeObject) => {
							const { id, seek, replace, context, anticontext, description } = change;
							return (
								<IonItemSliding key={id}>
									<IonItemOptions>
										<IonItemOption
											color="primary"
											onClick={() => editSoundChange(change)}
										>
											<IonIcon slot="icon-only" src="svg/edit.svg" />
										</IonItemOption>
										<IonItemOption
											color="danger"
											onClick={() => maybeDeleteSoundChange(change)}
										>
											<IonIcon slot="icon-only" icon={trash} />
										</IonItemOption>
									</IonItemOptions>
									<IonItem>
										<IonReorder
											className="dragHandle ion-margin-end"
										><IonIcon icon={reorderTwo} className="dragHandle" /></IonReorder>
										<IonLabel className="wrappableInnards">
											<div className="importantElement serifChars">
												<span
													className="seek importantUnit"
												>{seek}</span>
												<span
													className="arrow unimportantUnit"
												>{arrow}</span>
												<span
													className="replace importantUnit"
												>{replace || String.fromCharCode(160)}</span>
												<span
													className="arrow unimportantUnit"
												>/</span>
												<span
													className="replace importantUnit"
												>{context}</span>
												{anticontext ? (
													<span>
														<span
															className="unimportantUnit"
														>!</span>
														<span
															className="replace importantUnit"
														>{anticontext}</span>
													</span>
												) : <></>}
											</div>
											<div className="description">{description}</div>
										</IonLabel>
										<IonIcon
											size="small"
											slot="end"
											src="svg/slide-indicator.svg"
										/>
									</IonItem>
								</IonItemSliding>
							);
						})}
					</IonReorderGroup>
				</IonList>
				<IonFab vertical="bottom" horizontal="end" slot="fixed">
					<IonFabButton
						color="secondary"
						title="Add new sound change"
						onClick={() => setIsOpenAddSoundChange(true)}
					>
						<IonIcon icon={addOutline} />
					</IonFabButton>
				</IonFab>
			</IonContent>
		</IonPage>
	);
};

export default WERew;
