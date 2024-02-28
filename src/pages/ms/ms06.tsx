import React from 'react';
import {
	IonPage,
	IonContent,
	IonList,
	useIonViewDidEnter
} from '@ionic/react';
import { useDispatch, useSelector } from "react-redux";

import { PageData, StateObject } from '../../store/types';
import { setLastViewMS } from '../../store/internalsSlice';
import useTranslator from '../../store/translationHooks';

import {
	CheckboxItem,
	CheckboxTransExportProps,
	CheckboxTransProps,
	HeaderItem,
	InfoModal,
	MSMarkdown,
	SyntaxHeader,
	TextItem
} from './MorphoSyntaxElements';

const Syntax = (props: PageData) => {
	const [ t ] = useTranslator('ms');
	const { modalPropsMaker } = props;
	const {
		BOOL_nomAcc,
		BOOL_ergAbs,
		TEXT_ergative
	} = useSelector((state: StateObject) => state.ms);
	const dispatch = useDispatch();
	useIonViewDidEnter(() => {
		dispatch(setLastViewMS("ms06"));
	});
	return (
		<IonPage>
			<SyntaxHeader title={t("6-Grammatical Relations")} {...props} />
			<IonContent fullscreen
				className="evenBackground disappearingHeaderKludgeFix"
				id="morphoSyntaxPage"
			>
				<IonList lines="none" className="hasSpecialLabels">
					<HeaderItem level={1}>{t("6-Grammatical Relations")}</HeaderItem>
					<InfoModal
						title={t("Alignments")}
						label={t("Show the Alignments")}
						modalPropsMaker={modalPropsMaker}
					>
						<MSMarkdown>{t("info6", { joinArrays: "\n" })}</MSMarkdown>
					</InfoModal>
					<CheckboxItem
						display={{
							class: "cols2",
							boxesPerRow: 1,
							...(t("checkboxAlignmentSystem", { returnObjects: true }) as CheckboxTransProps),
							export: t("checkboxAlignmentSystemExport", { returnObjects: true }) as CheckboxTransExportProps
						}}
						boxes={["BOOL_nomAcc", "BOOL_ergAbs"]}
						values={[BOOL_nomAcc, BOOL_ergAbs]}
					/>
					<TextItem
						prop="TEXT_ergative"
						value={TEXT_ergative}
						rows={8}
					>{t("Are there any exceptions to the primary alignment? Do they exist in a hierarchy?")}</TextItem>
				</IonList>
			</IonContent>
		</IonPage>
	);
};


export default Syntax;
