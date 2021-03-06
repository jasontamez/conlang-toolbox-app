import React from 'react';
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
	IonReorder
} from '@ionic/react';
import {
	addOutline,
	helpCircleOutline,
	reorderTwo,
	construct,
	trash
} from 'ionicons/icons';
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { WESoundChangeObject } from '../../components/ReduxDucksTypes';
import {
	openModal,
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

const WERew = () => {
	const dispatch = useDispatch();
	const viewInfo = ['we', 'soundchanges'];
	useIonViewDidEnter(() => {
		dispatch(changeView(viewInfo));
	});
	const [soundChangeObject, settings] = useSelector((state: any) => [state.wordevolveSoundChanges, state.appSettings], shallowEqual);
	const soundChange = soundChangeObject.list;
	const editSoundChange = (label: any) => {
		$q(".soundChanges").closeSlidingItems();
		dispatch(startEditSoundChangeWE(label));
		dispatch(openModal('EditSoundChange'));
	};
	const arrow = (ltr() ? "⟶" : "⟵");
	const maybeDeleteSoundChange = (change: WESoundChangeObject) => {
		$q(".soundChanges").closeSlidingItems();
		const thenFunc = (result: any) => {
			if(result.isConfirmed) {
				dispatch(deleteSoundChangeWE(change));
				fireSwal({
					title: "Rewrite Rule deleted",
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
				rule +=  "/" + change.anticontext;
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
			let moved = what[from];
			let remains = what.slice(0, from).concat(what.slice(from + 1));
			return remains.slice(0, to).concat(moved, remains.slice(to));
		};
		const ed = event.detail;
		const reorganized = reorganize(soundChange, ed.from, ed.to);
		dispatch(reorderSoundChangesWE(reorganized));
		ed.complete();
	};
	return (
		<IonPage>
			<AddSoundChangeModal />
			<EditSoundChangeModal />
			<ModalWrap pageInfo={viewInfo} content={SChCard} />
			<IonHeader>
				<IonToolbar>
					<IonButtons slot="start">
						<IonMenuButton />
					</IonButtons>
					<IonTitle>Sound Changes</IonTitle>
					<IonButtons slot="end">
						<IonButton onClick={() => dispatch(openModal("InfoModal"))}>
							<IonIcon icon={helpCircleOutline} />
						</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen>
				<IonList className="soundChanges units" lines="none">
					<IonReorderGroup disabled={false} className="hideWhileAdding" onIonItemReorder={doReorder}>
						{soundChange.map((change: WESoundChangeObject) => {
							return (
								<IonItem key={change.key}>
									<IonReorder className="dragHandle ion-margin-end"><IonIcon icon={reorderTwo} className="dragHandle" /></IonReorder>
									<IonLabel>
										<div className="importantElement serifChars">
											<span className="seek importantUnit">{change.seek}</span>
											<span className="arrow unimportantUnit">{arrow}</span>
											<span className="replace importantUnit">{change.replace}</span>
											<span className="unimportantUnit">/</span>
											<span className="replace importantUnit">{change.context}</span>
											{change.anticontext ? (
												<span>
													<span className="unimportantUnit">!</span>
													<span className="replace importantUnit">{change.anticontext}</span>
												</span>
											) : ""}
										</div>
										<div className="description">{change.description}</div>
									</IonLabel>
									<IonButton className="ion-margin-end" color="warning" onClick={() => editSoundChange(change.key)}>
										<IonIcon icon={construct} style={ { margin: 0 } } />
									</IonButton>
									<IonButton className="ion-margin-end ion-hide-sm-down" color="danger" onClick={() => maybeDeleteSoundChange(change)}>
										<IonIcon icon={trash} style={ { margin: 0 } } />
									</IonButton>
								</IonItem>
							);
						})}
					</IonReorderGroup>
				</IonList>
				<IonFab vertical="bottom" horizontal="end" slot="fixed">
					<IonFabButton color="secondary" title="Add new sound change" onClick={() => dispatch(openModal('AddSoundChange'))}>
						<IonIcon icon={addOutline} />
					</IonFabButton>
				</IonFab>
			</IonContent>
		</IonPage>
	);
};

export default WERew;
