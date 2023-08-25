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
	IonReorder
} from '@ionic/react';
import {
	addOutline,
	helpCircleOutline,
	reorderTwo,
	construct,
	trash,
	globeOutline
} from 'ionicons/icons';
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { PageData, WETransformObject } from '../../components/ReduxDucksTypes';
import {
	openModal,
	startEditTransformWE,
	deleteTransformWE,
	reorderTransformsWE,
	changeView
} from '../../components/ReduxDucksFuncs';
import AddTransformModal from './M-AddTransform';
import EditTransformModal from './M-EditTransform';
import { TraCard } from "./WECards";
import ModalWrap from "../../components/ModalWrap";
import { $q } from '../../components/DollarSignExports';
import fireSwal from '../../components/Swal';
import ltr from '../../components/LTR';
import ExtraCharactersModal from '../M-ExtraCharacters';

const WERew = (props: PageData) => {
	const dispatch = useDispatch();
	const [isOpenECM, setIsOpenECM] = useState<boolean>(false);
	const viewInfo = ['we', 'transformations'];
	useIonViewDidEnter(() => {
		dispatch(changeView(viewInfo));
	});
	const [transformObject, settings] = useSelector((state: any) => [state.wordevolveTransforms, state.appSettings], shallowEqual);
	const transform = transformObject.list;
	const editTransform = (label: any) => {
		$q(".transforms").closeSlidingItems();
		dispatch(startEditTransformWE(label));
		dispatch(openModal('EditTransform'));
	};
	const makeArrow = (dir: string) => {
		if(dir === "double") {
			return ltr() ? "⟹" : "⟸";
		} else if (ltr()) {
			return "⟶";
		}
		return "⟵";		 
	};
	const makeDeclaration = (dir: string) => {
		switch(dir) {
			case "both":
				return "at input, then undo at output";
			case "double":
				return "at input and output";
			case "in":
				return "at input";
			case "out":
				return "at output";
		}
		return "Error";
	}
	const maybeDeleteTransform = (trans: WETransformObject) => {
		$q(".transforms").closeSlidingItems();
		const thenFunc = (result: any) => {
			if(result.isConfirmed) {
				dispatch(deleteTransformWE(trans));
				fireSwal({
					title: "Transform deleted",
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
			fireSwal({
				title: "Delete " + trans.seek + " " + makeArrow(trans.direction) + " " + trans.replace + "?",
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
		const reorganized = reorganize(transform, ed.from, ed.to);
		dispatch(reorderTransformsWE(reorganized));
		ed.complete();
	};
	return (
		<IonPage>
			<AddTransformModal />
			<EditTransformModal />
			<ExtraCharactersModal {...props.modalPropsMaker(isOpenECM, setIsOpenECM)} />
			<ModalWrap pageInfo={viewInfo} content={TraCard} />
			<IonHeader>
				<IonToolbar>
					<IonButtons slot="start">
						<IonMenuButton />
					</IonButtons>
					<IonTitle>Transformations</IonTitle>
					<IonButtons slot="end">
						<IonButton onClick={() => dispatch(openModal("ExtraCharacters"))}>
							<IonIcon icon={globeOutline} />
						</IonButton>
						<IonButton onClick={() => dispatch(openModal("InfoModal"))}>
							<IonIcon icon={helpCircleOutline} />
						</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen className="hasFabButton">
				<IonList className="transforms units dragArea" lines="none">
					<IonReorderGroup disabled={false} className="hideWhileAdding" onIonItemReorder={doReorder}>
						{transform.map((trans: WETransformObject) => {
							return (
								<IonItem key={trans.key}>
									<IonReorder className="dragHandle ion-margin-end"><IonIcon icon={reorderTwo} className="dragHandle" /></IonReorder>
									<IonLabel className="wrappableInnards">
										<div className="serifChars">
											<span className="seek importantUnit">{trans.seek}</span>
											<span className="arrow unimportantUnit">{makeArrow(trans.direction)}</span>
											<span className="replace importantUnit">{trans.replace || String.fromCharCode(160)}</span>
											<span className="unimportantUnit">{makeDeclaration(trans.direction)}</span>
										</div>
										<div className="description">{trans.description}</div>
									</IonLabel>
									<IonButton className="ion-margin-horizontal" color="warning" onClick={() => editTransform(trans.key)}>
										<IonIcon icon={construct} style={ { margin: 0 } } />
									</IonButton>
									<IonButton className="ion-margin-end ion-hide-sm-down" color="danger" onClick={() => maybeDeleteTransform(trans)}>
										<IonIcon icon={trash} style={ { margin: 0 } } />
									</IonButton>
								</IonItem>
							);
						})}
					</IonReorderGroup>
				</IonList>
				<IonFab vertical="bottom" horizontal="end" slot="fixed">
					<IonFabButton color="tertiary" title="Add new transform" onClick={() => dispatch(openModal('AddTransform'))}>
						<IonIcon icon={addOutline} />
					</IonFabButton>
				</IonFab>
			</IonContent>
		</IonPage>
	);
};

export default WERew;
