import { MSBasic, MSInfo } from "../../store/types";

interface Output extends MSInfo {
	id?: string
	lastSave?: number
	title: string
	description: string
	currentVersion?: string
	storedCustomInfo?: { [key: string]: any }
	storedCustomIDs?: string[]
}

const doJSON = (e: Event, msInfo: MSBasic, doDownload: Function) => {
	const output: Output = {...msInfo};
	delete output.id;
	delete output.lastSave;
	delete output.storedCustomIDs;
	delete output.storedCustomInfo;
	delete output.currentVersion;
	doDownload(e, JSON.stringify(output), "json");
};

export default doJSON;
