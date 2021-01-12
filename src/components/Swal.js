import Swal from "sweetalert2";

let queue = new Set();

// Wrap setTimeout in a Promise
export const $delay = (ms) => {
	return new Promise(resolve => setTimeout(resolve, ms));
}

const fireSwal = async (options = {}) => {
	options.customClass = {popup: 'conlangToolboxSwal'};
	if(Swal.isVisible()) {
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
	return Swal.fire(options);
}

export default fireSwal;
