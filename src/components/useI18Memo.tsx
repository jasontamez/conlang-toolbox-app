import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { InterpolationMap, TOptionsBase } from "i18next";
import { $Dictionary } from "i18next/typescript/helpers";

type OptionsType = (TOptionsBase & $Dictionary & InterpolationMap<string>) | undefined;

const useI18Memo = (terms: string[], ns: string | undefined = "common", options: OptionsType = undefined) => {
	const { t } = useTranslation(ns);
	return useMemo(() => {
		return terms.map(term => t(term, options));
	}, [terms, options, t]);
};

export default useI18Memo;
