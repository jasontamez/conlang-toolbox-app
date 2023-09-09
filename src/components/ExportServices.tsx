import { Filesystem, Directory, Encoding } from '@capacitor/filesystem'
import sanitize from 'sanitize-filename';

const doExport = async (
	output: string,
	fileName: string,
	doToast: Function | false = false,
	encodeUTF: boolean = true
) => {
	const Docs = Directory.Documents;
	const filename = sanitize(fileName) || "defaultfilename.txt";
	try {
		const ret = await Filesystem.readdir({
			path: 'ConlangToolbox',
			directory: Docs
		});
		console.log('Read dir', ret);
	} catch(e) {
		try {
			const ret = await Filesystem.mkdir({
				path: 'ConlangToolbox',
				directory: Docs,
				recursive: false // like mkdir -p
			});
			console.log('Made dir', ret);
		} catch(e) {
			console.error('Unable to make directory', e);
			doToast && doToast({
				message: "UNABLE TO EXPORT: " + String(e).replace(/\n+/g, " "),
				cssClass: "danger",
				duration: 10000,
				buttons: [
					{
						text: "Ok",
						role: 'cancel'
					}
				]
			});
		}
	} finally {
		try {
			const result = await Filesystem.writeFile({
				path: 'ConlangToolbox/' + filename,
				data: output,
				directory: Docs,
				encoding: encodeUTF ? Encoding.UTF8 : undefined
			});
			console.log('Wrote file', result);
			doToast && doToast({
				message: `${filename} exported`,
				cssClass: "success",
				duration: 5000,
				buttons: [
					{
						text: "Ok",
						role: 'cancel'
					}
				]
			});
		} catch(e) {
			console.error('Unable to write file', e);
			doToast && doToast({
				message: "UNABLE TO WRITE FILE: " + String(e).replace(/\n+/g, " "),
				cssClass: "danger",
				duration: 10000,
				buttons: [
					{
						text: "Ok",
						role: 'cancel'
					}
				]
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
