const bouncing: { [key: string]: any } = {};

function debounce (func: Function, args: any[], amount: number, namespace: string = "default") {
	if(bouncing[namespace]) {
		clearTimeout(bouncing[namespace]);
	}
	bouncing[namespace] = setTimeout(
		() => {
			delete bouncing[namespace];
			func.call(null, ...args);
		},
	amount);
}

export default debounce;
