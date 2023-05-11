import {
	UPDATE_PRODUCTS,
	UPDATE_CATEGORIES,
	UPDATE_CURRENT_CATEGORY,
} from "./actions";

import { useReducer } from "react";

export const reducer = (state, action) => {
	switch (action.type) {
		// if action is value of 'updated_projects' return new state
		// object with updated products array
		case UPDATE_PRODUCTS:
			return {
				...state,
				products: [...action.products],
			};
		// if 'updated_categories' return new state with new categories
		case UPDATE_CATEGORIES:
			return {
				...state,
				categories: [...action.categories],
			};
		case UPDATE_CURRENT_CATEGORY:
			return {
				...state,
				currentCategory: action.currentCategory,
			};
		// if none of these actions, don't update state
		default:
			return state;
	}
};

export function useProductReducer(initialState) {
	return useReducer(reducer, initialState);
}
