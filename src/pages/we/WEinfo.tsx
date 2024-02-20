import React, { FC } from 'react';
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
	enterOutline,
	exitOutline,
	gridOutline,
	bookOutline,
	settingsOutline,
	reorderTwo,
	helpCircle
} from 'ionicons/icons';
import Markdown from 'react-markdown';

import { PageData, SetBooleanState } from '../../store/types';
import useTranslator from '../../store/translationHooks';

import ltr from '../../components/LTR';
import Header from '../../components/Header';
import { SoundChangesIcon, TransformationsIcon, WordEvolveIcon } from '../../components/icons';
import { RegularExpressions } from '../../components/regularExpressionsInfo';
import { Block, BlockStorage, parseBlock } from '../../components/infoBlocks';

interface CardProps {
	hideOverview?: boolean
	setIsOpenInfo?: SetBooleanState
}
const OverviewButton: FC<CardProps> = (props) => {
	const { hideOverview, setIsOpenInfo } = props;
	if(hideOverview) {
		return <></>;
	}
	return (
		<IonButton
			color="secondary"
			slot="end"
			routerLink="/we/overview"
			routerDirection="forward"
			onClick={() => setIsOpenInfo && setIsOpenInfo(false)}
		>
			<IonIcon icon={helpCircle} />
		</IonButton>
	);
};

export const InpCard: FC<CardProps> = (props) => {
	const [ t ] = useTranslator('we');
	const main = t("info.input", { joinArrays: "\n"});
	return (
		<IonCard>
			<IonItem lines="full">
				<IonIcon icon={enterOutline} slot="start" color="primary" />
				<IonLabel>{t("Input Tab")}</IonLabel>
				<OverviewButton {...props} />
			</IonItem>
			<IonCardContent>
				<Markdown>{main}</Markdown>
			</IonCardContent>
		</IonCard>
	);
};
export const CharGroupCard: FC<CardProps> = (props) => {
	const [ t ] = useTranslator('we');
	const main = t("info.charGroups", { joinArrays: "\n"});
	return (
		<IonCard>
			<IonItem lines="full">
				<IonIcon icon={gridOutline} slot="start" color="primary" />
				<IonLabel>{t("Character Groups Tab")}</IonLabel>
				<OverviewButton {...props} />
			</IonItem>
			<IonCardContent>
				<Markdown>{main}</Markdown>
			</IonCardContent>
		</IonCard>
	);
};
export const TraCard: FC<CardProps> = (props) => {
	const [ t ] = useTranslator('we');
	const main = t("info.transformations", { joinArrays: "\n"});
	return (
		<IonCard>
			<IonItem lines="full">
				<TransformationsIcon slot="start" color="primary" />
				<IonLabel>{t("Transformations Tab")}</IonLabel>
				<OverviewButton {...props} />
			</IonItem>
			<IonCardContent>
				<Markdown
					components={{
						code(props) {
							return <IonIcon icon={reorderTwo} color="tertiary" size="small" />;
						}
					}}
				>{main}</Markdown>
			</IonCardContent>
		</IonCard>
	);
};

export const SChCard: FC<CardProps> = (props) => {
	const [ t ] = useTranslator('we');
	const main = t("info.soundChanges", { joinArrays: "\n"});
	const blocks = t('info.soundChangesBlocks', { returnObjects: true });
	const blockStorage: BlockStorage = {};
	const arrow = (ltr() ? "⟶" : "⟵");
	Object.entries(blocks).forEach(([label, info]: [string, Block]) => {
		blockStorage[label] = parseBlock(info, arrow);
	});
	return (
		<IonCard>
			<IonItem lines="full">
				<SoundChangesIcon slot="start" color="primary" />
				<IonLabel>{t("Sound Changes Tab")}</IonLabel>
				<OverviewButton {...props} />
			</IonItem>
			<IonCardContent>
				<Markdown
					components={{
						code(props) {
							const { children } = props;
							return (
								typeof(children) === "string"
								&& blockStorage[children]
							) || <IonIcon icon={reorderTwo} color="tertiary" size="small" />;
						}
					}}
				>{main}</Markdown>
				<RegularExpressions />
			</IonCardContent>
		</IonCard>
	);
};
export const OutCard: FC<CardProps> = (props) => {
	const [ t ] = useTranslator('we');
	const main = t("info.outputMain", { joinArrays: "\n"});
	const settings = t("info.outputSettings", { joinArrays: "\n"});
	const lexicon = t("info.outputLexicon", { joinArrays: "\n"});
	return (
		<IonCard>
			<IonItem lines="full">
				<IonIcon icon={exitOutline} slot="start" color="primary" />
				<IonLabel>{t("Output Tab")}</IonLabel>
				<OverviewButton {...props} />
			</IonItem>
			<IonCardContent>
				<Markdown>{main}</Markdown>
				<p className="center pad-top-rem">
					<IonIcon icon={settingsOutline} color="tertiary" size="large" />
				</p>
				<Markdown>{settings}</Markdown>
				<p className="center pad-top-rem">
					<IonIcon icon={bookOutline} color="tertiary" size="large" />
				</p>
				<Markdown>{lexicon}</Markdown>
			</IonCardContent>
		</IonCard>
	);
};

const WEinfo: FC<PageData> = (props) => {
	const [ t ] = useTranslator('we');
	const main = t("info.overview", { joinArrays: "\n"});

	return (
		<IonPage>
			<IonHeader>
				<Header title={t("Overview")} />
			</IonHeader>
			<IonContent className="overview">
				<IonCard>
					<IonItem lines="full">
						<WordEvolveIcon slot="start" color="primary" />
						<IonLabel>{t("What is WordEvolve?")}</IonLabel>
					</IonItem>
					<IonCardContent>
						<Markdown>{main}</Markdown>
					</IonCardContent>
				</IonCard>
				<InpCard hideOverview />
				<CharGroupCard hideOverview />
				<TraCard hideOverview />
				<SChCard hideOverview />
				<OutCard hideOverview />
			</IonContent>
		</IonPage>
	);
};

export default WEinfo;
