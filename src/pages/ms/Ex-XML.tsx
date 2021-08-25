import {
	MorphoSyntaxTextObject,
	MorphoSyntaxNumberObject,
	MorphoSyntaxObject
} from '../../components/ReduxDucksTypes';


const doXML = (e: Event, msInfo: MorphoSyntaxObject, doDownload: Function) => {
	let XML: string =
			'<?xml version="1.0" encoding="UTF-8"?>'
			+ "\n<MorphoSyntaxObject>\n\t<Title>"
			+ msInfo.title
			+ "</Title>\n\t<Description>"
			+ msInfo.description
			+ "</Description>\n\t<Bool>\n";
	const msb = msInfo.bool,
		msn = msInfo.num,
		mst = msInfo.text;
	Object.keys(msb).forEach((prop) => {
		XML += "\t\t<Item prop=\"" + prop + "\"></Item>\n";
	});
	XML += "\t</Bool>\n\t<Num>\n";
	Object.keys(msn).forEach((prop) => {
		XML += "\t\t<Item prop=\"" + prop + "\">" + msn[prop as keyof MorphoSyntaxNumberObject] + "</Item>\n";
	});
	XML += "\t</Num>\n\t<Text>\n";
	Object.keys(mst).forEach((prop) => {
		XML += "\t\t<Item prop=\"" + prop + "\">" + mst[prop as keyof MorphoSyntaxTextObject] + "</Item>\n";
	});
	let output = XML + "\t</Text>\n</MorphoSyntaxObject>";
	doDownload(e, output, "xml");
};

export default doXML;
