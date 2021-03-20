import escape from '../components/EscapeForHTML';
import fireSwal from '../components/Swal';
import { Plugins, FilesystemDirectory, FilesystemEncoding } from '@capacitor/core';
import sanitize from 'sanitize-filename';

const doExport = async (output: string, fileName: string, notify: boolean = true) => {
	const { Filesystem } = Plugins;
	const Directory = FilesystemDirectory.Documents;
	const filename = sanitize(fileName) || "defaultfilename.txt";
	try {
		let ret = await Filesystem.readdir({
			path: 'ConlangToolbox',
			directory: Directory
		});
		console.log('Read dir', ret);
	} catch(e) {
		try {
			let ret = await Filesystem.mkdir({
				path: 'ConlangToolbox',
				directory: Directory,
				recursive: false // like mkdir -p
			});
			console.log('Made dir', ret);
		} catch(e) {
			console.error('Unable to make directory', e);
			notify && fireSwal({
				html: "Unable to export:<br />" + escape(String(e)).replace(/\n/g, "<br />"),
				customClass: {popup: 'dangerToast'},
				toast: true,
				timer: 10000,
				timerProgressBar: true
			});
		}
	} finally {
		try {
			const result = await Filesystem.writeFile({
				path: 'ConlangToolbox/' + filename,
				data: output,
				directory: Directory,
				encoding: FilesystemEncoding.UTF8
			});
			console.log('Wrote file', result);
			notify && fireSwal({
				title: filename + " exported",
				toast: true,
				timer: 5000,
				timerProgressBar: true
	});
		} catch(e) {
			console.error('Unable to write file', e);
			notify && fireSwal({
				html: "Unable to export:<br />" + escape(String(e)).replace(/\n/g, "<br />"),
				customClass: {popup: 'dangerToast'},
				toast: true,
				timer: 10000,
				timerProgressBar: true
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
