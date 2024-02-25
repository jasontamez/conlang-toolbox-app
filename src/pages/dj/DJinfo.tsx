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
import Markdown from 'react-markdown';

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
	const [ t ] = useTranslator('we');
	const main = t("info.input", { joinArrays: "\n"});
	return (
		<IonCard>
			<IonItem lines="full">
				<IonIcon icon={logInOutline} slot="start" color="primary" />
				<IonLabel>{t("Input Tab")}</IonLabel>
				<OverviewButton {...props} />
			</IonItem>
			<IonCardContent>
				<Markdown>{main}</Markdown>
			</IonCardContent>
		</IonCard>
	);
};

export const GroupCard = (props: CardProps) => {
	const [ t ] = useTranslator('dj');
	const main = t("info.groups", { joinArrays: "\n"});
	const example = t("info.groupsExample", { returnObjects: true});
	return (
		<IonCard>
			<IonItem lines="full">
				<DJGroupsIcon slot="start" color="primary" />
				<IonLabel>{t("Groups Tab")}</IonLabel>
				<OverviewButton {...props} />
			</IonItem>
			<IonCardContent>
				<Markdown
					components={{
						code(props) {
							return <IonIcon icon={reorderThree} color="tertiary" size="small" />;
						}
					}}
				>{main}</Markdown>
				<div className="example">
					{(example as {title: string, content: string[]}[]).map((obj, i) => {
						const {title, content} = obj;
						return (
							<React.Fragment key={`DJexample/${title}/${i}`}>
								<div className="title">{t(title)}</div>
								<Markdown>{content.join("\n")}</Markdown>
							</React.Fragment>
						);
					})}
				</div>
				<RegularExpressions />
			</IonCardContent>
		</IonCard>
	);
}

export const OutputCard = (props: CardProps) => {
	const [ t ] = useTranslator('dj');
	const main = t("info.output", { joinArrays: "\n"});
	return (
		<IonCard>
			<IonItem lines="full">
				<IonIcon icon={logOutOutline} slot="start" color="primary" />
				<IonLabel>{t("Output Tab")}</IonLabel>
				<OverviewButton {...props} />
			</IonItem>
			<IonCardContent>
				<Markdown>{main}</Markdown>
			</IonCardContent>
		</IonCard>
	);
}

const DJinfo = (props: PageData) => {
	const [ t ] = useTranslator('dj');
	const [ tc ] = useTranslator('common');
	const main = t("info.overview", { joinArrays: "\n"});

	return (
		<IonPage>
			<IonHeader>
				<Header title={tc("overviewOf", { what: tc("Declenjugator") })} />
			</IonHeader>
			<IonContent className="overview">
				<IonCard>
					<IonItem lines="full">
						<DeclenjugatorIcon slot="start" color="primary" />
						<IonLabel>{t("What is Declenjugator?")}</IonLabel>
					</IonItem>
					<IonCardContent>
						<Markdown>{main}</Markdown>
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
