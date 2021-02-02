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
	IonLabel
} from '@ionic/react';
import {
	addOutline,
	chevronUpCircleOutline,
	chevronDownCircleOutline
} from 'ionicons/icons';
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { WGRewriteRuleObject, openModal, startEditRewriteRule, deleteRewriteRule, reorderRewriteRules } from '../../components/ReduxDucks';
import AddRewriteRuleModal from './M-AddRule';
import EditRewriteRuleModal from './M-EditRule';
import { $q } from '../../components/DollarSignExports';
import fireSwal from '../../components/Swal';
import '../WordGen.css';

const WGRew = () => {
	const dispatch = useDispatch();
	const state = useSelector((state: any) => state, shallowEqual);
	const rulesObject = state.rewriteRules;
	const rules = rulesObject.list;
	const keys = rules.map((r: WGRewriteRuleObject) => r.key);
	const editRewriteRule = (label: any) => {
		$q(".rewriterules").closeSlidingItems();
		dispatch(startEditRewriteRule(label));
		dispatch(openModal('EditRewriteRule'));
	};
	const settings = state.appSettings;
	const maybeDeleteRewriteRule = (label: any, seek: any, replace: any) => {
		$q(".rewriterules").closeSlidingItems();
		const thenFunc = (result: any) => {
			if(result.isConfirmed) {
				dispatch(deleteRewriteRule(label));
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
				title: "Delete " + seek + "➜" + replace + "?",
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
		dispatch(reorderRewriteRules(begin.concat(moving, moved, end)));
	};
	const moveDown = (i: number) => {
		let begin = keys.slice(0, i);
		let end = keys.slice(i + 1);
		let moved = end.shift();
		let moving = keys[i];
		dispatch(reorderRewriteRules(begin.concat(moved, moving, end)));
	};
	return (
		<IonPage>
			<AddRewriteRuleModal />
			<EditRewriteRuleModal />
			<IonHeader>
				<IonToolbar>
					<IonButtons slot="start">
						<IonMenuButton />
					</IonButtons>
					<IonTitle>Rewrite Rules</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen>
				<IonList className="rewriterules units" lines="none">
					{rules.map((rr: WGRewriteRuleObject, i: number) => (
						<IonItemSliding key={rr.key}>
							<IonItemOptions side="end">
								<IonItemOption color="tertiary" onClick={() => editRewriteRule(rr.key)}>Edit</IonItemOption>
								<IonItemOption color="danger" onClick={() => maybeDeleteRewriteRule(rr.key, rr.seek, rr.replace)}>Delete</IonItemOption>
							</IonItemOptions>
							<IonItem>
								<div className="upDownButtons ion-margin-end">
									{(rules.length === 1) ? ""
										: ((i === 0) ? (<IonIcon icon={chevronDownCircleOutline} key={"d_"+rr.key} onClick={() => moveDown(i)} style={ { marginLeft: "32px" } } />)
											: ((i + 1 === rules.length) ? (<IonIcon icon={chevronUpCircleOutline} key={"u_"+rr.key} onClick={() => moveUp(i)} style={ { marginRight: "32px" } } />)
												: [(<IonIcon icon={chevronUpCircleOutline} key={"u_"+rr.key} onClick={() => moveUp(i)} />), (<IonIcon icon={chevronDownCircleOutline} key={"d_"+rr.key} onClick={() => moveDown(i)} />)]))}
								</div>
								<IonLabel>
									<div className="ruleExpression serifChars">
										<span className="seek">{rr.seek}</span>
										<span className="arrow">➜</span>
										<span className="replace">{rr.replace}</span>
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
