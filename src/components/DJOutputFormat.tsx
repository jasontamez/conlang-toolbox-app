import React, { ReactElement } from "react";
import { DJCustomInfo, DJGroup, Declenjugation, RegexPair } from "../store/types";
import ltr from "./LTR";

export type DJDisplayTypes = "text" | "chartH" | "chartV";
export type DJTypeObject = {[key in keyof DJCustomInfo]?: boolean};
export type DJChartDirection = "h" | "v";
export type DJOrders = "group" | "groupAlpha" | "input" | "inputAlpha";
type Triple = [string, string, string];
export type DJDisplayData = null | {
	order: DJOrders
	input: string[]
	showGroups: boolean
};

const findStem = (
	word: string,
	group: DJGroup
): string | null => {
	const { startsWith, endsWith, regex } = group;
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

const changeWord = (
	word: string,
	prefix: string = "",
	suffix: string = "",
	regex: RegexPair | undefined | null = null
): string => {
	if(regex) {
		const [matcher, result] = regex;
		const rx = new RegExp(matcher);
		return word.replace(rx, result);
	}
	return prefix + word + suffix;
};

const getDeclenjugation = (group: Declenjugation, word: string, stem: string): Triple => {
	const { id, title, prefix, suffix, regex, useWholeWord } = group;
	return [title, id, changeWord(useWholeWord ? word : stem, prefix, suffix, regex)];
};

const getGroupDescription = (group: DJGroup): Triple => {
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

let counter = 0;

const displayPair = (title: string, id: string, word: string, differentiator: string = ""): ReactElement => {
	return <div className="pair" key={`displayPair:declenjugation:pair:${differentiator}${id}:${title}:${word}-#${counter++}`}>
		<div className="title">{title}</div>
		<div className="word">{word}</div>
	</div>;
};

export const findCommons = (input: string[][]): string[] => {
	const listings = input.slice();
	const length = listings.length;
	if(length < 2) {
		return listings.shift() || [];
	}
	const output: string[] = [];
	const first = listings.shift()!;
	const last = listings.pop()!;
	const info: {[key: string]: number} = {};
	first.forEach(word => {
		info[word] = 2; // 1 + one extra to match the final length
	});
	listings.forEach(list => {
		list.forEach(word => {
			const val = info[word];
			if(val) {
				info[word] = val + 1;
			}
		});
	});
	last.forEach(word => {
		if(info[word] === length) {
			// It's in all the lists
			output.push(word);
		}
	});
	return output;
}

export const displayChart = (
	groups: DJGroup[],
	data: DJDisplayData,
	which: DJChartDirection,
	type: string
): [ReactElement[], string[]] => {
	const output: ReactElement[] = [];
	const groupInfo: ReactElement[] = [];
	const groupRawDeclenjugatorInfo: Triple[] = [];
	const unmatched: string[] = [];
	if(!data || data.showGroups) {
		// Gather group info
		groups.forEach(group => {
			const [title, id, description] = getGroupDescription(group);
			groupInfo.push(
				<div key={`${type}:displayGroup:chart:${id}`} className="djChartOutputGroup"><span>chart</span>
					<div className="header"><span>header</span>
						<div className="title">{title}</div>
						<div className="description">{description}</div>
					</div>
					{data ? <></> : (
						<div
							className={"declenjugations " + (which === "h" ? "horizontal" : "vertical")}
							key={`${type}:displayGroup:chart:info:${id}`}
						><span>declenjugations</span>
							{group.declenjugations.map(unit => {
								const [title, id, word] = getDeclenjugation(unit, "[word]", "[stem]");
								return displayPair(title, id, word, `group:${id}:${type}:`);
							})}
						</div>
					)}
				</div>
			);
			if(data) {
				group.declenjugations.forEach(unit => {
					groupRawDeclenjugatorInfo.push(getDeclenjugation(unit, "[word]", "[stem]"));
				});
			}
		});
	}
	if(!data) {
		// Nothing else to do.
		return [groupInfo, unmatched];
	}
	const {order, input, showGroups} = data;
	// order will be either "input" or "group" and input will be pre-sorted
	if(order === "group") {
		// Use order of groups
		let listing = input.slice();
		const unfound: string[][] = [];
		groups.forEach((group, i) => {
			const found: [string, string][] = [];
			const nextGroup: string[] = [];
			while(listing.length > 0) {
				const word = listing.shift()!;
				const stem = findStem(word, group);
				if(stem === null) {
					nextGroup.push(word);
					continue;
				}
				found.push([word, stem]);
			}
			// Save found words
			const [title, id, description] = groupRawDeclenjugatorInfo[i]!;
			output.push(groupInfo[i]!);
			output.push(
				<div key={`${type}:displayGroup:chart:grouping:${id}`} className="djChartOutputGroup"><span>chart grouping</span>
					<div className="header"><span>header2</span>
						<div className="title">{title}</div>
						<div className="description">{description}</div>
					</div>
					{found.map((pair, i) => (
						<div
							className={"declenjugations " + (which === "h" ? "horizontal" : "vertical")}
							key={`${type}:displayGroup:chart:grouping:${id}:foundPair-${i}`}
						><span>declenjugations2</span>
							{group.declenjugations.map(unit => {
								const [title, id, word] = getDeclenjugation(unit, ...pair);
								return displayPair(title, id, word, `group:grouping:${id}:${type}:`);
							})}
						</div>
					))}
				</div>
			);
			// Set for next loop
			unfound.push(listing);
			listing = nextGroup;
		});
		// Save unmatched words
		unmatched.push(...findCommons(unfound));
	} else {
		// Use input order
		if(showGroups) {
			// Put the groups in front.
			output.push(...groupInfo);
		}
		// Now go through each input item
		// group | ...each declension/conjugation
		input.forEach((word, wi) => {
			let groupStem: [string, DJGroup] | null = null;
			const copy = groups.slice();
			while(copy.length > 0 && groupStem === null) {
				const group = copy.shift()!;
				const stem = findStem(word, group);
				if(stem !== null) {
					groupStem = [stem, group];
				}
			}
			if(groupStem) {
				// Add declenjugations to temp here
				const [stem, group] = groupStem;
				const temp: ReactElement[] = [];
				group.declenjugations.forEach(
					unit => {
						const [title, id, w] = getDeclenjugation(unit, word, stem);
						temp.push(
							displayPair(title, id, w, `fromGroup:${group.id}:${type}:`)
						)
					}
				);
				// Save temp to output
				output.push(
					<div
						className={"declenjugations inputBased " + (which === "h" ? "horizontal" : "vertical")}
						key={`${type}:displayInput:chart:info:${group.id}:${word}-${wi}`}
					><span>declenjugations input</span>
						<div className="baseWord">{word}</div>
						<div className="group">{group.title}</div>
						{temp}
					</div>
				);
			} else {
				unmatched.push(word);
			}
		});
	}
	return [output, unmatched];
};

export const displayText = (groups: DJGroup[], data: DJDisplayData, type: string): [ReactElement[], string[]] => {
	const output: ReactElement[] = [];
	const unmatched: string[] = [];
	return [output, unmatched];
};
