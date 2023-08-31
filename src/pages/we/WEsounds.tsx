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
	IonItemOption
} from '@ionic/react';
import {
	addOutline,
	helpCircleOutline,
	reorderTwo,
	trash,
	globeOutline
} from 'ionicons/icons';
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { PageData, WESoundChangeObject } from '../../components/ReduxDucksTypes';
import {
	startEditSoundChangeWE,
	deleteSoundChangeWE,
	reorderSoundChangesWE,
	changeView
} from '../../components/ReduxDucksFuncs';
import AddSoundChangeModal from './M-AddSoundChange';
import EditSoundChangeModal from './M-EditSoundChange';
import { SChCard } from "./WECards";
import ModalWrap from "../../components/ModalWrap";
import { $q } from '../../components/DollarSignExports';
import fireSwal from '../../components/Swal';
import ltr from '../../components/LTR';
import ExtraCharactersModal from '../M-ExtraCharacters';

const WERew = (props: PageData) => {
	const { modalPropsMaker } = props;
	const dispatch = useDispatch();
	const [isOpenECM, setIsOpenECM] = useState<boolean>(false);
	const [isOpenInfo, setIsOpenInfo] = useState<boolean>(false);
	const [isOpenAddSoundChange, setIsOpenAddSoundChange] = useState<boolean>(false);
	const [isOpenEditSoundChange, setIsOpenEditSoundChange] = useState<boolean>(false);
	const viewInfo = ['we', 'soundchanges'];
	useIonViewDidEnter(() => {
		dispatch(changeView(viewInfo));
	});
	const [soundChangeObject, settings] = useSelector((state: any) => [state.wordevolveSoundChanges, state.appSettings], shallowEqual);
	const soundChange = soundChangeObject.list;
	const editSoundChange = (label: any) => {
		$q(".soundChanges").closeSlidingItems();
		dispatch(startEditSoundChangeWE(label));
		setIsOpenEditSoundChange(true);
	};
	const arrow = (ltr() ? "⟶" : "⟵");
	const maybeDeleteSoundChange = (change: WESoundChangeObject) => {
		$q(".soundChanges").closeSlidingItems();
		const thenFunc = (result: any) => {
			if(result.isConfirmed) {
				dispatch(deleteSoundChangeWE(change));
				fireSwal({
					title: "Sound Change deleted",
					customClass: {popup: 'dangerToast'},
					toast: true,
					timer: 2500,
					timerProgressBar: true,
					showConfirmButton: false
				});
			}
		};
		if(settings.disableConfirms) {
			thenFunc({isConfirmed: true});
		} else {
			let rule = change.seek + arrow + change.replace + "/" + change.context;
			if(change.anticontext) {
				rule += "/" + change.anticontext;
			}
			fireSwal({
				title: "Delete " + rule + "?",
				text: "Are you sure? This cannot be undone.",
				customClass: {popup: 'deleteConfirm'},
				icon: 'warning',
				showCancelButton: true,
				confirmButtonText: "Yes, delete it."
			}).then(thenFunc);
		}
	};
	const doReorder = (event: CustomEvent) => {
		const reorganize = (what: any[], from: number, to: number) => {
			const moved = what[from];
			const remains = what.slice(0, from).concat(what.slice(from + 1));
			return remains.slice(0, to).concat(moved, remains.slice(to));
		};
		const ed = event.detail;
		const reorganized = reorganize(soundChange, ed.from, ed.to);
		dispatch(reorderSoundChangesWE(reorganized));
		ed.complete();
	};
	return (
		<IonPage>
			<AddSoundChangeModal {...props.modalPropsMaker(isOpenAddSoundChange, setIsOpenAddSoundChange)} openECM={setIsOpenECM} />
			<EditSoundChangeModal {...props.modalPropsMaker(isOpenEditSoundChange, setIsOpenEditSoundChange)} openECM={setIsOpenECM} />
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
						{soundChange.map((change: WESoundChangeObject) => {
							const { key, seek, replace, context, anticontext, description } = change;
							return (
								<IonItemSliding key={key}>
									<IonItemOptions>
										<IonItemOption color="primary" onClick={() => editSoundChange(key)}>
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
												) : ""}
											</div>
											<div className="description">{description}</div>
										</IonLabel>
										<IonIcon size="small" slot="end" src="svg/drag-indicator.svg" />
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
