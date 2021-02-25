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
	IonItem,
	IonLabel,
	IonReorder,
	IonReorderGroup,
	useIonViewDidEnter
} from '@ionic/react';
import {
	addOutline,
	helpCircleOutline,
	reorderTwo,
	construct,
	trash
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
	const doReorder = (event: CustomEvent) => {
		const reorganize = (what: any[], from: number, to: number) => {
			let moved = what[from];
			let remains = what.slice(0, from).concat(what.slice(from + 1));
			return remains.slice(0, to).concat(moved, remains.slice(to));
		};
		const ed = event.detail;
		const reorganized = reorganize(rules, ed.from, ed.to);
		dispatch(reorderRewriteRulesWG(reorganized));
		ed.complete();
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
					<IonReorderGroup disabled={false} className="hideWhileAdding" onIonItemReorder={doReorder}>
						{rules.map((rr: WGRewriteRuleObject) => {
							return (
								<IonItem key={rr.key}>
									<IonReorder className="dragHandle ion-margin-end"><IonIcon icon={reorderTwo} className="dragHandle" /></IonReorder>
									<IonLabel>
										<div className="importantElement serifChars">
											<span className="seek importantUnit">{rr.seek}</span>
											<span className="arrow unimportantUnit">{arrow}</span>
											<span className="replace importantUnit">{rr.replace}</span>
										</div>
										<div className="description">{rr.description}</div>
									</IonLabel>
									<IonButton className="ion-margin-end" color="warning" onClick={() => editRewriteRule(rr.key)}>
										<IonIcon icon={construct} style={ { margin: 0 } } />
									</IonButton>
									<IonButton className="ion-margin-end ion-hide-sm-down" color="danger" onClick={() => maybeDeleteRewriteRule(rr)}>
										<IonIcon icon={trash} style={ { margin: 0 } } />
									</IonButton>
								</IonItem>
							);
						})}
					</IonReorderGroup>
				</IonList>
				<IonFab vertical="bottom" horizontal="end" slot="fixed">
					<IonFabButton color="tertiary" title="Add new rewrite rule" onClick={() => dispatch(openModal('AddRewriteRule'))}>
						<IonIcon icon={addOutline} />
					</IonFabButton>
				</IonFab>
				<div style={ { display: "none" } } id="superHidden"></div>
			</IonContent>
		</IonPage>
	);
};

export default WGRew;
