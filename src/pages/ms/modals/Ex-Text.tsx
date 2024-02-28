import { MouseEvent } from 'react';
import { $and } from '../../../components/DollarSignExports';
import log from '../../../components/Logging';
import { MSBool, MSNum, MSState, MSText } from '../../../store/types';
import i18n from "../../../i18n";

import { specificPageInfo } from '../MorphoSyntaxElements';
import ms from '../ms.json';

const doText = (
	e: MouseEvent<HTMLIonItemElement, globalThis.MouseEvent>,
	msInfo: MSState,
	doDownload: (e: MouseEvent<HTMLIonItemElement, globalThis.MouseEvent>, x: string, y: string) => void,
	showUnused: boolean,
	usingMarkDown = false
) => {
	const { title, description } = msInfo;
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
				start: START = "[MISSING]",
				end: END = "[MISSING]",
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
					const start = i18n.t(START, { ns: "ms" });
					const end = i18n.t(END, { ns: "ms" });
					const min = 0;
					const value = msInfo[prop as MSNum] || min;
					if(spectrum) {
						const div = 100 / (max - min);
						const lesser = Math.floor(((value - min) * div) + 0.5);
						if(usingMarkDown) {
							// extra spaces before newline are needed to make MarkDown behave
							lines.push(`**${100 - lesser}%** ${start}  \n**${lesser}%** ${end}`);
						} else {
							lines.push(`${100 - lesser}% ${start}\n${lesser}% ${end}`);
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
							const tArr: string[] = (textInfo || i18n.t("[NO TEXT ENTERED]", { ns: "ms" })).split(/\n\n+/);
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
							lines.push(i18n.t(content || "[MISSING TEXT PROMPT]", { ns: "ms" }), txt);
						} else {
							lines.push(
								i18n.t(content || "[MISSING TEXT PROMPT]", { ns: "ms" }),
								textInfo || i18n.t("[NO TEXT ENTERED]", { ns: "ms" })
							);
						}
					}
					break;
				case "Checkboxes":
					const { labels: displayLabels, rowLabels, export: expo} = display!;
					const { output, title, labels: expoLabels } = expo!;
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
									found.push(i18n.t(label, { ns: "ms" }));
								}
							});
							if (found.length === 0) {
								const none = i18n.t("[NONE SELECTED]", { ns: "ms" });
								return usingMarkDown ? `_${none}_` : none;
							} else if (found.length === 1) {
								return usingMarkDown ? `_${found[0]}_` : found[0];
							} else if (found.length === 2) {
								return (
									usingMarkDown ?
										i18n.t("joinTwo", { one: `_${found[0]}_`, two: `_${found[1]}_`})
									:
										i18n.t("joinTwo", { one: found[0], two: found[1] })
								);
							} else if(usingMarkDown) {
								const inner = $and(found, `_${i18n.t("andGlue")}_`, `_${i18n.t("andFinal")}_`);
								return `_${inner}_`;
							}
							return $and(found);
						}).join(""));
						lines.push(map.join("\n"));
					} else {
						// Use general output format
						const labels = (expoLabels || displayLabels || rowLabels || []).slice();
						let result = "";
						const found: string[] = [];
						while(boxesCopy.length > 0) {
							const [box, value] = boxesCopy.shift()!;
							const label = i18n.t(labels.shift() || "[LABEL NOT FOUND]", { ns: "ms", box });
							if(value) {
								found.push(label);
							}
						}
						if (found.length === 0) {
							const none = i18n.t("[NONE SELECTED]", { ns: "ms" });
							result = usingMarkDown ? `_${none}_` : none;
						} else if (found.length === 1) {
							result = usingMarkDown ? "_" + found[0] + "_" : found[0];
						} else if (found.length === 2) {
							if(usingMarkDown) {
								const inner = $and(found, `_${i18n.t("andGlue")}_`, `_${i18n.t("andFinal")}_`);
								result = `_${inner}_`;
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
	const ital = usingMarkDown ? "_" : "";
	const output = `${usingMarkDown ? "# " : ""}${title}\n\n${ital}${description || i18n.t("[NO DESCRIPTION PROVIDED]", { ns: "ms" })}${ital}\n\n${lines.join("\n\n")}\n`;
	doDownload(e, output, usingMarkDown ? "md" : "txt");
};

export default doText;
