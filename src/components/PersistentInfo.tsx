import localForage from 'localforage';

export const StateStorage = localForage.createInstance({
	name: 'Conlang Toolbox',
	storeName: 'stateStorage',
	version: 1,
	description: 'Stores state information for the next time we load.'
});

export const LexiconStorage = localForage.createInstance({
	name: 'Conlang Toolbox',
	storeName: 'lexStorage',
	version: 1,
	description: 'Stores lexicon information.'
});

export const CustomStorageWG = localForage.createInstance({
	name: 'Conlang Toolbox',
	storeName: 'customStorageWG',
	version: 1,
	description: 'Stores WordGen custom information.'
});

export const CustomStorageWE = localForage.createInstance({
	name: 'Conlang Toolbox',
	storeName: 'customStorageWE',
	version: 1,
	description: 'Stores WordEvolve custom information.'
});

export const CustomStorageLS = localForage.createInstance({
	name: 'Conlang Toolbox',
	storeName: 'langSketchStorage',
	version: 1,
	description: 'Stores LangSketch custom information.'
});
