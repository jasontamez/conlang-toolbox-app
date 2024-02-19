import React, { FC, PropsWithChildren, ReactElement } from 'react';
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
	optionsOutline,
	documentTextOutline,
	gridOutline,
	bookOutline,
	settingsOutline,
	reorderTwo,
	helpCircle
} from 'ionicons/icons';
import Markdown from 'react-markdown';

import { PageData, SetBooleanState } from '../../store/types';

import ltr from '../../components/LTR';
import IPA from '../../components/IPA';
import Header from '../../components/Header';
import {
	SyllablesIcon,
	TransformationsIcon,
	WordGenIcon
} from '../../components/icons';
import { RegularExpressions } from '../../components/regularExpressionsInfo';
import useTranslator from '../../store/translationHooks';

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
			routerLink="/wg/overview"
			routerDirection="forward"
			onClick={() => setIsOpenInfo && setIsOpenInfo(false)}
		>
			<IonIcon icon={helpCircle} />
		</IonButton>
	);
};

export const CharGroupCard: FC<CardProps> = (props) => {
	const [ t ] = useTranslator('wg');
	const example = t('info.charGroupExample', { returnObjects: true });
	const plainText = t("info.charGroups", { joinArrays: "\n"});
	const endHiddenOverview = t("info.charGroupsHiddenOverview", { joinArrays: "\n"});
	const endOverview = t("info.charGroupsOverview", { joinArrays: "\n"});
	return (
		<IonCard>
			<IonItem lines="full">
				<IonIcon icon={gridOutline} slot="start" color="primary" />
				<IonLabel>{t("Character Groups Tab")}</IonLabel>
				<OverviewButton {...props} />
			</IonItem>
			<IonCardContent>
				<Markdown
					components={{
						code(props) {
							const { children } = props;
							if(children === "example") {
								const inner: ReactElement[] = [];
								(example as string[]).forEach((bit, i) => {
									inner.push(
										<strong key={`charGroupExample/${bit}/${i}`}>{bit}</strong>,
										<br key={`charGroupExample/linebreak-${i}`} />
									)
								});
								return <span className="emphasizedSection">{inner}</span>;
							}
							return <IPA>{children}</IPA>;
						}
					}}
				>{plainText}</Markdown>
				<Markdown>{props.hideOverview ? endHiddenOverview : endOverview}</Markdown>
			</IonCardContent>
		</IonCard>
	);
}
export const SylCard: FC<CardProps> = (props) => {
	const [ t ] = useTranslator('wg');
	const { hideOverview } = props;
	const charGroupExample = t('info.charGroupExample', { returnObjects: true });
	const startHiddenOverview = t("info.syllablesStartHideOverview", { joinArrays: "\n"});
	const startOverview = t("info.syllablesStartOverview", { joinArrays: "\n"});
	const example = t('info.syllablesExample', { returnObjects: true });
	const plainText = t("info.syllables", { joinArrays: "\n"});
	const endHiddenOverview = t("info.syllablesEndHideOverview", { joinArrays: "\n"});
	const endOverview = t("info.syllablesEndOverview", { joinArrays: "\n"});
	return (
		<IonCard>
			<IonItem lines="full">
				<SyllablesIcon slot="start" color="primary" />
				<IonLabel>{t("Syllables Tab")}</IonLabel>
				<OverviewButton {...props} />
			</IonItem>
			<IonCardContent>
				<Markdown
					components={{
						code(props) {
							const { children } = props;
							if(children === "charGroup example") {
								const inner: ReactElement[] = [];
								(charGroupExample as string[]).forEach((bit, i) => {
									inner.push(
										<strong key={`syllCharGroupExample/${bit}/${i}`}>{bit}</strong>
									);
									(i + 1 !== (charGroupExample as string[]).length)
										&& inner.push(<br key={`syllCharGroupExample/linebreak-${i}`} />);
								});
								return <span className="emphasizedSection">{inner}</span>;
							}
							return <></>;
						}
					}}
				>{hideOverview ? startHiddenOverview : startOverview}</Markdown>
				
				<div className="emphasizedSection">
					{(example as string[]).map((bit, i) => {
						const inner: ReactElement[] = [];
						inner.push(
							<strong key={`syllExample/${bit}/${i}`}>{bit}</strong>
						);
						(i + 1 !== (example as string[]).length)
							&& inner.push(<br key={`syllExample/linebreak-${i}`} />);
						return <React.Fragment key={`syllExampleGroup/${bit}/${i}`}>{inner}</React.Fragment>
					})}
				</div>

				<Markdown>{plainText}</Markdown>

				<Markdown>{hideOverview ? endHiddenOverview : endOverview}</Markdown>

			</IonCardContent>
		</IonCard>
	);
}

