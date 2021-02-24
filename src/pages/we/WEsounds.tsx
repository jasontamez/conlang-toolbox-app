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
	IonItemSliding,
	IonItemOptions,
	IonItemOption,
	IonItem,
	IonLabel,
	IonButton,
	useIonViewDidEnter
} from '@ionic/react';
import {
	addOutline,
	helpCircleOutline,
	chevronUpCircleOutline,
	chevronDownCircleOutline
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

const WERew = () => {
	const dispatch = useDispatch();
	const viewInfo = ['we', 'soundchanges'];
	useIonViewDidEnter(() => {
		dispatch(changeView(viewInfo));
	});
	const [soundChangeObject, settings] = useSelector((state: any) => [state.wordevolveSoundChanges, state.appSettings], shallowEqual);
	const soundChange = soundChangeObject.list;
	const keys = soundChange.map((r: WESoundChangeObject) => r.key);
	const editSoundChange = (label: any) => {
		$q(".soundChanges").closeSlidingItems();
		dispatch(startEditSoundChangeWE(label));
		dispatch(openModal('EditSoundChange'));
	};
	const style = window.getComputedStyle($q("body"));
	const ltr = style.direction === "ltr";
	const arrow = (ltr ? "⟶" : "⟵");
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
	const moveUp = (i: number) => {
		let begin = keys.slice(0, i);
		let moved = begin.pop();
		let moving = keys[i];
		let end = keys.slice(i + 1);
		dispatch(reorderSoundChangesWE(begin.concat(moving, moved, end)));
	};
	const moveDown = (i: number) => {
		let begin = keys.slice(0, i);
		let end = keys.slice(i + 1);
		let moved = end.shift();
		let moving = keys[i];
		dispatch(reorderSoundChangesWE(begin.concat(moved, moving, end)));
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
					{soundChange.map((change: WESoundChangeObject, i: number) => (
						<IonItemSliding key={change.key}>
							<IonItemOptions side="end">
								<IonItemOption color="primary" onClick={() => editSoundChange(change.key)}>Edit</IonItemOption>
								<IonItemOption color="danger" onClick={() => maybeDeleteSoundChange(change)}>Delete</IonItemOption>
							</IonItemOptions>
							<IonItem>
								<div className="upDownButtons ion-margin-end">
									{(soundChange.length === 1) ? ""
										: ((i === 0) ? (<IonIcon icon={chevronDownCircleOutline} key={"d_"+change.key} onClick={() => moveDown(i)} style={ { marginLeft: "32px" } } />)
											: ((i + 1 === soundChange.length) ? (<IonIcon icon={chevronUpCircleOutline} key={"u_"+change.key} onClick={() => moveUp(i)} style={ { marginRight: "32px" } } />)
												: [(<IonIcon icon={chevronUpCircleOutline} key={"u_"+change.key} onClick={() => moveUp(i)} />), (<IonIcon icon={chevronDownCircleOutline} key={"d_"+change.key} onClick={() => moveDown(i)} />)]))}
								</div>
								<IonLabel>
									<div className="importantElement serifChars">
										<span className="seek importantUnit">{change.seek}</span>
										<span className="unimportantUnit">{arrow}</span>
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
							</IonItem>
						</IonItemSliding>
					))}
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
