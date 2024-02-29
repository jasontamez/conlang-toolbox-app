import { MouseEvent } from 'react';
import { $and } from '../../../components/DollarSignExports';
import log from '../../../components/Logging';
import { tMaker, tc } from '../../../components/translators';
import { MSBool, MSNum, MSState, MSText } from '../../../store/types';

import i18n from "../../../i18n";
import { CheckboxTransExportProps, CheckboxTransProps, specificPageInfo } from '../MorphoSyntaxElements';
import ms from '../ms.json';

const t = tMaker({ns: "ms"});

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
					const start = t(START);
					const end = t(END);
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
							const tArr: string[] = (textInfo || t("[NO TEXT ENTERED]")).split(/\n\n+/);
							tArr.forEach((tbit: string, i: number) => {
								if(i > 0) {
									txt += "\n\n"; // inserts paragraph break
								}
								tbit.split(/\n/).forEach((x: string, j: number) => {
									if(j > 0) {
										txt += "  \n"; // inserts line break
									}
									txt += x.trim();
								});
							});
							lines.push(t(content || "[MISSING TEXT PROMPT]"), txt);
						} else {
							lines.push(
								t(content || "[MISSING TEXT PROMPT]"),
								textInfo || t("[NO TEXT ENTERED]")
							);
						}
					}
					break;
				case "Checkboxes":
					const { i18, export: expo} = display!;
					const { textOutputBooleans, i18: expoI18 } = expo!;
					//const { labels, export: expo} = display!;
					//const { output, header, labels: expoLabels } = expo!;
					const {
						header,
						labels: expoLabels
					} = i18n.t(i18, { ns: "ms", returnObjects: true }) as CheckboxTransProps;
					const {
						labels,
						header: expoHeader,
						textFormat
					} = i18n.t(expoI18, { ns: "ms", returnObjects: true }) as CheckboxTransExportProps;
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
					} else if(textOutputBooleans) {
						// Use explicit output format
						const {
							chosenHeaders = [],
							chosenLabelsInOrder = []
						} = (textFormat || {});
						const map = chosenHeaders.map((rowHeader, i) => {
							const found: string[] = [];
							textOutputBooleans[i].forEach((prop, j) => {
								if(boxMap[prop]) {
									found.push(chosenLabelsInOrder[j]);
								}
							});
							let foundText: string;
							if (found.length === 0) {
								const none = t("[NONE SELECTED]");
								foundText = usingMarkDown ? `_${none}_` : none;
							} else if (found.length === 1) {
								foundText = usingMarkDown ? `_${found[0]}_` : found[0];
							} else if (found.length === 2) {
								foundText = (
									usingMarkDown ?
										tc("joinTwo", { one: `_${found[0]}_`, two: `_${found[1]}_`})
									:
										tc("joinTwo", { one: found[0], two: found[1] })
								);
							} else if(usingMarkDown) {
								const inner = $and(found, `_${tc("andGlue")}_`, `_${tc("andFinal")}_`);
								foundText = `_${inner}_`;
							} else {
								foundText = $and(found);
							}
							return `${rowHeader} ${foundText}`;
						});
						lines.push(map.join("\n"));
					} else {
						// Use general output format
						const outLabels = (expoLabels || labels || []).slice();
						let result = "";
						const found: string[] = [];
						while(boxesCopy.length > 0) {
							const [box, value] = boxesCopy.shift()!;
							const label = outLabels.shift();
							if(value) {
								found.push(label ? (Array.isArray(label) ? label.join(" ") : label) : t("[LABEL NOT FOUND]", { box }));
							}
						}
						if (found.length === 0) {
							const none = t("[NONE SELECTED]");
							result = usingMarkDown ? `_${none}_` : none;
						} else if (found.length === 1) {
							result = usingMarkDown ? "_" + found[0] + "_" : found[0];
						} else if (found.length === 2) {
							if(usingMarkDown) {
								const inner = $and(found, `_${tc("andGlue")}_`, `_${tc("andFinal")}_`);
								result = `_${inner}_`;
							} else {
								result = $and(found);
							}
						}
						lines.push(`${expoHeader || header} ${result}`);
					}
			}
		});
	});
	log(null, lines);
	const ital = usingMarkDown ? "_" : "";
	const output = `${usingMarkDown ? "# " : ""}${title}\n\n${ital}${description || t("[NO DESCRIPTION PROVIDED]")}${ital}\n\n${lines.join("\n\n")}\n`;
	doDownload(e, output, usingMarkDown ? "md" : "txt");
};

export default doText;
