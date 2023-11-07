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

const displayPair = (
	title: string,
	id: string,
	word: string,
	differentiator: string,
	classRow: string = "pair",
	classOne: string = "title",
	classTwo: string = "word"
): ReactElement => {
	return <div className={classRow} key={`displayPair:declenjugation:${differentiator}${id}:${title}:${word}-#${counter++}`}>
		<span>pair</span><div className={classOne}><span>{classOne}</span>{title}</div>
		<div className={classTwo}><span>{classTwo}</span>{word}</div>
	</div>;
};

const displaySinglet = (id: string, word: string, className: string, differentiator: string = ""): ReactElement => {
	return <div className={className} key={`displaySinglet:declenjugation:${differentiator}${id}:${word}-#${counter++}`}>
		<span>{className}</span><div className="word"><span>word</span>{word}</div>
	</div>;
};

const displayVertical = (declenjugations: Declenjugation[], type: string, id: string) => {
	return (
		<div
			className="declenjugations vertical"
			key={`${type}:displayGroup:chart:info:vertical${id}`}
		>
			{declenjugations.map((unit: Declenjugation) => {
				const [title, subId, word] = getDeclenjugation(unit, "[word]", "[stem]");
				return displayPair(title, subId, word, `group:vertical:${id}:${type}:`, "row", "title cell", "word cell");
			})}
		</div>
	);
};

