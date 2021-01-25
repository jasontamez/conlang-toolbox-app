import React from 'react';
import {
	IonContent,
	IonPage,
	IonHeader,
	IonToolbar,
	IonMenuButton,
	IonButtons,
	IonButton,
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
	helpOutline,
	chevronUpCircleOutline,
	chevronDownCircleOutline
} from 'ionicons/icons';
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import I from '../../components/IPA';
import { RewriteRuleObject, openModal, startEditRewriteRule, deleteRewriteRule, reorderRewriteRules } from '../../components/ReduxDucks';
import AddRewriteRuleModal from './M-AddRule';
import EditRewriteRuleModal from './M-EditRule';
import { $q, $togID } from '../../components/DollarSignExports';
import fireSwal from '../../components/Swal';
import '../WordGen.css';

const WGRew = () => {
	const dispatch = useDispatch();
	const rulesObject = useSelector((state: any) => state.rewriteRules, shallowEqual);
	const rules = rulesObject.list;
	const keys = rules.map((r: RewriteRuleObject) => r.key);
	const editRewriteRule = (label: any) => {
		$q(".rewriterules").closeSlidingItems();
		dispatch(startEditRewriteRule(label));
		dispatch(openModal('EditRewriteRule'));
	};
	const maybeDeleteRewriteRule = (label: any) => {
		fireSwal({
			title: "Delete " + label + "?",
			text: "Are you sure? This cannot be undone.",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: "Yes, delete it."
		}).then((result: any) => {
			if(result.isConfirmed) {
				dispatch(deleteRewriteRule(label));
				fireSwal({
					title: "Rewrite Rule deleted",
					customClass: {popup: 'dangerToast'},
					position: 'bottom',
					toast: true,
					timer: 2500,
					timerProgressBar: true,
					showConfirmButton: false
				});
			}
		});
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
					<IonButtons slot="end">
						<IonButton className="helpy" onClick={() => $togID('expanded', 'rewriteRuleCTE')} size="small" shape="round" color="primary" fill="outline">
							<IonIcon icon={helpOutline} size="small" />
						</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen>
				<div className="clickToExpand" id="rewriteRuleCTE">
					<p>
						This is where you define categories of sounds. The two simplest categories
						are <em>consonants</em> and <em>vowels</em>, but you may want to create multiple
						categories depending on how you want your language's syllables formed. For example,
						the consonants <I>pbk</I> in English may be followed by the consonants <I>lr</I> at
						the beginning of syllables. So you might choose them as categories, while also
						putting <I>pbklr</I> in a third category for general consonants.
					</p><p>
						These <strong>Categories</strong> of sounds will be used in
						the <strong>Syllables</strong> tab to generate your words.
					</p>
				</div>
				<IonList className="rewriterules units" lines="none">
					{rules.map((rr: RewriteRuleObject, i: number) => (
						<IonItemSliding key={rr.key}>
							<IonItemOptions side="end">
								<IonItemOption color="tertiary" onClick={() => editRewriteRule(rr.key)}>Edit</IonItemOption>
								<IonItemOption color="danger" onClick={() => maybeDeleteRewriteRule(rr.key)}>Delete</IonItemOption>
							</IonItemOptions>
							<IonItem>
								<div className="upDownButtons ion-margin-end">
									{(i === 0) ? (<IonIcon icon={chevronDownCircleOutline} key={"d_"+rr.key} onClick={() => moveDown(i)} />)
										: ((i + 1 === rules.length) ? (<IonIcon icon={chevronUpCircleOutline} key={"u_"+rr.key} onClick={() => moveUp(i)} />)
											: [(<IonIcon icon={chevronUpCircleOutline} key={"u_"+rr.key} onClick={() => moveUp(i)} />), (<IonIcon icon={chevronDownCircleOutline} key={"d_"+rr.key} onClick={() => moveDown(i)} />)])}
								</div>
								<IonLabel>
									<div className="ruleExpression">
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
