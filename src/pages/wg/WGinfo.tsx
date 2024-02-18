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
	const [ tc ] = useTranslator('common');
	return (
		<IonCard>
			<IonItem lines="full">
				<IonIcon icon={gridOutline} slot="start" color="primary" />
				<IonLabel>{t("Character Groups Tab")}</IonLabel>
				<OverviewButton {...props} />
			</IonItem>
			<IonCardContent>
				<p>
					{t("info.charGroup1p1")}
					<em>{t("consonants")}</em>
					{t("info.charGroup1p2")}
					<em>{t("vowels")}</em>
					{t("info.charGroup1p3")}
					<IPA>{t("info.pbk")}</IPA>
					{t("info.charGroup1p4")}
					<IPA>{t("info.lr")}</IPA>
					{t("info.charGroup1p5")}
					<IPA>{t("info.pbklr")}</IPA>
					{t("info.charGroup1p6")}
				</p><p>
					{t("info.charGroup2p1")}
					<em>{t("description")}</em>
					{t("info.charGroup2p2")}
					<em>{t("label")}</em>.
					{t("info.charGroup2p3")}
					<strong>{t("invalidCharacters")}</strong>
					{t("info.charGroup2p4")}
					<strong>{t("Syllables")}</strong>
					{t("info.charGroup2p5")}
				</p>
				<div className="emphasizedSection">
					<strong>{t("info.charGroup3p1")}</strong>
					<br />
					<strong>{t("info.charGroup3p2")}</strong>
					<br />
					<strong>{t("info.charGroup3p3")}</strong>
					<br />
					<strong>{t("info.charGroup3p4")}</strong>
				</div>
				<p>
					{t("info.charGroup4p1")}
					<em>{t("run")}</em>.
					{t("info.charGroup4p2")}
					<em>{t("dropoff rate")}</em>
					{t("info.charGroup4p3")}
					<strong>{tc("Settings")}</strong>
					{t("info.charGroup4p4")}
				</p>
				{props.hideOverview ?
					<p>
						{t("info.charGroup5v1p1")}
						<strong>{t("Character Group run dropoff")}</strong>
						{t("info.charGroup5v1p2")}
						<strong>{tc("Settings")}</strong>
						{t("info.charGroup5v1p3")}
					</p>
				:
					<p>
						{t("info.charGroup5v2p1")}
						<strong>{t("Character Group run dropoff")}</strong>
						{t("info.charGroup5v2p2")}
						<strong>{tc("Settings")}</strong>
						{t("info.charGroup5v2p3")}
					</p>
				}
			</IonCardContent>
		</IonCard>
	);
}
export const SylCard: FC<CardProps> = (props) => {
	const [ t ] = useTranslator('wg');
	const [ tc ] = useTranslator('common');
	const { hideOverview } = props;
	return (
		<IonCard>
			<IonItem lines="full">
				<SyllablesIcon slot="start" color="primary" />
				<IonLabel>{t("Syllables Tab")}</IonLabel>
				<OverviewButton {...props} />
			</IonItem>
			<IonCardContent>
				<p>
					{t("info.syll1p1")}
					<em>{t("label_other")}</em>
					{t("info.syll1p2")}
					{ hideOverview ? t("info.syll1maybe3") : "" }
				</p>
				{hideOverview ? <></> : (
					<>
						<p>
							{t("info.syllMaybe1")}
							<strong>{t("charGroup_other")}</strong>
							{t("info.syllMaybe2")}
						</p>
						<div className="emphasizedSection">
							<strong>{t("info.charGroup3p1")}</strong>
							<br />
							<strong>{t("info.charGroup3p2")}</strong>
							<br />
							<strong>{t("info.charGroup3p3")}</strong>
							<br />
							<strong>{t("info.charGroup3p4")}</strong>
						</div>
						<p>{t("info.syllMaybe3")}</p>
					</>
				)}
				<div className="emphasizedSection">
					<strong>
						{t("info.ILV")}
						<br />
						{t("info.CV")}
						<br />
						{t("info.ILVC")}
					</strong>
				</div>
				<p>
					{t("info.syll2p1")}
					<em>{t("info.pla")}</em>
					{t("info.syll2p2")}
					<em>{t("info.ku")}</em>
					{t("info.syll2p3")}
					<em>{t("info.brep")}</em>
					{t("info.syll2p4")}
					<em>{t("info.plabrep")}</em>
					{t("info.syll2p5")}
					<em>{t("info.kupla")}</em>
					{t("info.syll2p6")}
					<strong>{t("info.sILV")}</strong>
					{t("info.syll2p7")}
					<em>{t("info.sbra")}</em>
					{t("info.syll2p8")}
					<em>{t("info.spli")}</em>
					{t("info.syll2p9")}
				</p><p>
					{t("info.syll3p1")}
					<strong>{t("Use multiple syllable types")}</strong>
					{t("info.syll3p2")}
					<strong>{t("swSyll")}</strong>
					{t("info.syll3p3")}
					<strong>{t("wiSyll")}</strong>
					{t("info.syll3p4")}
					<strong>{t("wfSyll")}</strong>
					{t("info.syll3p5")}
					<strong>{t("mwSyll")}</strong>
					{t("info.syll3p6")}
				</p><p>
					{t("info.syll4p1")}
					<em>{t("dropoff rate")}</em>
					{t("info.syll4p2")}
					<strong>{tc("Settings")}</strong>
					{t("info.syll4p3")}
				</p>
				{props.hideOverview ?
					<p>
						{t("info.syll5v1p1")}
						<strong>Syllable box dropoff</strong>
						{t("info.syll5v1p2")}
						<strong>Settings</strong>
						{t("info.syll5v1p3")}
					</p>
				:
					<p>
						{t("info.syll5v2p1")}
						<strong>Syllable box dropoff</strong>
						{t("info.syll5v2p2")}
						<strong>Settings</strong>
						{t("info.syll5v3p3")}
					</p>
				}
			</IonCardContent>
		</IonCard>
	);
}

interface Block {
	arrow?: string
	emphasized?: boolean
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
		emphasized,
		serif,
		simple,
		reverse,
		complex,
		arrow: subArrow = "->",
		important = "!",
		unimportant = "$"
	} = input;

	const emph = emphasized ? "emphasizedSection" : "";
	const className = serif ? ( emph ? emph + " serifChars" : "serifChars" ) : emph;
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
