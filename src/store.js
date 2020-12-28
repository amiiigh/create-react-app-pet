import React, { createContext, useContext, useReducer } from 'react';
import * as constants from './constants';

export const StoreContext = createContext();
const initialState = {
	page: 'SEARCH',
	searchResults: [],
	currentAnimal: {},
	animals: {},
	query: {},
	fetchingAnimals: false,
	searching: false,
	searchError: "",
	fetchingAnimalsError: "",
};

const reducer = (state, action) => {
	console.log(action);
	switch(action.type) {
		case constants.CLEAR_SEARCH_RESULTS:
			return initialState;
		case constants.CHANGE_PAGE:
			return {
				...state,
				page: action.payload.page,
			};
		case constants.SEARCH_ANIMAL_REQUEST:
			return {
				...state,
				query: action.payload.query,
				searching: true,
			};
		case constants.SEARCH_ANIMAL_SUCCESS:
			return {
				...state,
				searchResults: action.payload.response,
				page: 'RESULTS',
				searching: false,
			};
		case constants.SEARCH_ANIMAL_FAILURE:
			return {
				...state,
				searchError: action.payload.error,
				searchResults: [],
				searching: false,
			};
		case constants.GET_ANIMALS_REQUEST:
			return {
				...state,
				fetchingAnimals: true,
			};
		case constants.GET_ANIMALS_SUCCESS:
			return {
				...state,
				animals: action.payload.response,
				fetchingAnimals: false,
			};
		case constants.GET_ANIMALS_FAILURE:
			return {
				...state,
				animals: {},
				fetchingAnimals: false,
				fetchingAnimalsError: action.payload.error,
			};
		case constants.SET_CURRENT_ANIMAL:
			return {
				...state,
				currentAnimal: action.payload.animal,
				page: 'DETAIL',
			};
		default:
			throw new Error(`Unhandled action type: ${action.type}`);
	}
};

export const StoreProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	return (
		<StoreContext.Provider value={{state, dispatch}}>
			{children}
		</StoreContext.Provider>
	)
};

export const useStore = () => useContext(StoreContext);