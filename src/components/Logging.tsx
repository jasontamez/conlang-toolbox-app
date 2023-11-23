import { saveToLog } from "../store/internalsSlice";

const flag = "debugging";

const log = (dispatch: Function | null, info: any[]) => {
	if(flag) {
		info.forEach(line => console.log(line));
	}
	dispatch && dispatch(saveToLog(info));
};

export default log;
