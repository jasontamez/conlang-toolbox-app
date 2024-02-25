import React, { useCallback, useState, FC } from 'react';
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

import { PageData, StateObject, WGTransformObject } from '../../store/types';
import { deleteTransformWG, rearrangeTransformsWG } from '../../store/wgSlice';
import useTranslator from '../../store/translationHooks';

import ModalWrap from "../../components/ModalWrap";
import { $q } from '../../components/DollarSignExports';
import ltr from '../../components/LTR';
import yesNoAlert from '../../components/yesNoAlert';
import toaster from '../../components/toaster';
import reorganize from '../../components/reorganizer';

import AddTransformModal from './modals/AddTransform';
import EditTransformModal from './modals/EditTransform';
import ExtraCharactersModal from '../modals/ExtraCharacters';
import { TransCard } from "./WGinfo";

interface TransformProps {
	trans: WGTransformObject
	editTransform: (x: WGTransformObject) => void
	maybeDeleteTransform: (x: WGTransformObject) => void
	arrow: string
}

const TransformItem: FC<TransformProps> = (props) => {
	const { trans, editTransform, maybeDeleteTransform, arrow } = props;
	const { id, seek, replace, description } = trans;
	const changer = useCallback(() => editTransform(trans), [trans, editTransform]);
	const deleter = useCallback(() => maybeDeleteTransform(trans), [trans, maybeDeleteTransform]);
	return (
		<IonItemSliding key={id}>
			<IonItemOptions>
				<IonItemOption
					color="primary"
					onClick={changer}
				>
					<IonIcon slot="icon-only" src="svg/edit.svg" />
				</IonItemOption>
				<IonItemOption
					color="danger"
					onClick={deleter}
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
};

const WGRew = (props: PageData) => {
	const [ tw ] = useTranslator('wgwe');
	const [ tc ] = useTranslator('common');
	const { modalPropsMaker } = props;
	const dispatch = useDispatch();
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [isOpenInfo, setIsOpenInfo] = useState<boolean>(false);
	const [isOpenAddTransform, setIsOpenAddTransform] = useState<boolean>(false);
	const [isOpenEditTransform, setIsOpenEditTransform] = useState<boolean>(false);
	const [editing, setEditing] = useState<WGTransformObject | null>(null);
	const [doAlert] = useIonAlert();
	const toast = useIonToast();
	const { transforms } = useSelector((state: StateObject) => state.wg);
	const { disableConfirms } = useSelector((state: StateObject) => state.appSettings);
	const arrow = (ltr() ? "⟶" : "⟵");
	const editTransform = useCallback((transform: WGTransformObject) => {
		const groups = $q<HTMLIonListElement>((".transforms"));
		groups && groups.closeSlidingItems();
		setEditing(transform);
		setIsOpenEditTransform(true);
	}, []);
	const maybeDeleteTransform = useCallback((transform: WGTransformObject) => {
		const groups = $q<HTMLIonListElement>((".transforms"));
		groups && groups.closeSlidingItems();
		const handler = () => {
			dispatch(deleteTransformWG(transform.id));
			toaster({
				message: tc("thingsDeleted", { count: 1, things: tw("Transform") }),
				duration: 2500,
				color: "danger",
				position: "top",
				toast
			});
		};
		if(disableConfirms) {
			handler();
		} else {
			const { seek, replace } = transform;
			yesNoAlert({
				header: `${seek}${arrow}${replace}`,
				message: tc("Are you sure you want to delete this? This cannot be undone."),
				cssClass: "danger",
				submit: tc("confirmDelIt"),
				handler,
				doAlert
			});
		}
	}, [dispatch, tc, tw, toast, doAlert, disableConfirms, arrow]);
	const doReorder = useCallback((event: CustomEvent) => {
		const ed = event.detail;
		const reorganized = reorganize<WGTransformObject>(transforms, ed.from, ed.to);
		dispatch(rearrangeTransformsWG(reorganized));
		ed.complete();
	}, [transforms, dispatch]);
	const maybeClearEverything = useCallback(() => {
		const count = transforms.length;
		const handler = () => {
			dispatch(deleteTransformWG(null));
			toaster({
				message: tc("thingsDeleted", { count, things: tw("Transforms", { count }) }),
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
				header: tc("Clear Everything?"),
				message: tw("delAllTransforms", { count }),
				cssClass: "warning",
				submit: tc("confirmDel", { count }),
				handler,
				doAlert
			});
		}
	}, [tc, tw, dispatch, disableConfirms, doAlert, toast, transforms.length]);
	const map = useCallback(
		(input: WGTransformObject) =>
			<TransformItem
				key={input.id}
				trans={input}
				editTransform={editTransform}
				maybeDeleteTransform={maybeDeleteTransform}
				arrow={arrow}
			/>,
		[editTransform, maybeDeleteTransform, arrow]
	);
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
			<ModalWrap {...modalPropsMaker(isOpenInfo, setIsOpenInfo)}>
				<TransCard setIsOpenInfo={setIsOpenInfo} />
			</ModalWrap>
			<IonHeader>
				<IonToolbar>
					<IonButtons slot="start">
						<IonMenuButton />
					</IonButtons>
					<IonTitle>{tw("Transformations")}</IonTitle>
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
						{transforms.map(map)}
					</IonReorderGroup>
				</IonList>
				<IonFab vertical="bottom" horizontal="end" slot="fixed">
					<IonFabButton
						color="tertiary"
						title={tc("Add New")}
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
