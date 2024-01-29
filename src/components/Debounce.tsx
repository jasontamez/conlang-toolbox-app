const bouncing: { [key: string]: number } = {};

function debounce <T extends unknown>(func: Function, args: T[], amount: number, namespace: string = "default") {
	if(bouncing[namespace]) {
		clearTimeout(bouncing[namespace]);
	}
	bouncing[namespace] = window.setTimeout(
		() => {
//			console.log(namespace, ...(args ? args : []));
			delete bouncing[namespace];
			func.call(null, ...args);
		},
		amount
	);
//	console.log(">>", namespace, ...(args ? args : []));
//	console.trace();
}

export default debounce;
