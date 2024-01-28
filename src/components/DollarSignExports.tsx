export const $q =
	<T extends HTMLElement>(query: string, doc: Document | HTMLElement = window.document): T | null =>
		doc.querySelector(query) as T | null;
export const $a =
	<T extends HTMLElement>(query: string, doc: Document | HTMLElement = window.document): T[] =>
		Array.from(doc.querySelectorAll(query)) as T[];
export const $i =
	<T extends HTMLElement>(query: string, doc = window.document): T | null =>
		doc.getElementById(query) as T | null;
// Wrap setTimeout in a Promise
type WrappedPromise = (ms: number) => Promise<ReturnType<typeof setTimeout>>
export const $delay: WrappedPromise = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
// Oxford comma
export const $and = (array: string[], glue: string = ", "): string => {
	const input = array.slice();
	if(input.length < 2) {
		return input.join(" ");
	}
	const last = input.pop()!;
	return input.join(glue) + `${glue}and ${last}`;
};
