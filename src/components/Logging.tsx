import { doLog } from "../store/logsSlice";

const flag = "debugging";

const log = (dispatch: Function | null, info: any[]) => {
	if(flag) {
		info.forEach(line => console.log(line));
	}
	dispatch && dispatch(doLog(info));
};

export default log;