const displayHorizontal = (declenjugations: Declenjugation[], type: string, id: string) => {
	const titles: string[] = [];
	const ids: string[] = [];
	const words: string[] = [];
	declenjugations.forEach((unit: Declenjugation) => {
		const [title, id, word] = getDeclenjugation(unit, "[word]", "[stem]");
		titles.push(title);
		ids.push(id);
		words.push(word);
	});
	return (
		<div
			key={`${type}:displayGroup:chart:info:vertical:${id}`}
			className="declenjugations horizontal"
		>
			<div className="row">
				{titles.map((title, i) => (
					<div
						key={`${type}:displayGroup:chart:info:vertical:${id}:title:${ids[i]!}`}
						className="title cell"
					>{title}</div>
				))}
			</div>
			<div className="row">
				{words.map((word, i) => (
					<div
						key={`${type}:displayGroup:chart:info:vertical:${id}:word:${ids[i]!}`}
						className="word cell"
					>{word}</div>
				))}
			</div>
		</div>
	);
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
	const output: ReactElement[] = [
		<div className="djTypeTitle" key={`${type}-title`}>{type}</div>
	];
	const groupRawDescriptionInfo: Triple[] = [];
	const unmatched: string[] = [];
	const needToGetGroupInfo = (!data) || (data.showGroups && data.order === "input");
	// Gather group info
	groups.forEach(group => {
		const [title, id, description] = getGroupDescription(group);
		// Save basic info
		groupRawDescriptionInfo.push([title, id, description]);
		// Create Group Info for non-input-based outputs
		needToGetGroupInfo && output.push(
			<div key={`${type}:displayGroup:chart:${id}`} className="djChartOutputGroup">
				<div className="header">
					<div className="title">{title}</div>
					<div className="description">{description}</div>
				</div>
				{data ? <></> : (
					which === "h" ?
						displayHorizontal(group.declenjugations, type, id)
					:
						displayVertical(group.declenjugations, type, id)
				)}
			</div>
		);
	});
	if(!data) {
		// Nothing else to do.
		return [output, unmatched];
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
			// Use found words
			const [title, id, description] = groupRawDescriptionInfo[i]!;
			const headers: ReactElement[] = [
				displaySinglet("baseTitleCard", "Base Word", "title", `header:${id}:${type}:`)
			];
			const examples: ReactElement[] = [
				displaySinglet("base[Word]Card", "[word]", "word", `example:${id}:${type}:`)
			];
			const originals: ReactElement[][] = [
				found.map((pair, i) => {
					const word = pair[0];
					return displaySinglet(
						"inputWords",
						word,
						"original",
						`singlet:originalWord:${id}:${type}:`
					)
				})
			];
			const changed: ReactElement[][] = [];
			group.declenjugations.forEach(unit => {
				const {id: subId, title, prefix, suffix, regex, useWholeWord} = unit;
				headers.push(displaySinglet(subId, title, "title", `header:${id}:${type}:`));
				showGroups && examples.push(
					displaySinglet(
						subId,
						changeWord(
							useWholeWord ? "[word]" : "[stem]",
							prefix,
							suffix,
							regex
						),
						"word",
						`example:${id}:${type}:`
					)
				);
				changed.push(
					found.map((pair, i) => {
						const [word, stem] = pair;
						return displaySinglet(
							subId,
							changeWord(useWholeWord ? word : stem, prefix, suffix, regex),
							"word",
							`from:${word}:${id}:${type}:`
						);
					})
				);
			});
			output.push(
				<div key={`${type}:displayGroup:chart:grouping:${id}`} className="djChartOutputGroup"><span>djChartOutputGroup</span>
					<div className="header"><span>header</span>
						<div className="title"><span>title</span>{title}</div>
						<div className="description"><span>description</span>{description}</div>
					</div>
					<div
						className={"declenjugations " + (which === "h" ? "horizontal" : "vertical")}
						key={`${type}:displayGroup:chart:grouping:${id}:foundPair-${i}`}
					><span>declenjugations + v/h</span>
						<div className="headers"><span>headers</span>
							{headers}
						</div>
						{showGroups ? <div className="examples"><span>examples</span>{examples}</div> : <></>}
						{found.length ? (
							<>
								<div className="originals"><span>originals</span>{originals}</div>
								{changed.map((els, i) =>(
									<div
										className="changed"
										key={`${type}:${id}:singlets:changedWords:row-${i}`}
									><span>changed</span>{els}</div>
								))}
							</>
						) : <></>}
					</div>
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
		// (Output should already have group info, if needed)
		const headers: ReactElement[] = [];
		const changed: ReactElement[][] = [];
		// Go through each input item
		input.forEach((word, wi) => {
			// Find a matching group
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
				// We found a group
				// Save original word
				const [stem, group] = groupStem;
				const {id, title} = group;
				headers.push(
					displayPair(title, id, word, `foundGroupFromInput:${word}:${type}:`, "pair", "group", "word")
				);
				// Create all declensions/conjugations
				const changes: ReactElement[] = [];
				group.declenjugations.forEach(
					unit => {
						const [title, id, w] = getDeclenjugation(unit, word, stem);
						changes.push(
							displayPair(title, id, w, `fromGroup:${group.id}:${type}:`, "pair", "declenjugation")
						)
					}
				);
				changed.push(changes);
				// Save changes to output
			} else {
				unmatched.push(word);
			}
		});
		if (headers.length > 0) {
			output.push(
				<div
					className={"djInputBasedChart " + (which === "h" ? "horizontal" : "vertical")}
					key={`${type}:displayInput:chart:info:`}
				><span>djInputBasedChart</span>
					<div className="headers"><span>headers</span>{headers}</div>
					{changed.map((words, i) => (
						<div className="changed" key={`changedOutput:#${i}`}><span>changed</span>{words}</div>
					))}
				</div>
			);
		} else {
			output.push(
				<div
					className={"djNoInput " + (which === "h" ? "horizontal" : "vertical")}
					key={`${type}:displayInput:no-info:`}
				><span>djNoInput</span>No words matched any of these.</div>
			)
		}
	}
	return [output, unmatched];
};

export const displayText = (
	groups: DJGroup[],
	data: DJDisplayData,
	type: string
): [ReactElement[], string[]] => {
	const output: ReactElement[] = [];
	const unmatched: string[] = [];
	return [output, unmatched];
};
