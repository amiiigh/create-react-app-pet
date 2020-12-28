import * as constants from "../constants";
import {sendGetAnimalsRequest, sendSearchAnimalRequest} from "../api-handlers/animal";

export function getAnimalsRequest() {
	return {
		type: constants.GET_ANIMALS_REQUEST,
	}
}

export function getAnimalsSuccess(response) {
	return {
		type: constants.GET_ANIMALS_SUCCESS,
		payload: { response },
	}
}

export function getAnimalsFailure(error) {
	return {
		type: constants.GET_ANIMALS_FAILURE,
		payload: { error },
	}
}

export async function getAnimals(dispatch) {
	dispatch(getAnimalsRequest());
	try {
		const res = await sendGetAnimalsRequest();
		dispatch(getAnimalsSuccess(res));
	} catch(error) {
		dispatch(getAnimalsFailure(error));
	}
}

export function searchAnimalRequest(query) {
	return {
		type: constants.SEARCH_ANIMAL_REQUEST,
		payload: { query },
	}
}

export function searchAnimalSuccess(response) {
	return {
		type: constants.SEARCH_ANIMAL_SUCCESS,
		payload: { response },
	}
}

export function searchAnimalFailure(error) {
	return {
		type: constants.SEARCH_ANIMAL_FAILURE,
		payload: { error },
	}
}

export async function searchAnimal(dispatch, query) {
	dispatch(searchAnimalRequest(query));
	try {
		const res = await sendSearchAnimalRequest(query);
		dispatch(searchAnimalSuccess(res));
	} catch(error) {
		dispatch(searchAnimalFailure(error));
	}
}

export function setCurrentAnimal(animal) {
	return {
		type: constants.SET_CURRENT_ANIMAL,
		payload: { animal },
	}
}

export function changePage(dispatch, page) {
	const action = {
		type: constants.CHANGE_PAGE,
		payload: { page }
	};
	dispatch(action)
}