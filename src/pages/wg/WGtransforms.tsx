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
	globeOutline,
	trashBinOutline
} from 'ionicons/icons';
import { useSelector, useDispatch } from "react-redux";

import { PageData, StateObject, ViewState, WGTransformObject } from '../../store/types';
import { deleteTransformWG, rearrangeTransformsWG } from '../../store/wgSlice';
import { saveView } from '../../store/viewSlice';

import ModalWrap from "../../components/ModalWrap";
import { $q } from '../../components/DollarSignExports';
import ltr from '../../components/LTR';
import yesNoAlert from '../../components/yesNoAlert';
import toaster from '../../components/toaster';

import AddTransformModal from './modals/AddTransform';
import EditTransformModal from './modals/EditTransform';
import ExtraCharactersModal from '../modals/ExtraCharacters';
import { TransCard } from "./WGCards";

const WGRew = (props: PageData) => {
	const { modalPropsMaker } = props;
	const dispatch = useDispatch();
	const viewInfo = { key: "wg" as keyof ViewState, page: "transforms" };
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [isOpenInfo, setIsOpenInfo] = useState<boolean>(false);
	const [isOpenAddTransform, setIsOpenAddTransform] = useState<boolean>(false);
	const [isOpenEditTransform, setIsOpenEditTransform] = useState<boolean>(false);
	const [editing, setEditing] = useState<WGTransformObject | null>(null);
	useIonViewDidEnter(() => {
		dispatch(saveView(viewInfo));
	});
	const [doAlert] = useIonAlert();
	const [doToast, undoToast] = useIonToast();
	const { transforms } = useSelector((state: StateObject) => state.wg);
	const { disableConfirms } = useSelector((state: StateObject) => state.appSettings);
	const arrow = (ltr() ? "⟶" : "⟵");
	const editTransform = (transform: WGTransformObject) => {
		$q(".transforms").closeSlidingItems();
		setEditing(transform);
		setIsOpenEditTransform(true);
	};
	const maybeDeleteTransform = (transform: WGTransformObject) => {
		$q(".transforms").closeSlidingItems();
		const handler = () => {
			dispatch(deleteTransformWG(transform.id));
			toaster({
				message: "Transformation deleted.",
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
		dispatch(rearrangeTransformsWG(reorganized));
		ed.complete();
	};
	const maybeClearEverything = () => {
		const handler = () => {
			dispatch(deleteTransformWG(null));
			toaster({
				message: "Transformations deleted.",
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
			yesNoAlert({
				header: "Clear All Transformations?",
				message: "This will delete all current transformations, and cannot be undone.",
				cssClass: "warning",
				submit: "Yes, Delete Them",
				handler,
				doAlert
			});
		}
	};
	return (
		<IonPage>
			<AddTransformModal {...props.modalPropsMaker(isOpenAddTransform, setIsOpenAddTransform)}
				openECM={setIsOpen}
			/>
			<EditTransformModal
				{...props.modalPropsMaker(isOpenEditTransform, setIsOpenEditTransform)}
				openECM={setIsOpen}
				editing={editing}
				setEditing={setEditing}
			/>
			<ExtraCharactersModal {...modalPropsMaker(isOpen, setIsOpen)} />
			<ModalWrap {...modalPropsMaker(isOpenInfo, setIsOpenInfo)}><TransCard /></ModalWrap>
			<IonHeader>
				<IonToolbar>
					<IonButtons slot="start">
						<IonMenuButton />
					</IonButtons>
					<IonTitle>Transformations</IonTitle>
					<IonButtons slot="end">
						{transforms.length > 0 ?
							<IonButton onClick={() => maybeClearEverything()}>
								<IonIcon icon={trashBinOutline} />
							</IonButton>
						:
							<></>
						}
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
					<IonReorderGroup
						disabled={false}
						className="hideWhileAdding"
						onIonItemReorder={doReorder}
					>
						{transforms.map((transform: WGTransformObject) => {
							const { id, seek, replace, description } = transform;
							return (
								<IonItemSliding key={id}>
									<IonItemOptions>
										<IonItemOption
											color="primary"
											onClick={() => editTransform(transform)}
										>
											<IonIcon slot="icon-only" src="svg/edit.svg" />
										</IonItemOption>
										<IonItemOption
											color="danger"
											onClick={() => maybeDeleteTransform(transform)}
										>
											<IonIcon slot="icon-only" icon={trash} />
										</IonItemOption>
									</IonItemOptions>
									<IonItem>
										<IonReorder className="dragHandle ion-margin-end">
											<IonIcon icon={reorderTwo} className="dragHandle" />
										</IonReorder>
										<IonLabel className="wrappableInnards">
											<div className="importantElement serifChars">
												<span className="seek importantUnit">{seek}</span>
												<span className="arrow unimportantUnit">{arrow}</span>
												<span className="replace importantUnit">
													{replace || String.fromCharCode(160)}
												</span>
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
					<IonFabButton
						color="tertiary"
						title="Add new transformation"
						onClick={() => setIsOpenAddTransform(true)}
					>
						<IonIcon icon={addOutline} />
					</IonFabButton>
				</IonFab>
			</IonContent>
		</IonPage>
	);
};

export default WGRew;
