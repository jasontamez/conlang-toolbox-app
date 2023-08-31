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
import { PageData, WETransformObject } from '../../components/ReduxDucksTypes';
import {
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
	const { modalPropsMaker } = props;
	const dispatch = useDispatch();
	const [isOpenECM, setIsOpenECM] = useState<boolean>(false);
	const [isOpenInfo, setIsOpenInfo] = useState<boolean>(false);
	const [isOpenAddTransform, setIsOpenAddTransform] = useState<boolean>(false);
	const [isOpenEditTransform, setIsOpenEditTransform] = useState<boolean>(false);
	const viewInfo = ['we', 'transformations'];
	useIonViewDidEnter(() => {
		dispatch(changeView(viewInfo));
	});
	const [transformObject, settings] = useSelector((state: any) => [state.wordevolveTransforms, state.appSettings], shallowEqual);
	const transform = transformObject.list;
	const editTransform = (label: any) => {
		$q(".transforms").closeSlidingItems();
		dispatch(startEditTransformWE(label));
		setIsOpenEditTransform(true);
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
			const moved = what[from];
			const remains = what.slice(0, from).concat(what.slice(from + 1));
			return remains.slice(0, to).concat(moved, remains.slice(to));
		};
		const ed = event.detail;
		const reorganized = reorganize(transform, ed.from, ed.to);
		dispatch(reorderTransformsWE(reorganized));
		ed.complete();
	};
	return (
		<IonPage>
			<AddTransformModal {...props.modalPropsMaker(isOpenAddTransform, setIsOpenAddTransform)} openECM={setIsOpenECM} />
			<EditTransformModal {...props.modalPropsMaker(isOpenEditTransform, setIsOpenEditTransform)} openECM={setIsOpenECM} />
			<ExtraCharactersModal {...modalPropsMaker(isOpenECM, setIsOpenECM)} />
			<ModalWrap {...modalPropsMaker(isOpenInfo, setIsOpenInfo)}><TraCard /></ModalWrap>
			<IonHeader>
				<IonToolbar>
					<IonButtons slot="start">
						<IonMenuButton />
					</IonButtons>
					<IonTitle>Transformations</IonTitle>
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
				<IonList className="transforms units dragArea" lines="none">
					<IonReorderGroup disabled={false} className="hideWhileAdding" onIonItemReorder={doReorder}>
						{transform.map((trans: WETransformObject) => {
							const { key, seek, direction, replace, description } = trans;
							return (
								<IonItemSliding key={key}>
									<IonItemOptions>
										<IonItemOption color="primary" onClick={() => editTransform(key)}>
											<IonIcon slot="icon-only" src="svg/edit.svg" />
										</IonItemOption>
										<IonItemOption color="danger" onClick={() => maybeDeleteTransform(trans)}>
											<IonIcon slot="icon-only" icon={trash} />
										</IonItemOption>
									</IonItemOptions>
									<IonItem>
										<IonReorder className="dragHandle ion-margin-end"><IonIcon icon={reorderTwo} className="dragHandle" /></IonReorder>
										<IonLabel className="wrappableInnards">
											<div className="importantElement serifChars">
												<span className="seek importantUnit">{seek}</span>
												<span className="arrow unimportantUnit">{makeArrow(direction)}</span>
												<span className="replace importantUnit">{replace || String.fromCharCode(160)}</span>
												<span className="unimportantUnit">{makeDeclaration(direction)}</span>
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
					<IonFabButton color="tertiary" title="Add new transform" onClick={() => setIsOpenAddTransform(true)}>
						<IonIcon icon={addOutline} />
					</IonFabButton>
				</IonFab>
			</IonContent>
		</IonPage>
	);
};

export default WERew;
