import {getAnimalsApiUrl, searchAnimalApiUrl} from './paths';

export async function sendSearchAnimalRequest(query) {
	try {
		let url = searchAnimalApiUrl + '?';
		for (let q in query) {
			url += q + '=' + query[q] + '&';
		}
		const res = await fetch(url);
		// TODO response code
		return await res.json();
	} catch(error) {
		throw(error.message);
	}
}

export async function sendGetAnimalsRequest() {
	try {
		const res = await fetch(getAnimalsApiUrl);
		return await res.json();
	} catch(error) {
		throw(error.message);
	}
}