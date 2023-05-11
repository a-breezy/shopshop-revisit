import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_CATEGORIES } from "../../utils/queries";
import { useStoreContext } from "../../utils/GlobalState";
import {
	UPDATE_CATEGORIES,
	UPDATE_CURRENT_CATEGORY,
} from "../../utils/actions";

function CategoryMenu() {
	// state: retrieve current state from global store and
	// dispatch(): method to update state
	const [state, dispatch] = useStoreContext();

	// destructure categories out of the state object
	const { categories } = state;

	const { data: categoryData } = useQuery(QUERY_CATEGORIES);

	// useEffect takes two arguments - a function to run, and a condition to run the function
	useEffect(() => {
		// if categoryData exists or has cahnged run dispath()
		if (categoryData) {
			// fire dispatch() w/ action object giving type of action, and data to set state
			dispatch({
				type: UPDATE_CATEGORIES,
				categories: categoryData.categories,
			});
		}
	}, [categoryData, dispatch]);

	const handleClick = (id) => {
		dispatch({
			type: UPDATE_CURRENT_CATEGORY,
			currentCategory: id,
		});
	};

	return (
		<div>
			<h2>Choose a Category:</h2>
			{categories.map((item) => (
				<button
					key={item._id}
					onClick={() => {
						handleClick(item._id);
					}}
				>
					{item.name}
				</button>
			))}
		</div>
	);
}

export default CategoryMenu;
