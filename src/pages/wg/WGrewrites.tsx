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
	IonButton,
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
	chevronDownCircleOutline,
	helpCircleOutline
} from 'ionicons/icons';
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { WGRewriteRuleObject } from '../../components/ReduxDucksTypes';
import {
	openModal,
	startEditRewriteRuleWG,
	deleteRewriteRuleWG,
	reorderRewriteRulesWG,
	changeView
} from '../../components/ReduxDucksFuncs';
import AddRewriteRuleModal from './M-AddRule';
import EditRewriteRuleModal from './M-EditRule';
import { RewCard } from "./WGCards";
import ModalWrap from "../../components/ModalWrap";
import { $q } from '../../components/DollarSignExports';
import fireSwal from '../../components/Swal';

const WGRew = () => {
	const dispatch = useDispatch();
	const viewInfo = ['wg', 'rewriterules'];
	useIonViewDidEnter(() => {
		dispatch(changeView(viewInfo));
	});
	const [rulesObject, settings] = useSelector((state: any) => [state.wordgenRewriteRules, state.appSettings], shallowEqual);
	const rules = rulesObject.list;
	const keys = rules.map((r: WGRewriteRuleObject) => r.key);
	const style = window.getComputedStyle($q("body"));
	const ltr = style.direction === "ltr";
	const arrow = (ltr ? "⟶" : "⟵");
	const editRewriteRule = (label: any) => {
		$q(".rewriterules").closeSlidingItems();
		dispatch(startEditRewriteRuleWG(label));
		dispatch(openModal('EditRewriteRule'));
	};
	const maybeDeleteRewriteRule = (rule: WGRewriteRuleObject) => {
		$q(".rewriterules").closeSlidingItems();
		const thenFunc = (result: any) => {
			if(result.isConfirmed) {
				dispatch(deleteRewriteRuleWG(rule));
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
			fireSwal({
				title: "Delete " + rule.seek + arrow + rule.replace + "?",
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
		dispatch(reorderRewriteRulesWG(begin.concat(moving, moved, end)));
	};
	const moveDown = (i: number) => {
		let begin = keys.slice(0, i);
		let end = keys.slice(i + 1);
		let moved = end.shift();
		let moving = keys[i];
		dispatch(reorderRewriteRulesWG(begin.concat(moved, moving, end)));
	};
	return (
		<IonPage>
			<AddRewriteRuleModal />
			<EditRewriteRuleModal />
			<ModalWrap pageInfo={viewInfo} content={RewCard} />
			<IonHeader>
				<IonToolbar>
					<IonButtons slot="start">
						<IonMenuButton />
					</IonButtons>
					<IonTitle>Rewrite Rules</IonTitle>
					<IonButtons slot="end">
						<IonButton onClick={() => dispatch(openModal("InfoModal"))}>
							<IonIcon icon={helpCircleOutline} />
						</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen>
				<IonList className="rewriterules units" lines="none">
					{rules.map((rr: WGRewriteRuleObject, i: number) => (
						<IonItemSliding key={rr.key}>
							<IonItemOptions side="end">
								<IonItemOption color="tertiary" onClick={() => editRewriteRule(rr.key)}>Edit</IonItemOption>
								<IonItemOption color="danger" onClick={() => maybeDeleteRewriteRule(rr)}>Delete</IonItemOption>
							</IonItemOptions>
							<IonItem>
								<div className="upDownButtons ion-margin-end">
									{(rules.length === 1) ? ""
										: ((i === 0) ? (<IonIcon icon={chevronDownCircleOutline} key={"d_"+rr.key} onClick={() => moveDown(i)} style={ { marginLeft: "32px" } } />)
											: ((i + 1 === rules.length) ? (<IonIcon icon={chevronUpCircleOutline} key={"u_"+rr.key} onClick={() => moveUp(i)} style={ { marginRight: "32px" } } />)
												: [(<IonIcon icon={chevronUpCircleOutline} key={"u_"+rr.key} onClick={() => moveUp(i)} />), (<IonIcon icon={chevronDownCircleOutline} key={"d_"+rr.key} onClick={() => moveDown(i)} />)]))}
								</div>
								<IonLabel>
									<div className="importantElement serifChars">
										<span className="seek importantUnit">{rr.seek}</span>
										<span className="arrow unimportantUnit">{arrow}</span>
										<span className="replace importantUnit">{rr.replace}</span>
									</div>
									<div className="description">{rr.description}</div>
								</IonLabel>
							</IonItem>
						</IonItemSliding>
					))}
				</IonList>
				<IonFab vertical="bottom" horizontal="end" slot="fixed">
					<IonFabButton color="tertiary" title="Add new rewrite rule" onClick={() => dispatch(openModal('AddRewriteRule'))}>
						<IonIcon icon={addOutline} />
					</IonFabButton>
				</IonFab>
			</IonContent>
		</IonPage>
	);
};

export default WGRew;
