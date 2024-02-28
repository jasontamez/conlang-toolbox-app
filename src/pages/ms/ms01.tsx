import React from 'react';
import {
	IonPage,
	IonContent,
	IonList,
	useIonViewDidEnter,
	IonItem,
	IonRange
} from '@ionic/react';
import { useDispatch, useSelector } from "react-redux";

import { PageData, StateObject } from '../../store/types';
import { setLastViewMS } from '../../store/internalsSlice';
import { setSyntaxNum } from '../../store/msSlice';
import useTranslator from '../../store/translationHooks';

import {
	CheckboxItem,
	HeaderItem,
	InfoModal,
	SyntaxHeader,
	TextItem,
	CheckboxTransProps,
	MSMarkdown
} from './MorphoSyntaxElements';

const Syntax = (props: PageData) => {
	const [ t ] = useTranslator('ms');
	const { modalPropsMaker } = props;
	const {
		BOOL_prefixMost,
		BOOL_prefixLess,
		BOOL_suffixMost,
		BOOL_suffixLess,
		BOOL_circumfixMost,
		BOOL_circumfixLess,
		BOOL_infixMost,
		BOOL_infixLess,
		NUM_fusion,
		NUM_headDepMarked,
		NUM_redupe,
		NUM_stemMod,
		NUM_suppletion,
		NUM_supraMod,
		NUM_synthesis,
		TEXT_tradTypol,
		TEXT_morphProcess,
		TEXT_headDepMark
	} = useSelector((state: StateObject) => state.ms);
	const dispatch = useDispatch();
	useIonViewDidEnter(() => {
		dispatch(setLastViewMS("ms01"));
	});
	return (
		<IonPage>
			<SyntaxHeader
				title={t("1-Morphological Typology")}
				{...props}
			/>
			<IonContent fullscreen
				className="evenBackground disappearingHeaderKludgeFix"
				id="morphoSyntaxPage"
			>
				<IonList lines="none" className="hasSpecialLabels">
					<HeaderItem level={1}>{t("1-Morphological Typology")}</HeaderItem>
					<HeaderItem level={2}>{t("1-1-Traditional Typology")}</HeaderItem>
					<InfoModal
						title={t("Synthesis and Fusion")}
						label={t("The Basic Building Blocks of Words")}
						modalPropsMaker={modalPropsMaker}
					>
						<MSMarkdown>{t("info11", { joinArrays: "\n" })}</MSMarkdown>
					</InfoModal>
					<HeaderItem level={3}>{t("Synthesis")}</HeaderItem>
					<IonItem className="content">
						<IonRange
							aria-label={t("rangeFromTo", { start: t("Isolating"), end: t("Polysynthetic") })}
							onIonChange={(e) => dispatch(setSyntaxNum(["NUM_synthesis", e.target.value as number]))}
							value={NUM_synthesis}
							className="spectrum"
							color="secondary"
							snaps={true}
							step={1}
							ticks={true}
							min={0}
							max={10}
						>
							<div slot="start">{t("Isolating")}</div>
							<div slot="end">{t("Polysynthetic")}</div>
						</IonRange>
					</IonItem>
					<HeaderItem level={3}>{t("Fusion")}</HeaderItem>
					<IonItem className="content">
						<IonRange
							aria-label={t("rangeFromTo", { start: t("Agglutinative"), end: t("Fusional") })}
							onIonChange={(e) => dispatch(setSyntaxNum(["NUM_fusion", e.target.value as number]))}
							value={NUM_fusion}
							className="spectrum"
							color="secondary"
							snaps={true}
							step={1}
							ticks={true}
							min={0}
							max={10}
						>
							<div slot="start">{t("Agglutinative")}</div>
							<div slot="end">{t("Fusional")}</div>
						</IonRange>
					</IonItem>
					<TextItem
						prop="TEXT_tradTypol"
						value={TEXT_tradTypol}
						rows={undefined}
					>{t("Give examples of the dominant pattern and any secondary patterns.")}</TextItem>
					<HeaderItem level={2}>{t("1-2-Morphological Processes")}</HeaderItem>
					<InfoModal
						title={t("Affixes and Other Modifications")}
						label={t("Read About Them")}
						modalPropsMaker={modalPropsMaker}
					>
						<MSMarkdown>{t("info12", { joinArrays: "\n" })}</MSMarkdown>
					</InfoModal>
					<HeaderItem level={3}>{t("Affixes")}</HeaderItem>
					<CheckboxItem
						display={
							{
								class: "cols3",
								boxesPerRow: 2,
								...(t("checkboxAffixes", { returnObjects: true }) as CheckboxTransProps),
							}
						}
						boxes={["BOOL_prefixMost", "BOOL_prefixLess", "BOOL_suffixMost", "BOOL_suffixLess", "BOOL_circumfixMost", "BOOL_circumfixLess", "BOOL_infixMost", "BOOL_infixLess"]}
						values={[BOOL_prefixMost, BOOL_prefixLess, BOOL_suffixMost, BOOL_suffixLess, BOOL_circumfixMost, BOOL_circumfixLess, BOOL_infixMost, BOOL_infixLess]}
					/>
					<HeaderItem level={3}>{t("Stem Modification")}</HeaderItem>
					<IonItem className="content">
						<IonRange
							aria-label={t("rangeFromTo", { start: t("Not Used"), end: t("Used Often") })}
							onIonChange={(e) => dispatch(setSyntaxNum(["NUM_stemMod", e.target.value as number]))}
							value={NUM_stemMod}
							color="secondary"
							snaps={true}
							step={1}
							ticks={true}
							min={0}
							max={4}
						>
							<div slot="start">{t("Not Used")}</div>
							<div slot="end">{t("Used Often")}</div>
						</IonRange>
					</IonItem>
					<HeaderItem level={3}>{t("Suppletion")}</HeaderItem>
					<IonItem className="content">
						<IonRange
							aria-label={t("rangeFromTo", { start: t("Not Used"), end: t("Used Often") })}
							onIonChange={(e) => dispatch(setSyntaxNum(["NUM_suppletion", e.target.value as number]))}
							value={NUM_suppletion}
							color="secondary"
							snaps={true}
							step={1}
							ticks={true}
							min={0}
							max={4}
						>
							<div slot="start">{t("Not Used")}</div>
							<div slot="end">{t("Used Often")}</div>
						</IonRange>
					</IonItem>
					<HeaderItem level={3}>{t("Reduplication")}</HeaderItem>
					<IonItem className="content">
						<IonRange
							aria-label={t("rangeFromTo", { start: t("Not Used"), end: t("Used Often") })}
							onIonChange={(e) => dispatch(setSyntaxNum(["NUM_redupe", e.target.value as number]))}
							value={NUM_redupe}
							color="secondary"
							snaps={true}
							step={1}
							ticks={true}
							min={0}
							max={4}
						>
							<div slot="start">{t("Not Used")}</div>
							<div slot="end">{t("Used Often")}</div>
						</IonRange>
					</IonItem>
					<HeaderItem level={3}>{t("Suprasegmental Modification")}</HeaderItem>
					<IonItem className="content">
						<IonRange
							aria-label={t("rangeFromTo", { start: t("Not Used"), end: t("Used Often") })}
							onIonChange={(e) => dispatch(setSyntaxNum(["NUM_supraMod", e.target.value as number]))}
							value={NUM_supraMod}
							color="secondary"
							snaps={true}
							step={1}
							ticks={true}
							min={0}
							max={4}
						>
							<div slot="start">{t("Not Used")}</div>
							<div slot="end">{t("Used Often")}</div>
						</IonRange>
					</IonItem>
					<TextItem
						prop="TEXT_morphProcess"
						value={TEXT_morphProcess}
						rows={6}
					>{t("What sort of morphological processes are used? Which are primary and which are used less?")}</TextItem>
					<HeaderItem level={2}>{t("1-3-Head/Dependent Marking")}</HeaderItem>
					<IonItem className="content">
						<IonRange
							aria-label={t("rangeFromTo", { start: t("Head Marked"), end: t("Dependent Marked") })}
							onIonChange={(e) => dispatch(setSyntaxNum(["NUM_headDepMarked", e.target.value as number]))}
							value={NUM_headDepMarked}
							className="spectrum"
							color="secondary"
							snaps={true}
							step={1}
							ticks={true}
							min={0}
							max={4}
						>
							<div slot="start">{t("Head Marked")}</div>
							<div slot="end">{t("Dependent Marked")}</div>
						</IonRange>
					</IonItem>
					<InfoModal
						title={t("Head/Dependent Marking")}
						modalPropsMaker={modalPropsMaker}
					>
						<MSMarkdown>{t("info13", { joinArrays: "\n" })}</MSMarkdown>
					</InfoModal>
					<TextItem
						prop="TEXT_headDepMark"
						value={TEXT_headDepMark}
						rows={undefined}
					>{t("Describe when the head/dependent marking system changes, if needed.")}</TextItem>
				</IonList>
			</IonContent>
		</IonPage>
	);
};


export default Syntax;
