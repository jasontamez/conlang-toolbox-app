import { MorphoSyntaxObject } from "../../components/ReduxDucksTypes";

const doJSON = (e: Event, msInfo: MorphoSyntaxObject, doDownload: Function) => {
	const output: any = {
		title: msInfo.title,
		description: msInfo.description,
		bool: {...msInfo.bool},
		num: {...msInfo.num},
		text: {...msInfo.text}
	};
	doDownload(e, JSON.stringify(output), "json");
};

export default doJSON;
