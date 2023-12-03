import { $and } from '../../../components/DollarSignExports';
import { MSBool, MSNum, MSState, MSText } from '../../../store/types';

import { exportProp, specificPageInfo } from '../MorphoSyntaxElements';
import ms from '../ms.json';

const HEADER = 1;
const INFO = 2;

const doText = (e: Event, msInfo: MSState, doDownload: Function, showUnused: boolean, md = false) => {
	const lines: string[] = [];
	const sections: string[] = ms.sections;
	sections.forEach((sec: string) => {
		const section = (ms[sec as keyof typeof ms] as specificPageInfo[]);
		const info: number[] = [];
		section.forEach((item: specificPageInfo) => {
			if(!showUnused && info.length > 0) {
				const pop = info.pop();
				if(pop === HEADER) {
					// Remove last header
					lines.pop();
				} else {
					info.push(pop!);
				}
			}
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
			switch(tag) {
				case "Header":
					if(!showUnused && info.length > 0) {
						// Check if previous was just a header
						const pop = info.pop();
						if(pop === HEADER) {
							// Remove and discard the header
							lines.pop();
						} else {
							info.push(pop!);
						}
					}
					if(md) {
						content = " " + content;
						while(level > 0) {
							content = "#" + content;
							level--;
						}
					}
					lines.push(content);
					info.push(HEADER);
					break;
				case "Range":
					// Range is always saved, as it always has some sort of info
					const min = 0;
					const value = msInfo[prop as MSNum] || min;
					if(spectrum) {
						const div = 100 / (max - min);
						const lesser = Math.floor(((value - min) * div) + 0.5);
						if(md) {
							lines.push(
								"**" + String(lesser) + "%** "
								+ start + "  \n"
								+ "**" + String(100 - lesser) + "%** "
								+ end
							);
						} else {
							lines.push(
								String(lesser) + "% " + start + "\n"
								+ String(100 - lesser) + "% " + end
							);
						}
					} else {
						let counter = min;
						let range = start;
						let ender = end;
						if(md) {
							range = "**" + range + "**";
							ender = "**" + ender + "**";
						}
						while(counter <= max) {
							if(counter === value) {
								range += md ? ` **(${counter})**` : ` (${counter})`;
							} else {
								range += ` ${counter}`;
							}
							counter++;
						}
						lines.push(range + " " + ender);
					}
					info.push(INFO);
					break;
				case "Text":
					const textInfo = msInfo[prop as MSText];
					if(showUnused || textInfo) {
						// Save
						if(md) {
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
							lines.push(content || "[TEXT PROMPT]", txt);
						} else {
							lines.push(
								content || "[TEXT PROMPT]",
								textInfo || "[NO TEXT ENTERED]"
							);
						}
						info.push(INFO);
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
								return md ? "*[NONE SELECTED]*" : "[NONE SELECTED]";
							} else if (found.length === 1) {
								return md ? `*${found[0]}*` : found[0];
							} else if (found.length === 2) {
								return (
									md ?
										`*${found[0]}* and *${found[1]}*`
									:
									`${found[0]} and ${found[1]}`
								);
							}
							if(md) {
								const final = found.pop();
								return `*${found.join("*, *")}*, and *${final}*`;
							}
							return $and(found);
						}).join(""));
						if(foundInfo) {
							// Show if we're showing unused stuff OR we found something toggled true
							lines.push(map.join("\n"));
							info.push(INFO);
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
								result = md ? "*[NONE SELECTED]*" : "[NONE SELECTED]";
							} else if (found.length === 1) {
								result = md ? "*" + found[0] + "*" : found[0];
							} else if (found.length === 2) {
								if(md) {
									const final = found.pop();
									result = `*${found.join("*, *")}*, and *${final}*`;
								} else {
									result = $and(found);
								}
							}
							lines.push(`${title} ${result}`);
							info.push(INFO);
						}
					}
			}
		});
	});
	const output =
		(md ? "# " : "")
		+ msInfo.title + "\n\n" + (md ? "*" : "")
		+ (msInfo.description || "[NO DESCRIPTION PROVIDED]")
		+ (md ? "*" : "")
		+ "\n\n"
		+ lines.join("\n\n")
		+ "\n";
	doDownload(e, output, md ? "md" : "txt");
};

export default doText;
