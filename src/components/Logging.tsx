import { saveToLog } from "../store/internalsSlice";

const flag = "debugging";

const log = (dispatch: Function | null, info: any[]) => {
	if(flag) {
		info.forEach(line => console.log(line));
	}
	const logs: string[] = info.map(line => typeof line === "string" ? line : JSON.stringify(line));
	dispatch && dispatch(saveToLog(logs));
};

export default log;
