import React from 'react';
import {
	IonCard,
	IonCardContent,
	IonContent,
	IonHeader,
	IonIcon,
	IonItem,
	IonLabel,
	IonPage
} from '@ionic/react';
import { informationCircle, settings } from 'ionicons/icons';
import Markdown from 'react-markdown';

import { PageData } from '../../store/types';
import useTranslator from '../../store/translationHooks';

import Header from '../../components/Header';
import { MorphoSyntaxIcon } from '../../components/icons';

const MSinfo = (props: PageData) => {
	const [ t ] = useTranslator('ms');
	const [ tc ] = useTranslator('common');

	return (
		<IonPage>
			<IonHeader>
				<Header title={tc("overviewOf", { what: tc("MorphoSyntax")})} />
			</IonHeader>
			<IonContent className="overview">
				<IonCard>
					<IonItem lines="full">
						<MorphoSyntaxIcon slot="start" color="primary" />
						<IonLabel>{t("What is MorphoSyntax?")}</IonLabel>
					</IonItem>
					<IonCardContent>

						<Markdown>{t("overviewMain", { joinArrays: "\n" })}</Markdown>

						<p className="center pad-top-rem">
							<IonIcon icon={settings} size="large" color="tertiary" />
						</p>
						<Markdown>{t("overviewSettings", { joinArrays: "\n" })}</Markdown>

						<p className="center pad-top-rem">
							<IonIcon icon={informationCircle} size="large" color="tertiary" />
						</p>
						<Markdown>{t("overviewInfo", { joinArrays: "\n" })}</Markdown>

						<hr />

						<Markdown>{t("overviewTopics", { joinArrays: "\n" })}</Markdown>

					</IonCardContent>
				</IonCard>
			</IonContent>
		</IonPage>
	);
};

export default MSinfo;
