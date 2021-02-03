let bouncing: any = null;

const debounce = (func: Function, args: any[], amount: number = 1000) => {
	if(bouncing) {
		clearTimeout(bouncing);
	}
	bouncing = setTimeout(
		() => {
			bouncing = null;
			func.call(null, ...args);
		},
	amount);
}

export default debounce;
