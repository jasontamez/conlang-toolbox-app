import { saveToLog } from "../store/internalsSlice";

const flag = "debugging";

const getType = (thing: any) => typeof thing;

const maskSensitiveInfo = (thing: any, prefix: string = "MASKED: "): string => {
	const type = getType(thing);
	switch(type) {
		case "boolean":
		case "string":
		case "number":
		case "bigint":
		case "function":
		case "symbol":
		case "undefined":
			return prefix + type.toUpperCase();
	}
	// "object"
	if(Array.isArray(thing)) {
		return prefix + "[ " + thing.map((x: any) => maskSensitiveInfo(x, "")).join(", ") + " ]";
	} else if (!thing) {
		return prefix + "NULL";
	}
	let final = prefix + "{ ";
	Object.entries(thing).forEach(([key, value], i) => {
		if(i !== 0) {
			final += ", ";
		}
		final += `"${key}": ${maskSensitiveInfo(value, "")}`;
	});
	return final;
};

const log = (dispatch: Function | null, info: any[], ...sensitiveInfo: any[]) => {
	if(flag) {
		[...info, ...sensitiveInfo].forEach(line => console.log(line));
	}
	const logs: string[] = info.map(line => typeof line === "string" ? line : JSON.stringify(line));
	while(sensitiveInfo.length > 0) {
		logs.push(maskSensitiveInfo(sensitiveInfo.shift()!));
	}
	dispatch && dispatch(saveToLog(logs));
};

export default log;