interface Block {
	arrow?: string
	serif?: boolean
	simple?: string[]
	reverse?: string[]
	complex?: string[]
	important?: string
	unimportant?: string
}
const Spanner: FC<PropsWithChildren<{className: string}>> = (props) => {
	return <span className={props.className}>{props.children}</span>;
};
const parseBlock = (input: Block, arrow: string) => {
	const {
		serif,
		simple,
		reverse,
		complex,
		arrow: subArrow = "->",
		important = "!",
		unimportant = "$"
	} = input;

	const className = serif ? "emphasizedSection serifChars" : "emphasizedSection";
	const arrowReplace = new RegExp(subArrow, "g");
	let counter = 0;
	if(simple) {
		const classes = [ "importantUnit", "unimportantUnit" ];
		const output: ReactElement[] = simple.map((line, i) => {
			return <Spanner key={`spanner/simple/${i}/${line}`} className={classes[i % 2]}>{line.replace(arrowReplace, arrow)}</Spanner>;
		});
		return <span className={className}>{output}</span>;
	} else if (reverse) {
		const classes = [ "unimportantUnit", "importantUnit" ];
		const output: ReactElement[] = reverse.map((line, i) => {
			return <Spanner key={`spanner/reverse/${i}/${line}`} className={classes[i % 2]}>{line.replace(arrowReplace, arrow)}</Spanner>;
		});
		return <span className={className}>{output}</span>;
	} else if (complex) {
		const output: ReactElement[] = [];
		const max = complex.length - 1;
		complex.forEach((line, i) => {
			const separateImportant = (line.replace(arrowReplace, arrow)).split(important);
			separateImportant.forEach((bit, i) => {
				if(!bit) {
					return;
				} else if (i % 2) {
					// important bits are on the odd numbers
					output.push(<Spanner key={`spanner/complex/imp/${i}/${line}/${counter++}`} className="importantUnit">{bit}</Spanner>);
					return;
				}
				// Check for unimportant bits
				const separateUnimportant = bit.split(unimportant);
				separateUnimportant.forEach((bit, i) => {
					if(!bit) {
						return;
					} else if (i % 2) {
						// unimportant bits are on the odd numbers
						output.push(<Spanner key={`spanner/complex/unimp/${i}/${line}/${counter++}`} className="unimportantUnit">{bit}</Spanner>);
						return;
					}
					// Plain text
					output.push(<React.Fragment key={`spanner/complex/plain/${i}/${line}/${counter++}`}>{bit}</React.Fragment>)
				});
			});
			if(i !== max) {
				output.push(<br key={`br/complex/${i}/${line}`} />);
			}
		});
		return <span className={className}>{output}</span>;
	}
	// error... ignore
	return <></>;
};
type BlockStorage = { [key: string]: ReactElement };

export const TransCard: FC<CardProps> = (props) => {
	const arrow = (ltr() ? "⟶" : "⟵");
	const [ t ] = useTranslator('wg');
	const blocks = t('info.transBlocks', { returnObjects: true });
	const blockStorage: BlockStorage = {};
	Object.entries(blocks).forEach(([label, info]: [string, Block]) => {
		blockStorage[label] = parseBlock(info, arrow);
	});
	const plainText = t("info.trans", { arrow, joinArrays: "\n"});
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
							const { children } = props;
							return (
								typeof(children) === "string"
								&& blockStorage[children]
							) || <IonIcon icon={reorderTwo} color="tertiary" size="small" />;
						}
					}}
				>{plainText}</Markdown>
				<RegularExpressions />
			</IonCardContent>
		</IonCard>
	);
}
export const OutCard: FC<CardProps> = (props) => {
	const [ t ] = useTranslator('wg');
	const main = t("info.outputMain", { joinArrays: "\n"});
	const settings = t("info.outputSettings", { joinArrays: "\n"});
	const lexicon = t("info.outputLexicon", { joinArrays: "\n"});
	return (
		<IonCard>
			<IonItem lines="full">
				<IonIcon icon={documentTextOutline} slot="start" color="primary" />
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
}
export const OptCard: FC<CardProps> = (props) => {
	const [ t ] = useTranslator('wg');
	const main = t("info.settings", { joinArrays: "\n"});
	return (
		<IonCard>
			<IonItem lines="full">
				<IonIcon icon={optionsOutline} slot="start" color="primary" />
				<IonLabel>{t("Settings Tab")}</IonLabel>
				<OverviewButton {...props} />
			</IonItem>
			<IonCardContent>
				<Markdown>{main}</Markdown>
			</IonCardContent>
		</IonCard>
	);
}

const WGinfo: FC<PageData> = (props) => {
	const [ t ] = useTranslator('wg');
	const main = t("info.overview", { joinArrays: "\n"});
	return (
		<IonPage>
			<IonHeader>
				<Header title={t("Overview[colon] WordGen")} />
			</IonHeader>
			<IonContent className="overview">
				<IonCard>
					<IonItem lines="full">
						<WordGenIcon slot="start" color="primary" />
						<IonLabel>{t("What is WordGen?")}</IonLabel>
					</IonItem>
					<IonCardContent>
						<Markdown>{main}</Markdown>
					</IonCardContent>
				</IonCard>
				<CharGroupCard hideOverview />
				<SylCard hideOverview />
				<TransCard hideOverview />
				<OutCard hideOverview />
				<OptCard hideOverview />
			</IonContent>
		</IonPage>
	);
};

export default WGinfo;
