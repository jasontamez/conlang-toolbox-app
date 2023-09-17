import { exportProp, specificPageInfo } from './MorphoSyntaxElements';
import ms from './ms.json';
import {
	MorphoSyntaxTextObject,
	MorphoSyntaxNumberObject,
	MorphoSyntaxBoolObject,
	MorphoSyntaxObject
} from '../../components/ReduxDucksTypes';


const doText = (e: Error, msInfo: MorphoSyntaxObject, doDownload: Function, md = false) => {
	const lines: string[] = [];
	const bool = msInfo.bool;
	const num = msInfo.num;
	const text = msInfo.text;
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
			switch(tag) {
				case "Header":
					if(md) {
						content = " " + content;
						while(level > 0) {
							content = "#" + content;
							level--;
						}
					}
					lines.push(content);
					break;
				case "Range":
					const min = 0;
					const value = num[prop as keyof MorphoSyntaxNumberObject] || min;
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
					break;
				case "Text":
					if(md) {
						let txt = "";
						const tArr: string[] = (text[prop as keyof MorphoSyntaxTextObject] || "[NO TEXT ENTERED]").split(/\n\n+/);
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
						lines.push(content || "[TEXT PROMPT]", text[prop as keyof MorphoSyntaxTextObject] || "[NO TEXT ENTERED]");
					}
					break;
				case "Checkboxes":
					//const value = bool[prop as keyof MorphoSyntaxBoolObject];
					const expo: exportProp = display!.export!;
					const output = expo.output;
					if(output) {
						const map = output.map((bit) => bit.map((b) => {
								if(typeof b === "string") {
									return b;
								}
								const found: string[] = [];
								b.forEach((pair) => {
									if(bool[pair[0] as keyof MorphoSyntaxBoolObject]) {
										found.push(pair[1]);
									}
								});
								if (found.length === 0) {
									return md ? "*[NONE SELECTED]*" : "[NONE SELECTED]";
								} else if (found.length === 1) {
									return md ? "*" + found[0] + "*" : found[0];
								} else if (found.length === 2) {
									return md ? "*" + found[0] + "* and *" + found[1] : found[0] + " and " + found[1];
								}
								const final = found.pop();
								if(md) {
									return "*" + found.join("*, *") + "*, and *" + final + "*";
								}
								return found.join(", ") + ", and " + final;
							}).join(""));
						lines.push(map.join("\n"));
					} else {
						const title = expo.title || "";
						const boxesCopy = boxes!.slice();
						const labels = (expo.labels || display!.labels || display!.rowLabels || boxesCopy).slice();
						let result = "";
						const found: string[] = [];
						while(boxesCopy.length > 0) {
							const box = boxesCopy.shift();
							const label = labels.shift();
							if(bool[box as keyof MorphoSyntaxBoolObject]) {
								found.push(label || "[ERROR]");
							}
						}
						if (found.length === 0) {
							result = md ? "*[NONE SELECTED]*" : "[NONE SELECTED]";
						} else if (found.length === 1) {
							result = md ? "*" + found[0] + "*" : found[0];
						} else if (found.length === 2) {
							const final = found.pop();
							result = md ? ("*" + found.join("*, *") + "*, and *" + final) : (found.join(", ") + ", and " + final);
						}
						lines.push(title + " " + result);
					}
			}
		});
	});
	const output = (md ? "# " : "") + msInfo.title + "\n\n" + (md ? "*" : "") + (msInfo.description || "[NO DESCRIPTION PROVIDED]") + (md ? "*" : "") + "\n\n" + lines.join("\n\n") + "\n";
	doDownload(e, output, md ? "md" : "txt");
};

export default doText;
