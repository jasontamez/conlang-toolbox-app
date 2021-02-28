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
	description: 'Stores non-lexicon custom information.'
});
