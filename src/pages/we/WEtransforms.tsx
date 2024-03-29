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

import { PageData, StateObject, WETransformObject } from '../../store/types';
import { deleteTransformWE, rearrangeTransformsWE } from '../../store/weSlice';

import ModalWrap from "../../components/ModalWrap";
import { $q } from '../../components/DollarSignExports';
import ltr from '../../components/LTR';
import ExtraCharactersModal from '../modals/ExtraCharacters';
import yesNoAlert from '../../components/yesNoAlert';
import toaster from '../../components/toaster';
import reorganize from '../../components/reorganizer';
import AddTransformModal from './modals/AddTransform';
import EditTransformModal from './modals/EditTransform';
import { TraCard } from "./WEinfo";

const WERew = (props: PageData) => {
	const { modalPropsMaker } = props;
	const dispatch = useDispatch();
	const [isOpenECM, setIsOpenECM] = useState<boolean>(false);
	const [isOpenInfo, setIsOpenInfo] = useState<boolean>(false);
	const [isOpenAddTransform, setIsOpenAddTransform] = useState<boolean>(false);
	const [isOpenEditTransform, setIsOpenEditTransform] = useState<boolean>(false);
	const [ editing, setEditing ] = useState<WETransformObject | null>(null);
	const [doAlert] = useIonAlert();
	const toast = useIonToast();
	const { disableConfirms } = useSelector((state: StateObject) => state.appSettings);
	const { transforms } = useSelector((state: StateObject) => state.we);
	const editTransform = (transform: WETransformObject) => {
		const groups = $q<HTMLIonListElement>((".transforms"));
		groups && groups.closeSlidingItems();
		setEditing(transform);
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
	const makeDescriptionOfDirection = (dir: string) => {
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
		const groups = $q<HTMLIonListElement>((".transforms"));
		groups && groups.closeSlidingItems();
		const handler = () => {
			dispatch(deleteTransformWE(trans.id));
			toaster({
				message: "Transform deleted.",
				duration: 2500,
				color: "danger",
				position: "top",
				toast
			});
		};
		if(disableConfirms) {
			handler();
		} else {
			const { seek, direction, replace } = trans;
			yesNoAlert({
				header: `${seek} ${makeArrow(direction)} ${replace}`,
				message: "Are you sure you want to delete this? It cannot be undone.",
				cssClass: "danger",
				submit: "Yes, delete it",
				handler,
				doAlert
			});
		}
	};
	const doReorder = (event: CustomEvent) => {
		const ed = event.detail;
		const reorganized = reorganize<WETransformObject>(transforms, ed.from, ed.to);
		dispatch(rearrangeTransformsWE(reorganized));
		ed.complete();
	};
	const maybeClearEverything = () => {
		const handler = () => {
			dispatch(deleteTransformWE(null));
			toaster({
				message: "Transformations have been deleted.",
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
			<AddTransformModal
				{...props.modalPropsMaker(isOpenAddTransform, setIsOpenAddTransform)}
				openECM={setIsOpenECM}
			/>
			<EditTransformModal
				{...props.modalPropsMaker(isOpenEditTransform, setIsOpenEditTransform)}
				openECM={setIsOpenECM}
				editing={editing}
				setEditing={setEditing}
			/>
			<ExtraCharactersModal {...modalPropsMaker(isOpenECM, setIsOpenECM)} />
			<ModalWrap {...modalPropsMaker(isOpenInfo, setIsOpenInfo)}>
				<TraCard setIsOpenInfo={setIsOpenInfo} />
			</ModalWrap>
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
					<IonReorderGroup
						disabled={false}
						className="hideWhileAdding"
						onIonItemReorder={doReorder}
					>
						{transforms.map((trans: WETransformObject) => {
							const { id, seek, direction, replace, description } = trans;
							return (
								<IonItemSliding key={id}>
									<IonItemOptions>
										<IonItemOption
											color="primary"
											onClick={() => editTransform(trans)}
										>
											<IonIcon slot="icon-only" src="svg/edit.svg" />
										</IonItemOption>
										<IonItemOption
											color="danger"
											onClick={() => maybeDeleteTransform(trans)}
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
												<span
													className="seek importantUnit"
												>{seek}</span>
												<span
													className="arrow unimportantUnit"
												>{makeArrow(direction)}</span>
												<span
													className="replace importantUnit"
												>{replace || String.fromCharCode(160)}</span>
												<span
													className="unimportantUnit"
												>{makeDescriptionOfDirection(direction)}</span>
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
						title="Add new transform"
						onClick={() => setIsOpenAddTransform(true)}
					>
						<IonIcon icon={addOutline} />
					</IonFabButton>
				</IonFab>
			</IonContent>
		</IonPage>
	);
};

export default WERew;
