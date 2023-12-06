import { $and } from '../../../components/DollarSignExports';
import log from '../../../components/Logging';
import { MSBool, MSNum, MSState, MSText } from '../../../store/types';

import { exportProp, specificPageInfo } from '../MorphoSyntaxElements';
import ms from '../ms.json';

const doText = (e: Event, msInfo: MSState, doDownload: Function, showUnused: boolean, usingMarkDown = false) => {
	const { title, description = "[NO DESCRIPTION PROVIDED]" } = msInfo;
	const lines: string[] = [];
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
				boxes,
				heads = []
			} = item;
			switch(tag) {
				case "Header":
					if(!showUnused) {
						// Check all properties under this header and continue
						//   only if at least one has information
						if(heads.every(prop => prop !== true && !msInfo[prop])) {
							// Skip this
							break;
						}
					}
					if(usingMarkDown) {
						content = " " + content;
						while(level > 0) {
							content = "#" + content;
							level--;
						}
					}
					lines.push(content);
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
							lines.push(`**${lesser}%** ${start}  \n**${100 - lesser}%** ${end}`);
						} else {
							lines.push(`${lesser}% ${start}\n${100 - lesser}% ${end}`);
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
						lines.push(range + " " + ender);
					}
					break;
				case "Text":
					const textInfo = msInfo[prop as MSText];
					// Continue only if we're showing everything, or if there is something to show
					if(showUnused || textInfo) {
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
							lines.push(content || "[TEXT PROMPT]", txt);
						} else {
							lines.push(
								content || "[TEXT PROMPT]",
								textInfo || "[NO TEXT ENTERED]"
							);
						}
					}
					break;
				case "Checkboxes":
					const expo: exportProp = display!.export!;
					const output = expo.output;
					const boxMap: {[key in MSBool]?: boolean} = {};
					const boxesCopy: [MSBool, boolean][] = [];
					let found = false;
					boxes!.forEach(prop => {
						const value = msInfo[prop] || false;
						found = found || value;
						boxMap[prop] = value;
						boxesCopy.push([prop, value]);
					});
					if(!showUnused && !found) {
						// Nothing to show, so skip.
					} else if(output) {
						// Use explicit output format
						const map = output.map((bit) => bit.map((b) => {
							if(typeof b === "string") {
								return b;
							}
							const found: string[] = [];
							b.forEach(([prop, label]) => {
								if(boxMap[prop]) {
									found.push(label);
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
							} else if(usingMarkDown) {
								const final = found.pop();
								return `*${found.join("*, *")}*, and *${final}*`;
							}
							return $and(found);
						}).join(""));
						lines.push(map.join("\n"));
					} else {
						// Use general output format
						const title = expo.title || "";
						const labels = (expo.labels || display!.labels || display!.rowLabels || []).slice();
						let result = "";
						const found: string[] = [];
						while(boxesCopy.length > 0) {
							const [box, value] = boxesCopy.shift()!;
							const label = labels.shift() || `[LABEL NOT FOUND FOR "${box}"]`;
							if(value) {
								found.push(label);
							}
						}
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
						lines.push(`${title} ${result}`);
					}
			}
		});
	});
	log(null, lines);
	const bold = usingMarkDown ? "*" : "";
	const output = `${usingMarkDown ? "# " : ""}${title}\n\n${bold}${description}${bold}\n\n${lines.join("\n\n")}\n`;
	doDownload(e, output, usingMarkDown ? "md" : "txt");
};

export default doText;
