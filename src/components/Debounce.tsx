const bouncing: { [key: string]: any } = {};

function debounce (func: Function, args: any[], amount: number, namespace: string = "default") {
	if(bouncing[namespace]) {
		clearTimeout(bouncing[namespace]);
	}
	bouncing[namespace] = setTimeout(
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
