import React, { ReactElement } from "react";
import { DJCustomInfo, DJGroup, RegexPair } from "../store/types";
import ltr from "./LTR";

export type DJDisplayTypes = "text" | "chartH" | "chartV";
export type DJTypeObject = {[key in keyof DJCustomInfo]?: boolean};
export type DJChartDirection = "h" | "v";
type Triple = [string, string, string];
export type DJDisplayData = null | {
	input: string[]
	showGroupInfo: boolean
	showExamples: boolean
	oneMatchOnly: boolean
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

export const display = (
	groups: DJGroup[],
	data: DJDisplayData,
	which: DJDisplayTypes,
	type: string
): [ReactElement[], string[]] => {
	const output: ReactElement[] = [
		<div className="djTypeTitle" key={`${type}-title`}>{type}</div>
	];
	const typeString = type === "other" ? "Forms" : type.charAt(0).toLocaleUpperCase() + type.slice(1);
	const unfound: string[][] = [];
	const {input: originalInput = [], showGroupInfo = true, showExamples = true, oneMatchOnly = false} = data || {};
	let input = originalInput.slice();
	// Gather group info
	groups.forEach(group => {
		let foundFlag = false;
		const [title, groupId, description] = getGroupDescription(group);
		const { declenjugations } = group;
		const rows: string[][] = [];
		const rowIds: string[] = [];
		const rowClasses: (string | null)[] = [];
		const columnIds: string[] = [];
		const columnClasses: (string | null)[] = [];
		let className: string = which === "text" ? "text" : "chart";
		if(which === "chartV") {
			// header example item1 item2
			// header example item1 item2
			className += " vertical";
			const stems: string[] = [];
			const found: string[] = [];
			const missing: string[] = [];
			columnClasses.push("headers");
			showExamples && columnClasses.push("examples");
			columnClasses.push(null);
			input.forEach(word => {
				const stem = findStem(word, group);
				if(stem) {
					foundFlag = true;
					stems.push(stem);
					found.push(word);
					// col ids are the word + stem
					columnIds.push(`${word}:${stem}`);
				} else {
					missing.push(word);
				}
			});
			const headers: string[] = [...found];
			rowClasses.push(null);
			if(showExamples) {
				headers.unshift("Example");
			}
			rows.push([typeString, ...headers]);
			declenjugations.forEach((unit, i) => {
				const { id, title, prefix, suffix, regex, useWholeWord } = unit;
				const row: string[] = [title];
				if (showExamples) {
					row.push(changeWord(useWholeWord ? "[word]" : "[stem]", prefix, suffix, regex));
				}
				row.push(
					...found.map((word, i) => changeWord(
						useWholeWord ? word : stems[i]!,
						prefix,
						suffix,
						regex
					)
				));
				rows.push(row);
				// row ids are the declenjugation ids
				rowIds.push(id);
				// stripe every other row
				rowClasses.push((i % 2) ? null : "striped");
			});
			if(oneMatchOnly) {
				input = missing;
			}
			unfound.push(missing);
		} else {
			//////// chartH and text
			// header  header
			// example example
			// item1   item1
			// item2   item2
			which !== "text" && (className += " horizontal");
			const headers: string[] = [typeString];
			const examples: string[] = ["Examples"];
			const missing: string[] = [];
			rowClasses.push("headers");
			rowIds.push("headerRow");
			columnClasses.push("first");
			if(showExamples) {
				rowClasses.push("examples");
				rowIds.push("exampleRow");
			}
			// Get header info, plus columnar info
			declenjugations.forEach((unit, i) => {
				const { title, id, useWholeWord, prefix, suffix, regex } = unit;
				headers.push(title);
				columnIds.push(id);
				columnClasses.push((i % 2) ? "mid" : "mid striped");
				showExamples && examples.push(
					changeWord(useWholeWord ? "[word]" : "[stem]", prefix, suffix, regex)
				);
			});
			// Go through each word and make a row out of each
			input.forEach(word => {
				const stem = findStem(word, group);
				if(stem) {
					foundFlag = true;
					rowIds.push(`${word}:${stem}`);
					const wordRow: string[] = [word];
					// Make a column out of each declenjugation of this word
					declenjugations.forEach(unit => {
						const { prefix, suffix, regex, useWholeWord } = unit;
						wordRow.push(changeWord(useWholeWord ? word : stem, prefix, suffix, regex));
					});
					rows.push(wordRow);
					rowClasses.push(null);
				} else {
					missing.push(word);
				}
			});
			// Add examples row (if needed)
			showExamples && rows.unshift(examples);
			// Add row of headers
			rows.unshift(headers);
			// Save missing words
			if(oneMatchOnly) {
				input = missing;
			}
			unfound.push(missing);
		}
		// Output
		const span = which === "text";
		const inner: ReactElement[] = [];
		if(!data || (foundFlag || showExamples)) {
			const maxRowClass = rowClasses.length - 1;
			const maxColClass = columnClasses.length - 1;
			rows.forEach((row, i) => {
				const rowId = rowIds[i] || "error";
				const rowClass = rowClasses[i > maxRowClass ? maxRowClass : i];
				const cells: ReactElement[] = [];
				const maxRow = row.length - 1;
				row.forEach((col, j) => {
					const colId = columnIds[j] || "error";
					const colClass = columnClasses[j > maxColClass ? maxColClass : j];
					const period = (j === maxRow) ? "." : "";
					if(span) {
						if(j > 0) {
							cells.push(
								<React.Fragment key={`${groupId}:cell:${rowId}:${colId}:${col}`}>
									{(j === 1) ? ' ' :', '}<span className={colClass ? `${colClass} word` : "word"}>{col}{period}</span>
								</React.Fragment>
							);
						} else {
							cells.push(
								<span
									className={colClass ? `${colClass} word` : "word"}
									key={`${groupId}:word:${rowId}:${colId}:${col}`}
								>{col}{period || ":"}</span>
							);	
						}
					} else {
						cells.push(
							<div
								className={colClass ? `${colClass} cell` : "cell"}
								key={`${groupId}:cell:${rowId}:${colId}:${col}`}
							>{col}</div>
						);
					}
				});	
				inner.push(
					<div
						className={rowClass ? `${rowClass} row` : "row"}
						key={`${groupId}:row:${rowId}`}
					>{cells}</div>
				);
			});
		}
		const guts = inner.length > 0 ? (
			<div className="declenjugations">
				{inner}
			</div>
		) : <></>;
		// Send output
		output.push(
			<div
				key={`${type}:displayGroup:${className}:${groupId}`}
				className={"djOutputGroup " + className}
			>
				<div className="header">
					<div className="title">{title}</div>
					{ showGroupInfo ? <div className="description">{description}</div> : <></> }
				</div>
				{guts}
				{(!data || foundFlag) ? <></> : <div className="unmatched">No words matched this group.</div>}
			</div>
		);
	});
	return [
		output,
		oneMatchOnly ? (unfound.pop() || []) : findCommons(unfound)
	];
};

