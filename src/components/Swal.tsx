import Swal from "sweetalert2";
import './Swal.css';
import { $delay } from './DollarSignExports';

let queue = new Set();
let toastActive = false;

const fireSwal: any = async (options: any = {}) => {
	if(!options.toast && !options.heightAuto) {
		options.heightAuto = false;
	}
	if(options.customClass) {
		if(options.customClass.popup) {
			options.customClass.popup += ' conlangToolboxSwal';
		} else {
			options.customClass.popup = 'conlangToolboxSwal';
		}
	} else {
		options.customClass = { popup: 'conlangToolboxSwal' };
	}
	if(Swal.isVisible() && !toastActive) {
		// Delay this
		queue.add(options);
		return $delay(500).then(() => fireSwal(options));
	} else if(queue.size > 0) {
		// There is a queue
		if(queue.has(options)) {
			// We're in the queue already
			if(options !== Array.from(queue)[0]) {
				// Not our turn
				return $delay(500).then(() => fireSwal(options));
			}
			// It's our time!
			// Clear this from the queue
			queue.delete(options);
		} else {
			// Add to the queue
			queue.add(options);
			return $delay(500).then(() => fireSwal(options));
		}
	}
	toastActive = !!options.toast;
	return Swal.fire(options);
}

export default fireSwal;
