import React, { createContext, useContext } from "react";
import { useProductReducer } from "./reducers";

// create new context obj
const StoreContext = createContext();
// destructure Provider from StoreContext
// Provider is a wrapper for React app to store state data/make it available everywhere
// Consumer allows us to pull what the provider holds
const { Provider } = StoreContext;

// creates a custom component to hold state
const StoreProvider = ({ value = [], ...props }) => {
	// state is most updated global state obj
	// dispatch is method to update state - looks for action arg
	const [state, dispatch] = useProductReducer({
		products: [],
		categories: [],
		currentCategory: "",
	});
	// view the updated state
	console.log(state);
	return <Provider value={[state, dispatch]} {...props} />;
};

// create custom hook for global state
const useStoreContext = () => {
	return useContext(StoreContext);
};

export { StoreProvider, useStoreContext };
