import { $and } from '../../../components/DollarSignExports';
import { MSBool, MSNum, MSState, MSText } from '../../../store/types';

import { exportProp, specificPageInfo } from '../MorphoSyntaxElements';
import ms from '../ms.json';

type LinesStorage = [ // Four levels of header
	string[],
	string[],
	string[],
	string[]
];
type InfoStorage = [ // Four levels of info
	number[],
	number[],
	number[],
	number[]
];

const HEADER = 1;
const INFO = 2;

const transferToOutput = (storage: LinesStorage, outputHolder: string[], info: InfoStorage | null) => {
	// Now, dump all stored info into the storage object
	storage.forEach((row, i) => {
		while(row.length > 0) {
			// Add all elements from storage to output, from level 0 to 3
			outputHolder.push(row.shift()!);
			// Remove info as we go
			info && info[i].shift();
		}
	});
};

const checkForOrphanHeaders = (
	storage: LinesStorage,
	info: InfoStorage,
	last: number,
	next: number,
	outputHolder: string[]
) => {
	if (last === next) {
		// check only that row
		const pop = info[last].pop()!;
		if(pop === HEADER) {
			// Remove orphan header
			storage[last].pop();
		} else {
			// Restore info
			info[last].push(pop);
		}
	} else if (last >= next) {
		// sanity check, just in case we get called incorrectly
		return null;
	} else {
		let foundChildren = false;
		// Loop through and eliminate any 
		for (let checking = last; checking > next; checking--) {
			const infoBeingChecked = info[checking];
			if(!foundChildren && infoBeingChecked.length > 0) {
				const pop = infoBeingChecked.pop()!;
				if(pop === HEADER) {
					// Remove orphan header
					storage[last].pop();
				} else {
					// Restore info
					infoBeingChecked.push(pop);
					// Mark children found
					foundChildren = true;
				}
			}
		}
	}
	transferToOutput(storage, outputHolder, info);
	return true;
};

