import {
	UPDATE_PRODUCTS,
	UPDATE_CATEGORIES,
	UPDATE_CURRENT_CATEGORY,
} from "../utils/actions";
import { reducer } from "../utils/reducers";
// sample of what global store will look like
const initialState = {
	products: [],
	categories: [{ name: "Food" }],
	currentCategory: "1",
};

// test that update products creates a new state object with updated projects
test("UPDATE_PRODUCTS", () => {
	let newState = reducer(initialState, {
		type: UPDATE_PRODUCTS,
		products: [{}, {}],
	});

	expect(newState.products.length).toBe(2);
	expect(initialState.products.length).toBe(0);
});

test("UPDATE_CATEGORIES", () => {
	let newState = reducer(initialState, {
		type: UPDATE_CATEGORIES,
		categories: [{}, {}],
	});

	expect(newState.categories.length).toBe(2);
	expect(initialState.categories.length).toBe(1);
});

test("UPDATE_CURRENT_CATEGORY", () => {
	let newState = reducer(initialState, {
		type: UPDATE_CURRENT_CATEGORY,
		currentCategory: "2",
	});

	expect(newState.currentCategory).toBe("2");
	expect(initialState.currentCategory).toBe("1");
});
