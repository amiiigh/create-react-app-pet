import * as constants from '../constants';
import {sendGetAnimalsRequest, sendSearchAnimalRequest} from '../api-handlers/animal';

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
		setTimeout(()=> {
			dispatch(getAnimalsSuccess(res));
		}, 1500)
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
		setTimeout(()=>{
			dispatch(searchAnimalSuccess(res));
		},1500)
	} catch(error) {
		dispatch(searchAnimalFailure(error));
	}
}

export function setCurrentAnimal(dispatch, animal) {
	const action = {
		type: constants.SET_CURRENT_ANIMAL,
		payload: { animal },
	};
	dispatch(action)
}

export function changePage(dispatch, page) {
	const action = {
		type: constants.CHANGE_PAGE,
		payload: { page }
	};
	dispatch(action)
}