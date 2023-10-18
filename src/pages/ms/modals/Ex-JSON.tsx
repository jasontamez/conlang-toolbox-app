import { MSState } from "../../../store/types";

const doJSON = (e: Event, msInfo: MSState, doDownload: Function) => {
	const { id, lastSave, ...output } = msInfo;
	doDownload(e, JSON.stringify(output), "json");
};

export default doJSON;
