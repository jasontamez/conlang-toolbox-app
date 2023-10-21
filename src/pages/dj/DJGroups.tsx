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
	IonItemSliding,
	IonItemOptions,
	IonItemOption,
	useIonAlert,
	useIonToast
} from '@ionic/react';
import {
	addOutline,
//	helpCircleOutline,
	trash,
	globeOutline,
	trashBinOutline
} from 'ionicons/icons';
import { useSelector, useDispatch } from "react-redux";

import { DJGroup, Declenjugation, PageData, StateObject } from '../../store/types';
import { deleteGroup } from '../../store/declenjugatorSlice';

import { $q } from '../../components/DollarSignExports';
import yesNoAlert from '../../components/yesNoAlert';
import toaster from '../../components/toaster';

//import EditTransformModal from './modals/EditTransform';
import ExtraCharactersModal from '../modals/ExtraCharacters';
import AddGroup from './modals/AddGroup';
import AddDeclenjugation from './modals/AddDeclenjugation';
//import EditDeclenjugation from './modals/EditTransform';

function makeDeclenjugationDescription (group: DJGroup) {
	const { startsWith, endsWith, regex, separator } = group;
	if(regex) {
		const [match, replace] = regex;
		return `/${match}/ => ${replace}`;
	}
	const total = startsWith.map(line => line + "-").concat(endsWith.map(line => "-" + line));
	return total.join(separator);
}

// TO-DO: add ability to reorder groups
// TO-DO: add ability to collapse declenjugations

