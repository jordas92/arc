/** Copyright (c) 2023-present Kristiyan Dimitrov */

export const loadState = (key) => {
	try {
		const serialState = localStorage.getItem(key);
		if (serialState === null) {
			return undefined;
		}
		return JSON.parse(serialState);
	} catch (err) {
		return undefined;
	}
};

export const saveState = (state, key) => {
	try {
		const serialState = JSON.stringify(state);
		localStorage.setItem(key, serialState);
	} catch (err) {
		console.error(err);
	}
};

export const removeState = (key) => {
	try {
		localStorage.removeItem(key);
	} catch (err) {
		console.error(err);
	}
};

export const clearLocalStorage = () => {
	try {
		localStorage.clear();
	} catch (err) {
		console.error(err);
	}
};
