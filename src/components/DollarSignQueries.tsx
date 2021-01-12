export const $q: any = (query: string, doc = window.document) => doc.querySelector(query);
export const $a: any = (query: string, doc = window.document) => Array.from(doc.querySelectorAll(query));
export const $i: any = (query: string, doc = window.document) => doc.getElementById(query);