const DJGroups = (props: PageData) => {
	const { modalPropsMaker } = props;
	const dispatch = useDispatch();
	// main modals
	const [isOpenAddGroup, setIsOpenAddGroup] = useState<boolean>(false);
//	const [isOpenEditGroup, setIsOpenEditGroup] = useState<boolean>(false);
	const [isOpenECM, setIsOpenECM] = useState<boolean>(false);
	// submodal: add declenjugation
	const [addDeclenjugationOpen, setAddDeclenjugationOpen] = useState<boolean>(false);
	const [savedDeclenjugation, setSavedDeclenjugation] = useState<Declenjugation | null>(null);
	// submodal: edit declenjugation
	const [editDeclenjugationOpen, setEditDeclenjugationOpen] = useState<boolean>(false);
	const [incomingDeclenjugation, setIncomingDeclenjugation] = useState<Declenjugation | null>(null);
	const [outgoingDeclenjugation, setOutgoingDeclenjugation] = useState<Declenjugation | null | string>(null);

	const [doAlert] = useIonAlert();
	const [doToast, undoToast] = useIonToast();
	const { declenjugationGroups } = useSelector((state: StateObject) => state.dj);
	const { disableConfirms } = useSelector((state: StateObject) => state.appSettings);

	const addDeclenjugationModalInfo = modalPropsMaker(addDeclenjugationOpen, setAddDeclenjugationOpen);
	const editDeclenjugationModalInfo = modalPropsMaker(editDeclenjugationOpen, setEditDeclenjugationOpen);

	const editGroup = (transform: DJGroup) => {
		$q(".djGroups").closeSlidingItems();
//		setEditing(transform);
//		setIsOpenEditTransform(true);
	};
	const maybeDeleteGroup = (transform: DJGroup) => {
		$q(".djGroups").closeSlidingItems();
//		setEditing(transform);
//		setIsOpenEditTransform(true);
	};
if(incomingDeclenjugation) {
	// delete this later
}
	const maybeClearEverything = () => {
		const handler = () => {
			dispatch(deleteGroup(null));
			toaster({
				message: "Groups deleted.",
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
				header: "Clear All Groups?",
				message: "This will delete all current groups, and it cannot be undone.",
				cssClass: "warning",
				submit: "Yes, Delete Them",
				handler,
				doAlert
			});
		}
	};
	return (
		<IonPage>
			<AddGroup
				{...modalPropsMaker(isOpenAddGroup, setIsOpenAddGroup)}
				openECM={setIsOpenECM}

				addDeclenjugationModalInfo={addDeclenjugationModalInfo}
				savedDeclenjugation={savedDeclenjugation}
				setSavedDeclenjugation={setSavedDeclenjugation}

				editDeclenjugationModalInfo={editDeclenjugationModalInfo}
				setIncomingDeclenjugation={setIncomingDeclenjugation}
				outgoingDeclenjugation={outgoingDeclenjugation}
				setOutgoingDeclenjugation={setOutgoingDeclenjugation}
			/>
			<AddDeclenjugation
				{...addDeclenjugationModalInfo}
				openECM={setIsOpenECM}
				setSavedDeclenjugation={setSavedDeclenjugation}
			/>
{/*			<EditDeclenjugation
				{...editDeclenjugationModalInfo}
				incomingDeclenjugation={incomingDeclenjugation}
				setOutgoingDeclenjugation={setOutgoingDeclenjugation}
			/>

			<EditTransformModal
				{...modalPropsMaker(isOpenEditGroup, setIsOpenEditGroup)}
				openECM={setIsOpen}
				editing={editing}
				setEditing={setEditing}
			/> */}
			<ExtraCharactersModal {...modalPropsMaker(isOpenECM, setIsOpenECM)} />
			<IonHeader>
				<IonToolbar>
					<IonButtons slot="start">
						<IonMenuButton />
					</IonButtons>
					<IonTitle>Groups</IonTitle>
					<IonButtons slot="end">
						{declenjugationGroups.length > 0 ?
							<IonButton onClick={() => maybeClearEverything()}>
								<IonIcon icon={trashBinOutline} />
							</IonButton>
						:
							<></>
						}
						<IonButton onClick={() => setIsOpenECM(true)}>
							<IonIcon icon={globeOutline} />
						</IonButton>
{/*						<IonButton onClick={() => setIsOpenInfo(true)}>
							<IonIcon icon={helpCircleOutline} />
						</IonButton>*/}
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen className="hasFabButton">
				<IonList className="djGroups units dragArea" lines="full">
					{declenjugationGroups.map((group: DJGroup) => {
						const { title, id: mainID, declenjugations } = group;
						const max = declenjugations.length - 1;
						return (
							<React.Fragment key={mainID}>
								<IonItemSliding className="djGroupMain">
									<IonItemOptions>
										<IonItemOption
											color="primary"
											onClick={() => editGroup(group)}
										>
											<IonIcon slot="icon-only" src="svg/edit.svg" />
										</IonItemOption>
										<IonItemOption
											color="danger"
											onClick={() => maybeDeleteGroup(group)}
										>
											<IonIcon slot="icon-only" icon={trash} />
										</IonItemOption>
									</IonItemOptions>
									<IonItem lines="none">
										<IonLabel className="wrappableInnards">
											<div><strong>{title}</strong></div>
											<div className="description"><em>{makeDeclenjugationDescription(group)}</em></div>
										</IonLabel>
										<IonIcon size="small" slot="end" src="svg/slide-indicator.svg" />
									</IonItem>
								</IonItemSliding>
								{declenjugations.map((dj, i) => {
									const { title, id, prefix, suffix, regex, useWholeWord } = dj;
									let root = "";
									if(regex) {
										root = "(regex)";
									} else {
										root = "-";
										prefix && (root = prefix + root);
										suffix && (root = root + suffix);
									}
									return (
										<IonItem
											className="djGroupInfo"
											lines={max === i ? "full" : "none"}
											key={`${mainID}/${id}`}
										>
											<div><strong>{title}</strong></div>
											<div slot="end">
												<em>{root}</em>
												{
													useWholeWord ?
														<em style={{fontSize: "0.25rem"}}>[W]</em>
													:
														<></>
												}
											</div>
										</IonItem>
									);
								})}
							</React.Fragment>
						);
					})}
				</IonList>
				<IonFab vertical="bottom" horizontal="end" slot="fixed">
					<IonFabButton
						color="tertiary"
						title="Add new group"
						onClick={() => setIsOpenAddGroup(true)}
					>
						<IonIcon icon={addOutline} />
					</IonFabButton>
				</IonFab>
			</IonContent>
		</IonPage>
	);
};

export default DJGroups;

/*
function makeDescription (group: DJGroup) {
	const { usingAND, inverse, equals, startsWith, endsWith, regex, separator } = group;
	if(regex.length > 0) {
		return "(regular expressions)";
	}
	if(usingAND) {
		if(
			(equals.length > 1 || startsWith.length > 1 || endsWith.length > 1)
			|| (equals.length && (startsWith.length + endsWith.length))
			|| (equals.length + startsWith.length + endsWith.length === 0)
		) {
			return "(invalid)";
		}
		if(equals.length) {
			return (inverse ? "not " : "") + equals[0];
		}
		if(startsWidth.length) {
			if(endsWith.length) {
				return `${(inverse ? "not " : "")}${startsWith[0]}-${endsWith[0]}`;
			}
			return `${(inverse ? "not " : "")}${startsWith[0]}-`;
		}
		return `${(inverse ? "not " : "")}-${endsWith[0]}`;
	}
	const total = equals.slice().concat(
		startsWith.map(line => line + "-"),
		endsWith.map(line => "-" + line)
	);
	return `${(inverse ? "not " : "")}${total.join(separator)}`;
}
*/
