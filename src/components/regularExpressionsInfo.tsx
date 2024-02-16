import React from 'react';
import { useTranslation } from 'react-i18next';

export const RegularExpressions: React.FC = () => {
	const { t } = useTranslation();
	const url1 = t("regex3url");
	const url2 = t("regex4url");
	const url3 = t("regex5url");
	const url4 = t("regex6url");
	return (
		<>
			<hr />
			<h2>{t("Regular Expressions")}</h2>
			<p>
				{t("regex1p1")}
				<em>{t("regular expression")}</em>
				{t("regex1p2")}
				<em>{t("Regexes")}</em>
				{t("regex1p3")}
				<strong>{t("Conlang Toolbox")}</strong>
				{t("regex1p4")}
			</p>
			<p>{t("regex2")}</p>
			<ul>
				{url1 ? <li><a href={url1}>{t("regex3text")}</a></li> : <></>}
				{url2 ? <li><a href={url2}>{t("regex4text")}</a></li> : <></>}
				{url3 ? <li><a href={url3}>{t("regex5text")}</a></li> : <></>}
				{url4 ? <li><a href={url4}>{t("regex6text")}</a></li> : <></>}
			</ul>
		</>
	);
};
