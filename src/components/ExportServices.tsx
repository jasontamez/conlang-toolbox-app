import { UseIonToastResult } from '@ionic/react';
import { Dispatch } from 'redux';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem'
import sanitize from 'sanitize-filename';

import toaster from './toaster';
import log from './Logging';
import i18n from '../i18n';

const doExport = async (
	output: string,
	fileName: string,
	toast: UseIonToastResult,
	dispatch: Dispatch | null,
	encodeUTF: boolean = true
) => {
	const Docs = Directory.Documents;
	const filename = sanitize(fileName) || "defaultfilename.txt";
	const path = sanitize(i18n.t("Conlang Toolbox", { context: "filename" }));
	try {
		/*const ret =*/ await Filesystem.readdir({
			path,
			directory: Docs
		});
//		console.log('Read dir', ret);
	} catch(e) {
		try {
			/*const ret =*/ await Filesystem.mkdir({
				path,
				directory: Docs,
				recursive: false // like mkdir -p
			});
//			console.log('Made dir', ret);
		} catch(e) {
			log(dispatch, ['doExport: Unable to make directory', e]);
			toast && toaster({
				message: i18n.t("Unable to export", { error: String(e).replace(/\n+/g, " ") }),
				color: "danger",
				duration: 10000,
				toast
			});
		}
	} finally {
		try {
			/*const result =*/ await Filesystem.writeFile({
				path: path + '/' + filename,
				data: output,
				directory: Docs,
				encoding: encodeUTF ? Encoding.UTF8 : undefined
			});
//			console.log('Wrote file', result);
			toast && toaster({
				message: i18n.t("File exported", { filename }),
				color: "success",
				duration: 5000,
				toast
			});
		} catch(e) {
			log(dispatch, ['doExport: Unable to write file', e]);
			toast && toaster({
				message: i18n.t("Unable to write file", { error: String(e).replace(/\n+/g, " ") }),
				color: "danger",
				duration: 10000,
				toast
			});
		}
	}
	//const blob = new Blob([output]);
	//const blobby = URL.createObjectURL(blob);
	//const link = $q("a.downloader");
	//link.download = filename.replace(/[^ a-zA-Z0-9-_]+/g, "") + "." + extension;
	//link.href = blobby;
	//link.click();
	//$delay(500).then(() => {
	//	URL.revokeObjectURL(blobby);
	//});
};

export default doExport;
