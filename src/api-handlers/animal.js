import {getAnimalsApiUrl, searchAnimalApiUrl} from "../config/paths";

export async function sendSearchAnimalRequest(query) {
	try {
		let url = searchAnimalApiUrl + '?';
		for (let q in query) {
			url += q + '=' + query[q] + '&';
		}
		const res = await fetch(url);
		return await res.json();
	} catch(error) {
		return error
	}
}

export async function sendGetAnimalsRequest() {
	try {
		const res = await fetch(getAnimalsApiUrl);
		return await res.json();
	} catch(error) {
		return error;
	}
}