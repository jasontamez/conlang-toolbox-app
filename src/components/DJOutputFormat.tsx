import React, { ReactElement } from "react";
import { DJCustomInfo, DJGroup, RegexPair } from "../store/types";
import ltr from "./LTR";
import { IonCol, IonGrid, IonRow } from "@ionic/react";

export type DJDisplayData = null | {
	order: DJOrders,
	input: string[],
	showGroups: boolean
};
export type DJDisplayTypes = "text" | "chartH" | "chartV";
export type DJTypeObject = {[key in keyof DJCustomInfo]?: boolean};
export type DJChartDirection = "h" | "v";
export type DJOrders = "group" | "groupAlpha" | "input" | "inputAlpha";

const findStem = (word: string, startsWith: string[], endsWith: string[], regex: RegexPair | undefined | null = null) => {
	if(regex) {
		const [matcher, result] = regex;
		const rx = new RegExp(matcher);
		if(word.match(rx)) {
			return word.replace(rx, result);
		}
		return null;
	}
	const starters = startsWith.slice();
	while(starters.length) {
		const start = starters.shift()!;
		if(!word.indexOf(start)) {
			// index === 0 means we found a match
			return word.slice(start.length);
		}
	}
	const enders = endsWith.slice();
	const length = word.length;
	while(enders.length) {
		const end = enders.shift()!;
		const negativeEndLength = 0 - end.length;
		const target = length + negativeEndLength;
		if(word.lastIndexOf(end) === target) {
			// we found a match
			return word.slice(0, negativeEndLength);
		}
	}
	// Unable to find any matches.
	return null;
};

const changeWord = (word: string, prefix: string = "", suffix: string = "", regex: RegexPair | undefined | null = null) => {
	if(regex) {
		const [matcher, result] = regex;
		const rx = new RegExp(matcher);
		return word.replace(rx, result);
	}
	return prefix + word + suffix;
};

const getGroupData = (group: DJGroup) => {
	const { id, declenjugations } = group;
};

const getGroupDescription = (group: DJGroup) => {
	const { title, id, appliesTo, startsWith, endsWith, separator, regex } = group;
	let parameters: string = "";
	if(regex) {
		const arrow = (ltr() ? "⟶" : "⟵");
		const [match, replace] = regex;
		parameters = `/${match}/ ${arrow} ${replace}`;
	} else {
		const temp: string[] = [];
		startsWith.forEach(line => temp.push(line + "-"));
		endsWith.forEach(line => temp.push("-" + line));
		parameters = temp.join(separator);
	}
	if(appliesTo) {
		return [title, id, `${appliesTo}; matches ${parameters}`];
	}
	return [title, id, "matches " + parameters];
};

export const displayChart = (groups: DJGroup[], data: DJDisplayData, which: DJChartDirection) => {
	const output: ReactElement[] = [];
	const groupInfo: ReactElement[] = [];
	if(!data || data.showGroups) {
		// Gather group info
		groups.forEach(group => {
			const [title, id, description] = getGroupDescription(group);
			groupInfo.push(
				<IonGrid key={`displayGroup:${id}`}>
					<IonRow>
						<IonCol>{title}</IonCol>
						<IonCol>{description}</IonCol>
					</IonRow>
				</IonGrid>
			)
			getGroupData(group);
		});
	}
	return output;
};

export const displayText = (groups: DJGroup[], data: DJDisplayData) => {
	const output: ReactElement[] = [];
	if(!data) {
		// Groups only
		return output;
	}
	return output;
};
