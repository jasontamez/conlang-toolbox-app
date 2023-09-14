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
	IonButton,
	IonTitle,
	IonIcon,
	IonList,
	IonItem,
	IonLabel,
	IonReorder,
	IonReorderGroup,
	useIonViewDidEnter,
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
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { PageData, WGTransformObject } from '../../components/ReduxDucksTypes';
import {
	startEditTransformWG,
	deleteTransformWG,
	reorderTransformsWG,
	changeView
} from '../../components/ReduxDucksFuncs';
import AddTransformModal from './M-AddTransform';
import EditTransformModal from './M-EditTransform';
import { RewCard } from "./WGCards";
import ModalWrap from "../../components/ModalWrap";
import { $q } from '../../components/DollarSignExports';
import ltr from '../../components/LTR';
import ExtraCharactersModal from '../M-ExtraCharacters';
import yesNoAlert from '../../components/yesNoAlert';
import toaster from '../../components/toaster';

const WGRew = (props: PageData) => {
	const { modalPropsMaker } = props;
	const dispatch = useDispatch();
	const viewInfo = ['wg', 'transforms'];
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [isOpenInfo, setIsOpenInfo] = useState<boolean>(false);
	const [isOpenAddTransform, setIsOpenAddTransform] = useState<boolean>(false);
	const [isOpenEditTransform, setIsOpenEditTransform] = useState<boolean>(false);
	useIonViewDidEnter(() => {
		dispatch(changeView(viewInfo));
	});
	const [doAlert] = useIonAlert();
	const [doToast, undoToast] = useIonToast();
	const [transformsObject, settings] = useSelector((state: any) => [state.wordgenTransforms, state.appSettings], shallowEqual);
	const transforms = transformsObject.list;
	const arrow = (ltr() ? "⟶" : "⟵");
	const editTransform = (label: any) => {
		$q(".transforms").closeSlidingItems();
		dispatch(startEditTransformWG(label));
		setIsOpenEditTransform(true);
	};
	const maybeDeleteTransform = (transform: WGTransformObject) => {
		$q(".transforms").closeSlidingItems();
		const handler = () => {
			dispatch(deleteTransformWG(transform));
			toaster({
				message: "Transformation deleted.",
				duration: 2500,
				color: "danger",
				position: "top",
				doToast,
				undoToast
			});
		};
		if(settings.disableConfirms) {
			handler();
		} else {
			const { seek, replace } = transform;
			yesNoAlert({
				header: `${seek}${arrow}${replace}`,
				message: "Are you sure you want to delete this? It cannot be undone.",
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
		const reorganized = reorganize(transforms, ed.from, ed.to);
		dispatch(reorderTransformsWG(reorganized));
		ed.complete();
	};
	return (
		<IonPage>
			<AddTransformModal {...props.modalPropsMaker(isOpenAddTransform, setIsOpenAddTransform)} openECM={setIsOpen} />
			<EditTransformModal {...props.modalPropsMaker(isOpenEditTransform, setIsOpenEditTransform)} openECM={setIsOpen} />
			<ExtraCharactersModal {...modalPropsMaker(isOpen, setIsOpen)} />
			<ModalWrap {...modalPropsMaker(isOpenInfo, setIsOpenInfo)}><RewCard /></ModalWrap>
			<IonHeader>
				<IonToolbar>
					<IonButtons slot="start">
						<IonMenuButton />
					</IonButtons>
					<IonTitle>Transformations</IonTitle>
					<IonButtons slot="end">
						<IonButton onClick={() => setIsOpen(true)}>
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
						{transforms.map((transform: WGTransformObject) => {
							const { key, seek, replace, description } = transform;
							return (
								<IonItemSliding key={key}>
									<IonItemOptions>
										<IonItemOption color="primary" onClick={() => editTransform(key)}>
											<IonIcon slot="icon-only" src="svg/edit.svg" />
										</IonItemOption>
										<IonItemOption color="danger" onClick={() => maybeDeleteTransform(transform)}>
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
					<IonFabButton color="tertiary" title="Add new transformation" onClick={() => setIsOpenAddTransform(true)}>
						<IonIcon icon={addOutline} />
					</IonFabButton>
				</IonFab>
			</IonContent>
		</IonPage>
	);
};

export default WGRew;
