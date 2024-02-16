import React from 'react';
import {
	IonButton,
	IonCard,
	IonCardContent,
	IonContent,
	IonHeader,
	IonIcon,
	IonItem,
	IonLabel,
	IonPage
} from '@ionic/react';
import {
	helpCircle,
	logInOutline,
	logOutOutline,
	reorderThree
} from 'ionicons/icons';

import { PageData, SetBooleanState } from '../../store/types';
import useTranslator from '../../store/translationHooks';

import Header from '../../components/Header';
import { DJGroupsIcon, DeclenjugatorIcon } from '../../components/icons';
import { RegularExpressions } from '../../components/regularExpressionsInfo';

interface CardProps {
	hideOverview?: boolean
	setIsOpenInfo?: SetBooleanState
}
const OverviewButton = (props: CardProps) => {
	const { hideOverview, setIsOpenInfo } = props;
	if(hideOverview) {
		return <></>;
	}
	return (
		<IonButton
			color="secondary"
			slot="end"
			routerLink="/dj/overview"
			routerDirection="forward"
			onClick={() => setIsOpenInfo && setIsOpenInfo(false)}
		>
			<IonIcon icon={helpCircle} />
		</IonButton>
	);
};

export const InputCard = (props: CardProps) => {
	const [ t ] = useTranslator('dj');
	const [ tc ] = useTranslator('common');
	return (
		<IonCard>
			<IonItem lines="full">
				<IonIcon icon={logInOutline} slot="start" color="primary" />
				<IonLabel>{t("Input Tab")}</IonLabel>
				<OverviewButton {...props} />
			</IonItem>
			<IonCardContent>
				<p>{t("info.input1")}</p>
				<p>
					{t("info.input2p1")}
					<strong>{tc("Import from Lexicon")}</strong>
					{t("info.input2p2")}
					<strong>{tc("Lexicon")}</strong>
					{t("info.input2p3")}
				</p>
				<p>{t("info.input3p1")}<strong>{tc("Clear")}</strong>{t("info.input3p2")}</p>
			</IonCardContent>
		</IonCard>
	);
};

export const GroupCard = (props: CardProps) => {
	const [ t ] = useTranslator('dj');
	const [ tc ] = useTranslator('common');
	return (
		<IonCard>
			<IonItem lines="full">
				<DJGroupsIcon slot="start" color="primary" />
				<IonLabel>{t("Groups Tab")}</IonLabel>
				<OverviewButton {...props} />
			</IonItem>
			<IonCardContent>
				<p>{t("info.groups1")}</p>
				<hr />
				<p>
					{t("info.groups2p1")}
					<em>{t("declension")}</em>
					{t("info.groups2p2")}
					<em>{t("conjugation")}</em>
					{t("info.groups2p3")}
					<em>{t("other")}</em>
					{t("info.groups2p4")}
				</p>
				<p>{t("info.groups3")}</p>
				<p>
					{t("info.groups4p1")}
					<em>{t("info.groups4p2")}</em>
					{t("info.groups4p3")}
					<strong>{tc("regular expressions")}</strong>
					{t("info.groups4p4")}
				</p>
				<hr />
				<p>{t("info.groups5")}</p>
				<p>{t("info.groups6")}</p>
				<p>{t("info.groups7")}</p>
				<p>{t("info.groups8")}</p>
				<hr />
				<p>
					{t("info.groups9p1")}
					<IonIcon icon={reorderThree} color="secondary" />
					{t("info.groups9p2")}
				</p>
				<p>{t("info.groups10")}</p>
				<div className="example">
					<div className="title">{t("Group")}</div>
					<ul className="simple">
						<li><strong>{tc("Title")}</strong>{t("info.colon")} {t("Conjugations")} (A)</li>
						<li><strong>{t("Type")}</strong>{t("info.colon")} <em>{t("conjugation")}</em></li>
						<li><strong>{t("Remove from Start of Word")}</strong>{t("info.colon")} {t("(blank)")}</li>
						<li><strong>{t("Remove from End of Word")}</strong>{t("info.colon")} ar</li>
					</ul>
					<div className="title">{t("Conjugations")}</div>
					<ul className="simple">
						<li><strong>{t("1st-person")} {t("singular")} {t("present")}</strong>{t("info.colon")} {t("stem")}[o]</li>
						<li><strong>{t("2nd-person")} {t("singular")} {t("present")}</strong>{t("info.colon")} {t("stem")}[as]</li>
						<li><strong>{t("3rd-person")} {t("singular")} {t("present")}</strong>{t("info.colon")} {t("stem")}[a]</li>
						<li><strong>{t("1st-person")} {t("plural")} {t("present")}</strong>{t("info.colon")} {t("stem")}[amos]</li>
						<li><strong>{t("1st-person")} {t("plural")} {t("present")}</strong>{t("info.colon")} {t("stem")}[an]</li>
					</ul>
				</div>
				<RegularExpressions />
			</IonCardContent>
		</IonCard>
	);
}

export const OutputCard = (props: CardProps) => {
	const [ t ] = useTranslator('dj');
	const [ tc ] = useTranslator('common');
	return (
		<IonCard>
			<IonItem lines="full">
				<IonIcon icon={logOutOutline} slot="start" color="primary" />
				<IonLabel>{t("Output Tab")}</IonLabel>
				<OverviewButton {...props} />
			</IonItem>
			<IonCardContent>
				<p>
					{t("info.output1p1")}
					<strong>{tc("Input")}</strong>
					{t("info.output1p2")}
				</p><p>
					{t("info.output2p1")}
					<strong>{t("info.output2p2")}</strong>
					{t("info.output2p3")}
				</p>
			</IonCardContent>
		</IonCard>
	);
}

const DJinfo = (props: PageData) => {
	const [ t ] = useTranslator('dj');

	return (
		<IonPage>
			<IonHeader>
				<Header title={t("Overview[colon] Declenjugator")} />
			</IonHeader>
			<IonContent className="overview">
				<IonCard>
					<IonItem lines="full">
						<DeclenjugatorIcon slot="start" color="primary" />
						<IonLabel>{t("info.overview0")}</IonLabel>
					</IonItem>
					<IonCardContent>
						<p>
							{t("info.overview1p1")}
							<strong>{t("declensions")}</strong>
							{t("info.overview1p2")}
							<strong>{t("conjugations")}</strong>
							{t("info.overview1p3")}
						</p>
						<p>{t("info.overview2")}</p>
						<p>{t("info.overview3")}</p>
					</IonCardContent>
				</IonCard>
				<InputCard hideOverview />
				<GroupCard hideOverview />
				<OutputCard hideOverview />
			</IonContent>
		</IonPage>
	);
};

export default DJinfo;
