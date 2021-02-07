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
	useIonViewDidEnter
} from '@ionic/react';
import {
	addOutline,
	chevronUpCircleOutline,
	chevronDownCircleOutline
} from 'ionicons/icons';
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { WETransformObject } from '../../components/ReduxDucksTypes';
import {
	openModal,
	startEditTransformWE,
	deleteTransformWE,
	reorderTransformsWE,
	changeView
} from '../../components/ReduxDucksFuncs';
import AddTransformModal from './M-AddTransform';
import EditTransformModal from './M-EditTransform';
import { $q } from '../../components/DollarSignExports';
import fireSwal from '../../components/Swal';
import '../App.css';

const WERew = () => {
	const dispatch = useDispatch();
	useIonViewDidEnter(() => {
		dispatch(changeView('we', 'transformations'));
	});
	const state = useSelector((state: any) => state, shallowEqual);
	const transformObject = state.wordevolveTransforms;
	const transform = transformObject.list;
	const keys = transform.map((r: WETransformObject) => r.key);
	const editTransform = (label: any) => {
		$q(".transforms").closeSlidingItems();
		dispatch(startEditTransformWE(label));
		dispatch(openModal('EditTransform'));
	};
	const settings = state.appSettings;
	const makeArrow = (dir: string) => {
		return dir === "in" ? "⟶" : (dir === "out" ? "⟵" : "⟷");
	};
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
	const moveUp = (i: number) => {
		let begin = keys.slice(0, i);
		let moved = begin.pop();
		let moving = keys[i];
		let end = keys.slice(i + 1);
		dispatch(reorderTransformsWE(begin.concat(moving, moved, end)));
	};
	const moveDown = (i: number) => {
		let begin = keys.slice(0, i);
		let end = keys.slice(i + 1);
		let moved = end.shift();
		let moving = keys[i];
		dispatch(reorderTransformsWE(begin.concat(moved, moving, end)));
	};
	return (
		<IonPage>
			<AddTransformModal />
			<EditTransformModal />
			<IonHeader>
				<IonToolbar>
					<IonButtons slot="start">
						<IonMenuButton />
					</IonButtons>
					<IonTitle>Transforms</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen>
				<IonList className="transforms units" lines="none">
					{transform.map((trans: WETransformObject, i: number) => (
						<IonItemSliding key={trans.key}>
							<IonItemOptions side="end">
								<IonItemOption color="tertiary" onClick={() => editTransform(trans.key)}>Edit</IonItemOption>
								<IonItemOption color="danger" onClick={() => maybeDeleteTransform(trans)}>Delete</IonItemOption>
							</IonItemOptions>
							<IonItem>
								<div className="upDownButtons ion-margin-end">
									{(transform.length === 1) ? ""
										: ((i === 0) ? (<IonIcon icon={chevronDownCircleOutline} key={"d_"+trans.key} onClick={() => moveDown(i)} style={ { marginLeft: "32px" } } />)
											: ((i + 1 === transform.length) ? (<IonIcon icon={chevronUpCircleOutline} key={"u_"+trans.key} onClick={() => moveUp(i)} style={ { marginRight: "32px" } } />)
												: [(<IonIcon icon={chevronUpCircleOutline} key={"u_"+trans.key} onClick={() => moveUp(i)} />), (<IonIcon icon={chevronDownCircleOutline} key={"d_"+trans.key} onClick={() => moveDown(i)} />)]))}
								</div>
								<IonLabel>
									<div className="transformExpression serifChars">
										<span className="seek">{trans.seek}</span>
										<span className="arrow">{makeArrow(trans.direction)}</span>
										<span className="replace">{trans.replace}</span>
									</div>
									<div className="description">{trans.description}</div>
								</IonLabel>
							</IonItem>
						</IonItemSliding>
					))}
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