const doText = (e: Event, msInfo: MSState, doDownload: Function, showUnused: boolean, usingMarkDown = false) => {
	const { title, description = "[NO DESCRIPTION PROVIDED]" } = msInfo;
	const lines: string[] = [];
	const storage: LinesStorage = [[],[],[],[]];
	const info: InfoStorage = [[],[],[],[]];
	let lastLevel = 0;
	// As new levels are added, they fill storage.
	// When the next level is lower than the last, check to see if we dump anything.
	const sections: string[] = ms.sections;
	sections.forEach((sec: string) => {
		const section = (ms[sec as keyof typeof ms] as specificPageInfo[]);
		section.forEach((item: specificPageInfo) => {
			let {
				content = "",
				level = 4,
			} = item;
			const {
				tag,
				max = 4,
				prop,
				spectrum,
				start = "[MISSING]",
				end = "[MISSING]",
				display,
				boxes
			} = item;
			const moddedLevel = level - 1;
			switch(tag) {
				case "Header":
					if(level <= lastLevel) {
						if(!showUnused) {
							// Check if previous was just a header
							checkForOrphanHeaders(storage, info, lastLevel, moddedLevel, lines);
						} else {
							transferToOutput(storage, lines, null);
						}
					}
					lastLevel = moddedLevel;
					if(usingMarkDown) {
						content = " " + content;
						while(level > 0) {
							content = "#" + content;
							level--;
						}
					}
					storage[moddedLevel].push(content);
					info[moddedLevel].push(HEADER);
					break;
				case "Range":
					// Range is always saved, as it always has some sort of info
					const min = 0;
					const value = msInfo[prop as MSNum] || min;
					if(spectrum) {
						const div = 100 / (max - min);
						const lesser = Math.floor(((value - min) * div) + 0.5);
						if(usingMarkDown) {
							// extra spaces before newline are needed to make MarkDown behave
							storage[moddedLevel].push(`**${lesser}%** ${start}  \n**${100 - lesser}%** ${end}`);
						} else {
							storage[moddedLevel].push(`${lesser}% ${start}\n${100 - lesser}% ${end}`);
						}
					} else {
						let counter = min;
						let range = start;
						let ender = end;
						if(usingMarkDown) {
							range = "**" + range + "**";
							ender = "**" + ender + "**";
						}
						while(counter <= max) {
							if(counter === value) {
								range += usingMarkDown ? ` **(${counter})**` : ` (${counter})`;
							} else {
								range += ` ${counter}`;
							}
							counter++;
						}
						storage[moddedLevel].push(range + " " + ender);
					}
					info[moddedLevel].push(INFO);
					break;
				case "Text":
					const textInfo = msInfo[prop as MSText];
					if(showUnused || textInfo) {
						// Save
						if(usingMarkDown) {
							let txt = "";
							const tArr: string[] = (textInfo || "[NO TEXT ENTERED]").split(/\n\n+/);
							tArr.forEach((t: string, i: number) => {
								if(i > 0) {
									txt += "\n\n"; // inserts paragraph break
								}
								t.split(/\n/).forEach((x: string, j: number) => {
									if(j > 0) {
										txt += "  \n"; // inserts line break
									}
									txt += x.trim();
								});
							});
							storage[moddedLevel].push(content || "[TEXT PROMPT]", txt);
						} else {
							storage[moddedLevel].push(
								content || "[TEXT PROMPT]",
								textInfo || "[NO TEXT ENTERED]"
							);
						}
						info[moddedLevel].push(INFO);
					}
					break;
				case "Checkboxes":
					const expo: exportProp = display!.export!;
					const output = expo.output;
					let foundInfo = showUnused;
					if(output) {
						const map = output.map((bit) => bit.map((b) => {
							if(typeof b === "string") {
								return b;
							}
							const found: string[] = [];
							b.forEach((pair) => {
								const bool = msInfo[pair[0] as MSBool] || false;
								foundInfo = foundInfo || bool;
								if(bool) {
									found.push(pair[1]);
								}
							});
							if (found.length === 0) {
								return usingMarkDown ? "*[NONE SELECTED]*" : "[NONE SELECTED]";
							} else if (found.length === 1) {
								return usingMarkDown ? `*${found[0]}*` : found[0];
							} else if (found.length === 2) {
								return (
									usingMarkDown ?
										`*${found[0]}* and *${found[1]}*`
									:
									`${found[0]} and ${found[1]}`
								);
							}
							if(usingMarkDown) {
								const final = found.pop();
								return `*${found.join("*, *")}*, and *${final}*`;
							}
							return $and(found);
						}).join(""));
						if(foundInfo) {
							// Show if we're showing unused stuff OR we found something toggled true
							storage[moddedLevel].push(map.join("\n"));
							info[moddedLevel].push(INFO);
						}
					} else {
						const title = expo.title || "";
						const boxesCopy = boxes!.slice();
						const labels = (expo.labels || display!.labels || display!.rowLabels || boxesCopy).slice();
						let result = "";
						const found: string[] = [];
						while(boxesCopy.length > 0) {
							const box = boxesCopy.shift();
							const label = labels.shift();
							const bool = msInfo[box as MSBool] || false;
							foundInfo = foundInfo || bool;
							if(bool) {
								found.push(label || "[ERROR]");
							}
						}
						if(foundInfo) {
							// Show if we're showing unused stuff OR we found something toggled true
							if (found.length === 0) {
								result = usingMarkDown ? "*[NONE SELECTED]*" : "[NONE SELECTED]";
							} else if (found.length === 1) {
								result = usingMarkDown ? "*" + found[0] + "*" : found[0];
							} else if (found.length === 2) {
								if(usingMarkDown) {
									const final = found.pop();
									result = `*${found.join("*, *")}*, and *${final}*`;
								} else {
									result = $and(found);
								}
							}
							storage[moddedLevel].push(`${title} ${result}`);
							info[moddedLevel].push(INFO);
						}
					}
			}
		});
	});
	if(!showUnused) {
		checkForOrphanHeaders(storage, info, lastLevel, 0, lines);
	} else {
		transferToOutput(storage, lines, null);
	}
	console.log(lines);
	const bold = usingMarkDown ? "*" : "";
	const output = `${usingMarkDown ? "# " : ""}${title}\n\n${bold}${description}${bold}\n\n${lines.join("\n\n")}\n`;
	doDownload(e, output, usingMarkDown ? "md" : "txt");
};

export default doText;
